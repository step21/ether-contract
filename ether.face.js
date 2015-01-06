function Etherface(args) {
    this.version = "0.1", this.key = args.key, this.app = args.app;
    var hostname = document.location.hostname;
    return "localhost" == hostname ? (this.hostname = "http://localhost", this.port = 3e3) : (this.hostname = "http://api.ether.fund", this.port = 3e3), this.socket = null, this.type = null, this
}

function getBTCprice(func) {
    etherface.bitcoin("get", {}, function(btc) {
        gBtcPrice = btc.to_usd.toFixed(2), func(gBtcPrice)
    })
}

function convertEther(input) {
    var ether = new BigNumber(ETH_UNITS[input.unit]).times(input.value),
        output = $.extend({}, ETH_UNITS);
    return $.each(ETH_UNITS, function(unit, value) {
        output[unit] = ether.dividedBy(value).noExponents()
    }), output
}

function figureEtherUnit(input) {
    var output = convertEther(input),
        best = null;
    return $.each(output, function(unit, value) {
        val = new BigNumber(value), value >= 1 && 1e3 >= value && (best = {
            unit: unit,
            value: val
        })
    }), best || (best = input), best
}

function convertBTC(input) {
    var btc = new BigNumber(BTC_UNITS[input.unit]).times(input.value),
        output = $.extend({}, BTC_UNITS);
    return $.each(BTC_UNITS, function(unit, value) {
        output[unit] = btc.dividedBy(value).noExponents()
    }), output
}

function figureBTCUnit(input) {
    return input
}

function convertUSD() {}

function getGeoStr(info) {
    var str = (info.city ? info.city + ", " : "") + (info.country ? info.country : "");
    return str
}

function setEtherInput(id, value, unit) {
    (value || 0 == value) && $("#input-" + id).val(value), unit && ($("#btn-" + id).val(unit), $("#btn-" + id).html(unit + " <span class='caret'></span>"), $("#dropdown-" + id + " li").removeClass("active"), $("#dropdown-" + id + " li#in-" + unit).addClass("active"))
}

function validateEtherInput(ids) {
    var values = {};
    for (i = 0; i < ids.length; i++) {
        var id = ids[i],
            val = $("#input-" + id).val();
        if (val && "" != val)
            if (isNaN(val)) $("#input-" + id + "-wrap").addClass("has-error");
            else {
                $("#input-" + id + "-wrap").removeClass("has-error");
                var unit = $("#btn-" + id).val();
                values[id] = {
                    value: parseFloat(val),
                    unit: unit
                }
            } else $("#input-" + id + "-wrap").addClass("has-error")
    }
    return ids.length != Object.keys(values).length ? null : values
}

function setHashParams(input, set) {
    var str = [];
    $.each(input, function(id, obj) {
        var args = obj.hash;
        str.push(encodeURIComponent(args[0]) + "=" + encodeURIComponent(obj.value)), str.push(encodeURIComponent(args[1]) + "=" + encodeURIComponent(obj.unit))
    });
    var hash = str.join("&");
    return $(".shareLink").attr("href", gPageUrl + "#" + hash), set && (history.pushState ? history.pushState(null, null, "#" + hash) : document.location.hash = hash), hash
}

function getHashParams() {
    if (!document.location.hash) return null;
    for (var e, hashParams = {}, a = /\+/g, r = /([^&;=]+)=?([^&;]*)/g, d = function(s) {
            return decodeURIComponent(s.replace(a, " "))
        }, q = window.location.hash.substring(1); e = r.exec(q);) hashParams[d(e[1])] = d(e[2]);
    return hashParams
}

function isUserAnon() {
    return !gUser || gUser && "AnonymousUser" == gUser ? !0 : !1
}

function etherPost(url, data, done, error) {
    data.csrfmiddlewaretoken = gCsrfToken, $.ajax({
        type: "POST",
        cache: !1,
        url: url,
        data: data,
        beforeSend: function() {},
        success: function(data) {
            "error" in data ? error(data) : done(data)
        },
        error: function() {
            error(data)
        }
    })
}

function etherParse(data) {
    var json = null;
    try {
        json = $.parseJSON(data)
    } catch (e) {
        console.log("error: " + e)
    }
    return json
}

function etherGrowl(msg, type, icon, hidden) {
    var params = {
        message: msg
    };
    icon && (params.message = " " + msg, params.icon = "fa fa-fw fa-lg " + icon), $.growl(params, {
        type: type,
        allow_dismiss: !1,
        element: "#editorPanel",
        placement: {
            align: "left"
        },
        offset: {
            x: 0,
            y: -46
        },
        padding: 0,
        animate: {
            enter: "animated flipInX",
            exit: "animated flipOutX"
        },
        onHidden: function() {
            hidden && hidden()
        }
    })
}

