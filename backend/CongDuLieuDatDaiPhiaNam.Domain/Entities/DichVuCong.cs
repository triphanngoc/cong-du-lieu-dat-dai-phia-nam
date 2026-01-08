namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class DichVuCong
    {
        public int Id { get; set; }
        public int ThuTucId { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string? HuongDanUrl { get; set; }
        public bool IsActive { get; set; } = true;

        public ThuTucHanhChinh? ThuTuc { get; set; }
    }
}
