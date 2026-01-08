using System;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Models
{
    public sealed class HoSoUpdateRequest
    {
        public string? HoTenNguoiNop { get; set; }
        public string? DonViToChuc { get; set; }
        public string? Email { get; set; }
        public string? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public int? MucDichSuDungId { get; set; }
        public DateTime? HanGiaiQuyet { get; set; }
        public string? GhiChuChung { get; set; }
    }

    public sealed class HoSoTrangThaiRequest
    {
        public string TrangThai { get; set; } = string.Empty;
        public Guid? NguoiThucHienId { get; set; }
        public string? GhiChu { get; set; }
    }

    public sealed class HoSoKetQuaRequest
    {
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public long SizeBytes { get; set; }
    }
}
