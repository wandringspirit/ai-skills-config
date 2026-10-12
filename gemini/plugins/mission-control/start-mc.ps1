# start-mc.ps1 — Starts Mission Control server in background and opens browser
$mainScript = Join-Path $HOME "ai-skills-config\gemini\plugins\mission-control\sidecars\panel\main.mjs"

# Kill any existing Mission Control process on port 4400
$existing = Get-NetTCPConnection -LocalPort 4400 -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess
if ($existing) {
    Stop-Process -Id $existing -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# Start node server hidden in background
Start-Process -FilePath "node" -ArgumentList "`"$mainScript`"" -WindowStyle Hidden -WorkingDirectory (Split-Path $mainScript)

# Wait for server to be ready, then open browser
Start-Sleep -Seconds 2
Start-Process "http://localhost:4400"
