function n(n, a) {
    var e = n.currentTarget.dataset, i = e.componentId, l = e.disabled, u = +e.quantity;
    if (l) return null;
    t.call(this, i, u + a);
}

function t(n, t) {
    var a = {
        componentId: n,
        quantity: t = +t
    };
    console.info("[zan:quantity:change]", a), this.handleZanQuantityChange ? this.handleZanQuantityChange(a) : console.warn("页面缺少 handleZanQuantityChange 回调函数");
}

var a = {
    _handleZanQuantityMinus: function(t) {
        n.call(this, t, -1);
    },
    _handleZanQuantityPlus: function(t) {
        n.call(this, t, 1);
    },
    _handleZanQuantityBlur: function(n) {
        var a = this, e = n.currentTarget.dataset, i = e.componentId, l = +e.max, u = +e.min, c = n.detail.value;
        return c ? ((c = +c) > l ? c = l : c < u && (c = u), t.call(this, i, c), "" + c) : (setTimeout(function() {
            t.call(a, i, u);
        }, 16), t.call(this, i, c), "" + c);
    }
};

module.exports = a;