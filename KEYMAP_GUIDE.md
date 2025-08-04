# ZMK Keymap Customization Guide

## 🎯 **Understanding Your Corne Layout**

Your Corne keyboard has **42 keys total** (21 per half):
- **Top row**: 6 keys each side
- **Middle row**: 6 keys each side  
- **Bottom row**: 6 keys each side
- **Thumb keys**: 3 keys each side

## 📋 **Layer System**

### **Current Layers:**
1. **Default (Layer 0)**: Engrammer layout
2. **Lower (Layer 1)**: Symbols and punctuation
3. **Raise (Layer 2)**: Numbers, navigation, Bluetooth, and media controls

### **Layer Activation Types:**
- `&mo 1` = **Momentary** - Hold to activate layer 1
- `&lt 1 KEY` = **Layer-tap** - Tap for key, hold for layer 1
- `&to 1` = **Toggle** - Switch to layer 1 (stays active)
- `&tog 1` = **Toggle** - Same as `&to 1`

## 🔑 **Key Types & Behaviors**

### **Basic Keys:**
```c
&kp A          // Regular 'A' key
&kp SPACE      // Spacebar
&kp RET        // Enter/Return
&kp BSPC       // Backspace
&kp TAB        // Tab
&kp ESC        // Escape
```

### **Modifiers:**
```c
&kp LCTRL      // Left Control
&kp RCTRL      // Right Control
&kp LSHFT      // Left Shift
&kp RSHFT      // Right Shift
&kp LGUI       // Left GUI (Windows/Command)
&kp RGUI       // Right GUI
&kp LALT       // Left Alt
&kp RALT       // Right Alt
```

### **Special Behaviors:**
```c
&mt LCTRL A    // Mod-tap: Hold for Ctrl, tap for A
&lt 1 SPACE     // Layer-tap: Hold for layer 1, tap for Space
&trans         // Transparent: Pass through to layer below
&none          // No action
```

### **Bluetooth Controls:**
```c
&bt BT_SEL 0   // Select Bluetooth profile 0
&bt BT_SEL 1   // Select Bluetooth profile 1
&bt BT_CLR     // Clear Bluetooth bonding
&bt BT_NXT     // Next Bluetooth profile
&bt BT_PRV     // Previous Bluetooth profile
```

## 🎨 **Current Layout Configuration**

### **Default Layer (Engrammer Layout)**
```
Left Hand                    Right Hand
┌─────┬─────┬─────┬─────┬─────┬─────┐ ┌─────┬─────┬─────┬─────┬─────┬─────┐
│ ESC │  B  │  Y  │  O  │  U  │  '  │ │  ;  │  L  │  D  │  W  │  V  │  Z  │
├─────┼─────┼─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┼─────┼─────┤
│ `   │  C  │  I  │  E  │  A  │  ,  │ │  .  │  H  │  T  │  S  │  N  │  Q  │
├─────┼─────┼─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┼─────┼─────┤
│ TAB │  G  │  X  │  J  │  K  │  -  │ │  /  │  R  │  M  │  F  │  P  │SHIFT│
└─────┴─────┴─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┴─────┴─────┘
                  │ GUI │LOWER│BSPC │ │ENTER│SPACE│RAISE│ ALT │
                  └─────┴─────┴─────┘ └─────┴─────┴─────┴─────┘
```

**Special Features:**
- **Mod-tap on H**: `&mt LCTRL H` - Hold for Left Control, tap for H
- **Thumb keys**: GUI, Lower, Backspace | Enter, Space, Raise

### **Lower Layer (Symbols & Punctuation)**
```
Left Hand                    Right Hand
┌─────┬─────┬─────┬─────┬─────┬─────┐ ┌─────┬─────┬─────┬─────┬─────┬─────┐
│ TAB │  !  │  @  │  #  │  $  │  %  │ │  ^  │  &  │  *  │  (  │  )  │BSPC │
├─────┼─────┼─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┼─────┼─────┤
│     │  -  │  =  │  [  │  ]  │  \  │ │  _  │  +  │  {  │  }  │  |  │  ~  │
├─────┼─────┼─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │     │     │ │     │     │     │     │     │     │
└─────┴─────┴─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┴─────┴─────┘
                  │ GUI │     │SPACE│ │ENTER│     │     │ ALT │
                  └─────┴─────┴─────┘ └─────┴─────┴─────┴─────┘
```

### **Raise Layer (Numbers, Navigation, Bluetooth, Media)**
```
Left Hand                    Right Hand
┌─────┬─────┬─────┬─────┬─────┬─────┐ ┌─────┬─────┬─────┬─────┬─────┬─────┐
│BTCLR│ BT3 │     │ UP  │     │PLAY │ │     │  7  │  8  │  9  │     │VOL+ │
├─────┼─────┼─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┼─────┼─────┤
│ BT1 │ BT4 │LEFT │DOWN │RIGHT│NEXT │ │     │  4  │  5  │  6  │     │VOL- │
├─────┼─────┼─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┼─────┼─────┤
│ BT2 │ BT5 │     │     │     │PREV │ │     │  1  │  2  │  3  │  0  │MUTE │
└─────┴─────┴─────┼─────┼─────┼─────┤ ├─────┼─────┼─────┼─────┴─────┴─────┘
                  │ GUI │     │SPACE│ │ENTER│     │     │ ALT │
                  └─────┴─────┴─────┘ └─────┴─────┴─────┴─────┘
