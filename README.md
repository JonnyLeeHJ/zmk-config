# ZMK Config for Corne Keyboard with Engrammer Layout

This repository contains the ZMK firmware configuration for a **Corne keyboard** with **nice!nano v2** controllers and **nice!view** displays, featuring a custom **Engrammer layout** with optimized layers for symbols, numbers, navigation, Bluetooth controls, and media keys.

## 🎯 **Firmware Version: v1.0**

**Status**: ✅ **Working** - First stable release with full nice!view display support

### **Hardware Support:**
- **Keyboard**: Corne (split 42-key keyboard)
- **Controllers**: nice!nano v2 (nRF52840)
- **Displays**: nice!view (128x32 e-paper display)
- **Layout**: 6-column Corne with thumb keys

### **Display Features:**
- ✅ **Layer Status** - Shows custom layer names ("Engram", "Symbols", "Numbers")
- ✅ **Battery Status** - Real-time battery level indicator
- ✅ **Output Status** - Bluetooth profile connection status
- ✅ **Settings Wheel** - Top-right corner for configuration access

## 🎨 **About the Engrammer Layout**

The **Engrammer layout** is a phonetic keyboard layout designed to improve typing efficiency by placing frequently used letter combinations closer together. It's based on the principle that certain letter pairs appear together more often in English.

### **Key Benefits:**

#### **1. Natural Inward Hand Roll**
One of the most significant advantages of Engrammer is that it promotes a **natural inward hand roll** motion. Unlike QWERTY which forces outward reaching, Engrammer places common letter combinations in positions that encourage your hands to naturally roll inward toward the center of the keyboard, reducing strain and improving comfort during extended typing sessions.

#### **2. Phonetic Grouping**
Letters that commonly appear together are placed near each other:
- **TH**: T and H are adjacent on the middle row
- **ST**: S and T are adjacent on the middle row  
- **HE**: H and E are close together
- **AN**: A and N are adjacent on the middle row
- **IN**: I and N are close together

#### **3. Reduced Finger Travel**
Common letter combinations require minimal finger movement, reducing fatigue and increasing typing speed over time.

#### **4. Optimized for English**
Designed specifically for English language patterns and frequency analysis.

### **Layout Philosophy:**
- **Top row**: ESC B Y O U ' ; L D W V Z
- **Middle row**: ` C I E A , . H T S N Q  
- **Bottom row**: TAB G X J K - / R M F P SHIFT

### **Ergonomic Advantages:**
- **Inward hand motion** reduces wrist strain
- **Balanced hand usage** prevents overuse of one hand
- **Natural finger positioning** for common letter combinations
- **Reduced reaching** for frequently used letters

## 📋 **Layer System**

### **Current Layers:**
1. **Engram (Layer 0)**: Main Engrammer layout
2. **Symbols (Layer 1)**: Symbols and punctuation
3. **Numbers (Layer 2)**: Numbers, navigation, Bluetooth, and media controls

### **Layer Activation:**
- `&mo 1` = **Momentary** - Hold to activate layer 1
- `&mo 2` = **Momentary** - Hold to activate layer 2

## 🎨 **Current Layout Configuration**

### **Engram Layer (Default)**
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

### **Symbols Layer**
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

### **Numbers Layer**
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

## 🔧 **Configuration Details**

### **Hardware Configuration:**
- **Board**: nice_nano_v2
- **Shields**: corne_left/right + nice_view_adapter + nice_view
- **Display**: nice!view e-paper display (128x32)

### **Performance Settings:**
- **Debouncing**: Fast (1ms press, 10ms release)
- **Bluetooth Range**: Extended (+8dBm)
- **ZMK Studio**: Enabled for real-time keymap updates

### **Display Configuration:**
- **Layer Status**: Custom names ("Engram", "Symbols", "Numbers")
- **Battery Status**: Real-time indicator
- **Output Status**: Bluetooth profile connection
- **Settings Wheel**: Top-right corner

## 🚀 **Installation & Usage**

### **Building Firmware:**
1. **Fork this repository** to your GitHub account
2. **GitHub Actions** will automatically build firmware
3. **Download** from the Actions tab
4. **Flash** to your nice!nano v2 controllers

### **Flashing Instructions:**
1. **Enter bootloader** by double-tapping reset button
2. **Drag and drop** .uf2 file to NICENANO drive
3. **Wait for completion** - drive will disappear and reboot
4. **Power on** keyboard using side switch

### **Split Keyboard Behavior:**
- **Left Side (Central)**: Full display with all widgets
- **Right Side (Peripheral)**: Limited display (battery + basic status)

## 🎯 **Customization**

### **Layer Names:**
Edit `config/corne.keymap` to change layer labels:
```c
default_layer {
    label = "Your Layer Name";
    // ... bindings
};
```

### **Keymap Changes:**
- **Add layers**: Uncomment and modify the function_layer example
- **Modify keys**: Change individual key bindings
- **Add behaviors**: Use mod-taps, layer-taps, combos

### **Performance Tuning:**
Edit `config/corne.conf` for:
- **Debouncing speed**
- **Bluetooth range**
- **Power management**

## 📚 **Resources**

### **ZMK Documentation:**
- [ZMK Main Documentation](https://zmk.dev/docs)
- [Configuration Reference](https://zmk.dev/docs/config)
- [Key Code Reference](https://zmk.dev/docs/codes)

### **Community:**
- [ZMK Discord](https://zmk.dev/community/discord/invite)
- [ZMK Studio](https://zmk.studio/) - Visual keymap editor

### **Hardware:**
- [Corne Keyboard](https://github.com/foostan/corne)
- [nice!nano v2](https://nicekeyboards.com/nice-nano)
- [nice!view](https://nicekeyboards.com/nice-view)

## 💡 **Tips for Engrammer Layout**

### **Learning Curve:**
- **Start slow** - Engrammer requires retraining from QWERTY
- **Practice common words** - Focus on TH, ST, HE, AN, IN combinations
- **Use typing tests** - Gradually increase speed as you adapt
- **Be patient** - Full adaptation takes 2-4 weeks of regular use

### **Ergonomic Benefits:**
- **Reduced wrist strain** from inward hand motion
- **Better finger positioning** for common letter pairs
- **More balanced hand usage** prevents overuse
- **Natural typing flow** once adapted

## 🔄 **Version History**

### **v1.0** - First Working Release
- ✅ **Working nice!view display** with all widgets
- ✅ **Custom layer names** ("Engram", "Symbols", "Numbers")
- ✅ **Engrammer layout** with mod-tap on H key
- ✅ **Optimized performance** settings
- ✅ **ZMK Studio support** for real-time updates

---

*This configuration provides a comfortable, efficient typing experience with the Engrammer layout's natural inward hand roll motion, reducing strain and improving long-term ergonomics.* 