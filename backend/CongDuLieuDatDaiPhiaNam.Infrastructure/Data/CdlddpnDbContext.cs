using CongDuLieuDatDaiPhiaNam.Domain.Entities;
using CongDuLieuDatDaiPhiaNam.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CongDuLieuDatDaiPhiaNam.Infrastructure.Data
{
    public class CdlddpnDbContext : DbContext
    {
        public CdlddpnDbContext(DbContextOptions<CdlddpnDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<UserRole> UserRoles => Set<UserRole>();
        public DbSet<CoQuan> CoQuans => Set<CoQuan>();
        public DbSet<LinhVuc> LinhVucs => Set<LinhVuc>();
        public DbSet<ThuTucHanhChinh> ThuTucHanhChinhs => Set<ThuTucHanhChinh>();
        public DbSet<DichVuCong> DichVuCongs => Set<DichVuCong>();
        public DbSet<HoSo> HoSos => Set<HoSo>();
        public DbSet<HoSoChiTietYeuCau> HoSoChiTietYeuCaus => Set<HoSoChiTietYeuCau>();
        public DbSet<HoSoTrangThaiLichSu> HoSoTrangThaiLichSus => Set<HoSoTrangThaiLichSu>();
        public DbSet<HoSoTapTin> HoSoTapTins => Set<HoSoTapTin>();
        public DbSet<ThanhToan> ThanhToans => Set<ThanhToan>();
        public DbSet<SystemSetting> SystemSettings => Set<SystemSetting>();
        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).HasMaxLength(100).IsRequired();
                entity.Property(e => e.PasswordHash).HasMaxLength(256).IsRequired();
                entity.Property(e => e.FullName).HasMaxLength(200).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(200).IsRequired();
                entity.Property(e => e.Phone).HasMaxLength(50);
                entity.Property(e => e.UserType).HasConversion<string>().HasMaxLength(30);
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Description).HasMaxLength(255);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("user_roles");
                entity.HasKey(e => new { e.UserId, e.RoleId });
                entity.HasOne(e => e.User)
                    .WithMany(e => e.UserRoles)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Role)
                    .WithMany(e => e.UserRoles)
                    .HasForeignKey(e => e.RoleId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<CoQuan>(entity =>
            {
                entity.ToTable("co_quan");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Ten).HasMaxLength(200).IsRequired();
                entity.Property(e => e.MaCoQuan).HasMaxLength(50).IsRequired();
                entity.Property(e => e.DiaChi).HasMaxLength(255).IsRequired();
                entity.Property(e => e.SoDienThoai).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(200).IsRequired();
            });

            modelBuilder.Entity<LinhVuc>(entity =>
            {
                entity.ToTable("linh_vuc");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Ten).HasMaxLength(200).IsRequired();
                entity.Property(e => e.MaLinhVuc).HasMaxLength(50).IsRequired();
            });

            modelBuilder.Entity<ThuTucHanhChinh>(entity =>
            {
                entity.ToTable("thu_tuc_hanh_chinh");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.MaThuTuc).HasMaxLength(100).IsRequired();
                entity.Property(e => e.TenThuTuc).HasMaxLength(255).IsRequired();
                entity.Property(e => e.MucDoDichVu).HasConversion<string>().HasMaxLength(30);
                entity.HasOne(e => e.LinhVuc)
                    .WithMany()
                    .HasForeignKey(e => e.LinhVucId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.CoQuanThucHien)
                    .WithMany()
                    .HasForeignKey(e => e.CoQuanThucHienId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<DichVuCong>(entity =>
            {
                entity.ToTable("dich_vu_cong");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Slug).HasMaxLength(200).IsRequired();
                entity.Property(e => e.HuongDanUrl).HasMaxLength(500);
                entity.HasOne(e => e.ThuTuc)
                    .WithMany(e => e.DichVuCongs)
                    .HasForeignKey(e => e.ThuTucId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<HoSo>(entity =>
            {
                entity.ToTable("ho_so");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.MaHoSo).HasMaxLength(50).IsRequired();
                entity.Property(e => e.HoTenNguoiNop).HasMaxLength(200).IsRequired();
                entity.Property(e => e.DonViToChuc).HasMaxLength(200);
                entity.Property(e => e.Email).HasMaxLength(200).IsRequired();
                entity.Property(e => e.SoDienThoai).HasMaxLength(50).IsRequired();
                entity.Property(e => e.DiaChi).HasMaxLength(255);
                entity.Property(e => e.KenhNop).HasConversion<string>().HasMaxLength(30);
                entity.Property(e => e.TrangThaiHienTai).HasConversion<string>().HasMaxLength(30);
                entity.HasIndex(e => e.MaHoSo).IsUnique();
                entity.HasOne(e => e.ThuTuc)
                    .WithMany()
                    .HasForeignKey(e => e.ThuTucId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<HoSoChiTietYeuCau>(entity =>
            {
                entity.ToTable("ho_so_chi_tiet_yeu_cau");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TyLe).HasMaxLength(50);
                entity.HasOne(e => e.HoSo)
                    .WithMany(e => e.ChiTietYeuCaus)
                    .HasForeignKey(e => e.HoSoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<HoSoTrangThaiLichSu>(entity =>
            {
                entity.ToTable("ho_so_trang_thai_lich_su");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TrangThai).HasConversion<string>().HasMaxLength(30);
                entity.HasOne(e => e.HoSo)
                    .WithMany(e => e.TrangThaiLichSus)
                    .HasForeignKey(e => e.HoSoId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.NguoiThucHien)
                    .WithMany()
                    .HasForeignKey(e => e.NguoiThucHienId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<HoSoTapTin>(entity =>
            {
                entity.ToTable("ho_so_tap_tin");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Loai).HasConversion<string>().HasMaxLength(30);
                entity.Property(e => e.FileName).HasMaxLength(255).IsRequired();
                entity.Property(e => e.FilePath).HasMaxLength(500).IsRequired();
                entity.HasOne(e => e.HoSo)
                    .WithMany(e => e.TapTins)
                    .HasForeignKey(e => e.HoSoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ThanhToan>(entity =>
            {
                entity.ToTable("thanh_toan");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.SoTien).HasColumnType("decimal(18,2)");
                entity.Property(e => e.PhuongThuc).HasConversion<string>().HasMaxLength(30);
                entity.Property(e => e.MaGiaoDichGateway).HasMaxLength(200);
                entity.Property(e => e.TrangThai).HasConversion<string>().HasMaxLength(30);
                entity.HasOne(e => e.HoSo)
                    .WithMany()
                    .HasForeignKey(e => e.HoSoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<SystemSetting>(entity =>
            {
                entity.ToTable("system_settings");
                entity.HasKey(e => e.Key);
                entity.Property(e => e.Key).HasMaxLength(100);
                entity.Property(e => e.Note).HasMaxLength(255);
            });

            modelBuilder.Entity<AuditLog>(entity =>
            {
                entity.ToTable("audit_logs");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Action).HasMaxLength(100).IsRequired();
                entity.Property(e => e.EntityType).HasMaxLength(100).IsRequired();
                entity.Property(e => e.EntityId).HasMaxLength(100).IsRequired();
                entity.Property(e => e.IpAddress).HasMaxLength(45);
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.UseSnakeCaseNames();
        }
    }
}
