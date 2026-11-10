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

## 4. Power Management (keep awake, sleep, lock, shut down)

Reference implementation: `wandringspirit/stay-awake` (`stay_awake.pyw`, Python + ctypes, no dependencies).

- **Keep awake**: `SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED [| ES_DISPLAY_REQUIRED])` from a long-lived thread;
  call with `ES_CONTINUOUS` alone to release. It is per-thread and dies with the process. It does NOT stop lid-close, power-button
  or Start > Sleep. Verify it without admin via `CallNtPowerInformation(16 /*SystemExecutionState*/)`. That value is the
  system-wide OR of every app's requests, so other apps (e.g. the Claude desktop app) can keep bit 0 set. Test your own
  process by its log, not that bit alone. `powercfg /requests` needs admin.
- **Detect Modern Standby first**: `powercfg /a` or `GetPwrCapabilities` (SYSTEM_POWER_CAPABILITIES bytes 3-5 = SystemS1..S3,
  byte 20 = AoAc). On Modern Standby (S0 low power idle, AoAc=1, no S3), prefer `ES_DISPLAY_REQUIRED` too when keeping awake.
- **Sleep now**: `SetSuspendState(FALSE, FALSE, FALSE)` works only with S1-S3. On Modern Standby it fails or hibernates.
  There is no public API there: post `WM_SYSCOMMAND / SC_MONITORPOWER, 2` to `HWND_BROADCAST` (display off, so Windows enters standby).
  Release your own wake request first, or it blocks the transition.
- **Lock**: `user32.LockWorkStation()`. **Shut down**: `shutdown /s /t 0` (add `/f` only on explicit opt-in, because it loses unsaved work;
  with `/t` > 0, `/f` is implied).
- **Scheduled power actions**: always show a cancellable countdown first. Skip occurrences missed while the PC was off or asleep
  (grace ~90 s), plus any before the arm was (re)armed or the agent started, so a shutdown doesn't fire right after login or wake.
  Track fired occurrences per arm in memory to fire exactly once.
- **Background agent pattern**: a `pythonw` child with `DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP` (+ `CREATE_BREAKAWAY_FROM_JOB`,
  falling back without it). Use a named mutex for single-instance and liveness (`OpenMutexW`), a stop-file to shut down cleanly,
  and an HKCU `...\CurrentVersion\Run` value for sign-in autostart (opt-in).
- **Never test** real sleep, lock or shutdown on the user's machine without asking. Use a dry-run env flag that logs instead.

## 5. Best Practices
- Always use `$HOME` or `[Environment]::GetFolderPath()` for portable paths.
- Use `-WindowStyle Hidden` for background daemons the user doesn't need to see.
- For servers that should auto-start and stay running, prefer Task Scheduler with `-AtLogon` trigger over Startup folder.
- Always set `WorkingDirectory` on shortcuts to avoid path resolution issues.
- Pin to taskbar: not scriptable via COM; instruct the user to right-click the shortcut → "Pin to taskbar".
