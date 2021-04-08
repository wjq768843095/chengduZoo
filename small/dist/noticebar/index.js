var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), e = {
    initZanNoticeBarScroll: function(t) {
        this.zanNoticeBarNode = this.zanNoticeBarNode || {}, this.zanNoticeBarNode["".concat(t)] = {
            width: void 0,
            wrapWidth: void 0,
            animation: null,
            resetAnimation: null
        };
        var e = this.zanNoticeBarNode["".concat(t)], i = this;
        wx.createSelectorQuery().select("#".concat(t, "__content")).boundingClientRect(function(n) {
            n.width ? (e.width = n.width, wx.createSelectorQuery().select("#".concat(t, "__content-wrap")).boundingClientRect(function(n) {
                if (e.wrapWidth = n.width, e.wrapWidth < e.width) {
                    var a = e.width / 40 * 1e3;
                    e.animation = wx.createAnimation({
                        duration: a,
                        timingFunction: "linear"
                    }), e.resetAnimation = wx.createAnimation({
                        duration: 0,
                        timingFunction: "linear"
                    }), i.scrollZanNoticeBar(t, a);
                }
            }).exec()) : console.warn("页面缺少 noticebar 元素");
        }).exec();
    },
    scrollZanNoticeBar: function(e, i) {
        var n = this.zanNoticeBarNode["".concat(e)], a = n.resetAnimation.translateX(n.wrapWidth).step();
        this.setData((0, t.default)({}, "".concat(e, ".animationData"), a.export()));
        var o = n.animation.translateX(40 * -i / 1e3).step(), r = this;
        setTimeout(function() {
            r.setData((0, t.default)({}, "".concat(e, ".animationData"), o.export()));
        }, 100), setTimeout(function() {
            r.scrollZanNoticeBar(e, i);
        }, i);
    }
};

module.exports = e;