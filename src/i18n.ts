// src/i18n.ts
export type Lang = 'zh' | 'en';

export const navItems = [
  { id: 'about', labelZh: '關於個人', labelEn: 'About', subZh: '個人歷程', subEn: 'Profile' },
  { id: 'portfolio', labelZh: '精選作品', labelEn: 'Portfolio', subZh: '精選專案', subEn: 'Works' },
  { id: 'experience', labelZh: '經歷歷程', labelEn: 'Experience', subZh: '實務年表', subEn: 'Chronicles' },
  { id: 'skills', labelZh: '專業技能', labelEn: 'Skills', subZh: '軟硬體技能', subEn: 'Mastery' },
  { id: 'courses', labelZh: '研習證明', labelEn: 'Courses', subZh: '持續進修', subEn: 'Growth' }
];

export const heroContent = {
  tag: 'PORTFOLIO 2026',
  title1: 'Sustainable',
  title2: 'Packaging.',
  subtitleZh: '包裝設計專業深化 × 結構工程實務 \n 致力於在視覺美學與永續環保之間尋求平衡。',
  subtitleEn: 'Advancing Packaging Engineering × Structural Expertise \n Dedicated to balancing aesthetic refinement and sustainable innovation.',
  scrollCtaZh: 'Scroll To Explore',
  scrollCtaEn: 'Scroll To Explore'
};

