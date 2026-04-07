// Mock data: Nghị quyết 57 KPIs and progress
export const nghiQuyet57KPIs = [
  {
    id: 'ai_ranking',
    category: 'Vị thế quốc tế',
    label: 'Cạnh tranh số & ĐMST',
    target2030: 50,
    target2045: 30,
    current: 63,
    unit: 'top',
    trend: '↑2',
    trendUp: true,
    color: '#f43f5e',
    isRank: true,
    subProgressList: [
      { label: 'Top 3 ASEAN (năng lực cạnh tranh số, CP điện tử)', current: 5, target: 3, isRank: true },
      { label: 'Top 50 Thế giới (năng lực cạnh tranh số, CP điện tử)', current: 63, target: 50, isRank: true },
      { label: 'Top 3 ASEAN (Nghiên cứu phát triển Trí tuệ nhân tạo)', current: 6, target: 3, isRank: true },
      { label: 'Top 30 Thế giới (Đổi mới sáng tạo & chuyển đổi số)', current: 44, target: 30, isRank: true }
    ]
  },
  {
    id: 'digital_economy',
    category: 'Đóng góp kinh tế',
    label: 'Kinh tế số & Tăng trưởng',
    target2030: 30,
    target2045: 50,
    current: 18.3,
    unit: '%',
    trend: '+2.1%',
    trendUp: true,
    color: '#22d3a0',
    subProgressList: [
      { label: 'Năng suất nhân tố tổng hợp (TFP)', current: 46.2, target: 55, isRank: false, unit: '%' },
      { label: 'Kinh tế số chiếm tối thiểu trong GDP (2030)', current: 18.3, target: 30, isRank: false, unit: '%' },
      { label: 'Xuất khẩu công nghệ cao', current: 41.7, target: 50, isRank: false, unit: '%' },
      { label: 'Quy mô kinh tế số (Mục tiêu 2045 Nước PT)', current: 18.3, target: 50, isRank: false, unit: '%' }
    ]
  },
  {
    id: 'enterprise_dev',
    category: 'Phát triển doanh nghiệp',
    label: 'ĐMST và Số lượng DN ngang tầm',
    target2030: 40,
    target2045: 80,
    current: 25,
    unit: '%',
    trend: '+5%',
    trendUp: true,
    color: '#f59e0b',
    subProgressList: [
      { label: 'Tỷ lệ doanh nghiệp có hoạt động ĐMST (2030)', current: 25, target: 40, isRank: false, unit: '%' },
      { label: 'DN công nghệ số ngang tầm tiên tiến (2030)', current: 2, target: 5, isRank: false, unit: ' DN' },
      { label: 'Tỷ lệ DN công nghệ số tương đương các nước PT', current: 18, target: 100, isRank: false, unit: '%' },
      { label: 'Doanh nghiệp ngang tầm quốc tế (2045)', current: 3, target: 10, isRank: false, unit: ' DN' }
    ]
  },
  {
    id: 'rd_investment',
    category: 'Nguồn lực tài chính',
    label: 'Đầu tư R&D & KHCN',
    target2030: 2,
    target2045: 3,
    current: 0.53,
    unit: '%',
    trend: '+0.08%',
    trendUp: true,
    color: '#3b82f6',
    subProgressList: [
      { label: 'Chi cho R&D / GDP (2030)', current: 0.53, target: 2, isRank: false, unit: '%' },
      { label: 'Nguồn đầu tư R&D từ xã hội (2030)', current: 45, target: 60, isRank: false, unit: '%' },
      { label: 'Chi ngân sách hằng năm cho KHCN (2030)', current: 1.2, target: 3, isRank: false, unit: '%' },
      { label: 'Nguồn lực NT & tư nhân mở rộng toàn cầu', current: 35, target: 100, isRank: false, unit: '%' }
    ]
  },
  {
    id: 'researchers',
    category: 'Nhân lực & Hạ tầng',
    label: 'Nhân lực R&D và Hạ tầng số',
    target2030: 12,
    target2045: 20,
    current: 7.2,
    unit: 'người',
    trend: '+0.6',
    trendUp: true,
    color: '#a855f7',
    subProgressList: [
      { label: 'Nhà nghiên cứu / 1 vạn dân (2030)', current: 7.2, target: 12, isRank: false, unit: ' người' },
      { label: 'Tổ chức KHCN hạng khu vực/thế giới (2030)', current: 15, target: 45, isRank: false, unit: ' cơ sở' },
      { label: 'Phủ sóng 5G toàn quốc (2030)', current: 65, target: 100, isRank: false, unit: '%' },
      { label: 'Trung tâm CN CNC khu vực (2045)', current: 20, target: 100, isRank: false, unit: '%' }
    ]
  },
];

export const nghiQuyetTable = [
  { category: 'Vị thế quốc tế', target2030: 'Nằm trong nhóm 3 nước dẫn đầu ASEAN và top 50 thế giới về năng lực cạnh tranh số, Chính phủ điện tử; Top 3 ASEAN về nghiên cứu phát triển Trí tuệ nhân tạo.', target2045: 'Lọt vào nhóm 30 nước dẫn đầu thế giới về đổi mới sáng tạo và chuyển đổi số.', status: 'on-track' },
  { category: 'Đóng góp kinh tế', target2030: 'Năng suất nhân tố tổng hợp (TFP) đóng góp trên 55% vào tăng trưởng. Kinh tế số chiếm tối thiểu 30% GDP. Xuất khẩu công nghệ cao chiếm trên 50%.', target2045: 'Quy mô kinh tế số đạt tối thiểu 50% GDP, đưa Việt Nam trở thành nước phát triển, thu nhập cao.', status: 'behind' },
  { category: 'Phát triển doanh nghiệp', target2030: 'Tỷ lệ doanh nghiệp có hoạt động đổi mới sáng tạo đạt trên 40%. Tối thiểu 5 doanh nghiệp công nghệ số ngang tầm các nước tiên tiến.', target2045: 'Tỷ lệ doanh nghiệp công nghệ số tương đương các nước phát triển. Tối thiểu 10 doanh nghiệp ngang tầm quốc tế.', status: 'behind' },
  { category: 'Nguồn lực tài chính', target2030: 'Chi cho R&D đạt 2% GDP (nguồn từ xã hội chiếm hơn 60%). Bố trí ít nhất 3% tổng chi ngân sách hằng năm cho phát triển KHCN.', target2045: 'Nguồn lực nhà nước và tư nhân hòa quyện, duy trì và mở rộng để cạnh tranh toàn cầu.', status: 'critical' },
  { category: 'Nhân lực & Hạ tầng', target2030: '12 nhà nghiên cứu trên 1 vạn dân. 40-50 tổ chức KHCN xếp hạng khu vực/thế giới. Phủ sóng 5G toàn quốc.', target2045: 'Mạng lưới chuyên gia toàn cầu, trung tâm công nghiệp công nghệ số của khu vực.', status: 'behind' },
];
