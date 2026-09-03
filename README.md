# ZMK config for a wireless Corne

QWERTY across four layers, with Luna the dog on the left display.

## Hardware

- Corne, 42 keys, 3x6 plus 3 thumb keys per half
- nice!nano v2 controllers (nRF52840)
- nice!view displays on both halves
- Left half is the central, right half is the peripheral

ZMK is pinned to `v0.3` in `config/west.yml`.

## Layers

Four layers. Adjust is reached by holding Lower and Raise together, wired
through `conditional-layers` rather than a key of its own.

| Layer | Name | How to reach it |
|---|---|---|
| 0 | Base | default |
| 1 | Lower | hold the left outer thumb |
| 2 | Raise | hold the bottom right outer key |
| 3 | Adjust | hold Lower and Raise together |

### Base

```
 ESC    Q     W     E     R     T   |   Y     U     I     O     P    GUI
  `     A     S     D     F     G   |   H   CTL/J ALT/K   L     ;   CAPSW
 TAB    Z     X     C     V     B   |   N     M     ,     .     /    RSE
                 LWR   SFT  BSPC    |  ENT   SPC    '
```

Two keys do double duty. `J` types J when tapped and acts as Ctrl when held,
`K` types K when tapped and acts as Alt when held. Those letters were chosen
deliberately: a mod tap misfires when you linger on the key mid word, so the
risk tracks letter frequency. J is the rarest letter in English and K is close
behind, which makes them the two safest hosts on the board. Ctrl lived on H
originally and H appears in about six percent of English text, which was far
too busy for the job.

`CAPSW` is caps word. Tap it and everything types capitalized until a space or
punctuation ends the run. Underscores do not break it, so `MY_LONG_CONSTANT`
works in one go.

### Lower, symbols and brackets

```
        !     @     #     $     %   |   ^     &     *     (     )
        `     ~     _     \     |   |         (     )     {     }
                                    |         [     ]
                             DEL    |
```

The shifted number row keeps its standard positions, so existing muscle memory
transfers. All six brackets sit on the right hand: parens on index and middle
of the home row, braces beside them on ring and pinky, square brackets directly
under the parens. `{{ ref('model') }}` never leaves the right hand.

The `H` column stays transparent on this layer, which keeps the Ctrl mod tap
reachable while Lower is held.

`<` `>` `:` `"` and `?` are deliberately absent. Shift sits on the left thumb
and comma, period, slash, semicolon and apostrophe are all on the right hand,
so each of those is already a comfortable cross hand press on the base layer.

### Raise, numbers and navigation

```
        7     8     9     /     *   |              UP        VOL+
        4     5     6     -     +   |        LFT  DWN  RGT   VOL-
        1     2     3     0     =   |       PREV  PLAY NEXT  MUTE
```

A numpad with its operators on the left hand, arrows and media on the right.
Raise is held with the right pinky, so the number pad deliberately lives on the
opposite hand. The `H` column and the left thumbs stay transparent so Ctrl and
Shift still work here, which is what makes Ctrl plus arrow and Shift plus arrow
usable for selecting text by word.

### Adjust, everything else

```
        F1    F2    F3    F4    F5  |  F6    F7    F8    F9   F10
        F11   F12  CAPS  INS  PSCRN |  HOME  PGUP  PGDN  END  BOOT
        USB   BLE  BTCLR BOOT RESET |  BT1   BT2   BT3   BT4  BT5
```

Bootloader appears twice on purpose. It only puts the half you press it on into
flashing mode, so each half needs its own.

## Bluetooth

Five profiles, each with its own Bluetooth identity, so the keyboard bonds to
five hosts independently. On the Adjust layer, using base layer letters for
position:

| Press | Does |
|---|---|
| N M , . / | select profile 1 through 5 |
| C | clear the selected profile |
| Z | force output to USB |
| X | force output to Bluetooth |

ZMK only advertises on a profile with no existing bond, so a profile that
already remembers a host will sit silent rather than offer itself for pairing.
Clear it first with `C`, and remove the keyboard on the host side too.

