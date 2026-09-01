import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as OrthographicCamera, c as TextureLoader, i as MeshBasicMaterial, n as Group, o as PlaneGeometry, r as Mesh, s as Scene, t as WebGLRenderer } from "../_libs/three.mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
import { n as utils, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D4aekXR2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Built-in HKSYU / Hong Kong education history for first paint (Excel import still replaces it). */
var DEMO_TOP = [
	{
		id: "t1971a",
		year: 1971,
		"title-TC": "樹仁書院創校",
		"title-SC": "树仁书院创校",
		"title-Eng": "Shue Yan College founded",
		"content-TC": "胡鴻烈大律師與鍾期榮博士於香港創辦樹仁書院，以中國人文精神與博雅教育為辦學理念，開私立專上教育先河。",
		"content-SC": "胡鸿烈大律师与钟期荣博士于香港创办树仁书院，以中国人文精神与博雅教育为办学理念，开私立专上教育先河。",
		"content-Eng": "Barrister Dr Henry H. L. Hu and Dr Chung Chi-yung founded Shue Yan College in Hong Kong, pioneering private tertiary education rooted in Chinese humanism and the liberal arts.",
		category: "A",
		relatedBottomIds: "b1971"
	},
	{
		id: "t1971b",
		year: 1971,
		"title-TC": "以人文精神立校",
		"title-SC": "以人文精神立校",
		"title-Eng": "A liberal-arts founding charter",
		"content-TC": "創校宗旨強調「敦仁博物」，培養既有專業知能、亦具人文關懷的青年，成為日後重塑博雅教育的源頭。",
		"content-SC": "创校宗旨强调「敦仁博物」，培养既有专业知能、亦具人文关怀的青年，成为日后重塑博雅教育的源头。",
		"content-Eng": "The college was founded on the motto of benevolence and broad learning — the seed of Shue Yan’s later reinventing of liberal arts education.",
		category: "E",
		relatedBottomIds: "b1971"
	},
	{
		id: "t1976",
		year: 1976,
		"title-TC": "獲准註冊為專上學院",
		"title-SC": "获准注册为专上学院",
		"title-Eng": "Registered as an approved post-secondary college",
		"content-TC": "樹仁書院通過政府審核，成為《專上學院條例》認可院校，為日後頒授學位奠定制度基礎。",
		"content-SC": "树仁书院通过政府审核，成为《专上学院条例》认可院校，为日后颁授学位奠定制度基础。",
		"content-Eng": "The college was registered under the Post Secondary Colleges Ordinance, a decisive step toward degree-awarding status.",
		category: "C",
		relatedBottomIds: "b1978"
	},
	{
		id: "t1978",
		year: 1978,
		"title-TC": "北角校舍啟用",
		"title-SC": "北角校舍启用",
		"title-Eng": "North Point campus opens",
		"content-TC": "書院遷入北角校舍，教學空間與學生生活設施顯著擴充，校園發展進入新階段。",
		"content-SC": "书院迁入北角校舍，教学空间与学生生活设施显著扩充，校园发展进入新阶段。",
		"content-Eng": "The move to the North Point campus expanded teaching space and student life, marking a new phase of campus development.",
		category: "A",
		relatedBottomIds: "b1978"
	},
	{
		id: "t1985",
		year: 1985,
		"title-TC": "寶馬山校園奠基",
		"title-SC": "宝马山校园奠基",
		"title-Eng": "Braemar Hill campus foundation",
		"content-TC": "書院於北角寶馬山購地興建永久校園，奠基儀式象徵樹仁扎根港島東的長遠規劃。",
		"content-SC": "书院于北角宝马山购地兴建永久校园，奠基仪式象征树仁扎根港岛东的长远规划。",
		"content-Eng": "Land on Braemar Hill was secured for a permanent campus — a long-term commitment to Hong Kong Island East.",
		category: "A",
		relatedBottomIds: "b1989"
	},
	{
		id: "t1986",
		year: 1986,
		"title-TC": "寶馬山校園第一期落成",
		"title-SC": "宝马山校园第一期落成",
		"title-Eng": "Braemar Hill Phase I completed",
		"content-TC": "寶馬山校園首期建築落成啟用，書院逐步將教學重心遷往山城校址，形成今日校園格局的雛形。",
		"content-SC": "宝马山校园首期建筑落成启用，书院逐步将教学重心迁往山城校址，形成今日校园格局的雏形。",
		"content-Eng": "Phase I of the hillside campus opened, and teaching gradually moved to the site that still shapes the university today.",
		category: "A",
		relatedBottomIds: "b1989"
	},
	{
		id: "t1989",
		year: 1989,
		"title-TC": "通識課程改革",
		"title-SC": "通识课程改革",
		"title-Eng": "General education reform",
		"content-TC": "面對社會急劇轉變，書院重整通識與中西經典閱讀，強化博雅教育在專業課程中的比重。",
		"content-SC": "面对社会急剧转变，书院重整通识与中西经典阅读，强化博雅教育在专业课程中的比重。",
		"content-Eng": "As Hong Kong changed rapidly, the college rebuilt general education around classics and widened the liberal-arts core inside professional programmes.",
		category: "E",
		relatedBottomIds: "b1989"
	},
	{
		id: "t1995",
		year: 1995,
		"title-TC": "圖書館大樓落成",
		"title-SC": "图书馆大楼落成",
		"title-Eng": "Library building completed",
		"content-TC": "新圖書館大樓啟用，典藏與研讀空間大幅提升，成為寶馬山校園的學術心臟。",
		"content-SC": "新图书馆大楼启用，典藏与研读空间大幅提升，成为宝马山校园的学术心脏。",
		"content-Eng": "A new library building opened, expanding collections and reading rooms into the academic heart of the Braemar Hill campus.",
		category: "A",
		relatedBottomIds: "b1994"
	},
	{
		id: "t2001a",
		year: 2001,
		"title-TC": "開辦榮譽學士學位",
		"title-SC": "开办荣誉学士学位",
		"title-Eng": "Honours bachelor’s degrees launched",
		"content-TC": "書院獲准開辦榮譽學士學位課程，標誌學術水平獲進一步確認，邁向大學正名的關鍵一步。",
		"content-SC": "书院获准开办荣誉学士学位课程，标志学术水平获进一步确认，迈向大学正名的关键一步。",
		"content-Eng": "Approval to offer honours bachelor’s degrees confirmed academic standing and set up the later retitling as a university.",
		category: "C",
		relatedBottomIds: "b2000"
	},
	{
		id: "t2002",
		year: 2002,
		"title-TC": "鍾期榮校長榮休",
		"title-SC": "钟期荣校长荣休",
		"title-Eng": "President Chung Chi-yung retires",
		"content-TC": "創校校長鍾期榮博士榮休，校園以講座、展覽與獎學金緬懷其一生奉獻於私立教育。",
		"content-SC": "创校校长钟期荣博士荣休，校园以讲座、展览与奖学金缅怀其一生奉献于私立教育。",
		"content-Eng": "Founding President Dr Chung Chi-yung retired. Lectures, exhibitions and scholarships honoured a lifetime given to private education.",
		category: "B",
		relatedBottomIds: "b2000"
	},
	{
		id: "t2003",
		year: 2003,
		"title-TC": "成立研究院",
		"title-SC": "成立研究院",
		"title-Eng": "Graduate School established",
		"content-TC": "書院成立研究院，開拓研究生教育，校務由專上學院進一步走向綜合大學格局。",
		"content-SC": "书院成立研究院，开拓研究生教育，校务由专上学院进一步走向综合大学格局。",
		"content-Eng": "A Graduate School was established, extending the college from undergraduate teaching toward a fuller university profile.",
		category: "D",
		relatedBottomIds: "b2005"
	},
	{
		id: "t2006",
		year: 2006,
		"title-TC": "正名香港樹仁大學",
		"title-SC": "正名香港树仁大学",
		"title-Eng": "Retitled Hong Kong Shue Yan University",
		"content-TC": "樹仁成為香港首間私立大學，正名為香港樹仁大學，是私立高等教育史上的里程碑。",
		"content-SC": "树仁成为香港首间私立大学，正名为香港树仁大学，是私立高等教育史上的里程碑。",
		"content-Eng": "Shue Yan became Hong Kong’s first private university — a landmark in the city’s higher-education history.",
		category: "C",
		relatedBottomIds: "b2006"
	},
	{
		id: "t2007",
		year: 2007,
		"title-TC": "首屆大學學位畢業禮",
		"title-SC": "首届大学学位毕业礼",
		"title-Eng": "First university-title congregation",
		"content-TC": "正名後首屆學位畢業禮舉行，校友、師生與社會嘉賓見證私立大學時代的開始。",
		"content-SC": "正名后首届学位毕业礼举行，校友、师生与社会嘉宾见证私立大学时代的开始。",
		"content-Eng": "The first congregation under the university title gathered alumni, staff and guests to mark the private-university era.",
		category: "D",
		relatedBottomIds: "b2006"
	},
	{
		id: "t2009",
		year: 2009,
		"title-TC": "博雅課程重整",
		"title-SC": "博雅课程重整",
		"title-Eng": "Liberal-arts curriculum rebuilt",
		"content-TC": "配合三三四學制，大學重整本科博雅核心，強調跨學科閱讀、寫作與社會服務。",
		"content-SC": "配合三三四学制，大学重整本科博雅核心，强调跨学科阅读、写作与社会服务。",
		"content-Eng": "With the 3-3-4 academic structure, the undergraduate liberal-arts core was rebuilt around reading, writing and civic service.",
		category: "E",
		relatedBottomIds: "b2009"
	},
	{
		id: "t2014",
		year: 2014,
		"title-TC": "緬懷創校校監胡鴻烈",
		"title-SC": "缅怀创校校监胡鸿烈",
		"title-Eng": "In remembrance of Dr Henry Hu",
		"content-TC": "校園舉行追思與展覽，紀念創校校監胡鴻烈大律師對樹仁與香港法治教育的貢獻。",
		"content-SC": "校园举行追思与展览，纪念创校校监胡鸿烈大律师对树仁与香港法治教育的贡献。",
		"content-Eng": "Memorials and exhibitions honoured founding Supervisor Dr Henry H. L. Hu and his work for Shue Yan and legal education.",
		category: "B",
		relatedBottomIds: "b2012"
	},
	{
		id: "t2016",
		year: 2016,
		"title-TC": "服務學習全面推行",
		"title-SC": "服务学习全面推行",
		"title-Eng": "Service learning campus-wide",
		"content-TC": "服務學習納入本科要求，學生走進社區，把博雅教育從課堂延伸到公共生活。",
		"content-SC": "服务学习纳入本科要求，学生走进社区，把博雅教育从课堂延伸到公共生活。",
		"content-Eng": "Service learning became an undergraduate requirement, carrying the liberal arts from the classroom into civic life.",
		category: "E",
		relatedBottomIds: "b2017"
	},
	{
		id: "t2017",
		year: 2017,
		"title-TC": "研究及教學大樓啟用",
		"title-SC": "研究及教学大楼启用",
		"title-Eng": "Research and teaching complex opens",
		"content-TC": "新大樓提供實驗室、研討室與教師研究室，強化研究能量與教學設施。",
		"content-SC": "新大楼提供实验室、研讨室与教师研究室，强化研究能量与教学设施。",
		"content-Eng": "A new complex added laboratories, seminar rooms and faculty offices, lifting both research capacity and teaching fabric.",
		category: "A",
		relatedBottomIds: "b2017"
	},
	{
		id: "t2018a",
		year: 2018,
		"title-TC": "開辦研究式碩士",
		"title-SC": "开办研究式硕士",
		"title-Eng": "Research master’s programmes begin",
		"content-TC": "大學開辦研究式碩士課程，研究生訓練與學術產出進入新階段。",
		"content-SC": "大学开办研究式硕士课程，研究生训练与学术产出进入新阶段。",
		"content-Eng": "Research master’s degrees opened a new stage of graduate training and scholarly output.",
		category: "C",
		relatedBottomIds: "b2017"
	},
	{
		id: "t2018b",
		year: 2018,
		"title-TC": "緬懷鍾期榮博士",
		"title-SC": "缅怀钟期荣博士",
		"title-Eng": "In remembrance of Dr Chung Chi-yung",
		"content-TC": "創校校長鍾期榮博士辭世，大學以校史展、獎學金與命名空間致敬其辦學一生。",
		"content-SC": "创校校长钟期荣博士辞世，大学以校史展、奖学金与命名空间致敬其办学一生。",
		"content-Eng": "The university honoured the late founding President with exhibitions, scholarships and named spaces.",
		category: "B",
		relatedBottomIds: "b2017"
	},
	{
		id: "t2021",
		year: 2021,
		"title-TC": "創校五十週年",
		"title-SC": "创校五十周年",
		"title-Eng": "Fiftieth anniversary",
		"content-TC": "樹仁迎來創校五十週年，舉辦校慶典禮、校友回歸與校史展覽，回顧半世紀私立教育路。",
		"content-SC": "树仁迎来创校五十周年，举办校庆典礼、校友回归与校史展览，回顾半世纪私立教育路。",
		"content-Eng": "The fiftieth anniversary brought a congregation, alumni homecoming and a history exhibition covering half a century of private education.",
		category: "B",
		relatedBottomIds: "b2022"
	},
	{
		id: "t2022",
		year: 2022,
		"title-TC": "開辦博士課程",
		"title-SC": "开办博士课程",
		"title-Eng": "Doctoral programmes launched",
		"content-TC": "大學開辦博士課程，完整學士—碩士—博士培養體系，私立大學學術格局再進一步。",
		"content-SC": "大学开办博士课程，完整学士—硕士—博士培养体系，私立大学学术格局再进一步。",
		"content-Eng": "Doctoral programmes completed the bachelor–master–doctorate pathway and deepened the university’s research profile.",
		category: "C",
		relatedBottomIds: "b2022"
	},
	{
		id: "t2024",
		year: 2024,
		"title-TC": "新課程與校務拓展",
		"title-SC": "新课程与校务拓展",
		"title-Eng": "New programmes and advancement",
		"content-TC": "大學推出新本科與專業課程，並拓展海內外合作，持續推進校務與學術版圖。",
		"content-SC": "大学推出新本科与专业课程，并拓展海内外合作，持续推进校务与学术版图。",
		"content-Eng": "New undergraduate and professional programmes, plus wider partnerships, continued institutional advancement.",
		category: "D",
		relatedBottomIds: "b2022"
	},
	{
		id: "t2025",
		year: 2025,
		"title-TC": "博雅教育新里程",
		"title-SC": "博雅教育新里程",
		"title-Eng": "A new chapter for the liberal arts",
		"content-TC": "大學公布新一輪博雅教育改革，把數位素養、可持續發展與中華人文經典一併寫入核心課程。",
		"content-SC": "大学公布新一轮博雅教育改革，把数位素养、可持续发展与中华人文经典一并写入核心课程。",
		"content-Eng": "A new liberal-arts reform folded digital literacy, sustainability and the Chinese classics into the core curriculum.",
		category: "E",
		relatedBottomIds: "b2022"
	}
];
var DEMO_BOTTOM = [
	{
		id: "b1965",
		year: 1965,
		"title-TC": "教育政策白皮書",
		"title-SC": "教育政策白皮书",
		"title-Eng": "Education policy white paper",
		"content-TC": "港英政府發表教育政策白皮書，勾勒戰後香港普及教育的方向，專上教育仍屬稀缺資源。",
		"content-SC": "港英政府发表教育政策白皮书，勾勒战后香港普及教育的方向，专上教育仍属稀缺资源。",
		"content-Eng": "A government white paper sketched postwar mass education in Hong Kong; tertiary places remained scarce.",
		category: "D",
		relatedTopIds: ""
	},
	{
		id: "b1971",
		year: 1971,
		"title-TC": "六年免費小學教育",
		"title-SC": "六年免费小学教育",
		"title-Eng": "Six years of free primary schooling",
		"content-TC": "香港實施六年免費小學教育，基础教育大幅擴展，民間辦學與私立專上學院同步興起。",
		"content-SC": "香港实施六年免费小学教育，基础教育大幅扩展，民间办学与私立专上学院同步兴起。",
		"content-Eng": "Six years of free primary education began; grassroots schooling and private colleges grew alongside it.",
		category: "D",
		relatedTopIds: "t1971a"
	},
	{
		id: "b1978",
		year: 1978,
		"title-TC": "九年免費教育",
		"title-SC": "九年免费教育",
		"title-Eng": "Nine years of free education",
		"content-TC": "免費教育延伸至初中，中學學位急增，專上升學壓力與私立學院的社會角色同時上升。",
		"content-SC": "免费教育延伸至初中，中学学位急增，专上升学压力与私立学院的社会角色同时上升。",
		"content-Eng": "Free education reached junior secondary. More school leavers raised the stakes for private colleges.",
		category: "D",
		relatedTopIds: "t1976"
	},
	{
		id: "b1989",
		year: 1989,
		"title-TC": "大學學額擴展",
		"title-SC": "大学学额扩展",
		"title-Eng": "University places expanded",
		"content-TC": "教資會體系擴大大學學額，公立院校急速增長，私立書院須以辦學特色突圍。",
		"content-SC": "教资会体系扩大大学学额，公立院校急速增长，私立书院须以办学特色突围。",
		"content-Eng": "UGC universities expanded rapidly; private colleges had to compete on distinctive missions.",
		category: "C",
		relatedTopIds: "t1989"
	},
	{
		id: "b1994",
		year: 1994,
		"title-TC": "教統會第五號報告書",
		"title-SC": "教统会第五号報告書",
		"title-Eng": "Education Commission Report No. 5",
		"content-TC": "報告書檢視教師專業與學校質素，為往後專上及師資教育改革埋下伏筆。",
		"content-SC": "報告書检视教师专业与学校质素，为往后专上及师资教育改革埋下伏笔。",
		"content-Eng": "Report No. 5 examined the teaching profession and school quality, foreshadowing later tertiary reforms.",
		category: "C",
		relatedTopIds: "t1995"
	},
	{
		id: "b2000",
		year: 2e3,
		"title-TC": "教育制度改革",
		"title-SC": "教育制度改革",
		"title-Eng": "Education system reform",
		"content-TC": "教育改革強調終身學習與全人發展，專上教育走向多元，自資院校空間打開。",
		"content-SC": "教育改革强调终身学习与全人发展，专上教育走向多元，自资院校空间打开。",
		"content-Eng": "Reform stressed lifelong and whole-person learning, opening space for self-financed institutions.",
		category: "E",
		relatedTopIds: "t2001a"
	},
	{
		id: "b2005",
		year: 2005,
		"title-TC": "公布三三四學制",
		"title-SC": "公布三三四学制",
		"title-Eng": "3-3-4 academic structure announced",
		"content-TC": "政府公布新學制，大學本科將改為四年，專上院校須重新設計課程與收生。",
		"content-SC": "政府公布新学制，大学本科将改为四年，专上院校须重新设计课程与收生。",
		"content-Eng": "The 3-3-4 structure was announced: four-year undergraduate degrees would require a full curriculum redesign.",
		category: "C",
		relatedTopIds: "t2003"
	},
	{
		id: "b2006",
		year: 2006,
		"title-TC": "自資專上教育擴展",
		"title-SC": "自资专上教育扩展",
		"title-Eng": "Self-financed tertiary expansion",
		"content-TC": "自資專上界別快速成長，樹仁正名為大學，成為該浪潮中的制度標竿。",
		"content-SC": "自资专上界别快速成长，树仁正名为大学，成为该浪潮中的制度标竿。",
		"content-Eng": "The self-financed sector grew quickly; Shue Yan’s university title became a benchmark inside that wave.",
		category: "D",
		relatedTopIds: "t2006"
	},
	{
		id: "b2009",
		year: 2009,
		"title-TC": "新高中學制實施",
		"title-SC": "新高中学制实施",
		"title-Eng": "New senior secondary curriculum",
		"content-TC": "新高中課程上路，通識教育科成為核心，與大學博雅教育改革互相呼應。",
		"content-SC": "新高中课程上路，通识教育科成为核心，与大学博雅教育改革互相呼应。",
		"content-Eng": "The new senior secondary curriculum made liberal studies core, echoing university general-education reform.",
		category: "E",
		relatedTopIds: "t2009"
	},
	{
		id: "b2012",
		year: 2012,
		"title-TC": "首屆中學文憑考試",
		"title-SC": "首届中学文凭考试",
		"title-Eng": "First HKDSE cohort",
		"content-TC": "首屆香港中學文憑考試舉行，大學收生機制全面接軌新學制。",
		"content-SC": "首届香港中学文凭考试举行，大学收生机制全面接轨新学制。",
		"content-Eng": "The first HKDSE was held, and university admissions switched fully to the new structure.",
		category: "C",
		relatedTopIds: "t2014"
	},
	{
		id: "b2017",
		year: 2017,
		"title-TC": "自資專上教育檢討",
		"title-SC": "自资专上教育检讨",
		"title-Eng": "Review of self-financed higher education",
		"content-TC": "政策檢討聚焦質素保證、學額規劃與私立大學的長遠角色。",
		"content-SC": "政策检讨聚焦质素保证、学额规划与私立大学的长远角色。",
		"content-Eng": "A policy review focused on quality assurance, place planning, and the long-term role of private universities.",
		category: "D",
		relatedTopIds: "t2017"
	},
	{
		id: "b2022",
		year: 2022,
		"title-TC": "專上教育策略更新",
		"title-SC": "专上教育策略更新",
		"title-Eng": "Updated tertiary education strategy",
		"content-TC": "教育局更新專上教育策略，鼓勵研究、國際化與多元辦學，私立大學迎來新一輪定位。",
		"content-SC": "教育局更新专上教育策略，鼓励研究、国际化与多元办学，私立大学迎来新一轮定位。",
		"content-Eng": "An updated tertiary strategy encouraged research, internationalisation and diverse providers — a new brief for private universities.",
		category: "D",
		relatedTopIds: "t2022"
	}
];
var DEMO_PHOTOS = [
	{
		id: "ph01",
		year: 1971,
		"photo-1": "p-campus-1970s.jpg",
		"photo-2": "",
		"title-TC": "創校初期校舍",
		"title-SC": "创校初期校舍",
		"title-Eng": "The college in its founding years",
		"content-TC": "一九七〇年代的校舍樸實緊湊，紀錄樹仁白手興學的起點。",
		"content-SC": "一九七〇年代的校舍朴实紧凑，记录树仁白手兴学的起点。",
		"content-Eng": "A compact 1970s campus, the starting point of Shue Yan’s private-college story.",
		relatedTopIds: "t1971a;t1971b",
		relatedBottomIds: "b1971",
		category: "A"
	},
	{
		id: "ph02",
		year: 1971,
		"photo-1": "p-courtyard.jpg",
		"photo-2": "",
		"title-TC": "人文庭園",
		"title-SC": "人文庭园",
		"title-Eng": "A courtyard for the humanities",
		"content-TC": "校園庭園承載創校時「敦仁博物」的想像，讓師生在山城裡讀聖賢書。",
		"content-SC": "校园庭园承载创校时「敦仁博物」的想象，让师生在山城里读圣贤书。",
		"content-Eng": "A courtyard that still carries the founding wish: learning that is both humane and broad.",
		relatedTopIds: "t1971b",
		relatedBottomIds: "b1971",
		category: "E"
	},
	{
		id: "ph03",
		year: 1978,
		"photo-1": "p-hillside.jpg",
		"photo-2": "",
		"title-TC": "山城校舍擴建",
		"title-SC": "山城校舍扩建",
		"title-Eng": "Hillside campus expansion",
		"content-TC": "連廊與校舍依山而建，北角—寶馬山一帶逐漸成為樹仁的地理記憶。",
		"content-SC": "连廊与校舍依山而建，北角—宝马山一带逐渐成为树仁的地理记忆。",
		"content-Eng": "Covered walkways cling to the hillside — the geography that became Shue Yan’s memory of place.",
		relatedTopIds: "t1978;t1985",
		relatedBottomIds: "b1978",
		category: "A"
	},
	{
		id: "ph04",
		year: 1986,
		"photo-1": "p-hillside.jpg",
		"photo-2": "p-campus-1970s.jpg",
		"title-TC": "寶馬山第一期",
		"title-SC": "宝马山第一期",
		"title-Eng": "Braemar Hill Phase I",
		"content-TC": "第一期校舍落成，教學重心遷上山城，今日校園輪廓由此展開。",
		"content-SC": "第一期校舍落成，教学重心迁上山城，今日校园轮廓由此展开。",
		"content-Eng": "Phase I opened and teaching moved up the hill, drawing the outline of today’s campus.",
		relatedTopIds: "t1986;t1985",
		relatedBottomIds: "b1989",
		category: "A"
	},
	{
		id: "ph05",
		year: 1995,
		"photo-1": "p-library.jpg",
		"photo-2": "",
		"title-TC": "圖書館研讀空間",
		"title-SC": "图书馆研读空间",
		"title-Eng": "Library reading rooms",
		"content-TC": "新圖書館成為校園學術心臟，燈火常亮至深夜。",
		"content-SC": "新图书馆成为校园学术心脏，灯火常亮至深夜。",
		"content-Eng": "The new library became the academic heart of campus, lamps often burning late.",
		relatedTopIds: "t1995",
		relatedBottomIds: "b1994",
		category: "A"
	},
	{
		id: "ph06",
		year: 2001,
		"photo-1": "p-lecture.jpg",
		"photo-2": "",
		"title-TC": "榮譽學士課堂",
		"title-SC": "荣誉学士课堂",
		"title-Eng": "Honours-degree classrooms",
		"content-TC": "階梯教室見證榮譽學士課程開辦，學術評鑑進入新的嚴格標準。",
		"content-SC": "阶梯教室见证荣誉学士课程开办，学术评鉴进入新的严格标准。",
		"content-Eng": "Lecture theatres of the first honours-degree years, when academic review grew stricter.",
		relatedTopIds: "t2001a",
		relatedBottomIds: "b2000",
		category: "C"
	},
	{
		id: "ph07",
		year: 2006,
		"photo-1": "p-ceremony.jpg",
		"photo-2": "p-auditorium.jpg",
		"title-TC": "正名為大學",
		"title-SC": "正名为大学",
		"title-Eng": "The university title",
		"content-TC": "禮堂見證香港首間私立大學正名，師生校友在此記下歷史時刻。",
		"content-SC": "礼堂见证香港首间私立大学正名，师生校友在此记下历史时刻。",
		"content-Eng": "The hall that held the retitling of Hong Kong’s first private university.",
		relatedTopIds: "t2006;t2007",
		relatedBottomIds: "b2006",
		category: "C"
	},
	{
		id: "ph08",
		year: 2007,
		"photo-1": "p-graduation.jpg",
		"photo-2": "",
		"title-TC": "大學時代畢業禮",
		"title-SC": "大学时代毕业礼",
		"title-Eng": "Congregation in the university era",
		"content-TC": "正名後的畢業禮，木椅與舞台記下無數家庭的升學故事。",
		"content-SC": "正名后的毕业礼，木椅与舞台记下无数家庭的升学故事。",
		"content-Eng": "Congregations after the university title — wooden seats holding family stories of first degrees.",
		relatedTopIds: "t2007",
		relatedBottomIds: "b2006",
		category: "D"
	},
	{
		id: "ph09",
		year: 2009,
		"photo-1": "p-lecture.jpg",
		"photo-2": "",
		"title-TC": "三三四課改現場",
		"title-SC": "三三四课改现场",
		"title-Eng": "Rebuilding the curriculum for 3-3-4",
		"content-TC": "課堂被重新設計成四年博雅主軸，通識與專業並讀。",
		"content-SC": "课堂被重新设计成四年博雅主轴，通识与专业并读。",
		"content-Eng": "Classrooms rebuilt for a four-year liberal-arts spine running beside professional study.",
		relatedTopIds: "t2009",
		relatedBottomIds: "b2009",
		category: "E"
	},
	{
		id: "ph10",
		year: 2012,
		"photo-1": "p-auditorium.jpg",
		"photo-2": "",
		"title-TC": "文憑試世代",
		"title-SC": "文凭试世代",
		"title-Eng": "The HKDSE generation arrives",
		"content-TC": "首屆文憑試學生走進大學禮堂，收生與課程全面接軌新學制。",
		"content-SC": "首届文凭试学生走进大学礼堂，收生与课程全面接轨新学制。",
		"content-Eng": "The first HKDSE cohort entered the hall as admissions switched to the new examinations.",
		relatedTopIds: "t2014",
		relatedBottomIds: "b2012",
		category: "C"
	},
	{
		id: "ph11",
		year: 2014,
		"photo-1": "p-ceremony.jpg",
		"photo-2": "",
		"title-TC": "追思與榮譽",
		"title-SC": "追思与荣誉",
		"title-Eng": "Remembrance and honour",
		"content-TC": "禮堂多次承載追思、榮譽學位與校慶，是樹仁公共記憶的容器。",
		"content-SC": "礼堂多次承载追思、荣誉学位与校庆，是树仁公共记忆的容器。",
		"content-Eng": "The ceremonial hall holds memorials, honorary degrees and anniversaries — a vessel of public memory.",
		relatedTopIds: "t2014;t2018b",
		relatedBottomIds: "b2012",
		category: "B"
	},
	{
		id: "ph12",
		year: 2017,
		"photo-1": "p-modern.jpg",
		"photo-2": "",
		"title-TC": "研究及教學大樓",
		"title-SC": "研究及教学大楼",
		"title-Eng": "Research and teaching complex",
		"content-TC": "新大樓沿山而立，實驗室與研討室讓研究型教學落地。",
		"content-SC": "新大楼沿山而立，实验室与研讨室让研究型教学落地。",
		"content-Eng": "The new hillside complex put laboratories and seminar rooms under one roof.",
		relatedTopIds: "t2017;t2018a",
		relatedBottomIds: "b2017",
		category: "A"
	},
	{
		id: "ph13",
		year: 2017,
		"photo-1": "p-lecture.jpg",
		"photo-2": "p-modern.jpg",
		"title-TC": "研討與實驗",
		"title-SC": "研讨与实验",
		"title-Eng": "Seminars and laboratories",
		"content-TC": "研究式課程把討論班與實驗室變成日常，而不只是本科大課。",
		"content-SC": "研究式课程把讨论班与实验室变成日常，而不只是本科大课。",
		"content-Eng": "Research degrees made seminars and labs ordinary, not only large undergraduate lectures.",
		relatedTopIds: "t2018a;t2017",
		relatedBottomIds: "b2017",
		category: "C"
	},
	{
		id: "ph14",
		year: 2021,
		"photo-1": "p-night.jpg",
		"photo-2": "p-courtyard.jpg",
		"title-TC": "五十週年夜色",
		"title-SC": "五十周年夜色",
		"title-Eng": "Fiftieth-anniversary night",
		"content-TC": "校慶之夜，山城燈火映出半世紀私立辦學的路。",
		"content-SC": "校庆之夜，山城灯火映出半世纪私立办学的路。",
		"content-Eng": "Anniversary lights on the hillside — fifty years of private education, made visible.",
		relatedTopIds: "t2021",
		relatedBottomIds: "b2022",
		category: "B"
	},
	{
		id: "ph15",
		year: 2021,
		"photo-1": "p-graduation.jpg",
		"photo-2": "",
		"title-TC": "校慶畢業禮",
		"title-SC": "校庆毕业礼",
		"title-Eng": "Anniversary congregation",
		"content-TC": "五十週年畢業禮把校史與新人的出發疊在同一舞台上。",
		"content-SC": "五十周年毕业礼把校史与新人的出发叠在同一舞台上。",
		"content-Eng": "The anniversary congregation stacked institutional memory with a new cohort’s beginning.",
		relatedTopIds: "t2021;t2007",
		relatedBottomIds: "b2022",
		category: "B"
	},
	{
		id: "ph16",
		year: 2022,
		"photo-1": "p-modern.jpg",
		"photo-2": "",
		"title-TC": "博士課程時代",
		"title-SC": "博士课程时代",
		"title-Eng": "The doctoral years begin",
		"content-TC": "博士課程把私立大學的學術階梯補完，研究樓 Lam 燈更晚。",
		"content-SC": "博士课程把私立大学的学术阶梯补完，研究楼灯火更晚。",
		"content-Eng": "Doctoral study completed the academic ladder; research floors stayed lit later still.",
		relatedTopIds: "t2022",
		relatedBottomIds: "b2022",
		category: "C"
	},
	{
		id: "ph17",
		year: 2024,
		"photo-1": "p-auditorium.jpg",
		"photo-2": "p-ceremony.jpg",
		"title-TC": "校務拓展論壇",
		"title-SC": "校务拓展论坛",
		"title-Eng": "Advancement forum",
		"content-TC": "禮堂舉辦課程發布與合作論壇，校務拓展走向公開舞台。",
		"content-SC": "礼堂举办课程发布与合作论坛，校务拓展走向公开舞台。",
		"content-Eng": "Programme launches and partnership forums moved institutional advancement onto a public stage.",
		relatedTopIds: "t2024",
		relatedBottomIds: "b2022",
		category: "D"
	},
	{
		id: "ph18",
		year: 2025,
		"photo-1": "p-courtyard.jpg",
		"photo-2": "p-library.jpg",
		"title-TC": "博雅新核心",
		"title-SC": "博雅新核心",
		"title-Eng": "A renewed liberal-arts core",
		"content-TC": "庭園與圖書館仍是博雅教育的日常場景：讀書、辯論、把新核心課程讀進生活。",
		"content-SC": "庭园与图书馆仍是博雅教育的日常场景：读书、辩论、把新核心课程读进生活。",
		"content-Eng": "Garden and library remain the daily rooms of the liberal arts: reading the new core into lived practice.",
		relatedTopIds: "t2025;t2009",
		relatedBottomIds: "b2022",
		category: "E"
	}
];
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
			yearLbl: "CURRENT YEAR"
		},
		"zh-Hans": {
			title: "树仁校史 · 全域时间轴",
			hint: "拖拽底部时间轴 / 滚动画面浏览年代<br>点击照片或事件查看关联并自动聚焦",
			yearLbl: "CURRENT YEAR"
		},
		"en": {
			title: "HKSYU History · Global Timeline",
			hint: "Drag timeline / Scroll to explore years<br>Click photo or event to reveal connections",
			yearLbl: "CURRENT YEAR"
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
		meshes.forEach((m) => {
			chainGroup.remove(m.holder);
			m.mesh.geometry.dispose();
			m.mesh.material.map && m.mesh.material.map.dispose();
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
			if (p.photoSrc) loadPhotoTexture(p.photoSrc, (texture) => {
				mat.map = texture;
				mat.color.setHex(16777215);
				mat.needsUpdate = true;
			}, () => {});
			const holder = new Group();
			holder.add(frame);
			holder.add(mesh);
			chainGroup.add(holder);
			meshes.push({
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
				elevated: false
			});
		});
	}
	buildPhotoMeshes();
	let expandedPhotoIndex = null;
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
		if (e.key === "ArrowLeft") {
			targetFocusPx = clamp(targetFocusPx - 180, 0, TOTAL_VIRTUAL_W);
			resetHintTimer();
			clearPhotoPickMemory();
		}
		if (e.key === "ArrowRight") {
			targetFocusPx = clamp(targetFocusPx + 180, 0, TOTAL_VIRTUAL_W);
			resetHintTimer();
			clearPhotoPickMemory();
		}
		if (e.key === "Escape") resetSelection();
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
		const modalImg = document.getElementById("modalImg");
		if (detail.photoSrc) {
			modalImg.onerror = () => {
				modalImg.style.display = "none";
			};
			modalImg.src = detail.photoSrc.includes("picsum.photos") ? detail.photoSrc.replace("/800/600", "/1200/900") : detail.photoSrc;
			modalImg.style.display = "";
		} else {
			modalImg.onerror = null;
			modalImg.removeAttribute("src");
			modalImg.style.display = "none";
		}
		const modalImg2 = document.getElementById("modalImg2");
		if (detail.photoSrc2) {
			modalImg2.onerror = () => {
				modalImg2.style.display = "none";
			};
			modalImg2.src = detail.photoSrc2;
			modalImg2.style.display = "block";
			modalImg2.onclick = () => {
				const swap = modalImg.src;
				modalImg.src = modalImg2.src;
				modalImg2.src = swap;
			};
		} else {
			modalImg2.onerror = null;
			modalImg2.removeAttribute("src");
			modalImg2.style.display = "none";
		}
		document.getElementById("modalYear").textContent = Math.floor(detail.year);
		document.getElementById("modalTitle").textContent = detail.title;
		document.getElementById("modalDesc").textContent = detail.desc;
		document.getElementById("modalOverlay").classList.add("show");
	}
	function collapsePhoto(skipModalClose) {
		if (!skipModalClose) document.getElementById("modalOverlay").classList.remove("show");
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
	bindOverlayClick(document.getElementById("modalOverlay"), "#modalClose,#modalImg2", "#modalCard");
	bindOverlayClick(document.getElementById("eventModalOverlay"), "#eventModalClose", "#eventModalCard");
	const BACKGROUND_CLICK_IGNORE_SELECTOR = [
		".ms",
		".catBtn",
		".langBtn",
		"#excelImportBtn",
		"#excelFileInput",
		".fontToggleBtn",
		".fontSizeOption",
		"#modalCard",
		"#eventModalCard",
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
		return buildDataset(topRaw, bottomRaw, photoRaw);
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
		statusEl.textContent = "匯入中…";
		try {
			const buf = await file.arrayBuffer();
			const ds = parseWorkbook(readSync(buf, {
				type: "array",
				cellDates: true
			}));
			if (ds.topRows.length + ds.bottomRows.length + ds.photoRows.length === 0) throw new Error("解析成功但沒有讀到任何資料，請確認分頁名稱與欄位（id / year / title-TC…）是否正確");
			rebuildTimeline(ds);
			statusEl.textContent = `已匯入：${ds.topRows.length} 筆上軌／${ds.bottomRows.length} 筆下軌／${ds.photoRows.length} 張照片`;
			document.getElementById("importHint").classList.add("hidden");
		} catch (err) {
			console.error("Excel 解析失敗", err);
			statusEl.textContent = `匯入失敗：${err.message || err}`;
			alert(`Excel 匯入失敗：${err.message || err}`);
		} finally {
			e.target.value = "";
		}
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
	try {
		const ds = buildDataset(DEMO_TOP, DEMO_BOTTOM, DEMO_PHOTOS);
		rebuildTimeline(ds);
		const statusEl = document.getElementById("excelStatus");
		if (statusEl) statusEl.textContent = `示範資料：${ds.topRows.length} 筆上軌／${ds.bottomRows.length} 筆下軌／${ds.photoRows.length} 張照片`;
		const hint = document.getElementById("importHint");
		if (hint) hint.classList.add("hidden");
	} catch (err) {
		console.error("示範資料載入失敗", err);
	}
	animate();
	function destroy() {
		destroyed = true;
		cancelAnimationFrame(animId);
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "importHintInner",
						children: "正在載入校史時間軸…"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								id: "modalImg",
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								id: "modalImg2",
								alt: "",
								style: {
									display: "none",
									width: 64,
									height: 64,
									objectFit: "cover",
									borderRadius: 6,
									position: "absolute",
									right: 20,
									top: 20,
									cursor: "pointer",
									border: "2px solid rgba(255,255,255,.6)"
								}
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
