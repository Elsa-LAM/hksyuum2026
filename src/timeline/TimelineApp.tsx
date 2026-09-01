import { useEffect } from "react";
import { mountTimeline } from "./engine.js";
import "./timeline.css";

export function TimelineApp() {
  useEffect(() => {
    const teardown = mountTimeline();
    return () => {
      teardown?.();
    };
  }, []);

  return (
    <div id="wrap">
      <div id="stage">
        <div id="bandTop">
          <div id="topCatBadge">
            <span className="dot">●</span>
            <span className="label"></span>
          </div>
        </div>
        <div id="bandBottom">
          <div id="bottomTrackLabel">
            <span className="label"></span>
          </div>
        </div>
        <div id="threeHost"></div>

        <div className="msLayer msStemLayer" id="topStemLayer"></div>
        <div className="msLayer msStemLayer" id="bottomStemLayer"></div>

        <div className="msLayer" id="topLayer"></div>
        <div className="msLayer" id="bottomLayer"></div>

        <div className="axisLayer" id="topAxisLayer">
          <div className="axisLine"></div>
        </div>
        <div className="axisLayer" id="bottomAxisLayer">
          <div className="axisLine"></div>
        </div>
        <div id="guideLine"></div>

        <div id="headerLeft">
          <div id="langSwitch">
            <div className="langBtn active" data-lang="zh-Hant">
              繁
            </div>
            <div className="langBtn" data-lang="zh-Hans">
              簡
            </div>
            <div className="langBtn" data-lang="en">
              ENG
            </div>
            <label
              id="excelImportBtn"
              htmlFor="excelFileInput"
              title="匯入 Excel 資料（上軌事件／下軌事件／照片列）"
            >
              Excel
            </label>
            <input
              type="file"
              id="excelFileInput"
              accept=".xlsx,.xls"
              style={{ display: "none" }}
            />
          </div>
          <div id="title">
            <h1 id="uiTitle">樹仁校史 · 全域時間軸</h1>
            <p id="uiSub">HONG KONG SHUE YAN UNIVERSITY · 1971–2026</p>
          </div>
          <div id="excelStatus"></div>
        </div>

        <div id="hint">
          拖拽底部時間軸 / 滾動畫面瀏覽年代
          <br />
          點擊照片或事件查看關聯並自動對焦
        </div>

        <div id="importHint">
          <div className="importHintInner">正在載入校史時間軸…</div>
        </div>

        <div id="yearReadout">
          <div className="num" id="yearNum">
            1998
          </div>
          <div className="lbl" id="uiYearLbl">
            CURRENT YEAR
          </div>
        </div>

        <div id="catButtons">
          <div className="catBtn" data-c="A">
            <span className="catDot"></span>
            <span className="catBtnLabel"></span>
          </div>
          <div className="catBtn" data-c="B">
            <span className="catDot"></span>
            <span className="catBtnLabel"></span>
          </div>
          <div className="catBtn" data-c="C">
            <span className="catDot"></span>
            <span className="catBtnLabel"></span>
          </div>
          <div className="catBtn" data-c="D">
            <span className="catDot"></span>
            <span className="catBtnLabel"></span>
          </div>
          <div className="catBtn" data-c="E">
            <span className="catDot"></span>
            <span className="catBtnLabel"></span>
          </div>
        </div>

        <div id="fontSizeSwitch">
          <div id="fontSizeToggle" className="fontToggleBtn">
            <span className="aaSmall">A</span>
            <span className="aaBig">A</span>
          </div>
          <div id="fontSizeMenu" className="fontSizeMenu">
            <div className="fontSizeOption" data-size="small">
              小
            </div>
            <div className="fontSizeOption active" data-size="medium">
              中
            </div>
            <div className="fontSizeOption" data-size="large">
              大
            </div>
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
            <button id="modalClose" type="button">
              ✕
            </button>
            <img id="modalImg" alt="" />
            <img
              id="modalImg2"
              alt=""
              style={{
                display: "none",
                width: 64,
                height: 64,
                objectFit: "cover",
                borderRadius: 6,
                position: "absolute",
                right: 20,
                top: 20,
                cursor: "pointer",
                border: "2px solid rgba(255,255,255,.6)",
              }}
            />
            <div className="myear" id="modalYear"></div>
            <h2 id="modalTitle"></h2>
            <p id="modalDesc"></p>
          </div>
        </div>

        <div id="eventModalOverlay">
          <div id="eventModalCard">
            <button id="eventModalClose" type="button">
              ✕
            </button>
            <div className="myear" id="eventModalYear"></div>
            <h2 id="eventModalTitle"></h2>
            <p id="eventModalDesc"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
