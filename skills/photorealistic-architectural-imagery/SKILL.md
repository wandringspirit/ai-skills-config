---
name: photorealistic-architectural-imagery
description: >-
  Architectural photography, exterior/interior visualization, material realism, and AI image
  generation prompt engineering. Specializes in realistic construction details, physical materials,
  lighting physics (golden hour, post-storm, dusk, blue hour), camera optics (tilt-shift, 16:9),
  and generating high-fidelity renders via image generation agents.
---

# Photorealistic Architectural Imagery & Visualization (`photorealistic-architectural-imagery`)

This skill governs the production of photorealistic architectural imagery, fine-art exterior/interior architectural photography, and AI image synthesis (Flux, Midjourney, Imagen, DALL-E).

---

## 1. Core Architectural Photography Framework

### Camera & Optics
- **Lens Simulation**: Wide to normal tilt-shift lens (24mm–35mm f/8–f/11). Parallel vertical lines with zero vertical convergence or keystoning distortion.
- **Elevation / Viewpoint**: Eye-level street perspective (~5.5 ft / 1.7 m) establishes grounded human scale; low hero angles emphasize monumental scale; elevated 3/4 aerial view captures full roofline layout.
- **Aspect Ratio**: 16:9 landscape aspect ratio for panoramic architectural elevation and contextual environment.
- **Depth of Field**: Deep hyperfocal distance (f/8 to f/11), edge-to-edge sharpness from foreground driveway textures to distant roof ridges and clouds.

### Atmosphere & Lighting Physics
- **Post-Storm / Rain Clearing**:
  - Wet surfaces (asphalt, concrete driveway, flagstone walkways) with specular ground reflections.
  - Saturated lush turf and foliage with micro-droplets.
  - Storm clouds breaking away (cumulonimbus mammatus / clearing stratocumulus) with low-angle warm sunlight puncturing through.
- **Golden Hour / Twilight Contrast**:
  - Warm low-angle sun (2200K–3200K) creating rich directional raking light across masonry and roof planes.
  - High color contrast against cool slate/indigo storm clouds in the background (color temperature complement).
  - Warm interior architectural illumination (2700K warm white) visible through clean glass panes, conveying occupancy and shelter.

### Structural & Material Fidelity
- **Masonry / Facade**:
  - True-to-life masonry texture (e.g., Texas cream/buff chopped limestone with consistent raked mortar joints).
  - Natural mineral variations, rough-hewn stone relief, and realistic shadow depth.
- **Roofing & Waterproofing Anatomy**:
  - **Architectural / Dimensional Shingles**: Heavyweight laminated fiberglass shingles with distinct staggered tab profiles, granular ceramic mineral coating, and visible shadow bands.
  - **Ridges & Hips**: Dedicated ridge cap shingles with straight, crisp alignment over low-profile continuous ridge vents.
  - **Valleys**: Crisp open metal W-valleys or woven closed-cut valleys where intersecting gable pitches meet.
  - **Chimneys & Flashing**: Step flashing layered into individual shingle courses and metal counter-flashing tucked into mortar joints (reglet cut).
  - **Drainage**: Seamless aluminum or copper K-style gutters fitted snug to the fascia board with clean mitered corners and downspouts connected with proper strapping and splash blocks.

### Clean Execution & Negative Constraints
- Strictly avoid CGI glossy plastic sheen, oversaturated HDR halos, warped roof planes, inconsistent perspective lines, AI watermarks, lens flares, unwanted pedestrians, or text.

---

## 2. Gemini (Antigravity) Execution SOP

1. **Synthesize Detailed Brief**:
   - Translate the user's architectural vision into an exacting optical, structural, and atmospheric prompt.
   - Specify 16:9 framing, camera perspective, lighting, structural components, and negative exclusions.
2. **Invoke `image-generator` Subagent**:
   - Use `invoke_subagent` with `TypeName: "image-generator"` and `Role: "Architectural Image Synthesizer"`.
   - Provide the complete photographic brief in the `Prompt`.
3. **Verify and Display Result**:
   - When the subagent completes, retrieve the file path of the generated image.
   - Present the image to the user with file link and contextual breakdown of architectural details achieved.

---

## 3. Claude Execution SOP

1. **Prompt Engineering & Parameter Formulation**:
   - For Midjourney v6+: Append `--ar 16:9 --style raw --v 6.1 --stop 100`.
   - For Flux.1 (Schnell/Dev): Specify guidance scale (3.5), steps (28-50), and exact aspect ratio (1344x768 or 1024x576).
2. **Tool Dispatch**:
   - If an image generation tool or MCP server (e.g., Fal.ai, Replicate, DALL-E) is configured, invoke the tool directly.
   - If generating prompts for the user, provide the production prompt block along with negative prompts and parameter tags.