export const aboutContent = {
  profileTag: 'PROFILE',
  headingZh: '設計美學 × \n 量產實務',
  headingEn: 'Design Aesthetics × \n Mass Production',
  tabs: [
    { id: 'background', labelZh: '設計背景與專業', labelEn: 'Background & Expertise', subLabelZh: 'Background & Expertise', subLabelEn: 'Education & Career' },
    { id: 'experience', labelZh: '開發實務經驗', labelEn: 'Development Experience', subLabelZh: 'Development Experience', subLabelEn: 'Hands-on Projects' },
    { id: 'career', labelZh: '職涯規劃目標', labelEn: 'Career Goals', subLabelZh: 'Career Goals', subLabelEn: 'Short & Long-term' },
    { id: 'philosophy', labelZh: '核心設計理念', labelEn: 'Design Beliefs', subLabelZh: 'Design Beliefs', subLabelEn: 'Core Principles' }
  ],
  background: {
    card1: {
      titleZh: '設計背景 × 設計流程開發經驗',
      titleEn: 'Design Background & Full Development Experience',
      subZh: 'DESIGN BACKGROUND & FULL DEVELOPMENT EXPERIENCE',
      subEn: 'ACADEMIC TRAINING & PRODUCT LIFECYCLE MASTERY',
      p1Zh: '畢業於 國立臺灣科技大學 工業設計系，擁有約 6 年產品設計經驗與 3 年多的包裝設計實務經驗，熟悉從外觀設計、結構開發到量產製程的完整開發流程。',
      p1En: 'Graduated in Industrial Design from National Taiwan University of Science and Technology. Equipped with ~6 years of product design experience and over 3 years in packaging engineering, proficient in the complete development workflow from styling and structural engineering to mass production.',
      p2Zh: '擅長品牌前期市場調研與定位分析，能根據產品需求進行 2D／3D 設計規劃，執行草模驗證、建模與工程圖繪製，並具備「依照預算與成本條件調整設計策略的靈活應變能力」。',
      p2En: 'Specialized in front-end market research and brand positioning analysis. Proficient in 2D/3D design planning, rapid mockups, 3D CAD modeling, and drafting engineering drawings, with agile problem-solving to tailor design strategies to budget and cost targets.'
    },
    card2: {
      titleZh: '包裝設計專業深化',
      titleEn: 'Packaging Design Expertise',
      subZh: 'PACKAGING DESIGN EXPERTISE',
      subEn: 'SUSTAINABLE PACKAGING ENGINEERING & MASS PRODUCTION',
      p1Zh: '現任職於久鼎金屬實業股份有限公司，負責車載具及相關零件的包裝設計與開發，持續強化「環保包裝結構設計、跨部門專案執行能力及開發實務經驗」。',
      p1En: 'Currently at JD Components Co., Ltd., designing and developing packaging for e-mobility vehicles and bicycle components. Continuously advancing eco-friendly structural design, cross-functional collaboration, and practical mass-production deployment.'
    }
  },
  experienceTab: {
    jd: {
      titleZh: '久鼎金屬實業股份有限公司',
      titleEn: 'JD Components Co., Ltd. (TranzX)',
      roleZh: 'TRANZX / JD COMPONENTS・包裝設計工程師 (目前在職)',
      roleEn: 'Packaging Design Engineer (Current)',
      items: [
        {
          titleZh: '自行車零組件包裝減塑專案',
          titleEn: 'Bicycle Components Packaging Plastic Reduction Project',
          sub: 'BICYCLE COMPONENTS PACKAGING PLASTIC REDUCTION PROJECT',
          descZh: '主導車把手、座管、立管與快拆束仔等零件的包裝優化，評估並全面汰換現行使用的塑膠袋，導入無塑環保材質，推動產品線的綠色轉型。',
          descEn: 'Spearheaded packaging optimization for bicycle components including handlebars, seatposts, stems, and quick releases; systematically replaced conventional plastic bags with eco-friendly plastic-free materials to drive green product line transformation.'
        },
        {
          titleZh: '電動載具整機包裝結構設計',
          titleEn: 'E-Mobility Complete Vehicle Packaging Structural Design',
          sub: 'E-MOBILITY COMPLETE VEHICLE PACKAGING STRUCTURAL DESIGN',
          descZh: '針對電動機車與電動滑板車，進行整機無塑包裝概念規劃。',
          descEn: 'Conducted complete vehicle sustainable packaging structural design and concept planning for electric motorcycles and electric scooters.'
        },
        {
          titleZh: '車把手尾數箱品質異常問題解決',
          titleEn: 'Handlebar Odd-Lot Carton Quality Issue Resolution',
          sub: 'HANDLEBAR ODD-LOT CARTON QUALITY ISSUE RESOLUTION',
          descZh: '針對車把手尾數箱包裝品質異常問題進行根本原因分析，並評估引進全紙緩衝填充材機台以確保運輸安全與落實減塑理念。',
          descEn: 'Resolved quality anomalies in handlebar odd-lot packing boxes through root-cause troubleshooting, evaluating and introducing paper-cushioning machinery to safeguard transit while eliminating plastic.'
        }
      ]
    },
    merry: {
      titleZh: '美律實業股份有限公司',
      titleEn: 'Merry Electronics Co., Ltd.',
      roleZh: 'MERRY ELECTRONICS・包裝工程師',
      roleEn: 'Packaging Engineer',
      items: [
        {
          titleZh: '國際品牌 TWS／HDT／Soundbar 包裝設計提案 (共25件)',
          titleEn: 'Packaging Proposals for International Brands (25 Projects)',
          sub: 'PACKAGING PROPOSALS FOR INTERNATIONAL BRANDS (25 PROJECTS)',
          descZh: '根據產品定位提出多元價位（低／中／高）包裝設計方案，滿足不同市場需求與品牌策略。在消費性電子產品 RFQ 階段，主導包裝結構設計、2D 工程圖繪製與初步成本分析。',
          descEn: 'Formulated packaging proposals for Tier-1 international brand audio products (TWS, Headsets, Soundbars). Engineered segmented packaging architecture across multiple price tiers to meet diverse market demands and brand strategies. Spearheaded structural packaging engineering, 2D drafting, and preliminary cost analysis during the RFQ stage for consumer electronics.'
        },
        {
          titleZh: '建立包裝設計資料庫以及市調資料表 (共6件)',
          titleEn: 'Packaging Design Database & Market Research (6 Datasets)',
          sub: 'PACKAGING DESIGN DATABASE & MARKET RESEARCH (6 DATASETS)',
          descZh: '彙整 TWS、HDT、Soundbar 紙卡內襯結構規格，形成模組化資料庫，改善專案提案效率，精準對焦市場需求。',
          descEn: 'Standardized and modularized paper insert structures across TWS, headsets, and soundbars into a comprehensive design database, significantly boosting proposal turnaround speed and pinpoint market calibration.'
        },
        {
          titleZh: '參與 HDT 電競耳機開發專案 (共2件)',
          titleEn: 'Gaming Headset Development Projects (2 Models)',
          sub: 'GAMING HEADSET DEVELOPMENT PROJECTS (2 MODELS)',
          descZh: '實際參與兩款 HyperX 電競耳機機型開發，累積從結構設計、打樣修正到量產導入的完整開發經驗。',
          descEn: 'Actively co-developed two HyperX flagship gaming headsets, acquiring comprehensive hands-on mastery spanning structural modeling, prototype validation, and volume production rollout.'
        }
      ]
    }
  },
  careerTab: {
    shortTermTitleZh: '短期目標',
    shortTermTitleEn: 'Short-Term Strategic Goals',
    shortTermSub: 'SHORT-TERM STRATEGIC GOALS',
    shortTermItems: [
      {
        zh: '深入 ESG 永續議題，探索各類紙材、布料等 CMF 特性與加工技術，建立應用知識庫，並與供應商合作開發環保材質。',
        en: 'Deep-dive into ESG sustainability, exploring CMF characteristics and processing techniques of paper and fabrics to build knowledge bases and co-develop eco-friendly materials with suppliers.'
      },
      {
        zh: '強化紙材結構設計能力，目標能提出具創新性的設計專利。',
        en: 'Elevate paper structural engineering, targeting the filing and grant of innovative structural design patents.'
      },
      {
        zh: '培養紙材成本評估能力，根據需求提出兼顧保護性與成本效益的結構優化方案。',
        en: 'Cultivate rigorous packaging cost evaluation to formulate optimized structural designs that seamlessly balance superior protection with high cost-efficiency.'
      }
    ],
    longTermTitleZh: '中長期目標',
    longTermTitleEn: 'Mid- to Long-Term Vision',
    longTermSub: 'MID- TO LONG-TERM VISION',
    longTermItems: [
      {
        zh: '持續提升設計落地的精準度，累積更多實戰開發經驗。',
        en: 'Continuously elevate design implementation accuracy and accumulate practical mass-production development experience.'
      },
      {
        zh: '建立包裝設計與市場趨勢的連結敏感度，朝向具策略思維的設計開發整合型人才邁進。',
        en: 'Sharpen market trend sensitivity in packaging, advancing toward an integrated design development talent with strategic business mindset.'
      },
      {
        zh: '維持兼顧品質與成本效益的綠色包裝方案，落實企業永續與減碳願景。',
        en: 'Maintain high design quality while driving cost-effective green packaging solutions, supporting corporate ESG transformation.'
      }
    ]
  },
  philosophyTab: [
    {
      titleZh: '兼具感性與理性',
      titleEn: 'Balance Emotion & Logic',
      sub: 'BALANCE EMOTION & LOGIC',
      descZh: '設計不僅是創造視覺與情感價值，更必須考量製程可行性、技術限制、成本控制與品質穩定性。',
      descEn: 'Design must deliver emotional resonance while strictly honoring manufacturing feasibility, cost parameters, and production stability.'
    },
    {
      titleZh: '服務於產品與使用者',
      titleEn: 'Form Follows Function',
      sub: 'FORM FOLLOWS FUNCTION',
      descZh: '我重視產品本質，關注設計如何實際提升使用者的便利性與品牌價值，讓設計發揮功能性與影響力。',
      descEn: 'Rooted in product essence, ensuring design genuinely enhances user convenience and delivers enduring brand value and tangible impact.'
    },
    {
      titleZh: '重視跨部門協作效率',
      titleEn: 'Teamwork & Synergy',
      sub: 'TEAMWORK & SYNERGY',
      descZh: '良好的設計來自良好的協作，我樂於與不同角色協同合作，透過積極溝通整合各方需求與資源。',
      descEn: 'Superior designs originate from seamless collaboration, uniting diverse stakeholders through proactive communication and resource integration.'
    },
    {
      titleZh: '保持熱情與學習動能',
      titleEn: 'Stay Curious & Driven',
      sub: 'STAY CURIOUS & DRIVEN',
      descZh: '對我而言，設計不只是工作，更是一種持續探索的過程。我始終懷抱熱情與好奇心，樂於在團隊中貢獻專業，一同創造實質價值。',
      descEn: 'Design is an ongoing journey of exploration; maintaining continuous curiosity and passion to co-create measurable, real-world value.'
    }
  ]
};

