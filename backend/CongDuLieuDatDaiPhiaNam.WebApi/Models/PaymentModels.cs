namespace CongDuLieuDatDaiPhiaNam.WebApi.Models
{
    public sealed class PaymentCreateRequest
    {
        public decimal SoTien { get; set; }
        public string PhuongThuc { get; set; } = string.Empty;
        public string? MaGiaoDichGateway { get; set; }
    }

    public sealed class PaymentCallbackRequest
    {
        public string MaHoSo { get; set; } = string.Empty;
        public string TrangThai { get; set; } = string.Empty;
        public string? MaGiaoDichGateway { get; set; }
        public decimal? SoTien { get; set; }
    }
}
