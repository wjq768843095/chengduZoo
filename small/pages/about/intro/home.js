getApp();
Page({
  data: {
    html: wx.getStorageSync("intro"),
  },
  onLoad: function (n) {
    console.log(111)
   },
  onReady: function () { },
  onShow: function () { 
    console.log(222)

  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
});