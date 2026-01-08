using System.Collections.Generic;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class ThuTucHanhChinh
    {
        public int Id { get; set; }
        public string MaThuTuc { get; set; } = string.Empty;
        public string TenThuTuc { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public int LinhVucId { get; set; }
        public int CoQuanThucHienId { get; set; }
        public MucDoDichVu MucDoDichVu { get; set; }
        public int ThoiHanGiaiQuyet { get; set; }
        public bool IsActive { get; set; } = true;

        public LinhVuc? LinhVuc { get; set; }
        public CoQuan? CoQuanThucHien { get; set; }
        public ICollection<DichVuCong> DichVuCongs { get; set; } = new List<DichVuCong>();
    }
}
