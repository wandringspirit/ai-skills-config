# start-mc.ps1 — Starts Standalone Gemini Mission Control server in background and opens browser
$mainScript = Join-Path $HOME "ai-skills-config\gemini\mission-control\main.mjs"

# Check if port 4400 is already listening; if not, start the Node daemon hidden
$existing = Get-NetTCPConnection -LocalPort 4400 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess
if (-not $existing) {
    Start-Process -FilePath "node" -ArgumentList "`"$mainScript`"" -WindowStyle Hidden -WorkingDirectory (Split-Path $mainScript)
    Start-Sleep -Seconds 1
}

Start-Process "http://localhost:4400"
