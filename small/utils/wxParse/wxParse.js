var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("showdown.js")), a = e(require("html2json.js"));

function i(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && a.length > 0 && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function r(e) {
    var t = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== t && t.length > 0 && function(e, t, a, i) {
        var r = a.data[i];
        if (0 == r.images.length) return;
        var d = r.images, n = function(e, t, a, i) {
            var r = 0, d = 0, n = 0, s = {};
            return wx.getSystemInfo({
                success: function(o) {
                    var g = a.data[i].view.imagePadding;
                    r = o.windowWidth - 2 * g, o.windowHeight, e > r ? (n = (d = r) * t / e, s.imageWidth = d, 
                    s.imageheight = n) : (s.imageWidth = e, s.imageheight = t);
                }
            }), s;
        }(e.detail.width, e.detail.height, a, i);
        d[t].width = n.imageWidth, d[t].height = n.imageheight, r.images = d;
        var s = {};
        s[i] = r, a.setData(s);
    }(e, a, this, t);
}

module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', s = arguments.length > 3 ? arguments[3] : void 0, o = arguments.length > 4 ? arguments[4] : void 0, g = s, h = {};
        if ("html" == d) h = a.default.html2json(n, e); else if ("md" == d || "markdown" == d) {
            var m = new t.default.Converter(), l = m.makeHtml(n);
            h = a.default.html2json(l, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== o && (h.view.imagePadding = o);
        var v = {};
        v[e] = h, g.setData(v), g.wxParseImgLoad = r, g.wxParseImgTap = i;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], d = i.data, n = null, s = 0; s < a; s++) {
            var o = d[t + s].nodes;
            r.push(o);
        }
        e = e || "wxParseTemArray", (n = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(n);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", i = arguments.length > 2 ? arguments[2] : void 0;
        a.default.emojisInit(e, t, i);
    }
};