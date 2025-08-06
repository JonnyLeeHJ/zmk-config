# ZMK Display Widgets Guide for Corne Keyboard

## 📚 **Official Documentation Sources**

### **Primary ZMK Documentation:**
- **ZMK Main Documentation**: https://zmk.dev/docs
- **Display Features**: https://zmk.dev/docs/features/display
- **Configuration Reference**: https://zmk.dev/docs/config
- **Community Discord**: https://zmk.dev/community/discord/invite

### **GitHub Resources:**
- **ZMK Main Repository**: https://github.com/zmkfirmware/zmk
- **Community Configs**: https://github.com/zmkfirmware/zmk-config
- **ZMK Studio**: https://zmk.studio/ (Visual configurator)

## 🎯 **Corne Keyboard Specific Information**

### **Hardware Details:**
- **Controller**: nice!nano v2 (nRF52840)
- **Display**: 128x32 OLED (SSD1306)
- **Connection**: I2C
- **Power**: 3.3V

### **Supported Display Widgets:**
1. **Layer Status** - Shows current layer
2. **Battery Status** - Shows battery level
3. **Output Status** - Shows connection (USB/Bluetooth)
4. **WPM Status** - Shows typing speed (⚠️ **Known Issues**)

## 🔧 **Step-by-Step Configuration**

### **Step 1: Basic Display Enable**
```bash
# In config/corne.conf
CONFIG_ZMK_DISPLAY=y
```

### **Step 2: Enable Individual Widgets**
```bash
# Layer Status Widget
CONFIG_ZMK_WIDGET_LAYER_STATUS=y

# Battery Status Widget  
CONFIG_ZMK_WIDGET_BATTERY_STATUS=y

# Output Status Widget
CONFIG_ZMK_WIDGET_OUTPUT_STATUS=y

# WPM Status Widget (⚠️ May cause build issues)
# CONFIG_ZMK_WIDGET_WPM_STATUS=y
```

### **Step 3: Required Dependencies**
```bash
# Bluetooth (required for battery/connection status)
CONFIG_ZMK_BLE=y

# USB (required for output status)
CONFIG_ZMK_USB=y

# Display Settings
CONFIG_ZMK_DISPLAY_BLANK_ON_IDLE=n
CONFIG_ZMK_DISPLAY_BLANK_IDLE_TIMEOUT=0
```

## ⚠️ **Known Issues & Solutions**

### **WPM Widget Problems:**
- **Issue**: WPM widget causes build failures on Corne right half
- **Solution**: Avoid using `CONFIG_ZMK_WIDGET_WPM_STATUS=y`
- **Alternative**: Use external WPM tracking tools

### **Build Failures:**
- **Common Cause**: Missing dependencies
- **Solution**: Always include `CONFIG_ZMK_BLE=y` and `CONFIG_ZMK_USB=y`
- **Debug**: Check GitHub Actions logs for specific error messages

### **Display Not Working:**
- **Check**: I2C connections on PCB
- **Verify**: OLED display is properly soldered
- **Test**: Try minimal configuration first

## 📋 **Working Configuration Examples**

### **Minimal Working Config (Recommended)**
```bash
# config/corne.conf
CONFIG_ZMK_DISPLAY=y
CONFIG_ZMK_WIDGET_LAYER_STATUS=y
CONFIG_ZMK_WIDGET_BATTERY_STATUS=y
CONFIG_ZMK_BLE=y
CONFIG_ZMK_USB=y
```

### **Full Feature Config (Test Carefully)**
```bash
# config/corne.conf
CONFIG_ZMK_DISPLAY=y
CONFIG_ZMK_WIDGET_LAYER_STATUS=y
CONFIG_ZMK_WIDGET_BATTERY_STATUS=y
CONFIG_ZMK_WIDGET_OUTPUT_STATUS=y
CONFIG_ZMK_BLE=y
CONFIG_ZMK_USB=y
CONFIG_ZMK_DISPLAY_BLANK_ON_IDLE=n
CONFIG_ZMK_DISPLAY_BLANK_IDLE_TIMEOUT=0
```

## 🔍 **Troubleshooting Steps**

### **1. Build Fails:**
```bash
# Check your config/corne.conf syntax
# Ensure all required dependencies are enabled
# Try minimal configuration first
```

### **2. Display Shows Nothing:**
```bash
# Verify OLED is connected properly
# Check I2C connections
# Try reflashing firmware
```

### **3. Widgets Missing:**
```bash
# Ensure widget configs are enabled
# Check for typos in configuration
# Verify dependencies are met
```

## 🚀 **Testing Process**

### **1. Start Minimal:**
```bash
# Enable only basic display
CONFIG_ZMK_DISPLAY=y
CONFIG_ZMK_WIDGET_LAYER_STATUS=y
```

### **2. Add Incrementally:**
```bash
# Add one widget at a time
# Test build after each addition
# Flash and verify functionality
```

### **3. Full Configuration:**
```bash
# Once minimal works, add remaining widgets
# Test thoroughly before committing
```

## 📖 **Additional Resources**

### **Community Examples:**
- Search GitHub for "zmk corne config" for working examples
- Check ZMK Discord for community help
- Look at other users' zmk-config repositories

### **Advanced Configuration:**
- **Custom Widgets**: https://zmk.dev/docs/development/display-widgets
- **Display Customization**: https://zmk.dev/docs/features/display
- **Performance Tuning**: Check ZMK documentation for optimization tips

### **Hardware Support:**
- **Corne PCB**: Check PCB design files for I2C pin assignments
- **nice!nano v2**: Verify controller compatibility
- **OLED Display**: Ensure SSD1306 compatibility

## 🎯 **Recommended Approach**

1. **Start with minimal configuration**
2. **Test build and flash**
3. **Add widgets one by one**
4. **Avoid WPM widget initially**
5. **Use community examples as reference**

## 💡 **Pro Tips**

- **Always test builds locally** before pushing to GitHub
- **Keep backups** of working configurations
- **Document your changes** for future reference
- **Join ZMK Discord** for real-time help
- **Use ZMK Studio** for visual configuration testing

---

*This guide is based on official ZMK documentation and community experiences. For the most up-to-date information, always refer to the official ZMK documentation.* 