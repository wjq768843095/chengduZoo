var a = getApp();

Page({
    data: {
        PageCur: "main",
        languageType: ""
    },
    onLoad: function(t) {
        a.watch(this.watchBack), this.isEmptyObject(t) ? this.setData({
            PageCur: "main"
        }) : this.setData({
            PageCur: t.pageCur
        });
    },
    watchBack: function(a) {
        this.setData({
            languageType: a
        });
    },
    isEmptyObject: function(a) {
        for (var t in a) return !1;
        return !0;
    },
    NavChange: function(a) {
        this.setData({
            PageCur: a.currentTarget.dataset.cur
        });
    }
});