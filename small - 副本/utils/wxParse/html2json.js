var e = "", t = "", r = {}, n = require("wxDiscode.js"), o = require("htmlparser.js"), s = (d("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
d("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), a = d("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), i = d("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

d("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
d("wxxxcode-style,script,style,view,scroll-view,block");

function d(e) {
    for (var t = {}, r = e.split(","), n = 0; n < r.length; n++) t[r[n]] = !0;
    return t;
}

function l(n) {
    var o = [];
    if (0 == e.length || !r) return (l = {
        node: "text"
    }).text = n, a = [ l ];
    n = n.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var s = new RegExp("[:]"), a = n.split(s), i = 0; i < a.length; i++) {
        var d = a[i], l = {};
        r[d] ? (l.node = "element", l.tag = "emoji", l.text = r[d], l.baseSrc = t) : (l.node = "text", 
        l.text = d), o.push(l);
    }
    return o;
}

module.exports = {
    html2json: function(e, t) {
        e = function(e) {
            return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
        }(e), e = n.strDiscode(e);
        var r = [], d = {
            node: t,
            nodes: [],
            images: [],
            imageUrls: []
        };
        return o(e, {
            start: function(e, o, l) {
                var c = {
                    node: "element",
                    tag: e
                };
                if (s[e] ? c.tagType = "block" : a[e] ? c.tagType = "inline" : i[e] && (c.tagType = "closeSelf"), 
                0 !== o.length && (c.attr = o.reduce(function(e, t) {
                    var r = t.name, n = t.value;
                    return "class" == r && (console.dir(n), c.classStr = n), "style" == r && (console.dir(n), 
                    c.styleStr = n), n.match(/ /) && (n = n.split(" ")), e[r] ? Array.isArray(e[r]) ? e[r].push(n) : e[r] = [ e[r], n ] : e[r] = n, 
                    e;
                }, {})), "img" === c.tag) {
                    c.imgIndex = d.images.length;
                    var p = c.attr.src;
                    p = n.urlToHttpUrl(p, "https"), c.attr.src = p, c.from = t, d.images.push(c), d.imageUrls.push(p);
                }
                if (l) {
                    var u = r[0] || d;
                    void 0 === u.nodes && (u.nodes = []), u.nodes.push(c);
                } else r.unshift(c);
            },
            end: function(e) {
                var t = r.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), 0 === r.length) d.nodes.push(t); else {
                    var n = r[0];
                    void 0 === n.nodes && (n.nodes = []), n.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: l(e)
                };
                if (0 === r.length) d.nodes.push(t); else {
                    var n = r[0];
                    void 0 === n.nodes && (n.nodes = []), n.nodes.push(t);
                }
            },
            comment: function(e) {
                var t = {
                    node: "comment",
                    text: e
                }, n = r[0];
                void 0 === n.nodes && (n.nodes = []), n.nodes.push(t);
            }
        }), d;
    },
    emojisInit: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", s = arguments.length > 2 ? arguments[2] : void 0;
        e = n, t = o, r = s;
    }
};