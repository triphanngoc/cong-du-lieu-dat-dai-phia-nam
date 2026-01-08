namespace CongDuLieuDatDaiPhiaNam.WebApi.Models
{
    public sealed class SystemSettingUpdateRequest
    {
        public string Key { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string? Note { get; set; }
    }
}
