function e(e) {
    var a = e.currentTarget.dataset.componentId, t = e.detail.value;
    n.call(this, a, t);
}

function n(e, n) {
    var a = {
        componentId: e,
        value: n
    };
    console.info("[zan:Select:change]", a), this.handleZanSelectChange ? this.handleZanSelectChange(a) : console.warn("页面缺少 handleZanSelectChange 回调函数");
}

var a = {
    _handleZanSelectChange: function(n) {
        e.call(this, n);
    }
};

module.exports = a;