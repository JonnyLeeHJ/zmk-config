# Corne Pocket Keymap

Published at https://JonnyLeeHJ.github.io/zmk-config/ by the Pages workflow.
On iPhone, use Safari > Share > Add to Home Screen. Enable Open as Web App if
offered. Open online once before using offline. Browser storage eviction or
clearing website data can require another online visit.

Regenerate from the repo root after updating the keymap and printable PDF:

    node docs/generate-layout.js
    # Render docs/layout.html to docs/layout.pdf as described in README.md.
    node docs/mobile/generate.js

The mobile generator reuses the diagram's binding parser and records the latest
keymap commit. It embeds all four layers; the service worker caches the app,
icons and PDF. Its cache version hashes these assets, and old app caches are
removed on activation. Online requests refresh the cache; reopen online to see
updated mappings. OS label preference is stored locally.

Edit template.html and sw-template.js, then regenerate. Do not hand-edit the
generated index.html or sw.js. Pages stages only public app assets, not sources.

Transparent keys resolve through Raise, Lower, Base on Adjust. Tapping keys
only explains their behavior: this app never sends commands to the keyboard.
Firmware still needs to be flashed separately.
