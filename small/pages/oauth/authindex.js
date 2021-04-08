Page({
    data: {
        PageCur: "main"
    },
    onLoad: function(a) {
        this.isEmptyObject(a) ? this.setData({
            PageCur: "main"
        }) : this.setData({
            PageCur: a.pageCur
        });
    },
    gotoPage: function() {
        wx.navigateToMiniProgram({
            appId: " wx88736d7d39e2eda6",
            path: "pages/oauth/authindex",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(a) {
                console.log(a);
            }
        });
    }
});