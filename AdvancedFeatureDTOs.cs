namespace GrtTorchBearer.Core.DTOs
{
    // Device Scanning DTOs
    public class DeviceScanResultDto
    {
        public bool Success { get; set; }
        public DeviceInfoDto DeviceInfo { get; set; }
        public bool IsNewDevice { get; set; }
        public string TrustLevel { get; set; }
    }

    public class DeviceInfoDto
    {
        public string DeviceId { get; set; }
        public string UserId { get; set; }
        public string OSName { get; set; }
        public string OSVersion { get; set; }
        public string BrowserName { get; set; }
        public string BrowserVersion { get; set; }
        public string DeviceType { get; set; }
        public string Screen { get; set; }
        public string Processor { get; set; }
        public string RAM { get; set; }
        public string Timezone { get; set; }
        public string Language { get; set; }
        public string Fingerprint { get; set; }
        public DateTime ScannedAt { get; set; }
    }

    public class RegisteredDeviceDto
    {
        public string DeviceId { get; set; }
        public string DeviceName { get; set; }
        public string OSName { get; set; }
        public string LastSeen { get; set; }
        public string TrustLevel { get; set; }
    }

    // Location DTOs
    public class LocationInfoDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public float Accuracy { get; set; }
    }

    public class LocationDataDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public float Accuracy { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public string IpAddress { get; set; }
    }

    public class LocationHistoryDto
    {
        public string Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class LocationAnalysisDto
    {
        public int TotalLocations { get; set; }
        public int UniqueCountries { get; set; }
        public string MostFrequentCity { get; set; }
        public double AverageDailyDistance { get; set; }
        public List<LocationInfoDto> AnomalousLocations { get; set; }
        public string Pattern { get; set; }
    }

    // Translation DTOs
    public class TranslationResultDto
    {
        public bool Success { get; set; }
        public string OriginalText { get; set; }
        public string TranslatedText { get; set; }
        public string SourceLanguage { get; set; }
        public string TargetLanguage { get; set; }
        public double ConfidenceScore { get; set; }
    }

    public class SupportedLanguageDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Flag { get; set; }
    }

    public class UserLanguagePreferenceDto
    {
        public string UserId { get; set; }
        public string PreferredLanguage { get; set; }
        public string SecondaryLanguage { get; set; }
    }

    public class TranslateRequestDto
    {
        public string Text { get; set; }
        public string TargetLanguage { get; set; }
    }

    public class DetectLanguageRequestDto
    {
        public string Text { get; set; }
    }

    public class SetLanguageRequestDto
    {
        public string LanguageCode { get; set; }
    }

    // Security DTOs
    public class SecurityCheckResultDto
    {
        public string UserId { get; set; }
        public int OverallScore { get; set; }
        public string SecurityLevel { get; set; }
        public List<SecurityCheckItemDto> Checks { get; set; }
        public DateTime LastChecked { get; set; }
        public DateTime NextScheduledCheck { get; set; }
    }

    public class SecurityCheckItemDto
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public int Score { get; set; }
        public string Recommendation { get; set; }
        public string Details { get; set; }
    }

    public class VulnerabilityDto
    {
        public string UserId { get; set; }
        public int VulnerabilityCount { get; set; }
        public string RiskLevel { get; set; }
        public List<string> Vulnerabilities { get; set; }
        public DateTime ScannedAt { get; set; }
    }

    public class ThreatAnalysisDto
    {
        public string UserId { get; set; }
        public int ThreatScore { get; set; }
        public string ThreatLevel { get; set; }
        public List<string> DetectedThreats { get; set; }
        public DateTime AnalyzedAt { get; set; }
    }

    public class ComplianceStatusDto
    {
        public string UserId { get; set; }
        public bool IsCompliant { get; set; }
        public int ComplianceScore { get; set; }
        public string[] Standards { get; set; }
        public List<string> Issues { get; set; }
        public DateTime LastChecked { get; set; }
    }

    public class EncryptionStatusDto
    {
        public string UserId { get; set; }
        public bool IsEncrypted { get; set; }
        public string EncryptionMethod { get; set; }
        public int EncryptedItemsCount { get; set; }
        public string EncryptionStandard { get; set; }
    }

    public class PasswordSecurityDto
    {
        public string UserId { get; set; }
        public int Score { get; set; }
        public string Level { get; set; }
        public string Recommendation { get; set; }
        public DateTime LastChanged { get; set; }
    }

    // Alert DTOs
    public class AlertDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public int Severity { get; set; }
        public bool IsRead { get; set; }
        public bool IsAcknowledged { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? AcknowledgedAt { get; set; }
    }

    public class AlertStatisticsDto
    {
        public int TotalAlerts { get; set; }
        public int UnreadAlerts { get; set; }
        public int UnacknowledgedAlerts { get; set; }
        public int CriticalAlerts { get; set; }
        public int HighAlerts { get; set; }
        public int MediumAlerts { get; set; }
        public int LowAlerts { get; set; }
    }

    // Activity DTOs
    public class ActivityDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class ActivityAnalysisDto
    {
        public int TotalActivities { get; set; }
        public string MostFrequentActivity { get; set; }
        public List<string> ActiveHours { get; set; }
        public string MostActiveDay { get; set; }
        public double AverageActivitiesPerDay { get; set; }
        public string TrendDirection { get; set; }
    }

    public class SuggestionDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
        public int Priority { get; set; }
        public string ExpectedBenefit { get; set; }
    }

    public class ActivityTrendDto
    {
        public int Last7DaysCount { get; set; }
        public int Last30DaysCount { get; set; }
        public double TrendPercentage { get; set; }
        public string TrendDirection { get; set; }
    }

    // Chat DTOs
    public class ChatSessionDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Status { get; set; }
        public DateTime StartedAt { get; set; }
        public string AssignedAgentId { get; set; }
    }

    public class ChatMessageDto
    {
        public string Id { get; set; }
        public string SessionId { get; set; }
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsFromAgent { get; set; }
    }

    public class ChatStatsDto
    {
        public int TotalSessions { get; set; }
        public int ActiveSessions { get; set; }
        public int TotalMessages { get; set; }
        public TimeSpan AverageSessionDuration { get; set; }
        public TimeSpan AverageResponseTime { get; set; }
    }

    // AI Suggestion DTOs
    public class SmartSuggestionDto
    {
        public string Id { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Confidence { get; set; }
        public string Action { get; set; }
        public int Priority { get; set; }
        public string Benefit { get; set; }
    }

    public class AutoCompleteDto
    {
        public string Input { get; set; }
        public List<string> Suggestions { get; set; }
        public string Category { get; set; }
        public DateTime GeneratedAt { get; set; }
    }

    public class WorkRecommendationDto
    {
        public string UserId { get; set; }
        public List<WorkOpportunityDto> Opportunities { get; set; }
        public int TotalOpportunities { get; set; }
        public DateTime GeneratedAt { get; set; }
    }

    public class WorkOpportunityDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public double EstimatedEarnings { get; set; }
        public double MatchScore { get; set; }
    }

    // Work Process DTOs
    public class WorkProcessDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int Progress { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class WorkProgressDto
    {
        public string ProcessId { get; set; }
        public string ProcessName { get; set; }
        public string Status { get; set; }
        public int Progress { get; set; }
        public int CompletedSteps { get; set; }
        public int TotalSteps { get; set; }
        public object CurrentStep { get; set; }
        public TimeSpan EstimatedTimeRemaining { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    public class WorkAnalyticsDto
    {
        public int TotalProcesses { get; set; }
        public int CompletedProcesses { get; set; }
        public int InProgressProcesses { get; set; }
        public int PendingProcesses { get; set; }
        public TimeSpan AverageCompletionTime { get; set; }
        public int CompletionRate { get; set; }
        public int AutoCompletionCount { get; set; }
        public string MostCommonCategory { get; set; }
    }

    // Data Storage DTOs
    public class UserDataSummaryDto
    {
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public int TotalActivities { get; set; }
        public int TotalAlerts { get; set; }
        public int TotalLocations { get; set; }
        public DateTime? LastActivity { get; set; }
        public DateTime? AccountCreatedAt { get; set; }
        public long DataStorageSize { get; set; }
        public string[] DataCategories { get; set; }
    }

    public class DashboardDataDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int TrustScore { get; set; }
        public List<ActivitySummaryDto> RecentActivities { get; set; }
        public int UnreadAlerts { get; set; }
        public List<AlertSummaryDto> AlertList { get; set; }
        public DateTime? LastLogin { get; set; }
    }

    public class ActivitySummaryDto
    {
        public string Type { get; set; }
        public string Description { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class AlertSummaryDto
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public int Severity { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ExportDataDto
    {
        public string UserId { get; set; }
        public DateTime ExportDate { get; set; }
        public UserProfileExportDto UserProfile { get; set; }
        public List<ActivityExportDto> Activities { get; set; }
        public List<AlertExportDto> Alerts { get; set; }
        public List<LocationExportDto> Locations { get; set; }
        public List<DeviceExportDto> Devices { get; set; }
    }

    public class UserProfileExportDto
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int TrustScore { get; set; }
    }

    public class ActivityExportDto
    {
        public string Type { get; set; }
        public string Description { get; set; }
        public DateTime Timestamp { get; set; }
        public string Location { get; set; }
    }

    public class AlertExportDto
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class LocationExportDto
    {
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class DeviceExportDto
    {
        public string OSName { get; set; }
        public string BrowserName { get; set; }
        public DateTime? FirstSeen { get; set; }
    }
}