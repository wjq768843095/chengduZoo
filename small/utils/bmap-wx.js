var t = require("../@babel/runtime/helpers/interopRequireDefault"), a = t(require("../@babel/runtime/helpers/classCallCheck")), e = t(require("../@babel/runtime/helpers/createClass")), i = function() {
    function t(e) {
        (0, a.default)(this, t), this.ak = e.ak;
    }
    return (0, e.default)(t, [ {
        key: "getWXLocation",
        value: function(t, a, e, i) {
            t = t || "gcj02", a = a || function() {}, e = e || function() {}, i = i || function() {}, 
            wx.getLocation({
                type: t,
                success: a,
                fail: e,
                complete: i
            });
        }
    }, {
        key: "search",
        value: function(t) {
            var a = {
                query: (t = t || {}).query || "生活服务$美食&酒店",
                scope: t.scope || 1,
                filter: t.filter || "",
                coord_type: t.coord_type || 2,
                page_size: t.page_size || 10,
                page_num: t.page_num || 0,
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || "",
                radius: t.radius || 2e3,
                ret_coordtype: "gcj02ll"
            }, e = {
                iconPath: t.iconPath,
                iconTapPath: t.iconTapPath,
                width: t.width,
                height: t.height,
                alpha: t.alpha || 1,
                success: t.success || function() {},
                fail: t.fail || function() {}
            }, i = function(t) {
                a.location = t.latitude + "," + t.longitude, wx.request({
                    url: "https://api.map.baidu.com/place/v2/search",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "GET",
                    success: function(t) {
                        var a = t.data;
                        if (0 === a.status) {
                            var i = a.results, s = {};
                            s.originalData = a, s.wxMarkerData = [];
                            for (var o = 0; o < i.length; o++) s.wxMarkerData[o] = {
                                id: o,
                                latitude: i[o].location.lat,
                                longitude: i[o].location.lng,
                                title: i[o].name,
                                iconPath: e.iconPath,
                                iconTapPath: e.iconTapPath,
                                address: i[o].address,
                                telephone: i[o].telephone,
                                alpha: e.alpha,
                                width: e.width,
                                height: e.height
                            };
                            e.success(s);
                        } else e.fail({
                            errMsg: a.message,
                            statusCode: a.status
                        });
                    },
                    fail: function(t) {
                        e.fail(t);
                    }
                });
            };
            if (t.location) {
                var s = t.location.split(",")[1];
                i({
                    errMsg: "input location",
                    latitude: t.location.split(",")[0],
                    longitude: s
                });
            } else this.getWXLocation("gcj02", i, function(t) {
                e.fail(t);
            }, function(t) {});
        }
    }, {
        key: "suggestion",
        value: function(t) {
            var a = {
                query: (t = t || {}).query || "",
                region: t.region || "全国",
                city_limit: t.city_limit || !1,
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || "",
                ret_coordtype: "gcj02ll"
            }, e = {
                success: t.success || function() {},
                fail: t.fail || function() {}
            };
            wx.request({
                url: "https://api.map.baidu.com/place/v2/suggestion",
                data: a,
                header: {
                    "content-type": "application/json"
                },
                method: "GET",
                success: function(t) {
                    var a = t.data;
                    0 === a.status ? e.success(a) : e.fail({
                        errMsg: a.message,
                        statusCode: a.status
                    });
                },
                fail: function(t) {
                    e.fail(t);
                }
            });
        }
    }, {
        key: "regeocoding",
        value: function(t) {
            var a = {
                coordtype: (t = t || {}).coordtype || "gcj02ll",
                pois: t.pois || 0,
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || "",
                ret_coordtype: "gcj02ll"
            }, e = {
                iconPath: t.iconPath,
                iconTapPath: t.iconTapPath,
                width: t.width,
                height: t.height,
                alpha: t.alpha || 1,
                success: t.success || function() {},
                fail: t.fail || function() {}
            }, i = function(t) {
                a.location = t.latitude + "," + t.longitude, wx.request({
                    url: "https://api.map.baidu.com/geocoder/v2/",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "GET",
                    success: function(a) {
                        var i = a.data;
                        if (0 === i.status) {
                            var s = i.result, o = {};
                            o.originalData = i, o.wxMarkerData = [], o.wxMarkerData[0] = {
                                id: 0,
                                latitude: t.latitude,
                                longitude: t.longitude,
                                address: s.formatted_address,
                                iconPath: e.iconPath,
                                iconTapPath: e.iconTapPath,
                                desc: s.sematic_description,
                                business: s.business,
                                alpha: e.alpha,
                                width: e.width,
                                height: e.height
                            }, e.success(o);
                        } else e.fail({
                            errMsg: i.message,
                            statusCode: i.status
                        });
                    },
                    fail: function(t) {
                        e.fail(t);
                    }
                });
            };
            if (t.location) {
                var s = t.location.split(",")[1];
                i({
                    errMsg: "input location",
                    latitude: t.location.split(",")[0],
                    longitude: s
                });
            } else this.getWXLocation("gcj02", i, function(t) {
                e.fail(t);
            }, function(t) {});
        }
    }, {
        key: "weather",
        value: function(t) {
            var a = {
                coord_type: (t = t || {}).coord_type || "gcj02",
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || ""
            }, e = {
                success: t.success || function() {},
                fail: t.fail || function() {}
            }, i = function(t) {
                a.location = t.longitude + "," + t.latitude, wx.request({
                    url: "https://api.map.baidu.com/telematics/v3/weather",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "GET",
                    success: function(t) {
                        var a = t.data;
                        if (0 === a.error && "success" === a.status) {
                            var i = a.results, s = {};
                            s.originalData = a, s.currentWeather = [], s.currentWeather[0] = {
                                currentCity: i[0].currentCity,
                                pm25: i[0].pm25,
                                date: i[0].weather_data[0].date,
                                temperature: i[0].weather_data[0].temperature,
                                weatherDesc: i[0].weather_data[0].weather,
                                wind: i[0].weather_data[0].wind
                            }, e.success(s);
                        } else e.fail({
                            errMsg: a.message,
                            statusCode: a.status
                        });
                    },
                    fail: function(t) {
                        e.fail(t);
                    }
                });
            };
            if (t.location) {
                var s = t.location.split(",")[0];
                i({
                    errMsg: "input location",
                    latitude: t.location.split(",")[1],
                    longitude: s
                });
            } else this.getWXLocation("gcj02", i, function(t) {
                e.fail(t);
            }, function(t) {});
        }
    } ]), t;
}();

module.exports.BMapWX = i;