using System;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class HoSoTrangThaiLichSu
    {
        public int Id { get; set; }
        public Guid HoSoId { get; set; }
        public TrangThaiHoSo TrangThai { get; set; }
        public DateTime ThoiGian { get; set; } = DateTime.UtcNow;
        public Guid? NguoiThucHienId { get; set; }
        public string? GhiChu { get; set; }

        public HoSo? HoSo { get; set; }
        public User? NguoiThucHien { get; set; }
    }
}
