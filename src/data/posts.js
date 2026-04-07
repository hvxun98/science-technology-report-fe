const getGenericAnalysis = (customOptions) => ({
  vietnamImportance: 'Sự kiện này tác động trực tiếp đến định hướng vĩ mô và chiến lược phát triển công nghệ cao (AI, Bán dẫn) của Việt Nam, đòi hỏi sự điều chỉnh linh hoạt trong ngắn hạn để nắm bắt cơ hội.',
  coreEvents: {
    verified: 'Tin tức này đã được xác nhận thông qua các văn bản, báo cáo chính thống từ các cơ quan và viện nghiên cứu uy tín.',
    socialPrediction: 'Các cộng đồng phân tích tình báo và MXH dự đoán sẽ có những chuyển biến mạnh về dòng vốn FDI và chính sách khu vực trong thời gian tới.'
  },
  causeEvaluation: 'Bắt nguồn từ cuộc đua công nghệ toàn cầu, bảo hộ chuỗi cung ứng chiến lược và nỗ lực kìm hãm đối thủ cạnh tranh của các nước lớn.',
  resolution57Link: 'Gắn kết mật thiết với các nhóm nhiệm vụ khoa học công nghệ trọng tâm. Tạo dư địa lớn để áp dụng các cơ chế Sandbox (khu thử nghiệm thể chế) đặc thù về công nghệ.',
  actionOptions: customOptions || [
    'Kiến nghị Chính phủ rà soát luật đầu tư, nới lỏng giới hạn sở hữu nước ngoài trong các dự án deep-tech.',
    'Thiết lập quỹ VC/Venture mạo hiểm mới trực thuộc Nhà nước để ươm tạo startup quốc gia.',
    'Thay đổi chính sách mua sắm công, bắt buộc tỷ lệ nội địa hóa 20% cho các thiết bị an ninh quốc gia.'
  ]
});

