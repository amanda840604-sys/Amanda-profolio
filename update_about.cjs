const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// We need to add state for activeAboutTab
if (!content.includes('activeAboutTab')) {
    content = content.replace(
        /const \[activeCategory, setActiveCategory\] = useState<string \| null>\(null\);/,
        "const [activeCategory, setActiveCategory] = useState<string | null>(null);\n  const [activeAboutTab, setActiveAboutTab] = useState('background');"
    );
}

// Prepare the new about section
const newAboutSection = `
      <section id="about" className="px-8 md:px-24 py-40 border-t border-gray-50 text-[#121212]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 text-[#121212]">
          <div className="lg:col-span-4">
            <Reveal direction="left">
               <h2 className="text-[14px] font-black tracking-[0.5em] text-[#a38a6a] uppercase mb-8 flex items-center gap-6">
                 <div className="w-16 h-[2px] bg-[#a38a6a]"></div> Profile
               </h2>
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-[#121212] mb-12">工藝美學 × <br /> 邏輯工程</h3>
               
               {/* About Tabs Navigation */}
               <div className="flex flex-col gap-4">
                 {[
                   { id: 'background', label: '設計背景與專業' },
                   { id: 'experience', label: '開發實務經驗' },
                   { id: 'career', label: '職涯規劃目標' },
                   { id: 'philosophy', label: '核心設計理念' }
                 ].map(tab => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveAboutTab(tab.id)}
                     className={\`text-left px-6 py-4 rounded-2xl transition-all duration-500 font-bold tracking-widest text-[16px] \${
                       activeAboutTab === tab.id 
                         ? 'bg-[#a38a6a] text-white shadow-lg shadow-[#a38a6a]/30 translate-x-2' 
                         : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                     }\`}
                   >
                     {tab.label}
                   </button>
                 ))}
               </div>
               
               <div className="mt-12 w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] md:rounded-[4rem] group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border-[6px] border-white cursor-pointer relative hover:-translate-y-2">
                  <img src="/Profolio_photo.jpg" alt="Amanda Lai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-8 flex flex-col justify-start pt-4 lg:pt-24 text-[#121212]">
            <Reveal delay={200} className="w-full">
               {/* Background Content */}
               {activeAboutTab === 'background' && (
                 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span> 設計背景 × 設計流程開發經驗
                      </h4>
                      <p className="text-[17px] text-gray-600 leading-[1.8] font-medium text-justify mb-4">
                        畢業於 <strong className="text-[#a38a6a]">國立臺灣科技大學 工業設計系</strong>，擁有 6 年產品與包裝設計實務經驗，熟悉從外觀設計、結構開發到量產製程的完整開發流程。
                      </p>
                      <p className="text-[17px] text-gray-600 leading-[1.8] font-medium text-justify">
                        擅長品牌前期市場調研與定位分析，能根據產品需求進行 2D／3D 設計規劃，執行草模驗證、建模與工程圖繪製，並具備<strong className="text-gray-900">「依照預算與成本條件調整設計策略的靈活應變能力」</strong>。
                      </p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span> 包裝設計專業深化
                      </h4>
                      <p className="text-[17px] text-gray-600 leading-[1.8] font-medium text-justify">
                        現任職於美律實業股份有限公司，負責 TWS 耳機、電競耳機、Soundbar 等國際品牌電子產品的包裝設計與開發，持續強化<strong className="text-gray-900">「環保包裝結構設計、跨部門專案執行能力及開發實務經驗」</strong>。
                      </p>
                    </div>
                 </div>
               )}

               {/* Experience Content */}
               {activeAboutTab === 'experience' && (
                 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span> 包裝設計領域
                      </h4>
                      <ul className="space-y-6">
                        <li className="text-[17px] text-gray-600 leading-[1.8] font-medium">
                          <strong className="text-gray-900 block mb-2">▶ 國際品牌 TWS／HDT／Soundbar 包裝設計提案 (共25件)</strong>
                          根據產品定位提出多元價位（低／中／高）包裝設計方案，滿足不同市場需求與品牌策略，<strong className="text-[#a38a6a]">接案達成率達 40%</strong>。<br/>
                          在消費性電子產品 RFQ 階段，主導包裝結構設計、2D 工程圖繪製與初步成本分析，成功協助研發單位達成約 <strong className="text-[#a38a6a]">10% 的包材成本節省</strong>。
                        </li>
                        <li className="text-[17px] text-gray-600 leading-[1.8] font-medium">
                          <strong className="text-gray-900 block mb-2">▶ 建立包裝設計資料庫以及市調資料表 (共6件)</strong>
                          彙整 TWS、HDT、Soundbar 紙卡內襯結構規格，形成模組化資料庫，改善專案提案效率，精準對焦市場需求。
                        </li>
                        <li className="text-[17px] text-gray-600 leading-[1.8] font-medium">
                          <strong className="text-gray-900 block mb-2">▶ 參與 HDT 電競耳機開發專案 (共2件)</strong>
                          實際參與兩款 HyperX 電競耳機機型開發，累積從結構設計、打樣修正到量產導入的完整開發經驗。
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span> 產品設計與跨部門協作
                      </h4>
                      <ul className="space-y-4">
                        <li className="text-[17px] text-gray-600 leading-[1.8] font-medium">
                          <strong className="text-gray-900 block">▶ 主導廚電產品開發</strong> 主導易清系列檯面爐（G2522AG、G2623AG）與近吸式油煙機（R7610、R7650）完整開發流程。
                        </li>
                        <li className="text-[17px] text-gray-600 leading-[1.8] font-medium">
                          <strong className="text-gray-900 block">▶ 獲獎與產品落地</strong> 親自承辦金點設計競賽提案並獲得 2 件入選（R3750B、P0233／235）；協助外觀與結構開發並導入量產流程，成功落地產品。
                        </li>
                        <li className="text-[17px] text-gray-600 leading-[1.8] font-medium">
                          <strong className="text-gray-900 block">▶ 供應商協作能力</strong> 能與供應商與工廠密切協作，確保設計順利導入量產並維持品質穩定。
                        </li>
                      </ul>
                    </div>
                 </div>
               )}

               {/* Career Content */}
               {activeAboutTab === 'career' && (
                 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span> 短期目標
                      </h4>
                      <ul className="space-y-4 text-[17px] text-gray-600 leading-[1.8] font-medium list-none">
                        <li className="relative pl-6"><span className="absolute left-0 top-2 w-2 h-2 bg-gray-300 rounded-full"></span> 深入 ESG 永續議題，探索各類紙材、布料等 CMF 特性與加工技術，建立應用知識庫，並與供應商合作開發環保材質。</li>
                        <li className="relative pl-6"><span className="absolute left-0 top-2 w-2 h-2 bg-gray-300 rounded-full"></span> 強化紙材結構設計能力，目標能提出具創新性的設計專利。</li>
                        <li className="relative pl-6"><span className="absolute left-0 top-2 w-2 h-2 bg-gray-300 rounded-full"></span> 培養紙材成本評估能力，根據需求提出兼顧保護性與成本效益的結構優化方案。</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a38a6a]"></span> 中長期目標
                      </h4>
                      <ul className="space-y-4 text-[17px] text-gray-600 leading-[1.8] font-medium list-none">
                        <li className="relative pl-6"><span className="absolute left-0 top-2 w-2 h-2 bg-[#a38a6a]/60 rounded-full"></span> 累積跨國與跨部門合作經驗，強化英文聽說讀寫的能力以應對全球化的工作需求。</li>
                        <li className="relative pl-6"><span className="absolute left-0 top-2 w-2 h-2 bg-[#a38a6a]/60 rounded-full"></span> 持續提升設計落地與製程協作能力，累積更多實戰開發經驗。</li>
                        <li className="relative pl-6"><span className="absolute left-0 top-2 w-2 h-2 bg-[#a38a6a]/60 rounded-full"></span> 建立包裝設計與市場趨勢的連結敏感度，結合行銷視角強化整合能力，朝向具策略思維的設計開發整合型人才邁進。</li>
                      </ul>
                    </div>
                 </div>
               )}

               {/* Philosophy Content */}
               {activeAboutTab === 'philosophy' && (
                 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SpotlightCard className="p-8 rounded-3xl bg-gray-50 border-0">
                        <h4 className="text-xl font-black text-gray-900 mb-4">① 兼具感性與理性</h4>
                        <p className="text-[15px] text-gray-600 leading-[1.8] font-medium">設計不僅是創造視覺與情感價值，更必須考量製程可行性、技術限制、成本控制與品質穩定性。</p>
                      </SpotlightCard>
                      <SpotlightCard className="p-8 rounded-3xl bg-gray-50 border-0">
                        <h4 className="text-xl font-black text-gray-900 mb-4">② 服務於產品與使用者</h4>
                        <p className="text-[15px] text-gray-600 leading-[1.8] font-medium">我重視產品本質，關注設計如何實際提升使用者的便利性與品牌價值，讓設計發揮功能性與影響力。</p>
                      </SpotlightCard>
                      <SpotlightCard className="p-8 rounded-3xl bg-gray-50 border-0">
                        <h4 className="text-xl font-black text-gray-900 mb-4">③ 重視跨部門協作效率</h4>
                        <p className="text-[15px] text-gray-600 leading-[1.8] font-medium">良好的設計來自良好的協作，我樂於與不同角色協同合作，透過積極溝通整合各方需求與資源。</p>
                      </SpotlightCard>
                      <SpotlightCard className="p-8 rounded-3xl bg-gray-50 border-0">
                        <h4 className="text-xl font-black text-gray-900 mb-4">④ 保持熱情與學習動能</h4>
                        <p className="text-[15px] text-gray-600 leading-[1.8] font-medium">對我而言，設計不只是工作，更是一種持續探索的過程。我始終懷抱熱情與好奇心，樂於在團隊中貢獻專業，一同創造實質價值。</p>
                      </SpotlightCard>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100">
                      <p className="text-xl font-black text-[#a38a6a] italic text-center">
                        "非常感謝您的閱讀。如有進一步了解的需要，歡迎與我聯繫。"
                      </p>
                    </div>
                 </div>
               )}

            </Reveal>
          </div>
        </div>
      </section>
`;

const oldAboutRegex = /<section id="about"[\s\S]*?<\/section>/;
content = content.replace(oldAboutRegex, newAboutSection);

fs.writeFileSync('src/App.tsx', content);
