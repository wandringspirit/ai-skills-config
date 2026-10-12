---
name: windows-desktop-automation
description: >-
  Windows desktop automation skill covering PowerShell shortcut creation (.lnk),
  Windows Task Scheduler jobs, startup folder entries, system tray launchers,
  desktop icon management, and Windows Shell COM automation. Use whenever the user
  needs desktop shortcuts, auto-start services, scheduled tasks, or Windows shell
  scripting.
---

# Windows Desktop Automation (`windows-desktop-automation`)

## 1. Creating Desktop Shortcuts (.lnk) via PowerShell COM

```powershell
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$HOME\Desktop\MyApp.lnk")
$Shortcut.TargetPath = "C:\path\to\executable.exe"
$Shortcut.Arguments = "arg1 arg2"
$Shortcut.WorkingDirectory = "C:\path\to\working\dir"
$Shortcut.IconLocation = "C:\path\to\icon.ico,0"
$Shortcut.Description = "Tooltip description"
$Shortcut.WindowStyle = 7  # 1=Normal, 3=Maximized, 7=Minimized
$Shortcut.Save()
```

### For Node.js Scripts (Hidden Console Window)
Use `pythonw` or `wscript` wrapper, OR use `WindowStyle = 7` (Minimized) with `powershell -WindowStyle Hidden`:

```powershell
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = '-WindowStyle Hidden -Command "node \"C:\path\to\script.mjs\""'
$Shortcut.WindowStyle = 7
```

### Run as Administrator
After creating `.lnk`, set the "Run as administrator" flag:
```powershell
$bytes = [System.IO.File]::ReadAllBytes("$HOME\Desktop\MyApp.lnk")
$bytes[0x15] = $bytes[0x15] -bor 0x20
[System.IO.File]::WriteAllBytes("$HOME\Desktop\MyApp.lnk", $bytes)
```

## 2. Adding to Windows Startup Folder
```powershell
$StartupFolder = [Environment]::GetFolderPath('Startup')
# Copy or create shortcut there to auto-launch on login
Copy-Item "$HOME\Desktop\MyApp.lnk" "$StartupFolder\MyApp.lnk"
```

## 3. Task Scheduler (One-Shot or Recurring)
```powershell
$Action = New-ScheduledTaskAction -Execute "node" -Argument '"C:\path\to\script.mjs"'
$Trigger = New-ScheduledTaskTrigger -AtLogon
Register-ScheduledTask -TaskName "MyDaemon" -Action $Action -Trigger $Trigger -Description "Auto-start daemon"
```

## 4. Best Practices
- Always use `$HOME` or `[Environment]::GetFolderPath()` for portable paths.
- Use `-WindowStyle Hidden` for background daemons the user doesn't need to see.
- For servers that should auto-start and stay running, prefer Task Scheduler with `-AtLogon` trigger over Startup folder.
- Always set `WorkingDirectory` on shortcuts to avoid path resolution issues.
- Pin to taskbar: not scriptable via COM; instruct the user to right-click the shortcut → "Pin to taskbar".
