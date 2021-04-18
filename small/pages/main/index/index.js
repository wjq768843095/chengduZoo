var t = require("../../../utils/util.js"), a = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        buttonClicked: !1,
        publicNotice: "",
        publicPicture: "",
        loadModal: !0,
        banner: "",
        ticketType: [],
        totalPrice: "0.00",
        dateCur: "0",
        starttime: "",

      day1: "",
      day2: "",
      day3: "",
        tomorrowtime: "",
        afterTomorrow: "",
        threeDays: "",
        moretime: "更多日期",
        dates: "",
        mobileNum: "",
        customerName: "",
        encryptionMobileNum: "",
        email: "",
        timeDetermine: "false",
        endDate: "",
        spotName: "",
      englishName: "MINJIANG ZIPINGPU",
        scrollTop: 0,
        listLenth: "",
        modalcontent: "",
        modalcontentEn: "",
        admissionTime: "",
        admissionTimeEn: "",
        hasRealName: 1,
        hasAgree: !1,
        spotNo: "",
        customerId: "",
        languageType: "",
        isCheckHealthCode: "",
        isCodeBox: !1,
        healthCode: "",
        myDate: ""
    },
    attached: function() {
        this.onLaunch(), this.getSpotName(), this.getAdvertisementListText(), this.getNotice(), 
        this.getApliction(), this.setLanguage();
    },
    methods: {
      getDateStr: function (AddDayCount){
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();
        return m + "月" + d+"日";
      },
        timeDetermine: function(e) {
            var i = this, o = e, n = a.globalData.systemInfo;
            "" != e && null != e || (o = 30);
            var s = new Date(), l = (s.getTime(), t.GetDateStr(0)), c = a.globalData.baseurl + "getSpot" + ("?applicationNo=" + a.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: c,
                data: {
                    spotNo: a.globalData.spotNo
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(a) {
                    var e = l.fulldate + " 00:00", c = new Date(e), d = new Date(e.replace(/-/g, "/")), r = l.fulldate + " " + a.data.data.closeHours, u = new Date(r), h = new Date(r.replace(/-/g, "/"));
                    if ((c < s || d < s) && 1 == (s < u || s < h)) {
                        var m = t.GetDateStr(0), g = t.GetDateStr(1), p = t.GetDateStr(2), f = t.GetDateStr(3), w = new Date(m.fulldate), D = (w.setMonth(w.getMonth() + 3), 
                        t.GetDateStr(o + 1).iosFulldate), x = t.GetDateStr(o + 1).fulldate, T = "";
                        T = "iOS" == n ? D : x, i.setData({
                            starttime: m,
                            tomorrowtime: g,
                            afterTomorrow: p,
                            threeDays: f,
                            dates: m.fulldate,
                            timeDetermine: "false",
                            endDate: T
                        });
                    } else {
                        var b = t.GetDateStr(1), N = t.GetDateStr(2), y = t.GetDateStr(3), k = t.GetDateStr(4), C = new Date(b.fulldate);
                        C.setMonth(C.getMonth() + 3), D = t.GetDateStr(o + 1).iosFulldate, x = t.GetDateStr(o + 1).fulldate, 
                        T = "";
                        T = "iOS" == n ? D : x, i.setData({
                            starttime: b,
                            tomorrowtime: N,
                            afterTomorrow: y,
                            threeDays: k,
                            dates: b.fulldate,
                            timeDetermine: "true",
                            endDate: T
                        });
                    }
                    wx.hideLoading(), "success" == a.data.status ? i.setData({}) : wx.showModal({
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
        getAdvertisementListText: function() {
            var t = this, e = a.globalData.baseurl + "advertisementListText" + ("?applicationNo=" + a.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: e,
                data: {},
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(a) {
                    console.log(a), wx.hideLoading(), "success" == a.data.status ? t.setData({
                        publicNotice: a.data.data[0].content,
                        publicNoticeEn: a.data.data[0].contentEn,
                        publicPicture: a.data.data[0].imgUrl
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
        onLaunch: function() {
          console.log(11111)
          this.setData({
            day1: this.getDateStr(0),
            day2: this.getDateStr(1),
            day3: this.getDateStr(2),
          })
          console.log(this.getDateStr(-2))
            var t = this, e = a.globalData.baseurl + "listSimpleSpotProducts" + ("?applicationNo=" + a.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: e,
                data: {
                    spotNo: a.globalData.spotNo
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(a) {
                    wx.hideLoading(), "success" == a.data.status ? "" == a.data.data ? t.setData({
                        ticketType: a.data.data,
                        boolean: !0
                    }) : t.setData({
                        ticketType: a.data.data,
                        listLenth: a.data.data.length
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
        getSpotName: function() {
            var t = this, e = a.globalData.baseurl + "getSpot" + ("?applicationNo=" + a.globalData.applicationNo);
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: e,
                data: {
                    spotNo: a.globalData.spotNo
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(a) {
                    wx.hideLoading(), "success" == a.data.status ? t.setData({
                        spotName: a.data.data.spotName,
                        banner: a.data.data.imgUrl,
                        latitude: a.data.data.latitude,
                        longitude: a.data.data.longitude
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
        listhasSelect: function(t) {
            for (var a = this.data.ticketType, e = 0, i = 0; i < a.length; i++) {
                var o = this.data.ticketType[i].num;
                e += parseInt(o);
            }
            return !(e < 1) || (wx.showToast({
                title: "english" == this.data.languageType ? "Select Ticket" : "至少选择一种票"
            }), setTimeout(function() {
                wx.hideToast();
            }, 1e3), !1);
        },
        checkName: function(t) {
            var a = t.detail.value;
            this.setData({
                customerName: a
            }), this.checkNamem();
        },
        checkNamem: function() {
            var t = this.data.customerName;
            return 1 != this.data.hasRealName || 0 != t.length || (wx.showToast({
                title: "english" == this.data.languageType ? "Fill in name" : "姓名不能为空！",
                icon: "success",
                duration: 1e3
            }), !1);
        },
        checkId: function(t) {
            var a = t.detail.value;
            this.setData({
                customerId: a
            }), this.checkIdCard();
        },
        checkIdCard: function() {
            var t = this.data.customerId;
            return !(1 == this.data.hasRealName && !t) || (wx.showToast({
                title: "english" == this.data.languageType ? "passPort Error" : "证件不能为空！",
                icon: "success",
                duration: 1e3
            }), !1);
        },
        checkInPhoneNum: function(t) {
            var a = this.data.mobileNum;
            "" == !t.detail.value && this.setData({
                mobileNum: a,
                encryptionMobileNum: a
            });
        },
        checkPhoneNum: function(t) {
            var a = t.detail.value, e = t.detail.value.length;
            if ("" == a || e < "11") this.setData({
                mobileNum: a,
                encryptionMobileNum: a
            }); else {
                var i = a.substring(0, 3) + "****" + a.substring(7);
                this.setData({
                    mobileNum: a,
                    encryptionMobileNum: i
                });
            }
            this.validatemobile();
        },
        checkEmail: function(t) {
            var a = t.detail.value;
            this.setData({
                email: a
            }), this.validateEmail();
        },
        validateEmail: function(t) {
            var a = this.data.email;
            return "" == a ? (wx.showToast({
                title: "fill in Email",
                icon: "success",
                duration: 1e3
            }), !1) : !!new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(a) || (wx.showToast({
                title: "Error in Email",
                icon: "success",
                duration: 1e3
            }), !1);
        },
        getPhoneNumber: function(t) {
            this.setData({
                buttonClicked: !0
            });
            var e = this, i = a.globalData.baseurl + "getUserPhoneNum" + ("?applicationNo=" + a.globalData.applicationNo);
            "getPhoneNumber:ok" == t.detail.errMsg ? wx.request({
                url: i,
                data: {
                    openId: a.globalData.openId,
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    e.setData({
                        buttonClicked: !1
                    }), wx.hideLoading(), null == t.data.data ? wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "查询数据失败...",
                        confirmText: "确认"
                    }) : e.setData({
                        mobileNum: t.data.data,
                        encryptionMobileNum: t.data.data.substring(0, 3) + "****" + t.data.data.substring(7)
                    });
                },
                fail: function() {
                    e.setData({
                        buttonClicked: !1
                    }), wx.hideLoading(), wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "网络异常，请检查网络...",
                        confirmText: "确认"
                    });
                }
            }) : (e.setData({
                buttonClicked: !1
            }), wx.showModal({
                title: "通知",
                showCancel: !1,
                content: "获取失败！",
                confirmText: "确认"
            }));
        },
        validatemobile: function(t) {
            var a = this.data.mobileNum, e = this.data.listLenth;
            this.data.languageType;
            if (0 == a.length) return wx.showToast({
                title: "english" == this.data.languageType ? "phone Error" : "请输入手机号！",
                icon: "success",
                duration: 1e3
            }), this.setData({
                telHas: !0,
                scrollTop: 260 + 20 * e
            }), !1;
            if (11 != a.length) return wx.showToast({
                title: "english" == this.data.languageType ? "phone Error" : "手机号长度有误！",
                icon: "success",
                duration: 1e3
            }), !1;
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(a) ? (this.setData({
                telHas: !1,
                manual: "获取手机号",
                buttonClicked: !1
            }), !0) : (wx.showToast({
                title: "english" == this.data.languageType ? "phone Error" : "手机号有误！",
                icon: "success",
                duration: 1e3
            }), !1);
        },
        DateChange: function(t) {
            var a = t.currentTarget.dataset.date;
            console.log(a)
            "3" == t.currentTarget.dataset.cur ? this.setData({
                dateCur: t.currentTarget.dataset.cur
            }) : this.setData({
                dateCur: t.currentTarget.dataset.cur,
                moretime: "更多日期",
                dates: a
            });
        },
        bindDateChange: function(t) {
            var a = function(t) {
                return (t = t.toString())[1] ? t : "0" + t;
            }, e = t.detail.value, i = new Date(e).getTime(), o = new Date(i), n = o.getFullYear(), s = o.getMonth() + 1, l = o.getDate(), c = n + "-" + a(s) + "-" + a(l), d = s + "月" + l;
            this.setData({
                moretime: d,
                dates: c
            });
        },
        paybtn: function() {
            var a = this.data.isCheckHealthCode, e = this.data.languageType, i = this.validatemobile(), o = this.listhasSelect(), n = this.checkNamem(), s = this.checkIdCard(), l = this.checkAgree(), c = new Date();
            if (c = t.formatDate(c, "YY-MM-DD hh-mm-ss"), this.setData({
                myDate: c
            }), "english" == e) {
                if (this.validateEmail() && o && n && s && 1 == l) return 0 == a ? (this.generateOrder(), 
                !1) : (this.checkHealthCode(), !1);
                this.checkAgree(), this.validateEmail(), this.checkIdCard(), this.checkNamem(), 
                this.listhasSelect();
            } else {
                if (i && o && n && s && 1 == l) return 0 == a ? (this.generateOrder(), !1) : (this.checkHealthCode(), 
                !1);
                this.checkAgree(), this.validatemobile(), this.checkIdCard(), this.checkNamem(), 
                this.listhasSelect();
            }
        },
        closeBox: function() {
            this.setData({
                isCodeBox: !1
            });
        },
        getPay: function() {
            this.setData({
                isCodeBox: !1
            }), this.generateOrder();
        },
        checkHealthCode: function() {
            var t = this.data, e = t.customerId, i = t.customerName, o = this, n = a.globalData.baseurl + "getHealthCode" + ("?applicationNo=" + a.globalData.applicationNo);
            wx.request({
                url: n,
                data: {
                    name: i,
                    idCardNo: e
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    if (wx.hideLoading(), "success" == t.data.status) if (console.log(t), "200" == t.data.data.code) if ("00" != t.data.data.data.healthCode) {
                        o.setData({
                            isCodeBox: !0
                        });
                        var a = t.data.data.data.healthCode;
                        o.setData({
                            healthCode: a
                        });
                    } else o.generateOrder(); else t.data.data.code ? o.setData({
                        isCodeBox: !0,
                        healthCode: t.data.data.code
                    }) : o.setData({
                        isCodeBox: !0,
                        healthCode: "404"
                    }); else console.log("___________________________________"), o.setData({
                        isCodeBox: !0,
                        healthCode: "404"
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
        setChinesePay: function() {},
        setEnglishPay: function() {},
        generateOrder: function() {
            var t = this;
            wx.showLoading({
                title: "english" == this.data.languageType ? "Building..." : "生成中..."
            });
            var e = a.globalData.baseurl + "createOrder" + ("?applicationNo=" + a.globalData.applicationNo);
            this.setData({
                buttonClicked: !0
            });
            for (var i = [], o = this.data.ticketType, n = 0; n < o.length; n++) if (o[n].num > 0) {
                var s = {
                    productNo: o[n].productNo,
                    nums: o[n].num,
                    payPrice: o[n].payPrice
                };
                i.push(s);
            }
            wx.request({
                url: e,
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: {
                    openId: a.globalData.openId,
                    playTime: t.data.dates,
                    customerPhone: t.data.mobileNum,
                    customerName: t.data.customerName,
                    customerUserId: t.data.customerId,
                    email: t.data.email,
                    data: i
                },
                success: function(a) {
                    if (t.setData({
                        buttonClicked: !1
                    }), "success" == a.data.status) {
                        var e = a.data.data.orderNo;
                        t.createOrder(e);
                    } else wx.showModal({
                        title: "",
                        showCancel: !1,
                        content: a.data.errorMsg,
                        confirmText: "确认"
                    }), wx.hideLoading();
                },
                fail: function(a) {
                    t.setData({
                        buttonClicked: !1
                    }), wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "网络异常，请检查网络...",
                        confirmText: "确认"
                    });
                }
            });
        },
        createOrder: function(t) {
            var e = this, i = a.globalData.baseurl + "wechatPay" + ("?applicationNo=" + a.globalData.applicationNo);
            wx.request({
                url: i,
                data: {
                    orderNo: t,
                    openId: a.globalData.openId
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    wx.hideLoading(), "success" == t.data.status ? wx.requestPayment({
                        timeStamp: t.data.data.timeStamp,
                        nonceStr: t.data.data.nonceStr,
                        package: t.data.data.package,
                        signType: "MD5",
                        paySign: t.data.data.paySign,
                        success: function(t) {
                            e.reSetPage(), e.onLaunch(), "requestPayment:ok" == t.errMsg && wx.navigateTo({
                                url: "/pages/about/about/about?index=0"
                            });
                        },
                        fail: function(t) {
                            "requestPayment:fail cancel" != t.errMsg && "requestPayment:fail" != t.errMsg && wx.showModal({
                                title: "通知",
                                showCancel: !1,
                                content: "调起支付失败，请稍后重试...",
                                confirmText: "确认"
                            }), "requestPayment:fail cancel" == t.errMsg && (e.reSetPage(), e.onLaunch(), wx.navigateTo({
                                url: "/pages/about/about/about?index=0"
                            }));
                        }
                    }) : wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: t.data.errorMsg,
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
        addCount: function(t) {
            var a = t.currentTarget.dataset.index, e = this.data.ticketType, i = this.data.hasRealName, o = e[a].num;
            if (1 == i) for (var n = 0; n < e.length; n++) parseInt(e[n].num);
            (o = parseInt(o) + 1) < 100 ? (e[a].num = o, this.setData({
                ticketType: e
            })) : (e[a].num = 99, this.setData({
                ticketType: e
            })), this.getTotalPrice();
        },
        minusCount: function(t) {
            var a = t.currentTarget.dataset.index, e = this.data.ticketType, i = e[a].num;
            if (i <= 0) return !1;
            i = parseInt(i) - 1, e[a].num = i, this.setData({
                ticketType: e
            }), this.getTotalPrice();
        },
        getTotalPrice: function() {
            for (var t = this.data.ticketType, a = 0, e = 0; e < t.length; e++) t[e].num > 0 && (a += t[e].num * t[e].payPrice);
            this.setData({
                ticketType: t,
                totalPrice: a.toFixed(2)
            });
        },
        gotoLcation: function() {
            var t = Number(this.data.latitude), a = Number(this.data.longitude);
            wx.openLocation({
                latitude: t,
                longitude: a,
                address: this.data.spotName
            });
        },
        openNotice: function(t) {
            var a = t.currentTarget.dataset.index;
            console.log(a), this.setData({
                modalName: t.currentTarget.dataset.target,
              modalcontent: this.data.ticketType[a].productApply,
                modalcontentEn: this.data.ticketType[a].productApplyEn,
              admissionTime: this.data.ticketType[a].admissionTime,
                admissionTimeEn: this.data.ticketType[a].admissionTimeEn
            });
        },
        hideModal: function(t) {
            this.setData({
                modalName: null
            });
        },
        openNoticeMain: function(t) {
            a.globalData.modalMainName = t.currentTarget.dataset.target, this.setData({
                modalMainName: a.globalData.modalMainName
            });
        },
        hideMainModal: function(t) {
            a.globalData.modalMainName = null, this.setData({
                modalMainName: a.globalData.modalMainName
            });
        },
        changeAgree: function(t) {
            1 == t.detail.value.length ? this.setData({
                hasAgree: !0
            }) : this.setData({
                hasAgree: !1
            });
        },
        checkAgree: function() {
            var t = this.data.hasRealName, a = this.data.hasAgree;
            return 1 != t || 0 != a || (wx.showToast({
                title: "english" == this.data.languageType ? "sign Agreement" : "请同意用户协议",
                icon: "success",
                duration: 1e3
            }), !1);
        },
        // getNotice: function() {
        //     var t = this, e = a.globalData.baseurl + "listSpotProducts" + ("?applicationNo=" + a.globalData.applicationNo);
        //     wx.showLoading({
        //         title: "english" == this.data.languageType ? "Loading..." : "加载中...",
        //         mask: !0
        //     }), wx.request({
        //         url: e,
        //         data: {
        //             spotNo: a.globalData.spotNo,
        //             openId: a.globalData.openId
        //         },
        //         method: "POST",
        //         header: {
        //             "content-type": "application/json;charset=utf-8"
        //         },
        //         success: function(a) {
        //             if (wx.hideLoading(), "success" == a.data.status) if ("" != a.data.data) {
        //                 for (var e = a.data.data.ticket_rule, i = [], o = [], n = [], s = [], l = [], c = 0; c < e.length; c++) {
        //                     if (-1 != e[c].ticketRuleType.indexOf("免")) {
        //                         var d = {
        //                             rule: e[c].ticketRuleContent,
        //                             type: e[c].ticketRuleType
        //                         };
        //                         i.push(d);
        //                     }
        //                     if (-1 != e[c].ticketRuleType.indexOf("半")) {
        //                         var r = {
        //                             rule: e[c].ticketRuleContent,
        //                             type: e[c].ticketRuleType
        //                         };
        //                         o.push(r);
        //                     }
        //                     if (-1 != e[c].ticketRuleType.indexOf("折")) {
        //                         var u = {
        //                             rule: e[c].ticketRuleContent,
        //                             type: e[c].ticketRuleType
        //                         };
        //                         n.push(u);
        //                     }
        //                     if (-1 != e[c].ticketRuleType.indexOf("团体")) {
        //                         var h = {
        //                             rule: e[c].ticketRuleContent,
        //                             type: e[c].ticketRuleType
        //                         };
        //                         s.push(h);
        //                     }
        //                 }
        //                 for (var m = 0; m < a.data.data.cost_description.length; m++) {
        //                     var g = {
        //                         ticketTab: a.data.data.cost_description[m].ticketTab,
        //                         ticketTabContent: a.data.data.cost_description[m].ticketTabContent
        //                     };
        //                     l.push(g);
        //                 }
        //                 t.setData({
        //                     admissionTime: a.data.data.instructions
        //                 });
        //             } else t.setData({
        //                 admissionTime: []
        //             }); else wx.showModal({
        //                 title: "通知",
        //                 showCancel: !1,
        //                 content: "查询数据失败，请稍后重试...",
        //                 confirmText: "确认"
        //             });
        //         },
        //         fail: function() {
        //             wx.hideLoading(), wx.showModal({
        //                 title: "通知",
        //                 showCancel: !1,
        //                 content: "网络异常，请检查网络...",
        //                 confirmText: "确认"
        //             });
        //         }
        //     });
        // },
        getApliction: function() {
            var t = this, e = a.globalData.baseurl + "getApp" + ("?applicationNo=" + a.globalData.applicationNo), i = "";
            wx.request({
                url: e,
                data: {
                    applicationNo: "260810"
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(a) {
                    console.log(a.data.data), wx.hideLoading(), "success" == a.data.status ? (i = a.data.data.bookDays, 
                    t.setData({
                        spotNo: a.data.data.spotNo,
                        hasRealName: a.data.data.whetherRealName,
                        isCheckHealthCode: a.data.data.isCheckHealthCode || "0"
                    }), t.timeDetermine(i)) : t.timeDetermine();
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
        switchLanguage: function(t) {
            a.globalData.language = t.target.dataset.language, this.setLanguage();
        },
        setLanguage: function() {
            var t = a.globalData.language, e = this.data.moretime.indexOf("月");
            console.log(e), e > 0 ? this.setData({
                languageType: t
            }) : this.setData({
                languageType: t,
                moretime: "english" == t ? "More" : "更多日期"
            });
        },
        reSetPage: function() {
            this.setData({
                mobileNum: "",
                customerName: "",
                customerId: "",
                encryptionMobileNum: "",
                email: "",
                hasAgree: !1,
                totalPrice: "0.00"
            });
        }
    }
});