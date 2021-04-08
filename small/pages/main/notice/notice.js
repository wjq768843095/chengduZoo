require("../../../utils/util.js");

var t = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        ticketType: [],
        freeRule: [],
        noticeRule: [],
        luggage: "",
        spotName: "",
        publicNotice: "",
        reminderNotice: "",
        refund_instruction: "",
        invoice_description: ""
    },
    attached: function() {
        this.onLaunch(), this.getSpotName();
    },
    methods: {
        onLaunch: function() {
            var e = this, a = t.globalData.baseurl + "listSpotProducts" + ("?applicationNo=" + t.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: a,
                data: {
                    spotNo: t.globalData.spotNo,
                    openId: t.globalData.openId
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    if (console.log(t.data.data), wx.hideLoading(), "success" == t.data.status) if ("" != t.data.data) {
                        for (var a = t.data.data.ticket_rule, i = [], o = [], n = [], c = [], s = [], l = 0; l < a.length; l++) {
                            if (-1 != a[l].ticketRuleType.indexOf("免")) {
                                var u = {
                                    rule: a[l].ticketRuleContent,
                                    type: a[l].ticketRuleType
                                };
                                i.push(u);
                            }
                            if (-1 != a[l].ticketRuleType.indexOf("半")) {
                                var d = {
                                    rule: a[l].ticketRuleContent,
                                    type: a[l].ticketRuleType
                                };
                                o.push(d);
                            }
                            if (-1 != a[l].ticketRuleType.indexOf("折")) {
                                var p = {
                                    rule: a[l].ticketRuleContent,
                                    type: a[l].ticketRuleType
                                };
                                n.push(p);
                            }
                            if (-1 != a[l].ticketRuleType.indexOf("团体")) {
                                var r = {
                                    rule: a[l].ticketRuleContent,
                                    type: a[l].ticketRuleType
                                };
                                c.push(r);
                            }
                        }
                        for (var h = 0; h < t.data.data.cost_description.length; h++) {
                            var f = {
                                ticketTab: t.data.data.cost_description[h].ticketTab,
                                ticketTabContent: t.data.data.cost_description[h].ticketTabContent
                            };
                            s.push(f);
                        }
                        e.setData({
                            ticketType: t.data.data,
                            halfRule: o,
                            freeRule: i,
                            discountRule: n,
                            groupRule: c,
                            instructions: t.data.data.instructions,
                            refund_instruction: t.data.data.refund_instruction[0].ticketTabContent,
                            invoice_description: t.data.data.invoice_description[0].ticketTabContent,
                            noticeRule: s,
                            luggage: t.data.data.baggage_deposit[0].ticketTabContent,
                            publicNotice: t.data.data.spot_recommends[0].ticketTabContent,
                            reminderNotice: t.data.data.special_announcement[0].ticketTabContent
                        });
                    } else e.setData({
                        halfRule: "",
                        ticketType: [],
                        freeRule: [],
                        noticeRule: [],
                        discountRule: "",
                        groupRule: "",
                        instructions: "",
                        refund_instruction: "",
                        luggage: "",
                        publicNotice: ""
                    }); else wx.showModal({
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
            var e = this, a = t.globalData.baseurl + "getSpot" + ("?applicationNo=" + t.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: a,
                data: {
                    spotNo: t.globalData.spotNo
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    wx.hideLoading(), "success" == t.data.status ? e.setData({
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
        }
    }
});