export const POSTS = [
  { 
    id: 1, 
    source: 'Reuters', 
    sourceType: 'web', 
    pubTime: '8 phút trước', 
    sentiment: 'negative', 
    signalLevel: 'strong', 
    title: 'Mỹ bổ sung 27 công ty bán dẫn Trung Quốc vào Entity List, bao gồm nhà sản xuất chip tiên tiến CXMT', 
    tags: ['Bán dẫn', 'Xuất khẩu'], 
    likes: 120, 
    comments: 12, 
    shares: 5,
    content: 'Bộ Thương mại Hoa Kỳ (BIS) vừa công bố lệnh trừng phạt mới, bổ sung 27 thực thể Trung Quốc vào danh sách đen thương mại (Entity List). Trong số này, đáng chú ý nhất là CXMT (ChangXin Memory Technologies) - niềm hy vọng lớn nhất của Trung Quốc trong lĩnh vực chip nhớ DRAM. Lệnh cấm này được cho là đòn giáng mạnh vào nỗ lực tự chủ bán dẫn của Bắc Kinh trong bối cảnh cuộc chiến công nghệ Mỹ-Trung tiếp tục leo thang.',
    strategicAnalysis: {
      vietnamImportance: 'Mở ra cơ hội lớn để Việt Nam thu hút làn sóng dịch chuyển FDI chuỗi cung ứng bán dẫn (chiến lược "China + 1") từ các tập đoàn đang nỗ lực đa dạng hóa để tránh rủi ro địa chính trị.',
      coreEvents: {
        verified: 'BIS chính thức thêm 27 thực thể bản địa TQ (có CXMT) vào danh sách đen Entity List, cấm mọi hành vi xuất khẩu công nghệ gốc Mỹ.',
        socialPrediction: 'Giới quan sát trên X (Twitter) dự báo Bắc Kinh sẽ sớm có biện pháp trả đũa nhắm vào khoáng sản hiếm hoặc hạn chế thị trường đối với Apple/Tesla.'
      },
      causeEvaluation: 'Nguyên nhân trực tiếp là nỗ lực của Mỹ nhằm kìm hãm sự phát triển cụm công nghệ chip nhớ RAM nội địa của TQ, đảm bảo lợi thế kiểm soát an ninh quốc gia và bảo vệ lợi ích của Micron.',
      resolution57Link: 'Hoàn toàn phù hợp với mục tiêu NQ57 về định vị Việt Nam trong chuỗi giá trị bán dẫn toàn cầu. Cơ hội mở ra Sandbox: Thành lập khu phi thuế quan (Free Trade Zone) riêng biệt chuyên thu hút các nhà máy OSAT.',
      actionOptions: [
        'Kiến nghị rà soát luật đầu tư: Cho phép ưu đãi thuế suất 0% trong 10 năm đầu cho các dự án OSAT thay vì 4 năm như hiện hành.',
        'Thiết lập quỹ mạo hiểm mới đồng tài trợ (Co-investment) hỗ trợ các kỹ sư người Việt tại Mỹ về nước khởi nghiệp IC Design.',
        'Đẩy nhanh tiến độ GPMB tại các KCN CNC phía Bắc, chuẩn bị sẵn sàng mặt bằng "sạch" cho sóng dịch chuyển.'
      ]
    }
  },
  { 
    id: 2, 
    source: 'TechCrunch', 
    sourceType: 'web', 
    pubTime: '25 phút trước', 
    sentiment: 'positive', 
    signalLevel: 'medium', 
    title: 'Samsung xác nhận đầu tư $3.5 tỷ vào nhà máy HBM4 tại Thái Nguyên, Việt Nam — bước chuyển từ lắp ráp sang sản xuất chip cao cấp', 
    tags: ['FDI', 'Việt Nam'], 
    likes: 245, 
    comments: 34, 
    shares: 18,
    content: 'Samsung Electronics đã chính thức thông báo kế hoạch mở rộng đầu tư trị giá 3,5 tỷ USD tại tỉnh Thái Nguyên. Mục tiêu của dự án là xây dựng dây chuyền sản xuất bộ nhớ băng thông cao (HBM4) thế hệ mới nhất, phục vụ cho hạ tầng AI toàn cầu. Đây là lần đầu tiên Samsung đưa công nghệ sản xuất chip tiên tiến nhất của mình ra ngoài lãnh thổ Hàn Quốc, khẳng định vị thế chiến lược của Việt Nam trong chuỗi giá trị bán dẫn toàn cầu.',
    strategicAnalysis: {
      vietnamImportance: 'Khẳng định năng lực hấp thụ công nghệ cao của VN, đánh dấu bước ngoặt lịch sử: chuyển từ gia công/lắp ráp giá trị thấp sang chuỗi cung ứng cốt lõi phục vụ hạ tầng AI thế giới.',
      coreEvents: {
        verified: 'Samsung Electronics chính thức xác nhận rót 3.5 tỷ USD xây dây chuyền HBM4 (High Bandwidth Memory) tại cơ sở Thái Nguyên.',
        socialPrediction: 'Nhiều phân tích vĩ mô dự đoán động thái này sẽ kéo theo chuỗi 50-70 nhà cung cấp cấp 1 (Tier 1) của Hàn Quốc đồng loạt chuyển xưởng sang Bắc Ninh, Thái Nguyên trong năm 2027.'
      },
      causeEvaluation: 'Samsung cần phân tán rủi ro tập trung sản xuất, tận dụng chính sách ưu đãi của VN và lực lượng lao động đang tăng trưởng tốt để giảm giá thành, đối đầu trực tiếp với SK Hynix.',
      resolution57Link: 'Đáp ứng trung tâm Mục tiêu 3 của NQ57 (thu hút tập đoàn công nghệ hàng đầu đặt cứ điểm). Đề xuất Sandbox: Triển khai Cơ chế Mua bán điện trực tiếp (DPPA) nhằm cam kết cung cấp 100% năng lượng tái tạo cho dự án.',
      actionOptions: [
        'Hành động fast-track: Triển khai "Luồng xanh hải quan" đặc biệt hóa, không cần chờ kiểm tra vật lý đối với máy móc quang khắc EUV trị giá cao.',
        'Hợp tác bộ ban ngành: Kiến nghị thay đổi chính sách mua sắm trang thiết bị server chính phủ, ưu tiên chip nhớ đóng gói tại VN.',
        'Lập tổ công tác đào tạo: Chi quỹ giải ngân hỗ trợ thực tập hưởng lương cho 5,000 kỹ sư vi mạch tại các trường ĐH lớn.'
      ]
    }
  },
  { 
    id: 3, 
    source: 'European Commission', 
    sourceType: 'gov', 
    pubTime: '2 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'strong', 
    title: 'EU AI Act Tier 4 chính thức có hiệu lực từ 02/08 — 8 quốc gia ASEAN bắt đầu đánh giá tác động pháp lý', 
    tags: ['AI Policy', 'EU', 'ASEAN'], 
    likes: 45, 
    comments: 8, 
    shares: 12,
    content: 'Đạo luật Trí tuệ Nhân tạo của Liên minh Châu Âu (EU AI Act) đã bước sang giai đoạn thực thi quan trọng nhất (Tier 4), tập trung vào các hệ thống AI có rủi ro cao. Điều đáng chú ý là 8 quốc gia ASEAN, bao gồm Việt Nam, đã bắt đầu khởi động quy trình rà soát pháp lý để đảm bảo các doanh nghiệp công nghệ trong khu vực có thể tiếp tục xuất khẩu dịch vụ sang thị trường châu Âu mà không vi phạm quy định mới.',
    strategicAnalysis: {
      vietnamImportance: 'Tác động mang tính sống còn quyết định liệu các doanh nghiệp xuất khẩu phần mềm/IT (FPT, CMC, VNG) của Việt Nam có được tiếp tục cung cấp dịch vụ công nghệ sang thị trường tỷ đô EU hay không.',
      coreEvents: {
        verified: 'Giai đoạn 4 của EU AI Act áp đặt điều kiện kiểm toán ngặt nghèo lên AI rủi ro cao đã chính thức có hiệu lực pháp lý.',
        socialPrediction: 'Nhiều chuyên gia dữ liệu dự đoán khoảng 30% startup AI Đông Nam Á sẽ phải hủy bỏ thương vụ mở rộng sang Châu Âu vì chi phí tuân thủ vượt quá khả năng tài chính (ước tính $300k - $500k/năm).'
      },
      causeEvaluation: 'EU đang sử dụng "Hiệu ứng Brussels" - dùng luật lệ để định hình tiêu chuẩn AI toàn cầu - nhằm bảo vệ người dân của họ, đồng thời gián tiếp làm suy yếu thế độc quyền của Big Tech Mỹ.',
      resolution57Link: 'Gắn kết mục tiêu xây dựng hành lang pháp lý công nghệ mở và an toàn. Sandbox lý tưởng: Cơ chế Thử nghiệm Kiểm toán AI (AI Auditing Sandbox) nội bộ quy mô quốc gia trước khi áp vào luật chính thức.',
      actionOptions: [
        'Thành lập văn phòng/cơ quan cấp Bộ chuyên trách cấp Chứng nhận tương thích EU AI Act để giảm chi phí kiểm toán.',
        'Kiến nghị thiết lập quỹ tài trợ ODA Châu Âu hỗ trợ gói dịch vụ pháp lý miễn phí cho startup AI Việt.',
        'Bổ sung môn Đạo đức Trí tuệ nhân tạo (AI Ethics & Compliance) thành môn học bắt buộc trong giáo trình khối ngành CNTT.'
      ]
    }
  },
  { 
    id: 4, 
    source: 'Nikkei Asia', 
    sourceType: 'web', 
    pubTime: '3 giờ trước', 
    sentiment: 'positive', 
    signalLevel: 'medium', 
    title: 'Nhật Bản tăng gấp đôi ngân sách quantum research lên ¥200 tỷ cho FY2026 — cuộc đua lượng tử bước vào giai đoạn quốc gia', 
    tags: ['Lượng tử', 'Nhật Bản'], 
    likes: 112, 
    comments: 15, 
    shares: 28,
    content: 'Chính phủ Nhật Bản vừa phê duyệt kế hoạch ngân sách bổ sung cho năm tài chính 2026, trong đó khoản chi cho nghiên cứu và phát triển điện toán lượng tử tăng vọt lên mức 200 tỷ Yên. Nhật Bản đặt mục tiêu tự chủ công nghệ lượng tử để giảm phụ thuộc vào các nền tảng của Hoa Kỳ và Trung Quốc, đồng thời xây dựng hệ sinh thái ứng dụng lượng tử trong y sinh và tài chính.',
    strategicAnalysis: getGenericAnalysis([
        'Thúc đẩy ký kết R&D viện trợ song phương với MEXT Nhật Bản về hạ tầng mô phỏng lượng tử giả lập.',
        'Thành lập quỹ mạo hiểm khoa học cơ bản QuantumTech VN.'
    ])
  },
  { 
    id: 5, 
    source: 'arXiv', 
    sourceType: 'research', 
    pubTime: '4 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'weak', 
    title: '[2504.08113] SeaLLM-v3: Large Language Models for Southeast Asian Languages with SoTA Performance on Vietnamese NLP Tasks', 
    tags: ['NLP', 'AI', 'Tiếng Việt'], 
    likes: 89, 
    comments: 5, 
    shares: 20,
    content: 'Một nhóm nghiên cứu quốc tế đã công bố SeaLLM-v3, mô hình ngôn ngữ lớn chuyên biệt cho khu vực Đông Nam Á. Kết quả benchmark cho thấy mô hình này vượt trội hơn GPT-4o trong các tác vụ xử lý ngôn ngữ tự nhiên tiếng Việt, đặc biệt là trong lĩnh vực pháp lý và y tế nhờ bộ dữ liệu huấn luyện đặc thù địa phương.',
    strategicAnalysis: getGenericAnalysis([
        'Kiến nghị rà soát các quy định về lưu trữ dữ liệu quốc gia, thúc đẩy xây dựng các kho data mở chuẩn hoá cho AI.',
        'Thay đổi chính sách mua sắm công, ưu tiên ứng dụng các LLM có khả năng bảo mật nội địa hóa (Sovereign AI).'
    ])
  },
  { 
    id: 6, 
    source: 'Bloomberg', 
    sourceType: 'web', 
    pubTime: '5 giờ trước', 
    sentiment: 'positive', 
    signalLevel: 'medium', 
    title: 'Sequoia Capital SEA công bố fund $3B: 60% vào AI infrastructure, 40% climate tech — Việt Nam trong top 3 thị trường mục tiêu', 
    tags: ['Đầu tư', 'VC', 'AI'], 
    likes: 389, 
    comments: 61, 
    shares: 94,
    content: 'Quỹ đầu tư mạo hiểm Sequoia Capital khu vực Đông Nam Á vừa hoàn tất đợt huy động vốn kỷ lục 3 tỷ USD. Theo tuyên bố, quỹ sẽ ưu tiên rót vốn vào các hạ tầng AI và công nghệ xanh. Việt Nam cùng với Indonesia và Singapore là ba quốc gia trọng điểm mà quỹ đánh giá có tiềm năng đột phá lớn nhất về kinh tế số trong thập kỷ tới.',
    strategicAnalysis: getGenericAnalysis([
        'Thiết lập Quỹ mạo hiểm mới (chương trình Matching Fund: Nhà nước góp vốn tỷ lệ 1:1 với ngoại) dành riêng cho Deeptech/ClimateTech.',
        'Kiến nghị rà soát luật đầu tư, dỡ bỏ trần giới hạn công ty thoái vốn để VC dễ tiếp cận.'
    ])
  },
  { 
    id: 7, 
    source: 'TechNode', 
    sourceType: 'web', 
    pubTime: '6 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'strong', 
    title: 'CATL công bố cell sodium-ion 200Wh/kg — kỷ lục mới về năng lượng riêng, cạnh tranh trực tiếp với lithium-ion trong xe điện giá thấp', 
    tags: ['Pin', 'Năng lượng', 'Trung Quốc'], 
    likes: 521, 
    comments: 78, 
    shares: 145,
    content: 'CATL đã giới thiệu thế hệ pin sodium-ion mới nhất với mật độ năng lượng đạt mức 200Wh/kg, tiệm cận với pin lithium sắt photphat (LFP). Sự đột phá này cho phép sản xuất xe điện với giá thành rẻ hơn 20-30% do không phụ thuộc vào các kim loại quý hiếm như Lithium hay Cobalt.',
    strategicAnalysis: getGenericAnalysis([
        'Rà soát tiêu chuẩn an toàn quy chuẩn về pin cho các hệ thống xe điện trong nước, chuẩn bị khung cấp phép cho công nghệ Sodium-ion.',
        'Khuyến khích lập trung tâm thử nghiệm R&D về lưu trữ điện lưới (BESS) sử dụng pin Sodium nội địa.'
    ])
  },
  { 
    id: 8, 
    source: 'MEXT Japan', 
    sourceType: 'gov', 
    pubTime: '8 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'medium', 
    title: 'MEXT công bố 14 trường đại học Nhật Bản mở chương trình bán dẫn cấp độ stone-by-stone — 20,000 kỹ sư đến 2030', 
    tags: ['Bán dẫn', 'Nhân lực'], 
    likes: 156, 
    comments: 22, 
    shares: 31,
    content: 'Bộ Giáo dục và Khoa học Nhật Bản (MEXT) đã lựa chọn 14 đại học đối tác để triển khai chương trình đào tạo bán dẫn chuyên sâu mang tên "Stone-by-Stone". Chương trình này tập trung vào kỹ năng thiết kế vật lý và quy trình chế tạo thực tế trên silicon, nhằm mục tiêu cung ứng 20,000 kỹ sư chất lượng cao cho các nhà máy mới của TSMC và Rapidus tại Nhật Bản.',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 9, 
    source: 'X/@sama', 
    sourceType: 'social', 
    pubTime: '10 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'weak', 
    title: '"The gap between frontier AI and everything else is going to keep increasing. The next 2 years will be more surprising than the last 2." — Sam Altman', 
    tags: ['AI', 'AGI', 'KOL'], 
    likes: 45221, 
    comments: 3847, 
    shares: 8934,
    content: 'Trong một tweet mới nhất, CEO của OpenAI Sam Altman đã đưa ra nhận định gây xôn xao về tương lai của AI. Ông cho rằng khoảng cách giữa các mô hình dẫn đầu (frontier AI) và phần còn lại sẽ tiếp tục nới rộng, và hai năm tới sẽ chứng kiến những đột phá kinh ngạc hơn cả giai đoạn vừa qua. Thông điệp này ngầm ám chỉ sự xuất hiện gần kề của các khả năng suy luận mới (như GPT-5).',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 10, 
    source: 'VGP Vietnam', 
    sourceType: 'gov', 
    pubTime: '12 giờ trước', 
    sentiment: 'positive', 
    signalLevel: 'medium', 
    title: 'Chính phủ Việt Nam phê duyệt đề án phát triển 10,000 kỹ sư bán dẫn đến 2030 với tổng ngân sách 2.000 tỷ đồng', 
    tags: ['Việt Nam', 'Bán dẫn', 'Nhân lực'], 
    likes: 188, 
    comments: 42, 
    shares: 67,
    content: 'Thủ tướng Chính phủ vừa ký quyết định phê duyệt đề án phát triển nguồn nhân lực ngành công nghiệp bán dẫn đến năm 2030, định hướng đến năm 2045. Đề án đặt mục tiêu đào tạo ít nhất 50,000 nhân lực có trình độ đại học trở lên, trong đó có 10,000 kỹ sư thiết kế chip. Đây là bước đi cụ thể hóa quyết tâm đưa Việt Nam tham gia sâu hơn vào chuỗi giá trị bán dẫn toàn cầu.',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 11, 
    source: 'RAND Corporation', 
    sourceType: 'think_tank', 
    pubTime: '14 giờ trước', 
    sentiment: 'negative', 
    signalLevel: 'medium', 
    title: 'RAND Report: "The Semiconductor Dependency Trap" — ASEAN economies at risk of supply chain weaponization by 2027', 
    tags: ['Bán dẫn', 'Rủi ro', 'ASEAN'], 
    likes: 310, 
    comments: 55, 
    shares: 89,
    content: 'Báo cáo mới nhất từ RAND Corporation cảnh báo về "bẫy phụ thuộc bán dẫn" đối với các nền kinh tế ASEAN. Báo cáo phân tích rằng việc phụ thuộc vào một nguồn cung duy nhất về thiết bị sản xuất chip hoặc vật liệu thô có thể trở thành vũ khí trong các cuộc xung đột địa chính trị vào năm 2027. Việt Nam được khuyến nghị đa dạng hóa các đối tác công nghệ để tránh lặp lại các bài học về đứt gãy cung ứng trong quá khứ.',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 12, 
    source: 'GitHub Trending', 
    sourceType: 'tech', 
    pubTime: '16 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'weak', 
    title: '[deepfake-detector] Open-source video deepfake detection model — 98.2% accuracy, MIT license, runs on consumer GPU', 
    tags: ['Deepfake', 'Open Source'], 
    likes: 2891, 
    comments: 234, 
    shares: 567,
    content: 'Dự án mã nguồn mở "deepfake-detector" đang thu hút sự chú ý lớn trên GitHub. Mô hình mới cho phép phát hiện các video giả mạo với độ chính xác cực cao (98,2%) và quan trọng nhất là có thể chạy mượt mà trên phần cứng máy tính người dùng thông thường mà không cần các máy chủ mạnh mẽ.',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 13, 
    source: 'Xinhua', 
    sourceType: 'gov', 
    pubTime: '6 giờ trước', 
    sentiment: 'neutral', 
    signalLevel: 'medium', 
    title: 'Viện Hàn lâm Khoa học Trung Quốc (CAS) ra mắt máy tính lượng tử 512-qubit prototype mạnh nhất khu vực', 
    tags: ['Lượng tử', 'Trung Quốc'], 
    likes: 312, 
    comments: 45, 
    shares: 12,
    content: 'Đột phá mới từ CAS cho thấy Trung Quốc đang thu hẹp khoảng cách với các đối thủ phương Tây trong cuộc đua điện toán lượng tử. Prototype 512-qubit này được thiết kế để giải quyết các bài toán tối ưu hóa trong hậu cần và mô phỏng hóa học mới.',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 14, 
    source: 'MAS.gov.sg', 
    sourceType: 'gov', 
    pubTime: '18 giờ trước', 
    sentiment: 'positive', 
    signalLevel: 'weak', 
    title: 'MAS AI Governance update: Singapore công bố bộ khung quản trị AI minh bạch cho ngành tài chính ngân hàng', 
    tags: ['AI Policy', 'Singapore'], 
    likes: 120, 
    comments: 18, 
    shares: 5,
    content: 'Cơ quan Quản lý Tiền tệ Singapore (MAS) vừa cập nhật hướng dẫn về việc sử dụng AI trong dịch vụ tài chính, nhấn mạnh vào tính công bằng, đạo đức, trách nhiệm và tính minh bạch (FEAT).',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 15, 
    source: 'ASPI', 
    sourceType: 'think_tank', 
    pubTime: '2 giờ trước', 
    sentiment: 'negative', 
    signalLevel: 'strong', 
    title: 'ASPI phát hiện tuyến vận chuyển chip lậu quy mô lớn né tránh lệnh trừng phạt quốc tế hướng tới Nga', 
    tags: ['Bán dẫn', 'Rủi ro'], 
    likes: 890, 
    comments: 124, 
    shares: 210,
    content: 'Báo cáo từ ASPI vạch trần các mạng lưới phức tạp sử dụng các công ty vỏ bọc tại nhiều quốc gia để vận chuyển các linh kiện bán dẫn tiên tiến cho mục đích quân sự, vi phạm trực tiếp các lệnh cấm vận.',
    strategicAnalysis: getGenericAnalysis()
  },
  { 
    id: 16, 
    source: 'DeepMind Blog', 
    sourceType: 'research', 
    pubTime: '4 giờ trước', 
    sentiment: 'positive', 
    signalLevel: 'weak', 
    title: 'DeepMind AlphaFold4 preprint: Bước đột phá trong việc dự đoán cấu trúc protein cho các sinh vật đa bào phức tạp', 
    tags: ['AI', 'Research', 'Y sinh'], 
    likes: 12400, 
    comments: 560, 
    shares: 1200,
    content: 'AlphaFold4 mở rộng khả năng dự đoán từ protein đơn lẻ sang sự tương tác phức tạp giữa các phân tử trong tế bào, mở ra kỷ nguyên mới cho thiết kế thuốc cá nhân hóa.',
    strategicAnalysis: getGenericAnalysis()
  }
];

export const SENTIMENT_CONFIG = {
  positive: { color: '#22d3a0', bg: 'rgba(34,211,160,0.1)', label: 'Tích cực', icon: '😊' },
  negative: { color: '#f43f5e', bg: 'rgba(244,63,94,0.1)', label: 'Tiêu cực', icon: '😟' },
  neutral: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Trung tính', icon: '😐' },
};

export const SIGNAL_CONFIG = {
  strong: { color: '#f43f5e', label: 'Mạnh' },
  medium: { color: '#f59e0b', label: 'Trung' },
  weak: { color: '#3b82f6', label: 'Yếu' },
  low: { color: '#3b82f6', label: 'Thấp' },
};

export const SOURCE_TYPE_ICON = { 
  web: '🌐', 
  gov: '🏛️', 
  research: '🔬', 
  social: '💬', 
  think_tank: '📚', 
  tech: '💻' 
};