export const portfolioContent = {
  tag: 'Works',
  title: 'Projects.',
  subZh: 'Design Mastery × Core Focus',
  subEn: 'Design Mastery × Core Focus',
  exploreZh: 'Explore Collection',
  exploreEn: 'Explore Collection',
  closeGalleryZh: 'Close Gallery',
  closeGalleryEn: 'Close Gallery',
  closeBtnMobileZh: '關閉',
  closeBtnMobileEn: 'Close',
  categoryNames: {
    Packaging: { zh: '包裝設計', en: 'Packaging Design' },
    Product: { zh: '產品設計', en: 'Product Design' },
    Graphic: { zh: '平面設計', en: 'Graphic Design' }
  },
  filterCategories: {
    Packaging: [
      { key: '全部包裝', labelZh: '全部包裝', labelEn: 'All Packaging' },
      { key: '消費性電子產品', labelZh: '消費性電子產品', labelEn: 'Consumer Electronics' },
      { key: '自行車零件', labelZh: '自行車零件', labelEn: 'Bicycle Components' },
      { key: '電動載具', labelZh: '電動載具', labelEn: 'E-Mobility' },
      { key: '專利申請', labelZh: '專利申請', labelEn: 'Patent Applications' }
    ],
    Product: [
      { key: '全部產品', labelZh: '全部產品', labelEn: 'All Products' },
      { key: '廚電/家電', labelZh: '廚電/家電', labelEn: 'Kitchen & Appliances' },
      { key: '醫療/穿戴', labelZh: '醫療/穿戴', labelEn: 'Medical & Wearables' },
      { key: '玩具設計', labelZh: '玩具設計', labelEn: 'Toy Design' },
      { key: '手繪作品', labelZh: '手繪作品', labelEn: 'Hand Sketches' }
    ],
    Graphic: [
      { key: '全部平面', labelZh: '全部平面', labelEn: 'All Graphic' },
      { key: '品牌/CIS', labelZh: '品牌/CIS', labelEn: 'Branding & CIS' }
    ]
  },
  strategyHeadingZh: '專案簡介與執行策略',
  strategyHeadingEn: 'Project Overview & Strategy'
};

