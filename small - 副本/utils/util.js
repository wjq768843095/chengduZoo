var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatDay: function(e) {
        var n = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate() + 1;
        return console.log(o), {
            fulldate: [ n, a, o ].map(t).join("-"),
            abbreviationdate: [ a, o ].map(t).join("月")
        };
    },
    GetDateStr: function(e) {
        var n = new Date();
        n.setDate(n.getDate() + e);
        var a = n.getFullYear(), o = n.getMonth() + 1, r = n.getDate(), u = n.getHours(), i = n.getMinutes(), g = n.getSeconds();
        n.getMilliseconds();
        return {
            fulldate: a + "-" + t(o) + "-" + t(r),
            abbreviationdate: o + "月" + r,
            iosFulldate: a + "/" + t(o) + "/" + t(r),
            dayTime: n.getTime(),
            fullTime: u + ":" + t(i) + ":" + t(g)
        };
    },
    formatsatrtTime: function(e) {
        var n = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate() + 2;
        return console.log(o), {
            fulldate: [ n, a, o ].map(t).join("-"),
            abbreviationdate: [ a, o ].map(t).join("月")
        };
    },
    endtime: function(e) {
        return [ e.getFullYear(), e.getMonth() + 1, e.getDate() + 30 ].map(t).join("-");
    },
    todayDay: function(e) {
        var n = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate();
        return console.log(o), {
            fulldate: [ n, a, o ].map(t).join("-"),
            abbreviationdate: [ a, o ].map(t).join("月")
        };
    },
    formatDate: function(t, e) {
        var n = new Date(t);
        console.log(n);
        var a = n.getFullYear(), o = n.getMonth() + 1, r = n.getDate(), u = function() {
            return n.getHours() < 10 ? "0" + n.getHours() : n.getHours();
        }, i = function() {
            return n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes();
        }, g = function() {
            return n.getSeconds() < 10 ? "0" + n.getSeconds() : n.getSeconds();
        };
        return "YY-MM-DD" == e ? " " + a + "-" + o + "-" + r : "YY-MM" == e ? " " + a + "-" + o : "YY" == e ? " " + a : "MM" == e ? " " + o : "DD" == e ? " " + r : "yesterday" == e ? " " + r - 1 : "hh-mm-ss" == e ? " " + u() + ":" + i() + ":" + g() : "hh-mm" == e ? " " + u() + ":" + i() : "mm-ss" == e ? i() + ":" + g() : "mm" == e ? i() : "ss" == e ? g() : a + "-" + o + "-" + r + " " + u() + ":" + i() + ":" + g();
    }
};