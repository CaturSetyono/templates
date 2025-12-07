# Script untuk commit perubahan satu per satu dan push ke repository

# Check git status
Write-Host "Checking git status..." -ForegroundColor Green
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit
}

# Get list of changed files
$changedFiles = git status --porcelain | ForEach-Object {
    $line = $_.Trim()
    # Extract filename from git status output
    if ($line -match '^[MADRCU\?]{1,2}\s+(.+)$') {
        $matches[1]
    }
}

Write-Host "`nFound $($changedFiles.Count) changed file(s)" -ForegroundColor Cyan
Write-Host "Files to be committed:" -ForegroundColor Yellow
$changedFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor White }

Write-Host "`n"
$proceed = Read-Host "Proceed with committing each file? (Y/n)"

if ($proceed -eq 'n' -or $proceed -eq 'N') {
    Write-Host "Aborted." -ForegroundColor Red
    exit
}

# Commit each file individually
$commitCount = 0
foreach ($file in $changedFiles) {
    Write-Host "`nProcessing: $file" -ForegroundColor Cyan
    
    # Generate commit message based on file path and type
    $fileName = Split-Path $file -Leaf
    $directory = Split-Path $file -Parent
    
    if ([string]::IsNullOrWhiteSpace($directory)) {
        $commitMessage = "Update $fileName"
    } else {
        $commitMessage = "Update $fileName in $directory"
    }
    
    # Add and commit the file
    git add $file
    git commit -m $commitMessage
    
    if ($LASTEXITCODE -eq 0) {
        $commitCount++
        Write-Host "  [OK] Committed: $commitMessage" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Failed to commit: $file" -ForegroundColor Red
    }
}

Write-Host "`n$commitCount file(s) committed successfully." -ForegroundColor Green

# Push to remote
Write-Host "`nPushing to remote repository..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Pushed successfully!" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Push failed!" -ForegroundColor Red
}

Write-Host "`nDone!" -ForegroundColor Green
