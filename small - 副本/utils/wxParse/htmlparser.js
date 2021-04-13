var e = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, t = /^<\/([-A-Za-z0-9_]+)[^>]*>/, a = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, r = c("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), s = c("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), n = c("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), i = c("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), o = c("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), l = c("wxxxcode-style,script,style,view,scroll-view,block");

function c(e) {
    for (var t = {}, a = e.split(","), r = 0; r < a.length; r++) t[a[r]] = !0;
    return t;
}

module.exports = function(c, d) {
    var f, p, u, h = [], m = c;
    for (h.last = function() {
        return this[this.length - 1];
    }; c; ) {
        if (p = !0, h.last() && l[h.last()]) c = c.replace(new RegExp("([\\s\\S]*?)</" + h.last() + "[^>]*>"), function(e, t) {
            return t = t.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), d.chars && d.chars(t), 
            "";
        }), v("", h.last()); else if (0 == c.indexOf("\x3c!--") ? (f = c.indexOf("--\x3e")) >= 0 && (d.comment && d.comment(c.substring(4, f)), 
        c = c.substring(f + 3), p = !1) : 0 == c.indexOf("</") ? (u = c.match(t)) && (c = c.substring(u[0].length), 
        u[0].replace(t, v), p = !1) : 0 == c.indexOf("<") && (u = c.match(e)) && (c = c.substring(u[0].length), 
        u[0].replace(e, g), p = !1), p) {
            var b = (f = c.indexOf("<")) < 0 ? c : c.substring(0, f);
            c = f < 0 ? "" : c.substring(f), d.chars && d.chars(b);
        }
        if (c == m) throw "Parse Error: " + c;
        m = c;
    }
    function g(e, t, l, c) {
        if (t = t.toLowerCase(), s[t]) for (;h.last() && n[h.last()]; ) v("", h.last());
        if (i[t] && h.last() == t && v("", t), (c = r[t] || !!c) || h.push(t), d.start) {
            var f = [];
            l.replace(a, function(e, t) {
                var a = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : o[t] ? t : "";
                f.push({
                    name: t,
                    value: a,
                    escaped: a.replace(/(^|[^\\])"/g, '$1\\"')
                });
            }), d.start && d.start(t, f, c);
        }
    }
    function v(e, t) {
        if (t) for (a = h.length - 1; a >= 0 && h[a] != t; a--) ; else var a = 0;
        if (a >= 0) {
            for (var r = h.length - 1; r >= a; r--) d.end && d.end(h[r]);
            h.length = a;
        }
    }
    v();
};