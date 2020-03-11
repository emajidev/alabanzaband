import color from "color";

    import { Platform, Dimensions, PixelRatio } from "react-native";
    
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;
    const platform = Platform.OS;
    const platformStyle = "material";
    const isIphoneX =
      platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
    
    export default {"platformStyle":"material","platform":"ios","androidRipple":true,"androidRippleColor":"rgba(256, 256, 256, 0.3)","androidRippleColorDark":"rgba(0, 0, 0, 0.15)","btnUppercaseAndroidText":true,"badgeBg":"rgba(255,45,98,1)","badgeColor":"#fff","badgePadding":3,"btnFontFamily":"System","btnDisabledBg":"#b5b5b5","buttonPadding":6,"btnPrimaryBg":"rgba(126,211,33,1)","btnPrimaryColor":"#fff","btnInfoBg":"#3F57D3","btnInfoColor":"#fff","btnSuccessBg":"rgba(126,211,33,1)","btnSuccessColor":"#fff","btnDangerBg":"rgba(250,45,115,1)","btnDangerColor":"#fff","btnWarningBg":"#f0ad4e","btnWarningColor":"#fff","btnTextSize":16.5,"btnTextSizeLarge":22.5,"btnTextSizeSmall":12,"borderRadiusLarge":57,"iconSizeLarge":45,"iconSizeSmall":18,"cardDefaultBg":"#fff","cardBorderColor":"#ccc","CheckboxRadius":100,"CheckboxBorderWidth":1,"CheckboxPaddingLeft":2,"CheckboxPaddingBottom":0,"CheckboxIconSize":18,"CheckboxFontSize":21,"DefaultFontSize":17,"checkboxBgColor":"#039BE5","checkboxSize":20,"checkboxTickColor":"rgba(255,255,255,1)","brandPrimary":"rgba(245,166,35,1)","brandInfo":"#3F57D3","brandSuccess":"#5cb85c","brandDanger":"#d9534f","brandWarning":"#f0ad4e","brandDark":"#000","brandLight":"#f4f4f4","fontFamily":"System","fontSizeBase":15,"fontSizeH1":27,"fontSizeH2":24,"fontSizeH3":21,"footerHeight":55,"footerDefaultBg":"rgba(255,255,255,1)","footerPaddingBottom":0,"tabBarTextColor":"rgba(155,155,155,1)","tabBarTextSize":14,"activeTab":"#fff","sTabBarActiveTextColor":"#007aff","tabBarActiveTextColor":"rgba(126,211,33,1)","tabActiveBgColor":"rgba(255,255,255,1)","toolbarBtnColor":"rgba(126,211,33,1)","toolbarDefaultBg":"rgba(255,255,255,1)","toolbarHeight":64,"toolbarSearchIconSize":20,"toolbarInputColor":"#fff","searchBarHeight":30,"searchBarInputHeight":30,"toolbarBtnTextColor":"#fff","toolbarDefaultBorder":"rgba(255,255,255,1)","iosStatusbar":"dark-content","statusBarColor":"rgba(255,255,255,1)","darkenHeader":"#F0F0F0","iconFamily":"Ionicons","iconFontSize":30,"iconHeaderSize":29,"inputFontSize":17,"inputBorderColor":"#D9D5DC","inputSuccessBorderColor":"rgba(80,227,194,1)","inputErrorBorderColor":"rgba(237,47,129,1)","inputHeightBase":50,"inputColor":"#000","inputColorPlaceholder":"#575757","btnLineHeight":19,"lineHeightH1":32,"lineHeightH2":27,"lineHeightH3":22,"lineHeight":20,"listBg":"#FFF","listBorderColor":"rgba(80,227,194,1)","listDividerBg":"#f4f4f4","listBtnUnderlayColor":"#DDD","listItemPadding":10,"listNoteColor":"#808080","listNoteSize":13,"defaultProgressColor":"#E4202D","inverseProgressColor":"#1A191B","radioBtnSize":25,"radioSelectedColorAndroid":"rgba(245,166,35,1)","radioBtnLineHeight":29,"segmentBackgroundColor":"rgba(126,211,33,1)","segmentActiveBackgroundColor":"#fff","segmentTextColor":"#fff","segmentActiveTextColor":"rgba(126,211,33,1)","segmentBorderColor":"rgba(126,211,33,1)","segmentBorderColorMain":"#3F51B5","defaultSpinnerColor":"rgba(126,211,33,1)","inverseSpinnerColor":"#1A191B","tabDefaultBg":"#3F51B5","topTabBarTextColor":"#b3c7f9","topTabBarActiveTextColor":"#fff","topTabBarBorderColor":"#fff","topTabBarActiveBorderColor":"#fff","tabBgColor":"#F8F8F8","tabFontSize":15,"textColor":"rgba(155,155,155,1)","inverseTextColor":"#fff","noteFontSize":14,"defaultTextColor":"#000","titleFontfamily":"System","titleFontSize":19,"subTitleFontSize":14,"subtitleColor":"#FFF","titleFontColor":"rgba(126,211,33,1)","borderRadiusBase":0,"borderWidth":1,"contentPadding":10,"dropdownLinkColor":"#414142","inputLineHeight":24,"deviceWidth":1440,"deviceHeight":821,"isIphoneX":false,"inputGroupRoundedBorderRadius":30}