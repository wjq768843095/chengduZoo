var a = getApp();

Page({
    data: {
        addressList: []
    },
    selectTap: function(t) {
        var s = this;
        console.log(t);
        var e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.addressno;
        console.log(o), console.log(e), wx.request({
            url: a.globalData.baseurl + "setDefaultAddress" + a.globalData.params,
            method: "post",
            data: {
                application_no: 422480,
                openId: a.globalData.openId,
                addressNo: o
            },
            success: function(a) {
                console.log(a);
                var t = s, e = a.data.obj;
                200 == a.statusCode ? t.setData({
                    addressList: e
                }) : s.setData({
                    orderList: null
                }), wx.showModal({
                    title: "提示",
                    content: "默认地址设置成功",
                    showCancel: !1
                });
            }
        });
    },
    addAddess: function() {
        wx.navigateTo({
            url: "/pages/address-add/index"
        });
    },
    editAddess: function(a) {
        console.log(a), wx.navigateTo({
            url: "/pages/address-add/index?addressno=" + a.currentTarget.dataset.addressno + "& consigneename=" + a.currentTarget.dataset.consigneename + "& consigneephone=" + a.currentTarget.dataset.consigneephone + "& detailaddress=" + a.currentTarget.dataset.detailaddress
        });
    },
    onLoad: function() {
        var t = this, s = a.globalData.baseurl + "listAddress" + a.globalData.params;
        console.log(s), wx.request({
            url: s,
            method: "post",
            data: {
                application_no: "422480",
                openId: a.globalData.openId
            },
            success: function(a) {
                console.log(a), console.log(a.statusCode), console.log(a.data.obj);
                var s = a.data.obj;
                wx.hideLoading(), 200 == a.statusCode ? t.setData({
                    addressList: s
                }) : this.setData({
                    orderList: null
                });
            }
        });
    },
    onShow: function() {
        this.initShippingAddress();
    },
    initShippingAddress: function() {
        var t = this, s = a.globalData.baseurl + "listAddress" + a.globalData.params;
        wx.request({
            url: s,
            method: "post",
            data: {
                application_no: "422480",
                openId: a.globalData.openId
            },
            success: function(a) {
                console.log(a), console.log(a.statusCode), 200 == a.statusCode ? t.setData({
                    addressList: a.data.obj
                }) : 700 == a.data.code && t.setData({
                    addressList: null
                });
            }
        });
    },
    navigateBackFunc: function() {
        var a = getCurrentPages();
        a[a.length - 1];
        a[a.length - 2].setData({
            object: this.data.addressList
        });
    }
});