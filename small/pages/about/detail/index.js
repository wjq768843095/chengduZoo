var t = getApp(), a = require("../../../utils/util");

Page({
    data: {
        outTradeNo: null,
        orderDetail: [],
        imgUrl: "",
        spotName: "",
        englishName: "Jinsha Site Museum",
        languageType: "",
        healthState: "",
        isCheckHealthCode: "",
        updateTime: "",
        healthColor: "",
        healthCode: "",
        titleShow: !1,
        codeMaskShow: !1
    },
    onLoad: function(t) {
        var a = t.orderNo;
        this.getorderDetail(a), this.getSpotName(), this.setLanguage(), this.getApliction(a);
    },
    setLanguage: function() {
        var a = t.globalData.language;
        console.log(a), "english" == a ? this.setData({
            languageType: "english"
        }) : this.setData({
            languageType: ""
        });
    },
    getApliction: function(a) {
        var e = this, o = t.globalData.baseurl + "getApp" + ("?applicationNo=" + t.globalData.applicationNo);
        wx.request({
            url: o,
            data: {
                applicationNo: "260810"
            },
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(t) {
                console.log(t.data.data), wx.hideLoading(), "success" == t.data.status && e.setData({
                    isCheckHealthCode: t.data.data.isCheckHealthCode || "0"
                });
            }
        });
    },
    _getHealthCodeByOrderNo: function(e, o, s) {
        var i = this.data.orderDetail, l = this, n = t.globalData.baseurl + "getHealthCode" + ("?applicationNo=" + t.globalData.applicationNo);
        wx.request({
            url: n,
            data: {
                name: e,
                idCardNo: o
            },
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(t) {
                if (console.log(t.data.data), wx.hideLoading(), "success" == t.data.status) {
                    if ("200" == t.data.data.code) {
                        var e = t.data.data.code, o = t.data.data.data.healthCode, n = "10" == o ? "高风险" : "01" == o ? "中风险" : "正常", d = "10" == o ? "#E51C1F" : "01" == o ? "#D0B208" : "green";
                        "200" == e && (i.orders[s].titleShow = !0, i.orders[s].codeMaskShow = "10" == o), 
                        i.orders[s].healthColor = d, i.orders[s].healthState = n, i.orders[s].updateTime = a.GetDateStr(0).fulldate + " " + a.GetDateStr(0).fullTime, 
                        i.orders[s].healthCode = o, l.setData({
                            orderDetail: i
                        });
                    }
                    if ("404" == t.data.data.code || "405" == t.data.data.code) {
                        i.orders[s].titleShow = !0, i.orders[s].codeMaskShow = !1;
                        i.orders[s].healthColor = "#D0B208", i.orders[s].healthState = "未知", i.orders[s].updateTime = a.GetDateStr(0).fulldate + " " + a.GetDateStr(0).fullTime, 
                        l.setData({
                            orderDetail: i
                        });
                    }
                }
            }
        });
    },
    save: function(t) {
        console.log(t), console.log(t.currentTarget.dataset.imgurl), this.setData({
            imgUrl: t.currentTarget.dataset.imgurl
        });
        var a = this;
        wx.showToast({
            icon: "loading",
            title: "正在保存图片",
            duration: 1e3
        }), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? a.savePhoto() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        a.savePhoto();
                    },
                    fail: function() {
                        wx.openSetting({
                            success: function() {
                                wx.authorize({
                                    scope: "scope.writePhotosAlbum",
                                    success: function() {
                                        a.savePhoto();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getSpotName: function() {
        var a = this, e = t.globalData.baseurl + "getSpot" + ("?applicationNo=" + t.globalData.applicationNo);
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e,
            data: {
                spotNo: "13056873"
            },
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(t) {
                wx.hideLoading(), "success" == t.data.status ? a.setData({
                    spotName: t.data.data.spotName
                }) : wx.showModal({
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
    savePhoto: function() {
        wx.downloadFile({
            url: this.data.imgUrl,
            success: function(t) {
                console.log(t), console.log(t.tempFilePath), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    getorderDetail: function(a) {
        console.log(a);
        var e = this, o = (this.data.isCheckHealthCode, t.globalData.baseurl + "getOrder" + ("?applicationNo=" + t.globalData.applicationNo));
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: o,
            data: {
                openId: t.globalData.openId,
                orderNo: a
            },
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(t) {
                console.log(t.data.data), wx.hideLoading();
                var a = t.data.data.orders;
                "success" == t.data.status ? (e.setData({
                    orderDetail: t.data.data
                }), a.forEach(function(t, a) {
                    e._getHealthCodeByOrderNo(t.customerName, t.customerUserIdSha256, a);
                })) : wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "查询数据失败，请稍后重试...",
                    confirmText: "确认"
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "网络异常，请检查网络...",
                    confirmText: "确认"
                });
            }
        });
    }
});