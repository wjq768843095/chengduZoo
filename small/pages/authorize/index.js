getApp();

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindGetUserInfo: function(n) {
        console.log(n), n.detail.userInfo && (wx.setStorageSync("userInfo", n.detail.userInfo), 
        this.login());
    },
    login: function() {
        wx.getStorageSync("token");
        wx.login({
            success: function(n) {
                console.log(n), wx.request({
                    url: "http://172.0.0.231:8080/app/clientHelper/getWechatOpenId?sign=d618a8302b7ad6ba202b29c7eed06502&cid=cdusc",
                    method: "POST",
                    data: {
                        application_no: "422480",
                        code: n.code
                    },
                    success: function(n) {
                        if (console.log(n), 200 != n.statusCode) return wx.hideLoading(), void wx.showModal({
                            title: "提示",
                            content: "无法获取用户信息",
                            showCancel: !1
                        });
                        wx.setStorageSync("token", n), wx.switchTab({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    }
});