```

**Key Groups:**
- **Bluetooth Controls**: BTCLR, BT1-BT5 (left side)
- **Navigation**: UP, LEFT, DOWN, RIGHT (left side)
- **Media Controls**: PLAY, NEXT, PREV (left column 6), VOL+, VOL-, MUTE (right column 6)
- **Numbers**: Numpad layout (789, 456, 1230) on right side

## 🎨 **Common Customizations**

### **1. Change a Single Key**
```c
// Change 'Q' to 'W' in default layer
&kp Q          // Original
&kp W          // Modified
```

### **2. Add Mod-tap to Thumb Keys**
```c
// Make spacebar act as layer 1 when held, space when tapped
&kp SPACE      // Original
&lt 1 SPACE      // Modified
```

### **3. Add Function Keys Layer**
```c
function_layer {
    bindings = <
        &kp F1 &kp F2 &kp F3 &kp F4 &kp F5 &kp F6
        &trans &trans &trans &trans &trans &trans
        &trans &trans &trans &trans &trans &trans
                    &trans &trans &trans
    >;
};
```

### **4. Add Media Controls**
```c
// In any layer, replace keys with:
&kp C_VOL_UP   // Volume Up
&kp C_VOL_DN   // Volume Down
&kp C_MUTE     // Mute
&kp C_PREV     // Previous Track
&kp C_NEXT     // Next Track
&kp C_PP       // Play/Pause
```

### **5. Add Mouse Controls**
```c
&mkp L_BTN     // Left mouse button
&mkp R_BTN     // Right mouse button
&mkp M_BTN     // Middle mouse button
&mwh 1         // Mouse wheel up
&mwh -1        // Mouse wheel down
```

## 🔧 **Key Code Reference**

### **Numbers:**
```c
&kp N0 &kp N1 &kp N2 &kp N3 &kp N4
&kp N5 &kp N6 &kp N7 &kp N8 &kp N9
```

### **Symbols:**
```c
&kp EXCL       // !
&kp AT         // @
&kp HASH       // #
&kp DLLR       // $
&kp PRCNT      // %
&kp CARET      // ^
&kp AMPS       // &
&kp ASTRK      // *
&kp LPAR       // (
&kp RPAR       // )
&kp MINUS      // -
&kp EQUAL      // =
&kp LBKT       // [
&kp RBKT       // ]
&kp BSLH       // \
&kp GRAVE      // `
&kp UNDER      // _
&kp PLUS       // +
&kp LBRC       // {
&kp RBRC       // }
&kp PIPE       // |
&kp TILDE      // ~
```

### **Punctuation:**
```c
&kp SEMI       // ;
&kp SQT        // '
&kp COMMA      // ,
&kp DOT        // .
&kp FSLH       // /
&kp COLON      // :
&kp DQT        // "
&kp QMARK      // ?
```

### **Navigation:**
```c
&kp LEFT       // Left arrow
&kp RIGHT      // Right arrow
&kp UP         // Up arrow
&kp DOWN       // Down arrow
&kp HOME       // Home
&kp END        // End
&kp PG_UP      // Page Up
&kp PG_DN      // Page Down
```

## 🚀 **Advanced Features**

### **Combos (Multiple Keys Pressed Together):**
```c
/ {
    combos {
        compatible = "zmk,combos";
        
        combo_esc {
            bindings = <&kp ESC>;
            key-positions = <0 1>;
            timeout-ms = <50>;
        };
    };
};
```

### **Macros (Key Sequences):**
```c
/ {
    macros {
        compatible = "zmk,macros";
        
        macro_hello {
            bindings = <&macro_press &kp LSHFT &kp H &macro_release &kp H &kp E &kp L &kp L &kp O>;
        };
    };
};
```

## 📝 **Workflow for Customization**

1. **Edit** `config/corne.keymap`
2. **Save** your changes
3. **Commit** to Git: `git add . && git commit -m "Customize keymap"`
4. **Push** to GitHub: `git push`
5. **Wait** for GitHub Actions to build firmware
6. **Download** and flash the new firmware

## 🎯 **About the Engrammer Layout**

The **Engrammer layout** is a phonetic keyboard layout designed to improve typing efficiency by placing frequently used letter combinations closer together. It's based on the principle that certain letter pairs appear together more often in English.

### **Key Features:**
- **Phonetic grouping**: Letters that commonly appear together are placed near each other
- **Reduced finger travel**: Common letter combinations require minimal finger movement
- **Optimized for English**: Designed specifically for English language patterns

### **Layout Philosophy:**
- **Top row**: ESC B Y O U ' ; L D W V Z
- **Middle row**: ` C I E A , . H T S N Q  
- **Bottom row**: TAB G X J K - / R M F P SHIFT

### **Common Letter Pairs in Engrammer:**
- **TH**: T and H are adjacent on the middle row
- **ST**: S and T are adjacent on the middle row
- **HE**: H and E are close together
- **AN**: A and N are adjacent on the middle row
- **IN**: I and N are close together

## 💡 **Pro Tips**

- **Test incrementally** - Make small changes and test them
- **Use `&trans`** for keys you don't want to change in a layer
- **Layer order matters** - Higher numbered layers are "on top"
- **Backup your keymap** before major changes
- **Use comments** to document your customizations
- **Practice the Engrammer layout** - It may take time to adapt from QWERTY

## 🔗 **Useful Resources**

- [ZMK Documentation](https://zmk.dev/docs)
- [Key Code Reference](https://zmk.dev/docs/codes)
- [Behavior Reference](https://zmk.dev/docs/behaviors)
- [Community Configs](https://github.com/zmkfirmware/zmk-config) 