// Geopolitical competition profiles
export const belferWeights = [
  { tech: 'Bán dẫn', weight: 35, color: '#f43f5e', icon: '💎' },
  { tech: 'Trí tuệ Nhân tạo', weight: 25, color: '#3b82f6', icon: '🧠' },
  { tech: 'Công nghệ Sinh học', weight: 20, color: '#22d3a0', icon: '🧬' },
  { tech: 'Không gian', weight: 15, color: '#f59e0b', icon: '🚀' },
  { tech: 'Lượng tử', weight: 5, color: '#a855f7', icon: '⚛️' },
];

export const countryProfiles = [
  {
    country: 'Mỹ', code: 'US', flag: '🇺🇸',
    score: 92, rank: 1,
    semi: 88, ai: 96, bio: 91, space: 94, quantum: 85,
    tmr: 'high', // Technology Monopoly Risk
    strengths: ['GPT-level AI', 'TSMC Arizona', 'DARPA ecosystem'],
    threats: ['China semiconductor catch-up', 'Talent brain drain'],
    color: '#3b82f6',
  },
  {
    country: 'Trung Quốc', code: 'CN', flag: '🇨🇳',
    score: 79, rank: 2,
    semi: 71, ai: 84, bio: 78, space: 81, quantum: 73,
    tmr: 'critical',
    strengths: ['CATL battery dominance', 'Huawei ecosystem', 'State-driven R&D'],
    threats: ['Export controls', 'Talent emigration', 'IP barriers'],
    color: '#f43f5e',
  },
  {
    country: 'EU', code: 'EU', flag: '🇪🇺',
    score: 72, rank: 3,
    semi: 68, ai: 71, bio: 79, space: 74, quantum: 78,
    tmr: 'medium',
    strengths: ['ASML monopoly', 'Regulatory leadership', 'Quantum computing'],
    threats: ['AI Act barriers', 'US-China squeeze', 'Semiconductor gap'],
    color: '#22d3a0',
  },
  {
    country: 'Nhật Bản', code: 'JP', flag: '🇯🇵',
    score: 68, rank: 4,
    semi: 74, ai: 62, bio: 71, space: 65, quantum: 70,
    tmr: 'medium',
    strengths: ['Material science', 'TSMC + MEXT', 'Robotics'],
    threats: ['Aging population', 'Slow AI adoption', 'Economic stagnation'],
    color: '#f59e0b',
  },
  {
    country: 'Hàn Quốc', code: 'KR', flag: '🇰🇷',
    score: 71, rank: 5,
    semi: 82, ai: 68, bio: 65, space: 58, quantum: 61,
    tmr: 'medium',
    strengths: ['Samsung/SK Hynix HBM', 'Display tech', '5G infrastructure'],
    threats: ['China competition in memory', 'North Korea cyber'],
    color: '#a855f7',
  },
  {
    country: 'Việt Nam', code: 'VN', flag: '🇻🇳',
    score: 31, rank: 18,
    semi: 28, ai: 34, bio: 22, space: 35, quantum: 15,
    tmr: 'low',
    strengths: ['Young engineers', 'FDI destination', 'Growing digital economy'],
    threats: ['R&D gap', 'Brain drain', 'IP ecosystem immaturity'],
    color: '#1e4079',
    isVietnam: true,
  },
];

export const aspiTMR = [
  { tech: 'AI tổng quát (LLM)', top10PaperShare: { US: 42, CN: 38, EU: 12, others: 8 }, risk: 'critical' },
  { tech: 'Bán dẫn tiên tiến', top10PaperShare: { US: 35, CN: 29, KR: 18, others: 18 }, risk: 'high' },
  { tech: 'Lượng tử', top10PaperShare: { US: 38, CN: 32, EU: 19, others: 11 }, risk: 'high' },
  { tech: 'Mô hình năng lượng hạt nhân', top10PaperShare: { US: 45, EU: 31, others: 24 }, risk: 'medium' },
  { tech: 'Công nghệ Y sinh', top10PaperShare: { US: 41, EU: 28, CN: 18, others: 13 }, risk: 'medium' },
  { tech: 'Vật liệu tiên tiến', top10PaperShare: { CN: 38, US: 28, EU: 21, others: 13 }, risk: 'high' },
];

export const supplyChainRisks = [
  { item: 'GPU tiên tiến (H100/H200)', dependency: 'NVIDIA (US)', risk: 'critical', vnAction: 'Đàm phán quota FDI data center' },
  { item: 'Wafer bán dẫn 300mm', dependency: 'TSMC / Samsung', risk: 'high', vnAction: 'Xúc tiến đầu tư giai đoạn kiểm thử' },
  { item: 'Đất hiếm cho pin', dependency: 'Trung Quốc 85%', risk: 'high', vnAction: 'Khai thác đất hiếm trong nước (Lai Châu)' },
  { item: 'Quang học ASML EUV', dependency: 'ASML (NL)', risk: 'medium', vnAction: 'Đầu tư đào tạo kỹ sư quang học' },
  { item: 'Phần mềm EDA', dependency: 'Synopsys / Cadence (US)', risk: 'medium', vnAction: 'Phát triển EDA nguồn mở (EDA Vietnam)' },
];
