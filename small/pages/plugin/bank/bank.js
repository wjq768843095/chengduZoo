var a = getApp(), t = require("../../../utils/qqmap-wx-jssdk.js");

Page({
    data: {
        widHeight: "",
        markers: [],
        oprnId: "",
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        Custom: a.globalData.Custom,
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        TabCur: 1,
        scrollLeft: 0
    },
    onLoad: function() {
        this.setData({
            widHeight: a.globalData.windowHeight,
            oprnId: a.globalData.openId
        }), new t({
            key: "LJSBZ-AUIE3-QRW3L-YCMDD-VLKCT-MGB6J"
        });
    }
});