// Project localized details map
export const projectEnMap: Record<number, { title: string; desc: string; brief?: Array<{ label: string; content: string }> }> = {
  1: {
    title: 'TWS Paper Insert Modular Design',
    desc: 'Engineered flexible paper-insert modular library, speeding up RFQ proposals while boosting assembly yields.',
    brief: [
      { label: 'Project Goal', content: 'To solve rapid RFQ cost estimation requirements, established a fast-response structural packaging system.' },
      { label: 'Strategy', content: 'Pre-engineered modular paper inserts for TWS products, differentiating laminated vs. non-laminated processes to meet various budget tiers.' },
      { label: 'Validation', content: 'Conducted hands-on plotter cutting, folding, and trial line assembly to eliminate ergonomics assembly bottlenecks.' },
      { label: 'Outcome', content: 'Created an agile modular database that enables custom proposals in RFQ stages while guaranteeing mass-production yield.' }
    ]
  },
  2: {
    title: 'TWS Packaging Proposals',
    desc: 'Structured dual-track packaging architecture (cost-effective & flagship), matching diverse client budgets and winning bids.',
    brief: [
      { label: 'Project Goal', content: 'Formulated tiered packaging proposals during customer RFQs to provide budget flexibility and market distinction.' },
      { label: 'Strategy', content: 'Segmented into two tiers:\n• Option A (Value): Minimalist paper insert with sleeve, optimizing cost and line labor.\n• Option B (Flagship): Molded pulp tray with rigid book box and sleeve, elevating unboxing touchpoints.' },
      { label: 'Outcome', content: 'Helped sales teams swiftly match customer budgets, boosting proposal turnaround and project conversions.' }
    ]
  },
  3: {
    title: 'HDT Paper Insert Modular Design',
    desc: 'Streamlined fold and lock structures, reinforcing protection for large-form headsets while optimizing line efficiency.',
    brief: [
      { label: 'Project Goal', content: 'Constructed fast-turnaround modular paper insert solutions for gaming headsets during early RFQ stages.' },
      { label: 'Strategy', content: 'Engineered folding insert modules tailored to headset center-of-gravity and dimensions, minimizing folding labor while maximizing drop protection.' },
      { label: 'Outcome', content: 'Delivered an agile structural database ensuring immediate proposal readiness, mass manufacturing feasibility, and tight cost control.' }
    ]
  },
  4: {
    title: 'Soundbar Modular Packaging Design',
    desc: 'Formulated tiered packaging strategies across price points, integrating diverse materials and delivering international prototypes.',
    brief: [
      { label: 'Project Goal', content: 'Engineered modular Soundbar packaging systems for high-cadence RFQ client evaluations.' },
      { label: 'Strategy', content: 'Segmented entry to flagship tiers, combining paper inserts/pulp trays, eco-friendly cloth sleeves, and folding/pizza boxes.' },
      { label: 'Validation', content: 'Executed full-scale sample cutting and trial assembly to eliminate structural interference in large packaging.' },
      { label: 'Outcome', content: 'Assisted cross-departmental assembly in Taipei and successfully delivered international samples to global clients on schedule.' }
    ]
  },
  5: {
    title: 'Soundbar Packaging Design Proposal',
    desc: 'Reverse-engineered previous generations to match strict target costs, delivering CAD drawings, BOMs, and assembly SOPs.',
    brief: [
      { label: 'Project Goal', content: 'Provided budget-compliant and production-viable soundbar packaging under strict RFQ price ceilings.' },
      { label: 'Strategy', content: 'Aligned with cost-parity targets by reverse-engineering previous generations and re-evaluating material specifications.' },
      { label: 'Outcome', content: 'Delivered CAD drawings, quotation BOMs, and standardized assembly SOPs for precise manufacturing labor estimations.' }
    ]
  },
  6: {
    title: 'Webcam Packaging Design Proposal',
    desc: 'Premium gift-box packaging for webcams, integrating eco-friendly molded pulp inserts and protective cushioning.',
    brief: [
      { label: 'Project Goal', content: 'Delivered cost-effective and mass-producible webcam packaging solutions for customer RFQs.' },
      { label: 'Strategy', content: 'Dual-track packaging: Premium gift box with black molded pulp for retail; inflatable air cushions for bulk transport anti-shock.' },
      { label: 'Outcome', content: 'Delivered full structural drawings, quotation BOMs, and standardized assembly SOPs to boost quotation speed.' }
    ]
  },
  11: {
    title: 'Carrycase Modular Packaging Design',
    desc: 'Built dual soft/hard shell material repository, rapidly responding to customer RFQs with tailored packaging solutions.',
    brief: [
      { label: 'Project Goal', content: 'Engineered modular carrycase packaging systems to meet tight RFQ quoting turnaround.' },
      { label: 'Strategy', content: 'Soft-shell repository using canvas and felt; hard-shell repository using thermoformed EVA cases with custom storage layouts.' },
      { label: 'Outcome', content: 'Built agile carrycase design library, matching client budgets rapidly with verified production feasibility.' }
    ]
  },
  9: {
    title: 'TR Handlebar Packaging Design',
    desc: 'Introduced plastic-free sustainable materials, replacing conventional plastic bags with eco-friendly alternatives.',
    brief: [
      { label: 'Project Goal', content: 'Replaced traditional plastic bags with plastic-free sustainable materials following global ESG regulations.' },
      { label: 'Strategy', content: 'Evaluated honeycomb paper sleeves, bamboo fiber bags, and folded corrugated inserts.' },
      { label: 'Outcome', content: 'Validated folded corrugated insert via ISTA 1A testing, achieving 100% plastic-free status with superior hold and cost parity.' }
    ]
  },
  10: {
    title: 'RA Handlebar Packaging Design',
    desc: 'Engineered folded corrugated structures to eliminate plastic bag packaging for road handlebars.',
    brief: [
      { label: 'Project Goal', content: 'Replaced traditional plastic bags on road handlebars with plastic-free eco-materials.' },
      { label: 'Strategy', content: 'Developed folded corrugated insert structure and compared with bamboo fiber bags and honeycomb paper tubes.' },
      { label: 'Outcome', content: 'Passed ISTA 1A tests, achieving zero plastic while guaranteeing transit stability and low tooling costs.' }
    ]
  },
  18: {
    title: 'RA Handlebar Bagging Process Optimization',
    desc: 'Analyzed bagging pain-points and engineered optimized packing workflows to prevent abrasion and streamline handling.',
    brief: [
      { label: 'Project Goal', content: 'Analyzed operator pain points in handlebar poly-bagging to design an improved packaging workflow.' },
      { label: 'Strategy', content: 'Conducted line motion studies and proposed targeted bagging improvements balancing ergonomics with scratch prevention.' },
      { label: 'Outcome', content: 'Delivered detailed improvement specifications and drawings, setting standards for line packaging quality.' }
    ]
  },
  12: {
    title: 'Stem Packaging Design',
    desc: 'Developed plastic-free corrugated structural inserts for stems, ensuring robust protection without single-use plastics.',
    brief: [
      { label: 'Project Goal', content: 'Replaced existing plastic bags for bicycle stems with plastic-free corrugated inserts.' },
      { label: 'Strategy', content: 'Designed dedicated folded corrugated structures tailored for L-shape and I-shape stems.' },
      { label: 'Outcome', content: 'Established modular plastic-free stem packaging database, accelerating lead time for sustainable customer requests.' }
    ]
  },
  13: {
    title: 'Quick Release Clamp Packaging Design',
    desc: 'Developed all-paper structural packaging for quick release clamps, replacing single-use plastic bags.',
    brief: [
      { label: 'Project Goal', content: 'Created plastic-free corrugated packaging to eliminate poly bags for quick-release seat clamps.' },
      { label: 'Strategy', content: 'Engineered single-sheet folded corrugated insert providing secure mechanical fit without adhesive.' },
      { label: 'Outcome', content: 'Built standardized plastic-free packaging database, enabling immediate customer quotation and deployment.' }
    ]
  },
  14: {
    title: 'Seatpost Packaging Design',
    desc: 'Engineered single and multi-pack plastic-free packaging structures for seatposts, supporting circular factory bins.',
    brief: [
      { label: 'Project Goal', content: 'Engineered plastic-free packaging structures for seatposts in both individual and bulk pack configurations.' },
      { label: 'Strategy', content: 'Single pack: evaluated bubble paper, honeycomb pouches, and folded inserts. Multi-pack: folded corrugated dividers fitting circular factory crates.' },
      { label: 'Outcome', content: 'Standardized seatpost packaging library, significantly cutting lead times for eco-friendly product transitions.' }
    ]
  },
  17: {
    title: 'Brake Line Packaging Design',
    desc: 'Crafted folded paper structure for brake cable packaging, transitioning to 100% plastic-free packaging.',
    brief: [
      { label: 'Project Goal', content: 'Replaced traditional plastic bags for bicycle brake lines with sustainable all-paper structures.' },
      { label: 'Strategy', content: 'Designed compact folded corrugated card that secures coiled cables cleanly.' },
      { label: 'Outcome', content: 'Created turnkey plastic-free brake cable packaging readily available for volume orders.' }
    ]
  },
  15: {
    title: 'E-Motorcycle Sustainable Packaging Design',
    desc: 'Architected complete-vehicle plastic-reduced packaging for electric motorcycles, successfully shipped internationally.',
    brief: [
      { label: 'Project Goal', content: 'Architected complete-vehicle sustainable packaging for electric motorcycle exports.' },
      { label: 'Strategy', content: 'Constructed outer carton and internal shock-absorbing structure with corrugated board, placing localized EPE padding at scratch-sensitive body panels.' },
      { label: 'Outcome', content: 'Successfully deployed for overseas exhibitions and international race events with zero transit damage.' }
    ]
  },
  16: {
    title: 'E-Scooter Complete Vehicle Packaging Design',
    desc: 'Conceptualized whole-vehicle sustainable packaging and spatial layout for electric scooters.',
    brief: [
      { label: 'Project Goal', content: 'Formulated sustainable packaging concept for new electric scooter models.' },
      { label: 'Strategy', content: 'Integrated folded corrugated internal cradles with targeted padding at high-impact points.' },
      { label: 'Outcome', content: 'Delivered initial packaging layout and cushioning strategy, serving as the benchmark for mass production planning.' }
    ]
  },
  19: {
    title: 'All-Paper Sustainable Packaging Patents',
    desc: 'Filed 7 all-paper structural patents for bicycle components under EU PPWR regulations, enabling a zero-waste closed-loop supply chain.',
    brief: [
      { label: 'Project Goal', content: 'Eliminated plastic bags across bicycle components to meet EU PPWR/EPR laws, filing 7 structural packaging patents.' },
      { label: 'Strategy', content: '1. Mono-material corrugated paper with mechanical snap locks (no glue/tools required).\n2. Standardized modular shock-absorption arrays for handlebars, seatposts, and stems.\n3. Zero-waste circular logistics integrating reusable factory crates with fold-flat paper inserts.' },
      { label: 'Outcome', content: 'Drafted 7 patent technical claims and specifications scheduled for completion by 2026 Q4 before Taipei Cycle 2027.' }
    ]
  }
};

