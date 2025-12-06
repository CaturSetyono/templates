# Switch between different website themes by copying config files

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("feedpro", "techflow", "fitlife", "ecohome", "learnhub", "travelwise")]
    [string]$Theme = "feedpro"
)

$configPath = "config/config.yaml"
$sourceConfig = "config/config-$Theme.yaml"

# Check if source config exists
if (-not (Test-Path $sourceConfig)) {
    Write-Host "Error: Config file '$sourceConfig' not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Available themes:" -ForegroundColor Yellow
    Write-Host "  - feedpro     (Animal Feed Business)" -ForegroundColor Cyan
    Write-Host "  - techflow    (SaaS Collaboration Platform)" -ForegroundColor Cyan
    Write-Host "  - fitlife     (Fitness & Wellness)" -ForegroundColor Cyan
    Write-Host "  - ecohome     (Sustainable Living E-commerce)" -ForegroundColor Cyan
    Write-Host "  - learnhub    (Online Education Platform)" -ForegroundColor Cyan
    Write-Host "  - travelwise  (Travel Agency)" -ForegroundColor Cyan
    exit 1
}

# Backup current config
if (Test-Path $configPath) {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = "config/config.backup.$timestamp.yaml"
    Copy-Item $configPath $backupPath
    Write-Host "✓ Backed up current config to: $backupPath" -ForegroundColor Green
}

# Copy new config
Copy-Item $sourceConfig $configPath -Force
Write-Host "✓ Switched to '$Theme' theme!" -ForegroundColor Green
Write-Host ""
Write-Host "The website will automatically reload with the new theme." -ForegroundColor Cyan
Write-Host "Check your browser at http://localhost:3001" -ForegroundColor Cyan
