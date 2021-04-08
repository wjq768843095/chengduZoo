module.exports = {
    errImgFun: function(e, t) {
        var r = e.target.dataset.errImg, a = {};
        a[r] = "/image/default.png", console.log(e.detail.errMsg + "--------" + r), t.setData(a);
    }
};