var t = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        list: [],
        elements: [ {
            title: "电子导览",
            name: "steps",
            color: "cyan",
            icon: "roundcheckfill"
        }, {
            title: "智慧停车",
            name: "chat",
            color: "green",
            icon: "messagefill"
        }, {
            title: "实时客流",
            name: "timeline",
            color: "orange",
            icon: "timefill"
        } ]
    },
    attached: function() {
        this.getWisdom();
    },
    methods: {
        getWisdom: function() {
            var a = this, e = t.globalData.baseurl + "menuList" + t.globalData.params;
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: e,
                data: {
                    type: "menu_0001"
                },
                method: "POST",
                header: {
                    "content-type": "application/json;charset=utf-8"
                },
                success: function(t) {
                    wx.hideLoading(), "success" == t.data.status ? a.setData({
                        list: t.data.data
                    }) : wx.showModal({
                        title: "通知",
                        showCancel: !1,
                        content: "未能获取列表...",
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
        toChild: function(t) {
            wx.navigateTo({
                url: "/pages/plugin" + t.currentTarget.dataset.url
            });
        }
    }
});