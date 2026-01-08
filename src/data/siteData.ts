export const agency = {
  name: 'Cổng Dữ liệu Đất đai Phía Nam',
  fullName: 'Trung tâm Dữ liệu và Thông tin đất đai (Chi nhánh văn phòng Phía Nam)',
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
  { label: 'Liên hệ', href: '#lien-he' },
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
