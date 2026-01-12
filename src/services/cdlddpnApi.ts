const API_BASE_URL =
  import.meta.env.VITE_CDLDPN_API_BASE_URL ?? 'http://localhost:5236/api/v1/cdlddpn';

export interface LinhVuc {
  Id: number;
  Ten: string;
}

export interface CoQuan {
  Id: number;
  Ten: string;
}

export interface ThuTucHanhChinh {
  Id: number;
  MaThuTuc: string;
  TenThuTuc: string;
  MoTa?: string | null;
  LinhVucId: number;
  CoQuanThucHienId: number;
  MucDoDichVu: number;
  ThoiHanGiaiQuyet: number;
  IsActive: boolean;
  LinhVuc?: LinhVuc | null;
  CoQuanThucHien?: CoQuan | null;
}

export interface HoSo {
  Id: string;
  MaHoSo: string;
  ThuTucId: number;
  UserId?: string | null;
  HoTenNguoiNop: string;
  DonViToChuc?: string | null;
  Email: string;
  SoDienThoai: string;
  DiaChi?: string | null;
  MucDichSuDungId?: number | null;
  KenhNop: number;
  TrangThaiHienTai: number;
  NgayNop: string;
  HanGiaiQuyet?: string | null;
  NgayHoanThanh?: string | null;
  GhiChuChung?: string | null;
  ThuTuc?: ThuTucHanhChinh | null;
}

export interface ThanhToan {
  Id: number;
  HoSoId: string;
  SoTien: number;
  PhuongThuc: number;
  MaGiaoDichGateway?: string | null;
  TrangThai: number;
  ThoiGian: string;
}

export interface SystemSetting {
  Key: string;
  Value: string;
  Note?: string | null;
}

export interface AuditLog {
  Id: number;
  UserId?: string | null;
  Action: string;
  EntityType: string;
  EntityId: string;
  Timestamp: string;
  IpAddress?: string | null;
  Detail?: string | null;
}

export interface HealthStatus {
  status: string;
  service: string;
}

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

const toQueryString = (params?: Record<string, string | number | boolean | undefined | null>) => {
  if (!params) {
    return '';
  }

  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null);
  if (entries.length === 0) {
    return '';
  }

  const query = new URLSearchParams();
  entries.forEach(([key, value]) => query.append(key, String(value)));
  return `?${query.toString()}`;
};

export const getHealthStatus = () => request<HealthStatus>('/health');

export const getThuTucList = (params?: {
  linhVucId?: number;
  keyword?: string;
  isActive?: boolean;
}) =>
  request<ThuTucHanhChinh[]>(
    `/thu-tuc${toQueryString({
      linh_vuc_id: params?.linhVucId,
      keyword: params?.keyword,
      is_active: params?.isActive,
    })}`
  );

export const getAdminHoSoList = (params?: {
  status?: string;
  thuTucId?: number;
  from?: string;
  to?: string;
  canBoId?: string;
}) =>
  request<HoSo[]>(
    `/admin/ho-so${toQueryString({
      status: params?.status,
      thu_tuc_id: params?.thuTucId,
      from: params?.from,
      to: params?.to,
      can_bo_id: params?.canBoId,
    })}`
  );

export const getSystemSettings = () => request<SystemSetting[]>('/admin/system-settings');

export const updateSystemSetting = (payload: SystemSetting) =>
  request<SystemSetting>('/admin/system-settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const getAuditLogs = (params?: {
  userId?: string;
  entityType?: string;
  from?: string;
  to?: string;
}) =>
  request<AuditLog[]>(
    `/admin/audit-logs${toQueryString({
      user_id: params?.userId,
      entity_type: params?.entityType,
      from: params?.from,
      to: params?.to,
    })}`
  );

export const getThanhToanByMaHoSo = (maHoSo: string) =>
  request<ThanhToan[]>(`/thanh-toan/ho-so/${encodeURIComponent(maHoSo)}`);
