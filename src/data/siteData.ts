export const agency = {
  name: 'Dữ liệu tổng hợp',
  fullName: 'Trung tâm Dữ liệu và Thông tin đất đai (Văn phòng Phía Nam)',
  tagline: 'Hệ thống cung cấp dữ liệu thông tin đất đai',
  hotline: '1900 9999',
  email: 'support@ttdldd-phianam.gov.vn',
  address: '12 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
};

export const topLinks = [
  { label: 'Hướng dẫn', href: '#dich-vu' },
  { label: 'Tra cứu sản phẩm', href: '#du-lieu' },
  { label: 'Đăng nhập', href: '#dang-nhap' },
  { label: 'Đăng ký', href: '#dang-ky' },
];

export const searchCategories = [
  { value: 'all', label: 'Tất cả' },
  { value: 'san-pham', label: 'Sản phẩm dữ liệu' },
  { value: 'tin-tuc', label: 'Tin tức' },
  { value: 'van-ban', label: 'Văn bản pháp lý' },
];

export const navItems = [
  {
    label: 'Giới thiệu',
    href: '#gioi-thieu',
    children: [
      { label: 'Chức năng, nhiệm vụ, liên hệ', href: '#gioi-thieu' },
      { label: 'Sản phẩm và dịch vụ tiêu biểu', href: '#du-lieu' },
      { label: 'Tin tức hoạt động', href: '#tin-tuc' },
    ],
  },
  { label: 'Bản đồ trực tuyến', href: '#ban-do' },
  { label: 'Số liệu phân mảnh', href: '#phan-manh' },
  {
    label: 'Dữ liệu',
    href: '#du-lieu',
    children: [
      { label: 'Trắc địa', href: '#du-lieu' },
      { label: 'Ảnh hàng không', href: '#du-lieu' },
      { label: 'Bản đồ địa hình', href: '#du-lieu' },
      { label: 'Cơ sở dữ liệu nền', href: '#du-lieu' },
      { label: 'Mô hình số độ cao', href: '#du-lieu' },
    ],
  },
  { label: 'Sản phẩm', href: '/san-pham' },
  {
    label: 'Thông báo dữ liệu',
    href: '#thong-bao',
    children: [
      { label: 'Cập nhật dữ liệu mới', href: '#thong-bao' },
      { label: 'Quy chuẩn kỹ thuật', href: '#thong-bao' },
      { label: 'Biểu phí khai thác', href: '#thong-bao' },
    ],
  },
  { label: 'Dịch vụ công', href: '#dich-vu' },
  { label: 'Quản trị', href: '/admin' },
  { label: 'Liên hệ', href: '#lien-he' },
];

export const introFocus = [
  {
    title: 'Chuẩn hóa thông tin',
    detail: 'Đồng bộ dữ liệu, metadata và quy chuẩn kỹ thuật theo định hướng quốc gia.',
  },
  {
    title: 'Dịch vụ một cửa',
    detail: 'Số hóa toàn bộ quy trình nộp hồ sơ, thẩm định, thanh toán và cấp dữ liệu.',
  },
  {
    title: 'Hệ sinh thái mở',
    detail: 'Kết nối API liên thông, chia sẻ dữ liệu và tích hợp hệ thống nghiệp vụ.',
  },
];

export const introHighlights = [
  {
    title: 'Sứ mệnh',
    description: 'Tập trung nguồn dữ liệu đất đai chuẩn hóa phục vụ quản lý và khai thác minh bạch.',
  },
  {
    title: 'Phạm vi phục vụ',
    description: 'Hỗ trợ cơ quan, tổ chức và người dân toàn khu vực phía Nam truy cập dữ liệu thống nhất.',
  },
  {
    title: 'Dữ liệu tích hợp',
    description: 'Bản đồ nền, địa chính, ảnh hàng không, quy hoạch và thống kê chuyên ngành.',
  },
  {
    title: 'An toàn & tuân thủ',
    description: 'Phân quyền, giám sát truy cập và đảm bảo tuân thủ quy định pháp lý.',
  },
];

export const productGroups = [
  { id: 'thanh-qua-trac-dia', label: 'Thành quả trắc địa', count: 128 },
  { id: 'so-do-ghi-chu-diem', label: 'Số đồ ghi chú điểm', count: 42 },
  { id: 'anh-hang-khong', label: 'Ảnh hàng không', count: 96 },
  { id: 'ban-do-dia-hinh', label: 'Bản đồ địa hình quốc gia', count: 214 },
  { id: 'csdl-dia-ly', label: 'Cơ sở dữ liệu nền địa lý quốc gia', count: 68 },
  { id: 'mo-hinh-so-do-cao', label: 'Mô hình số độ cao', count: 51 },
  { id: 'dia-danh', label: 'Địa danh', count: 36 },
];

