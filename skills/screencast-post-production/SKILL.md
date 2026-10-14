---
name: screencast-post-production
description: >-
  Clean up a screen recording before it is sent anywhere: fix quiet or noisy narration, add
  accurate subtitles, blur private details, and review it against a script or a reviewer's
  requirements (for example an API compliance or app-store review). Activate when the user says
  "improve the voice", "add subtitles", "check my recording", or hands over an .mp4 screencast.
---

# Screencast post-production (`screencast-post-production`)

## 1. Review before polishing

A clean video with the wrong content is worse than a rough one. Check content first:

- **Against the script or brief.** Transcribe, then compare line by line. Flag spoken slips that
  change a fact (numbers, durations, limits). These cannot be fixed by subtitles alone: either
  re-record the line, or show an on-screen correction note while it plays. Never silently "fix"
  the subtitle to say something the narrator didn't say.
- **For things that must not be on screen.** Contact sheets every 4 s (ffmpeg `fps=1/4,tile=3x3`
  with a `drawtext` timestamp) show the whole video in about 10 images; zoom into any frame that
  shows another site, a file dialog, a terminal or settings. Look for credentials and API keys,
  personal names, email addresses, folder names, notifications, other tabs, and anything the
  brief says to keep off camera.
- **For dead air.** A screen that stays static while the narration describes something visual
  (a header, a chart, a setting) is a gap the viewer notices. Report it with timestamps.

## 2. Voice

Measure first (`volumedetect`, `astats`). A typical laptop-mic chain, in ffmpeg:

`highpass=f=80, lowpass=f=12000, afftdn=nr=14:nf=-55:tn=1, acompressor=threshold=-30dB:ratio=3:attack=10:release=200:makeup=6dB`,
then **two-pass `loudnorm`** to I=-16 LUFS, TP=-1.5 dB (measure with `print_format=json`, then
pass `measured_*` values and `linear=true`). Set `nf` near the measured noise floor in pauses.
Keep denoise moderate: too strong makes speech watery.

## 3. Subtitles

- Transcribe the **enhanced** audio (Whisper `small.en` or larger, `word_timestamps=True`).
  An `initial_prompt` with the domain's jargon helps, but it biases the model, so check any
  disputed word against an unprompted pass. If both passes agree, that is what was said.
- Correct mishearings against the script only where the audio plainly follows it. Keep cues at
  two lines or fewer, 42 to 60 characters a line, and never overlapping.
- Deliver both: an **SRT** (for YouTube or Drive caption upload) and **burned-in** ASS subtitles
  (for reviewers whose player ignores caption tracks). Bottom-centre box style; corrections in
  a second style at the top.

## 4. Render

Blur private regions with `boxblur=...:enable='between(t,a,b)'`. Burn with the `ass` filter.
Use a GPU encoder when present (`h264_nvenc -preset p5 -rc vbr -cq 21 -b:v 0`), `yuv420p`,
AAC 192k, `-movflags +faststart`. Check frames from the output: subtitle placement, blur,
text sharpness.

---

## Gemini (Antigravity) Execution SOP

- Locate ffmpeg (system or a bundled binary) and a Whisper install before planning; report what
  is missing rather than downloading tools without approval.

---

## Claude Execution SOP

- No system ffmpeg on the owner's Windows machine: use the `imageio_ffmpeg` binary
  (`python -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"`); it includes
  libass, afftdn, loudnorm and h264_nvenc. openai-whisper `small.en` is cached in `~/.cache/whisper`;
  it needs ffmpeg on PATH, so load the WAV with `wave` and numpy and pass the array.
- Work in the scratchpad; write only the final video and SRT next to the original. Never stage
  media files in git.
- Read contact sheets with `Read`; report findings with timestamps and a fix for each.
