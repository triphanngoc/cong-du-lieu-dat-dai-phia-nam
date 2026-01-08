using CongDuLieuDatDaiPhiaNam.Domain.Entities;
using CongDuLieuDatDaiPhiaNam.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CongDuLieuDatDaiPhiaNam.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/cdlddpn/ho-so")]
    public class HoSoController : ControllerBase
    {
        private readonly CdlddpnDbContext _db;

        public HoSoController(CdlddpnDbContext db)
        {
            _db = db;
        }

        [HttpGet("{maHoSo}")]
        public async Task<ActionResult<HoSo>> GetByMaHoSo(string maHoSo)
        {
            var hoSo = await _db.HoSos.FirstOrDefaultAsync(x => x.MaHoSo == maHoSo);
            if (hoSo == null)
            {
                return NotFound();
            }

            return Ok(hoSo);
        }

        [HttpPost]
        public async Task<ActionResult<HoSo>> Create([FromBody] HoSo input)
        {
            if (string.IsNullOrWhiteSpace(input.MaHoSo))
            {
                input.MaHoSo = $"HSO-{DateTime.UtcNow:yyyyMMddHHmmssfff}";
            }

            input.Id = Guid.NewGuid();
            input.NgayNop = DateTime.UtcNow;

            _db.HoSos.Add(input);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetByMaHoSo), new { maHoSo = input.MaHoSo }, input);
        }
    }
}
