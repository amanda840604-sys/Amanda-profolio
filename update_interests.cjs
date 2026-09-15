const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newInterestsText = `
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-[#121212] mb-12">探索與挑戰</h3>
               <div className="space-y-6 text-[17px] text-gray-500 font-medium leading-[1.8] max-w-3xl">
                 <p>
                   工作之餘，我熱衷於挑戰自我的運動項目，包括健身、馬拉松與登山。這些活動不僅讓我保持身心健康，更讓我在一次次的訓練與突破中，學習如何與自己對話、建立目標並找出實踐方法。
                 </p>
                 <p>
                   對我而言，運動是一種自我探索與壓力釋放的途徑，也深深影響了我在工作上的思考方式與執行力：
                 </p>
                 <ul className="space-y-4">
                   <li className="flex gap-4 items-start"><span className="text-[#a38a6a] font-black">①</span> 運動讓我更堅定、更有彈性，也讓我在生活中保持熱情與正向的態度。</li>
                   <li className="flex gap-4 items-start"><span className="text-[#a38a6a] font-black">②</span> 喜愛與不同領域夥伴交流，從生活中汲取靈感與成長。</li>
                 </ul>
               </div>
`;

// Let's find the interests section text and replace it.
const regex = /<h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-\[0\.9\] text-\[#121212\] mb-12">探索與挑戰<\/h3>[\s\S]*?(?=<\/Reveal>)/;
content = content.replace(regex, newInterestsText);

fs.writeFileSync('src/App.tsx', content);