export const productItems = [
  {
    title: 'F-48-67-(94-b)',
    group: 'ban-do-dia-hinh',
    publishedAt: '2015-04-17T14:09:00',
    publishedLabel: '17/04/2015 | 14:09',
    views: 112110,
    category: 'Bản đồ địa hình VN2000',
    tone: 'tone-1',
  },
  {
    title: 'F-48-68-(81-c)',
    group: 'ban-do-dia-hinh',
    publishedAt: '2015-04-17T15:49:00',
    publishedLabel: '17/04/2015 | 15:49',
    views: 99427,
    category: 'Bản đồ địa hình VN2000',
    tone: 'tone-2',
  },
  {
    title: 'F-48-68-(81-e)',
    group: 'ban-do-dia-hinh',
    publishedAt: '2015-04-17T15:50:00',
    publishedLabel: '17/04/2015 | 15:50',
    views: 99810,
    category: 'Bản đồ địa hình VN2000',
    tone: 'tone-3',
  },
  {
    title: 'F-48-69-(86-a)',
    group: 'ban-do-dia-hinh',
    publishedAt: '2015-04-18T09:20:00',
    publishedLabel: '18/04/2015 | 09:20',
    views: 86540,
    category: 'Bản đồ địa hình VN2000',
    tone: 'tone-4',
  },
];

export const adminSections = [
  { id: 'admin-tong-quan', label: 'Tổng quan' },
  { id: 'admin-san-pham', label: 'Sản phẩm' },
  { id: 'admin-thu-tuc', label: 'Thủ tục & DVC' },
  { id: 'admin-ho-so', label: 'Hồ sơ' },
  { id: 'admin-thanh-toan', label: 'Thanh toán' },
  { id: 'admin-nguoi-dung', label: 'Người dùng' },
  { id: 'admin-cau-hinh', label: 'Cấu hình' },
  { id: 'admin-audit', label: 'Nhật ký' },
];

export const adminSummary = [
  { label: 'Hồ sơ mới', value: '128', detail: '24 giờ gần nhất', tone: 'warning' },
  { label: 'Hồ sơ đang xử lý', value: '64', detail: 'Đúng hạn 98%', tone: 'primary' },
  { label: 'Giao dịch thành công', value: '312', detail: 'Tháng hiện tại', tone: 'success' },
  { label: 'Sản phẩm đang bán', value: '214', detail: 'Danh mục địa hình', tone: 'secondary' },
];

export const adminSystemStatus = [
  { label: 'Kết nối API', status: 'Ổn định', tone: 'success' },
  { label: 'Dung lượng lưu trữ', status: '68% sử dụng', tone: 'warning' },
  { label: 'Bản ghi nhật ký', status: 'Thu thập liên tục', tone: 'primary' },
];

export const adminProducts = [
  {
    code: 'SP-001',
    title: 'F-48-67-(94-b)',
    category: 'Bản đồ địa hình VN2000',
    status: 'Đang bán',
    updatedAt: '08/01/2026',
    size: '1.2 GB',
    price: '2.500.000 đ',
  },
  {
    code: 'SP-002',
    title: 'F-48-68-(81-c)',
    category: 'Bản đồ địa hình VN2000',
    status: 'Đang bán',
    updatedAt: '08/01/2026',
    size: '950 MB',
    price: '2.350.000 đ',
  },
  {
    code: 'SP-003',
    title: 'UAV-THU-DUC-2024',
    category: 'Ảnh hàng không',
    status: 'Tạm dừng',
    updatedAt: '06/01/2026',
    size: '2.8 GB',
    price: '3.800.000 đ',
  },
  {
    code: 'SP-004',
    title: 'DEM-DONG-NAI-5M',
    category: 'Mô hình số độ cao',
    status: 'Đang bán',
    updatedAt: '05/01/2026',
    size: '4.1 GB',
    price: '4.900.000 đ',
  },
];

export const adminProcedures = [
  {
    code: 'TT-12',
    name: 'Cấp dữ liệu bản đồ địa hình',
    level: 'Mức 4',
    status: 'Hoạt động',
    updatedAt: '05/01/2026',
  },
  {
    code: 'TT-18',
    name: 'Cấp dữ liệu ảnh hàng không',
    level: 'Mức 4',
    status: 'Hoạt động',
    updatedAt: '03/01/2026',
  },
  {
    code: 'TT-22',
    name: 'Cung cấp mô hình số độ cao',
    level: 'Mức 3',
    status: 'Tạm dừng',
    updatedAt: '28/12/2025',
  },
];

