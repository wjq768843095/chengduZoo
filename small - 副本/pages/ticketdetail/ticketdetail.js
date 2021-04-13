var t = getApp(), o = require("../../utils/util.js"), e = require("../../utils/md5.js");

require("../../utils/wxParse/wxParse.js"), require("../../dist/index");

Page({
    data: {
        mobileNum: "",
        islike: "none",
        good: [ {
            goodName: "成都大熊猫繁育研究基地成人票",
            totalPrice: "58",
            dates: "",
            tips: [ {
                one: "限购买所填日期当日17：00前使用"
            }, {
                two: "此票如果消费者未使用，可在使用当日23：59前退款"
            } ],
            goodtickts: [ {
                Identification: "ticket",
                id: "000251",
                price: "58",
                tnumber: "1",
                min: "1",
                max: "10"
            } ],
            goodtools: []
        } ]
    },
    onLoad: function(a) {
        console.log(a);
        a.id;
        var s = a.productNo, n = this, i = (e.hexMD5(t.globalData.baseurl), t.globalData.baseurl + "getProduct" + t.globalData.params);
        wx.request({
            url: i,
            method: "post",
            data: {
                application_no: "422480",
                productNo: s
            },
            success: function(t) {
                console.log(t), console.log(t.data.obj), console.log(t.data.obj.productName), console.log(t.data.obj.useExplain), 
                console.log(t.data.obj.statusCode), console.log(t.data.obj.productType), console.log(t.data.obj.payPrice), 
                404 == t.statusCode ? wx.showModal({
                    title: "提示",
                    content: "请下拉页面刷新",
                    showCancel: !1
                }) : n.setData({
                    "good[0].goodName": t.data.obj.productName,
                    "good[0].goodtickts[0].id": t.data.obj.productNo,
                    "good[0].goodtickts[0].price": t.data.obj.payPrice,
                    totalPrice: t.data.obj.payPrice
                });
            }
        }), n.setData({
            goodtickts: [ {
                Identification: "ticket",
                id: "000251",
                price: "58",
                tnumber: "1",
                min: "1",
                max: "10"
            } ]
        }), wx.getStorage({
            key: "wxStyle",
            success: function(t) {
                n.setData({
                    bgColor: t.data.bgColor
                });
            }
        }), n.getorderDetail();
        var l = o.formatDay(new Date()), r = o.startime(new Date()), d = o.endtime(new Date()), c = getApp().globalData.openId;
        console.log(c), this.setData({
            starttime: r,
            endtime: d,
            dates: l,
            "good[0].dates": l,
            openId: c
        });
    },
    bindDateChange: function(t) {
        console.log(t.detail.value), this.setData({
            dates: t.detail.value,
            "good[0].dates": t.detail.value
        });
    },
    onShareAppMessage: function() {
        return {
            title: "成都大熊猫繁育研究基地微信购票",
            path: "/pages/index/index"
        };
    },
    onShow: function() {
        this.getorderDetail();
    },
    totalPrice: function() {
        var t = this.data.good[0].goodtickts, o = this.data.good[0].goodtools;
        console.log(t), console.log(o);
        var e = 0, a = 0, s = 0;
        if (o.length > 0) for (var n = 0, i = 0; t.length, i < o.length; n++, i++) {
            console.log(t.length), console.log(o.length);
            t[n], o[i];
            a += parseFloat(o[i].price) * o[i].tnumber, console.log(a), s = parseFloat(t[0].price) * t[0].tnumber, 
            console.log(s), e = (a + s).toFixed(2), console.log(e);
        } else for (n = 0; n < t.length; n++) {
            t[n];
            s = parseFloat(t[0].price) * t[0].tnumber, console.log(s), e = s.toFixed(2), console.log(e);
        }
        return console.log(e), this.setData({
            totalPrice: e,
            "good[0].totalPrice": e
        }), e;
    },
    setGoodsList: function(t) {
        this.setData({
            good: [ {
                goodName: "成都大熊猫繁育研究基地成人票",
                totalPrice: t,
                tips: [ {
                    one: "限购买所填日期当日17：00前使用"
                }, {
                    two: "此票如果消费者未使用，可在使用当日23：59前退款"
                } ],
                goodtickts: [ {
                    price: "58",
                    tnumber: "1"
                } ],
                goodtools: [ {
                    id: "quantity2",
                    name: "大熊猫玩具",
                    price: "100",
                    tnumber: "0",
                    picture: "../../assets/images/guzhang.png",
                    min: "1",
                    max: "10",
                    active: "true"
                }, {
                    id: "000214",
                    name: "小熊猫玩具",
                    price: "60",
                    tnumber: "0",
                    picture: "../../assets/images/guzhang1.png",
                    min: "1",
                    max: "10",
                    active: "true"
                } ]
            } ]
        });
    },
    plusBtnTap: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.index, e = t.currentTarget.dataset.max;
        console.log(o);
        var a = this.data.good[0].goodtickts;
        if (console.log(a), "" !== o && null != o) {
            var s = a[o].tnumber;
            console.log(s), a[parseInt(o)].tnumber < e && (a[o].tnumber = parseInt(s) + 1, this.setData({
                "good[0].goodtickts": a
            }));
        }
        this.totalPrice();
    },
    minusBtnTap: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.index, e = t.currentTarget.dataset.min, a = this.data.good[0].goodtickts;
        if ("" !== o && null != o) if (a[parseInt(o)].tnumber > e) {
            var s = a[o].tnumber;
            a[o].tnumber = parseInt(s) - 1, this.setData({
                "good[0].goodtickts": a
            });
        } else a[o].tnumber = 1, this.setData({
            "good[0].goodtickts": a
        });
        this.totalPrice();
    },
    toolplusBtnTap: function(t) {
        var o = t.currentTarget.dataset.index, e = t.currentTarget.dataset.max;
        console.log(o);
        var a = this.data.good[0].goodtools;
        if (console.log(a), "" !== o && null != o) {
            var s = a[o].tnumber;
            console.log(s), a[parseInt(o)].tnumber < e && (a[o].tnumber = parseInt(s) + 1, this.setData({
                "good[0].goodtools": a,
                tooliszan: ""
            }));
        }
        this.totalPrice();
    },
    toolminusBtnTap: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.index, e = t.currentTarget.dataset.min, a = this.data.good[0].goodtools;
        if (console.log(a), "" !== o && null != o) if (a[parseInt(o)].tnumber > e) {
            var s = a[o].tnumber;
            a[o].tnumber = parseInt(s) - 1, this.setData({
                "good[0].goodtools": a
            });
        } else this.setData({
            "good[0].goodtools": a
        });
        this.totalPrice();
    },
    checkPhoneNum: function(t) {
        var o = t.detail.value;
        this.setData({
            mobileNum: o,
            "data.mobileNum": o
        }), this.validatemobile();
    },
    validatemobile: function(t) {
        var o = this.data.mobileNum;
        if (console.log(o), 0 == o.length) return wx.showToast({
            title: "请输入手机号！",
            icon: "success",
            duration: 1e3
        }), !1;
        if (11 != o.length) return wx.showToast({
            title: "手机号长度有误！",
            icon: "success",
            duration: 1e3
        }), !1;
        return !!/^0?(13[0-9]|15[012356789]|18[012346789]|14[57]|17[678]|170[059]|14[57]|166|19[89])[0-9]{8}$/.test(o) || (wx.showToast({
            title: "手机号有误！",
            icon: "success",
            duration: 1e3
        }), !1);
    },
    getorderDetail: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: "https://api.piaogo.cn/wx/orderDetail.do",
            data: {
                outTradeNo: this.data.outTradeNo
            },
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                wx.hideLoading(), null == o.data ? wx.showModal({
                    title: "通知",
                    showCancel: !1,
                    content: "查询数据失败，请稍后重试...",
                    confirmText: "确认"
                }) : t.setData({
                    orderDetail: o.data
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
    submitBtn: function() {
        var o = this.data;
        console.log(o);
        var e = this.validatemobile();
        if (this.validatemobile(), 1 == e) {
            var a = o.good[0].goodtickts, s = o.mobileNum, n = o.dates;
            console.log(a), console.log(s), console.log(n);
            for (var i = new Array(), l = 0; l < a.length; l++) {
                var r = a[l], d = {
                    productNo: r.id,
                    productNum: r.tnumber,
                    payPrice: r.payPrice,
                    sort: "1",
                    status: "1",
                    checked: "true",
                    mobileNum: s,
                    datas: n
                };
                i.push(d), console.log(d), console.log(i);
            }
            var c = t.globalData.baseurl + "saveOrUpdateCarts" + t.globalData.params;
            wx.request({
                url: c,
                method: "post",
                data: {
                    application_no: "422480",
                    openId: t.globalData.openId,
                    data: i
                },
                success: function(t) {
                    console.log(t), 404 == t.statusCode ? wx.showModal({
                        title: "提示",
                        content: "网络故障",
                        showCancel: !1
                    }) : wx.switchTab({
                        url: "../cart/index"
                    });
                }
            });
        }
    },
    onPullDownRefresh: function() {
        this.getorderDetail(), wx.stopPullDownRefresh();
    }
});