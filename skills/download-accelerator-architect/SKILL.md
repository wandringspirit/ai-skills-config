---
name: download-accelerator-architect
description: High-performance multi-connection download accelerator engine, dynamic file segmentation algorithms, video stream sniffer (HLS/DASH/Direct), browser extension integration (Native Messaging Host), and modern desktop download manager architecture.
---

# Download Accelerator & Modern IDM Architecture

This skill defines the technical standards, algorithms, network protocols, and architectural specifications for engineering high-performance download accelerators that rival and exceed commercial tools like Internet Download Manager (IDM), Free Download Manager (FDM), and Motrix.

---

## 1. Core Accelerator Engine Principles

### 1.1 Dynamic File Segmentation (IDM's Core Secret)
Standard HTTP downloads use a single TCP connection, which is throttled by server-side per-connection rate limits, TCP slow-start, and BDP (Bandwidth-Delay Product) latency constraints over long network hops.

A high-performance download manager splits downloads into concurrent segments using HTTP `Range: bytes=start-end` headers:

1. **Pre-Flight Probe (`HEAD` or 1-byte `GET`)**:
   - Check `Accept-Ranges: bytes` header. If missing or `bytes=none`, fallback to single-connection streaming download.
   - Extract `Content-Length` (file size in bytes) and `ETag` / `Last-Modified` for cache and integrity validation.
   - Detect dynamic redirects (HTTP 301, 302, 307, 308) and follow up to destination.
   - Detect server support for HTTP/2 or HTTP/3 multiplexing.

2. **Initial Chunk Distribution**:
   - Divide total bytes into $N$ balanced parts ($N$ usually configurable from 4 to 32 connections, default 8 or 16).
   - Connection $i$: `Range: bytes=offset_i-(offset_{i+1} - 1)`.

3. **Dynamic Re-Segmentation (The True IDM Advantage)**:
   - Fixed splitters (like basic chunkers) suffer from the "slowest connection bottleneck": 7 connections finish, but connection 8 gets stuck downloading the remaining 20% at 50 KB/s.
   - **IDM's dynamic algorithm**:
     - Constantly monitor remaining bytes on each active connection.
     - When any connection finishes its allocated segment early, identify the connection with the largest remaining unfinished byte block.
     - If the remaining block is larger than a minimum chunk threshold (e.g. > 2 MB):
       - Split that remaining block into two equal halves.
       - The existing connection continues downloading the first half.
       - The idle connection issues a new `Range` request for the second half.
     - This ensures all available network threads remain saturated at 100% until the final byte is delivered.

### 1.2 On-The-Fly Concurrency Scaling (Live Slider 1–64 Threads)
Modern accelerators allow users to dynamically change thread counts *during* an active download without restarting or losing progress:
- **Scale Up (e.g. 16 -> 32/64 threads)**:
  - Inspect all active segments with remaining unfinished bytes > 512 KB.
  - Sort segments descending by unread remaining size.
  - Bisect the largest segments into two halves: shrink the current segment's boundary and instantiate a new child segment with its own HTTP worker thread for the upper half.
  - Sockets open immediately and start writing directly to their allocated file offsets.
- **Scale Down (e.g. 64 -> 16 threads)**:
  - Gracefully abort excess active worker threads (`req.destroy()`).
  - Extend the boundaries of adjacent remaining segments to absorb the aborted ranges or re-enqueue them for the surviving threads to finish.
- **Live UI Controls**:
  - Continuous slider (1 to 64) with live badge indicators (`[Ultra Turbo]` for >32, `[IDM Default]` for 32, `[Balanced]` for 16, `[Safe]` for 8).
  - One-click preset pills for instant switching without drag friction.

### 1.3 Zero-Copy Direct-to-Disk Offset Writing
Many amateur download managers download chunks into separate temporary files (`part1.tmp`, `part2.tmp`, etc.) and then perform a slow, disk-thrashing concatenation phase at the end (which can take minutes on 50GB files).

A production-grade accelerator uses **Single-File Pre-Allocation with Direct Absolute Offset Writes**:
- Open a single destination file handle immediately (`fs.openSync(destPath, 'w+')` or Windows `CreateFileW`).
- Allocate file length upfront using sparse file allocation or `SetEndOfFile` / `fallocate` / `ftruncateSync(fd, totalBytes)` to avoid filesystem fragmentation.
- When worker thread $i$ receives a byte buffer from the network socket, it writes directly to the exact file offset:
  `fs.write(fd, buffer, 0, buffer.length, chunkCurrentPosition)`
- When all chunks reach their boundary, the file is already 100% complete and assembled. **Zero concatenation time!**

### 1.3 Fault-Tolerant Resumption & State Machine
- Maintain a local state journal (`<filename>.meta.json` or SQLite database) tracking:
  - Total file size, target path, original URL, referrer, headers, user-agent.
  - Array of segments: `[{ start, currentOffset, end, completed: boolean }]`.
  - Server validation markers: `ETag`, `Last-Modified`.
- On network disconnect, user pause, or system restart:
  - Send a `HEAD` request to verify the server `ETag` hasn't changed.
  - If `ETag` matches, resume each unfinished segment from `currentOffset` using `Range: bytes=currentOffset-end`.
  - If `ETag` changed or server returns `HTTP 416 (Range Not Satisfiable)`, prompt the user to re-download from scratch or update the download URL.

---

## 2. Video Sniffing & Stream Grabbing (HLS / DASH)

