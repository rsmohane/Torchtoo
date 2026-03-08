using Microsoft.EntityFrameworkCore;

namespace GrtTorchBearer.Infrastructure.Data
{
    public class GrtDbContext : DbContext
    {
        public GrtDbContext(DbContextOptions<GrtDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ApiKey> ApiKeys { get; set; }
        public DbSet<KycVerification> KycVerifications { get; set; }
        public DbSet<VaultItem> VaultItems { get; set; }
        public DbSet<SecureEmail> SecureEmails { get; set; }
        public DbSet<LoginLog> LoginLogs { get; set; }
        public DbSet<Complaint> Complaints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // ApiKey entity
            modelBuilder.Entity<ApiKey>()
                .HasKey(k => k.Id);
            modelBuilder.Entity<ApiKey>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(k => k.UserId);

            // KycVerification entity
            modelBuilder.Entity<KycVerification>()
                .HasKey(k => k.Id);

            // VaultItem entity
            modelBuilder.Entity<VaultItem>()
                .HasKey(v => v.Id);

            // SecureEmail entity
            modelBuilder.Entity<SecureEmail>()
                .HasKey(e => e.Id);

            // LoginLog entity
            modelBuilder.Entity<LoginLog>()
                .HasKey(l => l.Id);

            // Complaint entity
            modelBuilder.Entity<Complaint>()
                .HasKey(c => c.Id);
        }
    }

    public class User
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Profession { get; set; }
        public string? Location { get; set; }
        public string? Bio { get; set; }
        public int TrustScore { get; set; }
        public bool IsKycVerified { get; set; }
        public bool IsEmailVerified { get; set; }
        public bool IsTwoFactorEnabled { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class ApiKey
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public string Secret { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }

    public class KycVerification
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string DocumentType { get; set; } = string.Empty;
        public string DocumentNumber { get; set; } = string.Empty;
        public string VerificationLevel { get; set; } = string.Empty;
        public DateTime VerifiedAt { get; set; }
        public bool IsActive { get; set; }
    }

    public class VaultItem
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public string EncryptedValue { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }

    public class SecureEmail
    {
        public string Id { get; set; } = string.Empty;
        public string FromUserId { get; set; } = string.Empty;
        public string ToEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public bool IsEncrypted { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime SentAt { get; set; }
    }

    public class LoginLog
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string DeviceFingerprint { get; set; } = string.Empty;
        public DateTime LoginTime { get; set; }
    }

    public class Complaint
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}