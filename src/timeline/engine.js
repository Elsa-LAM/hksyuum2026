// @ts-nocheck
import * as THREE from "three";
import gsap from "gsap";
import * as XLSX from "xlsx";

export function mountTimeline() {
"use strict";
let destroyed = false;
let animId = 0;



/* =========================================================
   0. DATA & MULTI-LANGUAGE
   ========================================================= */
// v14-4 修補：YEAR_MIN / YEAR_MAX 不再寫死，改成每次 Excel 匯入後由
// updateYearRange() 依實際資料裡最舊／最新的年份重新計算（見下方
// rebuildTimeline()）。這裡的 1971 / 2026 只是「尚未匯入任何 Excel 前」
// 的預設顯示範圍，匯入後就會被覆蓋成真正的資料範圍。
let YEAR_MIN = 1971, YEAR_MAX = 2026;
const CATS = ['A','B','C','D','E'];
const CAT_COLORS = {A:'#B85C5F',B:'#C1A46B',C:'#7D6A8E',D:'#6B8E7A',E:'#5C6E84'};

/* ---------------------------------------------------------
   0-img. 【本機圖片路徑設定】
   所有時間軸相片一律從「本機相對路徑」讀取，請將圖片檔案放在網頁檔案
   同層的 images 資料夾內，例如：
     ./images/p01.jpg
     ./images/1998_graduation.png
   Excel「照片列」分頁的 photo-1 / photo-2 欄位只需填「檔名」
   （例如 p01.jpg），程式會自動補上下方的 IMAGE_BASE_PATH 前綴組成完整路徑。
   ★ 若要更換圖片資料夾名稱或路徑，只需修改這一個常數即可，
     不需要更動程式其他部分。
   --------------------------------------------------------- */
const IMAGE_BASE_PATH = '/images/';

/* ---------------------------------------------------------
   0-font. 【字體／圖示縮放比例設定】
   需求：把原本的「大」字號設為新的「小」字號基準，「中」「大」再依同一
   比例往上放大。原始比例為 small:0.82／medium:1／large:1.28，
   換算放大係數 = 原 large ÷ 原 small = 1.28 ÷ 0.82 ≈ 1.561，
   將三個級距整批乘上這個係數，即可讓新 small 等於原本的 large，
   並維持 small／medium／large 三者之間原有的比例關係：
     新 small  = 0.82 × 1.561 ≈ 1.28   （＝原本的「大」）
     新 medium = 1.00 × 1.561 ≈ 1.56
     新 large  = 1.28 × 1.561 ≈ 2.00
   所有文字（.lbl / .yr / 標題 / 年份刻度…）與事件節點圖示（.ms .dot）
   皆透過 CSS 變數 --font-scale 套用這裡的倍率，兩者永遠同步縮放。
   --------------------------------------------------------- */
const FONT_SCALES = { small:1.28, medium:1.56, large:2.0 };
let currentFontSize = 'medium';

// selection / hoverTarget 提前宣告於此（原本在 section 6），
// 讓 section 4 的 relayoutMilestones()／applyFontScale() 在初始化流程中
// 呼叫 applyHighlight() 時，不會因為 TDZ（暫時性死區）而噴錯。
let selection = null;
let hoverTarget = null;

const UI_TEXT = {
  'zh-Hant': {
    title: '樹仁校史 · 全域時間軸',
    hint: '拖拽底部時間軸 / 滾動畫面瀏覽年代<br>點擊照片或事件查看關聯並自動對焦',
    yearLbl: 'CURRENT YEAR',
    importTitle: '尚未載入資料',
    importBody: '請按左上角「Excel」匯入工作簿。匯入後會保存在這個瀏覽器，可隨時按「清空」刪除。',
    clearConfirm: '確定清空已儲存的時間軸資料？畫面會回到空白，需重新匯入 Excel。',
    statusImported: (t,b,p) => `已匯入並保存：${t} 筆上軌／${b} 筆下軌／${p} 張照片`,
    statusRestored: (t,b,p) => `已載入本機紀錄：${t} 筆上軌／${b} 筆下軌／${p} 張照片`,
    statusCleared: '已清空本機紀錄',
    statusEmpty: ''
  },
  'zh-Hans': {
    title: '树仁校史 · 全域时间轴',
    hint: '拖拽底部时间轴 / 滚动画面浏览年代<br>点击照片或事件查看关联并自动聚焦',
    yearLbl: 'CURRENT YEAR',
    importTitle: '尚未载入资料',
    importBody: '请按左上角「Excel」汇入工作簿。汇入后会保存在这个浏览器，可随时按「清空」删除。',
    clearConfirm: '确定清空已保存的时间轴资料？画面会回到空白，需重新汇入 Excel。',
    statusImported: (t,b,p) => `已汇入并保存：${t} 笔上轨／${b} 笔下轨／${p} 张照片`,
    statusRestored: (t,b,p) => `已载入本机纪录：${t} 笔上轨／${b} 笔下轨／${p} 张照片`,
    statusCleared: '已清空本机纪录',
    statusEmpty: ''
  },
  'en': {
    title: 'HKSYU History · Global Timeline',
    hint: 'Drag timeline / Scroll to explore years<br>Click photo or event to reveal connections',
    yearLbl: 'CURRENT YEAR',
    importTitle: 'No data loaded',
    importBody: 'Use Excel in the top-left to import the workbook. It is saved in this browser until you Clear it.',
    clearConfirm: 'Clear the saved timeline data? The view will go blank until you import Excel again.',
    statusImported: (t,b,p) => `Imported and saved: ${t} top / ${b} context / ${p} photos`,
    statusRestored: (t,b,p) => `Restored: ${t} top / ${b} context / ${p} photos`,
    statusCleared: 'Saved data cleared',
    statusEmpty: ''
  }
};

let currentLang = 'zh-Hant';

/* ---------------------------------------------------------
   0a. Excel 分頁欄位架構 <-> currentLang 對應
   Sheet「上軌事件」欄位：id / year / title-Eng / title-TC / title-SC /
     content-Eng / content-TC / content-SC / category / relatedBottomIds
   Sheet「下軌事件」欄位：id / year / title-Eng / title-TC / title-SC /
     content-Eng / content-TC / content-SC / category
   Sheet「照片列」欄位：id / year / photo-1 / photo-2 / title-Eng / title-TC /
     title-SC / content-Eng / content-TC / content-SC / relatedTopIds /
     relatedBottomIds / category
   --------------------------------------------------------- */
const SHEET_NAMES = { top:'上軌事件', bottom:'下軌事件', photo:'照片列' };
const LANG_FIELD = { 'zh-Hant':'TC', 'zh-Hans':'SC', 'en':'Eng' };
function langKey(){ return LANG_FIELD[currentLang] || 'TC'; }

/* ---------------------------------------------------------
   0a-2. A–E 分類與多語言文字字典（上軌類別標籤／下軌固定標籤）
   --------------------------------------------------------- */
const categoryMap = {
  A: { color: '#B85C5F', name: { Eng: 'Campus Development', TC: '校園發展', SC: '校园发展' } },
  B: { color: '#C1A46B', name: { Eng: 'Honours, Service and Remembrance', TC: '榮譽、服務和緬懷', SC: '荣誉、服务和缅怀' } },
  C: { color: '#7D6A8E', name: { Eng: 'Accreditation & Validation', TC: '認證與驗證', SC: '认证与验证' } },
  D: { color: '#6B8E7A', name: { Eng: 'Institutional Advancement', TC: '校務拓展', SC: '校务拓展' } },
  E: { color: '#5C6E84', name: { Eng: 'Reinventing Liberal Arts Education', TC: '重塑博雅教育', SC: '重塑博雅教育' } }
};
const bottomTrackTitle = {
  Eng: 'Hong Kong Education History',
  TC: '香港教育歷史',
  SC: '香港教育历史'
};
// 依目前 activeCategory 與 currentLang 更新左上角「上軌類別標籤」與下軌固定標籤文字
function updateCategoryBadges(){
  const badge = document.getElementById('topCatBadge');
  if(badge){
    if(activeCategory && categoryMap[activeCategory]){
      const info = categoryMap[activeCategory];
      badge.querySelector('.dot').style.color = info.color;
      badge.querySelector('.label').style.color = info.color;
      badge.querySelector('.label').textContent = info.name[langKey()] || '';
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  }
  const bottomLabel = document.getElementById('bottomTrackLabel');
  if(bottomLabel) bottomLabel.querySelector('.label').textContent = bottomTrackTitle[langKey()] || '';
}
// v14-12 需求 5：右下角分類選單改回顯示完整類別名稱（不再是 A~E 單字母
// 代碼）——直接沿用 categoryMap 裡已經有的三語系全名，依目前 langKey()
// 填入每顆 .catBtn 的 .catBtnLabel；語言切換時（見 refreshLangTexts）
// 會重新呼叫這裡，讓分類名稱跟著切換語系更新。
function updateCategoryButtonLabels(){
  document.querySelectorAll('.catBtn').forEach(btn => {
    const c = btn.dataset.c;
    const info = categoryMap[c];
    const lbl = btn.querySelector('.catBtnLabel');
    if(lbl) lbl.textContent = info ? (info.name[langKey()] || '') : c;
  });
}
// 依目前語系抓取 `${field}-${TC|SC|Eng}` 欄位；找不到時盡量退回其他語系，避免開天窗
function L(obj, field){
  if(!obj) return '';
  const key = langKey();
  return obj[`${field}-${key}`] || obj[`${field}-TC`] || obj[`${field}-SC`] || obj[`${field}-Eng`] || '';
}
function str(v){ return (v===undefined || v===null) ? '' : String(v).trim(); }
// 容錯欄位取值：Excel 表頭常見有多餘空白、全形/半形、大小寫不一致等狀況，
// 先嘗試完全比對欄名，找不到時再用「忽略大小寫＋去除所有空白」比對一次，
// 避免因為表頭多打一個空格就整批資料被判定為「找不到欄位」而消失。
// v8 強化：屬性名稱比對時，一併忽略半形／全形空白與大小寫差異
function field(row, name){
  if(row[name] !== undefined) return row[name];
  const norm = s => String(s).toLowerCase().replace(/[\s　]+/g,'');
  const target = norm(name);
  const key = Object.keys(row).find(k => norm(k) === target);
  return key ? row[key] : undefined;
}
// year 欄位容錯轉換：
// - Excel 儲存格若為日期格式（搭配 XLSX.read 的 cellDates:true），SheetJS 會給出 JS Date 物件 → 直接取 getFullYear()
// - 若為純數字（含字串型數字，如 "1971"）→ 直接轉數字
// - 若為含年份的文字（如 "1971年"、"1971/1/1"、"約1971"）→ 擷取字串中第一組四位數年份
// - 皆無法辨識則回傳 NaN（該列稍後會被濾除並印出警告）
function parseYear(v){
  if(v instanceof Date && !isNaN(v.getTime())) return v.getFullYear();
  const s = String(v==null ? '' : v).trim();
  if(!s) return NaN;
  if(/^-?\d+(\.\d+)?$/.test(s)){
    const n = Number(s);
    return Number.isFinite(n) ? Math.trunc(n) : NaN;
  }
  const m = s.match(/(\d{4})/);
  if(m) return Number(m[1]);
  const n = Number(s);
  return Number.isFinite(n) && s !== '' ? Math.trunc(n) : NaN;
}
// relatedTopIds / relatedBottomIds 可能以「;」「；」「,」「，」「/」或多重空白分隔多個 ID；
// 先確認欄位存在再 split，容錯處理全形/半形符號、undefined，避免 undefined.split() 造成整批解析中斷
function splitIds(v){
  if(Array.isArray(v)) return v.map(str).filter(Boolean);
  if(!v) return [];
  return String(v).split(/[;；,，\/\s]+/).map(x => x.trim()).filter(Boolean);
}
// 照片欄位只放檔名／相對路徑（如 p01.jpg、1971-1972/Folder/image.jpg），
// 自動補上 IMAGE_BASE_PATH 前綴；欄位無效或空白則回傳 null（不渲染破圖）
// v7 修補：Excel「插入圖片到儲存格」(IMAGE()/Rich Value) 產生的資料，SheetJS 讀出來會是
// #VALUE!、#N/A 等錯誤字串，或極短的誤植文字（如分類代碼 A~E）；一律視為無效值，
// 避免組出 "images/#VALUE!" 這種必定 404 的路徑
// v9 修補：Windows 檔案總管複製出來的路徑使用反斜線 \（例如 "1971-1972\Folder\image.jpg"），
// 瀏覽器網址一律要用正斜線 /，故在此統一清理：反斜線轉正斜線 → 避免重複補上本機路徑前綴
// → 用 encodeURI() 處理路徑中的空格／中文等特殊字元，避免圖片讀取失敗。
// v14-5 新增：Google Drive 分享連結防呆轉換。
// 使用者常直接把 Google Drive 的「取得連結」網址貼進 Excel 的 photo-1／
// photo-2 欄位，常見格式是：
//   https://drive.google.com/file/d/檔案ID/view?usp=sharing
// 這種網址本質上是「檢視頁面」（一個完整的 HTML 頁面），不是圖片檔案
// 本身，直接拿去當 <img src="..."> 或 Three.js 貼圖來源一定讀不到圖片。
// 這裡用正則表達式擷取 /file/d/ 後面的檔案 ID，改寫成 Google 相簿/頭像
// 服務常用的直接圖片網址格式 https://lh3.googleusercontent.com/d/{ID}，
// 這是業界常見、已被廣泛驗證可行的轉換方式，瀏覽器可以把它當一般圖片
// 直接載入（而不是像 drive.google.com/uc?export=view 那樣，遇到大流量
// 或未登入狀態時容易跳出「無法確認病毒掃描」的中介頁面）。
// 除了最常見的 /file/d/{ID}/ 格式，也順手容錯處理 open?id={ID}、
// uc?id={ID} 這兩種比較少見、但使用者也可能貼上來的分享連結格式。
// 注意：這個轉換能不能成功載入，前提是 Google Drive 檔案的共用設定必須
// 是「知道連結的任何人」都可以檢視，否則不管轉換成哪種網址格式，
// 瀏覽器都會因為沒有權限而載入失敗。
function convertGoogleDriveUrl(url){
  let m = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if(!m) m = url.match(/drive\.google\.com\/(?:open|uc)\?[^#]*\bid=([a-zA-Z0-9_-]+)/i);
  return m ? `https://lh3.googleusercontent.com/d/${m[1]}` : url;
}

function resolvePhoto(filename){
  const f = str(filename);
  if(!f) return null;
  if(/^#(VALUE|N\/A|REF|NAME\?|NULL|DIV\/0!|NUM)/i.test(f)) return null; // Excel 公式錯誤字串
  if(f.length <= 2) return null; // 誤植的分類代碼等非檔名內容

  // 完整網址（http/https）：先檢查是否為 Google Drive 分享連結並轉換成
  // 可直接讀取的圖片網址，再做特殊字元編碼，不套用本機路徑前綴
  if(/^https?:\/\//i.test(f)) return encodeURI(convertGoogleDriveUrl(f));

  // 路徑清理鏈：
  // 1) 去除頭尾空白
  // 2) 反斜線 \ → 正斜線 /（Windows 複製路徑轉為網頁可用路徑）
  let cleanPath = f.trim().replace(/\\/g, '/');

  // 避免 IMAGE_BASE_PATH／images/ 重複前綴：若已經帶有本機路徑前綴，原樣使用；
  // 否則一律補上 IMAGE_BASE_PATH（見檔案開頭「本機圖片路徑設定」常數）
  if(!(cleanPath.startsWith(IMAGE_BASE_PATH) || cleanPath.startsWith('./images/') || cleanPath.startsWith('images/'))){
    cleanPath = IMAGE_BASE_PATH + cleanPath;
  }

  // 處理路徑中的空格與特殊字元（含中文檔名／資料夾名稱），避免瀏覽器讀取圖片失敗
  return encodeURI(cleanPath);
}

function normalizeTopRow(row){
  return {
    id: String(field(row,'id') || '').trim(),
    year: parseYear(field(row,'year')),
    'title-Eng': str(field(row,'title-Eng')) || '', 'title-TC': str(field(row,'title-TC')) || '', 'title-SC': str(field(row,'title-SC')) || '',
    'content-Eng': str(field(row,'content-Eng')) || '', 'content-TC': str(field(row,'content-TC')) || '', 'content-SC': str(field(row,'content-SC')) || '',
    category: str(field(row,'category')).toUpperCase(),
    relatedBottomIds: splitIds(field(row,'relatedBottomIds'))
  };
}
function normalizeBottomRow(row){
  return {
    id: String(field(row,'id') || '').trim(),
    year: parseYear(field(row,'year')),
    'title-Eng': str(field(row,'title-Eng')) || '', 'title-TC': str(field(row,'title-TC')) || '', 'title-SC': str(field(row,'title-SC')) || '',
    'content-Eng': str(field(row,'content-Eng')) || '', 'content-TC': str(field(row,'content-TC')) || '', 'content-SC': str(field(row,'content-SC')) || '',
    category: str(field(row,'category')).toUpperCase(),
    // v8 新增：「下軌事件」分頁若額外填了 relatedTopIds 欄位（非必要欄位，預設為空陣列），
    // 會與「上軌事件」分頁的 relatedBottomIds 一起在 buildDataset() 中做雙向自動補齊
    relatedTopIds: splitIds(field(row,'relatedTopIds'))
  };
}
function normalizePhotoRow(row){
  return {
    id: String(field(row,'id') || '').trim(),
    year: parseYear(field(row,'year')),
    photoSrc: resolvePhoto(field(row,'photo-1')) || resolvePhoto(field(row,'photo-2')),
    // v7 新增：photo-1 / photo-2 兩欄位都保留，供 Modal 顯示「第二張照片」縮圖使用
    photoSrc2: (resolvePhoto(field(row,'photo-1')) && resolvePhoto(field(row,'photo-2'))) ? resolvePhoto(field(row,'photo-2')) : null,
    'title-Eng': str(field(row,'title-Eng')) || '', 'title-TC': str(field(row,'title-TC')) || '', 'title-SC': str(field(row,'title-SC')) || '',
    'content-Eng': str(field(row,'content-Eng')) || '', 'content-TC': str(field(row,'content-TC')) || '', 'content-SC': str(field(row,'content-SC')) || '',
    relatedTopIds: splitIds(field(row,'relatedTopIds')),
    relatedBottomIds: splitIds(field(row,'relatedBottomIds')),
    category: str(field(row,'category')).toUpperCase()
  };
}

// 依三個分頁的原始資料列，組出畫面所需的關聯索引（相片↔上軌／相片↔下軌／下軌↔上軌）
function buildDataset(topRows, bottomRows, photoRows){
  const top = topRows.map(normalizeTopRow).filter(r => r.id && Number.isFinite(r.year));
  const bottom = bottomRows.map(normalizeBottomRow).filter(r => r.id && Number.isFinite(r.year));
  const photos = photoRows.map(normalizePhotoRow).filter(r => r.id && Number.isFinite(r.year))
    .map((p, i) => ({ ...p, index: i }));

  // 偵錯用：若解析結果有任何一批是 0 筆，通常代表 Excel 分頁/欄名（id、year、title-TC…）
  // 與規格不符，或表頭列前面還有多餘的說明列，印出來方便在 F12 檢查
  if(top.length === 0) console.warn('⚠️ 上軌事件解析結果為 0 筆，請檢查「上軌事件」分頁的欄位名稱（id / year / title-TC…）是否正確');
  if(bottom.length === 0) console.warn('⚠️ 下軌事件解析結果為 0 筆，請檢查「下軌事件」分頁的欄位名稱是否正確');
  if(photos.length === 0) console.warn('⚠️ 照片列解析結果為 0 筆，請檢查「照片列」分頁的欄位名稱是否正確');

  const topPhotoMap = {}, bottomPhotoMap = {};
  photos.forEach(p => {
    p.relatedTopIds.forEach(tid => (topPhotoMap[tid] = topPhotoMap[tid] || []).push(p.index));
    p.relatedBottomIds.forEach(bid => (bottomPhotoMap[bid] = bottomPhotoMap[bid] || []).push(p.index));
  });

  // v8 強化：雙向關聯自動補齊。
  // 若「上軌事件」填了 relatedBottomIds，或「下軌事件」填了 relatedTopIds（其中一方漏填也沒關係），
  // 一律在記憶體中合併成完整的雙向索引，確保上／下軌彼此都能找到對方。
  const topBottomSet = {}, bottomTopSet = {};
  function linkTopBottom(topId, bottomId){
    if(!topId || !bottomId) return;
    (topBottomSet[topId] = topBottomSet[topId] || new Set()).add(bottomId);
    (bottomTopSet[bottomId] = bottomTopSet[bottomId] || new Set()).add(topId);
  }
  top.forEach(t => t.relatedBottomIds.forEach(bid => linkTopBottom(t.id, bid)));
  bottom.forEach(b => (b.relatedTopIds || []).forEach(tid => linkTopBottom(tid, b.id)));

  const topFinal = top.map(t => ({
    ...t,
    relatedBottomIds: Array.from(topBottomSet[t.id] || []),
    relatedPhotoIds: topPhotoMap[t.id] || []
  }));
  const bottomFinal = bottom.map(b => ({
    ...b,
    relatedTopIds: Array.from(bottomTopSet[b.id] || []),
    relatedPhotoIds: bottomPhotoMap[b.id] || []
  }));

  // 依需求印出解析後的完整陣列，方便在瀏覽器 F12 主控台檢查資料結構
  console.log('topEvents (上軌事件):', topFinal);
  console.log('bottomEvents (下軌事件):', bottomFinal);
  console.log('photos (照片列):', photos);
  return { topRows: topFinal, bottomRows: bottomFinal, photoRows: photos };
}

/* ---------------------------------------------------------
   0b. 資料容器（尚未匯入 Excel 前為空，畫面改由 #importHint 提示使用者匯入）
   欄位形狀與真正的 Excel 分頁完全一致，Excel 匯入後會透過 applyDataset()
   就地清空並重新填入，其餘函式皆透過同一個參照讀取，不需要另外重新綁定任何 const
   --------------------------------------------------------- */
const topMilestones = [], bottomMilestones = [], photosData = [];
const topById = {}, bottomById = {};

function applyDataset(ds){
  topMilestones.length = 0; topMilestones.push(...ds.topRows);
  bottomMilestones.length = 0; bottomMilestones.push(...ds.bottomRows);
  photosData.length = 0; photosData.push(...ds.photoRows);
  Object.keys(topById).forEach(k => delete topById[k]);
  Object.keys(bottomById).forEach(k => delete bottomById[k]);
  topMilestones.forEach(m => topById[m.id] = m);
  bottomMilestones.forEach(m => bottomById[m.id] = m);
}

/* 匯入結果存在這個瀏覽器的 localStorage，重新整理後仍可還原；沒有預設紀錄。 */
const STORAGE_KEY = 'hksyu-timeline-workbook-v1';

function sanitizeCell(v){
  if(v instanceof Date && !isNaN(v.getTime())) return v.getFullYear();
  if(v === undefined || v === null) return '';
  if(typeof v === 'number' && Number.isFinite(v)) return v;
  if(typeof v === 'boolean') return v;
  return String(v);
}
function serializeRows(rows){
  return (rows || []).map(row => {
    const out = {};
    Object.keys(row || {}).forEach(k => { out[k] = sanitizeCell(row[k]); });
    return out;
  });
}
function emptyDataset(){
  return { topRows: [], bottomRows: [], photoRows: [] };
}
function saveWorkbookCache(raw, fileName){
  try{
    const payload = {
      version: 1,
      fileName: fileName || '',
      savedAt: Date.now(),
      topRows: serializeRows(raw.topRows),
      bottomRows: serializeRows(raw.bottomRows),
      photoRows: serializeRows(raw.photoRows)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  }catch(err){
    console.warn('無法寫入本機紀錄', err);
    return false;
  }
}
function loadWorkbookCache(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const data = JSON.parse(raw);
    if(!data || !Array.isArray(data.topRows) || !Array.isArray(data.bottomRows) || !Array.isArray(data.photoRows)) return null;
    return data;
  }catch(err){
    console.warn('無法讀取本機紀錄', err);
    return null;
  }
}
function clearWorkbookCache(){
  try{ localStorage.removeItem(STORAGE_KEY); }catch(err){ /* ignore */ }
}
function setDataChrome(hasData, statusText){
  const hint = document.getElementById('importHint');
  const clearBtn = document.getElementById('excelClearBtn');
  const statusEl = document.getElementById('excelStatus');
  if(hint) hint.classList.toggle('hidden', !!hasData);
  if(clearBtn) clearBtn.hidden = !hasData;
  if(statusEl && statusText !== undefined) statusEl.textContent = statusText || '';
}
function uiCopy(){
  return UI_TEXT[currentLang] || UI_TEXT['zh-Hant'];
}
function refreshImportHintCopy(){
  const titleEl = document.querySelector('#importHint strong');
  const bodyEl = document.querySelector('#importHint span');
  const txt = uiCopy();
  if(titleEl) titleEl.textContent = txt.importTitle;
  if(bodyEl) bodyEl.textContent = txt.importBody;
}

function photoDetail(idx){
  const p = photosData[idx];
  const relTop = p.relatedTopIds.map(id => topById[id]).filter(Boolean).map(m => L(m,'title'));
  const relBottom = p.relatedBottomIds.map(id => bottomById[id]).filter(Boolean).map(m => L(m,'title'));
  const rel = [...relTop, ...relBottom];
  const ownContent = L(p, 'content');
  const desc = ownContent || (rel.length
    ? `此影像與「${rel[0]}」等 ${rel.length} 項事件相關，記錄了 ${Math.floor(p.year)} 年前後樹仁校園與社會的一段片刻。`
    : `${Math.floor(p.year)} 年的校園片刻，靜靜存放在時光鏈之中。`);
  return { title: L(p,'title'), desc, year: p.year, photoSrc: p.photoSrc, photoSrc2: p.photoSrc2 };
}

/* =========================================================
   1. GLOBAL YEAR <-> PIXEL MAPPING
   ========================================================= */
// PHOTO_W / FRAME_PAD 提前到這裡宣告（原本在下面「2. THREE.JS PHOTO
// CHAIN」區塊），因為下面的年份縮放邏輯需要用相框寬度計算同年份照片
// 群組的視覺跨距，兩者必須共用同一份尺寸常數，避免各算各的、間距對不上。
const PHOTO_W = 224, PHOTO_H = 168;
const FRAME_PAD = 12;
const BASE_Y = 0;

// v14-3 修補：使用者反映「PPY 拉到 3000、時間軸總長 14 萬像素」太極端，
// 希望（1）同年份照片改回原本的橫向展開排列、且允許小幅重疊（不用像
// 之前那樣完全不重疊、間距被壓得極小或極大），（2）年份與年份之間的
// 距離不要整條時間軸統一拉長，而是「哪個年份的照片事件多，就跟前一個
// 年份拉開比較多距離；照片少或沒有照片的年份，維持原本 90px/年的正常
// 間距」——也就是把「每年固定寬度（PPY）」改成「依內容量而變動寬度」
// 的非均勻時間軸。
//
// 做法：
//   1) CLUSTER_STEP：同一年份內，相鄰兩張照片中心點的橫向間距。刻意
//      設成小於「一張相框的完整寬度」，讓同年份的照片彼此有小幅重疊
//      （約 25%），維持原本橫向排開的視覺效果，但不會像完全不重疊時
//      那樣占用大量水平空間。
//   2) 針對每一個年份 Y，先算出它自己的照片橫向總跨距的一半
//      （halfWidth），跟前一年 Y-1 的 halfWidth 相加，再加上一個固定的
//      呼吸空間（CLUSTER_MARGIN），就是「Y-1 到 Y 至少需要的像素距離」；
//      如果這個需求小於基準年距（BASE_YEAR_GAP＝之前已確認過、觀感正常
//      的 90px/年），就用基準年距。換句話說：沒什麼照片的年份彼此間距
//      維持 90px 不變，只有真的塞了很多照片的年份（例如實際資料中的
//      2024／2025／2017／2006／2026）才會被推開，且只推開「剛好足夠
//      讓兩邊的照片群組不會互相重疊」的距離，不會影響其他年份。
//   3) 因為每個年份區間的寬度不再相同，yearToVX()／vxToYear() 改用
//      「逐年累加的前綴和陣列」做線性內插／反查，取代原本單純的
//      (year-YEAR_MIN)*PPY 乘法。這份累加陣列會在每次 Excel 重新匯入、
//      photosData 內容改變後，透過 rebuildYearScale() 重新計算。
// v14-4 修補：YEAR_SPAN 也改成 let——年份範圍本身（YEAR_MIN/YEAR_MAX）
// 現在會依 Excel 資料動態改變（見下方 updateYearRange()），YEAR_SPAN
// 必須跟著重新計算，不能再是常數。
let YEAR_SPAN = YEAR_MAX - YEAR_MIN;
const BASE_YEAR_GAP = 130;
const CLUSTER_STEP = Math.round((PHOTO_W + FRAME_PAD * 2) * 0.75);
const CLUSTER_MARGIN = 160;

let TOTAL_VIRTUAL_W = 0;
let yearScaleCum = []; // yearScaleCum[i] = 第 (YEAR_MIN+i) 年在虛擬畫布上的起始像素座標

// v14-4 新增：時間軸的起訖年份不再寫死為 1971–2026，改成每次 Excel
// 匯入後，掃過上軌／下軌／照片列三個分頁「目前實際讀到」的所有年份，
// 取其中最舊與最新的作為 YEAR_MIN／YEAR_MAX。若三個分頁全部是空的
// （例如匯入失敗、或還沒匯入過），則維持目前的範圍不變，避免整條時間
// 軸的長度被重置成 0 或出現 NaN。
function updateYearRange(){
  const years = [];
  topMilestones.forEach(m => { if(Number.isFinite(m.year)) years.push(m.year); });
  bottomMilestones.forEach(m => { if(Number.isFinite(m.year)) years.push(m.year); });
  photosData.forEach(p => { if(Number.isFinite(p.year)) years.push(p.year); });
  if(!years.length) return;
  let mn = Math.floor(Math.min(...years));
  let mx = Math.ceil(Math.max(...years));
  if(mn === mx) mx = mn + 1; // 避免資料只集中在單一年份時 YEAR_SPAN=0，導致除以零
  YEAR_MIN = mn; YEAR_MAX = mx;
  YEAR_SPAN = YEAR_MAX - YEAR_MIN;
}

function computeYearHalfWidths(){
  const photoCounts = {};
  photosData.forEach(p => { photoCounts[p.year] = (photoCounts[p.year] || 0) + 1; });
  const eventCounts = {};
  topMilestones.forEach(m => { eventCounts[m.year] = (eventCounts[m.year] || 0) + 1; });
  bottomMilestones.forEach(m => { eventCounts[m.year] = (eventCounts[m.year] || 0) + 1; });
  const years = new Set([...Object.keys(photoCounts), ...Object.keys(eventCounts)]);
  const fs = (typeof fontScaleNow === "function" ? fontScaleNow() : 1.5);
  const cardHalf = 110 * fs;
  const halfWidths = {};
  years.forEach((y) => {
    const nPhoto = photoCounts[y] || 0;
    const photoHalf = nPhoto > 1 ? (nPhoto - 1) / 2 * CLUSTER_STEP : 0;
    const nEvent = eventCounts[y] || 0;
    const extra = Math.max(0, nEvent - 3);
    const eventHalf = (nEvent > 0 ? cardHalf * 0.55 : 0) + extra * 70 * fs;
    halfWidths[y] = Math.max(photoHalf, eventHalf);
  });
  return halfWidths;
}

// 依目前 photosData 的年份分佈，重新計算「逐年累加像素座標」；Excel 每次
// 重新匯入（資料筆數、年份分佈都可能改變）都必須呼叫一次，畫面初始載入
// （photosData 尚為空陣列）也會呼叫一次，得到全部年份都是 BASE_YEAR_GAP
// 的預設均勻時間軸。
function rebuildYearScale(){
  const halfWidths = computeYearHalfWidths();
  yearScaleCum = new Array(YEAR_SPAN + 1);
  yearScaleCum[0] = 0;
  const minGap = Math.round(90 + 70 * fontScaleNow());
  for(let i = 1; i <= YEAR_SPAN; i++){
    const y = YEAR_MIN + i;
    const prevHalf = halfWidths[y - 1] || 0;
    const curHalf = halfWidths[y] || 0;
    const gap = Math.max(minGap, prevHalf + curHalf + CLUSTER_MARGIN);
    yearScaleCum[i] = yearScaleCum[i - 1] + gap;
  }
  TOTAL_VIRTUAL_W = yearScaleCum[YEAR_SPAN];
}

function yearToVX(year){
  const y = clamp(year, YEAR_MIN, YEAR_MAX);
  const idx = y - YEAR_MIN;
  const i0 = Math.floor(idx);
  const i1 = Math.min(i0 + 1, YEAR_SPAN);
  const frac = idx - i0;
  return yearScaleCum[i0] + (yearScaleCum[i1] - yearScaleCum[i0]) * frac;
}

function vxToYear(vx){
  const v = clamp(vx, 0, TOTAL_VIRTUAL_W);
  let lo = 0, hi = YEAR_SPAN;
  while(lo < hi){
    const mid = (lo + hi + 1) >> 1;
    if(yearScaleCum[mid] <= v) lo = mid; else hi = mid - 1;
  }
  const i0 = lo, i1 = Math.min(lo + 1, YEAR_SPAN);
  const seg = yearScaleCum[i1] - yearScaleCum[i0];
  const frac = seg > 0 ? (v - yearScaleCum[i0]) / seg : 0;
  return YEAR_MIN + i0 + frac;
}

function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

rebuildYearScale(); // 初始（尚未匯入 Excel）先建立一份全年份等距的預設時間軸

let focusPx = TOTAL_VIRTUAL_W * 0.5;
let targetFocusPx = focusPx;

/* =========================================================
   2. THREE.JS PHOTO CHAIN
   ========================================================= */
const stage = document.getElementById('stage');
const host = document.getElementById('threeHost');
let W = stage.clientWidth, H = stage.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-W/2, W/2, H/2, -H/2, -1000, 1000);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(W, H);
// 明確開啟 renderer.sortObjects（Three.js 預設其實就是 true，這裡明確
// 寫出來只是為了防呆——避免日後有人不小心把它關掉，導致 renderOrder
// 完全失效、退回場景圖新增順序決定畫面疊放）。
renderer.sortObjects = true;
host.appendChild(renderer.domElement);

const chainGroup = new THREE.Group();
scene.add(chainGroup);

const loader = new THREE.TextureLoader();

/* ---------------------------------------------------------
   2a. 相片鏈貼圖載入（修復「Three.js 畫布全部顯示白色方塊」問題）
   問題根因：THREE.TextureLoader 內部會建立一個 <img> 元素並在設定 src
   之前先設定 img.crossOrigin。若把 loader.crossOrigin 固定寫死為
   'anonymous'（舊版做法），本機相對路徑（./images/...）在 file:// 協定
   下、或某些沒有正確回應 CORS 標頭的本機伺服器環境中，瀏覽器會直接讓
   這個帶 crossOrigin 屬性的 <img> 載入失敗（不會觸發 onLoad，材質沒有
   map，只剩下 MeshBasicMaterial 預設的純白色 → 整條相片鏈變成白色方塊）。
   Modal 彈窗用的原生 <img id="modalImg"> 完全沒有設定 crossorigin 屬性，
   所以同一個網址在那邊能正常顯示 —— 這正是兩邊表現不一致的原因。

   修法：只有「絕對網址（http/https，可能跨網域）」才需要
   crossOrigin='anonymous'，讓 WebGL 合法讀取跨網域圖片的像素資料；
   本機相對路徑一律不設定 crossOrigin，避免上述 file:// 載入失敗的問題。

   v14-5 補充：Google Drive 圖片（經上面 convertGoogleDriveUrl() 轉換成
   https://lh3.googleusercontent.com/d/{ID} 之後）本質上也是一般的
   http(s) 絕對網址，會自動落入下面 isAbsoluteUrl 為 true 的分支、拿到
   crossOrigin='anonymous'，不需要另外特別處理。這裡刻意不把
   crossOrigin 寫死成固定的 'anonymous'（例如在建立 loader 時只呼叫一次
   loader.setCrossOrigin('anonymous') 就不再變動），是因為那樣會讓本機
   相對路徑（./images/...）在 file:// 協定下重新出現最上面說明的白色
   方塊問題——所以維持「每次載入前依網址類型動態決定」的做法，只是把
   賦值方式換成 THREE.Loader 內建的 setCrossOrigin()（等同直接設定
   .crossOrigin 屬性，寫法上更貼近 Three.js 官方 API）。
   --------------------------------------------------------- */
function loadPhotoTexture(url, onLoad, onError){
  const isAbsoluteUrl = /^https?:\/\//i.test(url);
  // 重要修正：THREE.Loader 的 crossOrigin 預設值本來就是 'anonymous'（在
  // THREE.Loader 建構子裡設定），且 TextureLoader 內部的判斷式是
  // 「this.crossOrigin !== undefined 時才把值指定給 <img>.crossOrigin」。
  // 這代表就算把 loader.crossOrigin 設成空字串 ''，因為 '' !== undefined，
  // 底層還是會執行 image.crossOrigin = ''，而瀏覽器對 crossorigin 屬性的
  // 規範是「空字串等同 anonymous」——實測結果 img.crossOrigin 依然會讀回
  // 'anonymous'，完全沒有真正關閉 CORS 模式！這正是先前那版「已經改了
  // 卻還是全白／載入不出來」的真正原因。
  // 本機相對路徑（file:// 或沒有正確回應 CORS 標頭的環境）一旦被要求用
  // CORS 模式讀取，瀏覽器經常會直接讓載入失敗；必須指定 undefined
  // （讓上面那個 !== undefined 判斷式整段跳過，等同完全不去動
  // <img>.crossOrigin，瀏覽器就會用一般、非 CORS 的方式讀取本機圖片）
  // 才能真正解決問題。只有真的是跨網域的 http(s) 網址（包含轉換後的
  // Google Drive 圖片網址）才需要 'anonymous'。
  loader.setCrossOrigin(isAbsoluteUrl ? 'anonymous' : undefined);
  return loader.load(
    url,
    (texture) => {
      // 貼圖成功載入後，明確標記 needsUpdate，確保 WebGL 於下一次
      // renderer.render() 時重新上傳這張材質（animate() 迴圈本身就是
      // 60fps 持續呼叫 render()，所以不需要額外手動觸發重新渲染）。
      texture.needsUpdate = true;
      if(typeof onLoad === 'function') onLoad(texture);
    },
    undefined,
    (err) => {
      console.error('Three.js 貼圖載入失敗：', url, err);
      if(typeof onError === 'function') onError(err);
    }
  );
}

const meshes = [];

// 清空並釋放既有的相片 mesh（Excel 重新匯入時使用），避免記憶體洩漏與殘影
function disposePhotoMeshes(){
  meshes.forEach(m => {
    chainGroup.remove(m.holder);
    m.mesh.geometry.dispose(); m.mesh.material.map && m.mesh.material.map.dispose(); m.mesh.material.dispose();
    m.frame.geometry.dispose(); m.frame.material.dispose();
  });
  meshes.length = 0;
}

/* ---------------------------------------------------------
   2a-1. 相片鏈同年份防重疊（Photo Chain Cluster Layout）
   原始問題：photo mesh 的水平位置嚴格等於 yearToVX(year)，同一年份若有
   多張照片，會全部疊在同一個 x 座標上，只有最前面（renderOrder 最高）
   的那一張看得到，其餘的視覺上完全被蓋住 ——「同年多個事件被隱藏」在
   照片鏈這一側的成因。
   --------------------------------------------------------- */
// v14-3 修補：改回單純的橫向展開排列（拿掉 v14 第一版的縱向交錯堆疊），
// 同年份的照片彼此間距使用上面宣告的 CLUSTER_STEP（略小於一張完整相框
// 寬度，允許小幅重疊），跟 rebuildYearScale() 用來預留年份間距的
// half-width 計算共用同一個常數，確保「這裡展開多遠」跟「上面幫這個
// 年份多留了多少空間」永遠一致，不會出現同年份照片跑到相鄰年份範圍的
// 情況。
function computePhotoClusterOffsets(){
  const yearGroups = {};
  photosData.forEach(p => { (yearGroups[p.year] = yearGroups[p.year] || []).push(p); });

  const offsetByIndex = {};
  Object.values(yearGroups).forEach(group => {
    const n = group.length;
    // clusterHalfWidth：這個年份的照片群組橫向展開後、離中心最遠的照片
    // 距中心多遠。calculateChainLayout() 會拿它來讓同一年份的多張照片
    // 呈現「中間高、兩側略低」的自然弧形起伏，而不是整批一起彈到完全
    // 一樣的高度。
    const clusterHalfWidth = n > 1 ? (n - 1) / 2 * CLUSTER_STEP : 0;
    group.forEach((p, i) => {
      const centered = i - (n - 1) / 2;
      offsetByIndex[p.index] = { offsetX: centered * CLUSTER_STEP, offsetY: 0, clusterHalfWidth };
    });
  });
  return offsetByIndex;
}

// 依目前 photosData 建立相片鏈 mesh；photoSrc 為 null（照片欄位空白或無效）時，
// 直接略過 texture 載入，只留下相框底色，避免出現破圖
function buildPhotoMeshes(){
  const clusterLayoutByIndex = computePhotoClusterOffsets();

  photosData.forEach((p) => {
    const vx = yearToVX(p.year);
    const clusterLayout = clusterLayoutByIndex[p.index] || { offsetX: 0, offsetY: 0, clusterHalfWidth: 0 };

    const frameGeo = new THREE.PlaneGeometry(PHOTO_W + FRAME_PAD*2, PHOTO_H + FRAME_PAD*2);
    // v14-9 修補：Depth Fighting 的真正成因——半透明（transparent:true）
    // 材質預設 depthWrite 也是 true，代表每一個相框/照片平面在畫的時候
    // 都會把自己的深度值寫進深度緩衝區。當同一年份的多張照片彼此小幅
    // 重疊、Z 座標又非常接近時（見 calculateChainLayout 的三層階梯：
    // 0／30／50），先畫到的半透明物體寫入的深度值，可能會讓「照理說該
    // 疊在上面」的另一個半透明物體被深度測試擋住／局部裁切掉一角，而不
    // 是正確地做半透明混色——這正是「置中照片視覺上沒有突出來、還會被
    // 旁邊卡片擋住」的 Depth Fighting 現象。標準解法：半透明物體一律
    // 關閉 depthWrite（不寫入深度緩衝區），只保留 depthTest（讀取深度、
    // 仍然會被真正的不透明物體正確遮擋），疊放順序完全交給下面
    // calculateChainLayout() 明確設定的 renderOrder 決定，不再讓深度緩衝
    // 區介入半透明物體之間互相搶疊放順序。
    //
    // v14-10 補充說明（為什麼這裡沒有照需求把 transparent 改成 false）：
    // applyHighlight()（見下方「同一批相關／不相關照片」的滑鼠 hover／
    // 選取效果）會用 gsap 把非相關照片的 frame/mesh 材質 opacity 動畫到
    // 0.25 做淡化效果——這個功能只有在 transparent:true 時才會真的產生
    // 視覺效果（Three.js 的 MeshBasicMaterial 在 transparent:false 時會
    // 完全忽略 opacity，永遠畫成完全不透明），如果照需求整個關掉
    // transparent，這個既有的淡化提示功能會直接失效、悄悄壞掉。因此這裡
    // 保留 transparent:true + depthWrite:false 的組合（半透明物件的標準
    // 疊放解法），改成用大幅拉開的 Z 落差（見 calculateChainLayout 的
    // BASE_Z/LIFT_Z/MAX_Z，從原本 0/30/50 拉開到 -80/0/150）＋強制
    // renderOrder 分層，雙重保險確保置中照片一定蓋在最上面。
    const frameMat = new THREE.MeshBasicMaterial({ color: 0xfaf8f3, transparent:true, opacity:.95, side: THREE.DoubleSide, depthTest:true, depthWrite:false });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.z = -0.5;
    // v14-17：相框（白色外框）也要能被點擊。原本 raycaster 只掃 m.mesh
    // （純照片區），使用者點在照片外圍那圈 12px 的白框上時會完全掃不到
    // 任何東西，被判定成「點到空白處」→ resetSelection()，表現出來就是
    // 「點了圖片沒反應」。這裡讓 frame 也帶上同一個 photoIndex。
    frame.userData.photoIndex = p.index;

    const geo = new THREE.PlaneGeometry(PHOTO_W, PHOTO_H);
    // 貼圖載入完成前，先用柔和的淺灰米色（#EAE6E1）當底色，而不是預設的
    // 亮白色 0xffffff —— 這樣即使某張照片真的載入失敗，畫面上呈現的是
    // 一塊安靜的留白卡片，而不是刺眼、容易被誤認為「全部沒載入」的純白方塊。
    // 同樣關閉 depthWrite——雖然這張照片本身 opacity 是 1（視覺上不透
    // 明），但因為 transparent 旗標仍是 true，Three.js 還是會把它送進
    // 半透明渲染佇列，一樣需要關閉 depthWrite 才能避免上述的 Depth
    // Fighting 問題。
    const PLACEHOLDER_COLOR = 0xEAE6E1;
    const mat = new THREE.MeshBasicMaterial({
      color: PLACEHOLDER_COLOR, transparent:true, opacity:1, side: THREE.DoubleSide, depthTest:true, depthWrite:false
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.photoIndex = p.index;
    if(p.photoSrc){
      loadPhotoTexture(
        p.photoSrc,
        (texture) => {
          mat.map = texture;
          // 貼圖成功後把材質底色改回純白，避免 PLACEHOLDER_COLOR 以
          // 「材質色 × 貼圖顏色」的方式疊加，讓照片出現偏色／變暗的情況。
          mat.color.setHex(0xffffff);
          mat.needsUpdate = true;
        },
        () => { /* 載入失敗：保留 PLACEHOLDER_COLOR 底色，不強行顯示破圖 */ }
      );
    }

    const holder = new THREE.Group();
    holder.add(frame); holder.add(mesh);
    chainGroup.add(holder);

    meshes.push({
      holder, mesh, frame, index:p.index, vx, year:p.year,
      clusterOffsetX: clusterLayout.offsetX, clusterOffsetY: clusterLayout.offsetY,
      clusterHalfWidth: clusterLayout.clusterHalfWidth || 0,
      baseY: BASE_Y, extraShift:0, catFilteredOut:false, elevateOffset:0, elevated:false
    });
  });
}
buildPhotoMeshes();

let expandedPhotoIndex = null;

// v14-7 修改：取消連續的高斯波浪弧度，改成「只有目前對焦的年份整批彈起，
// 其餘年份一律固定在基準水平線」的二選一效果——之前 gauss 是連續函數，
// 離對焦年份越遠、抬升量越低，會做出一整排照片連續起伏的波浪視覺；
// 這裡改成非黑即白的判斷（m.year === currentYear），視覺上更簡潔俐落。
// 因為改成二選一之後，年份切換時目標值會有階梯式的跳動（不像連續函數
// 那樣本來就平滑），所以另外用逐幀 Lerp（線性插值）讓 Y／Scale／Z 三個
// 動畫屬性都平滑地朝目標值靠近，而不是瞬間跳過去。
const LIFT_Y = 64;       // 彈起高度（沿用原本 MAX_LIFT 的數值，維持跟之前差不多的視覺幅度）
const LIFT_SCALE = 1.15; // 彈起時的放大倍率，讓目前對焦的照片更顯眼突出
const LERP_SPEED = 0.1;  // 每幀朝目標值移動的比例，數值越大彈起/落下的過渡越快

// v14-8 修改：同一年份多張照片一起彈起時，額外做「置中照片 Z 軸階梯拉近」——
// 目前對焦年份的整批照片先一起往前推到 LIFT_Z，其中「最置中」的那一張
// （clusterOffsetX 最接近 0；同分時取 Excel 資料順序最前面那張）再往前
// 多推一階到 MAX_Z，讓它明確地壓在同一批彈起的其他照片上面，形成三層
// 階梯：非對焦年份（BASE_Z）＜同批彈起但非置中（LIFT_Z）＜置中（MAX_Z）。
// v14-10 修補：把三層階梯的 Z 落差大幅拉開（原本 0／30／50，級距只有
// 20~30），改成 -80／0／150，級距拉大到 80~150——即使 renderOrder／
// depthWrite 的邏輯完全正確，太小的 Z 落差在極端情況下（例如 Lerp 過渡
// 到一半、或攝影機/深度緩衝精度的邊界情況）安全邊際也太薄。這裡直接把
// 「置中照片」推到遠比其他任何照片都靠近攝影機的位置，「非對焦年份」則
// 明確推遠到基準面之後，確保就算只靠 Z 值本身（不靠 renderOrder）做深度
// 判斷，置中照片也毫無疑問會蓋在最上面。
const BASE_Z = -80;  // 非對焦年份：明確推到基準面之後，跟對焦年份拉開安全距離
const LIFT_Z = 0;    // 對焦年份整批彈起、但非置中的照片：維持在基準面
const MAX_Z = 150;   // 置中照片：大幅拉近，確保視覺上蓋過同批與所有其他照片
// renderOrder 三個層級，數字越大越晚畫（蓋在越上面）：
const RENDER_ORDER_CENTER = 1000;      // 置中照片：一定蓋過同一批彈起的其他照片
const RENDER_ORDER_ACTIVE_BASE = 500;  // 同批彈起、非置中的照片：蓋過所有非對焦年份

// v14-11：記錄「上一次印出 console.log 的置中照片 index」，讓下面的偵錯
// log 只在置中照片真的換人時才印一次，而不是每一幀（每秒最多印 60 次）洗版。
let lastLoggedCenterIndex = null;

function calculateChainLayout() {
  // currentYear：把目前對焦的像素位置換算回年份、四捨五入成整數，作為
  // 「這是不是同一年」的二選一判斷依據。focusPx 本身在 animate() 的
  // 動畫迴圈裡已經是平滑內插的結果（focusPx += (targetFocusPx-focusPx)*0.1），
  // 所以拖曳/捲動時 currentYear 也會跟著平滑地跨越整數年份邊界。
  const currentYear = Math.round(vxToYear(focusPx));

  // v14-11 重構：改用「即時螢幕座標與畫面正中央（X=0）的絕對距離」來判定
  // 置中照片（isTargeted），取代原本只比較 clusterOffsetX（同一群組內的
  // 靜態相對位置、不含 focusPx／extraShift）的寫法。這裡的 rawX 用的是
  // 跟下面第二個迴圈完全同一條公式（m.vx + m.clusterOffsetX + m.extraShift
  // - focusPx），也就是這張照片「這一幀實際會被畫在畫面上的 X 座標」，
  // 對照 camera 是正對著 X=0 看（見 camera 建立時沒有額外 position.x
  // 偏移），所以 Math.abs(rawX) 就是「離螢幕正中央的距離」，跟你要的
  // Math.abs(photo.position.x - camera.position.x) 是等價的算法，只是這裡
  // 用 holder 的目標水平位置直接算，不用等 Three.js 內部的 world matrix
  // 更新才能讀到。先把所有照片的 isTargeted 重置為 false，再挑出距離最小
  // 的那一張設成 true——不限定一定要跟 currentYear 同一年份，真正做到
  // 「距離導向」而不是「先篩年份再挑群組中心」。
  let centerIndex = null, centerMinAbsDist = Infinity;
  meshes.forEach(m => {
    m.isTargeted = false; // 每幀先全部重置，避免舊的置中狀態殘留
    const liveX = (m.vx + m.clusterOffsetX + m.extraShift) - focusPx;
    const absDist = Math.abs(liveX);
    if (absDist < centerMinAbsDist) { centerMinAbsDist = absDist; centerIndex = m.index; }
  });
  if (centerIndex !== null) {
    // 用 find 而不是直接拿 index 當陣列下標——meshes 的建立順序目前雖然
    // 剛好跟 index 一致，但用 find 查找不依賴這個隱含假設，更不容易踩雷。
    const centerMeshObj = meshes.find(m => m.index === centerIndex);
    centerMeshObj.isTargeted = true;
    // Console 驗證（只在「置中的照片真的換了」那一刻印一次，而不是每幀
    // 印 60 次洗版）：F12 打開 DevTools 後應該能看到年份切換時這裡跟著跳動，
    // 若這裡完全不動或一直是 undefined/null，才代表判定邏輯真的有問題。
    if (lastLoggedCenterIndex !== centerIndex) {
      lastLoggedCenterIndex = centerIndex;
      const p = photosData.find(pd => pd.index === centerIndex);
      console.log('[相片鏈] 當前置中照片 isTargeted →',
        'index=', centerIndex,
        'year=', centerMeshObj.year,
        'id=', p ? p.id : '(找不到對應 photosData)',
        'title=', p ? (p['title-TC'] || p['title-Eng'] || p['title-SC']) : '',
        'minAbsDist(px)=', Math.round(centerMinAbsDist));
    }
  } else if (lastLoggedCenterIndex !== null) {
    lastLoggedCenterIndex = null;
    console.log('[相片鏈] 當前沒有任何照片可被判定為置中（meshes 是空的？）');
  }

  meshes.forEach((m) => {
    // 水平位置：直接依實際像素座標計算，不需要另外 lerp——focusPx 本身
    // 已經是平滑內插後的結果，rawX 自然就會跟著平滑變化，不會頓挫。
    const rawX = (m.vx + m.clusterOffsetX + m.extraShift) - focusPx;
    m.holder.position.x = rawX;

    const isActive = (m.year === currentYear);
    const isCenter = m.isTargeted;

    // 同一年份的多張照片允許小幅重疊（見 CLUSTER_STEP），centerCloseness
    // 是「離自己所屬群組中心多近」（0~1），用來在同一層級內做微調排序，
    // 讓中間的照片蓋在外側照片上面，跟置中照片的最高層級是兩回事。
    const centerCloseness = m.clusterHalfWidth > 0
      ? clamp(1 - Math.abs(m.clusterOffsetX) / m.clusterHalfWidth, 0, 1)
      : 1;

    // renderOrder 三層階梯：置中照片最高（保證蓋過同批彈起的其他照片）、
    // 同批彈起但非置中的照片其次（保證蓋過所有非對焦年份）、非對焦年份
    // 最低（同一層內仍依 centerCloseness 微調，處理小幅重疊時的疊放）。
    let renderOrder;
    if (isCenter) renderOrder = RENDER_ORDER_CENTER;
    else if (isActive) renderOrder = Math.round(RENDER_ORDER_ACTIVE_BASE + centerCloseness * 100);
    else renderOrder = Math.round(centerCloseness * 100);

    // 重要修正（這才是「置中照片沒有真的蓋在最上面」的真正根因）：
    // renderOrder 必須設定在「實際會被畫出來的物件」上——也就是
    // THREE.Mesh（這裡是 m.frame 跟 m.mesh 這兩個實體），而不是拿來單純
    // 分組、本身沒有幾何體/材質、不會被畫出來的 THREE.Group（m.holder）。
    // WebGLRenderer 在組建渲染佇列時，只有 isMesh／isLine／isPoints／
    // isSprite 的物件才會被放進 opaque/transparent 清單，並且是直接讀取
    // 「那個物件自己的」renderOrder 屬性——Three.js 的場景圖並沒有讓子
    // 物件「繼承」父層 Group 的 renderOrder 這種機制。先前的版本只設定了
    // m.holder.renderOrder，這件事在真正的 Three.js 渲染流程裡完全沒有
    // 作用（m.frame／m.mesh 兩個物件的 renderOrder 永遠停留在建構子預設
    // 的 0），實際疊放順序因此退回瀏覽器/WebGLRenderer 對「相同 renderOrder
    // （全部都是 0）」物件的預設排序方式——這正是「置中照片視覺上沒有
    // 突出來、還會被旁邊卡片擋住」的真正原因，不是 Z 座標或 Lerp 動畫
    // 的問題。
    // frame 跟 mesh 給同一個 renderOrder 值即可：兩者都是 transparent
    // 物件，renderOrder 相同時 WebGLRenderer 才會退回用攝影機空間的 Z
    // 距離當次要排序依據，而 frame 本地 z 是 -0.5（比 mesh 的 0 更靠後），
    // 剛好維持「相框在照片後面」這個原本就設計好的疊放關係；不需要為了
    // frame/mesh 兩者再刻意錯開 renderOrder 數值。
    m.frame.renderOrder = renderOrder;
    m.mesh.renderOrder = renderOrder;
    // holder 本身雖然不會被渲染，這裡仍然保留設定（沒有副作用），方便
    // 之後如果要用 mm.holder.renderOrder 做除錯查詢時，數值跟子物件一致。
    m.holder.renderOrder = renderOrder;

    // v14-11 加碼「關鍵招數」（終極保險）：置中照片的材質每幀強制關閉
    // depthTest——depthTest:false 代表這個 Mesh 的每個 fragment 完全不跟
    // 深度緩衝區比較，畫的時候一定會蓋過去，等於是繞過整個深度測試機制，
    // physically 不可能再被任何東西（不管 Z 值、renderOrder 算得對不對）
    // 擋住。因為整個 Three.js 場景裡目前只有這些照片 frame/mesh 兩種物件
    // （上／下軌事件是 DOM 元素、不在這個 canvas 裡），所以就算置中照片
    // 失去深度測試，也不會不小心蓋到什麼「本來該擋在它前面」的其他 3D
    // 物件——沒有那樣的物件存在。非置中的照片則維持 depthTest:true，正常
    // 參與深度測試。這一步跟 renderOrder／大 Z 落差是三個獨立的保險，
    // 任何一個單獨生效就足以讓置中照片正確蓋在最上面。
    m.frame.material.depthTest = !isCenter;
    m.mesh.material.depthTest = !isCenter;

    // expandedPhotoIndex 判斷式沿用原本的邏輯：照片被點開放大顯示時，
    // 交給 expandPhoto()/collapsePhoto() 的 gsap 動畫全權控制 y／scale／z，
    // 這裡完全不去動它，避免兩邊動畫互搶控制權造成畫面抖動。
    if (expandedPhotoIndex !== m.index) {
      const targetY = m.baseY + (isActive ? LIFT_Y : 0) + (m.elevateOffset || 0) + m.clusterOffsetY;
      const targetZ = isCenter ? MAX_Z : (isActive ? LIFT_Z : BASE_Z);
      const targetScale = isActive ? LIFT_SCALE : 1;

      // Lerp（線性插值）：每一幀只朝目標值移動一小段距離，而不是直接
      // 瞬間跳到目標值，確保切換對焦年份、或置中照片在同批彈起的照片間
      // 交接時，Y／Z／Scale 的過渡動畫都平滑順暢，不會頓挫跳動。
      m.holder.position.y += (targetY - m.holder.position.y) * LERP_SPEED;
      m.holder.position.z += (targetZ - m.holder.position.z) * LERP_SPEED;
      const newScale = m.holder.scale.x + (targetScale - m.holder.scale.x) * LERP_SPEED;
      m.holder.scale.set(newScale, newScale, 1);
    }
  });
}

/* =========================================================
   2b. HINT 提示文字：無動作時才顯示（Idle Auto-Hide）
   預設／靜止時正常顯示；使用者一有操作（滾輪、拖拽畫面、拖動時間軸
   滑桿、點擊事件或照片）就立即淡出隱藏，停止操作超過 HINT_IDLE_DELAY
   （2.5 秒）後才自動淡入恢復顯示，避免長期佔用右上角視覺空間。
   ========================================================= */
const hintEl = document.getElementById('hint');
const HINT_IDLE_DELAY = 2500;
let hintTimer = null;
function resetHintTimer(){
  hintEl.style.opacity = '0';
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { hintEl.style.opacity = '1'; }, HINT_IDLE_DELAY);
}

/* =========================================================
   3. INPUT & GLOBAL SYNC
   ========================================================= */
// v14-3：時間軸改回「大部分年份維持 BASE_YEAR_GAP＝90px/年」（只有真的
// 塞了很多照片的少數年份才會被局部拉開），滾輪／拖曳的手感跟最早那次
// 「拉長時間軸」需求（PPY＝90）調校的結果一致，因此不再需要額外的
// NAV_SCALE 補償——經過少數幾個爆量年份時，移動會自然變慢一點，這正好
// 是「該年份內容比較多」的直覺提示，其餘大部分路段的滑動速度不受影響。
host.addEventListener('wheel', (e) => {
  e.preventDefault();
  targetFocusPx = clamp(targetFocusPx + (e.deltaY + e.deltaX) * 0.9, 0, TOTAL_VIRTUAL_W);
  resetHintTimer();
  // 使用者主動捲動＝整排照片真的換位置了，「原地再點一次」的記憶立即失效
  clearPhotoPickMemory();
}, { passive:false });

let dragging = false, dragMoved = false, dragStartX = 0, dragStartFocus = 0;
// v14-17：記錄按下時的座標，放開時用「按下點 → 放開點」的實際位移量來
// 判斷這一下是點擊還是拖曳（見 renderer.domElement 的 click handler）。
let pointerDownPt = null;
// 判定「這是拖曳、不是點擊」的位移門檻。原本是 3px：在 4K 大螢幕／觸控或
// 觸控板上，按下去的瞬間手指幾乎一定會晃到 3px 以上，於是這一下就被當成
// 拖曳、click 被 renderer.domElement 的 handler 吃掉，表現出來就是「點了
// 照片沒反應」。放寬到 10px，仍然不影響真正的拖曳操作。
const DRAG_CLICK_THRESHOLD = 10;
host.addEventListener('pointerdown', (e) => {
  dragging = true; dragMoved = false;
  pointerDownPt = { x: e.clientX, y: e.clientY };
  dragStartX = e.clientX; dragStartFocus = targetFocusPx;
  resetHintTimer();
});
function onWinPointerMove(e){
  if(!dragging) return;
  const dx = e.clientX - dragStartX;
  if(Math.abs(dx) > DRAG_CLICK_THRESHOLD){ dragMoved = true; clearPhotoPickMemory(); }
  targetFocusPx = clamp(dragStartFocus - dx, 0, TOTAL_VIRTUAL_W);
  resetHintTimer();
}
function onWinPointerUp(){ dragging = false; }
window.addEventListener('pointermove', onWinPointerMove);
window.addEventListener('pointerup', onWinPointerUp);

function onKeyDown(e){
  const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
  if(tag === 'input' || tag === 'textarea') return;
  if(e.key === 'ArrowLeft'){ targetFocusPx = clamp(targetFocusPx - 180, 0, TOTAL_VIRTUAL_W); resetHintTimer(); clearPhotoPickMemory(); }
  if(e.key === 'ArrowRight'){ targetFocusPx = clamp(targetFocusPx + 180, 0, TOTAL_VIRTUAL_W); resetHintTimer(); clearPhotoPickMemory(); }
  if(e.key === 'Escape'){ resetSelection(); }
}
window.addEventListener('keydown', onKeyDown);


// bottom timeline bar
const tlTrack = document.getElementById('tlTrack');
const tlFill = document.getElementById('tlFill');
const tlThumb = document.getElementById('tlThumb');
const tlTicks = document.getElementById('tlTicks');

// v14-3 修補：時間軸改成非均勻寬度後，底部拖拽列的刻度不能再用「年份
// 佔全部年份的百分比」這種假設「每年等寬」的算法（那樣算出來的刻度會
// 跟實際卡片/照片在畫面上出現的位置對不上）。改成記錄每個刻度對應的
// 「年份」，實際的 % 位置改由 updateTimelineTicks() 用當下的
// yearToVX(y)/TOTAL_VIRTUAL_W 換算，並且在動畫迴圈中每一幀更新，
// 這樣即使 Excel 重新匯入、年份間距重新分配，刻度也會自動跟著校正。
// v14-4 修補：YEAR_MIN/YEAR_MAX 現在會隨 Excel 資料改變，「每 5 年一個
// 刻度」實際會有哪幾個刻度也跟著變了，所以改成可重複呼叫的函式——
// 每次 Excel 重新匯入、年份範圍改變後都要整批清空重建（見 rebuildTimeline）。
// v14-6 修補：使用者反映早期／照片較少的年份區段（例如 1949–1969）在
// 底部拖拽列上會擠成一團看不清楚的數字。根因不是年份↔像素的換算公式
// 有誤（yearToVX／vxToYear 本身就是線性內插，換算沒有問題），而是這條
// 拖拽列的「畫面總寬度」是固定的，但底下對應的虛擬時間軸是非均勻寬度
// （照片少的年份只佔 BASE_YEAR_GAP，照片爆量的年份會被拉開到超過
// 1000px）——固定「每 5 年一個刻度」時，落在正常／密度低的年份區段的
// 那些刻度，換算到這條固定寬度的拖拽列上，實際像素間距會被壓縮到只剩
// 幾像素，才會擠成一團。
// 解法：改成動態決定「每幾年才顯示一個刻度」的步長，原則是掃過目前這
// 條拖拽列實際渲染的寬度（getBoundingClientRect 抓到的是套用 CSS
// transform:scale() 之後、使用者眼睛實際看到的像素值），逐一嘗試候選
// 步長（5/10/15/20/25/30/40/50/60/80/100 年），只要用該步長算出來的
// 「最擠的那一對相鄰刻度」間距都還是 ≥ TICK_MIN_LABEL_PX（50px），就採用
// 那個步長；步長越大，刻度越稀疏，最擠的間距自然也會跟著變大。
// 這個計算跟目前的螢幕寬度、Excel 資料的年份分佈都有關，所以除了 Excel
// 重新匯入時要重建一次，視窗尺寸改變（見下方 onResize）也要重新計算，
// 否則使用者縮小視窗後刻度可能又擠在一起。
const TICK_MIN_LABEL_PX = 50;
const TICK_STEP_CANDIDATES = [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100];

function computeTimelineTickStep(trackWidthPx){
  if(!trackWidthPx || !Number.isFinite(TOTAL_VIRTUAL_W) || TOTAL_VIRTUAL_W <= 0) return TICK_STEP_CANDIDATES[0];
  for(const step of TICK_STEP_CANDIDATES){
    const startY = Math.ceil(YEAR_MIN / step) * step;
    let minGapPx = Infinity;
    let prevVx = null;
    for(let y = startY; y <= YEAR_MAX; y += step){
      const vx = yearToVX(y);
      if(prevVx !== null) minGapPx = Math.min(minGapPx, (vx - prevVx) / TOTAL_VIRTUAL_W * trackWidthPx);
      prevVx = vx;
    }
    if(minGapPx >= TICK_MIN_LABEL_PX) return step;
  }
  return TICK_STEP_CANDIDATES[TICK_STEP_CANDIDATES.length - 1];
}

let tlTickEls = [];
function buildTimelineTicks(){
  tlTicks.innerHTML = '';
  tlTickEls = [];

  // 用「目前實際渲染寬度」決定步長，而不是理論上的容器寬度——
  // getBoundingClientRect() 量到的是套用 fitStage() 的 CSS scale() 之後
  // 使用者眼睛實際看到的像素，才是判斷「50px 夠不夠可讀」的正確基準。
  const trackWidthPx = tlTrack.getBoundingClientRect().width;
  const step = computeTimelineTickStep(trackWidthPx);
  const startY = Math.ceil(YEAR_MIN / step) * step;

  const addTick = (y) => {
    if(tlTickEls.some(t => t.y === y)) return;
    const el = document.createElement('div');
    el.className = 'tlTick';
    el.textContent = y;
    tlTicks.appendChild(el);
    tlTickEls.push({ y, el });
  };

  for(let y = startY; y <= YEAR_MAX; y += step){ addTick(y); }

  // 頭尾兩個實際年份界線（YEAR_MIN／YEAR_MAX）不一定剛好落在整數步長上
  // （例如資料從 1949 開始、步長是 10 年，最接近的整數刻度是 1950），
  // 額外檢查一次：只要跟最近的既有刻度距離夠遠（不會擠在一起），就把
  // 真正的起訖年份也加上去，方便使用者一眼看到資料實際涵蓋的範圍。
  [YEAR_MIN, YEAR_MAX].forEach(y => {
    if(tlTickEls.some(t => t.y === y)) return;
    const vx = yearToVX(y);
    const nearestGapPx = Math.min(
      ...tlTickEls.map(t => Math.abs(yearToVX(t.y) - vx) / TOTAL_VIRTUAL_W * trackWidthPx)
    );
    if(!Number.isFinite(nearestGapPx) || nearestGapPx >= TICK_MIN_LABEL_PX) addTick(y);
  });

  updateTimelineTicks();
}
buildTimelineTicks();
function updateTimelineTicks(){
  tlTickEls.forEach(t => { t.el.style.left = (yearToVX(t.y) / TOTAL_VIRTUAL_W * 100) + '%'; });
}

function setFocusFromTrackEvent(clientX){
  const rect = tlTrack.getBoundingClientRect();
  const frac = clamp((clientX - rect.left) / rect.width, 0, 1);
  targetFocusPx = frac * TOTAL_VIRTUAL_W;
}
let thumbDragging = false;
tlThumb.addEventListener('pointerdown', (e) => { thumbDragging = true; resetHintTimer(); clearPhotoPickMemory(); e.stopPropagation(); });
tlTrack.addEventListener('pointerdown', (e) => { setFocusFromTrackEvent(e.clientX); thumbDragging = true; resetHintTimer(); clearPhotoPickMemory(); });
function onThumbPointerMove(e){ if(thumbDragging){ setFocusFromTrackEvent(e.clientX); resetHintTimer(); clearPhotoPickMemory(); } }
function onThumbPointerUp(){ thumbDragging = false; }
window.addEventListener('pointermove', onThumbPointerMove);
window.addEventListener('pointerup', onThumbPointerUp);

function updateTimelineBar(){
  const frac = clamp(focusPx / TOTAL_VIRTUAL_W, 0, 1);
  tlThumb.style.left = (frac*100) + '%';
  tlFill.style.width = (frac*100) + '%';
  updateTimelineTicks();
}

/* =========================================================
   4. MILESTONE OVERLAYS
   ========================================================= */
const topLayer = document.getElementById('topLayer');
const bottomLayer = document.getElementById('bottomLayer');
const topStemLayer = document.getElementById('topStemLayer');
const bottomStemLayer = document.getElementById('bottomStemLayer');
const topAxisLayer = document.getElementById('topAxisLayer');
const bottomAxisLayer = document.getElementById('bottomAxisLayer');
const guideLine = document.getElementById('guideLine');

const TOP_AXIS_PCT = 30;    // 上主線在整個舞台高度中的百分比位置
const BOTTOM_AXIS_PCT = 70; // 下主線在整個舞台高度中的百分比位置

// v14-13 需求 1 重構：舊版車道（TOP_ROWS/BOTTOM_ROWS）是「距離舞台頂/底
// 部固定百分比」，車道 0 離主軸線最遠時甚至超過 500px，卡片與時間線
// 之間的連接線（stem）長度完全沒有上限、也沒有跟主軸線的距離掛勾。
// 改成「距離主軸線的固定像素距離」：車道 0（最常用、大多數不擁擠的
// 年份都會分到這一條）鎖定在 CONNECTOR_BASE_PX（40~60px 範圍內），
// 之後每多一條車道才疊加 CONNECTOR_STEP_PX（用來容納卡片本身的高度，
// 避免同一批相鄰車道的卡片彼此垂直重疊），車道數也從 4 條減少到 3 條，
// 讓最遠車道的連接線長度也大幅縮短（舊版 500px+ → 新版最多約 240px）。
const CONNECTOR_BASE_PX = 50;
const CONNECTOR_STEP_PX = 96;
const TOP_LANE_COUNT = 3;
const BOTTOM_LANE_COUNT = 3;
function fontScaleNow(){ return FONT_SCALES[currentFontSize] || 1; }
function yearLabelClearance(){
  // Must match CSS .axisTickYear offset (44 + 30*fs) plus numeral height + a gap
  // so event cards never sit on top of the axis year labels.
  const fs = fontScaleNow();
  return 58 + 52 * fs;
}
function headerReservePx(){
  const el = document.getElementById('headerLeft');
  const h = el ? (el.offsetTop + el.offsetHeight) : 180;
  return Math.min(420, Math.max(120, h + 8));
}
function footerReservePx(){
  const bar = document.getElementById('timelineBar');
  const fs = document.getElementById('fontSizeSwitch');
  let top = 2160 - 150;
  [bar, fs].forEach(el => {
    if(el && el.offsetTop > 0) top = Math.min(top, el.offsetTop);
  });
  return Math.min(280, Math.max(140, 2160 - top + 12));
}

// v14-14：上一版在這裡加了「螢幕邊緣防溢出」——卡片靠近舞台左右邊緣時，
// 額外疊加一個會隨目前捲動位置（leftPx）即時重算的水平位移，把卡片推回
// 畫面內側。問題是這個位移是「每一幀都根據當下捲動位置重新計算」，使用者
// 實際捲動時，同一個事件的卡片會隨著它離螢幕邊緣的遠近不斷變換位移量，
// 看起來就像卡片沒有固定跟著自己的年份走、而是跟著畫面捲動到處飄移——
// 這正是使用者這次回報的問題。改回「卡片永遠跟圓點對齊、不做任何額外水平
// 位移」，每個事件的卡片與圓點永遠保持固定的相對位置，兩者一起隨捲動
// 平移，不會再各自漂移。代價是靠近舞台邊緣時卡片有機率跟固定 UI（提示
// 文字／分類選單）重疊，但這是「每個事件都確實固定在自己年份上」這個
// 更基本的需求之下必要的取捨。

// 統一以 (year-起始年)/(結束年-起始年) 為基礎的 vx 座標換算成螢幕像素，
// 四捨五入到整數 px，避免次像素誤差造成卡片與主時間軸刻度出現肉眼可見的偏移。
function vxToScreenLeft(vx){ return Math.round((vx - focusPx) + W/2); }

const topEls = {}, bottomEls = {};

/* ---------------------------------------------------------
   4a. 防碰撞排版（Collision Detection / Lane Assignment）
   字體與圖示放大後，卡片標籤（.lbl，最寬可達 236px × --font-scale）
   彼此更容易在同一列（row/lane）內互相遮擋。這裡採用「貪婪最大間距」
   演算法：先依年份（x 軸像素座標）排序，逐一把每個節點放進「目前與
   上一個節點距離最遠」的那一列，藉此讓時間相近的事件盡量錯開到不同列，
   取代原本單純依資料順序輪流分配（i % rows.length）的做法。
   LANE_MIN_GAP_BASE 是在 --font-scale = 1 時、同一列相鄰兩節點建議的
   最小水平間距（px），會隨目前字體倍率等比例放大，確保字體越大、
   節點間距也自動跟著加大，降低標籤重疊機率。
   由 300 提高到 420，搭配拉長後的 PPY 與 SIGMA，讓 assignLanes 要求
   更寬鬆的最小水平間距，事件節點與照片鏈才不易堆疊（PPY 持續拉長後，
   不同年份節點的實際像素間距只會更寬鬆，此門檻主要用於同一年份多筆
   事件擠爆車道數量時的 wrapOffset 判斷，見下方 v13 修補說明）。

   v13 修補：同一年份事件被「隱藏」的真正成因，不是資料被 continue／
   丟棄（程式從頭到尾都會為每一筆資料建立 DOM 節點，這裡特別確認過），
   而是當同一年份的事件數量「超過車道數量」（TOP_ROWS/BOTTOM_ROWS 各只
   有 4 條車道）時，貪婪演算法在所有車道的 gap 都變成 0（代表 x 座標
   完全相同）時，只能被迫把新節點分配到某個已經有人的車道 —— 那個節點
   雖然仍然存在於 DOM 裡，但因為位置跟另一個節點完全重疊，視覺上就像
   「被蓋住、消失了」一樣。下面新增 wrapOffset（bestGap<=0 時才會觸發）
   就是專門處理這個邊界情況：讓真的擠爆車道數量的事件，也一定會有一個
   跟既有節點不同的水平位置，不會再出現像素級的完全重疊。
   --------------------------------------------------------- */
const LANE_MIN_GAP_BASE = 280;
function currentLaneMinGap(){ return LANE_MIN_GAP_BASE * fontScaleNow(); }

function assignLanes(milestones, laneCount, widthsByIndex){
  const fs = fontScaleNow();
  const pad = 20 * fs;
  const lastVxPerLane = new Array(laneCount).fill(-Infinity);
  const lastWPerLane = new Array(laneCount).fill(0);
  const wrapCountPerLane = new Array(laneCount).fill(0);
  const laneByIndex = new Array(milestones.length);
  const offsetByIndex = new Array(milestones.length).fill(0);
  const isFirstOfYear = new Array(milestones.length).fill(false);
  const seenYears = new Set();

  const order = milestones
    .map((m, i) => ({ i, vx: yearToVX(m.year), year: m.year }))
    .sort((a, b) => a.vx - b.vx);

  order.forEach(({ i, vx, year }) => {
    if(!seenYears.has(year)){ seenYears.add(year); isFirstOfYear[i] = true; }
    const w = (widthsByIndex && widthsByIndex[i]) || 220;

    let bestLane = 0, bestGap = -Infinity, bestFits = false;
    for(let L = 0; L < laneCount; L++){
      const needed = (w + lastWPerLane[L]) / 2 + pad;
      const gap = vx - lastVxPerLane[L];
      const fits = gap >= needed;
      if(fits && !bestFits){ bestLane = L; bestGap = gap; bestFits = true; }
      else if(fits && bestFits && L < bestLane){ bestLane = L; bestGap = gap; }
      else if(!bestFits && gap > bestGap){ bestLane = L; bestGap = gap; }
    }
    if(!bestFits){
      wrapCountPerLane[bestLane] += 1;
      const lastW = lastWPerLane[bestLane] || w;
      offsetByIndex[i] = wrapCountPerLane[bestLane] * ((w + lastW) / 2 + pad);
    }
    laneByIndex[i] = bestLane;
    lastVxPerLane[bestLane] = vx + (offsetByIndex[i] || 0);
    lastWPerLane[bestLane] = w;
  });
  return { laneByIndex, offsetByIndex, isFirstOfYear };
}

function computeLanePlan(isTop, cardHeights){
  const axisPx = (isTop ? TOP_AXIS_PCT : BOTTOM_AXIS_PCT) / 100 * 2160;
  const maxH = Math.max(52, ...(cardHeights.length ? cardHeights : [52]));
  const labelClear = yearLabelClearance();
  const safeTop = headerReservePx();
  const safeBottom = 2160 - footerReservePx();
  // Space from the year-label band to the chrome, available for the full card height
  const available = isTop
    ? Math.max(maxH + 8, axisPx - labelClear - safeTop)
    : Math.max(maxH + 8, safeBottom - axisPx - labelClear);
  const gap = Math.max(8, 10 * fontScaleNow() * 0.5);
  const pitch = maxH + gap;
  // Only as many lanes as actually fit without stacking / clipping
  const laneCount = Math.max(1, Math.min(4, Math.floor((available + gap) / pitch)));
  const base = labelClear + 16; // near-axis edge of the card cluster (the dot)
  const maxConn = Math.max(base, available - 4);
  const step = laneCount > 1 ? Math.min(pitch, (maxConn - base) / (laneCount - 1)) : 0;
  const connectors = [];
  for(let i = 0; i < laneCount; i++){
    const c = base + i * step;
    connectors.push(Math.min(c, maxConn));
  }
  return { laneCount, connectors, axisPx, safeTop, safeBottom, labelClear, maxH };
}

// 依目前 topMilestones / bottomMilestones 建立事件卡片 DOM
// （Excel 重新匯入、或字體大小切換造成排版需要重算時皆可重複呼叫）
// 注意：不論年份是否重複，這裡都會為 topMilestones／bottomMilestones
// 裡的「每一筆」資料各自建立一個 .ms 節點，絕不會因為 year 相同就
// continue／skip 掉任何一筆——真正需要處理的是上面 assignLanes 的
// 排版問題，而不是在這裡漏掉資料。
// v14-13 需求 1：兩階段排版（先建 DOM、量測實際卡片高度，再定位）——
// 標題可以換行成多行（需求 2 保留），卡片高度不再是固定值，若還是像
// 舊版那樣「先假設一個固定百分比位置」，卡片一多行就會跟主軸線的距離
// 對不齊、或跟其他車道打架。這裡改成：先用暫時的 top:0 把所有 .ms 元素
// 實際插入 DOM，用 offsetHeight 量出每張卡片（dot＋msCard＋間距）目前
// 實際佔用的高度，再回頭用「主軸線位置 ± 車道連接線長度 ± 卡片實際
// 高度的一半」精準算出每個 .ms 該擺在哪裡（.ms 本身用 translate(-50%,-50%)
// 置中，所以要定位的是「卡片整體的中心點」）。這一步一定要在瀏覽器還
// 沒畫出畫面前（同一個同步的函式呼叫內）就做完，才不會有畫面閃爍。
function escapeHtml(s){
  const amp = String.fromCharCode(38);
  return String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return amp + "amp;";
    if (ch === "<") return amp + "lt;";
    if (ch === ">") return amp + "gt;";
    if (ch === '"') return amp + "quot;";
    return amp + "#39;";
  });
}
function buildMilestoneDOM(){
  topLayer.innerHTML = ''; Object.keys(topEls).forEach(k => delete topEls[k]);
  bottomLayer.innerHTML = ''; Object.keys(bottomEls).forEach(k => delete bottomEls[k]);
  topStemLayer.innerHTML = '';
  bottomStemLayer.innerHTML = '';

  const makeCard = (m, layer, stemLayer, stemClass, source) => {
    const isTop = source === 'top';
    const el = document.createElement('div');
    el.className = isTop ? 'ms ms-top' : 'ms ms-bottom';
    el.dataset.id = m.id; el.dataset.cat = m.category;
    const title = L(m,'title');
    el.title = title;
    const yrHtml = `<div class="yr">${m.year}</div>`;
    const lblHtml = `<div class="lbl">${escapeHtml(title)}</div>`;
    // Year sits on the OUTER side (away from the axis) so it never hugs the line.
    // Dot sits on the INNER side so the stem attaches next to the timeline.
    if(isTop){
      el.innerHTML = `<div class="msCard">${yrHtml}${lblHtml}</div><div class="dot"></div>`;
    } else {
      el.innerHTML = `<div class="dot"></div><div class="msCard">${lblHtml}${yrHtml}</div>`;
    }
    const stemEl = document.createElement('div');
    stemEl.className = 'stem ' + stemClass;
    stemLayer.appendChild(stemEl);
    el.__stem = stemEl;
    el.addEventListener('click', () => handleSelect(source, m.id));
    el.addEventListener('mouseenter', () => { hoverTarget = { source, id:m.id }; applyHighlight(); });
    el.addEventListener('mouseleave', () => { hoverTarget = null; applyHighlight(); });
    layer.appendChild(el);
    return el;
  };

  topMilestones.forEach(m => { topEls[m.id] = makeCard(m, topLayer, topStemLayer, 'stem-down', 'top'); });
  bottomMilestones.forEach(m => { bottomEls[m.id] = makeCard(m, bottomLayer, bottomStemLayer, 'stem-up', 'bottom'); });

  const topHeights = topMilestones.map(m => topEls[m.id].offsetHeight);
  const bottomHeights = bottomMilestones.map(m => bottomEls[m.id].offsetHeight);
  const topWidths = topMilestones.map(m => topEls[m.id].offsetWidth);
  const bottomWidths = bottomMilestones.map(m => bottomEls[m.id].offsetWidth);

  const topPlan = computeLanePlan(true, topHeights);
  const bottomPlan = computeLanePlan(false, bottomHeights);
  const topLayout = assignLanes(topMilestones, topPlan.laneCount, topWidths);
  const bottomLayout = assignLanes(bottomMilestones, bottomPlan.laneCount, bottomWidths);

  topMilestones.forEach((m, i) => {
    const el = topEls[m.id];
    el.dataset.vx = yearToVX(m.year) + topLayout.offsetByIndex[i];
    if(el.__stem) el.__stem.dataset.vx = el.dataset.vx;
    const yr = el.querySelector('.yr');
    if(yr) yr.style.display = topLayout.isFirstOfYear[i] ? '' : 'none';
  });
  bottomMilestones.forEach((m, i) => {
    const el = bottomEls[m.id];
    el.dataset.vx = yearToVX(m.year) + bottomLayout.offsetByIndex[i];
    if(el.__stem) el.__stem.dataset.vx = el.dataset.vx;
    const yr = el.querySelector('.yr');
    if(yr) yr.style.display = bottomLayout.isFirstOfYear[i] ? '' : 'none';
  });

  const place = (el, lane, isTop, plan) => {
    const h = el.offsetHeight;
    const connectorPx = plan.connectors[Math.min(lane, plan.connectors.length - 1)];
    const stemEl = el.__stem;
    const axisPx = plan.axisPx;
    if(isTop){
      // Near-axis edge of the group is the DOT (bottom of .ms). Keep it beyond year labels.
      const minNear = plan.safeTop + h;                 // far edge at safeTop
      const maxNear = axisPx - plan.labelClear - 8;     // stay clear of axis years
      const near = clamp(axisPx - connectorPx, minNear, Math.max(minNear, maxNear));
      const centerPx = near - h / 2;
      el.style.top = centerPx + 'px';
      stemEl.style.top = near + 'px';
      stemEl.style.height = Math.max(8, axisPx - near) + 'px';
    } else {
      const minNear = axisPx + plan.labelClear + 8;
      const maxNear = plan.safeBottom - h;
      const near = clamp(axisPx + connectorPx, minNear, Math.max(minNear, maxNear));
      const centerPx = near + h / 2;
      el.style.top = centerPx + 'px';
      stemEl.style.top = axisPx + 'px';
      stemEl.style.height = Math.max(8, near - axisPx) + 'px';
    }
  };

  topMilestones.forEach((m, i) => place(topEls[m.id], topLayout.laneByIndex[i], true, topPlan));
  bottomMilestones.forEach((m, i) => place(bottomEls[m.id], bottomLayout.laneByIndex[i], false, bottomPlan));

  resolveCardOverlaps(topMilestones, topEls);
  resolveCardOverlaps(bottomMilestones, bottomEls);
}

function resolveCardOverlaps(milestones, els){
  const boxes = milestones.map(m => {
    const el = els[m.id];
    if(!el) return null;
    return {
      el,
      x: parseFloat(el.dataset.vx) || 0,
      y: parseFloat(el.style.top) || 0,
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  }).filter(Boolean).sort((a, b) => a.x - b.x);

  const pad = 12;
  for(let pass = 0; pass < 4; pass++){
    let moved = false;
    for(let i = 1; i < boxes.length; i++){
      const a = boxes[i - 1], b = boxes[i];
      const dx = Math.abs(b.x - a.x);
      const dy = Math.abs(b.y - a.y);
      const needX = (a.w + b.w) / 2 + pad;
      const needY = (a.h + b.h) / 2 + 6;
      if(dx < needX && dy < needY){
        const push = needX - dx;
        b.x += push;
        b.el.dataset.vx = String(b.x);
        if(b.el.__stem) b.el.__stem.dataset.vx = String(b.x);
        moved = true;
      }
    }
    if(!moved) break;
  }
}
buildMilestoneDOM();

// 字體／圖示大小切換後呼叫：以新的 --font-scale 重新計算防碰撞排版
// （見 assignLanes 的 LANE_MIN_GAP_BASE），並還原目前的分類篩選（activeCategory）
// 與高亮選取（selection / hoverTarget）狀態，避免畫面在切換字體時被重置。
function relayoutMilestones(){
  const focusYear = vxToYear(focusPx);
  rebuildYearScale();
  focusPx = targetFocusPx = clamp(yearToVX(focusYear), 0, TOTAL_VIRTUAL_W);
  buildMilestoneDOM();
  buildAxisTicks();
  if(activeCategory){
    topMilestones.forEach(m => {
      const el = topEls[m.id];
      if(el) el.classList.toggle('hidden', m.category !== activeCategory);
    });
  }
  updateMilestonePositions();
  applyHighlight();
  updateGuideLine();
}

// 上/下主線的年份刻度（每 5 年一個刻度，隨畫面捲動）
// v14-3 修補：改記錄「年份」而非當下算出來的 vx——因為時間軸現在是
// 非均勻寬度，Excel 重新匯入後 rebuildYearScale() 會重新分配每年的
// 間距，若在這裡把 vx 寫死成數字快取起來，重新匯入後這批刻度的位置就
// 會維持匯入前的舊座標、跟卡片與照片的新位置對不上。改成在
// updateMilestonePositions()（動畫迴圈每一幀都會呼叫）即時用目前的
// yearToVX(y) 換算，才能保證任何時候都跟最新的年份縮放同步。
// v14-4 修補：YEAR_MIN/YEAR_MAX 現在會隨 Excel 資料改變，「每 5 年一個
// 刻度」有哪幾個也會跟著變，所以同樣改成可重複呼叫的重建函式。
let topAxisTicks = [], bottomAxisTicks = [];
function axisTickStep(){
  const fs = fontScaleNow();
  const labelW = 52 * fs;
  const minYears = Math.ceil((labelW + 20) / BASE_YEAR_GAP);
  const candidates = [5, 10, 15, 20, 25];
  return candidates.find(s => s >= minYears) || 25;
}
function buildAxisTicks(){
  topAxisLayer.querySelectorAll('.axisTick').forEach(el => el.remove());
  bottomAxisLayer.querySelectorAll('.axisTick').forEach(el => el.remove());
  topAxisTicks = []; bottomAxisTicks = [];
  const step = axisTickStep();
  for(let y = YEAR_MIN; y <= YEAR_MAX; y += step){
    const topTick = document.createElement('div');
    topTick.className = 'axisTick';
    topTick.innerHTML = `<div class="axisTickMark"></div><div class="axisTickYear">${y}</div>`;
    topAxisLayer.appendChild(topTick);
    topAxisTicks.push({ y, el: topTick });

    const bottomTick = document.createElement('div');
    bottomTick.className = 'axisTick axisTick-bottom';
    bottomTick.innerHTML = `<div class="axisTickYear">${y}</div><div class="axisTickMark"></div>`;
    bottomAxisLayer.appendChild(bottomTick);
    bottomAxisTicks.push({ y, el: bottomTick });
  }
}
buildAxisTicks();

// v14-14：每個事件只依照自己的年份（el.dataset.vx，年份換算出來的固定
// 虛擬座標）換算成目前的螢幕位置，卡片（.msCard）不再額外疊加任何隨捲動
// 變化的水平位移——確保事件永遠固定在自己對應的年份上，只會隨畫面捲動
// 整體平移，不會在捲動時看起來像是自己在到處移動。
function positionMsEl(el){
  const leftPx = vxToScreenLeft(parseFloat(el.dataset.vx));
  el.style.left = leftPx + 'px';
  // 連接線在另一個圖層，捲動時要一起平移，才會永遠對齊自己的卡片
  if(el.__stem) el.__stem.style.left = leftPx + 'px';
}
function updateMilestonePositions(){
  Object.values(topEls).forEach(positionMsEl);
  Object.values(bottomEls).forEach(positionMsEl);
  topAxisTicks.forEach(t => { t.el.style.left = vxToScreenLeft(yearToVX(t.y)) + 'px'; });
  bottomAxisTicks.forEach(t => { t.el.style.left = vxToScreenLeft(yearToVX(t.y)) + 'px'; });
}

function updateGuideLine(){
  const hl = hoverTarget || selection;
  if(!hl){ guideLine.style.opacity = 0; return; }
  let year;
  if(hl.source === 'top') year = topById[hl.id].year;
  else if(hl.source === 'bottom') year = bottomById[hl.id].year;
  else year = photosData[hl.id].year;
  guideLine.style.left = vxToScreenLeft(yearToVX(year)) + 'px';
  guideLine.style.opacity = 1;
}

/* =========================================================
   5. CATEGORY FILTER & LANGUAGE SWITCH
   ========================================================= */
let activeCategory = null;
const bandTop = document.getElementById('bandTop');
const DEFAULT_TOP_BG = '#F4F1EA';

/* 顏色輔助：分類淡化背景（與3.文字自動對比色（4.） */
function hexToRgb(hex){
  hex = hex.replace('#','');
  return { r: parseInt(hex.substring(0,2),16), g: parseInt(hex.substring(2,4),16), b: parseInt(hex.substring(4,6),16) };
}
function rgbToHex(r,g,b){
  return '#' + [r,g,b].map(v => Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('');
}
function blendHex(hexA, hexB, ratioA){
  const a = hexToRgb(hexA), b = hexToRgb(hexB);
  return rgbToHex(
    a.r*ratioA + b.r*(1-ratioA),
    a.g*ratioA + b.g*(1-ratioA),
    a.b*ratioA + b.b*(1-ratioA)
  );
}
function relativeLuminance(hex){
  const {r,g,b} = hexToRgb(hex);
  const [R,G,B] = [r,g,b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126*R + 0.7152*G + 0.0722*B;
}
function updateTopTextContrast(bgHex){
  const lum = relativeLuminance(bgHex);
  const textColor = lum < 0.5 ? '#F4F1EA' : '#1D1D1F';
  document.documentElement.style.setProperty('--top-text-color', textColor);
}
updateTopTextContrast(DEFAULT_TOP_BG);

// v8 強化：照片分類判定 —— 優先採用照片自身的 category 欄位；
// 若照片本身沒有分類，改為判斷其關聯的「上軌事件」是否屬於該分類，符合任一即顯示。
function photoMatchesCategory(p, cat, matchTopIdsSet){
  if(p.category) return p.category === cat;
  if(matchTopIdsSet) return p.relatedTopIds.some(id => matchTopIdsSet.has(id));
  return p.relatedTopIds.some(id => topById[id] && topById[id].category === cat);
}

document.querySelectorAll('.catBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const c = btn.dataset.c;
    if(activeCategory === c){
      activeCategory = null;
      bandTop.style.backgroundColor = DEFAULT_TOP_BG;
      updateTopTextContrast(DEFAULT_TOP_BG);
      document.querySelectorAll('.catBtn').forEach(b=>b.classList.remove('on'));
      topMilestones.forEach(m => topEls[m.id].classList.remove('hidden'));
      // 下軌事件（歷史 background/context）永遠顯示，不受分類篩選影響，故不處理 hidden
      meshes.forEach(m => { m.catFilteredOut = false; m.holder.visible = true; });
    } else {
      activeCategory = c;
      // 淡化背景：僅混入約 15% 的分類色（等同 rgba(色, 0.15) 疊在底色上），避免過深過硬
      const dilutedBg = blendHex(CAT_COLORS[c], DEFAULT_TOP_BG, 0.15);
      bandTop.style.backgroundColor = dilutedBg;
      updateTopTextContrast(dilutedBg);
      document.querySelectorAll('.catBtn').forEach(b=>b.classList.toggle('on', b.dataset.c===c));
      // 分類按鈕只對「上軌事件」與「照片列」進行類別過濾；
      // 「下軌事件」為歷史 background/context，不論切換到哪個分類，永遠保持顯示（Never Hidden）。
      const matchTopIds = new Set(topMilestones.filter(m => m.category === c).map(m => m.id));
      topMilestones.forEach(m => topEls[m.id].classList.toggle('hidden', m.category !== c));
      meshes.forEach(m => {
        const p = photosData[m.index];
        const related = photoMatchesCategory(p, c, matchTopIds);
        m.catFilteredOut = !related;
        m.holder.visible = related;
      });
    }
    updateCategoryBadges();
    applyHighlight();
    // 分類篩選會讓部分照片整批隱藏／重新出現，之前記住的點擊位置不再成立
    clearPhotoPickMemory();
  });
});
updateCategoryBadges();
updateCategoryButtonLabels();

document.querySelectorAll('.langBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    currentLang = lang;
    document.querySelectorAll('.langBtn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    
    const txt = UI_TEXT[lang];
    document.getElementById('uiTitle').innerText = txt.title;
    document.getElementById('hint').innerHTML = txt.hint;
    document.getElementById('uiYearLbl').innerText = txt.yearLbl;
    refreshImportHintCopy();

    const fsLabels = FONT_SIZE_LABELS[lang] || FONT_SIZE_LABELS['zh-Hant'];
    document.querySelectorAll('.fontSizeOption').forEach(opt => {
      opt.textContent = fsLabels[opt.dataset.size];
    });

    refreshLangTexts();
  });
});

// 切換語言時，重新抓取每筆資料對應的 `title-${TC|SC|Eng}` 欄位，
// 更新已經畫在畫面上的事件卡片標題，以及目前開啟中的彈窗內容
function refreshLangTexts(){
  updateCategoryBadges();
  updateCategoryButtonLabels();
  // v14-15 修正：切換語言時，不同語言的標題長度／換行行數往往不一樣
  // （例如中文兩行的標題，英文可能要三行才放得下），先前這裡只是直接
  // 把 .lbl 的文字內容換掉、完全沒有重新量測卡片高度或重新定位——但
  // buildMilestoneDOM() 的排版（卡片中心位置、連接線長度）是依照建立當下
  // 量到的高度算好、寫死在 el.style.top／stem 高度上的，文字換了、高度
  // 跟著變了，位置卻沒有跟著重算，就會出現卡片跟連接線對不上、彼此互相
  // 位移的錯位畫面。改成呼叫 relayoutMilestones()——這跟切換字體大小時
  // 用的是同一套「整批重建 DOM＋重新量測高度＋重新定位」流程（此時
  // buildMilestoneDOM() 裡的 L(m,'title') 已經會讀到切換後的新語言），
  // 一併也會用 applyHighlight()／activeCategory 篩選還原目前的篩選與
  // 高亮選取狀態，不會因為重建 DOM 而重置掉。
  relayoutMilestones();
  if(document.getElementById('eventModalOverlay').classList.contains('show') && selection && (selection.source==='top' || selection.source==='bottom')){
    openEventModal(selection.source, selection.id);
  }
  if(document.getElementById('modalOverlay').classList.contains('show') && expandedPhotoIndex!==null){
    const detail = photoDetail(expandedPhotoIndex);
    document.getElementById('modalYear').textContent = Math.floor(detail.year);
    document.getElementById('modalTitle').textContent = detail.title;
    document.getElementById('modalDesc').textContent = detail.desc;
  }
}

/* =========================================================
   5b. FONT SIZE SWITCH（左下角 aA 選單）
   FONT_SCALES / currentFontSize 已移至檔案開頭（0-font 區塊）宣告，
   讓 section 4 的節點排版（buildMilestoneDOM/assignLanes）在初次建立
   畫面時就能讀到目前的字體倍率，避免初始化順序問題。
   ========================================================= */
const FONT_SIZE_LABELS = {
  'zh-Hant': { small:'小', medium:'中', large:'大' },
  'zh-Hans': { small:'小', medium:'中', large:'大' },
  'en': { small:'S', medium:'M', large:'L' }
};

const fontSizeToggle = document.getElementById('fontSizeToggle');
const fontSizeMenu = document.getElementById('fontSizeMenu');

function applyFontScale(size){
  currentFontSize = size;
  document.documentElement.style.setProperty('--font-scale', FONT_SCALES[size]);
  document.querySelectorAll('.fontSizeOption').forEach(opt => opt.classList.toggle('active', opt.dataset.size === size));
  // 字體（連帶圖示）改變大小後，節點的實際寬度／高度都變了，
  // 必須重新計算防碰撞排版（見 section 4 的 assignLanes），
  // 否則放大字體後容易發生標籤互相遮擋、重疊的情況。
  relayoutMilestones();
}

document.querySelectorAll('.fontSizeOption').forEach(opt => {
  opt.addEventListener('click', () => {
    applyFontScale(opt.dataset.size);
    fontSizeMenu.classList.remove('open');
  });
});

fontSizeToggle.addEventListener('click', () => {
  fontSizeMenu.classList.toggle('open');
});

applyFontScale('medium');

/* =========================================================
   6. CROSS-HIGHLIGHT & MODAL
   （selection / hoverTarget 已移至檔案開頭 0-font 區塊宣告）
   ========================================================= */
function relatedSets(sel){
  const photoIds = new Set(), topIds = new Set(), bottomIds = new Set();
  if(!sel) return {photoIds, topIds, bottomIds};
  if(sel.source === 'top'){
    const m = topById[sel.id];
    topIds.add(m.id);
    m.relatedPhotoIds.forEach(id => photoIds.add(id));
    m.relatedBottomIds.forEach(id => bottomIds.add(id));
  } else if(sel.source === 'bottom'){
    const m = bottomById[sel.id];
    bottomIds.add(m.id);
    m.relatedPhotoIds.forEach(id => photoIds.add(id));
    m.relatedTopIds.forEach(id => topIds.add(id));
  } else if(sel.source === 'photo'){
    const p = photosData[sel.id];
    photoIds.add(sel.id);
    p.relatedTopIds.forEach(id => topIds.add(id));
    p.relatedBottomIds.forEach(id => bottomIds.add(id));
  }
  return {photoIds, topIds, bottomIds};
}

function setPhotoElevated(idx, elevated){
  const m = meshes[idx];
  if(!m || idx === expandedPhotoIndex) return;
  m.elevated = elevated;
  gsap.to(m, { elevateOffset: elevated ? 140 : 0, duration:.45, ease:'power3.out' });
  gsap.to(m.holder.scale, { x: elevated ? 1.1 : 1, y: elevated ? 1.1 : 1, duration:.45, ease:'power3.out' });
  gsap.to(m.frame.material.color, elevated
    ? { r:1, g:0.91, b:0.66, duration:.45 }
    : { r:250/255, g:248/255, b:243/255, duration:.45 });
}

function elevateRelatedPhotos(photoIdSet){
  meshes.forEach(m => setPhotoElevated(m.index, photoIdSet.has(m.index)));
}

function clearElevatedPhotos(){
  meshes.forEach(m => setPhotoElevated(m.index, false));
}

// 連接線搬到獨立圖層後，它不再是 .ms 的子元素，因此不會自動繼承 .ms 的
// hidden（分類篩選隱藏）／dim（非相關淡化）／active（選中上移）狀態。
// 這裡統一把卡片當下的狀態複製到對應的連接線上，讓兩者永遠一致。
function syncStemStates(){
  const sync = el => {
    const stemEl = el.__stem;
    if(!stemEl) return;
    const isHidden = el.classList.contains('hidden');
    stemEl.classList.toggle('hidden', isHidden);
    // 已隱藏的卡片不必再理會 dim/active（applyHighlight 也會略過它們），
    // 直接清掉避免殘留舊狀態。
    stemEl.classList.toggle('dim', !isHidden && el.classList.contains('dim'));
    stemEl.classList.toggle('active', !isHidden && el.classList.contains('active'));
  };
  Object.values(topEls).forEach(sync);
  Object.values(bottomEls).forEach(sync);
}

function applyHighlight(){
  const hl = hoverTarget || selection;
  const rel = relatedSets(hl);

  topMilestones.forEach(m => {
    const el = topEls[m.id];
    if(el.classList.contains('hidden')) return;
    el.classList.toggle('active', !!hl && rel.topIds.has(m.id));
    el.classList.toggle('dim', !!hl && !rel.topIds.has(m.id));
  });
  bottomMilestones.forEach(m => {
    const el = bottomEls[m.id];
    el.classList.toggle('active', !!hl && rel.bottomIds.has(m.id));
    el.classList.toggle('dim', !!hl && !rel.bottomIds.has(m.id));
  });

  syncStemStates();

  meshes.forEach(m => {
    const isRelated = !hl || rel.photoIds.has(m.index);
    const selOpacity = isRelated ? 1 : 0.25;
    const selFrameOpacity = isRelated ? .95 : .25;
    gsap.to(m.mesh.material, { opacity: selOpacity, duration:.4 });
    gsap.to(m.frame.material, { opacity: selFrameOpacity, duration:.4 });
  });

  if(hl && (hl.source === 'top' || hl.source === 'bottom')){
    elevateRelatedPhotos(rel.photoIds);
  } else {
    clearElevatedPhotos();
  }
}

function eventDetail(source, id){
  if(source === 'top'){
    const m = topById[id];
    const relBottom = m.relatedBottomIds.map(bid => bottomById[bid]).filter(Boolean).map(b => L(b,'title'));
    const photoCount = m.relatedPhotoIds.length;
    const ownContent = L(m, 'content');
    const desc = ownContent || (relBottom.length
      ? `${Math.floor(m.year)} 年，「${L(m,'title')}」發生，與「${relBottom[0]}」等 ${relBottom.length} 項下軌時代背景相關，並留有 ${photoCount} 張關聯影像記錄。`
      : `${Math.floor(m.year)} 年，「${L(m,'title')}」發生，留有 ${photoCount} 張關聯影像記錄。`);
    return { title: L(m,'title'), year: m.year, desc };
  } else {
    const m = bottomById[id];
    const relTop = m.relatedTopIds.map(tid => topById[tid]).filter(Boolean).map(t => L(t,'title'));
    const photoCount = m.relatedPhotoIds.length;
    const ownContent = L(m, 'content');
    const desc = ownContent || (relTop.length
      ? `${Math.floor(m.year)} 年，「${L(m,'title')}」為當時的社會／教育背景，與「${relTop[0]}」等 ${relTop.length} 項校史事件相關，並留有 ${photoCount} 張關聯影像記錄。`
      : `${Math.floor(m.year)} 年，「${L(m,'title')}」為當時的社會／教育背景，留有 ${photoCount} 張關聯影像記錄。`);
    return { title: L(m,'title'), year: m.year, desc };
  }
}

function openEventModal(source, id){
  const detail = eventDetail(source, id);
  document.getElementById('eventModalYear').textContent = Math.floor(detail.year);
  document.getElementById('eventModalTitle').textContent = detail.title;
  document.getElementById('eventModalDesc').textContent = detail.desc;
  document.getElementById('eventModalOverlay').classList.add('show');
}

function closeEventModal(){
  document.getElementById('eventModalOverlay').classList.remove('show');
}

document.getElementById('eventModalClose').addEventListener('click', closeEventModal);
// #eventModalOverlay 的點擊改由下方 bindOverlayClick() 統一處理（見 6a-3），
// 這樣事件詳情彈窗蓋住的事件卡片也不會出現「點了沒反應」的死區。

function handleSelect(source, id){
  // 點擊事件節點或照片 → 視為一次使用者操作，重置右上角提示文字的閒置計時器
  resetHintTimer();
  if(source === 'top' || source === 'bottom'){
    if(selection && selection.source===source && selection.id===id){
      // 第二次點擊同一個上/下時間線節點 → 彈出詳情視窗
      openEventModal(source, id);
      return;
    }
    closeEventModal();
    // v14-17：切換到事件節點時，若還有照片停留在展開狀態，一併收合，
    // 避免 selection 已經換人、expandedPhotoIndex 卻還指著舊照片，
    // 之後再點那張照片時變成「兩邊狀態對不上 → 什麼都沒發生」。
    if(expandedPhotoIndex !== null) collapsePhoto();
    selection = { source, id };
    const year = source==='top' ? topById[id].year : bottomById[id].year;
    targetFocusPx = clamp(yearToVX(year), 0, TOTAL_VIRTUAL_W);
    // 選到事件節點會把時間軸捲到該年份，照片列整排換位置 → 舊的點擊記憶作廢
    clearPhotoPickMemory();
    applyHighlight();
    return;
  }

  closeEventModal();
  if(selection && selection.source===source && selection.id===id){
    // v14-17：只有「這張照片目前真的展開中」時，再次點擊才是收合。
    // 若 selection 還記著這張照片、但它其實已經被收合了（狀態不同步），
    // 舊版會走進這裡把 selection 清掉、然後 collapsePhoto() 因為
    // expandedPhotoIndex 是 null 直接 return——畫面上完全沒有任何變化，
    // 就是使用者看到的「點了沒反應」。改成這種情況直接重新展開。
    if(source === 'photo' && expandedPhotoIndex === null){
      selection = { source, id };
      expandPhoto(id);
      targetFocusPx = clamp(yearToVX(photosData[id].year), 0, TOTAL_VIRTUAL_W);
      applyHighlight();
      return;
    }
    selection = null;
    if(source==='photo') collapsePhoto();
  } else {
    selection = { source, id };
    if(source==='photo'){
      if(expandedPhotoIndex!==null && expandedPhotoIndex!==id) collapsePhoto(true);
      expandPhoto(id);
    } else if(expandedPhotoIndex!==null){
      collapsePhoto();
    }
    const year = photosData[id].year;
    targetFocusPx = clamp(yearToVX(year), 0, TOTAL_VIRTUAL_W);
  }
  applyHighlight();
}

/* ---------------------------------------------------------
   6a-1. 清空選取（Reset Selection）
   點擊空白區域（Three.js 畫布沒點到照片、或 #stage 上任何非互動元件的
   地方）時呼叫，統一清空 selection、關閉 Modal / Event Modal、
   收合展開中的照片，並重置高亮／dim 狀態。
   --------------------------------------------------------- */
function resetSelection(){
  selection = null;
  closeEventModal();
  collapsePhoto();
  applyHighlight();
}

/* ---- photo click: stage-space nearest-center (correct under CSS scale) ---- */

function clientToStage(clientX, clientY){
  // Use the scaled #stage box — not the canvas drawing buffer — so CSS
  // transform:scale() on the 4K stage cannot skew hit-testing.
  const rect = stage.getBoundingClientRect();
  if(!rect.width || !rect.height) return null;
  return {
    x: (clientX - rect.left) / rect.width * W,
    y: (clientY - rect.top) / rect.height * H
  };
}

function getPhotoStageRect(m){
  const s = m.holder.scale.x || 1;
  const pw = (PHOTO_W + FRAME_PAD * 2) * s;
  const ph = (PHOTO_H + FRAME_PAD * 2) * s;
  const stageX = W / 2 + m.holder.position.x;
  const stageY = H / 2 - m.holder.position.y;
  return {
    left: stageX - pw / 2,
    right: stageX + pw / 2,
    top: stageY - ph / 2,
    bottom: stageY + ph / 2,
    cx: stageX,
    cy: stageY,
    order: m.mesh.renderOrder || 0,
    z: m.holder.position.z,
    idx: m.index,
    clustered: (m.clusterHalfWidth || 0) > 0,
    scale: s
  };
}

function pickPhotoAt(clientX, clientY){
  const pt = clientToStage(clientX, clientY);
  if(!pt) return null;
  let bestIdx = null, bestDist = Infinity;
  meshes.forEach(m => {
    if(m.catFilteredOut || !m.holder.visible) return;
    const r = getPhotoStageRect(m);
    const pad = 6;
    if(pt.x < r.left - pad || pt.x > r.right + pad || pt.y < r.top - pad || pt.y > r.bottom + pad) return;
    // Prefer the frame whose centre is closest on X — overlapping neighbours
    // used to steal clicks because the centred/front photo has a higher
    // renderOrder even when you clicked the visible side of another frame.
    const dist = Math.hypot(pt.x - r.cx, (pt.y - r.cy) * 0.35);
    if(dist < bestDist){ bestDist = dist; bestIdx = m.index; }
  });
  return bestIdx;
}

let lastPhotoPick = null;
const PHOTO_RECLICK_TIMEOUT = 4000;

function clearPhotoPickMemory(){ lastPhotoPick = null; }

function photoPickStillValid(idx){
  const m = meshes.find(mm => mm.index === idx);
  return !!m && !m.catFilteredOut && m.holder.visible;
}

function resolvePhotoClick(clientX, clientY){
  const idx = pickPhotoAt(clientX, clientY);
  if(idx !== null){
    lastPhotoPick = { x: clientX, y: clientY, idx, time: Date.now() };
    return idx;
  }
  // Only reuse last pick to close the currently expanded photo (re-click
  // while it has animated away from the pointer). Never steal a click
  // that should hit a neighbouring frame.
  if(expandedPhotoIndex !== null && lastPhotoPick && lastPhotoPick.idx === expandedPhotoIndex){
    if(Date.now() - lastPhotoPick.time > PHOTO_RECLICK_TIMEOUT){ lastPhotoPick = null; return null; }
    if(Math.abs(clientX - lastPhotoPick.x) <= 56 && Math.abs(clientY - lastPhotoPick.y) <= 56
       && photoPickStillValid(expandedPhotoIndex)){
      lastPhotoPick.time = Date.now();
      return expandedPhotoIndex;
    }
  }
  return null;
}

// 暫時關掉彈窗自己的 pointer-events，問瀏覽器「這個座標下面真正的元素是誰」，
// 用來判斷彈窗背後是不是壓著一張事件卡片（.ms）。
function elementBelowOverlay(overlayEl, x, y){
  const prev = overlayEl.style.pointerEvents;
  overlayEl.style.pointerEvents = 'none';
  const el = document.elementFromPoint(x, y);
  overlayEl.style.pointerEvents = prev;
  return el;
}

// 由 .ms 元素反查它是上軌還是下軌、以及原始的 id（保留原本的型別，
// 不用 dataset.id 的字串，避免跟 selection.id 比對時型別對不上）。
function msElInfo(msEl){
  let hit = topMilestones.find(m => topEls[m.id] === msEl);
  if(hit) return { source:'top', id: hit.id };
  hit = bottomMilestones.find(m => bottomEls[m.id] === msEl);
  if(hit) return { source:'bottom', id: hit.id };
  return null;
}

renderer.domElement.addEventListener('click', (e) => {
  // v14-17：改用「按下點 → 放開點」的實際位移量判斷拖曳／點擊。
  const moved = pointerDownPt
    ? (Math.abs(e.clientX - pointerDownPt.x) > DRAG_CLICK_THRESHOLD ||
       Math.abs(e.clientY - pointerDownPt.y) > DRAG_CLICK_THRESHOLD)
    : dragMoved;
  pointerDownPt = null;
  dragMoved = false;
  if(moved) return;

  const idx = resolvePhotoClick(e.clientX, e.clientY);
  if(idx !== null){
    handleSelect('photo', idx);
  } else {
    resetSelection();
  }
});

renderer.domElement.addEventListener('pointermove', (e) => {
  if(dragging) { renderer.domElement.style.cursor = 'grabbing'; return; }
  const idx = pickPhotoAt(e.clientX, e.clientY);
  renderer.domElement.style.cursor = idx !== null ? 'pointer' : 'grab';
});

function expandPhoto(idx){
  expandedPhotoIndex = idx;
  const m = meshes[idx];

  meshes.forEach(mm => {
    const dist = mm.index - idx;
    let extra = 0;
    if(Math.abs(dist) <= 6 && dist !== 0) extra = Math.sign(dist) * (7 - Math.abs(dist)) * 18;
    gsap.to(mm, { extraShift: extra, duration:.5, ease:'power3.out' });
  });

  gsap.to(m.holder.position, { y: m.baseY + 156, z: 160, duration:.5, ease:'power3.out' });
  gsap.to(m.holder.scale, { x:1.8, y:1.8, duration:.5, ease:'power3.out' });

  const detail = photoDetail(idx);
  const modalImg = document.getElementById('modalImg');
  // 照片欄位空白／檔名無效／載入失敗時，一律隱藏 <img>，避免顯示破圖圖示
  if(detail.photoSrc){
    modalImg.onerror = () => { modalImg.style.display = 'none'; };
    modalImg.src = detail.photoSrc.includes('picsum.photos') ? detail.photoSrc.replace('/800/600','/1200/900') : detail.photoSrc;
    modalImg.style.display = '';
  } else {
    modalImg.onerror = null;
    modalImg.removeAttribute('src');
    modalImg.style.display = 'none';
  }
  // v7 新增：Excel photo-2 欄位的第二張照片，顯示為右上角小縮圖，點擊可與主圖互換
  const modalImg2 = document.getElementById('modalImg2');
  if(detail.photoSrc2){
    modalImg2.onerror = () => { modalImg2.style.display = 'none'; };
    modalImg2.src = detail.photoSrc2;
    modalImg2.style.display = 'block';
    modalImg2.onclick = () => {
      const swap = modalImg.src;
      modalImg.src = modalImg2.src;
      modalImg2.src = swap;
    };
  } else {
    modalImg2.onerror = null;
    modalImg2.removeAttribute('src');
    modalImg2.style.display = 'none';
  }
  document.getElementById('modalYear').textContent = Math.floor(detail.year);
  document.getElementById('modalTitle').textContent = detail.title;
  document.getElementById('modalDesc').textContent = detail.desc;
  document.getElementById('modalOverlay').classList.add('show');
}

function collapsePhoto(skipModalClose){
  // v14-18：關閉彈窗這一步必須放在最前面、不受 expandedPhotoIndex 影響。
  // 舊版是先 `if(expandedPhotoIndex===null) return;` 再關彈窗，只要這兩個
  // 狀態一旦不同步（彈窗還開著、但 expandedPhotoIndex 已經是 null），
  // collapsePhoto() 就會直接 return、彈窗永遠關不掉——之後不論點哪裡都
  // 沒有任何反應，變成一個完全卡死的死區。
  if(!skipModalClose) document.getElementById('modalOverlay').classList.remove('show');
  if(expandedPhotoIndex===null) return;
  const idx = expandedPhotoIndex;
  const m = meshes[idx];
  meshes.forEach(mm => {
    gsap.to(mm, { extraShift: 0, duration:.45, ease:'power2.inOut' });
  });
  gsap.to(m.holder.scale, { x:1, y:1, duration:.4 });
  expandedPhotoIndex = null;
}

document.getElementById('modalClose').addEventListener('click', () => { selection=null; collapsePhoto(); applyHighlight(); });

/* ---------------------------------------------------------
   6a-3. 彈窗開啟中的點擊「穿透」（Overlay Click Pass-through）
   問題：#modalOverlay / #eventModalOverlay 是覆蓋整個畫面、z-index:60 的
   全螢幕圖層，彈窗一打開，畫布與事件卡片就再也收不到任何 click。原本只有
   「點到 overlay 背景（e.target.id === 'modalOverlay'）」才會關閉，而彈窗
   卡片本身（#modalCard）沒有任何 click 行為——偏偏 #modalCard 是置中的，
   正好蓋在「置中那張照片」上面，所以使用者點開置中照片後、滑鼠不動再點
   一次，那一下其實是點在 #modalCard 上，於是完全沒有反應（使用者回報的
   「點擊無效」）。
   解法：彈窗開啟時的點擊一律先還原「這一下在畫面上到底點到什麼」——
   先看彈窗底下是不是事件卡片（.ms），再用 raycaster 判斷是不是照片——
   然後才決定行為，讓畫面上任何位置都不會出現「點了沒反應」的死區：
     ・點到目前已展開的那張照片 → 收合並關閉彈窗（等同再次點擊的切換行為）
     ・點到別張照片／別的事件卡片 → 直接切換過去
     ・什麼都沒點到 → 維持原本「點背景關閉」的行為
   另外用 pointerdown→click 的位移量擋掉「拖曳／捲動長內文」誤判成點擊。
   --------------------------------------------------------- */
function handleOverlayClick(overlayEl, e, cardSelector){
  // 0) v14-17（「置中照片打開後、原地再點一次沒反應」的真正根因）
  //    照片一被點開，expandPhoto() 會用 gsap 把它往上抬 156、放大到 1.8 倍，
  //    同時 targetFocusPx 也會把整條時間軸捲到該年份——也就是說「照片已經
  //    不在剛才被點的那個螢幕位置上了」。舊版仍然拿原座標去 raycaster 掃，
  //    掃不到就落到最後的「什麼都沒點到」分支，使用者原地再點一次自然
  //    像是沒反應／反應不如預期。
  //    而且彈窗卡片（#modalCard）本身是不透明、置中、又剛好蓋在那張照片
  //    上面的——使用者在那個區域看到的是彈窗，不是背後的照片，硬要「穿透」
  //    去猜背後有什麼本來就不合理（有時還會誤開到被彈窗擋住、根本看不見
  //    的另一張照片）。
  //    因此改成：點在彈窗卡片本體上 → 就當作再次點擊「這個彈窗代表的那個
  //    對象」，直接收合並關閉，永遠有明確反應。真正需要「穿透」的只有
  //    卡片以外那圈半透明背景（那裡才真的看得到底下的內容）。
  if(cardSelector && e.target.closest && e.target.closest(cardSelector)){
    selection = null;
    closeEventModal();
    collapsePhoto();
    applyHighlight();
    return;
  }

  // 1) 彈窗底下是不是事件卡片（DOM 元素畫在照片畫布之上，優先判斷）
  const below = elementBelowOverlay(overlayEl, e.clientX, e.clientY);
  const msEl = below && below.closest ? below.closest('.ms') : null;
  if(msEl){
    const info = msElInfo(msEl);
    if(info){
      const same = selection && selection.source === info.source && selection.id === info.id;
      if(same){
        // 再次點擊同一個節點 → 收起詳情（明確的關閉反應，而不是沒反應）
        closeEventModal();
        if(expandedPhotoIndex !== null){ selection = null; collapsePhoto(); }
        applyHighlight();
      } else {
        if(expandedPhotoIndex !== null) collapsePhoto();
        handleSelect(info.source, info.id);
      }
      return;
    }
  }

  // 2) 有沒有點到照片
  const idx = resolvePhotoClick(e.clientX, e.clientY);
  if(idx !== null){
    if(idx === expandedPhotoIndex){
      // 就是目前展開中的那一張 → 收合 + 關閉彈窗
      selection = null;
      collapsePhoto();
      applyHighlight();
    } else {
      closeEventModal();
      handleSelect('photo', idx);
    }
    return;
  }

  // 3) 什麼都沒點到 → 原本的「點背景關閉、清空選取」
  selection = null;
  closeEventModal();
  collapsePhoto();
  applyHighlight();
}

// 拖曳（例如捲動彈窗內的長內文）不應該被當成一次點擊
function bindOverlayClick(overlayEl, ignoreSelector, cardSelector){
  let downPos = null;
  overlayEl.addEventListener('pointerdown', (e) => { downPos = { x:e.clientX, y:e.clientY }; });
  overlayEl.addEventListener('click', (e) => {
    // 彈窗內有自己行為的控制項（關閉鈕、第二張照片縮圖）維持原本行為
    if(ignoreSelector && e.target.closest(ignoreSelector)) { downPos = null; return; }
    if(downPos){
      const moved = Math.abs(e.clientX - downPos.x) > 6 || Math.abs(e.clientY - downPos.y) > 6;
      downPos = null;
      if(moved) return;
    }
    handleOverlayClick(overlayEl, e, cardSelector);
  });
}

bindOverlayClick(document.getElementById('modalOverlay'), '#modalClose,#modalImg2', '#modalCard');
bindOverlayClick(document.getElementById('eventModalOverlay'), '#eventModalClose', '#eventModalCard');

/* ---------------------------------------------------------
   6a-2. 點擊空白區域清空選取（Reset Selection on Background Click）
   在 #stage 上監聽點擊事件：只要點擊目標不落在任何「互動元件」
   （事件節點卡片 .ms、分類／語言／Excel／字體大小按鈕、彈窗本體、
   底部時間軸控制列、Three.js 畫布）之內，就視為點擊了背景空白處，
   統一呼叫 resetSelection() 清空目前的選取狀態。
   ・Three.js 畫布另有自己的 raycaster 判斷邏輯（見上方），故在此排除，
     避免同一次點擊被重複處理、互相干擾。
   ・不使用 stopPropagation／preventDefault，因此完全不影響拖拽時間軸
     （host 的 pointerdown/pointermove、tlTrack/tlThumb 拖拽）或滾輪縮放。
   --------------------------------------------------------- */
const BACKGROUND_CLICK_IGNORE_SELECTOR = [
  '.ms',                 // 上／下軌事件節點卡片
  '.catBtn',              // 分類篩選按鈕 A-E
  '.langBtn',             // 語言切換按鈕
  '#excelImportBtn',      // Excel 匯入按鈕
  '#excelFileInput',
  '#excelClearBtn',
  '.fontToggleBtn',       // 字體大小切換 aA 按鈕
  '.fontSizeOption',      // 字體大小選單選項
  '#modalCard',           // 照片詳情彈窗本體
  '#eventModalCard',      // 事件詳情彈窗本體
  '#modalOverlay',        // 照片彈窗背景（已有自己的關閉/清空邏輯）
  '#eventModalOverlay',   // 事件彈窗背景（已有自己的關閉邏輯）
  '#timelineBar',         // 底部時間軸拖拽列（含 tlTrack/tlThumb/tlTicks）
  'canvas'                // Three.js 畫布：由上方 raycaster 邏輯自行處理
].join(',');

// v14-17：拖曳時間軸時，如果放開的位置剛好落在事件卡片等 DOM 元素上，
// click 的 target 會退回到共同祖先 #stage，於是一次單純的拖曳會被誤判成
// 「點了背景」而把目前的選取整個清掉。這裡同樣用按下→放開的位移量把
// 拖曳擋掉，只有真正的原地點擊才會清空選取。
let stageDownPt = null;
stage.addEventListener('pointerdown', (e) => { stageDownPt = { x:e.clientX, y:e.clientY }; });
stage.addEventListener('click', (e) => {
  const moved = stageDownPt && (
    Math.abs(e.clientX - stageDownPt.x) > DRAG_CLICK_THRESHOLD ||
    Math.abs(e.clientY - stageDownPt.y) > DRAG_CLICK_THRESHOLD
  );
  stageDownPt = null;
  if(moved) return;
  if(e.target.closest(BACKGROUND_CLICK_IGNORE_SELECTOR)) return;
  resetSelection();
});

/* =========================================================
   6b. EXCEL 匯入（讀取「上軌事件／下軌事件／照片列」三個分頁）
   ========================================================= */
// Excel 標題列常帶有換行＋中文說明（例如 "title-TC\n(事件標題)"），
// 只取 \n 前面的純英文欄位名稱，避免後續依欄名讀取時對應不到資料
function cleanRowKeys(row) {
  const cleaned = {};
  for (let rawKey in row) {
    if (!rawKey) continue;
    const cleanKey = rawKey.split('\n')[0].trim();
    cleaned[cleanKey] = row[rawKey];
  }
  return cleaned;
}

function sheetRows(wb, name){
  const ws = wb.Sheets[name];
  if(!ws) return null; // 分頁不存在

  // 一律從第 1 行開始讀取欄位名稱與資料（不再跳行／不使用 range 偏移）
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  return rows.map(cleanRowKeys);
}

function parseWorkbook(wb){
  console.log('讀取到的 Sheet 名稱:', wb.SheetNames);
  const topRaw = sheetRows(wb, SHEET_NAMES.top);
  const bottomRaw = sheetRows(wb, SHEET_NAMES.bottom);
  const photoRaw = sheetRows(wb, SHEET_NAMES.photo);
  const missing = [];
  if(topRaw === null) missing.push(SHEET_NAMES.top);
  if(bottomRaw === null) missing.push(SHEET_NAMES.bottom);
  if(photoRaw === null) missing.push(SHEET_NAMES.photo);
  if(missing.length) throw new Error(`找不到分頁：${missing.join('、')}`);
  const raw = {
    topRows: serializeRows(topRaw),
    bottomRows: serializeRows(bottomRaw),
    photoRows: serializeRows(photoRaw)
  };
  return { raw, ds: buildDataset(raw.topRows, raw.bottomRows, raw.photoRows) };
}

// 以新資料整個重建畫面：關聯索引、事件卡片 DOM、相片鏈 mesh，並重置選取／篩選狀態
function rebuildTimeline(ds){
  closeEventModal();
  selection = null; hoverTarget = null; expandedPhotoIndex = null;
  clearPhotoPickMemory();
  document.getElementById('modalOverlay').classList.remove('show');

  applyDataset(ds);

  // v14-4：先依這次匯入的實際資料重新決定 YEAR_MIN／YEAR_MAX（不再寫死
  // 1971–2026），YEAR_SPAN 也會跟著更新；一定要在 rebuildYearScale() 之前
  // 呼叫，因為後者的累加陣列大小、每一步對應的年份都是根據 YEAR_SPAN／
  // YEAR_MIN 算出來的。
  updateYearRange();

  // v14-3：photosData 內容（尤其是各年份的照片數量）改變後，一定要先
  // 重新計算年份縮放（哪些年份要被拉開、拉開多少），再建立照片 mesh 與
  // 事件卡片 DOM——buildPhotoMeshes()／buildMilestoneDOM() 都是直接呼叫
  // yearToVX() 取得座標，順序反過來會拿到舊資料算出來的縮放結果。
  rebuildYearScale();

  // v14-4：年份範圍變動後，主時間軸與底部拖拽列上「每 5 年一個」的刻度
  // 也要整批重建（刻度數量、標示的年份都可能不一樣了）。
  buildAxisTicks();
  buildTimelineTicks();

  disposePhotoMeshes();
  buildPhotoMeshes();

  buildMilestoneDOM();

  activeCategory = null;
  bandTop.style.backgroundColor = DEFAULT_TOP_BG;
  updateTopTextContrast(DEFAULT_TOP_BG);
  document.querySelectorAll('.catBtn').forEach(b => b.classList.remove('on'));
  updateCategoryBadges();
  updateCategoryButtonLabels();

  targetFocusPx = focusPx = TOTAL_VIRTUAL_W * 0.5;

  updateMilestonePositions();
  updateTimelineBar();
  applyHighlight();
}

document.getElementById('excelFileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const statusEl = document.getElementById('excelStatus');
  statusEl.textContent = currentLang === 'en' ? 'Importing…' : (currentLang === 'zh-Hans' ? '汇入中…' : '匯入中…');
  try{
    const buf = await file.arrayBuffer();
    // v8：cellDates:true 讓 Excel「日期格式」儲存格（如 1971/1/1）直接讀出 JS Date 物件，
    // 交由 parseYear() 統一擷取西元年份，而非停留在難以判讀的 Excel 日期序列數字
    const wb = XLSX.read(buf, { type:'array', cellDates:true });
    const parsed = parseWorkbook(wb);
    const ds = parsed.ds;
    const total = ds.topRows.length + ds.bottomRows.length + ds.photoRows.length;
    if(total === 0){
      throw new Error('解析成功但沒有讀到任何資料，請確認分頁名稱與欄位（id / year / title-TC…）是否正確');
    }
    const saved = saveWorkbookCache(parsed.raw, file.name);
    rebuildTimeline(ds);
    const txt = uiCopy();
    const status = txt.statusImported(ds.topRows.length, ds.bottomRows.length, ds.photoRows.length)
      + (saved ? '' : (currentLang === 'en' ? ' (browser storage full — not kept)' : '（本機空間不足，重新整理後不會保留）'));
    setDataChrome(true, status);
  }catch(err){
    console.error('Excel 解析失敗', err);
    const msg = `匯入失敗：${err.message || err}`;
    setDataChrome(!!(topMilestones.length || bottomMilestones.length || photosData.length), msg);
    alert(`Excel 匯入失敗：${err.message || err}`);
  }finally{
    e.target.value = '';
  }
});

document.getElementById('excelClearBtn').addEventListener('click', () => {
  const txt = uiCopy();
  if(!window.confirm(txt.clearConfirm)) return;
  clearWorkbookCache();
  rebuildTimeline(emptyDataset());
  setDataChrome(false, txt.statusCleared);
});

/* =========================================================
   7. RESIZE
   ========================================================= */
/*
 * 響應式縮放策略：
 * - 3D 與所有介面元素（字體、卡片、按鈕、時間軸間距）皆以固定的
 *   3840x2160（16:9）虛擬畫布座標系統排版，彼此間的比例與相對位置
 *   永遠不變。
 * - #stage 的 layout 尺寸固定為 3840x2160，因此不論視窗多大，內部
 *   座標系統（含 three.js camera frustum）都不需要重新計算。
 * - 真正負責「隨視窗等比縮放」的，是套用在 #stage 上的 CSS
 *   transform:scale()，取視窗寬高比與 3840x2160 的最小縮放比，
 *   確保永遠維持 16:9 且不變形、不裁切、置中顯示。
 * - 為了在小螢幕（筆電/1080p）上避免用超過畫面實際需要的解析度算圖
 *   （4K canvas + 高 DPI 疊加會非常吃效能），renderer 的像素密度會
 *   隨目前的縮放比一起調整；在大螢幕/4K 展覽螢幕上則維持清晰銳利。
 */
function fitStage(){
  const scale = Math.min(window.innerWidth / 3840, window.innerHeight / 2160);
  stage.style.transform = `scale(${scale})`;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const effectivePixelRatio = Math.max(1, dpr * Math.min(scale, 1.25));
  renderer.setPixelRatio(effectivePixelRatio);
  renderer.setSize(W, H);
}

let resizeRAF = null;
function onResize(){
  if(resizeRAF) cancelAnimationFrame(resizeRAF);
  resizeRAF = requestAnimationFrame(() => {
    fitStage();
    // v14-6：底部拖拽列刻度的疏密（見 computeTimelineTickStep）是依「目前
    // 實際渲染寬度」算出來的，視窗尺寸改變後（例如縮小瀏覽器視窗）這個
    // 寬度會跟著變，必須重新計算，否則縮小視窗後刻度可能又擠在一起。
    buildTimelineTicks();
  });
}
window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', onResize);
fitStage();
// v14-6：buildTimelineTicks() 在上面「3. INPUT & GLOBAL SYNC」區塊已經
// 呼叫過一次，但那時 fitStage() 還沒執行過，#stage 的 CSS scale() 尚未
// 套用，量到的 tlTrack 寬度不是使用者實際看到的最終像素值。這裡在
// fitStage() 第一次套用正確縮放之後，重新計算一次刻度疏密，確保畫面
// 剛載入時的初始刻度就是正確、不擠在一起的結果。
buildTimelineTicks();

/* =========================================================
   8. ANIMATE LOOP
   ========================================================= */
function updateYearReadout(){
  const centerYear = Math.round(vxToYear(focusPx));
  document.getElementById('yearNum').textContent = clamp(centerYear, YEAR_MIN, YEAR_MAX);
}

function animate(){
  if(destroyed) return;
  animId = requestAnimationFrame(animate);
  focusPx += (targetFocusPx - focusPx) * 0.1;

  calculateChainLayout();
  
  updateMilestonePositions();
  updateTimelineBar();
  updateYearReadout();
  updateGuideLine();

  renderer.render(scene, camera);
}

  refreshImportHintCopy();
  try {
    const cached = loadWorkbookCache();
    if(cached){
      const ds = buildDataset(cached.topRows, cached.bottomRows, cached.photoRows);
      const total = ds.topRows.length + ds.bottomRows.length + ds.photoRows.length;
      if(total > 0){
        rebuildTimeline(ds);
        setDataChrome(true, uiCopy().statusRestored(ds.topRows.length, ds.bottomRows.length, ds.photoRows.length));
      } else {
        setDataChrome(false, '');
      }
    } else {
      setDataChrome(false, '');
    }
  } catch (err) {
    console.error('本機紀錄載入失敗', err);
    setDataChrome(false, '');
  }

  animate();


  function destroy(){
    destroyed = true;
    cancelAnimationFrame(animId);
    try { disposePhotoMeshes(); } catch (e) { /* ignore */ }
    try {
      renderer.dispose();
      if(renderer.domElement && renderer.domElement.parentNode){
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    } catch (e) { /* ignore */ }
    window.removeEventListener('pointermove', onWinPointerMove);
    window.removeEventListener('pointerup', onWinPointerUp);
    window.removeEventListener('pointermove', onThumbPointerMove);
    window.removeEventListener('pointerup', onThumbPointerUp);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
    window.removeEventListener('keydown', onKeyDown);
  }
  return destroy;
}
