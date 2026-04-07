// Tech signals & trends mock data
export const techGroups = [
  {
    id: 'ai_compute',
    name: 'Trí tuệ Nhân tạo & Hạ tầng Tính toán',
    icon: '🧠',
    maturity: 'commercial',
    maturityLabel: 'Thương mại hóa',
    trends: ['World Models', 'Agentic AI', 'AI Copilots'],
    products: ['TSMC 2nm', 'Snapdragon X Elite', 'Photonic Computing'],
    vnRelevance: 'Tái cơ cấu năng suất lao động tri thức, lập trình. Cơ hội cho startup AI Việt Nam.',
    globalSignal: 94,
    vnReadiness: 42,
    signals: [
      { id: 1, title: 'Meta công bố Llama 4 với khả năng reasoning vượt GPT-4o', source: 'TechCrunch', time: '2h', strength: 'strong', type: 'product' },
      { id: 2, title: 'TSMC bắt đầu thử nghiệm node 1.4nm tại Đài Loan', source: 'SCMP', time: '4h', strength: 'strong', type: 'tech' },
      { id: 3, title: 'Samsung đầu tư $3.5B vào nhà máy chip HBM4 trong Việt Nam', source: 'Reuters', time: '6h', strength: 'strong', type: 'investment' },
    ]
  },
  {
    id: 'quantum_security',
    name: 'Công nghệ Lượng tử & An ninh Mạng',
    icon: '⚛️',
    maturity: 'emerging',
    maturityLabel: 'Tiệm cận chín muồi',
    trends: ['Error-corrected Quantum', 'PQC Migration', 'Quantum Sensing'],
    products: ['IBM Condor 1000Q', 'Quantinuum H2', 'NIST PQC Standards'],
    vnRelevance: 'Cơ sở hạ tầng bảo mật quốc gia. VNPT/Viettel cần chuyển sang mã hóa PQC trước 2030.',
    globalSignal: 71,
    vnReadiness: 18,
    signals: [
      { id: 4, title: 'Mỹ ban hành FIPS 203/204/205 tiêu chuẩn PQC chính thức', source: 'NIST', time: '1d', strength: 'strong', type: 'policy' },
      { id: 5, title: 'Google đạt quantum error rate <0.1% trên Willow chip', source: 'Nature', time: '3d', strength: 'medium', type: 'research' },
    ]
  },
  {
    id: 'robotics_space',
    name: 'Robot & Không gian Tầm thấp',
    icon: '🤖',
    maturity: 'scaling',
    maturityLabel: 'Mở rộng quy mô',
    trends: ['Humanoid Robots', 'LEO Satellite Economy', 'D2D Connectivity'],
    products: ['Tesla Optimus Gen3', 'Figure 02', 'Starlink Direct Cell'],
    vnRelevance: 'UAV nông nghiệp thông minh, cảnh báo thiên tai ĐBSCL & miền Trung. Phủ sóng vùng lõm.',
    globalSignal: 68,
    vnReadiness: 31,
    signals: [
      { id: 6, title: 'SpaceX Starlink D2D coverage mở rộng sang Đông Nam Á Q3 2025', source: 'Space News', time: '5h', strength: 'medium', type: 'product' },
      { id: 7, title: 'VinTech báo cáo thử nghiệm UAV phun thuốc tại Đồng bằng Sông Cửu Long', source: 'VnExpress', time: '8h', strength: 'medium', type: 'local' },
    ]
  },
  {
    id: 'biotech',
    name: 'Công nghệ Y Sinh & Khám phá Tự động',
    icon: '🧬',
    maturity: 'scaling',
    maturityLabel: 'Mở rộng quy mô',
    trends: ['GLP-1 Drugs', 'mRNA Vaccines', 'CRISPR Therapeutics'],
    products: ['Semaglutide 2.0', 'BioNTech mRNA Cancer Vax', 'CRISPR-X platform'],
    vnRelevance: 'Cơ hội phát triển ngành dược phẩm sinh học. Việt Nam có thể trở thành trung tâm thử nghiệm lâm sàng khu vực.',
    globalSignal: 79,
    vnReadiness: 24,
    signals: [
      { id: 8, title: 'FDA phê duyệt vaccine mRNA thế hệ 2 cho RSV và Cúm', source: 'FDA.gov', time: '2d', strength: 'strong', type: 'policy' },
    ]
  },
  {
    id: 'materials_energy',
    name: 'Vật liệu Tiên tiến & Năng lượng Mới',
    icon: '⚡',
    maturity: 'emerging',
    maturityLabel: 'Tiệm cận thương mại',
    trends: ['Solid-State Batteries', 'Perovskite Solar', 'Green Hydrogen'],
    products: ['Toyota All-Solid Battery 2027', 'LONGi Hi-Mo9 29.4%', 'Thyssenkrupp H2 Electrolyzer'],
    vnRelevance: 'An ninh năng lượng, ổn định lưới điện phân tán. Xuất khẩu điện sang Singapore & Mã Lai.',
    globalSignal: 65,
    vnReadiness: 29,
    signals: [
      { id: 9, title: 'CATL công bố cell sodium-ion 200Wh/kg phá kỷ lục thế giới', source: 'TechNode', time: '1d', strength: 'strong', type: 'tech' },
      { id: 10, title: 'Chính phủ VN phê duyệt đường dây điện gió ngoài khơi 3GW với đối tác Đan Mạch', source: 'VGP', time: '3h', strength: 'medium', type: 'policy' },
    ]
  },
];

