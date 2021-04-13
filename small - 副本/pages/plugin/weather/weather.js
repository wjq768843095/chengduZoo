require("../../../@babel/runtime/helpers/Arrayincludes");

getApp();

var e = require("../../../utils/bmap-wx.js");

Page({
    data: {
        currentWeather: {},
        inputCity: "",
        topNum: 0,
        scroll_height: 0,
        weatherVisual: !1
    },
    onLoad: function() {
        var e = wx.getSystemInfoSync().windowHeight, t = wx.getSystemInfoSync().windowWidth;
        this.setData({
            scroll_height: 750 * e / t
        }), this.getWeather("成都市");
    },
    getWeather: function(t) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            mask: !0
        });
        var n = this, a = new e.BMapWX({
            ak: "1XXOBoGGDri4asUjcGg6IuSejX2MxQBc"
        }), i = function(e) {
            console.log(e), wx.hideLoading(), "No result available" == e.statusCode && wx.showModal({
                title: "提示",
                content: "输入的城市名称有误，请重新输入",
                confirmText: "好的",
                confirmColor: "#ACB4E3",
                showCancel: !1
            });
        }, r = function(e) {
            if (console.log(e), console.log(e.currentWeather), e.currentWeather == []) return n.setData({
                weatherVisual: !0
            }), !1;
            n.setData({
                weatherVisual: !1
            }), wx.hideLoading();
            var t = n.getDate().substring(5), a = e.currentWeather[0].date.substring(0, 2), i = e.currentWeather[0], r = n.getIconURL(i.weatherDesc), s = i.date.indexOf("时"), g = i.date.indexOf(")");
            i.date = i.date.substring(s + 2, g - 1), i.temperature = n.tempSwitch(i.temperature);
            var o = i.pm25, c = "", u = "";
            o <= 50 ? (c = "优", u = "#00ded1") : o > 50 && o <= 100 ? (c = "良", u = "#82c91e") : o > 100 && o <= 150 ? (c = "轻度污染", 
            u = "#e3b600") : o > 150 && o <= 200 ? (c = "中度污染", u = "#ef8700") : o > 200 && o <= 300 ? (c = "重度污染", 
            u = "#ef6500") : (c = "严重污染", u = "#8B0000");
            var d = new Array(5);
            if (console.log(d), d = e.originalData.results[0].index, console.log(d), "" == d) var l = {
                zs: "暂无数据"
            }, h = {
                zs: "暂无数据"
            }, w = {
                zs: "暂无数据"
            }, m = {
                zs: "暂无数据"
            }; else d[0], l = d[1], h = d[2], w = d[3], m = d[4];
            var p = new Array(4);
            p = e.originalData.results[0].weather_data;
            for (var f = new Array(3), D = 0; D < 3; D++) f[D] = p[D + 1], f[D].date = n.getForecatDate(D, f[D].date), 
            f[D].iconURL = n.getIconURL(f[D].weather), f[D].temperature = n.tempSwitch(f[D].temperature), 
            f[D].windDeriction = n.getWindDeriction(f[D].wind), f[D].windSpeed = n.getWindSpeed(f[D].wind);
            n.setData({
                iconURL: r,
                currentWeather: i,
                currentDate: t,
                weekday: a,
                airClass: c,
                airColor: u,
                forecast: f,
                ganmao: h,
                yundong: w,
                ziwaixian: m,
                xiche: l
            });
        };
        t ? a.weather({
            cityName: t,
            fail: i,
            success: r
        }) : a.weather({
            cityName: "",
            fail: i,
            success: r
        });
    },
    getDate: function() {
        var e = new Date(), t = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate();
        return n >= 1 && n <= 9 && (n = "0" + n), a >= 0 && a <= 9 && (a = "0" + a), t + "年" + n + "月" + a + "日";
    },
    getForecatDate: function(e, t) {
        return this.getNextDate(e + 1) + " " + t;
    },
    getNextDate: function(e) {
        var t = new Date(), n = new Date(t.getTime() + 864e5 * e), a = n.getMonth() + 1, i = n.getDate();
        return a >= 1 && a <= 9 && (a = "0" + a), i >= 0 && i <= 9 && (i = "0" + i), a + "月" + i + "日";
    },
    tempSwitch: function(e) {
        var t = e.indexOf("~"), n = e.length;
        return e.substring(t + 2, n - 1) + " ~ " + e.substring(0, t - 1) + "℃";
    },
    getIconURL: function(e) {
        var t = String(e);
        return t.includes("转") && (t = t.substring(0, t.indexOf("转"))), t.includes("晴") ? "../../../images/sunny.png" : t.includes("多云") ? "../../../images/partly_cloudy.png" : t.includes("阴") ? "../../../images/cloudy.png" : t.includes("阵雨") ? "../../../images/shower.png" : t.includes("雷阵雨") ? "../../../images/stormy_rain.png" : t.includes("雨夹雪") ? "../../../images/snow_rain.png" : t.includes("小雨") ? "../../../images/light_rain.png" : t.includes("中雨") ? "../../../images/moderate_rain.png" : t.includes("大雨") ? "../../../images/heavy_rain.png" : t.includes("暴雨") ? "../../../images/rainstorm.png" : t.includes("阵雪") ? "../../../images/shower_snow.png" : t.includes("小雪") ? "../../../images/light_snow.png" : t.includes("中雪") ? "../../../images/moderate_snow.png" : t.includes("大雪") ? "../../../images/heavy_snow.png" : t.includes("暴雪") ? "../../../images/snow_storm.png" : t.includes("雾") ? "../../../images/fog.png" : t.includes("霾") ? "../../../images/haze.png" : t.includes("沙尘暴") ? "../../images/dust_storm.png" : "../../../images/unknown.png";
    },
    getWindDeriction: function(e) {
        var t = this.seperateWind(e);
        return -1 == t ? e : e.substring(0, t);
    },
    getWindSpeed: function(e) {
        var t = this.seperateWind(e);
        return -1 == t ? "" : e.substring(t, e.length);
    },
    seperateWind: function(e) {
        var t = "";
        if (/[0-9]/.test(e)) {
            var n = new RegExp("[0-9]+");
            t = e.match(n).index;
        } else if (e.search("微风")) {
            t = e.match("微风").index;
        } else t = -1;
        return t;
    }
});