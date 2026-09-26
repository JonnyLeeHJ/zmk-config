# Mobile reference draft

Run from the repository root:

    node docs/mobile/generate.js

Open docs/mobile/index.html or serve the repository with a local static HTTP
server. The page embeds its data and needs no CDN or runtime dependencies.

The generator reuses the binding parser from docs/generate-layout.js, reads
config/corne.keymap, and records the most recent commit that changed that file.
Regenerate after every mapping change. Edit template.html rather than index.html.

All four layers display effective bindings. Adjust resolves transparent keys
through Raise, Lower, then Base. Tapping keys is informational and never sends
keyboard commands. Mac/Windows toggles only the labels.

This is a draft, not a published GitHub Pages site. Offline installation and
automatic deployment are not configured.
