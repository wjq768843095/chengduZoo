require("utils/md5.js");

App({
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.globalData.StatusBar = a.statusBarHeight, t.globalData.windowHeight = a.windowHeight;
                var e = wx.getMenuButtonBoundingClientRect();
                t.globalData.Custom = e, t.globalData.CustomBar = e.bottom + e.top - a.statusBarHeight;
            }
        });
        var a = wx.getStorageSync("openId");
        "" != a ? (this.globalData.openId = a, this.getOpenId(), this.getAdvertisementState()) : (this.getOpenId(), 
        this.getAdvertisementState());
    },
    getOpenId: function() {
        var t = this, a = this;
        wx.login({
            success: function(e) {
                var o = e.code, n = t.globalData.baseurl + "getSmallWechatOpenId" + ("?applicationNo=" + t.globalData.applicationNo);
                console.log(n), o && (console.log(o), wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), wx.request({
                    url: n,
                    method: "post",
                    header: {
                        "content-type": "application/json;charset=utf-8"
                    },
                    data: {
                        application_no: t.globalData.applicationNo,
                        code: o
                    },
                    success: function(t) {
                        if (console.log(t), "success" == t.data.status) {
                            var e = t.data.data.openid;
                          wx.setStorage({
                            key: "intro",
                            data: t.data.data.intro
                          })
                            a.globalData.openId = e, a.globalData.loadModal = !1, wx.setStorage({
                                key: "openId",
                                data: t.data.data.openid
                            }), setTimeout(function() {
                                wx.hideLoading();
                            }, 2e3);
                        } else wx.hideLoading(), wx.showModal({
                            title: "用户未授权",
                            content: "确定要重新授权？",
                            showCancel: !0,
                            cancelText: "否",
                            cancelColor: "#69696d",
                            confirmText: "是",
                            confirmColor: "skyblue",
                            success: function(t) {
                                t.cancel || a.getOpenId();
                            },
                            fail: function(t) {},
                            complete: function(t) {}
                        });
                    },
                    fail: function(t) {
                        console.log(t), wx.hideLoading(), "request:fail" == t.errMsg && wx.showModal({
                            title: "通知",
                            showCancel: !1,
                            content: "网络异常，请检查网络...",
                            confirmText: "确认"
                        });
                    }
                }));
            }
        });
    },
    getAdvertisementState: function() {
        var t = this, a = this.globalData.baseurl + "advertisementListText" + ("?applicationNo=" + this.globalData.applicationNo);
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a,
            data: {},
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(a) {
                wx.hideLoading(), "success" == a.data.status ? 0 == a.data.data[0].isPoppingUp || "" == a.data.data[0].isPoppingUp ? t.globalData.modalMainName = "" : t.globalData.modalMainName = "Image" : wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "查询数据失败，请稍后重试...",
                    confirmText: "确认"
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "网络异常，请检查网络...",
                    confirmText: "确认"
                });
            }
        });
    },
    getDateByNum: function(t) {
        var a = new Date();
        return a.setDate(a.getDate() + t), a.getFullYear() + "-" + (a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) + "-" + (a.getDate() < 10 ? "0" + a.getDate() : a.getDate());
    },
    watch: function(t) {
        var a = this.globalData;
        Object.defineProperty(a, "language", {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this._name = a, t(a);
            },
            get: function() {
                return this._name;
            }
        });
    },
    globalData: {
        openId: "",
        baseurl: "https://lvyou.loveu.life/index.php/api/index/",
        params: "?applicationNo=260810",
        loadModal: !0,
        systemInfo: "",
        modalMainName: "",
        language: "",
        spotNo: "13056873",
        applicationNo: "260810"
    }
});