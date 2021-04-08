var t = require("../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../@babel/runtime/helpers/classCallCheck")), i = t(require("../@babel/runtime/helpers/createClass")), s = 310, o = "请求参数信息有误", r = 600, n = "系统错误", a = 1e3, l = 200, d = "https://apis.map.qq.com/ws/", c = d + "place/v1/suggestion", u = "driving", g = "transit", h = {
    safeAdd: function(t, e) {
        var i = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i;
    },
    bitRotateLeft: function(t, e) {
        return t << e | t >>> 32 - e;
    },
    md5cmn: function(t, e, i, s, o, r) {
        return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(e, t), this.safeAdd(s, r)), o), i);
    },
    md5ff: function(t, e, i, s, o, r, n) {
        return this.md5cmn(e & i | ~e & s, t, e, o, r, n);
    },
    md5gg: function(t, e, i, s, o, r, n) {
        return this.md5cmn(e & s | i & ~s, t, e, o, r, n);
    },
    md5hh: function(t, e, i, s, o, r, n) {
        return this.md5cmn(e ^ i ^ s, t, e, o, r, n);
    },
    md5ii: function(t, e, i, s, o, r, n) {
        return this.md5cmn(i ^ (e | ~s), t, e, o, r, n);
    },
    binlMD5: function(t, e) {
        var i, s, o, r, n;
        t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
        var a = 1732584193, l = -271733879, d = -1732584194, c = 271733878;
        for (i = 0; i < t.length; i += 16) s = a, o = l, r = d, n = c, a = this.md5ff(a, l, d, c, t[i], 7, -680876936), 
        c = this.md5ff(c, a, l, d, t[i + 1], 12, -389564586), d = this.md5ff(d, c, a, l, t[i + 2], 17, 606105819), 
        l = this.md5ff(l, d, c, a, t[i + 3], 22, -1044525330), a = this.md5ff(a, l, d, c, t[i + 4], 7, -176418897), 
        c = this.md5ff(c, a, l, d, t[i + 5], 12, 1200080426), d = this.md5ff(d, c, a, l, t[i + 6], 17, -1473231341), 
        l = this.md5ff(l, d, c, a, t[i + 7], 22, -45705983), a = this.md5ff(a, l, d, c, t[i + 8], 7, 1770035416), 
        c = this.md5ff(c, a, l, d, t[i + 9], 12, -1958414417), d = this.md5ff(d, c, a, l, t[i + 10], 17, -42063), 
        l = this.md5ff(l, d, c, a, t[i + 11], 22, -1990404162), a = this.md5ff(a, l, d, c, t[i + 12], 7, 1804603682), 
        c = this.md5ff(c, a, l, d, t[i + 13], 12, -40341101), d = this.md5ff(d, c, a, l, t[i + 14], 17, -1502002290), 
        l = this.md5ff(l, d, c, a, t[i + 15], 22, 1236535329), a = this.md5gg(a, l, d, c, t[i + 1], 5, -165796510), 
        c = this.md5gg(c, a, l, d, t[i + 6], 9, -1069501632), d = this.md5gg(d, c, a, l, t[i + 11], 14, 643717713), 
        l = this.md5gg(l, d, c, a, t[i], 20, -373897302), a = this.md5gg(a, l, d, c, t[i + 5], 5, -701558691), 
        c = this.md5gg(c, a, l, d, t[i + 10], 9, 38016083), d = this.md5gg(d, c, a, l, t[i + 15], 14, -660478335), 
        l = this.md5gg(l, d, c, a, t[i + 4], 20, -405537848), a = this.md5gg(a, l, d, c, t[i + 9], 5, 568446438), 
        c = this.md5gg(c, a, l, d, t[i + 14], 9, -1019803690), d = this.md5gg(d, c, a, l, t[i + 3], 14, -187363961), 
        l = this.md5gg(l, d, c, a, t[i + 8], 20, 1163531501), a = this.md5gg(a, l, d, c, t[i + 13], 5, -1444681467), 
        c = this.md5gg(c, a, l, d, t[i + 2], 9, -51403784), d = this.md5gg(d, c, a, l, t[i + 7], 14, 1735328473), 
        l = this.md5gg(l, d, c, a, t[i + 12], 20, -1926607734), a = this.md5hh(a, l, d, c, t[i + 5], 4, -378558), 
        c = this.md5hh(c, a, l, d, t[i + 8], 11, -2022574463), d = this.md5hh(d, c, a, l, t[i + 11], 16, 1839030562), 
        l = this.md5hh(l, d, c, a, t[i + 14], 23, -35309556), a = this.md5hh(a, l, d, c, t[i + 1], 4, -1530992060), 
        c = this.md5hh(c, a, l, d, t[i + 4], 11, 1272893353), d = this.md5hh(d, c, a, l, t[i + 7], 16, -155497632), 
        l = this.md5hh(l, d, c, a, t[i + 10], 23, -1094730640), a = this.md5hh(a, l, d, c, t[i + 13], 4, 681279174), 
        c = this.md5hh(c, a, l, d, t[i], 11, -358537222), d = this.md5hh(d, c, a, l, t[i + 3], 16, -722521979), 
        l = this.md5hh(l, d, c, a, t[i + 6], 23, 76029189), a = this.md5hh(a, l, d, c, t[i + 9], 4, -640364487), 
        c = this.md5hh(c, a, l, d, t[i + 12], 11, -421815835), d = this.md5hh(d, c, a, l, t[i + 15], 16, 530742520), 
        l = this.md5hh(l, d, c, a, t[i + 2], 23, -995338651), a = this.md5ii(a, l, d, c, t[i], 6, -198630844), 
        c = this.md5ii(c, a, l, d, t[i + 7], 10, 1126891415), d = this.md5ii(d, c, a, l, t[i + 14], 15, -1416354905), 
        l = this.md5ii(l, d, c, a, t[i + 5], 21, -57434055), a = this.md5ii(a, l, d, c, t[i + 12], 6, 1700485571), 
        c = this.md5ii(c, a, l, d, t[i + 3], 10, -1894986606), d = this.md5ii(d, c, a, l, t[i + 10], 15, -1051523), 
        l = this.md5ii(l, d, c, a, t[i + 1], 21, -2054922799), a = this.md5ii(a, l, d, c, t[i + 8], 6, 1873313359), 
        c = this.md5ii(c, a, l, d, t[i + 15], 10, -30611744), d = this.md5ii(d, c, a, l, t[i + 6], 15, -1560198380), 
        l = this.md5ii(l, d, c, a, t[i + 13], 21, 1309151649), a = this.md5ii(a, l, d, c, t[i + 4], 6, -145523070), 
        c = this.md5ii(c, a, l, d, t[i + 11], 10, -1120210379), d = this.md5ii(d, c, a, l, t[i + 2], 15, 718787259), 
        l = this.md5ii(l, d, c, a, t[i + 9], 21, -343485551), a = this.safeAdd(a, s), l = this.safeAdd(l, o), 
        d = this.safeAdd(d, r), c = this.safeAdd(c, n);
        return [ a, l, d, c ];
    },
    binl2rstr: function(t) {
        var e, i = "", s = 32 * t.length;
        for (e = 0; e < s; e += 8) i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
        return i;
    },
    rstr2binl: function(t) {
        var e, i = [];
        for (i[(t.length >> 2) - 1] = void 0, e = 0; e < i.length; e += 1) i[e] = 0;
        var s = 8 * t.length;
        for (e = 0; e < s; e += 8) i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
        return i;
    },
    rstrMD5: function(t) {
        return this.binl2rstr(this.binlMD5(this.rstr2binl(t), 8 * t.length));
    },
    rstrHMACMD5: function(t, e) {
        var i, s, o = this.rstr2binl(t), r = [], n = [];
        for (r[15] = n[15] = void 0, o.length > 16 && (o = this.binlMD5(o, 8 * t.length)), 
        i = 0; i < 16; i += 1) r[i] = 909522486 ^ o[i], n[i] = 1549556828 ^ o[i];
        return s = this.binlMD5(r.concat(this.rstr2binl(e)), 512 + 8 * e.length), this.binl2rstr(this.binlMD5(n.concat(s), 640));
    },
    rstr2hex: function(t) {
        var e, i, s = "";
        for (i = 0; i < t.length; i += 1) e = t.charCodeAt(i), s += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e);
        return s;
    },
    str2rstrUTF8: function(t) {
        return unescape(encodeURIComponent(t));
    },
    rawMD5: function(t) {
        return this.rstrMD5(this.str2rstrUTF8(t));
    },
    hexMD5: function(t) {
        return this.rstr2hex(this.rawMD5(t));
    },
    rawHMACMD5: function(t, e) {
        return this.rstrHMACMD5(this.str2rstrUTF8(t), str2rstrUTF8(e));
    },
    hexHMACMD5: function(t, e) {
        return this.rstr2hex(this.rawHMACMD5(t, e));
    },
    md5: function(t, e, i) {
        return e ? i ? this.rawHMACMD5(e, t) : this.hexHMACMD5(e, t) : i ? this.rawMD5(t) : this.hexMD5(t);
    },
    getSig: function(t, e, i, s) {
        var o = null, r = [];
        return Object.keys(t).sort().forEach(function(e) {
            r.push(e + "=" + t[e]);
        }), "search" == i && (o = "/ws/place/v1/search?" + r.join("&") + e), "suggest" == i && (o = "/ws/place/v1/suggestion?" + r.join("&") + e), 
        "reverseGeocoder" == i && (o = "/ws/geocoder/v1/?" + r.join("&") + e), "geocoder" == i && (o = "/ws/geocoder/v1/?" + r.join("&") + e), 
        "getCityList" == i && (o = "/ws/district/v1/list?" + r.join("&") + e), "getDistrictByCityId" == i && (o = "/ws/district/v1/getchildren?" + r.join("&") + e), 
        "calculateDistance" == i && (o = "/ws/distance/v1/?" + r.join("&") + e), "direction" == i && (o = "/ws/direction/v1/" + s + "?" + r.join("&") + e), 
        o = this.md5(o);
    },
    location2query: function(t) {
        if ("string" == typeof t) return t;
        for (var e = "", i = 0; i < t.length; i++) {
            var s = t[i];
            e && (e += ";"), s.location && (e = e + s.location.lat + "," + s.location.lng), 
            s.latitude && s.longitude && (e = e + s.latitude + "," + s.longitude);
        }
        return e;
    },
    rad: function(t) {
        return t * Math.PI / 180;
    },
    getEndLocation: function(t) {
        for (var e = t.split(";"), i = [], s = 0; s < e.length; s++) i.push({
            lat: parseFloat(e[s].split(",")[0]),
            lng: parseFloat(e[s].split(",")[1])
        });
        return i;
    },
    getDistance: function(t, e, i, s) {
        var o = this.rad(t), r = this.rad(i), n = o - r, a = this.rad(e) - this.rad(s), l = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(n / 2), 2) + Math.cos(o) * Math.cos(r) * Math.pow(Math.sin(a / 2), 2)));
        return l *= 6378136.49, l = Math.round(1e4 * l) / 1e4, parseFloat(l.toFixed(0));
    },
    getWXLocation: function(t, e, i) {
        wx.getLocation({
            type: "gcj02",
            success: t,
            fail: e,
            complete: i
        });
    },
    getLocationParam: function(t) {
        if ("string" == typeof t) {
            var e = t.split(",");
            t = 2 === e.length ? {
                latitude: t.split(",")[0],
                longitude: t.split(",")[1]
            } : {};
        }
        return t;
    },
    polyfillParam: function(t) {
        t.success = t.success || function() {}, t.fail = t.fail || function() {}, t.complete = t.complete || function() {};
    },
    checkParamKeyEmpty: function(t, e) {
        if (!t[e]) {
            var i = this.buildErrorConfig(s, o + e + "参数格式有误");
            return t.fail(i), t.complete(i), !0;
        }
        return !1;
    },
    checkKeyword: function(t) {
        return !this.checkParamKeyEmpty(t, "keyword");
    },
    checkLocation: function(t) {
        var e = this.getLocationParam(t.location);
        if (!e || !e.latitude || !e.longitude) {
            var i = this.buildErrorConfig(s, o + " location参数格式有误");
            return t.fail(i), t.complete(i), !1;
        }
        return !0;
    },
    buildErrorConfig: function(t, e) {
        return {
            status: t,
            message: e
        };
    },
    handleData: function(t, e, i) {
        if ("search" == i) {
            for (var s = e.data, o = [], r = 0; r < s.length; r++) o.push({
                id: s[r].id || null,
                title: s[r].title || null,
                latitude: s[r].location && s[r].location.lat || null,
                longitude: s[r].location && s[r].location.lng || null,
                address: s[r].address || null,
                category: s[r].category || null,
                tel: s[r].tel || null,
                adcode: s[r].ad_info && s[r].ad_info.adcode || null,
                city: s[r].ad_info && s[r].ad_info.city || null,
                district: s[r].ad_info && s[r].ad_info.district || null,
                province: s[r].ad_info && s[r].ad_info.province || null
            });
            t.success(e, {
                searchResult: s,
                searchSimplify: o
            });
        } else if ("suggest" == i) {
            var n = e.data, a = [];
            for (r = 0; r < n.length; r++) a.push({
                adcode: n[r].adcode || null,
                address: n[r].address || null,
                category: n[r].category || null,
                city: n[r].city || null,
                district: n[r].district || null,
                id: n[r].id || null,
                latitude: n[r].location && n[r].location.lat || null,
                longitude: n[r].location && n[r].location.lng || null,
                province: n[r].province || null,
                title: n[r].title || null,
                type: n[r].type || null
            });
            t.success(e, {
                suggestResult: n,
                suggestSimplify: a
            });
        } else if ("reverseGeocoder" == i) {
            var l = e.result, d = {
                address: l.address || null,
                latitude: l.location && l.location.lat || null,
                longitude: l.location && l.location.lng || null,
                adcode: l.ad_info && l.ad_info.adcode || null,
                city: l.address_component && l.address_component.city || null,
                district: l.address_component && l.address_component.district || null,
                nation: l.address_component && l.address_component.nation || null,
                province: l.address_component && l.address_component.province || null,
                street: l.address_component && l.address_component.street || null,
                street_number: l.address_component && l.address_component.street_number || null,
                recommend: l.formatted_addresses && l.formatted_addresses.recommend || null,
                rough: l.formatted_addresses && l.formatted_addresses.rough || null
            };
            if (l.pois) {
                var c = l.pois, u = [];
                for (r = 0; r < c.length; r++) u.push({
                    id: c[r].id || null,
                    title: c[r].title || null,
                    latitude: c[r].location && c[r].location.lat || null,
                    longitude: c[r].location && c[r].location.lng || null,
                    address: c[r].address || null,
                    category: c[r].category || null,
                    adcode: c[r].ad_info && c[r].ad_info.adcode || null,
                    city: c[r].ad_info && c[r].ad_info.city || null,
                    district: c[r].ad_info && c[r].ad_info.district || null,
                    province: c[r].ad_info && c[r].ad_info.province || null
                });
                t.success(e, {
                    reverseGeocoderResult: l,
                    reverseGeocoderSimplify: d,
                    pois: c,
                    poisSimplify: u
                });
            } else t.success(e, {
                reverseGeocoderResult: l,
                reverseGeocoderSimplify: d
            });
        } else if ("geocoder" == i) {
            var g = e.result, h = {
                title: g.title || null,
                latitude: g.location && g.location.lat || null,
                longitude: g.location && g.location.lng || null,
                adcode: g.ad_info && g.ad_info.adcode || null,
                province: g.address_components && g.address_components.province || null,
                city: g.address_components && g.address_components.city || null,
                district: g.address_components && g.address_components.district || null,
                street: g.address_components && g.address_components.street || null,
                street_number: g.address_components && g.address_components.street_number || null,
                level: g.level || null
            };
            t.success(e, {
                geocoderResult: g,
                geocoderSimplify: h
            });
        } else if ("getCityList" == i) {
            var f = e.result[0], m = e.result[1], p = e.result[2];
            t.success(e, {
                provinceResult: f,
                cityResult: m,
                districtResult: p
            });
        } else if ("getDistrictByCityId" == i) {
            var y = e.result[0];
            t.success(e, y);
        } else if ("calculateDistance" == i) {
            var _ = e.result.elements, v = [];
            for (r = 0; r < _.length; r++) v.push(_[r].distance);
            t.success(e, {
                calculateDistanceResult: _,
                distance: v
            });
        } else if ("direction" == i) {
            var b = e.result.routes;
            t.success(e, b);
        } else t.success(e);
    },
    buildWxRequestConfig: function(t, e, i) {
        var s = this;
        return e.header = {
            "content-type": "application/json"
        }, e.method = "GET", e.success = function(e) {
            var o = e.data;
            0 === o.status ? s.handleData(t, o, i) : t.fail(o);
        }, e.fail = function(e) {
            e.statusCode = a, t.fail(s.buildErrorConfig(a, e.errMsg));
        }, e.complete = function(e) {
            switch (+e.statusCode) {
              case a:
                t.complete(s.buildErrorConfig(a, e.errMsg));
                break;

              case l:
                var i = e.data;
                0 === i.status ? t.complete(i) : t.complete(s.buildErrorConfig(i.status, i.message));
                break;

              default:
                t.complete(s.buildErrorConfig(r, n));
            }
        }, e;
    },
    locationProcess: function(t, e, i, s) {
        var o = this;
        if (i = i || function(e) {
            e.statusCode = a, t.fail(o.buildErrorConfig(a, e.errMsg));
        }, s = s || function(e) {
            e.statusCode == a && t.complete(o.buildErrorConfig(a, e.errMsg));
        }, t.location) {
            if (o.checkLocation(t)) {
                e(h.getLocationParam(t.location));
            }
        } else o.getWXLocation(e, i, s);
    }
}, f = function() {
    function t(i) {
        if ((0, e.default)(this, t), !i.key) throw Error("key值不能为空");
        this.key = i.key;
    }
    return (0, i.default)(t, [ {
        key: "search",
        value: function(t) {
            if (t = t || {}, h.polyfillParam(t), h.checkKeyword(t)) {
                var e = {
                    keyword: t.keyword,
                    orderby: t.orderby || "_distance",
                    page_size: t.page_size || 10,
                    page_index: t.page_index || 1,
                    output: "json",
                    key: this.key
                };
                t.address_format && (e.address_format = t.address_format), t.filter && (e.filter = t.filter);
                var i = t.distance || "1000", s = t.auto_extend || 1, o = null, r = null;
                t.region && (o = t.region), t.rectangle && (r = t.rectangle);
                h.locationProcess(t, function(n) {
                    o && !r ? (e.boundary = "region(" + o + "," + s + "," + n.latitude + "," + n.longitude + ")", 
                    t.sig && (e.sig = h.getSig(e, t.sig, "search"))) : r && !o ? (e.boundary = "rectangle(" + r + ")", 
                    t.sig && (e.sig = h.getSig(e, t.sig, "search"))) : (e.boundary = "nearby(" + n.latitude + "," + n.longitude + "," + i + "," + s + ")", 
                    t.sig && (e.sig = h.getSig(e, t.sig, "search"))), wx.request(h.buildWxRequestConfig(t, {
                        url: "https://apis.map.qq.com/ws/place/v1/search",
                        data: e
                    }, "search"));
                });
            }
        }
    }, {
        key: "getSuggestion",
        value: function(t) {
            if (t = t || {}, h.polyfillParam(t), h.checkKeyword(t)) {
                var e = {
                    keyword: t.keyword,
                    region: t.region || "全国",
                    region_fix: t.region_fix || 0,
                    policy: t.policy || 0,
                    page_size: t.page_size || 10,
                    page_index: t.page_index || 1,
                    get_subpois: t.get_subpois || 0,
                    output: "json",
                    key: this.key
                };
                if (t.address_format && (e.address_format = t.address_format), t.filter && (e.filter = t.filter), 
                t.location) {
                    h.locationProcess(t, function(i) {
                        e.location = i.latitude + "," + i.longitude, t.sig && (e.sig = h.getSig(e, t.sig, "suggest")), 
                        wx.request(h.buildWxRequestConfig(t, {
                            url: c,
                            data: e
                        }, "suggest"));
                    });
                } else t.sig && (e.sig = h.getSig(e, t.sig, "suggest")), wx.request(h.buildWxRequestConfig(t, {
                    url: c,
                    data: e
                }, "suggest"));
            }
        }
    }, {
        key: "reverseGeocoder",
        value: function(t) {
            t = t || {}, h.polyfillParam(t);
            var e = {
                coord_type: t.coord_type || 5,
                get_poi: t.get_poi || 0,
                output: "json",
                key: this.key
            };
            t.poi_options && (e.poi_options = t.poi_options);
            h.locationProcess(t, function(i) {
                e.location = i.latitude + "," + i.longitude, t.sig && (e.sig = h.getSig(e, t.sig, "reverseGeocoder")), 
                wx.request(h.buildWxRequestConfig(t, {
                    url: "https://apis.map.qq.com/ws/geocoder/v1/",
                    data: e
                }, "reverseGeocoder"));
            });
        }
    }, {
        key: "geocoder",
        value: function(t) {
            if (t = t || {}, h.polyfillParam(t), !h.checkParamKeyEmpty(t, "address")) {
                var e = {
                    address: t.address,
                    output: "json",
                    key: this.key
                };
                t.region && (e.region = t.region), t.sig && (e.sig = h.getSig(e, t.sig, "geocoder")), 
                wx.request(h.buildWxRequestConfig(t, {
                    url: "https://apis.map.qq.com/ws/geocoder/v1/",
                    data: e
                }, "geocoder"));
            }
        }
    }, {
        key: "getCityList",
        value: function(t) {
            t = t || {}, h.polyfillParam(t);
            var e = {
                output: "json",
                key: this.key
            };
            t.sig && (e.sig = h.getSig(e, t.sig, "getCityList")), wx.request(h.buildWxRequestConfig(t, {
                url: "https://apis.map.qq.com/ws/district/v1/list",
                data: e
            }, "getCityList"));
        }
    }, {
        key: "getDistrictByCityId",
        value: function(t) {
            if (t = t || {}, h.polyfillParam(t), !h.checkParamKeyEmpty(t, "id")) {
                var e = {
                    id: t.id || "",
                    output: "json",
                    key: this.key
                };
                t.sig && (e.sig = h.getSig(e, t.sig, "getDistrictByCityId")), wx.request(h.buildWxRequestConfig(t, {
                    url: "https://apis.map.qq.com/ws/district/v1/getchildren",
                    data: e
                }, "getDistrictByCityId"));
            }
        }
    }, {
        key: "calculateDistance",
        value: function(t) {
            if (t = t || {}, h.polyfillParam(t), !h.checkParamKeyEmpty(t, "to")) {
                var e = {
                    mode: t.mode || "walking",
                    to: h.location2query(t.to),
                    output: "json",
                    key: this.key
                };
                if (t.from && (t.location = t.from), "straight" == e.mode) {
                    var i = function(i) {
                        for (var s = h.getEndLocation(e.to), o = {
                            message: "query ok",
                            result: {
                                elements: []
                            },
                            status: 0
                        }, r = 0; r < s.length; r++) o.result.elements.push({
                            distance: h.getDistance(i.latitude, i.longitude, s[r].lat, s[r].lng),
                            duration: 0,
                            from: {
                                lat: i.latitude,
                                lng: i.longitude
                            },
                            to: {
                                lat: s[r].lat,
                                lng: s[r].lng
                            }
                        });
                        var n = o.result.elements, a = [];
                        for (r = 0; r < n.length; r++) a.push(n[r].distance);
                        return t.success(o, {
                            calculateResult: n,
                            distanceResult: a
                        });
                    };
                    h.locationProcess(t, i);
                } else {
                    i = function(i) {
                        e.from = i.latitude + "," + i.longitude, t.sig && (e.sig = h.getSig(e, t.sig, "calculateDistance")), 
                        wx.request(h.buildWxRequestConfig(t, {
                            url: "https://apis.map.qq.com/ws/distance/v1/",
                            data: e
                        }, "calculateDistance"));
                    };
                    h.locationProcess(t, i);
                }
            }
        }
    }, {
        key: "direction",
        value: function(t) {
            if (t = t || {}, h.polyfillParam(t), !h.checkParamKeyEmpty(t, "to")) {
                var e = {
                    output: "json",
                    key: this.key
                };
                "string" == typeof t.to ? e.to = t.to : e.to = t.to.latitude + "," + t.to.longitude;
                var i;
                t.mode = t.mode || u, i = "https://apis.map.qq.com/ws/direction/v1/" + t.mode, t.from && (t.location = t.from), 
                t.mode == u && (t.from_poi && (e.from_poi = t.from_poi), t.heading && (e.heading = t.heading), 
                t.speed && (e.speed = t.speed), t.accuracy && (e.accuracy = t.accuracy), t.road_type && (e.road_type = t.road_type), 
                t.to_poi && (e.to_poi = t.to_poi), t.from_track && (e.from_track = t.from_track), 
                t.waypoints && (e.waypoints = t.waypoints), t.policy && (e.policy = t.policy), t.plate_number && (e.plate_number = t.plate_number)), 
                t.mode == g && (t.departure_time && (e.departure_time = t.departure_time), t.policy && (e.policy = t.policy));
                h.locationProcess(t, function(s) {
                    e.from = s.latitude + "," + s.longitude, t.sig && (e.sig = h.getSig(e, t.sig, "direction", t.mode)), 
                    wx.request(h.buildWxRequestConfig(t, {
                        url: i,
                        data: e
                    }, "direction"));
                });
            }
        }
    } ]), t;
}();

module.exports = f;