export const chroniclesContent = {
  tagZh: 'Chronicles',
  tagEn: 'Chronicles',
  titleZh: 'Evolution Path.',
  titleEn: 'Evolution Path.',
  subZh: 'Chronicles',
  subEn: 'Chronicles',
  coreResponsibilitiesZh: '主要工作內容',
  coreResponsibilitiesEn: 'Core Responsibilities',
  keyAchievementsZh: '核心成就',
  keyAchievementsEn: 'Key Achievements',
  items: [
    {
      companyZh: '久鼎金屬實業股份有限公司',
      companyEn: 'JD Components Co., Ltd. (TranzX)',
      titleZh: '包裝設計工程師',
      titleEn: 'Packaging Design Engineer',
      date: '2025.08 - PRESENT',
      durationZh: '仍在職',
      durationEn: 'Current',
      locationZh: '彰化縣秀水鄉・自行車及其零件製造業 500人+',
      locationEn: 'Changhua, Taiwan・Bicycle & Components Manufacturing 500+ employees',
      responsibilitiesZh: ['減塑全紙化包裝設計提案', '包裝廠商樣品追蹤、品質問題改善確認', '落摔測試與包裝設計結構調整'],
      responsibilitiesEn: ['Plastic-free all-paper packaging design proposals', 'Supplier sample tracking & quality anomaly troubleshooting', 'Drop test validation & structural packaging adjustments'],
      achievementsZh: ['自行車零件（車把手、座管、立管、快拆束仔等）共 21 款全紙包裝設計提案', '車載具（電動滑板車、電動機車）共 3 款全紙包裝設計提案', '車把手尾數箱品質異常問題解決（評估全紙填充材機台）'],
      achievementsEn: ['Delivered 21 all-paper packaging proposals for bicycle components (handlebars, seatposts, stems, quick releases)', 'Formulated 3 sustainable packaging proposals for e-mobility vehicles (e-scooters, e-motorcycles)', 'Resolved handlebar odd-lot packing quality issues by introducing automated paper-cushioning machines'],
      tools: ['減塑全紙化', '結構調整', '落摔測試', '包裝設計'],
      type: 'work',
      image: '/tranzx-logo-vector.png'
    },
    {
      companyZh: '美律實業股份有限公司',
      companyEn: 'Merry Electronics Co., Ltd.',
      titleZh: '包裝工程師',
      titleEn: 'Packaging Engineer',
      date: '2022.07 - 2025.05',
      durationZh: '2年11個月',
      durationEn: '2 yrs 11 mos',
      locationZh: '台中市南屯區・精密儀器製造業 500人+',
      locationEn: 'Taichung, Taiwan・Precision Electronics Manufacturing 500+ employees',
      responsibilitiesZh: ['消費性電子產品包裝開發工作', '新機型產品包材圖面繪製、包裝作業流程製作', '包裝廠商樣品追蹤、品質問題改善確認'],
      responsibilitiesEn: ['Consumer electronics packaging development and structural engineering', 'CAD drawings for packaging materials and assembly SOP creation', 'Supplier prototype tracking and quality improvement verification'],
      achievementsZh: ['國際品牌 TWS / HDT / Soundbar 包裝設計提案（共 25 件）', '根據產品定位提出多元價位（低／中／高）包裝設計方案，滿足不同市場需求與品牌策略', '在消費性電子產品 RFQ 階段，主導包裝結構設計、2D 工程圖繪製與初步成本分析'],
      achievementsEn: ['Authored 25 packaging proposals for Tier-1 international brands (TWS, Headsets, Soundbars)', 'Engineered tiered price packaging architectures matching brand strategies across price segments', 'Spearheaded structural design, 2D drafting, and preliminary cost breakdown during client RFQ stages'],
      tools: ['Creo', '產品開發', '產品結構評估', '包裝設計'],
      type: 'work',
      image: '/merry_logo.jpg'
    },
    {
      companyZh: '台灣櫻花股份有限公司',
      companyEn: 'Taiwan Sakura Corp.',
      titleZh: '產品設計師',
      titleEn: 'Product Designer',
      date: '2020.03 - 2022.07',
      durationZh: '2年5個月',
      durationEn: '2 yrs 5 mos',
      locationZh: '台中市大雅區・廚電製造業 500人+',
      locationEn: 'Taichung, Taiwan・Kitchen Appliances Manufacturing 500+ employees',
      responsibilitiesZh: ['針對 PM 市場規劃結合消費者調查擬定設計方向', '跨部門協作與國內外廚電市場及造型趨勢調研'],
      responsibilitiesEn: ['Collaborated with PMs and consumer research to formulate product design directions', 'Cross-functional engineering and global kitchen appliance styling trend analysis'],
      achievementsZh: ['榮獲 2021 年度績優員工', '主導易清檯面爐 G2522AG、G2623AG 上市', '優化清潔設計與旋鈕造型'],
      achievementsEn: ['Awarded 2021 Outstanding Employee of the Year', 'Led design and commercial launch of easy-clean cooktops G2522AG and G2623AG', 'Engineered hygienic surface contours and ergonomic control knobs'],
      tools: ['Creo', 'Photoshop', 'Illustrator', 'KeyShot'],
      type: 'work',
      image: '/sakura_logo.png'
    },
    {
      companyZh: '上岳科技股份有限公司',
      companyEn: 'Uptech / EMG Technology',
      titleZh: '產品設計師',
      titleEn: 'Product Designer',
      date: '2018.11 - 2019.12',
      durationZh: '1年2個月',
      durationEn: '1 yr 2 mos',
      locationZh: '台中市南屯區・醫療器材製造業 30-100人',
      locationEn: 'Taichung, Taiwan・Medical Devices Manufacturing 30-100 employees',
      responsibilitiesZh: ['新品提案與簡報製作', '依據 RD 模組進行產品設計提案 (含視覺、材質、風格)', '產品造型設計與機構討論'],
      responsibilitiesEn: ['New product concept proposals and executive client presentations', 'Styling proposals based on internal RD modules (CMF, form, aesthetics)', 'Industrial styling and mechanical housing alignment'],
      achievementsZh: ['低周波治療器 2 款外觀提案', '兒童用霧化器外觀提案', 'SPO2 手環 5 款外觀提案'],
      achievementsEn: ['Delivered 2 industrial styling proposals for low-frequency therapy devices', 'Designed pediatric nebulizer concept proposals', 'Created 5 styling variations for SPO2 health monitoring wristbands'],
      tools: ['SolidWorks', 'Illustrator', 'Photoshop', 'KeyShot', '機構設計'],
      type: 'work',
      image: '/emg_logo.png'
    },
    {
      companyZh: '研成股份有限公司',
      companyEn: 'G-Design Studio',
      titleZh: '產品設計師',
      titleEn: 'Product Designer',
      date: '2017.08 - 2018.08',
      durationZh: '1年1個月',
      durationEn: '1 yr 1 mo',
      locationZh: '新北市新店區・設計相關業 30-100人',
      locationEn: 'New Taipei, Taiwan・Design Consultancy 30-100 employees',
      responsibilitiesZh: ['新品提案與簡報製作', '依據 RD 提供模組進行產品造型設計提案'],
      responsibilitiesEn: ['Concept presentations and pitch deck preparation', 'Product styling based on modular mechanical platforms'],
      achievementsZh: ['獨立負責日本學研 GAKKEN 委託之鋁製品設計案', '研發多合一 solar 新產品 & 彩盒設計規劃', '協助 2018 年度 12in1 solar 產品色彩配置'],
      achievementsEn: ['Independently led aluminum product styling commissioned by Gakken Japan', 'Designed multi-in-one solar toy products and packaging retail boxes', 'Curated CMF color palettes for the 2018 12-in-1 solar educational kit'],
      tools: ['Illustrator', 'Photoshop', 'KeyShot', '包裝設計', '提案簡報'],
      type: 'work',
      image: '/cic-logo.png.png'
    },
    {
      companyZh: '國立臺灣科技大學',
      companyEn: 'National Taiwan University of Science and Technology',
      titleZh: '工業設計系 / 大學畢業',
      titleEn: 'B.S. in Industrial Design',
      date: '2013 - 2017',
      durationZh: '基礎教育',
      durationEn: 'Education',
      locationZh: '台北市',
      locationEn: 'Taipei, Taiwan',
      responsibilitiesZh: ['深耕結構工程與美學邏輯，奠定系統化產品開發思維。'],
      responsibilitiesEn: ['Mastered structural engineering and aesthetic harmony, establishing methodical product development logic.'],
      achievementsZh: [],
      achievementsEn: [],
      tools: ['工業設計', '產品開發', '系統化邏輯'],
      type: 'edu',
      image: '/ntust_logo.jpg'
    },
    {
      companyZh: '國立臺中高工',
      companyEn: 'Taichung Industrial High School',
      titleZh: '圖文傳播科 / 高職畢業',
      titleEn: 'Graphic Arts & Communications',
      date: '2010 - 2013',
      durationZh: '基礎教育',
      durationEn: 'Education',
      locationZh: '台中市',
      locationEn: 'Taichung, Taiwan',
      responsibilitiesZh: ['啟蒙於平面美學與印刷技術，掌握刀模與色彩控制精髓。'],
      responsibilitiesEn: ['Initiated into graphic design, printing technology, die-cutting precision, and color calibration theory.'],
      achievementsZh: [],
      achievementsEn: [],
      tools: ['平面設計', '印刷工程', '色彩學'],
      type: 'edu',
      image: '/tcivs_logo.jpg'
    }
  ]
};