Over 90% of modern streaming websites do NOT serve direct `.mp4` URLs; they stream video using segmented manifests:
1. **HLS (HTTP Live Streaming)**: Master manifest (`.m3u8`) pointing to resolution variants, which point to media playlists listing sequential chunks (`.ts` or `.m4s` fragments).
2. **MPEG-DASH**: XML manifest (`.mpd`) with video/audio adaptation sets and segment templates.

### 2.1 Media Sniffing Strategy
- Intercept network requests via Browser Extension `webRequest` or `declarativeNetRequest` listening for content types:
  - `application/x-mpegURL`, `application/vnd.apple.mpegurl` (`.m3u8`)
  - `application/dash+xml` (`.mpd`)
  - `video/mp4`, `video/webm`, `video/x-flv`, `audio/mp4`, `audio/mpeg`
- Parse manifest playlists to extract available streams, bitrates, resolutions (4K, 1080p, 720p, etc.).
- Multi-threaded segment downloader: download dozens of `.ts` / `.m4s` chunks concurrently.
- Native or embedded FFmpeg multiplexer to combine separate video and audio streams losslessly into a single `.mp4` or `.mkv` container.

---

## 3. Browser Integration Architecture

### 3.1 Native Messaging Protocol
Chrome, Edge, Brave, and Firefox communicate with desktop native applications using the **Native Messaging Host** protocol:
- The desktop app registers a registry key:
  `HKCU\Software\Google\Chrome\NativeMessagingHosts\com.downloadaccelerator.manager`
  pointing to a JSON manifest with the path to the native executable.
- Communication uses length-prefixed JSON over standard input (`stdin`) and standard output (`stdout`):
  - Each message is serialized as JSON, UTF-8 encoded.
  - Prefixed with a 32-bit unsigned integer (in native byte order) containing the message length.
- Allows 1-click download interception:
  - Browser clicks on `.zip`, `.exe`, `.iso`, etc. $\rightarrow$ Extension cancels browser internal download $\rightarrow$ sends URL, cookies, referer, user-agent to Desktop app via Native Messaging.
  - Floating Video Download button: Extension injects an overlay widget on `<video>` players to offer "Download this video" in 1 click.

---

## 4. Feature Parity & Superiority Matrix (IDM vs. Modern Accelerator)

| Feature | Classic IDM | Modern Free Accelerator Architected Here |
|---|---|---|
| **License & Price** | Paid ($24.95/yr or $39.95 lifetime), 30-day nag trial | **100% Free, Open Source (MIT), Zero Ads/Nags** |
| **Dynamic Segmentation** | Up to 32 connections with dynamic re-split | Up to 32/64 connections with dynamic re-split algorithm |
| **Zero-Copy File Assembly** | Often concatenates temporary parts at finish | **Direct-to-Disk Absolute Offset Writing (Instant Complete)** |
| **Video Stream Grabber** | Basic HLS/FLV grabber | **Full HLS (.m3u8) + MPEG-DASH (.mpd) + yt-dlp integration** |
| **Torrent / BitTorrent** | ❌ Not supported | **✅ Supported (via libtorrent / aria2 integration)** |
| **UI Aesthetic** | Windows 98 / XP retro style | **Modern Dark/Light Glassmorphic UI with speed graphs** |
| **Cross-Platform** | Windows only | **Windows, macOS, Linux** |
| **Browser Integration** | Chrome/Firefox/Edge extension | **Chrome/Edge/Brave/Firefox Manifest V3 Extension** |
| **Bandwidth Limiter** | Token bucket speed limiter | **Global and per-task smooth token-bucket rate limiter** |
| **Queue & Scheduler** | Custom queues, scheduled start/stop | **Queue priority, scheduled timer, auto-sleep/shutdown** |

---

## 5. Gemini (Antigravity) Execution SOP

When tasked with designing, implementing, or debugging a download accelerator:
1. **Analyze System Prerequisites**:
   - Check available runtimes (Node.js, Python, C++, etc.).
   - Choose the optimal stack:
     - Desktop UI & Orchestration: Electron + React + Tailwind CSS + Lucide Icons OR Tauri v2.
     - Download Engine: Node.js multi-threaded `worker_threads` with zero-copy stream writing OR embedded `aria2c` / custom native engine for maximum throughput.
     - Stream Demuxer / Remuxer: Embedded static `ffmpeg` binary for merging audio/video streams without quality loss.
     - Browser Extension: Manifest V3 extension with native messaging / background service worker.
2. **Implement Core Engine First**:
   - Verify HTTP Range requests, dynamic chunk splitting, resume tokens, and write-buffer backpressure.
3. **Build the Desktop GUI**:
   - Download list with active progress bar, speed graph, ETA, connection chunk visualization (visualizing the segments like IDM's famous segmented bar).
   - Category filtering (All, Compressed, Documents, Music, Programs, Video).
   - "Add Download" modal supporting direct links, batch URLs, and authentication credentials.
4. **Deploy & Package**:
   - Provide runnable development commands (`npm run dev`) and production build targets (`npm run build`).

---

## 6. Claude Execution SOP

When executing in Claude environments:
1. Prioritize modular decoupling: engine logic (`/core`), desktop UI (`/renderer`), native bridge (`/native-messaging`), and browser extension (`/extension`).
2. Implement robust test cases for byte boundary calculations, range header formatting, and connection failure re-attempts.
3. Document build and distribution instructions clearly in the project README.