export const adminCases = [
  {
    code: 'HS-2026-0184',
    requester: 'Nguyễn Minh Anh',
    procedure: 'Cấp dữ liệu ảnh hàng không',
    status: 'Đang thẩm định',
    dueDate: '12/01/2026',
  },
  {
    code: 'HS-2026-0179',
    requester: 'Công ty Đại Dương',
    procedure: 'Cấp dữ liệu bản đồ địa hình',
    status: 'Chờ bổ sung',
    dueDate: '10/01/2026',
  },
  {
    code: 'HS-2026-0172',
    requester: 'Lê Thanh Tâm',
    procedure: 'Cung cấp mô hình số độ cao',
    status: 'Hoàn tất',
    dueDate: '08/01/2026',
  },
];

export const adminPayments = [
  {
    code: 'PAY-9832',
    caseCode: 'HS-2026-0184',
    amount: '3.200.000 đ',
    method: 'VNPAY',
    status: 'Đã thanh toán',
  },
  {
    code: 'PAY-9815',
    caseCode: 'HS-2026-0179',
    amount: '2.750.000 đ',
    method: 'Chuyển khoản',
    status: 'Chờ đối soát',
  },
  {
    code: 'PAY-9781',
    caseCode: 'HS-2026-0172',
    amount: '4.500.000 đ',
    method: 'VNPT Pay',
    status: 'Đã thanh toán',
  },
];

export const adminUsers = [
  {
    name: 'Trần Phương Linh',
    role: 'Quản trị viên',
    unit: 'TTDLĐĐ',
    status: 'Hoạt động',
  },
  {
    name: 'Nguyễn Hữu Thành',
    role: 'Cán bộ thẩm định',
    unit: 'Sở TN&MT',
    status: 'Hoạt động',
  },
  {
    name: 'Lê Quỳnh Chi',
    role: 'Kế toán',
    unit: 'TTDLĐĐ',
    status: 'Tạm khóa',
  },
];

export const adminSettings = [
  {
    key: 'autoReceive',
    label: 'Tự động tiếp nhận hồ sơ đủ điều kiện',
    description: 'Hồ sơ hợp lệ được tạo biên nhận và chuyển sang thẩm định.',
    enabled: true,
  },
  {
    key: 'notifyPayment',
    label: 'Gửi thông báo khi có giao dịch',
    description: 'Thông báo qua email và dashboard cho các khoản thanh toán.',
    enabled: true,
  },
  {
    key: 'archiveAfterComplete',
    label: 'Lưu trữ hồ sơ sau khi hoàn tất',
    description: 'Chuyển hồ sơ đã xử lý sang kho lưu trữ điện tử.',
    enabled: false,
  },
];

export const adminAuditLogs = [
  {
    time: '08:15 08/01/2026',
    actor: 'admin.tndl',
    action: 'Cập nhật trạng thái hồ sơ HS-2026-0184 sang "Đang thẩm định".',
  },
  {
    time: '16:42 07/01/2026',
    actor: 'ke.toan',
    action: 'Đối soát giao dịch PAY-9815 - chuyển khoản.',
  },
  {
    time: '11:30 07/01/2026',
    actor: 'canbo.hoso',
    action: 'Yêu cầu bổ sung tài liệu cho hồ sơ HS-2026-0179.',
  },
];

export const quickActions = [
  {
    title: 'Nộp hồ sơ trực tuyến',
    description: 'Khởi tạo hồ sơ xin cấp dữ liệu theo quy trình số hóa.',
    action: 'Bắt đầu nộp hồ sơ',
  },
  {
    title: 'Tra cứu hồ sơ',
    description: 'Theo dõi tiến độ xử lý hồ sơ theo mã tra cứu.',
    action: 'Tra cứu ngay',
  },
  {
    title: 'Thanh toán trực tuyến',
    description: 'Thanh toán phí khai thác dữ liệu an toàn, nhanh chóng.',
    action: 'Thực hiện thanh toán',
  },
  {
    title: 'Hướng dẫn khai thác',
    description: 'Quy trình, biểu mẫu, và điều kiện cấp dữ liệu.',
    action: 'Xem hướng dẫn',
  },
];

