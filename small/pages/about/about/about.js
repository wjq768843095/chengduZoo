var a = getApp();

Page({
    data: {
        TabCur: 0,
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        ColorList: a.globalData.ColorList,
        tabbar: [ {
            index: 0,
            tabName: "全部订单"
        }, {
            index: 1,
            tabName: "待支付"
        }, {
            index: 2,
            tabName: "待使用"
        }, {
            index: 3,
            tabName: "退款/售后"
        } ],
        orderList: [],
        spotName: "",
        englishName: "MINJIANG ZIPINGPU",
        languageType: ""
    },
    onLoad: function(a) {
        console.log(a);
        var t = a.index;
        this.setData({
            TabCur: a.index
        }), this.getOrderList(t), this.getSpotName(), this.setLanguage();
    },
    setLanguage: function() {
        var t = a.globalData.language;
        console.log(t);
        "english" == t ? this.setData({
            tabbar: [ {
                index: 0,
                tabName: "All orders"
            }, {
                index: 1,
                tabName: "Unpaid"
            }, {
                index: 2,
                tabName: "To be used"
            }, {
                index: 3,
                tabName: "Refund"
            } ],
            languageType: "english"
        }) : this.setData({
            tabbar: [ {
                index: 0,
                tabName: "全部订单"
            }, {
                index: 1,
                tabName: "待支付"
            }, {
                index: 2,
                tabName: "待使用"
            }, {
                index: 3,
                tabName: "退款/售后"
            } ],
            languageType: ""
        });
    },
    getOrderList: function(t) {
        var e = {
            openId: a.globalData.openId
        };
        if ("0" == t && "" == t && (e = {
            openId: a.globalData.openId
        }), "1" == t) e = {
            openId: a.globalData.openId,
            payStatus: "005002"
        };
        if ("2" == t) e = {
            openId: a.globalData.openId,
            payStatus: "005001",
            orderStatus: "004001"
        };
        if ("3" == t) e = {
            openId: a.globalData.openId,
            orderStatus: "004004"
        };
        var o = this, n = a.globalData.baseurl + "listOrders" + ("?applicationNo=" + a.globalData.applicationNo);
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: n,
            data: e,
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(a) {
                console.log(a), console.log(a.data.data), wx.hideLoading(), "success" == a.data.status ? o.setData({
                    orderList: a.data.data
                }) : wx.showModal({
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
    },
    getSpotName: function() {
        var t = this, e = a.globalData.baseurl + "getSpot" + ("?applicationNo=" + a.globalData.applicationNo);
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
            success: function(a) {
                console.log(a), console.log(a.data.data), wx.hideLoading(), "success" == a.data.status ? t.setData({
                    spotName: a.data.data.spotName
                }) : wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "查询数据失败，请稍后重试...",
                    confirmText: "确认"
                });
            },
            fail: function(a) {
                wx.hideLoading(), wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "网络异常，请检查网络...",
                    confirmText: "确认"
                });
            }
        });
    },
    refundOrder: function(t) {
        var e = a.globalData.baseurl + "refundOrder" + ("?applicationNo=" + a.globalData.applicationNo), o = this, n = t.currentTarget.dataset.orderno;
        null != n && wx.showModal({
            title: "退款提示",
            content: "确定要退款？",
            showCancel: !0,
            cancelText: "否",
            cancelColor: "#69696d",
            confirmText: "是",
            confirmColor: "#ff0000",
            success: function(a) {
                a.cancel || o.launchRefundOrder(e, n);
            },
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    launchRefundOrder: function(t, e) {
        var o = this;
        wx.showLoading({
            title: "退款中..."
        }), wx.request({
            url: t,
            data: {
                openId: a.globalData.openId,
                orderNo: e
            },
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            success: function(a) {
                wx.hideLoading(), "success" == a.data.status ? (wx.showToast({
                    title: "退款成功",
                    icon: "success",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.hideToast();
                }, 1500)) : wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: a.data.errorMsg,
                    confirmText: "确认"
                });
            },
            complete: function() {
                o.getOrderList(0), o.setData({
                    TabCur: 0,
                    scrollLeft: -60
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
    },
    continuePay: function(t) {
        console.log(t);
        var e = this, o = a.globalData.baseurl + "wechatPay" + ("?applicationNo=" + a.globalData.applicationNo), n = t.currentTarget.dataset.orderno;
        console.log(n), null != n && (wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: o,
            method: "POST",
            header: {
                "content-type": "application/json;charset=utf-8"
            },
            data: {
                openId: a.globalData.openId,
                orderNo: n
            },
            success: function(a) {
                if (console.log(a), console.log(a.data.status), console.log(a.data.data), wx.hideLoading(), 
                "fail" != a.data.status) {
                    var t = a.data.data;
                    wx.requestPayment({
                        timeStamp: t.timeStamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: "MD5",
                        paySign: t.paySign,
                        success: function(a) {},
                        fail: function(a) {
                            "requestPayment:fail cancel" != a.errMsg && "requestPayment:fail" != a.errMsg && wx.showModal({
                                title: "通知",
                                showCancel: !1,
                                content: "调起支付失败，请稍后重试",
                                confirmText: "确认"
                            });
                        },
                        complete: function() {
                            e.getOrderList(0), e.setData({
                                TabCur: 0,
                                scrollLeft: -60
                            });
                        }
                    });
                } else wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: a.data.errorMsg,
                    confirmText: "确认"
                });
            },
            fail: function(a) {
                console.log(a), wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "网络连接中断",
                    confirmText: "确认"
                });
            }
        }));
    },
    orderDetail: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.orderno;
        wx.navigateTo({
            url: "../../about/detail/index?orderNo=" + t
        });
    },
    tabSelect: function(a) {
        console.log(a.currentTarget.dataset.id), this.setData({
            TabCur: a.currentTarget.dataset.id,
            scrollLeft: 60 * (a.currentTarget.dataset.id - 1)
        }), this.getOrderList(a.currentTarget.dataset.id);
    },
    pageBack: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});