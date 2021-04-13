module.exports = {
    _handleZanFieldChange: function(n) {
        var e = n.currentTarget.dataset.componentId;
        n.componentId = e, console.info("[zan:field:change]", n), this.handleZanFieldChange ? this.handleZanFieldChange(n) : console.warn("页面缺少 handleZanFieldChange 回调函数");
    }
};