export const productCatalog = [
  {
    label: 'Trắc địa',
    items: [
      'Điểm tọa độ quốc gia',
      'Điểm độ cao quốc gia',
      'Lưới khống chế trọng lực',
      'Bộ số liệu kiểm định',
      'Danh mục mốc trắc địa',
      'Báo cáo chất lượng đo đạc',
    ],
  },
  {
    label: 'Ảnh hàng không',
    items: [
      'Ảnh số độ phân giải cao 2024',
      'Ảnh vệ tinh đa thời gian',
      'Bộ ghép ảnh khu vực trọng điểm',
      'Bình đồ ảnh ortho',
      'Dữ liệu kiểm soát bay',
      'Bộ dữ liệu UAV khảo sát',
    ],
  },
  {
    label: 'Bản đồ địa hình',
    items: [
      'Bản đồ địa hình 1:2.000',
      'Bản đồ địa hình 1:5.000',
      'Bản đồ địa hình 1:10.000',
      'Bản đồ địa hình 1:25.000',
      'Bản đồ nền hành chính',
      'Bản đồ chuyên đề đô thị',
    ],
  },
  {
    label: 'Cơ sở dữ liệu nền',
    items: [
      'CSDL địa danh chuẩn hóa',
      'CSDL hạ tầng kỹ thuật',
      'CSDL thủy văn và giao thông',
      'CSDL quy hoạch sử dụng đất',
      'CSDL hiện trạng xây dựng',
      'CSDL ranh giới hành chính',
    ],
  },
  {
    label: 'Mô hình số độ cao',
    items: [
      'DEM 5m khu vực trọng điểm',
      'DEM 10m vùng đồng bằng',
      'DTM ven biển',
      'DSM khu đô thị',
      'Mô hình địa hình 3D',
      'Bề mặt địa hình phân lớp',
    ],
  },
];

export const systemModules = [
  {
    title: 'Xác thực & phân quyền',
    detail: 'Đăng ký, đăng nhập, JWT, quản trị vai trò và phiên làm việc.',
  },
  {
    title: 'Danh mục & dịch vụ công',
    detail: 'Lĩnh vực, cơ quan, thủ tục, dịch vụ công và biểu mẫu điện tử.',
  },
  {
    title: 'Hồ sơ & quy trình xử lý',
    detail: 'Tạo hồ sơ, cập nhật trạng thái, lịch sử thao tác, hồ sơ đính kèm.',
  },
  {
    title: 'Thanh toán & đối soát',
    detail: 'Tính phí, giao dịch trực tuyến, kết nối cổng thanh toán.',
  },
  {
    title: 'Lưu trữ & khai thác',
    detail: 'Quản lý tệp kết quả, chia sẻ dữ liệu và cấp quyền tải xuống.',
  },
  {
    title: 'Quản trị & giám sát',
    detail: 'Nhật ký hệ thống, cấu hình, báo cáo điều hành.',
  },
];

export const processSteps = [
  {
    title: 'Đăng nhập hệ thống',
    detail: 'Xác thực tài khoản hoặc đăng ký mới đối với tổ chức, cá nhân.',
  },
  {
    title: 'Nộp hồ sơ điện tử',
    detail: 'Chọn thủ tục, khai báo nhu cầu, đính kèm tài liệu.',
  },
  {
    title: 'Thẩm định & phê duyệt',
    detail: 'Cơ quan tiếp nhận xử lý, cập nhật trạng thái liên tục.',
  },
  {
    title: 'Thanh toán & nhận dữ liệu',
    detail: 'Thanh toán trực tuyến và tải dữ liệu được cấp.',
  },
];

export const newsHighlights = {
  featured: {
    title: 'Thông báo nâng cấp hệ thống cung cấp dữ liệu đất đai khu vực phía Nam',
    date: '08/01/2026',
    summary:
      'Triển khai nền tảng tích hợp mới, tăng tốc độ tra cứu và chuẩn hóa dữ liệu theo bộ tiêu chuẩn quốc gia.',
  },
  items: [
    'Cập nhật bộ bản đồ địa hình 1:5.000 tỉnh Đồng Nai',
    'Hoàn thành số hóa dữ liệu địa chính khu vực TP. Thủ Đức',
    'Hướng dẫn sử dụng dịch vụ công trực tuyến mức độ 4',
    'Thông báo lịch bảo trì hệ thống cổng dữ liệu tuần 2/2026',
  ],
};

export const stats = [
  { label: 'Hồ sơ tiếp nhận', value: '12.480+' },
  { label: 'Bộ dữ liệu cung cấp', value: '5.260+' },
  { label: 'Đơn vị kết nối', value: '320+' },
  { label: 'Tỷ lệ xử lý đúng hạn', value: '98.6%' },
];

export const partners = ['Cục Đo đạc Bản đồ', 'Sở TN&MT', 'Cổng DVCQG', 'Nền tảng GIS quốc gia'];

export const footerLinks = [
  {
    title: 'Dịch vụ công',
    links: ['Danh sách thủ tục', 'Nộp hồ sơ', 'Tra cứu kết quả', 'Biểu phí dịch vụ'],
  },
  {
    title: 'Tài nguyên',
    links: ['Tài liệu API', 'Bộ dữ liệu mở', 'Tiêu chuẩn kỹ thuật', 'Kho biểu mẫu'],
  },
  {
    title: 'Hỗ trợ',
    links: ['Câu hỏi thường gặp', 'Trung tâm trợ giúp', 'Liên hệ kỹ thuật', 'Chính sách bảo mật'],
  },
];