export const skillsContent = {
  tagZh: 'Mastery Skills & Tools',
  tagEn: 'Mastery Skills & Tools',
  skills: [
    {
      id: '01',
      titleZh: '市場調研與定位分析',
      titleEn: 'Market Research & Positioning Strategy',
      en: 'Market Research & Strategy',
      descZh: '擅長設計前期的競品蒐集並針對該品牌定位分析，總結設計規畫方向。',
      descEn: 'Proficient in front-end competitive benchmarking and brand positioning analysis to formulate strategic design roadmaps.',
      tags: ['競品分析', '產品策略', '產品定位', '市場調查資料分析', '報告撰寫與提案']
    },
    {
      id: '02',
      titleZh: '2D 品牌視覺整合與簡報提案',
      titleEn: 'Graphic Design & Presentation Proposals',
      en: 'Graphic Design & Branding',
      descZh: '擅長整合包裝結構與品牌識別，製作具專業感與說服力的提案簡報。',
      descEn: 'Adept at harmonizing packaging structures with visual identity, authoring convincing, executive-level pitch decks.',
      tags: ['Adobe InDesign', 'Illustrator', 'Photoshop', '電腦排版設計', '設計印刷基本認知', '電腦印前設計']
    },
    {
      id: '03',
      titleZh: '3D 建模與結構模擬',
      titleEn: '3D CAD Modeling & Structural Simulation',
      en: '3D Modeling & Engineering',
      descZh: '能快速建構產品結構模型並進行裝配模擬，支援從設計構想至工程的溝通。',
      descEn: 'Rapidly construct structural 3D models and assembly simulations, bridging conceptual design seamlessly to tooling engineering.',
      tags: ['Creo', 'SolidWorks', 'Rhino', 'Keyshot', '產品結構評估', '3D 渲染']
    },
    {
      id: '04',
      titleZh: '包裝材料選用與 BOM 建立',
      titleEn: 'Packaging Materials & BOM Engineering',
      en: 'Packaging & BOM',
      descZh: '熟悉泡殼、瓦楞紙卡、紙托等常用包材特性，依需求提出優化方案。',
      descEn: 'Deeply versed in corrugated boards, pulp trays, blisters, and sustainable foams to draft cost-effective BOM specifications.',
      tags: ['瓦楞紙結構', '包裝材料選用', '工程圖繪製', 'BOM 建立']
    },
    {
      id: '05',
      titleZh: '打樣實作與設計驗證能力',
      titleEn: 'Prototyping & Structural Validation',
      en: 'Prototyping & Validation',
      descZh: '善用割樣機進行結構模擬與快速打樣，快速驗證設計可行性。',
      descEn: 'Skilled in cutting-plotter mockups and hands-on assembly tests, rapidly verifying structural tolerance, drop safety, and production feasibility.',
      tags: ['打樣機操作', '結構模擬', '快速打樣', '設計驗證', 'CMF 樣板製作']
    }
  ],
  toolsHeading: 'Software Tools',
  toolsSub: 'Design & Engineering Mastery'
};

