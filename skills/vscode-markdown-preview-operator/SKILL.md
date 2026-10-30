---
name: vscode-markdown-preview-operator
description: Visual Studio Code Markdown preview configuration, workbench.editorAssociations, default editor settings, side-by-side preview synchronization, and extension management.
---

# VS Code Markdown Preview Operator

Comprehensive operational guide for configuring Visual Studio Code to handle Markdown (`.md`) files with custom default editor associations, automatic preview modes, source/preview toggling, and workspace-level overrides.

---

## 1. Primary Method: Configure Default Editor via GUI (1-Click)

The easiest and safest way in VS Code without editing JSON files directly:
1. In the VS Code File Explorer sidebar, **right-click any `.md` file** (e.g., `README.md` or `COMPETITORS.md`).
2. Select **"Open With..."**.
3. Choose **"Configure default editor for '*.md'..."** at the bottom of the dropdown.
4. Select **"Markdown Preview"** (`vscode.markdown.preview.editor`).

*Result*: VS Code will automatically bind all `.md` files to open directly in rendered preview mode when clicked.

---

## 2. Configuration via `settings.json`

To apply this globally across all projects or strictly for a single workspace:

### Global (User Settings)
1. Open Command Palette: `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (macOS).
2. Type and select: **`Preferences: Open User Settings (JSON)`**.
3. Add the following property:
```json
{
  "workbench.editorAssociations": {
    "*.md": "vscode.markdown.preview.editor"
  }
}
```

### Workspace Only (`.vscode/settings.json`)
If you only want this behavior in specific projects (like documentation repos or content vaults):
Create or edit `.vscode/settings.json` in the root of your workspace:
```json
{
  "workbench.editorAssociations": {
    "*.md": "vscode.markdown.preview.editor"
  }
}
```

---

## 3. Switching Back & Editing Markdown Source

When `.md` files open in preview mode by default, users often need to quickly edit the underlying source code:

| Action | Shortcut / Method |
| :--- | :--- |
| **Show Source (Raw Markdown)** | Click the **Show Source** icon (`{}` or document icon) at the top-right toolbar of the editor tab. |
| **Reopen in Text Editor** | Right-click the active tab header $\to$ Select **"Reopen Editor With..."** $\to$ Choose **"Text Editor"**. |
| **Open Preview to Side** | `Ctrl + K, V` (opens rendered preview alongside the active text editor). |
| **Toggle Preview In-Place** | `Ctrl + Shift + V` (switches active tab between raw markdown and preview). |

---

## 4. Preserving Source Code Diff for Git

By default, Git diffs might attempt to use the preview editor. To ensure version control diffs always display the raw textual differences, add:
```json
{
  "workbench.diffEditorAssociations": {
    "*.md": "default"
  }
}
```

---

## 5. Gemini (Antigravity) Execution SOP

1. Identify the user's operating environment and editor version.
2. Present the fastest 2-click GUI method first, followed by the exact `settings.json` snippet.
3. Proactively explain how to switch back to editing source text so the user is never trapped in read-only preview mode.
4. Provide git diff isolation advice (`workbench.diffEditorAssociations`) for developer workflows.

---

## 6. Claude Execution SOP

1. Maintain shared domain knowledge in `SKILL.md`.
2. Provide step-by-step guidance for `workbench.editorAssociations`.
3. Provide shortcuts for `Ctrl + Shift + V` and `Ctrl + K, V`.
