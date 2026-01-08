using System;
using System.Collections.Generic;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class HoSo
    {
        public Guid Id { get; set; }
        public string MaHoSo { get; set; } = string.Empty;
        public int ThuTucId { get; set; }
        public Guid? UserId { get; set; }
        public string HoTenNguoiNop { get; set; } = string.Empty;
        public string? DonViToChuc { get; set; }
        public string Email { get; set; } = string.Empty;
        public string SoDienThoai { get; set; } = string.Empty;
        public string? DiaChi { get; set; }
        public int? MucDichSuDungId { get; set; }
        public KenhNop KenhNop { get; set; } = KenhNop.TrucTuyen;
        public TrangThaiHoSo TrangThaiHienTai { get; set; } = TrangThaiHoSo.TiepNhan;
        public DateTime NgayNop { get; set; } = DateTime.UtcNow;
        public DateTime? HanGiaiQuyet { get; set; }
        public DateTime? NgayHoanThanh { get; set; }
        public string? GhiChuChung { get; set; }

        public ThuTucHanhChinh? ThuTuc { get; set; }
        public User? User { get; set; }
        public ICollection<HoSoChiTietYeuCau> ChiTietYeuCaus { get; set; } = new List<HoSoChiTietYeuCau>();
        public ICollection<HoSoTrangThaiLichSu> TrangThaiLichSus { get; set; } = new List<HoSoTrangThaiLichSu>();
        public ICollection<HoSoTapTin> TapTins { get; set; } = new List<HoSoTapTin>();
    }
}
