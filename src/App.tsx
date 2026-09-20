import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Briefcase, GraduationCap, LayoutGrid, Award, Mail, ChevronRight, ChevronDown, Phone, MessageCircle, X, Cpu, Calendar, Dumbbell, Timer, Mountain, ExternalLink, FileCheck, MousePointer2, MapPin, CheckCircle, Box, Layers, User, Target, Lightbulb, Star, Package, MonitorSmartphone, Users, CheckCircle2, Flag, Rocket, Leaf, TrendingUp, Globe, Scale, UserCheck, MessageSquare, Flame, Menu } from 'lucide-react';

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
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // 微幅的角度計算，產生視差傾斜感
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      setParallaxOffset({ x: rotateY, y: rotateX });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallaxOffset({ x: 0, y: 0 });
  };

  const glowColor = dark ? 'rgba(163, 138, 106, 0.2)' : 'rgba(163, 138, 106, 0.12)';

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-500 border border-gray-100 bg-white ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-700 z-0" 
        style={{ 
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)` 
        }} 
      />
      <div 
        className="relative z-10 h-full flex flex-col transition-transform ease-out"
        style={{
          transitionDuration: isHovered ? '100ms' : '500ms',
          transform: isHovered 
            ? `rotateX(${parallaxOffset.y}deg) rotateY(${parallaxOffset.x}deg) scale3d(1.02, 1.02, 1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// --- 資料定義 ---
const projectData = {
  Packaging: [
    {
      id: 1,
      title: 'TWS 紙卡內襯 模組化設計',
      desc: '建置高彈性紙卡方案庫，加速 RFQ 提案並兼顧量產組裝良率。',
      brief: [
        { label: '專案任務', content: '為解決前期 RFQ 階段節奏快速的估價提案需求，建立能快速反應的包裝結構解決方案。' },
        { label: '執行策略', content: '預先設計多款適用於 TWS 產品的紙卡內襯結構，並針對成本與工法，區分為「有貼合」與「無貼合」兩種製程方案。' },
        { label: '驗證與優化', content: '親自進行實體割樣、折合與試組裝驗證，從產線實際操作的視角出發，逐步修正結構上不易組裝的瓶頸。' },
        { label: '最終成果', content: '建置彈性的設計資料庫，不僅在接案階段能迅速產出客製化提案，更確保了設計結構的量產可行性與組裝良率。' }
      ],
      img: '/tws_innercard01.png',
      detailsImages: ['/tws_innercard01.png', '/tws_innercard02.png', '/tws_innercard03.png', '/tws_innercard04.png', '/tws_innercard05.png', '/tws_innercard06.png', '/tws_innercard07.png', '/tws_innercard08.png', '/tws_innercard9.png', '/tws_innercard10.png', '/tws_innercard11.png', '/tws_innercard12.png'],
      tags: ['包裝設計', 'TWS', '紙卡'],
      category: '消費性電子產品'
    },
    {
      id: 2,
      title: 'TWS 包裝設計提案',
      desc: '規劃高性價比與旗艦雙軌包裝架構，精準滿足多元預算並提升提案命中率。',
      brief: [
        { label: '專案任務', content: '針對客戶 RFQ 階段的估價與提案需求，制定分級提案策略，提供具備成本彈性與市場區隔的包裝解決方案。' },
        { label: '執行策略', content: '依據產品定位與預算，規劃兩種包裝結構架構：\n\n• A 方案（主打高性價比）：採用「紙卡內襯搭配袖套」的極簡結構，在維持保護力的前提下，極大化降低包材成本與產線組裝工時。\n• B 方案（主打旗艦高質感）：運用「紙托內襯」結合「書型精品盒與袖套」設計，強化結構的精緻度與份量感，全面提升消費者的開箱體驗與品牌價值。' },
        { label: '最終成果', content: '建立層次分明的提案模組，有效協助業務團隊快速應對不同預算層級的客戶需求，提升提案命中率與專案推進效率。' }
      ],
      img: '/tws_pkg_design01-1.jpg',
      detailsImages: ['/tws_pkg_design01.jpg', '/tws_pkg_design02.jpg'],
      tags: ['包裝設計', '消費電子'],
      category: '消費性電子產品'
    },
    {
      id: 3,
      title: 'HDT 紙卡內襯 模組化設計',
      desc: '精簡卡扣與折口設計，提升大體積耳機防護穩固性並優化組裝良率。',
      brief: [
        { label: '專案任務', content: '因應前期 RFQ 階段節奏快速的估價提案需求，建立能迅速反應的 HDT 包裝結構解決方案。' },
        { label: '執行策略', content: '針對 HDT 產品體積較大與配重特性，預先設計多款紙卡內襯模組。\n透過反覆割樣與檢討，精簡結構設計，在有效降低產線折合工時的同時，提升大體積耳機的包覆力與防護穩固性。' },
        { label: '最終成果', content: '建置高彈性的結構設計資料庫，不僅在接案初期能迅速產出客製化且精準的提案，更全面確保了量產可行性、優化組裝良率，並有效控管包裝製造成本。' }
      ],
      img: '/hdt_inner_card01.jpg',
      detailsImages: ['/hdt_inner_card01.jpg', '/hdt_inner_card02.jpg', '/hdt_inner_card03.jpg', '/hdt_inner_card04.jpg', '/hdt_inner_card05.jpg', '/hdt_inner_card06.jpg', '/hdt_inner_card07.jpg', '/hdt_inner_card08.jpg', '/hdt_inner_card09.jpg', '/hdt_inner_card10.jpg', '/hdt_inner_card11.jpg', '/hdt_inner_card12.jpg', '/hdt_inner_card13.jpg', '/hdt_inner_card14.jpg'],
      tags: ['包裝設計', '紙卡', '電競'],
      category: '消費性電子產品'
    },
    {
      id: 4,
      title: 'Soundbar 模組化設計',
      desc: '制定高低價位分級包裝策略，靈活整合多樣包材並成功完成跨國樣機交付。',
      brief: [
        { label: '專案任務', content: '為因應前期 RFQ 階段節奏快速的估價提案需求，建立能迅速反應的 Soundbar 模組化包裝結構解決方案。' },
        { label: '執行策略', content: '針對 Soundbar 產品特性與各部位保護需求，制定從入門到旗艦的「高低價位分級包裝策略」。\n靈活整合多樣化包材配置：包含內襯（紙卡／紙塑）、表面保護材（環保紙／高質感布套）至外箱結構（Folding Box／Pizza Box），精準對接客戶的不同成本預算與品牌定位。' },
        { label: '驗證與優化', content: '親自執行實體割樣、折合與試組裝驗證。\n從產線實際作業視角出發，精準排除大尺寸結構的組裝干涉，確保整體包裝的防護與產線作業順暢度。' },
        { label: '最終成果', content: '建置高彈性的結構設計資料庫，於接案初期迅速產出客製化精準提案，全面確保量產可行性與成本控管。\n親赴台北端協助跨部門組裝作業，並順利完成跨國樣機寄送任務，達成客戶端的要求。' }
      ],
      img: '/soundbar_inner_card01.png',
      detailsImages: ['/soundbar_inner_card01.png', '/soundbar_inner_card02.png', '/soundbar_inner_card03.png', '/soundbar_inner_card04.jpg', '/soundbar_inner_card05.jpg', '/soundbar_inner_card06.jpg', '/soundbar_inner_card07.jpg'],
      tags: ['包裝設計', '紙卡', 'Soundbar'],
      category: '消費性電子產品'
    },
    {
      id: 5,
      title: 'Soundbar 包裝設計提案',
      desc: '精準對接成本目標與逆向工程拆解，交付完整圖面、BOM 表與標準組裝流程。',
      brief: [
        { label: '專案任務', content: '針對客戶 RFQ 階段的嚴格成本限制與提案需求，提供符合預算目標且具備量產可行性的 Soundbar 包裝解決方案。' },
        { label: '執行策略', content: '精準對接客戶「成本持平」的商業目標，對前代產品包裝進行逆向工程拆解與部件分析。\n在客戶設定的成本基準下，沿用並檢視既有包材與結構設定，確保新提案的防護力與預算皆完美符合客戶期望。' },
        { label: '最終成果', content: '完成包裝設計提案，交付結構圖面與估價專用BOM 表；同時制定標準包裝組裝流程，提供精確的產線工時評估基準，大幅提升前期報價的準確度與專案推進效率。' }
      ],
      img: '/soundbar01.jpg',
      detailsImages: ['/soundbar01.jpg'],
      tags: ['包裝設計', '永續', 'Soundbar'],
      category: '消費性電子產品'
    },
    {
      id: 6,
      title: '視訊鏡頭 包裝設計提案',
      desc: 'Webcam 精緻禮盒包裝，結合高強度環保紙托與保護套。',
      brief: [
        { label: '專案任務', content: '針對客戶 RFQ 階段的預算限制與提案需求，提供兼具成本效益與量產可行性的視訊鏡頭包裝解決方案。' },
        { label: '執行策略', content: '針對終端零售與批量運輸情境，精準制定雙軌包裝策略：\n．單入零售端：採用「精品盒搭配黑色紙托」設定，提升產品的旗艦質感與開箱體驗\n．多入批量裝箱：考量鏡頭的易損特性，評估使用「充氣緩衝墊」，提供防刮與抗震保護，確保長途運輸安全性。' },
        { label: '最終成果', content: '成功完成全套包裝設計提案，交付結構圖面與估價專用 BOM 表；同時制定標準包裝組裝流程（SOP），提供精確的產線工時評估基準，大幅提升前期報價準確度與專案推進效率。' }
      ],
      img: '/camera_pkg_001.jpg',
      detailsImages: ['/camera_pkg_001.jpg', '/camera_pkg_002.jpg'],
      tags: ['包裝設計', '紙托', '結構設計'],
      category: '消費性電子產品'
    },
    {
      id: 11,
      title: 'Carrycase 模組化設計',
      desc: '建立軟、硬殼雙軌材質提案庫，迅速對接客戶預算並產出客製化提案。',
      brief: [
        { label: '專案任務', content: '因應前期 RFQ 階段節奏快速的估價提案需求，建立能迅速反應的 Carrycase模組化包裝解決方案。' },
        { label: '執行策略', content: '針對不同產品定位與成本限制，建立軟、硬殼雙軌材質提案庫：\n．軟殼方案：規劃具備成本優勢的「帆布」材質，以及主打視覺與觸覺質感的「羊毛氈」材質，滿足不同外觀需求。\n．硬殼方案：設計兩款 EVA 熱壓成型Carrycase，依據實際產品與配件的空間分配，規劃不同的收納佈局與內襯配置。' },
        { label: '最終成果', content: '成功建置高彈性的 Carrycase 設計資料庫，於接案初期即能迅速對接客戶預算並產出客製化提案。\n同時透過標準化的內襯與材質設定，確保量產可行性並有效控管包材成本。' }
      ],
      img: '/carrycase.png',
      detailsImages: ['/carrycase.png'],
      tags: ['包裝設計', '攜帶盒', '減塑'],
      category: '消費性電子產品'
    },
    {
      id: 9,
      title: 'TR Handle Bar 包裝設計',
      desc: '導入無塑環保材質，全面取代現行塑膠袋包裝方式。',
      brief: [
        { label: '專案任務', content: '因應國際市場減塑趨勢與永續包裝規範，導入無塑環保材質，全面取代並優化現行 TR Handle Bar 產品的塑膠袋包裝方式。' },
        { label: '執行策略', content: '針對產品外型與保護需求，展開三種無塑包材替代方案評估：\n．紙材阻隔方案：開發「蜂巢紙」與「瓦楞紙卡折合成型」之結構設計。\n．袋裝替代方案：導入具備環保特性的「竹纖維袋」進行套袋測試。\n．套管緩衝方案：應用「蜂巢紙套管」取代傳統塑膠防撞包材。' },
        { label: '最終成果', content: '經由ISTA 1A測試與量產成本估算，收斂出「瓦楞紙卡折合成型」方案。\n該方案在達成無塑目標同時，兼顧產品穩固性與成本優勢，並順利提案給客戶。' }
      ],
      img: '/tr_handle_bar01.jpg',
      detailsImages: ['/tr_handle_bar01.jpg', '/tr_handle_bar02.jpg', '/tr_handle_bar03.jpg', '/tr_handle_bar04.jpg', '/tr_handle_bar05.jpg', '/tr_handle_bar06.png', '/tr_handle_bar07.png', '/tr_handle_bar08.png'],
      tags: ['包裝設計', '減塑', '自行車'],
      category: '自行車零件'
    },
    {
      id: 10,
      title: 'RA Handle Bar 包裝設計',
      desc: '導入無塑環保材質，全面取代現行塑膠袋包裝方式。',
      brief: [
        { label: '專案任務', content: '因應國際市場減塑趨勢與永續包裝規範，導入無塑環保材質，全面取代並優化現行 RA Handle Bar 產品的塑膠袋包裝方式。' },
        { label: '執行策略', content: '針對產品外型與保護需求，展開三種無塑包材替代方案評估：\n．紙材阻隔方案：開發「瓦楞紙卡折合成型」之結構設計。\n．袋裝替代方案：導入具備環保特性的「竹纖維袋」進行套袋測試。\n．套管緩衝方案：應用「蜂巢紙套管」取代傳統塑膠防撞包材。' },
        { label: '最終成果', content: '經由ISTA 1A測試與量產成本估算，收斂出「瓦楞紙卡折合成型」方案。\n該方案在達成無塑目標同時，兼顧產品穩固性與成本優勢，並順利提案給客戶。' }
      ],
      img: '/RA_handle_bar01.png',
      detailsImages: ['/RA_handle_bar01.png', '/RA_handle_bar02.png', '/RA_handle_bar03.png', '/RA_handle_bar04.png', '/RA_handle_bar05.png', '/RA_handle_bar06.png', '/RA_handle_bar07.png'],
      tags: ['包裝設計', '減塑', '自行車'],
      category: '自行車零件'
    },
    {
      id: 18,
      title: 'RA車把手 塑膠裝袋優化方案',
      desc: '針對車把手塑膠裝袋實務問題進行分析與改善，優化包裝流程與產品防護。',
      brief: [
        { label: '專案任務', content: '針對現行 RA 車把手在塑膠裝袋包裝作業上的痛點與問題進行分析，評估並規劃更完善的裝袋優化方案。' },
        { label: '執行策略', content: '深入探討既有裝袋包裝遭遇之實務問題，提出針對性的包裝改善策略，兼顧作業便利性與產品表面防護。' },
        { label: '最終成果', content: '完成 RA 車把手塑膠裝袋優化評估，提供清晰的改善方向與圖面分析，作為後續包裝標準化與品質提升之依據。' }
      ],
      img: '/Giant problem_01.jpg',
      detailsImages: ['/Giant problem_01.jpg', '/Giant problem_02.jpg'],
      tags: ['包裝優化', '自行車', '裝袋方案', 'RA車把手'],
      category: '自行車零件'
    },
    {
      id: 12,
      title: '立管 包裝設計',
      desc: '開發無塑環保結構，取代現有塑膠袋包裝，確保足夠防護力。',
      brief: [
        { label: '專案任務', content: '因應市場減塑趨勢，開發無塑環保結構，取代立管現有的塑膠袋包裝。' },
        { label: '執行策略', content: '全面採用「瓦楞紙卡」設計。針對不同外型的立管（L 型與 I 型），分別規劃專屬的紙卡折合結構，確保產品在無塑條件下依然擁有足夠的防護力。' },
        { label: '最終成果', content: '提前建立 L 型與 I 型立管的無塑包裝資料庫。\n當客戶提出減塑需求時，能快速提供具備量產可行性的提案，有效縮短前置作業時間。' }
      ],
      img: '/Stem01.jpg',
      detailsImages: ['/Stem01.jpg', '/Stem02.jpg', '/Stem03.jpg', '/Stem03-1.jpg', '/Stem04.jpg', '/Stem05.jpg', '/Stem06.jpg'],
      tags: ['包裝設計', '減塑', '自行車', 'Stem'],
      category: '自行車零件'
    },
    {
      id: 13,
      title: '快拆束仔 包裝設計',
      desc: '開發無塑環保結構，取代現有塑膠袋包裝。',
      brief: [
        { label: '專案任務', content: '因應市場減塑趨勢，開發無塑環保結構，取代快拆束仔現有的塑膠袋包裝。' },
        { label: '執行策略', content: '全面採用「瓦楞紙卡」設計。' },
        { label: '最終成果', content: '提前建立快拆束仔的無塑包裝資料庫。\n當客戶提出減塑需求時，能快速提供具備量產可行性的提案，有效縮短前置作業時間。' }
      ],
      img: '/Quick Release01.jpg',
      detailsImages: ['/Quick Release01.jpg', '/Quick Release02.jpg', '/Quick Release03.jpg', '/Quick Release04.jpg'],
      tags: ['包裝設計', '減塑', '自行車', 'Quick Release'],
      category: '自行車零件'
    },
    {
      id: 14,
      title: '座管 包裝設計',
      desc: '開發單件與多件無塑環保結構，取代現有塑膠袋包裝。',
      brief: [
        { label: '專案任務', content: '因應市場減塑趨勢，開發無塑環保結構，取代座管現有的塑膠袋包裝。' },
        { label: '執行策略', content: '針對單件與多件包裝需求，分別規劃不同的無塑方案：\n．單件裝：評估使用「壓泡紙」與「蜂巢紙」等緩衝紙袋，以及「瓦楞紙卡折合」結構。\n．多件裝：為配合廠內現有「A 格塑膠籃」的循環使用，並達成內襯料件共用，統一採用「瓦楞紙卡折合」方案進行規劃。' },
        { label: '最終成果', content: '提前建立座管的單件與多件無塑包裝資料庫。\n當客戶提出減塑需求時，能快速提供具備量產可行性的提案，有效縮短前置評估與作業時間。' }
      ],
      img: '/Seatpost01.jpg',
      detailsImages: ['/Seatpost01.jpg', '/Seatpost01-1.jpg', '/Seatpost01-2.jpg', '/Seatpost02.jpg', '/Seatpost03.jpg', '/Seatpost03-1.jpg', '/Seatpost03-2.jpg', '/Seatpost03-2-1.jpg', '/Seatpost03-3.jpg', '/Seatpost04.jpg', '/Seatpost04-1.jpg', '/Seatpost05.jpg', '/Seatpost06.jpg', '/Seatpost07.jpg', '/Seatpost08.jpg', '/Seatpost08-1.jpg', '/Seatpost09.jpg', '/Seatpost09-1.jpg'],
      tags: ['包裝設計', '減塑', '自行車', 'Seatpost'],
      category: '自行車零件'
    },
    {
      id: 17,
      title: '煞車線 包裝設計',
      desc: '開發無塑環保結構，取代現有塑膠袋包裝。',
      brief: [
        { label: '專案任務', content: '因應市場減塑趨勢，開發無塑環保結構，取代煞車線現有的塑膠袋包裝。' },
        { label: '執行策略', content: '採用「瓦楞紙卡折合」方式規劃。' },
        { label: '最終成果', content: '提前建立煞車線的無塑包裝資料庫。\n當客戶提出減塑需求時，能快速提供具備量產可行性的提案，有效縮短前置評估與作業時間。' }
      ],
      img: '/brakeline-1.jpg',
      detailsImages: ['/brakeline-1.jpg', '/brakeline-2.jpg'],
      tags: ['包裝設計', '減塑', '自行車', 'Brake Line'],
      category: '自行車零件'
    },
    {
      id: 15,
      title: '電動機車 包裝設計',
      desc: '針對電動機車進行整機的減塑包裝規劃。',
      brief: [
        { label: '專案任務', content: '針對電動機車進行整機的減塑包裝規劃。' },
        { label: '執行策略', content: '外箱與內部緩衝結構主體採用「瓦楞紙卡」折合設計。\n考量實務防護需求，針對易刮傷的塑膠車殼部位，局部搭配「珍珠棉 (EPE)」進行防護，在極大化減塑與產品安全之間取得平衡。' },
        { label: '最終成果', content: '順利完成整車包裝設計，目前已成功應用於國外參展與競賽的跨國運輸。' }
      ],
      img: '/Ebike-1.JPG',
      detailsImages: ['/Ebike-1.JPG', '/Ebike-2.JPG', '/Ebike-3.JPG', '/Ebike-4.JPG', '/Ebike-5.JPG', '/Ebike-6.JPG'],
      tags: ['包裝設計', '減塑', '電動載具', '結構設計'],
      category: '電動載具'
    },
    {
      id: 16,
      title: '電動滑板車 包裝設計',
      desc: '針對電動滑板車進行整機的減塑包裝概念規劃。',
      brief: [
        { label: '專案任務', content: '配合新產品開發進度，針對電動滑板車進行整機的減塑包裝概念規劃。' },
        { label: '執行策略', content: '外箱與內部緩衝結構主體採用「瓦楞紙卡」折合設計。\n考量實務防護需求，針對易刮傷的塑膠車殼部位，局部搭配「珍珠棉 (EPE)」進行防護，在極大化減塑與產品安全之間取得平衡。' },
        { label: '最終成果', content: '完成前期的包裝概念設計與空間佈局。\n提供初步的包材配置與防護策略，作為後續細部設計優化與量產評估的基礎。' }
      ],
      img: '/Escooter-1.JPG',
      detailsImages: ['/Escooter-1.JPG', '/Escooter-2.JPG', '/Escooter-3.JPG', '/Escooter-4.JPG'],
      tags: ['包裝設計', '減塑', '電動載具', '結構設計'],
      category: '電動載具'
    },
    {
      id: 19,
      title: '全紙化無塑包裝 專利申請',
      desc: '因應全球永續趨勢與歐盟 PPWR 規範，針對自行車零件提出七項全紙化無塑包裝專利結構與綠色閉環物流方案。',
      brief: [
        { label: '專案任務', content: '因應全球永續低碳趨勢與歐盟 PPWR / EPR 減塑法規壁壘，針對自行車零件全面淘汰傳統塑膠套袋，研發具備高防護力之「全紙化無塑包裝」創新結構，並進行七項專利佈局與申請。' },
        { label: '執行策略', content: '1. 核心技術：單一瓦楞紙材質 (Mono-material) 與立體懸浮折線卡槽，達成免工具組裝與無膠全卡扣物理鎖固，兼顧緩衝吸震與端部尖銳防穿刺。\n2. 規格化佈局：涵蓋多件裝車把手（TR 平把）、多件裝座管與立管之分層模組化抗壓陣列。\n3. 綠色物流：結合高剛性循環 A 格塑膠籃與可折平全紙內卡，建構 B2B 零廢棄閉環供應鏈。' },
        { label: '最終成果', content: '完成七項創新包裝專利規劃與技術說明書撰寫，預計於 2026 Q4 完成正式送件與內部審核，確保在 2027 台北國際自行車展公開展出前取得完整專利保護地位。' }
      ],
      img: '/patent01.JPG',
      detailsImages: ['/patent01.JPG', '/patent02.JPG', '/patent03.JPG', '/patent04.JPG', '/patent05.JPG', '/patent06.JPG', '/patent07.JPG'],
      tags: ['專利申請', '全紙化無塑', '自行車零件', '結構設計', 'ESG / PPWR'],
      category: '專利申請'
    }
  ],
  Product: [
    { id: 1, title: '油煙機設計', img: '/rangehood01.jpg', detailsImages: ['/rangehood01.jpg', '/rangehood02.jpg', '/rangehood03.jpg'], tags: ['產品設計', '廚房家電', 'SAKURA'], category: '廚電/家電' },
    { id: 2, title: '瓦斯爐設計', img: '/g252201.jpg', detailsImages: ['/g252201.jpg'], tags: ['產品設計', '家電'], category: '廚電/家電' },
    { id: 3, title: '穿戴式裝置設計', img: '/sleep_monitor_device01-1.jpg', detailsImages: ['/sleep_monitor_device01.jpg', '/sleep_monitor_device02.jpg', '/sleep_monitor_device03.jpg', '/sleep_monitor_device04.jpg'], tags: ['穿戴裝置', '醫療'], category: '醫療/穿戴' },
    { id: 4, title: '醫療器材設計', img: '/emg01.jpg', detailsImages: ['/emg01.jpg', '/emg02.jpg'], tags: ['醫療器材', '工業設計'], category: '醫療/穿戴' },
    { id: 5, title: '玩具設計', img: '/cic_toy.jpg', detailsImages: ['/cic_toy.jpg'], tags: ['玩具設計', 'CMF'], category: '玩具設計' },
    { id: 6, title: '手繪作品', img: '/draw.jpg', detailsImages: ['/draw.jpg'], tags: ['手繪', '插畫'], category: '手繪作品' }
  ],
  Graphic: [
    { id: 1, title: '品牌視覺整合', img: '/graphic_design02-1.jpg', detailsImages: ['/graphic_design01.jpg', '/graphic_design02.jpg', '/post_design.jpg'], tags: ['品牌設計', '平面', 'CIS'], category: '品牌/CIS' }
  ]
};

const coursesData = [
  { id: 1, title: '包裝結構設計、運輸驗證\n成本優化實務課程', org: '財團法人塑膠工業技術發展中心 (PIDC)', date: '2026.03.26', hours: '48 小時', category: '包裝專業課程', img: '/course_pkg01.png', imgs: ['/course_pkg01.png', '/course_pkg02.jpg'] },
  { id: 2, title: '在職菁英 AI 人才培育課程', org: '114年度經濟部產業發展署補助課程', date: '2025.12.09 - 2025.12.17', hours: '30 小時', category: 'AI應用課程', img: '/course_ai_20251209-1217.png' },
  { id: 3, title: 'iPAS AI 應用規劃師初級證照班課程', org: '中國生產力中心 China Productivity Center', date: '2026.04.26', hours: '48 小時', category: 'AI應用課程', img: '/course_ai_ccchen.jpg' },
  { id: 4, title: 'AI 應用實務系列課程\nChatGPT & Make', org: 'NUVA', date: '2025.03 - 2025.04', hours: '16 小時', category: 'AI應用課程', img: '/chat gpt lv1.jpg', imgs: ['/chat gpt lv1.jpg', '/make lv1.jpg', '/nuva.jpg'] },
  { id: 5, title: 'iPAS AI應用規劃師初級能力培訓班', org: '經濟部商業發展署', date: '2026.03.22', hours: '15 小時', category: 'AI應用課程', img: '/course_ai_20260308-0322.jpg' }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('全部包裝');
  const [activeCourseFilter, setActiveCourseFilter] = useState('全部');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState('background');

  const aboutTabs = [
    { id: 'background', label: '設計背景與專業', subLabel: 'Background & Expertise', icon: User },
    { id: 'experience', label: '開發實務經驗', subLabel: 'Development Experience', icon: Briefcase },
    { id: 'career', label: '職涯規劃目標', subLabel: 'Career Goals', icon: Target },
    { id: 'philosophy', label: '核心設計理念', subLabel: 'Design Beliefs', icon: Lightbulb }
  ];

  // --- 計算屬性 ---
  const currentFilterOptions = activeCategory ? (
    activeCategory === 'Packaging' 
      ? ['全部包裝', '消費性電子產品', '自行車零件', '電動載具', '專利申請']
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
    document.body.style.overflow = (activeCategory || selectedProject || isMobileMenuOpen) ? 'hidden' : 'unset';
  }, [activeCategory, selectedProject, isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else if (activeCategory) setActiveCategory(null);
        else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, activeCategory, isMobileMenuOpen]);

  return (
    <div className="font-sans text-[#121212] bg-[#fdfdfd] antialiased selection:bg-[#a38a6a] selection:text-white pb-24">
      
      {/* 1. 全域閱讀進度條 */}
      <div className="fixed top-0 left-0 h-[3px] bg-[#a38a6a] z-[130] transition-transform duration-300 ease-out origin-left shadow-[0_0_12px_rgba(163,138,106,0.6)]" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* 2. 精品膠囊導覽列 */}
      <div className="fixed top-0 left-0 w-full z-[120] flex justify-center pt-4 sm:pt-6 md:pt-8 px-3 sm:px-6 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-[800ms] fluid-anim flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full bg-white/85 backdrop-blur-3xl border border-white/40 shadow-lg ${scrolled ? 'w-full max-w-[70rem]' : 'w-full max-w-[85rem]'}`}>
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden bg-white shrink-0">
               <img src="/logo.png" alt="AL Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-base sm:text-xl tracking-wide uppercase whitespace-nowrap">AMANDA LAI<span className="text-[#a38a6a]">.</span></span>
          </div>

          {/* 桌面版導覽連結 (>= 768px 顯示) */}
          <div className="hidden md:flex items-center space-x-2 text-[14px] font-black uppercase tracking-widest text-gray-400">
            {['about', 'portfolio', 'experience', 'skills', 'courses'].map(item => (
              <a key={item} href={`#${item}`} className={`px-4 py-2 rounded-full transition-all duration-500 hover:text-[#121212] ${activeSection === item ? 'text-[#121212] bg-gray-50' : ''}`}>
                {item}
                {activeSection === item && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a38a6a]"></span>}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="mailto:amanda840604@gmail.com" className="hidden sm:inline-flex bg-[#121212] flex-shrink-0 text-white text-[14px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#a38a6a] transition-all items-center gap-2 active:scale-95 shadow-md whitespace-nowrap">
              CONTACT <ArrowRight size={14} />
            </a>

            {/* 行動版漢堡按鈕 (< 768px 顯示) */}
            <button
              type="button"
              aria-label="選單開關"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-11 h-11 rounded-full bg-gray-100 hover:bg-[#a38a6a]/10 flex items-center justify-center text-gray-800 hover:text-[#a38a6a] transition-colors duration-300 active:scale-90"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* 2.1 行動裝置抽屜式選單 (< 768px 展開) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[115] md:hidden">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* 抽屜式卡片選單 */}
          <div className="absolute top-28 left-6 right-6 bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in slide-in-from-top-4 duration-500 flex flex-col gap-2">
            <div className="text-xs font-bold tracking-widest text-[#a38a6a] uppercase px-4 pt-2 pb-1">
              Navigation Menu
            </div>
            {[
              { id: 'about', label: 'About / 關於個人' },
              { id: 'portfolio', label: 'Portfolio / 精選作品' },
              { id: 'experience', label: 'Experience / 經歷' },
              { id: 'skills', label: 'Skills / 專業技能' },
              { id: 'courses', label: 'Courses / 研習證明' }
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-[16px] font-bold tracking-wider transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-[#a38a6a] text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight size={18} className={activeSection === item.id ? 'text-white' : 'text-gray-400'} />
              </a>
            ))}
            
            <div className="border-t border-gray-100 mt-2 pt-4">
              <a
                href="mailto:amanda840604@gmail.com"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#121212] text-white text-[15px] font-black uppercase tracking-widest px-6 py-3.5 rounded-2xl hover:bg-[#a38a6a] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                CONTACT ME <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-8 py-24 sm:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px] h-[600px] sm:h-[900px] md:h-[1200px] bg-gradient-to-tr from-[#a38a6a]/10 via-white to-[#a38a6a]/5 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
        <Reveal direction="down">
          <div className="inline-flex items-center mt-16 sm:mt-24 md:mt-32 gap-3 px-5 sm:px-6 py-2 rounded-full bg-white border border-gray-100 text-[#a38a6a] text-xs sm:text-[14px] font-black tracking-widest uppercase mb-8 sm:mb-12 shadow-sm">
            PORTFOLIO 2026
          </div>
        </Reveal>
        <Reveal delay={200} className="w-full max-w-full px-2">
          <h1 
            className="w-full max-w-full text-4xl min-[390px]:text-[2.75rem] min-[440px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9.5rem] tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-12 flex flex-col items-center transition-transform duration-500 ease-out text-[#121212] select-none"
            style={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { transform: `translate(${-mousePos.x * 0.35}px, ${-mousePos.y * 0.35}px)` } : undefined}
          >
            <span className="font-black uppercase tracking-tight text-center">Sustainable</span>
            <span className="font-serif italic text-[#a38a6a] font-light mt-1 sm:-mt-2 md:-mt-4 lg:-mt-6 xl:-mt-8 ml-0 sm:ml-4 md:ml-8 lg:ml-16 xl:ml-20 opacity-90 text-center">Packaging.</span>
          </h1>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-base sm:text-lg md:text-2xl text-gray-500 max-w-[65ch] font-medium leading-[1.75] sm:leading-[1.85] mb-12 sm:mb-16 mx-auto px-2 text-balance">
            包裝設計專業深化 × 結構工程實務 <br className="hidden sm:block" /> 致力於在視覺美學與永續環保之間尋求平衡。
          </p>
        </Reveal>
        <Reveal delay={600}>
          <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})} className="group flex flex-col items-center gap-3 sm:gap-4">
             <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-[#a38a6a] to-transparent relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[slide_3s_infinite]"></div>
             </div>
             <span className="text-xs sm:text-[14px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 group-hover:text-[#a38a6a] transition-colors">Scroll To Explore</span>
          </button>
        </Reveal>
      </section>

      {/* 4. ABOUT SECTION */}
      
      
      <section id="about" className="px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36 border-t border-gray-100 bg-[#faf9f6]/40 text-[#121212]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 text-[#121212]">
          
          {/* 左側：PROFILE標題、選單與頭貼 */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6 sm:space-y-8">
            <Reveal direction="left">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 sm:w-10 h-[2px] bg-[#a38a6a]"></div>
                <h2 className="text-xs sm:text-[13px] font-black tracking-[0.35em] text-[#a38a6a] uppercase">
                  PROFILE
                </h2>
              </div>
              
              <h3 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.08] text-[#121212] mb-6 sm:mb-8">
                設計美學 × <br />
                <span className="text-[#a38a6a]">量產實務</span>
              </h3>

              {/* 4 大分類切換按鈕 */}
              <div className="space-y-2.5 sm:space-y-3 mb-8">
                {aboutTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeAboutTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAboutTab(tab.id)}
                      className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-[#a38a6a] text-white shadow-lg shadow-[#a38a6a]/25'
                          : 'bg-white/70 hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-100/90'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100/90 text-gray-500'
                      }`}>
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`font-bold text-sm sm:text-base leading-tight truncate ${isActive ? 'text-white' : 'text-gray-800'}`}>
                          {tab.label}
                        </div>
                        <div className={`text-[11px] sm:text-xs mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                          {tab.subLabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 個人照 Squircle 卡片 (無邊框，僅保留 Amanda Lai) */}
              <div className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-[2.2rem] sm:rounded-[2.5rem] overflow-hidden select-none shadow-xl shadow-stone-900/10 hover:shadow-2xl hover:shadow-[#a38a6a]/20 hover:-translate-y-1.5 transition-all duration-500">
                {/* 內部浮動動畫容器：延遲啟動確保放大過渡平滑 */}
                <div className="w-full h-full group-hover:[animation:image-float_4s_ease-in-out_infinite_0.4s]">
                  {/* 頭像圖片：無邊框滿版，預設黑白並於懸停時全彩微放大 */}
                  <img 
                    src="/Profolio_photo.jpg" 
                    alt="Amanda Lai" 
                    className="w-full h-full object-cover grayscale contrast-[1.02] group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700 ease-out" 
                  />
                </div>

                {/* 底部優雅漸層遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                {/* 底部僅保留 Amanda Lai */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 pointer-events-none">
                  <h5 className="text-base sm:text-lg font-black tracking-tight text-white leading-none drop-shadow-md">
                    Amanda Lai
                  </h5>
                </div>
              </div>
            </Reveal>
          </div>
          
          {/* 右側：選中的主題卡片內容 */}
          <div className="lg:col-span-8 flex flex-col justify-start text-[#121212]">
            <Reveal>
              {activeAboutTab === 'background' && (
                <div className="space-y-6 sm:space-y-8 text-[#121212]">
                  {/* 第一大卡片：設計背景 × 設計流程開發經驗 */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 md:p-10 text-[#121212]">
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/20 text-[#a38a6a] flex items-center justify-center shrink-0">
                        <GraduationCap size={22} className="text-[#a38a6a]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight">設計背景 × 設計流程開發經驗</h4>
                        <span className="text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mt-0.5">DESIGN BACKGROUND & FULL DEVELOPMENT EXPERIENCE</span>
                      </div>
                    </div>

                    <div className="space-y-6 text-sm sm:text-[15px] leading-relaxed">
                      <div>
                        <p className="text-gray-800 font-medium mb-2 leading-relaxed">
                          畢業於 <strong className="font-black text-gray-900">國立臺灣科技大學 工業設計系</strong>，擁有 6 年產品與包裝設計實務經驗，熟悉從外觀設計、結構開發到量產製程的完整開發流程。
                        </p>
                        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                          I graduated from <strong className="font-bold text-gray-700">National Taiwan University of Science and Technology</strong> with a degree in <strong className="font-bold text-gray-700">Industrial Design</strong>. With 6 years of experience in product and packaging design, I'm familiar with the full development process—from early concept and structure planning to mass production.
                        </p>
                      </div>

                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-gray-800 font-medium mb-2 leading-relaxed">
                          擅長品牌前期市場調研與定位分析，能根據產品需求進行 2D／3D 設計規劃，執行草模驗證、建模與工程圖繪製，並具備「<strong className="font-black text-gray-900">依照預算與成本條件調整設計策略的靈活應變能力</strong>」。
                        </p>
                        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                          I focus on brand research, positioning, and translating product needs into design solutions through 2D/3D design, prototyping, 3D modeling, and engineering drawings. I <strong className="font-bold text-gray-700">adapt design strategies based on cost and budget</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 第二大卡片：包裝設計專業深化 */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 md:p-10 text-[#121212]">
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/20 text-[#a38a6a] flex items-center justify-center shrink-0">
                        <Star size={22} className="text-[#a38a6a]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight">包裝設計專業深化</h4>
                        <span className="text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mt-0.5">PACKAGING DESIGN EXPERTISE</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed">
                      <p className="text-gray-800 font-medium leading-relaxed">
                        現任職於久鼎金屬實業股份有限公司，負責車載具及相關零件的包裝設計與開發，持續強化「<strong className="font-black text-gray-900">環保包裝結構設計、跨部門專案執行能力及開發實務經驗</strong>」。
                      </p>
                      <div className="space-y-1.5 text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                        <p>
                          Currently, I work at Merry Electronics Co., Ltd., designing packaging for international electronics brands, including TWS earbuds, gaming headsets, and soundbars.
                        </p>
                        <p>
                          I focus on <strong className="font-bold text-gray-700">sustainable packaging, cross-functional teamwork, and aligning design with manufacturing</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeAboutTab === 'experience' && (
                <div className="space-y-6 sm:space-y-8 text-[#121212]">
                  {/* 第一張卡片：包裝設計領域 (Image 3) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 md:p-10 text-[#121212]">
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/20 text-[#a38a6a] flex items-center justify-center shrink-0">
                        <Box size={22} className="text-[#a38a6a]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight">包裝設計領域</h4>
                        <span className="text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mt-0.5">PACKAGING DESIGN MASTERY</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 sm:pt-8 space-y-8 sm:space-y-10">
                      {/* Item 1 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <CheckCircle2 size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div className="w-full min-w-0">
                          <h5 className="text-base sm:text-[17px] font-black text-gray-900 leading-snug">
                            國際品牌 TWS／HDT／Soundbar 包裝設計提案 (共25件)
                          </h5>
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-wider uppercase block mt-0.5 mb-2.5">
                            PACKAGING PROPOSALS FOR INTERNATIONAL BRANDS (25 PROJECTS)
                          </span>
                          <div className="space-y-1.5 text-sm sm:text-[15px] text-gray-700 leading-relaxed font-medium mb-3">
                            <p>
                              根據產品定位提出多元價位（低／中／高）包裝設計方案，滿足不同市場需求與品牌策略。
                            </p>
                            <p>
                              在消費性電子產品 RFQ 階段，主導包裝結構設計、2D 工程圖繪製與初步成本分析。
                            </p>
                          </div>
                          <div className="space-y-1 text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                            <p>
                              Formulated packaging proposals for Tier-1 international brand audio products (TWS, Headsets, Soundbars). Engineered segmented packaging architecture across multiple price tiers to meet diverse market demands and brand strategies.
                            </p>
                            <p>
                              Spearheaded structural packaging engineering, 2D drafting, and preliminary cost analysis during the RFQ stage for consumer electronics.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <CheckCircle2 size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div className="w-full min-w-0">
                          <h5 className="text-base sm:text-[17px] font-black text-gray-900 leading-snug">
                            建立包裝設計資料庫以及市調資料表 (共6件)
                          </h5>
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-wider uppercase block mt-0.5 mb-2.5">
                            PACKAGING DESIGN DATABASE & MARKET RESEARCH (6 DATASETS)
                          </span>
                          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed font-medium mb-3">
                            彙整 TWS、HDT、Soundbar 紙卡內襯結構規格，形成模組化資料庫，改善專案提案效率，精準對焦市場需求。
                          </p>
                          <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                            Standardized and modularized paper insert structures across TWS, headsets, and soundbars into a comprehensive design database, significantly boosting proposal turnaround speed and pinpoint market calibration.
                          </p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <CheckCircle2 size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div className="w-full min-w-0">
                          <h5 className="text-base sm:text-[17px] font-black text-gray-900 leading-snug">
                            參與 HDT 電競耳機開發專案 (共2件)
                          </h5>
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-wider uppercase block mt-0.5 mb-2.5">
                            GAMING HEADSET DEVELOPMENT PROJECTS (2 MODELS)
                          </span>
                          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed font-medium mb-3">
                            實際參與兩款 HyperX 電競耳機機型開發，累積從結構設計、打樣修正到量產導入的完整開發經驗。
                          </p>
                          <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                            Actively co-developed two HyperX flagship gaming headsets, acquiring comprehensive hands-on mastery spanning structural modeling, prototype validation, and volume production rollout.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 第二張卡片：產品設計與跨部門協作 (Image 4) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 md:p-10 text-[#121212]">
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/20 text-[#a38a6a] flex items-center justify-center shrink-0">
                        <MonitorSmartphone size={22} className="text-[#a38a6a]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight">產品設計與跨部門協作</h4>
                        <span className="text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mt-0.5">PRODUCT DESIGN & CROSS-FUNCTIONAL SYNERGY</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 sm:pt-8 space-y-8 sm:space-y-10">
                      {/* Item 1 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Layers size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <h5 className="text-base font-black text-gray-900 mb-1.5">主導廚電產品開發</h5>
                          <p className="text-sm text-gray-700 font-medium mb-1.5 leading-relaxed">
                            主導易清系列檯面爐（G2522AG、G2623AG）與近吸式油煙機（R7610、R7650）完整開發流程。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Led full-cycle development of easy-clean gas cooktops (G2522AG, G2623AG) and incline range hoods (R7610, R7650).
                          </p>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Award size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <h5 className="text-base font-black text-gray-900 mb-1.5">獲獎與產品落地</h5>
                          <p className="text-sm text-gray-700 font-medium mb-1.5 leading-relaxed">
                            親自承辦金點設計競賽提案並獲得 2 件入選（R3750B、P0233／235）；協助外觀與結構開發並導入量產流程，成功落地產品。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Won Golden Pin Design Award selections for 2 projects (R3750B, P0233/235); coordinated industrial styling and engineering to ensure successful commercialization.
                          </p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Users size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <h5 className="text-base font-black text-gray-900 mb-1.5">供應商協作能力</h5>
                          <p className="text-sm text-gray-700 font-medium mb-1.5 leading-relaxed">
                            能與供應商與工廠密切協作，確保設計順利導入量產並維持品質穩定。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Collaborated seamlessly with tooling suppliers and assembly lines, guaranteeing flawless tooling handover and robust quality consistency.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeAboutTab === 'career' && (
                <div className="space-y-6 sm:space-y-8 text-[#121212]">
                  {/* 第一張卡片：短期目標 (Image 2 top) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 md:p-10 text-[#121212]">
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/20 text-[#a38a6a] flex items-center justify-center shrink-0">
                        <Flag size={22} className="text-[#a38a6a]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight">短期目標</h4>
                        <span className="text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mt-0.5">SHORT-TERM STRATEGIC GOALS</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
                      {/* Item 1 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Leaf size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-relaxed mb-1.5">
                            深入 ESG 永續議題，探索各類紙材、布料等 CMF 特性與加工技術，建立應用知識庫，並與供應商合作開發環保材質。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Deep-dive into ESG sustainability, exploring CMF characteristics and processing techniques of paper and fabrics to build knowledge bases and co-develop eco-friendly materials with suppliers.
                          </p>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Box size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-relaxed mb-1.5">
                            強化紙材結構設計能力，目標能提出具創新性的設計專利。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Elevate paper structural engineering, targeting the filing and grant of innovative structural design patents.
                          </p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Cpu size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-relaxed mb-1.5">
                            培養紙材成本評估能力，根據需求提出兼顧保護性與成本效益的結構優化方案。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Cultivate rigorous packaging cost evaluation to formulate optimized structural designs that seamlessly balance superior protection with high cost-efficiency.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 第二張卡片：中長期目標 (Image 2 bottom) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 md:p-10 text-[#121212]">
                    <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/20 text-[#a38a6a] flex items-center justify-center shrink-0">
                        <Rocket size={22} className="text-[#a38a6a]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight">中長期目標</h4>
                        <span className="text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mt-0.5">MID- TO LONG-TERM VISION</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
                      {/* Item 1 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Globe size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-relaxed mb-1.5">
                            累積跨國與跨部門合作經驗，強化英文聽說讀寫的能力以應對全球化的工作需求。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Amplify multinational and cross-departmental collaboration, continually advancing professional English fluency to thrive in global organizations.
                          </p>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <Award size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-relaxed mb-1.5">
                            持續提升設計落地與製程協作能力，累積更多實戰開發經驗。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Continually advance design realization and manufacturing execution, deepening hands-on hardware development expertise.
                          </p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <TrendingUp size={20} className="text-[#a38a6a] shrink-0 mt-1" />
                        <div>
                          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-relaxed mb-1.5">
                            建立包裝設計與市場趨勢的連結敏感度，結合行銷視角強化整合能力，朝向具策略思維的設計開發整合型人才邁進。
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Bridge packaging innovation with commercial market trends and marketing insights, advancing into an integrative design strategist with high business impact.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeAboutTab === 'philosophy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#121212]">
                  {/* Card 1: 兼具感性與理性 (Image 1 top left) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/15 text-[#a38a6a] flex items-center justify-center shrink-0 mb-6">
                        <Scale size={22} className="text-[#a38a6a]" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-1">兼具感性與理性</h4>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mb-4">BALANCE EMOTION & LOGIC</span>
                      <p className="text-sm sm:text-[14px] text-gray-800 font-medium leading-relaxed mb-3">
                        設計不僅是創造視覺與情感價值，更必須考量製程可行性、技術限制、成本控制與品質穩定性。
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Design must deliver emotional resonance while strictly honoring manufacturing feasibility, cost parameters, and production stability.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: 服務於產品與使用者 (Image 1 top right) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/15 text-[#a38a6a] flex items-center justify-center shrink-0 mb-6">
                        <UserCheck size={22} className="text-[#a38a6a]" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-1">服務於產品與使用者</h4>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mb-4">FORM FOLLOWS FUNCTION</span>
                      <p className="text-sm sm:text-[14px] text-gray-800 font-medium leading-relaxed mb-3">
                        我重視產品本質，關注設計如何實際提升使用者的便利性與品牌價值，讓設計發揮功能性與影響力。
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Rooted in product essence, ensuring design genuinely enhances user convenience and delivers enduring brand value and tangible impact.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: 重視跨部門協作效率 (Image 1 bottom left) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/15 text-[#a38a6a] flex items-center justify-center shrink-0 mb-6">
                        <MessageSquare size={22} className="text-[#a38a6a]" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-1">重視跨部門協作效率</h4>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mb-4">TEAMWORK & SYNERGY</span>
                      <p className="text-sm sm:text-[14px] text-gray-800 font-medium leading-relaxed mb-3">
                        良好的設計來自良好的協作，我樂於與不同角色協同合作，透過積極溝通整合各方需求與資源。
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Superior designs originate from seamless collaboration, uniting diverse stakeholders through proactive communication and resource integration.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: 保持熱情與學習動能 (Image 1 bottom right) */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-[#a38a6a]/80 text-white flex items-center justify-center shrink-0 mb-6">
                        <Flame size={22} className="text-white" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-1">保持熱情與學習動能</h4>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#a38a6a] tracking-widest uppercase block mb-4">STAY CURIOUS & DRIVEN</span>
                      <p className="text-sm sm:text-[14px] text-gray-800 font-medium leading-relaxed mb-3">
                        對我而言，設計不只是工作，更是一種持續探索的過程。我始終懷抱熱情與好奇心，樂於在團隊中貢獻專業，一同創造實質價值。
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Design is an ongoing journey of exploration; maintaining continuous curiosity and passion to co-create measurable, real-world value.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>



      {/* 5. PORTFOLIO */}
      <section id="portfolio" className="px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-40 bg-[#f9f9f9] text-[#121212]">
        <div className="max-w-7xl mx-auto w-full">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-24 border-b border-gray-200 pb-8 sm:pb-12">
            <div>
              <h2 className="text-xs sm:text-[14px] font-black tracking-[0.4em] sm:tracking-[0.5em] text-[#a38a6a] uppercase mb-4 sm:mb-6">Works</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-[#121212]">Projects.</h3>
            </div>
            <p className="text-xs sm:text-[14px] font-black text-gray-400 uppercase tracking-widest mt-4 md:mt-0 text-[#121212]">Design Mastery × Core Focus</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 text-[#121212]">
          {Object.entries({ Packaging: '包裝設計', Product: '產品設計', Graphic: '平面設計' }).map(([key, label], idx) => (
            <Reveal key={key} delay={idx * 200}>
               <SpotlightCard className="group/card flex flex-col h-full bg-white text-[#121212] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[2.5rem] lg:rounded-[3.5rem] shadow-xl hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-700 overflow-hidden">
                  <div className="aspect-square overflow-hidden relative bg-white border-b border-gray-50 p-3 sm:p-5 md:p-4 lg:p-6">
                     <img src={key === 'Packaging' ? "/tws_pkg_design11111.jpg" : key === 'Product' ? "/sleep_monitor_device01-1.jpg" : "/graphic_design02-1.jpg"} alt={key} className="w-full h-full object-contain grayscale opacity-90 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000" />
                  </div>
                  <div className="p-5 sm:p-7 md:p-4 lg:p-8 xl:p-12 flex flex-col items-center text-center flex-grow text-[#121212]">
                     <h4 className="text-2xl sm:text-3xl md:text-xl min-[900px]:text-2xl lg:text-4xl xl:text-5xl font-black uppercase mb-1.5 sm:mb-3 tracking-tighter truncate max-w-full">{key}</h4>
                     <p className="text-xs sm:text-sm md:text-xs lg:text-base font-bold text-[#a38a6a] tracking-wider mb-5 sm:mb-8 flex-grow uppercase">{label}</p>
                     <button onClick={() => { setActiveCategory(key); setActiveFilter(key === 'Packaging' ? '全部包裝' : key === 'Product' ? '全部產品' : '全部平面'); }} className="group/btn flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-2 lg:gap-3 w-full pt-4 sm:pt-6 border-t border-gray-100 transition-all text-[#121212]">
                        <span className="text-xs sm:text-sm md:text-xs min-[900px]:text-sm lg:text-base font-black uppercase tracking-wider whitespace-nowrap">Explore Collection</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 sm:group-hover/btn:translate-x-2 transition-transform shrink-0" />
                     </button>
                  </div>
               </SpotlightCard>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* 6. EXPERIENCE (重新規劃為單一垂直演進流) */}
      <section id="experience" className="px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-40 bg-[#f9f9f9] text-[#121212]">
        <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16 sm:mb-24 md:mb-32">
             <h2 className="text-xs sm:text-[14px] font-black tracking-[0.4em] sm:tracking-[0.6em] text-[#a38a6a] uppercase mb-4 sm:mb-6">Chronicles</h2>
             <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter">Evolution Path.</h3>
          </div>
        </Reveal>
        
        <div className="relative space-y-8 sm:space-y-12">
          {/* 中間導引線 */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#a38a6a]/40 via-gray-100 to-transparent -translate-x-1/2 hidden md:block"></div>

          {/* 專業經歷與基礎教育 (整合為單一連續主軸) */}
          {[
            { company: "久鼎金屬實業股份有限公司", title: "包裝設計工程師", date: "2025.08 - PRESENT", duration: "仍在職", location: "彰化縣秀水鄉・自行車及其零件製造業 500人+", responsibilities: ["減塑全紙化包裝設計提案", "包裝廠商樣品追蹤、品質問題改善確認", "落摔測試與包裝設計結構調整"], achievements: ["自行車零件（車把手、座管、立管、快拆束仔等）共 21 款全紙包裝設計提案", "車把手尾數箱品質異常問題解決（評估全紙填充材機台）"], tools: ["減塑全紙化", "結構調整", "落摔測試", "包裝設計"], type: "work", icon: Briefcase, image: "/tranzx-logo-vector.png" },
            { company: "美律實業股份有限公司", title: "包裝工程師", date: "2022.07 - 2025.05", duration: "2年11個月", location: "台中市南屯區・精密儀器製造業 500人+", responsibilities: ["消費性電子產品包裝開發工作", "新機型產品包材圖面繪製、包裝作業流程製作", "包裝廠商樣品追蹤、品質問題改善確認"], achievements: ["國際品牌 TWS / HDT / Soundbar 包裝設計提案（共 25 件）", "根據產品定位提出多元價位（低／中／高）包裝設計方案，滿足不同市場需求與品牌策略", "在消費性電子產品 RFQ 階段，主導包裝結構設計、2D 工程圖繪製與初步成本分析"], tools: ["Creo", "產品開發", "產品結構評估", "包裝設計"], type: "work", icon: Briefcase, image: "/merry_logo.jpg" },
            { company: "台灣櫻花股份有限公司", title: "產品設計師", date: "2020.03 - 2022.07", duration: "2年5個月", location: "台中市大雅區・廚電製造業 500人+", responsibilities: ["針對 PM 市場規劃結合消費者調查擬定設計方向", "跨部門協作與國內外廚電市場及造型趨勢調研"], achievements: ["榮獲 2021 年度績優員工", "主導易清檯面爐 G2522AG、G2623AG 上市", "優化清潔設計與旋鈕造型"], tools: ["Creo", "Photoshop", "Illustrator", "KeyShot"], type: "work", icon: Briefcase, image: "/sakura_logo.png" },
            { company: "上岳科技股份有限公司", title: "產品設計師", date: "2018.11 - 2019.12", duration: "1年2個月", location: "台中市南屯區・醫療器材製造業 30-100人", responsibilities: ["新品提案與簡報製作", "依據 RD 模組進行產品設計提案 (含視覺、材質、風格)", "產品造型設計與機構討論"], achievements: ["低周波治療器 2 款外觀提案", "兒童用霧化器外觀提案", "SPO2 手環 5 款外觀提案"], tools: ["SolidWorks", "Illustrator", "Photoshop", "KeyShot", "機構設計"], type: "work", icon: Briefcase, image: "/emg_logo.png" },
            { company: "研成股份有限公司", title: "產品設計師", date: "2017.08 - 2018.08", duration: "1年1個月", location: "新北市新店區・設計相關業 30-100人", responsibilities: ["新品提案與簡報製作", "依據 RD 提供模組進行產品造型設計提案"], achievements: ["獨立負責日本學研 GAKKEN 委託之鋁製品設計案", "研發多合一 solar 新產品 & 彩盒設計規劃", "協助 2018 年度 12in1 solar 產品色彩配置"], tools: ["Illustrator", "Photoshop", "KeyShot", "包裝設計", "提案簡報"], type: "work", icon: Briefcase, image: "/cic-logo.png.png" },
            { company: "國立臺灣科技大學", title: "工業設計系 / 大學畢業", date: "2013 - 2017", duration: "基礎教育", location: "台北市", responsibilities: ["深耕結構工程與美學邏輯，奠定系統化產品開發思維。"], achievements: [], tools: ["工業設計", "產品開發", "系統化邏輯"], type: "edu", icon: GraduationCap, image: "/ntust_logo.jpg" },
            { company: "國立臺中高工", title: "圖文傳播科 / 高職畢業", date: "2010 - 2013", duration: "基礎教育", location: "台中市", responsibilities: ["啟蒙於平面美學與印刷技術，掌握刀模與色彩控制精髓。"], achievements: [], tools: ["平面設計", "印刷工程", "色彩學"], type: "edu", icon: LayoutGrid, image: "/tcivs_logo.jpg" }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
            <Reveal key={idx} delay={idx * 150} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 w-full">
                  <SpotlightCard className={`p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 fluid-anim ${item.type === 'edu' ? 'bg-gray-50/50' : 'bg-white'}`}>
                    <div className={`${item.type === 'work' ? 'border-b border-gray-100 pb-5 sm:pb-6 mb-5 sm:mb-6' : 'mb-4'}`}>
                      <div className="flex justify-between items-start mb-3 sm:mb-4 gap-3 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[14px] font-black tracking-widest uppercase mb-2 sm:mb-3">
                            <span className="text-[#a38a6a]">{item.date}</span>
                            <span className="text-gray-200">|</span>
                            <span className="text-gray-400">{item.duration}</span>
                          </div>
                          <h4 className={`text-xl sm:text-2xl lg:text-3xl font-black text-[#121212] mb-1.5 sm:mb-2 tracking-tighter break-words ${item.type === 'edu' ? 'opacity-80' : ''}`}>{item.company}</h4>
                          <p className="text-xs sm:text-sm font-bold text-[#a38a6a] tracking-widest leading-relaxed">{item.title}</p>
                        </div>
                        {/* Logo Image Rendering */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 p-2 bg-white/50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group-hover:scale-110 fluid-anim">
                          <div className="absolute inset-0 bg-[#a38a6a] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                          {item.image ? (
                             <img src={item.image} alt={item.company} className="w-full h-full object-contain relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500 mix-blend-multiply" />
                          ) : (
                             <IconComponent size={22} className="text-[#a38a6a] css-mask-logo relative z-10" />
                          )}
                        </div>
                      </div>
                      {item.type === 'work' && <p className="text-xs sm:text-[14px] font-bold text-gray-400 flex items-center gap-1.5 tracking-wider"><MapPin size={12} className="text-gray-300 shrink-0"/> {item.location}</p>}
                    </div>

                    <div className="space-y-5 sm:space-y-6">
                      <div>
                        {item.type === 'work' && <h5 className="text-xs sm:text-[14px] font-black text-[#a38a6a] uppercase tracking-[0.2em] mb-2.5 sm:mb-3">Core Responsibilities</h5>}
                        <ul className={`list-disc space-y-1.5 sm:space-y-2 marker:text-gray-300 ${item.type === 'work' ? 'pl-4' : 'pl-0 list-none'}`}>
                          {item.responsibilities.map(res => (
                            <li key={res} className="text-[13px] sm:text-[14px] text-gray-600 font-medium leading-[1.75] sm:leading-[1.8] max-w-[55ch]">{res}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {item.achievements.length > 0 && (
                        <div>
                          <h5 className="text-xs sm:text-[14px] font-black text-[#a38a6a] uppercase tracking-[0.2em] mb-3 sm:mb-4 mt-2">Key Achievements</h5>
                          <div className="flex flex-col gap-2.5 sm:gap-3">
                            {item.achievements.map(ach => (
                              <div key={ach} className="flex items-start gap-2.5 sm:gap-3">
                                <CheckCircle size={15} className="text-[#a38a6a] shrink-0 mt-[4px]" strokeWidth={2.5}/>
                                <span className="text-[13px] sm:text-[14px] text-gray-700 font-medium leading-[1.75] sm:leading-[1.8] max-w-[55ch]">{ach}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#a38a6a]/10">
                      {item.tools.map(tool => (
                        <span key={tool} className="text-xs sm:text-[14px] font-black px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg text-gray-500 hover:text-white hover:bg-[#a38a6a] hover:shadow-lg hover:shadow-[#a38a6a]/40 transition-all uppercase fluid-anim cursor-default">{tool}</span>
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
      <section id="skills" className="px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-40 border-t border-gray-50 text-[#121212]">
        <div className="max-w-7xl mx-auto w-full text-[#121212]">
        <Reveal>
           <h2 className="text-xs sm:text-[14px] font-black tracking-[0.4em] sm:tracking-[0.5em] text-[#a38a6a] uppercase mb-12 sm:mb-16 md:mb-24 text-center">Mastery Skills & Tools</h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
           {[
             { id: '01', title: '市場調研與定位分析', icon: LayoutGrid, en: 'Market Research & Strategy', desc: '擅長設計前期的競品蒐集並針對該品牌定位分析，總結設計規畫方向。', tags: ['競品分析', '產品策略', '產品定位', '市場調查資料分析', '報告撰寫與提案'] },
             { id: '02', title: '2D 品牌視覺整合與簡報提案', icon: FileCheck, en: 'Graphic Design & Branding', desc: '擅長整合包裝結構與品牌識別，製作具專業感與說服力的提案簡報。', tags: ['Adobe InDesign', 'Illustrator', 'Photoshop', '電腦排版設計', '設計印刷基本認知', '電腦印前設計'] },
             { id: '03', title: '3D 建模與結構模擬', icon: Box, en: '3D Modeling & Engineering', desc: '能快速建構產品結構模型並進行裝配模擬，支援從設計構想至工程的溝通。', tags: ['Creo', 'SolidWorks', 'Rhino', 'Keyshot', '產品結構評估', '3D 渲染'] },
             { id: '04', title: '包裝材料選用與 BOM 建立', icon: Layers, en: 'Packaging & BOM', desc: '熟悉泡殼、瓦楞紙卡、紙托等常用包材特性，依需求提出優化方案。', tags: ['瓦楞紙結構', '包裝材料選用', '工程圖繪製', 'BOM 建立'] },
             { id: '05', title: '打樣實作與設計驗證能力', icon: CheckCircle, en: 'Prototyping & Validation', desc: '善用割樣機進行結構模擬與快速打樣，快速驗證設計可行性。', tags: ['打樣機操作', '結構模擬', '快速打樣', '設計驗證', 'CMF 樣板製作'] }
           ].map((skill, idx) => (
             <Reveal key={idx} delay={idx * 150} className={idx === 4 ? "lg:col-span-2" : ""}>
                <SpotlightCard className="p-6 sm:p-8 md:p-10 group rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] h-full flex flex-col hover:border-[#a38a6a]/30 transition-all bg-white text-[#121212]">
                   <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#a38a6a]/10 flex items-center justify-center text-[#a38a6a] transition-transform group-hover:scale-110 duration-500 shrink-0">
                        <skill.icon size={24} className="sm:w-7 sm:h-7" />
                      </div>
                      <p className="text-xs sm:text-[14px] font-black tracking-widest text-[#a38a6a] uppercase text-right">{skill.en}</p>
                   </div>
                   <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 tracking-tight leading-snug group-hover:text-[#a38a6a] transition-colors">{skill.title}</h4>
                   <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium leading-[1.75] sm:leading-[1.8] mb-6 sm:mb-10 flex-grow">{skill.desc}</p>
                   <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[#121212]">
                     {skill.tags.map(t => (
                       <span key={t} className="text-xs sm:text-[14px] font-black px-3 sm:px-4 py-1.5 bg-gray-50 text-gray-500 rounded-lg hover:text-white hover:bg-[#a38a6a] hover:shadow-lg hover:shadow-[#a38a6a]/40 transition-all fluid-anim uppercase">{t}</span>
                     ))}
                   </div>
                </SpotlightCard>
             </Reveal>
           ))}
        </div>
        
        <Reveal delay={300}>
           <div className="bg-[#121212] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16 border-b border-white/10 pb-6 sm:pb-10">
                   <h4 className="font-serif italic text-3xl sm:text-4xl text-[#a38a6a]">Software Tools</h4>
                   <p className="text-xs sm:text-[14px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-white/50 uppercase">Design & Engineering Mastery</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
                   {[
                     { name: 'SolidWorks', img: '/solidworks_logo.jpg' },
                     { name: 'Creo', img: '/creo_logo.jpg' },
                     { name: 'KeyShot', img: '/keyshot-logo-2.jpg' },
                     { name: 'Illustrator', img: '/illustrator.jpg' },
                     { name: 'Photoshop', img: '/photoshop_logo.jpg' },
                     { name: 'InDesign', img: '/Indesign_logo.png' },
                     { name: 'AutoCAD', img: '/autocad_logo.jpg' }
                   ].map(tool => (
                     <div key={tool.name} className="flex flex-col items-center gap-3 sm:gap-4 bg-white/5 py-6 sm:py-8 rounded-2xl sm:rounded-[2rem] hover:bg-[#a38a6a]/20 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all cursor-pointer border border-transparent hover:border-[#a38a6a]/30 group">
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
      <section id="courses" className="px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-40 bg-[#fdfdfd] text-[#121212]">
        <div className="max-w-7xl mx-auto w-full">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 md:mb-24 gap-5 sm:gap-6">
            <div>
              <h2 className="text-xs sm:text-[14px] font-black tracking-[0.4em] sm:tracking-[0.5em] text-[#a38a6a] uppercase mb-2 sm:mb-6 text-[#a38a6a]">Learning Path</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-[#121212]">Growth.</h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto text-[#121212]">
              {['全部', 'AI應用課程', '包裝專業課程'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setActiveCourseFilter(f)} 
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-black uppercase tracking-wider transition-all shadow-sm ${
                    activeCourseFilter === f 
                      ? 'bg-[#a38a6a] text-white shadow-md shadow-[#a38a6a]/20' 
                      : 'bg-white text-gray-500 hover:text-[#121212] border border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {f} <span className="ml-1 opacity-60">({getCourseFilterCount(f)})</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 text-[#121212]">
           {filteredCourses.map((course, idx) => (
             <CourseCard key={course.id} course={course} delay={idx * 150} />
           ))}
        </div>
        </div>
      </section>

      {/* 9. INTERESTS */}
      <section id="interests" className="px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-40 bg-white text-[#121212]">
        <div className="max-w-7xl mx-auto w-full">
        <Reveal><h2 className="text-xs sm:text-[14px] font-black tracking-[0.4em] sm:tracking-[0.5em] text-[#a38a6a] uppercase mb-12 sm:mb-16 md:mb-24 text-center">Lifestyle Beyond Work</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
           {[
             { title: '重量訓練', en: 'Fitness', icon: Dumbbell, goal: '目前每週2練，目標4練', desc: '訓練耐力與自律，堅持每一步小幅進步。', img: "/fitness.jpg" },
             { title: '馬拉松', en: 'Marathon', icon: Timer, goal: '5次半馬，目標全馬', desc: '不只是體能，更是對堅持信念的終極挑戰。', img: "/marathon.jpg" },
             { title: '登山挑戰', en: 'Hiking', icon: Mountain, goal: '登頂2座百岳，持續挑戰', desc: '在山林間對話，尋找自我探索與放鬆的途徑。', img: "/mountain.jpg" }
           ].map((item, idx) => (
             <Reveal key={idx} delay={idx * 150}>
                <SpotlightCard className="h-full flex flex-col hover:shadow-2xl transition-all duration-700 text-[#121212] rounded-[2.5rem] sm:rounded-[3rem] group bg-white border-0">
                   <div className="h-64 sm:h-80 md:h-[28rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out relative text-[#121212] bg-white">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent group-hover:opacity-40 transition-opacity duration-1000"></div>
                   </div>
                   <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-grow relative bg-white -mt-10 sm:-mt-12 mx-4 sm:mx-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-6 text-[#121212] group-hover:-translate-y-2 sm:group-hover:-translate-y-4 transition-transform duration-700 ease-out">
                      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8 text-[#121212]">
                         <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#a38a6a]/10 flex items-center justify-center text-[#a38a6a] shadow-inner text-[#121212] shrink-0"><item.icon size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} /></div>
                         <div className="min-w-0"><h4 className="text-lg sm:text-xl font-black tracking-tight text-[#121212] truncate">{item.title}</h4><p className="text-xs sm:text-[14px] font-black uppercase tracking-widest text-gray-300">{item.en}</p></div>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#a38a6a] mb-3 sm:mb-4 leading-relaxed">{item.goal}</p>
                      <p className="text-[13px] sm:text-[14px] text-gray-400 font-medium leading-relaxed text-[#121212]">{item.desc}</p>
                   </div>
                </SpotlightCard>
             </Reveal>
           ))}
        </div>
        </div>
      </section>

      {/* 10. CLOSING & FOOTER */}
      <footer id="contact" className="bg-[#121212] pt-20 sm:pt-28 md:pt-40 pb-16 sm:pb-20 text-white px-5 sm:px-8 md:px-16 lg:px-24">
        <Reveal>
          <div className="max-w-4xl mx-auto mb-20 sm:mb-28 md:mb-32 text-center px-2 sm:px-4">
            <p className="text-[#a38a6a] font-black text-xs sm:text-[14px] tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6 sm:mb-12">Closing Statement</p>
            <div className="space-y-6 sm:space-y-8">
              <p className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight">非常感謝您的閱讀。</p>
              <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-400 leading-relaxed max-w-2xl mx-auto">如有進一步了解的需要，歡迎隨時與我聯繫。</p>
              <p className="text-base sm:text-xl md:text-2xl text-[#a38a6a] font-serif italic leading-relaxed pt-2 sm:pt-4">
                若有幸符合貴公司徵才條件，<br />
                我將十分期待有機會參與正式面試，<br />
                為團隊帶來我的熱情與專業。
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="down">
          <div className="text-center mb-20 sm:mb-28 md:mb-40 border-t border-white/5 pt-16 sm:pt-24 md:pt-32">
             <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-10 sm:mb-16 md:mb-20 leading-[0.9] sm:leading-[0.8]">Let's Build <br /><span className="font-serif italic text-[#a38a6a]">Something.</span></h2>
             <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 w-full max-w-xl md:max-w-none mx-auto">
                <a href="mailto:amanda840604@gmail.com" className="w-full sm:w-auto text-center justify-center group bg-white text-[#121212] px-8 sm:px-14 py-4 sm:py-7 rounded-full font-black text-xs sm:text-[14px] uppercase tracking-[0.2em] sm:tracking-[0.4em] hover:bg-[#a38a6a] hover:text-white transition-all flex items-center gap-3 sm:gap-5 shadow-2xl active:scale-95"><Mail size={20} className="sm:w-6 sm:h-6 shrink-0" /> <span className="truncate">AMANDA840604@GMAIL.COM</span></a>
                <div className="flex gap-4 sm:gap-6">
                   <a href="tel:0918190990" className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-[#a38a6a] transition-all group active:scale-90"><Phone size={22} className="sm:w-7 sm:h-7" /></a>
                   <a href="https://line.me/ti/p/fk-CFFKYiU" target="_blank" rel="noopener noreferrer" className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-[#06C755] transition-all group active:scale-90"><MessageCircle size={22} className="sm:w-7 sm:h-7" /></a>
                </div>
             </div>
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-between items-center py-10 sm:py-16 border-t border-white/5 text-xs sm:text-[14px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white">
          <p className="text-white opacity-50 text-center md:text-left">© 2026 AMANDA LAI. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap gap-8 mt-6 md:mt-0 text-white justify-center">
             <a href="https://line.me/ti/p/fk-CFFKYiU" target="_blank" rel="noopener noreferrer" className="hover:text-[#a38a6a] transition-colors flex items-center gap-2">
                <MessageCircle size={18} />
                LINE 聯繫
             </a>
          </div>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {activeCategory && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto animate-in fade-in duration-500 text-[#121212]">
          <div className="sticky top-0 z-[210] bg-white/95 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-8 md:px-24 py-3.5 sm:py-5 md:py-8 flex justify-between items-center text-[#121212]">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <h2 className="text-lg sm:text-2xl md:text-4xl font-black uppercase tracking-tight text-[#121212] truncate">
                {activeCategory} <span className="text-[#a38a6a] font-normal italic lowercase font-serif ml-1 sm:ml-2 text-xs sm:text-lg md:text-2xl">Collection</span>
              </h2>
            </div>
            <button 
              onClick={() => setActiveCategory(null)} 
              className="group flex items-center gap-1.5 sm:gap-3 bg-[#121212] text-white px-3.5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full hover:bg-[#a38a6a] transition-all active:scale-90 shadow-xl shrink-0"
              aria-label="關閉作品藝廊"
            >
              <span className="text-xs sm:text-[14px] font-black uppercase tracking-wider hidden sm:inline">Close Gallery</span>
              <span className="text-xs font-black uppercase tracking-wider sm:hidden">關閉</span>
              <X size={16} className="sm:w-5 sm:h-5 shrink-0" />
            </button>
          </div>
          <div className="px-4 sm:px-8 md:px-24 py-6 sm:py-12 md:py-20 max-w-7xl mx-auto w-full text-[#121212]">
            {currentFilterOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-12 md:mb-16">
                {currentFilterOptions.map(f => (
                  <button 
                    key={f} 
                    onClick={() => setActiveFilter(f)} 
                    className={`px-3.5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-black uppercase tracking-wider transition-all shadow-sm ${
                      activeFilter === f 
                        ? 'bg-[#121212] text-white shadow-md' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'
                    }`}
                  >
                    {f} <span className="ml-1 opacity-50">({getFilterCount(activeCategory, f)})</span>
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
              {filteredProjects.map((proj, i) => (
                 <div key={proj.id} onClick={() => setSelectedProject(proj)} className="group/item flex flex-col cursor-pointer bg-white rounded-[2rem] sm:rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                   <div className="w-full flex items-center justify-center overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem] bg-white relative p-4 aspect-[3/2]">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-contain transition-all duration-1000 group-hover/item:scale-[1.05]" />
                   </div>
                   <div className="px-6 sm:px-10 pb-6 sm:pb-10 pt-3 sm:pt-4 flex-grow flex flex-col justify-end">
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                         <h4 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">{proj.title}</h4>
                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover/item:text-[#a38a6a] group-hover/item:border-[#a38a6a] transition-all shrink-0 ml-3 sm:ml-4"><ExternalLink size={18} /></div>
                      </div>
                      {proj.desc && (
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-medium line-clamp-2">
                          {proj.desc}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {proj.tags.map(tag => (<span key={tag} className="text-[11px] sm:text-[12px] font-black uppercase px-3 sm:px-4 py-1 sm:py-1.5 bg-[#a38a6a]/10 rounded-full text-[#a38a6a] tracking-widest">{tag}</span>))}
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
        <div className="fixed inset-0 z-[300] flex justify-center items-center p-2 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-[#121212]/80 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-7xl h-[94vh] md:h-full max-h-[94vh] md:max-h-full rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-500 cubic-bezier">
            
            {/* Header & Close */}
            <div className="flex-shrink-0 flex items-center justify-between p-5 sm:p-8 md:p-10 border-b border-gray-100 z-10 sticky top-0 bg-white/95 backdrop-blur-md rounded-t-[1.5rem] sm:rounded-t-[2rem] gap-4">
               <div className="flex flex-col min-w-0">
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#121212] truncate">{selectedProject.title}</h3>
                  <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-4 flex-wrap">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-xs sm:text-[14px] font-bold text-[#a38a6a] bg-[#a38a6a]/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
               </div>
               <button onClick={() => setSelectedProject(null)} className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors group shrink-0">
                 <X size={20} className="sm:w-6 sm:h-6 text-gray-500 group-hover:text-[#121212] transition-colors" />
               </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-8 md:p-12 custom-scrollbar bg-[#fdfdfd]">
               <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
                 {/* 專案文字簡介 */}
                 {selectedProject.brief ? (
                   <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-gray-100 shadow-sm">
                     <h4 className="text-lg sm:text-xl md:text-2xl font-black text-[#121212] mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
                       <span className="w-2 sm:w-2.5 h-5 sm:h-6 bg-[#a38a6a] rounded-full inline-block"></span>
                       專案簡介與執行策略
                     </h4>
                     <div className="flex flex-col gap-4 sm:gap-6 w-full">
                       {selectedProject.brief.map((item: any, idx: number) => (
                         <div key={idx} className="w-full p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gray-50/70 border border-gray-100/80 flex flex-col justify-start">
                           <div className="flex items-center gap-2 mb-2">
                             <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span>
                             <span className="text-xs sm:text-sm font-black text-[#a38a6a] tracking-wider uppercase">{item.label}</span>
                           </div>
                           <p className="text-gray-700 text-[14px] sm:text-[15px] leading-relaxed font-medium text-justify whitespace-pre-line">{item.content}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 ) : selectedProject.desc ? (
                   <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
                     <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">{selectedProject.desc}</p>
                   </div>
                 ) : null}

                 {/* 圖片展示 */}
                 <div className="space-y-4 sm:space-y-8 flex flex-col items-center">
                    {selectedProject.detailsImages ? (
                       selectedProject.detailsImages.map((img: string, idx: number) => (
                         <div key={idx} className="w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100">
                            <img src={img} alt={`${selectedProject.title} details`} className="w-full h-auto object-contain" />
                         </div>
                       ))
                    ) : (
                       <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100">
                          <img src={selectedProject.img} alt={`${selectedProject.title} thumbnail`} className="w-full h-auto object-contain" />
                       </div>
                    )}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}


      {/* CSS Animations & Fluid Dynamics */}
      <style>{`
        @keyframes slide { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes image-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
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
