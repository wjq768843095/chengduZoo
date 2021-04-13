var e = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        iconList: [ {
            icon: "/images/ticket.png",
            color: "red",
            badge: 120,
            name: "门票预订"
        }, {
            icon: "/images/restaurant.png",
            color: "red",
            badge: 120,
            name: "餐饮预订"
        }, {
            icon: "/images/hotel.png",
            color: "orange",
            badge: 1,
            name: "酒店预订"
        }, {
            icon: "/images/characteristic.png",
            color: "yellow",
            badge: 0,
            name: "主题商品"
        } ],
        gridCol: 4,
        starCount: 0,
        orderList: [ {
            icon: "/images/order.png",
            index: "0",
            color: "red",
            badge: 120,
            name: "全部订单"
        }, {
            icon: "/images/pay.png",
            index: "1",
            color: "red",
            badge: 120,
            name: "待支付"
        }, {
            icon: "/images/use.png",
            index: "2",
            color: "orange",
            badge: 1,
            name: "待使用"
        }, {
            icon: "/images/refound.png",
            index: "3",
            color: "yellow",
            badge: 0,
            name: "退款/售后"
        } ],
        forksCount: 0,
        visitTotal: 0,
        nickName: "",
        spotName: "",
      englishName: "MINJIANG ZIPINGPU",
        nickUrl: "/images/headPortrait.png",
        languageType: ""
    },
    attached: function() {
        this.getSpotName(), this.getuser(), this.setLanguage();
    },
    methods: {
        setLanguage: function() {
            "english" == e.globalData.language ? this.setData({
                orderList: [ {
                    icon: "/images/order.png",
                    index: "0",
                    color: "red",
                    badge: 120,
                    name: "All orders"
                }, {
                    icon: "/images/pay.png",
                    index: "1",
                    color: "red",
                    badge: 120,
                    name: "Unpaid"
                }, {
                    icon: "/images/use.png",
                    index: "2",
                    color: "orange",
                    badge: 1,
                    name: "To be used"
                }, {
                    icon: "/images/refound.png",
                    index: "3",
                    color: "yellow",
                    badge: 0,
                    name: "Refund"
                } ],
                languageType: "english"
            }) : this.setData({
                orderList: [ {
                    icon: "/images/order.png",
                    index: "0",
                    color: "red",
                    badge: 120,
                    name: "全部订单"
                }, {
                    icon: "/images/pay.png",
                    index: "1",
                    color: "red",
                    badge: 120,
                    name: "待支付"
                }, {
                    icon: "/images/use.png",
                    index: "2",
                    color: "orange",
                    badge: 1,
                    name: "待使用"
                }, {
                    icon: "/images/refound.png",
                    index: "3",
                    color: "yellow",
                    badge: 0,
                    name: "退款/售后"
                } ],
                languageType: ""
            });
        },
        getuser: function() {
            var a = e.globalData.baseurl + "getUserInfo" + ("?applicationNo=" + e.globalData.applicationNo);
            wx.showLoading({
                title: "数据加载中",
                mask: !0
            });
            var o = wx.getStorageSync("openId"), n = e.globalData.openId;
            "" != o ? this.getNickName(a, o) : this.getNickName(a, n);
        },
        getSpotName: function() {
            var a = this, o = e.globalData.baseurl + "getSpot" + ("?applicationNo=" + e.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: o,
                data: {
                    spotNo: "13056873"
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(e) {
                    wx.hideLoading(), "success" == e.data.status ? a.setData({
                        spotName: e.data.data.spotName
                    }) : wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "查询数据失败，请稍后重试...",
                        confirmText: "确认"
                    });
                },
                fail: function(e) {
                    wx.hideLoading(), wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "网络异常，请检查网络...",
                        confirmText: "确认"
                    });
                }
            });
        },
        getNickName: function(e, a) {
            var o = this;
            wx.request({
                url: e,
                data: {
                    openId: a
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(e) {
                    wx.hideLoading(), "success" == e.data.status ? o.setData({
                        nickName: e.data.data.nickName
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
        }
    }
});