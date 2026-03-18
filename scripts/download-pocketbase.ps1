param(
    [string]$Version = "0.36.7"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$installDir = Join-Path $root "pocketbase"
$zipPath = Join-Path $installDir "pocketbase.zip"
$downloadUrl = "https://github.com/pocketbase/pocketbase/releases/download/v$Version/pocketbase_${Version}_windows_amd64.zip"

New-Item -ItemType Directory -Force -Path $installDir | Out-Null

Write-Host "Downloading PocketBase v$Version..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath

Write-Host "Extracting files..."
Expand-Archive -LiteralPath $zipPath -DestinationPath $installDir -Force
Remove-Item $zipPath -Force

Write-Host "PocketBase downloaded to $installDir"
