// Daily brief mock data
export const dailyBriefs = [
  {
    id: 'brief-2025-04-03',
    date: '2025-04-03',
    urgency: 'critical',
    bluf: 'Mỹ mở rộng kiểm soát xuất khẩu bán dẫn, EU AI Act có hiệu lực — hai sự kiện này cộng hưởng tạo ra áp lực tái định vị chuỗi công nghệ toàn cầu mà Việt Nam có thể tận dụng trong khung 6-12 tháng tới.',
    events: [
      {
        title: 'BIS cập nhật Entity List: +27 doanh nghiệp bán dẫn Trung Quốc',
        source: 'U.S. Commerce Department — BIS Rule Gazette',
        time: '04:30 EDT (15:30 VN)',
        verified: true,
        confidence: 98,
        type: 'policy',
      },
      {
        title: 'EU AI Act Tier 4 (High-Risk AI) chính thức áp dụng',
        source: 'European Commission Official Journal',
        time: '00:01 CET (06:01 VN)',
        verified: true,
        confidence: 100,
        type: 'policy',
      },
    ],
    strategicAnalysis: `Việc Mỹ mở rộng danh sách Entity List lần thứ 7 trong 24 tháng qua phản ánh chiến lược "small yard, high fence" đang leo thang. Mục tiêu không còn chỉ là Huawei mà đã mở rộng sang toàn bộ hệ sinh thái foundry nội địa Trung Quốc (CXMT, YMTC, Hua Hong). 

Phân tích tương quan với dữ liệu dòng FDI 2023-2025: mỗi lần mở rộng Entity List đều kéo theo làn sóng tái định vị đầu tư +3-6 tháng. Với quy mô lần này, dự kiến $4.2-6.8B sẽ tìm kiếm điểm đến mới tại ASEAN trong Q3-Q4 2025.

EU AI Act tạo ra hiệu ứng thứ hai: các doanh nghiệp công nghệ muốn tiếp cận thị trường EU buộc phải tuân thủ một bộ tiêu chuẩn AI nghiêm ngặt, tạo ra cơ hội cho các quốc gia xây dựng "AI compliance infrastructure" sớm.`,
    vnImplications: [
      { target: 'Kinh tế số / GDP (NQ57)', implication: 'Cơ hội thu hút FDI bán dẫn $2-4B nếu ban hành ưu đãi nhanh trong Q2 2025', urgency: 'high' },
      { target: 'Chuỗi cung ứng', implication: 'Cần đánh giá lại % nhập khẩu linh kiện nguồn gốc TQ trong các DN điện tử FDI tại VN', urgency: 'critical' },
      { target: 'AI Policy', implication: 'Khung pháp lý AI của VN cần alignment với EU AI Act để không mất thị trường xuất khẩu dịch vụ', urgency: 'medium' },
    ],
    recommendations: [
      { action: 'Chỉ thị khẩn trương đánh giá rủi ro chuỗi cung ứng bán dẫn', actor: 'Bộ Kế hoạch & Đầu tư', timeframe: '2 tuần', type: 'immediate' },
      { action: 'Triệu tập nhóm công tác xây dựng AI Sandbox regulation theo tiêu chuẩn EU', actor: 'Bộ TT&TT + Bộ KHCN', timeframe: '1 tháng', type: 'policy' },
      { action: 'Mở cửa sổ FDI đặc biệt cho semiconductor design & packaging với ưu đãi thuế 5 năm', actor: 'Thủ tướng Chính phủ', timeframe: '2 tháng', type: 'strategic' },
    ],
    aiConfidence: 94,
    sources: ['BIS.gov', 'EC Official Journal', 'Bloomberg', 'Reuters', 'ASPI CTT', 'PitchBook FDI Data'],
  },
  {
    id: 'brief-2025-04-02',
    date: '2025-04-02',
    urgency: 'high',
    bluf: 'Samsung xác nhận đầu tư nhà máy HBM4 tại Việt Nam — tín hiệu mạnh nhất từ trước đến nay rằng Việt Nam đang chuyển dịch từ lắp ráp sang sản xuất chip tiên tiến.',
    events: [
      { title: 'Samsung SDI xác nhận gói đầu tư $3.5B HBM4 tại Thái Nguyên', source: 'Samsung IR + MPI Vietnam', time: '09:00 VN', verified: true, confidence: 97, type: 'investment' },
    ],
    strategicAnalysis: 'HBM4 yêu cầu kỹ năng tiên tiến hơn hẳn so với HBM3e hiện tại, kéo theo nhu cầu đào tạo 2,000-3,000 kỹ sư chuyên biệt trong 36 tháng...',
    vnImplications: [
      { target: 'Nhân lực KHCN (NQ57)', implication: 'Thiếu hụt 2,500 kỹ sư bán dẫn nếu không có chương trình đào tạo khẩn cấp', urgency: 'critical' },
    ],
    recommendations: [
      { action: 'Thành lập chương trình học bổng bán dẫn 1,000 sinh viên/năm với Samsung & đối tác', actor: 'Bộ GD&ĐT', timeframe: '3 tháng', type: 'immediate' },
    ],
    aiConfidence: 92,
    sources: ['Samsung IR', 'MPI Vietnam', 'Nikkei Asia'],
  },
];

export const aiAgentActivity = [
  { agent: 'Tech-Scouting Agent', status: 'active', task: 'Đang quét 847 nguồn — phát hiện 3 bằng sáng chế quantum mới từ Google', processed: 2341, found: 47, lastUpdate: '2 phút trước' },
  { agent: 'Policy-Analysis Agent', status: 'active', task: 'Phân tích dự thảo "Chips Act ASEAN" — so sánh gap pháp lý với khuôn khổ VN', processed: 128, found: 9, lastUpdate: '5 phút trước' },
  { agent: 'Risk-Foresight Agent', status: 'idle', task: 'Hoàn thành kịch bản tác động Entity List mới — chờ dữ liệu FDI Q1 2025', processed: 67, found: 12, lastUpdate: '18 phút trước' },
];
