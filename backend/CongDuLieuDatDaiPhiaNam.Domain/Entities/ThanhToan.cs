using System;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class ThanhToan
    {
        public int Id { get; set; }
        public Guid HoSoId { get; set; }
        public decimal SoTien { get; set; }
        public PhuongThucThanhToan PhuongThuc { get; set; }
        public string? MaGiaoDichGateway { get; set; }
        public TrangThaiThanhToan TrangThai { get; set; }
        public DateTime ThoiGian { get; set; } = DateTime.UtcNow;

        public HoSo? HoSo { get; set; }
    }
}
