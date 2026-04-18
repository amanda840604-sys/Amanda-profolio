import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Briefcase, GraduationCap, LayoutGrid, Award, Mail, 
  ChevronRight, Phone, MessageCircle, X, Cpu, Calendar, Dumbbell, 
  Timer, Mountain, ExternalLink, FileCheck, MousePointer2, MapPin, CheckCircle 
} from 'lucide-react';

/* --- 互動組件 1：流體式滾動漸出 (Reveal) --- */
const Reveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: "translate-y-16",
    down: "-translate-y-16",
    left: "translate-x-16",
    right: "-translate-x-16",
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[1200ms] fluid-anim ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClasses[direction]}`
      } ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- 互動組件 2：精品級滑鼠光暈 (Spotlight Card) --- */
const SpotlightCard = ({ children, className = "", dark = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const glowColor = dark ? 'rgba(163, 138, 106, 0.2)' : 'rgba(163, 138, 106, 0.12)';

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden transition-all duration-500 border border-gray-100 bg-white ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-700 z-0" 
        style={{ 
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)` 
        }} 
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('全部包裝');
  const [activeCourseFilter, setActiveCourseFilter] = useState('全部');
  const [activeSection, setActiveSection] = useState('home');

  // --- 資料定義 ---
  const projectData = {
    Packaging: [
      { id: 1, title: 'TWS 紙卡內襯設計', desc: '為國際音響品牌開發的 TWS 耳機紙卡內襯方案，整合環保與結構強度。', img: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=800', tags: ['包裝設計', 'TWS', '紙卡'], category: '消費性電子產品' },
      { id: 2, title: 'TWS 包裝設計', desc: '全回收紙材結構，透過力學驗證確保運輸過程中的 100% 安全保護。', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800', tags: ['包裝設計', '消費電子'], category: '消費性電子產品' },
      { id: 3, title: 'HDT 紙卡內襯設計', desc: '針對重型電競耳機開發的高防護緩衝方案，有效達成包材減量。', img: 'https://images.unsplash.com/photo-1585218356057-dc0e8d355888?q=80&w=800', tags: ['包裝設計', '紙卡', '電競'], category: '消費性電子產品' },
      { id: 4, title: 'Soundbar 紙卡內襯設計', desc: '大型條狀喇叭包裝，專利輻射狀支撐結構。', img: 'https://images.unsplash.com/photo-1543632971-ceb99bc4f7c1?q=80&w=800', tags: ['包裝設計', '紙卡', 'Soundbar'], category: '消費性電子產品' },
      { id: 5, title: 'Soundbar 設計', desc: '長型結構件運輸優化，顯著降低破損率。', img: 'https://images.unsplash.com/photo-1608223652646-6dd410e53a39?q=80&w=800', tags: ['包裝設計', '永續', 'Soundbar'], category: '消費性電子產品' },
      { id: 6, title: '視訊鏡頭包裝設計', desc: 'Webcam 精緻禮盒包裝，結合高強度環保紙托。', img: 'https://images.unsplash.com/photo-1587826359546-d2424fa19532?q=80&w=800', tags: ['包裝設計', '紙托'], category: '消費性電子產品' },
      { id: 7, title: 'Carrycase 包袋設計', desc: '收納包袋結構設計，針對戶外需求優化。', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800', tags: ['包裝設計', '自行車'], category: '自行車零件' },
      { id: 8, title: 'MTB Handle Bar 包裝設計', desc: '高精密金屬把手包裝，全紙式模組化內襯。', img: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=800', tags: ['包裝設計', '自行車', 'Handle Bar'], category: '自行車零件' },
      { id: 9, title: 'TR Handle Bar 包裝設計', desc: '專業競賽級把手包裝，考量展示性與保護性。', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800', tags: ['包裝設計', '自行車'], category: '自行車零件' },
      { id: 10, title: 'RA Handle Bar 包裝設計', desc: '公路車把手包裝方案。', img: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=800', tags: ['包裝設計', '自行車'], category: '自行車零件' },
      { id: 11, title: '座管 包裝設計', desc: '圓柱狀金屬件全紙緩衝固定結構。', img: 'https://images.unsplash.com/photo-1576435728678-68ce0db81561?q=80&w=800', tags: ['包裝設計', '自行車', '減塑'], category: '自行車零件' },
      { id: 12, title: '立管 包裝設計', desc: '緊湊型自行車立管包裝與運輸模組。', img: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=800', tags: ['包裝設計', '自行車'], category: '自行車零件' },
      { id: 13, title: '快拆束仔 包裝設計', desc: '小型精密零件的高效率包裝排版設計。', img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800', tags: ['包裝設計', '自行車'], category: '自行車零件' }
    ],
    Product: [
      { id: 1, title: '油煙機設計', desc: '薄化歐化油煙機系列，結合極簡美學與高效率排菸功能。', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800', tags: ['產品設計', '廚房家電', 'SAKURA'], category: '廚電/家電' },
      { id: 2, title: '瓦斯爐設計', desc: '嵌入式高效瓦斯爐，針對亞洲烹飪習慣優化的爐架結構。', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800', tags: ['產品設計', '家電'], category: '廚電/家電' },
      { id: 3, title: '穿戴式裝置設計', desc: '全天候睡眠監測智慧手環，融合親膚材質與精密感應器。', img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=800', tags: ['穿戴裝置', '醫療'], category: '醫療/穿戴' },
      { id: 4, title: '醫療器材設計', desc: '居家低頻治療儀，透過介面引導使用者正確復健級別。', img: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=800', tags: ['醫療器材', '工業設計'], category: '醫療/穿戴' },
      { id: 5, title: '玩具設計', desc: '兒童空間感益智積木玩具，採用安全無毒環保木料。', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800', tags: ['玩具設計', 'CMF'], category: '玩具設計' },
      { id: 6, title: '手繪作品', desc: '產品構思草圖與人物速寫，紀錄設計初期的靈感瞬間。', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800', tags: ['手繪', '插畫'], category: '手繪作品' }
    ],
    Graphic: [
      { id: 1, title: '品牌視覺整合', desc: '為新創品牌建立完整的企業識別系統與平面應材規範。', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800', tags: ['品牌設計', '平面', 'CIS'], category: '品牌/CIS' }
    ]
  };

  const coursesData = [
    { id: 1, title: '包裝結構設計、運輸驗證\n成本優化實務課程', org: '財團法人塑膠工業技術發展中心 (PIDC)', date: '2026.03.26', hours: '48 小時', category: '包裝專業課程', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800' },
    { id: 2, title: '在職菁英 AI 人才培育課程', org: '114年度經濟部產業發展署補助課程', date: '2025.12.09 - 2025.12.17', hours: '30 小時', category: 'AI應用課程', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800' },
    { id: 3, title: 'iPAS AI 應用規劃師初級證照班課程', org: '中國生產力中心 China Productivity Center', date: '2026.04.26', hours: '48 小時', category: 'AI應用課程', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800' },
    { id: 4, title: 'AI 應用實務系列課程(NUVA)\nChatGPT & Make', org: 'NUVA', date: '2025.03 - 2025.04', hours: '16 小時', category: 'AI應用課程', img: 'https://images.unsplash.com/photo-1546410531-bea47d91e847?q=80&w=800' },
    { id: 5, title: 'iPAS AI應用規劃師初級能力培訓班', org: '經濟部商業發展署', date: '2026.03.22', hours: '15 小時', category: 'AI應用課程', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800' }
  ];

  // --- 計算屬性 ---
  const currentFilterOptions = activeCategory ? (
    activeCategory === 'Packaging' 
      ? ['全部包裝', '消費性電子產品', '自行車零件']
      : activeCategory === 'Product'
      ? ['全部產品', '廚電/家電', '醫療/穿戴', '玩具設計', '手繪作品']
      : activeCategory === 'Graphic'
      ? ['全部平面', '品牌/CIS']
      : []
  ) : [];

  const filteredProjects = activeCategory ? 
    (activeFilter.startsWith('全部') ? projectData[activeCategory] : projectData[activeCategory].filter(p => p.category === activeFilter)) : [];

  const filteredCourses = activeCourseFilter === '全部' 
    ? coursesData 
    : coursesData.filter(c => c.category === activeCourseFilter);

  const getFilterCount = (cat, f) => {
    if (!projectData[cat]) return 0;
    if (f.startsWith('全部')) return projectData[cat].length;
    return projectData[cat].filter(p => p.category === f).length;
  };

  const getCourseFilterCount = (filterVal) => {
    if (filterVal === '全部') return coursesData.length;
    return coursesData.filter(c => c.category === filterVal).length;
  };

  // --- 副作用處理 ---
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      setScrolled(winScroll > 50);
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(winScroll / height);

      const sections = ['about', 'portfolio', 'experience', 'skills', 'courses', 'interests', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; 
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCategory ? 'hidden' : 'unset';
  }, [activeCategory]);

  return (
    <div className="font-sans text-[#121212] bg-[#fdfdfd] antialiased selection:bg-[#a38a6a] selection:text-white pb-24">
      
      {/* 1. 全域閱讀進度條 */}
      <div className="fixed top-0 left-0 h-[3px] bg-[#a38a6a] z-[130] transition-transform duration-300 ease-out origin-left shadow-[0_0_12px_rgba(163,138,106,0.6)]" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* 2. 精品膠囊導覽列 */}
      <div className="fixed top-0 left-0 w-full z-[120] flex justify-center pt-8 px-6 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-[800ms] fluid-anim flex items-center justify-between px-8 py-3 rounded-full bg-white/80 backdrop-blur-3xl border border-white/40 shadow-lg ${scrolled ? 'w-full max-w-4xl' : 'w-full max-w-6xl'}`}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-110 group-hover:bg-[#a38a6a]">AL</div>
            <span className="font-black text-xl tracking-tighter hidden sm:block">Amanda Lai.</span>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            {['about', 'portfolio', 'experience', 'skills', 'courses'].map(item => (
              <a key={item} href={`#${item}`} className={`px-4 py-2 rounded-full transition-all duration-500 hover:text-[#121212] ${activeSection === item ? 'text-[#121212] bg-gray-50' : ''}`}>
                {item}
                {activeSection === item && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a38a6a]"></span>}
              </a>
            ))}
          </div>
          <a href="#contact" className="bg-[#121212] text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#a38a6a] transition-all flex items-center gap-2 active:scale-95 shadow-md">
            CONTACT <ArrowRight size={14} />
          </a>
        </nav>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-tr from-[#a38a6a]/10 via-white to-[#a38a6a]/5 blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
        <Reveal direction="down">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-gray-100 text-[#a38a6a] text-[10px] font-black tracking-[0.4em] uppercase mb-12 shadow-sm">
            BASED IN TAIWAN / PORTFOLIO 2026
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="text-8xl md:text-[12rem] tracking-tighter leading-[0.75] mb-12 flex flex-col items-center transition-transform duration-500 ease-out text-[#121212]" style={{ transform: `translate(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px)` }}>
            <span className="font-black uppercase">Sustainable</span>
            <span className="font-serif italic text-[#a38a6a] font-light -mt-4 md:-mt-10 ml-12 md:ml-32 opacity-90">Packaging.</span>
          </h1>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-lg md:text-2xl text-gray-500 max-w-[65ch] font-medium leading-[1.85] mb-16 mx-auto text-balance">
            包裝設計專業深化 × 結構工程實務 <br className="hidden sm:block" /> 致力於在視覺美學與永續環保之間尋求最完美的平衡。
          </p>
        </Reveal>
        <Reveal delay={600}>
          <button onClick={() => document.getElementById('portfolio').scrollIntoView({behavior: 'smooth'})} className="group flex flex-col items-center gap-4">
             <div className="w-[1px] h-24 bg-gradient-to-b from-[#a38a6a] to-transparent relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[slide_3s_infinite]"></div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-[#a38a6a] transition-colors">Scroll To Explore</span>
          </button>
        </Reveal>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="px-8 md:px-24 max-w-8xl mx-auto py-40 border-t border-gray-50 text-[#121212]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-[#121212]">
          <div className="lg:col-span-5">
            <Reveal direction="left">
               <h2 className="text-[11px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-8 flex items-center gap-6">
                 <div className="w-16 h-[2px] bg-[#a38a6a]"></div> Profile
               </h2>
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-[#121212] mb-12">工藝美學 × <br /> 邏輯工程</h3>
               <SpotlightCard dark className="bg-[#121212] p-10 text-white border-none rounded-[3rem]">
                  <div className="flex justify-between items-center text-white">
                    <div className="text-white">
                      <p className="text-6xl font-black mb-1 tracking-tighter text-white">06<span className="text-[#a38a6a] font-serif italic text-4xl text-white">y+</span></p>
                      <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Industry Experience</p>
                    </div>
                    <Award size={32} className="text-[#a38a6a]" />
                  </div>
               </SpotlightCard>
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end text-[#121212]">
            <Reveal delay={200} className="max-w-2xl space-y-12">
               <p className="text-3xl md:text-4xl font-black leading-[1.5] text-gray-900 tracking-tight">畢業於<strong className="relative inline-block text-[#121212]">國立臺灣科技大學<span className="absolute bottom-1 left-0 w-full h-3 bg-[#a38a6a]/10 -z-10"></span></strong> 工業設計系，擁有 6 年從外觀至量產的深厚實戰。</p>
               <p className="text-[17px] text-gray-500 leading-[1.85] max-w-[65ch] font-medium text-justify">我擅長將複雜的工程數據轉化為動人的設計語言，不僅關注產品在貨架上的吸引力，更深入鑽研其在物流環節的保護力。始終堅持「在成本限制中尋求極致」，為品牌創造持久的商業價值。</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#121212]">
                  <div className="space-y-4 text-[#121212]">
                     <div className="flex items-center gap-3 text-[#121212]"><LayoutGrid size={20} className="text-[#a38a6a]" /><h4 className="font-black text-xs uppercase tracking-widest text-[#121212]">Global Reach</h4></div>
                     <p className="text-sm text-gray-500 font-medium">累積 25 件國際品牌提案，接案率 40%。</p>
                  </div>
                  <div className="space-y-4 text-[#121212]">
                     <div className="flex items-center gap-3 text-[#121212]"><Cpu size={20} className="text-[#a38a6a]" /><h4 className="font-black text-xs uppercase tracking-widest text-[#121212]">Innovation</h4></div>
                     <p className="text-sm text-gray-500 font-medium text-[#121212]">建立 6 套模組化結構資料庫，提升研發效率。</p>
                  </div>
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO */}
      <section id="portfolio" className="px-8 md:px-24 py-40 bg-[#f9f9f9] text-[#121212]">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-200 pb-12">
            <div><h2 className="text-[11px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-6">Works</h2><h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212]">Selected Projects.</h3></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-8 md:mt-0 text-[#121212]">Design Mastery × Core Focus</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-[#121212]">
          {Object.entries({ Packaging: '包裝設計', Product: '產品設計', Graphic: '平面設計' }).map(([key, label], idx) => (
            <Reveal key={key} delay={idx * 200}>
               <SpotlightCard className="group/card flex flex-col h-full bg-white text-[#121212] rounded-[3rem]">
                  <div className="aspect-[4/5] overflow-hidden relative">
                     <img src={key === 'Packaging' ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" : key === 'Product' ? "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800" : "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800"} alt={key} className="w-full h-full object-cover grayscale opacity-90 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-1000" />
                  </div>
                  <div className="p-12 flex flex-col flex-grow text-[#121212]">
                     <h4 className="text-3xl font-black uppercase mb-2 tracking-tight">{key}</h4>
                     <p className="text-xs font-bold text-[#a38a6a] tracking-widest mb-8 uppercase">{label}</p>
                     <p className="text-[14px] text-gray-500 leading-[1.85] max-w-[60ch] mb-12 flex-grow font-medium">
                        {key === 'Packaging' ? '致力於高強度全紙結構與 ESG 永續材質，實現 0% 塑料緩衝。' : key === 'Product' ? '將工業美學轉化為具量產性的商業實績，兼顧外觀與組裝工藝。' : '品牌視覺與企業識別系統建構，透過專業排版與色彩策略優化溝通。'}
                     </p>
                     <button onClick={() => setActiveCategory(key)} className="group/btn flex items-center justify-between w-full pt-8 border-t border-gray-100 transition-all text-[#121212]">
                        <span className="text-[11px] font-black uppercase tracking-widest">View Projects</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                     </button>
                  </div>
               </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. EXPERIENCE (重新規劃為單一垂直演進流) */}
      <section id="experience" className="px-8 md:px-24 py-40 max-w-6xl mx-auto text-[#121212]">
        <Reveal>
          <div className="text-center mb-32">
             <h2 className="text-[11px] font-black tracking-[0.6em] text-[#a38a6a] uppercase mb-6">Chronicles</h2>
             <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Evolution Path.</h3>
          </div>
        </Reveal>
        
        <div className="relative space-y-12">
          {/* 中間導引線 */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#a38a6a]/40 via-gray-100 to-transparent -translate-x-1/2 hidden md:block"></div>

          {/* 專業經歷與基礎教育 (整合為單一連續主軸) */}
          {[
            { company: "久鼎金屬股份有限公司", title: "資深包裝結構工程師", date: "2024.01 - PRESENT", duration: "現職", location: "自行車零件製造業", responsibilities: ["自行車零件包裝結構革新", "成功開發多項「輻射狀全紙緩衝」專利結構"], achievements: ["全紙緩衝替代 EPE，低碳量產導向", "CMF 永續研究與專利佈局"], tools: ["專利結構", "包裝設計", "結構驗證"], type: "work", icon: Briefcase },
            { company: "美律實業股份有限公司", title: "包裝工程師", date: "2022.07 - 2025.05", duration: "2年11個月", location: "台中市南屯區・精密儀器製造業 500人+", responsibilities: ["消費性電子產品包裝開發工作", "新機型產品包材圖面繪製、包裝作業流程製作", "包裝廠商樣品追蹤、品質問題改善確認"], achievements: ["國際品牌 TWS / HDT / Soundbar 包裝設計提案（共 25 件）", "提出多元價位包裝設計方案，滿足品牌策略，接案達成率達 40%", "於 RFQ 階段設計包裝及成本分析，研發成本節省約 10%"], tools: ["Creo", "產品開發", "產品結構評估", "包裝設計"], type: "work", icon: Briefcase },
            { company: "台灣櫻花股份有限公司", title: "產品設計師", date: "2020.03 - 2022.07", duration: "2年5個月", location: "台中市大雅區・廚電製造業 500人+", responsibilities: ["針對 PM 市場規劃結合消費者調查擬定設計方向", "跨部門協作與國內外廚電市場及造型趨勢調研"], achievements: ["榮獲 2021 年度績優員工", "主導易清檯面爐 G2522AG、G2623AG 上市", "優化清潔設計與旋鈕造型"], tools: ["Creo", "Photoshop", "Illustrator", "KeyShot"], type: "work", icon: Briefcase },
            { company: "上岳科技股份有限公司", title: "產品設計師", date: "2018.11 - 2019.12", duration: "1年2個月", location: "台中市南屯區・醫療器材製造業 30-100人", responsibilities: ["新品提案與簡報製作", "依據 RD 模組進行產品設計提案 (含視覺、材質、風格)", "產品造型設計與機構討論"], achievements: ["低周波治療器 2 款外觀提案", "兒童用霧化器外觀提案", "SPO2 手環 5 款外觀提案"], tools: ["SolidWorks", "Illustrator", "Photoshop", "KeyShot", "機構設計"], type: "work", icon: Briefcase },
            { company: "研成股份有限公司", title: "產品設計師", date: "2017.08 - 2018.08", duration: "1年1個月", location: "新北市新店區・設計相關業 30-100人", responsibilities: ["新品提案與簡報製作", "依據 RD 提供模組進行產品造型設計提案"], achievements: ["獨立負責日本學研 GAKKEN 委託之鋁製品設計案", "研發多合一 solar 新產品 & 彩盒設計規劃", "協助 2018 年度 12in1 solar 產品色彩配置"], tools: ["Illustrator", "Photoshop", "KeyShot", "包裝設計", "提案簡報"], type: "work", icon: Briefcase },
            { company: "國立臺灣科技大學", title: "工業設計系 / 大學畢業", date: "2013 - 2017", duration: "基礎教育", location: "台北市", responsibilities: ["深耕結構工程與美學邏輯，奠定系統化產品開發思維。"], achievements: [], tools: ["工業設計", "產品開發", "系統化邏輯"], type: "edu", icon: GraduationCap },
            { company: "國立臺中高工", title: "圖文傳播科 / 高職畢業", date: "2010 - 2013", duration: "基礎教育", location: "台中市", responsibilities: ["啟蒙於平面美學與印刷技術，掌握刀模與色彩控制精髓。"], achievements: [], tools: ["平面設計", "印刷工程", "色彩學"], type: "edu", icon: LayoutGrid }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
            <Reveal key={idx} delay={idx * 150} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className={`flex flex-col md:flex-row items-center gap-12 w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 w-full">
                  <SpotlightCard className={`p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 fluid-anim ${item.type === 'edu' ? 'bg-gray-50/50' : 'bg-white'}`}>
                    <div className={`${item.type === 'work' ? 'border-b border-gray-100 pb-6 mb-6' : 'mb-4'}`}>
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black tracking-widest uppercase mb-3">
                            <span className="text-[#a38a6a]">{item.date}</span>
                            <span className="text-gray-200">|</span>
                            <span className="text-gray-400">{item.duration}</span>
                          </div>
                          <h4 className={`text-2xl lg:text-3xl font-black text-[#121212] mb-2 tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis ${item.type === 'edu' ? 'opacity-80' : ''}`}>{item.company}</h4>
                          <p className="text-sm font-bold text-[#a38a6a] tracking-widest leading-relaxed">{item.title}</p>
                        </div>
                        {/* CSS Mask implementation for Brand Color Logo */}
                        <div className="p-3 bg-white/50 rounded-2xl hidden sm:block shrink-0 shadow-sm relative overflow-hidden group-hover:scale-110 fluid-anim">
                          <div className="absolute inset-0 bg-[#a38a6a] opacity-10"></div>
                          <IconComponent size={24} className="text-[#a38a6a] css-mask-logo relative z-10" />
                        </div>
                      </div>
                      {item.type === 'work' && <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5 tracking-wider"><MapPin size={12} className="text-gray-300"/> {item.location}</p>}
                    </div>

                    <div className="space-y-6">
                      <div>
                        {item.type === 'work' && <h5 className="text-[9px] font-black text-[#a38a6a] uppercase tracking-[0.2em] mb-3">Core Responsibilities</h5>}
                        <ul className={`list-disc space-y-2 marker:text-gray-300 ${item.type === 'work' ? 'pl-4' : 'pl-0 list-none'}`}>
                          {item.responsibilities.map(res => (
                            <li key={res} className="text-[14px] text-gray-600 font-medium leading-[1.8] max-w-[55ch]">{res}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {item.achievements.length > 0 && (
                        <div>
                          <h5 className="text-[9px] font-black text-[#a38a6a] uppercase tracking-[0.2em] mb-4 mt-2">Key Achievements</h5>
                          <div className="flex flex-col gap-3">
                            {item.achievements.map(ach => (
                              <div key={ach} className="flex items-start gap-3">
                                <CheckCircle size={16} className="text-[#a38a6a] shrink-0 mt-[4px]" strokeWidth={2.5}/>
                                <span className="text-[14px] text-gray-700 font-medium leading-[1.8] max-w-[55ch]">{ach}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#a38a6a]/10">
                      {item.tools.map(tool => (
                        <span key={tool} className="text-[10px] font-black px-4 py-2 bg-gray-50 rounded-lg text-gray-500 hover:text-white hover:bg-[#a38a6a] hover:shadow-lg hover:shadow-[#a38a6a]/40 transition-all uppercase fluid-anim cursor-default">{tool}</span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#a38a6a] z-10 shadow-[0_0_20px_rgba(163,138,106,0.4)] fluid-anim hover:scale-150 cursor-pointer"></div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </section>

      {/* 7. SKILLS */}
      <section id="skills" className="px-8 md:px-24 py-40 max-w-8xl mx-auto border-t border-gray-100 text-[#121212]">
        <Reveal>
           <h2 className="text-[11px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-24 text-center">Mastery Skills & Tools</h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           {[
             { id: '01', title: '市場調研與定位分析', en: 'Market Research & Strategy', desc: '擅長設計前期的競品蒐集並針對該品牌定位分析，總結設計規畫方向。', tags: ['競品分析', '產品策略', '產品定位', '市場調查資料分析', '報告撰寫與提案', 'Market Research', 'Strategy'] },
             { id: '02', title: '2D 品牌視覺整合與簡報提案', en: 'Graphic Design & Branding', desc: '擅長整合包裝結構與品牌識別，製作具專業感與說服力的提案簡報。', tags: ['Adobe InDesign', 'Illustrator', 'Photoshop', '電腦排版設計', '設計印刷基本認知', '電腦印前設計', 'Graphic Design', 'Branding'] },
             { id: '03', title: '3D 建模與結構模擬', en: '3D Modeling & Engineering', desc: '能快速建構產品結構模型並進行裝配模擬，支援從設計構想至工程的溝通。', tags: ['Creo', 'SolidWorks', 'Rhino', 'Keyshot', '產品結構評估', '3D 渲染', '3D Modeling', 'Engineering'] },
             { id: '04', title: '包裝材料選用與 BOM 建立', en: 'Packaging & BOM', desc: '熟悉泡殼、瓦楞紙卡、紙托等常用包材特性，依需求提出優化方案。', tags: ['瓦楞紙結構', '包裝材料選用', '工程圖繪製', 'BOM 建立', 'Packaging', 'BOM'] },
             { id: '05', title: '打樣實作與設計驗證能力', en: 'Prototyping & Validation', desc: '善用割樣機進行結構模擬與快速打樣，快速驗證設計可行性。', tags: ['打樣機操作', '結構模擬', '快速打樣', '設計驗證', 'CMF 樣板製作', 'Prototyping', 'Validation'] }
           ].map((skill, idx) => (
             <Reveal key={idx} delay={idx * 150} className={idx === 4 ? "lg:col-span-2" : ""}>
                <SpotlightCard className="p-10 group rounded-[3rem] h-full flex flex-col">
                   <div className="flex justify-between items-start mb-8 text-[#121212]">
                      <div className="text-4xl font-serif italic text-gray-100 group-hover:text-[#a38a6a] transition-colors">{skill.id}</div>
                      <p className="text-[10px] font-black tracking-widest text-[#a38a6a] uppercase">{skill.en}</p>
                   </div>
                   <h4 className="text-2xl font-black mb-4 tracking-tight leading-snug">{skill.title}</h4>
                   <p className="text-[14px] text-gray-500 font-medium leading-[1.8] mb-10 flex-grow">{skill.desc}</p>
                   <div className="flex flex-wrap gap-2 text-[#121212]">
                     {skill.tags.map(t => (
                       <span key={t} className="text-[10.5px] font-black px-4 py-1.5 bg-gray-50 text-gray-500 rounded-lg hover:text-white hover:bg-[#a38a6a] hover:shadow-lg hover:shadow-[#a38a6a]/40 transition-all fluid-anim uppercase">{t}</span>
                     ))}
                   </div>
                </SpotlightCard>
             </Reveal>
           ))}
        </div>
        
        <Reveal delay={300}>
           <div className="bg-[#121212] rounded-[3rem] p-12 text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-10">
                   <h4 className="font-serif italic text-4xl text-[#a38a6a]">Software Tools</h4>
                   <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">Design & Engineering Mastery</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                   {['SolidWorks', 'Creo', 'KeyShot', 'Illustrator', 'Photoshop', 'InDesign', 'AutoCAD'].map(tool => (
                     <div key={tool} className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-[1.5rem] hover:bg-[#a38a6a]/20 hover:-translate-y-2 transition-all cursor-pointer border border-transparent hover:border-[#a38a6a]/30 group">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#121212] font-black text-xs transition-transform group-hover:scale-110">
                           {tool.substring(0,2).toUpperCase()}
                        </div>
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/60 group-hover:text-[#a38a6a]">{tool}</span>
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </Reveal>
      </section>

      {/* 8. COURSES (非對稱佈局設計) */}
      <section id="courses" className="px-8 md:px-24 py-40 bg-[#fdfdfd] text-[#121212]">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div>
              <h2 className="text-[11px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-6 text-[#a38a6a]">Learning Path</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212]">Growth.</h3>
            </div>
            <div className="flex gap-2 mt-10 md:mt-0 overflow-x-auto pb-4 scrollbar-hide text-[#121212]">
              {['全部', 'AI應用課程', '包裝專業課程'].map(f => (
                <button key={f} onClick={() => setActiveCourseFilter(f)} className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm ${activeCourseFilter === f ? 'bg-[#a38a6a] text-white' : 'bg-white text-gray-400 hover:text-[#121212] border border-gray-100'}`}>
                  {f} <span className="ml-2 opacity-50">({getCourseFilterCount(f)})</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 text-[#121212]">
           {filteredCourses.map((course, idx) => (
             <Reveal key={course.id} delay={idx * 150}>
                <div className="group/course flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#a38a6a]/5 transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1)">
                   <div className="flex-grow p-10 md:p-14 lg:w-3/5 flex flex-col justify-between transition-all duration-700 group-hover/course:lg:w-2/5 text-[#121212]">
                      <div>
                        <div className="flex items-center gap-6 mb-8">
                          <span className="text-[10px] font-black text-[#a38a6a] px-4 py-1.5 bg-[#a38a6a]/10 rounded-full uppercase tracking-widest">{course.category}</span>
                          <span className="text-[10px] font-bold text-gray-300 flex items-center gap-2 uppercase tracking-widest"><Calendar size={14}/> {course.date}</span>
                        </div>
                        <h4 className="text-2xl md:text-4xl font-black mb-10 group-hover/course:text-[#a38a6a] transition-colors leading-tight whitespace-pre-line text-[#121212]">{course.title}</h4>
                      </div>
                      <div className="space-y-6 text-[#121212]">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#a38a6a]"><Award size={20} /></div>
                           <div className="text-[#121212]">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Issuing Organization</p>
                              <p className="text-sm font-bold text-[#121212]">{course.org}</p>
                           </div>
                        </div>
                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-[#121212]">
                           <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Duration : {course.hours}</span>
                        </div>
                      </div>
                   </div>
                   <div className="relative lg:w-2/5 h-[300px] lg:h-auto overflow-hidden bg-gray-900 transition-all duration-[1000ms] group-hover/course:lg:w-3/5 pointer-events-none">
                      <img src={course.img} alt="Certificate" className="w-full h-full object-cover grayscale opacity-50 group-hover/course:grayscale-0 group-hover/course:opacity-100 group-hover/course:scale-105 transition-all duration-[1200ms]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/course:opacity-100 transition-opacity duration-700">
                         <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center gap-3">
                           <FileCheck size={16} /> Verified Expertise
                         </div>
                      </div>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* 9. INTERESTS */}
      <section id="interests" className="px-8 md:px-24 py-40 bg-[#f9f9f9] text-[#121212]">
        <Reveal><h2 className="text-[11px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-24 text-center">Lifestyle Beyond Work</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: '重量訓練', en: 'Fitness', icon: Dumbbell, goal: '目前每週2練，目標4練', desc: '訓練耐力與自律，堅持每一步小幅進步。', img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" },
             { title: '馬拉松', en: 'Marathon', icon: Timer, goal: '5次半馬，目標全馬', desc: '不只是體能，更是對堅持信念的終極挑戰。', img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800" },
             { title: '登山挑戰', en: 'Hiking', icon: Mountain, goal: '登頂2座百岳，持續挑戰', desc: '在山林間對話，尋找自我探索與放鬆的途徑。', img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800" }
           ].map((item, idx) => (
             <Reveal key={idx} delay={idx * 150}>
                <SpotlightCard className="h-full flex flex-col hover:shadow-2xl transition-all duration-700 text-[#121212] rounded-[3rem]">
                   <div className="h-64 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 relative text-[#121212]">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 text-[#121212]"></div>
                   </div>
                   <div className="p-10 flex flex-col flex-grow relative bg-white -mt-12 mx-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-6 text-[#121212]">
                      <div className="flex items-center gap-5 mb-8 text-[#121212]">
                         <div className="w-14 h-14 rounded-2xl bg-[#a38a6a]/10 flex items-center justify-center text-[#a38a6a] shadow-inner text-[#121212]"><item.icon size={28} strokeWidth={2.5} /></div>
                         <div><h4 className="text-xl font-black tracking-tight text-[#121212]">{item.title}</h4><p className="text-[10px] font-black uppercase tracking-widest text-gray-300">{item.en}</p></div>
                      </div>
                      <p className="text-sm font-bold text-[#a38a6a] mb-4 leading-relaxed">{item.goal}</p>
                      <p className="text-[13px] text-gray-400 font-medium leading-relaxed text-[#121212]">{item.desc}</p>
                   </div>
                </SpotlightCard>
             </Reveal>
           ))}
        </div>
      </section>

      {/* 10. CLOSING & FOOTER */}
      <footer id="contact" className="bg-[#121212] pt-40 pb-20 text-white px-8 md:px-24">
        <Reveal>
          <div className="max-w-4xl mx-auto mb-32 text-center px-4 text-white">
            <p className="text-[#a38a6a] font-black text-[10px] tracking-[0.5em] uppercase mb-12 text-white">Closing Statement</p>
            <div className="space-y-8 text-white">
              <p className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">非常感謝您的閱讀。</p>
              <p className="text-xl md:text-2xl font-medium text-gray-400 leading-relaxed max-w-2xl mx-auto text-white text-white">如有進一步了解的需要，歡迎隨時與我聯繫。</p>
              <p className="text-xl md:text-2xl text-[#a38a6a] font-serif italic leading-relaxed pt-4">若有幸符合貴公司徵才條件，我將十分期待有機會參與正式面試，<br className="hidden md:block" />為團隊帶來我的熱情與專業。</p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="down">
          <div className="text-center mb-40 border-t border-white/5 pt-32 text-white text-white text-white">
             <h2 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-20 leading-[0.8] text-white text-white text-white text-white">Let's Build <br /><span className="font-serif italic text-[#a38a6a]">Something.</span></h2>
             <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-white text-white text-white">
                <a href="mailto:amanda840604@gmail.com" className="group bg-white text-[#121212] px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-[#a38a6a] hover:text-white transition-all flex items-center gap-5 shadow-2xl active:scale-95"><Mail size={22} /> AMANDA840604@GMAIL.COM</a>
                <div className="flex gap-6 text-white text-white">
                   <a href="tel:0918190990" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-[#a38a6a] hover:border-[#a38a6a] transition-all group active:scale-90 text-white text-white"><Phone size={28} /></a>
                   <a href="https://line.me/ti/p/" target="_blank" rel="noopener noreferrer" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-[#06C755] hover:border-[#06C755] transition-all group active:scale-90 text-white text-white"><MessageCircle size={28} /></a>
                </div>
             </div>
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-between items-center py-16 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-gray-600 text-white text-white text-white">
          <p className="text-white opacity-50 text-white">© 2026 AMANDA LAI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-16 mt-12 md:mt-0 text-white text-white">
             <a href="#" className="hover:text-[#a38a6a] transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-[#a38a6a] transition-colors">Behance</a>
             <a href="#" className="hover:text-[#a38a6a] transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {activeCategory && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto animate-in fade-in duration-500 text-[#121212] text-[#121212]">
          <div className="sticky top-0 z-[210] bg-white/90 backdrop-blur-xl border-b border-gray-100 px-8 md:px-24 py-10 flex justify-between items-center text-[#121212] text-[#121212] text-[#121212]">
            <div className="flex items-center gap-10 text-[#121212] text-[#121212] text-[#121212]"><h2 className="text-5xl font-black uppercase tracking-tighter text-[#121212] text-[#121212]">{activeCategory}</h2><div className="h-12 w-[1px] bg-gray-100 hidden sm:block"></div><p className="text-[11px] font-black tracking-widest text-[#a38a6a] uppercase hidden sm:block text-[#121212]">Gallery Collection</p></div>
            <button onClick={() => setActiveCategory(null)} className="group flex items-center gap-6 bg-[#121212] text-white px-10 py-4 rounded-full hover:bg-[#a38a6a] transition-all active:scale-90 shadow-xl text-white text-white"><span className="text-[11px] font-black uppercase tracking-widest text-white text-white text-white">Close Gallery</span><X size={20} className="text-white text-white" /></button>
          </div>
          <div className="px-8 md:px-24 py-24 max-w-8xl mx-auto w-full text-[#121212] text-[#121212]">
            {currentFilterOptions.length > 0 && (
              <div className="flex gap-4 mb-24 overflow-x-auto pb-6 scrollbar-hide text-[#121212] text-[#121212]">
                {currentFilterOptions.map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)} className={`whitespace-nowrap px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeFilter === f ? 'bg-[#121212] text-white shadow-2xl shadow-black/30' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                    {f} <span className="ml-4 opacity-40">({getFilterCount(activeCategory, f)})</span>
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-[#121212] text-[#121212]">
              {filteredProjects.map((proj, i) => (
                 <div key={proj.id} className="group/item flex flex-col cursor-pointer text-[#121212] text-[#121212]">
                   <div className="aspect-[16/10] overflow-hidden rounded-[3rem] bg-gray-50 mb-12 relative shadow-sm hover:shadow-2xl transition-all duration-700 text-[#121212]">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-cover grayscale opacity-90 group-hover/item:grayscale-0 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-1000 text-[#121212]" />
                      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center font-serif italic text-2xl shadow-sm text-[#121212] text-[#121212]">0{i+1}</div>
                   </div>
                   <div className="px-6 text-[#121212] text-[#121212]">
                      <div className="flex justify-between items-center mb-8 text-[#121212] text-[#121212]">
                         <h4 className="text-3xl font-black text-[#121212] tracking-tight text-[#121212]">{proj.title}</h4>
                         <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-200 group-hover/item:text-[#a38a6a] group-hover/item:border-[#a38a6a] transition-all text-[#121212] text-[#121212]"><ExternalLink size={24} /></div>
                      </div>
                      <p className="text-xl text-gray-500 leading-relaxed mb-12 font-medium text-[#121212]">{proj.desc}</p>
                      <div className="flex flex-wrap gap-3 text-[#121212]">{proj.tags.map(tag => (<span key={tag} className="text-[10px] font-black uppercase px-5 py-2.5 bg-gray-50 rounded text-gray-400 tracking-widest text-[#121212]">{tag}</span>))}</div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations & Fluid Dynamics */}
      <style>{`
        @keyframes slide { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .cubic-bezier { transition-timing-function: cubic-bezier(0.25, 1, 0.05, 1); }
        .fluid-anim { transition-timing-function: cubic-bezier(0.25, 1, 0.05, 1); }
        .css-mask-logo {
          /* Enforce brand color globally using mask technique */
          mask-image: linear-gradient(to bottom, currentColor, currentColor);
          -webkit-mask-image: linear-gradient(to bottom, currentColor, currentColor);
        }
      `}</style>
    </div>
  );
}
