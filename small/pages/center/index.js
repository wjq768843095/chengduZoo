var o = getApp();

Page({
    data: {
        classifySeleted: "",
        myimg: ""
    },
    onLoad: function(a) {
        console.log(a);
        var e = this, n = o.globalData.baseurl + "getUserInfo?applicationNo=" + o.globalData.applicationNo, t = o.globalData.openId;
        console.log(t), wx.request({
            url: n,
            method: "post",
            data: {
                application_no: "422480",
                openId: "oeC7r0AfV8gVhvZSlls7g-RKQZQA",
                encryptedData: "",
                iv: ""
            },
            success: function(o) {
                console.log(o), e.setData({});
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    cart: function() {
        wx.switchTab({
            url: "../cart/index"
        });
    },
    feedback: function() {
        wx.navigateTo({
            url: "./feedback/feedback"
        });
    },
    toaddress: function() {
        wx.navigateTo({
            url: "./select-address/select-address"
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    }
});