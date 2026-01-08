using CongDuLieuDatDaiPhiaNam.Domain.Enums;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Models
{
    public sealed class ThuTucCreateRequest
    {
        public string MaThuTuc { get; set; } = string.Empty;
        public string TenThuTuc { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public int LinhVucId { get; set; }
        public int CoQuanThucHienId { get; set; }
        public MucDoDichVu MucDoDichVu { get; set; } = MucDoDichVu.ToanTrinh;
        public int ThoiHanGiaiQuyet { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public sealed class ThuTucUpdateRequest
    {
        public string? MaThuTuc { get; set; }
        public string? TenThuTuc { get; set; }
        public string? MoTa { get; set; }
        public int? LinhVucId { get; set; }
        public int? CoQuanThucHienId { get; set; }
        public MucDoDichVu? MucDoDichVu { get; set; }
        public int? ThoiHanGiaiQuyet { get; set; }
        public bool? IsActive { get; set; }
    }

    public sealed class DichVuCongCreateRequest
    {
        public int ThuTucId { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string? HuongDanUrl { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public sealed class DichVuCongUpdateRequest
    {
        public int? ThuTucId { get; set; }
        public string? Slug { get; set; }
        public string? HuongDanUrl { get; set; }
        public bool? IsActive { get; set; }
    }
}
