import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  Link,
  List,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Footer from '../sections/Footer';
import MainNav from '../sections/MainNav';
import TopBar from '../sections/TopBar';
import {
  getAdminHoSoList,
  getAuditLogs,
  getHealthStatus,
  getSystemSettings,
  getThanhToanByMaHoSo,
  getThuTucList,
  updateSystemSetting,
  type AuditLog,
  type HealthStatus,
  type HoSo,
  type SystemSetting,
  type ThanhToan,
  type ThuTucHanhChinh,
} from '../services/cdlddpnApi';
import { adminProducts, adminSections, adminUsers } from '../data/siteData';

const hoSoStatusLabels: Record<number, string> = {
  0: 'Tiếp nhận',
  1: 'Đang xử lý',
  2: 'Bổ sung',
  3: 'Đã có kết quả',
  4: 'Đã trả kết quả',
  5: 'Từ chối',
  6: 'Hủy',
};

const paymentMethodLabels: Record<number, string> = {
  0: 'Online',
  1: 'Chuyển khoản',
  2: 'Tiền mặt',
};

const paymentStatusLabels: Record<number, string> = {
  0: 'Chờ thanh toán',
  1: 'Thành công',
  2: 'Thất bại',
};

const mucDoLabels: Record<number, string> = {
  0: 'Toàn trình',
  1: 'Một phần',
};

const isBooleanValue = (value: string) => {
  const normalized = value.trim().toLowerCase();
  return normalized === 'true' || normalized === 'false';
};

const statusTone = (status: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
  const normalized = status.toLowerCase();
  if (
    normalized.includes('hoạt động') ||
    normalized.includes('đã') ||
    normalized.includes('thành công') ||
    normalized.includes('ổn định')
  ) {
    return 'success';
  }
  if (normalized.includes('không phản hồi')) {
    return 'error';
  }
  if (normalized.includes('chờ') || normalized.includes('đang') || normalized.includes('bổ sung')) {
    return 'warning';
  }
  if (normalized.includes('tạm') || normalized.includes('thất bại') || normalized.includes('hủy')) {
    return 'error';
  }
  return 'info';
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return date.toLocaleDateString('vi-VN');
};

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return date.toLocaleString('vi-VN');
};

