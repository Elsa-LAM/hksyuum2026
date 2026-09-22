import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as OrthographicCamera, c as TextureLoader, i as MeshBasicMaterial, n as Group, o as PlaneGeometry, r as Mesh, s as Scene, t as WebGLRenderer } from "../_libs/three.mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
import { n as utils, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DYSLdxfy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mountTimeline() {
	"use strict";
	let destroyed = false;
	let animId = 0;
	let YEAR_MIN = 1971, YEAR_MAX = 2026;
	const CAT_COLORS = {
		A: "#B85C5F",
		B: "#C1A46B",
		C: "#7D6A8E",
		D: "#6B8E7A",
		E: "#5C6E84"
	};
	const IMAGE_BASE_PATH = "/images/";
	const FONT_SCALES = {
		small: 1.28,
		medium: 1.56,
		large: 2
	};
	let currentFontSize = "medium";
	let selection = null;
	let hoverTarget = null;
	const UI_TEXT = {
		"zh-Hant": {
			title: "樹仁校史 · 全域時間軸",
			hint: "拖拽底部時間軸 / 滾動畫面瀏覽年代<br>點擊照片或事件查看關聯並自動對焦",
			yearLbl: "CURRENT YEAR",
			importTitle: "尚未載入資料",
			importBody: "請按左上角「Excel」匯入工作簿。匯入後會保存在這個瀏覽器，可隨時按「清空」刪除。",
			clearConfirm: "確定清空已儲存的時間軸資料？畫面會回到空白，需重新匯入 Excel。",
			statusImported: (t, b, p) => `已匯入並保存：${t} 筆上軌／${b} 筆下軌／${p} 張照片`,
			statusRestored: (t, b, p) => `已載入本機紀錄：${t} 筆上軌／${b} 筆下軌／${p} 張照片`,
			statusCleared: "已清空本機紀錄",
			statusEmpty: ""
		},
		"zh-Hans": {
			title: "树仁校史 · 全域时间轴",
			hint: "拖拽底部时间轴 / 滚动画面浏览年代<br>点击照片或事件查看关联并自动聚焦",
			yearLbl: "CURRENT YEAR",
			importTitle: "尚未载入资料",
			importBody: "请按左上角「Excel」汇入工作簿。汇入后会保存在这个浏览器，可随时按「清空」删除。",
			clearConfirm: "确定清空已保存的时间轴资料？画面会回到空白，需重新汇入 Excel。",
			statusImported: (t, b, p) => `已汇入并保存：${t} 笔上轨／${b} 笔下轨／${p} 张照片`,
			statusRestored: (t, b, p) => `已载入本机纪录：${t} 笔上轨／${b} 笔下轨／${p} 张照片`,
			statusCleared: "已清空本机纪录",
			statusEmpty: ""
		},
		"en": {
			title: "HKSYU History · Global Timeline",
			hint: "Drag timeline / Scroll to explore years<br>Click photo or event to reveal connections",
			yearLbl: "CURRENT YEAR",
			importTitle: "No data loaded",
			importBody: "Use Excel in the top-left to import the workbook. It is saved in this browser until you Clear it.",
			clearConfirm: "Clear the saved timeline data? The view will go blank until you import Excel again.",
			statusImported: (t, b, p) => `Imported and saved: ${t} top / ${b} context / ${p} photos`,
			statusRestored: (t, b, p) => `Restored: ${t} top / ${b} context / ${p} photos`,
			statusCleared: "Saved data cleared",
			statusEmpty: ""
		}
	};
	let currentLang = "zh-Hant";
	const SHEET_NAMES = {
		top: "上軌事件",
		bottom: "下軌事件",
		photo: "照片列"
	};
	const LANG_FIELD = {
		"zh-Hant": "TC",
		"zh-Hans": "SC",
		"en": "Eng"
	};
	function langKey() {
		return LANG_FIELD[currentLang] || "TC";
	}
	const categoryMap = {
		A: {
			color: "#B85C5F",
			name: {
				Eng: "Campus Development",
				TC: "校園發展",
				SC: "校园发展"
			}
		},
		B: {
			color: "#C1A46B",
			name: {
				Eng: "Honours, Service and Remembrance",
				TC: "榮譽、服務和緬懷",
				SC: "荣誉、服务和缅怀"
			}
		},
		C: {
			color: "#7D6A8E",
			name: {
				Eng: "Accreditation & Validation",
				TC: "認證與驗證",
				SC: "认证与验证"
			}
		},
		D: {
			color: "#6B8E7A",
			name: {
				Eng: "Institutional Advancement",
				TC: "校務拓展",
				SC: "校务拓展"
			}
		},
		E: {
			color: "#5C6E84",
			name: {
				Eng: "Reinventing Liberal Arts Education",
				TC: "重塑博雅教育",
				SC: "重塑博雅教育"
			}
		}
	};
	const bottomTrackTitle = {
		Eng: "Hong Kong Education History",
		TC: "香港教育歷史",
		SC: "香港教育历史"
	};
	function updateCategoryBadges() {
		const badge = document.getElementById("topCatBadge");
		if (badge) {
			if (activeCategory && categoryMap[activeCategory]) {
				const info = categoryMap[activeCategory];
				badge.querySelector(".dot").style.color = info.color;
				badge.querySelector(".label").style.color = info.color;
				badge.querySelector(".label").textContent = info.name[langKey()] || "";
				badge.classList.add("show");
			} else badge.classList.remove("show");
		}
		const bottomLabel = document.getElementById("bottomTrackLabel");
		if (bottomLabel) bottomLabel.querySelector(".label").textContent = bottomTrackTitle[langKey()] || "";
	}
	function updateCategoryButtonLabels() {
		document.querySelectorAll(".catBtn").forEach((btn) => {
			const c = btn.dataset.c;
			const info = categoryMap[c];
			const lbl = btn.querySelector(".catBtnLabel");
			if (lbl) lbl.textContent = info ? info.name[langKey()] || "" : c;
		});
	}
	function L(obj, field) {
		if (!obj) return "";
		return obj[`${field}-${langKey()}`] || obj[`${field}-TC`] || obj[`${field}-SC`] || obj[`${field}-Eng`] || "";
	}
	function str(v) {
		return v === void 0 || v === null ? "" : String(v).trim();
	}
	function field(row, name) {
		if (row[name] !== void 0) return row[name];
		const norm = (s) => String(s).toLowerCase().replace(/[\s　]+/g, "");
		const target = norm(name);
		const key = Object.keys(row).find((k) => norm(k) === target);
		return key ? row[key] : void 0;
	}
	function parseYear(v) {
		if (v instanceof Date && !isNaN(v.getTime())) return v.getFullYear();
		const s = String(v == null ? "" : v).trim();
		if (!s) return NaN;
		if (/^-?\d+(\.\d+)?$/.test(s)) {
			const n = Number(s);
			return Number.isFinite(n) ? Math.trunc(n) : NaN;
		}
		const m = s.match(/(\d{4})/);
		if (m) return Number(m[1]);
		const n = Number(s);
		return Number.isFinite(n) && s !== "" ? Math.trunc(n) : NaN;
	}
	function splitIds(v) {
		if (Array.isArray(v)) return v.map(str).filter(Boolean);
		if (!v) return [];
		return String(v).split(/[;；,，\/\s]+/).map((x) => x.trim()).filter(Boolean);
	}
	function convertGoogleDriveUrl(url) {
		let m = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
		if (!m) m = url.match(/drive\.google\.com\/(?:open|uc)\?[^#]*\bid=([a-zA-Z0-9_-]+)/i);
		return m ? `https://lh3.googleusercontent.com/d/${m[1]}` : url;
	}
	function resolvePhoto(filename) {
		const f = str(filename);
		if (!f) return null;
		if (/^#(VALUE|N\/A|REF|NAME\?|NULL|DIV\/0!|NUM)/i.test(f)) return null;
		if (f.length <= 2) return null;
		if (/^https?:\/\//i.test(f)) return encodeURI(convertGoogleDriveUrl(f));
		let cleanPath = f.trim().replace(/\\/g, "/");
		if (!(cleanPath.startsWith(IMAGE_BASE_PATH) || cleanPath.startsWith("./images/") || cleanPath.startsWith("images/"))) cleanPath = IMAGE_BASE_PATH + cleanPath;
		return encodeURI(cleanPath);
	}
	function normalizeTopRow(row) {
		return {
			id: String(field(row, "id") || "").trim(),
			year: parseYear(field(row, "year")),
			"title-Eng": str(field(row, "title-Eng")) || "",
			"title-TC": str(field(row, "title-TC")) || "",
			"title-SC": str(field(row, "title-SC")) || "",
			"content-Eng": str(field(row, "content-Eng")) || "",
			"content-TC": str(field(row, "content-TC")) || "",
			"content-SC": str(field(row, "content-SC")) || "",
			category: str(field(row, "category")).toUpperCase(),
			relatedBottomIds: splitIds(field(row, "relatedBottomIds"))
		};
	}
	function normalizeBottomRow(row) {
		return {
			id: String(field(row, "id") || "").trim(),
			year: parseYear(field(row, "year")),
			"title-Eng": str(field(row, "title-Eng")) || "",
			"title-TC": str(field(row, "title-TC")) || "",
			"title-SC": str(field(row, "title-SC")) || "",
			"content-Eng": str(field(row, "content-Eng")) || "",
			"content-TC": str(field(row, "content-TC")) || "",
			"content-SC": str(field(row, "content-SC")) || "",
			category: str(field(row, "category")).toUpperCase(),
			relatedTopIds: splitIds(field(row, "relatedTopIds"))
		};
	}
	function normalizePhotoRow(row) {
		return {
			id: String(field(row, "id") || "").trim(),
			year: parseYear(field(row, "year")),
			photoSrc: resolvePhoto(field(row, "photo-1")) || resolvePhoto(field(row, "photo-2")),
			photoSrc2: resolvePhoto(field(row, "photo-1")) && resolvePhoto(field(row, "photo-2")) ? resolvePhoto(field(row, "photo-2")) : null,
			"title-Eng": str(field(row, "title-Eng")) || "",
			"title-TC": str(field(row, "title-TC")) || "",
			"title-SC": str(field(row, "title-SC")) || "",
			"content-Eng": str(field(row, "content-Eng")) || "",
			"content-TC": str(field(row, "content-TC")) || "",
			"content-SC": str(field(row, "content-SC")) || "",
			relatedTopIds: splitIds(field(row, "relatedTopIds")),
			relatedBottomIds: splitIds(field(row, "relatedBottomIds")),
			category: str(field(row, "category")).toUpperCase()
		};
	}
	function buildDataset(topRows, bottomRows, photoRows) {
		const top = topRows.map(normalizeTopRow).filter((r) => r.id && Number.isFinite(r.year));
		const bottom = bottomRows.map(normalizeBottomRow).filter((r) => r.id && Number.isFinite(r.year));
		const photos = photoRows.map(normalizePhotoRow).filter((r) => r.id && Number.isFinite(r.year)).map((p, i) => ({
			...p,
			index: i
		}));
		if (top.length === 0) console.warn("⚠️ 上軌事件解析結果為 0 筆，請檢查「上軌事件」分頁的欄位名稱（id / year / title-TC…）是否正確");
		if (bottom.length === 0) console.warn("⚠️ 下軌事件解析結果為 0 筆，請檢查「下軌事件」分頁的欄位名稱是否正確");
		if (photos.length === 0) console.warn("⚠️ 照片列解析結果為 0 筆，請檢查「照片列」分頁的欄位名稱是否正確");
		const topPhotoMap = {}, bottomPhotoMap = {};
		photos.forEach((p) => {
			p.relatedTopIds.forEach((tid) => (topPhotoMap[tid] = topPhotoMap[tid] || []).push(p.index));
			p.relatedBottomIds.forEach((bid) => (bottomPhotoMap[bid] = bottomPhotoMap[bid] || []).push(p.index));
		});
		const topBottomSet = {}, bottomTopSet = {};
		function linkTopBottom(topId, bottomId) {
			if (!topId || !bottomId) return;
			(topBottomSet[topId] = topBottomSet[topId] || /* @__PURE__ */ new Set()).add(bottomId);
			(bottomTopSet[bottomId] = bottomTopSet[bottomId] || /* @__PURE__ */ new Set()).add(topId);
		}
		top.forEach((t) => t.relatedBottomIds.forEach((bid) => linkTopBottom(t.id, bid)));
		bottom.forEach((b) => (b.relatedTopIds || []).forEach((tid) => linkTopBottom(tid, b.id)));
		const topFinal = top.map((t) => ({
			...t,
			relatedBottomIds: Array.from(topBottomSet[t.id] || []),
			relatedPhotoIds: topPhotoMap[t.id] || []
		}));
		const bottomFinal = bottom.map((b) => ({
			...b,
			relatedTopIds: Array.from(bottomTopSet[b.id] || []),
			relatedPhotoIds: bottomPhotoMap[b.id] || []
		}));
		console.log("topEvents (上軌事件):", topFinal);
		console.log("bottomEvents (下軌事件):", bottomFinal);
		console.log("photos (照片列):", photos);
		return {
			topRows: topFinal,
			bottomRows: bottomFinal,
			photoRows: photos
		};
	}
	const topMilestones = [], bottomMilestones = [], photosData = [];
	const topById = {}, bottomById = {};
	function applyDataset(ds) {
		topMilestones.length = 0;
		topMilestones.push(...ds.topRows);
		bottomMilestones.length = 0;
		bottomMilestones.push(...ds.bottomRows);
		photosData.length = 0;
		photosData.push(...ds.photoRows);
		Object.keys(topById).forEach((k) => delete topById[k]);
		Object.keys(bottomById).forEach((k) => delete bottomById[k]);
		topMilestones.forEach((m) => topById[m.id] = m);
		bottomMilestones.forEach((m) => bottomById[m.id] = m);
	}
	const STORAGE_KEY = "hksyu-timeline-workbook-v1";
	function sanitizeCell(v) {
		if (v instanceof Date && !isNaN(v.getTime())) return v.getFullYear();
		if (v === void 0 || v === null) return "";
		if (typeof v === "number" && Number.isFinite(v)) return v;
		if (typeof v === "boolean") return v;
		return String(v);
	}
	function serializeRows(rows) {
		return (rows || []).map((row) => {
			const out = {};
			Object.keys(row || {}).forEach((k) => {
				out[k] = sanitizeCell(row[k]);
			});
			return out;
		});
	}
	function emptyDataset() {
		return {
			topRows: [],
			bottomRows: [],
			photoRows: []
		};
	}
	function saveWorkbookCache(raw, fileName) {
		try {
			const payload = {
				version: 1,
				fileName: fileName || "",
				savedAt: Date.now(),
				topRows: serializeRows(raw.topRows),
				bottomRows: serializeRows(raw.bottomRows),
				photoRows: serializeRows(raw.photoRows)
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
			return true;
		} catch (err) {
			console.warn("無法寫入本機紀錄", err);
			return false;
		}
	}
	function loadWorkbookCache() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return null;
			const data = JSON.parse(raw);
			if (!data || !Array.isArray(data.topRows) || !Array.isArray(data.bottomRows) || !Array.isArray(data.photoRows)) return null;
			return data;
		} catch (err) {
			console.warn("無法讀取本機紀錄", err);
			return null;
		}
	}
	function clearWorkbookCache() {
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch (err) {}
	}
	function setDataChrome(hasData, statusText) {
		const hint = document.getElementById("importHint");
		const clearBtn = document.getElementById("excelClearBtn");
		const statusEl = document.getElementById("excelStatus");
		if (hint) hint.classList.toggle("hidden", !!hasData);
		if (clearBtn) clearBtn.hidden = !hasData;
		if (statusEl && statusText !== void 0) statusEl.textContent = statusText || "";
	}
	function uiCopy() {
		return UI_TEXT[currentLang] || UI_TEXT["zh-Hant"];
	}
	function refreshImportHintCopy() {
		const titleEl = document.querySelector("#importHint strong");
		const bodyEl = document.querySelector("#importHint span");
		const txt = uiCopy();
		if (titleEl) titleEl.textContent = txt.importTitle;
		if (bodyEl) bodyEl.textContent = txt.importBody;
	}
	function photoDetail(idx) {
		const p = photosData[idx];
		const relTop = p.relatedTopIds.map((id) => topById[id]).filter(Boolean).map((m) => L(m, "title"));
		const relBottom = p.relatedBottomIds.map((id) => bottomById[id]).filter(Boolean).map((m) => L(m, "title"));
		const rel = [...relTop, ...relBottom];
		const desc = L(p, "content") || (rel.length ? `此影像與「${rel[0]}」等 ${rel.length} 項事件相關，記錄了 ${Math.floor(p.year)} 年前後樹仁校園與社會的一段片刻。` : `${Math.floor(p.year)} 年的校園片刻，靜靜存放在時光鏈之中。`);
		return {
			title: L(p, "title"),
			desc,
			year: p.year,
			photoSrc: p.photoSrc,
			photoSrc2: p.photoSrc2
		};
	}
	const PHOTO_W = 224, PHOTO_H = 168;
	const BASE_Y = 0;
	let YEAR_SPAN = YEAR_MAX - YEAR_MIN;
	const BASE_YEAR_GAP = 130;
	const CLUSTER_STEP = Math.round(186);
	const CLUSTER_MARGIN = 160;
	let TOTAL_VIRTUAL_W = 0;
	let yearScaleCum = [];
	function updateYearRange() {
		const years = [];
		topMilestones.forEach((m) => {
			if (Number.isFinite(m.year)) years.push(m.year);
		});
		bottomMilestones.forEach((m) => {
			if (Number.isFinite(m.year)) years.push(m.year);
		});
		photosData.forEach((p) => {
			if (Number.isFinite(p.year)) years.push(p.year);
		});
		if (!years.length) return;
		let mn = Math.floor(Math.min(...years));
		let mx = Math.ceil(Math.max(...years));
		if (mn === mx) mx = mn + 1;
		YEAR_MIN = mn;
		YEAR_MAX = mx;
		YEAR_SPAN = YEAR_MAX - YEAR_MIN;
	}
	function computeYearHalfWidths() {
		const photoCounts = {};
		photosData.forEach((p) => {
			photoCounts[p.year] = (photoCounts[p.year] || 0) + 1;
		});
		const eventCounts = {};
		topMilestones.forEach((m) => {
			eventCounts[m.year] = (eventCounts[m.year] || 0) + 1;
		});
		bottomMilestones.forEach((m) => {
			eventCounts[m.year] = (eventCounts[m.year] || 0) + 1;
		});
		const years = /* @__PURE__ */ new Set([...Object.keys(photoCounts), ...Object.keys(eventCounts)]);
		const fs = typeof fontScaleNow === "function" ? fontScaleNow() : 1.5;
		const cardHalf = 110 * fs;
		const halfWidths = {};
		years.forEach((y) => {
			const nPhoto = photoCounts[y] || 0;
			const photoHalf = nPhoto > 1 ? (nPhoto - 1) / 2 * CLUSTER_STEP : 0;
			const nEvent = eventCounts[y] || 0;
			const extra = Math.max(0, nEvent - 3);
			const eventHalf = (nEvent > 0 ? cardHalf * .55 : 0) + extra * 70 * fs;
			halfWidths[y] = Math.max(photoHalf, eventHalf);
		});
		return halfWidths;
	}
	function rebuildYearScale() {
		const halfWidths = computeYearHalfWidths();
		yearScaleCum = new Array(YEAR_SPAN + 1);
		yearScaleCum[0] = 0;
		const minGap = Math.round(90 + 70 * fontScaleNow());
		for (let i = 1; i <= YEAR_SPAN; i++) {
			const y = YEAR_MIN + i;
			const prevHalf = halfWidths[y - 1] || 0;
			const curHalf = halfWidths[y] || 0;
			const gap = Math.max(minGap, prevHalf + curHalf + CLUSTER_MARGIN);
			yearScaleCum[i] = yearScaleCum[i - 1] + gap;
		}
		TOTAL_VIRTUAL_W = yearScaleCum[YEAR_SPAN];
	}
	function yearToVX(year) {
		const idx = clamp(year, YEAR_MIN, YEAR_MAX) - YEAR_MIN;
		const i0 = Math.floor(idx);
		const i1 = Math.min(i0 + 1, YEAR_SPAN);
		const frac = idx - i0;
		return yearScaleCum[i0] + (yearScaleCum[i1] - yearScaleCum[i0]) * frac;
	}
	function vxToYear(vx) {
		const v = clamp(vx, 0, TOTAL_VIRTUAL_W);
		let lo = 0, hi = YEAR_SPAN;
		while (lo < hi) {
			const mid = lo + hi + 1 >> 1;
			if (yearScaleCum[mid] <= v) lo = mid;
			else hi = mid - 1;
		}
		const i0 = lo, i1 = Math.min(lo + 1, YEAR_SPAN);
		const seg = yearScaleCum[i1] - yearScaleCum[i0];
		const frac = seg > 0 ? (v - yearScaleCum[i0]) / seg : 0;
		return YEAR_MIN + i0 + frac;
	}
	function clamp(v, a, b) {
		return Math.max(a, Math.min(b, v));
	}
	rebuildYearScale();
	let focusPx = TOTAL_VIRTUAL_W * .5;
	let targetFocusPx = focusPx;
	const stage = document.getElementById("stage");
	const host = document.getElementById("threeHost");
	let W = stage.clientWidth, H = stage.clientHeight;
	const scene = new Scene();
	const camera = new OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1e3, 1e3);
	camera.position.z = 100;
	const renderer = new WebGLRenderer({
		antialias: true,
		alpha: true
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(W, H);
	renderer.sortObjects = true;
	host.appendChild(renderer.domElement);
	const chainGroup = new Group();
	scene.add(chainGroup);
	const loader = new TextureLoader();
	function loadPhotoTexture(url, onLoad, onError) {
		const isAbsoluteUrl = /^https?:\/\//i.test(url);
		loader.setCrossOrigin(isAbsoluteUrl ? "anonymous" : void 0);
		return loader.load(url, (texture) => {
			texture.needsUpdate = true;
			if (typeof onLoad === "function") onLoad(texture);
		}, void 0, (err) => {
			console.error("Three.js 貼圖載入失敗：", url, err);
			if (typeof onError === "function") onError(err);
		});
	}
	const meshes = [];
	function disposePhotoMeshes() {
		stopPhotoSwap();
		meshes.forEach((m) => {
			chainGroup.remove(m.holder);
			m.mesh.geometry.dispose();
			if (m.textures) m.textures.forEach((t) => {
				if (t) t.dispose();
			});
			else m.mesh.material.map && m.mesh.material.map.dispose();
			m.mesh.material.dispose();
			m.frame.geometry.dispose();
			m.frame.material.dispose();
		});
		meshes.length = 0;
	}
	function computePhotoClusterOffsets() {
		const yearGroups = {};
		photosData.forEach((p) => {
			(yearGroups[p.year] = yearGroups[p.year] || []).push(p);
		});
		const offsetByIndex = {};
		Object.values(yearGroups).forEach((group) => {
			const n = group.length;
			const clusterHalfWidth = n > 1 ? (n - 1) / 2 * CLUSTER_STEP : 0;
			group.forEach((p, i) => {
				const centered = i - (n - 1) / 2;
				offsetByIndex[p.index] = {
					offsetX: centered * CLUSTER_STEP,
					offsetY: 0,
					clusterHalfWidth
				};
			});
		});
		return offsetByIndex;
	}
	const PHOTO_SWAP_MS = 3e3;
	let photoSwapTimer = null;
	function applyMeshFace(m) {
		if (!m || !m.textures) return;
		const tex = m.textures[m.face || 0] || m.textures[0];
		if (!tex) return;
		m.mesh.material.map = tex;
		m.mesh.material.color.setHex(16777215);
		m.mesh.material.needsUpdate = true;
	}
	function tickPhotoSwap() {
		meshes.forEach((m) => {
			if (!m.textures || !m.textures[0] || !m.textures[1]) return;
			if (m.index === expandedPhotoIndex) return;
			m.face = m.face ? 0 : 1;
			applyMeshFace(m);
		});
	}
	function startPhotoSwap() {
		stopPhotoSwap();
		photoSwapTimer = setInterval(tickPhotoSwap, PHOTO_SWAP_MS);
	}
	function stopPhotoSwap() {
		if (photoSwapTimer) {
			clearInterval(photoSwapTimer);
			photoSwapTimer = null;
		}
	}
	function buildPhotoMeshes() {
		const clusterLayoutByIndex = computePhotoClusterOffsets();
		photosData.forEach((p) => {
			const vx = yearToVX(p.year);
			const clusterLayout = clusterLayoutByIndex[p.index] || {
				offsetX: 0,
				offsetY: 0,
				clusterHalfWidth: 0
			};
			const frameGeo = new PlaneGeometry(248, 192);
			const frameMat = new MeshBasicMaterial({
				color: 16447731,
				transparent: true,
				opacity: .95,
				side: 2,
				depthTest: true,
				depthWrite: false
			});
			const frame = new Mesh(frameGeo, frameMat);
			frame.position.z = -.5;
			frame.userData.photoIndex = p.index;
			const geo = new PlaneGeometry(PHOTO_W, PHOTO_H);
			const mat = new MeshBasicMaterial({
				color: 15394529,
				transparent: true,
				opacity: 1,
				side: 2,
				depthTest: true,
				depthWrite: false
			});
			const mesh = new Mesh(geo, mat);
			mesh.userData.photoIndex = p.index;
			const holder = new Group();
			holder.add(frame);
			holder.add(mesh);
			chainGroup.add(holder);
			const textures = [null, null];
			const mRef = {
				holder,
				mesh,
				frame,
				index: p.index,
				vx,
				year: p.year,
				clusterOffsetX: clusterLayout.offsetX,
				clusterOffsetY: clusterLayout.offsetY,
				clusterHalfWidth: clusterLayout.clusterHalfWidth || 0,
				baseY: BASE_Y,
				extraShift: 0,
				catFilteredOut: false,
				elevateOffset: 0,
				elevated: false,
				textures,
				face: 0
			};
			if (p.photoSrc) loadPhotoTexture(p.photoSrc, (texture) => {
				textures[0] = texture;
				if ((mRef.face || 0) === 0) applyMeshFace(mRef);
			}, () => {});
			if (p.photoSrc2) loadPhotoTexture(p.photoSrc2, (texture) => {
				textures[1] = texture;
				if (mRef.face === 1) applyMeshFace(mRef);
			});
			meshes.push(mRef);
		});
		startPhotoSwap();
	}
	buildPhotoMeshes();
	let expandedPhotoIndex = null;
	let modalSrcs = [];
	let modalFace = 0;
	const LIFT_Y = 64;
	const LIFT_SCALE = 1.15;
	const LERP_SPEED = .1;
	const BASE_Z = -80;
	const LIFT_Z = 0;
	const MAX_Z = 150;
	const RENDER_ORDER_CENTER = 1e3;
	const RENDER_ORDER_ACTIVE_BASE = 500;
	let lastLoggedCenterIndex = null;
	function calculateChainLayout() {
		const currentYear = Math.round(vxToYear(focusPx));
		let centerIndex = null, centerMinAbsDist = Infinity;
		meshes.forEach((m) => {
			m.isTargeted = false;
			const liveX = m.vx + m.clusterOffsetX + m.extraShift - focusPx;
			const absDist = Math.abs(liveX);
			if (absDist < centerMinAbsDist) {
				centerMinAbsDist = absDist;
				centerIndex = m.index;
			}
		});
		if (centerIndex !== null) {
			const centerMeshObj = meshes.find((m) => m.index === centerIndex);
			centerMeshObj.isTargeted = true;
			if (lastLoggedCenterIndex !== centerIndex) {
				lastLoggedCenterIndex = centerIndex;
				const p = photosData.find((pd) => pd.index === centerIndex);
				console.log("[相片鏈] 當前置中照片 isTargeted →", "index=", centerIndex, "year=", centerMeshObj.year, "id=", p ? p.id : "(找不到對應 photosData)", "title=", p ? p["title-TC"] || p["title-Eng"] || p["title-SC"] : "", "minAbsDist(px)=", Math.round(centerMinAbsDist));
			}
		} else if (lastLoggedCenterIndex !== null) {
			lastLoggedCenterIndex = null;
			console.log("[相片鏈] 當前沒有任何照片可被判定為置中（meshes 是空的？）");
		}
		meshes.forEach((m) => {
			const rawX = m.vx + m.clusterOffsetX + m.extraShift - focusPx;
			m.holder.position.x = rawX;
			const isActive = m.year === currentYear;
			const isCenter = m.isTargeted;
			const centerCloseness = m.clusterHalfWidth > 0 ? clamp(1 - Math.abs(m.clusterOffsetX) / m.clusterHalfWidth, 0, 1) : 1;
			let renderOrder;
			if (isCenter) renderOrder = RENDER_ORDER_CENTER;
			else if (isActive) renderOrder = Math.round(RENDER_ORDER_ACTIVE_BASE + centerCloseness * 100);
			else renderOrder = Math.round(centerCloseness * 100);
			m.frame.renderOrder = renderOrder;
			m.mesh.renderOrder = renderOrder;
			m.holder.renderOrder = renderOrder;
			m.frame.material.depthTest = !isCenter;
			m.mesh.material.depthTest = !isCenter;
			if (expandedPhotoIndex !== m.index) {
				const targetY = m.baseY + (isActive ? LIFT_Y : 0) + (m.elevateOffset || 0) + m.clusterOffsetY;
				const targetZ = isCenter ? MAX_Z : isActive ? LIFT_Z : BASE_Z;
				const targetScale = isActive ? LIFT_SCALE : 1;
				m.holder.position.y += (targetY - m.holder.position.y) * LERP_SPEED;
				m.holder.position.z += (targetZ - m.holder.position.z) * LERP_SPEED;
				const newScale = m.holder.scale.x + (targetScale - m.holder.scale.x) * LERP_SPEED;
				m.holder.scale.set(newScale, newScale, 1);
			}
		});
	}
	const hintEl = document.getElementById("hint");
	const HINT_IDLE_DELAY = 2500;
	let hintTimer = null;
	function resetHintTimer() {
		hintEl.style.opacity = "0";
		clearTimeout(hintTimer);
		hintTimer = setTimeout(() => {
			hintEl.style.opacity = "1";
		}, HINT_IDLE_DELAY);
	}
	host.addEventListener("wheel", (e) => {
		e.preventDefault();
		targetFocusPx = clamp(targetFocusPx + (e.deltaY + e.deltaX) * .9, 0, TOTAL_VIRTUAL_W);
		resetHintTimer();
		clearPhotoPickMemory();
	}, { passive: false });
	let dragging = false, dragMoved = false, dragStartX = 0, dragStartFocus = 0;
	let pointerDownPt = null;
	const DRAG_CLICK_THRESHOLD = 10;
	host.addEventListener("pointerdown", (e) => {
		dragging = true;
		dragMoved = false;
		pointerDownPt = {
			x: e.clientX,
			y: e.clientY
		};
		dragStartX = e.clientX;
		dragStartFocus = targetFocusPx;
		resetHintTimer();
	});
	function onWinPointerMove(e) {
		if (!dragging) return;
		const dx = e.clientX - dragStartX;
		if (Math.abs(dx) > DRAG_CLICK_THRESHOLD) {
			dragMoved = true;
			clearPhotoPickMemory();
		}
		targetFocusPx = clamp(dragStartFocus - dx, 0, TOTAL_VIRTUAL_W);
		resetHintTimer();
	}
	function onWinPointerUp() {
		dragging = false;
	}
	window.addEventListener("pointermove", onWinPointerMove);
	window.addEventListener("pointerup", onWinPointerUp);
	function onKeyDown(e) {
		const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
		if (tag === "input" || tag === "textarea") return;
		if (e.key === "Escape") {
			resetSelection();
			return;
		}
		if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
			if (document.getElementById("modalOverlay").classList.contains("show") && modalSrcs.length > 1) {
				e.preventDefault();
				stepModalFace(e.key === "ArrowLeft" ? -1 : 1);
				return;
			}
			const dir = e.key === "ArrowLeft" ? -180 : 180;
			targetFocusPx = clamp(targetFocusPx + dir, 0, TOTAL_VIRTUAL_W);
			resetHintTimer();
			clearPhotoPickMemory();
		}
	}
	window.addEventListener("keydown", onKeyDown);
	const tlTrack = document.getElementById("tlTrack");
	const tlFill = document.getElementById("tlFill");
	const tlThumb = document.getElementById("tlThumb");
	const tlTicks = document.getElementById("tlTicks");
	const TICK_MIN_LABEL_PX = 50;
	const TICK_STEP_CANDIDATES = [
		5,
		10,
		15,
		20,
		25,
		30,
		40,
		50,
		60,
		80,
		100
	];
	function computeTimelineTickStep(trackWidthPx) {
		if (!trackWidthPx || !Number.isFinite(TOTAL_VIRTUAL_W) || TOTAL_VIRTUAL_W <= 0) return TICK_STEP_CANDIDATES[0];
		for (const step of TICK_STEP_CANDIDATES) {
			const startY = Math.ceil(YEAR_MIN / step) * step;
			let minGapPx = Infinity;
			let prevVx = null;
			for (let y = startY; y <= YEAR_MAX; y += step) {
				const vx = yearToVX(y);
				if (prevVx !== null) minGapPx = Math.min(minGapPx, (vx - prevVx) / TOTAL_VIRTUAL_W * trackWidthPx);
				prevVx = vx;
			}
			if (minGapPx >= TICK_MIN_LABEL_PX) return step;
		}
		return TICK_STEP_CANDIDATES[TICK_STEP_CANDIDATES.length - 1];
	}
	let tlTickEls = [];
	function buildTimelineTicks() {
		tlTicks.innerHTML = "";
		tlTickEls = [];
		const trackWidthPx = tlTrack.getBoundingClientRect().width;
		const step = computeTimelineTickStep(trackWidthPx);
		const startY = Math.ceil(YEAR_MIN / step) * step;
		const addTick = (y) => {
			if (tlTickEls.some((t) => t.y === y)) return;
			const el = document.createElement("div");
			el.className = "tlTick";
			el.textContent = y;
			tlTicks.appendChild(el);
			tlTickEls.push({
				y,
				el
			});
		};
		for (let y = startY; y <= YEAR_MAX; y += step) addTick(y);
		[YEAR_MIN, YEAR_MAX].forEach((y) => {
			if (tlTickEls.some((t) => t.y === y)) return;
			const vx = yearToVX(y);
			const nearestGapPx = Math.min(...tlTickEls.map((t) => Math.abs(yearToVX(t.y) - vx) / TOTAL_VIRTUAL_W * trackWidthPx));
			if (!Number.isFinite(nearestGapPx) || nearestGapPx >= TICK_MIN_LABEL_PX) addTick(y);
		});
		updateTimelineTicks();
	}
	buildTimelineTicks();
	function updateTimelineTicks() {
		tlTickEls.forEach((t) => {
			t.el.style.left = yearToVX(t.y) / TOTAL_VIRTUAL_W * 100 + "%";
		});
	}
	function setFocusFromTrackEvent(clientX) {
		const rect = tlTrack.getBoundingClientRect();
		targetFocusPx = clamp((clientX - rect.left) / rect.width, 0, 1) * TOTAL_VIRTUAL_W;
	}
	let thumbDragging = false;
	tlThumb.addEventListener("pointerdown", (e) => {
		thumbDragging = true;
		resetHintTimer();
		clearPhotoPickMemory();
		e.stopPropagation();
	});
	tlTrack.addEventListener("pointerdown", (e) => {
		setFocusFromTrackEvent(e.clientX);
		thumbDragging = true;
		resetHintTimer();
		clearPhotoPickMemory();
	});
	function onThumbPointerMove(e) {
		if (thumbDragging) {
			setFocusFromTrackEvent(e.clientX);
			resetHintTimer();
			clearPhotoPickMemory();
		}
	}
	function onThumbPointerUp() {
		thumbDragging = false;
	}
	window.addEventListener("pointermove", onThumbPointerMove);
	window.addEventListener("pointerup", onThumbPointerUp);
	function updateTimelineBar() {
		const frac = clamp(focusPx / TOTAL_VIRTUAL_W, 0, 1);
		tlThumb.style.left = frac * 100 + "%";
		tlFill.style.width = frac * 100 + "%";
		updateTimelineTicks();
	}
	const topLayer = document.getElementById("topLayer");
	const bottomLayer = document.getElementById("bottomLayer");
	const topStemLayer = document.getElementById("topStemLayer");
	const bottomStemLayer = document.getElementById("bottomStemLayer");
	const topAxisLayer = document.getElementById("topAxisLayer");
	const bottomAxisLayer = document.getElementById("bottomAxisLayer");
	const guideLine = document.getElementById("guideLine");
	const TOP_AXIS_PCT = 30;
	const BOTTOM_AXIS_PCT = 70;
	function fontScaleNow() {
		return FONT_SCALES[currentFontSize] || 1;
	}
	function yearLabelClearance() {
		return 58 + 52 * fontScaleNow();
	}
	function headerReservePx() {
		const el = document.getElementById("headerLeft");
		const h = el ? el.offsetTop + el.offsetHeight : 180;
		return Math.min(420, Math.max(120, h + 8));
	}
	function footerReservePx() {
		const bar = document.getElementById("timelineBar");
		const fs = document.getElementById("fontSizeSwitch");
		let top = 2010;
		[bar, fs].forEach((el) => {
			if (el && el.offsetTop > 0) top = Math.min(top, el.offsetTop);
		});
		return Math.min(280, Math.max(140, 2160 - top + 12));
	}
	function vxToScreenLeft(vx) {
		return Math.round(vx - focusPx + W / 2);
	}
	const topEls = {}, bottomEls = {};
	function assignLanes(milestones, laneCount, widthsByIndex) {
		const pad = 20 * fontScaleNow();
		const lastVxPerLane = new Array(laneCount).fill(-Infinity);
		const lastWPerLane = new Array(laneCount).fill(0);
		const wrapCountPerLane = new Array(laneCount).fill(0);
		const laneByIndex = new Array(milestones.length);
		const offsetByIndex = new Array(milestones.length).fill(0);
		const isFirstOfYear = new Array(milestones.length).fill(false);
		const seenYears = /* @__PURE__ */ new Set();
		milestones.map((m, i) => ({
			i,
			vx: yearToVX(m.year),
			year: m.year
		})).sort((a, b) => a.vx - b.vx).forEach(({ i, vx, year }) => {
			if (!seenYears.has(year)) {
				seenYears.add(year);
				isFirstOfYear[i] = true;
			}
			const w = widthsByIndex && widthsByIndex[i] || 220;
			let bestLane = 0, bestGap = -Infinity, bestFits = false;
			for (let L = 0; L < laneCount; L++) {
				const needed = (w + lastWPerLane[L]) / 2 + pad;
				const gap = vx - lastVxPerLane[L];
				const fits = gap >= needed;
				if (fits && !bestFits) {
					bestLane = L;
					bestGap = gap;
					bestFits = true;
				} else if (fits && bestFits && L < bestLane) {
					bestLane = L;
					bestGap = gap;
				} else if (!bestFits && gap > bestGap) {
					bestLane = L;
					bestGap = gap;
				}
			}
			if (!bestFits) {
				wrapCountPerLane[bestLane] += 1;
				const lastW = lastWPerLane[bestLane] || w;
				offsetByIndex[i] = wrapCountPerLane[bestLane] * ((w + lastW) / 2 + pad);
			}
			laneByIndex[i] = bestLane;
			lastVxPerLane[bestLane] = vx + (offsetByIndex[i] || 0);
			lastWPerLane[bestLane] = w;
		});
		return {
			laneByIndex,
			offsetByIndex,
			isFirstOfYear
		};
	}
	function computeLanePlan(isTop, cardHeights) {
		const axisPx = (isTop ? TOP_AXIS_PCT : BOTTOM_AXIS_PCT) / 100 * 2160;
		const maxH = Math.max(52, ...cardHeights.length ? cardHeights : [52]);
		const labelClear = yearLabelClearance();
		const safeTop = headerReservePx();
		const safeBottom = 2160 - footerReservePx();
		const available = isTop ? Math.max(maxH + 8, axisPx - labelClear - safeTop) : Math.max(maxH + 8, safeBottom - axisPx - labelClear);
		const gap = Math.max(8, 10 * fontScaleNow() * .5);
		const pitch = maxH + gap;
		const laneCount = Math.max(1, Math.min(4, Math.floor((available + gap) / pitch)));
		const base = labelClear + 16;
		const maxConn = Math.max(base, available - 4);
		const step = laneCount > 1 ? Math.min(pitch, (maxConn - base) / (laneCount - 1)) : 0;
		const connectors = [];
		for (let i = 0; i < laneCount; i++) {
			const c = base + i * step;
			connectors.push(Math.min(c, maxConn));
		}
		return {
			laneCount,
			connectors,
			axisPx,
			safeTop,
			safeBottom,
			labelClear,
			maxH
		};
	}
	function escapeHtml(s) {
		return String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => {
			if (ch === "&") return "&amp;";
			if (ch === "<") return "&lt;";
			if (ch === ">") return "&gt;";
			if (ch === "\"") return "&quot;";
			return "&#39;";
		});
	}
	function buildMilestoneDOM() {
		topLayer.innerHTML = "";
		Object.keys(topEls).forEach((k) => delete topEls[k]);
		bottomLayer.innerHTML = "";
		Object.keys(bottomEls).forEach((k) => delete bottomEls[k]);
		topStemLayer.innerHTML = "";
		bottomStemLayer.innerHTML = "";
		const makeCard = (m, layer, stemLayer, stemClass, source) => {
			const isTop = source === "top";
			const el = document.createElement("div");
			el.className = isTop ? "ms ms-top" : "ms ms-bottom";
			el.dataset.id = m.id;
			el.dataset.cat = m.category;
			const title = L(m, "title");
			el.title = title;
			const yrHtml = `<div class="yr">${m.year}</div>`;
			const lblHtml = `<div class="lbl">${escapeHtml(title)}</div>`;
			if (isTop) el.innerHTML = `<div class="msCard">${yrHtml}${lblHtml}</div><div class="dot"></div>`;
			else el.innerHTML = `<div class="dot"></div><div class="msCard">${lblHtml}${yrHtml}</div>`;
			const stemEl = document.createElement("div");
			stemEl.className = "stem " + stemClass;
			stemLayer.appendChild(stemEl);
			el.__stem = stemEl;
			el.addEventListener("click", () => handleSelect(source, m.id));
			el.addEventListener("mouseenter", () => {
				hoverTarget = {
					source,
					id: m.id
				};
				applyHighlight();
			});
			el.addEventListener("mouseleave", () => {
				hoverTarget = null;
				applyHighlight();
			});
			layer.appendChild(el);
			return el;
		};
		topMilestones.forEach((m) => {
			topEls[m.id] = makeCard(m, topLayer, topStemLayer, "stem-down", "top");
		});
		bottomMilestones.forEach((m) => {
			bottomEls[m.id] = makeCard(m, bottomLayer, bottomStemLayer, "stem-up", "bottom");
		});
		const topHeights = topMilestones.map((m) => topEls[m.id].offsetHeight);
		const bottomHeights = bottomMilestones.map((m) => bottomEls[m.id].offsetHeight);
		const topWidths = topMilestones.map((m) => topEls[m.id].offsetWidth);
		const bottomWidths = bottomMilestones.map((m) => bottomEls[m.id].offsetWidth);
		const topPlan = computeLanePlan(true, topHeights);
		const bottomPlan = computeLanePlan(false, bottomHeights);
		const topLayout = assignLanes(topMilestones, topPlan.laneCount, topWidths);
		const bottomLayout = assignLanes(bottomMilestones, bottomPlan.laneCount, bottomWidths);
		topMilestones.forEach((m, i) => {
			const el = topEls[m.id];
			el.dataset.vx = yearToVX(m.year) + topLayout.offsetByIndex[i];
			if (el.__stem) el.__stem.dataset.vx = el.dataset.vx;
			const yr = el.querySelector(".yr");
			if (yr) yr.style.display = topLayout.isFirstOfYear[i] ? "" : "none";
		});
		bottomMilestones.forEach((m, i) => {
			const el = bottomEls[m.id];
			el.dataset.vx = yearToVX(m.year) + bottomLayout.offsetByIndex[i];
			if (el.__stem) el.__stem.dataset.vx = el.dataset.vx;
			const yr = el.querySelector(".yr");
			if (yr) yr.style.display = bottomLayout.isFirstOfYear[i] ? "" : "none";
		});
		const place = (el, lane, isTop, plan) => {
			const h = el.offsetHeight;
			const connectorPx = plan.connectors[Math.min(lane, plan.connectors.length - 1)];
			const stemEl = el.__stem;
			const axisPx = plan.axisPx;
			if (isTop) {
				const minNear = plan.safeTop + h;
				const maxNear = axisPx - plan.labelClear - 8;
				const near = clamp(axisPx - connectorPx, minNear, Math.max(minNear, maxNear));
				const centerPx = near - h / 2;
				el.style.top = centerPx + "px";
				stemEl.style.top = near + "px";
				stemEl.style.height = Math.max(8, axisPx - near) + "px";
			} else {
				const minNear = axisPx + plan.labelClear + 8;
				const maxNear = plan.safeBottom - h;
				const near = clamp(axisPx + connectorPx, minNear, Math.max(minNear, maxNear));
				const centerPx = near + h / 2;
				el.style.top = centerPx + "px";
				stemEl.style.top = axisPx + "px";
				stemEl.style.height = Math.max(8, near - axisPx) + "px";
			}
		};
		topMilestones.forEach((m, i) => place(topEls[m.id], topLayout.laneByIndex[i], true, topPlan));
		bottomMilestones.forEach((m, i) => place(bottomEls[m.id], bottomLayout.laneByIndex[i], false, bottomPlan));
		resolveCardOverlaps(topMilestones, topEls);
		resolveCardOverlaps(bottomMilestones, bottomEls);
	}
	function resolveCardOverlaps(milestones, els) {
		const boxes = milestones.map((m) => {
			const el = els[m.id];
			if (!el) return null;
			return {
				el,
				x: parseFloat(el.dataset.vx) || 0,
				y: parseFloat(el.style.top) || 0,
				w: el.offsetWidth,
				h: el.offsetHeight
			};
		}).filter(Boolean).sort((a, b) => a.x - b.x);
		const pad = 12;
		for (let pass = 0; pass < 4; pass++) {
			let moved = false;
			for (let i = 1; i < boxes.length; i++) {
				const a = boxes[i - 1], b = boxes[i];
				const dx = Math.abs(b.x - a.x);
				const dy = Math.abs(b.y - a.y);
				const needX = (a.w + b.w) / 2 + pad;
				const needY = (a.h + b.h) / 2 + 6;
				if (dx < needX && dy < needY) {
					const push = needX - dx;
					b.x += push;
					b.el.dataset.vx = String(b.x);
					if (b.el.__stem) b.el.__stem.dataset.vx = String(b.x);
					moved = true;
				}
			}
			if (!moved) break;
		}
	}
	buildMilestoneDOM();
	function relayoutMilestones() {
		const focusYear = vxToYear(focusPx);
		rebuildYearScale();
		focusPx = targetFocusPx = clamp(yearToVX(focusYear), 0, TOTAL_VIRTUAL_W);
		buildMilestoneDOM();
		buildAxisTicks();
		if (activeCategory) topMilestones.forEach((m) => {
			const el = topEls[m.id];
			if (el) el.classList.toggle("hidden", m.category !== activeCategory);
		});
		updateMilestonePositions();
		applyHighlight();
		updateGuideLine();
	}
	let topAxisTicks = [], bottomAxisTicks = [];
	function axisTickStep() {
		const labelW = 52 * fontScaleNow();
		const minYears = Math.ceil((labelW + 20) / BASE_YEAR_GAP);
		return [
			5,
			10,
			15,
			20,
			25
		].find((s) => s >= minYears) || 25;
	}
	function buildAxisTicks() {
		topAxisLayer.querySelectorAll(".axisTick").forEach((el) => el.remove());
		bottomAxisLayer.querySelectorAll(".axisTick").forEach((el) => el.remove());
		topAxisTicks = [];
		bottomAxisTicks = [];
		const step = axisTickStep();
		for (let y = YEAR_MIN; y <= YEAR_MAX; y += step) {
			const topTick = document.createElement("div");
			topTick.className = "axisTick";
			topTick.innerHTML = `<div class="axisTickMark"></div><div class="axisTickYear">${y}</div>`;
			topAxisLayer.appendChild(topTick);
			topAxisTicks.push({
				y,
				el: topTick
			});
			const bottomTick = document.createElement("div");
			bottomTick.className = "axisTick axisTick-bottom";
			bottomTick.innerHTML = `<div class="axisTickYear">${y}</div><div class="axisTickMark"></div>`;
			bottomAxisLayer.appendChild(bottomTick);
			bottomAxisTicks.push({
				y,
				el: bottomTick
			});
		}
	}
	buildAxisTicks();
	function positionMsEl(el) {
		const leftPx = vxToScreenLeft(parseFloat(el.dataset.vx));
		el.style.left = leftPx + "px";
		if (el.__stem) el.__stem.style.left = leftPx + "px";
	}
	function updateMilestonePositions() {
		Object.values(topEls).forEach(positionMsEl);
		Object.values(bottomEls).forEach(positionMsEl);
		topAxisTicks.forEach((t) => {
			t.el.style.left = vxToScreenLeft(yearToVX(t.y)) + "px";
		});
		bottomAxisTicks.forEach((t) => {
			t.el.style.left = vxToScreenLeft(yearToVX(t.y)) + "px";
		});
	}
	function updateGuideLine() {
		const hl = hoverTarget || selection;
		if (!hl) {
			guideLine.style.opacity = 0;
			return;
		}
		let year;
		if (hl.source === "top") year = topById[hl.id].year;
		else if (hl.source === "bottom") year = bottomById[hl.id].year;
		else year = photosData[hl.id].year;
		guideLine.style.left = vxToScreenLeft(yearToVX(year)) + "px";
		guideLine.style.opacity = 1;
	}
	let activeCategory = null;
	const bandTop = document.getElementById("bandTop");
	const DEFAULT_TOP_BG = "#F4F1EA";
	function hexToRgb(hex) {
		hex = hex.replace("#", "");
		return {
			r: parseInt(hex.substring(0, 2), 16),
			g: parseInt(hex.substring(2, 4), 16),
			b: parseInt(hex.substring(4, 6), 16)
		};
	}
	function rgbToHex(r, g, b) {
		return "#" + [
			r,
			g,
			b
		].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("");
	}
	function blendHex(hexA, hexB, ratioA) {
		const a = hexToRgb(hexA), b = hexToRgb(hexB);
		return rgbToHex(a.r * ratioA + b.r * (1 - ratioA), a.g * ratioA + b.g * (1 - ratioA), a.b * ratioA + b.b * (1 - ratioA));
	}
	function relativeLuminance(hex) {
		const { r, g, b } = hexToRgb(hex);
		const [R, G, B] = [
			r,
			g,
			b
		].map((c) => {
			c /= 255;
			return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4);
		});
		return .2126 * R + .7152 * G + .0722 * B;
	}
	function updateTopTextContrast(bgHex) {
		const textColor = relativeLuminance(bgHex) < .5 ? "#F4F1EA" : "#1D1D1F";
		document.documentElement.style.setProperty("--top-text-color", textColor);
	}
	updateTopTextContrast(DEFAULT_TOP_BG);
	function photoMatchesCategory(p, cat, matchTopIdsSet) {
		if (p.category) return p.category === cat;
		if (matchTopIdsSet) return p.relatedTopIds.some((id) => matchTopIdsSet.has(id));
		return p.relatedTopIds.some((id) => topById[id] && topById[id].category === cat);
	}
	document.querySelectorAll(".catBtn").forEach((btn) => {
		btn.addEventListener("click", () => {
			const c = btn.dataset.c;
			if (activeCategory === c) {
				activeCategory = null;
				bandTop.style.backgroundColor = DEFAULT_TOP_BG;
				updateTopTextContrast(DEFAULT_TOP_BG);
				document.querySelectorAll(".catBtn").forEach((b) => b.classList.remove("on"));
				topMilestones.forEach((m) => topEls[m.id].classList.remove("hidden"));
				meshes.forEach((m) => {
					m.catFilteredOut = false;
					m.holder.visible = true;
				});
			} else {
				activeCategory = c;
				const dilutedBg = blendHex(CAT_COLORS[c], DEFAULT_TOP_BG, .15);
				bandTop.style.backgroundColor = dilutedBg;
				updateTopTextContrast(dilutedBg);
				document.querySelectorAll(".catBtn").forEach((b) => b.classList.toggle("on", b.dataset.c === c));
				const matchTopIds = new Set(topMilestones.filter((m) => m.category === c).map((m) => m.id));
				topMilestones.forEach((m) => topEls[m.id].classList.toggle("hidden", m.category !== c));
				meshes.forEach((m) => {
					const p = photosData[m.index];
					const related = photoMatchesCategory(p, c, matchTopIds);
					m.catFilteredOut = !related;
					m.holder.visible = related;
				});
			}
			updateCategoryBadges();
			applyHighlight();
			clearPhotoPickMemory();
		});
	});
	updateCategoryBadges();
	updateCategoryButtonLabels();
	document.querySelectorAll(".langBtn").forEach((btn) => {
		btn.addEventListener("click", () => {
			const lang = btn.dataset.lang;
			currentLang = lang;
			document.querySelectorAll(".langBtn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
			const txt = UI_TEXT[lang];
			document.getElementById("uiTitle").innerText = txt.title;
			document.getElementById("hint").innerHTML = txt.hint;
			document.getElementById("uiYearLbl").innerText = txt.yearLbl;
			refreshImportHintCopy();
			const fsLabels = FONT_SIZE_LABELS[lang] || FONT_SIZE_LABELS["zh-Hant"];
			document.querySelectorAll(".fontSizeOption").forEach((opt) => {
				opt.textContent = fsLabels[opt.dataset.size];
			});
			refreshLangTexts();
		});
	});
	function refreshLangTexts() {
		updateCategoryBadges();
		updateCategoryButtonLabels();
		relayoutMilestones();
		if (document.getElementById("eventModalOverlay").classList.contains("show") && selection && (selection.source === "top" || selection.source === "bottom")) openEventModal(selection.source, selection.id);
		if (document.getElementById("modalOverlay").classList.contains("show") && expandedPhotoIndex !== null) {
			const detail = photoDetail(expandedPhotoIndex);
			document.getElementById("modalYear").textContent = Math.floor(detail.year);
			document.getElementById("modalTitle").textContent = detail.title;
			document.getElementById("modalDesc").textContent = detail.desc;
		}
	}
	const FONT_SIZE_LABELS = {
		"zh-Hant": {
			small: "小",
			medium: "中",
			large: "大"
		},
		"zh-Hans": {
			small: "小",
			medium: "中",
			large: "大"
		},
		"en": {
			small: "S",
			medium: "M",
			large: "L"
		}
	};
	const fontSizeToggle = document.getElementById("fontSizeToggle");
	const fontSizeMenu = document.getElementById("fontSizeMenu");
	function applyFontScale(size) {
		currentFontSize = size;
		document.documentElement.style.setProperty("--font-scale", FONT_SCALES[size]);
		document.querySelectorAll(".fontSizeOption").forEach((opt) => opt.classList.toggle("active", opt.dataset.size === size));
		relayoutMilestones();
	}
	document.querySelectorAll(".fontSizeOption").forEach((opt) => {
		opt.addEventListener("click", () => {
			applyFontScale(opt.dataset.size);
			fontSizeMenu.classList.remove("open");
		});
	});
	fontSizeToggle.addEventListener("click", () => {
		fontSizeMenu.classList.toggle("open");
	});
	applyFontScale("medium");
	function relatedSets(sel) {
		const photoIds = /* @__PURE__ */ new Set(), topIds = /* @__PURE__ */ new Set(), bottomIds = /* @__PURE__ */ new Set();
		if (!sel) return {
			photoIds,
			topIds,
			bottomIds
		};
		if (sel.source === "top") {
			const m = topById[sel.id];
			topIds.add(m.id);
			m.relatedPhotoIds.forEach((id) => photoIds.add(id));
			m.relatedBottomIds.forEach((id) => bottomIds.add(id));
		} else if (sel.source === "bottom") {
			const m = bottomById[sel.id];
			bottomIds.add(m.id);
			m.relatedPhotoIds.forEach((id) => photoIds.add(id));
			m.relatedTopIds.forEach((id) => topIds.add(id));
		} else if (sel.source === "photo") {
			const p = photosData[sel.id];
			photoIds.add(sel.id);
			p.relatedTopIds.forEach((id) => topIds.add(id));
			p.relatedBottomIds.forEach((id) => bottomIds.add(id));
		}
		return {
			photoIds,
			topIds,
			bottomIds
		};
	}
	function setPhotoElevated(idx, elevated) {
		const m = meshes[idx];
		if (!m || idx === expandedPhotoIndex) return;
		m.elevated = elevated;
		gsapWithCSS.to(m, {
			elevateOffset: elevated ? 140 : 0,
			duration: .45,
			ease: "power3.out"
		});
		gsapWithCSS.to(m.holder.scale, {
			x: elevated ? 1.1 : 1,
			y: elevated ? 1.1 : 1,
			duration: .45,
			ease: "power3.out"
		});
		gsapWithCSS.to(m.frame.material.color, elevated ? {
			r: 1,
			g: .91,
			b: .66,
			duration: .45
		} : {
			r: 250 / 255,
			g: 248 / 255,
			b: 243 / 255,
			duration: .45
		});
	}
	function elevateRelatedPhotos(photoIdSet) {
		meshes.forEach((m) => setPhotoElevated(m.index, photoIdSet.has(m.index)));
	}
	function clearElevatedPhotos() {
		meshes.forEach((m) => setPhotoElevated(m.index, false));
	}
	function syncStemStates() {
		const sync = (el) => {
			const stemEl = el.__stem;
			if (!stemEl) return;
			const isHidden = el.classList.contains("hidden");
			stemEl.classList.toggle("hidden", isHidden);
			stemEl.classList.toggle("dim", !isHidden && el.classList.contains("dim"));
			stemEl.classList.toggle("active", !isHidden && el.classList.contains("active"));
		};
		Object.values(topEls).forEach(sync);
		Object.values(bottomEls).forEach(sync);
	}
	function applyHighlight() {
		const hl = hoverTarget || selection;
		const rel = relatedSets(hl);
		topMilestones.forEach((m) => {
			const el = topEls[m.id];
			if (el.classList.contains("hidden")) return;
			el.classList.toggle("active", !!hl && rel.topIds.has(m.id));
			el.classList.toggle("dim", !!hl && !rel.topIds.has(m.id));
		});
		bottomMilestones.forEach((m) => {
			const el = bottomEls[m.id];
			el.classList.toggle("active", !!hl && rel.bottomIds.has(m.id));
			el.classList.toggle("dim", !!hl && !rel.bottomIds.has(m.id));
		});
		syncStemStates();
		meshes.forEach((m) => {
			const isRelated = !hl || rel.photoIds.has(m.index);
			const selOpacity = isRelated ? 1 : .25;
			const selFrameOpacity = isRelated ? .95 : .25;
			gsapWithCSS.to(m.mesh.material, {
				opacity: selOpacity,
				duration: .4
			});
			gsapWithCSS.to(m.frame.material, {
				opacity: selFrameOpacity,
				duration: .4
			});
		});
		if (hl && (hl.source === "top" || hl.source === "bottom")) elevateRelatedPhotos(rel.photoIds);
		else clearElevatedPhotos();
	}
	function eventDetail(source, id) {
		if (source === "top") {
			const m = topById[id];
			const relBottom = m.relatedBottomIds.map((bid) => bottomById[bid]).filter(Boolean).map((b) => L(b, "title"));
			const photoCount = m.relatedPhotoIds.length;
			const desc = L(m, "content") || (relBottom.length ? `${Math.floor(m.year)} 年，「${L(m, "title")}」發生，與「${relBottom[0]}」等 ${relBottom.length} 項下軌時代背景相關，並留有 ${photoCount} 張關聯影像記錄。` : `${Math.floor(m.year)} 年，「${L(m, "title")}」發生，留有 ${photoCount} 張關聯影像記錄。`);
			return {
				title: L(m, "title"),
				year: m.year,
				desc
			};
		} else {
			const m = bottomById[id];
			const relTop = m.relatedTopIds.map((tid) => topById[tid]).filter(Boolean).map((t) => L(t, "title"));
			const photoCount = m.relatedPhotoIds.length;
			const desc = L(m, "content") || (relTop.length ? `${Math.floor(m.year)} 年，「${L(m, "title")}」為當時的社會／教育背景，與「${relTop[0]}」等 ${relTop.length} 項校史事件相關，並留有 ${photoCount} 張關聯影像記錄。` : `${Math.floor(m.year)} 年，「${L(m, "title")}」為當時的社會／教育背景，留有 ${photoCount} 張關聯影像記錄。`);
			return {
				title: L(m, "title"),
				year: m.year,
				desc
			};
		}
	}
	function openEventModal(source, id) {
		const detail = eventDetail(source, id);
		document.getElementById("eventModalYear").textContent = Math.floor(detail.year);
		document.getElementById("eventModalTitle").textContent = detail.title;
		document.getElementById("eventModalDesc").textContent = detail.desc;
		document.getElementById("eventModalOverlay").classList.add("show");
	}
	function closeEventModal() {
		document.getElementById("eventModalOverlay").classList.remove("show");
	}
	document.getElementById("eventModalClose").addEventListener("click", closeEventModal);
	function handleSelect(source, id) {
		resetHintTimer();
		if (source === "top" || source === "bottom") {
			if (selection && selection.source === source && selection.id === id) {
				openEventModal(source, id);
				return;
			}
			closeEventModal();
			if (expandedPhotoIndex !== null) collapsePhoto();
			selection = {
				source,
				id
			};
			targetFocusPx = clamp(yearToVX(source === "top" ? topById[id].year : bottomById[id].year), 0, TOTAL_VIRTUAL_W);
			clearPhotoPickMemory();
			applyHighlight();
			return;
		}
		closeEventModal();
		if (selection && selection.source === source && selection.id === id) {
			if (source === "photo" && expandedPhotoIndex === null) {
				selection = {
					source,
					id
				};
				expandPhoto(id);
				targetFocusPx = clamp(yearToVX(photosData[id].year), 0, TOTAL_VIRTUAL_W);
				applyHighlight();
				return;
			}
			selection = null;
			if (source === "photo") collapsePhoto();
		} else {
			selection = {
				source,
				id
			};
			if (source === "photo") {
				if (expandedPhotoIndex !== null && expandedPhotoIndex !== id) collapsePhoto(true);
				expandPhoto(id);
			} else if (expandedPhotoIndex !== null) collapsePhoto();
			const year = photosData[id].year;
			targetFocusPx = clamp(yearToVX(year), 0, TOTAL_VIRTUAL_W);
		}
		applyHighlight();
	}
	function resetSelection() {
		selection = null;
		closeEventModal();
		collapsePhoto();
		applyHighlight();
	}
	function clientToStage(clientX, clientY) {
		const rect = stage.getBoundingClientRect();
		if (!rect.width || !rect.height) return null;
		return {
			x: (clientX - rect.left) / rect.width * W,
			y: (clientY - rect.top) / rect.height * H
		};
	}
	function getPhotoStageRect(m) {
		const s = m.holder.scale.x || 1;
		const pw = 248 * s;
		const ph = 192 * s;
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
	function pickPhotoAt(clientX, clientY) {
		const pt = clientToStage(clientX, clientY);
		if (!pt) return null;
		let bestIdx = null, bestDist = Infinity;
		meshes.forEach((m) => {
			if (m.catFilteredOut || !m.holder.visible) return;
			const r = getPhotoStageRect(m);
			const pad = 6;
			if (pt.x < r.left - pad || pt.x > r.right + pad || pt.y < r.top - pad || pt.y > r.bottom + pad) return;
			const dist = Math.hypot(pt.x - r.cx, (pt.y - r.cy) * .35);
			if (dist < bestDist) {
				bestDist = dist;
				bestIdx = m.index;
			}
		});
		return bestIdx;
	}
	let lastPhotoPick = null;
	const PHOTO_RECLICK_TIMEOUT = 4e3;
	function clearPhotoPickMemory() {
		lastPhotoPick = null;
	}
	function photoPickStillValid(idx) {
		const m = meshes.find((mm) => mm.index === idx);
		return !!m && !m.catFilteredOut && m.holder.visible;
	}
	function resolvePhotoClick(clientX, clientY) {
		const idx = pickPhotoAt(clientX, clientY);
		if (idx !== null) {
			lastPhotoPick = {
				x: clientX,
				y: clientY,
				idx,
				time: Date.now()
			};
			return idx;
		}
		if (expandedPhotoIndex !== null && lastPhotoPick && lastPhotoPick.idx === expandedPhotoIndex) {
			if (Date.now() - lastPhotoPick.time > PHOTO_RECLICK_TIMEOUT) {
				lastPhotoPick = null;
				return null;
			}
			if (Math.abs(clientX - lastPhotoPick.x) <= 56 && Math.abs(clientY - lastPhotoPick.y) <= 56 && photoPickStillValid(expandedPhotoIndex)) {
				lastPhotoPick.time = Date.now();
				return expandedPhotoIndex;
			}
		}
		return null;
	}
	function elementBelowOverlay(overlayEl, x, y) {
		const prev = overlayEl.style.pointerEvents;
		overlayEl.style.pointerEvents = "none";
		const el = document.elementFromPoint(x, y);
		overlayEl.style.pointerEvents = prev;
		return el;
	}
	function msElInfo(msEl) {
		let hit = topMilestones.find((m) => topEls[m.id] === msEl);
		if (hit) return {
			source: "top",
			id: hit.id
		};
		hit = bottomMilestones.find((m) => bottomEls[m.id] === msEl);
		if (hit) return {
			source: "bottom",
			id: hit.id
		};
		return null;
	}
	renderer.domElement.addEventListener("click", (e) => {
		const moved = pointerDownPt ? Math.abs(e.clientX - pointerDownPt.x) > DRAG_CLICK_THRESHOLD || Math.abs(e.clientY - pointerDownPt.y) > DRAG_CLICK_THRESHOLD : dragMoved;
		pointerDownPt = null;
		dragMoved = false;
		if (moved) return;
		const idx = resolvePhotoClick(e.clientX, e.clientY);
		if (idx !== null) handleSelect("photo", idx);
		else resetSelection();
	});
	renderer.domElement.addEventListener("pointermove", (e) => {
		if (dragging) {
			renderer.domElement.style.cursor = "grabbing";
			return;
		}
		const idx = pickPhotoAt(e.clientX, e.clientY);
		renderer.domElement.style.cursor = idx !== null ? "pointer" : "grab";
	});
	function expandPhoto(idx) {
		expandedPhotoIndex = idx;
		const m = meshes[idx];
		meshes.forEach((mm) => {
			const dist = mm.index - idx;
			let extra = 0;
			if (Math.abs(dist) <= 6 && dist !== 0) extra = Math.sign(dist) * (7 - Math.abs(dist)) * 18;
			gsapWithCSS.to(mm, {
				extraShift: extra,
				duration: .5,
				ease: "power3.out"
			});
		});
		gsapWithCSS.to(m.holder.position, {
			y: m.baseY + 156,
			z: 160,
			duration: .5,
			ease: "power3.out"
		});
		gsapWithCSS.to(m.holder.scale, {
			x: 1.8,
			y: 1.8,
			duration: .5,
			ease: "power3.out"
		});
		const detail = photoDetail(idx);
		modalSrcs = [detail.photoSrc, detail.photoSrc2].filter(Boolean);
		modalFace = m && m.face ? 1 : 0;
		if (modalFace >= modalSrcs.length) modalFace = 0;
		renderModalImage();
		document.getElementById("modalYear").textContent = Math.floor(detail.year);
		document.getElementById("modalTitle").textContent = detail.title;
		document.getElementById("modalDesc").textContent = detail.desc;
		document.getElementById("modalOverlay").classList.add("show");
	}
	function renderModalImage() {
		const modalImg = document.getElementById("modalImg");
		const wrap = document.getElementById("modalImgWrap");
		const countEl = document.getElementById("modalPhotoCount");
		const src = modalSrcs[modalFace];
		if (src) {
			modalImg.onerror = () => {
				modalImg.style.display = "none";
			};
			modalImg.src = src.includes("picsum.photos") ? src.replace("/800/600", "/1200/900") : src;
			modalImg.style.display = "";
		} else {
			modalImg.onerror = null;
			modalImg.removeAttribute("src");
			modalImg.style.display = "none";
		}
		if (wrap) wrap.classList.toggle("has-dual", modalSrcs.length > 1);
		if (countEl) countEl.textContent = modalSrcs.length > 1 ? `${modalFace + 1} / ${modalSrcs.length}` : "";
	}
	function stepModalFace(dir) {
		if (modalSrcs.length < 2) return;
		modalFace = (modalFace + dir + modalSrcs.length) % modalSrcs.length;
		renderModalImage();
		if (expandedPhotoIndex !== null && meshes[expandedPhotoIndex]) {
			meshes[expandedPhotoIndex].face = modalFace;
			applyMeshFace(meshes[expandedPhotoIndex]);
		}
	}
	document.getElementById("modalPrev").addEventListener("click", (e) => {
		e.stopPropagation();
		stepModalFace(-1);
	});
	document.getElementById("modalNext").addEventListener("click", (e) => {
		e.stopPropagation();
		stepModalFace(1);
	});
	function collapsePhoto(skipModalClose) {
		if (!skipModalClose) {
			document.getElementById("modalOverlay").classList.remove("show");
			const wrap = document.getElementById("modalImgWrap");
			if (wrap) wrap.classList.remove("has-dual");
			modalSrcs = [];
			modalFace = 0;
		}
		if (expandedPhotoIndex === null) return;
		const m = meshes[expandedPhotoIndex];
		meshes.forEach((mm) => {
			gsapWithCSS.to(mm, {
				extraShift: 0,
				duration: .45,
				ease: "power2.inOut"
			});
		});
		gsapWithCSS.to(m.holder.scale, {
			x: 1,
			y: 1,
			duration: .4
		});
		expandedPhotoIndex = null;
	}
	document.getElementById("modalClose").addEventListener("click", () => {
		selection = null;
		collapsePhoto();
		applyHighlight();
	});
	function handleOverlayClick(overlayEl, e, cardSelector) {
		if (cardSelector && e.target.closest && e.target.closest(cardSelector)) {
			selection = null;
			closeEventModal();
			collapsePhoto();
			applyHighlight();
			return;
		}
		const below = elementBelowOverlay(overlayEl, e.clientX, e.clientY);
		const msEl = below && below.closest ? below.closest(".ms") : null;
		if (msEl) {
			const info = msElInfo(msEl);
			if (info) {
				if (selection && selection.source === info.source && selection.id === info.id) {
					closeEventModal();
					if (expandedPhotoIndex !== null) {
						selection = null;
						collapsePhoto();
					}
					applyHighlight();
				} else {
					if (expandedPhotoIndex !== null) collapsePhoto();
					handleSelect(info.source, info.id);
				}
				return;
			}
		}
		const idx = resolvePhotoClick(e.clientX, e.clientY);
		if (idx !== null) {
			if (idx === expandedPhotoIndex) {
				selection = null;
				collapsePhoto();
				applyHighlight();
			} else {
				closeEventModal();
				handleSelect("photo", idx);
			}
			return;
		}
		selection = null;
		closeEventModal();
		collapsePhoto();
		applyHighlight();
	}
	function bindOverlayClick(overlayEl, ignoreSelector, cardSelector) {
		let downPos = null;
		overlayEl.addEventListener("pointerdown", (e) => {
			downPos = {
				x: e.clientX,
				y: e.clientY
			};
		});
		overlayEl.addEventListener("click", (e) => {
			if (ignoreSelector && e.target.closest(ignoreSelector)) {
				downPos = null;
				return;
			}
			if (downPos) {
				const moved = Math.abs(e.clientX - downPos.x) > 6 || Math.abs(e.clientY - downPos.y) > 6;
				downPos = null;
				if (moved) return;
			}
			handleOverlayClick(overlayEl, e, cardSelector);
		});
	}
	bindOverlayClick(document.getElementById("modalOverlay"), "#modalClose,#modalPrev,#modalNext,#modalPhotoCount", "#modalCard");
	bindOverlayClick(document.getElementById("eventModalOverlay"), "#eventModalClose", "#eventModalCard");
	const BACKGROUND_CLICK_IGNORE_SELECTOR = [
		".ms",
		".catBtn",
		".langBtn",
		"#excelImportBtn",
		"#excelFileInput",
		"#excelClearBtn",
		".fontToggleBtn",
		".fontSizeOption",
		"#modalCard",
		"#eventModalCard",
		".modalNav",
		"#modalOverlay",
		"#eventModalOverlay",
		"#timelineBar",
		"canvas"
	].join(",");
	let stageDownPt = null;
	stage.addEventListener("pointerdown", (e) => {
		stageDownPt = {
			x: e.clientX,
			y: e.clientY
		};
	});
	stage.addEventListener("click", (e) => {
		const moved = stageDownPt && (Math.abs(e.clientX - stageDownPt.x) > DRAG_CLICK_THRESHOLD || Math.abs(e.clientY - stageDownPt.y) > DRAG_CLICK_THRESHOLD);
		stageDownPt = null;
		if (moved) return;
		if (e.target.closest(BACKGROUND_CLICK_IGNORE_SELECTOR)) return;
		resetSelection();
	});
	function cleanRowKeys(row) {
		const cleaned = {};
		for (let rawKey in row) {
			if (!rawKey) continue;
			const cleanKey = rawKey.split("\n")[0].trim();
			cleaned[cleanKey] = row[rawKey];
		}
		return cleaned;
	}
	function sheetRows(wb, name) {
		const ws = wb.Sheets[name];
		if (!ws) return null;
		return utils.sheet_to_json(ws, { defval: "" }).map(cleanRowKeys);
	}
	function parseWorkbook(wb) {
		console.log("讀取到的 Sheet 名稱:", wb.SheetNames);
		const topRaw = sheetRows(wb, SHEET_NAMES.top);
		const bottomRaw = sheetRows(wb, SHEET_NAMES.bottom);
		const photoRaw = sheetRows(wb, SHEET_NAMES.photo);
		const missing = [];
		if (topRaw === null) missing.push(SHEET_NAMES.top);
		if (bottomRaw === null) missing.push(SHEET_NAMES.bottom);
		if (photoRaw === null) missing.push(SHEET_NAMES.photo);
		if (missing.length) throw new Error(`找不到分頁：${missing.join("、")}`);
		const raw = {
			topRows: serializeRows(topRaw),
			bottomRows: serializeRows(bottomRaw),
			photoRows: serializeRows(photoRaw)
		};
		return {
			raw,
			ds: buildDataset(raw.topRows, raw.bottomRows, raw.photoRows)
		};
	}
	function rebuildTimeline(ds) {
		closeEventModal();
		selection = null;
		hoverTarget = null;
		expandedPhotoIndex = null;
		clearPhotoPickMemory();
		document.getElementById("modalOverlay").classList.remove("show");
		applyDataset(ds);
		updateYearRange();
		rebuildYearScale();
		buildAxisTicks();
		buildTimelineTicks();
		disposePhotoMeshes();
		buildPhotoMeshes();
		buildMilestoneDOM();
		activeCategory = null;
		bandTop.style.backgroundColor = DEFAULT_TOP_BG;
		updateTopTextContrast(DEFAULT_TOP_BG);
		document.querySelectorAll(".catBtn").forEach((b) => b.classList.remove("on"));
		updateCategoryBadges();
		updateCategoryButtonLabels();
		targetFocusPx = focusPx = TOTAL_VIRTUAL_W * .5;
		updateMilestonePositions();
		updateTimelineBar();
		applyHighlight();
	}
	document.getElementById("excelFileInput").addEventListener("change", async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const statusEl = document.getElementById("excelStatus");
		statusEl.textContent = currentLang === "en" ? "Importing…" : currentLang === "zh-Hans" ? "汇入中…" : "匯入中…";
		try {
			const buf = await file.arrayBuffer();
			const parsed = parseWorkbook(readSync(buf, {
				type: "array",
				cellDates: true
			}));
			const ds = parsed.ds;
			if (ds.topRows.length + ds.bottomRows.length + ds.photoRows.length === 0) throw new Error("解析成功但沒有讀到任何資料，請確認分頁名稱與欄位（id / year / title-TC…）是否正確");
			const saved = saveWorkbookCache(parsed.raw, file.name);
			rebuildTimeline(ds);
			setDataChrome(true, uiCopy().statusImported(ds.topRows.length, ds.bottomRows.length, ds.photoRows.length) + (saved ? "" : currentLang === "en" ? " (browser storage full — not kept)" : "（本機空間不足，重新整理後不會保留）"));
		} catch (err) {
			console.error("Excel 解析失敗", err);
			const msg = `匯入失敗：${err.message || err}`;
			setDataChrome(!!(topMilestones.length || bottomMilestones.length || photosData.length), msg);
			alert(`Excel 匯入失敗：${err.message || err}`);
		} finally {
			e.target.value = "";
		}
	});
	document.getElementById("excelClearBtn").addEventListener("click", () => {
		const txt = uiCopy();
		if (!window.confirm(txt.clearConfirm)) return;
		clearWorkbookCache();
		rebuildTimeline(emptyDataset());
		setDataChrome(false, txt.statusCleared);
	});
	function fitStage() {
		const scale = Math.min(window.innerWidth / 3840, window.innerHeight / 2160);
		stage.style.transform = `scale(${scale})`;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const effectivePixelRatio = Math.max(1, dpr * Math.min(scale, 1.25));
		renderer.setPixelRatio(effectivePixelRatio);
		renderer.setSize(W, H);
	}
	let resizeRAF = null;
	function onResize() {
		if (resizeRAF) cancelAnimationFrame(resizeRAF);
		resizeRAF = requestAnimationFrame(() => {
			fitStage();
			buildTimelineTicks();
		});
	}
	window.addEventListener("resize", onResize);
	window.addEventListener("orientationchange", onResize);
	fitStage();
	buildTimelineTicks();
	function updateYearReadout() {
		const centerYear = Math.round(vxToYear(focusPx));
		document.getElementById("yearNum").textContent = clamp(centerYear, YEAR_MIN, YEAR_MAX);
	}
	function animate() {
		if (destroyed) return;
		animId = requestAnimationFrame(animate);
		focusPx += (targetFocusPx - focusPx) * .1;
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
		if (cached) {
			const ds = buildDataset(cached.topRows, cached.bottomRows, cached.photoRows);
			if (ds.topRows.length + ds.bottomRows.length + ds.photoRows.length > 0) {
				rebuildTimeline(ds);
				setDataChrome(true, uiCopy().statusRestored(ds.topRows.length, ds.bottomRows.length, ds.photoRows.length));
			} else setDataChrome(false, "");
		} else setDataChrome(false, "");
	} catch (err) {
		console.error("本機紀錄載入失敗", err);
		setDataChrome(false, "");
	}
	animate();
	function destroy() {
		destroyed = true;
		cancelAnimationFrame(animId);
		stopPhotoSwap();
		try {
			disposePhotoMeshes();
		} catch (e) {}
		try {
			renderer.dispose();
			if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
		} catch (e) {}
		window.removeEventListener("pointermove", onWinPointerMove);
		window.removeEventListener("pointerup", onWinPointerUp);
		window.removeEventListener("pointermove", onThumbPointerMove);
		window.removeEventListener("pointerup", onThumbPointerUp);
		window.removeEventListener("resize", onResize);
		window.removeEventListener("orientationchange", onResize);
		window.removeEventListener("keydown", onKeyDown);
	}
	return destroy;
}
function TimelineApp() {
	(0, import_react.useEffect)(() => {
		const teardown = mountTimeline();
		return () => {
			teardown?.();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "stage",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "bandTop",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "topCatBadge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dot",
							children: "●"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "label" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "bandBottom",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "bottomTrackLabel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "label" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "threeHost" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "msLayer msStemLayer",
					id: "topStemLayer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "msLayer msStemLayer",
					id: "bottomStemLayer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "msLayer",
					id: "topLayer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "msLayer",
					id: "bottomLayer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "axisLayer",
					id: "topAxisLayer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "axisLine" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "axisLayer",
					id: "bottomAxisLayer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "axisLine" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "guideLine" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "headerLeft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "langSwitch",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "langBtn active",
									"data-lang": "zh-Hant",
									children: "繁"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "langBtn",
									"data-lang": "zh-Hans",
									children: "簡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "langBtn",
									"data-lang": "en",
									children: "ENG"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									id: "excelImportBtn",
									htmlFor: "excelFileInput",
									title: "匯入 Excel 資料（上軌事件／下軌事件／照片列）",
									children: "Excel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									id: "excelFileInput",
									accept: ".xlsx,.xls",
									style: { display: "none" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									id: "excelClearBtn",
									title: "清空本機已儲存的時間軸資料",
									hidden: true,
									children: "清空"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								id: "uiTitle",
								children: "樹仁校史 · 全域時間軸"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								id: "uiSub",
								children: "HONG KONG SHUE YAN UNIVERSITY · 1971–2026"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "excelStatus" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "hint",
					children: [
						"拖拽底部時間軸 / 滾動畫面瀏覽年代",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"點擊照片或事件查看關聯並自動對焦"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "importHint",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "importHintInner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "尚未載入資料" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "請按左上角「Excel」匯入工作簿。匯入後會保存在這個瀏覽器，可隨時按「清空」刪除。" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "yearReadout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num",
						id: "yearNum",
						children: "1998"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lbl",
						id: "uiYearLbl",
						children: "CURRENT YEAR"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "catButtons",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "catBtn",
							"data-c": "A",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catDot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catBtnLabel" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "catBtn",
							"data-c": "B",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catDot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catBtnLabel" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "catBtn",
							"data-c": "C",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catDot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catBtnLabel" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "catBtn",
							"data-c": "D",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catDot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catBtnLabel" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "catBtn",
							"data-c": "E",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catDot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "catBtnLabel" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "fontSizeSwitch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "fontSizeToggle",
						className: "fontToggleBtn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "aaSmall",
							children: "A"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "aaBig",
							children: "A"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "fontSizeMenu",
						className: "fontSizeMenu",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fontSizeOption",
								"data-size": "small",
								children: "小"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fontSizeOption active",
								"data-size": "medium",
								children: "中"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fontSizeOption",
								"data-size": "large",
								children: "大"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "timelineBar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "tlTrack",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "tlFill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "tlThumb" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "tlTicks" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "modalOverlay",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "modalCard",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "modalClose",
								type: "button",
								children: "✕"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: "modalImgWrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										id: "modalPrev",
										className: "modalNav",
										"aria-label": "上一張",
										children: "‹"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										id: "modalImg",
										alt: ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										id: "modalNext",
										className: "modalNav",
										"aria-label": "下一張",
										children: "›"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "modalPhotoCount" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "myear",
								id: "modalYear"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { id: "modalTitle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { id: "modalDesc" })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "eventModalOverlay",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "eventModalCard",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "eventModalClose",
								type: "button",
								children: "✕"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "myear",
								id: "eventModalYear"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { id: "eventModalTitle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { id: "eventModalDesc" })
						]
					})
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineApp, {});
}
//#endregion
export { Home as component };