export const signalAlerts = [
  {
    id: 's1', strength: 'strong', severity: 'critical',
    title: 'Mỹ mở rộng Entity List cho 27 doanh nghiệp bán dẫn Trung Quốc',
    source: 'BIS Rule Gazette', time: '45 phút trước',
    impact: 'Gián đoạn chuỗi cung ứng toàn cầu. Việt Nam cần đánh giá lại nguồn nhập khẩu chip HBM.',
    tags: ['Bán dẫn', 'Thương mại', 'Chuỗi cung ứng'],
    confidence: 98,
  },
  {
    id: 's2', strength: 'strong', severity: 'high',
    title: 'EU AI Act chính thức có hiệu lực, 8 quốc gia ASEAN bắt đầu đánh giá tác động',
    source: 'European Commission', time: '2 giờ trước',
    impact: 'Rào cản xuất khẩu dịch vụ AI sang EU. Cơ hội xây dựng tiêu chuẩn AI ASEAN.',
    tags: ['AI Policy', 'EU', 'Quy định'],
    confidence: 95,
  },
  {
    id: 's3', strength: 'strong', severity: 'high',
    title: 'Japan MEXT công bố gói đầu tư $10B cho bán dẫn thế hệ 2nm với TSMC',
    source: 'Nikkei Asia', time: '3 giờ trước',
    impact: 'Nhật Bản tăng tốc độc lập bán dẫn. Áp lực tái định vị FDI công nghệ vào ASEAN.',
    tags: ['Bán dẫn', 'Nhật Bản', 'FDI'],
    confidence: 91,
  },
  {
    id: 's4', strength: 'medium', severity: 'medium',
    title: 'Quỹ đầu tư mạo hiểm SoftBank Vision Fund III công bố $5B cho AI Agents',
    source: 'Bloomberg', time: '5 giờ trước',
    impact: 'Làn sóng đầu tư vào Agentic AI. Startup Việt Nam có cửa sổ cơ hội 18 tháng.',
    tags: ['AI', 'Đầu tư', 'Startup'],
    confidence: 85,
  },
  {
    id: 's5', strength: 'medium', severity: 'medium',
    title: 'Trung Quốc triển khai hệ thống LEO 6G với 400 vệ tinh đầu tiên',
    source: 'Xinhua Tech', time: '6 giờ trước',
    impact: 'Cạnh tranh Starlink tại châu Á. Cơ hội quản lý không phận thương mại cho Việt Nam.',
    tags: ['6G', 'Vệ tinh', 'Trung Quốc'],
    confidence: 82,
  },
  {
    id: 's6', strength: 'weak', severity: 'low',
    title: 'Arxiv: Framework tối ưu hóa LLM cho ngôn ngữ Đông Nam Á (SeaLLM-v3)',
    source: 'arXiv:2025.04', time: '8 giờ trước',
    impact: 'Tín hiệu sớm về NLP tiếng Việt. Tiềm năng ứng dụng cho chatbot chính phủ.',
    tags: ['NLP', 'Tiếng Việt', 'LLM'],
    confidence: 71,
  },
  {
    id: 's7', strength: 'weak', severity: 'info',
    title: 'GitHub: Mô hình mã nguồn mở cho phát hiện deepfake video đạt 98% accuracy',
    source: 'GitHub Trending', time: '10 giờ trước',
    impact: 'Công cụ bảo vệ thông tin xác thực cho truyền thông quốc gia.',
    tags: ['Deepfake', 'An toàn thông tin', 'Open Source'],
    confidence: 68,
  },
  {
    id: 's8', strength: 'weak', severity: 'info',
    title: 'Reddit r/MachineLearning: Thảo luận về giới hạn energy efficiency của chip AI hiện tại',
    source: 'Reddit', time: '12 giờ trước',
    impact: 'Hướng nghiên cứu mới về neuromorphic computing. Theo dõi.',
    tags: ['AI Hardware', 'Energy', 'Research'],
    confidence: 55,
  },
];

export const tickerMessages = [
  '🔴 BREAKING: Mỹ bổ sung 27 DN bán dẫn TQ vào Entity List — rủi ro chuỗi cung ứng ASEAN',
  '🟡 EU AI Act hiệu lực — Việt Nam cần đánh giá tác động xuất khẩu dịch vụ số',
  '🟢 Samsung FDI chip HBM4 vào Việt Nam — cơ hội thu hút chuỗi cung ứng phụ trợ',
  '🔵 TSMC 2nm bắt đầu sản xuất — mức tăng hiệu năng 15% so với 3nm',
  '🟡 SoftBank Vision Fund III: $5B cho Agentic AI — thời cơ cho startup Đông Nam Á',
  '🔴 Trung Quốc mở rộng hệ thống định danh kỹ thuật số — rủi ro an ninh mạng khu vực',
  '🟢 VN đứng thứ 5 ASEAN AI readiness index 2025 — tăng 2 bậc so với 2024',
  '🔵 Japan-Vietnam hợp tác đào tạo 10,000 kỹ sư bán dẫn đến 2028',
];
