getApp();

var e = require("../../../utils/common.js");

Page({
    data: {},
    addFeedback: function(t) {
        var a = this, n = t.detail.value.contact, o = t.detail.value.content;
        if (!n) return e.showTip("联系方式不能为空", "loading"), !1;
        if (!o) return e.showTip("内容不能为空", "loading"), !1;
        if (!/^1[34578]\d{9}$/.test(n)) return e.showTip("手机号码有误", "loading"), !1;
        a.setData({
            loading: !0
        });
        Bmob.Object.extend("_User");
        var i = Bmob.User.current().id, s = new (Bmob.Object.extend("feedback"))(), r = new Bmob.User();
        r.id = i, s.set("contact", n), s.set("content", o), s.set("user", r), s.save(null, {
            success: function(t) {
                e.showModal("保存反馈成功，点击确定返回。", "提示", "", function() {
                    wx.navigateBack();
                }), a.setData({
                    loading: !1
                });
            },
            error: function(t, a) {
                e.showModal("保存反馈失败，请重新发布");
            }
        });
    }
});