`CONFIG_BT_CTLR_PHY_2M=n` is set because some Realtek and Intel chipsets on
Windows negotiate the 2Mbps PHY badly and pairing fails partway through
bonding.

## Displays

Driven by [zmk-nice-oled](https://github.com/mctechnology17/zmk-nice-oled) using
its `nice_epaper` shield.

- Left: Luna, whose gait tracks WPM, with the live WPM graph and number below
- Right: the module's animated peripheral screen

Notes on the settings behind that, all in `config/corne.conf`:

- Luna reads a rolling WPM average and cannot react to individual keystrokes.
  The frame tick is dropped from 300ms to 150ms because that is the only lever
  on how alive she feels.
- `CONFIG_NICE_OLED_WIDGET_RESPONSIVE=y` raises the display thread priority
  from 5 to 3 and its stack from 2560 to 4096. Without it, typing starves the
  display thread and the animation freezes exactly while you are typing.
- The module enables its own bongo cat by default, and its source defines the
  same symbols as Luna, so building both is a linker error. Exactly one WPM
  animation may be on.
- The modifier indicator strip is off because it renders partially off canvas
  on this display.

## ZMK Studio is disabled

`CONFIG_ZMK_STUDIO=n`, deliberately.

With Studio enabled, the keymap is served from settings storage and the keymap
compiled into the firmware is ignored. Settings storage is not touched by
flashing, by design, so that Bluetooth bonds survive firmware updates. The
result is that a freshly flashed keymap change appears to do nothing at all,
while layer names from the firmware still show on the display, which makes it
look like the flash worked.

With Studio off, this repo is unambiguously the source of truth. If Studio is
ever re-enabled, the escape hatch is Restore Stock Settings in the Studio UI,
or flashing `settings_reset` to both halves.

## Building and flashing

GitHub Actions builds on every push. Download the `firmware` artifact from the
Actions tab.

1. Plug in a half over a USB C data cable. A charge only cable will not work.
2. Double tap the reset button. A `NICENANO` drive appears.
3. Drag the matching `.uf2` onto it.

Windows reports error `0x800701B1` when the copy finishes. That is expected and
means it worked. The bootloader reboots the moment the last block lands, which
pulls the drive out from under Explorer before it can finalize. Click Cancel,
not Try Again.

Which half needs flashing:

- Keymap changes: left half only. The central resolves the whole keymap; the
  peripheral only reports key positions.
- Central display changes: left half only.
- Peripheral display changes: right half.
- Never put the left firmware on the right half. That produces two centrals
  which cannot talk to each other.

`settings_reset` clears the stored bonds and any stored keymap. To use it,
flash it to both halves, power both off, then flash real firmware to both.
Doing one half at a time leaves the other holding a stale bond that will
re-poison the pair.

## Charging

Each half has its own battery, its own charging circuit and its own USB port.
Nothing crosses between them, so each is charged separately.

**The power switch must be on to charge.** The switch sits in series with the
battery, so with it off the cell is physically disconnected and the charger has
nothing to charge. This fails silently: the board runs from USB power, the
display lights up and the keyboard types normally while the battery gains
nothing.

Any USB C cable and any normal 5V source works. Charging runs at roughly 100mA
by design, so a flat cell takes a few hours. To confirm it is working, note the
battery percentage on the display, wait an hour and check it moved.

## Known issue

One desktop PC using a Realtek USB dongle (VID 0BDA, PID B850) will not bond
with this keyboard across any profile, having also been tried with the 2Mbps
PHY disabled and with passkey entry enabled. The same keyboard pairs first time
with a phone and a MacBook, and a BLE mouse stays bonded on that same dongle.
The conclusion is the dongle, not the firmware. Passkey entry was reverted
because it forces a typed code on every pairing and breaks the bonds that do
work.

## Resources

- [ZMK documentation](https://zmk.dev/docs)
- [Key codes](https://zmk.dev/docs/codes)
- [Connection issues](https://zmk.dev/docs/troubleshooting/connection-issues)
- [nice!nano](https://nicekeyboards.com/docs/nice-nano/)
- [Corne](https://github.com/foostan/corne)
