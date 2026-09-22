import fs from "node:fs";

const css = fs.readFileSync("/workspace/src/timeline/timeline.css", "utf8");
let js = fs.readFileSync("/workspace/src/timeline/engine.js", "utf8");
js = js.replace(/^\/\/ @ts-nocheck\s*/, "");
js = js.replace(/^import .*\n/gm, "");
js = js.replace("export function mountTimeline()", "function mountTimeline()");
js = js.replace(
  "const IMAGE_BASE_PATH = '/images/';",
  "const IMAGE_BASE_PATH = './images/';"
);
js = js.trimEnd() + "\n\nmountTimeline();\n";

const three = fs.readFileSync("/tmp/vendor/three.min.js", "utf8");
const gsap = fs.readFileSync("/tmp/vendor/gsap.min.js", "utf8");
const xlsx = fs.readFileSync("/tmp/vendor/xlsx.full.min.js", "utf8");

const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<title>樹仁校史 · 全域時間軸</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
<div id="wrap">
  <div id="stage">
    <div id="bandTop">
      <div id="topCatBadge">
        <span class="dot">●</span>
        <span class="label"></span>
      </div>
    </div>
    <div id="bandBottom">
      <div id="bottomTrackLabel">
        <span class="label"></span>
      </div>
    </div>
    <div id="threeHost"></div>

    <div class="msLayer msStemLayer" id="topStemLayer"></div>
    <div class="msLayer msStemLayer" id="bottomStemLayer"></div>
    <div class="msLayer" id="topLayer"></div>
    <div class="msLayer" id="bottomLayer"></div>

    <div class="axisLayer" id="topAxisLayer">
      <div class="axisLine"></div>
    </div>
    <div class="axisLayer" id="bottomAxisLayer">
      <div class="axisLine"></div>
    </div>
    <div id="guideLine"></div>

    <div id="headerLeft">
      <div id="langSwitch">
        <div class="langBtn active" data-lang="zh-Hant">繁</div>
        <div class="langBtn" data-lang="zh-Hans">簡</div>
        <div class="langBtn" data-lang="en">ENG</div>
        <label id="excelImportBtn" for="excelFileInput" title="匯入 Excel 資料（上軌事件／下軌事件／照片列）">Excel</label>
        <input type="file" id="excelFileInput" accept=".xlsx,.xls" style="display:none">
        <button type="button" id="excelClearBtn" title="清空本機已儲存的時間軸資料" hidden>清空</button>
      </div>
      <div id="title">
        <h1 id="uiTitle">樹仁校史 · 全域時間軸</h1>
        <p id="uiSub">HONG KONG SHUE YAN UNIVERSITY · 1971–2026</p>
      </div>
      <div id="excelStatus"></div>
    </div>

    <div id="hint">
      拖拽底部時間軸 / 滾動畫面瀏覽年代<br>
      點擊照片或事件查看關聯並自動對焦
    </div>

    <div id="importHint">
      <div class="importHintInner">
        <strong>尚未載入資料</strong>
        <span>請按左上角「Excel」匯入工作簿。匯入後會保存在這個瀏覽器，可隨時按「清空」刪除。</span>
      </div>
    </div>

    <div id="yearReadout">
      <div class="num" id="yearNum">1998</div>
      <div class="lbl" id="uiYearLbl">CURRENT YEAR</div>
    </div>

    <div id="catButtons">
      <div class="catBtn" data-c="A"><span class="catDot"></span><span class="catBtnLabel"></span></div>
      <div class="catBtn" data-c="B"><span class="catDot"></span><span class="catBtnLabel"></span></div>
      <div class="catBtn" data-c="C"><span class="catDot"></span><span class="catBtnLabel"></span></div>
      <div class="catBtn" data-c="D"><span class="catDot"></span><span class="catBtnLabel"></span></div>
      <div class="catBtn" data-c="E"><span class="catDot"></span><span class="catBtnLabel"></span></div>
    </div>

    <div id="fontSizeSwitch">
      <div id="fontSizeToggle" class="fontToggleBtn">
        <span class="aaSmall">A</span>
        <span class="aaBig">A</span>
      </div>
      <div id="fontSizeMenu" class="fontSizeMenu">
        <div class="fontSizeOption" data-size="small">小</div>
        <div class="fontSizeOption active" data-size="medium">中</div>
        <div class="fontSizeOption" data-size="large">大</div>
      </div>
    </div>

    <div id="timelineBar">
      <div id="tlTrack">
        <div id="tlFill"></div>
        <div id="tlThumb"></div>
      </div>
      <div id="tlTicks"></div>
    </div>

    <div id="modalOverlay">
      <div id="modalCard">
        <button id="modalClose" type="button">✕</button>
        <div id="modalImgWrap">
          <button type="button" id="modalPrev" class="modalNav" aria-label="上一張">‹</button>
          <img id="modalImg" alt="">
          <button type="button" id="modalNext" class="modalNav" aria-label="下一張">›</button>
          <div id="modalPhotoCount"></div>
        </div>
        <div class="myear" id="modalYear"></div>
        <h2 id="modalTitle"></h2>
        <p id="modalDesc"></p>
      </div>
    </div>

    <div id="eventModalOverlay">
      <div id="eventModalCard">
        <button id="eventModalClose" type="button">✕</button>
        <div class="myear" id="eventModalYear"></div>
        <h2 id="eventModalTitle"></h2>
        <p id="eventModalDesc"></p>
      </div>
    </div>
  </div>
</div>
<script>
${three}
</script>
<script>
${gsap}
</script>
<script>
${xlsx}
</script>
<script>
${js}
</script>
</body>
</html>
`;

const outPublic = "/workspace/public/Timeline_4K.html";
const outArt = "/workspace/artifacts/Timeline_4K.html";
fs.writeFileSync(outPublic, html);
fs.writeFileSync(outArt, html);
console.log("wrote", outPublic, fs.statSync(outPublic).size, "bytes");
console.log("wrote", outArt, fs.statSync(outArt).size, "bytes");
