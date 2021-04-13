module.exports = {
    showZanToast: function(t, a) {
        var s = this, e = this.data.zanToast || {};
        clearTimeout(e.timer), e = {
            show: !0,
            title: t
        }, this.setData({
            zanToast: e
        });
        var o = setTimeout(function() {
            s.clearZanToast();
        }, a || 3e3);
        this.setData({
            "zanToast.timer": o
        });
    },
    clearZanToast: function() {
        var t = this.data.zanToast || {};
        clearTimeout(t.timer), this.setData({
            "zanToast.show": !1
        });
    }
};