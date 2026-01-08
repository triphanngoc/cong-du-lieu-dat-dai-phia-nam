using System;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class HoSoTapTin
    {
        public int Id { get; set; }
        public Guid HoSoId { get; set; }
        public HoSoTapTinLoai Loai { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public long SizeBytes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public HoSo? HoSo { get; set; }
    }
}
