using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CongDuLieuDatDaiPhiaNam.Domain.Entities;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;
using CongDuLieuDatDaiPhiaNam.Infrastructure.Data;
using CongDuLieuDatDaiPhiaNam.WebApi.Helpers;
using CongDuLieuDatDaiPhiaNam.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/cdlddpn/admin")]
    public class AdminController : ControllerBase
    {
        private readonly CdlddpnDbContext _db;

        public AdminController(CdlddpnDbContext db)
        {
            _db = db;
        }

        [HttpPost("thu-tuc")]
        public async Task<ActionResult<ThuTucHanhChinh>> CreateThuTuc([FromBody] ThuTucCreateRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.MaThuTuc) ||
                string.IsNullOrWhiteSpace(request.TenThuTuc))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            if (!await _db.LinhVucs.AnyAsync(x => x.Id == request.LinhVucId))
            {
                return BadRequest(new { message = "invalid_linh_vuc_id" });
            }

            if (!await _db.CoQuans.AnyAsync(x => x.Id == request.CoQuanThucHienId))
            {
                return BadRequest(new { message = "invalid_co_quan_id" });
            }

            var entity = new ThuTucHanhChinh
            {
                MaThuTuc = request.MaThuTuc.Trim(),
                TenThuTuc = request.TenThuTuc.Trim(),
                MoTa = request.MoTa,
                LinhVucId = request.LinhVucId,
                CoQuanThucHienId = request.CoQuanThucHienId,
                MucDoDichVu = request.MucDoDichVu,
                ThoiHanGiaiQuyet = request.ThoiHanGiaiQuyet,
                IsActive = request.IsActive
            };

            _db.ThuTucHanhChinhs.Add(entity);
            await _db.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpPut("thu-tuc/{id:int}")]
        public async Task<ActionResult<ThuTucHanhChinh>> UpdateThuTuc(int id, [FromBody] ThuTucUpdateRequest request)
        {
            var entity = await _db.ThuTucHanhChinhs.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            if (request.MaThuTuc != null)
            {
                entity.MaThuTuc = request.MaThuTuc.Trim();
            }

            if (request.TenThuTuc != null)
            {
                entity.TenThuTuc = request.TenThuTuc.Trim();
            }

            if (request.MoTa != null)
            {
                entity.MoTa = request.MoTa;
            }

            if (request.LinhVucId.HasValue)
            {
                if (!await _db.LinhVucs.AnyAsync(x => x.Id == request.LinhVucId.Value))
                {
                    return BadRequest(new { message = "invalid_linh_vuc_id" });
                }

                entity.LinhVucId = request.LinhVucId.Value;
            }

            if (request.CoQuanThucHienId.HasValue)
            {
                if (!await _db.CoQuans.AnyAsync(x => x.Id == request.CoQuanThucHienId.Value))
                {
                    return BadRequest(new { message = "invalid_co_quan_id" });
                }

                entity.CoQuanThucHienId = request.CoQuanThucHienId.Value;
            }

            if (request.MucDoDichVu.HasValue)
            {
                entity.MucDoDichVu = request.MucDoDichVu.Value;
            }

            if (request.ThoiHanGiaiQuyet.HasValue)
            {
                entity.ThoiHanGiaiQuyet = request.ThoiHanGiaiQuyet.Value;
            }

            if (request.IsActive.HasValue)
            {
                entity.IsActive = request.IsActive.Value;
            }

            await _db.SaveChangesAsync();
            return Ok(entity);
        }

        [HttpDelete("thu-tuc/{id:int}")]
        public async Task<IActionResult> DeleteThuTuc(int id)
        {
            var entity = await _db.ThuTucHanhChinhs.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            _db.ThuTucHanhChinhs.Remove(entity);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("dich-vu-cong")]
        public async Task<ActionResult<DichVuCong>> CreateDichVuCong([FromBody] DichVuCongCreateRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Slug))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            if (!await _db.ThuTucHanhChinhs.AnyAsync(x => x.Id == request.ThuTucId))
            {
                return BadRequest(new { message = "invalid_thu_tuc_id" });
            }

            var entity = new DichVuCong
            {
                ThuTucId = request.ThuTucId,
                Slug = request.Slug.Trim(),
                HuongDanUrl = request.HuongDanUrl,
                IsActive = request.IsActive
            };

            _db.DichVuCongs.Add(entity);
            await _db.SaveChangesAsync();
            return Ok(entity);
        }

        [HttpPut("dich-vu-cong/{id:int}")]
        public async Task<ActionResult<DichVuCong>> UpdateDichVuCong(int id, [FromBody] DichVuCongUpdateRequest request)
        {
            var entity = await _db.DichVuCongs.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            if (request.ThuTucId.HasValue)
            {
                if (!await _db.ThuTucHanhChinhs.AnyAsync(x => x.Id == request.ThuTucId.Value))
                {
                    return BadRequest(new { message = "invalid_thu_tuc_id" });
                }

                entity.ThuTucId = request.ThuTucId.Value;
            }

            if (request.Slug != null)
            {
                entity.Slug = request.Slug.Trim();
            }

            if (request.HuongDanUrl != null)
            {
                entity.HuongDanUrl = request.HuongDanUrl;
            }

            if (request.IsActive.HasValue)
            {
                entity.IsActive = request.IsActive.Value;
            }

            await _db.SaveChangesAsync();
            return Ok(entity);
        }

        [HttpGet("ho-so")]
        public async Task<ActionResult<IEnumerable<HoSo>>> GetHoSoAdmin(
            [FromQuery] string? status,
            [FromQuery(Name = "thu_tuc_id")] int? thuTucId,
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to,
            [FromQuery(Name = "can_bo_id")] Guid? canBoId)
        {
            var query = _db.HoSos
                .AsNoTracking()
                .Include(x => x.ThuTuc)
                .Include(x => x.User)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (!EnumHelper.TryParse(status, out TrangThaiHoSo parsedStatus))
                {
                    return BadRequest(new { message = "invalid_status" });
                }

                query = query.Where(x => x.TrangThaiHienTai == parsedStatus);
            }

            if (thuTucId.HasValue)
            {
                query = query.Where(x => x.ThuTucId == thuTucId.Value);
            }

            if (from.HasValue)
            {
                query = query.Where(x => x.NgayNop >= from.Value);
            }

            if (to.HasValue)
            {
                query = query.Where(x => x.NgayNop <= to.Value);
            }

            if (canBoId.HasValue)
            {
                query = query.Where(x => x.TrangThaiLichSus.Any(l => l.NguoiThucHienId == canBoId.Value));
            }

            var list = await query
                .OrderByDescending(x => x.NgayNop)
                .ToListAsync();

            return Ok(list);
        }

        [HttpGet("ho-so/{id:guid}")]
        public async Task<ActionResult<HoSo>> GetHoSoAdminById(Guid id)
        {
            var hoSo = await _db.HoSos
                .AsNoTracking()
                .Include(x => x.ThuTuc)
                .Include(x => x.User)
                .Include(x => x.ChiTietYeuCaus)
                .Include(x => x.TrangThaiLichSus)
                .Include(x => x.TapTins)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (hoSo == null)
            {
                return NotFound();
            }

            return Ok(hoSo);
        }

        [HttpPut("ho-so/{id:guid}")]
        public async Task<ActionResult<HoSo>> UpdateHoSo(Guid id, [FromBody] HoSoUpdateRequest request)
        {
            var hoSo = await _db.HoSos.FirstOrDefaultAsync(x => x.Id == id);
            if (hoSo == null)
            {
                return NotFound();
            }

            if (request.HoTenNguoiNop != null)
            {
                hoSo.HoTenNguoiNop = request.HoTenNguoiNop;
            }

            if (request.DonViToChuc != null)
            {
                hoSo.DonViToChuc = request.DonViToChuc;
            }

            if (request.Email != null)
            {
                hoSo.Email = request.Email;
            }

            if (request.SoDienThoai != null)
            {
                hoSo.SoDienThoai = request.SoDienThoai;
            }

            if (request.DiaChi != null)
            {
                hoSo.DiaChi = request.DiaChi;
            }

            if (request.MucDichSuDungId.HasValue)
            {
                hoSo.MucDichSuDungId = request.MucDichSuDungId.Value;
            }

            if (request.HanGiaiQuyet.HasValue)
            {
                hoSo.HanGiaiQuyet = request.HanGiaiQuyet.Value;
            }

            if (request.GhiChuChung != null)
            {
                hoSo.GhiChuChung = request.GhiChuChung;
            }

            await _db.SaveChangesAsync();
            return Ok(hoSo);
        }

        [HttpPost("ho-so/{id:guid}/trang-thai")]
        public async Task<ActionResult<HoSoTrangThaiLichSu>> UpdateHoSoTrangThai(
            Guid id,
            [FromBody] HoSoTrangThaiRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.TrangThai))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            if (!EnumHelper.TryParse(request.TrangThai, out TrangThaiHoSo parsedStatus))
            {
                return BadRequest(new { message = "invalid_status" });
            }

            var hoSo = await _db.HoSos.FirstOrDefaultAsync(x => x.Id == id);
            if (hoSo == null)
            {
                return NotFound();
            }

            hoSo.TrangThaiHienTai = parsedStatus;
            if (parsedStatus == TrangThaiHoSo.DaTraKetQua ||
                parsedStatus == TrangThaiHoSo.TuChoi ||
                parsedStatus == TrangThaiHoSo.Huy)
            {
                hoSo.NgayHoanThanh = DateTime.UtcNow;
            }

            var history = new HoSoTrangThaiLichSu
            {
                HoSoId = hoSo.Id,
                TrangThai = parsedStatus,
                ThoiGian = DateTime.UtcNow,
                NguoiThucHienId = request.NguoiThucHienId,
                GhiChu = request.GhiChu
            };

            _db.HoSoTrangThaiLichSus.Add(history);
            await _db.SaveChangesAsync();

            return Ok(history);
        }

        [HttpPost("ho-so/{id:guid}/ket-qua")]
        public async Task<ActionResult<HoSoTapTin>> AddHoSoKetQua(Guid id, [FromBody] HoSoKetQuaRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.FileName) || string.IsNullOrWhiteSpace(request.FilePath))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            var hoSo = await _db.HoSos.FirstOrDefaultAsync(x => x.Id == id);
            if (hoSo == null)
            {
                return NotFound();
            }

            var tapTin = new HoSoTapTin
            {
                HoSoId = hoSo.Id,
                Loai = HoSoTapTinLoai.KetQua,
                FileName = request.FileName,
                FilePath = request.FilePath,
                SizeBytes = request.SizeBytes,
                CreatedAt = DateTime.UtcNow
            };

            _db.HoSoTapTins.Add(tapTin);

            if (hoSo.TrangThaiHienTai != TrangThaiHoSo.DaCoKetQua)
            {
                hoSo.TrangThaiHienTai = TrangThaiHoSo.DaCoKetQua;
            }

            await _db.SaveChangesAsync();
            return Ok(tapTin);
        }

        [HttpGet("system-settings")]
        public async Task<ActionResult<IEnumerable<SystemSetting>>> GetSystemSettings()
        {
            var list = await _db.SystemSettings
                .AsNoTracking()
                .OrderBy(x => x.Key)
                .ToListAsync();

            return Ok(list);
        }

        [HttpPut("system-settings")]
        public async Task<ActionResult<SystemSetting>> UpdateSystemSettings([FromBody] SystemSettingUpdateRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Key))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            var setting = await _db.SystemSettings.FirstOrDefaultAsync(x => x.Key == request.Key);
            if (setting == null)
            {
                setting = new SystemSetting { Key = request.Key };
                _db.SystemSettings.Add(setting);
            }

            setting.Value = request.Value ?? string.Empty;
            setting.Note = request.Note;

            await _db.SaveChangesAsync();
            return Ok(setting);
        }

        [HttpGet("audit-logs")]
        public async Task<ActionResult<IEnumerable<AuditLog>>> GetAuditLogs(
            [FromQuery(Name = "user_id")] Guid? userId,
            [FromQuery(Name = "entity_type")] string? entityType,
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to)
        {
            var query = _db.AuditLogs
                .AsNoTracking()
                .AsQueryable();

            if (userId.HasValue)
            {
                query = query.Where(x => x.UserId == userId.Value);
            }

            if (!string.IsNullOrWhiteSpace(entityType))
            {
                query = query.Where(x => x.EntityType == entityType);
            }

            if (from.HasValue)
            {
                query = query.Where(x => x.Timestamp >= from.Value);
            }

            if (to.HasValue)
            {
                query = query.Where(x => x.Timestamp <= to.Value);
            }

            var list = await query
                .OrderByDescending(x => x.Timestamp)
                .ToListAsync();

            return Ok(list);
        }
    }
}
