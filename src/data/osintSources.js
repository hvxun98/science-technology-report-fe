// OSINT sources and social listening data
export const osintSources = [
  // Government & Funding
  { id: 1, category: 'gov', name: 'OSTP White House', url: 'whitehouse.gov', region: 'US', status: 'live', lastUpdate: '8 phút', frequency: 'Thời gian thực', signals: 23 },
  { id: 2, category: 'gov', name: 'DARPA News', url: 'darpa.mil', region: 'US', status: 'live', lastUpdate: '12 phút', frequency: '4 giờ', signals: 8 },
  { id: 3, category: 'gov', name: 'NSF Awards', url: 'nsf.gov', region: 'US', status: 'cached', lastUpdate: '2 giờ', frequency: '24 giờ', signals: 45 },
  { id: 4, category: 'gov', name: 'MOST China', url: 'most.gov.cn', region: 'CN', status: 'live', lastUpdate: '25 phút', frequency: '2 giờ', signals: 31 },
  { id: 5, category: 'gov', name: 'CAS Institute', url: 'cas.cn', region: 'CN', status: 'live', lastUpdate: '1 giờ', frequency: '4 giờ', signals: 18 },
  { id: 6, category: 'gov', name: 'MEXT Japan', url: 'mext.go.jp', region: 'JP', status: 'cached', lastUpdate: '3 giờ', frequency: '12 giờ', signals: 12 },
  { id: 7, category: 'gov', name: 'MSIT Korea', url: 'msit.go.kr', region: 'KR', status: 'live', lastUpdate: '45 phút', frequency: '6 giờ', signals: 9 },
  // Think Tanks
  { id: 8, category: 'think_tank', name: 'Belfer Center', url: 'belfer.hks.harvard.edu', region: 'US', status: 'live', lastUpdate: '3 giờ', frequency: '24 giờ', signals: 5 },
  { id: 9, category: 'think_tank', name: 'ASPI CTT', url: 'aspi.org.au', region: 'AU', status: 'live', lastUpdate: '6 giờ', frequency: '24 giờ', signals: 11 },
  { id: 10, category: 'think_tank', name: 'CSIS', url: 'csis.org', region: 'US', status: 'live', lastUpdate: '4 giờ', frequency: '12 giờ', signals: 7 },
  { id: 11, category: 'think_tank', name: 'Brookings', url: 'brookings.edu', region: 'US', status: 'cached', lastUpdate: '8 giờ', frequency: '24 giờ', signals: 4 },
  { id: 12, category: 'think_tank', name: 'RAND Corporation', url: 'rand.org', region: 'US', status: 'live', lastUpdate: '5 giờ', frequency: '24 giờ', signals: 6 },
  // Tech Media
  { id: 13, category: 'media', name: 'TechCrunch', url: 'techcrunch.com', region: 'US', status: 'live', lastUpdate: '3 phút', frequency: 'Thời gian thực', signals: 124 },
  { id: 14, category: 'media', name: 'TechNode', url: 'technode.com', region: 'CN', status: 'live', lastUpdate: '8 phút', frequency: '30 phút', signals: 67 },
  { id: 15, category: 'media', name: 'SCMP', url: 'scmp.com', region: 'HK', status: 'live', lastUpdate: '15 phút', frequency: '1 giờ', signals: 89 },
  { id: 16, category: 'media', name: 'Nikkei Asia', url: 'asia.nikkei.com', region: 'JP', status: 'live', lastUpdate: '10 phút', frequency: '1 giờ', signals: 52 },
  { id: 17, category: 'media', name: 'arXiv Preprints', url: 'arxiv.org', region: 'Global', status: 'live', lastUpdate: '30 phút', frequency: '2 giờ', signals: 891 },
  // KOLs
  { id: 18, category: 'kol', name: 'Sam Altman (@OpenAI)', url: 'x.com/sama', region: 'US', status: 'live', lastUpdate: '5 giờ', frequency: 'Thời gian thực', signals: 3 },
  { id: 19, category: 'kol', name: 'Yann LeCun (@Meta)', url: 'x.com/ylecun', region: 'US', status: 'live', lastUpdate: '2 giờ', frequency: 'Thời gian thực', signals: 5 },
  { id: 20, category: 'kol', name: 'Andrew Ng', url: 'x.com/AndrewYNg', region: 'US', status: 'cached', lastUpdate: '1 ngày', frequency: 'Hàng ngày', signals: 2 },
  { id: 21, category: 'kol', name: 'Robin Li (Baidu)', url: 'weibo.com/robinli', region: 'CN', status: 'live', lastUpdate: '4 giờ', frequency: 'Thời gian thực', signals: 4 },
];

