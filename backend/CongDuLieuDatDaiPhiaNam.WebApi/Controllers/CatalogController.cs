using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CongDuLieuDatDaiPhiaNam.Domain.Entities;
using CongDuLieuDatDaiPhiaNam.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/cdlddpn")]
    public class CatalogController : ControllerBase
    {
        private readonly CdlddpnDbContext _db;

        public CatalogController(CdlddpnDbContext db)
        {
            _db = db;
        }

        [HttpGet("linh-vuc")]
        public async Task<ActionResult<IEnumerable<LinhVuc>>> GetLinhVuc()
        {
            var list = await _db.LinhVucs
                .AsNoTracking()
                .OrderBy(x => x.Ten)
                .ToListAsync();

            return Ok(list);
        }

        [HttpGet("co-quan")]
        public async Task<ActionResult<IEnumerable<CoQuan>>> GetCoQuan()
        {
            var list = await _db.CoQuans
                .AsNoTracking()
                .OrderBy(x => x.Ten)
                .ToListAsync();

            return Ok(list);
        }

        [HttpGet("thu-tuc")]
        public async Task<ActionResult<IEnumerable<ThuTucHanhChinh>>> GetThuTuc(
            [FromQuery(Name = "linh_vuc_id")] int? linhVucId,
            [FromQuery] string? keyword,
            [FromQuery(Name = "is_active")] bool? isActive)
        {
            var query = _db.ThuTucHanhChinhs
                .AsNoTracking()
                .Include(x => x.LinhVuc)
                .Include(x => x.CoQuanThucHien)
                .AsQueryable();

            if (linhVucId.HasValue)
            {
                query = query.Where(x => x.LinhVucId == linhVucId.Value);
            }

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                var term = keyword.Trim();
                query = query.Where(x => x.TenThuTuc.Contains(term) || x.MaThuTuc.Contains(term));
            }

            if (isActive.HasValue)
            {
                query = query.Where(x => x.IsActive == isActive.Value);
            }

            var list = await query
                .OrderBy(x => x.TenThuTuc)
                .ToListAsync();

            return Ok(list);
        }

        [HttpGet("thu-tuc/{id:int}")]
        public async Task<ActionResult<ThuTucHanhChinh>> GetThuTucById(int id)
        {
            var item = await _db.ThuTucHanhChinhs
                .AsNoTracking()
                .Include(x => x.LinhVuc)
                .Include(x => x.CoQuanThucHien)
                .Include(x => x.DichVuCongs)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpGet("dich-vu-cong")]
        public async Task<ActionResult<IEnumerable<DichVuCong>>> GetDichVuCong(
            [FromQuery(Name = "thu_tuc_id")] int? thuTucId,
            [FromQuery(Name = "linh_vuc_id")] int? linhVucId)
        {
            var query = _db.DichVuCongs
                .AsNoTracking()
                .Include(x => x.ThuTuc)
                .AsQueryable();

            if (thuTucId.HasValue)
            {
                query = query.Where(x => x.ThuTucId == thuTucId.Value);
            }

            if (linhVucId.HasValue)
            {
                query = query.Where(x => x.ThuTuc != null && x.ThuTuc.LinhVucId == linhVucId.Value);
            }

            var list = await query
                .OrderBy(x => x.Id)
                .ToListAsync();

            return Ok(list);
        }

        [HttpGet("dich-vu-cong/{id:int}")]
        public async Task<ActionResult<DichVuCong>> GetDichVuCongById(int id)
        {
            var item = await _db.DichVuCongs
                .AsNoTracking()
                .Include(x => x.ThuTuc)
                .ThenInclude(x => x!.LinhVuc)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }
    }
}
