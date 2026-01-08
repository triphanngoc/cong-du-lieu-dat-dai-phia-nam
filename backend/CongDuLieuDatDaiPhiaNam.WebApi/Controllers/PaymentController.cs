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
    [Route("api/v1/cdlddpn/thanh-toan")]
    public class PaymentController : ControllerBase
    {
        private readonly CdlddpnDbContext _db;

        public PaymentController(CdlddpnDbContext db)
        {
            _db = db;
        }

        [HttpGet("ho-so/{maHoSo}")]
        public async Task<ActionResult<IEnumerable<ThanhToan>>> GetThanhToanByMaHoSo(string maHoSo)
        {
            var hoSo = await _db.HoSos.AsNoTracking().FirstOrDefaultAsync(x => x.MaHoSo == maHoSo);
            if (hoSo == null)
            {
                return NotFound();
            }

            var list = await _db.ThanhToans
                .AsNoTracking()
                .Where(x => x.HoSoId == hoSo.Id)
                .OrderByDescending(x => x.ThoiGian)
                .ToListAsync();

            return Ok(list);
        }

        [HttpPost("ho-so/{maHoSo}")]
        public async Task<ActionResult<ThanhToan>> CreateThanhToan(string maHoSo, [FromBody] PaymentCreateRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.PhuongThuc))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            if (!EnumHelper.TryParse(request.PhuongThuc, out PhuongThucThanhToan phuongThuc))
            {
                return BadRequest(new { message = "invalid_phuong_thuc" });
            }

            var hoSo = await _db.HoSos.FirstOrDefaultAsync(x => x.MaHoSo == maHoSo);
            if (hoSo == null)
            {
                return NotFound();
            }

            var thanhToan = new ThanhToan
            {
                HoSoId = hoSo.Id,
                SoTien = request.SoTien,
                PhuongThuc = phuongThuc,
                MaGiaoDichGateway = request.MaGiaoDichGateway,
                TrangThai = TrangThaiThanhToan.ChoThanhToan
            };

            _db.ThanhToans.Add(thanhToan);
            await _db.SaveChangesAsync();
            return Ok(thanhToan);
        }

        [HttpPost("callback")]
        public async Task<ActionResult<ThanhToan>> PaymentCallback([FromBody] PaymentCallbackRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.MaHoSo) || string.IsNullOrWhiteSpace(request.TrangThai))
            {
                return BadRequest(new { message = "required_fields_missing" });
            }

            if (!EnumHelper.TryParse(request.TrangThai, out TrangThaiThanhToan parsedStatus))
            {
                return BadRequest(new { message = "invalid_trang_thai" });
            }

            var hoSo = await _db.HoSos.FirstOrDefaultAsync(x => x.MaHoSo == request.MaHoSo);
            if (hoSo == null)
            {
                return NotFound();
            }

            var thanhToan = await _db.ThanhToans
                .OrderByDescending(x => x.ThoiGian)
                .FirstOrDefaultAsync(x => x.HoSoId == hoSo.Id);

            if (thanhToan == null)
            {
                thanhToan = new ThanhToan
                {
                    HoSoId = hoSo.Id,
                    SoTien = request.SoTien ?? 0m,
                    PhuongThuc = PhuongThucThanhToan.Online,
                    MaGiaoDichGateway = request.MaGiaoDichGateway,
                    TrangThai = parsedStatus
                };

                _db.ThanhToans.Add(thanhToan);
            }
            else
            {
                thanhToan.TrangThai = parsedStatus;
                if (request.SoTien.HasValue)
                {
                    thanhToan.SoTien = request.SoTien.Value;
                }

                if (!string.IsNullOrWhiteSpace(request.MaGiaoDichGateway))
                {
                    thanhToan.MaGiaoDichGateway = request.MaGiaoDichGateway;
                }
            }

            await _db.SaveChangesAsync();
            return Ok(thanhToan);
        }
    }
}