export const signalTiers = [
  {
    level: 'weak',
    label: 'Tín hiệu Yếu',
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.2)',
    sources: ['arXiv / bioRxiv preprints', 'Patent filings (USPTO, EPO, CNIPA)', 'Reddit r/MachineLearning', 'GitHub Trending', 'Hacker News'],
    description: 'Tín hiệu sớm từ cộng đồng nghiên cứu và kỹ thuật, chưa được xác nhận nhưng có tiềm năng định hướng cao.',
    examples: ['Bài preprint về kiến trúc transformer mới trên arXiv', 'Patent về vật liệu pin thế hệ mới từ CATL', 'Thread kỹ thuật về giới hạn GPU hiện tại'],
    count: 341,
    icon: '📡',
  },
  {
    level: 'medium',
    label: 'Tín hiệu Trung',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.2)',
    sources: ['VentureBeat / CB Insights', 'Diễn đàn Boao, ZGC, CES', 'Báo cáo VC (Sequoia, SoftBank)', 'LinkedIn của lãnh đạo R&D', 'Tech conference proceedings'],
    description: 'Tín hiệu từ thị trường vốn và các diễn đàn công nghiệp — phản ánh hướng đầu tư thực tế.',
    examples: ['SoftBank Vision Fund III công bố chiến lược AI Agents', 'Báo cáo Boao Forum về hội tụ AI-bán dẫn', 'Founder Robinhood bình luận về FinTech AI'],
    count: 127,
    icon: '🔭',
  },
  {
    level: 'strong',
    label: 'Tín hiệu Mạnh',
    color: '#f43f5e',
    bgColor: 'rgba(244,63,94,0.08)',
    borderColor: 'rgba(244,63,94,0.2)',
    sources: ['Tuyên bố chính phủ / Federal Register', 'Dự thảo luật quốc hội', 'Thông cáo báo chí chính thức', 'Báo cáo phân tích chiến lược (RAND, CSIS)'],
    description: 'Tín hiệu xác nhận từ cơ quan chính phủ và tổ chức chiến lược — tác động ngay lập tức đến chính sách.',
    examples: ['EU AI Act chính thức có hiệu lực', 'BIS Entity List cập nhật', 'Tuyên bố G7 về chip security', 'NIST PQC standards release'],
    count: 48,
    icon: '🚨',
  },
];

export const socialFeed = [
  { id: 1, platform: 'X', author: 'Sam Altman', handle: '@sama', time: '3h', content: 'The gap between frontier AI and everything else is going to keep increasing. The next 2 years will be more surprising than the last 2.', signal: 'weak', tags: ['AGI', 'AI Frontier'], likes: 45221, rt: 8934 },
  { id: 2, platform: 'LinkedIn', author: 'Jensen Huang', handle: 'NVIDIA CEO', time: '5h', content: 'Physical AI is happening. Robots that can reason, plan, and act in the physical world. We\'re 5x ahead in sovereign AI deployments vs competitors.', signal: 'medium', tags: ['Robotics', 'Physical AI'], likes: 32100, rt: 5421 },
  { id: 3, platform: 'Weibo', author: '中科院之声', handle: '@CAS_official', time: '6h', content: '我院量子计算团队完成512量子bit纠错演示，相干时间突破10ms——比此前纪录提升40倍。', signal: 'strong', tags: ['Lượng tử', 'CAS', 'China'], likes: 18934, rt: 3211, translated: 'Nhóm tính toán lượng tử của CAS hoàn thành demo sửa lỗi 512 qubit, thời gian kết hợp vượt 10ms — tăng 40 lần so với kỷ lục trước.' },
  { id: 4, platform: 'X', author: 'Yann LeCun', handle: '@ylecun', time: '8h', content: 'Current LLMs will never reach AGI. We need systems that understand the physical world through self-supervised learning from video. Disagreeing with Sam here.', signal: 'medium', tags: ['AGI', 'AI Research'], likes: 28431, rt: 7234 },
  { id: 5, platform: 'X', author: 'DARPA', handle: '@DARPA', time: '12h', content: 'DARPA announces $300M IRAD for next-gen semiconductor packaging through SMART program. 8 university partners onboarded.', signal: 'strong', tags: ['Bán dẫn', 'DARPA', 'Funding'], likes: 5421, rt: 2134 },
];
