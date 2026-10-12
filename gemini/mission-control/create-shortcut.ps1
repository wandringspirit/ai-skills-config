$desktopPath = [Environment]::GetFolderPath('Desktop')
$mainScript  = Join-Path $HOME "ai-skills-config\gemini\mission-control\main.mjs"
$startScript = Join-Path $HOME "ai-skills-config\gemini\mission-control\start-mc.ps1"

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut((Join-Path $desktopPath "Mission Control.lnk"))
$Shortcut.TargetPath       = "powershell.exe"
$Shortcut.Arguments        = "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$startScript`""
$Shortcut.WorkingDirectory = (Split-Path $mainScript)
$Shortcut.Description      = "Launch Gemini Agent Mission Control (http://localhost:4400)"
$Shortcut.IconLocation     = "shell32.dll,21"
$Shortcut.WindowStyle      = 7
$Shortcut.Save()

Write-Output "Desktop shortcut created: $(Join-Path $desktopPath 'Mission Control.lnk')"
