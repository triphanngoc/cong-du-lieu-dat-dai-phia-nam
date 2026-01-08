using System;

namespace CongDuLieuDatDaiPhiaNam.Domain.Entities
{
    public class AuditLog
    {
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public string Action { get; set; } = string.Empty;
        public string EntityType { get; set; } = string.Empty;
        public string EntityId { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? IpAddress { get; set; }
        public string? Detail { get; set; }

        public User? User { get; set; }
    }
}
