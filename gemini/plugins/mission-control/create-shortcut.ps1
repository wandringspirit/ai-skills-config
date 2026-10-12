$mainScript = Join-Path $HOME "ai-skills-config\gemini\plugins\mission-control\sidecars\panel\main.mjs"
$workDir    = Split-Path $mainScript

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut((Join-Path $HOME "Desktop\Mission Control.lnk"))
$Shortcut.TargetPath       = "powershell.exe"
$Shortcut.Arguments        = "-WindowStyle Hidden -File `"$(Join-Path $HOME 'ai-skills-config\gemini\plugins\mission-control\start-mc.ps1')`""
$Shortcut.WorkingDirectory = $workDir
$Shortcut.Description      = "Launch Gemini Agent Mission Control (http://localhost:4400)"
$Shortcut.IconLocation     = "shell32.dll,21"
$Shortcut.WindowStyle      = 7
$Shortcut.Save()

Write-Output "Desktop shortcut created: $HOME\Desktop\Mission Control.lnk"