export const coursesContent = {
  tagZh: 'Learning Path',
  tagEn: 'Learning Path',
  titleZh: 'Growth.',
  titleEn: 'Growth.',
  filters: [
    { key: '全部', labelZh: '全部', labelEn: 'All' },
    { key: 'AI應用課程', labelZh: 'AI應用課程', labelEn: 'AI Applications' },
    { key: '包裝專業課程', labelZh: '包裝專業課程', labelEn: 'Packaging Expertise' }
  ],
  courseEnMap: {
    1: { title: 'Packaging Structural Design, Transport Validation & Cost Optimization', org: 'Plastics Industry Development Center (PIDC)', category: 'Packaging Professional' },
    2: { title: 'Elite In-Service AI Talent Training Program', org: 'Industrial Development Administration, MOEA', category: 'AI Applications' },
    3: { title: 'iPAS AI Application Planner Certification Course', org: 'China Productivity Center (CPC)', category: 'AI Applications' },
    4: { title: 'Practical AI Application Series: ChatGPT & Make Automation', org: 'NUVA', category: 'AI Applications' },
    5: { title: 'iPAS AI Application Planner Capability Workshop', org: 'Commercial Development Administration, MOEA', category: 'AI Applications' }
  }
};

export const lifestyleContent = {
  tag: 'Lifestyle Beyond Work',
  items: [
    {
      titleZh: '重量訓練',
      titleEn: 'Fitness',
      en: 'Fitness',
      goalZh: '目前每週2練，目標4練',
      goalEn: 'Current: 2 sessions/wk, target: 4',
      descZh: '訓練耐力與自律，堅持每一步小幅進步。',
      descEn: 'Building physical grit and discipline through consistent weekly strength routines.',
      img: '/fitness.jpg'
    },
    {
      titleZh: '馬拉松',
      titleEn: 'Marathon',
      en: 'Marathon',
      goalZh: '5次半馬，目標全馬',
      goalEn: '5 Half-Marathons completed, aiming for Full',
      descZh: '不只是體能，更是對堅持信念的終極挑戰。',
      descEn: 'A profound test of willpower, endurance pacing, and mental fortitude on the pavement.',
      img: '/marathon.jpg'
    },
    {
      titleZh: '登山挑戰',
      titleEn: 'Hiking',
      en: 'Hiking',
      goalZh: '登頂2座百岳，持續挑戰',
      goalEn: 'Summited 2 Baiyue peaks, expanding trails',
      descZh: '在山林間對話，尋找自我探索與放鬆的途徑。',
      descEn: 'Finding calm perspective, clarity, and mindfulness amidst towering mountain trails.',
      img: '/mountain.jpg'
    },
    {
      titleZh: '羽球',
      titleEn: 'Badminton',
      en: 'Badminton',
      goalZh: '每週定期切磋，鍛鍊敏捷身手',
      goalEn: 'Weekly court rallies, sharpening dynamic reflex',
      descZh: '高速攻防與動態專注，在每一次揮拍與移位間鍛鍊敏捷反應。',
      descEn: 'Fast-paced tactical rallies that cultivate rapid reflexes, footwork, and focused agility.',
      img: '/badminton.jpg'
    },
    {
      titleZh: '匹克球',
      titleEn: 'Pickleball',
      en: 'Pickleball',
      goalZh: '享受新興運動樂趣，精進戰術走位',
      goalEn: 'Embracing modern paddle play & tactical movement',
      descZh: '融合手眼協調與節奏掌控，在靈活多變的擊球中體驗運動樂趣。',
      descEn: 'Mastering hand-eye coordination and court rhythm in lively, strategic paddle rallies.',
      img: '/pickleball.jpg'
    }
  ]
};

export const footerContent = {
  tag: 'Closing Statement',
  p1Zh: '非常感謝您的閱讀。',
  p1En: 'Thank you sincerely for reviewing my portfolio.',
  p2Zh: '如有進一步了解的需要，歡迎隨時與我聯繫。',
  p2En: 'If you would like to discuss my design experience further, please feel free to reach out anytime.',
  quoteZh: '若有幸符合貴公司徵才條件，\n我將十分期待有機會參與正式面試，\n為團隊帶來我的熱情與專業。',
  quoteEn: 'I warmly look forward to the opportunity of an interview,\nbringing my design passion, technical precision,\nand practical execution to your team.',
  heading: "Let's Build Something.",
  lineContactZh: 'LINE 聯繫',
  lineContactEn: 'LINE Contact',
  rights: '© 2026 AMANDA LAI. ALL RIGHTS RESERVED.'
};
