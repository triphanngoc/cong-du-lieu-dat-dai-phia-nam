using System;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class HoSoChiTietYeuCau
    {
        public int Id { get; set; }
        public Guid HoSoId { get; set; }
        public int LoaiDuLieuId { get; set; }
        public int? KhuVucTinhId { get; set; }
        public int? KhuVucHuyenId { get; set; }
        public int? KhuVucXaId { get; set; }
        public string? TyLe { get; set; }
        public int? Nam { get; set; }
        public string? GhiChu { get; set; }

        public HoSo? HoSo { get; set; }
    }
}