function loginOrRegisterModal(title, action, func) {
        if (isUserAnon()) {
            var modal = $("#loginModal");
            modal.find(".modal-title").html(title), modal.find("#dothat").html(action), modal.modal({})
        } else func()
    }! function(n) {
        "use strict";

        function t(n, i) {
            var c, l, a, b, w, p, s = this;
            if (!(s instanceof t)) return new t(n, i);
            if (n instanceof t) {
                if (u = 0, i === c) return s.s = n.s, s.e = n.e, void(s.c = (n = n.c) ? n.slice() : n);
                n += ""
            }
            if ("string" != typeof n && (n = (a = "number" == typeof n || "[object Number]" == Object.prototype.toString.call(n)) && 0 === n && 0 > 1 / n ? "-0" : n + ""), p = n, i === c && g.test(n)) s.s = "-" == n.charAt(0) ? (n = n.slice(1), -1) : 1;
            else {
                if (10 == i) return k(n, e, r);
                if (n = rt.call(n).replace(/^\+(?!-)/, ""), s.s = "-" == n.charAt(0) ? (n = n.replace(/^-(?!-)/, ""), -1) : 1, null != i ? i != (0 | i) && y || (o = !(i >= 2 && 65 > i)) ? (f(i, 2), w = g.test(n)) : (b = "[" + d.slice(0, i = 0 | i) + "]+", n = n.replace(/\.$/, "").replace(/^\./, "0."), (w = new RegExp("^" + b + "(?:\\." + b + ")?$", 37 > i ? "i" : "").test(n)) ? (a && (n.replace(/^0\.0*|\./, "").length > 15 && f(p, 0), a = !a), n = tt(n, 10, i, s.s)) : "Infinity" != n && "NaN" != n && (f(p, 1, i), n = "NaN")) : w = g.test(n), !w) return s.c = s.e = null, "Infinity" != n && ("NaN" != n && f(p, 3), s.s = null), void(u = 0)
            }
            for ((c = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (l = n.search(/e/i)) > 0 ? (0 > c && (c = l), c += +n.slice(l + 1), n = n.substring(0, l)) : 0 > c && (c = n.length), l = 0;
                "0" == n.charAt(l); l++);
            if (i = n.length, a && i > 15 && n.slice(l).length > 15 && f(p, 0), u = 0, (c -= l + 1) > h) s.c = s.e = null;
            else if (l == i || v > c) s.c = [s.e = 0];
            else {
                for (;
                    "0" == n.charAt(--i););
                for (s.e = c, s.c = [], c = 0; i >= l; s.c[c++] = +n.charAt(l++));
            }
        }

        function f(n, t, i, r, f, e) {
            if (y) {
                var c, s = ["new BigNumber", "cmp", "div", "eq", "gt", "gte", "lt", "lte", "minus", "mod", "plus", "times", "toFr"][u ? 0 > u ? -u : u : 0 > 1 / u ? 1 : 0] + "()",
                    h = o ? " out of range" : " not a" + (f ? " non-zero" : "n") + " integer";
                throw h = ([s + " number type has more than 15 significant digits", s + " not a base " + i + " number", s + " base" + h, s + " not a number"][t] || i + "() " + t + (e ? " not a boolean or binary digit" : h + (r ? " or not [" + (o ? " negative, positive" : " integer, integer") + " ]" : ""))) + ": " + n, o = u = 0, c = new Error(h), c.name = "BigNumber Error", c
            }
        }

        function tt(n, i, r, u) {
            function h(n, t) {
                var u, o, e = 0,
                    s = n.length,
                    f = [0];
                for (t = t || r; s > e; e++) {
                    for (o = f.length, u = 0; o > u; f[u] *= t, u++);
                    for (f[0] += d.indexOf(n.charAt(e)), u = 0; u < f.length; u++) f[u] > i - 1 && (null == f[u + 1] && (f[u + 1] = 0), f[u + 1] += f[u] / i ^ 0, f[u] %= i)
                }
                return f.reverse()
            }

            function o(n) {
                for (var t = 0, r = n.length, i = ""; r > t; i += d.charAt(n[t++]));
                return i
            }
            var e, c, l, f, s, a;
            if (37 > r && (n = n.toLowerCase()), (e = n.indexOf(".")) > -1)
                if (e = n.length - e - 1, c = h(new t(r).pow(e).toF(), 10), f = n.split("."), l = h(f[1]), f = h(f[0]), a = it(l, c, l.length - c.length, u, i, 1 & f[f.length - 1]), s = a.c, e = a.e) {
                    for (; ++e; s.unshift(0));
                    n = o(f) + "." + o(s)
                } else s[0] ? f[e = f.length - 1] < i - 1 ? (++f[e], n = o(f)) : n = new t(o(f), i).plus(p).toS(i) : n = o(f);
            else n = o(h(n));
            return n
        }

        function it(n, i, r, u, f, o) {
            var y, d, k, w, a, rt = i.slice(),
                g = y = i.length,
                ut = n.length,
                s = n.slice(0, y),
                c = s.length,
                l = new t(p),
                nt = l.c = [],
                tt = 0,
                it = e + (l.e = r) + 1;
            for (l.s = u, u = 0 > it ? 0 : it; c++ < y; s.push(0));
            rt.unshift(0);
            do {
                for (k = 0; f > k; k++) {
                    if (y != (c = s.length)) w = y > c ? 1 : -1;
                    else
                        for (a = -1, w = 0; ++a < y;)
                            if (i[a] != s[a]) {
                                w = i[a] > s[a] ? 1 : -1;
                                break
                            } if (!(0 > w)) break;
                    for (d = c == y ? i : rt; c;) {
                        if (s[--c] < d[c]) {
                            for (a = c; a && !s[--a]; s[a] = f - 1);
                            --s[a], s[c] += f
                        }
                        s[c] -= d[c]
                    }
                    for (; !s[0]; s.shift());
                }
                nt[tt++] = w ? k : ++k, s[0] && w ? s[c] = n[g] || 0 : s = [n[g]]
            } while ((g++ < ut || null != s[0]) && u--);
            return nt[0] || 1 == tt || (--l.e, nt.shift()), tt > it && b(l, e, f, o, null != s[0]), l.e > h ? l.c = l.e = null : l.e < v && (l.c = [l.e = 0]), l
        }

        function w(n, i, r) {
            var u = i - (n = new t(n)).e,
                f = n.c;
            if (!f) return n.toS();
            for (f.length > ++i && b(n, u, 10), u = 0 == f[0] ? u + 1 : r ? i : n.e + u + 1; f.length < u; f.push(0));
            return u = n.e, 1 == r || 2 == r && (--i < u || c >= u) ? (n.s < 0 && f[0] ? "-" : "") + (f.length > 1 ? (f.splice(1, 0, "."), f.join("")) : f[0]) + (0 > u ? "e" : "e+") + u : n.toS()
        }

        function b(n, t, i, u, f) {
            var e = n.c,
                s = n.s < 0,
                c = i / 2,
                o = n.e + t + 1,
                h = e[o],
                l = f || 0 > o || null != e[o + 1];
            if (f = 4 > r ? (null != h || l) && (0 == r || 2 == r && !s || 3 == r && s) : h > c || h == c && (4 == r || l || 6 == r && (1 & e[o - 1] || !t && u) || 7 == r && !s || 8 == r && s), 1 > o || !e[0]) return e.length = 0, e.push(0), f ? (e[0] = 1, n.e = -t) : n.e = 0, n;
            if (e.length = o--, f)
                for (--i; ++e[o] > i;) e[o] = 0, o-- || (++n.e, e.unshift(1));
            for (o = e.length; !e[--o]; e.pop());
            return n
        }

        function k(n, i, u) {
            var f = r;
            return r = u, n = new t(n), n.c && b(n, i, 10), r = f, n
        }
        var o, s = 1e9,
            nt = 1e6,
            e = 20,
            r = 4,
            c = -7,
            a = 21,
            v = -s,
            h = s,
            y = !0,
            l = parseInt,
            i = t.prototype,
            d = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",
            u = 0,
            g = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
            rt = String.prototype.trim || function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            p = t(1);
        t.ROUND_UP = 0, t.ROUND_DOWN = 1, t.ROUND_CEIL = 2, t.ROUND_FLOOR = 3, t.ROUND_HALF_UP = 4, t.ROUND_HALF_DOWN = 5, t.ROUND_HALF_EVEN = 6, t.ROUND_HALF_CEIL = 7, t.ROUND_HALF_FLOOR = 8, t.config = function() {
            var n, t, g = 0,
                p = {},
                d = arguments,
                k = d[0],
                w = "config",
                i = function(n, t, i) {
                    return !((o = t > n || n > i) || l(n) != n && 0 !== n)
                },
                b = k && "object" == typeof k ? function() {
                    return k.hasOwnProperty(t) ? null != (n = k[t]) : void 0
                } : function() {
                    return d.length > g ? null != (n = d[g++]) : void 0
                };
            return b(t = "DECIMAL_PLACES") && (i(n, 0, s) ? e = 0 | n : f(n, t, w)), p[t] = e, b(t = "ROUNDING_MODE") && (i(n, 0, 8) ? r = 0 | n : f(n, t, w)), p[t] = r, b(t = "EXPONENTIAL_AT") && (i(n, -s, s) ? c = -(a = ~~(0 > n ? -n : +n)) : !o && n && i(n[0], -s, 0) && i(n[1], 0, s) ? (c = ~~n[0], a = ~~n[1]) : f(n, t, w, 1)), p[t] = [c, a], b(t = "RANGE") && (i(n, -s, s) && ~~n ? v = -(h = ~~(0 > n ? -n : +n)) : !o && n && i(n[0], -s, -1) && i(n[1], 1, s) ? (v = ~~n[0], h = ~~n[1]) : f(n, t, w, 1, 1)), p[t] = [v, h], b(t = "ERRORS") && (n === !!n || 1 === n || 0 === n ? (o = u = 0, l = (y = !!n) ? parseInt : parseFloat) : f(n, t, w, 0, 0, 1)), p[t] = y, p
        }, i.abs = i.absoluteValue = function() {
            var n = new t(this);
            return n.s < 0 && (n.s = 1), n
        }, i.ceil = function() {
            return k(this, 0, 2)
        }, i.comparedTo = i.cmp = function(n, i) {
            var f, l = this,
                e = l.c,
                o = (u = -u, n = new t(n, i)).c,
                r = l.s,
                c = n.s,
                s = l.e,
                h = n.e;
            if (!r || !c) return null;
            if (f = e && !e[0], i = o && !o[0], f || i) return f ? i ? 0 : -c : r;
            if (r != c) return r;
            if (f = 0 > r, i = s == h, !e || !o) return i ? 0 : !e ^ f ? 1 : -1;
            if (!i) return s > h ^ f ? 1 : -1;
            for (r = -1, c = (s = e.length) < (h = o.length) ? s : h; ++r < c;)
                if (e[r] != o[r]) return e[r] > o[r] ^ f ? 1 : -1;
            return s == h ? 0 : s > h ^ f ? 1 : -1
        }, i.dividedBy = i.div = function(n, i) {
            var r = this.c,
                o = this.e,
                s = this.s,
                f = (u = 2, n = new t(n, i)).c,
                h = n.e,
                c = n.s,
                e = s == c ? 1 : -1;
            return (o || r && r[0]) && (h || f && f[0]) ? it(r, f, o - h, e, 10) : new t(s && c && (r ? !f || r[0] != f[0] : f) ? r && 0 == r[0] || !f ? 0 * e : e / 0 : 0 / 0)
        }, i.equals = i.eq = function(n, t) {
            return u = 3, 0 === this.cmp(n, t)
        }, i.floor = function() {
            return k(this, 0, 3)
        }, i.greaterThan = i.gt = function(n, t) {
            return u = 4, this.cmp(n, t) > 0
        }, i.greaterThanOrEqualTo = i.gte = function(n, t) {
            return u = 5, 1 == (t = this.cmp(n, t)) || 0 === t
        }, i.isFinite = i.isF = function() {
            return !!this.c
        }, i.isNaN = function() {
            return !this.s
        }, i.isNegative = i.isNeg = function() {
            return this.s < 0
        }, i.isZero = i.isZ = function() {
            return !!this.c && 0 == this.c[0]
        }, i.lessThan = i.lt = function(n, t) {
            return u = 6, this.cmp(n, t) < 0
        }, i.lessThanOrEqualTo = i.lte = function(n, t) {
            return u = 7, -1 == (t = this.cmp(n, t)) || 0 === t
        }, i.minus = function(n, i) {
            var h, l, a, y, c = this,
                o = c.s;
            if (i = (u = 8, n = new t(n, i)).s, !o || !i) return new t(0 / 0);
            if (o != i) return n.s = -i, c.plus(n);
            var f = c.c,
                p = c.e,
                e = n.c,
                s = n.e;
            if (!p || !s) {
                if (!f || !e) return f ? (n.s = -i, n) : new t(e ? c : 0 / 0);
                if (!f[0] || !e[0]) return e[0] ? (n.s = -i, n) : new t(f[0] ? c : 3 == r ? -0 : 0)
            }
            if (f = f.slice(), o = p - s) {
                for (h = (y = 0 > o) ? (o = -o, f) : (s = p, e), h.reverse(), i = o; i--; h.push(0));
                h.reverse()
            } else
                for (a = ((y = f.length < e.length) ? f : e).length, o = i = 0; a > i; i++)
                    if (f[i] != e[i]) {
                        y = f[i] < e[i];
                        break
                    } if (y && (h = f, f = e, e = h, n.s = -n.s), (i = -((a = f.length) - e.length)) > 0)
                for (; i--; f[a++] = 0);
            for (i = e.length; i > o;) {
                if (f[--i] < e[i]) {
                    for (l = i; l && !f[--l]; f[l] = 9);
                    --f[l], f[i] += 10
                }
                f[i] -= e[i]
            }
            for (; 0 == f[--a]; f.pop());
            for (; 0 == f[0]; f.shift(), --s);
            return (v > s || !f[0]) && (f[0] || (n.s = 3 == r ? -1 : 1), f = [s = 0]), n.c = f, n.e = s, n
        }, i.modulo = i.mod = function(n, i) {
            var f = this,
                h = f.c,
                c = (u = 9, n = new t(n, i)).c,
                o = f.s,
                s = n.s;
            return i = !o || !s || c && !c[0], i || h && !h[0] ? new t(i ? 0 / 0 : f) : (f.s = n.s = 1, i = 1 == n.cmp(f), f.s = o, n.s = s, i ? new t(f) : (o = e, s = r, e = 0, r = 1, f = f.div(n), e = o, r = s, this.minus(f.times(n))))
        }, i.negated = i.neg = function() {
            var n = new t(this);
            return n.s = -n.s || null, n
        }, i.plus = function(n, i) {
            var o, c = this,
                f = c.s;
            if (i = (u = 10, n = new t(n, i)).s, !f || !i) return new t(0 / 0);
            if (f != i) return n.s = -i, c.minus(n);
            var l = c.e,
                r = c.c,
                s = n.e,
                e = n.c;
            if (!l || !s) {
                if (!r || !e) return new t(f / 0);
                if (!r[0] || !e[0]) return e[0] ? n : new t(r[0] ? c : 0 * f)
            }
            if (r = r.slice(), f = l - s) {
                for (o = f > 0 ? (s = l, e) : (f = -f, r), o.reverse(); f--; o.push(0));
                o.reverse()
            }
            for (r.length - e.length < 0 && (o = e, e = r, r = o), f = e.length, i = 0; f; i = (r[--f] = r[f] + e[f] + i) / 10 ^ 0, r[f] %= 10);
            for (i && (r.unshift(i), ++s > h && (r = s = null)), f = r.length; 0 == r[--f]; r.pop());
            return n.c = r, n.e = s, n
        }, i.toPower = i.pow = function(n) {
            var i = 0 * n == 0 ? 0 | n : n,
                r = new t(this),
                u = new t(p);
            if (((o = -nt > n || n > nt) && (i = n / 0) || l(n) != n && 0 !== n && !(i = 0 / 0)) && !f(n, "exponent", "pow") || !i) return new t(Math.pow(r.toS(), i));
            for (i = 0 > i ? -i : i; 1 & i && (u = u.times(r)), i >>= 1, i;) r = r.times(r);
            return 0 > n ? p.div(u) : u
        }, i.round = function(n, t) {
            return n = null == n || ((o = 0 > n || n > s) || l(n) != n) && !f(n, "decimal places", "round") ? 0 : 0 | n, t = null == t || ((o = 0 > t || t > 8) || l(t) != t && 0 !== t) && !f(t, "mode", "round") ? r : 0 | t, k(this, n, t)
        }, i.squareRoot = i.sqrt = function() {
            var o, u, c, s, h = this,
                n = h.c,
                i = h.s,
                f = h.e,
                l = e,
                a = r,
                v = new t("0.5");
            if (1 !== i || !n || !n[0]) return new t(!i || 0 > i && (!n || n[0]) ? 0 / 0 : n ? h : 1 / 0);
            for (i = Math.sqrt(h.toS()), r = 1, 0 == i || i == 1 / 0 ? (o = n.join(""), o.length + f & 1 || (o += "0"), u = new t(Math.sqrt(o) + ""), u.c || (u.c = [1]), u.e = ((f + 1) / 2 | 0) - (0 > f || 1 & f)) : u = new t(o = i.toString()), c = u.e, i = c + (e += 4), 3 > i && (i = 0), f = i;;)
                if (s = u, u = v.times(s.plus(h.div(s))), s.c.slice(0, i).join("") === u.c.slice(0, i).join("")) {
                    if (n = u.c, i -= o && u.e < c, 9 != n[i] || 9 != n[i - 1] || 9 != n[i - 2] || !(9 == n[i - 3] || o && 4 == n[i - 3])) {
                        if (!(n[f] || n[f - 1] || n[f - 2] || n[f - 3] && 5 != n[f - 3] || (n.length > f - 2 && (n.length = f - 2), u.times(u).eq(h)))) {
                            for (; n.length < f - 3;) n.push(0);
                            n[f - 3] ++
                        }
                        return r = a, b(u, e = l, 10), u
                    }
                    if (o && 9 == n[i - 3] && (s = u.round(l, 0), s.times(s).eq(h))) return r = a, e = l, s;
                    e += 4, i += 4, o = ""
                }
        }, i.times = function(n, i) {
            var f, l = this,
                e = l.c,
                o = (u = 11, n = new t(n, i)).c,
                s = l.e,
                r = n.e,
                c = l.s;
            if (n.s = c == (i = n.s) ? 1 : -1, !((s || e && e[0]) && (r || o && o[0]))) return new t(!c || !i || e && !e[0] && !o || o && !o[0] && !e ? 0 / 0 : e && o ? 0 * n.s : n.s / 0);
            for (n.e = s + r, (c = e.length) < (i = o.length) && (f = e, e = o, o = f, r = c, c = i, i = r), r = c + i, f = []; r--; f.push(0));
            for (s = i - 1; s > -1; s--) {
                for (i = 0, r = c + s; r > s; i = f[r] + o[s] * e[r - s - 1] + i, f[r--] = i % 10 | 0, i = i / 10 | 0);
                i && (f[r] = (f[r] + i) % 10)
            }
            for (i && ++n.e, f[0] || f.shift(), r = f.length; !f[--r]; f.pop());
            return n.c = n.e > h ? n.e = null : n.e < v ? [n.e = 0] : f, n
        }, i.toExponential = i.toE = function(n) {
            return w(this, (null == n || ((o = 0 > n || n > s) || l(n) != n && 0 !== n) && !f(n, "decimal places", "toE")) && this.c ? this.c.length - 1 : 0 | n, 1)
        }, i.toFixed = i.toF = function(n) {
            var u, t, r, i = this;
            return null == n || ((o = 0 > n || n > s) || l(n) != n && 0 !== n) && !f(n, "decimal places", "toF") || (r = i.e + (0 | n)), u = c, n = a, c = -(a = 1 / 0), r == t ? t = i.toS() : (t = w(i, r), i.s < 0 && i.c && (i.c[0] ? t.indexOf("-") < 0 && (t = "-" + t) : t = t.replace(/^-/, ""))), c = u, a = n, t
        }, i.toFraction = i.toFr = function(n) {
            var k, nt, c, l, i, s, d, a = l = new t(p),
                v = c = new t("0"),
                w = this,
                g = w.c,
                tt = h,
                it = e,
                rt = r,
                b = new t(p);
            if (!g) return w.toS();
            for (d = b.e = g.length - w.e - 1, (null == n || (!(u = 12, s = new t(n)).s || (o = s.cmp(a) < 0 || !s.c) || y && s.e < s.c.length - 1) && !f(n, "max denominator", "toFr") || (n = s).cmp(b) > 0) && (n = d > 0 ? b : a), h = 1 / 0, s = new t(g.join("")), e = 0, r = 1; k = s.div(b), i = l.plus(k.times(v)), 1 != i.cmp(n);) l = v, v = i, a = c.plus(k.times(i = a)), c = i, b = s.minus(k.times(i = b)), s = i;
            return i = n.minus(l).div(v), c = c.plus(i.times(a)), l = l.plus(i.times(v)), c.s = a.s = w.s, e = 2 * d, r = rt, nt = a.div(v).minus(w).abs().cmp(c.div(l).minus(w).abs()) < 1 ? [a.toS(), v.toS()] : [c.toS(), l.toS()], h = tt, e = it, nt
        }, i.toPrecision = i.toP = function(n) {
            return null == n || ((o = 1 > n || n > s) || l(n) != n) && !f(n, "precision", "toP") ? this.toS() : w(this, 0 | --n, 2)
        }, i.toString = i.toS = function(n) {
            var u, t, e, r = this,
                i = r.e;
            if (null === i) t = r.s ? "Infinity" : "NaN";
            else {
                if (n === u && (c >= i || i >= a)) return w(r, r.c.length - 1, 1);
                if (t = r.c.join(""), 0 > i) {
                    for (; ++i; t = "0" + t);
                    t = "0." + t
                } else if (e = t.length, i > 0)
                    if (++i > e)
                        for (i -= e; i--; t += "0");
                    else e > i && (t = t.slice(0, i) + "." + t.slice(i));
                else if (u = t.charAt(0), e > 1) t = u + "." + t.slice(1);
                else if ("0" == u) return u;
                if (null != n)
                    if ((o = !(n >= 2 && 65 > n)) || n != (0 | n) && y) f(n, "base", "toS");
                    else if (t = tt(t, 0 | n, 10, r.s), "0" == t) return t
            }
            return r.s < 0 ? "-" + t : t
        }, i.toNumber = i.toN = function() {
            var n = this;
            return +n || (n.s ? 0 * n.s : 0 / 0)
        }, i.valueOf = function() {
            return this.toS()
        }, "undefined" != typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define(function() {
            return t
        }) : n.BigNumber = t
    }(this),
    function(e) {
        var i = "growl",
            o = {
                element: "body",
                type: "info",
                allow_dismiss: !0,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5e3,
                timer: 1e3,
                url_target: "_blank",
                mouse_over: !1,
                animate: {
                    enter: "animated fadeInDown",
                    exit: "animated fadeOutUp"
                },
                onShow: null,
                onShown: null,
                onHide: null,
                onHidden: null,
                icon_type: "class",
                template: '<div data-growl="container" class="alert" role="alert"><button type="button" class="close" data-growl="dismiss"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><span data-growl="icon"></span><span data-growl="title"></span><span data-growl="message"></span><a href="#" data-growl="url"></a></div>'
            },
            u = function(t, n) {
                o = e.extend(!0, {}, o, n)
            },
            a = function(t) {
                t ? e('[data-growl="container"][data-growl-position="' + t + '"]').find('[data-growl="dismiss"]').trigger("click") : e('[data-growl="container"]').find('[data-growl="dismiss"]').trigger("click")
            },
            f = function(t, n, r) {
                var n = {
                    content: {
                        message: "object" == typeof n ? n.message : n,
                        title: n.title ? n.title : null,
                        icon: n.icon ? n.icon : null,
                        url: n.url ? n.url : null
                    }
                };
                r = e.extend(!0, {}, n, r), this.settings = e.extend(!0, {}, o, r), plugin = this, l(r, this.settings, plugin), this.$template = $template
            },
            l = function(t, n, r) {
                var i = {
                    settings: n,
                    $element: e(n.element),
                    template: n.template
                };
                "number" == typeof n.offset && (n.offset = {
                    x: n.offset,
                    y: n.offset
                }), $template = c(i), h($template, i.settings), p($template, i.settings), d($template, i.settings, r)
            },
            c = function(t) {
                var n = e(t.settings.template);
                return n.addClass("alert-" + t.settings.type), n.attr("data-growl-position", t.settings.placement.from + "-" + t.settings.placement.align), n.find('[data-growl="dismiss"]').css("display", "none"), t.settings.allow_dismiss && n.find('[data-growl="dismiss"]').css("display", "inline-block"), n
            },
            h = function(e, t) {
                e.find('[data-growl="dismiss"]').css({
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                    "z-index": t.z_index - 1 >= 1 ? t.z_index - 1 : 1
                }), t.content.icon && ("class" == t.icon_type.toLowerCase() ? e.find('[data-growl="icon"]').addClass(t.content.icon) : e.find('[data-growl="icon"]').is("img") ? e.find('[data-growl="icon"]').attr("src", t.content.icon) : e.find('[data-growl="icon"]').append('<img src="' + t.content.icon + '" />')), t.content.title && e.find('[data-growl="title"]').html(t.content.title), t.content.message && e.find('[data-growl="message"]').html(t.content.message), t.content.url && (e.find('[data-growl="url"]').attr("href", t.content.url).attr("target", t.url_target), e.find('[data-growl="url"]').css({
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    "z-index": t.z_index - 2 >= 1 ? t.z_index - 2 : 1
                }))
            },
            p = function(t, n) {
                var r = n.offset.y,
                    i = {
                        position: "body" === n.element ? "fixed" : "absolute",
                        margin: 0,
                        "z-index": n.z_index,
                        display: "inline-block"
                    },
                    s = !1;
                switch (e('[data-growl-position="' + n.placement.from + "-" + n.placement.align + '"]').each(function() {
                    return r = Math.max(r, parseInt(e(this).css(n.placement.from)) + e(this).outerHeight() + n.spacing)
                }), i[n.placement.from] = r + "px", t.css(i), n.onShow && n.onShow(event), e(n.element).append(t), n.placement.align) {
                    case "center":
                        t.css({
                            left: "50%",
                            marginLeft: -(t.outerWidth() / 2) + "px"
                        });
                        break;
                    case "left":
                        t.css("left", n.offset.x + "px");
                        break;
                    case "right":
                        t.css("right", n.offset.x + "px")
                }
                t.addClass("growl-animated"), t.one("webkitAnimationStart oanimationstart MSAnimationStart animationstart", function() {
                    s = !0
                }), t.one("webkitAnimationEnd oanimationend MSAnimationEnd animationend", function(e) {
                    n.onShown && n.onShown(e)
                }), setTimeout(function() {
                    s || n.onShown && n.onShown(event)
                }, 600)
            },
            d = function(e, t, n) {
                if (e.addClass(t.animate.enter), e.find('[data-growl="dismiss"]').on("click", function() {
                        n.close()
                    }), e.on("mouseover", function() {
                        e.addClass("hovering")
                    }).on("mouseout", function() {
                        e.removeClass("hovering")
                    }), t.delay >= 1) {
                    e.data("growl-delay", t.delay);
                    var r = setInterval(function() {
                        var i = parseInt(e.data("growl-delay")) - t.timer;
                        (!e.hasClass("hovering") && "pause" == t.mouse_over || "pause" != t.mouse_over) && e.data("growl-delay", i), 0 >= i && (clearInterval(r), n.close())
                    }, t.timer)
                }
            };
        f.prototype = {
            update: function(e, t) {
                switch (e) {
                    case "icon":
                        "class" == this.settings.icon_type.toLowerCase() ? (this.$template.find('[data-growl="icon"]').removeClass(this.settings.content.icon), this.$template.find('[data-growl="icon"]').addClass(t)) : this.$template.find('[data-growl="icon"]').is("img") ? this.$template.find('[data-growl="icon"]') : this.$template.find('[data-growl="icon"]').find("img").attr().attr("src", t);
                        break;
                    case "url":
                        this.$template.find('[data-growl="url"]').attr("href", t);
                        break;
                    case "type":
                        this.$template.removeClass("alert-" + this.settings.type), this.$template.addClass("alert-" + t);
                        break;
                    default:
                        this.$template.find('[data-growl="' + e + '"]').html(t)
                }
                return this
            },
            close: function() {
                var t = this.$template,
                    n = this.settings,
                    r = t.css(n.placement.from),
                    i = !1;
                return n.onHide && n.onHide(event), t.addClass(this.settings.animate.exit), t.nextAll('[data-growl-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]').each(function() {
                    e(this).css(n.placement.from, r), r = parseInt(r) + n.spacing + e(this).outerHeight()
                }), t.one("webkitAnimationStart oanimationstart MSAnimationStart animationstart", function() {
                    i = !0
                }), t.one("webkitAnimationEnd oanimationend MSAnimationEnd animationend", function(t) {
                    e(this).remove(), n.onHidden && n.onHidden(t)
                }), setTimeout(function() {
                    i || (t.remove(), n.onHidden && n.onHidden(event))
                }, 100), this
            }
        }, e.growl = function(e, t) {
            if (0 == e && "closeAll" == t.command) return a(t.position), !1;
            if (0 == e) return u(this, t), !1;
            var n = new f(this, e, t);
            return n
        }
    }(jQuery, window, document), Etherface.prototype.connect = function(data, con, dis, confail) {
        var self = this;
        this.socket = io(this.hostname + ":" + this.port, {
            key: this.key,
            app: this.app
        }), this.socket.on("connect", function() {
            self.socket.io && self.socket.io.engine && self.socket.io.engine.transport && (self.type = self.socket.io.engine.transport.name), con && con(), this.on("disconnect", function() {
                dis && dis()
            })
        }), this.socket.on("connect_failed", function() {
            console.log("failed"), confail && confail()
        })
    }, Etherface.prototype.send = function(cmd, args, done) {
        this.socket && this.socket.emit("etherface", {
            cmd: cmd,
            args: args
        }, function(data) {
            done && done(data)
        })
    }, Etherface.prototype.status = function(cmd, args, fn) {
        if ("get" == cmd) this.GET("/status", args, fn);
        else {
            if ("schema" != cmd) return fn("invalid status method");
            this.GET("/schema", args, fn)
        }
    }, Etherface.prototype.peer = function(cmd, args, fn) {
        if ("list" == cmd) this.GET("/peers", args, fn);
        else {
            if ("get" != cmd) return fn("invalid peer method");
            this.GET("/peers/" + args.id, args, fn)
        }
    }, Etherface.prototype.transaction = function(cmd, args, fn) {
        if ("list" == cmd) this.GET("/transactions", args, fn);
        else if ("get" == cmd) this.GET("/transactions/" + args.id, args, fn);
        else if ("simulate" == cmd) this.GET("/transactions/" + args.id + "/simulate", args, fn);
        else {
            if ("create" != cmd) return fn("invalid transaction method");
            this.POST("/transactions/create", args, fn)
        }
    }, Etherface.prototype.contract = function(cmd, args, fn) {
        if ("list" == cmd) this.GET("/contracts", args, fn);
        else if ("create" == cmd) this.PUT("/contracts", args, fn);
        else if ("view" == cmd) this.GET("/contracts/" + args.id, args, fn);
        else if ("update" == cmd) this.POST("/contracts/" + args.id, args, fn);
        else if ("delete" == cmd) this.DELETE("/contracts/" + args.id, args, fn);
        else if ("validate" == cmd) this.GET("/contracts/" + args.id + "/validate", args, fn);
        else if ("compile" == cmd) this.POST("/contracts/" + args.id + "/compile", args, fn);
        else if ("simulate" == cmd) this.POST("/contracts/" + args.id + "/simulate", args, fn);
        else {
            if ("audit" != cmd) return fn("invalid contract method");
            this.POST("/contracts/" + args.id + "/audit", args, fn)
        }
    }, Etherface.prototype.account = function(cmd, args, fn) {
        return fn("invalid account method")
    }, Etherface.prototype.block = function(cmd, args, fn) {
        if ("list" == cmd) this.GET("/blocks", args, fn);
        else {
            if ("view" != cmd) return fn("invalid block method");
            this.GET("/blocks/" + args.id, args, fn)
        }
    }, Etherface.prototype.analytics = function(cmd, args, fn) {
        return "peers" != cmd ? fn("invalid analytics method") : void this.GET("/analytics/peers", args, fn)
    }, Etherface.prototype.ether = function(cmd, args, fn) {
        if ("get" == cmd) this.GET("/ether", args, fn);
        else if ("gas" == cmd) this.GET("/ether/gas", args, fn);
        else {
            if ("faucet" != cmd) return fn("invalid ether method");
            this.POST("/ether/faucet", args, fn)
        }
    }, Etherface.prototype.bitcoin = function(cmd, args, fn) {
        return "get" != cmd ? fn("invalid bitcoin method") : void this.GET("/bitcoin", args, fn)
    }, Etherface.prototype.currency = function(cmd, args, fn) {
        if ("list" == cmd) this.GET("/currencies", args, fn);
        else {
            if ("get" != cmd) return fn("invalid currency method");
            this.GET("/currencies/" + args.sym, args, fn)
        }
    }, Etherface.prototype.dapp = function(cmd, args, fn) {
        if ("list" == cmd) this.GET("/dapps", args, fn);
        else if ("create" == cmd) this.PUT("/dapps", args, fn);
        else if ("view" == cmd) this.GET("/dapps/" + args.id, args, fn);
        else if ("update" == cmd) this.POST("/dapps/" + args.id, args, fn);
        else {
            if ("delete" != cmd) return fn("invalid DApp method");
            this.DELETE("/dapps/" + args.id, args, fn)
        }
    }, Etherface.prototype.GET = function(path, data, done, error) {
        return this.ajax("GET", path, data, done, error)
    }, Etherface.prototype.POST = function(path, data, done, error) {
        return this.ajax("POST", path, data, done, error)
    }, Etherface.prototype.PUT = function(path, data, done, error) {
        return this.ajax("PUT", path, data, done, error)
    }, Etherface.prototype.DELETE = function(path, data, done, error) {
        return this.ajax("DELETE", path, data, done, error)
    }, Etherface.prototype.ajax = function(type, path, data, done, error) {
        if (!this.hostname || "" == this.hostname) return "Error: Etherface not initialized.";
        data.csrfmiddlewaretoken = gCsrfToken, "http://localhost" == this.hostname && (this.hostname = "http://localhost:3000");
        var url = this.hostname + path;
        $.ajax({
            type: type,
            url: url,
            data: data,
            contentType: "application/json",
            cache: !1,
            beforeSend: function() {},
            success: function(data) {
                "error" in data ? (console.log("Etherface backend error on " + type + " " + url + " : " + data), error(data)) : done(data)
            },
            error: function() {
                console.log("Etherface error on " + type + " " + url + " : " + data), error && error(data)
            }
        })
    };
const ETH_UNITS = {
    wei: 1e-18,
    Kwei: 1e-15,
    Mwei: 1e-12,
    Gwei: 1e-9,
    szabo: 1e-6,
    finney: .001,
    ether: 1,
    Kether: 1e3,
    Mether: 1e6,
    Gether: 1e9,
    Tether: 1e12
};
exports.ETH_UNITS = ETH_UNITS;
const ETH_FEES = {
    step: {
        cost: 1,
        desc: "Default amount of gas to pay for an execution cycle."
    },
    stop: {
        cost: 0,
        desc: "Nothing paid for the STOP operation."
    },
    suicide: {
        cost: 0,
        desc: "Nothing paid for the SUICIDE operation."
    },
    sha3: {
        cost: 20,
        desc: "Paid for a SHA3 operation."
    },
    sload: {
        cost: 20,
        desc: "Paid for a SLOAD operation."
    },
    sstore: {
        cost: 100,
        desc: "Paid for a normal SSTORE operation (doubled or waived sometimes)."
    },
    balance: {
        cost: 20,
        desc: "Paid for a BALANCE operation."
    },
    create: {
        cost: 100,
        desc: "Paid for a CREATE operation."
    },
    call: {
        cost: 20,
        desc: "Paid for a CALL operation."
    },
    memory: {
        cost: 1,
        desc: "Paid for every additional word when expanding memory."
    },
    txdata: {
        cost: 5,
        desc: "Paid for every byte of data or code for a transaction."
    },
    transaction: {
        cost: 500,
        desc: "Paid for every transaction."
    }
};
exports.ETH_FEES = ETH_FEES;
const ETH_LANGUAGES = {
    LLL: {
        name: "LLL",
        syntax: "Lisp",
        ext: "lll",
        mode: "ace/mode/lisp",
        desc: "LLL is the Ethereum Low-level Lisp-like Language.",
        specs: "https://github.com/ethereum/cpp-ethereum/wiki/LLL-PoC-6"
    },
    Mutan: {
        name: "Mutan",
        syntax: "C++",
        ext: "mut",
        mode: "ace/mode/c_cpp",
        desc: "Mutan is a C-Like language for the Ethereum project.",
        specs: "https://github.com/ethereum/go-ethereum/wiki/Mutan"
    },
    Serpent: {
        name: "Serpent",
        syntax: "Python",
        ext: "se",
        mode: "ace/mode/python",
        desc: "Serpent is designed to be very similar to Python.",
        specs: "https://github.com/ethereum/wiki/wiki/Serpent"
    },
    Solidity: {
        name: "Solidity",
        syntax: "Java",
        ext: "so",
        mode: "ace/mode/java",
        desc: "The Solidity programming language.",
        specs: ""
    }
};
exports.ETH_LANGUAGES = ETH_LANGUAGES;
const CONTRACT_PRIVACY = {
    "public": {
        html: "<i class='fa fa-globe'></i> Public",
        title: "Viewable by anyone.",
        label: "success"
    },
    unlisted: {
        html: "<i class='fa fa-list-ul'></i> Unlisted",
        title: "Viewable by anyone but not listed anywhwere (secret URL).",
        label: "warning"
    },
    "private": {
        html: "<i class='fa fa-lock'></i> Private",
        title: "Viewable only by you.",
        label: "danger"
    }
};
exports.CONTRACT_PRIVACY = CONTRACT_PRIVACY;
const BTC_UNITS = {
    satoshi: 1e-8,
    bit: 1e-6,
    millibit: .001,
    BTC: 1
};
exports.BTC_UNITS = BTC_UNITS;
const SALE_PRICE = 2e3,
    FIAT_UNITS = {};
var gBtcPrice = 0;
const EDITOR_THEMES = ["ambiance", "chaos", "chrome", "clouds", "clouds_midnight", "cobalt", "crimson_editor", "dawn", "dreamweaver", "eclipse", "github", "idle_fingers", "katzenmilch", "kr_theme", "kuroir", "merbivore", "merbivore_soft", "mono_industrial", "monokai", "pastel_on_dark", "solarized_dark", "solarized_light", "terminal", "textmate", "tomorrow", "tomorrow_night", "tomorrow_night_blue", "tomorrow_night_bright", "tomorrow_night_eighties", "twilight", "vibrant_ink", "xcode"],
    EDITOR_DEFAULT = {
        theme: "idle_fingers",
        fontSize: "12",
        tabSize: "4",
        softTabs: 1,
        wrapMode: 1,
        highlightActiveLine: 1,
        showPrintMargin: 0
    },
    ICON_STATES = {
        "default": {
            icon: "file-o",
            color: ""
        },
        typing: {
            icon: "file-text-o",
            color: ""
        },
        error: {
            icon: "file-o",
            color: ""
        }
    };
exports.ICON_STATES = ICON_STATES;
const ETHERFACE_KEY = "111",
    COMMANDS = {
        status: {
            desc: "Status of Etherface and Ethereum.",
            icon: "circle",
            lex: "ethereum",
            api: "Status",
            args: {},
            ex: []
        },
        block: {
            desc: "Get block info from the blockchain.",
            icon: "cube",
            lex: "blockchain",
            api: "Blocks",
            args: {},
            ex: [{
                a: "",
                c: "get latest block"
            }, {
                a: "1",
                c: "get second block"
            }]
        },
        message: {
            desc: "Listen to Ethereum Network messages.",
            icon: "comment-o",
            lex: "message",
            args: [{
                n: "on|off"
            }, {
                n: "options"
            }],
            ex: [{
                a: "on",
                c: "Receive Ethereum Network messages"
            }, {
                a: "off",
                c: "Don't Receive Ethereum Network messages"
            }]
        },
        contract: {
            desc: "Read, validate, simulate Smart Contracts from the repository.",
            icon: "file-text-o",
            lex: "contract",
            api: "Contracts",
            args: [{
                n: "hash"
            }, {
                n: "operation"
            }],
            ex: [{
                a: "967a1",
                c: "read contract"
            }, {
                a: "967a1 val",
                c: "validate"
            }, {
                a: "967a1 sim",
                c: "simulate"
            }, {
                a: "967a1 evm",
                c: "compile to EVM"
            }]
        },
        faucet: {
            desc: "Get some wei transferred to your address.",
            icon: "tint",
            lex: "ether",
            args: [{
                n: "address"
            }],
            ex: [{
                a: "3a3b343b3bc34a",
                c: "get weis"
            }]
        },
        help: {
            desc: "This command. Alias: 'cmds'",
            icon: "question-circle",
            lex: "ethereum",
            args: {},
            ex: []
        },
        account: {
            desc: "Account explorer.",
            icon: "book",
            lex: "account",
            api: "Accounts",
            args: {},
            ex: []
        },
        peers: {
            desc: "Peers discovered by Etherface.",
            icon: "share-alt",
            lex: "peers",
            api: "Peers",
            tool: "peers",
            args: [{
                n: "index"
            }],
            ex: [{
                a: "",
                c: "see all peers"
            }, {
                a: "1",
                c: "see peer 1 info"
            }]
        },
        api: {
            desc: "Etherface API methods",
            icon: "plug",
            lex: "api",
            api: "Status",
            args: {},
            ex: []
        },
        dapps: {
            desc: "Decentralized Applications repository.",
            icon: "cogs",
            lex: "dapps",
            api: "DApps",
            args: {},
            ex: []
        },
        transaction: {
            desc: "Transaction explorer.",
            icon: "exchange",
            lex: "transaction",
            api: "Transactions",
            args: {},
            ex: []
        },
        bitcoin: {
            desc: "Get Bitcoin price.",
            icon: "bitcoin",
            lex: "bitcoin",
            api: "Bitcion",
            args: [{
                n: "value"
            }],
            ex: [{
                a: "",
                c: "1 BTC to USD,ETH"
            }, {
                a: "200",
                c: "200 BTC to USD,ETH"
            }]
        },
        ether: {
            desc: "Get Ether Price.",
            icon: "tint",
            lex: "ether",
            api: "Ether",
            args: [{
                n: "value"
            }],
            ex: [{
                a: "",
                c: "1 ETH to BTC,USD"
            }, {
                a: "300",
                c: "300 ETH to BTC,USD"
            }]
        },
        currency: {
            desc: "Get Currency price.",
            icon: "money",
            lex: "fiat",
            api: "Currencies",
            args: [{
                n: "symbol"
            }, {
                n: "value"
            }],
            ex: [{
                a: "",
                c: "1 USD$ in BTC,ETH"
            }, {
                a: "cad",
                c: "1 CAD in USD,BTC,ETH"
            }, {
                a: "pen 20",
                c: "20 PEN in USD,BTC,ETH"
            }]
        }
    };
exports.COMMANDS = COMMANDS;
const COMMANDS_ALIAS = {
    btc: "bitcoin",
    cmds: "help",
    eth: "ether",
    cur: "currency",
    sc: "contract",
    blk: "block",
    msg: "message",
    trans: "transaction",
    acc: "account",
    whi: "whisper",
    peer: "peers",
    dapp: "dapps"
};
exports.COMMANDS_ALIAS = COMMANDS_ALIAS;
const LEXICON = {
    block: "",
    blockchain: "",
    ether: "",
    gas: ""
};
exports.LEXICON = LEXICON, gKeywords = ["LLL", "Mutan", "Serpent", "Solidity", "ethereum", "blockchain", "bank", "sidechain", "oracle", "miner", "AlethZero", "ZeroGox", "ethereal", "mist", "platform", "ethdev", "swarm", "whisper", "Vitalik Buterin", "Gavin Wood", "Jeffrey Wilcke", "saltado", "jrbedard", "J.R. BÃ©dard", "Ursium", "unit", "ether", "ETH", "BTC", "wei", "finney", "szabo", "gas", "USD", "money", "cash", "rent", "profit", "revenue", "income", "fiat", "pay", "paid", "category", "template", "coin", "registrar", "currency", "storage", "contract", "smart contract", "crowdfund", "exchange", "dApp", "tools", "converter", "calculator", "gas fees", "gas price", "gas cost", "contract editor", "simulator", "etherface", "API", "terminal", "explorer", "tutorial", "operator", "step", "stop", "suicide", "sha3", "sload", "sstore", "balance", "create", "call", "memory", "txdata", "transaction", "data", "decentralized", "app", "transfer", "genesis", "gini", "meetup", "wiki", "forum", "operation", "account", "peers", "nodes", "network", "key", "private", "public", "reputation", "consensus", "review", "crypto", "block", "fork", "star", "asset", "property", "code", "script", "mintchalk", "bitcoin", "nxt", "blockstream", "viacoin", "mastercoin", "dogecoin", "stellar", "stripe", "coinbase", "bitpay", "chain", "xapo", "namecoin", "altcoin", "counterparty", "XCP", "blockcast"], BigNumber.config({
    ERRORS: !1
}), BigNumber.config({
    EXPONENTIAL_AT: 1e9
});
var etherface = new Etherface({
    key: ETHERFACE_KEY,
    app: "all",
    mode: "post"
});
exports.convertEther = convertEther, exports.figureEtherUnit = figureEtherUnit, exports.convertBTC = convertBTC, exports.figureBTCUnit = figureBTCUnit, exports.convertUSD = convertUSD, exports.getGeoStr = getGeoStr, BigNumber.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (1 == data.length) return data[0];
    var z = "",
        sign = 0 > this ? "-" : "",
        str = data[0].replace(".", ""),
        mag = Number(data[1]) + 1;
    if (0 > mag) {
        for (z = sign + "0."; mag++;) z += "0";
        return z + str.replace(/^\-/, "")
    }
    for (mag -= str.length; mag--;) z += "0";
    return str + z
}, BigNumber.prototype.withCommas = function() {
    var parts = this.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
}, BigNumber.prototype.asExponent = function() {
    return this.toExponential()
}, $(".shareLink").attr("title", "Click to generate a URL in address bar with your inputs so you can save & share."), $(".shareLink").tooltip({
    placement: "bottom"
}), $(".shareLink").click(function() {
    window.location.reload()
}), $.fn.selectRange = function(start, end) {
    return -1 == start && (start = $(this).val().length), end || (end = start), this.each(function() {
        if (this.setSelectionRange) this.focus(), this.setSelectionRange(start, end);
        else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", start), range.select()
        }
    })
}, String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f")
};