const formatNumber = (value: number) => new Intl.NumberFormat('vi-VN').format(value);

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState(adminSections[0]?.id ?? '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoSoList, setHoSoList] = useState<HoSo[]>([]);
  const [thuTucList, setThuTucList] = useState<ThuTucHanhChinh[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([]);
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [paymentInput, setPaymentInput] = useState('');
  const [paymentQuery, setPaymentQuery] = useState('');
  const [paymentSelect, setPaymentSelect] = useState('');
  const [payments, setPayments] = useState<ThanhToan[]>([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [thuTuc, hoSo, settings, logs, health] = await Promise.all([
          getThuTucList(),
          getAdminHoSoList(),
          getSystemSettings(),
          getAuditLogs(),
          getHealthStatus(),
        ]);

        if (!active) {
          return;
        }

        setThuTucList(thuTuc);
        setHoSoList(hoSo);
        setSystemSettings(settings);
        setAuditLogs(logs);
        setHealthStatus(health);

        if (hoSo.length > 0) {
          const initialMaHoSo = hoSo[0].MaHoSo;
          setPaymentInput(initialMaHoSo);
          setPaymentQuery(initialMaHoSo);
          setPaymentSelect(initialMaHoSo);
        }
      } catch (err) {
        if (!active) {
          return;
        }
        const message = err instanceof Error ? err.message : 'Không thể kết nối API.';
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!paymentQuery) {
      setPayments([]);
      setPaymentLoading(false);
      setPaymentError(null);
      return;
    }

    let active = true;
    const loadPayments = async () => {
      setPaymentLoading(true);
      setPaymentError(null);
      try {
        const list = await getThanhToanByMaHoSo(paymentQuery);
        if (active) {
          setPayments(list);
        }
      } catch (err) {
        if (active) {
          setPayments([]);
          const message = err instanceof Error ? err.message : 'Không thể tải dữ liệu thanh toán.';
          setPaymentError(message);
        }
      } finally {
        if (active) {
          setPaymentLoading(false);
        }
      }
    };

    loadPayments();
    return () => {
      active = false;
    };
  }, [paymentQuery]);

  const summaryCards = useMemo(() => {
    const hoSoMoi = hoSoList.filter((item) => item.TrangThaiHienTai === 0).length;
    const hoSoDangXuLy = hoSoList.filter(
      (item) => item.TrangThaiHienTai === 1 || item.TrangThaiHienTai === 2
    ).length;
    const thuTucActive = thuTucList.filter((item) => item.IsActive).length;
    const auditCount = auditLogs.length;

    return [
      { label: 'Hồ sơ mới', value: formatNumber(hoSoMoi), detail: 'Tiếp nhận', tone: 'warning' },
      {
        label: 'Hồ sơ đang xử lý',
        value: formatNumber(hoSoDangXuLy),
        detail: 'Đang thẩm định',
        tone: 'primary',
      },
      {
        label: 'Thủ tục hoạt động',
        value: formatNumber(thuTucActive),
        detail: 'Danh mục công bố',
        tone: 'secondary',
      },
      { label: 'Nhật ký hệ thống', value: formatNumber(auditCount), detail: 'Ghi nhận gần đây', tone: 'success' },
    ];
  }, [auditLogs.length, hoSoList, thuTucList]);

  const systemStatus = useMemo(
    () => [
      {
        label: 'Kết nối API',
        status: healthStatus?.status === 'ok' ? 'Ổn định' : 'Không phản hồi',
        tone: healthStatus?.status === 'ok' ? 'success' : 'error',
      },
      {
        label: 'Hồ sơ đang theo dõi',
        status: `${formatNumber(hoSoList.length)} hồ sơ`,
        tone: 'primary',
      },
      {
        label: 'Thủ tục công bố',
        status: `${formatNumber(thuTucList.length)} thủ tục`,
        tone: 'secondary',
      },
    ],
    [healthStatus?.status, hoSoList.length, thuTucList.length]
  );

  const handleSettingToggle = async (setting: SystemSetting) => {
    if (!isBooleanValue(setting.Value)) {
      return;
    }

    const nextValue = setting.Value.trim().toLowerCase() === 'true' ? 'false' : 'true';
    const nextSetting = { ...setting, Value: nextValue };

    setSystemSettings((prev) =>
      prev.map((item) => (item.Key === setting.Key ? nextSetting : item))
    );

    try {
      await updateSystemSetting(nextSetting);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Không thể cập nhật cấu hình.';
      setError(message);
      setSystemSettings((prev) =>
        prev.map((item) => (item.Key === setting.Key ? setting : item))
      );
    }
  };

  return (
    <Box className="page admin-page">
      <TopBar />
      <MainNav />
      <Box className="admin-banner">
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Breadcrumbs aria-label="breadcrumb" className="admin-crumbs">
              <Link href="/" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <HomeOutlinedIcon fontSize="small" />
                Trang chủ
              </Link>
              <Typography color="text.primary">Quản trị</Typography>
            </Breadcrumbs>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
              <Stack spacing={1}>
                <Typography variant="h2">Bảng điều khiển quản trị</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560 }}>
                  Tập trung toàn bộ chức năng quản trị hồ sơ, sản phẩm dữ liệu, thanh toán và hệ thống
                  vận hành trên một màn hình điều phối.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" startIcon={<AddOutlinedIcon />}>
                  Thêm sản phẩm
                </Button>
                <Button variant="outlined" startIcon={<TuneOutlinedIcon />}>
                  Cấu hình nhanh
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {loading ? (
        <Container maxWidth="lg">
          <Alert severity="info" sx={{ mt: 2 }}>
            Đang tải dữ liệu quản trị từ hệ thống.
          </Alert>
        </Container>
      ) : null}

      {error ? (
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        </Container>
      ) : null}

      <Box className="section admin-shell">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                <Paper className="admin-sidebar">
                  <Box className="admin-sidebar-title">
                    <Typography variant="h4">Điều hướng</Typography>
                  </Box>
                  <List dense disablePadding>
                    {adminSections.map((item) => (
                      <ListItemButton
                        key={item.id}
                        component="a"
                        href={`#${item.id}`}
                        selected={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="admin-nav-button"
                      >
                        <Typography variant="subtitle2">{item.label}</Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
                <Paper className="admin-status-card">
                  <Stack spacing={2}>
                    <Typography variant="h4">Trạng thái hệ thống</Typography>
                    {systemStatus.map((item) => (
                      <Stack key={item.label} direction="row" spacing={1} justifyContent="space-between">
                        <Typography variant="body2">{item.label}</Typography>
                        <Chip size="small" label={item.status} color={statusTone(item.status)} />
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <Paper id="admin-tong-quan" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AnalyticsOutlinedIcon color="primary" />
                      <Typography variant="h4">Tổng quan vận hành</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      {summaryCards.map((item) => (
                        <Grid item xs={12} sm={6} key={item.label}>
                          <Paper className={`admin-summary-card tone-${item.tone}`} sx={{ p: 2 }}>
                            <Stack spacing={0.6}>
                              <Typography variant="h3">{item.value}</Typography>
                              <Typography variant="subtitle2">{item.label}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.detail}
                              </Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Paper>

                <Paper id="admin-san-pham" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Inventory2OutlinedIcon color="primary" />
                        <Typography variant="h4">Quản lý sản phẩm</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Button variant="contained" size="small" startIcon={<AddOutlinedIcon />}>
                          Thêm sản phẩm
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<TuneOutlinedIcon />}>
                          Bộ lọc
                        </Button>
                      </Stack>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      Chưa có API sản phẩm trong backend hiện tại, đang hiển thị dữ liệu mẫu.
                    </Typography>
                    <Box className="admin-table">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã</TableCell>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Kích thước</TableCell>
                            <TableCell>Cập nhật</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {adminProducts.map((item) => (
                            <TableRow key={item.code} hover>
                              <TableCell>{item.code}</TableCell>
                              <TableCell>{item.title}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.size}</TableCell>
                              <TableCell>{item.updatedAt}</TableCell>
                              <TableCell>
                                <Chip size="small" label={item.status} color={statusTone(item.status)} />
                              </TableCell>
                              <TableCell align="right">
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                  <Button variant="text" size="small">
                                    Sửa
                                  </Button>
                                  <Button variant="text" size="small">
                                    Ẩn
                                  </Button>
                                  <Button variant="text" size="small" color="error">
                                    Xóa
                                  </Button>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Stack>
                </Paper>

                <Paper id="admin-thu-tuc" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <FactCheckOutlinedIcon color="primary" />
                        <Typography variant="h4">Thủ tục & dịch vụ công</Typography>
                      </Stack>
                      <Button variant="outlined" size="small" startIcon={<AddOutlinedIcon />}>
                        Thêm thủ tục
                      </Button>
                    </Stack>
                    {thuTucList.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Chưa có dữ liệu thủ tục hành chính.
                      </Typography>
                    ) : (
                      <Box className="admin-table">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Mã</TableCell>
                              <TableCell>Tên thủ tục</TableCell>
                              <TableCell>Mức độ</TableCell>
                              <TableCell>Thời hạn (ngày)</TableCell>
                              <TableCell>Trạng thái</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {thuTucList.map((item) => (
                              <TableRow key={item.Id} hover>
                                <TableCell>{item.MaThuTuc}</TableCell>
                                <TableCell>{item.TenThuTuc}</TableCell>
                                <TableCell>{mucDoLabels[item.MucDoDichVu] ?? '—'}</TableCell>
                                <TableCell>{item.ThoiHanGiaiQuyet}</TableCell>
                                <TableCell>
                                  <Chip
                                    size="small"
                                    label={item.IsActive ? 'Hoạt động' : 'Tạm dừng'}
                                    color={statusTone(item.IsActive ? 'Hoạt động' : 'Tạm dừng')}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                  </Stack>
                </Paper>

                <Paper id="admin-ho-so" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AssignmentOutlinedIcon color="primary" />
                      <Typography variant="h4">Hồ sơ trực tuyến</Typography>
                    </Stack>
                    {hoSoList.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Chưa có hồ sơ trực tuyến trong hệ thống.
                      </Typography>
                    ) : (
                      <Box className="admin-table">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Mã hồ sơ</TableCell>
                              <TableCell>Người nộp</TableCell>
                              <TableCell>Thủ tục</TableCell>
                              <TableCell>Hạn xử lý</TableCell>
                              <TableCell>Trạng thái</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {hoSoList.map((item) => (
                              <TableRow key={item.Id} hover>
                                <TableCell>{item.MaHoSo}</TableCell>
                                <TableCell>{item.HoTenNguoiNop}</TableCell>
                                <TableCell>{item.ThuTuc?.TenThuTuc ?? `#${item.ThuTucId}`}</TableCell>
                                <TableCell>{formatDate(item.HanGiaiQuyet ?? item.NgayNop)}</TableCell>
                                <TableCell>
                                  <Chip
                                    size="small"
                                    label={hoSoStatusLabels[item.TrangThaiHienTai] ?? 'Không xác định'}
                                    color={statusTone(
                                      hoSoStatusLabels[item.TrangThaiHienTai] ?? 'Không xác định'
                                    )}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                  </Stack>
                </Paper>

                <Paper id="admin-thanh-toan" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PaymentsOutlinedIcon color="primary" />
                      <Typography variant="h4">Thanh toán & đối soát</Typography>
                    </Stack>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={2}
                      alignItems={{ xs: 'stretch', md: 'center' }}
                    >
                      <TextField
                        size="small"
                        label="Mã hồ sơ"
                        value={paymentInput}
                        onChange={(event) => {
                          setPaymentInput(event.target.value);
                          setPaymentSelect('');
                        }}
                        sx={{ minWidth: 200 }}
                      />
                      <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select
                          displayEmpty
                          value={paymentSelect}
                          onChange={(event) => {
                            setPaymentSelect(event.target.value);
                            setPaymentInput(event.target.value);
                            setPaymentQuery(event.target.value);
                          }}
                        >
                          <MenuItem value="">
                            <em>Chọn nhanh hồ sơ</em>
                          </MenuItem>
                          {hoSoList.map((item) => (
                            <MenuItem key={item.Id} value={item.MaHoSo}>
                              {item.MaHoSo}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setPaymentQuery(paymentInput.trim())}
                      >
                        Tra cứu
                      </Button>
                      <Typography variant="caption" color="text.secondary">
                        {paymentLoading ? 'Đang tải giao dịch...' : 'Tra cứu theo mã hồ sơ'}
                      </Typography>
                    </Stack>
                    {paymentError ? (
                      <Alert severity="error">{paymentError}</Alert>
                    ) : null}
                    {paymentQuery && payments.length === 0 && !paymentLoading ? (
                      <Typography variant="body2" color="text.secondary">
                        Chưa có giao dịch thanh toán cho hồ sơ này.
                      </Typography>
                    ) : null}
                    {payments.length > 0 ? (
                      <Box className="admin-table">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Mã giao dịch</TableCell>
                              <TableCell>Hồ sơ</TableCell>
                              <TableCell>Số tiền</TableCell>
                              <TableCell>Phương thức</TableCell>
                              <TableCell>Thời gian</TableCell>
                              <TableCell>Trạng thái</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {payments.map((item) => (
                              <TableRow key={item.Id} hover>
                                <TableCell>{item.MaGiaoDichGateway ?? `#${item.Id}`}</TableCell>
                                <TableCell>{paymentQuery}</TableCell>
                                <TableCell>{formatNumber(item.SoTien)} đ</TableCell>
                                <TableCell>{paymentMethodLabels[item.PhuongThuc] ?? '—'}</TableCell>
                                <TableCell>{formatDateTime(item.ThoiGian)}</TableCell>
                                <TableCell>
                                  <Chip
                                    size="small"
                                    label={paymentStatusLabels[item.TrangThai] ?? 'Không xác định'}
                                    color={statusTone(paymentStatusLabels[item.TrangThai] ?? 'Không xác định')}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    ) : null}
                  </Stack>
                </Paper>

                <Paper id="admin-nguoi-dung" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PeopleAltOutlinedIcon color="primary" />
                      <Typography variant="h4">Người dùng & phân quyền</Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      Backend chưa cung cấp API danh sách người dùng, đang hiển thị dữ liệu mẫu.
                    </Typography>
                    <Box className="admin-table">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Họ tên</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Đơn vị</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {adminUsers.map((item) => (
                            <TableRow key={item.name} hover>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.role}</TableCell>
                              <TableCell>{item.unit}</TableCell>
                              <TableCell>
                                <Chip size="small" label={item.status} color={statusTone(item.status)} />
                              </TableCell>
                              <TableCell align="right">
                                <Button variant="text" size="small">
                                  Phân quyền
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Stack>
                </Paper>

                <Paper id="admin-cau-hinh" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SettingsOutlinedIcon color="primary" />
                      <Typography variant="h4">Cấu hình hệ thống</Typography>
                    </Stack>
                    {systemSettings.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Chưa có cấu hình hệ thống.
                      </Typography>
                    ) : (
                      <Stack spacing={2}>
                        {systemSettings.map((item) => {
                          const isBoolean = isBooleanValue(item.Value);
                          const isEnabled = item.Value.trim().toLowerCase() === 'true';
                          return (
                            <Paper key={item.Key} className="admin-setting-row" sx={{ p: 2 }}>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                                <Stack spacing={0.5} flex={1}>
                                  <Typography variant="subtitle1">{item.Key}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {item.Note ?? 'Cấu hình hệ thống'}
                                  </Typography>
                                </Stack>
                                {isBoolean ? (
                                  <Switch checked={isEnabled} onChange={() => handleSettingToggle(item)} />
                                ) : (
                                  <Chip size="small" label={item.Value || '—'} />
                                )}
                              </Stack>
                            </Paper>
                          );
                        })}
                      </Stack>
                    )}
                  </Stack>
                </Paper>

                <Paper id="admin-audit" className="admin-section">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <HistoryOutlinedIcon color="primary" />
                      <Typography variant="h4">Nhật ký hệ thống</Typography>
                    </Stack>
                    {auditLogs.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Chưa có nhật ký hệ thống.
                      </Typography>
                    ) : (
                      <Stack spacing={1.5}>
                        {auditLogs.map((item) => (
                          <Paper key={item.Id} className="admin-log-item" sx={{ p: 2 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
                              <Stack spacing={0.5}>
                                <Typography variant="subtitle2">{item.Action}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.EntityType} • {item.EntityId}
                                </Typography>
                                {item.Detail ? (
                                  <Typography variant="body2" color="text.secondary">
                                    {item.Detail}
                                  </Typography>
                                ) : null}
                              </Stack>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <IconButton size="small" aria-label="Xem lịch sử">
                                  <HistoryOutlinedIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDateTime(item.Timestamp)}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Paper>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
