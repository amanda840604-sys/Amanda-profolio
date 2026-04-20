import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Briefcase, GraduationCap, LayoutGrid, Award, Mail, 
  ChevronRight, Phone, MessageCircle, X, Cpu, Calendar, Dumbbell, 
  Timer, Mountain, ExternalLink, FileCheck, MousePointer2, MapPin, CheckCircle, Box, Layers
} from 'lucide-react';

/* --- 互動組件 1：流體式滾動漸出 (Reveal) --- */
const Reveal = ({ children, delay = 0, className = "", direction = "up" }: any) => {
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

/* --- 互動組件 3：課程專用輪播卡片 (Course Card) --- */
const CourseCard = ({ course, delay, ...props }: any) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!course.imgs || course.imgs.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % course.imgs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [course.imgs]);

  return (
    <Reveal delay={delay} {...props}>
       <div className="group/course flex flex-col hover:shadow-2xl transition-all duration-700 rounded-[3rem] bg-white border-0 overflow-hidden h-full">
          {/* Image Area */}
          <div className="h-[24rem] overflow-hidden relative bg-white grayscale group-hover/course:grayscale-0 transition-all duration-1000">
             {course.imgs ? (
                <div className="w-full h-full relative">
                   {course.imgs.map((img: string, i: number) => {
                      let fitClass = 'object-cover';
                      let zoomClass = 'group-hover/course:scale-105';
                      
                      // For certificates: start with contain, zoom to fill
                      if ((course.id === 1 && i === 0) || (course.id === 2) || (course.id === 4 && (i === 0 || i === 1))) {
                         fitClass = 'object-contain';
                         zoomClass = 'group-hover/course:scale-125'; // Higher scale to reach edges
                      }

                      return (
                        <img 
                          key={i} 
                          src={img} 
                          alt={`Certificate ${i}`} 
                          className={`absolute inset-0 w-full h-full ${fitClass} ${zoomClass} transition-all duration-[1500ms] ease-out ${i === imgIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                        />
                      );
                   })}
                </div>
             ) : (
                <img 
                   src={course.img} 
                   alt="Certificate" 
                   className={`w-full h-full ${course.id === 2 ? 'object-contain group-hover/course:scale-125' : 'object-cover group-hover/course:scale-110'} transition-all duration-[1500ms] ease-out`} 
                />
             )}
             
             {/* Gradient Mask (Interests Style) */}
             <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/40 to-transparent group-hover:opacity-20 transition-opacity duration-1000 z-30"></div>
             
             {course.status && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-40">
                  <div className="px-6 py-3 bg-[#121212]/90 backdrop-blur-md rounded-2xl text-white text-xs font-black tracking-widest text-center uppercase border border-white/10 shadow-2xl">
                    {course.status}
                  </div>
                </div>
             )}
          </div>

          {/* Overlapping Content Area (Interests Style) */}
          <div className="p-10 flex flex-col flex-grow relative bg-white -mt-12 mx-6 rounded-[2.5rem] shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-6 text-[#121212] group-hover:-translate-y-4 transition-transform duration-700 ease-out z-50">
             <div className="flex items-center gap-4 mb-6">
               <span className="text-[12px] font-black text-[#a38a6a] px-4 py-1.5 bg-[#a38a6a]/10 rounded-full uppercase tracking-widest">{course.category}</span>
               <span className="text-[12px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest"><Calendar size={12}/> {course.date}</span>
             </div>
             
             <h4 className="text-2xl font-black mb-8 group-hover/course:text-[#a38a6a] transition-colors leading-tight min-h-[3rem]">{course.title}</h4>
             
             <div className="mt-auto pt-6 border-t border-gray-50 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#a38a6a]"><Award size={20} /></div>
                   <div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Organization</p>
                      <p className="text-[13px] font-bold text-[#121212]">{course.org}</p>
                   </div>
                </div>
                <div className="pt-2 flex items-center justify-between">
                   <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Total : {course.hours}</span>
                </div>
             </div>
          </div>
       </div>
    </Reveal>
  );
}

/* --- 互動組件 2：精品級滑鼠光暈 (Spotlight Card) --- */
const SpotlightCard = ({ children, className = "", dark = false }: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) => {
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
  const [selectedProject, setSelectedProject] = useState(null);

  // --- 資料定義 ---
  const projectData = {
    Packaging: [
      { id: 1, title: 'TWS 紙卡內襯設計', desc: '為國際音響品牌開發的 TWS 耳機紙卡內襯方案，整合環保與結構強度。', img: '/tws_innercard01.png', detailsImages: ['/tws_innercard01.png', '/tws_innercard02.png', '/tws_innercard03.png', '/tws_innercard04.png', '/tws_innercard05.png', '/tws_innercard06.png', '/tws_innercard07.png', '/tws_innercard08.png', '/tws_innercard9.png', '/tws_innercard10.png', '/tws_innercard11.png', '/tws_innercard12.png'], tags: ['包裝設計', 'TWS', '紙卡'], category: '消費性電子產品' },
      { id: 2, title: 'TWS 包裝設計', desc: '全回收紙材結構，透過力學驗證確保運輸過程中的 100% 安全保護。', img: '/tws_pkg_design01-1.jpg', detailsImages: ['/tws_pkg_design01.jpg', '/tws_pkg_design02.jpg'], tags: ['包裝設計', '消費電子'], category: '消費性電子產品' },
      { id: 3, title: 'HDT 紙卡內襯設計', desc: '針對重型電競耳機開發的高防護緩衝方案，有效達成包材減量。', img: '/hdt_inner_card01.jpg', detailsImages: ['/hdt_inner_card01.jpg', '/hdt_inner_card02.jpg', '/hdt_inner_card03.jpg', '/hdt_inner_card04.jpg', '/hdt_inner_card05.jpg', '/hdt_inner_card06.jpg', '/hdt_inner_card07.jpg', '/hdt_inner_card08.jpg', '/hdt_inner_card09.jpg', '/hdt_inner_card10.jpg', '/hdt_inner_card11.jpg', '/hdt_inner_card12.jpg', '/hdt_inner_card13.jpg', '/hdt_inner_card14.jpg'], tags: ['包裝設計', '紙卡', '電競'], category: '消費性電子產品' },
      { id: 4, title: 'Soundbar 紙卡內襯設計', desc: '大型條狀喇叭包裝，專利輻射狀支撐結構。', img: '/soundbar_inner_card01.png', detailsImages: ['/soundbar_inner_card01.png', '/soundbar_inner_card02.png', '/soundbar_inner_card03.png', '/soundbar_inner_card04.jpg', '/soundbar_inner_card05.jpg', '/soundbar_inner_card06.jpg', '/soundbar_inner_card07.jpg', '/soundbar_inner_card08.jpg'], tags: ['包裝設計', '紙卡', 'Soundbar'], category: '消費性電子產品' },
      { id: 5, title: 'Soundbar 設計', desc: '長型結構件運輸優化，顯著降低破損率。', img: '/soundbar01.jpg', detailsImages: ['/soundbar01.jpg'], tags: ['包裝設計', '永續', 'Soundbar'], category: '消費性電子產品' },
      { id: 6, title: '視訊鏡頭包裝設計', desc: 'Webcam 精緻禮盒包裝，結合高強度環保紙托與保護套。', img: '/camera_pkg_001.jpg', detailsImages: ['/camera_pkg_001.jpg', '/camera_pkg_002.jpg'], tags: ['包裝設計', '紙托', '結構設計'], category: '消費性電子產品' },
      { id: 8, title: 'MTB Handle Bar 包裝設計', desc: '高精密金屬把手包裝，全紙式模組化內襯。', img: '/mtb_handle_bar01.jpg', detailsImages: ['/mtb_handle_bar01.jpg', '/mtb_handle_bar02.jpg', '/mtb_handle_bar03.jpg', '/mtb_handle_bar04.png', '/mtb_handle_bar05.png', '/mtb_handle_bar06.png'], tags: ['包裝設計', '自行車', 'Handle Bar'], category: '自行車零件' },
      { id: 9, title: 'TR Handle Bar 包裝設計', desc: '專業競賽級把手包裝，考量展示性與保護性。', img: '/tr_handle_bar01.jpg', detailsImages: ['/tr_handle_bar01.jpg', '/tr_handle_bar02.jpg', '/tr_handle_bar03.jpg', '/tr_handle_bar04.jpg', '/tr_handle_bar05.jpg', '/tr_handle_bar06.png', '/tr_handle_bar07.png', '/tr_handle_bar08.png'], tags: ['包裝設計', '自行車'], category: '自行車零件' },
      { id: 10, title: 'RA Handle Bar 包裝設計', desc: '公路車把手包裝方案。', img: '/RA_handle_bar01.png', detailsImages: ['/RA_handle_bar01.png', '/RA_handle_bar02.png', '/RA_handle_bar03.png', '/RA_handle_bar04.png', '/RA_handle_bar05.png', '/RA_handle_bar06.png', '/RA_handle_bar07.png'], tags: ['包裝設計', '自行車'], category: '自行車零件' },
      { id: 11, title: 'Carrycase 包裝設計', desc: '隨身攜帶盒包裝設計', img: '/carrcase01.jpg', detailsImages: ['/carrcase01.jpg'], tags: ['包裝設計', '攜帶盒', '減塑'], category: '自行車零件' },
      { id: 12, title: '立管包裝設計', desc: '自行車龍頭立管包裝，多角度固定結構防止碰撞。', img: '/Stem01.jpg', detailsImages: ['/Stem01.jpg', '/Stem02.jpg', '/Stem03.jpg', '/Stem04.jpg', '/Stem05.jpg', '/Stem06.jpg'], tags: ['包裝設計', '自行車', 'Stem'], category: '自行車零件' },
      { id: 13, title: '快拆束仔包裝設計', desc: '輪組快拆專用包裝，極簡紙靠緩衝固定。', img: '/Quick Release01.jpg', detailsImages: ['/Quick Release01.jpg', '/Quick Release02.jpg', '/Quick Release03.jpg', '/Quick Release04.jpg'], tags: ['包裝設計', '自行車', 'Quick Release'], category: '自行車零件' },
      { id: 14, title: '座管包裝設計', desc: '長型座管包裝設計，多點支撐防止刮傷。', img: '/Seatpost01.jpg', detailsImages: ['/Seatpost01.jpg', '/Seatpost02.jpg', '/Seatpost03.jpg', '/Seatpost04.jpg', '/Seatpost05.jpg', '/Seatpost06.jpg', '/Seatpost07.jpg', '/Seatpost08.jpg', '/Seatpost09.jpg'], tags: ['包裝設計', '自行車', 'Seatpost'], category: '自行車零件' }
    ],
    Product: [
      { id: 1, title: '油煙機設計', desc: '薄化歐化油煙機系列，結合極簡美學與高效率排菸功能。', img: '/rangehood01.jpg', detailsImages: ['/rangehood01.jpg', '/rangehood02.jpg', '/rangehood03.jpg'], tags: ['產品設計', '廚房家電', 'SAKURA'], category: '廚電/家電' },
      { id: 2, title: '瓦斯爐設計', desc: '嵌入式高效瓦斯爐，針對亞洲烹飪習慣優化的爐架結構。', img: '/g252201.jpg', detailsImages: ['/g252201.jpg'], tags: ['產品設計', '家電'], category: '廚電/家電' },
      { id: 3, title: '穿戴式裝置設計', desc: '全天候睡眠監測智慧手環，融合親膚材質與精密感應器。', img: '/sleep_monitor_device01-1.jpg', detailsImages: ['/sleep_monitor_device01.jpg', '/sleep_monitor_device02.jpg', '/sleep_monitor_device03.jpg', '/sleep_monitor_device04.jpg'], tags: ['穿戴裝置', '醫療'], category: '醫療/穿戴' },
      { id: 4, title: '醫療器材設計', desc: '居家低頻治療儀，透過介面引導使用者正確復健級別。', img: '/emg01.jpg', detailsImages: ['/emg01.jpg', '/emg02.jpg'], tags: ['醫療器材', '工業設計'], category: '醫療/穿戴' },
      { id: 5, title: '玩具設計', desc: '兒童空間感益智積木玩具，採用安全無毒環保木料。', img: '/cic_toy.jpg', detailsImages: ['/cic_toy.jpg'], tags: ['玩具設計', 'CMF'], category: '玩具設計' },
      { id: 6, title: '手繪作品', desc: '產品構思草圖與人物速寫，紀錄設計初期的靈感瞬間。', img: '/draw.jpg', detailsImages: ['/draw.jpg'], tags: ['手繪', '插畫'], category: '手繪作品' }
    ],
    Graphic: [
      { id: 1, title: '品牌視覺整合', desc: '為新創品牌建立完整的企業識別系統與平面應材規範。', img: '/graphic_design02-1.jpg', detailsImages: ['/graphic_design01.jpg', '/graphic_design02.jpg', '/post_design.jpg'], tags: ['品牌設計', '平面', 'CIS'], category: '品牌/CIS' }
    ]
  };

  const coursesData = [
    { id: 1, title: '包裝結構設計、運輸驗證\n成本優化實務課程', org: '財團法人塑膠工業技術發展中心 (PIDC)', date: '2026.03.26', hours: '48 小時', category: '包裝專業課程', img: '/course_pkg01.png', imgs: ['/course_pkg01.png', '/course_pkg02.jpg'] },
    { id: 2, title: '在職菁英 AI 人才培育課程', org: '114年度經濟部產業發展署補助課程', date: '2025.12.09 - 2025.12.17', hours: '30 小時', category: 'AI應用課程', img: '/course_ai_20251209-1217.png' },
    { id: 3, title: 'iPAS AI 應用規劃師初級證照班課程', org: '中國生產力中心 China Productivity Center', date: '2026.04.26', hours: '48 小時', category: 'AI應用課程', img: '/course_ai_ccchen.jpg', status: '正在培訓中，證書尚未取得' },
    { id: 4, title: 'AI 應用實務系列課程\nChatGPT & Make', org: 'NUVA', date: '2025.03 - 2025.04', hours: '16 小時', category: 'AI應用課程', img: '/chat gpt lv1.jpg', imgs: ['/chat gpt lv1.jpg', '/make lv1.jpg', '/nuva.jpg'] },
    { id: 5, title: 'iPAS AI應用規劃師初級能力培訓班', org: '經濟部商業發展署', date: '2026.03.22', hours: '15 小時', category: 'AI應用課程', img: '/course_ai_20260308-0322.jpg' }
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
    document.body.style.overflow = (activeCategory || selectedProject) ? 'hidden' : 'unset';
  }, [activeCategory, selectedProject]);

  return (
    <div className="font-sans text-[#121212] bg-[#fdfdfd] antialiased selection:bg-[#a38a6a] selection:text-white pb-24">
      
      {/* 1. 全域閱讀進度條 */}
      <div className="fixed top-0 left-0 h-[3px] bg-[#a38a6a] z-[130] transition-transform duration-300 ease-out origin-left shadow-[0_0_12px_rgba(163,138,106,0.6)]" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* 2. 精品膠囊導覽列 */}
      <div className="fixed top-0 left-0 w-full z-[120] flex justify-center pt-8 px-6 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-[800ms] fluid-anim flex items-center justify-between px-8 py-3 rounded-full bg-white/80 backdrop-blur-3xl border border-white/40 shadow-lg ${scrolled ? 'w-full max-w-[60rem]' : 'w-full max-w-[85rem]'}`}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden bg-white shrink-0">
               <img src="/logo.png" alt="AL Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-xl tracking-wide uppercase hidden sm:block whitespace-nowrap">AMANDA LAI<span className="text-[#a38a6a]">.</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-[14px] font-black uppercase tracking-widest text-gray-400">
            {['about', 'portfolio', 'experience', 'skills', 'courses'].map(item => (
              <a key={item} href={`#${item}`} className={`px-4 py-2 rounded-full transition-all duration-500 hover:text-[#121212] ${activeSection === item ? 'text-[#121212] bg-gray-50' : ''}`}>
                {item}
                {activeSection === item && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a38a6a]"></span>}
              </a>
            ))}
          </div>
          <a href="mailto:amanda840604@gmail.com" className="bg-[#121212] flex-shrink-0 text-white text-[14px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#a38a6a] transition-all flex items-center gap-2 active:scale-95 shadow-md whitespace-nowrap">
            CONTACT <ArrowRight size={14} />
          </a>
        </nav>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-tr from-[#a38a6a]/10 via-white to-[#a38a6a]/5 blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
        <Reveal direction="down">
          <div className="inline-flex items-center mt-20 md:mt-32 gap-3 px-6 py-2 rounded-full bg-white border border-gray-100 text-[#a38a6a] text-[14px] font-black tracking-widest uppercase mb-12 shadow-sm">
            PORTFOLIO 2026
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
             <span className="text-[14px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-[#a38a6a] transition-colors">Scroll To Explore</span>
          </button>
        </Reveal>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="px-8 md:px-24 py-40 border-t border-gray-50 text-[#121212]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 text-[#121212]">
          <div className="lg:col-span-5">
            <Reveal direction="left">
               <h2 className="text-[14px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-8 flex items-center gap-6">
                 <div className="w-16 h-[2px] bg-[#a38a6a]"></div> Profile
               </h2>
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-[#121212] mb-12">工藝美學 × <br /> 邏輯工程</h3>
               
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center text-[#121212]">
            <Reveal delay={200} className="max-w-2xl space-y-12">
               <p className="text-3xl md:text-4xl font-black leading-[1.5] text-gray-900 tracking-tight">畢業於<strong className="relative inline-block text-[#121212]">國立臺灣科技大學<span className="absolute bottom-1 left-0 w-full h-3 bg-[#a38a6a]/10 -z-10"></span></strong> 工業設計系，擁有 6 年從外觀至量產的深厚實戰。</p>
               <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                   <div className="w-40 h-40 md:w-64 md:h-64 shrink-0 rounded-[2.5rem] md:rounded-[4rem] group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border-[6px] border-white cursor-pointer relative hover:-translate-y-2">
                      <img src="/Profolio_photo.jpg" alt="Amanda Lai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <p className="text-[17px] text-gray-500 leading-[1.85] max-w-[65ch] font-medium text-justify">我擅長將複雜的工程數據轉化為動人的設計語言，不僅關注產品在貨架上的吸引力，更深入鑽研其在物流環節的保護力。始終堅持「在成本限制中尋求極致」，為品牌創造持久的商業價值。</p>
               </div>
               
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO */}
      <section id="portfolio" className="px-8 md:px-24 py-40 bg-[#f9f9f9] text-[#121212]">
        <div className="max-w-7xl mx-auto w-full">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-200 pb-12">
            <div><h2 className="text-[14px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-6">Works</h2><h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212]">Projects.</h3></div>
            <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest mt-8 md:mt-0 text-[#121212]">Design Mastery × Core Focus</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-[#121212]">
          {Object.entries({ Packaging: '包裝設計', Product: '產品設計', Graphic: '平面設計' }).map(([key, label], idx) => (
            <Reveal key={key} delay={idx * 200}>
               <SpotlightCard className="group/card flex flex-col h-full bg-white text-[#121212] rounded-[4rem] shadow-2xl hover:-translate-y-4 transition-all duration-700">
                  <div className="aspect-square overflow-hidden relative bg-white border-b border-gray-50">
                     <img src={key === 'Packaging' ? "/tws_pkg_design01-1.jpg" : key === 'Product' ? "/sleep_monitor_device01-1.jpg" : "/graphic_design02-1.jpg"} alt={key} className="w-full h-full object-contain grayscale opacity-90 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000" />
                  </div>
                  <div className="p-20 flex flex-col items-center text-center flex-grow text-[#121212]">
                     <h4 className="text-5xl font-black uppercase mb-4 tracking-tight">{key}</h4>
                     <p className="text-[18px] font-bold text-[#a38a6a] tracking-widest mb-12 uppercase">{label}</p>
                     <p className="text-[18px] text-gray-500 leading-[1.8] max-w-[60ch] mb-16 flex-grow font-medium">
                        {key === 'Packaging' ? '致力於高強度全紙結構與 ESG 永續材質，實現 0% 塑料緩衝。' : key === 'Product' ? '將工業美學轉化為具量產性的商業實績，兼顧外觀與組裝工藝。' : '品牌視覺與企業識別系統建構，透過專業排版與色彩策略優化溝通。'}
                     </p>
                     <button onClick={() => setActiveCategory(key)} className="group/btn flex items-center justify-center gap-4 w-full pt-12 border-t border-gray-100 transition-all text-[#121212]">
                        <span className="text-[18px] font-black uppercase tracking-widest">Explore Collection</span>
                        <ArrowRight size={24} className="group-hover/btn:translate-x-3 transition-transform" />
                     </button>
                  </div>
               </SpotlightCard>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* 6. EXPERIENCE (重新規劃為單一垂直演進流) */}
      <section id="experience" className="px-8 md:px-24 py-40 bg-[#f9f9f9] text-[#121212]">
        <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-32">
             <h2 className="text-[14px] font-black tracking-[0.6em] text-[#a38a6a] uppercase mb-6">Chronicles</h2>
             <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Evolution Path.</h3>
          </div>
        </Reveal>
        
        <div className="relative space-y-12">
          {/* 中間導引線 */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#a38a6a]/40 via-gray-100 to-transparent -translate-x-1/2 hidden md:block"></div>

          {/* 專業經歷與基礎教育 (整合為單一連續主軸) */}
          {[
            { company: "久鼎金屬股份有限公司", title: "資深包裝結構工程師", date: "2024.01 - PRESENT", duration: "現職", location: "自行車零件製造業", responsibilities: ["自行車零件包裝結構革新", "成功開發多項「輻射狀全紙緩衝」專利結構"], achievements: ["全紙緩衝替代 EPE，低碳量產導向", "CMF 永續研究與專利佈局"], tools: ["專利結構", "包裝設計", "結構驗證"], type: "work", icon: Briefcase, image: "/tranzx-logo-vector.png" },
            { company: "美律實業股份有限公司", title: "包裝工程師", date: "2022.07 - 2025.05", duration: "2年11個月", location: "台中市南屯區・精密儀器製造業 500人+", responsibilities: ["消費性電子產品包裝開發工作", "新機型產品包材圖面繪製、包裝作業流程製作", "包裝廠商樣品追蹤、品質問題改善確認"], achievements: ["國際品牌 TWS / HDT / Soundbar 包裝設計提案（共 25 件）", "提出多元價位包裝設計方案，滿足品牌策略，接案達成率達 40%", "於 RFQ 階段設計包裝及成本分析，研發成本節省約 10%"], tools: ["Creo", "產品開發", "產品結構評估", "包裝設計"], type: "work", icon: Briefcase, image: "/merry_logo.jpg" },
            { company: "台灣櫻花股份有限公司", title: "產品設計師", date: "2020.03 - 2022.07", duration: "2年5個月", location: "台中市大雅區・廚電製造業 500人+", responsibilities: ["針對 PM 市場規劃結合消費者調查擬定設計方向", "跨部門協作與國內外廚電市場及造型趨勢調研"], achievements: ["榮獲 2021 年度績優員工", "主導易清檯面爐 G2522AG、G2623AG 上市", "優化清潔設計與旋鈕造型"], tools: ["Creo", "Photoshop", "Illustrator", "KeyShot"], type: "work", icon: Briefcase, image: "/sakura_logo.png" },
            { company: "上岳科技股份有限公司", title: "產品設計師", date: "2018.11 - 2019.12", duration: "1年2個月", location: "台中市南屯區・醫療器材製造業 30-100人", responsibilities: ["新品提案與簡報製作", "依據 RD 模組進行產品設計提案 (含視覺、材質、風格)", "產品造型設計與機構討論"], achievements: ["低周波治療器 2 款外觀提案", "兒童用霧化器外觀提案", "SPO2 手環 5 款外觀提案"], tools: ["SolidWorks", "Illustrator", "Photoshop", "KeyShot", "機構設計"], type: "work", icon: Briefcase, image: "/emg_logo.png" },
            { company: "研成股份有限公司", title: "產品設計師", date: "2017.08 - 2018.08", duration: "1年1個月", location: "新北市新店區・設計相關業 30-100人", responsibilities: ["新品提案與簡報製作", "依據 RD 提供模組進行產品造型設計提案"], achievements: ["獨立負責日本學研 GAKKEN 委託之鋁製品設計案", "研發多合一 solar 新產品 & 彩盒設計規劃", "協助 2018 年度 12in1 solar 產品色彩配置"], tools: ["Illustrator", "Photoshop", "KeyShot", "包裝設計", "提案簡報"], type: "work", icon: Briefcase, image: "/cic-logo.png.png" },
            { company: "國立臺灣科技大學", title: "工業設計系 / 大學畢業", date: "2013 - 2017", duration: "基礎教育", location: "台北市", responsibilities: ["深耕結構工程與美學邏輯，奠定系統化產品開發思維。"], achievements: [], tools: ["工業設計", "產品開發", "系統化邏輯"], type: "edu", icon: GraduationCap, image: "/ntust_logo.jpg" },
            { company: "國立臺中高工", title: "圖文傳播科 / 高職畢業", date: "2010 - 2013", duration: "基礎教育", location: "台中市", responsibilities: ["啟蒙於平面美學與印刷技術，掌握刀模與色彩控制精髓。"], achievements: [], tools: ["平面設計", "印刷工程", "色彩學"], type: "edu", icon: LayoutGrid, image: "/tcivs_logo.jpg" }
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
                          <div className="flex flex-wrap items-center gap-3 text-[14px] font-black tracking-widest uppercase mb-3">
                            <span className="text-[#a38a6a]">{item.date}</span>
                            <span className="text-gray-200">|</span>
                            <span className="text-gray-400">{item.duration}</span>
                          </div>
                          <h4 className={`text-2xl lg:text-3xl font-black text-[#121212] mb-2 tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis ${item.type === 'edu' ? 'opacity-80' : ''}`}>{item.company}</h4>
                          <p className="text-sm font-bold text-[#a38a6a] tracking-widest leading-relaxed">{item.title}</p>
                        </div>
                        {/* Logo Image Rendering */}
                        <div className="w-14 h-14 p-2 bg-white/50 rounded-2xl hidden sm:flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group-hover:scale-110 fluid-anim">
                          <div className="absolute inset-0 bg-[#a38a6a] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                          {item.image ? (
                             <img src={item.image} alt={item.company} className="w-full h-full object-contain relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500 mix-blend-multiply" />
                          ) : (
                             <IconComponent size={24} className="text-[#a38a6a] css-mask-logo relative z-10" />
                          )}
                        </div>
                      </div>
                      {item.type === 'work' && <p className="text-[14px] font-bold text-gray-400 flex items-center gap-1.5 tracking-wider"><MapPin size={12} className="text-gray-300"/> {item.location}</p>}
                    </div>

                    <div className="space-y-6">
                      <div>
                        {item.type === 'work' && <h5 className="text-[14px] font-black text-[#a38a6a] uppercase tracking-[0.2em] mb-3">Core Responsibilities</h5>}
                        <ul className={`list-disc space-y-2 marker:text-gray-300 ${item.type === 'work' ? 'pl-4' : 'pl-0 list-none'}`}>
                          {item.responsibilities.map(res => (
                            <li key={res} className="text-[14px] text-gray-600 font-medium leading-[1.8] max-w-[55ch]">{res}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {item.achievements.length > 0 && (
                        <div>
                          <h5 className="text-[14px] font-black text-[#a38a6a] uppercase tracking-[0.2em] mb-4 mt-2">Key Achievements</h5>
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
                        <span key={tool} className="text-[14px] font-black px-4 py-2 bg-gray-50 rounded-lg text-gray-500 hover:text-white hover:bg-[#a38a6a] hover:shadow-lg hover:shadow-[#a38a6a]/40 transition-all uppercase fluid-anim cursor-default">{tool}</span>
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
      </div>
      </section>

      {/* 7. SKILLS */}
      <section id="skills" className="px-8 md:px-24 py-40 border-t border-gray-50 text-[#121212]">
        <div className="max-w-7xl mx-auto w-full text-[#121212]">
        <Reveal>
           <h2 className="text-[14px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-24 text-center">Mastery Skills & Tools</h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           {[
             { id: '01', title: '市場調研與定位分析', icon: LayoutGrid, en: 'Market Research & Strategy', desc: '擅長設計前期的競品蒐集並針對該品牌定位分析，總結設計規畫方向。', tags: ['競品分析', '產品策略', '產品定位', '市場調查資料分析', '報告撰寫與提案'] },
             { id: '02', title: '2D 品牌視覺整合與簡報提案', icon: FileCheck, en: 'Graphic Design & Branding', desc: '擅長整合包裝結構與品牌識別，製作具專業感與說服力的提案簡報。', tags: ['Adobe InDesign', 'Illustrator', 'Photoshop', '電腦排版設計', '設計印刷基本認知', '電腦印前設計'] },
             { id: '03', title: '3D 建模與結構模擬', icon: Box, en: '3D Modeling & Engineering', desc: '能快速建構產品結構模型並進行裝配模擬，支援從設計構想至工程的溝通。', tags: ['Creo', 'SolidWorks', 'Rhino', 'Keyshot', '產品結構評估', '3D 渲染'] },
             { id: '04', title: '包裝材料選用與 BOM 建立', icon: Layers, en: 'Packaging & BOM', desc: '熟悉泡殼、瓦楞紙卡、紙托等常用包材特性，依需求提出優化方案。', tags: ['瓦楞紙結構', '包裝材料選用', '工程圖繪製', 'BOM 建立'] },
             { id: '05', title: '打樣實作與設計驗證能力', icon: CheckCircle, en: 'Prototyping & Validation', desc: '善用割樣機進行結構模擬與快速打樣，快速驗證設計可行性。', tags: ['打樣機操作', '結構模擬', '快速打樣', '設計驗證', 'CMF 樣板製作'] }
           ].map((skill, idx) => (
             <Reveal key={idx} delay={idx * 150} className={idx === 4 ? "lg:col-span-2" : ""}>
                <SpotlightCard className="p-10 group rounded-[3rem] h-full flex flex-col hover:border-[#a38a6a]/30 transition-all bg-white text-[#121212]">
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#a38a6a]/10 flex items-center justify-center text-[#a38a6a] transition-transform group-hover:scale-110 duration-500">
                        <skill.icon size={28} />
                      </div>
                      <p className="text-[14px] font-black tracking-widest text-[#a38a6a] uppercase">{skill.en}</p>
                   </div>
                   <h4 className="text-2xl font-black mb-4 tracking-tight leading-snug group-hover:text-[#a38a6a] transition-colors">{skill.title}</h4>
                   <p className="text-[14px] text-gray-500 font-medium leading-[1.8] mb-10 flex-grow">{skill.desc}</p>
                   <div className="flex flex-wrap gap-2 text-[#121212]">
                     {skill.tags.map(t => (
                       <span key={t} className="text-[14px] font-black px-4 py-1.5 bg-gray-50 text-gray-500 rounded-lg hover:text-white hover:bg-[#a38a6a] hover:shadow-lg hover:shadow-[#a38a6a]/40 transition-all fluid-anim uppercase">{t}</span>
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
                   <p className="text-[14px] font-black tracking-[0.4em] text-white/50 uppercase">Design & Engineering Mastery</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
                   {[
                     { name: 'SolidWorks', img: '/solidworks_logo.jpg' },
                     { name: 'Creo', img: '/creo_logo.jpg' },
                     { name: 'KeyShot', img: '/keyshot-logo-2.jpg' },
                     { name: 'Illustrator', img: '/illustrator.jpg' },
                     { name: 'Photoshop', img: '/photoshop_logo.jpg' },
                     { name: 'InDesign', img: '/Indesign_logo.png' },
                     { name: 'AutoCAD', img: '/autocad_logo.jpg' }
                   ].map(tool => (
                     <div key={tool.name} className="flex flex-col items-center gap-4 bg-white/5 py-8 rounded-[2rem] hover:bg-[#a38a6a]/20 hover:-translate-y-2 transition-all cursor-pointer border border-transparent hover:border-[#a38a6a]/30 group">
                        <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110 fluid-anim relative">
                           {tool.img ? (
                              <img src={tool.img} alt={tool.name} className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 rounded" />
                           ) : (
                              <div className="w-full h-full rounded-lg bg-white flex items-center justify-center text-[#121212] font-black text-xs">
                                 {tool.name.substring(0,2).toUpperCase()}
                              </div>
                           )}
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-500 text-center w-full truncate px-2">{tool.name}</span>
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </Reveal>
        </div>
      </section>

      {/* 8. COURSES (非對稱佈局設計) */}
      <section id="courses" className="px-8 md:px-24 py-40 bg-[#fdfdfd] text-[#121212]">
        <div className="max-w-7xl mx-auto w-full">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div>
              <h2 className="text-[14px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-6 text-[#a38a6a]">Learning Path</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212]">Growth.</h3>
            </div>
            <div className="flex gap-2 mt-10 md:mt-0 overflow-x-auto pb-4 scrollbar-hide text-[#121212]">
              {['全部', 'AI應用課程', '包裝專業課程'].map(f => (
                <button key={f} onClick={() => setActiveCourseFilter(f)} className={`whitespace-nowrap px-8 py-3 rounded-full text-base font-black uppercase tracking-[0.2em] transition-all shadow-sm ${activeCourseFilter === f ? 'bg-[#a38a6a] text-white' : 'bg-white text-gray-400 hover:text-[#121212] border border-gray-100'}`}>
                  {f} <span className="ml-2 opacity-50">({getCourseFilterCount(f)})</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 text-[#121212]">
           {filteredCourses.map((course, idx) => (
             <CourseCard key={course.id} course={course} delay={idx * 150} />
           ))}
        </div>
        </div>
      </section>

      {/* 9. INTERESTS */}
      <section id="interests" className="px-8 md:px-24 py-40 bg-white text-[#121212]">
        <div className="max-w-7xl mx-auto w-full">
        <Reveal><h2 className="text-[14px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-24 text-center">Lifestyle Beyond Work</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: '重量訓練', en: 'Fitness', icon: Dumbbell, goal: '目前每週2練，目標4練', desc: '訓練耐力與自律，堅持每一步小幅進步。', img: "/fitness.jpg" },
             { title: '馬拉松', en: 'Marathon', icon: Timer, goal: '5次半馬，目標全馬', desc: '不只是體能，更是對堅持信念的終極挑戰。', img: "/marathon.jpg" },
             { title: '登山挑戰', en: 'Hiking', icon: Mountain, goal: '登頂2座百岳，持續挑戰', desc: '在山林間對話，尋找自我探索與放鬆的途徑。', img: "/mountain.jpg" }
           ].map((item, idx) => (
             <Reveal key={idx} delay={idx * 150}>
                <SpotlightCard className="h-full flex flex-col hover:shadow-2xl transition-all duration-700 text-[#121212] rounded-[3rem] group bg-white border-0">
                   <div className="h-[28rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out relative text-[#121212] bg-white">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent group-hover:opacity-40 transition-opacity duration-1000"></div>
                   </div>
                   <div className="p-10 flex flex-col flex-grow relative bg-white -mt-12 mx-6 rounded-[2.5rem] shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-6 text-[#121212] group-hover:-translate-y-4 transition-transform duration-700 ease-out">
                      <div className="flex items-center gap-5 mb-8 text-[#121212]">
                         <div className="w-14 h-14 rounded-2xl bg-[#a38a6a]/10 flex items-center justify-center text-[#a38a6a] shadow-inner text-[#121212]"><item.icon size={28} strokeWidth={2.5} /></div>
                         <div><h4 className="text-xl font-black tracking-tight text-[#121212]">{item.title}</h4><p className="text-[14px] font-black uppercase tracking-widest text-gray-300">{item.en}</p></div>
                      </div>
                      <p className="text-sm font-bold text-[#a38a6a] mb-4 leading-relaxed">{item.goal}</p>
                      <p className="text-[14px] text-gray-400 font-medium leading-relaxed text-[#121212]">{item.desc}</p>
                   </div>
                </SpotlightCard>
             </Reveal>
           ))}
        </div>
        </div>
      </section>

      {/* 10. CLOSING & FOOTER */}
      <footer id="contact" className="bg-[#121212] pt-40 pb-20 text-white px-8 md:px-24">
        <Reveal>
          <div className="max-w-4xl mx-auto mb-32 text-center px-4">
            <p className="text-[#a38a6a] font-black text-[14px] tracking-[0.5em] uppercase mb-12">Closing Statement</p>
            <div className="space-y-8">
              <p className="text-3xl md:text-5xl font-black tracking-tight leading-tight">非常感謝您的閱讀。</p>
              <p className="text-xl md:text-2xl font-medium text-gray-400 leading-relaxed max-w-2xl mx-auto">如有進一步了解的需要，歡迎隨時與我聯繫。</p>
              <p className="text-xl md:text-2xl text-[#a38a6a] font-serif italic leading-relaxed pt-4">
                若有幸符合貴公司徵才條件，<br />
                我將十分期待有機會參與正式面試，<br />
                為團隊帶來我的熱情與專業。
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="down">
          <div className="text-center mb-40 border-t border-white/5 pt-32">
             <h2 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-20 leading-[0.8]">Let's Build <br /><span className="font-serif italic text-[#a38a6a]">Something.</span></h2>
             <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                <a href="mailto:amanda840604@gmail.com" className="group bg-white text-[#121212] px-14 py-7 rounded-full font-black text-[14px] uppercase tracking-[0.4em] hover:bg-[#a38a6a] hover:text-white transition-all flex items-center gap-5 shadow-2xl active:scale-95"><Mail size={22} /> AMANDA840604@GMAIL.COM</a>
                <div className="flex gap-6">
                   <a href="tel:0918190990" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-[#a38a6a] transition-all group active:scale-90"><Phone size={28} /></a>
                   <a href="https://line.me/ti/p/" target="_blank" rel="noopener noreferrer" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-[#06C755] transition-all group active:scale-90"><MessageCircle size={28} /></a>
                </div>
             </div>
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-between items-center py-16 border-t border-white/5 text-[14px] font-black uppercase tracking-[0.5em] text-gray-600 text-white text-white text-white">
          <p className="text-white opacity-50 text-white">© 2026 AMANDA LAI. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap gap-8 mt-12 md:mt-0 text-white text-white justify-center">
             <a href="https://line.me/ti/p/fk-CFFKYiU" target="_blank" rel="noopener noreferrer" className="hover:text-[#a38a6a] transition-colors flex items-center gap-2">
                <MessageCircle size={18} />
                LINE 聯繫
             </a>
          </div>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {activeCategory && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto animate-in fade-in duration-500 text-[#121212] text-[#121212]">
          <div className="sticky top-0 z-[210] bg-white/90 backdrop-blur-xl border-b border-gray-100 px-8 md:px-24 py-10 flex justify-between items-center text-[#121212]">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#121212]">
                {activeCategory} <span className="text-[#a38a6a] font-normal italic lowercase font-serif ml-2">Gallery Collection</span>
              </h2>
            </div>
            <button onClick={() => setActiveCategory(null)} className="group flex items-center gap-6 bg-[#121212] text-white px-10 py-4 rounded-full hover:bg-[#a38a6a] transition-all active:scale-90 shadow-xl">
              <span className="text-[14px] font-black uppercase tracking-widest">Close Gallery</span>
              <X size={20} />
            </button>
          </div>
          <div className="px-8 md:px-24 py-24 max-w-7xl mx-auto w-full text-[#121212]">
            {currentFilterOptions.length > 0 && (
              <div className="flex gap-4 mb-24 overflow-x-auto pb-6 scrollbar-hide">
                {currentFilterOptions.map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)} className={`whitespace-nowrap px-10 py-4 rounded-full text-base font-black uppercase tracking-[0.2em] transition-all ${activeFilter === f ? 'bg-[#121212] text-white shadow-2xl shadow-black/30' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                    {f} <span className="ml-4 opacity-40">({getFilterCount(activeCategory, f)})</span>
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {filteredProjects.map((proj, i) => (
                 <div key={proj.id} onClick={() => setSelectedProject(proj)} className="group/item flex flex-col cursor-pointer bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                   <div className="w-full flex items-center justify-center overflow-hidden rounded-t-[3rem] bg-white relative p-4 aspect-[3/2]">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-contain transition-all duration-1000 group-hover/item:scale-[1.05]" />
                   </div>
                   <div className="px-10 pb-10 pt-4 flex-grow flex flex-col justify-end">
                      <div className="flex justify-between items-center mb-6">
                         <h4 className="text-3xl font-black tracking-tight">{proj.title}</h4>
                         <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover/item:text-[#a38a6a] group-hover/item:border-[#a38a6a] transition-all"><ExternalLink size={20} /></div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {proj.tags.map(tag => (<span key={tag} className="text-[12px] font-black uppercase px-4 py-1.5 bg-[#a38a6a]/10 rounded-full text-[#a38a6a] tracking-widest">{tag}</span>))}
                      </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[300] flex justify-center items-center p-4 sm:p-8 md:p-12">
          {/* Backdrop */}
          <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-[#121212]/80 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-7xl h-[90vh] md:h-full max-h-[90vh] md:max-h-full rounded-[2rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-500 cubic-bezier">
            
            {/* Header & Close */}
            <div className="flex-shrink-0 flex items-center justify-between p-8 md:p-10 border-b border-gray-100 z-10 sticky top-0 bg-white/90 backdrop-blur-md rounded-t-[2rem]">
               <div className="flex flex-col">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-[#121212]">{selectedProject.title}</h3>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-[14px] font-bold text-[#a38a6a] bg-[#a38a6a]/10 px-4 py-1.5 rounded-full uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
               </div>
               <button onClick={() => setSelectedProject(null)} className="flex items-center justify-center w-14 h-14 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors group">
                 <X size={24} className="text-gray-500 group-hover:text-[#121212] transition-colors" />
               </button>
            </div>

            {/* Scrollable Images */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-8 md:p-12 custom-scrollbar bg-[#fdfdfd]">
               <div className="space-y-8 flex flex-col items-center">
                  {selectedProject.detailsImages ? (
                     selectedProject.detailsImages.map((img, idx) => (
                       <div key={idx} className="w-full rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100">
                          <img src={img} alt={`${selectedProject.title} details`} className="w-full h-auto object-contain" />
                       </div>
                     ))
                  ) : (
                     <div className="w-full rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100">
                        <img src={selectedProject.img} alt={`${selectedProject.title} thumbnail`} className="w-full h-auto object-contain" />
                     </div>
                  )}
               </div>
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
