/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var XLSX = {};

function make_xlsx_lib(e) {
    e.version = "0.18.8";
    var r = 1200,
        t = 1252;
    var a;
    var n = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4];
    var i = {
        0: 1252,
        1: 65001,
        2: 65001,
        77: 1e4,
        128: 932,
        129: 949,
        130: 1361,
        134: 936,
        136: 950,
        161: 1253,
        162: 1254,
        163: 1258,
        177: 1255,
        178: 1256,
        186: 1257,
        204: 1251,
        222: 874,
        238: 1250,
        255: 1252,
        69: 6969
    };
    var s = function (e) {
        if (n.indexOf(e) == -1) return;
        t = i[0] = e
    };

    function f() {
        s(1252)
    }
    var o = function (e) {
        r = e;
        s(e)
    };

    function c() {
        o(1200);
        f()
    }

    function l(e) {
        var r = [];
        for (var t = 0, a = e.length; t < a; ++t) r[t] = e.charCodeAt(t);
        return r
    }

    function u(e) {
        var r = [];
        for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8));
        return r.join("")
    }

    function h(e) {
        var r = [];
        for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
        return r.join("")
    }
    var d = function (e) {
        var r = e.charCodeAt(0),
            t = e.charCodeAt(1);
        if (r == 255 && t == 254) return u(e.slice(2));
        if (r == 254 && t == 255) return h(e.slice(2));
        if (r == 65279) return e.slice(1);
        return e
    };
    var v = function Gw(e) {
        return String.fromCharCode(e)
    };
    var p = function jw(e) {
        return String.fromCharCode(e)
    };

    function m(e) {
        a = e;
        o = function (e) {
            r = e;
            s(e)
        };
        d = function (e) {
            if (e.charCodeAt(0) === 255 && e.charCodeAt(1) === 254) {
                return a.utils.decode(1200, l(e.slice(2)))
            }
            return e
        };
        v = function n(e) {
            if (r === 1200) return String.fromCharCode(e);
            return a.utils.decode(r, [e & 255, e >> 8])[0]
        };
        p = function i(e) {
            return a.utils.decode(t, [e])[0]
        };
        ta()
    }
    var b = null;
    var g = true;
    var w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function k(e) {
        var r = "";
        var t = 0,
            a = 0,
            n = 0,
            i = 0,
            s = 0,
            f = 0,
            o = 0;
        for (var c = 0; c < e.length;) {
            t = e.charCodeAt(c++);
            i = t >> 2;
            a = e.charCodeAt(c++);
            s = (t & 3) << 4 | a >> 4;
            n = e.charCodeAt(c++);
            f = (a & 15) << 2 | n >> 6;
            o = n & 63;
            if (isNaN(a)) {
                f = o = 64
            } else if (isNaN(n)) {
                o = 64
            }
            r += w.charAt(i) + w.charAt(s) + w.charAt(f) + w.charAt(o)
        }
        return r
    }

    function T(e) {
        var r = "";
        var t = 0,
            a = 0,
            n = 0,
            i = 0,
            s = 0,
            f = 0,
            o = 0;
        e = e.replace(/[^\w\+\/\=]/g, "");
        for (var c = 0; c < e.length;) {
            i = w.indexOf(e.charAt(c++));
            s = w.indexOf(e.charAt(c++));
            t = i << 2 | s >> 4;
            r += String.fromCharCode(t);
            f = w.indexOf(e.charAt(c++));
            a = (s & 15) << 4 | f >> 2;
            if (f !== 64) {
                r += String.fromCharCode(a)
            }
            o = w.indexOf(e.charAt(c++));
            n = (f & 3) << 6 | o;
            if (o !== 64) {
                r += String.fromCharCode(n)
            }
        }
        return r
    }
    var E = function () {
        return typeof Buffer !== "undefined" && typeof undefined !== "undefined" && typeof {} !== "undefined" && !!{}.node
    }();
    var y = function () {
        if (typeof Buffer !== "undefined") {
            var e = !Buffer.from;
            if (!e) try {
                Buffer.from("foo", "utf8")
            } catch (r) {
                e = true
            }
            return e ? function (e, r) {
                return r ? new Buffer(e, r) : new Buffer(e)
            } : Buffer.from.bind(Buffer)
        }
        return function () {}
    }();

    function S(e) {
        if (E) return Buffer.alloc ? Buffer.alloc(e) : new Buffer(e);
        return typeof Uint8Array != "undefined" ? new Uint8Array(e) : new Array(e)
    }

    function _(e) {
        if (E) return Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e);
        return typeof Uint8Array != "undefined" ? new Uint8Array(e) : new Array(e)
    }
    var A = function Xw(e) {
        if (E) return y(e, "binary");
        return e.split("").map(function (e) {
            return e.charCodeAt(0) & 255
        })
    };

    function x(e) {
        if (typeof ArrayBuffer === "undefined") return A(e);
        var r = new ArrayBuffer(e.length),
            t = new Uint8Array(r);
        for (var a = 0; a != e.length; ++a) t[a] = e.charCodeAt(a) & 255;
        return r
    }

    function C(e) {
        if (Array.isArray(e)) return e.map(function (e) {
            return String.fromCharCode(e)
        }).join("");
        var r = [];
        for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
        return r.join("")
    }

    function R(e) {
        if (typeof Uint8Array === "undefined") throw new Error("Unsupported");
        return new Uint8Array(e)
    }

    function O(e) {
        if (typeof ArrayBuffer == "undefined") throw new Error("Unsupported");
        if (e instanceof ArrayBuffer) return O(new Uint8Array(e));
        var r = new Array(e.length);
        for (var t = 0; t < e.length; ++t) r[t] = e[t];
        return r
    }
    var I = E ? function (e) {
        return Buffer.concat(e.map(function (e) {
            return Buffer.isBuffer(e) ? e : y(e)
        }))
    } : function (e) {
        if (typeof Uint8Array !== "undefined") {
            var r = 0,
                t = 0;
            for (r = 0; r < e.length; ++r) t += e[r].length;
            var a = new Uint8Array(t);
            var n = 0;
            for (r = 0, t = 0; r < e.length; t += n, ++r) {
                n = e[r].length;
                if (e[r] instanceof Uint8Array) a.set(e[r], t);
                else if (typeof e[r] == "string") {
                    throw "wtf"
                } else a.set(new Uint8Array(e[r]), t)
            }
            return a
        }
        return [].concat.apply([], e.map(function (e) {
            return Array.isArray(e) ? e : [].slice.call(e)
        }))
    };

    function N(e) {
        var r = [],
            t = 0,
            a = e.length + 250;
        var n = S(e.length + 255);
        for (var i = 0; i < e.length; ++i) {
            var s = e.charCodeAt(i);
            if (s < 128) n[t++] = s;
            else if (s < 2048) {
                n[t++] = 192 | s >> 6 & 31;
                n[t++] = 128 | s & 63
            } else if (s >= 55296 && s < 57344) {
                s = (s & 1023) + 64;
                var f = e.charCodeAt(++i) & 1023;
                n[t++] = 240 | s >> 8 & 7;
                n[t++] = 128 | s >> 2 & 63;
                n[t++] = 128 | f >> 6 & 15 | (s & 3) << 4;
                n[t++] = 128 | f & 63
            } else {
                n[t++] = 224 | s >> 12 & 15;
                n[t++] = 128 | s >> 6 & 63;
                n[t++] = 128 | s & 63
            }
            if (t > a) {
                r.push(n.slice(0, t));
                t = 0;
                n = S(65535);
                a = 65530
            }
        }
        r.push(n.slice(0, t));
        return I(r)
    }
    var F = /\u0000/g,
        D = /[\u0001-\u0006]/g;

    function P(e) {
        var r = "",
            t = e.length - 1;
        while (t >= 0) r += e.charAt(t--);
        return r
    }

    function L(e, r) {
        var t = "" + e;
        return t.length >= r ? t : Er("0", r - t.length) + t
    }

    function M(e, r) {
        var t = "" + e;
        return t.length >= r ? t : Er(" ", r - t.length) + t
    }

    function U(e, r) {
        var t = "" + e;
        return t.length >= r ? t : t + Er(" ", r - t.length)
    }

    function B(e, r) {
        var t = "" + Math.round(e);
        return t.length >= r ? t : Er("0", r - t.length) + t
    }

    function W(e, r) {
        var t = "" + e;
        return t.length >= r ? t : Er("0", r - t.length) + t
    }
    var H = Math.pow(2, 32);

    function z(e, r) {
        if (e > H || e < -H) return B(e, r);
        var t = Math.round(e);
        return W(t, r)
    }

    function V(e, r) {
        r = r || 0;
        return e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108
    }
    var G = [
        ["Sun", "Sunday"],
        ["Mon", "Monday"],
        ["Tue", "Tuesday"],
        ["Wed", "Wednesday"],
        ["Thu", "Thursday"],
        ["Fri", "Friday"],
        ["Sat", "Saturday"]
    ];
    var j = [
        ["J", "Jan", "January"],
        ["F", "Feb", "February"],
        ["M", "Mar", "March"],
        ["A", "Apr", "April"],
        ["M", "May", "May"],
        ["J", "Jun", "June"],
        ["J", "Jul", "July"],
        ["A", "Aug", "August"],
        ["S", "Sep", "September"],
        ["O", "Oct", "October"],
        ["N", "Nov", "November"],
        ["D", "Dec", "December"]
    ];

    function X(e) {
        if (!e) e = {};
        e[0] = "General";
        e[1] = "0";
        e[2] = "0.00";
        e[3] = "#,##0";
        e[4] = "#,##0.00";
        e[9] = "0%";
        e[10] = "0.00%";
        e[11] = "0.00E+00";
        e[12] = "# ?/?";
        e[13] = "# ??/??";
        e[14] = "m/d/yy";
        e[15] = "d-mmm-yy";
        e[16] = "d-mmm";
        e[17] = "mmm-yy";
        e[18] = "h:mm AM/PM";
        e[19] = "h:mm:ss AM/PM";
        e[20] = "h:mm";
        e[21] = "h:mm:ss";
        e[22] = "m/d/yy h:mm";
        e[37] = "#,##0 ;(#,##0)";
        e[38] = "#,##0 ;[Red](#,##0)";
        e[39] = "#,##0.00;(#,##0.00)";
        e[40] = "#,##0.00;[Red](#,##0.00)";
        e[45] = "mm:ss";
        e[46] = "[h]:mm:ss";
        e[47] = "mmss.0";
        e[48] = "##0.0E+0";
        e[49] = "@";
        e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
        return e
    }
    var Y = {
        0: "General",
        1: "0",
        2: "0.00",
        3: "#,##0",
        4: "#,##0.00",
        9: "0%",
        10: "0.00%",
        11: "0.00E+00",
        12: "# ?/?",
        13: "# ??/??",
        14: "m/d/yy",
        15: "d-mmm-yy",
        16: "d-mmm",
        17: "mmm-yy",
        18: "h:mm AM/PM",
        19: "h:mm:ss AM/PM",
        20: "h:mm",
        21: "h:mm:ss",
        22: "m/d/yy h:mm",
        37: "#,##0 ;(#,##0)",
        38: "#,##0 ;[Red](#,##0)",
        39: "#,##0.00;(#,##0.00)",
        40: "#,##0.00;[Red](#,##0.00)",
        45: "mm:ss",
        46: "[h]:mm:ss",
        47: "mmss.0",
        48: "##0.0E+0",
        49: "@",
        56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
    };
    var K = {
        5: 37,
        6: 38,
        7: 39,
        8: 40,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 14,
        28: 14,
        29: 14,
        30: 14,
        31: 14,
        50: 14,
        51: 14,
        52: 14,
        53: 14,
        54: 14,
        55: 14,
        56: 14,
        57: 14,
        58: 14,
        59: 1,
        60: 2,
        61: 3,
        62: 4,
        67: 9,
        68: 10,
        69: 12,
        70: 13,
        71: 14,
        72: 14,
        73: 15,
        74: 16,
        75: 17,
        76: 20,
        77: 21,
        78: 22,
        79: 45,
        80: 46,
        81: 47,
        82: 0
    };
    var J = {
        5: '"$"#,##0_);\\("$"#,##0\\)',
        63: '"$"#,##0_);\\("$"#,##0\\)',
        6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
        42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
        43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
        44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
    };

    function q(e, r, t) {
        var a = e < 0 ? -1 : 1;
        var n = e * a;
        var i = 0,
            s = 1,
            f = 0;
        var o = 1,
            c = 0,
            l = 0;
        var u = Math.floor(n);
        while (c < r) {
            u = Math.floor(n);
            f = u * s + i;
            l = u * c + o;
            if (n - u < 5e-8) break;
            n = 1 / (n - u);
            i = s;
            s = f;
            o = c;
            c = l
        }
        if (l > r) {
            if (c > r) {
                l = o;
                f = i
            } else {
                l = c;
                f = s
            }
        }
        if (!t) return [0, a * f, l];
        var h = Math.floor(a * f / l);
        return [h, a * f - h * l, l]
    }

    function Z(e, r, t) {
        if (e > 2958465 || e < 0) return null;
        var a = e | 0,
            n = Math.floor(86400 * (e - a)),
            i = 0;
        var s = [];
        var f = {
            D: a,
            T: n,
            u: 86400 * (e - a) - n,
            y: 0,
            m: 0,
            d: 0,
            H: 0,
            M: 0,
            S: 0,
            q: 0
        };
        if (Math.abs(f.u) < 1e-6) f.u = 0;
        if (r && r.date1904) a += 1462;
        if (f.u > .9999) {
            f.u = 0;
            if (++n == 86400) {
                f.T = n = 0;
                ++a;
                ++f.D
            }
        }
        if (a === 60) {
            s = t ? [1317, 10, 29] : [1900, 2, 29];
            i = 3
        } else if (a === 0) {
            s = t ? [1317, 8, 29] : [1900, 1, 0];
            i = 6
        } else {
            if (a > 60) --a;
            var o = new Date(1900, 0, 1);
            o.setDate(o.getDate() + a - 1);
            s = [o.getFullYear(), o.getMonth() + 1, o.getDate()];
            i = o.getDay();
            if (a < 60) i = (i + 6) % 7;
            if (t) i = ce(o, s)
        }
        f.y = s[0];
        f.m = s[1];
        f.d = s[2];
        f.S = n % 60;
        n = Math.floor(n / 60);
        f.M = n % 60;
        n = Math.floor(n / 60);
        f.H = n;
        f.q = i;
        return f
    }
    var Q = new Date(1899, 11, 31, 0, 0, 0);
    var ee = Q.getTime();
    var re = new Date(1900, 2, 1, 0, 0, 0);

    function te(e, r) {
        var t = e.getTime();
        if (r) t -= 1461 * 24 * 60 * 60 * 1e3;
        else if (e >= re) t += 24 * 60 * 60 * 1e3;
        return (t - (ee + (e.getTimezoneOffset() - Q.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
    }

    function ae(e) {
        return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1")
    }

    function ne(e) {
        if (e.indexOf("E") == -1) return e;
        return e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2")
    }

    function ie(e) {
        var r = e < 0 ? 12 : 11;
        var t = ae(e.toFixed(12));
        if (t.length <= r) return t;
        t = e.toPrecision(10);
        if (t.length <= r) return t;
        return e.toExponential(5)
    }

    function se(e) {
        var r = ae(e.toFixed(11));
        return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r
    }

    function fe(e) {
        var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
            t;
        if (r >= -4 && r <= -1) t = e.toPrecision(10 + r);
        else if (Math.abs(r) <= 9) t = ie(e);
        else if (r === 10) t = e.toFixed(10).substr(0, 12);
        else t = se(e);
        return ae(ne(t.toUpperCase()))
    }

    function oe(e, r) {
        switch (typeof e) {
            case "string":
                return e;
            case "boolean":
                return e ? "TRUE" : "FALSE";
            case "number":
                return (e | 0) === e ? e.toString(10) : fe(e);
            case "undefined":
                return "";
            case "object":
                if (e == null) return "";
                if (e instanceof Date) return We(14, te(e, r && r.date1904), r);
        }
        throw new Error("unsupported value in General format: " + e)
    }

    function ce(e, r) {
        r[0] -= 581;
        var t = e.getDay();
        if (e < 60) t = (t + 6) % 7;
        return t
    }

    function le(e, r, t, a) {
        var n = "",
            i = 0,
            s = 0,
            f = t.y,
            o, c = 0;
        switch (e) {
            case 98:
                f = t.y + 543;
            case 121:
                switch (r.length) {
                    case 1:
                        ;
                    case 2:
                        o = f % 100;
                        c = 2;
                        break;
                    default:
                        o = f % 1e4;
                        c = 4;
                        break;
                }
                break;
            case 109:
                switch (r.length) {
                    case 1:
                        ;
                    case 2:
                        o = t.m;
                        c = r.length;
                        break;
                    case 3:
                        return j[t.m - 1][1];
                    case 5:
                        return j[t.m - 1][0];
                    default:
                        return j[t.m - 1][2];
                }
                break;
            case 100:
                switch (r.length) {
                    case 1:
                        ;
                    case 2:
                        o = t.d;
                        c = r.length;
                        break;
                    case 3:
                        return G[t.q][0];
                    default:
                        return G[t.q][1];
                }
                break;
            case 104:
                switch (r.length) {
                    case 1:
                        ;
                    case 2:
                        o = 1 + (t.H + 11) % 12;
                        c = r.length;
                        break;
                    default:
                        throw "bad hour format: " + r;
                }
                break;
            case 72:
                switch (r.length) {
                    case 1:
                        ;
                    case 2:
                        o = t.H;
                        c = r.length;
                        break;
                    default:
                        throw "bad hour format: " + r;
                }
                break;
            case 77:
                switch (r.length) {
                    case 1:
                        ;
                    case 2:
                        o = t.M;
                        c = r.length;
                        break;
                    default:
                        throw "bad minute format: " + r;
                }
                break;
            case 115:
                if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
                if (t.u === 0 && (r == "s" || r == "ss")) return L(t.S, r.length);
                if (a >= 2) s = a === 3 ? 1e3 : 100;
                else s = a === 1 ? 10 : 1;
                i = Math.round(s * (t.S + t.u));
                if (i >= 60 * s) i = 0;
                if (r === "s") return i === 0 ? "0" : "" + i / s;
                n = L(i, 2 + a);
                if (r === "ss") return n.substr(0, 2);
                return "." + n.substr(2, r.length - 1);
            case 90:
                switch (r) {
                    case "[h]":
                        ;
                    case "[hh]":
                        o = t.D * 24 + t.H;
                        break;
                    case "[m]":
                        ;
                    case "[mm]":
                        o = (t.D * 24 + t.H) * 60 + t.M;
                        break;
                    case "[s]":
                        ;
                    case "[ss]":
                        o = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
                        break;
                    default:
                        throw "bad abstime format: " + r;
                }
                c = r.length === 3 ? 1 : 2;
                break;
            case 101:
                o = f;
                c = 1;
                break;
        }
        var l = c > 0 ? L(o, c) : "";
        return l
    }

    function ue(e) {
        var r = 3;
        if (e.length <= r) return e;
        var t = e.length % r,
            a = e.substr(0, t);
        for (; t != e.length; t += r) a += (a.length > 0 ? "," : "") + e.substr(t, r);
        return a
    }
    var he = /%/g;

    function de(e, r, t) {
        var a = r.replace(he, ""),
            n = r.length - a.length;
        return Ne(e, a, t * Math.pow(10, 2 * n)) + Er("%", n)
    }

    function ve(e, r, t) {
        var a = r.length - 1;
        while (r.charCodeAt(a - 1) === 44) --a;
        return Ne(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
    }

    function pe(e, r) {
        var t;
        var a = e.indexOf("E") - e.indexOf(".") - 1;
        if (e.match(/^#+0.0E\+0$/)) {
            if (r == 0) return "0.0E+0";
            else if (r < 0) return "-" + pe(e, -r);
            var n = e.indexOf(".");
            if (n === -1) n = e.indexOf("E");
            var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
            if (i < 0) i += n;
            t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
            if (t.indexOf("e") === -1) {
                var s = Math.floor(Math.log(r) * Math.LOG10E);
                if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
                else t += "E+" + (s - i);
                while (t.substr(0, 2) === "0.") {
                    t = t.charAt(0) + t.substr(2, n) + "." + t.substr(2 + n);
                    t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")
                }
                t = t.replace(/\+-/, "-")
            }
            t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, r, t, a) {
                return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
            })
        } else t = r.toExponential(a);
        if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
        if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
        return t.replace("e", "E")
    }
    var me = /# (\?+)( ?)\/( ?)(\d+)/;

    function be(e, r, t) {
        var a = parseInt(e[4], 10),
            n = Math.round(r * a),
            i = Math.floor(n / a);
        var s = n - i * a,
            f = a;
        return t + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Er(" ", e[1].length + 1 + e[4].length) : M(s, e[1].length) + e[2] + "/" + e[3] + L(f, e[4].length))
    }

    function ge(e, r, t) {
        return t + (r === 0 ? "" : "" + r) + Er(" ", e[1].length + 2 + e[4].length)
    }
    var we = /^#*0*\.([0#]+)/;
    var ke = /\).*[0#]/;
    var Te = /\(###\) ###\\?-####/;

    function Ee(e) {
        var r = "",
            t;
        for (var a = 0; a != e.length; ++a) switch (t = e.charCodeAt(a)) {
            case 35:
                break;
            case 63:
                r += " ";
                break;
            case 48:
                r += "0";
                break;
            default:
                r += String.fromCharCode(t);
        }
        return r
    }

    function ye(e, r) {
        var t = Math.pow(10, r);
        return "" + Math.round(e * t) / t
    }

    function Se(e, r) {
        var t = e - Math.floor(e),
            a = Math.pow(10, r);
        if (r < ("" + Math.round(t * a)).length) return 0;
        return Math.round(t * a)
    }

    function _e(e, r) {
        if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
            return 1
        }
        return 0
    }

    function Ae(e) {
        if (e < 2147483647 && e > -2147483648) return "" + (e >= 0 ? e | 0 : e - 1 | 0);
        return "" + Math.floor(e)
    }

    function xe(e, r, t) {
        if (e.charCodeAt(0) === 40 && !r.match(ke)) {
            var a = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
            if (t >= 0) return xe("n", a, t);
            return "(" + xe("n", a, -t) + ")"
        }
        if (r.charCodeAt(r.length - 1) === 44) return ve(e, r, t);
        if (r.indexOf("%") !== -1) return de(e, r, t);
        if (r.indexOf("E") !== -1) return pe(r, t);
        if (r.charCodeAt(0) === 36) return "$" + xe(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
        var n;
        var i, s, f, o = Math.abs(t),
            c = t < 0 ? "-" : "";
        if (r.match(/^00+$/)) return c + z(o, r.length);
        if (r.match(/^[#?]+$/)) {
            n = z(t, 0);
            if (n === "0") n = "";
            return n.length > r.length ? n : Ee(r.substr(0, r.length - n.length)) + n
        }
        if (i = r.match(me)) return be(i, o, c);
        if (r.match(/^#+0+$/)) return c + z(o, r.length - r.indexOf("0"));
        if (i = r.match(we)) {
            n = ye(t, i[1].length).replace(/^([^\.]+)$/, "$1." + Ee(i[1])).replace(/\.$/, "." + Ee(i[1])).replace(/\.(\d*)$/, function (e, r) {
                return "." + r + Er("0", Ee(i[1]).length - r.length)
            });
            return r.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".")
        }
        r = r.replace(/^#+([0.])/, "$1");
        if (i = r.match(/^(0*)\.(#*)$/)) {
            return c + ye(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".")
        }
        if (i = r.match(/^#{1,3},##0(\.?)$/)) return c + ue(z(o, 0));
        if (i = r.match(/^#,##0\.([#0]*0)$/)) {
            return t < 0 ? "-" + xe(e, r, -t) : ue("" + (Math.floor(t) + _e(t, i[1].length))) + "." + L(Se(t, i[1].length), i[1].length)
        }
        if (i = r.match(/^#,#*,#0/)) return xe(e, r.replace(/^#,#*,/, ""), t);
        if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/)) {
            n = P(xe(e, r.replace(/[\\-]/g, ""), t));
            s = 0;
            return P(P(r.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
                return s < n.length ? n.charAt(s++) : e === "0" ? "0" : ""
            }))
        }
        if (r.match(Te)) {
            n = xe(e, "##########", t);
            return "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6)
        }
        var l = "";
        if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
            s = Math.min(i[4].length, 7);
            f = q(o, Math.pow(10, s) - 1, false);
            n = "" + c;
            l = Ne("n", i[1], f[1]);
            if (l.charAt(l.length - 1) == " ") l = l.substr(0, l.length - 1) + "0";
            n += l + i[2] + "/" + i[3];
            l = U(f[2], s);
            if (l.length < i[4].length) l = Ee(i[4].substr(i[4].length - l.length)) + l;
            n += l;
            return n
        }
        if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
            s = Math.min(Math.max(i[1].length, i[4].length), 7);
            f = q(o, Math.pow(10, s) - 1, true);
            return c + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? M(f[1], s) + i[2] + "/" + i[3] + U(f[2], s) : Er(" ", 2 * s + 1 + i[2].length + i[3].length))
        }
        if (i = r.match(/^[#0?]+$/)) {
            n = z(t, 0);
            if (r.length <= n.length) return n;
            return Ee(r.substr(0, r.length - n.length)) + n
        }
        if (i = r.match(/^([#0?]+)\.([#0]+)$/)) {
            n = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1");
            s = n.indexOf(".");
            var u = r.indexOf(".") - s,
                h = r.length - n.length - u;
            return Ee(r.substr(0, u) + n + r.substr(r.length - h))
        }
        if (i = r.match(/^00,000\.([#0]*0)$/)) {
            s = Se(t, i[1].length);
            return t < 0 ? "-" + xe(e, r, -t) : ue(Ae(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
                return "00," + (e.length < 3 ? L(0, 3 - e.length) : "") + e
            }) + "." + L(s, i[1].length)
        }
        switch (r) {
            case "###,##0.00":
                return xe(e, "#,##0.00", t);
            case "###,###":
                ;
            case "##,###":
                ;
            case "#,###":
                var d = ue(z(o, 0));
                return d !== "0" ? c + d : "";
            case "###,###.00":
                return xe(e, "###,##0.00", t).replace(/^0\./, ".");
            case "#,###.00":
                return xe(e, "#,##0.00", t).replace(/^0\./, ".");
            default:
                ;
        }
        throw new Error("unsupported format |" + r + "|")
    }

    function Ce(e, r, t) {
        var a = r.length - 1;
        while (r.charCodeAt(a - 1) === 44) --a;
        return Ne(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
    }

    function Re(e, r, t) {
        var a = r.replace(he, ""),
            n = r.length - a.length;
        return Ne(e, a, t * Math.pow(10, 2 * n)) + Er("%", n)
    }

    function Oe(e, r) {
        var t;
        var a = e.indexOf("E") - e.indexOf(".") - 1;
        if (e.match(/^#+0.0E\+0$/)) {
            if (r == 0) return "0.0E+0";
            else if (r < 0) return "-" + Oe(e, -r);
            var n = e.indexOf(".");
            if (n === -1) n = e.indexOf("E");
            var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
            if (i < 0) i += n;
            t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
            if (!t.match(/[Ee]/)) {
                var s = Math.floor(Math.log(r) * Math.LOG10E);
                if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
                else t += "E+" + (s - i);
                t = t.replace(/\+-/, "-")
            }
            t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, r, t, a) {
                return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
            })
        } else t = r.toExponential(a);
        if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
        if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
        return t.replace("e", "E")
    }

    function Ie(e, r, t) {
        if (e.charCodeAt(0) === 40 && !r.match(ke)) {
            var a = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
            if (t >= 0) return Ie("n", a, t);
            return "(" + Ie("n", a, -t) + ")"
        }
        if (r.charCodeAt(r.length - 1) === 44) return Ce(e, r, t);
        if (r.indexOf("%") !== -1) return Re(e, r, t);
        if (r.indexOf("E") !== -1) return Oe(r, t);
        if (r.charCodeAt(0) === 36) return "$" + Ie(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
        var n;
        var i, s, f, o = Math.abs(t),
            c = t < 0 ? "-" : "";
        if (r.match(/^00+$/)) return c + L(o, r.length);
        if (r.match(/^[#?]+$/)) {
            n = "" + t;
            if (t === 0) n = "";
            return n.length > r.length ? n : Ee(r.substr(0, r.length - n.length)) + n
        }
        if (i = r.match(me)) return ge(i, o, c);
        if (r.match(/^#+0+$/)) return c + L(o, r.length - r.indexOf("0"));
        if (i = r.match(we)) {
            n = ("" + t).replace(/^([^\.]+)$/, "$1." + Ee(i[1])).replace(/\.$/, "." + Ee(i[1]));
            n = n.replace(/\.(\d*)$/, function (e, r) {
                return "." + r + Er("0", Ee(i[1]).length - r.length)
            });
            return r.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".")
        }
        r = r.replace(/^#+([0.])/, "$1");
        if (i = r.match(/^(0*)\.(#*)$/)) {
            return c + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".")
        }
        if (i = r.match(/^#{1,3},##0(\.?)$/)) return c + ue("" + o);
        if (i = r.match(/^#,##0\.([#0]*0)$/)) {
            return t < 0 ? "-" + Ie(e, r, -t) : ue("" + t) + "." + Er("0", i[1].length)
        }
        if (i = r.match(/^#,#*,#0/)) return Ie(e, r.replace(/^#,#*,/, ""), t);
        if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/)) {
            n = P(Ie(e, r.replace(/[\\-]/g, ""), t));
            s = 0;
            return P(P(r.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
                return s < n.length ? n.charAt(s++) : e === "0" ? "0" : ""
            }))
        }
        if (r.match(Te)) {
            n = Ie(e, "##########", t);
            return "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6)
        }
        var l = "";
        if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
            s = Math.min(i[4].length, 7);
            f = q(o, Math.pow(10, s) - 1, false);
            n = "" + c;
            l = Ne("n", i[1], f[1]);
            if (l.charAt(l.length - 1) == " ") l = l.substr(0, l.length - 1) + "0";
            n += l + i[2] + "/" + i[3];
            l = U(f[2], s);
            if (l.length < i[4].length) l = Ee(i[4].substr(i[4].length - l.length)) + l;
            n += l;
            return n
        }
        if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
            s = Math.min(Math.max(i[1].length, i[4].length), 7);
            f = q(o, Math.pow(10, s) - 1, true);
            return c + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? M(f[1], s) + i[2] + "/" + i[3] + U(f[2], s) : Er(" ", 2 * s + 1 + i[2].length + i[3].length))
        }
        if (i = r.match(/^[#0?]+$/)) {
            n = "" + t;
            if (r.length <= n.length) return n;
            return Ee(r.substr(0, r.length - n.length)) + n
        }
        if (i = r.match(/^([#0]+)\.([#0]+)$/)) {
            n = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1");
            s = n.indexOf(".");
            var u = r.indexOf(".") - s,
                h = r.length - n.length - u;
            return Ee(r.substr(0, u) + n + r.substr(r.length - h))
        }
        if (i = r.match(/^00,000\.([#0]*0)$/)) {
            return t < 0 ? "-" + Ie(e, r, -t) : ue("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
                return "00," + (e.length < 3 ? L(0, 3 - e.length) : "") + e
            }) + "." + L(0, i[1].length)
        }
        switch (r) {
            case "###,###":
                ;
            case "##,###":
                ;
            case "#,###":
                var d = ue("" + o);
                return d !== "0" ? c + d : "";
            default:
                if (r.match(/\.[0#?]*$/)) return Ie(e, r.slice(0, r.lastIndexOf(".")), t) + Ee(r.slice(r.lastIndexOf(".")));
        }
        throw new Error("unsupported format |" + r + "|")
    }

    function Ne(e, r, t) {
        return (t | 0) === t ? Ie(e, r, t) : xe(e, r, t)
    }

    function Fe(e) {
        var r = [];
        var t = false;
        for (var a = 0, n = 0; a < e.length; ++a) switch (e.charCodeAt(a)) {
            case 34:
                t = !t;
                break;
            case 95:
                ;
            case 42:
                ;
            case 92:
                ++a;
                break;
            case 59:
                r[r.length] = e.substr(n, a - n);
                n = a + 1;
        }
        r[r.length] = e.substr(n);
        if (t === true) throw new Error("Format |" + e + "| unterminated string ");
        return r
    }
    var De = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;

    function Pe(e) {
        var r = 0,
            t = "",
            a = "";
        while (r < e.length) {
            switch (t = e.charAt(r)) {
                case "G":
                    if (V(e, r)) r += 6;
                    r++;
                    break;
                case '"':
                    for (; e.charCodeAt(++r) !== 34 && r < e.length;) {}++r;
                    break;
                case "\\":
                    r += 2;
                    break;
                case "_":
                    r += 2;
                    break;
                case "@":
                    ++r;
                    break;
                case "B":
                    ;
                case "b":
                    if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return true;
                case "M":
                    ;
                case "D":
                    ;
                case "Y":
                    ;
                case "H":
                    ;
                case "S":
                    ;
                case "E":
                    ;
                case "m":
                    ;
                case "d":
                    ;
                case "y":
                    ;
                case "h":
                    ;
                case "s":
                    ;
                case "e":
                    ;
                case "g":
                    return true;
                case "A":
                    ;
                case "a":
                    ;
                case "上":
                    if (e.substr(r, 3).toUpperCase() === "A/P") return true;
                    if (e.substr(r, 5).toUpperCase() === "AM/PM") return true;
                    if (e.substr(r, 5).toUpperCase() === "上午/下午") return true;
                    ++r;
                    break;
                case "[":
                    a = t;
                    while (e.charAt(r++) !== "]" && r < e.length) a += e.charAt(r);
                    if (a.match(De)) return true;
                    break;
                case ".":
                    ;
                case "0":
                    ;
                case "#":
                    while (r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1)) {}
                    break;
                case "?":
                    while (e.charAt(++r) === t) {}
                    break;
                case "*":
                    ++r;
                    if (e.charAt(r) == " " || e.charAt(r) == "*") ++r;
                    break;
                case "(":
                    ;
                case ")":
                    ++r;
                    break;
                case "1":
                    ;
                case "2":
                    ;
                case "3":
                    ;
                case "4":
                    ;
                case "5":
                    ;
                case "6":
                    ;
                case "7":
                    ;
                case "8":
                    ;
                case "9":
                    while (r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1) {}
                    break;
                case " ":
                    ++r;
                    break;
                default:
                    ++r;
                    break;
            }
        }
        return false
    }

    function Le(e, r, t, a) {
        var n = [],
            i = "",
            s = 0,
            f = "",
            o = "t",
            c, l, u;
        var h = "H";
        while (s < e.length) {
            switch (f = e.charAt(s)) {
                case "G":
                    if (!V(e, s)) throw new Error("unrecognized character " + f + " in " + e);
                    n[n.length] = {
                        t: "G",
                        v: "General"
                    };
                    s += 7;
                    break;
                case '"':
                    for (i = "";
                        (u = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(u);
                    n[n.length] = {
                        t: "t",
                        v: i
                    };
                    ++s;
                    break;
                case "\\":
                    var d = e.charAt(++s),
                        v = d === "(" || d === ")" ? d : "t";
                    n[n.length] = {
                        t: v,
                        v: d
                    };
                    ++s;
                    break;
                case "_":
                    n[n.length] = {
                        t: "t",
                        v: " "
                    };
                    s += 2;
                    break;
                case "@":
                    n[n.length] = {
                        t: "T",
                        v: r
                    };
                    ++s;
                    break;
                case "B":
                    ;
                case "b":
                    if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
                        if (c == null) {
                            c = Z(r, t, e.charAt(s + 1) === "2");
                            if (c == null) return ""
                        }
                        n[n.length] = {
                            t: "X",
                            v: e.substr(s, 2)
                        };
                        o = f;
                        s += 2;
                        break
                    };
                case "M":
                    ;
                case "D":
                    ;
                case "Y":
                    ;
                case "H":
                    ;
                case "S":
                    ;
                case "E":
                    f = f.toLowerCase();
                case "m":
                    ;
                case "d":
                    ;
                case "y":
                    ;
                case "h":
                    ;
                case "s":
                    ;
                case "e":
                    ;
                case "g":
                    if (r < 0) return "";
                    if (c == null) {
                        c = Z(r, t);
                        if (c == null) return ""
                    }
                    i = f;
                    while (++s < e.length && e.charAt(s).toLowerCase() === f) i += f;
                    if (f === "m" && o.toLowerCase() === "h") f = "M";
                    if (f === "h") f = h;
                    n[n.length] = {
                        t: f,
                        v: i
                    };
                    o = f;
                    break;
                case "A":
                    ;
                case "a":
                    ;
                case "上":
                    var p = {
                        t: f,
                        v: f
                    };
                    if (c == null) c = Z(r, t);
                    if (e.substr(s, 3).toUpperCase() === "A/P") {
                        if (c != null) p.v = c.H >= 12 ? e.charAt(s + 2) : f;
                        p.t = "T";
                        h = "h";
                        s += 3
                    } else if (e.substr(s, 5).toUpperCase() === "AM/PM") {
                        if (c != null) p.v = c.H >= 12 ? "PM" : "AM";
                        p.t = "T";
                        s += 5;
                        h = "h"
                    } else if (e.substr(s, 5).toUpperCase() === "上午/下午") {
                        if (c != null) p.v = c.H >= 12 ? "下午" : "上午";
                        p.t = "T";
                        s += 5;
                        h = "h"
                    } else {
                        p.t = "t";
                        ++s
                    }
                    if (c == null && p.t === "T") return "";
                    n[n.length] = p;
                    o = f;
                    break;
                case "[":
                    i = f;
                    while (e.charAt(s++) !== "]" && s < e.length) i += e.charAt(s);
                    if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
                    if (i.match(De)) {
                        if (c == null) {
                            c = Z(r, t);
                            if (c == null) return ""
                        }
                        n[n.length] = {
                            t: "Z",
                            v: i.toLowerCase()
                        };
                        o = i.charAt(1)
                    } else if (i.indexOf("$") > -1) {
                        i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$";
                        if (!Pe(e)) n[n.length] = {
                            t: "t",
                            v: i
                        }
                    }
                    break;
                case ".":
                    if (c != null) {
                        i = f;
                        while (++s < e.length && (f = e.charAt(s)) === "0") i += f;
                        n[n.length] = {
                            t: "s",
                            v: i
                        };
                        break
                    };
                case "0":
                    ;
                case "#":
                    i = f;
                    while (++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1) i += f;
                    n[n.length] = {
                        t: "n",
                        v: i
                    };
                    break;
                case "?":
                    i = f;
                    while (e.charAt(++s) === f) i += f;
                    n[n.length] = {
                        t: f,
                        v: i
                    };
                    o = f;
                    break;
                case "*":
                    ++s;
                    if (e.charAt(s) == " " || e.charAt(s) == "*") ++s;
                    break;
                case "(":
                    ;
                case ")":
                    n[n.length] = {
                        t: a === 1 ? "t" : f,
                        v: f
                    };
                    ++s;
                    break;
                case "1":
                    ;
                case "2":
                    ;
                case "3":
                    ;
                case "4":
                    ;
                case "5":
                    ;
                case "6":
                    ;
                case "7":
                    ;
                case "8":
                    ;
                case "9":
                    i = f;
                    while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1) i += e.charAt(s);
                    n[n.length] = {
                        t: "D",
                        v: i
                    };
                    break;
                case " ":
                    n[n.length] = {
                        t: f,
                        v: f
                    };
                    ++s;
                    break;
                case "$":
                    n[n.length] = {
                        t: "t",
                        v: "$"
                    };
                    ++s;
                    break;
                default:
                    if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
                    n[n.length] = {
                        t: "t",
                        v: f
                    };
                    ++s;
                    break;
            }
        }
        var m = 0,
            b = 0,
            g;
        for (s = n.length - 1, o = "t"; s >= 0; --s) {
            switch (n[s].t) {
                case "h":
                    ;
                case "H":
                    n[s].t = h;
                    o = "h";
                    if (m < 1) m = 1;
                    break;
                case "s":
                    if (g = n[s].v.match(/\.0+$/)) b = Math.max(b, g[0].length - 1);
                    if (m < 3) m = 3;
                case "d":
                    ;
                case "y":
                    ;
                case "M":
                    ;
                case "e":
                    o = n[s].t;
                    break;
                case "m":
                    if (o === "s") {
                        n[s].t = "M";
                        if (m < 2) m = 2
                    }
                    break;
                case "X":
                    break;
                case "Z":
                    if (m < 1 && n[s].v.match(/[Hh]/)) m = 1;
                    if (m < 2 && n[s].v.match(/[Mm]/)) m = 2;
                    if (m < 3 && n[s].v.match(/[Ss]/)) m = 3;
            }
        }
        switch (m) {
            case 0:
                break;
            case 1:
                if (c.u >= .5) {
                    c.u = 0;
                    ++c.S
                }
                if (c.S >= 60) {
                    c.S = 0;
                    ++c.M
                }
                if (c.M >= 60) {
                    c.M = 0;
                    ++c.H
                }
                break;
            case 2:
                if (c.u >= .5) {
                    c.u = 0;
                    ++c.S
                }
                if (c.S >= 60) {
                    c.S = 0;
                    ++c.M
                }
                break;
        }
        var w = "",
            k;
        for (s = 0; s < n.length; ++s) {
            switch (n[s].t) {
                case "t":
                    ;
                case "T":
                    ;
                case " ":
                    ;
                case "D":
                    break;
                case "X":
                    n[s].v = "";
                    n[s].t = ";";
                    break;
                case "d":
                    ;
                case "m":
                    ;
                case "y":
                    ;
                case "h":
                    ;
                case "H":
                    ;
                case "M":
                    ;
                case "s":
                    ;
                case "e":
                    ;
                case "b":
                    ;
                case "Z":
                    n[s].v = le(n[s].t.charCodeAt(0), n[s].v, c, b);
                    n[s].t = "t";
                    break;
                case "n":
                    ;
                case "?":
                    k = s + 1;
                    while (n[k] != null && ((f = n[k].t) === "?" || f === "D" || (f === " " || f === "t") && n[k + 1] != null && (n[k + 1].t === "?" || n[k + 1].t === "t" && n[k + 1].v === "/") || n[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (n[k].v === "/" || n[k].v === " " && n[k + 1] != null && n[k + 1].t == "?"))) {
                        n[s].v += n[k].v;
                        n[k] = {
                            v: "",
                            t: ";"
                        };
                        ++k
                    }
                    w += n[s].v;
                    s = k - 1;
                    break;
                case "G":
                    n[s].t = "t";
                    n[s].v = oe(r, t);
                    break;
            }
        }
        var T = "",
            E, y;
        if (w.length > 0) {
            if (w.charCodeAt(0) == 40) {
                E = r < 0 && w.charCodeAt(0) === 45 ? -r : r;
                y = Ne("n", w, E)
            } else {
                E = r < 0 && a > 1 ? -r : r;
                y = Ne("n", w, E);
                if (E < 0 && n[0] && n[0].t == "t") {
                    y = y.substr(1);
                    n[0].v = "-" + n[0].v
                }
            }
            k = y.length - 1;
            var S = n.length;
            for (s = 0; s < n.length; ++s)
                if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
                    S = s;
                    break
                } var _ = n.length;
            if (S === n.length && y.indexOf("E") === -1) {
                for (s = n.length - 1; s >= 0; --s) {
                    if (n[s] == null || "n?".indexOf(n[s].t) === -1) continue;
                    if (k >= n[s].v.length - 1) {
                        k -= n[s].v.length;
                        n[s].v = y.substr(k + 1, n[s].v.length)
                    } else if (k < 0) n[s].v = "";
                    else {
                        n[s].v = y.substr(0, k + 1);
                        k = -1
                    }
                    n[s].t = "t";
                    _ = s
                }
                if (k >= 0 && _ < n.length) n[_].v = y.substr(0, k + 1) + n[_].v
            } else if (S !== n.length && y.indexOf("E") === -1) {
                k = y.indexOf(".") - 1;
                for (s = S; s >= 0; --s) {
                    if (n[s] == null || "n?".indexOf(n[s].t) === -1) continue;
                    l = n[s].v.indexOf(".") > -1 && s === S ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1;
                    T = n[s].v.substr(l + 1);
                    for (; l >= 0; --l) {
                        if (k >= 0 && (n[s].v.charAt(l) === "0" || n[s].v.charAt(l) === "#")) T = y.charAt(k--) + T
                    }
                    n[s].v = T;
                    n[s].t = "t";
                    _ = s
                }
                if (k >= 0 && _ < n.length) n[_].v = y.substr(0, k + 1) + n[_].v;
                k = y.indexOf(".") + 1;
                for (s = S; s < n.length; ++s) {
                    if (n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== S) continue;
                    l = n[s].v.indexOf(".") > -1 && s === S ? n[s].v.indexOf(".") + 1 : 0;
                    T = n[s].v.substr(0, l);
                    for (; l < n[s].v.length; ++l) {
                        if (k < y.length) T += y.charAt(k++)
                    }
                    n[s].v = T;
                    n[s].t = "t";
                    _ = s
                }
            }
        }
        for (s = 0; s < n.length; ++s)
            if (n[s] != null && "n?".indexOf(n[s].t) > -1) {
                E = a > 1 && r < 0 && s > 0 && n[s - 1].v === "-" ? -r : r;
                n[s].v = Ne(n[s].t, n[s].v, E);
                n[s].t = "t"
            } var A = "";
        for (s = 0; s !== n.length; ++s)
            if (n[s] != null) A += n[s].v;
        return A
    }
    var Me = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

    function Ue(e, r) {
        if (r == null) return false;
        var t = parseFloat(r[2]);
        switch (r[1]) {
            case "=":
                if (e == t) return true;
                break;
            case ">":
                if (e > t) return true;
                break;
            case "<":
                if (e < t) return true;
                break;
            case "<>":
                if (e != t) return true;
                break;
            case ">=":
                if (e >= t) return true;
                break;
            case "<=":
                if (e <= t) return true;
                break;
        }
        return false
    }

    function Be(e, r) {
        var t = Fe(e);
        var a = t.length,
            n = t[a - 1].indexOf("@");
        if (a < 4 && n > -1) --a;
        if (t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
        if (typeof r !== "number") return [4, t.length === 4 || n > -1 ? t[t.length - 1] : "@"];
        switch (t.length) {
            case 1:
                t = n > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
                break;
            case 2:
                t = n > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
                break;
            case 3:
                t = n > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
                break;
            case 4:
                break;
        }
        var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
        if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [a, i];
        if (t[0].match(/\[[=<>]/) != null || t[1].match(/\[[=<>]/) != null) {
            var s = t[0].match(Me);
            var f = t[1].match(Me);
            return Ue(r, s) ? [a, t[0]] : Ue(r, f) ? [a, t[1]] : [a, t[s != null && f != null ? 2 : 1]]
        }
        return [a, i]
    }

    function We(e, r, t) {
        if (t == null) t = {};
        var a = "";
        switch (typeof e) {
            case "string":
                if (e == "m/d/yy" && t.dateNF) a = t.dateNF;
                else a = e;
                break;
            case "number":
                if (e == 14 && t.dateNF) a = t.dateNF;
                else a = (t.table != null ? t.table : Y)[e];
                if (a == null) a = t.table && t.table[K[e]] || Y[K[e]];
                if (a == null) a = J[e] || "General";
                break;
        }
        if (V(a, 0)) return oe(r, t);
        if (r instanceof Date) r = te(r, t.date1904);
        var n = Be(a, r);
        if (V(n[1])) return oe(r, t);
        if (r === true) r = "TRUE";
        else if (r === false) r = "FALSE";
        else if (r === "" || r == null) return "";
        return Le(n[1], r, t, n[0])
    }

    function He(e, r) {
        if (typeof r != "number") {
            r = +r || -1;
            for (var t = 0; t < 392; ++t) {
                if (Y[t] == undefined) {
                    if (r < 0) r = t;
                    continue
                }
                if (Y[t] == e) {
                    r = t;
                    break
                }
            }
            if (r < 0) r = 391
        }
        Y[r] = e;
        return r
    }

    function ze(e) {
        for (var r = 0; r != 392; ++r)
            if (e[r] !== undefined) He(e[r], r)
    }

    function Ve() {
        Y = X()
    }
    var Ge = {
        format: We,
        load: He,
        _table: Y,
        load_table: ze,
        parse_date_code: Z,
        is_date: Pe,
        get_table: function $w() {
            return Ge._table = Y
        }
    };
    var je = {
        5: '"$"#,##0_);\\("$"#,##0\\)',
        6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        23: "General",
        24: "General",
        25: "General",
        26: "General",
        27: "m/d/yy",
        28: "m/d/yy",
        29: "m/d/yy",
        30: "m/d/yy",
        31: "m/d/yy",
        32: "h:mm:ss",
        33: "h:mm:ss",
        34: "h:mm:ss",
        35: "h:mm:ss",
        36: "m/d/yy",
        41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
        42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
        43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
        44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
        50: "m/d/yy",
        51: "m/d/yy",
        52: "m/d/yy",
        53: "m/d/yy",
        54: "m/d/yy",
        55: "m/d/yy",
        56: "m/d/yy",
        57: "m/d/yy",
        58: "m/d/yy",
        59: "0",
        60: "0.00",
        61: "#,##0",
        62: "#,##0.00",
        63: '"$"#,##0_);\\("$"#,##0\\)',
        64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        67: "0%",
        68: "0.00%",
        69: "# ?/?",
        70: "# ??/??",
        71: "m/d/yy",
        72: "m/d/yy",
        73: "d-mmm-yy",
        74: "d-mmm",
        75: "mmm-yy",
        76: "h:mm",
        77: "h:mm:ss",
        78: "m/d/yy h:mm",
        79: "mm:ss",
        80: "[h]:mm:ss",
        81: "mmss.0"
    };
    var Xe = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

    function $e(e) {
        var r = typeof e == "number" ? Y[e] : e;
        r = r.replace(Xe, "(\\d+)");
        return new RegExp("^" + r + "$")
    }

    function Ye(e, r, t) {
        var a = -1,
            n = -1,
            i = -1,
            s = -1,
            f = -1,
            o = -1;
        (r.match(Xe) || []).forEach(function (e, r) {
            var c = parseInt(t[r + 1], 10);
            switch (e.toLowerCase().charAt(0)) {
                case "y":
                    a = c;
                    break;
                case "d":
                    i = c;
                    break;
                case "h":
                    s = c;
                    break;
                case "s":
                    o = c;
                    break;
                case "m":
                    if (s >= 0) f = c;
                    else n = c;
                    break;
            }
        });
        if (o >= 0 && f == -1 && n >= 0) {
            f = n;
            n = -1
        }
        var c = ("" + (a >= 0 ? a : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
        if (c.length == 7) c = "0" + c;
        if (c.length == 8) c = "20" + c;
        var l = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
        if (s == -1 && f == -1 && o == -1) return c;
        if (a == -1 && n == -1 && i == -1) return l;
        return c + "T" + l
    }
    var Ke = {
        "d.m": "d\\.m"
    };

    function Je(e, r) {
        return He(Ke[e] || e, r)
    }
    var qe = function () {
        var e = {};
        e.version = "1.2.0";

        function r() {
            var e = 0,
                r = new Array(256);
            for (var t = 0; t != 256; ++t) {
                e = t;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
                r[t] = e
            }
            return typeof Int32Array !== "undefined" ? new Int32Array(r) : r
        }
        var t = r();

        function a(e) {
            var r = 0,
                t = 0,
                a = 0,
                n = typeof Int32Array !== "undefined" ? new Int32Array(4096) : new Array(4096);
            for (a = 0; a != 256; ++a) n[a] = e[a];
            for (a = 0; a != 256; ++a) {
                t = e[a];
                for (r = 256 + a; r < 4096; r += 256) t = n[r] = t >>> 8 ^ e[t & 255]
            }
            var i = [];
            for (a = 1; a != 16; ++a) i[a - 1] = typeof Int32Array !== "undefined" ? n.subarray(a * 256, a * 256 + 256) : n.slice(a * 256, a * 256 + 256);
            return i
        }
        var n = a(t);
        var i = n[0],
            s = n[1],
            f = n[2],
            o = n[3],
            c = n[4];
        var l = n[5],
            u = n[6],
            h = n[7],
            d = n[8],
            v = n[9];
        var p = n[10],
            m = n[11],
            b = n[12],
            g = n[13],
            w = n[14];

        function k(e, r) {
            var a = r ^ -1;
            for (var n = 0, i = e.length; n < i;) a = a >>> 8 ^ t[(a ^ e.charCodeAt(n++)) & 255];
            return ~a
        }

        function T(e, r) {
            var a = r ^ -1,
                n = e.length - 15,
                k = 0;
            for (; k < n;) a = w[e[k++] ^ a & 255] ^ g[e[k++] ^ a >> 8 & 255] ^ b[e[k++] ^ a >> 16 & 255] ^ m[e[k++] ^ a >>> 24] ^ p[e[k++]] ^ v[e[k++]] ^ d[e[k++]] ^ h[e[k++]] ^ u[e[k++]] ^ l[e[k++]] ^ c[e[k++]] ^ o[e[k++]] ^ f[e[k++]] ^ s[e[k++]] ^ i[e[k++]] ^ t[e[k++]];
            n += 15;
            while (k < n) a = a >>> 8 ^ t[(a ^ e[k++]) & 255];
            return ~a
        }

        function E(e, r) {
            var a = r ^ -1;
            for (var n = 0, i = e.length, s = 0, f = 0; n < i;) {
                s = e.charCodeAt(n++);
                if (s < 128) {
                    a = a >>> 8 ^ t[(a ^ s) & 255]
                } else if (s < 2048) {
                    a = a >>> 8 ^ t[(a ^ (192 | s >> 6 & 31)) & 255];
                    a = a >>> 8 ^ t[(a ^ (128 | s & 63)) & 255]
                } else if (s >= 55296 && s < 57344) {
                    s = (s & 1023) + 64;
                    f = e.charCodeAt(n++) & 1023;
                    a = a >>> 8 ^ t[(a ^ (240 | s >> 8 & 7)) & 255];
                    a = a >>> 8 ^ t[(a ^ (128 | s >> 2 & 63)) & 255];
                    a = a >>> 8 ^ t[(a ^ (128 | f >> 6 & 15 | (s & 3) << 4)) & 255];
                    a = a >>> 8 ^ t[(a ^ (128 | f & 63)) & 255]
                } else {
                    a = a >>> 8 ^ t[(a ^ (224 | s >> 12 & 15)) & 255];
                    a = a >>> 8 ^ t[(a ^ (128 | s >> 6 & 63)) & 255];
                    a = a >>> 8 ^ t[(a ^ (128 | s & 63)) & 255]
                }
            }
            return ~a
        }
        e.table = t;
        e.bstr = k;
        e.buf = T;
        e.str = E;
        return e
    }();
    var Ze = function Yw() {
        var e = {};
        e.version = "1.2.2";

        function r(e, r) {
            var t = e.split("/"),
                a = r.split("/");
            for (var n = 0, i = 0, s = Math.min(t.length, a.length); n < s; ++n) {
                if (i = t[n].length - a[n].length) return i;
                if (t[n] != a[n]) return t[n] < a[n] ? -1 : 1
            }
            return t.length - a.length
        }

        function t(e) {
            if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e : t(e.slice(0, -1));
            var r = e.lastIndexOf("/");
            return r === -1 ? e : e.slice(0, r + 1)
        }

        function a(e) {
            if (e.charAt(e.length - 1) == "/") return a(e.slice(0, -1));
            var r = e.lastIndexOf("/");
            return r === -1 ? e : e.slice(r + 1)
        }

        function n(e, r) {
            if (typeof r === "string") r = new Date(r);
            var t = r.getHours();
            t = t << 6 | r.getMinutes();
            t = t << 5 | r.getSeconds() >>> 1;
            e._W(2, t);
            var a = r.getFullYear() - 1980;
            a = a << 4 | r.getMonth() + 1;
            a = a << 5 | r.getDate();
            e._W(2, a)
        }

        function i(e) {
            var r = e._R(2) & 65535;
            var t = e._R(2) & 65535;
            var a = new Date;
            var n = t & 31;
            t >>>= 5;
            var i = t & 15;
            t >>>= 4;
            a.setMilliseconds(0);
            a.setFullYear(t + 1980);
            a.setMonth(i - 1);
            a.setDate(n);
            var s = r & 31;
            r >>>= 5;
            var f = r & 63;
            r >>>= 6;
            a.setHours(r);
            a.setMinutes(f);
            a.setSeconds(s << 1);
            return a
        }

        function s(e) {
            pa(e, 0);
            var r = {};
            var t = 0;
            while (e.l <= e.length - 4) {
                var a = e._R(2);
                var n = e._R(2),
                    i = e.l + n;
                var s = {};
                switch (a) {
                    case 21589: {
                        t = e._R(1);
                        if (t & 1) s.mtime = e._R(4);
                        if (n > 5) {
                            if (t & 2) s.atime = e._R(4);
                            if (t & 4) s.ctime = e._R(4)
                        }
                        if (s.mtime) s.mt = new Date(s.mtime * 1e3)
                    }
                    break;
                }
                e.l = i;
                r[a] = s
            }
            return r
        }
        var f;

        function o() {
            return f || (f = Qe)
        }

        function c(e, r) {
            if (e[0] == 80 && e[1] == 75) return Ie(e, r);
            if ((e[0] | 32) == 109 && (e[1] | 32) == 105) return We(e, r);
            if (e.length < 512) throw new Error("CFB file size " + e.length + " < 512");
            var t = 3;
            var a = 512;
            var n = 0;
            var i = 0;
            var s = 0;
            var f = 0;
            var o = 0;
            var c = [];
            var v = e.slice(0, 512);
            pa(v, 0);
            var m = l(v);
            t = m[0];
            switch (t) {
                case 3:
                    a = 512;
                    break;
                case 4:
                    a = 4096;
                    break;
                case 0:
                    if (m[1] == 0) return Ie(e, r);
                default:
                    throw new Error("Major Version: Expected 3 or 4 saw " + t);
            }
            if (a !== 512) {
                v = e.slice(0, a);
                pa(v, 28)
            }
            var w = e.slice(0, a);
            u(v, t);
            var k = v._R(4, "i");
            if (t === 3 && k !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + k);
            v.l += 4;
            s = v._R(4, "i");
            v.l += 4;
            v.chk("00100000", "Mini Stream Cutoff Size: ");
            f = v._R(4, "i");
            n = v._R(4, "i");
            o = v._R(4, "i");
            i = v._R(4, "i");
            for (var T = -1, E = 0; E < 109; ++E) {
                T = v._R(4, "i");
                if (T < 0) break;
                c[E] = T
            }
            var y = h(e, a);
            p(o, i, y, a, c);
            var S = b(y, s, c, a);
            S[s].name = "!Directory";
            if (n > 0 && f !== U) S[f].name = "!MiniFAT";
            S[c[0]].name = "!FAT";
            S.fat_addrs = c;
            S.ssz = a;
            var _ = {},
                A = [],
                x = [],
                C = [];
            g(s, S, y, A, n, _, x, f);
            d(x, C, A);
            A.shift();
            var R = {
                FileIndex: x,
                FullPaths: C
            };
            if (r && r.raw) R.raw = {
                header: w,
                sectors: y
            };
            return R
        }

        function l(e) {
            if (e[e.l] == 80 && e[e.l + 1] == 75) return [0, 0];
            e.chk(B, "Header Signature: ");
            e.l += 16;
            var r = e._R(2, "u");
            return [e._R(2, "u"), r]
        }

        function u(e, r) {
            var t = 9;
            e.l += 2;
            switch (t = e._R(2)) {
                case 9:
                    if (r != 3) throw new Error("Sector Shift: Expected 9 saw " + t);
                    break;
                case 12:
                    if (r != 4) throw new Error("Sector Shift: Expected 12 saw " + t);
                    break;
                default:
                    throw new Error("Sector Shift: Expected 9 or 12 saw " + t);
            }
            e.chk("0600", "Mini Sector Shift: ");
            e.chk("000000000000", "Reserved: ")
        }

        function h(e, r) {
            var t = Math.ceil(e.length / r) - 1;
            var a = [];
            for (var n = 1; n < t; ++n) a[n - 1] = e.slice(n * r, (n + 1) * r);
            a[t - 1] = e.slice(t * r);
            return a
        }

        function d(e, r, t) {
            var a = 0,
                n = 0,
                i = 0,
                s = 0,
                f = 0,
                o = t.length;
            var c = [],
                l = [];
            for (; a < o; ++a) {
                c[a] = l[a] = a;
                r[a] = t[a]
            }
            for (; f < l.length; ++f) {
                a = l[f];
                n = e[a].L;
                i = e[a].R;
                s = e[a].C;
                if (c[a] === a) {
                    if (n !== -1 && c[n] !== n) c[a] = c[n];
                    if (i !== -1 && c[i] !== i) c[a] = c[i]
                }
                if (s !== -1) c[s] = a;
                if (n !== -1 && a != c[a]) {
                    c[n] = c[a];
                    if (l.lastIndexOf(n) < f) l.push(n)
                }
                if (i !== -1 && a != c[a]) {
                    c[i] = c[a];
                    if (l.lastIndexOf(i) < f) l.push(i)
                }
            }
            for (a = 1; a < o; ++a)
                if (c[a] === a) {
                    if (i !== -1 && c[i] !== i) c[a] = c[i];
                    else if (n !== -1 && c[n] !== n) c[a] = c[n]
                } for (a = 1; a < o; ++a) {
                if (e[a].type === 0) continue;
                f = a;
                if (f != c[f])
                    do {
                        f = c[f];
                        r[a] = r[f] + "/" + r[a]
                    } while (f !== 0 && -1 !== c[f] && f != c[f]);
                c[a] = -1
            }
            r[0] += "/";
            for (a = 1; a < o; ++a) {
                if (e[a].type !== 2) r[a] += "/"
            }
        }

        function v(e, r, t) {
            var a = e.start,
                n = e.size;
            var i = [];
            var s = a;
            while (t && n > 0 && s >= 0) {
                i.push(r.slice(s * M, s * M + M));
                n -= M;
                s = fa(t, s * 4)
            }
            if (i.length === 0) return ba(0);
            return I(i).slice(0, e.size)
        }

        function p(e, r, t, a, n) {
            var i = U;
            if (e === U) {
                if (r !== 0) throw new Error("DIFAT chain shorter than expected")
            } else if (e !== -1) {
                var s = t[e],
                    f = (a >>> 2) - 1;
                if (!s) return;
                for (var o = 0; o < f; ++o) {
                    if ((i = fa(s, o * 4)) === U) break;
                    n.push(i)
                }
                if (r >= 1) p(fa(s, a - 4), r - 1, t, a, n)
            }
        }

        function m(e, r, t, a, n) {
            var i = [],
                s = [];
            if (!n) n = [];
            var f = a - 1,
                o = 0,
                c = 0;
            for (o = r; o >= 0;) {
                n[o] = true;
                i[i.length] = o;
                s.push(e[o]);
                var l = t[Math.floor(o * 4 / a)];
                c = o * 4 & f;
                if (a < 4 + c) throw new Error("FAT boundary crossed: " + o + " 4 " + a);
                if (!e[l]) break;
                o = fa(e[l], c)
            }
            return {
                nodes: i,
                data: Lt([s])
            }
        }

        function b(e, r, t, a) {
            var n = e.length,
                i = [];
            var s = [],
                f = [],
                o = [];
            var c = a - 1,
                l = 0,
                u = 0,
                h = 0,
                d = 0;
            for (l = 0; l < n; ++l) {
                f = [];
                h = l + r;
                if (h >= n) h -= n;
                if (s[h]) continue;
                o = [];
                var v = [];
                for (u = h; u >= 0;) {
                    v[u] = true;
                    s[u] = true;
                    f[f.length] = u;
                    o.push(e[u]);
                    var p = t[Math.floor(u * 4 / a)];
                    d = u * 4 & c;
                    if (a < 4 + d) throw new Error("FAT boundary crossed: " + u + " 4 " + a);
                    if (!e[p]) break;
                    u = fa(e[p], d);
                    if (v[u]) break
                }
                i[h] = {
                    nodes: f,
                    data: Lt([o])
                }
            }
            return i
        }

        function g(e, r, t, a, n, i, s, f) {
            var o = 0,
                c = a.length ? 2 : 0;
            var l = r[e].data;
            var u = 0,
                h = 0,
                d;
            for (; u < l.length; u += 128) {
                var p = l.slice(u, u + 128);
                pa(p, 64);
                h = p._R(2);
                d = Ut(p, 0, h - c);
                a.push(d);
                var b = {
                    name: d,
                    type: p._R(1),
                    color: p._R(1),
                    L: p._R(4, "i"),
                    R: p._R(4, "i"),
                    C: p._R(4, "i"),
                    clsid: p._R(16),
                    state: p._R(4, "i"),
                    start: 0,
                    size: 0
                };
                var g = p._R(2) + p._R(2) + p._R(2) + p._R(2);
                if (g !== 0) b.ct = w(p, p.l - 8);
                var k = p._R(2) + p._R(2) + p._R(2) + p._R(2);
                if (k !== 0) b.mt = w(p, p.l - 8);
                b.start = p._R(4, "i");
                b.size = p._R(4, "i");
                if (b.size < 0 && b.start < 0) {
                    b.size = b.type = 0;
                    b.start = U;
                    b.name = ""
                }
                if (b.type === 5) {
                    o = b.start;
                    if (n > 0 && o !== U) r[o].name = "!StreamData"
                } else if (b.size >= 4096) {
                    b.storage = "fat";
                    if (r[b.start] === undefined) r[b.start] = m(t, b.start, r.fat_addrs, r.ssz);
                    r[b.start].name = b.name;
                    b.content = r[b.start].data.slice(0, b.size)
                } else {
                    b.storage = "minifat";
                    if (b.size < 0) b.size = 0;
                    else if (o !== U && b.start !== U && r[o]) {
                        b.content = v(b, r[o].data, (r[f] || {}).data)
                    }
                }
                if (b.content) pa(b.content, 0);
                i[d] = b;
                s.push(b)
            }
        }

        function w(e, r) {
            return new Date((sa(e, r + 4) / 1e7 * Math.pow(2, 32) + sa(e, r) / 1e7 - 11644473600) * 1e3)
        }

        function x(e, r) {
            o();
            return c(f.readFileSync(e), r)
        }

        function C(e, r) {
            var t = r && r.type;
            if (!t) {
                if (E && Buffer.isBuffer(e)) t = "buffer"
            }
            switch (t || "base64") {
                case "file":
                    return x(e, r);
                case "base64":
                    return c(A(T(e)), r);
                case "binary":
                    return c(A(e), r);
            }
            return c(e, r)
        }

        function R(e, r) {
            var t = r || {},
                a = t.root || "Root Entry";
            if (!e.FullPaths) e.FullPaths = [];
            if (!e.FileIndex) e.FileIndex = [];
            if (e.FullPaths.length !== e.FileIndex.length) throw new Error("inconsistent CFB structure");
            if (e.FullPaths.length === 0) {
                e.FullPaths[0] = a + "/";
                e.FileIndex[0] = {
                    name: a,
                    type: 5
                }
            }
            if (t.CLSID) e.FileIndex[0].clsid = t.CLSID;
            O(e)
        }

        function O(e) {
            var r = "Sh33tJ5";
            if (Ze.find(e, "/" + r)) return;
            var t = ba(4);
            t[0] = 55;
            t[1] = t[3] = 50;
            t[2] = 54;
            e.FileIndex.push({
                name: r,
                type: 2,
                content: t,
                size: 4,
                L: 69,
                R: 69,
                C: 69
            });
            e.FullPaths.push(e.FullPaths[0] + r);
            N(e)
        }

        function N(e, n) {
            R(e);
            var i = false,
                s = false;
            for (var f = e.FullPaths.length - 1; f >= 0; --f) {
                var o = e.FileIndex[f];
                switch (o.type) {
                    case 0:
                        if (s) i = true;
                        else {
                            e.FileIndex.pop();
                            e.FullPaths.pop()
                        }
                        break;
                    case 1:
                        ;
                    case 2:
                        ;
                    case 5:
                        s = true;
                        if (isNaN(o.R * o.L * o.C)) i = true;
                        if (o.R > -1 && o.L > -1 && o.R == o.L) i = true;
                        break;
                    default:
                        i = true;
                        break;
                }
            }
            if (!i && !n) return;
            var c = new Date(1987, 1, 19),
                l = 0;
            var u = Object.create ? Object.create(null) : {};
            var h = [];
            for (f = 0; f < e.FullPaths.length; ++f) {
                u[e.FullPaths[f]] = true;
                if (e.FileIndex[f].type === 0) continue;
                h.push([e.FullPaths[f], e.FileIndex[f]])
            }
            for (f = 0; f < h.length; ++f) {
                var d = t(h[f][0]);
                s = u[d];
                while (!s) {
                    while (t(d) && !u[t(d)]) d = t(d);
                    h.push([d, {
                        name: a(d).replace("/", ""),
                        type: 1,
                        clsid: H,
                        ct: c,
                        mt: c,
                        content: null
                    }]);
                    u[d] = true;
                    d = t(h[f][0]);
                    s = u[d]
                }
            }
            h.sort(function (e, t) {
                return r(e[0], t[0])
            });
            e.FullPaths = [];
            e.FileIndex = [];
            for (f = 0; f < h.length; ++f) {
                e.FullPaths[f] = h[f][0];
                e.FileIndex[f] = h[f][1]
            }
            for (f = 0; f < h.length; ++f) {
                var v = e.FileIndex[f];
                var p = e.FullPaths[f];
                v.name = a(p).replace("/", "");
                v.L = v.R = v.C = -(v.color = 1);
                v.size = v.content ? v.content.length : 0;
                v.start = 0;
                v.clsid = v.clsid || H;
                if (f === 0) {
                    v.C = h.length > 1 ? 1 : -1;
                    v.size = 0;
                    v.type = 5
                } else if (p.slice(-1) == "/") {
                    for (l = f + 1; l < h.length; ++l)
                        if (t(e.FullPaths[l]) == p) break;
                    v.C = l >= h.length ? -1 : l;
                    for (l = f + 1; l < h.length; ++l)
                        if (t(e.FullPaths[l]) == t(p)) break;
                    v.R = l >= h.length ? -1 : l;
                    v.type = 1
                } else {
                    if (t(e.FullPaths[f + 1] || "") == t(p)) v.R = f + 1;
                    v.type = 2
                }
            }
        }

        function P(e, r) {
            var t = r || {};
            if (t.fileType == "mad") return He(e, t);
            N(e);
            switch (t.fileType) {
                case "zip":
                    return Fe(e, t);
            }
            var a = function (e) {
                var r = 0,
                    t = 0;
                for (var a = 0; a < e.FileIndex.length; ++a) {
                    var n = e.FileIndex[a];
                    if (!n.content) continue;
                    var i = n.content.length;
                    if (i > 0) {
                        if (i < 4096) r += i + 63 >> 6;
                        else t += i + 511 >> 9
                    }
                }
                var s = e.FullPaths.length + 3 >> 2;
                var f = r + 7 >> 3;
                var o = r + 127 >> 7;
                var c = f + t + s + o;
                var l = c + 127 >> 7;
                var u = l <= 109 ? 0 : Math.ceil((l - 109) / 127);
                while (c + l + u + 127 >> 7 > l) u = ++l <= 109 ? 0 : Math.ceil((l - 109) / 127);
                var h = [1, u, l, o, s, t, r, 0];
                e.FileIndex[0].size = r << 6;
                h[7] = (e.FileIndex[0].start = h[0] + h[1] + h[2] + h[3] + h[4] + h[5]) + (h[6] + 7 >> 3);
                return h
            }(e);
            var n = ba(a[7] << 9);
            var i = 0,
                s = 0; {
                for (i = 0; i < 8; ++i) n._W(1, W[i]);
                for (i = 0; i < 8; ++i) n._W(2, 0);
                n._W(2, 62);
                n._W(2, 3);
                n._W(2, 65534);
                n._W(2, 9);
                n._W(2, 6);
                for (i = 0; i < 3; ++i) n._W(2, 0);
                n._W(4, 0);
                n._W(4, a[2]);
                n._W(4, a[0] + a[1] + a[2] + a[3] - 1);
                n._W(4, 0);
                n._W(4, 1 << 12);
                n._W(4, a[3] ? a[0] + a[1] + a[2] - 1 : U);
                n._W(4, a[3]);
                n._W(-4, a[1] ? a[0] - 1 : U);
                n._W(4, a[1]);
                for (i = 0; i < 109; ++i) n._W(-4, i < a[2] ? a[1] + i : -1)
            }
            if (a[1]) {
                for (s = 0; s < a[1]; ++s) {
                    for (; i < 236 + s * 127; ++i) n._W(-4, i < a[2] ? a[1] + i : -1);
                    n._W(-4, s === a[1] - 1 ? U : s + 1)
                }
            }
            var f = function (e) {
                for (s += e; i < s - 1; ++i) n._W(-4, i + 1);
                if (e) {
                    ++i;
                    n._W(-4, U)
                }
            };
            s = i = 0;
            for (s += a[1]; i < s; ++i) n._W(-4, z.DIFSECT);
            for (s += a[2]; i < s; ++i) n._W(-4, z.FATSECT);
            f(a[3]);
            f(a[4]);
            var o = 0,
                c = 0;
            var l = e.FileIndex[0];
            for (; o < e.FileIndex.length; ++o) {
                l = e.FileIndex[o];
                if (!l.content) continue;
                c = l.content.length;
                if (c < 4096) continue;
                l.start = s;
                f(c + 511 >> 9)
            }
            f(a[6] + 7 >> 3);
            while (n.l & 511) n._W(-4, z.ENDOFCHAIN);
            s = i = 0;
            for (o = 0; o < e.FileIndex.length; ++o) {
                l = e.FileIndex[o];
                if (!l.content) continue;
                c = l.content.length;
                if (!c || c >= 4096) continue;
                l.start = s;
                f(c + 63 >> 6)
            }
            while (n.l & 511) n._W(-4, z.ENDOFCHAIN);
            for (i = 0; i < a[4] << 2; ++i) {
                var u = e.FullPaths[i];
                if (!u || u.length === 0) {
                    for (o = 0; o < 17; ++o) n._W(4, 0);
                    for (o = 0; o < 3; ++o) n._W(4, -1);
                    for (o = 0; o < 12; ++o) n._W(4, 0);
                    continue
                }
                l = e.FileIndex[i];
                if (i === 0) l.start = l.size ? l.start - 1 : U;
                var h = i === 0 && t.root || l.name;
                if (h.length > 32) {
                    console.error("Name " + h + " will be truncated to " + h.slice(0, 32));
                    h = h.slice(0, 32)
                }
                c = 2 * (h.length + 1);
                n._W(64, h, "utf16le");
                n._W(2, c);
                n._W(1, l.type);
                n._W(1, l.color);
                n._W(-4, l.L);
                n._W(-4, l.R);
                n._W(-4, l.C);
                if (!l.clsid)
                    for (o = 0; o < 4; ++o) n._W(4, 0);
                else n._W(16, l.clsid, "hex");
                n._W(4, l.state || 0);
                n._W(4, 0);
                n._W(4, 0);
                n._W(4, 0);
                n._W(4, 0);
                n._W(4, l.start);
                n._W(4, l.size);
                n._W(4, 0)
            }
            for (i = 1; i < e.FileIndex.length; ++i) {
                l = e.FileIndex[i];
                if (l.size >= 4096) {
                    n.l = l.start + 1 << 9;
                    if (E && Buffer.isBuffer(l.content)) {
                        l.content.copy(n, n.l, 0, l.size);
                        n.l += l.size + 511 & -512
                    } else {
                        for (o = 0; o < l.size; ++o) n._W(1, l.content[o]);
                        for (; o & 511; ++o) n._W(1, 0)
                    }
                }
            }
            for (i = 1; i < e.FileIndex.length; ++i) {
                l = e.FileIndex[i];
                if (l.size > 0 && l.size < 4096) {
                    if (E && Buffer.isBuffer(l.content)) {
                        l.content.copy(n, n.l, 0, l.size);
                        n.l += l.size + 63 & -64
                    } else {
                        for (o = 0; o < l.size; ++o) n._W(1, l.content[o]);
                        for (; o & 63; ++o) n._W(1, 0)
                    }
                }
            }
            if (E) {
                n.l = n.length
            } else {
                while (n.l < n.length) n._W(1, 0)
            }
            return n
        }

        function L(e, r) {
            var t = e.FullPaths.map(function (e) {
                return e.toUpperCase()
            });
            var a = t.map(function (e) {
                var r = e.split("/");
                return r[r.length - (e.slice(-1) == "/" ? 2 : 1)]
            });
            var n = false;
            if (r.charCodeAt(0) === 47) {
                n = true;
                r = t[0].slice(0, -1) + r
            } else n = r.indexOf("/") !== -1;
            var i = r.toUpperCase();
            var s = n === true ? t.indexOf(i) : a.indexOf(i);
            if (s !== -1) return e.FileIndex[s];
            var f = !i.match(D);
            i = i.replace(F, "");
            if (f) i = i.replace(D, "!");
            for (s = 0; s < t.length; ++s) {
                if ((f ? t[s].replace(D, "!") : t[s]).replace(F, "") == i) return e.FileIndex[s];
                if ((f ? a[s].replace(D, "!") : a[s]).replace(F, "") == i) return e.FileIndex[s]
            }
            return null
        }
        var M = 64;
        var U = -2;
        var B = "d0cf11e0a1b11ae1";
        var W = [208, 207, 17, 224, 161, 177, 26, 225];
        var H = "00000000000000000000000000000000";
        var z = {
            MAXREGSECT: -6,
            DIFSECT: -4,
            FATSECT: -3,
            ENDOFCHAIN: U,
            FREESECT: -1,
            HEADER_SIGNATURE: B,
            HEADER_MINOR_VERSION: "3e00",
            MAXREGSID: -6,
            NOSTREAM: -1,
            HEADER_CLSID: H,
            EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
        };

        function V(e, r, t) {
            o();
            var a = P(e, t);
            f.writeFileSync(r, a)
        }

        function G(e) {
            var r = new Array(e.length);
            for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
            return r.join("")
        }

        function j(e, r) {
            var t = P(e, r);
            switch (r && r.type || "buffer") {
                case "file":
                    o();
                    f.writeFileSync(r.filename, t);
                    return t;
                case "binary":
                    return typeof t == "string" ? t : G(t);
                case "base64":
                    return k(typeof t == "string" ? t : G(t));
                case "buffer":
                    if (E) return Buffer.isBuffer(t) ? t : y(t);
                case "array":
                    return typeof t == "string" ? A(t) : t;
            }
            return t
        }
        var X;

        function $(e) {
            try {
                var r = e.InflateRaw;
                var t = new r;
                t._processChunk(new Uint8Array([3, 0]), t._finishFlushFlag);
                if (t.bytesRead) X = e;
                else throw new Error("zlib does not expose bytesRead")
            } catch (a) {
                console.error("cannot use native zlib: " + (a.message || a))
            }
        }

        function Y(e, r) {
            if (!X) return Re(e, r);
            var t = X.InflateRaw;
            var a = new t;
            var n = a._processChunk(e.slice(e.l), a._finishFlushFlag);
            e.l += a.bytesRead;
            return n
        }

        function K(e) {
            return X ? X.deflateRawSync(e) : Te(e)
        }
        var J = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        var q = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
        var Z = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];

        function Q(e) {
            var r = (e << 1 | e << 11) & 139536 | (e << 5 | e << 15) & 558144;
            return (r >> 16 | r >> 8 | r) & 255
        }
        var ee = typeof Uint8Array !== "undefined";
        var re = ee ? new Uint8Array(1 << 8) : [];
        for (var te = 0; te < 1 << 8; ++te) re[te] = Q(te);

        function ae(e, r) {
            var t = re[e & 255];
            if (r <= 8) return t >>> 8 - r;
            t = t << 8 | re[e >> 8 & 255];
            if (r <= 16) return t >>> 16 - r;
            t = t << 8 | re[e >> 16 & 255];
            return t >>> 24 - r
        }

        function ne(e, r) {
            var t = r & 7,
                a = r >>> 3;
            return (e[a] | (t <= 6 ? 0 : e[a + 1] << 8)) >>> t & 3
        }

        function ie(e, r) {
            var t = r & 7,
                a = r >>> 3;
            return (e[a] | (t <= 5 ? 0 : e[a + 1] << 8)) >>> t & 7
        }

        function se(e, r) {
            var t = r & 7,
                a = r >>> 3;
            return (e[a] | (t <= 4 ? 0 : e[a + 1] << 8)) >>> t & 15
        }

        function fe(e, r) {
            var t = r & 7,
                a = r >>> 3;
            return (e[a] | (t <= 3 ? 0 : e[a + 1] << 8)) >>> t & 31
        }

        function oe(e, r) {
            var t = r & 7,
                a = r >>> 3;
            return (e[a] | (t <= 1 ? 0 : e[a + 1] << 8)) >>> t & 127
        }

        function ce(e, r, t) {
            var a = r & 7,
                n = r >>> 3,
                i = (1 << t) - 1;
            var s = e[n] >>> a;
            if (t < 8 - a) return s & i;
            s |= e[n + 1] << 8 - a;
            if (t < 16 - a) return s & i;
            s |= e[n + 2] << 16 - a;
            if (t < 24 - a) return s & i;
            s |= e[n + 3] << 24 - a;
            return s & i
        }

        function le(e, r, t) {
            var a = r & 7,
                n = r >>> 3;
            if (a <= 5) e[n] |= (t & 7) << a;
            else {
                e[n] |= t << a & 255;
                e[n + 1] = (t & 7) >> 8 - a
            }
            return r + 3
        }

        function ue(e, r, t) {
            var a = r & 7,
                n = r >>> 3;
            t = (t & 1) << a;
            e[n] |= t;
            return r + 1
        }

        function he(e, r, t) {
            var a = r & 7,
                n = r >>> 3;
            t <<= a;
            e[n] |= t & 255;
            t >>>= 8;
            e[n + 1] = t;
            return r + 8
        }

        function de(e, r, t) {
            var a = r & 7,
                n = r >>> 3;
            t <<= a;
            e[n] |= t & 255;
            t >>>= 8;
            e[n + 1] = t & 255;
            e[n + 2] = t >>> 8;
            return r + 16
        }

        function ve(e, r) {
            var t = e.length,
                a = 2 * t > r ? 2 * t : r + 5,
                n = 0;
            if (t >= r) return e;
            if (E) {
                var i = _(a);
                if (e.copy) e.copy(i);
                else
                    for (; n < e.length; ++n) i[n] = e[n];
                return i
            } else if (ee) {
                var s = new Uint8Array(a);
                if (s.set) s.set(e);
                else
                    for (; n < t; ++n) s[n] = e[n];
                return s
            }
            e.length = a;
            return e
        }

        function pe(e) {
            var r = new Array(e);
            for (var t = 0; t < e; ++t) r[t] = 0;
            return r
        }

        function me(e, r, t) {
            var a = 1,
                n = 0,
                i = 0,
                s = 0,
                f = 0,
                o = e.length;
            var c = ee ? new Uint16Array(32) : pe(32);
            for (i = 0; i < 32; ++i) c[i] = 0;
            for (i = o; i < t; ++i) e[i] = 0;
            o = e.length;
            var l = ee ? new Uint16Array(o) : pe(o);
            for (i = 0; i < o; ++i) {
                c[n = e[i]]++;
                if (a < n) a = n;
                l[i] = 0
            }
            c[0] = 0;
            for (i = 1; i <= a; ++i) c[i + 16] = f = f + c[i - 1] << 1;
            for (i = 0; i < o; ++i) {
                f = e[i];
                if (f != 0) l[i] = c[f + 16]++
            }
            var u = 0;
            for (i = 0; i < o; ++i) {
                u = e[i];
                if (u != 0) {
                    f = ae(l[i], a) >> a - u;
                    for (s = (1 << a + 4 - u) - 1; s >= 0; --s) r[f | s << u] = u & 15 | i << 4
                }
            }
            return a
        }
        var be = ee ? new Uint16Array(512) : pe(512);
        var ge = ee ? new Uint16Array(32) : pe(32);
        if (!ee) {
            for (var we = 0; we < 512; ++we) be[we] = 0;
            for (we = 0; we < 32; ++we) ge[we] = 0
        }(function () {
            var e = [];
            var r = 0;
            for (; r < 32; r++) e.push(5);
            me(e, ge, 32);
            var t = [];
            r = 0;
            for (; r <= 143; r++) t.push(8);
            for (; r <= 255; r++) t.push(9);
            for (; r <= 279; r++) t.push(7);
            for (; r <= 287; r++) t.push(8);
            me(t, be, 288)
        })();
        var ke = function $e() {
            var e = ee ? new Uint8Array(32768) : [];
            var r = 0,
                t = 0;
            for (; r < Z.length - 1; ++r) {
                for (; t < Z[r + 1]; ++t) e[t] = r
            }
            for (; t < 32768; ++t) e[t] = 29;
            var a = ee ? new Uint8Array(259) : [];
            for (r = 0, t = 0; r < q.length - 1; ++r) {
                for (; t < q[r + 1]; ++t) a[t] = r
            }

            function n(e, r) {
                var t = 0;
                while (t < e.length) {
                    var a = Math.min(65535, e.length - t);
                    var n = t + a == e.length;
                    r._W(1, +n);
                    r._W(2, a);
                    r._W(2, ~a & 65535);
                    while (a-- > 0) r[r.l++] = e[t++]
                }
                return r.l
            }

            function i(r, t) {
                var n = 0;
                var i = 0;
                var s = ee ? new Uint16Array(32768) : [];
                while (i < r.length) {
                    var f = Math.min(65535, r.length - i);
                    if (f < 10) {
                        n = le(t, n, +!!(i + f == r.length));
                        if (n & 7) n += 8 - (n & 7);
                        t.l = n / 8 | 0;
                        t._W(2, f);
                        t._W(2, ~f & 65535);
                        while (f-- > 0) t[t.l++] = r[i++];
                        n = t.l * 8;
                        continue
                    }
                    n = le(t, n, +!!(i + f == r.length) + 2);
                    var o = 0;
                    while (f-- > 0) {
                        var c = r[i];
                        o = (o << 5 ^ c) & 32767;
                        var l = -1,
                            u = 0;
                        if (l = s[o]) {
                            l |= i & ~32767;
                            if (l > i) l -= 32768;
                            if (l < i)
                                while (r[l + u] == r[i + u] && u < 250) ++u
                        }
                        if (u > 2) {
                            c = a[u];
                            if (c <= 22) n = he(t, n, re[c + 1] >> 1) - 1;
                            else {
                                he(t, n, 3);
                                n += 5;
                                he(t, n, re[c - 23] >> 5);
                                n += 3
                            }
                            var h = c < 8 ? 0 : c - 4 >> 2;
                            if (h > 0) {
                                de(t, n, u - q[c]);
                                n += h
                            }
                            c = e[i - l];
                            n = he(t, n, re[c] >> 3);
                            n -= 3;
                            var d = c < 4 ? 0 : c - 2 >> 1;
                            if (d > 0) {
                                de(t, n, i - l - Z[c]);
                                n += d
                            }
                            for (var v = 0; v < u; ++v) {
                                s[o] = i & 32767;
                                o = (o << 5 ^ r[i]) & 32767;
                                ++i
                            }
                            f -= u - 1
                        } else {
                            if (c <= 143) c = c + 48;
                            else n = ue(t, n, 1);
                            n = he(t, n, re[c]);
                            s[o] = i & 32767;
                            ++i
                        }
                    }
                    n = he(t, n, 0) - 1
                }
                t.l = (n + 7) / 8 | 0;
                return t.l
            }
            return function s(e, r) {
                if (e.length < 8) return n(e, r);
                return i(e, r)
            }
        }();

        function Te(e) {
            var r = ba(50 + Math.floor(e.length * 1.1));
            var t = ke(e, r);
            return r.slice(0, t)
        }
        var Ee = ee ? new Uint16Array(32768) : pe(32768);
        var ye = ee ? new Uint16Array(32768) : pe(32768);
        var Se = ee ? new Uint16Array(128) : pe(128);
        var _e = 1,
            Ae = 1;

        function xe(e, r) {
            var t = fe(e, r) + 257;
            r += 5;
            var a = fe(e, r) + 1;
            r += 5;
            var n = se(e, r) + 4;
            r += 4;
            var i = 0;
            var s = ee ? new Uint8Array(19) : pe(19);
            var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var o = 1;
            var c = ee ? new Uint8Array(8) : pe(8);
            var l = ee ? new Uint8Array(8) : pe(8);
            var u = s.length;
            for (var h = 0; h < n; ++h) {
                s[J[h]] = i = ie(e, r);
                if (o < i) o = i;
                c[i]++;
                r += 3
            }
            var d = 0;
            c[0] = 0;
            for (h = 1; h <= o; ++h) l[h] = d = d + c[h - 1] << 1;
            for (h = 0; h < u; ++h)
                if ((d = s[h]) != 0) f[h] = l[d]++;
            var v = 0;
            for (h = 0; h < u; ++h) {
                v = s[h];
                if (v != 0) {
                    d = re[f[h]] >> 8 - v;
                    for (var p = (1 << 7 - v) - 1; p >= 0; --p) Se[d | p << v] = v & 7 | h << 3
                }
            }
            var m = [];
            o = 1;
            for (; m.length < t + a;) {
                d = Se[oe(e, r)];
                r += d & 7;
                switch (d >>>= 3) {
                    case 16:
                        i = 3 + ne(e, r);
                        r += 2;
                        d = m[m.length - 1];
                        while (i-- > 0) m.push(d);
                        break;
                    case 17:
                        i = 3 + ie(e, r);
                        r += 3;
                        while (i-- > 0) m.push(0);
                        break;
                    case 18:
                        i = 11 + oe(e, r);
                        r += 7;
                        while (i-- > 0) m.push(0);
                        break;
                    default:
                        m.push(d);
                        if (o < d) o = d;
                        break;
                }
            }
            var b = m.slice(0, t),
                g = m.slice(t);
            for (h = t; h < 286; ++h) b[h] = 0;
            for (h = a; h < 30; ++h) g[h] = 0;
            _e = me(b, Ee, 286);
            Ae = me(g, ye, 30);
            return r
        }

        function Ce(e, r) {
            if (e[0] == 3 && !(e[1] & 3)) {
                return [S(r), 2]
            }
            var t = 0;
            var a = 0;
            var n = _(r ? r : 1 << 18);
            var i = 0;
            var s = n.length >>> 0;
            var f = 0,
                o = 0;
            while ((a & 1) == 0) {
                a = ie(e, t);
                t += 3;
                if (a >>> 1 == 0) {
                    if (t & 7) t += 8 - (t & 7);
                    var c = e[t >>> 3] | e[(t >>> 3) + 1] << 8;
                    t += 32;
                    if (c > 0) {
                        if (!r && s < i + c) {
                            n = ve(n, i + c);
                            s = n.length
                        }
                        while (c-- > 0) {
                            n[i++] = e[t >>> 3];
                            t += 8
                        }
                    }
                    continue
                } else if (a >> 1 == 1) {
                    f = 9;
                    o = 5
                } else {
                    t = xe(e, t);
                    f = _e;
                    o = Ae
                }
                for (;;) {
                    if (!r && s < i + 32767) {
                        n = ve(n, i + 32767);
                        s = n.length
                    }
                    var l = ce(e, t, f);
                    var u = a >>> 1 == 1 ? be[l] : Ee[l];
                    t += u & 15;
                    u >>>= 4;
                    if ((u >>> 8 & 255) === 0) n[i++] = u;
                    else if (u == 256) break;
                    else {
                        u -= 257;
                        var h = u < 8 ? 0 : u - 4 >> 2;
                        if (h > 5) h = 0;
                        var d = i + q[u];
                        if (h > 0) {
                            d += ce(e, t, h);
                            t += h
                        }
                        l = ce(e, t, o);
                        u = a >>> 1 == 1 ? ge[l] : ye[l];
                        t += u & 15;
                        u >>>= 4;
                        var v = u < 4 ? 0 : u - 2 >> 1;
                        var p = Z[u];
                        if (v > 0) {
                            p += ce(e, t, v);
                            t += v
                        }
                        if (!r && s < d) {
                            n = ve(n, d + 100);
                            s = n.length
                        }
                        while (i < d) {
                            n[i] = n[i - p];
                            ++i
                        }
                    }
                }
            }
            if (r) return [n, t + 7 >>> 3];
            return [n.slice(0, i), t + 7 >>> 3]
        }

        function Re(e, r) {
            var t = e.slice(e.l || 0);
            var a = Ce(t, r);
            e.l += a[1];
            return a[0]
        }

        function Oe(e, r) {
            if (e) {
                if (typeof console !== "undefined") console.error(r)
            } else throw new Error(r)
        }

        function Ie(e, r) {
            var t = e;
            pa(t, 0);
            var a = [],
                n = [];
            var i = {
                FileIndex: a,
                FullPaths: n
            };
            R(i, {
                root: r.root
            });
            var f = t.length - 4;
            while ((t[f] != 80 || t[f + 1] != 75 || t[f + 2] != 5 || t[f + 3] != 6) && f >= 0) --f;
            t.l = f + 4;
            t.l += 4;
            var o = t._R(2);
            t.l += 6;
            var c = t._R(4);
            t.l = c;
            for (f = 0; f < o; ++f) {
                t.l += 20;
                var l = t._R(4);
                var u = t._R(4);
                var h = t._R(2);
                var d = t._R(2);
                var v = t._R(2);
                t.l += 8;
                var p = t._R(4);
                var m = s(t.slice(t.l + h, t.l + h + d));
                t.l += h + d + v;
                var b = t.l;
                t.l = p + 4;
                Ne(t, l, u, i, m);
                t.l = b
            }
            return i
        }

        function Ne(e, r, t, a, n) {
            e.l += 2;
            var f = e._R(2);
            var o = e._R(2);
            var c = i(e);
            if (f & 8257) throw new Error("Unsupported ZIP encryption");
            var l = e._R(4);
            var u = e._R(4);
            var h = e._R(4);
            var d = e._R(2);
            var v = e._R(2);
            var p = "";
            for (var m = 0; m < d; ++m) p += String.fromCharCode(e[e.l++]);
            if (v) {
                var b = s(e.slice(e.l, e.l + v));
                if ((b[21589] || {}).mt) c = b[21589].mt;
                if (((n || {})[21589] || {}).mt) c = n[21589].mt
            }
            e.l += v;
            var g = e.slice(e.l, e.l + u);
            switch (o) {
                case 8:
                    g = Y(e, h);
                    break;
                case 0:
                    break;
                default:
                    throw new Error("Unsupported ZIP Compression method " + o);
            }
            var w = false;
            if (f & 8) {
                l = e._R(4);
                if (l == 134695760) {
                    l = e._R(4);
                    w = true
                }
                u = e._R(4);
                h = e._R(4)
            }
            if (u != r) Oe(w, "Bad compressed size: " + r + " != " + u);
            if (h != t) Oe(w, "Bad uncompressed size: " + t + " != " + h);
            Ve(a, p, g, {
                unsafe: true,
                mt: c
            })
        }

        function Fe(e, r) {
            var t = r || {};
            var a = [],
                i = [];
            var s = ba(1);
            var f = t.compression ? 8 : 0,
                o = 0;
            var c = false;
            if (c) o |= 8;
            var l = 0,
                u = 0;
            var h = 0,
                d = 0;
            var v = e.FullPaths[0],
                p = v,
                m = e.FileIndex[0];
            var b = [];
            var g = 0;
            for (l = 1; l < e.FullPaths.length; ++l) {
                p = e.FullPaths[l].slice(v.length);
                m = e.FileIndex[l];
                if (!m.size || !m.content || p == "Sh33tJ5") continue;
                var w = h;
                var k = ba(p.length);
                for (u = 0; u < p.length; ++u) k._W(1, p.charCodeAt(u) & 127);
                k = k.slice(0, k.l);
                b[d] = qe.buf(m.content, 0);
                var T = m.content;
                if (f == 8) T = K(T);
                s = ba(30);
                s._W(4, 67324752);
                s._W(2, 20);
                s._W(2, o);
                s._W(2, f);
                if (m.mt) n(s, m.mt);
                else s._W(4, 0);
                s._W(-4, o & 8 ? 0 : b[d]);
                s._W(4, o & 8 ? 0 : T.length);
                s._W(4, o & 8 ? 0 : m.content.length);
                s._W(2, k.length);
                s._W(2, 0);
                h += s.length;
                a.push(s);
                h += k.length;
                a.push(k);
                h += T.length;
                a.push(T);
                if (o & 8) {
                    s = ba(12);
                    s._W(-4, b[d]);
                    s._W(4, T.length);
                    s._W(4, m.content.length);
                    h += s.l;
                    a.push(s)
                }
                s = ba(46);
                s._W(4, 33639248);
                s._W(2, 0);
                s._W(2, 20);
                s._W(2, o);
                s._W(2, f);
                s._W(4, 0);
                s._W(-4, b[d]);
                s._W(4, T.length);
                s._W(4, m.content.length);
                s._W(2, k.length);
                s._W(2, 0);
                s._W(2, 0);
                s._W(2, 0);
                s._W(2, 0);
                s._W(4, 0);
                s._W(4, w);
                g += s.l;
                i.push(s);
                g += k.length;
                i.push(k);
                ++d
            }
            s = ba(22);
            s._W(4, 101010256);
            s._W(2, 0);
            s._W(2, 0);
            s._W(2, d);
            s._W(2, d);
            s._W(4, g);
            s._W(4, h);
            s._W(2, 0);
            return I([I(a), I(i), s])
        }
        var De = {
            htm: "text/html",
            xml: "text/xml",
            gif: "image/gif",
            jpg: "image/jpeg",
            png: "image/png",
            mso: "application/x-mso",
            thmx: "application/vnd.ms-officetheme",
            sh33tj5: "application/octet-stream"
        };

        function Pe(e, r) {
            if (e.ctype) return e.ctype;
            var t = e.name || "",
                a = t.match(/\.([^\.]+)$/);
            if (a && De[a[1]]) return De[a[1]];
            if (r) {
                a = (t = r).match(/[\.\\]([^\.\\])+$/);
                if (a && De[a[1]]) return De[a[1]]
            }
            return "application/octet-stream"
        }

        function Le(e) {
            var r = k(e);
            var t = [];
            for (var a = 0; a < r.length; a += 76) t.push(r.slice(a, a + 76));
            return t.join("\r\n") + "\r\n"
        }

        function Me(e) {
            var r = e.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function (e) {
                var r = e.charCodeAt(0).toString(16).toUpperCase();
                return "=" + (r.length == 1 ? "0" + r : r)
            });
            r = r.replace(/ $/gm, "=20").replace(/\t$/gm, "=09");
            if (r.charAt(0) == "\n") r = "=0D" + r.slice(1);
            r = r.replace(/\r(?!\n)/gm, "=0D").replace(/\n\n/gm, "\n=0A").replace(/([^\r\n])\n/gm, "$1=0A");
            var t = [],
                a = r.split("\r\n");
            for (var n = 0; n < a.length; ++n) {
                var i = a[n];
                if (i.length == 0) {
                    t.push("");
                    continue
                }
                for (var s = 0; s < i.length;) {
                    var f = 76;
                    var o = i.slice(s, s + f);
                    if (o.charAt(f - 1) == "=") f--;
                    else if (o.charAt(f - 2) == "=") f -= 2;
                    else if (o.charAt(f - 3) == "=") f -= 3;
                    o = i.slice(s, s + f);
                    s += f;
                    if (s < i.length) o += "=";
                    t.push(o)
                }
            }
            return t.join("\r\n")
        }

        function Ue(e) {
            var r = [];
            for (var t = 0; t < e.length; ++t) {
                var a = e[t];
                while (t <= e.length && a.charAt(a.length - 1) == "=") a = a.slice(0, a.length - 1) + e[++t];
                r.push(a)
            }
            for (var n = 0; n < r.length; ++n) r[n] = r[n].replace(/[=][0-9A-Fa-f]{2}/g, function (e) {
                return String.fromCharCode(parseInt(e.slice(1), 16))
            });
            return A(r.join("\r\n"))
        }

        function Be(e, r, t) {
            var a = "",
                n = "",
                i = "",
                s;
            var f = 0;
            for (; f < 10; ++f) {
                var o = r[f];
                if (!o || o.match(/^\s*$/)) break;
                var c = o.match(/^(.*?):\s*([^\s].*)$/);
                if (c) switch (c[1].toLowerCase()) {
                    case "content-location":
                        a = c[2].trim();
                        break;
                    case "content-type":
                        i = c[2].trim();
                        break;
                    case "content-transfer-encoding":
                        n = c[2].trim();
                        break;
                }
            }++f;
            switch (n.toLowerCase()) {
                case "base64":
                    s = A(T(r.slice(f).join("")));
                    break;
                case "quoted-printable":
                    s = Ue(r.slice(f));
                    break;
                default:
                    throw new Error("Unsupported Content-Transfer-Encoding " + n);
            }
            var l = Ve(e, a.slice(t.length), s, {
                unsafe: true
            });
            if (i) l.ctype = i
        }

        function We(e, r) {
            if (G(e.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
            var t = r && r.root || "";
            var a = (E && Buffer.isBuffer(e) ? e.toString("binary") : G(e)).split("\r\n");
            var n = 0,
                i = "";
            for (n = 0; n < a.length; ++n) {
                i = a[n];
                if (!/^Content-Location:/i.test(i)) continue;
                i = i.slice(i.indexOf("file"));
                if (!t) t = i.slice(0, i.lastIndexOf("/") + 1);
                if (i.slice(0, t.length) == t) continue;
                while (t.length > 0) {
                    t = t.slice(0, t.length - 1);
                    t = t.slice(0, t.lastIndexOf("/") + 1);
                    if (i.slice(0, t.length) == t) break
                }
            }
            var s = (a[1] || "").match(/boundary="(.*?)"/);
            if (!s) throw new Error("MAD cannot find boundary");
            var f = "--" + (s[1] || "");
            var o = [],
                c = [];
            var l = {
                FileIndex: o,
                FullPaths: c
            };
            R(l);
            var u, h = 0;
            for (n = 0; n < a.length; ++n) {
                var d = a[n];
                if (d !== f && d !== f + "--") continue;
                if (h++) Be(l, a.slice(u, n), t);
                u = n
            }
            return l
        }

        function He(e, r) {
            var t = r || {};
            var a = t.boundary || "SheetJS";
            a = "------=" + a;
            var n = ["MIME-Version: 1.0", 'Content-Type: multipart/related; boundary="' + a.slice(2) + '"', "", "", ""];
            var i = e.FullPaths[0],
                s = i,
                f = e.FileIndex[0];
            for (var o = 1; o < e.FullPaths.length; ++o) {
                s = e.FullPaths[o].slice(i.length);
                f = e.FileIndex[o];
                if (!f.size || !f.content || s == "Sh33tJ5") continue;
                s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function (e) {
                    return "_x" + e.charCodeAt(0).toString(16) + "_"
                }).replace(/[\u0080-\uFFFF]/g, function (e) {
                    return "_u" + e.charCodeAt(0).toString(16) + "_"
                });
                var c = f.content;
                var l = E && Buffer.isBuffer(c) ? c.toString("binary") : G(c);
                var u = 0,
                    h = Math.min(1024, l.length),
                    d = 0;
                for (var v = 0; v <= h; ++v)
                    if ((d = l.charCodeAt(v)) >= 32 && d < 128) ++u;
                var p = u >= h * 4 / 5;
                n.push(a);
                n.push("Content-Location: " + (t.root || "file:///C:/SheetJS/") + s);
                n.push("Content-Transfer-Encoding: " + (p ? "quoted-printable" : "base64"));
                n.push("Content-Type: " + Pe(f, s));
                n.push("");
                n.push(p ? Me(l) : Le(l))
            }
            n.push(a + "--\r\n");
            return n.join("\r\n")
        }

        function ze(e) {
            var r = {};
            R(r, e);
            return r
        }

        function Ve(e, r, t, n) {
            var i = n && n.unsafe;
            if (!i) R(e);
            var s = !i && Ze.find(e, r);
            if (!s) {
                var f = e.FullPaths[0];
                if (r.slice(0, f.length) == f) f = r;
                else {
                    if (f.slice(-1) != "/") f += "/";
                    f = (f + r).replace("//", "/")
                }
                s = {
                    name: a(r),
                    type: 2
                };
                e.FileIndex.push(s);
                e.FullPaths.push(f);
                if (!i) Ze.utils.cfb_gc(e)
            }
            s.content = t;
            s.size = t ? t.length : 0;
            if (n) {
                if (n.CLSID) s.clsid = n.CLSID;
                if (n.mt) s.mt = n.mt;
                if (n.ct) s.ct = n.ct
            }
            return s
        }

        function Ge(e, r) {
            R(e);
            var t = Ze.find(e, r);
            if (t)
                for (var a = 0; a < e.FileIndex.length; ++a)
                    if (e.FileIndex[a] == t) {
                        e.FileIndex.splice(a, 1);
                        e.FullPaths.splice(a, 1);
                        return true
                    } return false
        }

        function je(e, r, t) {
            R(e);
            var n = Ze.find(e, r);
            if (n)
                for (var i = 0; i < e.FileIndex.length; ++i)
                    if (e.FileIndex[i] == n) {
                        e.FileIndex[i].name = a(t);
                        e.FullPaths[i] = t;
                        return true
                    } return false
        }

        function Xe(e) {
            N(e, true)
        }
        e.find = L;
        e.read = C;
        e.parse = c;
        e.write = j;
        e.writeFile = V;
        e.utils = {
            cfb_new: ze,
            cfb_add: Ve,
            cfb_del: Ge,
            cfb_mov: je,
            cfb_gc: Xe,
            ReadShift: ca,
            CheckField: va,
            prep_blob: pa,
            bconcat: I,
            use_zlib: $,
            _deflateRaw: Te,
            _inflateRaw: Re,
            consts: z
        };
        return e
    }();
    var Qe;

    function er(e) {
        Qe = e
    }

    function rr(e) {
        if (typeof e === "string") return x(e);
        if (Array.isArray(e)) return R(e);
        return e
    }

    function tr(e, r, t) {
        if (typeof Qe !== "undefined" && Qe.writeFileSync) return t ? Qe.writeFileSync(e, r, t) : Qe.writeFileSync(e, r);
        if (typeof Deno !== "undefined") {
            if (t && typeof r == "string") switch (t) {
                case "utf8":
                    r = new TextEncoder(t).encode(r);
                    break;
                case "binary":
                    r = x(r);
                    break;
                default:
                    throw new Error("Unsupported encoding " + t);
            }
            return Deno.writeFileSync(e, r)
        }
        var a = t == "utf8" ? pt(r) : r;
        if (typeof IE_SaveFile !== "undefined") return IE_SaveFile(a, e);
        if (typeof Blob !== "undefined") {
            var n = new Blob([rr(a)], {
                type: "application/octet-stream"
            });
            if (typeof navigator !== "undefined" && navigator.msSaveBlob) return navigator.msSaveBlob(n, e);
            if (typeof saveAs !== "undefined") return saveAs(n, e);
            if (typeof URL !== "undefined" && typeof document !== "undefined" && document.createElement && URL.createObjectURL) {
                var i = URL.createObjectURL(n);
                if (typeof chrome === "object" && typeof (chrome.downloads || {}).download == "function") {
                    if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function () {
                        URL.revokeObjectURL(i)
                    }, 6e4);
                    return chrome.downloads.download({
                        url: i,
                        filename: e,
                        saveAs: true
                    })
                }
                var s = document.createElement("a");
                if (s.download != null) {
                    s.download = e;
                    s.href = i;
                    document.body.appendChild(s);
                    s.click();
                    document.body.removeChild(s);
                    if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function () {
                        URL.revokeObjectURL(i)
                    }, 6e4);
                    return i
                }
            }
        }
        if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
            var f = File(e);
            f.open("w");
            f.encoding = "binary";
            if (Array.isArray(r)) r = C(r);
            f.write(r);
            f.close();
            return r
        } catch (o) {
            if (!o.message || !o.message.match(/onstruct/)) throw o
        }
        throw new Error("cannot save file " + e)
    }

    function ar(e) {
        if (typeof Qe !== "undefined") return Qe.readFileSync(e);
        if (typeof Deno !== "undefined") return Deno.readFileSync(e);
        if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
            var r = File(e);
            r.open("r");
            r.encoding = "binary";
            var t = r.read();
            r.close();
            return t
        } catch (a) {
            if (!a.message || !a.message.match(/onstruct/)) throw a
        }
        throw new Error("Cannot access file " + e)
    }

    function nr(e) {
        var r = Object.keys(e),
            t = [];
        for (var a = 0; a < r.length; ++a)
            if (Object.prototype.hasOwnProperty.call(e, r[a])) t.push(r[a]);
        return t
    }

    function ir(e, r) {
        var t = [],
            a = nr(e);
        for (var n = 0; n !== a.length; ++n)
            if (t[e[a[n]][r]] == null) t[e[a[n]][r]] = a[n];
        return t
    }

    function sr(e) {
        var r = [],
            t = nr(e);
        for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = t[a];
        return r
    }

    function fr(e) {
        var r = [],
            t = nr(e);
        for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = parseInt(t[a], 10);
        return r
    }

    function or(e) {
        var r = [],
            t = nr(e);
        for (var a = 0; a !== t.length; ++a) {
            if (r[e[t[a]]] == null) r[e[t[a]]] = [];
            r[e[t[a]]].push(t[a])
        }
        return r
    }
    var cr = new Date(1899, 11, 30, 0, 0, 0);

    function lr(e, r) {
        var t = e.getTime();
        if (r) t -= 1462 * 24 * 60 * 60 * 1e3;
        var a = cr.getTime() + (e.getTimezoneOffset() - cr.getTimezoneOffset()) * 6e4;
        return (t - a) / (24 * 60 * 60 * 1e3)
    }
    var ur = new Date;
    var hr = cr.getTime() + (ur.getTimezoneOffset() - cr.getTimezoneOffset()) * 6e4;
    var dr = ur.getTimezoneOffset();

    function vr(e) {
        var r = new Date;
        r.setTime(e * 24 * 60 * 60 * 1e3 + hr);
        if (r.getTimezoneOffset() !== dr) {
            r.setTime(r.getTime() + (r.getTimezoneOffset() - dr) * 6e4)
        }
        return r
    }

    function pr(e) {
        var r = 0,
            t = 0,
            a = false;
        var n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
        if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
        for (var i = 1; i != n.length; ++i) {
            if (!n[i]) continue;
            t = 1;
            if (i > 3) a = true;
            switch (n[i].slice(n[i].length - 1)) {
                case "Y":
                    throw new Error("Unsupported ISO Duration Field: " + n[i].slice(n[i].length - 1));
                case "D":
                    t *= 24;
                case "H":
                    t *= 60;
                case "M":
                    if (!a) throw new Error("Unsupported ISO Duration Field: M");
                    else t *= 60;
                case "S":
                    break;
            }
            r += t * parseInt(n[i], 10)
        }
        return r
    }
    var mr = new Date("2017-02-19T19:06:09.000Z");
    var br = isNaN(mr.getFullYear()) ? new Date("2/19/17") : mr;
    var gr = br.getFullYear() == 2017;

    function wr(e, r) {
        var t = new Date(e);
        if (gr) {
            if (r > 0) t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
            else if (r < 0) t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3);
            return t
        }
        if (e instanceof Date) return e;
        if (br.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
            var a = t.getFullYear();
            if (e.indexOf("" + a) > -1) return t;
            t.setFullYear(t.getFullYear() + 100);
            return t
        }
        var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"];
        var i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
        if (e.indexOf("Z") > -1) i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3);
        return i
    }

    function kr(e, r) {
        if (E && Buffer.isBuffer(e)) {
            if (r) {
                if (e[0] == 255 && e[1] == 254) return pt(e.slice(2).toString("utf16le"));
                if (e[1] == 254 && e[2] == 255) return pt(h(e.slice(2).toString("binary")))
            }
            return e.toString("binary")
        }
        if (typeof TextDecoder !== "undefined") try {
            if (r) {
                if (e[0] == 255 && e[1] == 254) return pt(new TextDecoder("utf-16le").decode(e.slice(2)));
                if (e[0] == 254 && e[1] == 255) return pt(new TextDecoder("utf-16be").decode(e.slice(2)))
            }
            var t = {
                "€": "",
                "‚": "",
                "ƒ": "",
                "„": "",
                "…": "",
                "†": "",
                "‡": "",
                "ˆ": "",
                "‰": "",
                "Š": "",
                "‹": "",
                "Œ": "",
                "Ž": "",
                "‘": "",
                "’": "",
                "“": "",
                "”": "",
                "•": "",
                "–": "",
                "—": "",
                "˜": "",
                "™": "",
                "š": "",
                "›": "",
                "œ": "",
                "ž": "",
                "Ÿ": ""
            };
            if (Array.isArray(e)) e = new Uint8Array(e);
            return new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function (e) {
                return t[e] || e
            })
        } catch (a) {}
        var n = [];
        for (var i = 0; i != e.length; ++i) n.push(String.fromCharCode(e[i]));
        return n.join("")
    }

    function Tr(e) {
        if (typeof JSON != "undefined" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
        if (typeof e != "object" || e == null) return e;
        if (e instanceof Date) return new Date(e.getTime());
        var r = {};
        for (var t in e)
            if (Object.prototype.hasOwnProperty.call(e, t)) r[t] = Tr(e[t]);
        return r
    }

    function Er(e, r) {
        var t = "";
        while (t.length < r) t += e;
        return t
    }

    function yr(e) {
        var r = Number(e);
        if (!isNaN(r)) return isFinite(r) ? r : NaN;
        if (!/\d/.test(e)) return r;
        var t = 1;
        var a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function () {
            t *= 100;
            return ""
        });
        if (!isNaN(r = Number(a))) return r / t;
        a = a.replace(/[(](.*)[)]/, function (e, r) {
            t = -t;
            return r
        });
        if (!isNaN(r = Number(a))) return r / t;
        return r
    }
    var Sr = /^(0?\d|1[0-2])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))([ap])m?/;

    function _r(e) {
        if (!e[2]) return new Date(1900, 0, 0, +e[1] % 12 + (e[7] == "p" ? 12 : 0), 0, 0, 0);
        if (e[3]) {
            if (e[4]) return new Date(1900, 0, 0, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[4], parseFloat(e[3]) * 1e3);
            else return new Date(1900, 0, 0, e[7] == "p" ? 12 : 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)
        } else if (e[5]) return new Date(1900, 0, 0, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0);
        else return new Date(1900, 0, 0, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], 0, 0)
    }
    var Ar = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    function xr(e) {
        var r = e.toLowerCase();
        var t = r.replace(/\s+/g, "");
        var a = t.match(Sr);
        if (a) return _r(a);
        var n = new Date(e),
            i = new Date(NaN);
        var s = n.getYear(),
            f = n.getMonth(),
            o = n.getDate();
        if (isNaN(o)) return i;
        if (r.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
            r = r.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, "");
            if (r.length > 3 && Ar.indexOf(r) == -1) return i
        } else if (r.replace(/[ap]m?/, "").match(/[a-z]/)) return i;
        if (s < 0 || s > 8099) return i;
        if ((f > 0 || o > 1) && s != 101) return n;
        if (e.match(/[^-0-9:,\/\\]/)) return i;
        return n
    }
    var Cr = function () {
        var e = "abacaba".split(/(:?b)/i).length == 5;
        return function r(t, a, n) {
            if (e || typeof a == "string") return t.split(a);
            var i = t.split(a),
                s = [i[0]];
            for (var f = 1; f < i.length; ++f) {
                s.push(n);
                s.push(i[f])
            }
            return s
        }
    }();

    function Rr(e) {
        if (!e) return null;
        if (e.content && e.type) return kr(e.content, true);
        if (e.data) return d(e.data);
        if (e.asNodeBuffer && E) return d(e.asNodeBuffer().toString("binary"));
        if (e.asBinary) return d(e.asBinary());
        if (e._data && e._data.getContent) return d(kr(Array.prototype.slice.call(e._data.getContent(), 0)));
        return null
    }

    function Or(e) {
        if (!e) return null;
        if (e.data) return l(e.data);
        if (e.asNodeBuffer && E) return e.asNodeBuffer();
        if (e._data && e._data.getContent) {
            var r = e._data.getContent();
            if (typeof r == "string") return l(r);
            return Array.prototype.slice.call(r)
        }
        if (e.content && e.type) return e.content;
        return null
    }

    function Ir(e) {
        return e && e.name.slice(-4) === ".bin" ? Or(e) : Rr(e)
    }

    function Nr(e, r) {
        var t = e.FullPaths || nr(e.files);
        var a = r.toLowerCase().replace(/[\/]/g, "\\"),
            n = a.replace(/\\/g, "/");
        for (var i = 0; i < t.length; ++i) {
            var s = t[i].replace(/^Root Entry[\/]/, "").toLowerCase();
            if (a == s || n == s) return e.files ? e.files[t[i]] : e.FileIndex[i]
        }
        return null
    }

    function Fr(e, r) {
        var t = Nr(e, r);
        if (t == null) throw new Error("Cannot find file " + r + " in zip");
        return t
    }

    function Dr(e, r, t) {
        if (!t) return Ir(Fr(e, r));
        if (!r) return null;
        try {
            return Dr(e, r)
        } catch (a) {
            return null
        }
    }

    function Pr(e, r, t) {
        if (!t) return Rr(Fr(e, r));
        if (!r) return null;
        try {
            return Pr(e, r)
        } catch (a) {
            return null
        }
    }

    function Lr(e, r, t) {
        if (!t) return Or(Fr(e, r));
        if (!r) return null;
        try {
            return Lr(e, r)
        } catch (a) {
            return null
        }
    }

    function Mr(e) {
        var r = e.FullPaths || nr(e.files),
            t = [];
        for (var a = 0; a < r.length; ++a)
            if (r[a].slice(-1) != "/") t.push(r[a].replace(/^Root Entry[\/]/, ""));
        return t.sort()
    }

    function Ur(e, r, t) {
        if (e.FullPaths) {
            if (typeof t == "string") {
                var a;
                if (E) a = y(t);
                else a = N(t);
                return Ze.utils.cfb_add(e, r, a)
            }
            Ze.utils.cfb_add(e, r, t)
        } else e.file(r, t)
    }

    function Br() {
        return Ze.utils.cfb_new()
    }

    function Wr(e, r) {
        switch (r.type) {
            case "base64":
                return Ze.read(e, {
                    type: "base64"
                });
            case "binary":
                return Ze.read(e, {
                    type: "binary"
                });
            case "buffer":
                ;
            case "array":
                return Ze.read(e, {
                    type: "buffer"
                });
        }
        throw new Error("Unrecognized type " + r.type)
    }

    function Hr(e, r) {
        if (e.charAt(0) == "/") return e.slice(1);
        var t = r.split("/");
        if (r.slice(-1) != "/") t.pop();
        var a = e.split("/");
        while (a.length !== 0) {
            var n = a.shift();
            if (n === "..") t.pop();
            else if (n !== ".") t.push(n)
        }
        return t.join("/")
    }
    var zr = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
    var Vr = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;
    var Gr = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/gm,
        jr = /<[^>]*>/g;
    var Xr = zr.match(Gr) ? Gr : jr;
    var $r = /<\w*:/,
        Yr = /<(\/?)\w+:/;

    function Kr(e, r, t) {
        var a = {};
        var n = 0,
            i = 0;
        for (; n !== e.length; ++n)
            if ((i = e.charCodeAt(n)) === 32 || i === 10 || i === 13) break;
        if (!r) a[0] = e.slice(0, n);
        if (n === e.length) return a;
        var s = e.match(Vr),
            f = 0,
            o = "",
            c = 0,
            l = "",
            u = "",
            h = 1;
        if (s)
            for (c = 0; c != s.length; ++c) {
                u = s[c];
                for (i = 0; i != u.length; ++i)
                    if (u.charCodeAt(i) === 61) break;
                l = u.slice(0, i).trim();
                while (u.charCodeAt(i + 1) == 32) ++i;
                h = (n = u.charCodeAt(i + 1)) == 34 || n == 39 ? 1 : 0;
                o = u.slice(i + 1 + h, u.length - h);
                for (f = 0; f != l.length; ++f)
                    if (l.charCodeAt(f) === 58) break;
                if (f === l.length) {
                    if (l.indexOf("_") > 0) l = l.slice(0, l.indexOf("_"));
                    a[l] = o;
                    if (!t) a[l.toLowerCase()] = o
                } else {
                    var d = (f === 5 && l.slice(0, 5) === "xmlns" ? "xmlns" : "") + l.slice(f + 1);
                    if (a[d] && l.slice(f - 3, f) == "ext") continue;
                    a[d] = o;
                    if (!t) a[d.toLowerCase()] = o
                }
            }
        return a
    }

    function Jr(e) {
        return e.replace(Yr, "<$1")
    }
    var qr = {
        "&quot;": '"',
        "&apos;": "'",
        "&gt;": ">",
        "&lt;": "<",
        "&amp;": "&"
    };
    var Zr = sr(qr);
    var Qr = function () {
        var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,
            r = /_x([\da-fA-F]{4})_/gi;

        function t(a) {
            var n = a + "",
                i = n.indexOf("<![CDATA[");
            if (i == -1) return n.replace(e, function (e, r) {
                return qr[e] || String.fromCharCode(parseInt(r, e.indexOf("x") > -1 ? 16 : 10)) || e
            }).replace(r, function (e, r) {
                return String.fromCharCode(parseInt(r, 16))
            });
            var s = n.indexOf("]]>");
            return t(n.slice(0, i)) + n.slice(i + 9, s) + t(n.slice(s + 3))
        }
        return function a(e, r) {
            var a = t(e);
            return r ? a.replace(/\r\n/g, "\n") : a
        }
    }();
    var et = /[&<>'"]/g,
        rt = /[\u0000-\u0008\u000b-\u001f\uFFFE-\uFFFF]/g;

    function tt(e) {
        var r = e + "";
        return r.replace(et, function (e) {
            return Zr[e]
        }).replace(rt, function (e) {
            return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + "_"
        })
    }

    function at(e) {
        return tt(e).replace(/ /g, "_x0020_")
    }
    var nt = /[\u0000-\u001f]/g;

    function it(e) {
        var r = e + "";
        return r.replace(et, function (e) {
            return Zr[e]
        }).replace(/\n/g, "<br/>").replace(nt, function (e) {
            return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";"
        })
    }

    function st(e) {
        var r = e + "";
        return r.replace(et, function (e) {
            return Zr[e]
        }).replace(nt, function (e) {
            return "&#x" + e.charCodeAt(0).toString(16).toUpperCase() + ";"
        })
    }
    var ft = function () {
        var e = /&#(\d+);/g;

        function r(e, r) {
            return String.fromCharCode(parseInt(r, 10))
        }
        return function t(a) {
            return a.replace(e, r)
        }
    }();

    function ot(e) {
        return e.replace(/(\r\n|[\r\n])/g, "&#10;")
    }

    function ct(e) {
        switch (e) {
            case 1:
                ;
            case true:
                ;
            case "1":
                ;
            case "true":
                return true;
            case 0:
                ;
            case false:
                ;
            case "0":
                ;
            case "false":
                return false;
        }
        return false
    }

    function lt(e) {
        var r = "",
            t = 0,
            a = 0,
            n = 0,
            i = 0,
            s = 0,
            f = 0;
        while (t < e.length) {
            a = e.charCodeAt(t++);
            if (a < 128) {
                r += String.fromCharCode(a);
                continue
            }
            n = e.charCodeAt(t++);
            if (a > 191 && a < 224) {
                s = (a & 31) << 6;
                s |= n & 63;
                r += String.fromCharCode(s);
                continue
            }
            i = e.charCodeAt(t++);
            if (a < 240) {
                r += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
                continue
            }
            s = e.charCodeAt(t++);
            f = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536;
            r += String.fromCharCode(55296 + (f >>> 10 & 1023));
            r += String.fromCharCode(56320 + (f & 1023))
        }
        return r
    }

    function ut(e) {
        var r = S(2 * e.length),
            t, a, n = 1,
            i = 0,
            s = 0,
            f;
        for (a = 0; a < e.length; a += n) {
            n = 1;
            if ((f = e.charCodeAt(a)) < 128) t = f;
            else if (f < 224) {
                t = (f & 31) * 64 + (e.charCodeAt(a + 1) & 63);
                n = 2
            } else if (f < 240) {
                t = (f & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63);
                n = 3
            } else {
                n = 4;
                t = (f & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63);
                t -= 65536;
                s = 55296 + (t >>> 10 & 1023);
                t = 56320 + (t & 1023)
            }
            if (s !== 0) {
                r[i++] = s & 255;
                r[i++] = s >>> 8;
                s = 0
            }
            r[i++] = t % 256;
            r[i++] = t >>> 8
        }
        return r.slice(0, i).toString("ucs2")
    }

    function ht(e) {
        return y(e, "binary").toString("utf8")
    }
    var dt = "foo bar bazâð£";
    var vt = E && (ht(dt) == lt(dt) && ht || ut(dt) == lt(dt) && ut) || lt;
    var pt = E ? function (e) {
        return y(e, "utf8").toString("binary")
    } : function (e) {
        var r = [],
            t = 0,
            a = 0,
            n = 0;
        while (t < e.length) {
            a = e.charCodeAt(t++);
            switch (true) {
                case a < 128:
                    r.push(String.fromCharCode(a));
                    break;
                case a < 2048:
                    r.push(String.fromCharCode(192 + (a >> 6)));
                    r.push(String.fromCharCode(128 + (a & 63)));
                    break;
                case a >= 55296 && a < 57344:
                    a -= 55296;
                    n = e.charCodeAt(t++) - 56320 + (a << 10);
                    r.push(String.fromCharCode(240 + (n >> 18 & 7)));
                    r.push(String.fromCharCode(144 + (n >> 12 & 63)));
                    r.push(String.fromCharCode(128 + (n >> 6 & 63)));
                    r.push(String.fromCharCode(128 + (n & 63)));
                    break;
                default:
                    r.push(String.fromCharCode(224 + (a >> 12)));
                    r.push(String.fromCharCode(128 + (a >> 6 & 63)));
                    r.push(String.fromCharCode(128 + (a & 63)));
            }
        }
        return r.join("")
    };
    var mt = function () {
        var e = {};
        return function r(t, a) {
            var n = t + "|" + (a || "");
            if (e[n]) return e[n];
            return e[n] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", a || "")
        }
    }();
    var bt = function () {
        var e = [
            ["nbsp", " "],
            ["middot", "·"],
            ["quot", '"'],
            ["apos", "'"],
            ["gt", ">"],
            ["lt", "<"],
            ["amp", "&"]
        ].map(function (e) {
            return [new RegExp("&" + e[0] + ";", "ig"), e[1]]
        });
        return function r(t) {
            var a = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, "");
            for (var n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
            return a
        }
    }();
    var gt = function () {
        var e = {};
        return function r(t) {
            if (e[t] !== undefined) return e[t];
            return e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g")
        }
    }();
    var wt = /<\/?(?:vt:)?variant>/g,
        kt = /<(?:vt:)([^>]*)>([\s\S]*)</;

    function Tt(e, r) {
        var t = Kr(e);
        var a = e.match(gt(t.baseType)) || [];
        var n = [];
        if (a.length != t.size) {
            if (r.WTF) throw new Error("unexpected vector length " + a.length + " != " + t.size);
            return n
        }
        a.forEach(function (e) {
            var r = e.replace(wt, "").match(kt);
            if (r) n.push({
                v: vt(r[2]),
                t: r[1]
            })
        });
        return n
    }
    var Et = /(^\s|\s$|\n)/;

    function yt(e, r) {
        return "<" + e + (r.match(Et) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">"
    }

    function St(e) {
        return nr(e).map(function (r) {
            return " " + r + '="' + e[r] + '"'
        }).join("")
    }

    function _t(e, r, t) {
        return "<" + e + (t != null ? St(t) : "") + (r != null ? (r.match(Et) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">"
    }

    function At(e, r) {
        try {
            return e.toISOString().replace(/\.\d*/, "")
        } catch (t) {
            if (r) throw t
        }
        return ""
    }

    function xt(e, r) {
        switch (typeof e) {
            case "string":
                var t = _t("vt:lpwstr", tt(e));
                if (r) t = t.replace(/&quot;/g, "_x0022_");
                return t;
            case "number":
                return _t((e | 0) == e ? "vt:i4" : "vt:r8", tt(String(e)));
            case "boolean":
                return _t("vt:bool", e ? "true" : "false");
        }
        if (e instanceof Date) return _t("vt:filetime", At(e));
        throw new Error("Unable to serialize " + e)
    }

    function Ct(e) {
        if (E && Buffer.isBuffer(e)) return e.toString("utf8");
        if (typeof e === "string") return e;
        if (typeof Uint8Array !== "undefined" && e instanceof Uint8Array) return vt(C(O(e)));
        throw new Error("Bad input format: expected Buffer or string")
    }
    var Rt = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm;
    var Ot = {
        CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
        CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
        EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
        CT: "http://schemas.openxmlformats.org/package/2006/content-types",
        RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
        TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
        dc: "http://purl.org/dc/elements/1.1/",
        dcterms: "http://purl.org/dc/terms/",
        dcmitype: "http://purl.org/dc/dcmitype/",
        mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        xsd: "http://www.w3.org/2001/XMLSchema"
    };
    var It = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"];
    var Nt = {
        o: "urn:schemas-microsoft-com:office:office",
        x: "urn:schemas-microsoft-com:office:excel",
        ss: "urn:schemas-microsoft-com:office:spreadsheet",
        dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
        mv: "http://macVmlSchemaUri",
        v: "urn:schemas-microsoft-com:vml",
        html: "http://www.w3.org/TR/REC-html40"
    };

    function Ft(e, r) {
        var t = 1 - 2 * (e[r + 7] >>> 7);
        var a = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15);
        var n = e[r + 6] & 15;
        for (var i = 5; i >= 0; --i) n = n * 256 + e[r + i];
        if (a == 2047) return n == 0 ? t * Infinity : NaN;
        if (a == 0) a = -1022;
        else {
            a -= 1023;
            n += Math.pow(2, 52)
        }
        return t * Math.pow(2, a - 52) * n
    }

    function Dt(e, r, t) {
        var a = (r < 0 || 1 / r == -Infinity ? 1 : 0) << 7,
            n = 0,
            i = 0;
        var s = a ? -r : r;
        if (!isFinite(s)) {
            n = 2047;
            i = isNaN(r) ? 26985 : 0
        } else if (s == 0) n = i = 0;
        else {
            n = Math.floor(Math.log(s) / Math.LN2);
            i = s * Math.pow(2, 52 - n);
            if (n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) {
                n = -1022
            } else {
                i -= Math.pow(2, 52);
                n += 1023
            }
        }
        for (var f = 0; f <= 5; ++f, i /= 256) e[t + f] = i & 255;
        e[t + 6] = (n & 15) << 4 | i & 15;
        e[t + 7] = n >> 4 | a
    }
    var Pt = function (e) {
        var r = [],
            t = 10240;
        for (var a = 0; a < e[0].length; ++a)
            if (e[0][a])
                for (var n = 0, i = e[0][a].length; n < i; n += t) r.push.apply(r, e[0][a].slice(n, n + t));
        return r
    };
    var Lt = E ? function (e) {
        return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function (e) {
            return Buffer.isBuffer(e) ? e : y(e)
        })) : Pt(e)
    } : Pt;
    var Mt = function (e, r, t) {
        var a = [];
        for (var n = r; n < t; n += 2) a.push(String.fromCharCode(na(e, n)));
        return a.join("").replace(F, "")
    };
    var Ut = E ? function (e, r, t) {
        if (!Buffer.isBuffer(e)) return Mt(e, r, t);
        return e.toString("utf16le", r, t).replace(F, "")
    } : Mt;
    var Bt = function (e, r, t) {
        var a = [];
        for (var n = r; n < r + t; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
        return a.join("")
    };
    var Wt = E ? function (e, r, t) {
        return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : Bt(e, r, t)
    } : Bt;
    var Ht = function (e, r, t) {
        var a = [];
        for (var n = r; n < t; n++) a.push(String.fromCharCode(aa(e, n)));
        return a.join("")
    };
    var zt = E ? function Kw(e, r, t) {
        return Buffer.isBuffer(e) ? e.toString("utf8", r, t) : Ht(e, r, t)
    } : Ht;
    var Vt = function (e, r) {
        var t = sa(e, r);
        return t > 0 ? zt(e, r + 4, r + 4 + t - 1) : ""
    };
    var Gt = Vt;
    var jt = function (e, r) {
        var t = sa(e, r);
        return t > 0 ? zt(e, r + 4, r + 4 + t - 1) : ""
    };
    var Xt = jt;
    var $t = function (e, r) {
        var t = 2 * sa(e, r);
        return t > 0 ? zt(e, r + 4, r + 4 + t - 1) : ""
    };
    var Yt = $t;
    var Kt = function Jw(e, r) {
        var t = sa(e, r);
        return t > 0 ? Ut(e, r + 4, r + 4 + t) : ""
    };
    var Jt = Kt;
    var qt = function (e, r) {
        var t = sa(e, r);
        return t > 0 ? zt(e, r + 4, r + 4 + t) : ""
    };
    var Zt = qt;
    var Qt = function (e, r) {
        return Ft(e, r)
    };
    var ea = Qt;
    var ra = function qw(e) {
        return Array.isArray(e) || typeof Uint8Array !== "undefined" && e instanceof Uint8Array
    };
    if (E) {
        Gt = function Zw(e, r) {
            if (!Buffer.isBuffer(e)) return Vt(e, r);
            var t = e.readUInt32LE(r);
            return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
        };
        Xt = function Qw(e, r) {
            if (!Buffer.isBuffer(e)) return jt(e, r);
            var t = e.readUInt32LE(r);
            return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
        };
        Yt = function ek(e, r) {
            if (!Buffer.isBuffer(e)) return $t(e, r);
            var t = 2 * e.readUInt32LE(r);
            return e.toString("utf16le", r + 4, r + 4 + t - 1)
        };
        Jt = function rk(e, r) {
            if (!Buffer.isBuffer(e)) return Kt(e, r);
            var t = e.readUInt32LE(r);
            return e.toString("utf16le", r + 4, r + 4 + t)
        };
        Zt = function tk(e, r) {
            if (!Buffer.isBuffer(e)) return qt(e, r);
            var t = e.readUInt32LE(r);
            return e.toString("utf8", r + 4, r + 4 + t)
        };
        ea = function ak(e, r) {
            if (Buffer.isBuffer(e)) return e.readDoubleLE(r);
            return Qt(e, r)
        };
        ra = function nk(e) {
            return Buffer.isBuffer(e) || Array.isArray(e) || typeof Uint8Array !== "undefined" && e instanceof Uint8Array
        }
    }

    function ta() {
        Ut = function (e, r, t) {
            return a.utils.decode(1200, e.slice(r, t)).replace(F, "")
        };
        zt = function (e, r, t) {
            return a.utils.decode(65001, e.slice(r, t))
        };
        Gt = function (e, r) {
            var n = sa(e, r);
            return n > 0 ? a.utils.decode(t, e.slice(r + 4, r + 4 + n - 1)) : ""
        };
        Xt = function (e, t) {
            var n = sa(e, t);
            return n > 0 ? a.utils.decode(r, e.slice(t + 4, t + 4 + n - 1)) : ""
        };
        Yt = function (e, r) {
            var t = 2 * sa(e, r);
            return t > 0 ? a.utils.decode(1200, e.slice(r + 4, r + 4 + t - 1)) : ""
        };
        Jt = function (e, r) {
            var t = sa(e, r);
            return t > 0 ? a.utils.decode(1200, e.slice(r + 4, r + 4 + t)) : ""
        };
        Zt = function (e, r) {
            var t = sa(e, r);
            return t > 0 ? a.utils.decode(65001, e.slice(r + 4, r + 4 + t)) : ""
        }
    }
    if (typeof a !== "undefined") ta();
    var aa = function (e, r) {
        return e[r]
    };
    var na = function (e, r) {
        return e[r + 1] * (1 << 8) + e[r]
    };
    var ia = function (e, r) {
        var t = e[r + 1] * (1 << 8) + e[r];
        return t < 32768 ? t : (65535 - t + 1) * -1
    };
    var sa = function (e, r) {
        return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r]
    };
    var fa = function (e, r) {
        return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]
    };
    var oa = function (e, r) {
        return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]
    };

    function ca(e, t) {
        var n = "",
            i, s, f = [],
            o, c, l, u;
        switch (t) {
            case "dbcs":
                u = this.l;
                if (E && Buffer.isBuffer(this)) n = this.slice(this.l, this.l + 2 * e).toString("utf16le");
                else
                    for (l = 0; l < e; ++l) {
                        n += String.fromCharCode(na(this, u));
                        u += 2
                    }
                e *= 2;
                break;
            case "utf8":
                n = zt(this, this.l, this.l + e);
                break;
            case "utf16le":
                e *= 2;
                n = Ut(this, this.l, this.l + e);
                break;
            case "wstr":
                if (typeof a !== "undefined") n = a.utils.decode(r, this.slice(this.l, this.l + 2 * e));
                else return ca.call(this, e, "dbcs");
                e = 2 * e;
                break;
            case "lpstr-ansi":
                n = Gt(this, this.l);
                e = 4 + sa(this, this.l);
                break;
            case "lpstr-cp":
                n = Xt(this, this.l);
                e = 4 + sa(this, this.l);
                break;
            case "lpwstr":
                n = Yt(this, this.l);
                e = 4 + 2 * sa(this, this.l);
                break;
            case "lpp4":
                e = 4 + sa(this, this.l);
                n = Jt(this, this.l);
                if (e & 2) e += 2;
                break;
            case "8lpp4":
                e = 4 + sa(this, this.l);
                n = Zt(this, this.l);
                if (e & 3) e += 4 - (e & 3);
                break;
            case "cstr":
                e = 0;
                n = "";
                while ((o = aa(this, this.l + e++)) !== 0) f.push(v(o));
                n = f.join("");
                break;
            case "_wstr":
                e = 0;
                n = "";
                while ((o = na(this, this.l + e)) !== 0) {
                    f.push(v(o));
                    e += 2
                }
                e += 2;
                n = f.join("");
                break;
            case "dbcs-cont":
                n = "";
                u = this.l;
                for (l = 0; l < e; ++l) {
                    if (this.lens && this.lens.indexOf(u) !== -1) {
                        o = aa(this, u);
                        this.l = u + 1;
                        c = ca.call(this, e - l, o ? "dbcs-cont" : "sbcs-cont");
                        return f.join("") + c
                    }
                    f.push(v(na(this, u)));
                    u += 2
                }
                n = f.join("");
                e *= 2;
                break;
            case "cpstr":
                if (typeof a !== "undefined") {
                    n = a.utils.decode(r, this.slice(this.l, this.l + e));
                    break
                };
            case "sbcs-cont":
                n = "";
                u = this.l;
                for (l = 0; l != e; ++l) {
                    if (this.lens && this.lens.indexOf(u) !== -1) {
                        o = aa(this, u);
                        this.l = u + 1;
                        c = ca.call(this, e - l, o ? "dbcs-cont" : "sbcs-cont");
                        return f.join("") + c
                    }
                    f.push(v(aa(this, u)));
                    u += 1
                }
                n = f.join("");
                break;
            default:
                switch (e) {
                    case 1:
                        i = aa(this, this.l);
                        this.l++;
                        return i;
                    case 2:
                        i = (t === "i" ? ia : na)(this, this.l);
                        this.l += 2;
                        return i;
                    case 4:
                        ;
                    case -4:
                        if (t === "i" || (this[this.l + 3] & 128) === 0) {
                            i = (e > 0 ? fa : oa)(this, this.l);
                            this.l += 4;
                            return i
                        } else {
                            s = sa(this, this.l);
                            this.l += 4
                        }
                        return s;
                    case 8:
                        ;
                    case -8:
                        if (t === "f") {
                            if (e == 8) s = ea(this, this.l);
                            else s = ea([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0);
                            this.l += 8;
                            return s
                        } else e = 8;
                    case 16:
                        n = Wt(this, this.l, e);
                        break;
                };
        }
        this.l += e;
        return n
    }
    var la = function (e, r, t) {
        e[t] = r & 255;
        e[t + 1] = r >>> 8 & 255;
        e[t + 2] = r >>> 16 & 255;
        e[t + 3] = r >>> 24 & 255
    };
    var ua = function (e, r, t) {
        e[t] = r & 255;
        e[t + 1] = r >> 8 & 255;
        e[t + 2] = r >> 16 & 255;
        e[t + 3] = r >> 24 & 255
    };
    var ha = function (e, r, t) {
        e[t] = r & 255;
        e[t + 1] = r >>> 8 & 255
    };

    function da(e, r, n) {
        var i = 0,
            s = 0;
        if (n === "dbcs") {
            for (s = 0; s != r.length; ++s) ha(this, r.charCodeAt(s), this.l + 2 * s);
            i = 2 * r.length
        } else if (n === "sbcs") {
            if (typeof a !== "undefined" && t == 874) {
                for (s = 0; s != r.length; ++s) {
                    var f = a.utils.encode(t, r.charAt(s));
                    this[this.l + s] = f[0]
                }
            } else {
                r = r.replace(/[^\x00-\x7F]/g, "_");
                for (s = 0; s != r.length; ++s) this[this.l + s] = r.charCodeAt(s) & 255
            }
            i = r.length
        } else if (n === "hex") {
            for (; s < e; ++s) {
                this[this.l++] = parseInt(r.slice(2 * s, 2 * s + 2), 16) || 0
            }
            return this
        } else if (n === "utf16le") {
            var o = Math.min(this.l + e, this.length);
            for (s = 0; s < Math.min(r.length, e); ++s) {
                var c = r.charCodeAt(s);
                this[this.l++] = c & 255;
                this[this.l++] = c >> 8
            }
            while (this.l < o) this[this.l++] = 0;
            return this
        } else switch (e) {
            case 1:
                i = 1;
                this[this.l] = r & 255;
                break;
            case 2:
                i = 2;
                this[this.l] = r & 255;
                r >>>= 8;
                this[this.l + 1] = r & 255;
                break;
            case 3:
                i = 3;
                this[this.l] = r & 255;
                r >>>= 8;
                this[this.l + 1] = r & 255;
                r >>>= 8;
                this[this.l + 2] = r & 255;
                break;
            case 4:
                i = 4;
                la(this, r, this.l);
                break;
            case 8:
                i = 8;
                if (n === "f") {
                    Dt(this, r, this.l);
                    break
                };
            case 16:
                break;
            case -4:
                i = 4;
                ua(this, r, this.l);
                break;
        }
        this.l += i;
        return this
    }

    function va(e, r) {
        var t = Wt(this, this.l, e.length >> 1);
        if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
        this.l += e.length >> 1
    }

    function pa(e, r) {
        e.l = r;
        e._R = ca;
        e.chk = va;
        e._W = da
    }

    function ma(e, r) {
        e.l += r
    }

    function ba(e) {
        var r = S(e);
        pa(r, 0);
        return r
    }

    function ga(e, r, t) {
        if (!e) return;
        var a, n, i;
        pa(e, e.l || 0);
        var s = e.length,
            f = 0,
            o = 0;
        while (e.l < s) {
            f = e._R(1);
            if (f & 128) f = (f & 127) + ((e._R(1) & 127) << 7);
            var c = cb[f] || cb[65535];
            a = e._R(1);
            i = a & 127;
            for (n = 1; n < 4 && a & 128; ++n) i += ((a = e._R(1)) & 127) << 7 * n;
            o = e.l + i;
            var l = c.f && c.f(e, i, t);
            e.l = o;
            if (r(l, c, f)) return
        }
    }

    function wa() {
        var e = [],
            r = E ? 256 : 2048;
        var t = function o(e) {
            var r = ba(e);
            pa(r, 0);
            return r
        };
        var a = t(r);
        var n = function c() {
            if (!a) return;
            if (a.length > a.l) {
                a = a.slice(0, a.l);
                a.l = a.length
            }
            if (a.length > 0) e.push(a);
            a = null
        };
        var i = function l(e) {
            if (a && e < a.length - a.l) return a;
            n();
            return a = t(Math.max(e + 1, r))
        };
        var s = function u() {
            n();
            return I(e)
        };
        var f = function h(e) {
            n();
            a = e;
            if (a.l == null) a.l = a.length;
            i(r)
        };
        return {
            next: i,
            push: f,
            end: s,
            _bufs: e
        }
    }

    function ka(e, r, t, a) {
        var n = +r,
            i;
        if (isNaN(n)) return;
        if (!a) a = cb[n].p || (t || []).length || 0;
        i = 1 + (n >= 128 ? 1 : 0) + 1;
        if (a >= 128) ++i;
        if (a >= 16384) ++i;
        if (a >= 2097152) ++i;
        var s = e.next(i);
        if (n <= 127) s._W(1, n);
        else {
            s._W(1, (n & 127) + 128);
            s._W(1, n >> 7)
        }
        for (var f = 0; f != 4; ++f) {
            if (a >= 128) {
                s._W(1, (a & 127) + 128);
                a >>= 7
            } else {
                s._W(1, a);
                break
            }
        }
        if (a > 0 && ra(t)) e.push(t)
    }

    function Ta(e, r, t) {
        var a = Tr(e);
        if (r.s) {
            if (a.cRel) a.c += r.s.c;
            if (a.rRel) a.r += r.s.r
        } else {
            if (a.cRel) a.c += r.c;
            if (a.rRel) a.r += r.r
        }
        if (!t || t.biff < 12) {
            while (a.c >= 256) a.c -= 256;
            while (a.r >= 65536) a.r -= 65536
        }
        return a
    }

    function Ea(e, r, t) {
        var a = Tr(e);
        a.s = Ta(a.s, r.s, t);
        a.e = Ta(a.e, r.s, t);
        return a
    }

    function ya(e, r) {
        if (e.cRel && e.c < 0) {
            e = Tr(e);
            while (e.c < 0) e.c += r > 8 ? 16384 : 256
        }
        if (e.rRel && e.r < 0) {
            e = Tr(e);
            while (e.r < 0) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384
        }
        var t = Pa(e);
        if (!e.cRel && e.cRel != null) t = Ia(t);
        if (!e.rRel && e.rRel != null) t = xa(t);
        return t
    }

    function Sa(e, r) {
        if (e.s.r == 0 && !e.s.rRel) {
            if (e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel) {
                return (e.s.cRel ? "" : "$") + Oa(e.s.c) + ":" + (e.e.cRel ? "" : "$") + Oa(e.e.c)
            }
        }
        if (e.s.c == 0 && !e.s.cRel) {
            if (e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel) {
                return (e.s.rRel ? "" : "$") + Aa(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Aa(e.e.r)
            }
        }
        return ya(e.s, r.biff) + ":" + ya(e.e, r.biff)
    }
    if (typeof cptable !== "undefined") m(cptable);
    else if (typeof module !== "undefined" && typeof require !== "undefined") {
        m(undefined)
    }

    function _a(e) {
        return parseInt(Ca(e), 10) - 1
    }

    function Aa(e) {
        return "" + (e + 1)
    }

    function xa(e) {
        return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
    }

    function Ca(e) {
        return e.replace(/\$(\d+)$/, "$1")
    }

    function Ra(e) {
        var r = Na(e),
            t = 0,
            a = 0;
        for (; a !== r.length; ++a) t = 26 * t + r.charCodeAt(a) - 64;
        return t - 1
    }

    function Oa(e) {
        if (e < 0) throw new Error("invalid column " + e);
        var r = "";
        for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
        return r
    }

    function Ia(e) {
        return e.replace(/^([A-Z])/, "$$$1")
    }

    function Na(e) {
        return e.replace(/^\$([A-Z])/, "$1")
    }

    function Fa(e) {
        return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
    }

    function Da(e) {
        var r = 0,
            t = 0;
        for (var a = 0; a < e.length; ++a) {
            var n = e.charCodeAt(a);
            if (n >= 48 && n <= 57) r = 10 * r + (n - 48);
            else if (n >= 65 && n <= 90) t = 26 * t + (n - 64)
        }
        return {
            c: t - 1,
            r: r - 1
        }
    }

    function Pa(e) {
        var r = e.c + 1;
        var t = "";
        for (; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
        return t + (e.r + 1)
    }

    function La(e) {
        var r = e.indexOf(":");
        if (r == -1) return {
            s: Da(e),
            e: Da(e)
        };
        return {
            s: Da(e.slice(0, r)),
            e: Da(e.slice(r + 1))
        }
    }

    function Ma(e, r) {
        if (typeof r === "undefined" || typeof r === "number") {
            return Ma(e.s, e.e)
        }
        if (typeof e !== "string") e = Pa(e);
        if (typeof r !== "string") r = Pa(r);
        return e == r ? e : e + ":" + r
    }

    function Ua(e) {
        var r = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: 0,
                r: 0
            }
        };
        var t = 0,
            a = 0,
            n = 0;
        var i = e.length;
        for (t = 0; a < i; ++a) {
            if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
            t = 26 * t + n
        }
        r.s.c = --t;
        for (t = 0; a < i; ++a) {
            if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
            t = 10 * t + n
        }
        r.s.r = --t;
        if (a === i || n != 10) {
            r.e.c = r.s.c;
            r.e.r = r.s.r;
            return r
        }++a;
        for (t = 0; a != i; ++a) {
            if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
            t = 26 * t + n
        }
        r.e.c = --t;
        for (t = 0; a != i; ++a) {
            if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
            t = 10 * t + n
        }
        r.e.r = --t;
        return r
    }

    function Ba(e, r) {
        var t = e.t == "d" && r instanceof Date;
        if (e.z != null) try {
            return e.w = We(e.z, t ? lr(r) : r)
        } catch (a) {}
        try {
            return e.w = We((e.XF || {}).numFmtId || (t ? 14 : 0), t ? lr(r) : r)
        } catch (a) {
            return "" + r
        }
    }

    function Wa(e, r, t) {
        if (e == null || e.t == null || e.t == "z") return "";
        if (e.w !== undefined) return e.w;
        if (e.t == "d" && !e.z && t && t.dateNF) e.z = t.dateNF;
        if (e.t == "e") return $n[e.v] || e.v;
        if (r == undefined) return Ba(e, e.v);
        return Ba(e, r)
    }

    function Ha(e, r) {
        var t = r && r.sheet ? r.sheet : "Sheet1";
        var a = {};
        a[t] = e;
        return {
            SheetNames: [t],
            Sheets: a
        }
    }

    function za(e, r, t) {
        var a = t || {};
        var n = e ? Array.isArray(e) : a.dense;
        if (b != null && n == null) n = b;
        var i = e || (n ? [] : {});
        var s = 0,
            f = 0;
        if (i && a.origin != null) {
            if (typeof a.origin == "number") s = a.origin;
            else {
                var o = typeof a.origin == "string" ? Da(a.origin) : a.origin;
                s = o.r;
                f = o.c
            }
            if (!i["!ref"]) i["!ref"] = "A1:A1"
        }
        var c = {
            s: {
                c: 1e7,
                r: 1e7
            },
            e: {
                c: 0,
                r: 0
            }
        };
        if (i["!ref"]) {
            var l = Ua(i["!ref"]);
            c.s.c = l.s.c;
            c.s.r = l.s.r;
            c.e.c = Math.max(c.e.c, l.e.c);
            c.e.r = Math.max(c.e.r, l.e.r);
            if (s == -1) c.e.r = s = l.e.r + 1
        }
        for (var u = 0; u != r.length; ++u) {
            if (!r[u]) continue;
            if (!Array.isArray(r[u])) throw new Error("aoa_to_sheet expects an array of arrays");
            for (var h = 0; h != r[u].length; ++h) {
                if (typeof r[u][h] === "undefined") continue;
                var d = {
                    v: r[u][h]
                };
                var v = s + u,
                    p = f + h;
                if (c.s.r > v) c.s.r = v;
                if (c.s.c > p) c.s.c = p;
                if (c.e.r < v) c.e.r = v;
                if (c.e.c < p) c.e.c = p;
                if (r[u][h] && typeof r[u][h] === "object" && !Array.isArray(r[u][h]) && !(r[u][h] instanceof Date)) d = r[u][h];
                else {
                    if (Array.isArray(d.v)) {
                        d.f = r[u][h][1];
                        d.v = d.v[0]
                    }
                    if (d.v === null) {
                        if (d.f) d.t = "n";
                        else if (a.nullError) {
                            d.t = "e";
                            d.v = 0
                        } else if (!a.sheetStubs) continue;
                        else d.t = "z"
                    } else if (typeof d.v === "number") d.t = "n";
                    else if (typeof d.v === "boolean") d.t = "b";
                    else if (d.v instanceof Date) {
                        d.z = a.dateNF || Y[14];
                        if (a.cellDates) {
                            d.t = "d";
                            d.w = We(d.z, lr(d.v))
                        } else {
                            d.t = "n";
                            d.v = lr(d.v);
                            d.w = We(d.z, d.v)
                        }
                    } else d.t = "s"
                }
                if (n) {
                    if (!i[v]) i[v] = [];
                    if (i[v][p] && i[v][p].z) d.z = i[v][p].z;
                    i[v][p] = d
                } else {
                    var m = Pa({
                        c: p,
                        r: v
                    });
                    if (i[m] && i[m].z) d.z = i[m].z;
                    i[m] = d
                }
            }
        }
        if (c.s.c < 1e7) i["!ref"] = Ma(c);
        return i
    }

    function Va(e, r) {
        return za(null, e, r)
    }

    function Ga(e) {
        return e._R(4, "i")
    }

    function ja(e, r) {
        if (!r) r = ba(4);
        r._W(4, e);
        return r
    }

    function Xa(e) {
        var r = e._R(4);
        return r === 0 ? "" : e._R(r, "dbcs")
    }

    function $a(e, r) {
        var t = false;
        if (r == null) {
            t = true;
            r = ba(4 + 2 * e.length)
        }
        r._W(4, e.length);
        if (e.length > 0) r._W(0, e, "dbcs");
        return t ? r.slice(0, r.l) : r
    }

    function Ya(e) {
        return {
            ich: e._R(2),
            ifnt: e._R(2)
        }
    }

    function Ka(e, r) {
        if (!r) r = ba(4);
        r._W(2, e.ich || 0);
        r._W(2, e.ifnt || 0);
        return r
    }

    function Ja(e, r) {
        var t = e.l;
        var a = e._R(1);
        var n = Xa(e);
        var i = [];
        var s = {
            t: n,
            h: n
        };
        if ((a & 1) !== 0) {
            var f = e._R(4);
            for (var o = 0; o != f; ++o) i.push(Ya(e));
            s.r = i
        } else s.r = [{
            ich: 0,
            ifnt: 0
        }];
        e.l = t + r;
        return s
    }

    function qa(e, r) {
        var t = false;
        if (r == null) {
            t = true;
            r = ba(15 + 4 * e.t.length)
        }
        r._W(1, 0);
        $a(e.t, r);
        return t ? r.slice(0, r.l) : r
    }
    var Za = Ja;

    function Qa(e, r) {
        var t = false;
        if (r == null) {
            t = true;
            r = ba(23 + 4 * e.t.length)
        }
        r._W(1, 1);
        $a(e.t, r);
        r._W(4, 1);
        Ka({
            ich: 0,
            ifnt: 0
        }, r);
        return t ? r.slice(0, r.l) : r
    }

    function en(e) {
        var r = e._R(4);
        var t = e._R(2);
        t += e._R(1) << 16;
        e.l++;
        return {
            c: r,
            iStyleRef: t
        }
    }

    function rn(e, r) {
        if (r == null) r = ba(8);
        r._W(-4, e.c);
        r._W(3, e.iStyleRef || e.s);
        r._W(1, 0);
        return r
    }

    function tn(e) {
        var r = e._R(2);
        r += e._R(1) << 16;
        e.l++;
        return {
            c: -1,
            iStyleRef: r
        }
    }

    function an(e, r) {
        if (r == null) r = ba(4);
        r._W(3, e.iStyleRef || e.s);
        r._W(1, 0);
        return r
    }
    var nn = Xa;
    var sn = $a;

    function fn(e) {
        var r = e._R(4);
        return r === 0 || r === 4294967295 ? "" : e._R(r, "dbcs")
    }

    function on(e, r) {
        var t = false;
        if (r == null) {
            t = true;
            r = ba(127)
        }
        r._W(4, e.length > 0 ? e.length : 4294967295);
        if (e.length > 0) r._W(0, e, "dbcs");
        return t ? r.slice(0, r.l) : r
    }
    var cn = Xa;
    var ln = fn;
    var un = on;

    function hn(e) {
        var r = e.slice(e.l, e.l + 4);
        var t = r[0] & 1,
            a = r[0] & 2;
        e.l += 4;
        var n = a === 0 ? ea([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : fa(r, 0) >> 2;
        return t ? n / 100 : n
    }

    function dn(e, r) {
        if (r == null) r = ba(4);
        var t = 0,
            a = 0,
            n = e * 100;
        if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29) {
            a = 1
        } else if (n == (n | 0) && n >= -(1 << 29) && n < 1 << 29) {
            a = 1;
            t = 1
        }
        if (a) r._W(-4, ((t ? n : e) << 2) + (t + 2));
        else throw new Error("unsupported RkNumber " + e)
    }

    function vn(e) {
        var r = {
            s: {},
            e: {}
        };
        r.s.r = e._R(4);
        r.e.r = e._R(4);
        r.s.c = e._R(4);
        r.e.c = e._R(4);
        return r
    }

    function pn(e, r) {
        if (!r) r = ba(16);
        r._W(4, e.s.r);
        r._W(4, e.e.r);
        r._W(4, e.s.c);
        r._W(4, e.e.c);
        return r
    }
    var mn = vn;
    var bn = pn;

    function gn(e) {
        if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
        return e._R(8, "f")
    }

    function wn(e, r) {
        return (r || ba(8))._W(8, e, "f")
    }

    function kn(e) {
        var r = {};
        var t = e._R(1);
        var a = t >>> 1;
        var n = e._R(1);
        var i = e._R(2, "i");
        var s = e._R(1);
        var f = e._R(1);
        var o = e._R(1);
        e.l++;
        switch (a) {
            case 0:
                r.auto = 1;
                break;
            case 1:
                r.index = n;
                var c = Xn[n];
                if (c) r.rgb = Tc(c);
                break;
            case 2:
                r.rgb = Tc([s, f, o]);
                break;
            case 3:
                r.theme = n;
                break;
        }
        if (i != 0) r.tint = i > 0 ? i / 32767 : i / 32768;
        return r
    }

    function Tn(e, r) {
        if (!r) r = ba(8);
        if (!e || e.auto) {
            r._W(4, 0);
            r._W(4, 0);
            return r
        }
        if (e.index != null) {
            r._W(1, 2);
            r._W(1, e.index)
        } else if (e.theme != null) {
            r._W(1, 6);
            r._W(1, e.theme)
        } else {
            r._W(1, 5);
            r._W(1, 0)
        }
        var t = e.tint || 0;
        if (t > 0) t *= 32767;
        else if (t < 0) t *= 32768;
        r._W(2, t);
        if (!e.rgb || e.theme != null) {
            r._W(2, 0);
            r._W(1, 0);
            r._W(1, 0)
        } else {
            var a = e.rgb || "FFFFFF";
            if (typeof a == "number") a = ("000000" + a.toString(16)).slice(-6);
            r._W(1, parseInt(a.slice(0, 2), 16));
            r._W(1, parseInt(a.slice(2, 4), 16));
            r._W(1, parseInt(a.slice(4, 6), 16));
            r._W(1, 255)
        }
        return r
    }

    function En(e) {
        var r = e._R(1);
        e.l++;
        var t = {
            fBold: r & 1,
            fItalic: r & 2,
            fUnderline: r & 4,
            fStrikeout: r & 8,
            fOutline: r & 16,
            fShadow: r & 32,
            fCondense: r & 64,
            fExtend: r & 128
        };
        return t
    }

    function yn(e, r) {
        if (!r) r = ba(2);
        var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
        r._W(1, t);
        r._W(1, 0);
        return r
    }

    function Sn(e, r) {
        var t = {
            2: "BITMAP",
            3: "METAFILEPICT",
            8: "DIB",
            14: "ENHMETAFILE"
        };
        var a = e._R(4);
        switch (a) {
            case 0:
                return "";
            case 4294967295:
                ;
            case 4294967294:
                return t[e._R(4)] || "";
        }
        if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
        e.l -= 4;
        return e._R(0, r == 1 ? "lpstr" : "lpwstr")
    }

    function _n(e) {
        return Sn(e, 1)
    }

    function An(e) {
        return Sn(e, 2)
    }
    var xn = 2;
    var Cn = 3;
    var Rn = 11;
    var On = 12;
    var In = 19;
    var Nn = 64;
    var Fn = 65;
    var Dn = 71;
    var Pn = 4108;
    var Ln = 4126;
    var Mn = 80;
    var Un = 81;
    var Bn = [Mn, Un];
    var Wn = {
        1: {
            n: "CodePage",
            t: xn
        },
        2: {
            n: "Category",
            t: Mn
        },
        3: {
            n: "PresentationFormat",
            t: Mn
        },
        4: {
            n: "ByteCount",
            t: Cn
        },
        5: {
            n: "LineCount",
            t: Cn
        },
        6: {
            n: "ParagraphCount",
            t: Cn
        },
        7: {
            n: "SlideCount",
            t: Cn
        },
        8: {
            n: "NoteCount",
            t: Cn
        },
        9: {
            n: "HiddenCount",
            t: Cn
        },
        10: {
            n: "MultimediaClipCount",
            t: Cn
        },
        11: {
            n: "ScaleCrop",
            t: Rn
        },
        12: {
            n: "HeadingPairs",
            t: Pn
        },
        13: {
            n: "TitlesOfParts",
            t: Ln
        },
        14: {
            n: "Manager",
            t: Mn
        },
        15: {
            n: "Company",
            t: Mn
        },
        16: {
            n: "LinksUpToDate",
            t: Rn
        },
        17: {
            n: "CharacterCount",
            t: Cn
        },
        19: {
            n: "SharedDoc",
            t: Rn
        },
        22: {
            n: "HyperlinksChanged",
            t: Rn
        },
        23: {
            n: "AppVersion",
            t: Cn,
            p: "version"
        },
        24: {
            n: "DigSig",
            t: Fn
        },
        26: {
            n: "ContentType",
            t: Mn
        },
        27: {
            n: "ContentStatus",
            t: Mn
        },
        28: {
            n: "Language",
            t: Mn
        },
        29: {
            n: "Version",
            t: Mn
        },
        255: {},
        2147483648: {
            n: "Locale",
            t: In
        },
        2147483651: {
            n: "Behavior",
            t: In
        },
        1919054434: {}
    };
    var Hn = {
        1: {
            n: "CodePage",
            t: xn
        },
        2: {
            n: "Title",
            t: Mn
        },
        3: {
            n: "Subject",
            t: Mn
        },
        4: {
            n: "Author",
            t: Mn
        },
        5: {
            n: "Keywords",
            t: Mn
        },
        6: {
            n: "Comments",
            t: Mn
        },
        7: {
            n: "Template",
            t: Mn
        },
        8: {
            n: "LastAuthor",
            t: Mn
        },
        9: {
            n: "RevNumber",
            t: Mn
        },
        10: {
            n: "EditTime",
            t: Nn
        },
        11: {
            n: "LastPrinted",
            t: Nn
        },
        12: {
            n: "CreatedDate",
            t: Nn
        },
        13: {
            n: "ModifiedDate",
            t: Nn
        },
        14: {
            n: "PageCount",
            t: Cn
        },
        15: {
            n: "WordCount",
            t: Cn
        },
        16: {
            n: "CharCount",
            t: Cn
        },
        17: {
            n: "Thumbnail",
            t: Dn
        },
        18: {
            n: "Application",
            t: Mn
        },
        19: {
            n: "DocSecurity",
            t: Cn
        },
        255: {},
        2147483648: {
            n: "Locale",
            t: In
        },
        2147483651: {
            n: "Behavior",
            t: In
        },
        1919054434: {}
    };
    var zn = {
        1: "US",
        2: "CA",
        3: "",
        7: "RU",
        20: "EG",
        30: "GR",
        31: "NL",
        32: "BE",
        33: "FR",
        34: "ES",
        36: "HU",
        39: "IT",
        41: "CH",
        43: "AT",
        44: "GB",
        45: "DK",
        46: "SE",
        47: "NO",
        48: "PL",
        49: "DE",
        52: "MX",
        55: "BR",
        61: "AU",
        64: "NZ",
        66: "TH",
        81: "JP",
        82: "KR",
        84: "VN",
        86: "CN",
        90: "TR",
        105: "JS",
        213: "DZ",
        216: "MA",
        218: "LY",
        351: "PT",
        354: "IS",
        358: "FI",
        420: "CZ",
        886: "TW",
        961: "LB",
        962: "JO",
        963: "SY",
        964: "IQ",
        965: "KW",
        966: "SA",
        971: "AE",
        972: "IL",
        974: "QA",
        981: "IR",
        65535: "US"
    };
    var Vn = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];

    function Gn(e) {
        return e.map(function (e) {
            return [e >> 16 & 255, e >> 8 & 255, e & 255]
        })
    }
    var jn = Gn([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 0, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    var Xn = Tr(jn);
    var $n = {
        0: "#NULL!",
        7: "#DIV/0!",
        15: "#VALUE!",
        23: "#REF!",
        29: "#NAME?",
        36: "#NUM!",
        42: "#N/A",
        43: "#GETTING_DATA",
        255: "#WTF?"
    };
    var Yn = {
        "#NULL!": 0,
        "#DIV/0!": 7,
        "#VALUE!": 15,
        "#REF!": 23,
        "#NAME?": 29,
        "#NUM!": 36,
        "#N/A": 42,
        "#GETTING_DATA": 43,
        "#WTF?": 255
    };
    var Kn = {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
        "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
        "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
        "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
        "application/vnd.ms-excel.worksheet": "sheets",
        "application/vnd.ms-excel.binIndexWs": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
        "application/vnd.ms-excel.chartsheet": "charts",
        "application/vnd.ms-excel.macrosheet+xml": "macros",
        "application/vnd.ms-excel.macrosheet": "macros",
        "application/vnd.ms-excel.intlmacrosheet": "TODO",
        "application/vnd.ms-excel.binIndexMs": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
        "application/vnd.ms-excel.dialogsheet": "dialogs",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
        "application/vnd.ms-excel.sharedStrings": "strs",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
        "application/vnd.ms-excel.styles": "styles",
        "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
        "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
        "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
        "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
        "application/vnd.ms-excel.comments": "comments",
        "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
        "application/vnd.ms-excel.person+xml": "people",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
        "application/vnd.ms-excel.sheetMetadata": "metadata",
        "application/vnd.ms-excel.pivotTable": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
        "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
        "application/vnd.ms-office.chartstyle+xml": "TODO",
        "application/vnd.ms-office.chartex+xml": "TODO",
        "application/vnd.ms-excel.calcChain": "calcchains",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
        "application/vnd.ms-office.activeX": "TODO",
        "application/vnd.ms-office.activeX+xml": "TODO",
        "application/vnd.ms-excel.attachedToolbars": "TODO",
        "application/vnd.ms-excel.connections": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
        "application/vnd.ms-excel.externalLink": "links",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
        "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
        "application/vnd.ms-excel.pivotCacheRecords": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
        "application/vnd.ms-excel.queryTable": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
        "application/vnd.ms-excel.userNames": "TODO",
        "application/vnd.ms-excel.revisionHeaders": "TODO",
        "application/vnd.ms-excel.revisionLog": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
        "application/vnd.ms-excel.tableSingleCells": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
        "application/vnd.ms-excel.slicer": "TODO",
        "application/vnd.ms-excel.slicerCache": "TODO",
        "application/vnd.ms-excel.slicer+xml": "TODO",
        "application/vnd.ms-excel.slicerCache+xml": "TODO",
        "application/vnd.ms-excel.wsSortMap": "TODO",
        "application/vnd.ms-excel.table": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
        "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
        "application/vnd.ms-excel.Timeline+xml": "TODO",
        "application/vnd.ms-excel.TimelineCache+xml": "TODO",
        "application/vnd.ms-office.vbaProject": "vba",
        "application/vnd.ms-office.vbaProjectSignature": "TODO",
        "application/vnd.ms-office.volatileDependencies": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
        "application/vnd.ms-excel.controlproperties+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.model+data": "TODO",
        "application/vnd.ms-excel.Survey+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
        "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
        "application/vnd.openxmlformats-package.relationships+xml": "rels",
        "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
        "image/png": "TODO",
        sheet: "js"
    };
    var Jn = {
        workbooks: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
            xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
            xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
            xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
            xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
        },
        strs: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
            xlsb: "application/vnd.ms-excel.sharedStrings"
        },
        comments: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
            xlsb: "application/vnd.ms-excel.comments"
        },
        sheets: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
            xlsb: "application/vnd.ms-excel.worksheet"
        },
        charts: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
            xlsb: "application/vnd.ms-excel.chartsheet"
        },
        dialogs: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
            xlsb: "application/vnd.ms-excel.dialogsheet"
        },
        macros: {
            xlsx: "application/vnd.ms-excel.macrosheet+xml",
            xlsb: "application/vnd.ms-excel.macrosheet"
        },
        metadata: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
            xlsb: "application/vnd.ms-excel.sheetMetadata"
        },
        styles: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
            xlsb: "application/vnd.ms-excel.styles"
        }
    };

    function qn() {
        return {
            workbooks: [],
            sheets: [],
            charts: [],
            dialogs: [],
            macros: [],
            rels: [],
            strs: [],
            comments: [],
            threadedcomments: [],
            links: [],
            coreprops: [],
            extprops: [],
            custprops: [],
            themes: [],
            styles: [],
            calcchains: [],
            vba: [],
            drawings: [],
            metadata: [],
            people: [],
            TODO: [],
            xmlns: ""
        }
    }

    function Zn(e) {
        var r = qn();
        if (!e || !e.match) return r;
        var t = {};
        (e.match(Xr) || []).forEach(function (e) {
            var a = Kr(e);
            switch (a[0].replace($r, "<")) {
                case "<?xml":
                    break;
                case "<Types":
                    r.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
                    break;
                case "<Default":
                    t[a.Extension.toLowerCase()] = a.ContentType;
                    break;
                case "<Override":
                    if (r[Kn[a.ContentType]] !== undefined) r[Kn[a.ContentType]].push(a.PartName);
                    break;
            }
        });
        if (r.xmlns !== Ot.CT) throw new Error("Unknown Namespace: " + r.xmlns);
        r.calcchain = r.calcchains.length > 0 ? r.calcchains[0] : "";
        r.sst = r.strs.length > 0 ? r.strs[0] : "";
        r.style = r.styles.length > 0 ? r.styles[0] : "";
        r.defaults = t;
        delete r.calcchains;
        return r
    }

    function Qn(e, r, t) {
        var a = or(Kn);
        var n = [],
            i;
        if (!t) {
            n[n.length] = zr;
            n[n.length] = _t("Types", null, {
                xmlns: Ot.CT,
                "xmlns:xsd": Ot.xsd,
                "xmlns:xsi": Ot.xsi
            });
            n = n.concat([
                ["xml", "application/xml"],
                ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
                ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
                ["data", "application/vnd.openxmlformats-officedocument.model+data"],
                ["bmp", "image/bmp"],
                ["png", "image/png"],
                ["gif", "image/gif"],
                ["emf", "image/x-emf"],
                ["wmf", "image/x-wmf"],
                ["jpg", "image/jpeg"],
                ["jpeg", "image/jpeg"],
                ["tif", "image/tiff"],
                ["tiff", "image/tiff"],
                ["pdf", "application/pdf"],
                ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
            ].map(function (e) {
                return _t("Default", null, {
                    Extension: e[0],
                    ContentType: e[1]
                })
            }))
        }
        var s = function (t) {
            if (e[t] && e[t].length > 0) {
                i = e[t][0];
                n[n.length] = _t("Override", null, {
                    PartName: (i[0] == "/" ? "" : "/") + i,
                    ContentType: Jn[t][r.bookType] || Jn[t]["xlsx"]
                })
            }
        };
        var f = function (t) {
            (e[t] || []).forEach(function (e) {
                n[n.length] = _t("Override", null, {
                    PartName: (e[0] == "/" ? "" : "/") + e,
                    ContentType: Jn[t][r.bookType] || Jn[t]["xlsx"]
                })
            })
        };
        var o = function (r) {
            (e[r] || []).forEach(function (e) {
                n[n.length] = _t("Override", null, {
                    PartName: (e[0] == "/" ? "" : "/") + e,
                    ContentType: a[r][0]
                })
            })
        };
        s("workbooks");
        f("sheets");
        f("charts");
        o("themes");
        ["strs", "styles"].forEach(s);
        ["coreprops", "extprops", "custprops"].forEach(o);
        o("vba");
        o("comments");
        o("threadedcomments");
        o("drawings");
        f("metadata");
        o("people");
        if (!t && n.length > 2) {
            n[n.length] = "</Types>";
            n[1] = n[1].replace("/>", ">")
        }
        return n.join("")
    }
    var ei = {
        WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
        SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
        HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
        XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
        XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
        XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
        CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
        CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
        CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
        CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
        EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
        CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
        SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
        STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
        THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
        CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
        CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
        CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
        WS: ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"],
        DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
        MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
        IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
        DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
        XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
        TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
        PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
        CONN: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections",
        VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
    };

    function ri(e) {
        var r = e.lastIndexOf("/");
        return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels"
    }

    function ti(e, r) {
        var t = {
            "!id": {}
        };
        if (!e) return t;
        if (r.charAt(0) !== "/") {
            r = "/" + r
        }
        var a = {};
        (e.match(Xr) || []).forEach(function (e) {
            var n = Kr(e);
            if (n[0] === "<Relationship") {
                var i = {};
                i.Type = n.Type;
                i.Target = n.Target;
                i.Id = n.Id;
                if (n.TargetMode) i.TargetMode = n.TargetMode;
                var s = n.TargetMode === "External" ? n.Target : Hr(n.Target, r);
                t[s] = i;
                a[n.Id] = i
            }
        });
        t["!id"] = a;
        return t
    }

    function ai(e) {
        var r = [zr, _t("Relationships", null, {
            xmlns: Ot.RELS
        })];
        nr(e["!id"]).forEach(function (t) {
            r[r.length] = _t("Relationship", null, e["!id"][t])
        });
        if (r.length > 2) {
            r[r.length] = "</Relationships>";
            r[1] = r[1].replace("/>", ">")
        }
        return r.join("")
    }

    function ni(e, r, t, a, n, i) {
        if (!n) n = {};
        if (!e["!id"]) e["!id"] = {};
        if (!e["!idx"]) e["!idx"] = 1;
        if (r < 0)
            for (r = e["!idx"]; e["!id"]["rId" + r]; ++r) {}
        e["!idx"] = r + 1;
        n.Id = "rId" + r;
        n.Type = a;
        n.Target = t;
        if (i) n.TargetMode = i;
        else if ([ei.HLINK, ei.XPATH, ei.XMISS].indexOf(n.Type) > -1) n.TargetMode = "External";
        if (e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + r);
        e["!id"][n.Id] = n;
        e[("/" + n.Target).replace("//", "/")] = n;
        return r
    }
    var ii = "application/vnd.oasis.opendocument.spreadsheet";

    function si(e, r) {
        var t = Ct(e);
        var a;
        var n;
        while (a = Rt.exec(t)) switch (a[3]) {
            case "manifest":
                break;
            case "file-entry":
                n = Kr(a[0], false);
                if (n.path == "/" && n.type !== ii) throw new Error("This OpenDocument is not a spreadsheet");
                break;
            case "encryption-data":
                ;
            case "algorithm":
                ;
            case "start-key-generation":
                ;
            case "key-derivation":
                throw new Error("Unsupported ODS Encryption");
            default:
                if (r && r.WTF) throw a;
        }
    }

    function fi(e) {
        var r = [zr];
        r.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
        r.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');
        for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + '"/>\n');
        r.push("</manifest:manifest>");
        return r.join("")
    }

    function oi(e, r, t) {
        return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + '"/>\n', "  </rdf:Description>\n"].join("")
    }

    function ci(e, r) {
        return ['  <rdf:Description rdf:about="' + e + '">\n', '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + '"/>\n', "  </rdf:Description>\n"].join("")
    }

    function li(e) {
        var r = [zr];
        r.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
        for (var t = 0; t != e.length; ++t) {
            r.push(oi(e[t][0], e[t][1]));
            r.push(ci("", e[t][0]))
        }
        r.push(oi("", "Document", "pkg"));
        r.push("</rdf:RDF>");
        return r.join("")
    }

    function ui() {
        return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' + "JS " + e.version + "</meta:generator></office:meta></office:document-meta>"
    }
    var hi = [
        ["cp:category", "Category"],
        ["cp:contentStatus", "ContentStatus"],
        ["cp:keywords", "Keywords"],
        ["cp:lastModifiedBy", "LastAuthor"],
        ["cp:lastPrinted", "LastPrinted"],
        ["cp:revision", "RevNumber"],
        ["cp:version", "Version"],
        ["dc:creator", "Author"],
        ["dc:description", "Comments"],
        ["dc:identifier", "Identifier"],
        ["dc:language", "Language"],
        ["dc:subject", "Subject"],
        ["dc:title", "Title"],
        ["dcterms:created", "CreatedDate", "date"],
        ["dcterms:modified", "ModifiedDate", "date"]
    ];
    var di = function () {
        var e = new Array(hi.length);
        for (var r = 0; r < hi.length; ++r) {
            var t = hi[r];
            var a = "(?:" + t[0].slice(0, t[0].indexOf(":")) + ":)" + t[0].slice(t[0].indexOf(":") + 1);
            e[r] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">")
        }
        return e
    }();

    function vi(e) {
        var r = {};
        e = vt(e);
        for (var t = 0; t < hi.length; ++t) {
            var a = hi[t],
                n = e.match(di[t]);
            if (n != null && n.length > 0) r[a[1]] = Qr(n[1]);
            if (a[2] === "date" && r[a[1]]) r[a[1]] = wr(r[a[1]])
        }
        return r
    }

    function pi(e, r, t, a, n) {
        if (n[e] != null || r == null || r === "") return;
        n[e] = r;
        r = tt(r);
        a[a.length] = t ? _t(e, r, t) : yt(e, r)
    }

    function mi(e, r) {
        var t = r || {};
        var a = [zr, _t("cp:coreProperties", null, {
                "xmlns:cp": Ot.CORE_PROPS,
                "xmlns:dc": Ot.dc,
                "xmlns:dcterms": Ot.dcterms,
                "xmlns:dcmitype": Ot.dcmitype,
                "xmlns:xsi": Ot.xsi
            })],
            n = {};
        if (!e && !t.Props) return a.join("");
        if (e) {
            if (e.CreatedDate != null) pi("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate : At(e.CreatedDate, t.WTF), {
                "xsi:type": "dcterms:W3CDTF"
            }, a, n);
            if (e.ModifiedDate != null) pi("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate : At(e.ModifiedDate, t.WTF), {
                "xsi:type": "dcterms:W3CDTF"
            }, a, n)
        }
        for (var i = 0; i != hi.length; ++i) {
            var s = hi[i];
            var f = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
            if (f === true) f = "1";
            else if (f === false) f = "0";
            else if (typeof f == "number") f = String(f);
            if (f != null) pi(s[0], f, null, a, n)
        }
        if (a.length > 2) {
            a[a.length] = "</cp:coreProperties>";
            a[1] = a[1].replace("/>", ">")
        }
        return a.join("")
    }
    var bi = [
        ["Application", "Application", "string"],
        ["AppVersion", "AppVersion", "string"],
        ["Company", "Company", "string"],
        ["DocSecurity", "DocSecurity", "string"],
        ["Manager", "Manager", "string"],
        ["HyperlinksChanged", "HyperlinksChanged", "bool"],
        ["SharedDoc", "SharedDoc", "bool"],
        ["LinksUpToDate", "LinksUpToDate", "bool"],
        ["ScaleCrop", "ScaleCrop", "bool"],
        ["HeadingPairs", "HeadingPairs", "raw"],
        ["TitlesOfParts", "TitlesOfParts", "raw"]
    ];
    var gi = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"];

    function wi(e, r, t, a) {
        var n = [];
        if (typeof e == "string") n = Tt(e, a);
        else
            for (var i = 0; i < e.length; ++i) n = n.concat(e[i].map(function (e) {
                return {
                    v: e
                }
            }));
        var s = typeof r == "string" ? Tt(r, a).map(function (e) {
            return e.v
        }) : r;
        var f = 0,
            o = 0;
        if (s.length > 0)
            for (var c = 0; c !== n.length; c += 2) {
                o = +n[c + 1].v;
                switch (n[c].v) {
                    case "Worksheets":
                        ;
                    case "工作表":
                        ;
                    case "Листы":
                        ;
                    case "أوراق العمل":
                        ;
                    case "ワークシート":
                        ;
                    case "גליונות עבודה":
                        ;
                    case "Arbeitsblätter":
                        ;
                    case "Çalışma Sayfaları":
                        ;
                    case "Feuilles de calcul":
                        ;
                    case "Fogli di lavoro":
                        ;
                    case "Folhas de cálculo":
                        ;
                    case "Planilhas":
                        ;
                    case "Regneark":
                        ;
                    case "Hojas de cálculo":
                        ;
                    case "Werkbladen":
                        t.Worksheets = o;
                        t.SheetNames = s.slice(f, f + o);
                        break;
                    case "Named Ranges":
                        ;
                    case "Rangos con nombre":
                        ;
                    case "名前付き一覧":
                        ;
                    case "Benannte Bereiche":
                        ;
                    case "Navngivne områder":
                        t.NamedRanges = o;
                        t.DefinedNames = s.slice(f, f + o);
                        break;
                    case "Charts":
                        ;
                    case "Diagramme":
                        t.Chartsheets = o;
                        t.ChartNames = s.slice(f, f + o);
                        break;
                }
                f += o
            }
    }

    function ki(e, r, t) {
        var a = {};
        if (!r) r = {};
        e = vt(e);
        bi.forEach(function (t) {
            var n = (e.match(mt(t[0])) || [])[1];
            switch (t[2]) {
                case "string":
                    if (n) r[t[1]] = Qr(n);
                    break;
                case "bool":
                    r[t[1]] = n === "true";
                    break;
                case "raw":
                    var i = e.match(new RegExp("<" + t[0] + "[^>]*>([\\s\\S]*?)</" + t[0] + ">"));
                    if (i && i.length > 0) a[t[1]] = i[1];
                    break;
            }
        });
        if (a.HeadingPairs && a.TitlesOfParts) wi(a.HeadingPairs, a.TitlesOfParts, r, t);
        return r
    }

    function Ti(e) {
        var r = [],
            t = _t;
        if (!e) e = {};
        e.Application = "SheetJS";
        r[r.length] = zr;
        r[r.length] = _t("Properties", null, {
            xmlns: Ot.EXT_PROPS,
            "xmlns:vt": Ot.vt
        });
        bi.forEach(function (a) {
            if (e[a[1]] === undefined) return;
            var n;
            switch (a[2]) {
                case "string":
                    n = tt(String(e[a[1]]));
                    break;
                case "bool":
                    n = e[a[1]] ? "true" : "false";
                    break;
            }
            if (n !== undefined) r[r.length] = t(a[0], n)
        });
        r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), {
            size: 2,
            baseType: "variant"
        }));
        r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function (e) {
            return "<vt:lpstr>" + tt(e) + "</vt:lpstr>"
        }).join(""), {
            size: e.Worksheets,
            baseType: "lpstr"
        }));
        if (r.length > 2) {
            r[r.length] = "</Properties>";
            r[1] = r[1].replace("/>", ">")
        }
        return r.join("")
    }
    var Ei = /<[^>]+>[^<]*/g;

    function yi(e, r) {
        var t = {},
            a = "";
        var n = e.match(Ei);
        if (n)
            for (var i = 0; i != n.length; ++i) {
                var s = n[i],
                    f = Kr(s);
                switch (f[0]) {
                    case "<?xml":
                        break;
                    case "<Properties":
                        break;
                    case "<property":
                        a = Qr(f.name);
                        break;
                    case "</property>":
                        a = null;
                        break;
                    default:
                        if (s.indexOf("<vt:") === 0) {
                            var o = s.split(">");
                            var c = o[0].slice(4),
                                l = o[1];
                            switch (c) {
                                case "lpstr":
                                    ;
                                case "bstr":
                                    ;
                                case "lpwstr":
                                    t[a] = Qr(l);
                                    break;
                                case "bool":
                                    t[a] = ct(l);
                                    break;
                                case "i1":
                                    ;
                                case "i2":
                                    ;
                                case "i4":
                                    ;
                                case "i8":
                                    ;
                                case "int":
                                    ;
                                case "uint":
                                    t[a] = parseInt(l, 10);
                                    break;
                                case "r4":
                                    ;
                                case "r8":
                                    ;
                                case "decimal":
                                    t[a] = parseFloat(l);
                                    break;
                                case "filetime":
                                    ;
                                case "date":
                                    t[a] = wr(l);
                                    break;
                                case "cy":
                                    ;
                                case "error":
                                    t[a] = Qr(l);
                                    break;
                                default:
                                    if (c.slice(-1) == "/") break;
                                    if (r.WTF && typeof console !== "undefined") console.warn("Unexpected", s, c, o);
                            }
                        } else if (s.slice(0, 2) === "</") {} else if (r.WTF) throw new Error(s);
                }
            }
        return t
    }

    function Si(e) {
        var r = [zr, _t("Properties", null, {
            xmlns: Ot.CUST_PROPS,
            "xmlns:vt": Ot.vt
        })];
        if (!e) return r.join("");
        var t = 1;
        nr(e).forEach(function a(n) {
            ++t;
            r[r.length] = _t("property", xt(e[n], true), {
                fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
                pid: t,
                name: tt(n)
            })
        });
        if (r.length > 2) {
            r[r.length] = "</Properties>";
            r[1] = r[1].replace("/>", ">")
        }
        return r.join("")
    }
    var _i = {
        Title: "Title",
        Subject: "Subject",
        Author: "Author",
        Keywords: "Keywords",
        Comments: "Description",
        LastAuthor: "LastAuthor",
        RevNumber: "Revision",
        Application: "AppName",
        LastPrinted: "LastPrinted",
        CreatedDate: "Created",
        ModifiedDate: "LastSaved",
        Category: "Category",
        Manager: "Manager",
        Company: "Company",
        AppVersion: "Version",
        ContentStatus: "ContentStatus",
        Identifier: "Identifier",
        Language: "Language"
    };
    var Ai;

    function xi(e, r, t) {
        if (!Ai) Ai = sr(_i);
        r = Ai[r] || r;
        e[r] = t
    }

    function Ci(e, r) {
        var t = [];
        nr(_i).map(function (e) {
            for (var r = 0; r < hi.length; ++r)
                if (hi[r][1] == e) return hi[r];
            for (r = 0; r < bi.length; ++r)
                if (bi[r][1] == e) return bi[r];
            throw e
        }).forEach(function (a) {
            if (e[a[1]] == null) return;
            var n = r && r.Props && r.Props[a[1]] != null ? r.Props[a[1]] : e[a[1]];
            switch (a[2]) {
                case "date":
                    n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
                    break;
            }
            if (typeof n == "number") n = String(n);
            else if (n === true || n === false) {
                n = n ? "1" : "0"
            } else if (n instanceof Date) n = new Date(n).toISOString().replace(/\.\d*Z/, "");
            t.push(yt(_i[a[1]] || a[1], n))
        });
        return _t("DocumentProperties", t.join(""), {
            xmlns: Nt.o
        })
    }

    function Ri(e, r) {
        var t = ["Worksheets", "SheetNames"];
        var a = "CustomDocumentProperties";
        var n = [];
        if (e) nr(e).forEach(function (r) {
            if (!Object.prototype.hasOwnProperty.call(e, r)) return;
            for (var a = 0; a < hi.length; ++a)
                if (r == hi[a][1]) return;
            for (a = 0; a < bi.length; ++a)
                if (r == bi[a][1]) return;
            for (a = 0; a < t.length; ++a)
                if (r == t[a]) return;
            var i = e[r];
            var s = "string";
            if (typeof i == "number") {
                s = "float";
                i = String(i)
            } else if (i === true || i === false) {
                s = "boolean";
                i = i ? "1" : "0"
            } else i = String(i);
            n.push(_t(at(r), i, {
                "dt:dt": s
            }))
        });
        if (r) nr(r).forEach(function (t) {
            if (!Object.prototype.hasOwnProperty.call(r, t)) return;
            if (e && Object.prototype.hasOwnProperty.call(e, t)) return;
            var a = r[t];
            var i = "string";
            if (typeof a == "number") {
                i = "float";
                a = String(a)
            } else if (a === true || a === false) {
                i = "boolean";
                a = a ? "1" : "0"
            } else if (a instanceof Date) {
                i = "dateTime.tz";
                a = a.toISOString()
            } else a = String(a);
            n.push(_t(at(t), a, {
                "dt:dt": i
            }))
        });
        return "<" + a + ' xmlns="' + Nt.o + '">' + n.join("") + "</" + a + ">"
    }

    function Oi(e) {
        var r = e._R(4),
            t = e._R(4);
        return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "")
    }

    function Ii(e) {
        var r = typeof e == "string" ? new Date(Date.parse(e)) : e;
        var t = r.getTime() / 1e3 + 11644473600;
        var a = t % Math.pow(2, 32),
            n = (t - a) / Math.pow(2, 32);
        a *= 1e7;
        n *= 1e7;
        var i = a / Math.pow(2, 32) | 0;
        if (i > 0) {
            a = a % Math.pow(2, 32);
            n += i
        }
        var s = ba(8);
        s._W(4, a);
        s._W(4, n);
        return s
    }

    function Ni(e, r, t) {
        var a = e.l;
        var n = e._R(0, "lpstr-cp");
        if (t)
            while (e.l - a & 3) ++e.l;
        return n
    }

    function Fi(e, r, t) {
        var a = e._R(0, "lpwstr");
        if (t) e.l += 4 - (a.length + 1 & 3) & 3;
        return a
    }

    function Di(e, r, t) {
        if (r === 31) return Fi(e);
        return Ni(e, r, t)
    }

    function Pi(e, r, t) {
        return Di(e, r, t === false ? 0 : 4)
    }

    function Li(e, r) {
        if (!r) throw new Error("VtUnalignedString must have positive length");
        return Di(e, r, 0)
    }

    function Mi(e) {
        var r = e._R(4);
        var t = [];
        for (var a = 0; a != r; ++a) {
            var n = e.l;
            t[a] = e._R(0, "lpwstr").replace(F, "");
            if (e.l - n & 2) e.l += 2
        }
        return t
    }

    function Ui(e) {
        var r = e._R(4);
        var t = [];
        for (var a = 0; a != r; ++a) t[a] = e._R(0, "lpstr-cp").replace(F, "");
        return t
    }

    function Bi(e) {
        var r = e.l;
        var t = Gi(e, Un);
        if (e[e.l] == 0 && e[e.l + 1] == 0 && e.l - r & 2) e.l += 2;
        var a = Gi(e, Cn);
        return [t, a]
    }

    function Wi(e) {
        var r = e._R(4);
        var t = [];
        for (var a = 0; a < r / 2; ++a) t.push(Bi(e));
        return t
    }

    function Hi(e, r) {
        var t = e._R(4);
        var a = {};
        for (var n = 0; n != t; ++n) {
            var i = e._R(4);
            var s = e._R(4);
            a[i] = e._R(s, r === 1200 ? "utf16le" : "utf8").replace(F, "").replace(D, "!");
            if (r === 1200 && s % 2) e.l += 2
        }
        if (e.l & 3) e.l = e.l >> 2 + 1 << 2;
        return a
    }

    function zi(e) {
        var r = e._R(4);
        var t = e.slice(e.l, e.l + r);
        e.l += r;
        if ((r & 3) > 0) e.l += 4 - (r & 3) & 3;
        return t
    }

    function Vi(e) {
        var r = {};
        r.Size = e._R(4);
        e.l += r.Size + 3 - (r.Size - 1) % 4;
        return r
    }

    function Gi(e, r, t) {
        var a = e._R(2),
            n, i = t || {};
        e.l += 2;
        if (r !== On)
            if (a !== r && Bn.indexOf(r) === -1 && !((r & 65534) == 4126 && (a & 65534) == 4126)) throw new Error("Expected type " + r + " saw " + a);
        switch (r === On ? a : r) {
            case 2:
                n = e._R(2, "i");
                if (!i.raw) e.l += 2;
                return n;
            case 3:
                n = e._R(4, "i");
                return n;
            case 11:
                return e._R(4) !== 0;
            case 19:
                n = e._R(4);
                return n;
            case 30:
                return Ni(e, a, 4).replace(F, "");
            case 31:
                return Fi(e);
            case 64:
                return Oi(e);
            case 65:
                return zi(e);
            case 71:
                return Vi(e);
            case 80:
                return Pi(e, a, !i.raw).replace(F, "");
            case 81:
                return Li(e, a).replace(F, "");
            case 4108:
                return Wi(e);
            case 4126:
                ;
            case 4127:
                return a == 4127 ? Mi(e) : Ui(e);
            default:
                throw new Error("TypedPropertyValue unrecognized type " + r + " " + a);
        }
    }

    function ji(e, r) {
        var t = ba(4),
            a = ba(4);
        t._W(4, e == 80 ? 31 : e);
        switch (e) {
            case 3:
                a._W(-4, r);
                break;
            case 5:
                a = ba(8);
                a._W(8, r, "f");
                break;
            case 11:
                a._W(4, r ? 1 : 0);
                break;
            case 64:
                a = Ii(r);
                break;
            case 31:
                ;
            case 80:
                a = ba(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2));
                a._W(4, r.length + 1);
                a._W(0, r, "dbcs");
                while (a.l != a.length) a._W(1, 0);
                break;
            default:
                throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);
        }
        return I([t, a])
    }

    function Xi(e, r) {
        var t = e.l;
        var a = e._R(4);
        var n = e._R(4);
        var i = [],
            s = 0;
        var f = 0;
        var c = -1,
            l = {};
        for (s = 0; s != n; ++s) {
            var u = e._R(4);
            var h = e._R(4);
            i[s] = [u, h + t]
        }
        i.sort(function (e, r) {
            return e[1] - r[1]
        });
        var d = {};
        for (s = 0; s != n; ++s) {
            if (e.l !== i[s][1]) {
                var v = true;
                if (s > 0 && r) switch (r[i[s - 1][0]].t) {
                    case 2:
                        if (e.l + 2 === i[s][1]) {
                            e.l += 2;
                            v = false
                        }
                        break;
                    case 80:
                        if (e.l <= i[s][1]) {
                            e.l = i[s][1];
                            v = false
                        }
                        break;
                    case 4108:
                        if (e.l <= i[s][1]) {
                            e.l = i[s][1];
                            v = false
                        }
                        break;
                }
                if ((!r || s == 0) && e.l <= i[s][1]) {
                    v = false;
                    e.l = i[s][1]
                }
                if (v) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s)
            }
            if (r) {
                if (i[s][0] == 0 && i.length > s + 1 && i[s][1] == i[s + 1][1]) continue;
                var p = r[i[s][0]];
                d[p.n] = Gi(e, p.t, {
                    raw: true
                });
                if (p.p === "version") d[p.n] = String(d[p.n] >> 16) + "." + ("0000" + String(d[p.n] & 65535)).slice(-4);
                if (p.n == "CodePage") switch (d[p.n]) {
                    case 0:
                        d[p.n] = 1252;
                    case 874:
                        ;
                    case 932:
                        ;
                    case 936:
                        ;
                    case 949:
                        ;
                    case 950:
                        ;
                    case 1250:
                        ;
                    case 1251:
                        ;
                    case 1253:
                        ;
                    case 1254:
                        ;
                    case 1255:
                        ;
                    case 1256:
                        ;
                    case 1257:
                        ;
                    case 1258:
                        ;
                    case 1e4:
                        ;
                    case 1200:
                        ;
                    case 1201:
                        ;
                    case 1252:
                        ;
                    case 65e3:
                        ;
                    case -536:
                        ;
                    case 65001:
                        ;
                    case -535:
                        o(f = d[p.n] >>> 0 & 65535);
                        break;
                    default:
                        throw new Error("Unsupported CodePage: " + d[p.n]);
                }
            } else {
                if (i[s][0] === 1) {
                    f = d.CodePage = Gi(e, xn);
                    o(f);
                    if (c !== -1) {
                        var m = e.l;
                        e.l = i[c][1];
                        l = Hi(e, f);
                        e.l = m
                    }
                } else if (i[s][0] === 0) {
                    if (f === 0) {
                        c = s;
                        e.l = i[s + 1][1];
                        continue
                    }
                    l = Hi(e, f)
                } else {
                    var b = l[i[s][0]];
                    var g;
                    switch (e[e.l]) {
                        case 65:
                            e.l += 4;
                            g = zi(e);
                            break;
                        case 30:
                            e.l += 4;
                            g = Pi(e, e[e.l - 4]).replace(/\u0000+$/, "");
                            break;
                        case 31:
                            e.l += 4;
                            g = Pi(e, e[e.l - 4]).replace(/\u0000+$/, "");
                            break;
                        case 3:
                            e.l += 4;
                            g = e._R(4, "i");
                            break;
                        case 19:
                            e.l += 4;
                            g = e._R(4);
                            break;
                        case 5:
                            e.l += 4;
                            g = e._R(8, "f");
                            break;
                        case 11:
                            e.l += 4;
                            g = rs(e, 4);
                            break;
                        case 64:
                            e.l += 4;
                            g = wr(Oi(e));
                            break;
                        default:
                            throw new Error("unparsed value: " + e[e.l]);
                    }
                    d[b] = g
                }
            }
        }
        e.l = t + a;
        return d
    }
    var $i = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];

    function Yi(e) {
        switch (typeof e) {
            case "boolean":
                return 11;
            case "number":
                return (e | 0) == e ? 3 : 5;
            case "string":
                return 31;
            case "object":
                if (e instanceof Date) return 64;
                break;
        }
        return -1
    }

    function Ki(e, r, t) {
        var a = ba(8),
            n = [],
            i = [];
        var s = 8,
            f = 0;
        var o = ba(8),
            c = ba(8);
        o._W(4, 2);
        o._W(4, 1200);
        c._W(4, 1);
        i.push(o);
        n.push(c);
        s += 8 + o.length;
        if (!r) {
            c = ba(8);
            c._W(4, 0);
            n.unshift(c);
            var l = [ba(4)];
            l[0]._W(4, e.length);
            for (f = 0; f < e.length; ++f) {
                var u = e[f][0];
                o = ba(4 + 4 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2));
                o._W(4, f + 2);
                o._W(4, u.length + 1);
                o._W(0, u, "dbcs");
                while (o.l != o.length) o._W(1, 0);
                l.push(o)
            }
            o = I(l);
            i.unshift(o);
            s += 8 + o.length
        }
        for (f = 0; f < e.length; ++f) {
            if (r && !r[e[f][0]]) continue;
            if ($i.indexOf(e[f][0]) > -1 || gi.indexOf(e[f][0]) > -1) continue;
            if (e[f][1] == null) continue;
            var h = e[f][1],
                d = 0;
            if (r) {
                d = +r[e[f][0]];
                var v = t[d];
                if (v.p == "version" && typeof h == "string") {
                    var p = h.split(".");
                    h = (+p[0] << 16) + (+p[1] || 0)
                }
                o = ji(v.t, h)
            } else {
                var m = Yi(h);
                if (m == -1) {
                    m = 31;
                    h = String(h)
                }
                o = ji(m, h)
            }
            i.push(o);
            c = ba(8);
            c._W(4, !r ? 2 + f : d);
            n.push(c);
            s += 8 + o.length
        }
        var b = 8 * (i.length + 1);
        for (f = 0; f < i.length; ++f) {
            n[f]._W(4, b);
            b += i[f].length
        }
        a._W(4, s);
        a._W(4, i.length);
        return I([a].concat(n).concat(i))
    }

    function Ji(e, r, t) {
        var a = e.content;
        if (!a) return {};
        pa(a, 0);
        var n, i, s, f, o = 0;
        a.chk("feff", "Byte Order: ");
        a._R(2);
        var c = a._R(4);
        var l = a._R(16);
        if (l !== Ze.utils.consts.HEADER_CLSID && l !== t) throw new Error("Bad PropertySet CLSID " + l);
        n = a._R(4);
        if (n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
        i = a._R(16);
        f = a._R(4);
        if (n === 1 && f !== a.l) throw new Error("Length mismatch: " + f + " !== " + a.l);
        else if (n === 2) {
            s = a._R(16);
            o = a._R(4)
        }
        var u = Xi(a, r);
        var h = {
            SystemIdentifier: c
        };
        for (var d in u) h[d] = u[d];
        h.FMTID = i;
        if (n === 1) return h;
        if (o - a.l == 2) a.l += 2;
        if (a.l !== o) throw new Error("Length mismatch 2: " + a.l + " !== " + o);
        var v;
        try {
            v = Xi(a, null)
        } catch (p) {}
        for (d in v) h[d] = v[d];
        h.FMTID = [i, s];
        return h
    }

    function qi(e, r, t, a, n, i) {
        var s = ba(n ? 68 : 48);
        var f = [s];
        s._W(2, 65534);
        s._W(2, 0);
        s._W(4, 842412599);
        s._W(16, Ze.utils.consts.HEADER_CLSID, "hex");
        s._W(4, n ? 2 : 1);
        s._W(16, r, "hex");
        s._W(4, n ? 68 : 48);
        var o = Ki(e, t, a);
        f.push(o);
        if (n) {
            var c = Ki(n, null, null);
            s._W(16, i, "hex");
            s._W(4, 68 + o.length);
            f.push(c)
        }
        return I(f)
    }

    function Zi(e, r) {
        e._R(r);
        return null
    }

    function Qi(e, r) {
        if (!r) r = ba(e);
        for (var t = 0; t < e; ++t) r._W(1, 0);
        return r
    }

    function es(e, r, t) {
        var a = [],
            n = e.l + r;
        while (e.l < n) a.push(t(e, n - e.l));
        if (n !== e.l) throw new Error("Slurp error");
        return a
    }

    function rs(e, r) {
        return e._R(r) === 1;
    }

    function ts(e, r) {
        if (!r) r = ba(2);
        r._W(2, +!!e);
        return r
    }

    function as(e) {
        return e._R(2, "u")
    }

    function ns(e, r) {
        if (!r) r = ba(2);
        r._W(2, e);
        return r
    }

    function is(e, r) {
        return es(e, r, as)
    }

    function ss(e) {
        var r = e._R(1),
            t = e._R(1);
        return t === 1 ? r : r === 1
    }

    function fs(e, r, t) {
        if (!t) t = ba(2);
        t._W(1, r == "e" ? +e : +!!e);
        t._W(1, r == "e" ? 1 : 0);
        return t
    }

    function os(e, t, a) {
        var n = e._R(a && a.biff >= 12 ? 2 : 1);
        var i = "sbcs-cont";
        var s = r;
        if (a && a.biff >= 8) r = 1200;
        if (!a || a.biff == 8) {
            var f = e._R(1);
            if (f) {
                i = "dbcs-cont"
            }
        } else if (a.biff == 12) {
            i = "wstr"
        }
        if (a.biff >= 2 && a.biff <= 5) i = "cpstr";
        var o = n ? e._R(n, i) : "";
        r = s;
        return o
    }

    function cs(e) {
        var t = r;
        r = 1200;
        var a = e._R(2),
            n = e._R(1);
        var i = n & 4,
            s = n & 8;
        var f = 1 + (n & 1);
        var o = 0,
            c;
        var l = {};
        if (s) o = e._R(2);
        if (i) c = e._R(4);
        var u = f == 2 ? "dbcs-cont" : "sbcs-cont";
        var h = a === 0 ? "" : e._R(a, u);
        if (s) e.l += 4 * o;
        if (i) e.l += c;
        l.t = h;
        if (!s) {
            l.raw = "<t>" + l.t + "</t>";
            l.r = l.t
        }
        r = t;
        return l
    }

    function ls(e) {
        var r = e.t || "",
            t = 1;
        var a = ba(3 + (t > 1 ? 2 : 0));
        a._W(2, r.length);
        a._W(1, (t > 1 ? 8 : 0) | 1);
        if (t > 1) a._W(2, t);
        var n = ba(2 * r.length);
        n._W(2 * r.length, r, "utf16le");
        var i = [a, n];
        return I(i)
    }

    function us(e, r, t) {
        var a;
        if (t) {
            if (t.biff >= 2 && t.biff <= 5) return e._R(r, "cpstr");
            if (t.biff >= 12) return e._R(r, "dbcs-cont")
        }
        var n = e._R(1);
        if (n === 0) {
            a = e._R(r, "sbcs-cont")
        } else {
            a = e._R(r, "dbcs-cont")
        }
        return a
    }

    function hs(e, r, t) {
        var a = e._R(t && t.biff == 2 ? 1 : 2);
        if (a === 0) {
            e.l++;
            return ""
        }
        return us(e, a, t)
    }

    function ds(e, r, t) {
        if (t.biff > 5) return hs(e, r, t);
        var a = e._R(1);
        if (a === 0) {
            e.l++;
            return ""
        }
        return e._R(a, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont")
    }

    function vs(e, r, t) {
        if (!t) t = ba(3 + 2 * e.length);
        t._W(2, e.length);
        t._W(1, 1);
        t._W(31, e, "utf16le");
        return t
    }

    function ps(e) {
        var r = e._R(1);
        e.l++;
        var t = e._R(2);
        e.l += 2;
        return [r, t]
    }

    function ms(e) {
        var r = e._R(4),
            t = e.l;
        var a = false;
        if (r > 24) {
            e.l += r - 24;
            if (e._R(16) === "795881f43b1d7f48af2c825dc4852763") a = true;
            e.l = t
        }
        var n = e._R((a ? r - 24 : r) >> 1, "utf16le").replace(F, "");
        if (a) e.l += 24;
        return n
    }

    function bs(e) {
        var r = e._R(2);
        var t = "";
        while (r-- > 0) t += "../";
        var a = e._R(0, "lpstr-ansi");
        e.l += 2;
        if (e._R(2) != 57005) throw new Error("Bad FileMoniker");
        var n = e._R(4);
        if (n === 0) return t + a.replace(/\\/g, "/");
        var i = e._R(4);
        if (e._R(2) != 3) throw new Error("Bad FileMoniker");
        var s = e._R(i >> 1, "utf16le").replace(F, "");
        return t + s
    }

    function gs(e, r) {
        var t = e._R(16);
        r -= 16;
        switch (t) {
            case "e0c9ea79f9bace118c8200aa004ba90b":
                return ms(e, r);
            case "0303000000000000c000000000000046":
                return bs(e, r);
            default:
                throw new Error("Unsupported Moniker " + t);
        }
    }

    function ws(e) {
        var r = e._R(4);
        var t = r > 0 ? e._R(r, "utf16le").replace(F, "") : "";
        return t
    }

    function ks(e, r) {
        if (!r) r = ba(6 + e.length * 2);
        r._W(4, 1 + e.length);
        for (var t = 0; t < e.length; ++t) r._W(2, e.charCodeAt(t));
        r._W(2, 0);
        return r
    }

    function Ts(e, r) {
        var t = e.l + r;
        var a = e._R(4);
        if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
        var n = e._R(2);
        e.l += 2;
        var i, s, f, o, c = "",
            l, u;
        if (n & 16) i = ws(e, t - e.l);
        if (n & 128) s = ws(e, t - e.l);
        if ((n & 257) === 257) f = ws(e, t - e.l);
        if ((n & 257) === 1) o = gs(e, t - e.l);
        if (n & 8) c = ws(e, t - e.l);
        if (n & 32) l = e._R(16);
        if (n & 64) u = Oi(e);
        e.l = t;
        var h = s || f || o || "";
        if (h && c) h += "#" + c;
        if (!h) h = "#" + c;
        if (n & 2 && h.charAt(0) == "/" && h.charAt(1) != "/") h = "file://" + h;
        var d = {
            Target: h
        };
        if (l) d.guid = l;
        if (u) d.time = u;
        if (i) d.Tooltip = i;
        return d
    }

    function Es(e) {
        var r = ba(512),
            t = 0;
        var a = e.Target;
        if (a.slice(0, 7) == "file://") a = a.slice(7);
        var n = a.indexOf("#");
        var i = n > -1 ? 31 : 23;
        switch (a.charAt(0)) {
            case "#":
                i = 28;
                break;
            case ".":
                i &= ~2;
                break;
        }
        r._W(4, 2);
        r._W(4, i);
        var s = [8, 6815827, 6619237, 4849780, 83];
        for (t = 0; t < s.length; ++t) r._W(4, s[t]);
        if (i == 28) {
            a = a.slice(1);
            ks(a, r)
        } else if (i & 2) {
            s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
            for (t = 0; t < s.length; ++t) r._W(1, parseInt(s[t], 16));
            var f = n > -1 ? a.slice(0, n) : a;
            r._W(4, 2 * (f.length + 1));
            for (t = 0; t < f.length; ++t) r._W(2, f.charCodeAt(t));
            r._W(2, 0);
            if (i & 8) ks(n > -1 ? a.slice(n + 1) : "", r)
        } else {
            s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" ");
            for (t = 0; t < s.length; ++t) r._W(1, parseInt(s[t], 16));
            var o = 0;
            while (a.slice(o * 3, o * 3 + 3) == "../" || a.slice(o * 3, o * 3 + 3) == "..\\") ++o;
            r._W(2, o);
            r._W(4, a.length - 3 * o + 1);
            for (t = 0; t < a.length - 3 * o; ++t) r._W(1, a.charCodeAt(t + 3 * o) & 255);
            r._W(1, 0);
            r._W(2, 65535);
            r._W(2, 57005);
            for (t = 0; t < 6; ++t) r._W(4, 0)
        }
        return r.slice(0, r.l)
    }

    function ys(e) {
        var r = e._R(1),
            t = e._R(1),
            a = e._R(1),
            n = e._R(1);
        return [r, t, a, n]
    }

    function Ss(e, r) {
        var t = ys(e, r);
        t[3] = 0;
        return t
    }

    function _s(e) {
        var r = e._R(2);
        var t = e._R(2);
        var a = e._R(2);
        return {
            r: r,
            c: t,
            ixfe: a
        }
    }

    function As(e, r, t, a) {
        if (!a) a = ba(6);
        a._W(2, e);
        a._W(2, r);
        a._W(2, t || 0);
        return a
    }

    function xs(e) {
        var r = e._R(2);
        var t = e._R(2);
        e.l += 8;
        return {
            type: r,
            flags: t
        }
    }

    function Cs(e, r, t) {
        return r === 0 ? "" : ds(e, r, t)
    }

    function Rs(e, r, t) {
        var a = t.biff > 8 ? 4 : 2;
        var n = e._R(a),
            i = e._R(a, "i"),
            s = e._R(a, "i");
        return [n, i, s]
    }

    function Os(e) {
        var r = e._R(2);
        var t = hn(e);
        return [r, t]
    }

    function Is(e, r, t) {
        e.l += 4;
        r -= 4;
        var a = e.l + r;
        var n = os(e, r, t);
        var i = e._R(2);
        a -= e.l;
        if (i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
        e.l += i;
        return n
    }

    function Ns(e) {
        var r = e._R(2);
        var t = e._R(2);
        var a = e._R(2);
        var n = e._R(2);
        return {
            s: {
                c: a,
                r: r
            },
            e: {
                c: n,
                r: t
            }
        }
    }

    function Fs(e, r) {
        if (!r) r = ba(8);
        r._W(2, e.s.r);
        r._W(2, e.e.r);
        r._W(2, e.s.c);
        r._W(2, e.e.c);
        return r
    }

    function Ds(e) {
        var r = e._R(2);
        var t = e._R(2);
        var a = e._R(1);
        var n = e._R(1);
        return {
            s: {
                c: a,
                r: r
            },
            e: {
                c: n,
                r: t
            }
        }
    }
    var Ps = Ds;

    function Ls(e) {
        e.l += 4;
        var r = e._R(2);
        var t = e._R(2);
        var a = e._R(2);
        e.l += 12;
        return [t, r, a]
    }

    function Ms(e) {
        var r = {};
        e.l += 4;
        e.l += 16;
        r.fSharedNote = e._R(2);
        e.l += 4;
        return r
    }

    function Us(e) {
        var r = {};
        e.l += 4;
        e.cf = e._R(2);
        return r
    }

    function Bs(e) {
        e.l += 2;
        e.l += e._R(2)
    }
    var Ws = {
        0: Bs,
        4: Bs,
        5: Bs,
        6: Bs,
        7: Us,
        8: Bs,
        9: Bs,
        10: Bs,
        11: Bs,
        12: Bs,
        13: Ms,
        14: Bs,
        15: Bs,
        16: Bs,
        17: Bs,
        18: Bs,
        19: Bs,
        20: Bs,
        21: Ls
    };

    function Hs(e, r) {
        var t = e.l + r;
        var a = [];
        while (e.l < t) {
            var n = e._R(2);
            e.l -= 2;
            try {
                a.push(Ws[n](e, t - e.l))
            } catch (i) {
                e.l = t;
                return a
            }
        }
        if (e.l != t) e.l = t;
        return a
    }

    function zs(e, r) {
        var t = {
            BIFFVer: 0,
            dt: 0
        };
        t.BIFFVer = e._R(2);
        r -= 2;
        if (r >= 2) {
            t.dt = e._R(2);
            e.l -= 2
        }
        switch (t.BIFFVer) {
            case 1536:
                ;
            case 1280:
                ;
            case 1024:
                ;
            case 768:
                ;
            case 512:
                ;
            case 2:
                ;
            case 7:
                break;
            default:
                if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer);
        }
        e._R(r);
        return t
    }

    function Vs(e, r, t) {
        var a = 1536,
            n = 16;
        switch (t.bookType) {
            case "biff8":
                break;
            case "biff5":
                a = 1280;
                n = 8;
                break;
            case "biff4":
                a = 4;
                n = 6;
                break;
            case "biff3":
                a = 3;
                n = 6;
                break;
            case "biff2":
                a = 2;
                n = 4;
                break;
            case "xla":
                break;
            default:
                throw new Error("unsupported BIFF version");
        }
        var i = ba(n);
        i._W(2, a);
        i._W(2, r);
        if (n > 4) i._W(2, 29282);
        if (n > 6) i._W(2, 1997);
        if (n > 8) {
            i._W(2, 49161);
            i._W(2, 1);
            i._W(2, 1798);
            i._W(2, 0)
        }
        return i
    }

    function Gs(e, r) {
        if (r === 0) return 1200;
        if (e._R(2) !== 1200) {}
        return 1200
    }

    function js(e, r, t) {
        if (t.enc) {
            e.l += r;
            return ""
        }
        var a = e.l;
        var n = ds(e, 0, t);
        e._R(r + a - e.l);
        return n
    }

    function Xs(e, r) {
        var t = !r || r.biff == 8;
        var a = ba(t ? 112 : 54);
        a._W(r.biff == 8 ? 2 : 1, 7);
        if (t) a._W(1, 0);
        a._W(4, 859007059);
        a._W(4, 5458548 | (t ? 0 : 536870912));
        while (a.l < a.length) a._W(1, t ? 0 : 32);
        return a
    }

    function $s(e, r, t) {
        var a = t && t.biff == 8 || r == 2 ? e._R(2) : (e.l += r, 0);
        return {
            fDialog: a & 16,
            fBelow: a & 64,
            fRight: a & 128
        }
    }

    function Ys(e, r, t) {
        var a = e._R(4);
        var n = e._R(1) & 3;
        var i = e._R(1);
        switch (i) {
            case 0:
                i = "Worksheet";
                break;
            case 1:
                i = "Macrosheet";
                break;
            case 2:
                i = "Chartsheet";
                break;
            case 6:
                i = "VBAModule";
                break;
        }
        var s = os(e, 0, t);
        if (s.length === 0) s = "Sheet1";
        return {
            pos: a,
            hs: n,
            dt: i,
            name: s
        }
    }

    function Ks(e, r) {
        var t = !r || r.biff >= 8 ? 2 : 1;
        var a = ba(8 + t * e.name.length);
        a._W(4, e.pos);
        a._W(1, e.hs || 0);
        a._W(1, e.dt);
        a._W(1, e.name.length);
        if (r.biff >= 8) a._W(1, 1);
        a._W(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
        var n = a.slice(0, a.l);
        n.l = a.l;
        return n
    }

    function Js(e, r) {
        var t = e.l + r;
        var a = e._R(4);
        var n = e._R(4);
        var i = [];
        for (var s = 0; s != n && e.l < t; ++s) {
            i.push(cs(e))
        }
        i.Count = a;
        i.Unique = n;
        return i
    }

    function qs(e, r) {
        var t = ba(8);
        t._W(4, e.Count);
        t._W(4, e.Unique);
        var a = [];
        for (var n = 0; n < e.length; ++n) a[n] = ls(e[n], r);
        var i = I([t].concat(a));
        i.parts = [t.length].concat(a.map(function (e) {
            return e.length
        }));
        return i
    }

    function Zs(e, r) {
        var t = {};
        t.dsst = e._R(2);
        e.l += r - 2;
        return t
    }

    function Qs(e) {
        var r = {};
        r.r = e._R(2);
        r.c = e._R(2);
        r.cnt = e._R(2) - r.c;
        var t = e._R(2);
        e.l += 4;
        var a = e._R(1);
        e.l += 3;
        if (a & 7) r.level = a & 7;
        if (a & 32) r.hidden = true;
        if (a & 64) r.hpt = t / 20;
        return r
    }

    function ef(e) {
        var r = xs(e);
        if (r.type != 2211) throw new Error("Invalid Future Record " + r.type);
        var t = e._R(4);
        return t !== 0
    }

    function rf(e) {
        e._R(2);
        return e._R(4)
    }

    function tf(e, r, t) {
        var a = 0;
        if (!(t && t.biff == 2)) {
            a = e._R(2)
        }
        var n = e._R(2);
        if (t && t.biff == 2) {
            a = 1 - (n >> 15);
            n &= 32767
        }
        var i = {
            Unsynced: a & 1,
            DyZero: (a & 2) >> 1,
            ExAsc: (a & 4) >> 2,
            ExDsc: (a & 8) >> 3
        };
        return [i, n]
    }

    function af(e) {
        var r = e._R(2),
            t = e._R(2),
            a = e._R(2),
            n = e._R(2);
        var i = e._R(2),
            s = e._R(2),
            f = e._R(2);
        var o = e._R(2),
            c = e._R(2);
        return {
            Pos: [r, t],
            Dim: [a, n],
            Flags: i,
            CurTab: s,
            FirstTab: f,
            Selected: o,
            TabRatio: c
        }
    }

    function nf() {
        var e = ba(18);
        e._W(2, 0);
        e._W(2, 0);
        e._W(2, 29280);
        e._W(2, 17600);
        e._W(2, 56);
        e._W(2, 0);
        e._W(2, 0);
        e._W(2, 1);
        e._W(2, 500);
        return e
    }

    function sf(e, r, t) {
        if (t && t.biff >= 2 && t.biff < 5) return {};
        var a = e._R(2);
        return {
            RTL: a & 64
        }
    }

    function ff(e) {
        var r = ba(18),
            t = 1718;
        if (e && e.RTL) t |= 64;
        r._W(2, t);
        r._W(4, 0);
        r._W(4, 64);
        r._W(4, 0);
        r._W(4, 0);
        return r
    }

    function of () {}

    function cf(e, r, t) {
        var a = {
            dyHeight: e._R(2),
            fl: e._R(2)
        };
        switch (t && t.biff || 8) {
            case 2:
                break;
            case 3:
                ;
            case 4:
                e.l += 2;
                break;
            default:
                e.l += 10;
                break;
        }
        a.name = os(e, 0, t);
        return a
    }

    function lf(e, r) {
        var t = e.name || "Arial";
        var a = r && r.biff == 5,
            n = a ? 15 + t.length : 16 + 2 * t.length;
        var i = ba(n);
        i._W(2, (e.sz || 12) * 20);
        i._W(4, 0);
        i._W(2, 400);
        i._W(4, 0);
        i._W(2, 0);
        i._W(1, t.length);
        if (!a) i._W(1, 1);
        i._W((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
        return i
    }

    function uf(e) {
        var r = _s(e);
        r.isst = e._R(4);
        return r
    }

    function hf(e, r, t, a) {
        var n = ba(10);
        As(e, r, a, n);
        n._W(4, t);
        return n
    }

    function df(e, r, t) {
        if (t.biffguess && t.biff == 2) t.biff = 5;
        var a = e.l + r;
        var n = _s(e, 6);
        if (t.biff == 2) e.l++;
        var i = hs(e, a - e.l, t);
        n.val = i;
        return n
    }

    function vf(e, r, t, a, n) {
        var i = !n || n.biff == 8;
        var s = ba(6 + 2 + +i + (1 + i) * t.length);
        As(e, r, a, s);
        s._W(2, t.length);
        if (i) s._W(1, 1);
        s._W((1 + i) * t.length, t, i ? "utf16le" : "sbcs");
        return s
    }

    function pf(e, r, t) {
        var a = e._R(2);
        var n = ds(e, 0, t);
        return [a, n]
    }

    function mf(e, r, t, a) {
        var n = t && t.biff == 5;
        if (!a) a = ba(n ? 3 + r.length : 5 + 2 * r.length);
        a._W(2, e);
        a._W(n ? 1 : 2, r.length);
        if (!n) a._W(1, 1);
        a._W((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le");
        var i = a.length > a.l ? a.slice(0, a.l) : a;
        if (i.l == null) i.l = i.length;
        return i
    }
    var bf = ds;

    function gf(e, r, t) {
        var a = e.l + r;
        var n = t.biff == 8 || !t.biff ? 4 : 2;
        var i = e._R(n),
            s = e._R(n);
        var f = e._R(2),
            o = e._R(2);
        e.l = a;
        return {
            s: {
                r: i,
                c: f
            },
            e: {
                r: s,
                c: o
            }
        }
    }

    function wf(e, r) {
        var t = r.biff == 8 || !r.biff ? 4 : 2;
        var a = ba(2 * t + 6);
        a._W(t, e.s.r);
        a._W(t, e.e.r + 1);
        a._W(2, e.s.c);
        a._W(2, e.e.c + 1);
        a._W(2, 0);
        return a
    }

    function kf(e) {
        var r = e._R(2),
            t = e._R(2);
        var a = Os(e);
        return {
            r: r,
            c: t,
            ixfe: a[0],
            rknum: a[1]
        }
    }

    function Tf(e, r) {
        var t = e.l + r - 2;
        var a = e._R(2),
            n = e._R(2);
        var i = [];
        while (e.l < t) i.push(Os(e));
        if (e.l !== t) throw new Error("MulRK read error");
        var s = e._R(2);
        if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
        return {
            r: a,
            c: n,
            C: s,
            rkrec: i
        }
    }

    function Ef(e, r) {
        var t = e.l + r - 2;
        var a = e._R(2),
            n = e._R(2);
        var i = [];
        while (e.l < t) i.push(e._R(2));
        if (e.l !== t) throw new Error("MulBlank read error");
        var s = e._R(2);
        if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
        return {
            r: a,
            c: n,
            C: s,
            ixfe: i
        }
    }

    function yf(e, r, t, a) {
        var n = {};
        var i = e._R(4),
            s = e._R(4);
        var f = e._R(4),
            o = e._R(2);
        n.patternType = Vn[f >> 26];
        if (!a.cellStyles) return n;
        n.alc = i & 7;
        n.fWrap = i >> 3 & 1;
        n.alcV = i >> 4 & 7;
        n.fJustLast = i >> 7 & 1;
        n.trot = i >> 8 & 255;
        n.cIndent = i >> 16 & 15;
        n.fShrinkToFit = i >> 20 & 1;
        n.iReadOrder = i >> 22 & 2;
        n.fAtrNum = i >> 26 & 1;
        n.fAtrFnt = i >> 27 & 1;
        n.fAtrAlc = i >> 28 & 1;
        n.fAtrBdr = i >> 29 & 1;
        n.fAtrPat = i >> 30 & 1;
        n.fAtrProt = i >> 31 & 1;
        n.dgLeft = s & 15;
        n.dgRight = s >> 4 & 15;
        n.dgTop = s >> 8 & 15;
        n.dgBottom = s >> 12 & 15;
        n.icvLeft = s >> 16 & 127;
        n.icvRight = s >> 23 & 127;
        n.grbitDiag = s >> 30 & 3;
        n.icvTop = f & 127;
        n.icvBottom = f >> 7 & 127;
        n.icvDiag = f >> 14 & 127;
        n.dgDiag = f >> 21 & 15;
        n.icvFore = o & 127;
        n.icvBack = o >> 7 & 127;
        n.fsxButton = o >> 14 & 1;
        return n
    }

    function Sf(e, r, t) {
        var a = {};
        a.ifnt = e._R(2);
        a.numFmtId = e._R(2);
        a.flags = e._R(2);
        a.fStyle = a.flags >> 2 & 1;
        r -= 6;
        a.data = yf(e, r, a.fStyle, t);
        return a
    }

    function _f(e, r, t, a) {
        var n = t && t.biff == 5;
        if (!a) a = ba(n ? 16 : 20);
        a._W(2, 0);
        if (e.style) {
            a._W(2, e.numFmtId || 0);
            a._W(2, 65524)
        } else {
            a._W(2, e.numFmtId || 0);
            a._W(2, r << 4)
        }
        var i = 0;
        if (e.numFmtId > 0 && n) i |= 1024;
        a._W(4, i);
        a._W(4, 0);
        if (!n) a._W(4, 0);
        a._W(2, 0);
        return a
    }

    function Af(e) {
        e.l += 4;
        var r = [e._R(2), e._R(2)];
        if (r[0] !== 0) r[0]--;
        if (r[1] !== 0) r[1]--;
        if (r[0] > 7 || r[1] > 7) throw new Error("Bad Gutters: " + r.join("|"));
        return r
    }

    function xf(e) {
        var r = ba(8);
        r._W(4, 0);
        r._W(2, e[0] ? e[0] + 1 : 0);
        r._W(2, e[1] ? e[1] + 1 : 0);
        return r
    }

    function Cf(e, r, t) {
        var a = _s(e, 6);
        if (t.biff == 2 || r == 9) ++e.l;
        var n = ss(e, 2);
        a.val = n;
        a.t = n === true || n === false ? "b" : "e";
        return a
    }

    function Rf(e, r, t, a, n, i) {
        var s = ba(8);
        As(e, r, a, s);
        fs(t, i, s);
        return s
    }

    function Of(e, r, t) {
        if (t.biffguess && t.biff == 2) t.biff = 5;
        var a = _s(e, 6);
        var n = gn(e, 8);
        a.val = n;
        return a
    }

    function If(e, r, t, a) {
        var n = ba(14);
        As(e, r, a, n);
        wn(t, n);
        return n
    }
    var Nf = Cs;

    function Ff(e, r, t) {
        var a = e.l + r;
        var n = e._R(2);
        var i = e._R(2);
        t.sbcch = i;
        if (i == 1025 || i == 14849) return [i, n];
        if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
        var s = us(e, i);
        var f = [];
        while (a > e.l) f.push(hs(e));
        return [i, n, s, f]
    }

    function Df(e, r, t) {
        var a = e._R(2);
        var n;
        var i = {
            fBuiltIn: a & 1,
            fWantAdvise: a >>> 1 & 1,
            fWantPict: a >>> 2 & 1,
            fOle: a >>> 3 & 1,
            fOleLink: a >>> 4 & 1,
            cf: a >>> 5 & 1023,
            fIcon: a >>> 15 & 1
        };
        if (t.sbcch === 14849) n = Is(e, r - 2, t);
        i.body = n || e._R(r - 2);
        if (typeof n === "string") i.Name = n;
        return i
    }
    var Pf = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"];

    function Lf(e, r, t) {
        var a = e.l + r;
        var n = e._R(2);
        var i = e._R(1);
        var s = e._R(1);
        var f = e._R(t && t.biff == 2 ? 1 : 2);
        var o = 0;
        if (!t || t.biff >= 5) {
            if (t.biff != 5) e.l += 2;
            o = e._R(2);
            if (t.biff == 5) e.l += 2;
            e.l += 4
        }
        var c = us(e, s, t);
        if (n & 32) c = Pf[c.charCodeAt(0)];
        var l = a - e.l;
        if (t && t.biff == 2) --l;
        var u = a == e.l || f === 0 || !(l > 0) ? [] : dd(e, l, t, f);
        return {
            chKey: i,
            Name: c,
            itab: o,
            rgce: u
        }
    }

    function Mf(e, r, t) {
        if (t.biff < 8) return Uf(e, r, t);
        var a = [],
            n = e.l + r,
            i = e._R(t.biff > 8 ? 4 : 2);
        while (i-- !== 0) a.push(Rs(e, t.biff > 8 ? 12 : 6, t));
        if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
        return a
    }

    function Uf(e, r, t) {
        if (e[e.l + 1] == 3) e[e.l]++;
        var a = os(e, r, t);
        return a.charCodeAt(0) == 3 ? a.slice(1) : a
    }

    function Bf(e, r, t) {
        if (t.biff < 8) {
            e.l += r;
            return
        }
        var a = e._R(2);
        var n = e._R(2);
        var i = us(e, a, t);
        var s = us(e, n, t);
        return [i, s]
    }

    function Wf(e, r, t) {
        var a = Ds(e, 6);
        e.l++;
        var n = e._R(1);
        r -= 8;
        return [vd(e, r, t), n, a]
    }

    function Hf(e, r, t) {
        var a = Ps(e, 6);
        switch (t.biff) {
            case 2:
                e.l++;
                r -= 7;
                break;
            case 3:
                ;
            case 4:
                e.l += 2;
                r -= 8;
                break;
            default:
                e.l += 6;
                r -= 12;
        }
        return [a, ud(e, r, t, a)]
    }

    function zf(e) {
        var r = e._R(4) !== 0;
        var t = e._R(4) !== 0;
        var a = e._R(4);
        return [r, t, a]
    }

    function Vf(e, r, t) {
        if (t.biff < 8) return;
        var a = e._R(2),
            n = e._R(2);
        var i = e._R(2),
            s = e._R(2);
        var f = ds(e, 0, t);
        if (t.biff < 8) e._R(1);
        return [{
            r: a,
            c: n
        }, f, s, i]
    }

    function Gf(e, r, t) {
        return Vf(e, r, t)
    }

    function jf(e, r) {
        var t = [];
        var a = e._R(2);
        while (a--) t.push(Ns(e, r));
        return t
    }

    function Xf(e) {
        var r = ba(2 + e.length * 8);
        r._W(2, e.length);
        for (var t = 0; t < e.length; ++t) Fs(e[t], r);
        return r
    }

    function $f(e, r, t) {
        if (t && t.biff < 8) return Kf(e, r, t);
        var a = Ls(e, 22);
        var n = Hs(e, r - 22, a[1]);
        return {
            cmo: a,
            ft: n
        }
    }
    var Yf = {
        8: function (e, r) {
            var t = e.l + r;
            e.l += 10;
            var a = e._R(2);
            e.l += 4;
            e.l += 2;
            e.l += 2;
            e.l += 2;
            e.l += 4;
            var n = e._R(1);
            e.l += n;
            e.l = t;
            return {
                fmt: a
            }
        }
    };

    function Kf(e, r, t) {
        e.l += 4;
        var a = e._R(2);
        var n = e._R(2);
        var i = e._R(2);
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 2;
        e.l += 6;
        r -= 36;
        var s = [];
        s.push((Yf[a] || ma)(e, r, t));
        return {
            cmo: [n, a, i],
            ft: s
        }
    }

    function Jf(e, r, t) {
        var a = e.l;
        var n = "";
        try {
            e.l += 4;
            var i = (t.lastobj || {
                cmo: [0, 0]
            }).cmo[1];
            var s;
            if ([0, 5, 7, 11, 12, 14].indexOf(i) == -1) e.l += 6;
            else s = ps(e, 6, t);
            var f = e._R(2);
            e._R(2);
            as(e, 2);
            var o = e._R(2);
            e.l += o;
            for (var c = 1; c < e.lens.length - 1; ++c) {
                if (e.l - a != e.lens[c]) throw new Error("TxO: bad continue record");
                var l = e[e.l];
                var u = us(e, e.lens[c + 1] - e.lens[c] - 1);
                n += u;
                if (n.length >= (l ? f : 2 * f)) break
            }
            if (n.length !== f && n.length !== f * 2) {
                throw new Error("cchText: " + f + " != " + n.length)
            }
            e.l = a + r;
            return {
                t: n
            }
        } catch (h) {
            e.l = a + r;
            return {
                t: n
            }
        }
    }

    function qf(e, r) {
        var t = Ns(e, 8);
        e.l += 16;
        var a = Ts(e, r - 24);
        return [t, a]
    }

    function Zf(e) {
        var r = ba(24);
        var t = Da(e[0]);
        r._W(2, t.r);
        r._W(2, t.r);
        r._W(2, t.c);
        r._W(2, t.c);
        var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
        for (var n = 0; n < 16; ++n) r._W(1, parseInt(a[n], 16));
        return I([r, Es(e[1])])
    }

    function Qf(e, r) {
        e._R(2);
        var t = Ns(e, 8);
        var a = e._R((r - 10) / 2, "dbcs-cont");
        a = a.replace(F, "");
        return [t, a]
    }

    function eo(e) {
        var r = e[1].Tooltip;
        var t = ba(10 + 2 * (r.length + 1));
        t._W(2, 2048);
        var a = Da(e[0]);
        t._W(2, a.r);
        t._W(2, a.r);
        t._W(2, a.c);
        t._W(2, a.c);
        for (var n = 0; n < r.length; ++n) t._W(2, r.charCodeAt(n));
        t._W(2, 0);
        return t
    }

    function ro(e) {
        var r = [0, 0],
            t;
        t = e._R(2);
        r[0] = zn[t] || t;
        t = e._R(2);
        r[1] = zn[t] || t;
        return r
    }

    function to(e) {
        if (!e) e = ba(4);
        e._W(2, 1);
        e._W(2, 1);
        return e
    }

    function ao(e) {
        var r = e._R(2);
        var t = [];
        while (r-- > 0) t.push(Ss(e, 8));
        return t
    }

    function no(e) {
        var r = e._R(2);
        var t = [];
        while (r-- > 0) t.push(Ss(e, 8));
        return t
    }

    function io(e) {
        e.l += 2;
        var r = {
            cxfs: 0,
            crc: 0
        };
        r.cxfs = e._R(2);
        r.crc = e._R(4);
        return r
    }

    function so(e, r, t) {
        if (!t.cellStyles) return ma(e, r);
        var a = t && t.biff >= 12 ? 4 : 2;
        var n = e._R(a);
        var i = e._R(a);
        var s = e._R(a);
        var f = e._R(a);
        var o = e._R(2);
        if (a == 2) e.l += 2;
        var c = {
            s: n,
            e: i,
            w: s,
            ixfe: f,
            flags: o
        };
        if (t.biff >= 5 || !t.biff) c.level = o >> 8 & 7;
        return c
    }

    function fo(e, r) {
        var t = ba(12);
        t._W(2, r);
        t._W(2, r);
        t._W(2, e.width * 256);
        t._W(2, 0);
        var a = 0;
        if (e.hidden) a |= 1;
        t._W(1, a);
        a = e.level || 0;
        t._W(1, a);
        t._W(2, 0);
        return t
    }

    function oo(e, r) {
        var t = {};
        if (r < 32) return t;
        e.l += 16;
        t.header = gn(e, 8);
        t.footer = gn(e, 8);
        e.l += 2;
        return t
    }

    function co(e, r, t) {
        var a = {
            area: false
        };
        if (t.biff != 5) {
            e.l += r;
            return a
        }
        var n = e._R(1);
        e.l += 3;
        if (n & 16) a.area = true;
        return a
    }

    function lo(e) {
        var r = ba(2 * e);
        for (var t = 0; t < e; ++t) r._W(2, t + 1);
        return r
    }
    var uo = _s;
    var ho = is;
    var vo = hs;

    function po(e) {
        var r = e._R(2);
        var t = e._R(2);
        var a = e._R(4);
        var n = {
            fmt: r,
            env: t,
            len: a,
            data: e.slice(e.l, e.l + a)
        };
        e.l += a;
        return n
    }

    function mo(e, r, t) {
        if (t.biffguess && t.biff == 5) t.biff = 2;
        var a = _s(e, 6);
        ++e.l;
        var n = ds(e, r - 7, t);
        a.t = "str";
        a.val = n;
        return a
    }

    function bo(e) {
        var r = _s(e, 6);
        ++e.l;
        var t = gn(e, 8);
        r.t = "n";
        r.val = t;
        return r
    }

    function go(e, r, t) {
        var a = ba(15);
        db(a, e, r);
        a._W(8, t, "f");
        return a
    }

    function wo(e) {
        var r = _s(e, 6);
        ++e.l;
        var t = e._R(2);
        r.t = "n";
        r.val = t;
        return r
    }

    function ko(e, r, t) {
        var a = ba(9);
        db(a, e, r);
        a._W(2, t);
        return a
    }

    function To(e) {
        var r = e._R(1);
        if (r === 0) {
            e.l++;
            return ""
        }
        return e._R(r, "sbcs-cont")
    }

    function Eo(e, r) {
        e.l += 6;
        e.l += 2;
        e.l += 1;
        e.l += 3;
        e.l += 1;
        e.l += r - 13
    }

    function yo(e, r, t) {
        var a = e.l + r;
        var n = _s(e, 6);
        var i = e._R(2);
        var s = us(e, i, t);
        e.l = a;
        n.t = "str";
        n.val = s;
        return n
    }
    var So = [2, 3, 48, 49, 131, 139, 140, 245];
    var _o = function () {
        var e = {
            1: 437,
            2: 850,
            3: 1252,
            4: 1e4,
            100: 852,
            101: 866,
            102: 865,
            103: 861,
            104: 895,
            105: 620,
            106: 737,
            107: 857,
            120: 950,
            121: 949,
            122: 936,
            123: 932,
            124: 874,
            125: 1255,
            126: 1256,
            150: 10007,
            151: 10029,
            152: 10006,
            200: 1250,
            201: 1251,
            202: 1254,
            203: 1253,
            0: 20127,
            8: 865,
            9: 437,
            10: 850,
            11: 437,
            13: 437,
            14: 850,
            15: 437,
            16: 850,
            17: 437,
            18: 850,
            19: 932,
            20: 850,
            21: 437,
            22: 850,
            23: 865,
            24: 437,
            25: 437,
            26: 850,
            27: 437,
            28: 863,
            29: 850,
            31: 852,
            34: 852,
            35: 852,
            36: 860,
            37: 850,
            38: 866,
            55: 850,
            64: 852,
            77: 936,
            78: 949,
            79: 950,
            80: 874,
            87: 1252,
            88: 1252,
            89: 1252,
            108: 863,
            134: 737,
            135: 852,
            136: 857,
            204: 1257,
            255: 16969
        };
        var r = sr({
            1: 437,
            2: 850,
            3: 1252,
            4: 1e4,
            100: 852,
            101: 866,
            102: 865,
            103: 861,
            104: 895,
            105: 620,
            106: 737,
            107: 857,
            120: 950,
            121: 949,
            122: 936,
            123: 932,
            124: 874,
            125: 1255,
            126: 1256,
            150: 10007,
            151: 10029,
            152: 10006,
            200: 1250,
            201: 1251,
            202: 1254,
            203: 1253,
            0: 20127
        });

        function n(r, t) {
            var n = [];
            var i = S(1);
            switch (t.type) {
                case "base64":
                    i = A(T(r));
                    break;
                case "binary":
                    i = A(r);
                    break;
                case "buffer":
                    ;
                case "array":
                    i = r;
                    break;
            }
            pa(i, 0);
            var s = i._R(1);
            var f = !!(s & 136);
            var o = false,
                c = false;
            switch (s) {
                case 2:
                    break;
                case 3:
                    break;
                case 48:
                    o = true;
                    f = true;
                    break;
                case 49:
                    o = true;
                    f = true;
                    break;
                case 131:
                    break;
                case 139:
                    break;
                case 140:
                    c = true;
                    break;
                case 245:
                    break;
                default:
                    throw new Error("DBF Unsupported Version: " + s.toString(16));
            }
            var l = 0,
                u = 521;
            if (s == 2) l = i._R(2);
            i.l += 3;
            if (s != 2) l = i._R(4);
            if (l > 1048576) l = 1e6;
            if (s != 2) u = i._R(2);
            var h = i._R(2);
            var d = t.codepage || 1252;
            if (s != 2) {
                i.l += 16;
                i._R(1);
                if (i[i.l] !== 0) d = e[i[i.l]];
                i.l += 1;
                i.l += 2
            }
            if (c) i.l += 36;
            var v = [],
                p = {};
            var m = Math.min(i.length, s == 2 ? 521 : u - 10 - (o ? 264 : 0));
            var b = c ? 32 : 11;
            while (i.l < m && i[i.l] != 13) {
                p = {};
                p.name = a.utils.decode(d, i.slice(i.l, i.l + b)).replace(/[\u0000\r\n].*$/g, "");
                i.l += b;
                p.type = String.fromCharCode(i._R(1));
                if (s != 2 && !c) p.offset = i._R(4);
                p.len = i._R(1);
                if (s == 2) p.offset = i._R(2);
                p.dec = i._R(1);
                if (p.name.length) v.push(p);
                if (s != 2) i.l += c ? 13 : 14;
                switch (p.type) {
                    case "B":
                        if ((!o || p.len != 8) && t.WTF) console.log("Skipping " + p.name + ":" + p.type);
                        break;
                    case "G":
                        ;
                    case "P":
                        if (t.WTF) console.log("Skipping " + p.name + ":" + p.type);
                        break;
                    case "+":
                        ;
                    case "0":
                        ;
                    case "@":
                        ;
                    case "C":
                        ;
                    case "D":
                        ;
                    case "F":
                        ;
                    case "I":
                        ;
                    case "L":
                        ;
                    case "M":
                        ;
                    case "N":
                        ;
                    case "O":
                        ;
                    case "T":
                        ;
                    case "Y":
                        break;
                    default:
                        throw new Error("Unknown Field Type: " + p.type);
                }
            }
            if (i[i.l] !== 13) i.l = u - 1;
            if (i._R(1) !== 13) throw new Error("DBF Terminator not found " + i.l + " " + i[i.l]);
            i.l = u;
            var g = 0,
                w = 0;
            n[0] = [];
            for (w = 0; w != v.length; ++w) n[0][w] = v[w].name;
            while (l-- > 0) {
                if (i[i.l] === 42) {
                    i.l += h;
                    continue
                }++i.l;
                n[++g] = [];
                w = 0;
                for (w = 0; w != v.length; ++w) {
                    var k = i.slice(i.l, i.l + v[w].len);
                    i.l += v[w].len;
                    pa(k, 0);
                    var E = a.utils.decode(d, k);
                    switch (v[w].type) {
                        case "C":
                            if (E.trim().length) n[g][w] = E.replace(/\s+$/, "");
                            break;
                        case "D":
                            if (E.length === 8) n[g][w] = new Date(+E.slice(0, 4), +E.slice(4, 6) - 1, +E.slice(6, 8));
                            else n[g][w] = E;
                            break;
                        case "F":
                            n[g][w] = parseFloat(E.trim());
                            break;
                        case "+":
                            ;
                        case "I":
                            n[g][w] = c ? k._R(-4, "i") ^ 2147483648 : k._R(4, "i");
                            break;
                        case "L":
                            switch (E.trim().toUpperCase()) {
                                case "Y":
                                    ;
                                case "T":
                                    n[g][w] = true;
                                    break;
                                case "N":
                                    ;
                                case "F":
                                    n[g][w] = false;
                                    break;
                                case "":
                                    ;
                                case "?":
                                    break;
                                default:
                                    throw new Error("DBF Unrecognized L:|" + E + "|");
                            }
                            break;
                        case "M":
                            if (!f) throw new Error("DBF Unexpected MEMO for type " + s.toString(16));
                            n[g][w] = "##MEMO##" + (c ? parseInt(E.trim(), 10) : k._R(4));
                            break;
                        case "N":
                            E = E.replace(/\u0000/g, "").trim();
                            if (E && E != ".") n[g][w] = +E || 0;
                            break;
                        case "@":
                            n[g][w] = new Date(k._R(-8, "f") - 621356832e5);
                            break;
                        case "T":
                            n[g][w] = new Date((k._R(4) - 2440588) * 864e5 + k._R(4));
                            break;
                        case "Y":
                            n[g][w] = k._R(4, "i") / 1e4 + k._R(4, "i") / 1e4 * Math.pow(2, 32);
                            break;
                        case "O":
                            n[g][w] = -k._R(-8, "f");
                            break;
                        case "B":
                            if (o && v[w].len == 8) {
                                n[g][w] = k._R(8, "f");
                                break
                            };
                        case "G":
                            ;
                        case "P":
                            k.l += v[w].len;
                            break;
                        case "0":
                            if (v[w].name === "_NullFlags") break;
                        default:
                            throw new Error("DBF Unsupported data type " + v[w].type);
                    }
                }
            }
            if (s != 2)
                if (i.l < i.length && i[i.l++] != 26) throw new Error("DBF EOF Marker missing " + (i.l - 1) + " of " + i.length + " " + i[i.l - 1].toString(16));
            if (t && t.sheetRows) n = n.slice(0, t.sheetRows);
            t.DBF = v;
            return n
        }

        function i(e, r) {
            var t = r || {};
            if (!t.dateNF) t.dateNF = "yyyymmdd";
            var a = Va(n(e, t), t);
            a["!cols"] = t.DBF.map(function (e) {
                return {
                    wch: e.len,
                    DBF: e
                }
            });
            delete t.DBF;
            return a
        }

        function s(e, r) {
            try {
                return Ha(i(e, r), r)
            } catch (t) {
                if (r && r.WTF) throw t
            }
            return {
                SheetNames: [],
                Sheets: {}
            }
        }
        var f = {
            B: 8,
            C: 250,
            L: 1,
            D: 8,
            "?": 0,
            "": 0
        };

        function c(e, a) {
            var n = a || {};
            if (+n.codepage >= 0) o(+n.codepage);
            if (n.type == "string") throw new Error("Cannot write DBF to JS string");
            var i = wa();
            var s = bw(e, {
                header: 1,
                raw: true,
                cellDates: true
            });
            var c = s[0],
                l = s.slice(1),
                u = e["!cols"] || [];
            var h = 0,
                d = 0,
                v = 0,
                p = 1;
            for (h = 0; h < c.length; ++h) {
                if (((u[h] || {}).DBF || {}).name) {
                    c[h] = u[h].DBF.name;
                    ++v;
                    continue
                }
                if (c[h] == null) continue;
                ++v;
                if (typeof c[h] === "number") c[h] = c[h].toString(10);
                if (typeof c[h] !== "string") throw new Error("DBF Invalid column name " + c[h] + " |" + typeof c[h] + "|");
                if (c.indexOf(c[h]) !== h)
                    for (d = 0; d < 1024; ++d)
                        if (c.indexOf(c[h] + "_" + d) == -1) {
                            c[h] += "_" + d;
                            break
                        }
            }
            var m = Ua(e["!ref"]);
            var b = [];
            var g = [];
            var w = [];
            for (h = 0; h <= m.e.c - m.s.c; ++h) {
                var k = "",
                    T = "",
                    E = 0;
                var y = [];
                for (d = 0; d < l.length; ++d) {
                    if (l[d][h] != null) y.push(l[d][h])
                }
                if (y.length == 0 || c[h] == null) {
                    b[h] = "?";
                    continue
                }
                for (d = 0; d < y.length; ++d) {
                    switch (typeof y[d]) {
                        case "number":
                            T = "B";
                            break;
                        case "string":
                            T = "C";
                            break;
                        case "boolean":
                            T = "L";
                            break;
                        case "object":
                            T = y[d] instanceof Date ? "D" : "C";
                            break;
                        default:
                            T = "C";
                    }
                    E = Math.max(E, String(y[d]).length);
                    k = k && k != T ? "C" : T
                }
                if (E > 250) E = 250;
                T = ((u[h] || {}).DBF || {}).type;
                if (T == "C") {
                    if (u[h].DBF.len > E) E = u[h].DBF.len
                }
                if (k == "B" && T == "N") {
                    k = "N";
                    w[h] = u[h].DBF.dec;
                    E = u[h].DBF.len
                }
                g[h] = k == "C" || T == "N" ? E : f[k] || 0;
                p += g[h];
                b[h] = k
            }
            var S = i.next(32);
            S._W(4, 318902576);
            S._W(4, l.length);
            S._W(2, 296 + 32 * v);
            S._W(2, p);
            for (h = 0; h < 4; ++h) S._W(4, 0);
            S._W(4, 0 | (+r[t] || 3) << 8);
            for (h = 0, d = 0; h < c.length; ++h) {
                if (c[h] == null) continue;
                var _ = i.next(32);
                var A = (c[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
                _._W(1, A, "sbcs");
                _._W(1, b[h] == "?" ? "C" : b[h], "sbcs");
                _._W(4, d);
                _._W(1, g[h] || f[b[h]] || 0);
                _._W(1, w[h] || 0);
                _._W(1, 2);
                _._W(4, 0);
                _._W(1, 0);
                _._W(4, 0);
                _._W(4, 0);
                d += g[h] || f[b[h]] || 0
            }
            var x = i.next(264);
            x._W(4, 13);
            for (h = 0; h < 65; ++h) x._W(4, 0);
            for (h = 0; h < l.length; ++h) {
                var C = i.next(p);
                C._W(1, 0);
                for (d = 0; d < c.length; ++d) {
                    if (c[d] == null) continue;
                    switch (b[d]) {
                        case "L":
                            C._W(1, l[h][d] == null ? 63 : l[h][d] ? 84 : 70);
                            break;
                        case "B":
                            C._W(8, l[h][d] || 0, "f");
                            break;
                        case "N":
                            var R = "0";
                            if (typeof l[h][d] == "number") R = l[h][d].toFixed(w[d] || 0);
                            for (v = 0; v < g[d] - R.length; ++v) C._W(1, 32);
                            C._W(1, R, "sbcs");
                            break;
                        case "D":
                            if (!l[h][d]) C._W(8, "00000000", "sbcs");
                            else {
                                C._W(4, ("0000" + l[h][d].getFullYear()).slice(-4), "sbcs");
                                C._W(2, ("00" + (l[h][d].getMonth() + 1)).slice(-2), "sbcs");
                                C._W(2, ("00" + l[h][d].getDate()).slice(-2), "sbcs")
                            }
                            break;
                        case "C":
                            var O = String(l[h][d] != null ? l[h][d] : "").slice(0, g[d]);
                            C._W(1, O, "sbcs");
                            for (v = 0; v < g[d] - O.length; ++v) C._W(1, 32);
                            break;
                    }
                }
            }
            i.next(1)._W(1, 26);
            return i.end()
        }
        return {
            to_workbook: s,
            to_sheet: i,
            from_sheet: c
        }
    }();
    var Ao = function () {
        var e = {
            AA: "À",
            BA: "Á",
            CA: "Â",
            DA: 195,
            HA: "Ä",
            JA: 197,
            AE: "È",
            BE: "É",
            CE: "Ê",
            HE: "Ë",
            AI: "Ì",
            BI: "Í",
            CI: "Î",
            HI: "Ï",
            AO: "Ò",
            BO: "Ó",
            CO: "Ô",
            DO: 213,
            HO: "Ö",
            AU: "Ù",
            BU: "Ú",
            CU: "Û",
            HU: "Ü",
            Aa: "à",
            Ba: "á",
            Ca: "â",
            Da: 227,
            Ha: "ä",
            Ja: 229,
            Ae: "è",
            Be: "é",
            Ce: "ê",
            He: "ë",
            Ai: "ì",
            Bi: "í",
            Ci: "î",
            Hi: "ï",
            Ao: "ò",
            Bo: "ó",
            Co: "ô",
            Do: 245,
            Ho: "ö",
            Au: "ù",
            Bu: "ú",
            Cu: "û",
            Hu: "ü",
            KC: "Ç",
            Kc: "ç",
            q: "æ",
            z: "œ",
            a: "Æ",
            j: "Œ",
            DN: 209,
            Dn: 241,
            Hy: 255,
            S: 169,
            c: 170,
            R: 174,
            "B ": 180,
            0: 176,
            1: 177,
            2: 178,
            3: 179,
            5: 181,
            6: 182,
            7: 183,
            Q: 185,
            k: 186,
            b: 208,
            i: 216,
            l: 222,
            s: 240,
            y: 248,
            "!": 161,
            '"': 162,
            "#": 163,
            "(": 164,
            "%": 165,
            "'": 167,
            "H ": 168,
            "+": 171,
            ";": 187,
            "<": 188,
            "=": 189,
            ">": 190,
            "?": 191,
            "{": 223
        };
        var r = new RegExp("N(" + nr(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm");
        var t = function (r, t) {
            var a = e[t];
            return typeof a == "number" ? p(a) : a
        };
        var n = function (e, r, t) {
            var a = r.charCodeAt(0) - 32 << 4 | t.charCodeAt(0) - 48;
            return a == 59 ? e : p(a)
        };
        e["|"] = 254;

        function i(e, r) {
            switch (r.type) {
                case "base64":
                    return s(T(e), r);
                case "binary":
                    return s(e, r);
                case "buffer":
                    return s(E && Buffer.isBuffer(e) ? e.toString("binary") : C(e), r);
                case "array":
                    return s(kr(e), r);
            }
            throw new Error("Unrecognized type " + r.type)
        }

        function s(e, i) {
            var s = e.split(/[\n\r]+/),
                f = -1,
                c = -1,
                l = 0,
                u = 0,
                h = [];
            var d = [];
            var v = null;
            var p = {},
                m = [],
                b = [],
                g = [];
            var w = 0,
                k;
            var T = {
                Workbook: {
                    WBProps: {},
                    Names: []
                }
            };
            if (+i.codepage >= 0) o(+i.codepage);
            for (; l !== s.length; ++l) {
                w = 0;
                var E = s[l].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(r, t);
                var y = E.replace(/;;/g, "\0").split(";").map(function (e) {
                    return e.replace(/\u0000/g, ";")
                });
                var S = y[0],
                    _;
                if (E.length > 0) switch (S) {
                    case "ID":
                        break;
                    case "E":
                        break;
                    case "B":
                        break;
                    case "O":
                        for (u = 1; u < y.length; ++u) switch (y[u].charAt(0)) {
                            case "V": {
                                var A = parseInt(y[u].slice(1), 10);
                                if (A >= 1 && A <= 4) T.Workbook.WBProps.date1904 = true
                            }
                            break;
                        }
                        break;
                    case "W":
                        break;
                    case "P":
                        switch (y[1].charAt(0)) {
                            case "P":
                                d.push(E.slice(3).replace(/;;/g, ";"));
                                break;
                        }
                        break;
                    case "NN": {
                        var x = {
                            Sheet: 0
                        };
                        for (u = 1; u < y.length; ++u) switch (y[u].charAt(0)) {
                            case "N":
                                x.Name = y[u].slice(1);
                                break;
                            case "E":
                                x.Ref = (i && i.sheet || "Sheet1") + "!" + Ru(y[u].slice(1));
                                break;
                        }
                        T.Workbook.Names.push(x)
                    }
                    break;
                case "C":
                    var C = false,
                        R = false,
                        O = false,
                        I = false,
                        N = -1,
                        F = -1;
                    for (u = 1; u < y.length; ++u) switch (y[u].charAt(0)) {
                        case "A":
                            break;
                        case "X":
                            c = parseInt(y[u].slice(1), 10) - 1;
                            R = true;
                            break;
                        case "Y":
                            f = parseInt(y[u].slice(1), 10) - 1;
                            if (!R) c = 0;
                            for (k = h.length; k <= f; ++k) h[k] = [];
                            break;
                        case "K":
                            _ = y[u].slice(1);
                            if (_.charAt(0) === '"') _ = _.slice(1, _.length - 1);
                            else if (_ === "TRUE") _ = true;
                            else if (_ === "FALSE") _ = false;
                            else if (!isNaN(yr(_))) {
                                _ = yr(_);
                                if (v !== null && Pe(v)) _ = vr(T.Workbook.WBProps.date1904 ? _ + 1462 : _)
                            } else if (!isNaN(xr(_).getDate())) {
                                _ = wr(_)
                            }
                            if (typeof a !== "undefined" && typeof _ == "string" && (i || {}).type != "string" && (i || {}).codepage) _ = a.utils.decode(i.codepage, _);
                            C = true;
                            break;
                        case "E":
                            I = true;
                            var D = Ru(y[u].slice(1), {
                                r: f,
                                c: c
                            });
                            h[f][c] = [h[f][c], D];
                            break;
                        case "S":
                            O = true;
                            h[f][c] = [h[f][c], "S5S"];
                            break;
                        case "G":
                            break;
                        case "R":
                            N = parseInt(y[u].slice(1), 10) - 1;
                            break;
                        case "C":
                            F = parseInt(y[u].slice(1), 10) - 1;
                            break;
                        default:
                            if (i && i.WTF) throw new Error("SYLK bad record " + E);
                    }
                    if (C) {
                        if (h[f][c] && h[f][c].length == 2) h[f][c][0] = _;
                        else h[f][c] = _;
                        v = null
                    }
                    if (O) {
                        if (I) throw new Error("SYLK shared formula cannot have own formula");
                        var P = N > -1 && h[N][F];
                        if (!P || !P[1]) throw new Error("SYLK shared formula cannot find base");
                        h[f][c][1] = Nu(P[1], {
                            r: f - N,
                            c: c - F
                        })
                    }
                    break;
                case "F":
                    var L = 0;
                    for (u = 1; u < y.length; ++u) switch (y[u].charAt(0)) {
                        case "X":
                            c = parseInt(y[u].slice(1), 10) - 1;
                            ++L;
                            break;
                        case "Y":
                            f = parseInt(y[u].slice(1), 10) - 1;
                            for (k = h.length; k <= f; ++k) h[k] = [];
                            break;
                        case "M":
                            w = parseInt(y[u].slice(1), 10) / 20;
                            break;
                        case "F":
                            break;
                        case "G":
                            break;
                        case "P":
                            v = d[parseInt(y[u].slice(1), 10)];
                            break;
                        case "S":
                            break;
                        case "D":
                            break;
                        case "N":
                            break;
                        case "W":
                            g = y[u].slice(1).split(" ");
                            for (k = parseInt(g[0], 10); k <= parseInt(g[1], 10); ++k) {
                                w = parseInt(g[2], 10);
                                b[k - 1] = w === 0 ? {
                                    hidden: true
                                } : {
                                    wch: w
                                }
                            }
                            break;
                        case "C":
                            c = parseInt(y[u].slice(1), 10) - 1;
                            if (!b[c]) b[c] = {};
                            break;
                        case "R":
                            f = parseInt(y[u].slice(1), 10) - 1;
                            if (!m[f]) m[f] = {};
                            if (w > 0) {
                                m[f].hpt = w;
                                m[f].hpx = Uc(w)
                            } else if (w === 0) m[f].hidden = true;
                            break;
                        default:
                            if (i && i.WTF) throw new Error("SYLK bad record " + E);
                    }
                    if (L < 1) v = null;
                    break;
                default:
                    if (i && i.WTF) throw new Error("SYLK bad record " + E);
                }
            }
            if (m.length > 0) p["!rows"] = m;
            if (b.length > 0) p["!cols"] = b;
            b.forEach(function (e) {
                Dc(e)
            });
            if (i && i.sheetRows) h = h.slice(0, i.sheetRows);
            return [h, p, T]
        }

        function f(e, r) {
            var t = i(e, r);
            var a = t[0],
                n = t[1],
                s = t[2];
            var f = Va(a, r);
            nr(n).forEach(function (e) {
                f[e] = n[e]
            });
            var o = Ha(f, r);
            nr(s).forEach(function (e) {
                o[e] = s[e]
            });
            return o
        }

        function c(e, r, t, a) {
            var n = "C;Y" + (t + 1) + ";X" + (a + 1) + ";K";
            switch (e.t) {
                case "n":
                    n += e.v || 0;
                    if (e.f && !e.F) n += ";E" + Iu(e.f, {
                        r: t,
                        c: a
                    });
                    break;
                case "b":
                    n += e.v ? "TRUE" : "FALSE";
                    break;
                case "e":
                    n += e.w || e.v;
                    break;
                case "d":
                    n += '"' + (e.w || e.v) + '"';
                    break;
                case "s":
                    n += '"' + e.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
                    break;
            }
            return n
        }

        function l(e, r) {
            r.forEach(function (r, t) {
                var a = "F;W" + (t + 1) + " " + (t + 1) + " ";
                if (r.hidden) a += "0";
                else {
                    if (typeof r.width == "number" && !r.wpx) r.wpx = Rc(r.width);
                    if (typeof r.wpx == "number" && !r.wch) r.wch = Oc(r.wpx);
                    if (typeof r.wch == "number") a += Math.round(r.wch)
                }
                if (a.charAt(a.length - 1) != " ") e.push(a)
            })
        }

        function u(e, r) {
            r.forEach(function (r, t) {
                var a = "F;";
                if (r.hidden) a += "M0;";
                else if (r.hpt) a += "M" + 20 * r.hpt + ";";
                else if (r.hpx) a += "M" + 20 * Mc(r.hpx) + ";";
                if (a.length > 2) e.push(a + "R" + (t + 1))
            })
        }

        function h(e, r) {
            var t = ["ID;PSheetJS;N;E"],
                a = [];
            var n = Ua(e["!ref"]),
                i;
            var s = Array.isArray(e);
            var f = "\r\n";
            t.push("P;PGeneral");
            t.push("F;P0;DG0G8;M255");
            if (e["!cols"]) l(t, e["!cols"]);
            if (e["!rows"]) u(t, e["!rows"]);
            t.push("B;Y" + (n.e.r - n.s.r + 1) + ";X" + (n.e.c - n.s.c + 1) + ";D" + [n.s.c, n.s.r, n.e.c, n.e.r].join(" "));
            for (var o = n.s.r; o <= n.e.r; ++o) {
                for (var h = n.s.c; h <= n.e.c; ++h) {
                    var d = Pa({
                        r: o,
                        c: h
                    });
                    i = s ? (e[o] || [])[h] : e[d];
                    if (!i || i.v == null && (!i.f || i.F)) continue;
                    a.push(c(i, e, o, h, r))
                }
            }
            return t.join(f) + f + a.join(f) + f + "E" + f
        }
        return {
            to_workbook: f,
            from_sheet: h
        }
    }();
    var xo = function () {
        function e(e, t) {
            switch (t.type) {
                case "base64":
                    return r(T(e), t);
                case "binary":
                    return r(e, t);
                case "buffer":
                    return r(E && Buffer.isBuffer(e) ? e.toString("binary") : C(e), t);
                case "array":
                    return r(kr(e), t);
            }
            throw new Error("Unrecognized type " + t.type)
        }

        function r(e, r) {
            var t = e.split("\n"),
                a = -1,
                n = -1,
                i = 0,
                s = [];
            for (; i !== t.length; ++i) {
                if (t[i].trim() === "BOT") {
                    s[++a] = [];
                    n = 0;
                    continue
                }
                if (a < 0) continue;
                var f = t[i].trim().split(",");
                var o = f[0],
                    c = f[1];
                ++i;
                var l = t[i] || "";
                while ((l.match(/["]/g) || []).length & 1 && i < t.length - 1) l += "\n" + t[++i];
                l = l.trim();
                switch (+o) {
                    case -1:
                        if (l === "BOT") {
                            s[++a] = [];
                            n = 0;
                            continue
                        } else if (l !== "EOD") throw new Error("Unrecognized DIF special command " + l);
                        break;
                    case 0:
                        if (l === "TRUE") s[a][n] = true;
                        else if (l === "FALSE") s[a][n] = false;
                        else if (!isNaN(yr(c))) s[a][n] = yr(c);
                        else if (!isNaN(xr(c).getDate())) s[a][n] = wr(c);
                        else s[a][n] = c;
                        ++n;
                        break;
                    case 1:
                        l = l.slice(1, l.length - 1);
                        l = l.replace(/""/g, '"');
                        if (g && l && l.match(/^=".*"$/)) l = l.slice(2, -1);
                        s[a][n++] = l !== "" ? l : null;
                        break;
                }
                if (l === "EOD") break
            }
            if (r && r.sheetRows) s = s.slice(0, r.sheetRows);
            return s
        }

        function t(r, t) {
            return Va(e(r, t), t)
        }

        function a(e, r) {
            return Ha(t(e, r), r)
        }
        var n = function () {
            var e = function t(e, r, a, n, i) {
                e.push(r);
                e.push(a + "," + n);
                e.push('"' + i.replace(/"/g, '""') + '"')
            };
            var r = function a(e, r, t, n) {
                e.push(r + "," + t);
                e.push(r == 1 ? '"' + n.replace(/"/g, '""') + '"' : n)
            };
            return function n(t) {
                var a = [];
                var n = Ua(t["!ref"]),
                    i;
                var s = Array.isArray(t);
                e(a, "TABLE", 0, 1, "sheetjs");
                e(a, "VECTORS", 0, n.e.r - n.s.r + 1, "");
                e(a, "TUPLES", 0, n.e.c - n.s.c + 1, "");
                e(a, "DATA", 0, 0, "");
                for (var f = n.s.r; f <= n.e.r; ++f) {
                    r(a, -1, 0, "BOT");
                    for (var o = n.s.c; o <= n.e.c; ++o) {
                        var c = Pa({
                            r: f,
                            c: o
                        });
                        i = s ? (t[f] || [])[o] : t[c];
                        if (!i) {
                            r(a, 1, 0, "");
                            continue
                        }
                        switch (i.t) {
                            case "n":
                                var l = g ? i.w : i.v;
                                if (!l && i.v != null) l = i.v;
                                if (l == null) {
                                    if (g && i.f && !i.F) r(a, 1, 0, "=" + i.f);
                                    else r(a, 1, 0, "")
                                } else r(a, 0, l, "V");
                                break;
                            case "b":
                                r(a, 0, i.v ? 1 : 0, i.v ? "TRUE" : "FALSE");
                                break;
                            case "s":
                                r(a, 1, 0, !g || isNaN(i.v) ? i.v : '="' + i.v + '"');
                                break;
                            case "d":
                                if (!i.w) i.w = We(i.z || Y[14], lr(wr(i.v)));
                                if (g) r(a, 0, i.w, "V");
                                else r(a, 1, 0, i.w);
                                break;
                            default:
                                r(a, 1, 0, "");
                        }
                    }
                }
                r(a, -1, 0, "EOD");
                var u = "\r\n";
                var h = a.join(u);
                return h
            }
        }();
        return {
            to_workbook: a,
            to_sheet: t,
            from_sheet: n
        }
    }();
    var Co = function () {
        function e(e) {
            return e.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n")
        }

        function r(e) {
            return e.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
        }

        function t(r, t) {
            var a = r.split("\n"),
                n = -1,
                i = -1,
                s = 0,
                f = [];
            for (; s !== a.length; ++s) {
                var o = a[s].trim().split(":");
                if (o[0] !== "cell") continue;
                var c = Da(o[1]);
                if (f.length <= c.r)
                    for (n = f.length; n <= c.r; ++n)
                        if (!f[n]) f[n] = [];
                n = c.r;
                i = c.c;
                switch (o[2]) {
                    case "t":
                        f[n][i] = e(o[3]);
                        break;
                    case "v":
                        f[n][i] = +o[3];
                        break;
                    case "vtf":
                        var l = o[o.length - 1];
                    case "vtc":
                        switch (o[3]) {
                            case "nl":
                                f[n][i] = +o[4] ? true : false;
                                break;
                            default:
                                f[n][i] = +o[4];
                                break;
                        }
                        if (o[2] == "vtf") f[n][i] = [f[n][i], l];
                }
            }
            if (t && t.sheetRows) f = f.slice(0, t.sheetRows);
            return f
        }

        function a(e, r) {
            return Va(t(e, r), r)
        }

        function n(e, r) {
            return Ha(a(e, r), r)
        }
        var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n");
        var s = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n";
        var f = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n");
        var o = "--SocialCalcSpreadsheetControlSave--";

        function c(e) {
            if (!e || !e["!ref"]) return "";
            var t = [],
                a = [],
                n, i = "";
            var s = La(e["!ref"]);
            var f = Array.isArray(e);
            for (var o = s.s.r; o <= s.e.r; ++o) {
                for (var c = s.s.c; c <= s.e.c; ++c) {
                    i = Pa({
                        r: o,
                        c: c
                    });
                    n = f ? (e[o] || [])[c] : e[i];
                    if (!n || n.v == null || n.t === "z") continue;
                    a = ["cell", i, "t"];
                    switch (n.t) {
                        case "s":
                            ;
                        case "str":
                            a.push(r(n.v));
                            break;
                        case "n":
                            if (!n.f) {
                                a[2] = "v";
                                a[3] = n.v
                            } else {
                                a[2] = "vtf";
                                a[3] = "n";
                                a[4] = n.v;
                                a[5] = r(n.f)
                            }
                            break;
                        case "b":
                            a[2] = "vt" + (n.f ? "f" : "c");
                            a[3] = "nl";
                            a[4] = n.v ? "1" : "0";
                            a[5] = r(n.f || (n.v ? "TRUE" : "FALSE"));
                            break;
                        case "d":
                            var l = lr(wr(n.v));
                            a[2] = "vtc";
                            a[3] = "nd";
                            a[4] = "" + l;
                            a[5] = n.w || We(n.z || Y[14], l);
                            break;
                        case "e":
                            continue;
                    }
                    t.push(a.join(":"))
                }
            }
            t.push("sheet:c:" + (s.e.c - s.s.c + 1) + ":r:" + (s.e.r - s.s.r + 1) + ":tvf:1");
            t.push("valueformat:1:text-wiki");
            return t.join("\n")
        }

        function l(e) {
            return [i, s, f, s, c(e), o].join("\n")
        }
        return {
            to_workbook: n,
            to_sheet: a,
            from_sheet: l
        }
    }();
    var Ro = function () {
        function e(e, r, t, a, n) {
            if (n.raw) r[t][a] = e;
            else if (e === "") {} else if (e === "TRUE") r[t][a] = true;
            else if (e === "FALSE") r[t][a] = false;
            else if (!isNaN(yr(e))) r[t][a] = yr(e);
            else if (!isNaN(xr(e).getDate())) r[t][a] = wr(e);
            else r[t][a] = e
        }

        function r(r, t) {
            var a = t || {};
            var n = [];
            if (!r || r.length === 0) return n;
            var i = r.split(/[\r\n]/);
            var s = i.length - 1;
            while (s >= 0 && i[s].length === 0) --s;
            var f = 10,
                o = 0;
            var c = 0;
            for (; c <= s; ++c) {
                o = i[c].indexOf(" ");
                if (o == -1) o = i[c].length;
                else o++;
                f = Math.max(f, o)
            }
            for (c = 0; c <= s; ++c) {
                n[c] = [];
                var l = 0;
                e(i[c].slice(0, f).trim(), n, c, l, a);
                for (l = 1; l <= (i[c].length - f) / 10 + 1; ++l) e(i[c].slice(f + (l - 1) * 10, f + l * 10).trim(), n, c, l, a)
            }
            if (a.sheetRows) n = n.slice(0, a.sheetRows);
            return n
        }
        var t = {
            44: ",",
            9: "\t",
            59: ";",
            124: "|"
        };
        var n = {
            44: 3,
            9: 2,
            59: 1,
            124: 0
        };

        function i(e) {
            var r = {},
                a = false,
                i = 0,
                s = 0;
            for (; i < e.length; ++i) {
                if ((s = e.charCodeAt(i)) == 34) a = !a;
                else if (!a && s in t) r[s] = (r[s] || 0) + 1
            }
            s = [];
            for (i in r)
                if (Object.prototype.hasOwnProperty.call(r, i)) {
                    s.push([r[i], i])
                } if (!s.length) {
                r = n;
                for (i in r)
                    if (Object.prototype.hasOwnProperty.call(r, i)) {
                        s.push([r[i], i])
                    }
            }
            s.sort(function (e, r) {
                return e[0] - r[0] || n[e[1]] - n[r[1]]
            });
            return t[s.pop()[1]] || 44
        }

        function s(e, r) {
            var t = r || {};
            var a = "";
            if (b != null && t.dense == null) t.dense = b;
            var n = t.dense ? [] : {};
            var s = {
                s: {
                    c: 0,
                    r: 0
                },
                e: {
                    c: 0,
                    r: 0
                }
            };
            if (e.slice(0, 4) == "sep=") {
                if (e.charCodeAt(5) == 13 && e.charCodeAt(6) == 10) {
                    a = e.charAt(4);
                    e = e.slice(7)
                } else if (e.charCodeAt(5) == 13 || e.charCodeAt(5) == 10) {
                    a = e.charAt(4);
                    e = e.slice(6)
                } else a = i(e.slice(0, 1024))
            } else if (t && t.FS) a = t.FS;
            else a = i(e.slice(0, 1024));
            var f = 0,
                o = 0,
                c = 0;
            var l = 0,
                u = 0,
                h = a.charCodeAt(0),
                d = false,
                v = 0,
                p = e.charCodeAt(0);
            var m = t.dateNF != null ? $e(t.dateNF) : null;

            function g() {
                var r = e.slice(l, u);
                if (r.slice(-1) == "\r") r = r.slice(0, -1);
                var a = {};
                if (r.charAt(0) == '"' && r.charAt(r.length - 1) == '"') r = r.slice(1, -1).replace(/""/g, '"');
                if (r.length === 0) a.t = "z";
                else if (t.raw) {
                    a.t = "s";
                    a.v = r
                } else if (r.trim().length === 0) {
                    a.t = "s";
                    a.v = r
                } else if (r.charCodeAt(0) == 61) {
                    if (r.charCodeAt(1) == 34 && r.charCodeAt(r.length - 1) == 34) {
                        a.t = "s";
                        a.v = r.slice(2, -1).replace(/""/g, '"')
                    } else if (Du(r)) {
                        a.t = "n";
                        a.f = r.slice(1)
                    } else {
                        a.t = "s";
                        a.v = r
                    }
                } else if (r == "TRUE") {
                    a.t = "b";
                    a.v = true
                } else if (r == "FALSE") {
                    a.t = "b";
                    a.v = false
                } else if (!isNaN(c = yr(r))) {
                    a.t = "n";
                    if (t.cellText !== false) a.w = r;
                    a.v = c
                } else if (!isNaN(xr(r).getDate()) || m && r.match(m)) {
                    a.z = t.dateNF || Y[14];
                    var i = 0;
                    if (m && r.match(m)) {
                        r = Ye(r, t.dateNF, r.match(m) || []);
                        i = 1
                    }
                    if (t.cellDates) {
                        a.t = "d";
                        a.v = wr(r, i)
                    } else {
                        a.t = "n";
                        a.v = lr(wr(r, i))
                    }
                    if (t.cellText !== false) a.w = We(a.z, a.v instanceof Date ? lr(a.v) : a.v);
                    if (!t.cellNF) delete a.z
                } else {
                    a.t = "s";
                    a.v = r
                }
                if (a.t == "z") {} else if (t.dense) {
                    if (!n[f]) n[f] = [];
                    n[f][o] = a
                } else n[Pa({
                    c: o,
                    r: f
                })] = a;
                l = u + 1;
                p = e.charCodeAt(l);
                if (s.e.c < o) s.e.c = o;
                if (s.e.r < f) s.e.r = f;
                if (v == h) ++o;
                else {
                    o = 0;
                    ++f;
                    if (t.sheetRows && t.sheetRows <= f) return true
                }
            }
            e: for (; u < e.length; ++u) switch (v = e.charCodeAt(u)) {
                case 34:
                    if (p === 34) d = !d;
                    break;
                case 13:
                    if (d) break;
                    if (e.charCodeAt(u + 1) == 10) ++u;
                case h:
                    ;
                case 10:
                    if (!d && g()) break e;
                    break;
                default:
                    break;
            }
            if (u - l > 0) g();
            n["!ref"] = Ma(s);
            return n
        }

        function f(e, t) {
            if (!(t && t.PRN)) return s(e, t);
            if (t.FS) return s(e, t);
            if (e.slice(0, 4) == "sep=") return s(e, t);
            if (e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0) return s(e, t);
            return Va(r(e, t), t)
        }

        function o(e, r) {
            var t = "",
                n = r.type == "string" ? [0, 0, 0, 0] : jg(e, r);
            switch (r.type) {
                case "base64":
                    t = T(e);
                    break;
                case "binary":
                    t = e;
                    break;
                case "buffer":
                    if (r.codepage == 65001) t = e.toString("utf8");
                    else if (r.codepage && typeof a !== "undefined") t = a.utils.decode(r.codepage, e);
                    else t = E && Buffer.isBuffer(e) ? e.toString("binary") : C(e);
                    break;
                case "array":
                    t = kr(e);
                    break;
                case "string":
                    t = e;
                    break;
                default:
                    throw new Error("Unrecognized type " + r.type);
            }
            if (n[0] == 239 && n[1] == 187 && n[2] == 191) t = vt(t.slice(3));
            else if (r.type != "string" && r.type != "buffer" && r.codepage == 65001) t = vt(t);
            else if (r.type == "binary" && typeof a !== "undefined" && r.codepage) t = a.utils.decode(r.codepage, a.utils.encode(28591, t));
            if (t.slice(0, 19) == "socialcalc:version:") return Co.to_sheet(r.type == "string" ? t : vt(t), r);
            return f(t, r)
        }

        function c(e, r) {
            return Ha(o(e, r), r)
        }

        function l(e) {
            var r = [];
            var t = Ua(e["!ref"]),
                a;
            var n = Array.isArray(e);
            for (var i = t.s.r; i <= t.e.r; ++i) {
                var s = [];
                for (var f = t.s.c; f <= t.e.c; ++f) {
                    var o = Pa({
                        r: i,
                        c: f
                    });
                    a = n ? (e[i] || [])[f] : e[o];
                    if (!a || a.v == null) {
                        s.push("          ");
                        continue
                    }
                    var c = (a.w || (Wa(a), a.w) || "").slice(0, 10);
                    while (c.length < 10) c += " ";
                    s.push(c + (f === 0 ? " " : ""))
                }
                r.push(s.join(""))
            }
            return r.join("\n")
        }
        return {
            to_workbook: c,
            to_sheet: o,
            from_sheet: l
        }
    }();

    function Oo(e, r) {
        var t = r || {},
            a = !!t.WTF;
        t.WTF = true;
        try {
            var n = Ao.to_workbook(e, t);
            t.WTF = a;
            return n
        } catch (i) {
            t.WTF = a;
            if (!i.message.match(/SYLK bad record ID/) && a) throw i;
            return Ro.to_workbook(e, r)
        }
    }
    var Io = function () {
        function e(e, r, t) {
            if (!e) return;
            pa(e, e.l || 0);
            var a = t.Enum || H;
            while (e.l < e.length) {
                var n = e._R(2);
                var i = a[n] || a[65535];
                var s = e._R(2);
                var f = e.l + s;
                var o = i.f && i.f(e, s, t);
                e.l = f;
                if (r(o, i, n)) return
            }
        }

        function r(e, r) {
            switch (r.type) {
                case "base64":
                    return t(A(T(e)), r);
                case "binary":
                    return t(A(e), r);
                case "buffer":
                    ;
                case "array":
                    return t(e, r);
            }
            throw "Unsupported type " + r.type
        }

        function t(r, t) {
            if (!r) return r;
            var a = t || {};
            if (b != null && a.dense == null) a.dense = b;
            var n = a.dense ? [] : {},
                i = "Sheet1",
                s = "",
                f = 0;
            var o = {},
                c = [],
                l = [];
            var u = {
                s: {
                    r: 0,
                    c: 0
                },
                e: {
                    r: 0,
                    c: 0
                }
            };
            var h = a.sheetRows || 0;
            if (r[4] == 81 && r[5] == 80 && r[6] == 87) return V(r, t);
            if (r[2] == 0) {
                if (r[3] == 8 || r[3] == 9) {
                    if (r.length >= 16 && r[14] == 5 && r[15] === 108) throw new Error("Unsupported Works 3 for Mac file")
                }
            }
            if (r[2] == 2) {
                a.Enum = H;
                e(r, function (e, r, t) {
                    switch (t) {
                        case 0:
                            a.vers = e;
                            if (e >= 4096) a.qpro = true;
                            break;
                        case 255:
                            a.vers = e;
                            a.works = true;
                            break;
                        case 6:
                            u = e;
                            break;
                        case 204:
                            if (e) s = e;
                            break;
                        case 222:
                            s = e;
                            break;
                        case 15:
                            ;
                        case 51:
                            if ((!a.qpro && !a.works || t == 51) && e[1].v.charCodeAt(0) < 48) e[1].v = e[1].v.slice(1);
                            if (a.works || a.works2) e[1].v = e[1].v.replace(/\r\n/g, "\n");
                        case 13:
                            ;
                        case 14:
                            ;
                        case 16:
                            if (t == 14 && (e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15) {
                                e[1].z = a.dateNF || Y[14];
                                if (a.cellDates) {
                                    e[1].t = "d";
                                    e[1].v = vr(e[1].v)
                                }
                            }
                            if (a.qpro) {
                                if (e[3] > f) {
                                    n["!ref"] = Ma(u);
                                    o[i] = n;
                                    c.push(i);
                                    n = a.dense ? [] : {};
                                    u = {
                                        s: {
                                            r: 0,
                                            c: 0
                                        },
                                        e: {
                                            r: 0,
                                            c: 0
                                        }
                                    };
                                    f = e[3];
                                    i = s || "Sheet" + (f + 1);
                                    s = ""
                                }
                            }
                            var l = a.dense ? (n[e[0].r] || [])[e[0].c] : n[Pa(e[0])];
                            if (l) {
                                l.t = e[1].t;
                                l.v = e[1].v;
                                if (e[1].z != null) l.z = e[1].z;
                                if (e[1].f != null) l.f = e[1].f;
                                break
                            }
                            if (a.dense) {
                                if (!n[e[0].r]) n[e[0].r] = [];
                                n[e[0].r][e[0].c] = e[1]
                            } else n[Pa(e[0])] = e[1];
                            break;
                        case 21509:
                            a.works2 = true;
                            break;
                        default:
                            ;
                    }
                }, a)
            } else if (r[2] == 26 || r[2] == 14) {
                a.Enum = z;
                if (r[2] == 14) {
                    a.qpro = true;
                    r.l = 0
                }
                e(r, function (e, r, t) {
                    switch (t) {
                        case 204:
                            i = e;
                            break;
                        case 22:
                            if (e[1].v.charCodeAt(0) < 48) e[1].v = e[1].v.slice(1);
                            e[1].v = e[1].v.replace(/\x0F./g, function (e) {
                                return String.fromCharCode(e.charCodeAt(1) - 32)
                            }).replace(/\r\n/g, "\n");
                        case 23:
                            ;
                        case 24:
                            ;
                        case 25:
                            ;
                        case 37:
                            ;
                        case 39:
                            ;
                        case 40:
                            if (e[3] > f) {
                                n["!ref"] = Ma(u);
                                o[i] = n;
                                c.push(i);
                                n = a.dense ? [] : {};
                                u = {
                                    s: {
                                        r: 0,
                                        c: 0
                                    },
                                    e: {
                                        r: 0,
                                        c: 0
                                    }
                                };
                                f = e[3];
                                i = "Sheet" + (f + 1)
                            }
                            if (h > 0 && e[0].r >= h) break;
                            if (a.dense) {
                                if (!n[e[0].r]) n[e[0].r] = [];
                                n[e[0].r][e[0].c] = e[1]
                            } else n[Pa(e[0])] = e[1];
                            if (u.e.c < e[0].c) u.e.c = e[0].c;
                            if (u.e.r < e[0].r) u.e.r = e[0].r;
                            break;
                        case 27:
                            if (e[14e3]) l[e[14e3][0]] = e[14e3][1];
                            break;
                        case 1537:
                            l[e[0]] = e[1];
                            if (e[0] == f) i = e[1];
                            break;
                        default:
                            break;
                    }
                }, a)
            } else throw new Error("Unrecognized LOTUS BOF " + r[2]);
            n["!ref"] = Ma(u);
            o[s || i] = n;
            c.push(s || i);
            if (!l.length) return {
                SheetNames: c,
                Sheets: o
            };
            var d = {},
                v = [];
            for (var p = 0; p < l.length; ++p)
                if (o[c[p]]) {
                    v.push(l[p] || c[p]);
                    d[l[p]] = o[l[p]] || o[c[p]]
                } else {
                    v.push(l[p]);
                    d[l[p]] = {
                        "!ref": "A1"
                    }
                } return {
                SheetNames: v,
                Sheets: d
            }
        }

        function a(e, r) {
            var t = r || {};
            if (+t.codepage >= 0) o(+t.codepage);
            if (t.type == "string") throw new Error("Cannot write WK1 to JS string");
            var a = wa();
            var n = Ua(e["!ref"]);
            var s = Array.isArray(e);
            var f = [];
            ub(a, 0, i(1030));
            ub(a, 6, c(n));
            var l = Math.min(n.e.r, 8191);
            for (var u = n.s.r; u <= l; ++u) {
                var d = Aa(u);
                for (var v = n.s.c; v <= n.e.c; ++v) {
                    if (u === n.s.r) f[v] = Oa(v);
                    var m = f[v] + d;
                    var b = s ? (e[u] || [])[v] : e[m];
                    if (!b || b.t == "z") continue;
                    if (b.t == "n") {
                        if ((b.v | 0) == b.v && b.v >= -32768 && b.v <= 32767) ub(a, 13, p(u, v, b.v));
                        else ub(a, 14, g(u, v, b.v))
                    } else {
                        var w = Wa(b);
                        ub(a, 15, h(u, v, w.slice(0, 239)))
                    }
                }
            }
            ub(a, 1);
            return a.end()
        }

        function n(e, r) {
            var t = r || {};
            if (+t.codepage >= 0) o(+t.codepage);
            if (t.type == "string") throw new Error("Cannot write WK3 to JS string");
            var a = wa();
            ub(a, 0, s(e));
            for (var n = 0, i = 0; n < e.SheetNames.length; ++n)
                if ((e.Sheets[e.SheetNames[n]] || {})["!ref"]) ub(a, 27, W(e.SheetNames[n], i++));
            var f = 0;
            for (n = 0; n < e.SheetNames.length; ++n) {
                var c = e.Sheets[e.SheetNames[n]];
                if (!c || !c["!ref"]) continue;
                var l = Ua(c["!ref"]);
                var u = Array.isArray(c);
                var h = [];
                var d = Math.min(l.e.r, 8191);
                for (var v = l.s.r; v <= d; ++v) {
                    var p = Aa(v);
                    for (var m = l.s.c; m <= l.e.c; ++m) {
                        if (v === l.s.r) h[m] = Oa(m);
                        var b = h[m] + p;
                        var g = u ? (c[v] || [])[m] : c[b];
                        if (!g || g.t == "z") continue;
                        if (g.t == "n") {
                            ub(a, 23, I(v, m, f, g.v))
                        } else {
                            var w = Wa(g);
                            ub(a, 22, C(v, m, f, w.slice(0, 239)))
                        }
                    }
                }++f
            }
            ub(a, 1);
            return a.end()
        }

        function i(e) {
            var r = ba(2);
            r._W(2, e);
            return r
        }

        function s(e) {
            var r = ba(26);
            r._W(2, 4096);
            r._W(2, 4);
            r._W(4, 0);
            var t = 0,
                a = 0,
                n = 0;
            for (var i = 0; i < e.SheetNames.length; ++i) {
                var s = e.SheetNames[i];
                var f = e.Sheets[s];
                if (!f || !f["!ref"]) continue;
                ++n;
                var o = La(f["!ref"]);
                if (t < o.e.r) t = o.e.r;
                if (a < o.e.c) a = o.e.c
            }
            if (t > 8191) t = 8191;
            r._W(2, t);
            r._W(1, n);
            r._W(1, a);
            r._W(2, 0);
            r._W(2, 0);
            r._W(1, 1);
            r._W(1, 2);
            r._W(4, 0);
            r._W(4, 0);
            return r
        }

        function f(e, r, t) {
            var a = {
                s: {
                    c: 0,
                    r: 0
                },
                e: {
                    c: 0,
                    r: 0
                }
            };
            if (r == 8 && t.qpro) {
                a.s.c = e._R(1);
                e.l++;
                a.s.r = e._R(2);
                a.e.c = e._R(1);
                e.l++;
                a.e.r = e._R(2);
                return a
            }
            a.s.c = e._R(2);
            a.s.r = e._R(2);
            if (r == 12 && t.qpro) e.l += 2;
            a.e.c = e._R(2);
            a.e.r = e._R(2);
            if (r == 12 && t.qpro) e.l += 2;
            if (a.s.c == 65535) a.s.c = a.e.c = a.s.r = a.e.r = 0;
            return a
        }

        function c(e) {
            var r = ba(8);
            r._W(2, e.s.c);
            r._W(2, e.s.r);
            r._W(2, e.e.c);
            r._W(2, e.e.r);
            return r
        }

        function l(e, r, t) {
            var a = [{
                c: 0,
                r: 0
            }, {
                t: "n",
                v: 0
            }, 0, 0];
            if (t.qpro && t.vers != 20768) {
                a[0].c = e._R(1);
                a[3] = e._R(1);
                a[0].r = e._R(2);
                e.l += 2
            } else if (t.works) {
                a[0].c = e._R(2);
                a[0].r = e._R(2);
                a[2] = e._R(2)
            } else {
                a[2] = e._R(1);
                a[0].c = e._R(2);
                a[0].r = e._R(2)
            }
            return a
        }

        function u(e, r, t) {
            var a = e.l + r;
            var n = l(e, r, t);
            n[1].t = "s";
            if (t.vers == 20768) {
                e.l++;
                var i = e._R(1);
                n[1].v = e._R(i, "utf8");
                return n
            }
            if (t.qpro) e.l++;
            n[1].v = e._R(a - e.l, "cstr");
            return n
        }

        function h(e, r, t) {
            var a = ba(7 + t.length);
            a._W(1, 255);
            a._W(2, r);
            a._W(2, e);
            a._W(1, 39);
            for (var n = 0; n < a.length; ++n) {
                var i = t.charCodeAt(n);
                a._W(1, i >= 128 ? 95 : i)
            }
            a._W(1, 0);
            return a
        }

        function d(e, r, t) {
            var a = e.l + r;
            var n = l(e, r, t);
            n[1].t = "s";
            if (t.vers == 20768) {
                var i = e._R(1);
                n[1].v = e._R(i, "utf8");
                return n
            }
            n[1].v = e._R(a - e.l, "cstr");
            return n
        }

        function v(e, r, t) {
            var a = l(e, r, t);
            a[1].v = e._R(2, "i");
            return a
        }

        function p(e, r, t) {
            var a = ba(7);
            a._W(1, 255);
            a._W(2, r);
            a._W(2, e);
            a._W(2, t, "i");
            return a
        }

        function m(e, r, t) {
            var a = l(e, r, t);
            a[1].v = e._R(8, "f");
            return a
        }

        function g(e, r, t) {
            var a = ba(13);
            a._W(1, 255);
            a._W(2, r);
            a._W(2, e);
            a._W(8, t, "f");
            return a
        }

        function w(e, r, t) {
            var a = e.l + r;
            var n = l(e, r, t);
            n[1].v = e._R(8, "f");
            if (t.qpro) e.l = a;
            else {
                var i = e._R(2);
                S(e.slice(e.l, e.l + i), n);
                e.l += i
            }
            return n
        }

        function k(e, r, t) {
            var a = r & 32768;
            r &= ~32768;
            r = (a ? e : 0) + (r >= 8192 ? r - 16384 : r);
            return (a ? "" : "$") + (t ? Oa(r) : Aa(r))
        }
        var E = {
            31: ["NA", 0],
            33: ["ABS", 1],
            34: ["TRUNC", 1],
            35: ["SQRT", 1],
            36: ["LOG", 1],
            37: ["LN", 1],
            38: ["PI", 0],
            39: ["SIN", 1],
            40: ["COS", 1],
            41: ["TAN", 1],
            42: ["ATAN2", 2],
            43: ["ATAN", 1],
            44: ["ASIN", 1],
            45: ["ACOS", 1],
            46: ["EXP", 1],
            47: ["MOD", 2],
            49: ["ISNA", 1],
            50: ["ISERR", 1],
            51: ["FALSE", 0],
            52: ["TRUE", 0],
            53: ["RAND", 0],
            63: ["ROUND", 2],
            68: ["ISNUMBER", 1],
            69: ["ISTEXT", 1],
            70: ["LEN", 1],
            71: ["VALUE", 1],
            73: ["MID", 3],
            74: ["CHAR", 1],
            80: ["SUM", 69],
            81: ["AVERAGEA", 69],
            82: ["COUNTA", 69],
            83: ["MINA", 69],
            84: ["MAXA", 69],
            102: ["UPPER", 1],
            103: ["LOWER", 1],
            107: ["PROPER", 1],
            109: ["TRIM", 1],
            111: ["T", 1]
        };
        var y = ["", "", "", "", "", "", "", "", "", "+", "-", "*", "/", "^", "=", "<>", "<=", ">=", "<", ">", "", "", "", "", "&", "", "", "", "", "", "", ""];

        function S(e, r) {
            pa(e, 0);
            var t = [],
                a = 0,
                n = "",
                i = "",
                s = "",
                f = "";
            while (e.l < e.length) {
                var o = e[e.l++];
                switch (o) {
                    case 0:
                        t.push(e._R(8, "f"));
                        break;
                    case 1: {
                        i = k(r[0].c, e._R(2), true);
                        n = k(r[0].r, e._R(2), false);
                        t.push(i + n)
                    }
                    break;
                case 2: {
                    var c = k(r[0].c, e._R(2), true);
                    var l = k(r[0].r, e._R(2), false);
                    i = k(r[0].c, e._R(2), true);
                    n = k(r[0].r, e._R(2), false);
                    t.push(c + l + ":" + i + n)
                }
                break;
                case 3:
                    if (e.l < e.length) {
                        console.error("WK1 premature formula end");
                        return
                    }
                    break;
                case 4:
                    t.push("(" + t.pop() + ")");
                    break;
                case 5:
                    t.push(e._R(2));
                    break;
                case 6: {
                    var u = "";
                    while (o = e[e.l++]) u += String.fromCharCode(o);
                    t.push('"' + u.replace(/"/g, '""') + '"')
                }
                break;
                case 8:
                    t.push("-" + t.pop());
                    break;
                case 23:
                    t.push("+" + t.pop());
                    break;
                case 22:
                    t.push("NOT(" + t.pop() + ")");
                    break;
                case 20:
                    ;
                case 21: {
                    f = t.pop();
                    s = t.pop();
                    t.push(["AND", "OR"][o - 20] + "(" + s + "," + f + ")")
                }
                break;
                default:
                    if (o < 32 && y[o]) {
                        f = t.pop();
                        s = t.pop();
                        t.push(s + y[o] + f)
                    } else if (E[o]) {
                        a = E[o][1];
                        if (a == 69) a = e[e.l++];
                        if (a > t.length) {
                            console.error("WK1 bad formula parse 0x" + o.toString(16) + ":|" + t.join("|") + "|");
                            return
                        }
                        var h = t.slice(-a);
                        t.length -= a;
                        t.push(E[o][0] + "(" + h.join(",") + ")")
                    } else if (o <= 7) return console.error("WK1 invalid opcode " + o.toString(16));
                    else if (o <= 24) return console.error("WK1 unsupported op " + o.toString(16));
                    else if (o <= 30) return console.error("WK1 invalid opcode " + o.toString(16));
                    else if (o <= 115) return console.error("WK1 unsupported function opcode " + o.toString(16));
                    else return console.error("WK1 unrecognized opcode " + o.toString(16));
                }
            }
            if (t.length == 1) r[1].f = "" + t[0];
            else console.error("WK1 bad formula parse |" + t.join("|") + "|")
        }

        function _(e) {
            var r = [{
                c: 0,
                r: 0
            }, {
                t: "n",
                v: 0
            }, 0];
            r[0].r = e._R(2);
            r[3] = e[e.l++];
            r[0].c = e[e.l++];
            return r
        }

        function x(e, r) {
            var t = _(e, r);
            t[1].t = "s";
            t[1].v = e._R(r - 4, "cstr");
            return t
        }

        function C(e, r, t, a) {
            var n = ba(6 + a.length);
            n._W(2, e);
            n._W(1, t);
            n._W(1, r);
            n._W(1, 39);
            for (var i = 0; i < a.length; ++i) {
                var s = a.charCodeAt(i);
                n._W(1, s >= 128 ? 95 : s)
            }
            n._W(1, 0);
            return n
        }

        function R(e, r) {
            var t = _(e, r);
            t[1].v = e._R(2);
            var a = t[1].v >> 1;
            if (t[1].v & 1) {
                switch (a & 7) {
                    case 0:
                        a = (a >> 3) * 5e3;
                        break;
                    case 1:
                        a = (a >> 3) * 500;
                        break;
                    case 2:
                        a = (a >> 3) / 20;
                        break;
                    case 3:
                        a = (a >> 3) / 200;
                        break;
                    case 4:
                        a = (a >> 3) / 2e3;
                        break;
                    case 5:
                        a = (a >> 3) / 2e4;
                        break;
                    case 6:
                        a = (a >> 3) / 16;
                        break;
                    case 7:
                        a = (a >> 3) / 64;
                        break;
                }
            }
            t[1].v = a;
            return t
        }

        function O(e, r) {
            var t = _(e, r);
            var a = e._R(4);
            var n = e._R(4);
            var i = e._R(2);
            if (i == 65535) {
                if (a === 0 && n === 3221225472) {
                    t[1].t = "e";
                    t[1].v = 15
                } else if (a === 0 && n === 3489660928) {
                    t[1].t = "e";
                    t[1].v = 42
                } else t[1].v = 0;
                return t
            }
            var s = i & 32768;
            i = (i & 32767) - 16446;
            t[1].v = (1 - s * 2) * (n * Math.pow(2, i + 32) + a * Math.pow(2, i));
            return t
        }

        function I(e, r, t, a) {
            var n = ba(14);
            n._W(2, e);
            n._W(1, t);
            n._W(1, r);
            if (a == 0) {
                n._W(4, 0);
                n._W(4, 0);
                n._W(2, 65535);
                return n
            }
            var i = 0,
                s = 0,
                f = 0,
                o = 0;
            if (a < 0) {
                i = 1;
                a = -a
            }
            s = Math.log2(a) | 0;
            a /= Math.pow(2, s - 31);
            o = a >>> 0;
            if ((o & 2147483648) == 0) {
                a /= 2;
                ++s;
                o = a >>> 0
            }
            a -= o;
            o |= 2147483648;
            o >>>= 0;
            a *= Math.pow(2, 32);
            f = a >>> 0;
            n._W(4, f);
            n._W(4, o);
            s += 16383 + (i ? 32768 : 0);
            n._W(2, s);
            return n
        }

        function N(e, r) {
            var t = O(e, 14);
            e.l += r - 14;
            return t
        }

        function F(e, r) {
            var t = _(e, r);
            var a = e._R(4);
            t[1].v = a >> 6;
            return t
        }

        function D(e, r) {
            var t = _(e, r);
            var a = e._R(8, "f");
            t[1].v = a;
            return t
        }

        function P(e, r) {
            var t = D(e, 12);
            e.l += r - 12;
            return t
        }

        function L(e, r) {
            return e[e.l + r - 1] == 0 ? e._R(r, "cstr") : ""
        }

        function M(e, r) {
            var t = e[e.l++];
            if (t > r - 1) t = r - 1;
            var a = "";
            while (a.length < t) a += String.fromCharCode(e[e.l++]);
            return a
        }

        function U(e, r, t) {
            if (!t.qpro || r < 21) return;
            var a = e._R(1);
            e.l += 17;
            e.l += 1;
            e.l += 2;
            var n = e._R(r - 21, "cstr");
            return [a, n]
        }

        function B(e, r) {
            var t = {},
                a = e.l + r;
            while (e.l < a) {
                var n = e._R(2);
                if (n == 14e3) {
                    t[n] = [0, ""];
                    t[n][0] = e._R(2);
                    while (e[e.l]) {
                        t[n][1] += String.fromCharCode(e[e.l]);
                        e.l++
                    }
                    e.l++
                }
            }
            return t
        }

        function W(e, r) {
            var t = ba(5 + e.length);
            t._W(2, 14e3);
            t._W(2, r);
            for (var a = 0; a < e.length; ++a) {
                var n = e.charCodeAt(a);
                t[t.l++] = n > 127 ? 95 : n
            }
            t[t.l++] = 0;
            return t
        }
        var H = {
            0: {
                n: "BOF",
                f: as
            },
            1: {
                n: "EOF"
            },
            2: {
                n: "CALCMODE"
            },
            3: {
                n: "CALCORDER"
            },
            4: {
                n: "SPLIT"
            },
            5: {
                n: "SYNC"
            },
            6: {
                n: "RANGE",
                f: f
            },
            7: {
                n: "WINDOW1"
            },
            8: {
                n: "COLW1"
            },
            9: {
                n: "WINTWO"
            },
            10: {
                n: "COLW2"
            },
            11: {
                n: "NAME"
            },
            12: {
                n: "BLANK"
            },
            13: {
                n: "INTEGER",
                f: v
            },
            14: {
                n: "NUMBER",
                f: m
            },
            15: {
                n: "LABEL",
                f: u
            },
            16: {
                n: "FORMULA",
                f: w
            },
            24: {
                n: "TABLE"
            },
            25: {
                n: "ORANGE"
            },
            26: {
                n: "PRANGE"
            },
            27: {
                n: "SRANGE"
            },
            28: {
                n: "FRANGE"
            },
            29: {
                n: "KRANGE1"
            },
            32: {
                n: "HRANGE"
            },
            35: {
                n: "KRANGE2"
            },
            36: {
                n: "PROTEC"
            },
            37: {
                n: "FOOTER"
            },
            38: {
                n: "HEADER"
            },
            39: {
                n: "SETUP"
            },
            40: {
                n: "MARGINS"
            },
            41: {
                n: "LABELFMT"
            },
            42: {
                n: "TITLES"
            },
            43: {
                n: "SHEETJS"
            },
            45: {
                n: "GRAPH"
            },
            46: {
                n: "NGRAPH"
            },
            47: {
                n: "CALCCOUNT"
            },
            48: {
                n: "UNFORMATTED"
            },
            49: {
                n: "CURSORW12"
            },
            50: {
                n: "WINDOW"
            },
            51: {
                n: "STRING",
                f: d
            },
            55: {
                n: "PASSWORD"
            },
            56: {
                n: "LOCKED"
            },
            60: {
                n: "QUERY"
            },
            61: {
                n: "QUERYNAME"
            },
            62: {
                n: "PRINT"
            },
            63: {
                n: "PRINTNAME"
            },
            64: {
                n: "GRAPH2"
            },
            65: {
                n: "GRAPHNAME"
            },
            66: {
                n: "ZOOM"
            },
            67: {
                n: "SYMSPLIT"
            },
            68: {
                n: "NSROWS"
            },
            69: {
                n: "NSCOLS"
            },
            70: {
                n: "RULER"
            },
            71: {
                n: "NNAME"
            },
            72: {
                n: "ACOMM"
            },
            73: {
                n: "AMACRO"
            },
            74: {
                n: "PARSE"
            },
            102: {
                n: "PRANGES??"
            },
            103: {
                n: "RRANGES??"
            },
            104: {
                n: "FNAME??"
            },
            105: {
                n: "MRANGES??"
            },
            204: {
                n: "SHEETNAMECS",
                f: L
            },
            222: {
                n: "SHEETNAMELP",
                f: M
            },
            255: {
                n: "BOF",
                f: as
            },
            65535: {
                n: ""
            }
        };
        var z = {
            0: {
                n: "BOF"
            },
            1: {
                n: "EOF"
            },
            2: {
                n: "PASSWORD"
            },
            3: {
                n: "CALCSET"
            },
            4: {
                n: "WINDOWSET"
            },
            5: {
                n: "SHEETCELLPTR"
            },
            6: {
                n: "SHEETLAYOUT"
            },
            7: {
                n: "COLUMNWIDTH"
            },
            8: {
                n: "HIDDENCOLUMN"
            },
            9: {
                n: "USERRANGE"
            },
            10: {
                n: "SYSTEMRANGE"
            },
            11: {
                n: "ZEROFORCE"
            },
            12: {
                n: "SORTKEYDIR"
            },
            13: {
                n: "FILESEAL"
            },
            14: {
                n: "DATAFILLNUMS"
            },
            15: {
                n: "PRINTMAIN"
            },
            16: {
                n: "PRINTSTRING"
            },
            17: {
                n: "GRAPHMAIN"
            },
            18: {
                n: "GRAPHSTRING"
            },
            19: {
                n: "??"
            },
            20: {
                n: "ERRCELL"
            },
            21: {
                n: "NACELL"
            },
            22: {
                n: "LABEL16",
                f: x
            },
            23: {
                n: "NUMBER17",
                f: O
            },
            24: {
                n: "NUMBER18",
                f: R
            },
            25: {
                n: "FORMULA19",
                f: N
            },
            26: {
                n: "FORMULA1A"
            },
            27: {
                n: "XFORMAT",
                f: B
            },
            28: {
                n: "DTLABELMISC"
            },
            29: {
                n: "DTLABELCELL"
            },
            30: {
                n: "GRAPHWINDOW"
            },
            31: {
                n: "CPA"
            },
            32: {
                n: "LPLAUTO"
            },
            33: {
                n: "QUERY"
            },
            34: {
                n: "HIDDENSHEET"
            },
            35: {
                n: "??"
            },
            37: {
                n: "NUMBER25",
                f: F
            },
            38: {
                n: "??"
            },
            39: {
                n: "NUMBER27",
                f: D
            },
            40: {
                n: "FORMULA28",
                f: P
            },
            142: {
                n: "??"
            },
            147: {
                n: "??"
            },
            150: {
                n: "??"
            },
            151: {
                n: "??"
            },
            152: {
                n: "??"
            },
            153: {
                n: "??"
            },
            154: {
                n: "??"
            },
            155: {
                n: "??"
            },
            156: {
                n: "??"
            },
            163: {
                n: "??"
            },
            174: {
                n: "??"
            },
            175: {
                n: "??"
            },
            176: {
                n: "??"
            },
            177: {
                n: "??"
            },
            184: {
                n: "??"
            },
            185: {
                n: "??"
            },
            186: {
                n: "??"
            },
            187: {
                n: "??"
            },
            188: {
                n: "??"
            },
            195: {
                n: "??"
            },
            201: {
                n: "??"
            },
            204: {
                n: "SHEETNAMECS",
                f: L
            },
            205: {
                n: "??"
            },
            206: {
                n: "??"
            },
            207: {
                n: "??"
            },
            208: {
                n: "??"
            },
            256: {
                n: "??"
            },
            259: {
                n: "??"
            },
            260: {
                n: "??"
            },
            261: {
                n: "??"
            },
            262: {
                n: "??"
            },
            263: {
                n: "??"
            },
            265: {
                n: "??"
            },
            266: {
                n: "??"
            },
            267: {
                n: "??"
            },
            268: {
                n: "??"
            },
            270: {
                n: "??"
            },
            271: {
                n: "??"
            },
            384: {
                n: "??"
            },
            389: {
                n: "??"
            },
            390: {
                n: "??"
            },
            393: {
                n: "??"
            },
            396: {
                n: "??"
            },
            512: {
                n: "??"
            },
            514: {
                n: "??"
            },
            513: {
                n: "??"
            },
            516: {
                n: "??"
            },
            517: {
                n: "??"
            },
            640: {
                n: "??"
            },
            641: {
                n: "??"
            },
            642: {
                n: "??"
            },
            643: {
                n: "??"
            },
            644: {
                n: "??"
            },
            645: {
                n: "??"
            },
            646: {
                n: "??"
            },
            647: {
                n: "??"
            },
            648: {
                n: "??"
            },
            658: {
                n: "??"
            },
            659: {
                n: "??"
            },
            660: {
                n: "??"
            },
            661: {
                n: "??"
            },
            662: {
                n: "??"
            },
            665: {
                n: "??"
            },
            666: {
                n: "??"
            },
            768: {
                n: "??"
            },
            772: {
                n: "??"
            },
            1537: {
                n: "SHEETINFOQP",
                f: U
            },
            1600: {
                n: "??"
            },
            1602: {
                n: "??"
            },
            1793: {
                n: "??"
            },
            1794: {
                n: "??"
            },
            1795: {
                n: "??"
            },
            1796: {
                n: "??"
            },
            1920: {
                n: "??"
            },
            2048: {
                n: "??"
            },
            2049: {
                n: "??"
            },
            2052: {
                n: "??"
            },
            2688: {
                n: "??"
            },
            10998: {
                n: "??"
            },
            12849: {
                n: "??"
            },
            28233: {
                n: "??"
            },
            28484: {
                n: "??"
            },
            65535: {
                n: ""
            }
        };

        function V(e, r) {
            pa(e, 0);
            var t = r || {};
            if (b != null && t.dense == null) t.dense = b;
            var a = t.dense ? [] : {};
            var n = [],
                i = "",
                s = [];
            var f = {
                s: {
                    r: -1,
                    c: -1
                },
                e: {
                    r: -1,
                    c: -1
                }
            };
            var o = 0,
                c = 0,
                l = 0,
                u = 0;
            var h = {
                SheetNames: [],
                Sheets: {}
            };
            e: while (e.l < e.length) {
                var d = e._R(2),
                    v = e._R(2);
                var p = e.slice(e.l, e.l + v);
                pa(p, 0);
                switch (d) {
                    case 1:
                        if (p._R(4) != 962023505) throw "Bad QPW9 BOF!";
                        break;
                    case 2:
                        break e;
                    case 1025:
                        break;
                    case 1026:
                        break;
                    case 1031: {
                        p.l += 12;
                        while (p.l < p.length) {
                            o = p._R(2);
                            c = p._R(1);
                            n.push(p._R(o, "cstr"))
                        }
                    }
                    break;
                case 1032: {}
                break;
                case 1537: {
                    var m = p._R(2);
                    a = t.dense ? [] : {};
                    f.s.c = p._R(2);
                    f.e.c = p._R(2);
                    f.s.r = p._R(4);
                    f.e.r = p._R(4);
                    p.l += 4;
                    if (p.l + 2 < p.length) {
                        o = p._R(2);
                        c = p._R(1);
                        i = o == 0 ? "" : p._R(o, "cstr")
                    }
                    if (!i) i = Oa(m)
                }
                break;
                case 1538: {
                    if (f.s.c > 255 || f.s.r > 999999) break;
                    if (f.e.c < f.s.c) f.e.c = f.s.c;
                    if (f.e.r < f.s.r) f.e.r = f.s.r;
                    a["!ref"] = Ma(f);
                    Cw(h, a, i)
                }
                break;
                case 2561: {
                    l = p._R(2);
                    if (f.e.c < l) f.e.c = l;
                    if (f.s.c > l) f.s.c = l;
                    u = p._R(4);
                    if (f.s.r > u) f.s.r = u;
                    u = p._R(4);
                    if (f.e.r < u) f.e.r = u
                }
                break;
                case 3073: {
                    u = p._R(4), o = p._R(4);
                    if (f.s.r > u) f.s.r = u;
                    if (f.e.r < u + o - 1) f.e.r = u + o - 1;
                    while (p.l < p.length) {
                        var g = {
                            t: "z"
                        };
                        var w = p._R(1);
                        if (w & 128) p.l += 2;
                        var k = w & 64 ? p._R(2) - 1 : 0;
                        switch (w & 31) {
                            case 1:
                                break;
                            case 2:
                                g = {
                                    t: "n",
                                    v: p._R(2)
                                };
                                break;
                            case 3:
                                g = {
                                    t: "n",
                                    v: p._R(2, "i")
                                };
                                break;
                            case 5:
                                g = {
                                    t: "n",
                                    v: p._R(8, "f")
                                };
                                break;
                            case 7:
                                g = {
                                    t: "s",
                                    v: n[c = p._R(4) - 1]
                                };
                                break;
                            case 8:
                                g = {
                                    t: "n",
                                    v: p._R(8, "f")
                                };
                                p.l += 2;
                                p.l += 4;
                                break;
                            default:
                                throw "Unrecognized QPW cell type " + (w & 31);
                        }
                        var T = 0;
                        if (w & 32) switch (w & 31) {
                            case 2:
                                T = p._R(2);
                                break;
                            case 3:
                                T = p._R(2, "i");
                                break;
                            case 7:
                                T = p._R(2);
                                break;
                            default:
                                throw "Unsupported delta for QPW cell type " + (w & 31);
                        }
                        if (!(!t.sheetStubs && g.t == "z")) {
                            if (Array.isArray(a)) {
                                if (!a[u]) a[u] = [];
                                a[u][l] = g
                            } else a[Pa({
                                r: u,
                                c: l
                            })] = g
                        }++u;
                        --o;
                        while (k-- > 0 && o >= 0) {
                            if (w & 32) switch (w & 31) {
                                case 2:
                                    g = {
                                        t: "n",
                                        v: g.v + T & 65535
                                    };
                                    break;
                                case 3:
                                    g = {
                                        t: "n",
                                        v: g.v + T & 65535
                                    };
                                    if (g.v > 32767) g.v -= 65536;
                                    break;
                                case 7:
                                    g = {
                                        t: "s",
                                        v: n[c = c + T >>> 0]
                                    };
                                    break;
                                default:
                                    throw "Cannot apply delta for QPW cell type " + (w & 31);
                            } else switch (w & 31) {
                                case 1:
                                    g = {
                                        t: "z"
                                    };
                                    break;
                                case 2:
                                    g = {
                                        t: "n",
                                        v: p._R(2)
                                    };
                                    break;
                                case 7:
                                    g = {
                                        t: "s",
                                        v: n[c = p._R(4) - 1]
                                    };
                                    break;
                                default:
                                    throw "Cannot apply repeat for QPW cell type " + (w & 31);
                            }
                            if (!(!t.sheetStubs && g.t == "z")) {
                                if (Array.isArray(a)) {
                                    if (!a[u]) a[u] = [];
                                    a[u][l] = g
                                } else a[Pa({
                                    r: u,
                                    c: l
                                })] = g
                            }++u;
                            --o
                        }
                    }
                }
                break;
                default:
                    break;
                }
                e.l += v
            }
            return h
        }
        return {
            sheet_to_wk1: a,
            book_to_wk3: n,
            to_workbook: r
        }
    }();

    function No(e) {
        var r = {},
            t = e.match(Xr),
            a = 0;
        var n = false;
        if (t)
            for (; a != t.length; ++a) {
                var s = Kr(t[a]);
                switch (s[0].replace(/\w*:/g, "")) {
                    case "<condense":
                        break;
                    case "<extend":
                        break;
                    case "<shadow":
                        if (!s.val) break;
                    case "<shadow>":
                        ;
                    case "<shadow/>":
                        r.shadow = 1;
                        break;
                    case "</shadow>":
                        break;
                    case "<charset":
                        if (s.val == "1") break;
                        r.cp = i[parseInt(s.val, 10)];
                        break;
                    case "<outline":
                        if (!s.val) break;
                    case "<outline>":
                        ;
                    case "<outline/>":
                        r.outline = 1;
                        break;
                    case "</outline>":
                        break;
                    case "<rFont":
                        r.name = s.val;
                        break;
                    case "<sz":
                        r.sz = s.val;
                        break;
                    case "<strike":
                        if (!s.val) break;
                    case "<strike>":
                        ;
                    case "<strike/>":
                        r.strike = 1;
                        break;
                    case "</strike>":
                        break;
                    case "<u":
                        if (!s.val) break;
                        switch (s.val) {
                            case "double":
                                r.uval = "double";
                                break;
                            case "singleAccounting":
                                r.uval = "single-accounting";
                                break;
                            case "doubleAccounting":
                                r.uval = "double-accounting";
                                break;
                        };
                    case "<u>":
                        ;
                    case "<u/>":
                        r.u = 1;
                        break;
                    case "</u>":
                        break;
                    case "<b":
                        if (s.val == "0") break;
                    case "<b>":
                        ;
                    case "<b/>":
                        r.b = 1;
                        break;
                    case "</b>":
                        break;
                    case "<i":
                        if (s.val == "0") break;
                    case "<i>":
                        ;
                    case "<i/>":
                        r.i = 1;
                        break;
                    case "</i>":
                        break;
                    case "<color":
                        if (s.rgb) r.color = s.rgb.slice(2, 8);
                        break;
                    case "<color>":
                        ;
                    case "<color/>":
                        ;
                    case "</color>":
                        break;
                    case "<family":
                        r.family = s.val;
                        break;
                    case "<family>":
                        ;
                    case "<family/>":
                        ;
                    case "</family>":
                        break;
                    case "<vertAlign":
                        r.valign = s.val;
                        break;
                    case "<vertAlign>":
                        ;
                    case "<vertAlign/>":
                        ;
                    case "</vertAlign>":
                        break;
                    case "<scheme":
                        break;
                    case "<scheme>":
                        ;
                    case "<scheme/>":
                        ;
                    case "</scheme>":
                        break;
                    case "<extLst":
                        ;
                    case "<extLst>":
                        ;
                    case "</extLst>":
                        break;
                    case "<ext":
                        n = true;
                        break;
                    case "</ext>":
                        n = false;
                        break;
                    default:
                        if (s[0].charCodeAt(1) !== 47 && !n) throw new Error("Unrecognized rich format " + s[0]);
                }
            }
        return r
    }
    var Fo = function () {
        var e = mt("t"),
            r = mt("rPr");

        function t(t) {
            var a = t.match(e);
            if (!a) return {
                t: "s",
                v: ""
            };
            var n = {
                t: "s",
                v: Qr(a[1])
            };
            var i = t.match(r);
            if (i) n.s = No(i[1]);
            return n
        }
        var a = /<(?:\w+:)?r>/g,
            n = /<\/(?:\w+:)?r>/;
        return function i(e) {
            return e.replace(a, "").split(n).map(t).filter(function (e) {
                return e.v
            })
        }
    }();
    var Do = function ik() {
        var e = /(\r\n|\n)/g;

        function r(e, r, t) {
            var a = [];
            if (e.u) a.push("text-decoration: underline;");
            if (e.uval) a.push("text-underline-style:" + e.uval + ";");
            if (e.sz) a.push("font-size:" + e.sz + "pt;");
            if (e.outline) a.push("text-effect: outline;");
            if (e.shadow) a.push("text-shadow: auto;");
            r.push('<span style="' + a.join("") + '">');
            if (e.b) {
                r.push("<b>");
                t.push("</b>")
            }
            if (e.i) {
                r.push("<i>");
                t.push("</i>")
            }
            if (e.strike) {
                r.push("<s>");
                t.push("</s>")
            }
            var n = e.valign || "";
            if (n == "superscript" || n == "super") n = "sup";
            else if (n == "subscript") n = "sub";
            if (n != "") {
                r.push("<" + n + ">");
                t.push("</" + n + ">")
            }
            t.push("</span>");
            return e
        }

        function t(t) {
            var a = [
                [], t.v, []
            ];
            if (!t.v) return "";
            if (t.s) r(t.s, a[0], a[2]);
            return a[0].join("") + a[1].replace(e, "<br/>") + a[2].join("")
        }
        return function a(e) {
            return e.map(t).join("")
        }
    }();
    var Po = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
        Lo = /<(?:\w+:)?r>/;
    var Mo = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

    function Uo(e, r) {
        var t = r ? r.cellHTML : true;
        var a = {};
        if (!e) return {
            t: ""
        };
        if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) {
            a.t = Qr(vt(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""), true);
            a.r = vt(e);
            if (t) a.h = it(a.t)
        } else if (e.match(Lo)) {
            a.r = vt(e);
            a.t = Qr(vt((e.replace(Mo, "").match(Po) || []).join("").replace(Xr, "")), true);
            if (t) a.h = Do(Fo(a.r))
        }
        return a
    }
    var Bo = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
    var Wo = /<(?:\w+:)?(?:si|sstItem)>/g;
    var Ho = /<\/(?:\w+:)?(?:si|sstItem)>/;

    function zo(e, r) {
        var t = [],
            a = "";
        if (!e) return t;
        var n = e.match(Bo);
        if (n) {
            a = n[2].replace(Wo, "").split(Ho);
            for (var i = 0; i != a.length; ++i) {
                var s = Uo(a[i].trim(), r);
                if (s != null) t[t.length] = s
            }
            n = Kr(n[1]);
            t.Count = n.count;
            t.Unique = n.uniqueCount
        }
        return t
    }
    var Vo = /^\s|\s$|[\t\n\r]/;

    function Go(e, r) {
        if (!r.bookSST) return "";
        var t = [zr];
        t[t.length] = _t("sst", null, {
            xmlns: It[0],
            count: e.Count,
            uniqueCount: e.Unique
        });
        for (var a = 0; a != e.length; ++a) {
            if (e[a] == null) continue;
            var n = e[a];
            var i = "<si>";
            if (n.r) i += n.r;
            else {
                i += "<t";
                if (!n.t) n.t = "";
                if (n.t.match(Vo)) i += ' xml:space="preserve"';
                i += ">" + tt(n.t) + "</t>"
            }
            i += "</si>";
            t[t.length] = i
        }
        if (t.length > 2) {
            t[t.length] = "</sst>";
            t[1] = t[1].replace("/>", ">")
        }
        return t.join("")
    }

    function jo(e) {
        return [e._R(4), e._R(4)]
    }

    function Xo(e, r) {
        var t = [];
        var a = false;
        ga(e, function n(e, i, s) {
            switch (s) {
                case 159:
                    t.Count = e[0];
                    t.Unique = e[1];
                    break;
                case 19:
                    t.push(e);
                    break;
                case 160:
                    return true;
                case 35:
                    a = true;
                    break;
                case 36:
                    a = false;
                    break;
                default:
                    if (i.T) {}
                    if (!a || r.WTF) throw new Error("Unexpected record 0x" + s.toString(16));
            }
        });
        return t
    }

    function $o(e, r) {
        if (!r) r = ba(8);
        r._W(4, e.Count);
        r._W(4, e.Unique);
        return r
    }
    var Yo = qa;

    function Ko(e) {
        var r = wa();
        ka(r, 159, $o(e));
        for (var t = 0; t < e.length; ++t) ka(r, 19, Yo(e[t]));
        ka(r, 160);
        return r.end()
    }

    function Jo(e) {
        if (typeof a !== "undefined") return a.utils.encode(t, e);
        var r = [],
            n = e.split("");
        for (var i = 0; i < n.length; ++i) r[i] = n[i].charCodeAt(0);
        return r
    }

    function qo(e, r) {
        var t = {};
        t.Major = e._R(2);
        t.Minor = e._R(2);
        if (r >= 4) e.l += r - 4;
        return t
    }

    function Zo(e) {
        var r = {};
        r.id = e._R(0, "lpp4");
        r.R = qo(e, 4);
        r.U = qo(e, 4);
        r.W = qo(e, 4);
        return r
    }

    function Qo(e) {
        var r = e._R(4);
        var t = e.l + r - 4;
        var a = {};
        var n = e._R(4);
        var i = [];
        while (n-- > 0) i.push({
            t: e._R(4),
            v: e._R(0, "lpp4")
        });
        a.name = e._R(0, "lpp4");
        a.comps = i;
        if (e.l != t) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + t);
        return a
    }

    function ec(e) {
        var r = [];
        e.l += 4;
        var t = e._R(4);
        while (t-- > 0) r.push(Qo(e));
        return r
    }

    function rc(e) {
        var r = [];
        e.l += 4;
        var t = e._R(4);
        while (t-- > 0) r.push(e._R(0, "lpp4"));
        return r
    }

    function tc(e) {
        var r = {};
        e._R(4);
        e.l += 4;
        r.id = e._R(0, "lpp4");
        r.name = e._R(0, "lpp4");
        r.R = qo(e, 4);
        r.U = qo(e, 4);
        r.W = qo(e, 4);
        return r
    }

    function ac(e) {
        var r = tc(e);
        r.ename = e._R(0, "8lpp4");
        r.blksz = e._R(4);
        r.cmode = e._R(4);
        if (e._R(4) != 4) throw new Error("Bad !Primary record");
        return r
    }

    function nc(e, r) {
        var t = e.l + r;
        var a = {};
        a.Flags = e._R(4) & 63;
        e.l += 4;
        a.AlgID = e._R(4);
        var n = false;
        switch (a.AlgID) {
            case 26126:
                ;
            case 26127:
                ;
            case 26128:
                n = a.Flags == 36;
                break;
            case 26625:
                n = a.Flags == 4;
                break;
            case 0:
                n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
                break;
            default:
                throw "Unrecognized encryption algorithm: " + a.AlgID;
        }
        if (!n) throw new Error("Encryption Flags/AlgID mismatch");
        a.AlgIDHash = e._R(4);
        a.KeySize = e._R(4);
        a.ProviderType = e._R(4);
        e.l += 8;
        a.CSPName = e._R(t - e.l >> 1, "utf16le");
        e.l = t;
        return a
    }

    function ic(e, r) {
        var t = {},
            a = e.l + r;
        e.l += 4;
        t.Salt = e.slice(e.l, e.l + 16);
        e.l += 16;
        t.Verifier = e.slice(e.l, e.l + 16);
        e.l += 16;
        e._R(4);
        t.VerifierHash = e.slice(e.l, a);
        e.l = a;
        return t
    }

    function sc(e) {
        var r = qo(e);
        switch (r.Minor) {
            case 2:
                return [r.Minor, fc(e, r)];
            case 3:
                return [r.Minor, oc(e, r)];
            case 4:
                return [r.Minor, cc(e, r)];
        }
        throw new Error("ECMA-376 Encrypted file unrecognized Version: " + r.Minor)
    }

    function fc(e) {
        var r = e._R(4);
        if ((r & 63) != 36) throw new Error("EncryptionInfo mismatch");
        var t = e._R(4);
        var a = nc(e, t);
        var n = ic(e, e.length - e.l);
        return {
            t: "Std",
            h: a,
            v: n
        }
    }

    function oc() {
        throw new Error("File is password-protected: ECMA-376 Extensible")
    }

    function cc(e) {
        var r = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
        e.l += 4;
        var t = e._R(e.length - e.l, "utf8");
        var a = {};
        t.replace(Xr, function n(e) {
            var t = Kr(e);
            switch (Jr(t[0])) {
                case "<?xml":
                    break;
                case "<encryption":
                    ;
                case "</encryption>":
                    break;
                case "<keyData":
                    r.forEach(function (e) {
                        a[e] = t[e]
                    });
                    break;
                case "<dataIntegrity":
                    a.encryptedHmacKey = t.encryptedHmacKey;
                    a.encryptedHmacValue = t.encryptedHmacValue;
                    break;
                case "<keyEncryptors>":
                    ;
                case "<keyEncryptors":
                    a.encs = [];
                    break;
                case "</keyEncryptors>":
                    break;
                case "<keyEncryptor":
                    a.uri = t.uri;
                    break;
                case "</keyEncryptor>":
                    break;
                case "<encryptedKey":
                    a.encs.push(t);
                    break;
                default:
                    throw t[0];
            }
        });
        return a
    }

    function lc(e, r) {
        var t = {};
        var a = t.EncryptionVersionInfo = qo(e, 4);
        r -= 4;
        if (a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
        if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
        t.Flags = e._R(4);
        r -= 4;
        var n = e._R(4);
        r -= 4;
        t.EncryptionHeader = nc(e, n);
        r -= n;
        t.EncryptionVerifier = ic(e, r);
        return t
    }

    function uc(e) {
        var r = {};
        var t = r.EncryptionVersionInfo = qo(e, 4);
        if (t.Major != 1 || t.Minor != 1) throw "unrecognized version code " + t.Major + " : " + t.Minor;
        r.Salt = e._R(16);
        r.EncryptedVerifier = e._R(16);
        r.EncryptedVerifierHash = e._R(16);
        return r
    }

    function hc(e) {
        var r = 0,
            t;
        var a = Jo(e);
        var n = a.length + 1,
            i, s;
        var f, o, c;
        t = S(n);
        t[0] = a.length;
        for (i = 1; i != n; ++i) t[i] = a[i - 1];
        for (i = n - 1; i >= 0; --i) {
            s = t[i];
            f = (r & 16384) === 0 ? 0 : 1;
            o = r << 1 & 32767;
            c = f | o;
            r = c ^ s
        }
        return r ^ 52811
    }
    var dc = function () {
        var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0];
        var r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163];
        var t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628];
        var a = function (e) {
            return (e / 2 | e * 128) & 255
        };
        var n = function (e, r) {
            return a(e ^ r)
        };
        var i = function (e) {
            var a = r[e.length - 1];
            var n = 104;
            for (var i = e.length - 1; i >= 0; --i) {
                var s = e[i];
                for (var f = 0; f != 7; ++f) {
                    if (s & 64) a ^= t[n];
                    s *= 2;
                    --n
                }
            }
            return a
        };
        return function (r) {
            var t = Jo(r);
            var a = i(t);
            var s = t.length;
            var f = S(16);
            for (var o = 0; o != 16; ++o) f[o] = 0;
            var c, l, u;
            if ((s & 1) === 1) {
                c = a >> 8;
                f[s] = n(e[0], c);
                --s;
                c = a & 255;
                l = t[t.length - 1];
                f[s] = n(l, c)
            }
            while (s > 0) {
                --s;
                c = a >> 8;
                f[s] = n(t[s], c);
                --s;
                c = a & 255;
                f[s] = n(t[s], c)
            }
            s = 15;
            u = 15 - t.length;
            while (u > 0) {
                c = a >> 8;
                f[s] = n(e[u], c);
                --s;
                --u;
                c = a & 255;
                f[s] = n(t[s], c);
                --s;
                --u
            }
            return f
        }
    }();
    var vc = function (e, r, t, a, n) {
        if (!n) n = r;
        if (!a) a = dc(e);
        var i, s;
        for (i = 0; i != r.length; ++i) {
            s = r[i];
            s ^= a[t];
            s = (s >> 5 | s << 3) & 255;
            n[i] = s;
            ++t
        }
        return [n, t, a]
    };
    var pc = function (e) {
        var r = 0,
            t = dc(e);
        return function (e) {
            var a = vc("", e, r, t);
            r = a[1];
            return a[0]
        }
    };

    function mc(e, r, t, a) {
        var n = {
            key: as(e),
            verificationBytes: as(e)
        };
        if (t.password) n.verifier = hc(t.password);
        a.valid = n.verificationBytes === n.verifier;
        if (a.valid) a.insitu = pc(t.password);
        return n
    }

    function bc(e, r, t) {
        var a = t || {};
        a.Info = e._R(2);
        e.l -= 2;
        if (a.Info === 1) a.Data = uc(e, r);
        else a.Data = lc(e, r);
        return a
    }

    function gc(e, r, t) {
        var a = {
            Type: t.biff >= 8 ? e._R(2) : 0
        };
        if (a.Type) bc(e, r - 2, a);
        else mc(e, t.biff >= 8 ? r : r - 2, t, a);
        return a
    }
    var wc = function () {
        function e(e, t) {
            switch (t.type) {
                case "base64":
                    return r(T(e), t);
                case "binary":
                    return r(e, t);
                case "buffer":
                    return r(E && Buffer.isBuffer(e) ? e.toString("binary") : C(e), t);
                case "array":
                    return r(kr(e), t);
            }
            throw new Error("Unrecognized type " + t.type)
        }

        function r(e, r) {
            var t = r || {};
            var a = t.dense ? [] : {};
            var n = e.match(/\\trowd[\s\S]*?\\row\b/g);
            if (!n.length) throw new Error("RTF missing table");
            var i = {
                s: {
                    c: 0,
                    r: 0
                },
                e: {
                    c: 0,
                    r: n.length - 1
                }
            };
            n.forEach(function (e, r) {
                if (Array.isArray(a)) a[r] = [];
                var t = /\\[\w\-]+\b/g;
                var n = 0;
                var s;
                var f = -1;
                var o = [];
                while (s = t.exec(e)) {
                    var c = e.slice(n, t.lastIndex - s[0].length);
                    if (c.charCodeAt(0) == 32) c = c.slice(1);
                    if (c.length) o.push(c);
                    switch (s[0]) {
                        case "\\cell":
                            ++f;
                            if (o.length) {
                                var l = {
                                    v: o.join(""),
                                    t: "s"
                                };
                                if (Array.isArray(a)) a[r][f] = l;
                                else a[Pa({
                                    r: r,
                                    c: f
                                })] = l
                            }
                            o = [];
                            break;
                        case "\\par":
                            o.push("\n");
                            break;
                    }
                    n = t.lastIndex
                }
                if (f > i.e.c) i.e.c = f
            });
            a["!ref"] = Ma(i);
            return a
        }

        function t(r, t) {
            return Ha(e(r, t), t)
        }

        function a(e) {
            var r = ["{\\rtf1\\ansi"];
            var t = Ua(e["!ref"]),
                a;
            var n = Array.isArray(e);
            for (var i = t.s.r; i <= t.e.r; ++i) {
                r.push("\\trowd\\trautofit1");
                for (var s = t.s.c; s <= t.e.c; ++s) r.push("\\cellx" + (s + 1));
                r.push("\\pard\\intbl");
                for (s = t.s.c; s <= t.e.c; ++s) {
                    var f = Pa({
                        r: i,
                        c: s
                    });
                    a = n ? (e[i] || [])[s] : e[f];
                    if (!a || a.v == null && (!a.f || a.F)) continue;
                    r.push(" " + (a.w || (Wa(a), a.w)).replace(/[\r\n]/g, "\\par "));
                    r.push("\\cell")
                }
                r.push("\\pard\\intbl\\row")
            }
            return r.join("") + "}"
        }
        return {
            to_workbook: t,
            to_sheet: e,
            from_sheet: a
        }
    }();

    function kc(e) {
        var r = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
        return [parseInt(r.slice(0, 2), 16), parseInt(r.slice(2, 4), 16), parseInt(r.slice(4, 6), 16)]
    }

    function Tc(e) {
        for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
        return t.toString(16).toUpperCase().slice(1)
    }

    function Ec(e) {
        var r = e[0] / 255,
            t = e[1] / 255,
            a = e[2] / 255;
        var n = Math.max(r, t, a),
            i = Math.min(r, t, a),
            s = n - i;
        if (s === 0) return [0, 0, r];
        var f = 0,
            o = 0,
            c = n + i;
        o = s / (c > 1 ? 2 - c : c);
        switch (n) {
            case r:
                f = ((t - a) / s + 6) % 6;
                break;
            case t:
                f = (a - r) / s + 2;
                break;
            case a:
                f = (r - t) / s + 4;
                break;
        }
        return [f / 6, o, c / 2]
    }

    function yc(e) {
        var r = e[0],
            t = e[1],
            a = e[2];
        var n = t * 2 * (a < .5 ? a : 1 - a),
            i = a - n / 2;
        var s = [i, i, i],
            f = 6 * r;
        var o;
        if (t !== 0) switch (f | 0) {
            case 0:
                ;
            case 6:
                o = n * f;
                s[0] += n;
                s[1] += o;
                break;
            case 1:
                o = n * (2 - f);
                s[0] += o;
                s[1] += n;
                break;
            case 2:
                o = n * (f - 2);
                s[1] += n;
                s[2] += o;
                break;
            case 3:
                o = n * (4 - f);
                s[1] += o;
                s[2] += n;
                break;
            case 4:
                o = n * (f - 4);
                s[2] += n;
                s[0] += o;
                break;
            case 5:
                o = n * (6 - f);
                s[2] += o;
                s[0] += n;
                break;
        }
        for (var c = 0; c != 3; ++c) s[c] = Math.round(s[c] * 255);
        return s
    }

    function Sc(e, r) {
        if (r === 0) return e;
        var t = Ec(kc(e));
        if (r < 0) t[2] = t[2] * (1 + r);
        else t[2] = 1 - (1 - t[2]) * (1 - r);
        return Tc(yc(t))
    }
    var _c = 6,
        Ac = 15,
        xc = 1,
        Cc = _c;

    function Rc(e) {
        return Math.floor((e + Math.round(128 / Cc) / 256) * Cc)
    }

    function Oc(e) {
        return Math.floor((e - 5) / Cc * 100 + .5) / 100
    }

    function Ic(e) {
        return Math.round((e * Cc + 5) / Cc * 256) / 256
    }

    function Nc(e) {
        return Ic(Oc(Rc(e)))
    }

    function Fc(e) {
        var r = Math.abs(e - Nc(e)),
            t = Cc;
        if (r > .005)
            for (Cc = xc; Cc < Ac; ++Cc)
                if (Math.abs(e - Nc(e)) <= r) {
                    r = Math.abs(e - Nc(e));
                    t = Cc
                } Cc = t
    }

    function Dc(e) {
        if (e.width) {
            e.wpx = Rc(e.width);
            e.wch = Oc(e.wpx);
            e.MDW = Cc
        } else if (e.wpx) {
            e.wch = Oc(e.wpx);
            e.width = Ic(e.wch);
            e.MDW = Cc
        } else if (typeof e.wch == "number") {
            e.width = Ic(e.wch);
            e.wpx = Rc(e.width);
            e.MDW = Cc
        }
        if (e.customWidth) delete e.customWidth
    }
    var Pc = 96,
        Lc = Pc;

    function Mc(e) {
        return e * 96 / Lc
    }

    function Uc(e) {
        return e * Lc / 96
    }
    var Bc = {
        None: "none",
        Solid: "solid",
        Gray50: "mediumGray",
        Gray75: "darkGray",
        Gray25: "lightGray",
        HorzStripe: "darkHorizontal",
        VertStripe: "darkVertical",
        ReverseDiagStripe: "darkDown",
        DiagStripe: "darkUp",
        DiagCross: "darkGrid",
        ThickDiagCross: "darkTrellis",
        ThinHorzStripe: "lightHorizontal",
        ThinVertStripe: "lightVertical",
        ThinReverseDiagStripe: "lightDown",
        ThinHorzCross: "lightGrid"
    };

    function Wc(e, r, t, a) {
        r.Borders = [];
        var n = {};
        var i = false;
        (e[0].match(Xr) || []).forEach(function (e) {
            var t = Kr(e);
            switch (Jr(t[0])) {
                case "<borders":
                    ;
                case "<borders>":
                    ;
                case "</borders>":
                    break;
                case "<border":
                    ;
                case "<border>":
                    ;
                case "<border/>":
                    n = {};
                    if (t.diagonalUp) n.diagonalUp = ct(t.diagonalUp);
                    if (t.diagonalDown) n.diagonalDown = ct(t.diagonalDown);
                    r.Borders.push(n);
                    break;
                case "</border>":
                    break;
                case "<left/>":
                    break;
                case "<left":
                    ;
                case "<left>":
                    break;
                case "</left>":
                    break;
                case "<right/>":
                    break;
                case "<right":
                    ;
                case "<right>":
                    break;
                case "</right>":
                    break;
                case "<top/>":
                    break;
                case "<top":
                    ;
                case "<top>":
                    break;
                case "</top>":
                    break;
                case "<bottom/>":
                    break;
                case "<bottom":
                    ;
                case "<bottom>":
                    break;
                case "</bottom>":
                    break;
                case "<diagonal":
                    ;
                case "<diagonal>":
                    ;
                case "<diagonal/>":
                    break;
                case "</diagonal>":
                    break;
                case "<horizontal":
                    ;
                case "<horizontal>":
                    ;
                case "<horizontal/>":
                    break;
                case "</horizontal>":
                    break;
                case "<vertical":
                    ;
                case "<vertical>":
                    ;
                case "<vertical/>":
                    break;
                case "</vertical>":
                    break;
                case "<start":
                    ;
                case "<start>":
                    ;
                case "<start/>":
                    break;
                case "</start>":
                    break;
                case "<end":
                    ;
                case "<end>":
                    ;
                case "<end/>":
                    break;
                case "</end>":
                    break;
                case "<color":
                    ;
                case "<color>":
                    break;
                case "<color/>":
                    ;
                case "</color>":
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    break;
                case "<ext":
                    i = true;
                    break;
                case "</ext>":
                    i = false;
                    break;
                default:
                    if (a && a.WTF) {
                        if (!i) throw new Error("unrecognized " + t[0] + " in borders")
                    };
            }
        })
    }

    function Hc(e, r, t, a) {
        r.Fills = [];
        var n = {};
        var i = false;
        (e[0].match(Xr) || []).forEach(function (e) {
            var t = Kr(e);
            switch (Jr(t[0])) {
                case "<fills":
                    ;
                case "<fills>":
                    ;
                case "</fills>":
                    break;
                case "<fill>":
                    ;
                case "<fill":
                    ;
                case "<fill/>":
                    n = {};
                    r.Fills.push(n);
                    break;
                case "</fill>":
                    break;
                case "<gradientFill>":
                    break;
                case "<gradientFill":
                    ;
                case "</gradientFill>":
                    r.Fills.push(n);
                    n = {};
                    break;
                case "<patternFill":
                    ;
                case "<patternFill>":
                    if (t.patternType) n.patternType = t.patternType;
                    break;
                case "<patternFill/>":
                    ;
                case "</patternFill>":
                    break;
                case "<bgColor":
                    if (!n.bgColor) n.bgColor = {};
                    if (t.indexed) n.bgColor.indexed = parseInt(t.indexed, 10);
                    if (t.theme) n.bgColor.theme = parseInt(t.theme, 10);
                    if (t.tint) n.bgColor.tint = parseFloat(t.tint);
                    if (t.rgb) n.bgColor.rgb = t.rgb.slice(-6);
                    break;
                case "<bgColor/>":
                    ;
                case "</bgColor>":
                    break;
                case "<fgColor":
                    if (!n.fgColor) n.fgColor = {};
                    if (t.theme) n.fgColor.theme = parseInt(t.theme, 10);
                    if (t.tint) n.fgColor.tint = parseFloat(t.tint);
                    if (t.rgb != null) n.fgColor.rgb = t.rgb.slice(-6);
                    break;
                case "<fgColor/>":
                    ;
                case "</fgColor>":
                    break;
                case "<stop":
                    ;
                case "<stop/>":
                    break;
                case "</stop>":
                    break;
                case "<color":
                    ;
                case "<color/>":
                    break;
                case "</color>":
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    break;
                case "<ext":
                    i = true;
                    break;
                case "</ext>":
                    i = false;
                    break;
                default:
                    if (a && a.WTF) {
                        if (!i) throw new Error("unrecognized " + t[0] + " in fills")
                    };
            }
        })
    }

    function zc(e, r, t, a) {
        r.Fonts = [];
        var n = {};
        var s = false;
        (e[0].match(Xr) || []).forEach(function (e) {
            var f = Kr(e);
            switch (Jr(f[0])) {
                case "<fonts":
                    ;
                case "<fonts>":
                    ;
                case "</fonts>":
                    break;
                case "<font":
                    ;
                case "<font>":
                    break;
                case "</font>":
                    ;
                case "<font/>":
                    r.Fonts.push(n);
                    n = {};
                    break;
                case "<name":
                    if (f.val) n.name = vt(f.val);
                    break;
                case "<name/>":
                    ;
                case "</name>":
                    break;
                case "<b":
                    n.bold = f.val ? ct(f.val) : 1;
                    break;
                case "<b/>":
                    n.bold = 1;
                    break;
                case "<i":
                    n.italic = f.val ? ct(f.val) : 1;
                    break;
                case "<i/>":
                    n.italic = 1;
                    break;
                case "<u":
                    switch (f.val) {
                        case "none":
                            n.underline = 0;
                            break;
                        case "single":
                            n.underline = 1;
                            break;
                        case "double":
                            n.underline = 2;
                            break;
                        case "singleAccounting":
                            n.underline = 33;
                            break;
                        case "doubleAccounting":
                            n.underline = 34;
                            break;
                    }
                    break;
                case "<u/>":
                    n.underline = 1;
                    break;
                case "<strike":
                    n.strike = f.val ? ct(f.val) : 1;
                    break;
                case "<strike/>":
                    n.strike = 1;
                    break;
                case "<outline":
                    n.outline = f.val ? ct(f.val) : 1;
                    break;
                case "<outline/>":
                    n.outline = 1;
                    break;
                case "<shadow":
                    n.shadow = f.val ? ct(f.val) : 1;
                    break;
                case "<shadow/>":
                    n.shadow = 1;
                    break;
                case "<condense":
                    n.condense = f.val ? ct(f.val) : 1;
                    break;
                case "<condense/>":
                    n.condense = 1;
                    break;
                case "<extend":
                    n.extend = f.val ? ct(f.val) : 1;
                    break;
                case "<extend/>":
                    n.extend = 1;
                    break;
                case "<sz":
                    if (f.val) n.sz = +f.val;
                    break;
                case "<sz/>":
                    ;
                case "</sz>":
                    break;
                case "<vertAlign":
                    if (f.val) n.vertAlign = f.val;
                    break;
                case "<vertAlign/>":
                    ;
                case "</vertAlign>":
                    break;
                case "<family":
                    if (f.val) n.family = parseInt(f.val, 10);
                    break;
                case "<family/>":
                    ;
                case "</family>":
                    break;
                case "<scheme":
                    if (f.val) n.scheme = f.val;
                    break;
                case "<scheme/>":
                    ;
                case "</scheme>":
                    break;
                case "<charset":
                    if (f.val == "1") break;
                    f.codepage = i[parseInt(f.val, 10)];
                    break;
                case "<color":
                    if (!n.color) n.color = {};
                    if (f.auto) n.color.auto = ct(f.auto);
                    if (f.rgb) n.color.rgb = f.rgb.slice(-6);
                    else if (f.indexed) {
                        n.color.index = parseInt(f.indexed, 10);
                        var o = Xn[n.color.index];
                        if (n.color.index == 81) o = Xn[1];
                        if (!o) o = Xn[1];
                        n.color.rgb = o[0].toString(16) + o[1].toString(16) + o[2].toString(16)
                    } else if (f.theme) {
                        n.color.theme = parseInt(f.theme, 10);
                        if (f.tint) n.color.tint = parseFloat(f.tint);
                        if (f.theme && t.themeElements && t.themeElements.clrScheme) {
                            n.color.rgb = Sc(t.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)
                        }
                    }
                    break;
                case "<color/>":
                    ;
                case "</color>":
                    break;
                case "<AlternateContent":
                    s = true;
                    break;
                case "</AlternateContent>":
                    s = false;
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    break;
                case "<ext":
                    s = true;
                    break;
                case "</ext>":
                    s = false;
                    break;
                default:
                    if (a && a.WTF) {
                        if (!s) throw new Error("unrecognized " + f[0] + " in fonts")
                    };
            }
        })
    }

    function Vc(e, r, t) {
        r.NumberFmt = [];
        var a = nr(Y);
        for (var n = 0; n < a.length; ++n) r.NumberFmt[a[n]] = Y[a[n]];
        var i = e[0].match(Xr);
        if (!i) return;
        for (n = 0; n < i.length; ++n) {
            var s = Kr(i[n]);
            switch (Jr(s[0])) {
                case "<numFmts":
                    ;
                case "</numFmts>":
                    ;
                case "<numFmts/>":
                    ;
                case "<numFmts>":
                    break;
                case "<numFmt": {
                    var f = Qr(vt(s.formatCode)),
                        o = parseInt(s.numFmtId, 10);
                    r.NumberFmt[o] = f;
                    if (o > 0) {
                        if (o > 392) {
                            for (o = 392; o > 60; --o)
                                if (r.NumberFmt[o] == null) break;
                            r.NumberFmt[o] = f
                        }
                        Je(f, o)
                    }
                }
                break;
            case "</numFmt>":
                break;
            default:
                if (t.WTF) throw new Error("unrecognized " + s[0] + " in numFmts");
            }
        }
    }

    function Gc(e) {
        var r = ["<numFmts>"];
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function (t) {
            for (var a = t[0]; a <= t[1]; ++a)
                if (e[a] != null) r[r.length] = _t("numFmt", null, {
                    numFmtId: a,
                    formatCode: tt(e[a])
                })
        });
        if (r.length === 1) return "";
        r[r.length] = "</numFmts>";
        r[0] = _t("numFmts", null, {
            count: r.length - 2
        }).replace("/>", ">");
        return r.join("")
    }
    var jc = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
    var Xc = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

    function $c(e, r, t) {
        r.CellXf = [];
        var a;
        var n = false;
        (e[0].match(Xr) || []).forEach(function (e) {
            var i = Kr(e),
                s = 0;
            switch (Jr(i[0])) {
                case "<cellXfs":
                    ;
                case "<cellXfs>":
                    ;
                case "<cellXfs/>":
                    ;
                case "</cellXfs>":
                    break;
                case "<xf":
                    ;
                case "<xf/>":
                    a = i;
                    delete a[0];
                    for (s = 0; s < jc.length; ++s)
                        if (a[jc[s]]) a[jc[s]] = parseInt(a[jc[s]], 10);
                    for (s = 0; s < Xc.length; ++s)
                        if (a[Xc[s]]) a[Xc[s]] = ct(a[Xc[s]]);
                    if (r.NumberFmt && a.numFmtId > 392) {
                        for (s = 392; s > 60; --s)
                            if (r.NumberFmt[a.numFmtId] == r.NumberFmt[s]) {
                                a.numFmtId = s;
                                break
                            }
                    }
                    r.CellXf.push(a);
                    break;
                case "</xf>":
                    break;
                case "<alignment":
                    ;
                case "<alignment/>":
                    var f = {};
                    if (i.vertical) f.vertical = i.vertical;
                    if (i.horizontal) f.horizontal = i.horizontal;
                    if (i.textRotation != null) f.textRotation = i.textRotation;
                    if (i.indent) f.indent = i.indent;
                    if (i.wrapText) f.wrapText = ct(i.wrapText);
                    a.alignment = f;
                    break;
                case "</alignment>":
                    break;
                case "<protection":
                    break;
                case "</protection>":
                    ;
                case "<protection/>":
                    break;
                case "<AlternateContent":
                    n = true;
                    break;
                case "</AlternateContent>":
                    n = false;
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    break;
                case "<ext":
                    n = true;
                    break;
                case "</ext>":
                    n = false;
                    break;
                default:
                    if (t && t.WTF) {
                        if (!n) throw new Error("unrecognized " + i[0] + " in cellXfs")
                    };
            }
        })
    }

    function Yc(e) {
        var r = [];
        r[r.length] = _t("cellXfs", null);
        e.forEach(function (e) {
            r[r.length] = _t("xf", null, e)
        });
        r[r.length] = "</cellXfs>";
        if (r.length === 2) return "";
        r[0] = _t("cellXfs", null, {
            count: r.length - 2
        }).replace("/>", ">");
        return r.join("")
    }
    var Kc = function sk() {
        var e = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/;
        var r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/;
        var t = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/;
        var a = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/;
        var n = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
        return function i(s, f, o) {
            var c = {};
            if (!s) return c;
            s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
            var l;
            if (l = s.match(e)) Vc(l, c, o);
            if (l = s.match(a)) zc(l, c, f, o);
            if (l = s.match(t)) Hc(l, c, f, o);
            if (l = s.match(n)) Wc(l, c, f, o);
            if (l = s.match(r)) $c(l, c, o);
            return c
        }
    }();

    function Jc(e, r) {
        var t = [zr, _t("styleSheet", null, {
                xmlns: It[0],
                "xmlns:vt": Ot.vt
            })],
            a;
        if (e.SSF && (a = Gc(e.SSF)) != null) t[t.length] = a;
        t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';
        t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
        t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';
        t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
        if (a = Yc(r.cellXfs)) t[t.length] = a;
        t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
        t[t.length] = '<dxfs count="0"/>';
        t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';
        if (t.length > 2) {
            t[t.length] = "</styleSheet>";
            t[1] = t[1].replace("/>", ">")
        }
        return t.join("")
    }

    function qc(e, r) {
        var t = e._R(2);
        var a = Xa(e, r - 2);
        return [t, a]
    }

    function Zc(e, r, t) {
        if (!t) t = ba(6 + 4 * r.length);
        t._W(2, e);
        $a(r, t);
        var a = t.length > t.l ? t.slice(0, t.l) : t;
        if (t.l == null) t.l = t.length;
        return a
    }

    function Qc(e, r, t) {
        var a = {};
        a.sz = e._R(2) / 20;
        var n = En(e, 2, t);
        if (n.fItalic) a.italic = 1;
        if (n.fCondense) a.condense = 1;
        if (n.fExtend) a.extend = 1;
        if (n.fShadow) a.shadow = 1;
        if (n.fOutline) a.outline = 1;
        if (n.fStrikeout) a.strike = 1;
        var i = e._R(2);
        if (i === 700) a.bold = 1;
        switch (e._R(2)) {
            case 1:
                a.vertAlign = "superscript";
                break;
            case 2:
                a.vertAlign = "subscript";
                break;
        }
        var s = e._R(1);
        if (s != 0) a.underline = s;
        var f = e._R(1);
        if (f > 0) a.family = f;
        var o = e._R(1);
        if (o > 0) a.charset = o;
        e.l++;
        a.color = kn(e, 8);
        switch (e._R(1)) {
            case 1:
                a.scheme = "major";
                break;
            case 2:
                a.scheme = "minor";
                break;
        }
        a.name = Xa(e, r - 21);
        return a
    }

    function el(e, r) {
        if (!r) r = ba(25 + 4 * 32);
        r._W(2, e.sz * 20);
        yn(e, r);
        r._W(2, e.bold ? 700 : 400);
        var t = 0;
        if (e.vertAlign == "superscript") t = 1;
        else if (e.vertAlign == "subscript") t = 2;
        r._W(2, t);
        r._W(1, e.underline || 0);
        r._W(1, e.family || 0);
        r._W(1, e.charset || 0);
        r._W(1, 0);
        Tn(e.color, r);
        var a = 0;
        if (e.scheme == "major") a = 1;
        if (e.scheme == "minor") a = 2;
        r._W(1, a);
        $a(e.name, r);
        return r.length > r.l ? r.slice(0, r.l) : r
    }
    var rl = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];
    var tl;
    var al = ma;

    function nl(e, r) {
        if (!r) r = ba(4 * 3 + 8 * 7 + 16 * 1);
        if (!tl) tl = sr(rl);
        var t = tl[e.patternType];
        if (t == null) t = 40;
        r._W(4, t);
        var a = 0;
        if (t != 40) {
            Tn({
                auto: 1
            }, r);
            Tn({
                auto: 1
            }, r);
            for (; a < 12; ++a) r._W(4, 0)
        } else {
            for (; a < 4; ++a) r._W(4, 0);
            for (; a < 12; ++a) r._W(4, 0)
        }
        return r.length > r.l ? r.slice(0, r.l) : r
    }

    function il(e, r) {
        var t = e.l + r;
        var a = e._R(2);
        var n = e._R(2);
        e.l = t;
        return {
            ixfe: a,
            numFmtId: n
        }
    }

    function sl(e, r, t) {
        if (!t) t = ba(16);
        t._W(2, r || 0);
        t._W(2, e.numFmtId || 0);
        t._W(2, 0);
        t._W(2, 0);
        t._W(2, 0);
        t._W(1, 0);
        t._W(1, 0);
        var a = 0;
        t._W(1, a);
        t._W(1, 0);
        t._W(1, 0);
        t._W(1, 0);
        return t
    }

    function fl(e, r) {
        if (!r) r = ba(10);
        r._W(1, 0);
        r._W(1, 0);
        r._W(4, 0);
        r._W(4, 0);
        return r
    }
    var ol = ma;

    function cl(e, r) {
        if (!r) r = ba(51);
        r._W(1, 0);
        fl(null, r);
        fl(null, r);
        fl(null, r);
        fl(null, r);
        fl(null, r);
        return r.length > r.l ? r.slice(0, r.l) : r
    }

    function ll(e, r) {
        if (!r) r = ba(12 + 4 * 10);
        r._W(4, e.xfId);
        r._W(2, 1);
        r._W(1, +e.builtinId);
        r._W(1, 0);
        on(e.name || "", r);
        return r.length > r.l ? r.slice(0, r.l) : r
    }

    function ul(e, r, t) {
        var a = ba(4 + 256 * 2 * 4);
        a._W(4, e);
        on(r, a);
        on(t, a);
        return a.length > a.l ? a.slice(0, a.l) : a
    }

    function hl(e, r, t) {
        var a = {};
        a.NumberFmt = [];
        for (var n in Y) a.NumberFmt[n] = Y[n];
        a.CellXf = [];
        a.Fonts = [];
        var i = [];
        var s = false;
        ga(e, function f(e, n, o) {
            switch (o) {
                case 44:
                    a.NumberFmt[e[0]] = e[1];
                    Je(e[1], e[0]);
                    break;
                case 43:
                    a.Fonts.push(e);
                    if (e.color.theme != null && r && r.themeElements && r.themeElements.clrScheme) {
                        e.color.rgb = Sc(r.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0)
                    }
                    break;
                case 1025:
                    break;
                case 45:
                    break;
                case 46:
                    break;
                case 47:
                    if (i[i.length - 1] == 617) {
                        a.CellXf.push(e)
                    }
                    break;
                case 48:
                    ;
                case 507:
                    ;
                case 572:
                    ;
                case 475:
                    break;
                case 1171:
                    ;
                case 2102:
                    ;
                case 1130:
                    ;
                case 512:
                    ;
                case 2095:
                    ;
                case 3072:
                    break;
                case 35:
                    s = true;
                    break;
                case 36:
                    s = false;
                    break;
                case 37:
                    i.push(o);
                    s = true;
                    break;
                case 38:
                    i.pop();
                    s = false;
                    break;
                default:
                    if (n.T > 0) i.push(o);
                    else if (n.T < 0) i.pop();
                    else if (!s || t.WTF && i[i.length - 1] != 37) throw new Error("Unexpected record 0x" + o.toString(16));
            }
        });
        return a
    }

    function dl(e, r) {
        if (!r) return;
        var t = 0;
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function (e) {
            for (var a = e[0]; a <= e[1]; ++a)
                if (r[a] != null) ++t
        });
        if (t == 0) return;
        ka(e, 615, ja(t));
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function (t) {
            for (var a = t[0]; a <= t[1]; ++a)
                if (r[a] != null) ka(e, 44, Zc(a, r[a]))
        });
        ka(e, 616)
    }

    function vl(e) {
        var r = 1;
        if (r == 0) return;
        ka(e, 611, ja(r));
        ka(e, 43, el({
            sz: 12,
            color: {
                theme: 1
            },
            name: "Calibri",
            family: 2,
            scheme: "minor"
        }));
        ka(e, 612)
    }

    function pl(e) {
        var r = 2;
        if (r == 0) return;
        ka(e, 603, ja(r));
        ka(e, 45, nl({
            patternType: "none"
        }));
        ka(e, 45, nl({
            patternType: "gray125"
        }));
        ka(e, 604)
    }

    function ml(e) {
        var r = 1;
        if (r == 0) return;
        ka(e, 613, ja(r));
        ka(e, 46, cl({}));
        ka(e, 614)
    }

    function bl(e) {
        var r = 1;
        ka(e, 626, ja(r));
        ka(e, 47, sl({
            numFmtId: 0,
            fontId: 0,
            fillId: 0,
            borderId: 0
        }, 65535));
        ka(e, 627)
    }

    function gl(e, r) {
        ka(e, 617, ja(r.length));
        r.forEach(function (r) {
            ka(e, 47, sl(r, 0))
        });
        ka(e, 618)
    }

    function wl(e) {
        var r = 1;
        ka(e, 619, ja(r));
        ka(e, 48, ll({
            xfId: 0,
            builtinId: 0,
            name: "Normal"
        }));
        ka(e, 620)
    }

    function kl(e) {
        var r = 0;
        ka(e, 505, ja(r));
        ka(e, 506)
    }

    function Tl(e) {
        var r = 0;
        ka(e, 508, ul(r, "TableStyleMedium9", "PivotStyleMedium4"));
        ka(e, 509)
    }

    function El() {
        return
    }

    function yl(e, r) {
        var t = wa();
        ka(t, 278);
        dl(t, e.SSF);
        vl(t, e);
        pl(t, e);
        ml(t, e);
        bl(t, e);
        gl(t, r.cellXfs);
        wl(t, e);
        kl(t, e);
        Tl(t, e);
        El(t, e);
        ka(t, 279);
        return t.end()
    }
    var Sl = ["</a:lt1>", "</a:dk1>", "</a:lt2>", "</a:dk2>", "</a:accent1>", "</a:accent2>", "</a:accent3>", "</a:accent4>", "</a:accent5>", "</a:accent6>", "</a:hlink>", "</a:folHlink>"];

    function _l(e, r, t) {
        r.themeElements.clrScheme = [];
        var a = {};
        (e[0].match(Xr) || []).forEach(function (e) {
            var n = Kr(e);
            switch (n[0]) {
                case "<a:clrScheme":
                    ;
                case "</a:clrScheme>":
                    break;
                case "<a:srgbClr":
                    a.rgb = n.val;
                    break;
                case "<a:sysClr":
                    a.rgb = n.lastClr;
                    break;
                case "<a:dk1>":
                    ;
                case "</a:dk1>":
                    ;
                case "<a:lt1>":
                    ;
                case "</a:lt1>":
                    ;
                case "<a:dk2>":
                    ;
                case "</a:dk2>":
                    ;
                case "<a:lt2>":
                    ;
                case "</a:lt2>":
                    ;
                case "<a:accent1>":
                    ;
                case "</a:accent1>":
                    ;
                case "<a:accent2>":
                    ;
                case "</a:accent2>":
                    ;
                case "<a:accent3>":
                    ;
                case "</a:accent3>":
                    ;
                case "<a:accent4>":
                    ;
                case "</a:accent4>":
                    ;
                case "<a:accent5>":
                    ;
                case "</a:accent5>":
                    ;
                case "<a:accent6>":
                    ;
                case "</a:accent6>":
                    ;
                case "<a:hlink>":
                    ;
                case "</a:hlink>":
                    ;
                case "<a:folHlink>":
                    ;
                case "</a:folHlink>":
                    if (n[0].charAt(1) === "/") {
                        r.themeElements.clrScheme[Sl.indexOf(n[0])] = a;
                        a = {}
                    } else {
                        a.name = n[0].slice(3, n[0].length - 1)
                    }
                    break;
                default:
                    if (t && t.WTF) throw new Error("Unrecognized " + n[0] + " in clrScheme");
            }
        })
    }

    function Al() {}

    function xl() {}
    var Cl = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
    var Rl = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
    var Ol = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;

    function Il(e, r, t) {
        r.themeElements = {};
        var a;
        [
            ["clrScheme", Cl, _l],
            ["fontScheme", Rl, Al],
            ["fmtScheme", Ol, xl]
        ].forEach(function (n) {
            if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
            n[2](a, r, t)
        })
    }
    var Nl = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

    function Fl(e, r) {
        if (!e || e.length === 0) e = Dl();
        var t;
        var a = {};
        if (!(t = e.match(Nl))) throw new Error("themeElements not found in theme");
        Il(t[0], a, r);
        a.raw = e;
        return a
    }

    function Dl(e, r) {
        if (r && r.themeXLSX) return r.themeXLSX;
        if (e && typeof e.raw == "string") return e.raw;
        var t = [zr];
        t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
        t[t.length] = "<a:themeElements>";
        t[t.length] = '<a:clrScheme name="Office">';
        t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
        t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
        t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
        t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
        t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
        t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
        t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
        t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
        t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
        t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
        t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
        t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
        t[t.length] = "</a:clrScheme>";
        t[t.length] = '<a:fontScheme name="Office">';
        t[t.length] = "<a:majorFont>";
        t[t.length] = '<a:latin typeface="Cambria"/>';
        t[t.length] = '<a:ea typeface=""/>';
        t[t.length] = '<a:cs typeface=""/>';
        t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
        t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
        t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
        t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
        t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
        t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
        t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
        t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
        t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
        t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
        t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
        t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
        t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
        t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
        t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
        t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
        t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
        t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
        t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
        t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
        t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
        t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
        t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
        t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
        t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
        t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
        t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
        t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
        t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
        t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
        t[t.length] = "</a:majorFont>";
        t[t.length] = "<a:minorFont>";
        t[t.length] = '<a:latin typeface="Calibri"/>';
        t[t.length] = '<a:ea typeface=""/>';
        t[t.length] = '<a:cs typeface=""/>';
        t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
        t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
        t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
        t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
        t[t.length] = '<a:font script="Arab" typeface="Arial"/>';
        t[t.length] = '<a:font script="Hebr" typeface="Arial"/>';
        t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
        t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
        t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
        t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
        t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
        t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
        t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
        t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
        t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
        t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
        t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
        t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
        t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
        t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
        t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
        t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
        t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
        t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
        t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
        t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
        t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
        t[t.length] = '<a:font script="Viet" typeface="Arial"/>';
        t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
        t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
        t[t.length] = "</a:minorFont>";
        t[t.length] = "</a:fontScheme>";
        t[t.length] = '<a:fmtScheme name="Office">';
        t[t.length] = "<a:fillStyleLst>";
        t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:lin ang="16200000" scaled="1"/>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:lin ang="16200000" scaled="0"/>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = "</a:fillStyleLst>";
        t[t.length] = "<a:lnStyleLst>";
        t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
        t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
        t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
        t[t.length] = "</a:lnStyleLst>";
        t[t.length] = "<a:effectStyleLst>";
        t[t.length] = "<a:effectStyle>";
        t[t.length] = "<a:effectLst>";
        t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
        t[t.length] = "</a:effectLst>";
        t[t.length] = "</a:effectStyle>";
        t[t.length] = "<a:effectStyle>";
        t[t.length] = "<a:effectLst>";
        t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
        t[t.length] = "</a:effectLst>";
        t[t.length] = "</a:effectStyle>";
        t[t.length] = "<a:effectStyle>";
        t[t.length] = "<a:effectLst>";
        t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
        t[t.length] = "</a:effectLst>";
        t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
        t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
        t[t.length] = "</a:effectStyle>";
        t[t.length] = "</a:effectStyleLst>";
        t[t.length] = "<a:bgFillStyleLst>";
        t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = "</a:bgFillStyleLst>";
        t[t.length] = "</a:fmtScheme>";
        t[t.length] = "</a:themeElements>";
        t[t.length] = "<a:objectDefaults>";
        t[t.length] = "<a:spDef>";
        t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
        t[t.length] = "</a:spDef>";
        t[t.length] = "<a:lnDef>";
        t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
        t[t.length] = "</a:lnDef>";
        t[t.length] = "</a:objectDefaults>";
        t[t.length] = "<a:extraClrSchemeLst/>";
        t[t.length] = "</a:theme>";
        return t.join("")
    }

    function Pl(e, r, t) {
        var a = e.l + r;
        var n = e._R(4);
        if (n === 124226) return;
        if (!t.cellStyles) {
            e.l = a;
            return
        }
        var i = e.slice(e.l);
        e.l = a;
        var s;
        try {
            s = Wr(i, {
                type: "array"
            })
        } catch (f) {
            return
        }
        var o = Pr(s, "theme/theme/theme1.xml", true);
        if (!o) return;
        return Fl(o, t)
    }

    function Ll(e) {
        return e._R(4)
    }

    function Ml(e) {
        var r = {};
        r.xclrType = e._R(2);
        r.nTintShade = e._R(2);
        switch (r.xclrType) {
            case 0:
                e.l += 4;
                break;
            case 1:
                r.xclrValue = Ul(e, 4);
                break;
            case 2:
                r.xclrValue = ys(e, 4);
                break;
            case 3:
                r.xclrValue = Ll(e, 4);
                break;
            case 4:
                e.l += 4;
                break;
        }
        e.l += 8;
        return r
    }

    function Ul(e, r) {
        return ma(e, r)
    }

    function Bl(e, r) {
        return ma(e, r)
    }

    function Wl(e) {
        var r = e._R(2);
        var t = e._R(2) - 4;
        var a = [r];
        switch (r) {
            case 4:
                ;
            case 5:
                ;
            case 7:
                ;
            case 8:
                ;
            case 9:
                ;
            case 10:
                ;
            case 11:
                ;
            case 13:
                a[1] = Ml(e, t);
                break;
            case 6:
                a[1] = Bl(e, t);
                break;
            case 14:
                ;
            case 15:
                a[1] = e._R(t === 1 ? 1 : 2);
                break;
            default:
                throw new Error("Unrecognized ExtProp type: " + r + " " + t);
        }
        return a
    }

    function Hl(e, r) {
        var t = e.l + r;
        e.l += 2;
        var a = e._R(2);
        e.l += 2;
        var n = e._R(2);
        var i = [];
        while (n-- > 0) i.push(Wl(e, t - e.l));
        return {
            ixfe: a,
            ext: i
        }
    }

    function zl(e, r) {
        r.forEach(function (e) {
            switch (e[0]) {
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    break;
                case 11:
                    break;
                case 13:
                    break;
                case 14:
                    break;
                case 15:
                    break;
            }
        })
    }

    function Vl(e, r) {
        return {
            flags: e._R(4),
            version: e._R(4),
            name: Xa(e, r - 8)
        }
    }

    function Gl(e) {
        var r = ba(12 + 2 * e.name.length);
        r._W(4, e.flags);
        r._W(4, e.version);
        $a(e.name, r);
        return r.slice(0, r.l)
    }

    function jl(e) {
        var r = [];
        var t = e._R(4);
        while (t-- > 0) r.push([e._R(4), e._R(4)]);
        return r
    }

    function Xl(e) {
        var r = ba(4 + 8 * e.length);
        r._W(4, e.length);
        for (var t = 0; t < e.length; ++t) {
            r._W(4, e[t][0]);
            r._W(4, e[t][1])
        }
        return r
    }

    function $l(e, r) {
        var t = ba(8 + 2 * r.length);
        t._W(4, e);
        $a(r, t);
        return t.slice(0, t.l)
    }

    function Yl(e) {
        e.l += 4;
        return e._R(4) != 0
    }

    function Kl(e, r) {
        var t = ba(8);
        t._W(4, e);
        t._W(4, r ? 1 : 0);
        return t
    }

    function Jl(e, r, t) {
        var a = {
            Types: [],
            Cell: [],
            Value: []
        };
        var n = t || {};
        var i = [];
        var s = false;
        var f = 2;
        ga(e, function (e, r, t) {
            switch (t) {
                case 335:
                    a.Types.push({
                        name: e.name
                    });
                    break;
                case 51:
                    e.forEach(function (e) {
                        if (f == 1) a.Cell.push({
                            type: a.Types[e[0] - 1].name,
                            index: e[1]
                        });
                        else if (f == 0) a.Value.push({
                            type: a.Types[e[0] - 1].name,
                            index: e[1]
                        })
                    });
                    break;
                case 337:
                    f = e ? 1 : 0;
                    break;
                case 338:
                    f = 2;
                    break;
                case 35:
                    i.push(t);
                    s = true;
                    break;
                case 36:
                    i.pop();
                    s = false;
                    break;
                default:
                    if (r.T) {} else if (!s || n.WTF && i[i.length - 1] != 35) throw new Error("Unexpected record 0x" + t.toString(16));
            }
        });
        return a
    }

    function ql() {
        var e = wa();
        ka(e, 332);
        ka(e, 334, ja(1));
        ka(e, 335, Gl({
            name: "XLDAPR",
            version: 12e4,
            flags: 3496657072
        }));
        ka(e, 336);
        ka(e, 339, $l(1, "XLDAPR"));
        ka(e, 52);
        ka(e, 35, ja(514));
        ka(e, 4096, ja(0));
        ka(e, 4097, ns(1));
        ka(e, 36);
        ka(e, 53);
        ka(e, 340);
        ka(e, 337, Kl(1, true));
        ka(e, 51, Xl([
            [1, 0]
        ]));
        ka(e, 338);
        ka(e, 333);
        return e.end()
    }

    function Zl(e, r, t) {
        var a = {
            Types: [],
            Cell: [],
            Value: []
        };
        if (!e) return a;
        var n = false;
        var i = 2;
        var s;
        e.replace(Xr, function (e) {
            var r = Kr(e);
            switch (Jr(r[0])) {
                case "<?xml":
                    break;
                case "<metadata":
                    ;
                case "</metadata>":
                    break;
                case "<metadataTypes":
                    ;
                case "</metadataTypes>":
                    break;
                case "<metadataType":
                    a.Types.push({
                        name: r.name
                    });
                    break;
                case "</metadataType>":
                    break;
                case "<futureMetadata":
                    for (var f = 0; f < a.Types.length; ++f)
                        if (a.Types[f].name == r.name) s = a.Types[f];
                    break;
                case "</futureMetadata>":
                    break;
                case "<bk>":
                    break;
                case "</bk>":
                    break;
                case "<rc":
                    if (i == 1) a.Cell.push({
                        type: a.Types[r.t - 1].name,
                        index: +r.v
                    });
                    else if (i == 0) a.Value.push({
                        type: a.Types[r.t - 1].name,
                        index: +r.v
                    });
                    break;
                case "</rc>":
                    break;
                case "<cellMetadata":
                    i = 1;
                    break;
                case "</cellMetadata>":
                    i = 2;
                    break;
                case "<valueMetadata":
                    i = 0;
                    break;
                case "</valueMetadata>":
                    i = 2;
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    ;
                case "<extLst/>":
                    break;
                case "<ext":
                    n = true;
                    break;
                case "</ext>":
                    n = false;
                    break;
                case "<rvb":
                    if (!s) break;
                    if (!s.offsets) s.offsets = [];
                    s.offsets.push(+r.i);
                    break;
                default:
                    if (!n && t.WTF) throw new Error("unrecognized " + r[0] + " in metadata");
            }
            return e
        });
        return a
    }

    function Ql() {
        var e = [zr];
        e.push('<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">\n  <metadataTypes count="1">\n    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>\n  </metadataTypes>\n  <futureMetadata name="XLDAPR" count="1">\n    <bk>\n      <extLst>\n        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">\n          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>\n        </ext>\n      </extLst>\n    </bk>\n  </futureMetadata>\n  <cellMetadata count="1">\n    <bk>\n      <rc t="1" v="0"/>\n    </bk>\n  </cellMetadata>\n</metadata>');
        return e.join("")
    }

    function eu(e) {
        var r = [];
        if (!e) return r;
        var t = 1;
        (e.match(Xr) || []).forEach(function (e) {
            var a = Kr(e);
            switch (a[0]) {
                case "<?xml":
                    break;
                case "<calcChain":
                    ;
                case "<calcChain>":
                    ;
                case "</calcChain>":
                    break;
                case "<c":
                    delete a[0];
                    if (a.i) t = a.i;
                    else a.i = t;
                    r.push(a);
                    break;
            }
        });
        return r
    }

    function ru(e) {
        var r = {};
        r.i = e._R(4);
        var t = {};
        t.r = e._R(4);
        t.c = e._R(4);
        r.r = Pa(t);
        var a = e._R(1);
        if (a & 2) r.l = "1";
        if (a & 8) r.a = "1";
        return r
    }

    function tu(e, r, t) {
        var a = [];
        var n = false;
        ga(e, function i(e, r, s) {
            switch (s) {
                case 63:
                    a.push(e);
                    break;
                default:
                    if (r.T) {} else if (!n || t.WTF) throw new Error("Unexpected record 0x" + s.toString(16));
            }
        });
        return a
    }

    function au() {}

    function nu(e, r, t, a) {
        if (!e) return e;
        var n = a || {};
        var i = false,
            s = false;
        ga(e, function f(e, r, t) {
            if (s) return;
            switch (t) {
                case 359:
                    ;
                case 363:
                    ;
                case 364:
                    ;
                case 366:
                    ;
                case 367:
                    ;
                case 368:
                    ;
                case 369:
                    ;
                case 370:
                    ;
                case 371:
                    ;
                case 472:
                    ;
                case 577:
                    ;
                case 578:
                    ;
                case 579:
                    ;
                case 580:
                    ;
                case 581:
                    ;
                case 582:
                    ;
                case 583:
                    ;
                case 584:
                    ;
                case 585:
                    ;
                case 586:
                    ;
                case 587:
                    break;
                case 35:
                    i = true;
                    break;
                case 36:
                    i = false;
                    break;
                default:
                    if (r.T) {} else if (!i || n.WTF) throw new Error("Unexpected record 0x" + t.toString(16));
            }
        }, n)
    }

    function iu(e, r) {
        if (!e) return "??";
        var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
        return r["!id"][t].Target
    }

    function su(e, r) {
        var t = [21600, 21600];
        var a = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(",");
        var n = [_t("xml", null, {
            "xmlns:v": Nt.v,
            "xmlns:o": Nt.o,
            "xmlns:x": Nt.x,
            "xmlns:mv": Nt.mv
        }).replace(/\/>/, ">"), _t("o:shapelayout", _t("o:idmap", null, {
            "v:ext": "edit",
            data: e
        }), {
            "v:ext": "edit"
        })];
        var i = 65536 * e;
        var s = r || [];
        if (s.length > 0) n.push(_t("v:shapetype", [_t("v:stroke", null, {
            joinstyle: "miter"
        }), _t("v:path", null, {
            gradientshapeok: "t",
            "o:connecttype": "rect"
        })].join(""), {
            id: "_x0000_t202",
            coordsize: t.join(","),
            "o:spt": 202,
            path: a
        }));
        s.forEach(function (e) {
            ++i;
            n.push(fu(e, i))
        });
        n.push("</xml>");
        return n.join("")
    }

    function fu(e, r) {
        var t = Da(e[0]);
        var a = {
            color2: "#BEFF82",
            type: "gradient"
        };
        if (a.type == "gradient") a.angle = "-180";
        var n = a.type == "gradient" ? _t("o:fill", null, {
            type: "gradientUnscaled",
            "v:ext": "view"
        }) : null;
        var i = _t("v:fill", n, a);
        var s = {
            on: "t",
            obscured: "t"
        };
        return ["<v:shape" + St({
            id: "_x0000_s" + r,
            type: "#_x0000_t202",
            style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (e[1].hidden ? ";visibility:hidden" : ""),
            fillcolor: "#ECFAD4",
            strokecolor: "#edeaa1"
        }) + ">", i, _t("v:shadow", null, s), _t("v:path", null, {
            "o:connecttype": "none"
        }), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", yt("x:Anchor", [t.c + 1, 0, t.r + 1, 0, t.c + 3, 20, t.r + 5, 20].join(",")), yt("x:AutoFill", "False"), yt("x:Row", String(t.r)), yt("x:Column", String(t.c)), e[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"].join("")
    }

    function ou(e, r, t, a) {
        var n = Array.isArray(e);
        var i;
        r.forEach(function (r) {
            var s = Da(r.ref);
            if (n) {
                if (!e[s.r]) e[s.r] = [];
                i = e[s.r][s.c]
            } else i = e[r.ref];
            if (!i) {
                i = {
                    t: "z"
                };
                if (n) e[s.r][s.c] = i;
                else e[r.ref] = i;
                var f = Ua(e["!ref"] || "BDWGO1000001:A1");
                if (f.s.r > s.r) f.s.r = s.r;
                if (f.e.r < s.r) f.e.r = s.r;
                if (f.s.c > s.c) f.s.c = s.c;
                if (f.e.c < s.c) f.e.c = s.c;
                var o = Ma(f);
                if (o !== e["!ref"]) e["!ref"] = o
            }
            if (!i.c) i.c = [];
            var c = {
                a: r.author,
                t: r.t,
                r: r.r,
                T: t
            };
            if (r.h) c.h = r.h;
            for (var l = i.c.length - 1; l >= 0; --l) {
                if (!t && i.c[l].T) return;
                if (t && !i.c[l].T) i.c.splice(l, 1)
            }
            if (t && a)
                for (l = 0; l < a.length; ++l) {
                    if (c.a == a[l].id) {
                        c.a = a[l].name || c.a;
                        break
                    }
                }
            i.c.push(c)
        })
    }

    function cu(e, r) {
        if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
        var t = [];
        var a = [];
        var n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
        if (n && n[1]) n[1].split(/<\/\w*:?author>/).forEach(function (e) {
            if (e === "" || e.trim() === "") return;
            var r = e.match(/<(?:\w+:)?author[^>]*>(.*)/);
            if (r) t.push(r[1])
        });
        var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
        if (i && i[1]) i[1].split(/<\/\w*:?comment>/).forEach(function (e) {
            if (e === "" || e.trim() === "") return;
            var n = e.match(/<(?:\w+:)?comment[^>]*>/);
            if (!n) return;
            var i = Kr(n[0]);
            var s = {
                author: i.authorId && t[i.authorId] || "sheetjsghost",
                ref: i.ref,
                guid: i.guid
            };
            var f = Da(i.ref);
            if (r.sheetRows && r.sheetRows <= f.r) return;
            var o = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);
            var c = !!o && !!o[1] && Uo(o[1]) || {
                r: "",
                t: "",
                h: ""
            };
            s.r = c.r;
            if (c.r == "<t></t>") c.t = c.h = "";
            s.t = (c.t || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
            if (r.cellHTML) s.h = c.h;
            a.push(s)
        });
        return a
    }

    function lu(e) {
        var r = [zr, _t("comments", null, {
            xmlns: It[0]
        })];
        var t = [];
        r.push("<authors>");
        e.forEach(function (e) {
            e[1].forEach(function (e) {
                var a = tt(e.a);
                if (t.indexOf(a) == -1) {
                    t.push(a);
                    r.push("<author>" + a + "</author>")
                }
                if (e.T && e.ID && t.indexOf("tc=" + e.ID) == -1) {
                    t.push("tc=" + e.ID);
                    r.push("<author>" + "tc=" + e.ID + "</author>")
                }
            })
        });
        if (t.length == 0) {
            t.push("SheetJ5");
            r.push("<author>SheetJ5</author>")
        }
        r.push("</authors>");
        r.push("<commentList>");
        e.forEach(function (e) {
            var a = 0,
                n = [];
            if (e[1][0] && e[1][0].T && e[1][0].ID) a = t.indexOf("tc=" + e[1][0].ID);
            else e[1].forEach(function (e) {
                if (e.a) a = t.indexOf(tt(e.a));
                n.push(e.t || "")
            });
            r.push('<comment ref="' + e[0] + '" authorId="' + a + '"><text>');
            if (n.length <= 1) r.push(yt("t", tt(n[0] || "")));
            else {
                var i = "Comment:\n    " + n[0] + "\n";
                for (var s = 1; s < n.length; ++s) i += "Reply:\n    " + n[s] + "\n";
                r.push(yt("t", tt(i)))
            }
            r.push("</text></comment>")
        });
        r.push("</commentList>");
        if (r.length > 2) {
            r[r.length] = "</comments>";
            r[1] = r[1].replace("/>", ">")
        }
        return r.join("")
    }

    function uu(e, r) {
        var t = [];
        var a = false,
            n = {},
            i = 0;
        e.replace(Xr, function s(f, o) {
            var c = Kr(f);
            switch (Jr(c[0])) {
                case "<?xml":
                    break;
                case "<ThreadedComments":
                    break;
                case "</ThreadedComments>":
                    break;
                case "<threadedComment":
                    n = {
                        author: c.personId,
                        guid: c.id,
                        ref: c.ref,
                        T: 1
                    };
                    break;
                case "</threadedComment>":
                    if (n.t != null) t.push(n);
                    break;
                case "<text>":
                    ;
                case "<text":
                    i = o + f.length;
                    break;
                case "</text>":
                    n.t = e.slice(i, o).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                    break;
                case "<mentions":
                    ;
                case "<mentions>":
                    a = true;
                    break;
                case "</mentions>":
                    a = false;
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    ;
                case "<extLst/>":
                    break;
                case "<ext":
                    a = true;
                    break;
                case "</ext>":
                    a = false;
                    break;
                default:
                    if (!a && r.WTF) throw new Error("unrecognized " + c[0] + " in threaded comments");
            }
            return f
        });
        return t
    }

    function hu(e, r, t) {
        var a = [zr, _t("ThreadedComments", null, {
            xmlns: Ot.TCMNT
        }).replace(/[\/]>/, ">")];
        e.forEach(function (e) {
            var n = "";
            (e[1] || []).forEach(function (i, s) {
                if (!i.T) {
                    delete i.ID;
                    return
                }
                if (i.a && r.indexOf(i.a) == -1) r.push(i.a);
                var f = {
                    ref: e[0],
                    id: "{54EE7951-7262-4200-6969-" + ("000000000000" + t.tcid++).slice(-12) + "}"
                };
                if (s == 0) n = f.id;
                else f.parentId = n;
                i.ID = f.id;
                if (i.a) f.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + r.indexOf(i.a)).slice(-12) + "}";
                a.push(_t("threadedComment", yt("text", i.t || ""), f))
            })
        });
        a.push("</ThreadedComments>");
        return a.join("")
    }

    function du(e, r) {
        var t = [];
        var a = false;
        e.replace(Xr, function n(e) {
            var n = Kr(e);
            switch (Jr(n[0])) {
                case "<?xml":
                    break;
                case "<personList":
                    break;
                case "</personList>":
                    break;
                case "<person":
                    t.push({
                        name: n.displayname,
                        id: n.id
                    });
                    break;
                case "</person>":
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    ;
                case "<extLst/>":
                    break;
                case "<ext":
                    a = true;
                    break;
                case "</ext>":
                    a = false;
                    break;
                default:
                    if (!a && r.WTF) throw new Error("unrecognized " + n[0] + " in threaded comments");
            }
            return e
        });
        return t
    }

    function vu(e) {
        var r = [zr, _t("personList", null, {
            xmlns: Ot.TCMNT,
            "xmlns:x": It[0]
        }).replace(/[\/]>/, ">")];
        e.forEach(function (e, t) {
            r.push(_t("person", null, {
                displayName: e,
                id: "{54EE7950-7262-4200-6969-" + ("000000000000" + t).slice(-12) + "}",
                userId: e,
                providerId: "None"
            }))
        });
        r.push("</personList>");
        return r.join("")
    }

    function pu(e) {
        var r = {};
        r.iauthor = e._R(4);
        var t = mn(e, 16);
        r.rfx = t.s;
        r.ref = Pa(t.s);
        e.l += 16;
        return r
    }

    function mu(e, r) {
        if (r == null) r = ba(36);
        r._W(4, e[1].iauthor);
        bn(e[0], r);
        r._W(4, 0);
        r._W(4, 0);
        r._W(4, 0);
        r._W(4, 0);
        return r
    }
    var bu = Xa;

    function gu(e) {
        return $a(e.slice(0, 54))
    }

    function wu(e, r) {
        var t = [];
        var a = [];
        var n = {};
        var i = false;
        ga(e, function s(e, f, o) {
            switch (o) {
                case 632:
                    a.push(e);
                    break;
                case 635:
                    n = e;
                    break;
                case 637:
                    n.t = e.t;
                    n.h = e.h;
                    n.r = e.r;
                    break;
                case 636:
                    n.author = a[n.iauthor];
                    delete n.iauthor;
                    if (r.sheetRows && n.rfx && r.sheetRows <= n.rfx.r) break;
                    if (!n.t) n.t = "";
                    delete n.rfx;
                    t.push(n);
                    break;
                case 3072:
                    break;
                case 35:
                    i = true;
                    break;
                case 36:
                    i = false;
                    break;
                case 37:
                    break;
                case 38:
                    break;
                default:
                    if (f.T) {} else if (!i || r.WTF) throw new Error("Unexpected record 0x" + o.toString(16));
            }
        });
        return t
    }

    function ku(e) {
        var r = wa();
        var t = [];
        ka(r, 628);
        ka(r, 630);
        e.forEach(function (e) {
            e[1].forEach(function (e) {
                if (t.indexOf(e.a) > -1) return;
                t.push(e.a.slice(0, 54));
                ka(r, 632, gu(e.a))
            })
        });
        ka(r, 631);
        ka(r, 633);
        e.forEach(function (e) {
            e[1].forEach(function (a) {
                a.iauthor = t.indexOf(a.a);
                var n = {
                    s: Da(e[0]),
                    e: Da(e[0])
                };
                ka(r, 635, mu([n, a]));
                if (a.t && a.t.length > 0) ka(r, 637, Qa(a));
                ka(r, 636);
                delete a.iauthor
            })
        });
        ka(r, 634);
        ka(r, 629);
        return r.end()
    }
    var Tu = "application/vnd.ms-office.vbaProject";

    function Eu(e) {
        var r = Ze.utils.cfb_new({
            root: "R"
        });
        e.FullPaths.forEach(function (t, a) {
            if (t.slice(-1) === "/" || !t.match(/_VBA_PROJECT_CUR/)) return;
            var n = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
            Ze.utils.cfb_add(r, n, e.FileIndex[a].content)
        });
        return Ze.write(r)
    }

    function yu(e, r) {
        r.FullPaths.forEach(function (t, a) {
            if (a == 0) return;
            var n = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
            if (n.slice(-1) !== "/") Ze.utils.cfb_add(e, n, r.FileIndex[a].content)
        })
    }
    var Su = ["xlsb", "xlsm", "xlam", "biff8", "xla"];

    function _u() {
        return {
            "!type": "dialog"
        }
    }

    function Au() {
        return {
            "!type": "dialog"
        }
    }

    function xu() {
        return {
            "!type": "macro"
        }
    }

    function Cu() {
        return {
            "!type": "macro"
        }
    }
    var Ru = function () {
        var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g;
        var r = {
            r: 0,
            c: 0
        };

        function t(e, t, a, n) {
            var i = false,
                s = false;
            if (a.length == 0) s = true;
            else if (a.charAt(0) == "[") {
                s = true;
                a = a.slice(1, -1)
            }
            if (n.length == 0) i = true;
            else if (n.charAt(0) == "[") {
                i = true;
                n = n.slice(1, -1)
            }
            var f = a.length > 0 ? parseInt(a, 10) | 0 : 0,
                o = n.length > 0 ? parseInt(n, 10) | 0 : 0;
            if (i) o += r.c;
            else --o;
            if (s) f += r.r;
            else --f;
            return t + (i ? "" : "$") + Oa(o) + (s ? "" : "$") + Aa(f)
        }
        return function a(n, i) {
            r = i;
            return n.replace(e, t)
        }
    }();
    var Ou = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;
    var Iu = function () {
        return function e(r, t) {
            return r.replace(Ou, function (e, r, a, n, i, s) {
                var f = Ra(n) - (a ? 0 : t.c);
                var o = _a(s) - (i ? 0 : t.r);
                var c = o == 0 ? "" : !i ? "[" + o + "]" : o + 1;
                var l = f == 0 ? "" : !a ? "[" + f + "]" : f + 1;
                return r + "R" + c + "C" + l
            })
        }
    }();

    function Nu(e, r) {
        return e.replace(Ou, function (e, t, a, n, i, s) {
            return t + (a == "$" ? a + n : Oa(Ra(n) + r.c)) + (i == "$" ? i + s : Aa(_a(s) + r.r))
        })
    }

    function Fu(e, r, t) {
        var a = La(r),
            n = a.s,
            i = Da(t);
        var s = {
            r: i.r - n.r,
            c: i.c - n.c
        };
        return Nu(e, s)
    }

    function Du(e) {
        if (e.length == 1) return false;
        return true
    }

    function Pu(e) {
        return e.replace(/_xlfn\./g, "")
    }

    function Lu(e) {
        e.l += 1;
        return
    }

    function Mu(e, r) {
        var t = e._R(r == 1 ? 1 : 2);
        return [t & 16383, t >> 14 & 1, t >> 15 & 1]
    }

    function Uu(e, r, t) {
        var a = 2;
        if (t) {
            if (t.biff >= 2 && t.biff <= 5) return Bu(e, r, t);
            else if (t.biff == 12) a = 4
        }
        var n = e._R(a),
            i = e._R(a);
        var s = Mu(e, 2);
        var f = Mu(e, 2);
        return {
            s: {
                r: n,
                c: s[0],
                cRel: s[1],
                rRel: s[2]
            },
            e: {
                r: i,
                c: f[0],
                cRel: f[1],
                rRel: f[2]
            }
        }
    }

    function Bu(e) {
        var r = Mu(e, 2),
            t = Mu(e, 2);
        var a = e._R(1);
        var n = e._R(1);
        return {
            s: {
                r: r[0],
                c: a,
                cRel: r[1],
                rRel: r[2]
            },
            e: {
                r: t[0],
                c: n,
                cRel: t[1],
                rRel: t[2]
            }
        }
    }

    function Wu(e, r, t) {
        if (t.biff < 8) return Bu(e, r, t);
        var a = e._R(t.biff == 12 ? 4 : 2),
            n = e._R(t.biff == 12 ? 4 : 2);
        var i = Mu(e, 2);
        var s = Mu(e, 2);
        return {
            s: {
                r: a,
                c: i[0],
                cRel: i[1],
                rRel: i[2]
            },
            e: {
                r: n,
                c: s[0],
                cRel: s[1],
                rRel: s[2]
            }
        }
    }

    function Hu(e, r, t) {
        if (t && t.biff >= 2 && t.biff <= 5) return zu(e, r, t);
        var a = e._R(t && t.biff == 12 ? 4 : 2);
        var n = Mu(e, 2);
        return {
            r: a,
            c: n[0],
            cRel: n[1],
            rRel: n[2]
        }
    }

    function zu(e) {
        var r = Mu(e, 2);
        var t = e._R(1);
        return {
            r: r[0],
            c: t,
            cRel: r[1],
            rRel: r[2]
        }
    }

    function Vu(e) {
        var r = e._R(2);
        var t = e._R(2);
        return {
            r: r,
            c: t & 255,
            fQuoted: !!(t & 16384),
            cRel: t >> 15,
            rRel: t >> 15
        }
    }

    function Gu(e, r, t) {
        var a = t && t.biff ? t.biff : 8;
        if (a >= 2 && a <= 5) return ju(e, r, t);
        var n = e._R(a >= 12 ? 4 : 2);
        var i = e._R(2);
        var s = (i & 16384) >> 14,
            f = (i & 32768) >> 15;
        i &= 16383;
        if (f == 1)
            while (n > 524287) n -= 1048576;
        if (s == 1)
            while (i > 8191) i = i - 16384;
        return {
            r: n,
            c: i,
            cRel: s,
            rRel: f
        }
    }

    function ju(e) {
        var r = e._R(2);
        var t = e._R(1);
        var a = (r & 32768) >> 15,
            n = (r & 16384) >> 14;
        r &= 16383;
        if (a == 1 && r >= 8192) r = r - 16384;
        if (n == 1 && t >= 128) t = t - 256;
        return {
            r: r,
            c: t,
            cRel: n,
            rRel: a
        }
    }

    function Xu(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        var n = Uu(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
        return [a, n]
    }

    function $u(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        var n = e._R(2, "i");
        var i = 8;
        if (t) switch (t.biff) {
            case 5:
                e.l += 12;
                i = 6;
                break;
            case 12:
                i = 12;
                break;
        }
        var s = Uu(e, i, t);
        return [a, n, s]
    }

    function Yu(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8;
        return [a]
    }

    function Ku(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        var n = e._R(2);
        var i = 8;
        if (t) switch (t.biff) {
            case 5:
                e.l += 12;
                i = 6;
                break;
            case 12:
                i = 12;
                break;
        }
        e.l += i;
        return [a, n]
    }

    function Ju(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        var n = Wu(e, r - 1, t);
        return [a, n]
    }

    function qu(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7;
        return [a]
    }

    function Zu(e) {
        var r = e[e.l + 1] & 1;
        var t = 1;
        e.l += 4;
        return [r, t]
    }

    function Qu(e, r, t) {
        e.l += 2;
        var a = e._R(t && t.biff == 2 ? 1 : 2);
        var n = [];
        for (var i = 0; i <= a; ++i) n.push(e._R(t && t.biff == 2 ? 1 : 2));
        return n
    }

    function eh(e, r, t) {
        var a = e[e.l + 1] & 255 ? 1 : 0;
        e.l += 2;
        return [a, e._R(t && t.biff == 2 ? 1 : 2)]
    }

    function rh(e, r, t) {
        var a = e[e.l + 1] & 255 ? 1 : 0;
        e.l += 2;
        return [a, e._R(t && t.biff == 2 ? 1 : 2)]
    }

    function th(e) {
        var r = e[e.l + 1] & 255 ? 1 : 0;
        e.l += 2;
        return [r, e._R(2)]
    }

    function ah(e, r, t) {
        var a = e[e.l + 1] & 255 ? 1 : 0;
        e.l += t && t.biff == 2 ? 3 : 4;
        return [a]
    }

    function nh(e) {
        var r = e._R(1),
            t = e._R(1);
        return [r, t]
    }

    function ih(e) {
        e._R(2);
        return nh(e, 2)
    }

    function sh(e) {
        e._R(2);
        return nh(e, 2)
    }

    function fh(e, r, t) {
        var a = (e[e.l] & 96) >> 5;
        e.l += 1;
        var n = Hu(e, 0, t);
        return [a, n]
    }

    function oh(e, r, t) {
        var a = (e[e.l] & 96) >> 5;
        e.l += 1;
        var n = Gu(e, 0, t);
        return [a, n]
    }

    function ch(e, r, t) {
        var a = (e[e.l] & 96) >> 5;
        e.l += 1;
        var n = e._R(2);
        if (t && t.biff == 5) e.l += 12;
        var i = Hu(e, 0, t);
        return [a, n, i]
    }

    function lh(e, r, t) {
        var a = (e[e.l] & 96) >> 5;
        e.l += 1;
        var n = e._R(t && t.biff <= 3 ? 1 : 2);
        return [Ad[n], _d[n], a]
    }

    function uh(e, r, t) {
        var a = e[e.l++];
        var n = e._R(1),
            i = t && t.biff <= 3 ? [a == 88 ? -1 : 0, e._R(1)] : hh(e);
        return [n, (i[0] === 0 ? _d : Sd)[i[1]]]
    }

    function hh(e) {
        return [e[e.l + 1] >> 7, e._R(2) & 32767]
    }

    function dh(e, r, t) {
        e.l += t && t.biff == 2 ? 3 : 4;
        return
    }

    function vh(e, r, t) {
        e.l++;
        if (t && t.biff == 12) return [e._R(4, "i"), 0];
        var a = e._R(2);
        var n = e._R(t && t.biff == 2 ? 1 : 2);
        return [a, n]
    }

    function ph(e) {
        e.l++;
        return $n[e._R(1)]
    }

    function mh(e) {
        e.l++;
        return e._R(2)
    }

    function bh(e) {
        e.l++;
        return e._R(1) !== 0
    }

    function gh(e) {
        e.l++;
        return gn(e, 8)
    }

    function wh(e, r, t) {
        e.l++;
        return os(e, r - 1, t)
    }

    function kh(e, r) {
        var t = [e._R(1)];
        if (r == 12) switch (t[0]) {
            case 2:
                t[0] = 4;
                break;
            case 4:
                t[0] = 16;
                break;
            case 0:
                t[0] = 1;
                break;
            case 1:
                t[0] = 2;
                break;
        }
        switch (t[0]) {
            case 4:
                t[1] = rs(e, 1) ? "TRUE" : "FALSE";
                if (r != 12) e.l += 7;
                break;
            case 37:
                ;
            case 16:
                t[1] = $n[e[e.l]];
                e.l += r == 12 ? 4 : 8;
                break;
            case 0:
                e.l += 8;
                break;
            case 1:
                t[1] = gn(e, 8);
                break;
            case 2:
                t[1] = ds(e, 0, {
                    biff: r > 0 && r < 8 ? 2 : r
                });
                break;
            default:
                throw new Error("Bad SerAr: " + t[0]);
        }
        return t
    }

    function Th(e, r, t) {
        var a = e._R(t.biff == 12 ? 4 : 2);
        var n = [];
        for (var i = 0; i != a; ++i) n.push((t.biff == 12 ? mn : Ns)(e, 8));
        return n
    }

    function Eh(e, r, t) {
        var a = 0,
            n = 0;
        if (t.biff == 12) {
            a = e._R(4);
            n = e._R(4)
        } else {
            n = 1 + e._R(1);
            a = 1 + e._R(2)
        }
        if (t.biff >= 2 && t.biff < 8) {
            --a;
            if (--n == 0) n = 256
        }
        for (var i = 0, s = []; i != a && (s[i] = []); ++i)
            for (var f = 0; f != n; ++f) s[i][f] = kh(e, t.biff);
        return s
    }

    function yh(e, r, t) {
        var a = e._R(1) >>> 5 & 3;
        var n = !t || t.biff >= 8 ? 4 : 2;
        var i = e._R(n);
        switch (t.biff) {
            case 2:
                e.l += 5;
                break;
            case 3:
                ;
            case 4:
                e.l += 8;
                break;
            case 5:
                e.l += 12;
                break;
        }
        return [a, 0, i]
    }

    function Sh(e, r, t) {
        if (t.biff == 5) return _h(e, r, t);
        var a = e._R(1) >>> 5 & 3;
        var n = e._R(2);
        var i = e._R(4);
        return [a, n, i]
    }

    function _h(e) {
        var r = e._R(1) >>> 5 & 3;
        var t = e._R(2, "i");
        e.l += 8;
        var a = e._R(2);
        e.l += 12;
        return [r, t, a]
    }

    function Ah(e, r, t) {
        var a = e._R(1) >>> 5 & 3;
        e.l += t && t.biff == 2 ? 3 : 4;
        var n = e._R(t && t.biff == 2 ? 1 : 2);
        return [a, n]
    }

    function xh(e, r, t) {
        var a = e._R(1) >>> 5 & 3;
        var n = e._R(t && t.biff == 2 ? 1 : 2);
        return [a, n]
    }

    function Ch(e, r, t) {
        var a = e._R(1) >>> 5 & 3;
        e.l += 4;
        if (t.biff < 8) e.l--;
        if (t.biff == 12) e.l += 2;
        return [a]
    }

    function Rh(e, r, t) {
        var a = (e[e.l++] & 96) >> 5;
        var n = e._R(2);
        var i = 4;
        if (t) switch (t.biff) {
            case 5:
                i = 15;
                break;
            case 12:
                i = 6;
                break;
        }
        e.l += i;
        return [a, n]
    }
    var Oh = ma;
    var Ih = ma;
    var Nh = ma;

    function Fh(e, r, t) {
        e.l += 2;
        return [Vu(e, 4, t)]
    }

    function Dh(e) {
        e.l += 6;
        return []
    }
    var Ph = Fh;
    var Lh = Dh;
    var Mh = Dh;
    var Uh = Fh;

    function Bh(e) {
        e.l += 2;
        return [as(e), e._R(2) & 1]
    }
    var Wh = Fh;
    var Hh = Bh;
    var zh = Dh;
    var Vh = Fh;
    var Gh = Fh;
    var jh = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??", "?DataTotals", "??", "??", "??", "?Current"];

    function Xh(e) {
        e.l += 2;
        var r = e._R(2);
        var t = e._R(2);
        var a = e._R(4);
        var n = e._R(2);
        var i = e._R(2);
        var s = jh[t >> 2 & 31];
        return {
            ixti: r,
            coltype: t & 3,
            rt: s,
            idx: a,
            c: n,
            C: i
        }
    }

    function $h(e) {
        e.l += 2;
        return [e._R(4)]
    }

    function Yh(e, r, t) {
        e.l += 5;
        e.l += 2;
        e.l += t.biff == 2 ? 1 : 4;
        return ["PTGSHEET"]
    }

    function Kh(e, r, t) {
        e.l += t.biff == 2 ? 4 : 5;
        return ["PTGENDSHEET"]
    }

    function Jh(e) {
        var r = e._R(1) >>> 5 & 3;
        var t = e._R(2);
        return [r, t]
    }

    function qh(e) {
        var r = e._R(1) >>> 5 & 3;
        var t = e._R(2);
        return [r, t]
    }

    function Zh(e) {
        e.l += 4;
        return [0, 0]
    }
    var Qh = {
        1: {
            n: "PtgExp",
            f: vh
        },
        2: {
            n: "PtgTbl",
            f: Nh
        },
        3: {
            n: "PtgAdd",
            f: Lu
        },
        4: {
            n: "PtgSub",
            f: Lu
        },
        5: {
            n: "PtgMul",
            f: Lu
        },
        6: {
            n: "PtgDiv",
            f: Lu
        },
        7: {
            n: "PtgPower",
            f: Lu
        },
        8: {
            n: "PtgConcat",
            f: Lu
        },
        9: {
            n: "PtgLt",
            f: Lu
        },
        10: {
            n: "PtgLe",
            f: Lu
        },
        11: {
            n: "PtgEq",
            f: Lu
        },
        12: {
            n: "PtgGe",
            f: Lu
        },
        13: {
            n: "PtgGt",
            f: Lu
        },
        14: {
            n: "PtgNe",
            f: Lu
        },
        15: {
            n: "PtgIsect",
            f: Lu
        },
        16: {
            n: "PtgUnion",
            f: Lu
        },
        17: {
            n: "PtgRange",
            f: Lu
        },
        18: {
            n: "PtgUplus",
            f: Lu
        },
        19: {
            n: "PtgUminus",
            f: Lu
        },
        20: {
            n: "PtgPercent",
            f: Lu
        },
        21: {
            n: "PtgParen",
            f: Lu
        },
        22: {
            n: "PtgMissArg",
            f: Lu
        },
        23: {
            n: "PtgStr",
            f: wh
        },
        26: {
            n: "PtgSheet",
            f: Yh
        },
        27: {
            n: "PtgEndSheet",
            f: Kh
        },
        28: {
            n: "PtgErr",
            f: ph
        },
        29: {
            n: "PtgBool",
            f: bh
        },
        30: {
            n: "PtgInt",
            f: mh
        },
        31: {
            n: "PtgNum",
            f: gh
        },
        32: {
            n: "PtgArray",
            f: qu
        },
        33: {
            n: "PtgFunc",
            f: lh
        },
        34: {
            n: "PtgFuncVar",
            f: uh
        },
        35: {
            n: "PtgName",
            f: yh
        },
        36: {
            n: "PtgRef",
            f: fh
        },
        37: {
            n: "PtgArea",
            f: Xu
        },
        38: {
            n: "PtgMemArea",
            f: Ah
        },
        39: {
            n: "PtgMemErr",
            f: Oh
        },
        40: {
            n: "PtgMemNoMem",
            f: Ih
        },
        41: {
            n: "PtgMemFunc",
            f: xh
        },
        42: {
            n: "PtgRefErr",
            f: Ch
        },
        43: {
            n: "PtgAreaErr",
            f: Yu
        },
        44: {
            n: "PtgRefN",
            f: oh
        },
        45: {
            n: "PtgAreaN",
            f: Ju
        },
        46: {
            n: "PtgMemAreaN",
            f: Jh
        },
        47: {
            n: "PtgMemNoMemN",
            f: qh
        },
        57: {
            n: "PtgNameX",
            f: Sh
        },
        58: {
            n: "PtgRef3d",
            f: ch
        },
        59: {
            n: "PtgArea3d",
            f: $u
        },
        60: {
            n: "PtgRefErr3d",
            f: Rh
        },
        61: {
            n: "PtgAreaErr3d",
            f: Ku
        },
        255: {}
    };
    var ed = {
        64: 32,
        96: 32,
        65: 33,
        97: 33,
        66: 34,
        98: 34,
        67: 35,
        99: 35,
        68: 36,
        100: 36,
        69: 37,
        101: 37,
        70: 38,
        102: 38,
        71: 39,
        103: 39,
        72: 40,
        104: 40,
        73: 41,
        105: 41,
        74: 42,
        106: 42,
        75: 43,
        107: 43,
        76: 44,
        108: 44,
        77: 45,
        109: 45,
        78: 46,
        110: 46,
        79: 47,
        111: 47,
        88: 34,
        120: 34,
        89: 57,
        121: 57,
        90: 58,
        122: 58,
        91: 59,
        123: 59,
        92: 60,
        124: 60,
        93: 61,
        125: 61
    };
    var rd = {
        1: {
            n: "PtgElfLel",
            f: Bh
        },
        2: {
            n: "PtgElfRw",
            f: Vh
        },
        3: {
            n: "PtgElfCol",
            f: Ph
        },
        6: {
            n: "PtgElfRwV",
            f: Gh
        },
        7: {
            n: "PtgElfColV",
            f: Uh
        },
        10: {
            n: "PtgElfRadical",
            f: Wh
        },
        11: {
            n: "PtgElfRadicalS",
            f: zh
        },
        13: {
            n: "PtgElfColS",
            f: Lh
        },
        15: {
            n: "PtgElfColSV",
            f: Mh
        },
        16: {
            n: "PtgElfRadicalLel",
            f: Hh
        },
        25: {
            n: "PtgList",
            f: Xh
        },
        29: {
            n: "PtgSxName",
            f: $h
        },
        255: {}
    };
    var td = {
        0: {
            n: "PtgAttrNoop",
            f: Zh
        },
        1: {
            n: "PtgAttrSemi",
            f: ah
        },
        2: {
            n: "PtgAttrIf",
            f: rh
        },
        4: {
            n: "PtgAttrChoose",
            f: Qu
        },
        8: {
            n: "PtgAttrGoto",
            f: eh
        },
        16: {
            n: "PtgAttrSum",
            f: dh
        },
        32: {
            n: "PtgAttrBaxcel",
            f: Zu
        },
        33: {
            n: "PtgAttrBaxcel",
            f: Zu
        },
        64: {
            n: "PtgAttrSpace",
            f: ih
        },
        65: {
            n: "PtgAttrSpaceSemi",
            f: sh
        },
        128: {
            n: "PtgAttrIfError",
            f: th
        },
        255: {}
    };

    function ad(e, r, t, a) {
        if (a.biff < 8) return ma(e, r);
        var n = e.l + r;
        var i = [];
        for (var s = 0; s !== t.length; ++s) {
            switch (t[s][0]) {
                case "PtgArray":
                    t[s][1] = Eh(e, 0, a);
                    i.push(t[s][1]);
                    break;
                case "PtgMemArea":
                    t[s][2] = Th(e, t[s][1], a);
                    i.push(t[s][2]);
                    break;
                case "PtgExp":
                    if (a && a.biff == 12) {
                        t[s][1][1] = e._R(4);
                        i.push(t[s][1])
                    }
                    break;
                case "PtgList":
                    ;
                case "PtgElfRadicalS":
                    ;
                case "PtgElfColS":
                    ;
                case "PtgElfColSV":
                    throw "Unsupported " + t[s][0];
                default:
                    break;
            }
        }
        r = n - e.l;
        if (r !== 0) i.push(ma(e, r));
        return i
    }

    function nd(e, r, t) {
        var a = e.l + r;
        var n, i, s = [];
        while (a != e.l) {
            r = a - e.l;
            i = e[e.l];
            n = Qh[i] || Qh[ed[i]];
            if (i === 24 || i === 25) n = (i === 24 ? rd : td)[e[e.l + 1]];
            if (!n || !n.f) {
                ma(e, r)
            } else {
                s.push([n.n, n.f(e, r, t)])
            }
        }
        return s
    }

    function id(e) {
        var r = [];
        for (var t = 0; t < e.length; ++t) {
            var a = e[t],
                n = [];
            for (var i = 0; i < a.length; ++i) {
                var s = a[i];
                if (s) switch (s[0]) {
                    case 2:
                        n.push('"' + s[1].replace(/"/g, '""') + '"');
                        break;
                    default:
                        n.push(s[1]);
                } else n.push("")
            }
            r.push(n.join(","))
        }
        return r.join(";")
    }
    var sd = {
        PtgAdd: "+",
        PtgConcat: "&",
        PtgDiv: "/",
        PtgEq: "=",
        PtgGe: ">=",
        PtgGt: ">",
        PtgLe: "<=",
        PtgLt: "<",
        PtgMul: "*",
        PtgNe: "<>",
        PtgPower: "^",
        PtgSub: "-"
    };

    function fd(e, r) {
        if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
        if (/[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e)) return "'" + e + "'";
        return e
    }

    function od(e, r, t) {
        if (!e) return "SH33TJSERR0";
        if (t.biff > 8 && (!e.XTI || !e.XTI[r])) return e.SheetNames[r];
        if (!e.XTI) return "SH33TJSERR6";
        var a = e.XTI[r];
        if (t.biff < 8) {
            if (r > 1e4) r -= 65536;
            if (r < 0) r = -r;
            return r == 0 ? "" : e.XTI[r - 1]
        }
        if (!a) return "SH33TJSERR1";
        var n = "";
        if (t.biff > 8) switch (e[a[0]][0]) {
            case 357:
                n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]];
                return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
            case 358:
                if (t.SID != null) return e.SheetNames[t.SID];
                return "SH33TJSSAME" + e[a[0]][0];
            case 355:
                ;
            default:
                return "SH33TJSSRC" + e[a[0]][0];
        }
        switch (e[a[0]][0][0]) {
            case 1025:
                n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3";
                return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
            case 14849:
                return e[a[0]].slice(1).map(function (e) {
                    return e.Name
                }).join(";;");
            default:
                if (!e[a[0]][0][3]) return "SH33TJSERR2";
                n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4";
                return a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]];
        }
    }

    function cd(e, r, t) {
        var a = od(e, r, t);
        return a == "#REF" ? a : fd(a, t)
    }

    function ld(e, r, t, a, n) {
        var i = n && n.biff || 8;
        var s = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: 0,
                r: 0
            }
        };
        var f = [],
            o, c, l, u = 0,
            h = 0,
            d, v = "";
        if (!e[0] || !e[0][0]) return "";
        var p = -1,
            m = "";
        for (var b = 0, g = e[0].length; b < g; ++b) {
            var w = e[0][b];
            switch (w[0]) {
                case "PtgUminus":
                    f.push("-" + f.pop());
                    break;
                case "PtgUplus":
                    f.push("+" + f.pop());
                    break;
                case "PtgPercent":
                    f.push(f.pop() + "%");
                    break;
                case "PtgAdd":
                    ;
                case "PtgConcat":
                    ;
                case "PtgDiv":
                    ;
                case "PtgEq":
                    ;
                case "PtgGe":
                    ;
                case "PtgGt":
                    ;
                case "PtgLe":
                    ;
                case "PtgLt":
                    ;
                case "PtgMul":
                    ;
                case "PtgNe":
                    ;
                case "PtgPower":
                    ;
                case "PtgSub":
                    o = f.pop();
                    c = f.pop();
                    if (p >= 0) {
                        switch (e[0][p][1][0]) {
                            case 0:
                                m = Er(" ", e[0][p][1][1]);
                                break;
                            case 1:
                                m = Er("\r", e[0][p][1][1]);
                                break;
                            default:
                                m = "";
                                if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]);
                        }
                        c = c + m;
                        p = -1
                    }
                    f.push(c + sd[w[0]] + o);
                    break;
                case "PtgIsect":
                    o = f.pop();
                    c = f.pop();
                    f.push(c + " " + o);
                    break;
                case "PtgUnion":
                    o = f.pop();
                    c = f.pop();
                    f.push(c + "," + o);
                    break;
                case "PtgRange":
                    o = f.pop();
                    c = f.pop();
                    f.push(c + ":" + o);
                    break;
                case "PtgAttrChoose":
                    break;
                case "PtgAttrGoto":
                    break;
                case "PtgAttrIf":
                    break;
                case "PtgAttrIfError":
                    break;
                case "PtgRef":
                    l = Ta(w[1][1], s, n);
                    f.push(ya(l, i));
                    break;
                case "PtgRefN":
                    l = t ? Ta(w[1][1], t, n) : w[1][1];
                    f.push(ya(l, i));
                    break;
                case "PtgRef3d":
                    u = w[1][1];
                    l = Ta(w[1][2], s, n);
                    v = cd(a, u, n);
                    var k = v;
                    f.push(v + "!" + ya(l, i));
                    break;
                case "PtgFunc":
                    ;
                case "PtgFuncVar":
                    var T = w[1][0],
                        E = w[1][1];
                    if (!T) T = 0;
                    T &= 127;
                    var y = T == 0 ? [] : f.slice(-T);
                    f.length -= T;
                    if (E === "User") E = y.shift();
                    f.push(E + "(" + y.join(",") + ")");
                    break;
                case "PtgBool":
                    f.push(w[1] ? "TRUE" : "FALSE");
                    break;
                case "PtgInt":
                    f.push(w[1]);
                    break;
                case "PtgNum":
                    f.push(String(w[1]));
                    break;
                case "PtgStr":
                    f.push('"' + w[1].replace(/"/g, '""') + '"');
                    break;
                case "PtgErr":
                    f.push(w[1]);
                    break;
                case "PtgAreaN":
                    d = Ea(w[1][1], t ? {
                        s: t
                    } : s, n);
                    f.push(Sa(d, n));
                    break;
                case "PtgArea":
                    d = Ea(w[1][1], s, n);
                    f.push(Sa(d, n));
                    break;
                case "PtgArea3d":
                    u = w[1][1];
                    d = w[1][2];
                    v = cd(a, u, n);
                    f.push(v + "!" + Sa(d, n));
                    break;
                case "PtgAttrSum":
                    f.push("SUM(" + f.pop() + ")");
                    break;
                case "PtgAttrBaxcel":
                    ;
                case "PtgAttrSemi":
                    break;
                case "PtgName":
                    h = w[1][2];
                    var S = (a.names || [])[h - 1] || (a[0] || [])[h];
                    var _ = S ? S.Name : "SH33TJSNAME" + String(h);
                    if (_ && _.slice(0, 6) == "_xlfn." && !n.xlfn) _ = _.slice(6);
                    f.push(_);
                    break;
                case "PtgNameX":
                    var A = w[1][1];
                    h = w[1][2];
                    var x;
                    if (n.biff <= 5) {
                        if (A < 0) A = -A;
                        if (a[A]) x = a[A][h]
                    } else {
                        var C = "";
                        if (((a[A] || [])[0] || [])[0] == 14849) {} else if (((a[A] || [])[0] || [])[0] == 1025) {
                            if (a[A][h] && a[A][h].itab > 0) {
                                C = a.SheetNames[a[A][h].itab - 1] + "!"
                            }
                        } else C = a.SheetNames[h - 1] + "!";
                        if (a[A] && a[A][h]) C += a[A][h].Name;
                        else if (a[0] && a[0][h]) C += a[0][h].Name;
                        else {
                            var R = (od(a, A, n) || "").split(";;");
                            if (R[h - 1]) C = R[h - 1];
                            else C += "SH33TJSERRX"
                        }
                        f.push(C);
                        break
                    }
                    if (!x) x = {
                        Name: "SH33TJSERRY"
                    };
                    f.push(x.Name);
                    break;
                case "PtgParen":
                    var O = "(",
                        I = ")";
                    if (p >= 0) {
                        m = "";
                        switch (e[0][p][1][0]) {
                            case 2:
                                O = Er(" ", e[0][p][1][1]) + O;
                                break;
                            case 3:
                                O = Er("\r", e[0][p][1][1]) + O;
                                break;
                            case 4:
                                I = Er(" ", e[0][p][1][1]) + I;
                                break;
                            case 5:
                                I = Er("\r", e[0][p][1][1]) + I;
                                break;
                            default:
                                if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]);
                        }
                        p = -1
                    }
                    f.push(O + f.pop() + I);
                    break;
                case "PtgRefErr":
                    f.push("#REF!");
                    break;
                case "PtgRefErr3d":
                    f.push("#REF!");
                    break;
                case "PtgExp":
                    l = {
                        c: w[1][1],
                        r: w[1][0]
                    };
                    var N = {
                        c: t.c,
                        r: t.r
                    };
                    if (a.sharedf[Pa(l)]) {
                        var F = a.sharedf[Pa(l)];
                        f.push(ld(F, s, N, a, n))
                    } else {
                        var D = false;
                        for (o = 0; o != a.arrayf.length; ++o) {
                            c = a.arrayf[o];
                            if (l.c < c[0].s.c || l.c > c[0].e.c) continue;
                            if (l.r < c[0].s.r || l.r > c[0].e.r) continue;
                            f.push(ld(c[1], s, N, a, n));
                            D = true;
                            break
                        }
                        if (!D) f.push(w[1])
                    }
                    break;
                case "PtgArray":
                    f.push("{" + id(w[1]) + "}");
                    break;
                case "PtgMemArea":
                    break;
                case "PtgAttrSpace":
                    ;
                case "PtgAttrSpaceSemi":
                    p = b;
                    break;
                case "PtgTbl":
                    break;
                case "PtgMemErr":
                    break;
                case "PtgMissArg":
                    f.push("");
                    break;
                case "PtgAreaErr":
                    f.push("#REF!");
                    break;
                case "PtgAreaErr3d":
                    f.push("#REF!");
                    break;
                case "PtgList":
                    f.push("Table" + w[1].idx + "[#" + w[1].rt + "]");
                    break;
                case "PtgMemAreaN":
                    ;
                case "PtgMemNoMemN":
                    ;
                case "PtgAttrNoop":
                    ;
                case "PtgSheet":
                    ;
                case "PtgEndSheet":
                    break;
                case "PtgMemFunc":
                    break;
                case "PtgMemNoMem":
                    break;
                case "PtgElfCol":
                    ;
                case "PtgElfColS":
                    ;
                case "PtgElfColSV":
                    ;
                case "PtgElfColV":
                    ;
                case "PtgElfLel":
                    ;
                case "PtgElfRadical":
                    ;
                case "PtgElfRadicalLel":
                    ;
                case "PtgElfRadicalS":
                    ;
                case "PtgElfRw":
                    ;
                case "PtgElfRwV":
                    throw new Error("Unsupported ELFs");
                case "PtgSxName":
                    throw new Error("Unrecognized Formula Token: " + String(w));
                default:
                    throw new Error("Unrecognized Formula Token: " + String(w));
            }
            var P = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
            if (n.biff != 3)
                if (p >= 0 && P.indexOf(e[0][b][0]) == -1) {
                    w = e[0][p];
                    var L = true;
                    switch (w[1][0]) {
                        case 4:
                            L = false;
                        case 0:
                            m = Er(" ", w[1][1]);
                            break;
                        case 5:
                            L = false;
                        case 1:
                            m = Er("\r", w[1][1]);
                            break;
                        default:
                            m = "";
                            if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + w[1][0]);
                    }
                    f.push((L ? m : "") + f.pop() + (L ? "" : m));
                    p = -1
                }
        }
        if (f.length > 1 && n.WTF) throw new Error("bad formula stack");
        return f[0]
    }

    function ud(e, r, t) {
        var a = e.l + r,
            n = t.biff == 2 ? 1 : 2;
        var i, s = e._R(n);
        if (s == 65535) return [
            [], ma(e, r - 2)
        ];
        var f = nd(e, s, t);
        if (r !== s + n) i = ad(e, r - s - n, f, t);
        e.l = a;
        return [f, i]
    }

    function hd(e, r, t) {
        var a = e.l + r,
            n = t.biff == 2 ? 1 : 2;
        var i, s = e._R(n);
        if (s == 65535) return [
            [], ma(e, r - 2)
        ];
        var f = nd(e, s, t);
        if (r !== s + n) i = ad(e, r - s - n, f, t);
        e.l = a;
        return [f, i]
    }

    function dd(e, r, t, a) {
        var n = e.l + r;
        var i = nd(e, a, t);
        var s;
        if (n !== e.l) s = ad(e, n - e.l, i, t);
        return [i, s]
    }

    function vd(e, r, t) {
        var a = e.l + r;
        var n, i = e._R(2);
        var s = nd(e, i, t);
        if (i == 65535) return [
            [], ma(e, r - 2)
        ];
        if (r !== i + 2) n = ad(e, a - i - 2, s, t);
        return [s, n]
    }

    function pd(e) {
        var r;
        if (na(e, e.l + 6) !== 65535) return [gn(e), "n"];
        switch (e[e.l]) {
            case 0:
                e.l += 8;
                return ["String", "s"];
            case 1:
                r = e[e.l + 2] === 1;
                e.l += 8;
                return [r, "b"];
            case 2:
                r = e[e.l + 2];
                e.l += 8;
                return [r, "e"];
            case 3:
                e.l += 8;
                return ["", "s"];
        }
        return []
    }

    function md(e) {
        if (e == null) {
            var r = ba(8);
            r._W(1, 3);
            r._W(1, 0);
            r._W(2, 0);
            r._W(2, 0);
            r._W(2, 65535);
            return r
        } else if (typeof e == "number") return wn(e);
        return wn(0)
    }

    function bd(e, r, t) {
        var a = e.l + r;
        var n = _s(e, 6);
        if (t.biff == 2) ++e.l;
        var i = pd(e, 8);
        var s = e._R(1);
        if (t.biff != 2) {
            e._R(1);
            if (t.biff >= 5) {
                e._R(4)
            }
        }
        var f = hd(e, a - e.l, t);
        return {
            cell: n,
            val: i[0],
            formula: f,
            shared: s >> 3 & 1,
            tt: i[1]
        }
    }

    function gd(e, r, t, a, n) {
        var i = As(r, t, n);
        var s = md(e.v);
        var f = ba(6);
        var o = 1 | 32;
        f._W(2, o);
        f._W(4, 0);
        var c = ba(e.bf.length);
        for (var l = 0; l < e.bf.length; ++l) c[l] = e.bf[l];
        var u = I([i, s, f, c]);
        return u
    }

    function wd(e, r, t) {
        var a = e._R(4);
        var n = nd(e, a, t);
        var i = e._R(4);
        var s = i > 0 ? ad(e, i, n, t) : null;
        return [n, s]
    }
    var kd = wd;
    var Td = wd;
    var Ed = wd;
    var yd = wd;
    var Sd = {
        0: "BEEP",
        1: "OPEN",
        2: "OPEN.LINKS",
        3: "CLOSE.ALL",
        4: "SAVE",
        5: "SAVE.AS",
        6: "FILE.DELETE",
        7: "PAGE.SETUP",
        8: "PRINT",
        9: "PRINTER.SETUP",
        10: "QUIT",
        11: "NEW.WINDOW",
        12: "ARRANGE.ALL",
        13: "WINDOW.SIZE",
        14: "WINDOW.MOVE",
        15: "FULL",
        16: "CLOSE",
        17: "RUN",
        22: "SET.PRINT.AREA",
        23: "SET.PRINT.TITLES",
        24: "SET.PAGE.BREAK",
        25: "REMOVE.PAGE.BREAK",
        26: "FONT",
        27: "DISPLAY",
        28: "PROTECT.DOCUMENT",
        29: "PRECISION",
        30: "A1.R1C1",
        31: "CALCULATE.NOW",
        32: "CALCULATION",
        34: "DATA.FIND",
        35: "EXTRACT",
        36: "DATA.DELETE",
        37: "SET.DATABASE",
        38: "SET.CRITERIA",
        39: "SORT",
        40: "DATA.SERIES",
        41: "TABLE",
        42: "FORMAT.NUMBER",
        43: "ALIGNMENT",
        44: "STYLE",
        45: "BORDER",
        46: "CELL.PROTECTION",
        47: "COLUMN.WIDTH",
        48: "UNDO",
        49: "CUT",
        50: "COPY",
        51: "PASTE",
        52: "CLEAR",
        53: "PASTE.SPECIAL",
        54: "EDIT.DELETE",
        55: "INSERT",
        56: "FILL.RIGHT",
        57: "FILL.DOWN",
        61: "DEFINE.NAME",
        62: "CREATE.NAMES",
        63: "FORMULA.GOTO",
        64: "FORMULA.FIND",
        65: "SELECT.LAST.CELL",
        66: "SHOW.ACTIVE.CELL",
        67: "GALLERY.AREA",
        68: "GALLERY.BAR",
        69: "GALLERY.COLUMN",
        70: "GALLERY.LINE",
        71: "GALLERY.PIE",
        72: "GALLERY.SCATTER",
        73: "COMBINATION",
        74: "PREFERRED",
        75: "ADD.OVERLAY",
        76: "GRIDLINES",
        77: "SET.PREFERRED",
        78: "AXES",
        79: "LEGEND",
        80: "ATTACH.TEXT",
        81: "ADD.ARROW",
        82: "SELECT.CHART",
        83: "SELECT.PLOT.AREA",
        84: "PATTERNS",
        85: "MAIN.CHART",
        86: "OVERLAY",
        87: "SCALE",
        88: "FORMAT.LEGEND",
        89: "FORMAT.TEXT",
        90: "EDIT.REPEAT",
        91: "PARSE",
        92: "JUSTIFY",
        93: "HIDE",
        94: "UNHIDE",
        95: "WORKSPACE",
        96: "FORMULA",
        97: "FORMULA.FILL",
        98: "FORMULA.ARRAY",
        99: "DATA.FIND.NEXT",
        100: "DATA.FIND.PREV",
        101: "FORMULA.FIND.NEXT",
        102: "FORMULA.FIND.PREV",
        103: "ACTIVATE",
        104: "ACTIVATE.NEXT",
        105: "ACTIVATE.PREV",
        106: "UNLOCKED.NEXT",
        107: "UNLOCKED.PREV",
        108: "COPY.PICTURE",
        109: "SELECT",
        110: "DELETE.NAME",
        111: "DELETE.FORMAT",
        112: "VLINE",
        113: "HLINE",
        114: "VPAGE",
        115: "HPAGE",
        116: "VSCROLL",
        117: "HSCROLL",
        118: "ALERT",
        119: "NEW",
        120: "CANCEL.COPY",
        121: "SHOW.CLIPBOARD",
        122: "MESSAGE",
        124: "PASTE.LINK",
        125: "APP.ACTIVATE",
        126: "DELETE.ARROW",
        127: "ROW.HEIGHT",
        128: "FORMAT.MOVE",
        129: "FORMAT.SIZE",
        130: "FORMULA.REPLACE",
        131: "SEND.KEYS",
        132: "SELECT.SPECIAL",
        133: "APPLY.NAMES",
        134: "REPLACE.FONT",
        135: "FREEZE.PANES",
        136: "SHOW.INFO",
        137: "SPLIT",
        138: "ON.WINDOW",
        139: "ON.DATA",
        140: "DISABLE.INPUT",
        142: "OUTLINE",
        143: "LIST.NAMES",
        144: "FILE.CLOSE",
        145: "SAVE.WORKBOOK",
        146: "DATA.FORM",
        147: "COPY.CHART",
        148: "ON.TIME",
        149: "WAIT",
        150: "FORMAT.FONT",
        151: "FILL.UP",
        152: "FILL.LEFT",
        153: "DELETE.OVERLAY",
        155: "SHORT.MENUS",
        159: "SET.UPDATE.STATUS",
        161: "COLOR.PALETTE",
        162: "DELETE.STYLE",
        163: "WINDOW.RESTORE",
        164: "WINDOW.MAXIMIZE",
        166: "CHANGE.LINK",
        167: "CALCULATE.DOCUMENT",
        168: "ON.KEY",
        169: "APP.RESTORE",
        170: "APP.MOVE",
        171: "APP.SIZE",
        172: "APP.MINIMIZE",
        173: "APP.MAXIMIZE",
        174: "BRING.TO.FRONT",
        175: "SEND.TO.BACK",
        185: "MAIN.CHART.TYPE",
        186: "OVERLAY.CHART.TYPE",
        187: "SELECT.END",
        188: "OPEN.MAIL",
        189: "SEND.MAIL",
        190: "STANDARD.FONT",
        191: "CONSOLIDATE",
        192: "SORT.SPECIAL",
        193: "GALLERY.3D.AREA",
        194: "GALLERY.3D.COLUMN",
        195: "GALLERY.3D.LINE",
        196: "GALLERY.3D.PIE",
        197: "VIEW.3D",
        198: "GOAL.SEEK",
        199: "WORKGROUP",
        200: "FILL.GROUP",
        201: "UPDATE.LINK",
        202: "PROMOTE",
        203: "DEMOTE",
        204: "SHOW.DETAIL",
        206: "UNGROUP",
        207: "OBJECT.PROPERTIES",
        208: "SAVE.NEW.OBJECT",
        209: "SHARE",
        210: "SHARE.NAME",
        211: "DUPLICATE",
        212: "APPLY.STYLE",
        213: "ASSIGN.TO.OBJECT",
        214: "OBJECT.PROTECTION",
        215: "HIDE.OBJECT",
        216: "SET.EXTRACT",
        217: "CREATE.PUBLISHER",
        218: "SUBSCRIBE.TO",
        219: "ATTRIBUTES",
        220: "SHOW.TOOLBAR",
        222: "PRINT.PREVIEW",
        223: "EDIT.COLOR",
        224: "SHOW.LEVELS",
        225: "FORMAT.MAIN",
        226: "FORMAT.OVERLAY",
        227: "ON.RECALC",
        228: "EDIT.SERIES",
        229: "DEFINE.STYLE",
        240: "LINE.PRINT",
        243: "ENTER.DATA",
        249: "GALLERY.RADAR",
        250: "MERGE.STYLES",
        251: "EDITION.OPTIONS",
        252: "PASTE.PICTURE",
        253: "PASTE.PICTURE.LINK",
        254: "SPELLING",
        256: "ZOOM",
        259: "INSERT.OBJECT",
        260: "WINDOW.MINIMIZE",
        265: "SOUND.NOTE",
        266: "SOUND.PLAY",
        267: "FORMAT.SHAPE",
        268: "EXTEND.POLYGON",
        269: "FORMAT.AUTO",
        272: "GALLERY.3D.BAR",
        273: "GALLERY.3D.SURFACE",
        274: "FILL.AUTO",
        276: "CUSTOMIZE.TOOLBAR",
        277: "ADD.TOOL",
        278: "EDIT.OBJECT",
        279: "ON.DOUBLECLICK",
        280: "ON.ENTRY",
        281: "WORKBOOK.ADD",
        282: "WORKBOOK.MOVE",
        283: "WORKBOOK.COPY",
        284: "WORKBOOK.OPTIONS",
        285: "SAVE.WORKSPACE",
        288: "CHART.WIZARD",
        289: "DELETE.TOOL",
        290: "MOVE.TOOL",
        291: "WORKBOOK.SELECT",
        292: "WORKBOOK.ACTIVATE",
        293: "ASSIGN.TO.TOOL",
        295: "COPY.TOOL",
        296: "RESET.TOOL",
        297: "CONSTRAIN.NUMERIC",
        298: "PASTE.TOOL",
        302: "WORKBOOK.NEW",
        305: "SCENARIO.CELLS",
        306: "SCENARIO.DELETE",
        307: "SCENARIO.ADD",
        308: "SCENARIO.EDIT",
        309: "SCENARIO.SHOW",
        310: "SCENARIO.SHOW.NEXT",
        311: "SCENARIO.SUMMARY",
        312: "PIVOT.TABLE.WIZARD",
        313: "PIVOT.FIELD.PROPERTIES",
        314: "PIVOT.FIELD",
        315: "PIVOT.ITEM",
        316: "PIVOT.ADD.FIELDS",
        318: "OPTIONS.CALCULATION",
        319: "OPTIONS.EDIT",
        320: "OPTIONS.VIEW",
        321: "ADDIN.MANAGER",
        322: "MENU.EDITOR",
        323: "ATTACH.TOOLBARS",
        324: "VBAActivate",
        325: "OPTIONS.CHART",
        328: "VBA.INSERT.FILE",
        330: "VBA.PROCEDURE.DEFINITION",
        336: "ROUTING.SLIP",
        338: "ROUTE.DOCUMENT",
        339: "MAIL.LOGON",
        342: "INSERT.PICTURE",
        343: "EDIT.TOOL",
        344: "GALLERY.DOUGHNUT",
        350: "CHART.TREND",
        352: "PIVOT.ITEM.PROPERTIES",
        354: "WORKBOOK.INSERT",
        355: "OPTIONS.TRANSITION",
        356: "OPTIONS.GENERAL",
        370: "FILTER.ADVANCED",
        373: "MAIL.ADD.MAILER",
        374: "MAIL.DELETE.MAILER",
        375: "MAIL.REPLY",
        376: "MAIL.REPLY.ALL",
        377: "MAIL.FORWARD",
        378: "MAIL.NEXT.LETTER",
        379: "DATA.LABEL",
        380: "INSERT.TITLE",
        381: "FONT.PROPERTIES",
        382: "MACRO.OPTIONS",
        383: "WORKBOOK.HIDE",
        384: "WORKBOOK.UNHIDE",
        385: "WORKBOOK.DELETE",
        386: "WORKBOOK.NAME",
        388: "GALLERY.CUSTOM",
        390: "ADD.CHART.AUTOFORMAT",
        391: "DELETE.CHART.AUTOFORMAT",
        392: "CHART.ADD.DATA",
        393: "AUTO.OUTLINE",
        394: "TAB.ORDER",
        395: "SHOW.DIALOG",
        396: "SELECT.ALL",
        397: "UNGROUP.SHEETS",
        398: "SUBTOTAL.CREATE",
        399: "SUBTOTAL.REMOVE",
        400: "RENAME.OBJECT",
        412: "WORKBOOK.SCROLL",
        413: "WORKBOOK.NEXT",
        414: "WORKBOOK.PREV",
        415: "WORKBOOK.TAB.SPLIT",
        416: "FULL.SCREEN",
        417: "WORKBOOK.PROTECT",
        420: "SCROLLBAR.PROPERTIES",
        421: "PIVOT.SHOW.PAGES",
        422: "TEXT.TO.COLUMNS",
        423: "FORMAT.CHARTTYPE",
        424: "LINK.FORMAT",
        425: "TRACER.DISPLAY",
        430: "TRACER.NAVIGATE",
        431: "TRACER.CLEAR",
        432: "TRACER.ERROR",
        433: "PIVOT.FIELD.GROUP",
        434: "PIVOT.FIELD.UNGROUP",
        435: "CHECKBOX.PROPERTIES",
        436: "LABEL.PROPERTIES",
        437: "LISTBOX.PROPERTIES",
        438: "EDITBOX.PROPERTIES",
        439: "PIVOT.REFRESH",
        440: "LINK.COMBO",
        441: "OPEN.TEXT",
        442: "HIDE.DIALOG",
        443: "SET.DIALOG.FOCUS",
        444: "ENABLE.OBJECT",
        445: "PUSHBUTTON.PROPERTIES",
        446: "SET.DIALOG.DEFAULT",
        447: "FILTER",
        448: "FILTER.SHOW.ALL",
        449: "CLEAR.OUTLINE",
        450: "FUNCTION.WIZARD",
        451: "ADD.LIST.ITEM",
        452: "SET.LIST.ITEM",
        453: "REMOVE.LIST.ITEM",
        454: "SELECT.LIST.ITEM",
        455: "SET.CONTROL.VALUE",
        456: "SAVE.COPY.AS",
        458: "OPTIONS.LISTS.ADD",
        459: "OPTIONS.LISTS.DELETE",
        460: "SERIES.AXES",
        461: "SERIES.X",
        462: "SERIES.Y",
        463: "ERRORBAR.X",
        464: "ERRORBAR.Y",
        465: "FORMAT.CHART",
        466: "SERIES.ORDER",
        467: "MAIL.LOGOFF",
        468: "CLEAR.ROUTING.SLIP",
        469: "APP.ACTIVATE.MICROSOFT",
        470: "MAIL.EDIT.MAILER",
        471: "ON.SHEET",
        472: "STANDARD.WIDTH",
        473: "SCENARIO.MERGE",
        474: "SUMMARY.INFO",
        475: "FIND.FILE",
        476: "ACTIVE.CELL.FONT",
        477: "ENABLE.TIPWIZARD",
        478: "VBA.MAKE.ADDIN",
        480: "INSERTDATATABLE",
        481: "WORKGROUP.OPTIONS",
        482: "MAIL.SEND.MAILER",
        485: "AUTOCORRECT",
        489: "POST.DOCUMENT",
        491: "PICKLIST",
        493: "VIEW.SHOW",
        494: "VIEW.DEFINE",
        495: "VIEW.DELETE",
        509: "SHEET.BACKGROUND",
        510: "INSERT.MAP.OBJECT",
        511: "OPTIONS.MENONO",
        517: "MSOCHECKS",
        518: "NORMAL",
        519: "LAYOUT",
        520: "RM.PRINT.AREA",
        521: "CLEAR.PRINT.AREA",
        522: "ADD.PRINT.AREA",
        523: "MOVE.BRK",
        545: "HIDECURR.NOTE",
        546: "HIDEALL.NOTES",
        547: "DELETE.NOTE",
        548: "TRAVERSE.NOTES",
        549: "ACTIVATE.NOTES",
        620: "PROTECT.REVISIONS",
        621: "UNPROTECT.REVISIONS",
        647: "OPTIONS.ME",
        653: "WEB.PUBLISH",
        667: "NEWWEBQUERY",
        673: "PIVOT.TABLE.CHART",
        753: "OPTIONS.SAVE",
        755: "OPTIONS.SPELL",
        808: "HIDEALL.INKANNOTS"
    };
    var _d = {
        0: "COUNT",
        1: "IF",
        2: "ISNA",
        3: "ISERROR",
        4: "SUM",
        5: "AVERAGE",
        6: "MIN",
        7: "MAX",
        8: "ROW",
        9: "COLUMN",
        10: "NA",
        11: "NPV",
        12: "STDEV",
        13: "DOLLAR",
        14: "FIXED",
        15: "SIN",
        16: "COS",
        17: "TAN",
        18: "ATAN",
        19: "PI",
        20: "SQRT",
        21: "EXP",
        22: "LN",
        23: "LOG10",
        24: "ABS",
        25: "INT",
        26: "SIGN",
        27: "ROUND",
        28: "LOOKUP",
        29: "INDEX",
        30: "REPT",
        31: "MID",
        32: "LEN",
        33: "VALUE",
        34: "TRUE",
        35: "FALSE",
        36: "AND",
        37: "OR",
        38: "NOT",
        39: "MOD",
        40: "DCOUNT",
        41: "DSUM",
        42: "DAVERAGE",
        43: "DMIN",
        44: "DMAX",
        45: "DSTDEV",
        46: "VAR",
        47: "DVAR",
        48: "TEXT",
        49: "LINEST",
        50: "TREND",
        51: "LOGEST",
        52: "GROWTH",
        53: "GOTO",
        54: "HALT",
        55: "RETURN",
        56: "PV",
        57: "FV",
        58: "NPER",
        59: "PMT",
        60: "RATE",
        61: "MIRR",
        62: "IRR",
        63: "RAND",
        64: "MATCH",
        65: "DATE",
        66: "TIME",
        67: "DAY",
        68: "MONTH",
        69: "YEAR",
        70: "WEEKDAY",
        71: "HOUR",
        72: "MINUTE",
        73: "SECOND",
        74: "NOW",
        75: "AREAS",
        76: "ROWS",
        77: "COLUMNS",
        78: "OFFSET",
        79: "ABSREF",
        80: "RELREF",
        81: "ARGUMENT",
        82: "SEARCH",
        83: "TRANSPOSE",
        84: "ERROR",
        85: "STEP",
        86: "TYPE",
        87: "ECHO",
        88: "SET.NAME",
        89: "CALLER",
        90: "DEREF",
        91: "WINDOWS",
        92: "SERIES",
        93: "DOCUMENTS",
        94: "ACTIVE.CELL",
        95: "SELECTION",
        96: "RESULT",
        97: "ATAN2",
        98: "ASIN",
        99: "ACOS",
        100: "CHOOSE",
        101: "HLOOKUP",
        102: "VLOOKUP",
        103: "LINKS",
        104: "INPUT",
        105: "ISREF",
        106: "GET.FORMULA",
        107: "GET.NAME",
        108: "SET.VALUE",
        109: "LOG",
        110: "EXEC",
        111: "CHAR",
        112: "LOWER",
        113: "UPPER",
        114: "PROPER",
        115: "LEFT",
        116: "RIGHT",
        117: "EXACT",
        118: "TRIM",
        119: "REPLACE",
        120: "SUBSTITUTE",
        121: "CODE",
        122: "NAMES",
        123: "DIRECTORY",
        124: "FIND",
        125: "CELL",
        126: "ISERR",
        127: "ISTEXT",
        128: "ISNUMBER",
        129: "ISBLANK",
        130: "T",
        131: "N",
        132: "FOPEN",
        133: "FCLOSE",
        134: "FSIZE",
        135: "FREADLN",
        136: "FREAD",
        137: "FWRITELN",
        138: "FWRITE",
        139: "FPOS",
        140: "DATEVALUE",
        141: "TIMEVALUE",
        142: "SLN",
        143: "SYD",
        144: "DDB",
        145: "GET.DEF",
        146: "REFTEXT",
        147: "TEXTREF",
        148: "INDIRECT",
        149: "REGISTER",
        150: "CALL",
        151: "ADD.BAR",
        152: "ADD.MENU",
        153: "ADD.COMMAND",
        154: "ENABLE.COMMAND",
        155: "CHECK.COMMAND",
        156: "RENAME.COMMAND",
        157: "SHOW.BAR",
        158: "DELETE.MENU",
        159: "DELETE.COMMAND",
        160: "GET.CHART.ITEM",
        161: "DIALOG.BOX",
        162: "CLEAN",
        163: "MDETERM",
        164: "MINVERSE",
        165: "MMULT",
        166: "FILES",
        167: "IPMT",
        168: "PPMT",
        169: "COUNTA",
        170: "CANCEL.KEY",
        171: "FOR",
        172: "WHILE",
        173: "BREAK",
        174: "NEXT",
        175: "INITIATE",
        176: "REQUEST",
        177: "POKE",
        178: "EXECUTE",
        179: "TERMINATE",
        180: "RESTART",
        181: "HELP",
        182: "GET.BAR",
        183: "PRODUCT",
        184: "FACT",
        185: "GET.CELL",
        186: "GET.WORKSPACE",
        187: "GET.WINDOW",
        188: "GET.DOCUMENT",
        189: "DPRODUCT",
        190: "ISNONTEXT",
        191: "GET.NOTE",
        192: "NOTE",
        193: "STDEVP",
        194: "VARP",
        195: "DSTDEVP",
        196: "DVARP",
        197: "TRUNC",
        198: "ISLOGICAL",
        199: "DCOUNTA",
        200: "DELETE.BAR",
        201: "UNREGISTER",
        204: "USDOLLAR",
        205: "FINDB",
        206: "SEARCHB",
        207: "REPLACEB",
        208: "LEFTB",
        209: "RIGHTB",
        210: "MIDB",
        211: "LENB",
        212: "ROUNDUP",
        213: "ROUNDDOWN",
        214: "ASC",
        215: "DBCS",
        216: "RANK",
        219: "ADDRESS",
        220: "DAYS360",
        221: "TODAY",
        222: "VDB",
        223: "ELSE",
        224: "ELSE.IF",
        225: "END.IF",
        226: "FOR.CELL",
        227: "MEDIAN",
        228: "SUMPRODUCT",
        229: "SINH",
        230: "COSH",
        231: "TANH",
        232: "ASINH",
        233: "ACOSH",
        234: "ATANH",
        235: "DGET",
        236: "CREATE.OBJECT",
        237: "VOLATILE",
        238: "LAST.ERROR",
        239: "CUSTOM.UNDO",
        240: "CUSTOM.REPEAT",
        241: "FORMULA.CONVERT",
        242: "GET.LINK.INFO",
        243: "TEXT.BOX",
        244: "INFO",
        245: "GROUP",
        246: "GET.OBJECT",
        247: "DB",
        248: "PAUSE",
        251: "RESUME",
        252: "FREQUENCY",
        253: "ADD.TOOLBAR",
        254: "DELETE.TOOLBAR",
        255: "User",
        256: "RESET.TOOLBAR",
        257: "EVALUATE",
        258: "GET.TOOLBAR",
        259: "GET.TOOL",
        260: "SPELLING.CHECK",
        261: "ERROR.TYPE",
        262: "APP.TITLE",
        263: "WINDOW.TITLE",
        264: "SAVE.TOOLBAR",
        265: "ENABLE.TOOL",
        266: "PRESS.TOOL",
        267: "REGISTER.ID",
        268: "GET.WORKBOOK",
        269: "AVEDEV",
        270: "BETADIST",
        271: "GAMMALN",
        272: "BETAINV",
        273: "BINOMDIST",
        274: "CHIDIST",
        275: "CHIINV",
        276: "COMBIN",
        277: "CONFIDENCE",
        278: "CRITBINOM",
        279: "EVEN",
        280: "EXPONDIST",
        281: "FDIST",
        282: "FINV",
        283: "FISHER",
        284: "FISHERINV",
        285: "FLOOR",
        286: "GAMMADIST",
        287: "GAMMAINV",
        288: "CEILING",
        289: "HYPGEOMDIST",
        290: "LOGNORMDIST",
        291: "LOGINV",
        292: "NEGBINOMDIST",
        293: "NORMDIST",
        294: "NORMSDIST",
        295: "NORMINV",
        296: "NORMSINV",
        297: "STANDARDIZE",
        298: "ODD",
        299: "PERMUT",
        300: "POISSON",
        301: "TDIST",
        302: "WEIBULL",
        303: "SUMXMY2",
        304: "SUMX2MY2",
        305: "SUMX2PY2",
        306: "CHITEST",
        307: "CORREL",
        308: "COVAR",
        309: "FORECAST",
        310: "FTEST",
        311: "INTERCEPT",
        312: "PEARSON",
        313: "RSQ",
        314: "STEYX",
        315: "SLOPE",
        316: "TTEST",
        317: "PROB",
        318: "DEVSQ",
        319: "GEOMEAN",
        320: "HARMEAN",
        321: "SUMSQ",
        322: "KURT",
        323: "SKEW",
        324: "ZTEST",
        325: "LARGE",
        326: "SMALL",
        327: "QUARTILE",
        328: "PERCENTILE",
        329: "PERCENTRANK",
        330: "MODE",
        331: "TRIMMEAN",
        332: "TINV",
        334: "MOVIE.COMMAND",
        335: "GET.MOVIE",
        336: "CONCATENATE",
        337: "POWER",
        338: "PIVOT.ADD.DATA",
        339: "GET.PIVOT.TABLE",
        340: "GET.PIVOT.FIELD",
        341: "GET.PIVOT.ITEM",
        342: "RADIANS",
        343: "DEGREES",
        344: "SUBTOTAL",
        345: "SUMIF",
        346: "COUNTIF",
        347: "COUNTBLANK",
        348: "SCENARIO.GET",
        349: "OPTIONS.LISTS.GET",
        350: "ISPMT",
        351: "DATEDIF",
        352: "DATESTRING",
        353: "NUMBERSTRING",
        354: "ROMAN",
        355: "OPEN.DIALOG",
        356: "SAVE.DIALOG",
        357: "VIEW.GET",
        358: "GETPIVOTDATA",
        359: "HYPERLINK",
        360: "PHONETIC",
        361: "AVERAGEA",
        362: "MAXA",
        363: "MINA",
        364: "STDEVPA",
        365: "VARPA",
        366: "STDEVA",
        367: "VARA",
        368: "BAHTTEXT",
        369: "THAIDAYOFWEEK",
        370: "THAIDIGIT",
        371: "THAIMONTHOFYEAR",
        372: "THAINUMSOUND",
        373: "THAINUMSTRING",
        374: "THAISTRINGLENGTH",
        375: "ISTHAIDIGIT",
        376: "ROUNDBAHTDOWN",
        377: "ROUNDBAHTUP",
        378: "THAIYEAR",
        379: "RTD",
        380: "CUBEVALUE",
        381: "CUBEMEMBER",
        382: "CUBEMEMBERPROPERTY",
        383: "CUBERANKEDMEMBER",
        384: "HEX2BIN",
        385: "HEX2DEC",
        386: "HEX2OCT",
        387: "DEC2BIN",
        388: "DEC2HEX",
        389: "DEC2OCT",
        390: "OCT2BIN",
        391: "OCT2HEX",
        392: "OCT2DEC",
        393: "BIN2DEC",
        394: "BIN2OCT",
        395: "BIN2HEX",
        396: "IMSUB",
        397: "IMDIV",
        398: "IMPOWER",
        399: "IMABS",
        400: "IMSQRT",
        401: "IMLN",
        402: "IMLOG2",
        403: "IMLOG10",
        404: "IMSIN",
        405: "IMCOS",
        406: "IMEXP",
        407: "IMARGUMENT",
        408: "IMCONJUGATE",
        409: "IMAGINARY",
        410: "IMREAL",
        411: "COMPLEX",
        412: "IMSUM",
        413: "IMPRODUCT",
        414: "SERIESSUM",
        415: "FACTDOUBLE",
        416: "SQRTPI",
        417: "QUOTIENT",
        418: "DELTA",
        419: "GESTEP",
        420: "ISEVEN",
        421: "ISODD",
        422: "MROUND",
        423: "ERF",
        424: "ERFC",
        425: "BESSELJ",
        426: "BESSELK",
        427: "BESSELY",
        428: "BESSELI",
        429: "XIRR",
        430: "XNPV",
        431: "PRICEMAT",
        432: "YIELDMAT",
        433: "INTRATE",
        434: "RECEIVED",
        435: "DISC",
        436: "PRICEDISC",
        437: "YIELDDISC",
        438: "TBILLEQ",
        439: "TBILLPRICE",
        440: "TBILLYIELD",
        441: "PRICE",
        442: "YIELD",
        443: "DOLLARDE",
        444: "DOLLARFR",
        445: "NOMINAL",
        446: "EFFECT",
        447: "CUMPRINC",
        448: "CUMIPMT",
        449: "EDATE",
        450: "EOMONTH",
        451: "YEARFRAC",
        452: "COUPDAYBS",
        453: "COUPDAYS",
        454: "COUPDAYSNC",
        455: "COUPNCD",
        456: "COUPNUM",
        457: "COUPPCD",
        458: "DURATION",
        459: "MDURATION",
        460: "ODDLPRICE",
        461: "ODDLYIELD",
        462: "ODDFPRICE",
        463: "ODDFYIELD",
        464: "RANDBETWEEN",
        465: "WEEKNUM",
        466: "AMORDEGRC",
        467: "AMORLINC",
        468: "CONVERT",
        724: "SHEETJS",
        469: "ACCRINT",
        470: "ACCRINTM",
        471: "WORKDAY",
        472: "NETWORKDAYS",
        473: "GCD",
        474: "MULTINOMIAL",
        475: "LCM",
        476: "FVSCHEDULE",
        477: "CUBEKPIMEMBER",
        478: "CUBESET",
        479: "CUBESETCOUNT",
        480: "IFERROR",
        481: "COUNTIFS",
        482: "SUMIFS",
        483: "AVERAGEIF",
        484: "AVERAGEIFS"
    };
    var Ad = {
        2: 1,
        3: 1,
        10: 0,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 0,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 2,
        30: 2,
        31: 3,
        32: 1,
        33: 1,
        34: 0,
        35: 0,
        38: 1,
        39: 2,
        40: 3,
        41: 3,
        42: 3,
        43: 3,
        44: 3,
        45: 3,
        47: 3,
        48: 2,
        53: 1,
        61: 3,
        63: 0,
        65: 3,
        66: 3,
        67: 1,
        68: 1,
        69: 1,
        70: 1,
        71: 1,
        72: 1,
        73: 1,
        74: 0,
        75: 1,
        76: 1,
        77: 1,
        79: 2,
        80: 2,
        83: 1,
        85: 0,
        86: 1,
        89: 0,
        90: 1,
        94: 0,
        95: 0,
        97: 2,
        98: 1,
        99: 1,
        101: 3,
        102: 3,
        105: 1,
        106: 1,
        108: 2,
        111: 1,
        112: 1,
        113: 1,
        114: 1,
        117: 2,
        118: 1,
        119: 4,
        121: 1,
        126: 1,
        127: 1,
        128: 1,
        129: 1,
        130: 1,
        131: 1,
        133: 1,
        134: 1,
        135: 1,
        136: 2,
        137: 2,
        138: 2,
        140: 1,
        141: 1,
        142: 3,
        143: 4,
        144: 4,
        161: 1,
        162: 1,
        163: 1,
        164: 1,
        165: 2,
        172: 1,
        175: 2,
        176: 2,
        177: 3,
        178: 2,
        179: 1,
        184: 1,
        186: 1,
        189: 3,
        190: 1,
        195: 3,
        196: 3,
        197: 1,
        198: 1,
        199: 3,
        201: 1,
        207: 4,
        210: 3,
        211: 1,
        212: 2,
        213: 2,
        214: 1,
        215: 1,
        225: 0,
        229: 1,
        230: 1,
        231: 1,
        232: 1,
        233: 1,
        234: 1,
        235: 3,
        244: 1,
        247: 4,
        252: 2,
        257: 1,
        261: 1,
        271: 1,
        273: 4,
        274: 2,
        275: 2,
        276: 2,
        277: 3,
        278: 3,
        279: 1,
        280: 3,
        281: 3,
        282: 3,
        283: 1,
        284: 1,
        285: 2,
        286: 4,
        287: 3,
        288: 2,
        289: 4,
        290: 3,
        291: 3,
        292: 3,
        293: 4,
        294: 1,
        295: 3,
        296: 1,
        297: 3,
        298: 1,
        299: 2,
        300: 3,
        301: 3,
        302: 4,
        303: 2,
        304: 2,
        305: 2,
        306: 2,
        307: 2,
        308: 2,
        309: 3,
        310: 2,
        311: 2,
        312: 2,
        313: 2,
        314: 2,
        315: 2,
        316: 4,
        325: 2,
        326: 2,
        327: 2,
        328: 2,
        331: 2,
        332: 2,
        337: 2,
        342: 1,
        343: 1,
        346: 2,
        347: 1,
        350: 4,
        351: 3,
        352: 1,
        353: 2,
        360: 1,
        368: 1,
        369: 1,
        370: 1,
        371: 1,
        372: 1,
        373: 1,
        374: 1,
        375: 1,
        376: 1,
        377: 1,
        378: 1,
        382: 3,
        385: 1,
        392: 1,
        393: 1,
        396: 2,
        397: 2,
        398: 2,
        399: 1,
        400: 1,
        401: 1,
        402: 1,
        403: 1,
        404: 1,
        405: 1,
        406: 1,
        407: 1,
        408: 1,
        409: 1,
        410: 1,
        414: 4,
        415: 1,
        416: 1,
        417: 2,
        420: 1,
        421: 1,
        422: 2,
        424: 1,
        425: 2,
        426: 2,
        427: 2,
        428: 2,
        430: 3,
        438: 3,
        439: 3,
        440: 3,
        443: 2,
        444: 2,
        445: 2,
        446: 2,
        447: 6,
        448: 6,
        449: 2,
        450: 2,
        464: 2,
        468: 3,
        476: 2,
        479: 1,
        480: 2,
        65535: 0
    };

    function xd(e) {
        if (e.slice(0, 3) == "of:") e = e.slice(3);
        if (e.charCodeAt(0) == 61) {
            e = e.slice(1);
            if (e.charCodeAt(0) == 61) e = e.slice(1)
        }
        e = e.replace(/COM\.MICROSOFT\./g, "");
        e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function (e, r) {
            return r.replace(/\./g, "")
        });
        e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1");
        return e.replace(/[;~]/g, ",").replace(/\|/g, ";")
    }

    function Cd(e) {
        var r = "of:=" + e.replace(Ou, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
        return r.replace(/;/g, "|").replace(/,/g, ";")
    }

    function Rd(e) {
        var r = e.split(":");
        var t = r[0].split(".")[0];
        return [t, r[0].split(".")[1] + (r.length > 1 ? ":" + (r[1].split(".")[1] || r[1].split(".")[0]) : "")]
    }

    function Od(e) {
        return e.replace(/\./, "!")
    }
    var Id = {};
    var Nd = {};
    var Fd = typeof Map !== "undefined";

    function Dd(e, r, t) {
        var a = 0,
            n = e.length;
        if (t) {
            if (Fd ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
                var i = Fd ? t.get(r) : t[r];
                for (; a < i.length; ++a) {
                    if (e[i[a]].t === r) {
                        e.Count++;
                        return i[a]
                    }
                }
            }
        } else
            for (; a < n; ++a) {
                if (e[a].t === r) {
                    e.Count++;
                    return a
                }
            }
        e[n] = {
            t: r
        };
        e.Count++;
        e.Unique++;
        if (t) {
            if (Fd) {
                if (!t.has(r)) t.set(r, []);
                t.get(r).push(n)
            } else {
                if (!Object.prototype.hasOwnProperty.call(t, r)) t[r] = [];
                t[r].push(n)
            }
        }
        return n
    }

    function Pd(e, r) {
        var t = {
            min: e + 1,
            max: e + 1
        };
        var a = -1;
        if (r.MDW) Cc = r.MDW;
        if (r.width != null) t.customWidth = 1;
        else if (r.wpx != null) a = Oc(r.wpx);
        else if (r.wch != null) a = r.wch;
        if (a > -1) {
            t.width = Ic(a);
            t.customWidth = 1
        } else if (r.width != null) t.width = r.width;
        if (r.hidden) t.hidden = true;
        if (r.level != null) {
            t.outlineLevel = t.level = r.level
        }
        return t
    }

    function Ld(e, r) {
        if (!e) return;
        var t = [.7, .7, .75, .75, .3, .3];
        if (r == "xlml") t = [1, 1, 1, 1, .5, .5];
        if (e.left == null) e.left = t[0];
        if (e.right == null) e.right = t[1];
        if (e.top == null) e.top = t[2];
        if (e.bottom == null) e.bottom = t[3];
        if (e.header == null) e.header = t[4];
        if (e.footer == null) e.footer = t[5]
    }

    function Md(e, r, t) {
        var a = t.revssf[r.z != null ? r.z : "General"];
        var n = 60,
            i = e.length;
        if (a == null && t.ssf) {
            for (; n < 392; ++n)
                if (t.ssf[n] == null) {
                    Je(r.z, n);
                    t.ssf[n] = r.z;
                    t.revssf[r.z] = a = n;
                    break
                }
        }
        for (n = 0; n != i; ++n)
            if (e[n].numFmtId === a) return n;
        e[i] = {
            numFmtId: a,
            fontId: 0,
            fillId: 0,
            borderId: 0,
            xfId: 0,
            applyNumberFormat: 1
        };
        return i
    }

    function Ud(e, r, t, a, n, i) {
        try {
            if (a.cellNF) e.z = Y[r]
        } catch (s) {
            if (a.WTF) throw s
        }
        if (e.t === "z" && !a.cellStyles) return;
        if (e.t === "d" && typeof e.v === "string") e.v = wr(e.v);
        if ((!a || a.cellText !== false) && e.t !== "z") try {
            if (Y[r] == null) Je(je[r] || "General", r);
            if (e.t === "e") e.w = e.w || $n[e.v];
            else if (r === 0) {
                if (e.t === "n") {
                    if ((e.v | 0) === e.v) e.w = e.v.toString(10);
                    else e.w = fe(e.v)
                } else if (e.t === "d") {
                    var f = lr(e.v);
                    if ((f | 0) === f) e.w = f.toString(10);
                    else e.w = fe(f)
                } else if (e.v === undefined) return "";
                else e.w = oe(e.v, Nd)
            } else if (e.t === "d") e.w = We(r, lr(e.v), Nd);
            else e.w = We(r, e.v, Nd)
        } catch (s) {
            if (a.WTF) throw s
        }
        if (!a.cellStyles) return;
        if (t != null) try {
            e.s = i.Fills[t];
            if (e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb) {
                e.s.fgColor.rgb = Sc(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0);
                if (a.WTF) e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb
            }
            if (e.s.bgColor && e.s.bgColor.theme) {
                e.s.bgColor.rgb = Sc(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0);
                if (a.WTF) e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb
            }
        } catch (s) {
            if (a.WTF && i.Fills) throw s
        }
    }

    function Bd(e, r, t) {
        if (e && e["!ref"]) {
            var a = Ua(e["!ref"]);
            if (a.e.c < a.s.c || a.e.r < a.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"])
        }
    }

    function Wd(e, r) {
        var t = Ua(r);
        if (t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0) e["!ref"] = Ma(t)
    }
    var Hd = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
    var zd = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/;
    var Vd = /<(?:\w:)?hyperlink [^>]*>/gm;
    var Gd = /"(\w*:\w*)"/;
    var jd = /<(?:\w:)?col\b[^>]*[\/]?>/g;
    var Xd = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
    var $d = /<(?:\w:)?pageMargins[^>]*\/>/g;
    var Yd = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/;
    var Kd = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/;
    var Jd = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

    function qd(e, r, t, a, n, i, s) {
        if (!e) return e;
        if (!a) a = {
            "!id": {}
        };
        if (b != null && r.dense == null) r.dense = b;
        var f = r.dense ? [] : {};
        var o = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        };
        var c = "",
            l = "";
        var u = e.match(zd);
        if (u) {
            c = e.slice(0, u.index);
            l = e.slice(u.index + u[0].length)
        } else c = l = e;
        var h = c.match(Yd);
        if (h) Qd(h[0], f, n, t);
        else if (h = c.match(Kd)) ev(h[0], h[1] || "", f, n, t, s, i);
        var d = (c.match(/<(?:\w*:)?dimension/) || {
            index: -1
        }).index;
        if (d > 0) {
            var v = c.slice(d, d + 50).match(Gd);
            if (v) Wd(f, v[1])
        }
        var p = c.match(Jd);
        if (p && p[1]) dv(p[1], n);
        var m = [];
        if (r.cellStyles) {
            var g = c.match(jd);
            if (g) ov(m, g)
        }
        if (u) mv(u[1], f, r, o, i, s);
        var w = l.match(Xd);
        if (w) f["!autofilter"] = lv(w[0]);
        var k = [];
        var T = l.match(Hd);
        if (T)
            for (d = 0; d != T.length; ++d) k[d] = Ua(T[d].slice(T[d].indexOf('"') + 1));
        var E = l.match(Vd);
        if (E) iv(f, E, a);
        var y = l.match($d);
        if (y) f["!margins"] = sv(Kr(y[0]));
        if (!f["!ref"] && o.e.c >= o.s.c && o.e.r >= o.s.r) f["!ref"] = Ma(o);
        if (r.sheetRows > 0 && f["!ref"]) {
            var S = Ua(f["!ref"]);
            if (r.sheetRows <= +S.e.r) {
                S.e.r = r.sheetRows - 1;
                if (S.e.r > o.e.r) S.e.r = o.e.r;
                if (S.e.r < S.s.r) S.s.r = S.e.r;
                if (S.e.c > o.e.c) S.e.c = o.e.c;
                if (S.e.c < S.s.c) S.s.c = S.e.c;
                f["!fullref"] = f["!ref"];
                f["!ref"] = Ma(S)
            }
        }
        if (m.length > 0) f["!cols"] = m;
        if (k.length > 0) f["!merges"] = k;
        return f
    }

    function Zd(e) {
        if (e.length === 0) return "";
        var r = '<mergeCells count="' + e.length + '">';
        for (var t = 0; t != e.length; ++t) r += '<mergeCell ref="' + Ma(e[t]) + '"/>';
        return r + "</mergeCells>"
    }

    function Qd(e, r, t, a) {
        var n = Kr(e);
        if (!t.Sheets[a]) t.Sheets[a] = {};
        if (n.codeName) t.Sheets[a].CodeName = Qr(vt(n.codeName))
    }

    function ev(e, r, t, a, n) {
        Qd(e.slice(0, e.indexOf(">")), t, a, n)
    }

    function rv(e, r, t, a, n) {
        var i = false;
        var s = {},
            f = null;
        if (a.bookType !== "xlsx" && r.vbaraw) {
            var o = r.SheetNames[t];
            try {
                if (r.Workbook) o = r.Workbook.Sheets[t].CodeName || o
            } catch (c) {}
            i = true;
            s.codeName = pt(tt(o))
        }
        if (e && e["!outline"]) {
            var l = {
                summaryBelow: 1,
                summaryRight: 1
            };
            if (e["!outline"].above) l.summaryBelow = 0;
            if (e["!outline"].left) l.summaryRight = 0;
            f = (f || "") + _t("outlinePr", null, l)
        }
        if (!i && !f) return;
        n[n.length] = _t("sheetPr", f, s)
    }
    var tv = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"];
    var av = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];

    function nv(e) {
        var r = {
            sheet: 1
        };
        tv.forEach(function (t) {
            if (e[t] != null && e[t]) r[t] = "1"
        });
        av.forEach(function (t) {
            if (e[t] != null && !e[t]) r[t] = "0"
        });
        if (e.password) r.password = hc(e.password).toString(16).toUpperCase();
        return _t("sheetProtection", null, r)
    }

    function iv(e, r, t) {
        var a = Array.isArray(e);
        for (var n = 0; n != r.length; ++n) {
            var i = Kr(vt(r[n]), true);
            if (!i.ref) return;
            var s = ((t || {})["!id"] || [])[i.id];
            if (s) {
                i.Target = s.Target;
                if (i.location) i.Target += "#" + Qr(i.location)
            } else {
                i.Target = "#" + Qr(i.location);
                s = {
                    Target: i.Target,
                    TargetMode: "Internal"
                }
            }
            i.Rel = s;
            if (i.tooltip) {
                i.Tooltip = i.tooltip;
                delete i.tooltip
            }
            var f = Ua(i.ref);
            for (var o = f.s.r; o <= f.e.r; ++o)
                for (var c = f.s.c; c <= f.e.c; ++c) {
                    var l = Pa({
                        c: c,
                        r: o
                    });
                    if (a) {
                        if (!e[o]) e[o] = [];
                        if (!e[o][c]) e[o][c] = {
                            t: "z",
                            v: undefined
                        };
                        e[o][c].l = i
                    } else {
                        if (!e[l]) e[l] = {
                            t: "z",
                            v: undefined
                        };
                        e[l].l = i
                    }
                }
        }
    }

    function sv(e) {
        var r = {};
        ["left", "right", "top", "bottom", "header", "footer"].forEach(function (t) {
            if (e[t]) r[t] = parseFloat(e[t])
        });
        return r
    }

    function fv(e) {
        Ld(e);
        return _t("pageMargins", null, e)
    }

    function ov(e, r) {
        var t = false;
        for (var a = 0; a != r.length; ++a) {
            var n = Kr(r[a], true);
            if (n.hidden) n.hidden = ct(n.hidden);
            var i = parseInt(n.min, 10) - 1,
                s = parseInt(n.max, 10) - 1;
            if (n.outlineLevel) n.level = +n.outlineLevel || 0;
            delete n.min;
            delete n.max;
            n.width = +n.width;
            if (!t && n.width) {
                t = true;
                Fc(n.width)
            }
            Dc(n);
            while (i <= s) e[i++] = Tr(n)
        }
    }

    function cv(e, r) {
        var t = ["<cols>"],
            a;
        for (var n = 0; n != r.length; ++n) {
            if (!(a = r[n])) continue;
            t[t.length] = _t("col", null, Pd(n, a))
        }
        t[t.length] = "</cols>";
        return t.join("")
    }

    function lv(e) {
        var r = {
            ref: (e.match(/ref="([^"]*)"/) || [])[1]
        };
        return r
    }

    function uv(e, r, t, a) {
        var n = typeof e.ref == "string" ? e.ref : Ma(e.ref);
        if (!t.Workbook) t.Workbook = {
            Sheets: []
        };
        if (!t.Workbook.Names) t.Workbook.Names = [];
        var i = t.Workbook.Names;
        var s = La(n);
        if (s.s.r == s.e.r) {
            s.e.r = La(r["!ref"]).e.r;
            n = Ma(s)
        }
        for (var f = 0; f < i.length; ++f) {
            var o = i[f];
            if (o.Name != "_xlnm._FilterDatabase") continue;
            if (o.Sheet != a) continue;
            o.Ref = "'" + t.SheetNames[a] + "'!" + n;
            break
        }
        if (f == i.length) i.push({
            Name: "_xlnm._FilterDatabase",
            Sheet: a,
            Ref: "'" + t.SheetNames[a] + "'!" + n
        });
        return _t("autoFilter", null, {
            ref: n
        })
    }
    var hv = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;

    function dv(e, r) {
        if (!r.Views) r.Views = [{}];
        (e.match(hv) || []).forEach(function (e, t) {
            var a = Kr(e);
            if (!r.Views[t]) r.Views[t] = {};
            if (+a.zoomScale) r.Views[t].zoom = +a.zoomScale;
            if (a.rightToLeft && ct(a.rightToLeft)) r.Views[t].RTL = true
        })
    }

    function vv(e, r, t, a) {
        var n = {
            workbookViewId: "0"
        };
        if ((((a || {}).Workbook || {}).Views || [])[0]) n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0";
        return _t("sheetViews", _t("sheetView", null, n), {})
    }

    function pv(e, r, t, a) {
        if (e.c) t["!comments"].push([r, e.c]);
        if (e.v === undefined && typeof e.f !== "string" || e.t === "z" && !e.f) return "";
        var n = "";
        var i = e.t,
            s = e.v;
        if (e.t !== "z") switch (e.t) {
            case "b":
                n = e.v ? "1" : "0";
                break;
            case "n":
                n = "" + e.v;
                break;
            case "e":
                n = $n[e.v];
                break;
            case "d":
                if (a && a.cellDates) n = wr(e.v, -1).toISOString();
                else {
                    e = Tr(e);
                    e.t = "n";
                    n = "" + (e.v = lr(wr(e.v)))
                }
                if (typeof e.z === "undefined") e.z = Y[14];
                break;
            default:
                n = e.v;
                break;
        }
        var f = yt("v", tt(n)),
            o = {
                r: r
            };
        var c = Md(a.cellXfs, e, a);
        if (c !== 0) o.s = c;
        switch (e.t) {
            case "n":
                break;
            case "d":
                o.t = "d";
                break;
            case "b":
                o.t = "b";
                break;
            case "e":
                o.t = "e";
                break;
            case "z":
                break;
            default:
                if (e.v == null) {
                    delete e.t;
                    break
                }
                if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
                if (a && a.bookSST) {
                    f = yt("v", "" + Dd(a.Strings, e.v, a.revStrings));
                    o.t = "s";
                    break
                }
                o.t = "str";
                break;
        }
        if (e.t != i) {
            e.t = i;
            e.v = s
        }
        if (typeof e.f == "string" && e.f) {
            var l = e.F && e.F.slice(0, r.length) == r ? {
                t: "array",
                ref: e.F
            } : null;
            f = _t("f", tt(e.f), l) + (e.v != null ? f : "")
        }
        if (e.l) t["!links"].push([r, e.l]);
        if (e.D) o.cm = 1;
        return _t("c", f, o)
    }
    var mv = function () {
        var e = /<(?:\w+:)?c[ \/>]/,
            r = /<\/(?:\w+:)?row>/;
        var t = /r=["']([^"']*)["']/,
            a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;
        var n = /ref=["']([^"']*)["']/;
        var i = mt("v"),
            s = mt("f");
        return function f(o, c, l, u, h, d) {
            var v = 0,
                p = "",
                m = [],
                b = [],
                g = 0,
                w = 0,
                k = 0,
                T = "",
                E;
            var y, S = 0,
                _ = 0;
            var A, x;
            var C = 0,
                R = 0;
            var O = Array.isArray(d.CellXf),
                I;
            var N = [];
            var F = [];
            var D = Array.isArray(c);
            var P = [],
                L = {},
                M = false;
            var U = !!l.sheetStubs;
            for (var B = o.split(r), W = 0, H = B.length; W != H; ++W) {
                p = B[W].trim();
                var z = p.length;
                if (z === 0) continue;
                var V = 0;
                e: for (v = 0; v < z; ++v) switch (p[v]) {
                    case ">":
                        if (p[v - 1] != "/") {
                            ++v;
                            break e
                        }
                        if (l && l.cellStyles) {
                            y = Kr(p.slice(V, v), true);
                            S = y.r != null ? parseInt(y.r, 10) : S + 1;
                            _ = -1;
                            if (l.sheetRows && l.sheetRows < S) continue;
                            L = {};
                            M = false;
                            if (y.ht) {
                                M = true;
                                L.hpt = parseFloat(y.ht);
                                L.hpx = Uc(L.hpt)
                            }
                            if (y.hidden && ct(y.hidden)) {
                                M = true;
                                L.hidden = true
                            }
                            if (y.outlineLevel != null) {
                                M = true;
                                L.level = +y.outlineLevel
                            }
                            if (M) P[S - 1] = L
                        }
                        break;
                    case "<":
                        V = v;
                        break;
                }
                if (V >= v) break;
                y = Kr(p.slice(V, v), true);
                S = y.r != null ? parseInt(y.r, 10) : S + 1;
                _ = -1;
                if (l.sheetRows && l.sheetRows < S) continue;
                if (u.s.r > S - 1) u.s.r = S - 1;
                if (u.e.r < S - 1) u.e.r = S - 1;
                if (l && l.cellStyles) {
                    L = {};
                    M = false;
                    if (y.ht) {
                        M = true;
                        L.hpt = parseFloat(y.ht);
                        L.hpx = Uc(L.hpt)
                    }
                    if (y.hidden && ct(y.hidden)) {
                        M = true;
                        L.hidden = true
                    }
                    if (y.outlineLevel != null) {
                        M = true;
                        L.level = +y.outlineLevel
                    }
                    if (M) P[S - 1] = L
                }
                m = p.slice(v).split(e);
                for (var G = 0; G != m.length; ++G)
                    if (m[G].trim().charAt(0) != "<") break;
                m = m.slice(G);
                for (v = 0; v != m.length; ++v) {
                    p = m[v].trim();
                    if (p.length === 0) continue;
                    b = p.match(t);
                    g = v;
                    w = 0;
                    k = 0;
                    p = "<c " + (p.slice(0, 1) == "<" ? ">" : "") + p;
                    if (b != null && b.length === 2) {
                        g = 0;
                        T = b[1];
                        for (w = 0; w != T.length; ++w) {
                            if ((k = T.charCodeAt(w) - 64) < 1 || k > 26) break;
                            g = 26 * g + k
                        }--g;
                        _ = g
                    } else ++_;
                    for (w = 0; w != p.length; ++w)
                        if (p.charCodeAt(w) === 62) break;
                    ++w;
                    y = Kr(p.slice(0, w), true);
                    if (!y.r) y.r = Pa({
                        r: S - 1,
                        c: _
                    });
                    T = p.slice(w);
                    E = {
                        t: ""
                    };
                    if ((b = T.match(i)) != null && b[1] !== "") E.v = Qr(b[1]);
                    if (l.cellFormula) {
                        if ((b = T.match(s)) != null && b[1] !== "") {
                            E.f = Qr(vt(b[1]), true);
                            if (!l.xlfn) E.f = Pu(E.f);
                            if (b[0].indexOf('t="array"') > -1) {
                                E.F = (T.match(n) || [])[1];
                                if (E.F.indexOf(":") > -1) N.push([Ua(E.F), E.F])
                            } else if (b[0].indexOf('t="shared"') > -1) {
                                x = Kr(b[0]);
                                var j = Qr(vt(b[1]));
                                if (!l.xlfn) j = Pu(j);
                                F[parseInt(x.si, 10)] = [x, j, y.r]
                            }
                        } else if (b = T.match(/<f[^>]*\/>/)) {
                            x = Kr(b[0]);
                            if (F[x.si]) E.f = Fu(F[x.si][1], F[x.si][2], y.r)
                        }
                        var X = Da(y.r);
                        for (w = 0; w < N.length; ++w)
                            if (X.r >= N[w][0].s.r && X.r <= N[w][0].e.r)
                                if (X.c >= N[w][0].s.c && X.c <= N[w][0].e.c) E.F = N[w][1]
                    }
                    if (y.t == null && E.v === undefined) {
                        if (E.f || E.F) {
                            E.v = 0;
                            E.t = "n"
                        } else if (!U) continue;
                        else E.t = "z"
                    } else E.t = y.t || "n";
                    if (u.s.c > _) u.s.c = _;
                    if (u.e.c < _) u.e.c = _;
                    switch (E.t) {
                        case "n":
                            if (E.v == "" || E.v == null) {
                                if (!U) continue;
                                E.t = "z"
                            } else E.v = parseFloat(E.v);
                            break;
                        case "s":
                            if (typeof E.v == "undefined") {
                                if (!U) continue;
                                E.t = "z"
                            } else {
                                A = Id[parseInt(E.v, 10)];
                                E.v = A.t;
                                E.r = A.r;
                                if (l.cellHTML) E.h = A.h
                            }
                            break;
                        case "str":
                            E.t = "s";
                            E.v = E.v != null ? Qr(vt(E.v), true) : "";
                            if (l.cellHTML) E.h = it(E.v);
                            break;
                        case "inlineStr":
                            b = T.match(a);
                            E.t = "s";
                            if (b != null && (A = Uo(b[1]))) {
                                E.v = A.t;
                                if (l.cellHTML) E.h = A.h
                            } else E.v = "";
                            break;
                        case "b":
                            E.v = ct(E.v);
                            break;
                        case "d":
                            if (l.cellDates) E.v = wr(E.v, 1);
                            else {
                                E.v = lr(wr(E.v, 1));
                                E.t = "n"
                            }
                            break;
                        case "e":
                            if (!l || l.cellText !== false) E.w = E.v;
                            E.v = Yn[E.v];
                            break;
                    }
                    C = R = 0;
                    I = null;
                    if (O && y.s !== undefined) {
                        I = d.CellXf[y.s];
                        if (I != null) {
                            if (I.numFmtId != null) C = I.numFmtId;
                            if (l.cellStyles) {
                                if (I.fillId != null) R = I.fillId
                            }
                        }
                    }
                    Ud(E, C, R, l, h, d);
                    if (l.cellDates && O && E.t == "n" && Pe(Y[C])) {
                        E.t = "d";
                        E.v = vr(E.v)
                    }
                    if (y.cm && l.xlmeta) {
                        var $ = (l.xlmeta.Cell || [])[+y.cm - 1];
                        if ($ && $.type == "XLDAPR") E.D = true
                    }
                    if (D) {
                        var K = Da(y.r);
                        if (!c[K.r]) c[K.r] = [];
                        c[K.r][K.c] = E
                    } else c[y.r] = E
                }
            }
            if (P.length > 0) c["!rows"] = P
        }
    }();

    function bv(e, r, t, a) {
        var n = [],
            i = [],
            s = Ua(e["!ref"]),
            f = "",
            o, c = "",
            l = [],
            u = 0,
            h = 0,
            d = e["!rows"];
        var v = Array.isArray(e);
        var p = {
                r: c
            },
            m, b = -1;
        for (h = s.s.c; h <= s.e.c; ++h) l[h] = Oa(h);
        for (u = s.s.r; u <= s.e.r; ++u) {
            i = [];
            c = Aa(u);
            for (h = s.s.c; h <= s.e.c; ++h) {
                o = l[h] + c;
                var g = v ? (e[u] || [])[h] : e[o];
                if (g === undefined) continue;
                if ((f = pv(g, o, e, r, t, a)) != null) i.push(f)
            }
            if (i.length > 0 || d && d[u]) {
                p = {
                    r: c
                };
                if (d && d[u]) {
                    m = d[u];
                    if (m.hidden) p.hidden = 1;
                    b = -1;
                    if (m.hpx) b = Mc(m.hpx);
                    else if (m.hpt) b = m.hpt;
                    if (b > -1) {
                        p.ht = b;
                        p.customHeight = 1
                    }
                    if (m.level) {
                        p.outlineLevel = m.level
                    }
                }
                n[n.length] = _t("row", i.join(""), p)
            }
        }
        if (d)
            for (; u < d.length; ++u) {
                if (d && d[u]) {
                    p = {
                        r: u + 1
                    };
                    m = d[u];
                    if (m.hidden) p.hidden = 1;
                    b = -1;
                    if (m.hpx) b = Mc(m.hpx);
                    else if (m.hpt) b = m.hpt;
                    if (b > -1) {
                        p.ht = b;
                        p.customHeight = 1
                    }
                    if (m.level) {
                        p.outlineLevel = m.level
                    }
                    n[n.length] = _t("row", "", p)
                }
            }
        return n.join("")
    }

    function gv(e, r, t, a) {
        var n = [zr, _t("worksheet", null, {
            xmlns: It[0],
            "xmlns:r": Ot.r
        })];
        var i = t.SheetNames[e],
            s = 0,
            f = "";
        var o = t.Sheets[i];
        if (o == null) o = {};
        var c = o["!ref"] || "A1";
        var l = Ua(c);
        if (l.e.c > 16383 || l.e.r > 1048575) {
            if (r.WTF) throw new Error("Range " + c + " exceeds format limit A1:XFD1048576");
            l.e.c = Math.min(l.e.c, 16383);
            l.e.r = Math.min(l.e.c, 1048575);
            c = Ma(l)
        }
        if (!a) a = {};
        o["!comments"] = [];
        var u = [];
        rv(o, t, e, r, n);
        n[n.length] = _t("dimension", null, {
            ref: c
        });
        n[n.length] = vv(o, r, e, t);
        if (r.sheetFormat) n[n.length] = _t("sheetFormatPr", null, {
            defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
            baseColWidth: r.sheetFormat.baseColWidth || "10",
            outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
        });
        if (o["!cols"] != null && o["!cols"].length > 0) n[n.length] = cv(o, o["!cols"]);
        n[s = n.length] = "<sheetData/>";
        o["!links"] = [];
        if (o["!ref"] != null) {
            f = bv(o, r, e, t, a);
            if (f.length > 0) n[n.length] = f
        }
        if (n.length > s + 1) {
            n[n.length] = "</sheetData>";
            n[s] = n[s].replace("/>", ">")
        }
        if (o["!protect"]) n[n.length] = nv(o["!protect"]);
        if (o["!autofilter"] != null) n[n.length] = uv(o["!autofilter"], o, t, e);
        if (o["!merges"] != null && o["!merges"].length > 0) n[n.length] = Zd(o["!merges"]);
        var h = -1,
            d, v = -1;
        if (o["!links"].length > 0) {
            n[n.length] = "<hyperlinks>";
            o["!links"].forEach(function (e) {
                if (!e[1].Target) return;
                d = {
                    ref: e[0]
                };
                if (e[1].Target.charAt(0) != "#") {
                    v = ni(a, -1, tt(e[1].Target).replace(/#.*$/, ""), ei.HLINK);
                    d["r:id"] = "rId" + v
                }
                if ((h = e[1].Target.indexOf("#")) > -1) d.location = tt(e[1].Target.slice(h + 1));
                if (e[1].Tooltip) d.tooltip = tt(e[1].Tooltip);
                n[n.length] = _t("hyperlink", null, d)
            });
            n[n.length] = "</hyperlinks>"
        }
        delete o["!links"];
        if (o["!margins"] != null) n[n.length] = fv(o["!margins"]);
        if (!r || r.ignoreEC || r.ignoreEC == void 0) n[n.length] = yt("ignoredErrors", _t("ignoredError", null, {
            numberStoredAsText: 1,
            sqref: c
        }));
        if (u.length > 0) {
            v = ni(a, -1, "../drawings/drawing" + (e + 1) + ".xml", ei.DRAW);
            n[n.length] = _t("drawing", null, {
                "r:id": "rId" + v
            });
            o["!drawing"] = u
        }
        if (o["!comments"].length > 0) {
            v = ni(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", ei.VML);
            n[n.length] = _t("legacyDrawing", null, {
                "r:id": "rId" + v
            });
            o["!legacy"] = v
        }
        if (n.length > 1) {
            n[n.length] = "</worksheet>";
            n[1] = n[1].replace("/>", ">")
        }
        return n.join("")
    }

    function wv(e, r) {
        var t = {};
        var a = e.l + r;
        t.r = e._R(4);
        e.l += 4;
        var n = e._R(2);
        e.l += 1;
        var i = e._R(1);
        e.l = a;
        if (i & 7) t.level = i & 7;
        if (i & 16) t.hidden = true;
        if (i & 32) t.hpt = n / 20;
        return t
    }

    function kv(e, r, t) {
        var a = ba(17 + 8 * 16);
        var n = (t["!rows"] || [])[e] || {};
        a._W(4, e);
        a._W(4, 0);
        var i = 320;
        if (n.hpx) i = Mc(n.hpx) * 20;
        else if (n.hpt) i = n.hpt * 20;
        a._W(2, i);
        a._W(1, 0);
        var s = 0;
        if (n.level) s |= n.level;
        if (n.hidden) s |= 16;
        if (n.hpx || n.hpt) s |= 32;
        a._W(1, s);
        a._W(1, 0);
        var f = 0,
            o = a.l;
        a.l += 4;
        var c = {
            r: e,
            c: 0
        };
        for (var l = 0; l < 16; ++l) {
            if (r.s.c > l + 1 << 10 || r.e.c < l << 10) continue;
            var u = -1,
                h = -1;
            for (var d = l << 10; d < l + 1 << 10; ++d) {
                c.c = d;
                var v = Array.isArray(t) ? (t[c.r] || [])[c.c] : t[Pa(c)];
                if (v) {
                    if (u < 0) u = d;
                    h = d
                }
            }
            if (u < 0) continue;
            ++f;
            a._W(4, u);
            a._W(4, h)
        }
        var p = a.l;
        a.l = o;
        a._W(4, f);
        a.l = p;
        return a.length > a.l ? a.slice(0, a.l) : a
    }

    function Tv(e, r, t, a) {
        var n = kv(a, t, r);
        if (n.length > 17 || (r["!rows"] || [])[a]) ka(e, 0, n)
    }
    var Ev = mn;
    var yv = bn;

    function Sv() {}

    function _v(e, r) {
        var t = {};
        var a = e[e.l];
        ++e.l;
        t.above = !(a & 64);
        t.left = !(a & 128);
        e.l += 18;
        t.name = nn(e, r - 19);
        return t
    }

    function Av(e, r, t) {
        if (t == null) t = ba(84 + 4 * e.length);
        var a = 192;
        if (r) {
            if (r.above) a &= ~64;
            if (r.left) a &= ~128
        }
        t._W(1, a);
        for (var n = 1; n < 3; ++n) t._W(1, 0);
        Tn({
            auto: 1
        }, t);
        t._W(-4, -1);
        t._W(-4, -1);
        sn(e, t);
        return t.slice(0, t.l)
    }

    function xv(e) {
        var r = en(e);
        return [r]
    }

    function Cv(e, r, t) {
        if (t == null) t = ba(8);
        return rn(r, t)
    }

    function Rv(e) {
        var r = tn(e);
        return [r]
    }

    function Ov(e, r, t) {
        if (t == null) t = ba(4);
        return an(r, t)
    }

    function Iv(e) {
        var r = en(e);
        var t = e._R(1);
        return [r, t, "b"]
    }

    function Nv(e, r, t) {
        if (t == null) t = ba(9);
        rn(r, t);
        t._W(1, e.v ? 1 : 0);
        return t
    }

    function Fv(e) {
        var r = tn(e);
        var t = e._R(1);
        return [r, t, "b"]
    }

    function Dv(e, r, t) {
        if (t == null) t = ba(5);
        an(r, t);
        t._W(1, e.v ? 1 : 0);
        return t
    }

    function Pv(e) {
        var r = en(e);
        var t = e._R(1);
        return [r, t, "e"]
    }

    function Lv(e, r, t) {
        if (t == null) t = ba(9);
        rn(r, t);
        t._W(1, e.v);
        return t
    }

    function Mv(e) {
        var r = tn(e);
        var t = e._R(1);
        return [r, t, "e"]
    }

    function Uv(e, r, t) {
        if (t == null) t = ba(8);
        an(r, t);
        t._W(1, e.v);
        t._W(2, 0);
        t._W(1, 0);
        return t
    }

    function Bv(e) {
        var r = en(e);
        var t = e._R(4);
        return [r, t, "s"]
    }

    function Wv(e, r, t) {
        if (t == null) t = ba(12);
        rn(r, t);
        t._W(4, r.v);
        return t
    }

    function Hv(e) {
        var r = tn(e);
        var t = e._R(4);
        return [r, t, "s"]
    }

    function zv(e, r, t) {
        if (t == null) t = ba(8);
        an(r, t);
        t._W(4, r.v);
        return t
    }

    function Vv(e) {
        var r = en(e);
        var t = gn(e);
        return [r, t, "n"]
    }

    function Gv(e, r, t) {
        if (t == null) t = ba(16);
        rn(r, t);
        wn(e.v, t);
        return t
    }

    function jv(e) {
        var r = tn(e);
        var t = gn(e);
        return [r, t, "n"]
    }

    function Xv(e, r, t) {
        if (t == null) t = ba(12);
        an(r, t);
        wn(e.v, t);
        return t
    }

    function $v(e) {
        var r = en(e);
        var t = hn(e);
        return [r, t, "n"]
    }

    function Yv(e, r, t) {
        if (t == null) t = ba(12);
        rn(r, t);
        dn(e.v, t);
        return t
    }

    function Kv(e) {
        var r = tn(e);
        var t = hn(e);
        return [r, t, "n"]
    }

    function Jv(e, r, t) {
        if (t == null) t = ba(8);
        an(r, t);
        dn(e.v, t);
        return t
    }

    function qv(e) {
        var r = en(e);
        var t = Ja(e);
        return [r, t, "is"]
    }

    function Zv(e) {
        var r = en(e);
        var t = Xa(e);
        return [r, t, "str"]
    }

    function Qv(e, r, t) {
        if (t == null) t = ba(12 + 4 * e.v.length);
        rn(r, t);
        $a(e.v, t);
        return t.length > t.l ? t.slice(0, t.l) : t
    }

    function ep(e) {
        var r = tn(e);
        var t = Xa(e);
        return [r, t, "str"]
    }

    function rp(e, r, t) {
        if (t == null) t = ba(8 + 4 * e.v.length);
        an(r, t);
        $a(e.v, t);
        return t.length > t.l ? t.slice(0, t.l) : t
    }

    function tp(e, r, t) {
        var a = e.l + r;
        var n = en(e);
        n.r = t["!row"];
        var i = e._R(1);
        var s = [n, i, "b"];
        if (t.cellFormula) {
            e.l += 2;
            var f = Td(e, a - e.l, t);
            s[3] = ld(f, null, n, t.supbooks, t)
        } else e.l = a;
        return s
    }

    function ap(e, r, t) {
        var a = e.l + r;
        var n = en(e);
        n.r = t["!row"];
        var i = e._R(1);
        var s = [n, i, "e"];
        if (t.cellFormula) {
            e.l += 2;
            var f = Td(e, a - e.l, t);
            s[3] = ld(f, null, n, t.supbooks, t)
        } else e.l = a;
        return s
    }

    function np(e, r, t) {
        var a = e.l + r;
        var n = en(e);
        n.r = t["!row"];
        var i = gn(e);
        var s = [n, i, "n"];
        if (t.cellFormula) {
            e.l += 2;
            var f = Td(e, a - e.l, t);
            s[3] = ld(f, null, n, t.supbooks, t)
        } else e.l = a;
        return s
    }

    function ip(e, r, t) {
        var a = e.l + r;
        var n = en(e);
        n.r = t["!row"];
        var i = Xa(e);
        var s = [n, i, "str"];
        if (t.cellFormula) {
            e.l += 2;
            var f = Td(e, a - e.l, t);
            s[3] = ld(f, null, n, t.supbooks, t)
        } else e.l = a;
        return s
    }
    var sp = mn;
    var fp = bn;

    function op(e, r) {
        if (r == null) r = ba(4);
        r._W(4, e);
        return r
    }

    function cp(e, r) {
        var t = e.l + r;
        var a = mn(e, 16);
        var n = fn(e);
        var i = Xa(e);
        var s = Xa(e);
        var f = Xa(e);
        e.l = t;
        var o = {
            rfx: a,
            relId: n,
            loc: i,
            display: f
        };
        if (s) o.Tooltip = s;
        return o
    }

    function lp(e, r) {
        var t = ba(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
        bn({
            s: Da(e[0]),
            e: Da(e[0])
        }, t);
        un("rId" + r, t);
        var a = e[1].Target.indexOf("#");
        var n = a == -1 ? "" : e[1].Target.slice(a + 1);
        $a(n || "", t);
        $a(e[1].Tooltip || "", t);
        $a("", t);
        return t.slice(0, t.l)
    }

    function up() {}

    function hp(e, r, t) {
        var a = e.l + r;
        var n = vn(e, 16);
        var i = e._R(1);
        var s = [n];
        s[2] = i;
        if (t.cellFormula) {
            var f = kd(e, a - e.l, t);
            s[1] = f
        } else e.l = a;
        return s
    }

    function dp(e, r, t) {
        var a = e.l + r;
        var n = mn(e, 16);
        var i = [n];
        if (t.cellFormula) {
            var s = yd(e, a - e.l, t);
            i[1] = s;
            e.l = a
        } else e.l = a;
        return i
    }

    function vp(e, r, t) {
        if (t == null) t = ba(18);
        var a = Pd(e, r);
        t._W(-4, e);
        t._W(-4, e);
        t._W(4, (a.width || 10) * 256);
        t._W(4, 0);
        var n = 0;
        if (r.hidden) n |= 1;
        if (typeof a.width == "number") n |= 2;
        if (r.level) n |= r.level << 8;
        t._W(2, n);
        return t
    }
    var pp = ["left", "right", "top", "bottom", "header", "footer"];

    function mp(e) {
        var r = {};
        pp.forEach(function (t) {
            r[t] = gn(e, 8)
        });
        return r
    }

    function bp(e, r) {
        if (r == null) r = ba(6 * 8);
        Ld(e);
        pp.forEach(function (t) {
            wn(e[t], r)
        });
        return r
    }

    function gp(e) {
        var r = e._R(2);
        e.l += 28;
        return {
            RTL: r & 32
        }
    }

    function wp(e, r, t) {
        if (t == null) t = ba(30);
        var a = 924;
        if ((((r || {}).Views || [])[0] || {}).RTL) a |= 32;
        t._W(2, a);
        t._W(4, 0);
        t._W(4, 0);
        t._W(4, 0);
        t._W(1, 0);
        t._W(1, 0);
        t._W(2, 0);
        t._W(2, 100);
        t._W(2, 0);
        t._W(2, 0);
        t._W(2, 0);
        t._W(4, 0);
        return t
    }

    function kp(e) {
        var r = ba(24);
        r._W(4, 4);
        r._W(4, 1);
        bn(e, r);
        return r
    }

    function Tp(e, r) {
        if (r == null) r = ba(16 * 4 + 2);
        r._W(2, e.password ? hc(e.password) : 0);
        r._W(4, 1);
        [
            ["objects", false],
            ["scenarios", false],
            ["formatCells", true],
            ["formatColumns", true],
            ["formatRows", true],
            ["insertColumns", true],
            ["insertRows", true],
            ["insertHyperlinks", true],
            ["deleteColumns", true],
            ["deleteRows", true],
            ["selectLockedCells", false],
            ["sort", true],
            ["autoFilter", true],
            ["pivotTables", true],
            ["selectUnlockedCells", false]
        ].forEach(function (t) {
            if (t[1]) r._W(4, e[t[0]] != null && !e[t[0]] ? 1 : 0);
            else r._W(4, e[t[0]] != null && e[t[0]] ? 0 : 1)
        });
        return r
    }

    function Ep() {}

    function yp() {}

    function Sp(e, r, t, a, n, i, s) {
        if (!e) return e;
        var f = r || {};
        if (!a) a = {
            "!id": {}
        };
        if (b != null && f.dense == null) f.dense = b;
        var o = f.dense ? [] : {};
        var c;
        var l = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        };
        var u = [];
        var h = false,
            d = false;
        var v, p, m, g, w, k, T, E, y;
        var S = [];
        f.biff = 12;
        f["!row"] = 0;
        var _ = 0,
            A = false;
        var x = [];
        var C = {};
        var R = f.supbooks || n.supbooks || [
            []
        ];
        R.sharedf = C;
        R.arrayf = x;
        R.SheetNames = n.SheetNames || n.Sheets.map(function (e) {
            return e.name
        });
        if (!f.supbooks) {
            f.supbooks = R;
            if (n.Names)
                for (var O = 0; O < n.Names.length; ++O) R[0][O + 1] = n.Names[O]
        }
        var I = [],
            N = [];
        var F = false;
        cb[16] = {
            n: "BrtShortReal",
            f: jv
        };
        var D, P;
        ga(e, function M(e, r, b) {
            if (d) return;
            switch (b) {
                case 148:
                    c = e;
                    break;
                case 0:
                    v = e;
                    if (f.sheetRows && f.sheetRows <= v.r) d = true;
                    E = Aa(g = v.r);
                    f["!row"] = v.r;
                    if (e.hidden || e.hpt || e.level != null) {
                        if (e.hpt) e.hpx = Uc(e.hpt);
                        N[e.r] = e
                    }
                    break;
                case 2:
                    ;
                case 3:
                    ;
                case 4:
                    ;
                case 5:
                    ;
                case 6:
                    ;
                case 7:
                    ;
                case 8:
                    ;
                case 9:
                    ;
                case 10:
                    ;
                case 11:
                    ;
                case 13:
                    ;
                case 14:
                    ;
                case 15:
                    ;
                case 16:
                    ;
                case 17:
                    ;
                case 18:
                    ;
                case 62:
                    p = {
                        t: e[2]
                    };
                    switch (e[2]) {
                        case "n":
                            p.v = e[1];
                            break;
                        case "s":
                            T = Id[e[1]];
                            p.v = T.t;
                            p.r = T.r;
                            break;
                        case "b":
                            p.v = e[1] ? true : false;
                            break;
                        case "e":
                            p.v = e[1];
                            if (f.cellText !== false) p.w = $n[p.v];
                            break;
                        case "str":
                            p.t = "s";
                            p.v = e[1];
                            break;
                        case "is":
                            p.t = "s";
                            p.v = e[1].t;
                            break;
                    }
                    if (m = s.CellXf[e[0].iStyleRef]) Ud(p, m.numFmtId, null, f, i, s);
                    w = e[0].c == -1 ? w + 1 : e[0].c;
                    if (f.dense) {
                        if (!o[g]) o[g] = [];
                        o[g][w] = p
                    } else o[Oa(w) + E] = p;
                    if (f.cellFormula) {
                        A = false;
                        for (_ = 0; _ < x.length; ++_) {
                            var O = x[_];
                            if (v.r >= O[0].s.r && v.r <= O[0].e.r)
                                if (w >= O[0].s.c && w <= O[0].e.c) {
                                    p.F = Ma(O[0]);
                                    A = true
                                }
                        }
                        if (!A && e.length > 3) p.f = e[3]
                    }
                    if (l.s.r > v.r) l.s.r = v.r;
                    if (l.s.c > w) l.s.c = w;
                    if (l.e.r < v.r) l.e.r = v.r;
                    if (l.e.c < w) l.e.c = w;
                    if (f.cellDates && m && p.t == "n" && Pe(Y[m.numFmtId])) {
                        var L = Z(p.v);
                        if (L) {
                            p.t = "d";
                            p.v = new Date(L.y, L.m - 1, L.d, L.H, L.M, L.S, L.u)
                        }
                    }
                    if (D) {
                        if (D.type == "XLDAPR") p.D = true;
                        D = void 0
                    }
                    if (P) P = void 0;
                    break;
                case 1:
                    ;
                case 12:
                    if (!f.sheetStubs || h) break;
                    p = {
                        t: "z",
                        v: void 0
                    };
                    w = e[0].c == -1 ? w + 1 : e[0].c;
                    if (f.dense) {
                        if (!o[g]) o[g] = [];
                        o[g][w] = p
                    } else o[Oa(w) + E] = p;
                    if (l.s.r > v.r) l.s.r = v.r;
                    if (l.s.c > w) l.s.c = w;
                    if (l.e.r < v.r) l.e.r = v.r;
                    if (l.e.c < w) l.e.c = w;
                    if (D) {
                        if (D.type == "XLDAPR") p.D = true;
                        D = void 0
                    }
                    if (P) P = void 0;
                    break;
                case 176:
                    S.push(e);
                    break;
                case 49: {
                    D = ((f.xlmeta || {}).Cell || [])[e - 1]
                }
                break;
            case 494:
                var M = a["!id"][e.relId];
                if (M) {
                    e.Target = M.Target;
                    if (e.loc) e.Target += "#" + e.loc;
                    e.Rel = M
                } else if (e.relId == "") {
                    e.Target = "#" + e.loc
                }
                for (g = e.rfx.s.r; g <= e.rfx.e.r; ++g)
                    for (w = e.rfx.s.c; w <= e.rfx.e.c; ++w) {
                        if (f.dense) {
                            if (!o[g]) o[g] = [];
                            if (!o[g][w]) o[g][w] = {
                                t: "z",
                                v: undefined
                            };
                            o[g][w].l = e
                        } else {
                            k = Pa({
                                c: w,
                                r: g
                            });
                            if (!o[k]) o[k] = {
                                t: "z",
                                v: undefined
                            };
                            o[k].l = e
                        }
                    }
                break;
            case 426:
                if (!f.cellFormula) break;
                x.push(e);
                y = f.dense ? o[g][w] : o[Oa(w) + E];
                y.f = ld(e[1], l, {
                    r: v.r,
                    c: w
                }, R, f);
                y.F = Ma(e[0]);
                break;
            case 427:
                if (!f.cellFormula) break;
                C[Pa(e[0].s)] = e[1];
                y = f.dense ? o[g][w] : o[Oa(w) + E];
                y.f = ld(e[1], l, {
                    r: v.r,
                    c: w
                }, R, f);
                break;
            case 60:
                if (!f.cellStyles) break;
                while (e.e >= e.s) {
                    I[e.e--] = {
                        width: e.w / 256,
                        hidden: !!(e.flags & 1),
                        level: e.level
                    };
                    if (!F) {
                        F = true;
                        Fc(e.w / 256)
                    }
                    Dc(I[e.e + 1])
                }
                break;
            case 161:
                o["!autofilter"] = {
                    ref: Ma(e)
                };
                break;
            case 476:
                o["!margins"] = e;
                break;
            case 147:
                if (!n.Sheets[t]) n.Sheets[t] = {};
                if (e.name) n.Sheets[t].CodeName = e.name;
                if (e.above || e.left) o["!outline"] = {
                    above: e.above,
                    left: e.left
                };
                break;
            case 137:
                if (!n.Views) n.Views = [{}];
                if (!n.Views[0]) n.Views[0] = {};
                if (e.RTL) n.Views[0].RTL = true;
                break;
            case 485:
                break;
            case 64:
                ;
            case 1053:
                break;
            case 151:
                break;
            case 152:
                ;
            case 175:
                ;
            case 644:
                ;
            case 625:
                ;
            case 562:
                ;
            case 396:
                ;
            case 1112:
                ;
            case 1146:
                ;
            case 471:
                ;
            case 1050:
                ;
            case 649:
                ;
            case 1105:
                ;
            case 589:
                ;
            case 607:
                ;
            case 564:
                ;
            case 1055:
                ;
            case 168:
                ;
            case 174:
                ;
            case 1180:
                ;
            case 499:
                ;
            case 507:
                ;
            case 550:
                ;
            case 171:
                ;
            case 167:
                ;
            case 1177:
                ;
            case 169:
                ;
            case 1181:
                ;
            case 551:
                ;
            case 552:
                ;
            case 661:
                ;
            case 639:
                ;
            case 478:
                ;
            case 537:
                ;
            case 477:
                ;
            case 536:
                ;
            case 1103:
                ;
            case 680:
                ;
            case 1104:
                ;
            case 1024:
                ;
            case 663:
                ;
            case 535:
                ;
            case 678:
                ;
            case 504:
                ;
            case 1043:
                ;
            case 428:
                ;
            case 170:
                ;
            case 3072:
                ;
            case 50:
                ;
            case 2070:
                ;
            case 1045:
                break;
            case 35:
                h = true;
                break;
            case 36:
                h = false;
                break;
            case 37:
                u.push(b);
                h = true;
                break;
            case 38:
                u.pop();
                h = false;
                break;
            default:
                if (r.T) {} else if (!h || f.WTF) throw new Error("Unexpected record 0x" + b.toString(16));
            }
        }, f);
        delete f.supbooks;
        delete f["!row"];
        if (!o["!ref"] && (l.s.r < 2e6 || c && (c.e.r > 0 || c.e.c > 0 || c.s.r > 0 || c.s.c > 0))) o["!ref"] = Ma(c || l);
        if (f.sheetRows && o["!ref"]) {
            var L = Ua(o["!ref"]);
            if (f.sheetRows <= +L.e.r) {
                L.e.r = f.sheetRows - 1;
                if (L.e.r > l.e.r) L.e.r = l.e.r;
                if (L.e.r < L.s.r) L.s.r = L.e.r;
                if (L.e.c > l.e.c) L.e.c = l.e.c;
                if (L.e.c < L.s.c) L.s.c = L.e.c;
                o["!fullref"] = o["!ref"];
                o["!ref"] = Ma(L)
            }
        }
        if (S.length > 0) o["!merges"] = S;
        if (I.length > 0) o["!cols"] = I;
        if (N.length > 0) o["!rows"] = N;
        return o
    }

    function _p(e, r, t, a, n, i, s) {
        var f = {
            r: t,
            c: a
        };
        if (r.c) i["!comments"].push([Pa(f), r.c]);
        if (r.v === undefined) return false;
        var o = "";
        switch (r.t) {
            case "b":
                o = r.v ? "1" : "0";
                break;
            case "d":
                r = Tr(r);
                r.z = r.z || Y[14];
                r.v = lr(wr(r.v));
                r.t = "n";
                break;
            case "n":
                ;
            case "e":
                o = "" + r.v;
                break;
            default:
                o = r.v;
                break;
        }
        f.s = Md(n.cellXfs, r, n);
        if (r.l) i["!links"].push([Pa(f), r.l]);
        switch (r.t) {
            case "s":
                ;
            case "str":
                if (n.bookSST) {
                    o = Dd(n.Strings, r.v, n.revStrings);
                    f.t = "s";
                    f.v = o;
                    if (s) ka(e, 18, zv(r, f));
                    else ka(e, 7, Wv(r, f))
                } else {
                    f.t = "str";
                    if (s) ka(e, 17, rp(r, f));
                    else ka(e, 6, Qv(r, f))
                }
                return true;
            case "n":
                if (r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3) {
                    if (s) ka(e, 13, Jv(r, f));
                    else ka(e, 2, Yv(r, f))
                } else {
                    if (s) ka(e, 16, Xv(r, f));
                    else ka(e, 5, Gv(r, f))
                }
                return true;
            case "b":
                f.t = "b";
                if (s) ka(e, 15, Dv(r, f));
                else ka(e, 4, Nv(r, f));
                return true;
            case "e":
                f.t = "e";
                if (s) ka(e, 14, Uv(r, f));
                else ka(e, 3, Lv(r, f));
                return true;
        }
        if (s) ka(e, 12, Ov(r, f));
        else ka(e, 1, Cv(r, f));
        return true
    }

    function Ap(e, r, t, a) {
        var n = Ua(r["!ref"] || "A1"),
            i, s = "",
            f = [];
        ka(e, 145);
        var o = Array.isArray(r);
        var c = n.e.r;
        if (r["!rows"]) c = Math.max(n.e.r, r["!rows"].length - 1);
        for (var l = n.s.r; l <= c; ++l) {
            s = Aa(l);
            Tv(e, r, n, l);
            var u = false;
            if (l <= n.e.r)
                for (var h = n.s.c; h <= n.e.c; ++h) {
                    if (l === n.s.r) f[h] = Oa(h);
                    i = f[h] + s;
                    var d = o ? (r[l] || [])[h] : r[i];
                    if (!d) {
                        u = false;
                        continue
                    }
                    u = _p(e, d, l, h, a, r, u)
                }
        }
        ka(e, 146)
    }

    function xp(e, r) {
        if (!r || !r["!merges"]) return;
        ka(e, 177, op(r["!merges"].length));
        r["!merges"].forEach(function (r) {
            ka(e, 176, fp(r))
        });
        ka(e, 178)
    }

    function Cp(e, r) {
        if (!r || !r["!cols"]) return;
        ka(e, 390);
        r["!cols"].forEach(function (r, t) {
            if (r) ka(e, 60, vp(t, r))
        });
        ka(e, 391)
    }

    function Rp(e, r) {
        if (!r || !r["!ref"]) return;
        ka(e, 648);
        ka(e, 649, kp(Ua(r["!ref"])));
        ka(e, 650)
    }

    function Op(e, r, t) {
        r["!links"].forEach(function (r) {
            if (!r[1].Target) return;
            var a = ni(t, -1, r[1].Target.replace(/#.*$/, ""), ei.HLINK);
            ka(e, 494, lp(r, a))
        });
        delete r["!links"]
    }

    function Ip(e, r, t, a) {
        if (r["!comments"].length > 0) {
            var n = ni(a, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", ei.VML);
            ka(e, 551, un("rId" + n));
            r["!legacy"] = n
        }
    }

    function Np(e, r, t, a) {
        if (!r["!autofilter"]) return;
        var n = r["!autofilter"];
        var i = typeof n.ref === "string" ? n.ref : Ma(n.ref);
        if (!t.Workbook) t.Workbook = {
            Sheets: []
        };
        if (!t.Workbook.Names) t.Workbook.Names = [];
        var s = t.Workbook.Names;
        var f = La(i);
        if (f.s.r == f.e.r) {
            f.e.r = La(r["!ref"]).e.r;
            i = Ma(f)
        }
        for (var o = 0; o < s.length; ++o) {
            var c = s[o];
            if (c.Name != "_xlnm._FilterDatabase") continue;
            if (c.Sheet != a) continue;
            c.Ref = "'" + t.SheetNames[a] + "'!" + i;
            break
        }
        if (o == s.length) s.push({
            Name: "_xlnm._FilterDatabase",
            Sheet: a,
            Ref: "'" + t.SheetNames[a] + "'!" + i
        });
        ka(e, 161, bn(Ua(i)));
        ka(e, 162)
    }

    function Fp(e, r, t) {
        ka(e, 133); {
            ka(e, 137, wp(r, t));
            ka(e, 138)
        }
        ka(e, 134)
    }

    function Dp() {}

    function Pp(e, r) {
        if (!r["!protect"]) return;
        ka(e, 535, Tp(r["!protect"]))
    }

    function Lp(e, r, t, a) {
        var n = wa();
        var i = t.SheetNames[e],
            s = t.Sheets[i] || {};
        var f = i;
        try {
            if (t && t.Workbook) f = t.Workbook.Sheets[e].CodeName || f
        } catch (o) {}
        var c = Ua(s["!ref"] || "A1");
        if (c.e.c > 16383 || c.e.r > 1048575) {
            if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
            c.e.c = Math.min(c.e.c, 16383);
            c.e.r = Math.min(c.e.c, 1048575)
        }
        s["!links"] = [];
        s["!comments"] = [];
        ka(n, 129);
        if (t.vbaraw || s["!outline"]) ka(n, 147, Av(f, s["!outline"]));
        ka(n, 148, yv(c));
        Fp(n, s, t.Workbook);
        Dp(n, s);
        Cp(n, s, e, r, t);
        Ap(n, s, e, r, t);
        Pp(n, s);
        Np(n, s, t, e);
        xp(n, s);
        Op(n, s, a);
        if (s["!margins"]) ka(n, 476, bp(s["!margins"]));
        if (!r || r.ignoreEC || r.ignoreEC == void 0) Rp(n, s);
        Ip(n, s, e, a);
        ka(n, 130);
        return n.end()
    }

    function Mp(e) {
        var r = [];
        var t = e.match(/^<c:numCache>/);
        var a;
        (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function (e) {
            var a = e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
            if (!a) return;
            r[+a[1]] = t ? +a[2] : a[2]
        });
        var n = Qr((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
        (e.match(/<c:f>(.*?)<\/c:f>/gm) || []).forEach(function (e) {
            a = e.replace(/<.*?>/g, "")
        });
        return [r, n, a]
    }

    function Up(e, r, t, a, n, i) {
        var s = i || {
            "!type": "chart"
        };
        if (!e) return i;
        var f = 0,
            o = 0,
            c = "A";
        var l = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        };
        (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function (e) {
            var r = Mp(e);
            l.s.r = l.s.c = 0;
            l.e.c = f;
            c = Oa(f);
            r[0].forEach(function (e, t) {
                s[c + Aa(t)] = {
                    t: "n",
                    v: e,
                    z: r[1]
                };
                o = t
            });
            if (l.e.r < o) l.e.r = o;
            ++f
        });
        if (f > 0) s["!ref"] = Ma(l);
        return s
    }

    function Bp(e, r, t, a, n) {
        if (!e) return e;
        if (!a) a = {
            "!id": {}
        };
        var i = {
            "!type": "chart",
            "!drawel": null,
            "!rel": ""
        };
        var s;
        var f = e.match(Yd);
        if (f) Qd(f[0], i, n, t);
        if (s = e.match(/drawing r:id="(.*?)"/)) i["!rel"] = s[1];
        if (a["!id"][i["!rel"]]) i["!drawel"] = a["!id"][i["!rel"]];
        return i
    }

    function Wp(e, r) {
        e.l += 10;
        var t = Xa(e, r - 10);
        return {
            name: t
        }
    }

    function Hp(e, r, t, a, n) {
        if (!e) return e;
        if (!a) a = {
            "!id": {}
        };
        var i = {
            "!type": "chart",
            "!drawel": null,
            "!rel": ""
        };
        var s = [];
        var f = false;
        ga(e, function o(e, a, c) {
            switch (c) {
                case 550:
                    i["!rel"] = e;
                    break;
                case 651:
                    if (!n.Sheets[t]) n.Sheets[t] = {};
                    if (e.name) n.Sheets[t].CodeName = e.name;
                    break;
                case 562:
                    ;
                case 652:
                    ;
                case 669:
                    ;
                case 679:
                    ;
                case 551:
                    ;
                case 552:
                    ;
                case 476:
                    ;
                case 3072:
                    break;
                case 35:
                    f = true;
                    break;
                case 36:
                    f = false;
                    break;
                case 37:
                    s.push(c);
                    break;
                case 38:
                    s.pop();
                    break;
                default:
                    if (a.T > 0) s.push(c);
                    else if (a.T < 0) s.pop();
                    else if (!f || r.WTF) throw new Error("Unexpected record 0x" + c.toString(16));
            }
        }, r);
        if (a["!id"][i["!rel"]]) i["!drawel"] = a["!id"][i["!rel"]];
        return i
    }
    var zp = [
        ["allowRefreshQuery", false, "bool"],
        ["autoCompressPictures", true, "bool"],
        ["backupFile", false, "bool"],
        ["checkCompatibility", false, "bool"],
        ["CodeName", ""],
        ["date1904", false, "bool"],
        ["defaultThemeVersion", 0, "int"],
        ["filterPrivacy", false, "bool"],
        ["hidePivotFieldList", false, "bool"],
        ["promptedSolutions", false, "bool"],
        ["publishItems", false, "bool"],
        ["refreshAllConnections", false, "bool"],
        ["saveExternalLinkValues", true, "bool"],
        ["showBorderUnselectedTables", true, "bool"],
        ["showInkAnnotation", true, "bool"],
        ["showObjects", "all"],
        ["showPivotChartFilter", false, "bool"],
        ["updateLinks", "userSet"]
    ];
    var Vp = [
        ["activeTab", 0, "int"],
        ["autoFilterDateGrouping", true, "bool"],
        ["firstSheet", 0, "int"],
        ["minimized", false, "bool"],
        ["showHorizontalScroll", true, "bool"],
        ["showSheetTabs", true, "bool"],
        ["showVerticalScroll", true, "bool"],
        ["tabRatio", 600, "int"],
        ["visibility", "visible"]
    ];
    var Gp = [];
    var jp = [
        ["calcCompleted", "true"],
        ["calcMode", "auto"],
        ["calcOnSave", "true"],
        ["concurrentCalc", "true"],
        ["fullCalcOnLoad", "false"],
        ["fullPrecision", "true"],
        ["iterate", "false"],
        ["iterateCount", "100"],
        ["iterateDelta", "0.001"],
        ["refMode", "A1"]
    ];

    function Xp(e, r) {
        for (var t = 0; t != e.length; ++t) {
            var a = e[t];
            for (var n = 0; n != r.length; ++n) {
                var i = r[n];
                if (a[i[0]] == null) a[i[0]] = i[1];
                else switch (i[2]) {
                    case "bool":
                        if (typeof a[i[0]] == "string") a[i[0]] = ct(a[i[0]]);
                        break;
                    case "int":
                        if (typeof a[i[0]] == "string") a[i[0]] = parseInt(a[i[0]], 10);
                        break;
                }
            }
        }
    }

    function $p(e, r) {
        for (var t = 0; t != r.length; ++t) {
            var a = r[t];
            if (e[a[0]] == null) e[a[0]] = a[1];
            else switch (a[2]) {
                case "bool":
                    if (typeof e[a[0]] == "string") e[a[0]] = ct(e[a[0]]);
                    break;
                case "int":
                    if (typeof e[a[0]] == "string") e[a[0]] = parseInt(e[a[0]], 10);
                    break;
            }
        }
    }

    function Yp(e) {
        $p(e.WBProps, zp);
        $p(e.CalcPr, jp);
        Xp(e.WBView, Vp);
        Xp(e.Sheets, Gp);
        Nd.date1904 = ct(e.WBProps.date1904)
    }

    function Kp(e) {
        if (!e.Workbook) return "false";
        if (!e.Workbook.WBProps) return "false";
        return ct(e.Workbook.WBProps.date1904) ? "true" : "false"
    }
    var Jp = "][*?/\\".split("");

    function qp(e, r) {
        if (e.length > 31) {
            if (r) return false;
            throw new Error("Sheet names cannot exceed 31 chars")
        }
        var t = true;
        Jp.forEach(function (a) {
            if (e.indexOf(a) == -1) return;
            if (!r) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
            t = false
        });
        return t
    }

    function Zp(e, r, t) {
        e.forEach(function (a, n) {
            qp(a);
            for (var i = 0; i < n; ++i)
                if (a == e[i]) throw new Error("Duplicate Sheet Name: " + a);
            if (t) {
                var s = r && r[n] && r[n].CodeName || a;
                if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s)
            }
        })
    }

    function Qp(e) {
        if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
        if (!e.SheetNames.length) throw new Error("Workbook is empty");
        var r = e.Workbook && e.Workbook.Sheets || [];
        Zp(e.SheetNames, r, !!e.vbaraw);
        for (var t = 0; t < e.SheetNames.length; ++t) Bd(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t)
    }
    var em = /<\w+:workbook/;

    function rm(e, r) {
        if (!e) throw new Error("Could not find file");
        var t = {
            AppVersion: {},
            WBProps: {},
            WBView: [],
            Sheets: [],
            CalcPr: {},
            Names: [],
            xmlns: ""
        };
        var a = false,
            n = "xmlns";
        var i = {},
            s = 0;
        e.replace(Xr, function f(o, c) {
            var l = Kr(o);
            switch (Jr(l[0])) {
                case "<?xml":
                    break;
                case "<workbook":
                    if (o.match(em)) n = "xmlns" + o.match(/<(\w+):/)[1];
                    t.xmlns = l[n];
                    break;
                case "</workbook>":
                    break;
                case "<fileVersion":
                    delete l[0];
                    t.AppVersion = l;
                    break;
                case "<fileVersion/>":
                    ;
                case "</fileVersion>":
                    break;
                case "<fileSharing":
                    break;
                case "<fileSharing/>":
                    break;
                case "<workbookPr":
                    ;
                case "<workbookPr/>":
                    zp.forEach(function (e) {
                        if (l[e[0]] == null) return;
                        switch (e[2]) {
                            case "bool":
                                t.WBProps[e[0]] = ct(l[e[0]]);
                                break;
                            case "int":
                                t.WBProps[e[0]] = parseInt(l[e[0]], 10);
                                break;
                            default:
                                t.WBProps[e[0]] = l[e[0]];
                        }
                    });
                    if (l.codeName) t.WBProps.CodeName = vt(l.codeName);
                    break;
                case "</workbookPr>":
                    break;
                case "<workbookProtection":
                    break;
                case "<workbookProtection/>":
                    break;
                case "<bookViews":
                    ;
                case "<bookViews>":
                    ;
                case "</bookViews>":
                    break;
                case "<workbookView":
                    ;
                case "<workbookView/>":
                    delete l[0];
                    t.WBView.push(l);
                    break;
                case "</workbookView>":
                    break;
                case "<sheets":
                    ;
                case "<sheets>":
                    ;
                case "</sheets>":
                    break;
                case "<sheet":
                    switch (l.state) {
                        case "hidden":
                            l.Hidden = 1;
                            break;
                        case "veryHidden":
                            l.Hidden = 2;
                            break;
                        default:
                            l.Hidden = 0;
                    }
                    delete l.state;
                    l.name = Qr(vt(l.name));
                    delete l[0];
                    t.Sheets.push(l);
                    break;
                case "</sheet>":
                    break;
                case "<functionGroups":
                    ;
                case "<functionGroups/>":
                    break;
                case "<functionGroup":
                    break;
                case "<externalReferences":
                    ;
                case "</externalReferences>":
                    ;
                case "<externalReferences>":
                    break;
                case "<externalReference":
                    break;
                case "<definedNames/>":
                    break;
                case "<definedNames>":
                    ;
                case "<definedNames":
                    a = true;
                    break;
                case "</definedNames>":
                    a = false;
                    break;
                case "<definedName": {
                    i = {};
                    i.Name = vt(l.name);
                    if (l.comment) i.Comment = l.comment;
                    if (l.localSheetId) i.Sheet = +l.localSheetId;
                    if (ct(l.hidden || "0")) i.Hidden = true;
                    s = c + o.length
                }
                break;
            case "</definedName>": {
                i.Ref = Qr(vt(e.slice(s, c)));
                t.Names.push(i)
            }
            break;
            case "<definedName/>":
                break;
            case "<calcPr":
                delete l[0];
                t.CalcPr = l;
                break;
            case "<calcPr/>":
                delete l[0];
                t.CalcPr = l;
                break;
            case "</calcPr>":
                break;
            case "<oleSize":
                break;
            case "<customWorkbookViews>":
                ;
            case "</customWorkbookViews>":
                ;
            case "<customWorkbookViews":
                break;
            case "<customWorkbookView":
                ;
            case "</customWorkbookView>":
                break;
            case "<pivotCaches>":
                ;
            case "</pivotCaches>":
                ;
            case "<pivotCaches":
                break;
            case "<pivotCache":
                break;
            case "<smartTagPr":
                ;
            case "<smartTagPr/>":
                break;
            case "<smartTagTypes":
                ;
            case "<smartTagTypes>":
                ;
            case "</smartTagTypes>":
                break;
            case "<smartTagType":
                break;
            case "<webPublishing":
                ;
            case "<webPublishing/>":
                break;
            case "<fileRecoveryPr":
                ;
            case "<fileRecoveryPr/>":
                break;
            case "<webPublishObjects>":
                ;
            case "<webPublishObjects":
                ;
            case "</webPublishObjects>":
                break;
            case "<webPublishObject":
                break;
            case "<extLst":
                ;
            case "<extLst>":
                ;
            case "</extLst>":
                ;
            case "<extLst/>":
                break;
            case "<ext":
                a = true;
                break;
            case "</ext>":
                a = false;
                break;
            case "<ArchID":
                break;
            case "<AlternateContent":
                ;
            case "<AlternateContent>":
                a = true;
                break;
            case "</AlternateContent>":
                a = false;
                break;
            case "<revisionPtr":
                break;
            default:
                if (!a && r.WTF) throw new Error("unrecognized " + l[0] + " in workbook");
            }
            return o
        });
        if (It.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
        Yp(t);
        return t
    }

    function tm(e) {
        var r = [zr];
        r[r.length] = _t("workbook", null, {
            xmlns: It[0],
            "xmlns:r": Ot.r
        });
        var t = e.Workbook && (e.Workbook.Names || []).length > 0;
        var a = {
            codeName: "ThisWorkbook"
        };
        if (e.Workbook && e.Workbook.WBProps) {
            zp.forEach(function (r) {
                if (e.Workbook.WBProps[r[0]] == null) return;
                if (e.Workbook.WBProps[r[0]] == r[1]) return;
                a[r[0]] = e.Workbook.WBProps[r[0]]
            });
            if (e.Workbook.WBProps.CodeName) {
                a.codeName = e.Workbook.WBProps.CodeName;
                delete a.CodeName
            }
        }
        r[r.length] = _t("workbookPr", null, a);
        var n = e.Workbook && e.Workbook.Sheets || [];
        var i = 0;
        if (n && n[0] && !!n[0].Hidden) {
            r[r.length] = "<bookViews>";
            for (i = 0; i != e.SheetNames.length; ++i) {
                if (!n[i]) break;
                if (!n[i].Hidden) break
            }
            if (i == e.SheetNames.length) i = 0;
            r[r.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>';
            r[r.length] = "</bookViews>"
        }
        r[r.length] = "<sheets>";
        for (i = 0; i != e.SheetNames.length; ++i) {
            var s = {
                name: tt(e.SheetNames[i].slice(0, 31))
            };
            s.sheetId = "" + (i + 1);
            s["r:id"] = "rId" + (i + 1);
            if (n[i]) switch (n[i].Hidden) {
                case 1:
                    s.state = "hidden";
                    break;
                case 2:
                    s.state = "veryHidden";
                    break;
            }
            r[r.length] = _t("sheet", null, s)
        }
        r[r.length] = "</sheets>";
        if (t) {
            r[r.length] = "<definedNames>";
            if (e.Workbook && e.Workbook.Names) e.Workbook.Names.forEach(function (e) {
                var t = {
                    name: e.Name
                };
                if (e.Comment) t.comment = e.Comment;
                if (e.Sheet != null) t.localSheetId = "" + e.Sheet;
                if (e.Hidden) t.hidden = "1";
                if (!e.Ref) return;
                r[r.length] = _t("definedName", tt(e.Ref), t)
            });
            r[r.length] = "</definedNames>"
        }
        if (r.length > 2) {
            r[r.length] = "</workbook>";
            r[1] = r[1].replace("/>", ">")
        }
        return r.join("")
    }

    function am(e, r) {
        var t = {};
        t.Hidden = e._R(4);
        t.iTabID = e._R(4);
        t.strRelID = ln(e, r - 8);
        t.name = Xa(e);
        return t
    }

    function nm(e, r) {
        if (!r) r = ba(127);
        r._W(4, e.Hidden);
        r._W(4, e.iTabID);
        un(e.strRelID, r);
        $a(e.name.slice(0, 31), r);
        return r.length > r.l ? r.slice(0, r.l) : r
    }

    function im(e, r) {
        var t = {};
        var a = e._R(4);
        t.defaultThemeVersion = e._R(4);
        var n = r > 8 ? Xa(e) : "";
        if (n.length > 0) t.CodeName = n;
        t.autoCompressPictures = !!(a & 65536);
        t.backupFile = !!(a & 64);
        t.checkCompatibility = !!(a & 4096);
        t.date1904 = !!(a & 1);
        t.filterPrivacy = !!(a & 8);
        t.hidePivotFieldList = !!(a & 1024);
        t.promptedSolutions = !!(a & 16);
        t.publishItems = !!(a & 2048);
        t.refreshAllConnections = !!(a & 262144);
        t.saveExternalLinkValues = !!(a & 128);
        t.showBorderUnselectedTables = !!(a & 4);
        t.showInkAnnotation = !!(a & 32);
        t.showObjects = ["all", "placeholders", "none"][a >> 13 & 3];
        t.showPivotChartFilter = !!(a & 32768);
        t.updateLinks = ["userSet", "never", "always"][a >> 8 & 3];
        return t
    }

    function sm(e, r) {
        if (!r) r = ba(72);
        var t = 0;
        if (e) {
            if (e.filterPrivacy) t |= 8
        }
        r._W(4, t);
        r._W(4, 0);
        sn(e && e.CodeName || "ThisWorkbook", r);
        return r.slice(0, r.l)
    }

    function fm(e, r) {
        var t = {};
        e._R(4);
        t.ArchID = e._R(4);
        e.l += r - 8;
        return t
    }

    function om(e, r, t) {
        var a = e.l + r;
        e.l += 4;
        e.l += 1;
        var n = e._R(4);
        var i = cn(e);
        var s = Ed(e, 0, t);
        var f = fn(e);
        e.l = a;
        var o = {
            Name: i,
            Ptg: s
        };
        if (n < 268435455) o.Sheet = n;
        if (f) o.Comment = f;
        return o
    }

    function cm(e, r) {
        var t = {
            AppVersion: {},
            WBProps: {},
            WBView: [],
            Sheets: [],
            CalcPr: {},
            xmlns: ""
        };
        var a = [];
        var n = false;
        if (!r) r = {};
        r.biff = 12;
        var i = [];
        var s = [
            []
        ];
        s.SheetNames = [];
        s.XTI = [];
        cb[16] = {
            n: "BrtFRTArchID$",
            f: fm
        };
        ga(e, function f(e, o, c) {
            switch (c) {
                case 156:
                    s.SheetNames.push(e.name);
                    t.Sheets.push(e);
                    break;
                case 153:
                    t.WBProps = e;
                    break;
                case 39:
                    if (e.Sheet != null) r.SID = e.Sheet;
                    e.Ref = ld(e.Ptg, null, null, s, r);
                    delete r.SID;
                    delete e.Ptg;
                    i.push(e);
                    break;
                case 1036:
                    break;
                case 357:
                    ;
                case 358:
                    ;
                case 355:
                    ;
                case 667:
                    if (!s[0].length) s[0] = [c, e];
                    else s.push([c, e]);
                    s[s.length - 1].XTI = [];
                    break;
                case 362:
                    if (s.length === 0) {
                        s[0] = [];
                        s[0].XTI = []
                    }
                    s[s.length - 1].XTI = s[s.length - 1].XTI.concat(e);
                    s.XTI = s.XTI.concat(e);
                    break;
                case 361:
                    break;
                case 2071:
                    ;
                case 158:
                    ;
                case 143:
                    ;
                case 664:
                    ;
                case 353:
                    break;
                case 3072:
                    ;
                case 3073:
                    ;
                case 534:
                    ;
                case 677:
                    ;
                case 157:
                    ;
                case 610:
                    ;
                case 2050:
                    ;
                case 155:
                    ;
                case 548:
                    ;
                case 676:
                    ;
                case 128:
                    ;
                case 665:
                    ;
                case 2128:
                    ;
                case 2125:
                    ;
                case 549:
                    ;
                case 2053:
                    ;
                case 596:
                    ;
                case 2076:
                    ;
                case 2075:
                    ;
                case 2082:
                    ;
                case 397:
                    ;
                case 154:
                    ;
                case 1117:
                    ;
                case 553:
                    ;
                case 2091:
                    break;
                case 35:
                    a.push(c);
                    n = true;
                    break;
                case 36:
                    a.pop();
                    n = false;
                    break;
                case 37:
                    a.push(c);
                    n = true;
                    break;
                case 38:
                    a.pop();
                    n = false;
                    break;
                case 16:
                    break;
                default:
                    if (o.T) {} else if (!n || r.WTF && a[a.length - 1] != 37 && a[a.length - 1] != 35) throw new Error("Unexpected record 0x" + c.toString(16));
            }
        }, r);
        Yp(t);
        t.Names = i;
        t.supbooks = s;
        return t
    }

    function lm(e, r) {
        ka(e, 143);
        for (var t = 0; t != r.SheetNames.length; ++t) {
            var a = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0;
            var n = {
                Hidden: a,
                iTabID: t + 1,
                strRelID: "rId" + (t + 1),
                name: r.SheetNames[t]
            };
            ka(e, 156, nm(n))
        }
        ka(e, 144)
    }

    function um(r, t) {
        if (!t) t = ba(127);
        for (var a = 0; a != 4; ++a) t._W(4, 0);
        $a("SheetJS", t);
        $a(e.version, t);
        $a(e.version, t);
        $a("7262", t);
        return t.length > t.l ? t.slice(0, t.l) : t
    }

    function hm(e, r) {
        if (!r) r = ba(29);
        r._W(-4, 0);
        r._W(-4, 460);
        r._W(4, 28800);
        r._W(4, 17600);
        r._W(4, 500);
        r._W(4, e);
        r._W(4, e);
        var t = 120;
        r._W(1, t);
        return r.length > r.l ? r.slice(0, r.l) : r
    }

    function dm(e, r) {
        if (!r.Workbook || !r.Workbook.Sheets) return;
        var t = r.Workbook.Sheets;
        var a = 0,
            n = -1,
            i = -1;
        for (; a < t.length; ++a) {
            if (!t[a] || !t[a].Hidden && n == -1) n = a;
            else if (t[a].Hidden == 1 && i == -1) i = a
        }
        if (i > n) return;
        ka(e, 135);
        ka(e, 158, hm(n));
        ka(e, 136)
    }

    function vm(e, r) {
        var t = wa();
        ka(t, 131);
        ka(t, 128, um());
        ka(t, 153, sm(e.Workbook && e.Workbook.WBProps || null));
        dm(t, e, r);
        lm(t, e, r);
        ka(t, 132);
        return t.end()
    }

    function pm(e, r, t) {
        if (r.slice(-4) === ".bin") return cm(e, t);
        return rm(e, t)
    }

    function mm(e, r, t, a, n, i, s, f) {
        if (r.slice(-4) === ".bin") return Sp(e, a, t, n, i, s, f);
        return qd(e, a, t, n, i, s, f)
    }

    function bm(e, r, t, a, n, i, s, f) {
        if (r.slice(-4) === ".bin") return Hp(e, a, t, n, i, s, f);
        return Bp(e, a, t, n, i, s, f)
    }

    function gm(e, r, t, a, n, i, s, f) {
        if (r.slice(-4) === ".bin") return xu(e, a, t, n, i, s, f);
        return Cu(e, a, t, n, i, s, f)
    }

    function wm(e, r, t, a, n, i, s, f) {
        if (r.slice(-4) === ".bin") return _u(e, a, t, n, i, s, f);
        return Au(e, a, t, n, i, s, f)
    }

    function km(e, r, t, a) {
        if (r.slice(-4) === ".bin") return hl(e, t, a);
        return Kc(e, t, a)
    }

    function Tm(e, r, t) {
        if (r.slice(-4) === ".bin") return Xo(e, t);
        return zo(e, t)
    }

    function Em(e, r, t) {
        if (r.slice(-4) === ".bin") return wu(e, t);
        return cu(e, t)
    }

    function ym(e, r, t) {
        if (r.slice(-4) === ".bin") return tu(e, r, t);
        return eu(e, r, t)
    }

    function Sm(e, r, t, a) {
        if (t.slice(-4) === ".bin") return nu(e, r, t, a);
        return au(e, r, t, a)
    }

    function _m(e, r, t) {
        if (r.slice(-4) === ".bin") return Jl(e, r, t);
        return Zl(e, r, t)
    }
    var Am = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;
    var xm = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;

    function Cm(e, r) {
        var t = e.split(/\s+/);
        var a = [];
        if (!r) a[0] = t[0];
        if (t.length === 1) return a;
        var n = e.match(Am),
            i, s, f, o;
        if (n)
            for (o = 0; o != n.length; ++o) {
                i = n[o].match(xm);
                if ((s = i[1].indexOf(":")) === -1) a[i[1]] = i[2].slice(1, i[2].length - 1);
                else {
                    if (i[1].slice(0, 6) === "xmlns:") f = "xmlns" + i[1].slice(6);
                    else f = i[1].slice(s + 1);
                    a[f] = i[2].slice(1, i[2].length - 1)
                }
            }
        return a
    }

    function Rm(e) {
        var r = e.split(/\s+/);
        var t = {};
        if (r.length === 1) return t;
        var a = e.match(Am),
            n, i, s, f;
        if (a)
            for (f = 0; f != a.length; ++f) {
                n = a[f].match(xm);
                if ((i = n[1].indexOf(":")) === -1) t[n[1]] = n[2].slice(1, n[2].length - 1);
                else {
                    if (n[1].slice(0, 6) === "xmlns:") s = "xmlns" + n[1].slice(6);
                    else s = n[1].slice(i + 1);
                    t[s] = n[2].slice(1, n[2].length - 1)
                }
            }
        return t
    }
    var Om;

    function Im(e, r) {
        var t = Om[e] || Qr(e);
        if (t === "General") return oe(r);
        return We(t, r)
    }

    function Nm(e, r, t, a) {
        var n = a;
        switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
            case "boolean":
                n = ct(a);
                break;
            case "i2":
                ;
            case "int":
                n = parseInt(a, 10);
                break;
            case "r4":
                ;
            case "float":
                n = parseFloat(a);
                break;
            case "date":
                ;
            case "dateTime.tz":
                n = wr(a);
                break;
            case "i8":
                ;
            case "string":
                ;
            case "fixed":
                ;
            case "uuid":
                ;
            case "bin.base64":
                break;
            default:
                throw new Error("bad custprop:" + t[0]);
        }
        e[Qr(r)] = n
    }

    function Fm(e, r, t) {
        if (e.t === "z") return;
        if (!t || t.cellText !== false) try {
            if (e.t === "e") {
                e.w = e.w || $n[e.v]
            } else if (r === "General") {
                if (e.t === "n") {
                    if ((e.v | 0) === e.v) e.w = e.v.toString(10);
                    else e.w = fe(e.v)
                } else e.w = oe(e.v)
            } else e.w = Im(r || "General", e.v)
        } catch (a) {
            if (t.WTF) throw a
        }
        try {
            var n = Om[r] || r || "General";
            if (t.cellNF) e.z = n;
            if (t.cellDates && e.t == "n" && Pe(n)) {
                var i = Z(e.v);
                if (i) {
                    e.t = "d";
                    e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
                }
            }
        } catch (a) {
            if (t.WTF) throw a
        }
    }

    function Dm(e, r, t) {
        if (t.cellStyles) {
            if (r.Interior) {
                var a = r.Interior;
                if (a.Pattern) a.patternType = Bc[a.Pattern] || a.Pattern
            }
        }
        e[r.ID] = r
    }

    function Pm(e, r, t, a, n, i, s, f, o, c) {
        var l = "General",
            u = a.StyleID,
            h = {};
        c = c || {};
        var d = [];
        var v = 0;
        if (u === undefined && f) u = f.StyleID;
        if (u === undefined && s) u = s.StyleID;
        while (i[u] !== undefined) {
            if (i[u].nf) l = i[u].nf;
            if (i[u].Interior) d.push(i[u].Interior);
            if (!i[u].Parent) break;
            u = i[u].Parent
        }
        switch (t.Type) {
            case "Boolean":
                a.t = "b";
                a.v = ct(e);
                break;
            case "String":
                a.t = "s";
                a.r = ft(Qr(e));
                a.v = e.indexOf("<") > -1 ? Qr(r || e).replace(/<.*?>/g, "") : a.r;
                break;
            case "DateTime":
                if (e.slice(-1) != "Z") e += "Z";
                a.v = (wr(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3);
                if (a.v !== a.v) a.v = Qr(e);
                else if (a.v < 60) a.v = a.v - 1;
                if (!l || l == "General") l = "yyyy-mm-dd";
            case "Number":
                if (a.v === undefined) a.v = +e;
                if (!a.t) a.t = "n";
                break;
            case "Error":
                a.t = "e";
                a.v = Yn[e];
                if (c.cellText !== false) a.w = e;
                break;
            default:
                if (e == "" && r == "") {
                    a.t = "z"
                } else {
                    a.t = "s";
                    a.v = ft(r || e)
                }
                break;
        }
        Fm(a, l, c);
        if (c.cellFormula !== false) {
            if (a.Formula) {
                var p = Qr(a.Formula);
                if (p.charCodeAt(0) == 61) p = p.slice(1);
                a.f = Ru(p, n);
                delete a.Formula;
                if (a.ArrayRange == "RC") a.F = Ru("RC:RC", n);
                else if (a.ArrayRange) {
                    a.F = Ru(a.ArrayRange, n);
                    o.push([Ua(a.F), a.F])
                }
            } else {
                for (v = 0; v < o.length; ++v)
                    if (n.r >= o[v][0].s.r && n.r <= o[v][0].e.r)
                        if (n.c >= o[v][0].s.c && n.c <= o[v][0].e.c) a.F = o[v][1]
            }
        }
        if (c.cellStyles) {
            d.forEach(function (e) {
                if (!h.patternType && e.patternType) h.patternType = e.patternType
            });
            a.s = h
        }
        if (a.StyleID !== undefined) a.ixfe = a.StyleID
    }

    function Lm(e) {
        e.t = e.v || "";
        e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        e.v = e.w = e.ixfe = undefined
    }

    function Mm(e, r) {
        var t = r || {};
        Ve();
        var n = d(Ct(e));
        if (t.type == "binary" || t.type == "array" || t.type == "base64") {
            if (typeof a !== "undefined") n = a.utils.decode(65001, l(n));
            else n = vt(n)
        }
        var i = n.slice(0, 1024).toLowerCase(),
            s = false;
        i = i.replace(/".*?"/g, "");
        if ((i.indexOf(">") & 1023) > Math.min(i.indexOf(",") & 1023, i.indexOf(";") & 1023)) {
            var f = Tr(t);
            f.type = "string";
            return Ro.to_workbook(n, f)
        }
        if (i.indexOf("<?xml") == -1)["html", "table", "head", "meta", "script", "style", "div"].forEach(function (e) {
            if (i.indexOf("<" + e) >= 0) s = true
        });
        if (s) return Db(n, t);
        Om = {
            "General Number": "General",
            "General Date": Y[22],
            "Long Date": "dddd, mmmm dd, yyyy",
            "Medium Date": Y[15],
            "Short Date": Y[14],
            "Long Time": Y[19],
            "Medium Time": Y[18],
            "Short Time": Y[20],
            Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
            Fixed: Y[2],
            Standard: Y[4],
            Percent: Y[10],
            Scientific: Y[11],
            "Yes/No": '"Yes";"Yes";"No";@',
            "True/False": '"True";"True";"False";@',
            "On/Off": '"Yes";"Yes";"No";@'
        };
        var o;
        var c = [],
            u;
        if (b != null && t.dense == null) t.dense = b;
        var h = {},
            v = [],
            p = t.dense ? [] : {},
            m = "";
        var g = {},
            w = {};
        var k = Cm('<Data ss:Type="String">'),
            T = 0;
        var E = 0,
            y = 0;
        var S = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        };
        var _ = {},
            A = {};
        var x = "",
            C = 0;
        var R = [];
        var O = {},
            I = {},
            N = 0,
            F = [];
        var D = [],
            P = {};
        var L = [],
            M, U = false;
        var B = [];
        var W = [],
            H = {},
            z = 0,
            V = 0;
        var G = {
                Sheets: [],
                WBProps: {
                    date1904: false
                }
            },
            j = {};
        Rt.lastIndex = 0;
        n = n.replace(/<!--([\s\S]*?)-->/gm, "");
        var X = "";
        while (o = Rt.exec(n)) switch (o[3] = (X = o[3]).toLowerCase()) {
            case "data":
                if (X == "data") {
                    if (o[1] === "/") {
                        if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
                    } else if (o[0].charAt(o[0].length - 2) !== "/") c.push([o[3], true]);
                    break
                }
                if (c[c.length - 1][1]) break;
                if (o[1] === "/") Pm(n.slice(T, o.index), x, k, c[c.length - 1][0] == "comment" ? P : g, {
                    c: E,
                    r: y
                }, _, L[E], w, B, t);
                else {
                    x = "";
                    k = Cm(o[0]);
                    T = o.index + o[0].length
                }
                break;
            case "cell":
                if (o[1] === "/") {
                    if (D.length > 0) g.c = D;
                    if ((!t.sheetRows || t.sheetRows > y) && g.v !== undefined) {
                        if (t.dense) {
                            if (!p[y]) p[y] = [];
                            p[y][E] = g
                        } else p[Oa(E) + Aa(y)] = g
                    }
                    if (g.HRef) {
                        g.l = {
                            Target: Qr(g.HRef)
                        };
                        if (g.HRefScreenTip) g.l.Tooltip = g.HRefScreenTip;
                        delete g.HRef;
                        delete g.HRefScreenTip
                    }
                    if (g.MergeAcross || g.MergeDown) {
                        z = E + (parseInt(g.MergeAcross, 10) | 0);
                        V = y + (parseInt(g.MergeDown, 10) | 0);
                        R.push({
                            s: {
                                c: E,
                                r: y
                            },
                            e: {
                                c: z,
                                r: V
                            }
                        })
                    }
                    if (!t.sheetStubs) {
                        if (g.MergeAcross) E = z + 1;
                        else ++E
                    } else if (g.MergeAcross || g.MergeDown) {
                        for (var $ = E; $ <= z; ++$) {
                            for (var K = y; K <= V; ++K) {
                                if ($ > E || K > y) {
                                    if (t.dense) {
                                        if (!p[K]) p[K] = [];
                                        p[K][$] = {
                                            t: "z"
                                        }
                                    } else p[Oa($) + Aa(K)] = {
                                        t: "z"
                                    }
                                }
                            }
                        }
                        E = z + 1
                    } else ++E
                } else {
                    g = Rm(o[0]);
                    if (g.Index) E = +g.Index - 1;
                    if (E < S.s.c) S.s.c = E;
                    if (E > S.e.c) S.e.c = E;
                    if (o[0].slice(-2) === "/>") ++E;
                    D = []
                }
                break;
            case "row":
                if (o[1] === "/" || o[0].slice(-2) === "/>") {
                    if (y < S.s.r) S.s.r = y;
                    if (y > S.e.r) S.e.r = y;
                    if (o[0].slice(-2) === "/>") {
                        w = Cm(o[0]);
                        if (w.Index) y = +w.Index - 1
                    }
                    E = 0;
                    ++y
                } else {
                    w = Cm(o[0]);
                    if (w.Index) y = +w.Index - 1;
                    H = {};
                    if (w.AutoFitHeight == "0" || w.Height) {
                        H.hpx = parseInt(w.Height, 10);
                        H.hpt = Mc(H.hpx);
                        W[y] = H
                    }
                    if (w.Hidden == "1") {
                        H.hidden = true;
                        W[y] = H
                    }
                }
                break;
            case "worksheet":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"));
                    v.push(m);
                    if (S.s.r <= S.e.r && S.s.c <= S.e.c) {
                        p["!ref"] = Ma(S);
                        if (t.sheetRows && t.sheetRows <= S.e.r) {
                            p["!fullref"] = p["!ref"];
                            S.e.r = t.sheetRows - 1;
                            p["!ref"] = Ma(S)
                        }
                    }
                    if (R.length) p["!merges"] = R;
                    if (L.length > 0) p["!cols"] = L;
                    if (W.length > 0) p["!rows"] = W;
                    h[m] = p
                } else {
                    S = {
                        s: {
                            r: 2e6,
                            c: 2e6
                        },
                        e: {
                            r: 0,
                            c: 0
                        }
                    };
                    y = E = 0;
                    c.push([o[3], false]);
                    u = Cm(o[0]);
                    m = Qr(u.Name);
                    p = t.dense ? [] : {};
                    R = [];
                    B = [];
                    W = [];
                    j = {
                        name: m,
                        Hidden: 0
                    };
                    G.Sheets.push(j)
                }
                break;
            case "table":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
                } else if (o[0].slice(-2) == "/>") break;
                else {
                    c.push([o[3], false]);
                    L = [];
                    U = false
                }
                break;
            case "style":
                if (o[1] === "/") Dm(_, A, t);
                else A = Cm(o[0]);
                break;
            case "numberformat":
                A.nf = Qr(Cm(o[0]).Format || "General");
                if (Om[A.nf]) A.nf = Om[A.nf];
                for (var J = 0; J != 392; ++J)
                    if (Y[J] == A.nf) break;
                if (J == 392)
                    for (J = 57; J != 392; ++J)
                        if (Y[J] == null) {
                            Je(A.nf, J);
                            break
                        } break;
            case "column":
                if (c[c.length - 1][0] !== "table") break;
                M = Cm(o[0]);
                if (M.Hidden) {
                    M.hidden = true;
                    delete M.Hidden
                }
                if (M.Width) M.wpx = parseInt(M.Width, 10);
                if (!U && M.wpx > 10) {
                    U = true;
                    Cc = _c;
                    for (var q = 0; q < L.length; ++q)
                        if (L[q]) Dc(L[q])
                }
                if (U) Dc(M);
                L[M.Index - 1 || L.length] = M;
                for (var Z = 0; Z < +M.Span; ++Z) L[L.length] = Tr(M);
                break;
            case "namedrange":
                if (o[1] === "/") break;
                if (!G.Names) G.Names = [];
                var Q = Kr(o[0]);
                var ee = {
                    Name: Q.Name,
                    Ref: Ru(Q.RefersTo.slice(1), {
                        r: 0,
                        c: 0
                    })
                };
                if (G.Sheets.length > 0) ee.Sheet = G.Sheets.length - 1;
                G.Names.push(ee);
                break;
            case "namedcell":
                break;
            case "b":
                break;
            case "i":
                break;
            case "u":
                break;
            case "s":
                break;
            case "em":
                break;
            case "h2":
                break;
            case "h3":
                break;
            case "sub":
                break;
            case "sup":
                break;
            case "span":
                break;
            case "alignment":
                break;
            case "borders":
                break;
            case "border":
                break;
            case "font":
                if (o[0].slice(-2) === "/>") break;
                else if (o[1] === "/") x += n.slice(C, o.index);
                else C = o.index + o[0].length;
                break;
            case "interior":
                if (!t.cellStyles) break;
                A.Interior = Cm(o[0]);
                break;
            case "protection":
                break;
            case "author":
                ;
            case "title":
                ;
            case "description":
                ;
            case "created":
                ;
            case "keywords":
                ;
            case "subject":
                ;
            case "category":
                ;
            case "company":
                ;
            case "lastauthor":
                ;
            case "lastsaved":
                ;
            case "lastprinted":
                ;
            case "version":
                ;
            case "revision":
                ;
            case "totaltime":
                ;
            case "hyperlinkbase":
                ;
            case "manager":
                ;
            case "contentstatus":
                ;
            case "identifier":
                ;
            case "language":
                ;
            case "appname":
                if (o[0].slice(-2) === "/>") break;
                else if (o[1] === "/") xi(O, X, n.slice(N, o.index));
                else N = o.index + o[0].length;
                break;
            case "paragraphs":
                break;
            case "styles":
                ;
            case "workbook":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
                } else c.push([o[3], false]);
                break;
            case "comment":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"));
                    Lm(P);
                    D.push(P)
                } else {
                    c.push([o[3], false]);
                    u = Cm(o[0]);
                    P = {
                        a: u.Author
                    }
                }
                break;
            case "autofilter":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
                } else if (o[0].charAt(o[0].length - 2) !== "/") {
                    var re = Cm(o[0]);
                    p["!autofilter"] = {
                        ref: Ru(re.Range).replace(/\$/g, "")
                    };
                    c.push([o[3], true])
                }
                break;
            case "name":
                break;
            case "datavalidation":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
                } else {
                    if (o[0].charAt(o[0].length - 2) !== "/") c.push([o[3], true])
                }
                break;
            case "pixelsperinch":
                break;
            case "componentoptions":
                ;
            case "documentproperties":
                ;
            case "customdocumentproperties":
                ;
            case "officedocumentsettings":
                ;
            case "pivottable":
                ;
            case "pivotcache":
                ;
            case "names":
                ;
            case "mapinfo":
                ;
            case "pagebreaks":
                ;
            case "querytable":
                ;
            case "sorting":
                ;
            case "schema":
                ;
            case "conditionalformatting":
                ;
            case "smarttagtype":
                ;
            case "smarttags":
                ;
            case "excelworkbook":
                ;
            case "workbookoptions":
                ;
            case "worksheetoptions":
                if (o[1] === "/") {
                    if ((u = c.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
                } else if (o[0].charAt(o[0].length - 2) !== "/") c.push([o[3], true]);
                break;
            case "null":
                break;
            default:
                if (c.length == 0 && o[3] == "document") return Xb(n, t);
                if (c.length == 0 && o[3] == "uof") return Xb(n, t);
                var te = true;
                switch (c[c.length - 1][0]) {
                    case "officedocumentsettings":
                        switch (o[3]) {
                            case "allowpng":
                                break;
                            case "removepersonalinformation":
                                break;
                            case "downloadcomponents":
                                break;
                            case "locationofcomponents":
                                break;
                            case "colors":
                                break;
                            case "color":
                                break;
                            case "index":
                                break;
                            case "rgb":
                                break;
                            case "targetscreensize":
                                break;
                            case "readonlyrecommended":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "componentoptions":
                        switch (o[3]) {
                            case "toolbar":
                                break;
                            case "hideofficelogo":
                                break;
                            case "spreadsheetautofit":
                                break;
                            case "label":
                                break;
                            case "caption":
                                break;
                            case "maxheight":
                                break;
                            case "maxwidth":
                                break;
                            case "nextsheetnumber":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "excelworkbook":
                        switch (o[3]) {
                            case "date1904":
                                G.WBProps.date1904 = true;
                                break;
                            case "windowheight":
                                break;
                            case "windowwidth":
                                break;
                            case "windowtopx":
                                break;
                            case "windowtopy":
                                break;
                            case "tabratio":
                                break;
                            case "protectstructure":
                                break;
                            case "protectwindow":
                                break;
                            case "protectwindows":
                                break;
                            case "activesheet":
                                break;
                            case "displayinknotes":
                                break;
                            case "firstvisiblesheet":
                                break;
                            case "supbook":
                                break;
                            case "sheetname":
                                break;
                            case "sheetindex":
                                break;
                            case "sheetindexfirst":
                                break;
                            case "sheetindexlast":
                                break;
                            case "dll":
                                break;
                            case "acceptlabelsinformulas":
                                break;
                            case "donotsavelinkvalues":
                                break;
                            case "iteration":
                                break;
                            case "maxiterations":
                                break;
                            case "maxchange":
                                break;
                            case "path":
                                break;
                            case "xct":
                                break;
                            case "count":
                                break;
                            case "selectedsheets":
                                break;
                            case "calculation":
                                break;
                            case "uncalced":
                                break;
                            case "startupprompt":
                                break;
                            case "crn":
                                break;
                            case "externname":
                                break;
                            case "formula":
                                break;
                            case "colfirst":
                                break;
                            case "collast":
                                break;
                            case "wantadvise":
                                break;
                            case "boolean":
                                break;
                            case "error":
                                break;
                            case "text":
                                break;
                            case "ole":
                                break;
                            case "noautorecover":
                                break;
                            case "publishobjects":
                                break;
                            case "donotcalculatebeforesave":
                                break;
                            case "number":
                                break;
                            case "refmoder1c1":
                                break;
                            case "embedsavesmarttags":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "workbookoptions":
                        switch (o[3]) {
                            case "owcversion":
                                break;
                            case "height":
                                break;
                            case "width":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "worksheetoptions":
                        switch (o[3]) {
                            case "visible":
                                if (o[0].slice(-2) === "/>") {} else if (o[1] === "/") switch (n.slice(N, o.index)) {
                                    case "SheetHidden":
                                        j.Hidden = 1;
                                        break;
                                    case "SheetVeryHidden":
                                        j.Hidden = 2;
                                        break;
                                } else N = o.index + o[0].length;
                                break;
                            case "header":
                                if (!p["!margins"]) Ld(p["!margins"] = {}, "xlml");
                                if (!isNaN(+Kr(o[0]).Margin)) p["!margins"].header = +Kr(o[0]).Margin;
                                break;
                            case "footer":
                                if (!p["!margins"]) Ld(p["!margins"] = {}, "xlml");
                                if (!isNaN(+Kr(o[0]).Margin)) p["!margins"].footer = +Kr(o[0]).Margin;
                                break;
                            case "pagemargins":
                                var ae = Kr(o[0]);
                                if (!p["!margins"]) Ld(p["!margins"] = {}, "xlml");
                                if (!isNaN(+ae.Top)) p["!margins"].top = +ae.Top;
                                if (!isNaN(+ae.Left)) p["!margins"].left = +ae.Left;
                                if (!isNaN(+ae.Right)) p["!margins"].right = +ae.Right;
                                if (!isNaN(+ae.Bottom)) p["!margins"].bottom = +ae.Bottom;
                                break;
                            case "displayrighttoleft":
                                if (!G.Views) G.Views = [];
                                if (!G.Views[0]) G.Views[0] = {};
                                G.Views[0].RTL = true;
                                break;
                            case "freezepanes":
                                break;
                            case "frozennosplit":
                                break;
                            case "splithorizontal":
                                ;
                            case "splitvertical":
                                break;
                            case "donotdisplaygridlines":
                                break;
                            case "activerow":
                                break;
                            case "activecol":
                                break;
                            case "toprowbottompane":
                                break;
                            case "leftcolumnrightpane":
                                break;
                            case "unsynced":
                                break;
                            case "print":
                                break;
                            case "printerrors":
                                break;
                            case "panes":
                                break;
                            case "scale":
                                break;
                            case "pane":
                                break;
                            case "number":
                                break;
                            case "layout":
                                break;
                            case "pagesetup":
                                break;
                            case "selected":
                                break;
                            case "protectobjects":
                                break;
                            case "enableselection":
                                break;
                            case "protectscenarios":
                                break;
                            case "validprinterinfo":
                                break;
                            case "horizontalresolution":
                                break;
                            case "verticalresolution":
                                break;
                            case "numberofcopies":
                                break;
                            case "activepane":
                                break;
                            case "toprowvisible":
                                break;
                            case "leftcolumnvisible":
                                break;
                            case "fittopage":
                                break;
                            case "rangeselection":
                                break;
                            case "papersizeindex":
                                break;
                            case "pagelayoutzoom":
                                break;
                            case "pagebreakzoom":
                                break;
                            case "filteron":
                                break;
                            case "fitwidth":
                                break;
                            case "fitheight":
                                break;
                            case "commentslayout":
                                break;
                            case "zoom":
                                break;
                            case "lefttoright":
                                break;
                            case "gridlines":
                                break;
                            case "allowsort":
                                break;
                            case "allowfilter":
                                break;
                            case "allowinsertrows":
                                break;
                            case "allowdeleterows":
                                break;
                            case "allowinsertcols":
                                break;
                            case "allowdeletecols":
                                break;
                            case "allowinserthyperlinks":
                                break;
                            case "allowformatcells":
                                break;
                            case "allowsizecols":
                                break;
                            case "allowsizerows":
                                break;
                            case "nosummaryrowsbelowdetail":
                                if (!p["!outline"]) p["!outline"] = {};
                                p["!outline"].above = true;
                                break;
                            case "tabcolorindex":
                                break;
                            case "donotdisplayheadings":
                                break;
                            case "showpagelayoutzoom":
                                break;
                            case "nosummarycolumnsrightdetail":
                                if (!p["!outline"]) p["!outline"] = {};
                                p["!outline"].left = true;
                                break;
                            case "blackandwhite":
                                break;
                            case "donotdisplayzeros":
                                break;
                            case "displaypagebreak":
                                break;
                            case "rowcolheadings":
                                break;
                            case "donotdisplayoutline":
                                break;
                            case "noorientation":
                                break;
                            case "allowusepivottables":
                                break;
                            case "zeroheight":
                                break;
                            case "viewablerange":
                                break;
                            case "selection":
                                break;
                            case "protectcontents":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "pivottable":
                        ;
                    case "pivotcache":
                        switch (o[3]) {
                            case "immediateitemsondrop":
                                break;
                            case "showpagemultipleitemlabel":
                                break;
                            case "compactrowindent":
                                break;
                            case "location":
                                break;
                            case "pivotfield":
                                break;
                            case "orientation":
                                break;
                            case "layoutform":
                                break;
                            case "layoutsubtotallocation":
                                break;
                            case "layoutcompactrow":
                                break;
                            case "position":
                                break;
                            case "pivotitem":
                                break;
                            case "datatype":
                                break;
                            case "datafield":
                                break;
                            case "sourcename":
                                break;
                            case "parentfield":
                                break;
                            case "ptlineitems":
                                break;
                            case "ptlineitem":
                                break;
                            case "countofsameitems":
                                break;
                            case "item":
                                break;
                            case "itemtype":
                                break;
                            case "ptsource":
                                break;
                            case "cacheindex":
                                break;
                            case "consolidationreference":
                                break;
                            case "filename":
                                break;
                            case "reference":
                                break;
                            case "nocolumngrand":
                                break;
                            case "norowgrand":
                                break;
                            case "blanklineafteritems":
                                break;
                            case "hidden":
                                break;
                            case "subtotal":
                                break;
                            case "basefield":
                                break;
                            case "mapchilditems":
                                break;
                            case "function":
                                break;
                            case "refreshonfileopen":
                                break;
                            case "printsettitles":
                                break;
                            case "mergelabels":
                                break;
                            case "defaultversion":
                                break;
                            case "refreshname":
                                break;
                            case "refreshdate":
                                break;
                            case "refreshdatecopy":
                                break;
                            case "versionlastrefresh":
                                break;
                            case "versionlastupdate":
                                break;
                            case "versionupdateablemin":
                                break;
                            case "versionrefreshablemin":
                                break;
                            case "calculation":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "pagebreaks":
                        switch (o[3]) {
                            case "colbreaks":
                                break;
                            case "colbreak":
                                break;
                            case "rowbreaks":
                                break;
                            case "rowbreak":
                                break;
                            case "colstart":
                                break;
                            case "colend":
                                break;
                            case "rowend":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "autofilter":
                        switch (o[3]) {
                            case "autofiltercolumn":
                                break;
                            case "autofiltercondition":
                                break;
                            case "autofilterand":
                                break;
                            case "autofilteror":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "querytable":
                        switch (o[3]) {
                            case "id":
                                break;
                            case "autoformatfont":
                                break;
                            case "autoformatpattern":
                                break;
                            case "querysource":
                                break;
                            case "querytype":
                                break;
                            case "enableredirections":
                                break;
                            case "refreshedinxl9":
                                break;
                            case "urlstring":
                                break;
                            case "htmltables":
                                break;
                            case "connection":
                                break;
                            case "commandtext":
                                break;
                            case "refreshinfo":
                                break;
                            case "notitles":
                                break;
                            case "nextid":
                                break;
                            case "columninfo":
                                break;
                            case "overwritecells":
                                break;
                            case "donotpromptforfile":
                                break;
                            case "textwizardsettings":
                                break;
                            case "source":
                                break;
                            case "number":
                                break;
                            case "decimal":
                                break;
                            case "thousandseparator":
                                break;
                            case "trailingminusnumbers":
                                break;
                            case "formatsettings":
                                break;
                            case "fieldtype":
                                break;
                            case "delimiters":
                                break;
                            case "tab":
                                break;
                            case "comma":
                                break;
                            case "autoformatname":
                                break;
                            case "versionlastedit":
                                break;
                            case "versionlastrefresh":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "datavalidation":
                        switch (o[3]) {
                            case "range":
                                break;
                            case "type":
                                break;
                            case "min":
                                break;
                            case "max":
                                break;
                            case "sort":
                                break;
                            case "descending":
                                break;
                            case "order":
                                break;
                            case "casesensitive":
                                break;
                            case "value":
                                break;
                            case "errorstyle":
                                break;
                            case "errormessage":
                                break;
                            case "errortitle":
                                break;
                            case "inputmessage":
                                break;
                            case "inputtitle":
                                break;
                            case "combohide":
                                break;
                            case "inputhide":
                                break;
                            case "condition":
                                break;
                            case "qualifier":
                                break;
                            case "useblank":
                                break;
                            case "value1":
                                break;
                            case "value2":
                                break;
                            case "format":
                                break;
                            case "cellrangelist":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "sorting":
                        ;
                    case "conditionalformatting":
                        switch (o[3]) {
                            case "range":
                                break;
                            case "type":
                                break;
                            case "min":
                                break;
                            case "max":
                                break;
                            case "sort":
                                break;
                            case "descending":
                                break;
                            case "order":
                                break;
                            case "casesensitive":
                                break;
                            case "value":
                                break;
                            case "errorstyle":
                                break;
                            case "errormessage":
                                break;
                            case "errortitle":
                                break;
                            case "cellrangelist":
                                break;
                            case "inputmessage":
                                break;
                            case "inputtitle":
                                break;
                            case "combohide":
                                break;
                            case "inputhide":
                                break;
                            case "condition":
                                break;
                            case "qualifier":
                                break;
                            case "useblank":
                                break;
                            case "value1":
                                break;
                            case "value2":
                                break;
                            case "format":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "mapinfo":
                        ;
                    case "schema":
                        ;
                    case "data":
                        switch (o[3]) {
                            case "map":
                                break;
                            case "entry":
                                break;
                            case "range":
                                break;
                            case "xpath":
                                break;
                            case "field":
                                break;
                            case "xsdtype":
                                break;
                            case "filteron":
                                break;
                            case "aggregate":
                                break;
                            case "elementtype":
                                break;
                            case "attributetype":
                                break;
                            case "schema":
                                ;
                            case "element":
                                ;
                            case "complextype":
                                ;
                            case "datatype":
                                ;
                            case "all":
                                ;
                            case "attribute":
                                ;
                            case "extends":
                                break;
                            case "row":
                                break;
                            default:
                                te = false;
                        }
                        break;
                    case "smarttags":
                        break;
                    default:
                        te = false;
                        break;
                }
                if (te) break;
                if (o[3].match(/!\[CDATA/)) break;
                if (!c[c.length - 1][1]) throw "Unrecognized tag: " + o[3] + "|" + c.join("|");
                if (c[c.length - 1][0] === "customdocumentproperties") {
                    if (o[0].slice(-2) === "/>") break;
                    else if (o[1] === "/") Nm(I, X, F, n.slice(N, o.index));
                    else {
                        F = o;
                        N = o.index + o[0].length
                    }
                    break
                }
                if (t.WTF) throw "Unrecognized tag: " + o[3] + "|" + c.join("|");
        }
        var ne = {};
        if (!t.bookSheets && !t.bookProps) ne.Sheets = h;
        ne.SheetNames = v;
        ne.Workbook = G;
        ne.SSF = Tr(Y);
        ne.Props = O;
        ne.Custprops = I;
        return ne
    }

    function Um(e, r) {
        Pg(r = r || {});
        switch (r.type || "base64") {
            case "base64":
                return Mm(T(e), r);
            case "binary":
                ;
            case "buffer":
                ;
            case "file":
                return Mm(e, r);
            case "array":
                return Mm(C(e), r);
        }
    }

    function Bm(e, r) {
        var t = [];
        if (e.Props) t.push(Ci(e.Props, r));
        if (e.Custprops) t.push(Ri(e.Props, e.Custprops, r));
        return t.join("")
    }

    function Wm() {
        return ""
    }

    function Hm(e, r) {
        var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
        r.cellXfs.forEach(function (e, r) {
            var a = [];
            a.push(_t("NumberFormat", null, {
                "ss:Format": tt(Y[e.numFmtId])
            }));
            var n = {
                "ss:ID": "s" + (21 + r)
            };
            t.push(_t("Style", a.join(""), n))
        });
        return _t("Styles", t.join(""))
    }

    function zm(e) {
        return _t("NamedRange", null, {
            "ss:Name": e.Name,
            "ss:RefersTo": "=" + Iu(e.Ref, {
                r: 0,
                c: 0
            })
        })
    }

    function Vm(e) {
        if (!((e || {}).Workbook || {}).Names) return "";
        var r = e.Workbook.Names;
        var t = [];
        for (var a = 0; a < r.length; ++a) {
            var n = r[a];
            if (n.Sheet != null) continue;
            if (n.Name.match(/^_xlfn\./)) continue;
            t.push(zm(n))
        }
        return _t("Names", t.join(""))
    }

    function Gm(e, r, t, a) {
        if (!e) return "";
        if (!((a || {}).Workbook || {}).Names) return "";
        var n = a.Workbook.Names;
        var i = [];
        for (var s = 0; s < n.length; ++s) {
            var f = n[s];
            if (f.Sheet != t) continue;
            if (f.Name.match(/^_xlfn\./)) continue;
            i.push(zm(f))
        }
        return i.join("")
    }

    function jm(e, r, t, a) {
        if (!e) return "";
        var n = [];
        if (e["!margins"]) {
            n.push("<PageSetup>");
            if (e["!margins"].header) n.push(_t("Header", null, {
                "x:Margin": e["!margins"].header
            }));
            if (e["!margins"].footer) n.push(_t("Footer", null, {
                "x:Margin": e["!margins"].footer
            }));
            n.push(_t("PageMargins", null, {
                "x:Bottom": e["!margins"].bottom || "0.75",
                "x:Left": e["!margins"].left || "0.7",
                "x:Right": e["!margins"].right || "0.7",
                "x:Top": e["!margins"].top || "0.75"
            }));
            n.push("</PageSetup>")
        }
        if (a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[t]) {
            if (a.Workbook.Sheets[t].Hidden) n.push(_t("Visible", a.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
            else {
                for (var i = 0; i < t; ++i)
                    if (a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden) break;
                if (i == t) n.push("<Selected/>")
            }
        }
        if (((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL) n.push("<DisplayRightToLeft/>");
        if (e["!protect"]) {
            n.push(yt("ProtectContents", "True"));
            if (e["!protect"].objects) n.push(yt("ProtectObjects", "True"));
            if (e["!protect"].scenarios) n.push(yt("ProtectScenarios", "True"));
            if (e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells) n.push(yt("EnableSelection", "NoSelection"));
            else if (e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells) n.push(yt("EnableSelection", "UnlockedCells"));
            [
                ["formatCells", "AllowFormatCells"],
                ["formatColumns", "AllowSizeCols"],
                ["formatRows", "AllowSizeRows"],
                ["insertColumns", "AllowInsertCols"],
                ["insertRows", "AllowInsertRows"],
                ["insertHyperlinks", "AllowInsertHyperlinks"],
                ["deleteColumns", "AllowDeleteCols"],
                ["deleteRows", "AllowDeleteRows"],
                ["sort", "AllowSort"],
                ["autoFilter", "AllowFilter"],
                ["pivotTables", "AllowUsePivotTables"]
            ].forEach(function (r) {
                if (e["!protect"][r[0]]) n.push("<" + r[1] + "/>")
            })
        }
        if (n.length == 0) return "";
        return _t("WorksheetOptions", n.join(""), {
            xmlns: Nt.x
        })
    }

    function Xm(e) {
        return e.map(function (e) {
            var r = ot(e.t || "");
            var t = _t("ss:Data", r, {
                xmlns: "http://www.w3.org/TR/REC-html40"
            });
            return _t("Comment", t, {
                "ss:Author": e.a
            })
        }).join("")
    }

    function $m(e, r, t, a, n, i, s) {
        if (!e || e.v == undefined && e.f == undefined) return "";
        var f = {};
        if (e.f) f["ss:Formula"] = "=" + tt(Iu(e.f, s));
        if (e.F && e.F.slice(0, r.length) == r) {
            var o = Da(e.F.slice(r.length + 1));
            f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]")
        }
        if (e.l && e.l.Target) {
            f["ss:HRef"] = tt(e.l.Target);
            if (e.l.Tooltip) f["x:HRefScreenTip"] = tt(e.l.Tooltip)
        }
        if (t["!merges"]) {
            var c = t["!merges"];
            for (var l = 0; l != c.length; ++l) {
                if (c[l].s.c != s.c || c[l].s.r != s.r) continue;
                if (c[l].e.c > c[l].s.c) f["ss:MergeAcross"] = c[l].e.c - c[l].s.c;
                if (c[l].e.r > c[l].s.r) f["ss:MergeDown"] = c[l].e.r - c[l].s.r
            }
        }
        var u = "",
            h = "";
        switch (e.t) {
            case "z":
                if (!a.sheetStubs) return "";
                break;
            case "n":
                u = "Number";
                h = String(e.v);
                break;
            case "b":
                u = "Boolean";
                h = e.v ? "1" : "0";
                break;
            case "e":
                u = "Error";
                h = $n[e.v];
                break;
            case "d":
                u = "DateTime";
                h = new Date(e.v).toISOString();
                if (e.z == null) e.z = e.z || Y[14];
                break;
            case "s":
                u = "String";
                h = st(e.v || "");
                break;
        }
        var d = Md(a.cellXfs, e, a);
        f["ss:StyleID"] = "s" + (21 + d);
        f["ss:Index"] = s.c + 1;
        var v = e.v != null ? h : "";
        var p = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + v + "</Data>";
        if ((e.c || []).length > 0) p += Xm(e.c);
        return _t("Cell", p, f)
    }

    function Ym(e, r) {
        var t = '<Row ss:Index="' + (e + 1) + '"';
        if (r) {
            if (r.hpt && !r.hpx) r.hpx = Uc(r.hpt);
            if (r.hpx) t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"';
            if (r.hidden) t += ' ss:Hidden="1"'
        }
        return t + ">"
    }

    function Km(e, r, t, a) {
        if (!e["!ref"]) return "";
        var n = Ua(e["!ref"]);
        var i = e["!merges"] || [],
            s = 0;
        var f = [];
        if (e["!cols"]) e["!cols"].forEach(function (e, r) {
            Dc(e);
            var t = !!e.width;
            var a = Pd(r, e);
            var n = {
                "ss:Index": r + 1
            };
            if (t) n["ss:Width"] = Rc(a.width);
            if (e.hidden) n["ss:Hidden"] = "1";
            f.push(_t("Column", null, n))
        });
        var o = Array.isArray(e);
        for (var c = n.s.r; c <= n.e.r; ++c) {
            var l = [Ym(c, (e["!rows"] || [])[c])];
            for (var u = n.s.c; u <= n.e.c; ++u) {
                var h = false;
                for (s = 0; s != i.length; ++s) {
                    if (i[s].s.c > u) continue;
                    if (i[s].s.r > c) continue;
                    if (i[s].e.c < u) continue;
                    if (i[s].e.r < c) continue;
                    if (i[s].s.c != u || i[s].s.r != c) h = true;
                    break
                }
                if (h) continue;
                var d = {
                    r: c,
                    c: u
                };
                var v = Pa(d),
                    p = o ? (e[c] || [])[u] : e[v];
                l.push($m(p, v, e, r, t, a, d))
            }
            l.push("</Row>");
            if (l.length > 2) f.push(l.join(""))
        }
        return f.join("")
    }

    function Jm(e, r, t) {
        var a = [];
        var n = t.SheetNames[e];
        var i = t.Sheets[n];
        var s = i ? Gm(i, r, e, t) : "";
        if (s.length > 0) a.push("<Names>" + s + "</Names>");
        s = i ? Km(i, r, e, t) : "";
        if (s.length > 0) a.push("<Table>" + s + "</Table>");
        a.push(jm(i, r, e, t));
        return a.join("")
    }

    function qm(e, r) {
        if (!r) r = {};
        if (!e.SSF) e.SSF = Tr(Y);
        if (e.SSF) {
            Ve();
            ze(e.SSF);
            r.revssf = fr(e.SSF);
            r.revssf[e.SSF[65535]] = 0;
            r.ssf = e.SSF;
            r.cellXfs = [];
            Md(r.cellXfs, {}, {
                revssf: {
                    General: 0
                }
            })
        }
        var t = [];
        t.push(Bm(e, r));
        t.push(Wm(e, r));
        t.push("");
        t.push("");
        for (var a = 0; a < e.SheetNames.length; ++a) t.push(_t("Worksheet", Jm(a, r, e), {
            "ss:Name": tt(e.SheetNames[a])
        }));
        t[2] = Hm(e, r);
        t[3] = Vm(e, r);
        return zr + _t("Workbook", t.join(""), {
            xmlns: Nt.ss,
            "xmlns:o": Nt.o,
            "xmlns:x": Nt.x,
            "xmlns:ss": Nt.ss,
            "xmlns:dt": Nt.dt,
            "xmlns:html": Nt.html
        })
    }

    function Zm(e) {
        var r = {};
        var t = e.content;
        t.l = 28;
        r.AnsiUserType = t._R(0, "lpstr-ansi");
        r.AnsiClipboardFormat = _n(t);
        if (t.length - t.l <= 4) return r;
        var a = t._R(4);
        if (a == 0 || a > 40) return r;
        t.l -= 4;
        r.Reserved1 = t._R(0, "lpstr-ansi");
        if (t.length - t.l <= 4) return r;
        a = t._R(4);
        if (a !== 1907505652) return r;
        r.UnicodeClipboardFormat = An(t);
        a = t._R(4);
        if (a == 0 || a > 40) return r;
        t.l -= 4;
        r.Reserved2 = t._R(0, "lpwstr")
    }
    var Qm = [60, 1084, 2066, 2165, 2175];

    function eb(e, r, t, a, n) {
        var i = a;
        var s = [];
        var f = t.slice(t.l, t.l + i);
        if (n && n.enc && n.enc.insitu && f.length > 0) switch (e) {
            case 9:
                ;
            case 521:
                ;
            case 1033:
                ;
            case 2057:
                ;
            case 47:
                ;
            case 405:
                ;
            case 225:
                ;
            case 406:
                ;
            case 312:
                ;
            case 404:
                ;
            case 10:
                break;
            case 133:
                break;
            default:
                n.enc.insitu(f);
        }
        s.push(f);
        t.l += i;
        var o = na(t, t.l),
            c = lb[o];
        var l = 0;
        while (c != null && Qm.indexOf(o) > -1) {
            i = na(t, t.l + 2);
            l = t.l + 4;
            if (o == 2066) l += 4;
            else if (o == 2165 || o == 2175) {
                l += 12
            }
            f = t.slice(l, t.l + 4 + i);
            s.push(f);
            t.l += 4 + i;
            c = lb[o = na(t, t.l)]
        }
        var u = I(s);
        pa(u, 0);
        var h = 0;
        u.lens = [];
        for (var d = 0; d < s.length; ++d) {
            u.lens.push(h);
            h += s[d].length
        }
        if (u.length < a) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + u.length + " < " + a;
        return r.f(u, u.length, n)
    }

    function rb(e, r, t) {
        if (e.t === "z") return;
        if (!e.XF) return;
        var a = 0;
        try {
            a = e.z || e.XF.numFmtId || 0;
            if (r.cellNF) e.z = Y[a]
        } catch (n) {
            if (r.WTF) throw n
        }
        if (!r || r.cellText !== false) try {
            if (e.t === "e") {
                e.w = e.w || $n[e.v]
            } else if (a === 0 || a == "General") {
                if (e.t === "n") {
                    if ((e.v | 0) === e.v) e.w = e.v.toString(10);
                    else e.w = fe(e.v)
                } else e.w = oe(e.v)
            } else e.w = We(a, e.v, {
                date1904: !!t,
                dateNF: r && r.dateNF
            })
        } catch (n) {
            if (r.WTF) throw n
        }
        if (r.cellDates && a && e.t == "n" && Pe(Y[a] || String(a))) {
            var i = Z(e.v);
            if (i) {
                e.t = "d";
                e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
            }
        }
    }

    function tb(e, r, t) {
        return {
            v: e,
            ixfe: r,
            t: t
        }
    }

    function ab(e, r) {
        var t = {
            opts: {}
        };
        var a = {};
        if (b != null && r.dense == null) r.dense = b;
        var n = r.dense ? [] : {};
        var i = {};
        var s = {};
        var f = null;
        var c = [];
        var l = "";
        var u = {};
        var h, d = "",
            v, p, m, g;
        var w = {};
        var k = [];
        var T;
        var E;
        var y = [];
        var S = [];
        var _ = {
                Sheets: [],
                WBProps: {
                    date1904: false
                },
                Views: [{}]
            },
            A = {};
        var x = function ve(e) {
            if (e < 8) return Xn[e];
            if (e < 64) return S[e - 8] || Xn[e];
            return Xn[e]
        };
        var C = function pe(e, r, t) {
            var a = r.XF.data;
            if (!a || !a.patternType || !t || !t.cellStyles) return;
            r.s = {};
            r.s.patternType = a.patternType;
            var n;
            if (n = Tc(x(a.icvFore))) {
                r.s.fgColor = {
                    rgb: n
                }
            }
            if (n = Tc(x(a.icvBack))) {
                r.s.bgColor = {
                    rgb: n
                }
            }
        };
        var R = function me(e, r, t) {
            if (B > 1) return;
            if (t.sheetRows && e.r >= t.sheetRows) return;
            if (t.cellStyles && r.XF && r.XF.data) C(e, r, t);
            delete r.ixfe;
            delete r.XF;
            h = e;
            d = Pa(e);
            if (!s || !s.s || !s.e) s = {
                s: {
                    r: 0,
                    c: 0
                },
                e: {
                    r: 0,
                    c: 0
                }
            };
            if (e.r < s.s.r) s.s.r = e.r;
            if (e.c < s.s.c) s.s.c = e.c;
            if (e.r + 1 > s.e.r) s.e.r = e.r + 1;
            if (e.c + 1 > s.e.c) s.e.c = e.c + 1;
            if (t.cellFormula && r.f) {
                for (var a = 0; a < k.length; ++a) {
                    if (k[a][0].s.c > e.c || k[a][0].s.r > e.r) continue;
                    if (k[a][0].e.c < e.c || k[a][0].e.r < e.r) continue;
                    r.F = Ma(k[a][0]);
                    if (k[a][0].s.c != e.c || k[a][0].s.r != e.r) delete r.f;
                    if (r.f) r.f = "" + ld(k[a][1], s, e, M, O);
                    break
                }
            } {
                if (t.dense) {
                    if (!n[e.r]) n[e.r] = [];
                    n[e.r][e.c] = r
                } else n[d] = r
            }
        };
        var O = {
            enc: false,
            sbcch: 0,
            snames: [],
            sharedf: w,
            arrayf: k,
            rrtabid: [],
            lastuser: "",
            biff: 8,
            codepage: 0,
            winlocked: 0,
            cellStyles: !!r && !!r.cellStyles,
            WTF: !!r && !!r.wtf
        };
        if (r.password) O.password = r.password;
        var I;
        var N = [];
        var F = [];
        var D = [],
            P = [];
        var L = false;
        var M = [];
        M.SheetNames = O.snames;
        M.sharedf = O.sharedf;
        M.arrayf = O.arrayf;
        M.names = [];
        M.XTI = [];
        var U = 0;
        var B = 0;
        var W = 0,
            H = [];
        var z = [];
        var V;
        O.codepage = 1200;
        o(1200);
        var G = false;
        while (e.l < e.length - 1) {
            var j = e.l;
            var X = e._R(2);
            if (X === 0 && U === 10) break;
            var $ = e.l === e.length ? 0 : e._R(2);
            var K = lb[X];
            if (K && K.f) {
                if (r.bookSheets) {
                    if (U === 133 && X !== 133) break
                }
                U = X;
                if (K.r === 2 || K.r == 12) {
                    var J = e._R(2);
                    $ -= 2;
                    if (!O.enc && J !== X && ((J & 255) << 8 | J >> 8) !== X) throw new Error("rt mismatch: " + J + "!=" + X);
                    if (K.r == 12) {
                        e.l += 10;
                        $ -= 10
                    }
                }
                var q = {};
                if (X === 10) q = K.f(e, $, O);
                else q = eb(X, K, e, $, O);
                if (B == 0 && [9, 521, 1033, 2057].indexOf(U) === -1) continue;
                switch (X) {
                    case 34:
                        t.opts.Date1904 = _.WBProps.date1904 = q;
                        break;
                    case 134:
                        t.opts.WriteProtect = true;
                        break;
                    case 47:
                        if (!O.enc) e.l = 0;
                        O.enc = q;
                        if (!r.password) throw new Error("File is password-protected");
                        if (q.valid == null) throw new Error("Encryption scheme unsupported");
                        if (!q.valid) throw new Error("Password is incorrect");
                        break;
                    case 92:
                        O.lastuser = q;
                        break;
                    case 66:
                        var Z = Number(q);
                        switch (Z) {
                            case 21010:
                                Z = 1200;
                                break;
                            case 32768:
                                Z = 1e4;
                                break;
                            case 32769:
                                Z = 1252;
                                break;
                        }
                        o(O.codepage = Z);
                        G = true;
                        break;
                    case 317:
                        O.rrtabid = q;
                        break;
                    case 25:
                        O.winlocked = q;
                        break;
                    case 439:
                        t.opts["RefreshAll"] = q;
                        break;
                    case 12:
                        t.opts["CalcCount"] = q;
                        break;
                    case 16:
                        t.opts["CalcDelta"] = q;
                        break;
                    case 17:
                        t.opts["CalcIter"] = q;
                        break;
                    case 13:
                        t.opts["CalcMode"] = q;
                        break;
                    case 14:
                        t.opts["CalcPrecision"] = q;
                        break;
                    case 95:
                        t.opts["CalcSaveRecalc"] = q;
                        break;
                    case 15:
                        O.CalcRefMode = q;
                        break;
                    case 2211:
                        t.opts.FullCalc = q;
                        break;
                    case 129:
                        if (q.fDialog) n["!type"] = "dialog";
                        if (!q.fBelow)(n["!outline"] || (n["!outline"] = {})).above = true;
                        if (!q.fRight)(n["!outline"] || (n["!outline"] = {})).left = true;
                        break;
                    case 224:
                        y.push(q);
                        break;
                    case 430:
                        M.push([q]);
                        M[M.length - 1].XTI = [];
                        break;
                    case 35:
                        ;
                    case 547:
                        M[M.length - 1].push(q);
                        break;
                    case 24:
                        ;
                    case 536:
                        V = {
                            Name: q.Name,
                            Ref: ld(q.rgce, s, null, M, O)
                        };
                        if (q.itab > 0) V.Sheet = q.itab - 1;
                        M.names.push(V);
                        if (!M[0]) {
                            M[0] = [];
                            M[0].XTI = []
                        }
                        M[M.length - 1].push(q);
                        if (q.Name == "_xlnm._FilterDatabase" && q.itab > 0)
                            if (q.rgce && q.rgce[0] && q.rgce[0][0] && q.rgce[0][0][0] == "PtgArea3d") z[q.itab - 1] = {
                                ref: Ma(q.rgce[0][0][1][2])
                            };
                        break;
                    case 22:
                        O.ExternCount = q;
                        break;
                    case 23:
                        if (M.length == 0) {
                            M[0] = [];
                            M[0].XTI = []
                        }
                        M[M.length - 1].XTI = M[M.length - 1].XTI.concat(q);
                        M.XTI = M.XTI.concat(q);
                        break;
                    case 2196:
                        if (O.biff < 8) break;
                        if (V != null) V.Comment = q[1];
                        break;
                    case 18:
                        n["!protect"] = q;
                        break;
                    case 19:
                        if (q !== 0 && O.WTF) console.error("Password verifier: " + q);
                        break;
                    case 133: {
                        i[q.pos] = q;
                        O.snames.push(q.name)
                    }
                    break;
                case 10: {
                    if (--B) break;
                    if (s.e) {
                        if (s.e.r > 0 && s.e.c > 0) {
                            s.e.r--;
                            s.e.c--;
                            n["!ref"] = Ma(s);
                            if (r.sheetRows && r.sheetRows <= s.e.r) {
                                var Q = s.e.r;
                                s.e.r = r.sheetRows - 1;
                                n["!fullref"] = n["!ref"];
                                n["!ref"] = Ma(s);
                                s.e.r = Q
                            }
                            s.e.r++;
                            s.e.c++
                        }
                        if (N.length > 0) n["!merges"] = N;
                        if (F.length > 0) n["!objects"] = F;
                        if (D.length > 0) n["!cols"] = D;
                        if (P.length > 0) n["!rows"] = P;
                        _.Sheets.push(A)
                    }
                    if (l === "") u = n;
                    else a[l] = n;
                    n = r.dense ? [] : {}
                }
                break;
                case 9:
                    ;
                case 521:
                    ;
                case 1033:
                    ;
                case 2057: {
                    if (O.biff === 8) O.biff = {
                        9: 2,
                        521: 3,
                        1033: 4
                    } [X] || {
                        512: 2,
                        768: 3,
                        1024: 4,
                        1280: 5,
                        1536: 8,
                        2: 2,
                        7: 2
                    } [q.BIFFVer] || 8;
                    O.biffguess = q.BIFFVer == 0;
                    if (q.BIFFVer == 0 && q.dt == 4096) {
                        O.biff = 5;
                        G = true;
                        o(O.codepage = 28591)
                    }
                    if (O.biff == 8 && q.BIFFVer == 0 && q.dt == 16) O.biff = 2;
                    if (B++) break;
                    n = r.dense ? [] : {};
                    if (O.biff < 8 && !G) {
                        G = true;
                        o(O.codepage = r.codepage || 1252)
                    }
                    if (O.biff < 5 || q.BIFFVer == 0 && q.dt == 4096) {
                        if (l === "") l = "Sheet1";
                        s = {
                            s: {
                                r: 0,
                                c: 0
                            },
                            e: {
                                r: 0,
                                c: 0
                            }
                        };
                        var ee = {
                            pos: e.l - $,
                            name: l
                        };
                        i[ee.pos] = ee;
                        O.snames.push(l)
                    } else l = (i[j] || {
                        name: ""
                    }).name;
                    if (q.dt == 32) n["!type"] = "chart";
                    if (q.dt == 64) n["!type"] = "macro";
                    N = [];
                    F = [];
                    O.arrayf = k = [];
                    D = [];
                    P = [];
                    L = false;
                    A = {
                        Hidden: (i[j] || {
                            hs: 0
                        }).hs,
                        name: l
                    }
                }
                break;
                case 515:
                    ;
                case 3:
                    ;
                case 2: {
                    if (n["!type"] == "chart")
                        if (r.dense ? (n[q.r] || [])[q.c] : n[Pa({
                                c: q.c,
                                r: q.r
                            })]) ++q.c;
                    T = {
                        ixfe: q.ixfe,
                        XF: y[q.ixfe] || {},
                        v: q.val,
                        t: "n"
                    };
                    if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                    rb(T, r, t.opts.Date1904);
                    R({
                        c: q.c,
                        r: q.r
                    }, T, r)
                }
                break;
                case 5:
                    ;
                case 517: {
                    T = {
                        ixfe: q.ixfe,
                        XF: y[q.ixfe],
                        v: q.val,
                        t: q.t
                    };
                    if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                    rb(T, r, t.opts.Date1904);
                    R({
                        c: q.c,
                        r: q.r
                    }, T, r)
                }
                break;
                case 638: {
                    T = {
                        ixfe: q.ixfe,
                        XF: y[q.ixfe],
                        v: q.rknum,
                        t: "n"
                    };
                    if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                    rb(T, r, t.opts.Date1904);
                    R({
                        c: q.c,
                        r: q.r
                    }, T, r)
                }
                break;
                case 189: {
                    for (var re = q.c; re <= q.C; ++re) {
                        var te = q.rkrec[re - q.c][0];
                        T = {
                            ixfe: te,
                            XF: y[te],
                            v: q.rkrec[re - q.c][1],
                            t: "n"
                        };
                        if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                        rb(T, r, t.opts.Date1904);
                        R({
                            c: re,
                            r: q.r
                        }, T, r)
                    }
                }
                break;
                case 6:
                    ;
                case 518:
                    ;
                case 1030: {
                    if (q.val == "String") {
                        f = q;
                        break
                    }
                    T = tb(q.val, q.cell.ixfe, q.tt);
                    T.XF = y[T.ixfe];
                    if (r.cellFormula) {
                        var ae = q.formula;
                        if (ae && ae[0] && ae[0][0] && ae[0][0][0] == "PtgExp") {
                            var ne = ae[0][0][1][0],
                                ie = ae[0][0][1][1];
                            var se = Pa({
                                r: ne,
                                c: ie
                            });
                            if (w[se]) T.f = "" + ld(q.formula, s, q.cell, M, O);
                            else T.F = ((r.dense ? (n[ne] || [])[ie] : n[se]) || {}).F
                        } else T.f = "" + ld(q.formula, s, q.cell, M, O)
                    }
                    if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                    rb(T, r, t.opts.Date1904);
                    R(q.cell, T, r);
                    f = q
                }
                break;
                case 7:
                    ;
                case 519: {
                    if (f) {
                        f.val = q;
                        T = tb(q, f.cell.ixfe, "s");
                        T.XF = y[T.ixfe];
                        if (r.cellFormula) {
                            T.f = "" + ld(f.formula, s, f.cell, M, O)
                        }
                        if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                        rb(T, r, t.opts.Date1904);
                        R(f.cell, T, r);
                        f = null
                    } else throw new Error("String record expects Formula")
                }
                break;
                case 33:
                    ;
                case 545: {
                    k.push(q);
                    var fe = Pa(q[0].s);
                    v = r.dense ? (n[q[0].s.r] || [])[q[0].s.c] : n[fe];
                    if (r.cellFormula && v) {
                        if (!f) break;
                        if (!fe || !v) break;
                        v.f = "" + ld(q[1], s, q[0], M, O);
                        v.F = Ma(q[0])
                    }
                }
                break;
                case 1212: {
                    if (!r.cellFormula) break;
                    if (d) {
                        if (!f) break;
                        w[Pa(f.cell)] = q[0];
                        v = r.dense ? (n[f.cell.r] || [])[f.cell.c] : n[Pa(f.cell)];
                        (v || {}).f = "" + ld(q[0], s, h, M, O)
                    }
                }
                break;
                case 253:
                    T = tb(c[q.isst].t, q.ixfe, "s");
                    if (c[q.isst].h) T.h = c[q.isst].h;
                    T.XF = y[T.ixfe];
                    if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                    rb(T, r, t.opts.Date1904);
                    R({
                        c: q.c,
                        r: q.r
                    }, T, r);
                    break;
                case 513:
                    if (r.sheetStubs) {
                        T = {
                            ixfe: q.ixfe,
                            XF: y[q.ixfe],
                            t: "z"
                        };
                        if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                        rb(T, r, t.opts.Date1904);
                        R({
                            c: q.c,
                            r: q.r
                        }, T, r)
                    }
                    break;
                case 190:
                    if (r.sheetStubs) {
                        for (var oe = q.c; oe <= q.C; ++oe) {
                            var ce = q.ixfe[oe - q.c];
                            T = {
                                ixfe: ce,
                                XF: y[ce],
                                t: "z"
                            };
                            if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                            rb(T, r, t.opts.Date1904);
                            R({
                                c: oe,
                                r: q.r
                            }, T, r)
                        }
                    }
                    break;
                case 214:
                    ;
                case 516:
                    ;
                case 4:
                    T = tb(q.val, q.ixfe, "s");
                    T.XF = y[T.ixfe];
                    if (W > 0) T.z = H[T.ixfe >> 8 & 63];
                    rb(T, r, t.opts.Date1904);
                    R({
                        c: q.c,
                        r: q.r
                    }, T, r);
                    break;
                case 0:
                    ;
                case 512: {
                    if (B === 1) s = q
                }
                break;
                case 252: {
                    c = q
                }
                break;
                case 1054: {
                    if (O.biff == 4) {
                        H[W++] = q[1];
                        for (var le = 0; le < W + 163; ++le)
                            if (Y[le] == q[1]) break;
                        if (le >= 163) Je(q[1], W + 163)
                    } else Je(q[1], q[0])
                }
                break;
                case 30: {
                    H[W++] = q;
                    for (var ue = 0; ue < W + 163; ++ue)
                        if (Y[ue] == q) break;
                    if (ue >= 163) Je(q, W + 163)
                }
                break;
                case 229:
                    N = N.concat(q);
                    break;
                case 93:
                    F[q.cmo[0]] = O.lastobj = q;
                    break;
                case 438:
                    O.lastobj.TxO = q;
                    break;
                case 127:
                    O.lastobj.ImData = q;
                    break;
                case 440: {
                    for (g = q[0].s.r; g <= q[0].e.r; ++g)
                        for (m = q[0].s.c; m <= q[0].e.c; ++m) {
                            v = r.dense ? (n[g] || [])[m] : n[Pa({
                                c: m,
                                r: g
                            })];
                            if (v) v.l = q[1]
                        }
                }
                break;
                case 2048: {
                    for (g = q[0].s.r; g <= q[0].e.r; ++g)
                        for (m = q[0].s.c; m <= q[0].e.c; ++m) {
                            v = r.dense ? (n[g] || [])[m] : n[Pa({
                                c: m,
                                r: g
                            })];
                            if (v && v.l) v.l.Tooltip = q[1]
                        }
                }
                break;
                case 28: {
                    if (O.biff <= 5 && O.biff >= 2) break;
                    v = r.dense ? (n[q[0].r] || [])[q[0].c] : n[Pa(q[0])];
                    var he = F[q[2]];
                    if (!v) {
                        if (r.dense) {
                            if (!n[q[0].r]) n[q[0].r] = [];
                            v = n[q[0].r][q[0].c] = {
                                t: "z"
                            }
                        } else {
                            v = n[Pa(q[0])] = {
                                t: "z"
                            }
                        }
                        s.e.r = Math.max(s.e.r, q[0].r);
                        s.s.r = Math.min(s.s.r, q[0].r);
                        s.e.c = Math.max(s.e.c, q[0].c);
                        s.s.c = Math.min(s.s.c, q[0].c)
                    }
                    if (!v.c) v.c = [];
                    p = {
                        a: q[1],
                        t: he.TxO.t
                    };
                    v.c.push(p)
                }
                break;
                case 2173:
                    zl(y[q.ixfe], q.ext);
                    break;
                case 125: {
                    if (!O.cellStyles) break;
                    while (q.e >= q.s) {
                        D[q.e--] = {
                            width: q.w / 256,
                            level: q.level || 0,
                            hidden: !!(q.flags & 1)
                        };
                        if (!L) {
                            L = true;
                            Fc(q.w / 256)
                        }
                        Dc(D[q.e + 1])
                    }
                }
                break;
                case 520: {
                    var de = {};
                    if (q.level != null) {
                        P[q.r] = de;
                        de.level = q.level
                    }
                    if (q.hidden) {
                        P[q.r] = de;
                        de.hidden = true
                    }
                    if (q.hpt) {
                        P[q.r] = de;
                        de.hpt = q.hpt;
                        de.hpx = Uc(q.hpt)
                    }
                }
                break;
                case 38:
                    ;
                case 39:
                    ;
                case 40:
                    ;
                case 41:
                    if (!n["!margins"]) Ld(n["!margins"] = {});
                    n["!margins"][{
                        38: "left",
                        39: "right",
                        40: "top",
                        41: "bottom"
                    } [X]] = q;
                    break;
                case 161:
                    if (!n["!margins"]) Ld(n["!margins"] = {});
                    n["!margins"].header = q.header;
                    n["!margins"].footer = q.footer;
                    break;
                case 574:
                    if (q.RTL) _.Views[0].RTL = true;
                    break;
                case 146:
                    S = q;
                    break;
                case 2198:
                    I = q;
                    break;
                case 140:
                    E = q;
                    break;
                case 442: {
                    if (!l) _.WBProps.CodeName = q || "ThisWorkbook";
                    else A.CodeName = q || A.name
                }
                break;
                }
            } else {
                if (!K) console.error("Missing Info for XLS Record 0x" + X.toString(16));
                e.l += $
            }
        }
        t.SheetNames = nr(i).sort(function (e, r) {
            return Number(e) - Number(r)
        }).map(function (e) {
            return i[e].name
        });
        if (!r.bookSheets) t.Sheets = a;
        if (!t.SheetNames.length && u["!ref"]) {
            t.SheetNames.push("Sheet1");
            if (t.Sheets) t.Sheets["Sheet1"] = u
        } else t.Preamble = u;
        if (t.Sheets) z.forEach(function (e, r) {
            t.Sheets[t.SheetNames[r]]["!autofilter"] = e
        });
        t.Strings = c;
        t.SSF = Tr(Y);
        if (O.enc) t.Encryption = O.enc;
        if (I) t.Themes = I;
        t.Metadata = {};
        if (E !== undefined) t.Metadata.Country = E;
        if (M.names.length > 0) _.Names = M.names;
        t.Workbook = _;
        return t
    }
    var nb = {
        SI: "e0859ff2f94f6810ab9108002b27b3d9",
        DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
        UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
    };

    function ib(e, r, t) {
        var a = Ze.find(e, "/!DocumentSummaryInformation");
        if (a && a.size > 0) try {
            var n = Ji(a, Wn, nb.DSI);
            for (var i in n) r[i] = n[i]
        } catch (s) {
            if (t.WTF) throw s
        }
        var f = Ze.find(e, "/!SummaryInformation");
        if (f && f.size > 0) try {
            var o = Ji(f, Hn, nb.SI);
            for (var c in o)
                if (r[c] == null) r[c] = o[c]
        } catch (s) {
            if (t.WTF) throw s
        }
        if (r.HeadingPairs && r.TitlesOfParts) {
            wi(r.HeadingPairs, r.TitlesOfParts, r, t);
            delete r.HeadingPairs;
            delete r.TitlesOfParts
        }
    }

    function sb(e, r) {
        var t = [],
            a = [],
            n = [];
        var i = 0,
            s;
        var f = ir(Wn, "n");
        var o = ir(Hn, "n");
        if (e.Props) {
            s = nr(e.Props);
            for (i = 0; i < s.length; ++i)(Object.prototype.hasOwnProperty.call(f, s[i]) ? t : Object.prototype.hasOwnProperty.call(o, s[i]) ? a : n).push([s[i], e.Props[s[i]]])
        }
        if (e.Custprops) {
            s = nr(e.Custprops);
            for (i = 0; i < s.length; ++i)
                if (!Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]))(Object.prototype.hasOwnProperty.call(f, s[i]) ? t : Object.prototype.hasOwnProperty.call(o, s[i]) ? a : n).push([s[i], e.Custprops[s[i]]])
        }
        var c = [];
        for (i = 0; i < n.length; ++i) {
            if ($i.indexOf(n[i][0]) > -1 || gi.indexOf(n[i][0]) > -1) continue;
            if (n[i][1] == null) continue;
            c.push(n[i])
        }
        if (a.length) Ze.utils.cfb_add(r, "/SummaryInformation", qi(a, nb.SI, o, Hn));
        if (t.length || c.length) Ze.utils.cfb_add(r, "/DocumentSummaryInformation", qi(t, nb.DSI, f, Wn, c.length ? c : null, nb.UDI))
    }

    function fb(e, r) {
        if (!r) r = {};
        Pg(r);
        c();
        if (r.codepage) s(r.codepage);
        var t, a;
        if (e.FullPaths) {
            if (Ze.find(e, "/encryption")) throw new Error("File is password-protected");
            t = Ze.find(e, "!CompObj");
            a = Ze.find(e, "/Workbook") || Ze.find(e, "/Book")
        } else {
            switch (r.type) {
                case "base64":
                    e = A(T(e));
                    break;
                case "binary":
                    e = A(e);
                    break;
                case "buffer":
                    break;
                case "array":
                    if (!Array.isArray(e)) e = Array.prototype.slice.call(e);
                    break;
            }
            pa(e, 0);
            a = {
                content: e
            }
        }
        var n;
        var i;
        if (t) Zm(t);
        if (r.bookProps && !r.bookSheets) n = {};
        else {
            var f = E ? "buffer" : "array";
            if (a && a.content) n = ab(a.content, r);
            else if ((i = Ze.find(e, "PerfectOffice_MAIN")) && i.content) n = Io.to_workbook(i.content, (r.type = f, r));
            else if ((i = Ze.find(e, "NativeContent_MAIN")) && i.content) n = Io.to_workbook(i.content, (r.type = f, r));
            else if ((i = Ze.find(e, "MN0")) && i.content) throw new Error("Unsupported Works 4 for Mac file");
            else throw new Error("Cannot find Workbook stream");
            if (r.bookVBA && e.FullPaths && Ze.find(e, "/_VBA_PROJECT_CUR/VBA/dir")) n.vbaraw = Eu(e)
        }
        var o = {};
        if (e.FullPaths) ib(e, o, r);
        n.Props = n.Custprops = o;
        if (r.bookFiles) n.cfb = e;
        return n
    }

    function ob(e, r) {
        var t = r || {};
        var a = Ze.utils.cfb_new({
            root: "R"
        });
        var n = "/Workbook";
        switch (t.bookType || "xls") {
            case "xls":
                t.bookType = "biff8";
            case "xla":
                if (!t.bookType) t.bookType = "xla";
            case "biff8":
                n = "/Workbook";
                t.biff = 8;
                break;
            case "biff5":
                n = "/Book";
                t.biff = 5;
                break;
            default:
                throw new Error("invalid type " + t.bookType + " for XLS CFB");
        }
        Ze.utils.cfb_add(a, n, Rb(e, t));
        if (t.biff == 8 && (e.Props || e.Custprops)) sb(e, a);
        if (t.biff == 8 && e.vbaraw) yu(a, Ze.read(e.vbaraw, {
            type: typeof e.vbaraw == "string" ? "binary" : "buffer"
        }));
        return a
    }
    var cb = {
        0: {
            f: wv
        },
        1: {
            f: xv
        },
        2: {
            f: $v
        },
        3: {
            f: Pv
        },
        4: {
            f: Iv
        },
        5: {
            f: Vv
        },
        6: {
            f: Zv
        },
        7: {
            f: Bv
        },
        8: {
            f: ip
        },
        9: {
            f: np
        },
        10: {
            f: tp
        },
        11: {
            f: ap
        },
        12: {
            f: Rv
        },
        13: {
            f: Kv
        },
        14: {
            f: Mv
        },
        15: {
            f: Fv
        },
        16: {
            f: jv
        },
        17: {
            f: ep
        },
        18: {
            f: Hv
        },
        19: {
            f: Ja
        },
        20: {},
        21: {},
        22: {},
        23: {},
        24: {},
        25: {},
        26: {},
        27: {},
        28: {},
        29: {},
        30: {},
        31: {},
        32: {},
        33: {},
        34: {},
        35: {
            T: 1
        },
        36: {
            T: -1
        },
        37: {
            T: 1
        },
        38: {
            T: -1
        },
        39: {
            f: om
        },
        40: {},
        42: {},
        43: {
            f: Qc
        },
        44: {
            f: qc
        },
        45: {
            f: al
        },
        46: {
            f: ol
        },
        47: {
            f: il
        },
        48: {},
        49: {
            f: Ga
        },
        50: {},
        51: {
            f: jl
        },
        52: {
            T: 1
        },
        53: {
            T: -1
        },
        54: {
            T: 1
        },
        55: {
            T: -1
        },
        56: {
            T: 1
        },
        57: {
            T: -1
        },
        58: {},
        59: {},
        60: {
            f: so
        },
        62: {
            f: qv
        },
        63: {
            f: ru
        },
        64: {
            f: Ep
        },
        65: {},
        66: {},
        67: {},
        68: {},
        69: {},
        70: {},
        128: {},
        129: {
            T: 1
        },
        130: {
            T: -1
        },
        131: {
            T: 1,
            f: ma,
            p: 0
        },
        132: {
            T: -1
        },
        133: {
            T: 1
        },
        134: {
            T: -1
        },
        135: {
            T: 1
        },
        136: {
            T: -1
        },
        137: {
            T: 1,
            f: gp
        },
        138: {
            T: -1
        },
        139: {
            T: 1
        },
        140: {
            T: -1
        },
        141: {
            T: 1
        },
        142: {
            T: -1
        },
        143: {
            T: 1
        },
        144: {
            T: -1
        },
        145: {
            T: 1
        },
        146: {
            T: -1
        },
        147: {
            f: _v
        },
        148: {
            f: Ev,
            p: 16
        },
        151: {
            f: up
        },
        152: {},
        153: {
            f: im
        },
        154: {},
        155: {},
        156: {
            f: am
        },
        157: {},
        158: {},
        159: {
            T: 1,
            f: jo
        },
        160: {
            T: -1
        },
        161: {
            T: 1,
            f: mn
        },
        162: {
            T: -1
        },
        163: {
            T: 1
        },
        164: {
            T: -1
        },
        165: {
            T: 1
        },
        166: {
            T: -1
        },
        167: {},
        168: {},
        169: {},
        170: {},
        171: {},
        172: {
            T: 1
        },
        173: {
            T: -1
        },
        174: {},
        175: {},
        176: {
            f: sp
        },
        177: {
            T: 1
        },
        178: {
            T: -1
        },
        179: {
            T: 1
        },
        180: {
            T: -1
        },
        181: {
            T: 1
        },
        182: {
            T: -1
        },
        183: {
            T: 1
        },
        184: {
            T: -1
        },
        185: {
            T: 1
        },
        186: {
            T: -1
        },
        187: {
            T: 1
        },
        188: {
            T: -1
        },
        189: {
            T: 1
        },
        190: {
            T: -1
        },
        191: {
            T: 1
        },
        192: {
            T: -1
        },
        193: {
            T: 1
        },
        194: {
            T: -1
        },
        195: {
            T: 1
        },
        196: {
            T: -1
        },
        197: {
            T: 1
        },
        198: {
            T: -1
        },
        199: {
            T: 1
        },
        200: {
            T: -1
        },
        201: {
            T: 1
        },
        202: {
            T: -1
        },
        203: {
            T: 1
        },
        204: {
            T: -1
        },
        205: {
            T: 1
        },
        206: {
            T: -1
        },
        207: {
            T: 1
        },
        208: {
            T: -1
        },
        209: {
            T: 1
        },
        210: {
            T: -1
        },
        211: {
            T: 1
        },
        212: {
            T: -1
        },
        213: {
            T: 1
        },
        214: {
            T: -1
        },
        215: {
            T: 1
        },
        216: {
            T: -1
        },
        217: {
            T: 1
        },
        218: {
            T: -1
        },
        219: {
            T: 1
        },
        220: {
            T: -1
        },
        221: {
            T: 1
        },
        222: {
            T: -1
        },
        223: {
            T: 1
        },
        224: {
            T: -1
        },
        225: {
            T: 1
        },
        226: {
            T: -1
        },
        227: {
            T: 1
        },
        228: {
            T: -1
        },
        229: {
            T: 1
        },
        230: {
            T: -1
        },
        231: {
            T: 1
        },
        232: {
            T: -1
        },
        233: {
            T: 1
        },
        234: {
            T: -1
        },
        235: {
            T: 1
        },
        236: {
            T: -1
        },
        237: {
            T: 1
        },
        238: {
            T: -1
        },
        239: {
            T: 1
        },
        240: {
            T: -1
        },
        241: {
            T: 1
        },
        242: {
            T: -1
        },
        243: {
            T: 1
        },
        244: {
            T: -1
        },
        245: {
            T: 1
        },
        246: {
            T: -1
        },
        247: {
            T: 1
        },
        248: {
            T: -1
        },
        249: {
            T: 1
        },
        250: {
            T: -1
        },
        251: {
            T: 1
        },
        252: {
            T: -1
        },
        253: {
            T: 1
        },
        254: {
            T: -1
        },
        255: {
            T: 1
        },
        256: {
            T: -1
        },
        257: {
            T: 1
        },
        258: {
            T: -1
        },
        259: {
            T: 1
        },
        260: {
            T: -1
        },
        261: {
            T: 1
        },
        262: {
            T: -1
        },
        263: {
            T: 1
        },
        264: {
            T: -1
        },
        265: {
            T: 1
        },
        266: {
            T: -1
        },
        267: {
            T: 1
        },
        268: {
            T: -1
        },
        269: {
            T: 1
        },
        270: {
            T: -1
        },
        271: {
            T: 1
        },
        272: {
            T: -1
        },
        273: {
            T: 1
        },
        274: {
            T: -1
        },
        275: {
            T: 1
        },
        276: {
            T: -1
        },
        277: {},
        278: {
            T: 1
        },
        279: {
            T: -1
        },
        280: {
            T: 1
        },
        281: {
            T: -1
        },
        282: {
            T: 1
        },
        283: {
            T: 1
        },
        284: {
            T: -1
        },
        285: {
            T: 1
        },
        286: {
            T: -1
        },
        287: {
            T: 1
        },
        288: {
            T: -1
        },
        289: {
            T: 1
        },
        290: {
            T: -1
        },
        291: {
            T: 1
        },
        292: {
            T: -1
        },
        293: {
            T: 1
        },
        294: {
            T: -1
        },
        295: {
            T: 1
        },
        296: {
            T: -1
        },
        297: {
            T: 1
        },
        298: {
            T: -1
        },
        299: {
            T: 1
        },
        300: {
            T: -1
        },
        301: {
            T: 1
        },
        302: {
            T: -1
        },
        303: {
            T: 1
        },
        304: {
            T: -1
        },
        305: {
            T: 1
        },
        306: {
            T: -1
        },
        307: {
            T: 1
        },
        308: {
            T: -1
        },
        309: {
            T: 1
        },
        310: {
            T: -1
        },
        311: {
            T: 1
        },
        312: {
            T: -1
        },
        313: {
            T: -1
        },
        314: {
            T: 1
        },
        315: {
            T: -1
        },
        316: {
            T: 1
        },
        317: {
            T: -1
        },
        318: {
            T: 1
        },
        319: {
            T: -1
        },
        320: {
            T: 1
        },
        321: {
            T: -1
        },
        322: {
            T: 1
        },
        323: {
            T: -1
        },
        324: {
            T: 1
        },
        325: {
            T: -1
        },
        326: {
            T: 1
        },
        327: {
            T: -1
        },
        328: {
            T: 1
        },
        329: {
            T: -1
        },
        330: {
            T: 1
        },
        331: {
            T: -1
        },
        332: {
            T: 1
        },
        333: {
            T: -1
        },
        334: {
            T: 1
        },
        335: {
            f: Vl
        },
        336: {
            T: -1
        },
        337: {
            f: Yl,
            T: 1
        },
        338: {
            T: -1
        },
        339: {
            T: 1
        },
        340: {
            T: -1
        },
        341: {
            T: 1
        },
        342: {
            T: -1
        },
        343: {
            T: 1
        },
        344: {
            T: -1
        },
        345: {
            T: 1
        },
        346: {
            T: -1
        },
        347: {
            T: 1
        },
        348: {
            T: -1
        },
        349: {
            T: 1
        },
        350: {
            T: -1
        },
        351: {},
        352: {},
        353: {
            T: 1
        },
        354: {
            T: -1
        },
        355: {
            f: ln
        },
        357: {},
        358: {},
        359: {},
        360: {
            T: 1
        },
        361: {},
        362: {
            f: Mf
        },
        363: {},
        364: {},
        366: {},
        367: {},
        368: {},
        369: {},
        370: {},
        371: {},
        372: {
            T: 1
        },
        373: {
            T: -1
        },
        374: {
            T: 1
        },
        375: {
            T: -1
        },
        376: {
            T: 1
        },
        377: {
            T: -1
        },
        378: {
            T: 1
        },
        379: {
            T: -1
        },
        380: {
            T: 1
        },
        381: {
            T: -1
        },
        382: {
            T: 1
        },
        383: {
            T: -1
        },
        384: {
            T: 1
        },
        385: {
            T: -1
        },
        386: {
            T: 1
        },
        387: {
            T: -1
        },
        388: {
            T: 1
        },
        389: {
            T: -1
        },
        390: {
            T: 1
        },
        391: {
            T: -1
        },
        392: {
            T: 1
        },
        393: {
            T: -1
        },
        394: {
            T: 1
        },
        395: {
            T: -1
        },
        396: {},
        397: {},
        398: {},
        399: {},
        400: {},
        401: {
            T: 1
        },
        403: {},
        404: {},
        405: {},
        406: {},
        407: {},
        408: {},
        409: {},
        410: {},
        411: {},
        412: {},
        413: {},
        414: {},
        415: {},
        416: {},
        417: {},
        418: {},
        419: {},
        420: {},
        421: {},
        422: {
            T: 1
        },
        423: {
            T: 1
        },
        424: {
            T: -1
        },
        425: {
            T: -1
        },
        426: {
            f: hp
        },
        427: {
            f: dp
        },
        428: {},
        429: {
            T: 1
        },
        430: {
            T: -1
        },
        431: {
            T: 1
        },
        432: {
            T: -1
        },
        433: {
            T: 1
        },
        434: {
            T: -1
        },
        435: {
            T: 1
        },
        436: {
            T: -1
        },
        437: {
            T: 1
        },
        438: {
            T: -1
        },
        439: {
            T: 1
        },
        440: {
            T: -1
        },
        441: {
            T: 1
        },
        442: {
            T: -1
        },
        443: {
            T: 1
        },
        444: {
            T: -1
        },
        445: {
            T: 1
        },
        446: {
            T: -1
        },
        447: {
            T: 1
        },
        448: {
            T: -1
        },
        449: {
            T: 1
        },
        450: {
            T: -1
        },
        451: {
            T: 1
        },
        452: {
            T: -1
        },
        453: {
            T: 1
        },
        454: {
            T: -1
        },
        455: {
            T: 1
        },
        456: {
            T: -1
        },
        457: {
            T: 1
        },
        458: {
            T: -1
        },
        459: {
            T: 1
        },
        460: {
            T: -1
        },
        461: {
            T: 1
        },
        462: {
            T: -1
        },
        463: {
            T: 1
        },
        464: {
            T: -1
        },
        465: {
            T: 1
        },
        466: {
            T: -1
        },
        467: {
            T: 1
        },
        468: {
            T: -1
        },
        469: {
            T: 1
        },
        470: {
            T: -1
        },
        471: {},
        472: {},
        473: {
            T: 1
        },
        474: {
            T: -1
        },
        475: {},
        476: {
            f: mp
        },
        477: {},
        478: {},
        479: {
            T: 1
        },
        480: {
            T: -1
        },
        481: {
            T: 1
        },
        482: {
            T: -1
        },
        483: {
            T: 1
        },
        484: {
            T: -1
        },
        485: {
            f: Sv
        },
        486: {
            T: 1
        },
        487: {
            T: -1
        },
        488: {
            T: 1
        },
        489: {
            T: -1
        },
        490: {
            T: 1
        },
        491: {
            T: -1
        },
        492: {
            T: 1
        },
        493: {
            T: -1
        },
        494: {
            f: cp
        },
        495: {
            T: 1
        },
        496: {
            T: -1
        },
        497: {
            T: 1
        },
        498: {
            T: -1
        },
        499: {},
        500: {
            T: 1
        },
        501: {
            T: -1
        },
        502: {
            T: 1
        },
        503: {
            T: -1
        },
        504: {},
        505: {
            T: 1
        },
        506: {
            T: -1
        },
        507: {},
        508: {
            T: 1
        },
        509: {
            T: -1
        },
        510: {
            T: 1
        },
        511: {
            T: -1
        },
        512: {},
        513: {},
        514: {
            T: 1
        },
        515: {
            T: -1
        },
        516: {
            T: 1
        },
        517: {
            T: -1
        },
        518: {
            T: 1
        },
        519: {
            T: -1
        },
        520: {
            T: 1
        },
        521: {
            T: -1
        },
        522: {},
        523: {},
        524: {},
        525: {},
        526: {},
        527: {},
        528: {
            T: 1
        },
        529: {
            T: -1
        },
        530: {
            T: 1
        },
        531: {
            T: -1
        },
        532: {
            T: 1
        },
        533: {
            T: -1
        },
        534: {},
        535: {},
        536: {},
        537: {},
        538: {
            T: 1
        },
        539: {
            T: -1
        },
        540: {
            T: 1
        },
        541: {
            T: -1
        },
        542: {
            T: 1
        },
        548: {},
        549: {},
        550: {
            f: ln
        },
        551: {},
        552: {},
        553: {},
        554: {
            T: 1
        },
        555: {
            T: -1
        },
        556: {
            T: 1
        },
        557: {
            T: -1
        },
        558: {
            T: 1
        },
        559: {
            T: -1
        },
        560: {
            T: 1
        },
        561: {
            T: -1
        },
        562: {},
        564: {},
        565: {
            T: 1
        },
        566: {
            T: -1
        },
        569: {
            T: 1
        },
        570: {
            T: -1
        },
        572: {},
        573: {
            T: 1
        },
        574: {
            T: -1
        },
        577: {},
        578: {},
        579: {},
        580: {},
        581: {},
        582: {},
        583: {},
        584: {},
        585: {},
        586: {},
        587: {},
        588: {
            T: -1
        },
        589: {},
        590: {
            T: 1
        },
        591: {
            T: -1
        },
        592: {
            T: 1
        },
        593: {
            T: -1
        },
        594: {
            T: 1
        },
        595: {
            T: -1
        },
        596: {},
        597: {
            T: 1
        },
        598: {
            T: -1
        },
        599: {
            T: 1
        },
        600: {
            T: -1
        },
        601: {
            T: 1
        },
        602: {
            T: -1
        },
        603: {
            T: 1
        },
        604: {
            T: -1
        },
        605: {
            T: 1
        },
        606: {
            T: -1
        },
        607: {},
        608: {
            T: 1
        },
        609: {
            T: -1
        },
        610: {},
        611: {
            T: 1
        },
        612: {
            T: -1
        },
        613: {
            T: 1
        },
        614: {
            T: -1
        },
        615: {
            T: 1
        },
        616: {
            T: -1
        },
        617: {
            T: 1
        },
        618: {
            T: -1
        },
        619: {
            T: 1
        },
        620: {
            T: -1
        },
        625: {},
        626: {
            T: 1
        },
        627: {
            T: -1
        },
        628: {
            T: 1
        },
        629: {
            T: -1
        },
        630: {
            T: 1
        },
        631: {
            T: -1
        },
        632: {
            f: bu
        },
        633: {
            T: 1
        },
        634: {
            T: -1
        },
        635: {
            T: 1,
            f: pu
        },
        636: {
            T: -1
        },
        637: {
            f: Za
        },
        638: {
            T: 1
        },
        639: {},
        640: {
            T: -1
        },
        641: {
            T: 1
        },
        642: {
            T: -1
        },
        643: {
            T: 1
        },
        644: {},
        645: {
            T: -1
        },
        646: {
            T: 1
        },
        648: {
            T: 1
        },
        649: {},
        650: {
            T: -1
        },
        651: {
            f: Wp
        },
        652: {},
        653: {
            T: 1
        },
        654: {
            T: -1
        },
        655: {
            T: 1
        },
        656: {
            T: -1
        },
        657: {
            T: 1
        },
        658: {
            T: -1
        },
        659: {},
        660: {
            T: 1
        },
        661: {},
        662: {
            T: -1
        },
        663: {},
        664: {
            T: 1
        },
        665: {},
        666: {
            T: -1
        },
        667: {},
        668: {},
        669: {},
        671: {
            T: 1
        },
        672: {
            T: -1
        },
        673: {
            T: 1
        },
        674: {
            T: -1
        },
        675: {},
        676: {},
        677: {},
        678: {},
        679: {},
        680: {},
        681: {},
        1024: {},
        1025: {},
        1026: {
            T: 1
        },
        1027: {
            T: -1
        },
        1028: {
            T: 1
        },
        1029: {
            T: -1
        },
        1030: {},
        1031: {
            T: 1
        },
        1032: {
            T: -1
        },
        1033: {
            T: 1
        },
        1034: {
            T: -1
        },
        1035: {},
        1036: {},
        1037: {},
        1038: {
            T: 1
        },
        1039: {
            T: -1
        },
        1040: {},
        1041: {
            T: 1
        },
        1042: {
            T: -1
        },
        1043: {},
        1044: {},
        1045: {},
        1046: {
            T: 1
        },
        1047: {
            T: -1
        },
        1048: {
            T: 1
        },
        1049: {
            T: -1
        },
        1050: {},
        1051: {
            T: 1
        },
        1052: {
            T: 1
        },
        1053: {
            f: yp
        },
        1054: {
            T: 1
        },
        1055: {},
        1056: {
            T: 1
        },
        1057: {
            T: -1
        },
        1058: {
            T: 1
        },
        1059: {
            T: -1
        },
        1061: {},
        1062: {
            T: 1
        },
        1063: {
            T: -1
        },
        1064: {
            T: 1
        },
        1065: {
            T: -1
        },
        1066: {
            T: 1
        },
        1067: {
            T: -1
        },
        1068: {
            T: 1
        },
        1069: {
            T: -1
        },
        1070: {
            T: 1
        },
        1071: {
            T: -1
        },
        1072: {
            T: 1
        },
        1073: {
            T: -1
        },
        1075: {
            T: 1
        },
        1076: {
            T: -1
        },
        1077: {
            T: 1
        },
        1078: {
            T: -1
        },
        1079: {
            T: 1
        },
        1080: {
            T: -1
        },
        1081: {
            T: 1
        },
        1082: {
            T: -1
        },
        1083: {
            T: 1
        },
        1084: {
            T: -1
        },
        1085: {},
        1086: {
            T: 1
        },
        1087: {
            T: -1
        },
        1088: {
            T: 1
        },
        1089: {
            T: -1
        },
        1090: {
            T: 1
        },
        1091: {
            T: -1
        },
        1092: {
            T: 1
        },
        1093: {
            T: -1
        },
        1094: {
            T: 1
        },
        1095: {
            T: -1
        },
        1096: {},
        1097: {
            T: 1
        },
        1098: {},
        1099: {
            T: -1
        },
        1100: {
            T: 1
        },
        1101: {
            T: -1
        },
        1102: {},
        1103: {},
        1104: {},
        1105: {},
        1111: {},
        1112: {},
        1113: {
            T: 1
        },
        1114: {
            T: -1
        },
        1115: {
            T: 1
        },
        1116: {
            T: -1
        },
        1117: {},
        1118: {
            T: 1
        },
        1119: {
            T: -1
        },
        1120: {
            T: 1
        },
        1121: {
            T: -1
        },
        1122: {
            T: 1
        },
        1123: {
            T: -1
        },
        1124: {
            T: 1
        },
        1125: {
            T: -1
        },
        1126: {},
        1128: {
            T: 1
        },
        1129: {
            T: -1
        },
        1130: {},
        1131: {
            T: 1
        },
        1132: {
            T: -1
        },
        1133: {
            T: 1
        },
        1134: {
            T: -1
        },
        1135: {
            T: 1
        },
        1136: {
            T: -1
        },
        1137: {
            T: 1
        },
        1138: {
            T: -1
        },
        1139: {
            T: 1
        },
        1140: {
            T: -1
        },
        1141: {},
        1142: {
            T: 1
        },
        1143: {
            T: -1
        },
        1144: {
            T: 1
        },
        1145: {
            T: -1
        },
        1146: {},
        1147: {
            T: 1
        },
        1148: {
            T: -1
        },
        1149: {
            T: 1
        },
        1150: {
            T: -1
        },
        1152: {
            T: 1
        },
        1153: {
            T: -1
        },
        1154: {
            T: -1
        },
        1155: {
            T: -1
        },
        1156: {
            T: -1
        },
        1157: {
            T: 1
        },
        1158: {
            T: -1
        },
        1159: {
            T: 1
        },
        1160: {
            T: -1
        },
        1161: {
            T: 1
        },
        1162: {
            T: -1
        },
        1163: {
            T: 1
        },
        1164: {
            T: -1
        },
        1165: {
            T: 1
        },
        1166: {
            T: -1
        },
        1167: {
            T: 1
        },
        1168: {
            T: -1
        },
        1169: {
            T: 1
        },
        1170: {
            T: -1
        },
        1171: {},
        1172: {
            T: 1
        },
        1173: {
            T: -1
        },
        1177: {},
        1178: {
            T: 1
        },
        1180: {},
        1181: {},
        1182: {},
        2048: {
            T: 1
        },
        2049: {
            T: -1
        },
        2050: {},
        2051: {
            T: 1
        },
        2052: {
            T: -1
        },
        2053: {},
        2054: {},
        2055: {
            T: 1
        },
        2056: {
            T: -1
        },
        2057: {
            T: 1
        },
        2058: {
            T: -1
        },
        2060: {},
        2067: {},
        2068: {
            T: 1
        },
        2069: {
            T: -1
        },
        2070: {},
        2071: {},
        2072: {
            T: 1
        },
        2073: {
            T: -1
        },
        2075: {},
        2076: {},
        2077: {
            T: 1
        },
        2078: {
            T: -1
        },
        2079: {},
        2080: {
            T: 1
        },
        2081: {
            T: -1
        },
        2082: {},
        2083: {
            T: 1
        },
        2084: {
            T: -1
        },
        2085: {
            T: 1
        },
        2086: {
            T: -1
        },
        2087: {
            T: 1
        },
        2088: {
            T: -1
        },
        2089: {
            T: 1
        },
        2090: {
            T: -1
        },
        2091: {},
        2092: {},
        2093: {
            T: 1
        },
        2094: {
            T: -1
        },
        2095: {},
        2096: {
            T: 1
        },
        2097: {
            T: -1
        },
        2098: {
            T: 1
        },
        2099: {
            T: -1
        },
        2100: {
            T: 1
        },
        2101: {
            T: -1
        },
        2102: {},
        2103: {
            T: 1
        },
        2104: {
            T: -1
        },
        2105: {},
        2106: {
            T: 1
        },
        2107: {
            T: -1
        },
        2108: {},
        2109: {
            T: 1
        },
        2110: {
            T: -1
        },
        2111: {
            T: 1
        },
        2112: {
            T: -1
        },
        2113: {
            T: 1
        },
        2114: {
            T: -1
        },
        2115: {},
        2116: {},
        2117: {},
        2118: {
            T: 1
        },
        2119: {
            T: -1
        },
        2120: {},
        2121: {
            T: 1
        },
        2122: {
            T: -1
        },
        2123: {
            T: 1
        },
        2124: {
            T: -1
        },
        2125: {},
        2126: {
            T: 1
        },
        2127: {
            T: -1
        },
        2128: {},
        2129: {
            T: 1
        },
        2130: {
            T: -1
        },
        2131: {
            T: 1
        },
        2132: {
            T: -1
        },
        2133: {
            T: 1
        },
        2134: {},
        2135: {},
        2136: {},
        2137: {
            T: 1
        },
        2138: {
            T: -1
        },
        2139: {
            T: 1
        },
        2140: {
            T: -1
        },
        2141: {},
        3072: {},
        3073: {},
        4096: {
            T: 1
        },
        4097: {
            T: -1
        },
        5002: {
            T: 1
        },
        5003: {
            T: -1
        },
        5081: {
            T: 1
        },
        5082: {
            T: -1
        },
        5083: {},
        5084: {
            T: 1
        },
        5085: {
            T: -1
        },
        5086: {
            T: 1
        },
        5087: {
            T: -1
        },
        5088: {},
        5089: {},
        5090: {},
        5092: {
            T: 1
        },
        5093: {
            T: -1
        },
        5094: {},
        5095: {
            T: 1
        },
        5096: {
            T: -1
        },
        5097: {},
        5099: {},
        65535: {
            n: ""
        }
    };
    var lb = {
        6: {
            f: bd
        },
        10: {
            f: Zi
        },
        12: {
            f: as
        },
        13: {
            f: as
        },
        14: {
            f: rs
        },
        15: {
            f: rs
        },
        16: {
            f: gn
        },
        17: {
            f: rs
        },
        18: {
            f: rs
        },
        19: {
            f: as
        },
        20: {
            f: Nf
        },
        21: {
            f: Nf
        },
        23: {
            f: Mf
        },
        24: {
            f: Lf
        },
        25: {
            f: rs
        },
        26: {},
        27: {},
        28: {
            f: Gf
        },
        29: {},
        34: {
            f: rs
        },
        35: {
            f: Df
        },
        38: {
            f: gn
        },
        39: {
            f: gn
        },
        40: {
            f: gn
        },
        41: {
            f: gn
        },
        42: {
            f: rs
        },
        43: {
            f: rs
        },
        47: {
            f: gc
        },
        49: {
            f: cf
        },
        51: {
            f: as
        },
        60: {},
        61: {
            f: af
        },
        64: {
            f: rs
        },
        65: {
            f: of
        },
        66: {
            f: as
        },
        77: {},
        80: {},
        81: {},
        82: {},
        85: {
            f: as
        },
        89: {},
        90: {},
        91: {},
        92: {
            f: js
        },
        93: {
            f: $f
        },
        94: {},
        95: {
            f: rs
        },
        96: {},
        97: {},
        99: {
            f: rs
        },
        125: {
            f: so
        },
        128: {
            f: Af
        },
        129: {
            f: $s
        },
        130: {
            f: as
        },
        131: {
            f: rs
        },
        132: {
            f: rs
        },
        133: {
            f: Ys
        },
        134: {},
        140: {
            f: ro
        },
        141: {
            f: as
        },
        144: {},
        146: {
            f: no
        },
        151: {},
        152: {},
        153: {},
        154: {},
        155: {},
        156: {
            f: as
        },
        157: {},
        158: {},
        160: {
            f: ho
        },
        161: {
            f: oo
        },
        174: {},
        175: {},
        176: {},
        177: {},
        178: {},
        180: {},
        181: {},
        182: {},
        184: {},
        185: {},
        189: {
            f: Tf
        },
        190: {
            f: Ef
        },
        193: {
            f: Zi
        },
        197: {},
        198: {},
        199: {},
        200: {},
        201: {},
        202: {
            f: rs
        },
        203: {},
        204: {},
        205: {},
        206: {},
        207: {},
        208: {},
        209: {},
        210: {},
        211: {},
        213: {},
        215: {},
        216: {},
        217: {},
        218: {
            f: as
        },
        220: {},
        221: {
            f: rs
        },
        222: {},
        224: {
            f: Sf
        },
        225: {
            f: Gs
        },
        226: {
            f: Zi
        },
        227: {},
        229: {
            f: jf
        },
        233: {},
        235: {},
        236: {},
        237: {},
        239: {},
        240: {},
        241: {},
        242: {},
        244: {},
        245: {},
        246: {},
        247: {},
        248: {},
        249: {},
        251: {},
        252: {
            f: Js
        },
        253: {
            f: uf
        },
        255: {
            f: Zs
        },
        256: {},
        259: {},
        290: {},
        311: {},
        312: {},
        315: {},
        317: {
            f: is
        },
        318: {},
        319: {},
        320: {},
        330: {},
        331: {},
        333: {},
        334: {},
        335: {},
        336: {},
        337: {},
        338: {},
        339: {},
        340: {},
        351: {},
        352: {
            f: rs
        },
        353: {
            f: Zi
        },
        401: {},
        402: {},
        403: {},
        404: {},
        405: {},
        406: {},
        407: {},
        408: {},
        425: {},
        426: {},
        427: {},
        428: {},
        429: {},
        430: {
            f: Ff
        },
        431: {
            f: rs
        },
        432: {},
        433: {},
        434: {},
        437: {},
        438: {
            f: Jf
        },
        439: {
            f: rs
        },
        440: {
            f: qf
        },
        441: {},
        442: {
            f: hs
        },
        443: {},
        444: {
            f: as
        },
        445: {},
        446: {},
        448: {
            f: Zi
        },
        449: {
            f: rf,
            r: 2
        },
        450: {
            f: Zi
        },
        512: {
            f: gf
        },
        513: {
            f: uo
        },
        515: {
            f: Of
        },
        516: {
            f: df
        },
        517: {
            f: Cf
        },
        519: {
            f: vo
        },
        520: {
            f: Qs
        },
        523: {},
        545: {
            f: Hf
        },
        549: {
            f: tf
        },
        566: {},
        574: {
            f: sf
        },
        638: {
            f: kf
        },
        659: {},
        1048: {},
        1054: {
            f: pf
        },
        1084: {},
        1212: {
            f: Wf
        },
        2048: {
            f: Qf
        },
        2049: {},
        2050: {},
        2051: {},
        2052: {},
        2053: {},
        2054: {},
        2055: {},
        2056: {},
        2057: {
            f: zs
        },
        2058: {},
        2059: {},
        2060: {},
        2061: {},
        2062: {},
        2063: {},
        2064: {},
        2066: {},
        2067: {},
        2128: {},
        2129: {},
        2130: {},
        2131: {},
        2132: {},
        2133: {},
        2134: {},
        2135: {},
        2136: {},
        2137: {},
        2138: {},
        2146: {},
        2147: {
            r: 12
        },
        2148: {},
        2149: {},
        2150: {},
        2151: {
            f: Zi
        },
        2152: {},
        2154: {},
        2155: {},
        2156: {},
        2161: {},
        2162: {},
        2164: {},
        2165: {},
        2166: {},
        2167: {},
        2168: {},
        2169: {},
        2170: {},
        2171: {},
        2172: {
            f: io,
            r: 12
        },
        2173: {
            f: Hl,
            r: 12
        },
        2174: {},
        2175: {},
        2180: {},
        2181: {},
        2182: {},
        2183: {},
        2184: {},
        2185: {},
        2186: {},
        2187: {},
        2188: {
            f: rs,
            r: 12
        },
        2189: {},
        2190: {
            r: 12
        },
        2191: {},
        2192: {},
        2194: {},
        2195: {},
        2196: {
            f: Bf,
            r: 12
        },
        2197: {},
        2198: {
            f: Pl,
            r: 12
        },
        2199: {},
        2200: {},
        2201: {},
        2202: {
            f: zf,
            r: 12
        },
        2203: {
            f: Zi
        },
        2204: {},
        2205: {},
        2206: {},
        2207: {},
        2211: {
            f: ef
        },
        2212: {},
        2213: {},
        2214: {},
        2215: {},
        4097: {},
        4098: {},
        4099: {},
        4102: {},
        4103: {},
        4105: {},
        4106: {},
        4107: {},
        4108: {},
        4109: {},
        4116: {},
        4117: {},
        4118: {},
        4119: {},
        4120: {},
        4121: {},
        4122: {},
        4123: {},
        4124: {},
        4125: {},
        4126: {},
        4127: {},
        4128: {},
        4129: {},
        4130: {},
        4132: {},
        4133: {},
        4134: {
            f: as
        },
        4135: {},
        4146: {},
        4147: {},
        4148: {},
        4149: {},
        4154: {},
        4156: {},
        4157: {},
        4158: {},
        4159: {},
        4160: {},
        4161: {},
        4163: {},
        4164: {
            f: co
        },
        4165: {},
        4166: {},
        4168: {},
        4170: {},
        4171: {},
        4174: {},
        4175: {},
        4176: {},
        4177: {},
        4187: {},
        4188: {
            f: ao
        },
        4189: {},
        4191: {},
        4192: {},
        4193: {},
        4194: {},
        4195: {},
        4196: {},
        4197: {},
        4198: {},
        4199: {},
        4200: {},
        0: {
            f: gf
        },
        1: {},
        2: {
            f: wo
        },
        3: {
            f: bo
        },
        4: {
            f: mo
        },
        5: {
            f: Cf
        },
        7: {
            f: To
        },
        8: {},
        9: {
            f: zs
        },
        11: {},
        22: {
            f: as
        },
        30: {
            f: bf
        },
        31: {},
        32: {},
        33: {
            f: Hf
        },
        36: {},
        37: {
            f: tf
        },
        50: {
            f: Eo
        },
        62: {},
        52: {},
        67: {},
        68: {
            f: as
        },
        69: {},
        86: {},
        126: {},
        127: {
            f: po
        },
        135: {},
        136: {},
        137: {},
        145: {},
        148: {},
        149: {},
        150: {},
        169: {},
        171: {},
        188: {},
        191: {},
        192: {},
        194: {},
        195: {},
        214: {
            f: yo
        },
        223: {},
        234: {},
        354: {},
        421: {},
        518: {
            f: bd
        },
        521: {
            f: zs
        },
        536: {
            f: Lf
        },
        547: {
            f: Df
        },
        561: {},
        579: {},
        1030: {
            f: bd
        },
        1033: {
            f: zs
        },
        1091: {},
        2157: {},
        2163: {},
        2177: {},
        2240: {},
        2241: {},
        2242: {},
        2243: {},
        2244: {},
        2245: {},
        2246: {},
        2247: {},
        2248: {},
        2249: {},
        2250: {},
        2251: {},
        2262: {
            r: 12
        },
        101: {},
        102: {},
        105: {},
        106: {},
        107: {},
        109: {},
        112: {},
        114: {},
        29282: {}
    };

    function ub(e, r, t, a) {
        var n = r;
        if (isNaN(n)) return;
        var i = a || (t || []).length || 0;
        var s = e.next(4);
        s._W(2, n);
        s._W(2, i);
        if (i > 0 && ra(t)) e.push(t)
    }

    function hb(e, r, t, a) {
        var n = a || (t || []).length || 0;
        if (n <= 8224) return ub(e, r, t, n);
        var i = r;
        if (isNaN(i)) return;
        var s = t.parts || [],
            f = 0;
        var o = 0,
            c = 0;
        while (c + (s[f] || 8224) <= 8224) {
            c += s[f] || 8224;
            f++
        }
        var l = e.next(4);
        l._W(2, i);
        l._W(2, c);
        e.push(t.slice(o, o + c));
        o += c;
        while (o < n) {
            l = e.next(4);
            l._W(2, 60);
            c = 0;
            while (c + (s[f] || 8224) <= 8224) {
                c += s[f] || 8224;
                f++
            }
            l._W(2, c);
            e.push(t.slice(o, o + c));
            o += c
        }
    }

    function db(e, r, t) {
        if (!e) e = ba(7);
        e._W(2, r);
        e._W(2, t);
        e._W(2, 0);
        e._W(1, 0);
        return e
    }

    function vb(e, r, t, a) {
        var n = ba(9);
        db(n, e, r);
        fs(t, a || "b", n);
        return n
    }

    function pb(e, r, t) {
        var a = ba(8 + 2 * t.length);
        db(a, e, r);
        a._W(1, t.length);
        a._W(t.length, t, "sbcs");
        return a.l < a.length ? a.slice(0, a.l) : a
    }

    function mb(e, r, t, a) {
        if (r.v != null) switch (r.t) {
            case "d":
                ;
            case "n":
                var n = r.t == "d" ? lr(wr(r.v)) : r.v;
                if (n == (n | 0) && n >= 0 && n < 65536) ub(e, 2, ko(t, a, n));
                else ub(e, 3, go(t, a, n));
                return;
            case "b":
                ;
            case "e":
                ub(e, 5, vb(t, a, r.v, r.t));
                return;
            case "s":
                ;
            case "str":
                ub(e, 4, pb(t, a, (r.v || "").slice(0, 255)));
                return;
        }
        ub(e, 1, db(null, t, a))
    }

    function bb(e, r, t, a) {
        var n = Array.isArray(r);
        var i = Ua(r["!ref"] || "A1"),
            s, f = "",
            o = [];
        if (i.e.c > 255 || i.e.r > 16383) {
            if (a.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
            i.e.c = Math.min(i.e.c, 255);
            i.e.r = Math.min(i.e.c, 16383);
            s = Ma(i)
        }
        for (var c = i.s.r; c <= i.e.r; ++c) {
            f = Aa(c);
            for (var l = i.s.c; l <= i.e.c; ++l) {
                if (c === i.s.r) o[l] = Oa(l);
                s = o[l] + f;
                var u = n ? (r[c] || [])[l] : r[s];
                if (!u) continue;
                mb(e, u, c, l, a)
            }
        }
    }

    function gb(e, r) {
        var t = r || {};
        if (b != null && t.dense == null) t.dense = b;
        var a = wa();
        var n = 0;
        for (var i = 0; i < e.SheetNames.length; ++i)
            if (e.SheetNames[i] == t.sheet) n = i;
        if (n == 0 && !!t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
        ub(a, t.biff == 4 ? 1033 : t.biff == 3 ? 521 : 9, Vs(e, 16, t));
        bb(a, e.Sheets[e.SheetNames[n]], n, t, e);
        ub(a, 10);
        return a.end()
    }

    function wb(e, r, t) {
        ub(e, 49, lf({
            sz: 12,
            color: {
                theme: 1
            },
            name: "Arial",
            family: 2,
            scheme: "minor"
        }, t))
    }

    function kb(e, r, t) {
        if (!r) return;
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function (a) {
            for (var n = a[0]; n <= a[1]; ++n)
                if (r[n] != null) ub(e, 1054, mf(n, r[n], t))
        })
    }

    function Tb(e, r) {
        var t = ba(19);
        t._W(4, 2151);
        t._W(4, 0);
        t._W(4, 0);
        t._W(2, 3);
        t._W(1, 1);
        t._W(4, 0);
        ub(e, 2151, t);
        t = ba(39);
        t._W(4, 2152);
        t._W(4, 0);
        t._W(4, 0);
        t._W(2, 3);
        t._W(1, 0);
        t._W(4, 0);
        t._W(2, 1);
        t._W(4, 4);
        t._W(2, 0);
        Fs(Ua(r["!ref"] || "A1"), t);
        t._W(4, 4);
        ub(e, 2152, t)
    }

    function Eb(e, r) {
        for (var t = 0; t < 16; ++t) ub(e, 224, _f({
            numFmtId: 0,
            style: true
        }, 0, r));
        r.cellXfs.forEach(function (t) {
            ub(e, 224, _f(t, 0, r))
        })
    }

    function yb(e, r) {
        for (var t = 0; t < r["!links"].length; ++t) {
            var a = r["!links"][t];
            ub(e, 440, Zf(a));
            if (a[1].Tooltip) ub(e, 2048, eo(a))
        }
        delete r["!links"]
    }

    function Sb(e, r) {
        if (!r) return;
        var t = 0;
        r.forEach(function (r, a) {
            if (++t <= 256 && r) {
                ub(e, 125, fo(Pd(a, r), a))
            }
        })
    }

    function _b(e, r, t, a, n) {
        var i = 16 + Md(n.cellXfs, r, n);
        if (r.v == null && !r.bf) {
            ub(e, 513, As(t, a, i));
            return
        }
        if (r.bf) ub(e, 6, gd(r, t, a, n, i));
        else switch (r.t) {
            case "d":
                ;
            case "n":
                var s = r.t == "d" ? lr(wr(r.v)) : r.v;
                ub(e, 515, If(t, a, s, i, n));
                break;
            case "b":
                ;
            case "e":
                ub(e, 517, Rf(t, a, r.v, i, n, r.t));
                break;
            case "s":
                ;
            case "str":
                if (n.bookSST) {
                    var f = Dd(n.Strings, r.v, n.revStrings);
                    ub(e, 253, hf(t, a, f, i, n))
                } else ub(e, 516, vf(t, a, (r.v || "").slice(0, 255), i, n));
                break;
            default:
                ub(e, 513, As(t, a, i));
        }
    }

    function Ab(e, r, t) {
        var a = wa();
        var n = t.SheetNames[e],
            i = t.Sheets[n] || {};
        var s = (t || {}).Workbook || {};
        var f = (s.Sheets || [])[e] || {};
        var o = Array.isArray(i);
        var c = r.biff == 8;
        var l, u = "",
            h = [];
        var d = Ua(i["!ref"] || "A1");
        var v = c ? 65536 : 16384;
        if (d.e.c > 255 || d.e.r >= v) {
            if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
            d.e.c = Math.min(d.e.c, 255);
            d.e.r = Math.min(d.e.c, v - 1)
        }
        ub(a, 2057, Vs(t, 16, r));
        ub(a, 13, ns(1));
        ub(a, 12, ns(100));
        ub(a, 15, ts(true));
        ub(a, 17, ts(false));
        ub(a, 16, wn(.001));
        ub(a, 95, ts(true));
        ub(a, 42, ts(false));
        ub(a, 43, ts(false));
        ub(a, 130, ns(1));
        ub(a, 128, xf([0, 0]));
        ub(a, 131, ts(false));
        ub(a, 132, ts(false));
        if (c) Sb(a, i["!cols"]);
        ub(a, 512, wf(d, r));
        if (c) i["!links"] = [];
        for (var p = d.s.r; p <= d.e.r; ++p) {
            u = Aa(p);
            for (var m = d.s.c; m <= d.e.c; ++m) {
                if (p === d.s.r) h[m] = Oa(m);
                l = h[m] + u;
                var b = o ? (i[p] || [])[m] : i[l];
                if (!b) continue;
                _b(a, b, p, m, r);
                if (c && b.l) i["!links"].push([l, b.l])
            }
        }
        var g = f.CodeName || f.name || n;
        if (c) ub(a, 574, ff((s.Views || [])[0]));
        if (c && (i["!merges"] || []).length) ub(a, 229, Xf(i["!merges"]));
        if (c) yb(a, i);
        ub(a, 442, vs(g, r));
        if (c) Tb(a, i);
        ub(a, 10);
        return a.end()
    }

    function xb(e, r, t) {
        var a = wa();
        var n = (e || {}).Workbook || {};
        var i = n.Sheets || [];
        var s = n.WBProps || {};
        var f = t.biff == 8,
            o = t.biff == 5;
        ub(a, 2057, Vs(e, 5, t));
        if (t.bookType == "xla") ub(a, 135);
        ub(a, 225, f ? ns(1200) : null);
        ub(a, 193, Qi(2));
        if (o) ub(a, 191);
        if (o) ub(a, 192);
        ub(a, 226);
        ub(a, 92, Xs("SheetJS", t));
        ub(a, 66, ns(f ? 1200 : 1252));
        if (f) ub(a, 353, ns(0));
        if (f) ub(a, 448);
        ub(a, 317, lo(e.SheetNames.length));
        if (f && e.vbaraw) ub(a, 211);
        if (f && e.vbaraw) {
            var c = s.CodeName || "ThisWorkbook";
            ub(a, 442, vs(c, t))
        }
        ub(a, 156, ns(17));
        ub(a, 25, ts(false));
        ub(a, 18, ts(false));
        ub(a, 19, ns(0));
        if (f) ub(a, 431, ts(false));
        if (f) ub(a, 444, ns(0));
        ub(a, 61, nf(t));
        ub(a, 64, ts(false));
        ub(a, 141, ns(0));
        ub(a, 34, ts(Kp(e) == "true"));
        ub(a, 14, ts(true));
        if (f) ub(a, 439, ts(false));
        ub(a, 218, ns(0));
        wb(a, e, t);
        kb(a, e.SSF, t);
        Eb(a, t);
        if (f) ub(a, 352, ts(false));
        var l = a.end();
        var u = wa();
        if (f) ub(u, 140, to());
        if (f && t.Strings) hb(u, 252, qs(t.Strings, t));
        ub(u, 10);
        var h = u.end();
        var d = wa();
        var v = 0,
            p = 0;
        for (p = 0; p < e.SheetNames.length; ++p) v += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[p].length;
        var m = l.length + v + h.length;
        for (p = 0; p < e.SheetNames.length; ++p) {
            var b = i[p] || {};
            ub(d, 133, Ks({
                pos: m,
                hs: b.Hidden || 0,
                dt: 0,
                name: e.SheetNames[p]
            }, t));
            m += r[p].length
        }
        var g = d.end();
        if (v != g.length) throw new Error("BS8 " + v + " != " + g.length);
        var w = [];
        if (l.length) w.push(l);
        if (g.length) w.push(g);
        if (h.length) w.push(h);
        return I(w)
    }

    function Cb(e, r) {
        var t = r || {};
        var a = [];
        if (e && !e.SSF) {
            e.SSF = Tr(Y)
        }
        if (e && e.SSF) {
            Ve();
            ze(e.SSF);
            t.revssf = fr(e.SSF);
            t.revssf[e.SSF[65535]] = 0;
            t.ssf = e.SSF
        }
        t.Strings = [];
        t.Strings.Count = 0;
        t.Strings.Unique = 0;
        Lg(t);
        t.cellXfs = [];
        Md(t.cellXfs, {}, {
            revssf: {
                General: 0
            }
        });
        if (!e.Props) e.Props = {};
        for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = Ab(n, t, e);
        a.unshift(xb(e, a, t));
        return I(a)
    }

    function Rb(e, r) {
        for (var t = 0; t <= e.SheetNames.length; ++t) {
            var a = e.Sheets[e.SheetNames[t]];
            if (!a || !a["!ref"]) continue;
            var n = La(a["!ref"]);
            if (n.e.c > 255) {
                if (typeof console != "undefined" && console.error) console.error("Worksheet '" + e.SheetNames[t] + "' extends beyond column IV (255).  Data may be lost.")
            }
        }
        var i = r || {};
        switch (i.biff || 2) {
            case 8:
                ;
            case 5:
                return Cb(e, r);
            case 4:
                ;
            case 3:
                ;
            case 2:
                return gb(e, r);
        }
        throw new Error("invalid type " + i.bookType + " for BIFF")
    }

    function Ob(e, r) {
        var t = r || {};
        if (b != null && t.dense == null) t.dense = b;
        var a = t.dense ? [] : {};
        e = e.replace(/<!--.*?-->/g, "");
        var n = e.match(/<table/i);
        if (!n) throw new Error("Invalid HTML: could not find <table>");
        var i = e.match(/<\/table/i);
        var s = n.index,
            f = i && i.index || e.length;
        var o = Cr(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>");
        var c = -1,
            l = 0,
            u = 0,
            h = 0;
        var d = {
            s: {
                r: 1e7,
                c: 1e7
            },
            e: {
                r: 0,
                c: 0
            }
        };
        var v = [];
        for (s = 0; s < o.length; ++s) {
            var p = o[s].trim();
            var m = p.slice(0, 3).toLowerCase();
            if (m == "<tr") {
                ++c;
                if (t.sheetRows && t.sheetRows <= c) {
                    --c;
                    break
                }
                l = 0;
                continue
            }
            if (m != "<td" && m != "<th") continue;
            var g = p.split(/<\/t[dh]>/i);
            for (f = 0; f < g.length; ++f) {
                var w = g[f].trim();
                if (!w.match(/<t[dh]/i)) continue;
                var k = w,
                    T = 0;
                while (k.charAt(0) == "<" && (T = k.indexOf(">")) > -1) k = k.slice(T + 1);
                for (var E = 0; E < v.length; ++E) {
                    var y = v[E];
                    if (y.s.c == l && y.s.r < c && c <= y.e.r) {
                        l = y.e.c + 1;
                        E = -1
                    }
                }
                var S = Kr(w.slice(0, w.indexOf(">")));
                h = S.colspan ? +S.colspan : 1;
                if ((u = +S.rowspan) > 1 || h > 1) v.push({
                    s: {
                        r: c,
                        c: l
                    },
                    e: {
                        r: c + (u || 1) - 1,
                        c: l + h - 1
                    }
                });
                var _ = S.t || S["data-t"] || "";
                if (!k.length) {
                    l += h;
                    continue
                }
                k = bt(k);
                if (d.s.r > c) d.s.r = c;
                if (d.e.r < c) d.e.r = c;
                if (d.s.c > l) d.s.c = l;
                if (d.e.c < l) d.e.c = l;
                if (!k.length) {
                    l += h;
                    continue
                }
                var A = {
                    t: "s",
                    v: k
                };
                if (t.raw || !k.trim().length || _ == "s") {} else if (k === "TRUE") A = {
                    t: "b",
                    v: true
                };
                else if (k === "FALSE") A = {
                    t: "b",
                    v: false
                };
                else if (!isNaN(yr(k))) A = {
                    t: "n",
                    v: yr(k)
                };
                else if (!isNaN(xr(k).getDate())) {
                    A = {
                        t: "d",
                        v: wr(k)
                    };
                    if (!t.cellDates) A = {
                        t: "n",
                        v: lr(A.v)
                    };
                    A.z = t.dateNF || Y[14]
                }
                if (t.dense) {
                    if (!a[c]) a[c] = [];
                    a[c][l] = A
                } else a[Pa({
                    r: c,
                    c: l
                })] = A;
                l += h
            }
        }
        a["!ref"] = Ma(d);
        if (v.length) a["!merges"] = v;
        return a
    }

    function Ib(e, r, t, a) {
        var n = e["!merges"] || [];
        var i = [];
        for (var s = r.s.c; s <= r.e.c; ++s) {
            var f = 0,
                o = 0;
            for (var c = 0; c < n.length; ++c) {
                if (n[c].s.r > t || n[c].s.c > s) continue;
                if (n[c].e.r < t || n[c].e.c < s) continue;
                if (n[c].s.r < t || n[c].s.c < s) {
                    f = -1;
                    break
                }
                f = n[c].e.r - n[c].s.r + 1;
                o = n[c].e.c - n[c].s.c + 1;
                break
            }
            if (f < 0) continue;
            var l = Pa({
                r: t,
                c: s
            });
            var u = a.dense ? (e[t] || [])[s] : e[l];
            var h = u && u.v != null && (u.h || it(u.w || (Wa(u), u.w) || "")) || "";
            var d = {};
            if (f > 1) d.rowspan = f;
            if (o > 1) d.colspan = o;
            if (a.editable) h = '<span contenteditable="true">' + h + "</span>";
            else if (u) {
                d["data-t"] = u && u.t || "z";
                if (u.v != null) d["data-v"] = u.v;
                if (u.z != null) d["data-z"] = u.z;
                if (u.l && (u.l.Target || "#").charAt(0) != "#") h = '<a href="' + u.l.Target + '">' + h + "</a>"
            }
            d.id = (a.id || "sjs") + "-" + l;
            i.push(_t("td", h, d))
        }
        var v = "<tr>";
        return v + i.join("") + "</tr>"
    }
    var Nb = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
    var Fb = "</body></html>";

    function Db(e, r) {
        var t = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
        if (!t || t.length == 0) throw new Error("Invalid HTML: could not find <table>");
        if (t.length == 1) return Ha(Ob(t[0], r), r);
        var a = xw();
        t.forEach(function (e, t) {
            Cw(a, Ob(e, r), "Sheet" + (t + 1))
        });
        return a
    }

    function Pb(e, r, t) {
        var a = [];
        return a.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">"
    }

    function Lb(e, r) {
        var t = r || {};
        var a = t.header != null ? t.header : Nb;
        var n = t.footer != null ? t.footer : Fb;
        var i = [a];
        var s = La(e["!ref"]);
        t.dense = Array.isArray(e);
        i.push(Pb(e, s, t));
        for (var f = s.s.r; f <= s.e.r; ++f) i.push(Ib(e, s, f, t));
        i.push("</table>" + n);
        return i.join("")
    }

    function Mb(e, r, t) {
        var a = t || {};
        if (b != null) a.dense = b;
        var n = 0,
            i = 0;
        if (a.origin != null) {
            if (typeof a.origin == "number") n = a.origin;
            else {
                var s = typeof a.origin == "string" ? Da(a.origin) : a.origin;
                n = s.r;
                i = s.c
            }
        }
        var f = r.getElementsByTagName("tr");
        var o = Math.min(a.sheetRows || 1e7, f.length);
        var c = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: n,
                c: i
            }
        };
        if (e["!ref"]) {
            var l = La(e["!ref"]);
            c.s.r = Math.min(c.s.r, l.s.r);
            c.s.c = Math.min(c.s.c, l.s.c);
            c.e.r = Math.max(c.e.r, l.e.r);
            c.e.c = Math.max(c.e.c, l.e.c);
            if (n == -1) c.e.r = n = l.e.r + 1
        }
        var u = [],
            h = 0;
        var d = e["!rows"] || (e["!rows"] = []);
        var v = 0,
            p = 0,
            m = 0,
            g = 0,
            w = 0,
            k = 0;
        if (!e["!cols"]) e["!cols"] = [];
        for (; v < f.length && p < o; ++v) {
            var T = f[v];
            if (Wb(T)) {
                if (a.display) continue;
                d[p] = {
                    hidden: true
                }
            }
            var E = T.children;
            for (m = g = 0; m < E.length; ++m) {
                var y = E[m];
                if (a.display && Wb(y)) continue;
                var S = y.hasAttribute("data-v") ? y.getAttribute("data-v") : y.hasAttribute("v") ? y.getAttribute("v") : bt(y.innerHTML);
                var _ = y.getAttribute("data-z") || y.getAttribute("z");
                for (h = 0; h < u.length; ++h) {
                    var A = u[h];
                    if (A.s.c == g + i && A.s.r < p + n && p + n <= A.e.r) {
                        g = A.e.c + 1 - i;
                        h = -1
                    }
                }
                k = +y.getAttribute("colspan") || 1;
                if ((w = +y.getAttribute("rowspan") || 1) > 1 || k > 1) u.push({
                    s: {
                        r: p + n,
                        c: g + i
                    },
                    e: {
                        r: p + n + (w || 1) - 1,
                        c: g + i + (k || 1) - 1
                    }
                });
                var x = {
                    t: "s",
                    v: S
                };
                var C = y.getAttribute("data-t") || y.getAttribute("t") || "";
                if (S != null) {
                    if (S.length == 0) x.t = C || "z";
                    else if (a.raw || S.trim().length == 0 || C == "s") {} else if (S === "TRUE") x = {
                        t: "b",
                        v: true
                    };
                    else if (S === "FALSE") x = {
                        t: "b",
                        v: false
                    };
                    else if (!isNaN(yr(S))) x = {
                        t: "n",
                        v: yr(S)
                    };
                    else if (!isNaN(xr(S).getDate())) {
                        x = {
                            t: "d",
                            v: wr(S)
                        };
                        if (!a.cellDates) x = {
                            t: "n",
                            v: lr(x.v)
                        };
                        x.z = a.dateNF || Y[14]
                    }
                }
                if (x.z === undefined && _ != null) x.z = _;
                var R = "",
                    O = y.getElementsByTagName("A");
                if (O && O.length)
                    for (var I = 0; I < O.length; ++I)
                        if (O[I].hasAttribute("href")) {
                            R = O[I].getAttribute("href");
                            if (R.charAt(0) != "#") break
                        } if (R && R.charAt(0) != "#" && R.slice(0, 11).toLowerCase() != "javascript:") x.l = {
                    Target: R
                };
                if (a.dense) {
                    if (!e[p + n]) e[p + n] = [];
                    e[p + n][g + i] = x
                } else e[Pa({
                    c: g + i,
                    r: p + n
                })] = x;
                if (c.e.c < g + i) c.e.c = g + i;
                g += k
            }++p
        }
        if (u.length) e["!merges"] = (e["!merges"] || []).concat(u);
        c.e.r = Math.max(c.e.r, p - 1 + n);
        e["!ref"] = Ma(c);
        if (p >= o) e["!fullref"] = Ma((c.e.r = f.length - v + p - 1 + n, c));
        return e
    }

    function Ub(e, r) {
        var t = r || {};
        var a = t.dense ? [] : {};
        return Mb(a, e, r)
    }

    function Bb(e, r) {
        return Ha(Ub(e, r), r)
    }

    function Wb(e) {
        var r = "";
        var t = Hb(e);
        if (t) r = t(e).getPropertyValue("display");
        if (!r) r = e.style && e.style.display;
        return r === "none"
    }

    function Hb(e) {
        if (e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle === "function") return e.ownerDocument.defaultView.getComputedStyle;
        if (typeof getComputedStyle === "function") return getComputedStyle;
        return null
    }

    function zb(e) {
        var r = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function (e, r) {
            return Array(parseInt(r, 10) + 1).join(" ")
        }).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n");
        var t = Qr(r.replace(/<[^>]*>/g, ""));
        return [t]
    }
    var Vb = {
        day: ["d", "dd"],
        month: ["m", "mm"],
        year: ["y", "yy"],
        hours: ["h", "hh"],
        minutes: ["m", "mm"],
        seconds: ["s", "ss"],
        "am-pm": ["A/P", "AM/PM"],
        "day-of-week": ["ddd", "dddd"],
        era: ["e", "ee"],
        quarter: ["\\Qm", 'm\\"th quarter"']
    };

    function Gb(e, r) {
        var t = r || {};
        if (b != null && t.dense == null) t.dense = b;
        var a = Ct(e);
        var n = [],
            i;
        var s;
        var f = {
                name: ""
            },
            o = "",
            c = 0;
        var l;
        var u;
        var h = {},
            d = [];
        var v = t.dense ? [] : {};
        var p, m;
        var g = {
            value: ""
        };
        var w = "",
            k = 0,
            T;
        var E = [];
        var y = -1,
            S = -1,
            _ = {
                s: {
                    r: 1e6,
                    c: 1e7
                },
                e: {
                    r: 0,
                    c: 0
                }
            };
        var A = 0;
        var x = {};
        var C = [],
            R = {},
            O = 0,
            I = 0;
        var N = [],
            F = 1,
            D = 1;
        var P = [];
        var L = {
            Names: []
        };
        var M = {};
        var U = ["", ""];
        var B = [],
            W = {};
        var H = "",
            z = 0;
        var V = false,
            G = false;
        var j = 0;
        Rt.lastIndex = 0;
        a = a.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
        while (p = Rt.exec(a)) switch (p[3] = p[3].replace(/_.*$/, "")) {
            case "table":
                ;
            case "工作表":
                if (p[1] === "/") {
                    if (_.e.c >= _.s.c && _.e.r >= _.s.r) v["!ref"] = Ma(_);
                    else v["!ref"] = "A1:A1";
                    if (t.sheetRows > 0 && t.sheetRows <= _.e.r) {
                        v["!fullref"] = v["!ref"];
                        _.e.r = t.sheetRows - 1;
                        v["!ref"] = Ma(_)
                    }
                    if (C.length) v["!merges"] = C;
                    if (N.length) v["!rows"] = N;
                    l.name = l["名称"] || l.name;
                    if (typeof JSON !== "undefined") JSON.stringify(l);
                    d.push(l.name);
                    h[l.name] = v;
                    G = false
                } else if (p[0].charAt(p[0].length - 2) !== "/") {
                    l = Kr(p[0], false);
                    y = S = -1;
                    _.s.r = _.s.c = 1e7;
                    _.e.r = _.e.c = 0;
                    v = t.dense ? [] : {};
                    C = [];
                    N = [];
                    G = true
                }
                break;
            case "table-row-group":
                if (p[1] === "/") --A;
                else ++A;
                break;
            case "table-row":
                ;
            case "行":
                if (p[1] === "/") {
                    y += F;
                    F = 1;
                    break
                }
                u = Kr(p[0], false);
                if (u["行号"]) y = u["行号"] - 1;
                else if (y == -1) y = 0;
                F = +u["number-rows-repeated"] || 1;
                if (F < 10)
                    for (j = 0; j < F; ++j)
                        if (A > 0) N[y + j] = {
                            level: A
                        };
                S = -1;
                break;
            case "covered-table-cell":
                if (p[1] !== "/") ++S;
                if (t.sheetStubs) {
                    if (t.dense) {
                        if (!v[y]) v[y] = [];
                        v[y][S] = {
                            t: "z"
                        }
                    } else v[Pa({
                        r: y,
                        c: S
                    })] = {
                        t: "z"
                    }
                }
                w = "";
                E = [];
                break;
            case "table-cell":
                ;
            case "数据":
                if (p[0].charAt(p[0].length - 2) === "/") {
                    ++S;
                    g = Kr(p[0], false);
                    D = parseInt(g["number-columns-repeated"] || "1", 10);
                    m = {
                        t: "z",
                        v: null
                    };
                    if (g.formula && t.cellFormula != false) m.f = xd(Qr(g.formula));
                    if ((g["数据类型"] || g["value-type"]) == "string") {
                        m.t = "s";
                        m.v = Qr(g["string-value"] || "");
                        if (t.dense) {
                            if (!v[y]) v[y] = [];
                            v[y][S] = m
                        } else {
                            v[Pa({
                                r: y,
                                c: S
                            })] = m
                        }
                    }
                    S += D - 1
                } else if (p[1] !== "/") {
                    ++S;
                    w = "";
                    k = 0;
                    E = [];
                    D = 1;
                    var X = F ? y + F - 1 : y;
                    if (S > _.e.c) _.e.c = S;
                    if (S < _.s.c) _.s.c = S;
                    if (y < _.s.r) _.s.r = y;
                    if (X > _.e.r) _.e.r = X;
                    g = Kr(p[0], false);
                    B = [];
                    W = {};
                    m = {
                        t: g["数据类型"] || g["value-type"],
                        v: null
                    };
                    if (t.cellFormula) {
                        if (g.formula) g.formula = Qr(g.formula);
                        if (g["number-matrix-columns-spanned"] && g["number-matrix-rows-spanned"]) {
                            O = parseInt(g["number-matrix-rows-spanned"], 10) || 0;
                            I = parseInt(g["number-matrix-columns-spanned"], 10) || 0;
                            R = {
                                s: {
                                    r: y,
                                    c: S
                                },
                                e: {
                                    r: y + O - 1,
                                    c: S + I - 1
                                }
                            };
                            m.F = Ma(R);
                            P.push([R, m.F])
                        }
                        if (g.formula) m.f = xd(g.formula);
                        else
                            for (j = 0; j < P.length; ++j)
                                if (y >= P[j][0].s.r && y <= P[j][0].e.r)
                                    if (S >= P[j][0].s.c && S <= P[j][0].e.c) m.F = P[j][1]
                    }
                    if (g["number-columns-spanned"] || g["number-rows-spanned"]) {
                        O = parseInt(g["number-rows-spanned"], 10) || 0;
                        I = parseInt(g["number-columns-spanned"], 10) || 0;
                        R = {
                            s: {
                                r: y,
                                c: S
                            },
                            e: {
                                r: y + O - 1,
                                c: S + I - 1
                            }
                        };
                        C.push(R)
                    }
                    if (g["number-columns-repeated"]) D = parseInt(g["number-columns-repeated"], 10);
                    switch (m.t) {
                        case "boolean":
                            m.t = "b";
                            m.v = ct(g["boolean-value"]);
                            break;
                        case "float":
                            m.t = "n";
                            m.v = parseFloat(g.value);
                            break;
                        case "percentage":
                            m.t = "n";
                            m.v = parseFloat(g.value);
                            break;
                        case "currency":
                            m.t = "n";
                            m.v = parseFloat(g.value);
                            break;
                        case "date":
                            m.t = "d";
                            m.v = wr(g["date-value"]);
                            if (!t.cellDates) {
                                m.t = "n";
                                m.v = lr(m.v)
                            }
                            m.z = "m/d/yy";
                            break;
                        case "time":
                            m.t = "n";
                            m.v = pr(g["time-value"]) / 86400;
                            if (t.cellDates) {
                                m.t = "d";
                                m.v = vr(m.v)
                            }
                            m.z = "HH:MM:SS";
                            break;
                        case "number":
                            m.t = "n";
                            m.v = parseFloat(g["数据数值"]);
                            break;
                        default:
                            if (m.t === "string" || m.t === "text" || !m.t) {
                                m.t = "s";
                                if (g["string-value"] != null) {
                                    w = Qr(g["string-value"]);
                                    E = []
                                }
                            } else throw new Error("Unsupported value type " + m.t);
                    }
                } else {
                    V = false;
                    if (m.t === "s") {
                        m.v = w || "";
                        if (E.length) m.R = E;
                        V = k == 0
                    }
                    if (M.Target) m.l = M;
                    if (B.length > 0) {
                        m.c = B;
                        B = []
                    }
                    if (w && t.cellText !== false) m.w = w;
                    if (V) {
                        m.t = "z";
                        delete m.v
                    }
                    if (!V || t.sheetStubs) {
                        if (!(t.sheetRows && t.sheetRows <= y)) {
                            for (var $ = 0; $ < F; ++$) {
                                D = parseInt(g["number-columns-repeated"] || "1", 10);
                                if (t.dense) {
                                    if (!v[y + $]) v[y + $] = [];
                                    v[y + $][S] = $ == 0 ? m : Tr(m);
                                    while (--D > 0) v[y + $][S + D] = Tr(m)
                                } else {
                                    v[Pa({
                                        r: y + $,
                                        c: S
                                    })] = m;
                                    while (--D > 0) v[Pa({
                                        r: y + $,
                                        c: S + D
                                    })] = Tr(m)
                                }
                                if (_.e.c <= S) _.e.c = S
                            }
                        }
                    }
                    D = parseInt(g["number-columns-repeated"] || "1", 10);
                    S += D - 1;
                    D = 0;
                    m = {};
                    w = "";
                    E = []
                }
                M = {};
                break;
            case "document":
                ;
            case "document-content":
                ;
            case "电子表格文档":
                ;
            case "spreadsheet":
                ;
            case "主体":
                ;
            case "scripts":
                ;
            case "styles":
                ;
            case "font-face-decls":
                ;
            case "master-styles":
                if (p[1] === "/") {
                    if ((i = n.pop())[0] !== p[3]) throw "Bad state: " + i
                } else if (p[0].charAt(p[0].length - 2) !== "/") n.push([p[3], true]);
                break;
            case "annotation":
                if (p[1] === "/") {
                    if ((i = n.pop())[0] !== p[3]) throw "Bad state: " + i;
                    W.t = w;
                    if (E.length) W.R = E;
                    W.a = H;
                    B.push(W)
                } else if (p[0].charAt(p[0].length - 2) !== "/") {
                    n.push([p[3], false])
                }
                H = "";
                z = 0;
                w = "";
                k = 0;
                E = [];
                break;
            case "creator":
                if (p[1] === "/") {
                    H = a.slice(z, p.index)
                } else z = p.index + p[0].length;
                break;
            case "meta":
                ;
            case "元数据":
                ;
            case "settings":
                ;
            case "config-item-set":
                ;
            case "config-item-map-indexed":
                ;
            case "config-item-map-entry":
                ;
            case "config-item-map-named":
                ;
            case "shapes":
                ;
            case "frame":
                ;
            case "text-box":
                ;
            case "image":
                ;
            case "data-pilot-tables":
                ;
            case "list-style":
                ;
            case "form":
                ;
            case "dde-links":
                ;
            case "event-listeners":
                ;
            case "chart":
                if (p[1] === "/") {
                    if ((i = n.pop())[0] !== p[3]) throw "Bad state: " + i
                } else if (p[0].charAt(p[0].length - 2) !== "/") n.push([p[3], false]);
                w = "";
                k = 0;
                E = [];
                break;
            case "scientific-number":
                break;
            case "currency-symbol":
                break;
            case "currency-style":
                break;
            case "number-style":
                ;
            case "percentage-style":
                ;
            case "date-style":
                ;
            case "time-style":
                if (p[1] === "/") {
                    x[f.name] = o;
                    if ((i = n.pop())[0] !== p[3]) throw "Bad state: " + i
                } else if (p[0].charAt(p[0].length - 2) !== "/") {
                    o = "";
                    f = Kr(p[0], false);
                    n.push([p[3], true])
                }
                break;
            case "script":
                break;
            case "libraries":
                break;
            case "automatic-styles":
                break;
            case "default-style":
                ;
            case "page-layout":
                break;
            case "style":
                break;
            case "map":
                break;
            case "font-face":
                break;
            case "paragraph-properties":
                break;
            case "table-properties":
                break;
            case "table-column-properties":
                break;
            case "table-row-properties":
                break;
            case "table-cell-properties":
                break;
            case "number":
                switch (n[n.length - 1][0]) {
                    case "time-style":
                        ;
                    case "date-style":
                        s = Kr(p[0], false);
                        o += Vb[p[3]][s.style === "long" ? 1 : 0];
                        break;
                }
                break;
            case "fraction":
                break;
            case "day":
                ;
            case "month":
                ;
            case "year":
                ;
            case "era":
                ;
            case "day-of-week":
                ;
            case "week-of-year":
                ;
            case "quarter":
                ;
            case "hours":
                ;
            case "minutes":
                ;
            case "seconds":
                ;
            case "am-pm":
                switch (n[n.length - 1][0]) {
                    case "time-style":
                        ;
                    case "date-style":
                        s = Kr(p[0], false);
                        o += Vb[p[3]][s.style === "long" ? 1 : 0];
                        break;
                }
                break;
            case "boolean-style":
                break;
            case "boolean":
                break;
            case "text-style":
                break;
            case "text":
                if (p[0].slice(-2) === "/>") break;
                else if (p[1] === "/") switch (n[n.length - 1][0]) {
                    case "number-style":
                        ;
                    case "date-style":
                        ;
                    case "time-style":
                        o += a.slice(c, p.index);
                        break;
                } else c = p.index + p[0].length;
                break;
            case "named-range":
                s = Kr(p[0], false);
                U = Rd(s["cell-range-address"]);
                var Y = {
                    Name: s.name,
                    Ref: U[0] + "!" + U[1]
                };
                if (G) Y.Sheet = d.length;
                L.Names.push(Y);
                break;
            case "text-content":
                break;
            case "text-properties":
                break;
            case "embedded-text":
                break;
            case "body":
                ;
            case "电子表格":
                break;
            case "forms":
                break;
            case "table-column":
                break;
            case "table-header-rows":
                break;
            case "table-rows":
                break;
            case "table-column-group":
                break;
            case "table-header-columns":
                break;
            case "table-columns":
                break;
            case "null-date":
                break;
            case "graphic-properties":
                break;
            case "calculation-settings":
                break;
            case "named-expressions":
                break;
            case "label-range":
                break;
            case "label-ranges":
                break;
            case "named-expression":
                break;
            case "sort":
                break;
            case "sort-by":
                break;
            case "sort-groups":
                break;
            case "tab":
                break;
            case "line-break":
                break;
            case "span":
                break;
            case "p":
                ;
            case "文本串":
                if (["master-styles"].indexOf(n[n.length - 1][0]) > -1) break;
                if (p[1] === "/" && (!g || !g["string-value"])) {
                    var K = zb(a.slice(k, p.index), T);
                    w = (w.length > 0 ? w + "\n" : "") + K[0]
                } else {
                    T = Kr(p[0], false);
                    k = p.index + p[0].length
                }
                break;
            case "s":
                break;
            case "database-range":
                if (p[1] === "/") break;
                try {
                    U = Rd(Kr(p[0])["target-range-address"]);
                    h[U[0]]["!autofilter"] = {
                        ref: U[1]
                    }
                } catch (J) {}
                break;
            case "date":
                break;
            case "object":
                break;
            case "title":
                ;
            case "标题":
                break;
            case "desc":
                break;
            case "binary-data":
                break;
            case "table-source":
                break;
            case "scenario":
                break;
            case "iteration":
                break;
            case "content-validations":
                break;
            case "content-validation":
                break;
            case "help-message":
                break;
            case "error-message":
                break;
            case "database-ranges":
                break;
            case "filter":
                break;
            case "filter-and":
                break;
            case "filter-or":
                break;
            case "filter-condition":
                break;
            case "list-level-style-bullet":
                break;
            case "list-level-style-number":
                break;
            case "list-level-properties":
                break;
            case "sender-firstname":
                ;
            case "sender-lastname":
                ;
            case "sender-initials":
                ;
            case "sender-title":
                ;
            case "sender-position":
                ;
            case "sender-email":
                ;
            case "sender-phone-private":
                ;
            case "sender-fax":
                ;
            case "sender-company":
                ;
            case "sender-phone-work":
                ;
            case "sender-street":
                ;
            case "sender-city":
                ;
            case "sender-postal-code":
                ;
            case "sender-country":
                ;
            case "sender-state-or-province":
                ;
            case "author-name":
                ;
            case "author-initials":
                ;
            case "chapter":
                ;
            case "file-name":
                ;
            case "template-name":
                ;
            case "sheet-name":
                break;
            case "event-listener":
                break;
            case "initial-creator":
                ;
            case "creation-date":
                ;
            case "print-date":
                ;
            case "generator":
                ;
            case "document-statistic":
                ;
            case "user-defined":
                ;
            case "editing-duration":
                ;
            case "editing-cycles":
                break;
            case "config-item":
                break;
            case "page-number":
                break;
            case "page-count":
                break;
            case "time":
                break;
            case "cell-range-source":
                break;
            case "detective":
                break;
            case "operation":
                break;
            case "highlighted-range":
                break;
            case "data-pilot-table":
                ;
            case "source-cell-range":
                ;
            case "source-service":
                ;
            case "data-pilot-field":
                ;
            case "data-pilot-level":
                ;
            case "data-pilot-subtotals":
                ;
            case "data-pilot-subtotal":
                ;
            case "data-pilot-members":
                ;
            case "data-pilot-member":
                ;
            case "data-pilot-display-info":
                ;
            case "data-pilot-sort-info":
                ;
            case "data-pilot-layout-info":
                ;
            case "data-pilot-field-reference":
                ;
            case "data-pilot-groups":
                ;
            case "data-pilot-group":
                ;
            case "data-pilot-group-member":
                break;
            case "rect":
                break;
            case "dde-connection-decls":
                ;
            case "dde-connection-decl":
                ;
            case "dde-link":
                ;
            case "dde-source":
                break;
            case "properties":
                break;
            case "property":
                break;
            case "a":
                if (p[1] !== "/") {
                    M = Kr(p[0], false);
                    if (!M.href) break;
                    M.Target = Qr(M.href);
                    delete M.href;
                    if (M.Target.charAt(0) == "#" && M.Target.indexOf(".") > -1) {
                        U = Rd(M.Target.slice(1));
                        M.Target = "#" + U[0] + "!" + U[1]
                    } else if (M.Target.match(/^\.\.[\\\/]/)) M.Target = M.Target.slice(3)
                }
                break;
            case "table-protection":
                break;
            case "data-pilot-grand-total":
                break;
            case "office-document-common-attrs":
                break;
            default:
                switch (p[2]) {
                    case "dc:":
                        ;
                    case "calcext:":
                        ;
                    case "loext:":
                        ;
                    case "ooo:":
                        ;
                    case "chartooo:":
                        ;
                    case "draw:":
                        ;
                    case "style:":
                        ;
                    case "chart:":
                        ;
                    case "form:":
                        ;
                    case "uof:":
                        ;
                    case "表:":
                        ;
                    case "字:":
                        break;
                    default:
                        if (t.WTF) throw new Error(p);
                };
        }
        var q = {
            Sheets: h,
            SheetNames: d,
            Workbook: L
        };
        if (t.bookSheets) delete q.Sheets;
        return q
    }

    function jb(e, r) {
        r = r || {};
        if (Nr(e, "META-INF/manifest.xml")) si(Dr(e, "META-INF/manifest.xml"), r);
        var t = Pr(e, "content.xml");
        if (!t) throw new Error("Missing content.xml in ODS / UOF file");
        var a = Gb(vt(t), r);
        if (Nr(e, "meta.xml")) a.Props = vi(Dr(e, "meta.xml"));
        return a
    }

    function Xb(e, r) {
        return Gb(e, r)
    }
    var $b = function () {
        var e = ["<office:master-styles>", '<style:master-page style:name="mp1" style:page-layout-name="mp1">', "<style:header/>", '<style:header-left style:display="false"/>', "<style:footer/>", '<style:footer-left style:display="false"/>', "</style:master-page>", "</office:master-styles>"].join("");
        var r = "<office:document-styles " + St({
            "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
            "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
            "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
            "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
            "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:dc": "http://purl.org/dc/elements/1.1/",
            "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
            "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
            "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
            "office:version": "1.2"
        }) + ">" + e + "</office:document-styles>";
        return function t() {
            return zr + r
        }
    }();
    var Yb = function () {
        var e = function (e) {
            return tt(e).replace(/  +/g, function (e) {
                return '<text:s text:c="' + e.length + '"/>'
            }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
        };
        var r = "          <table:table-cell />\n";
        var t = "          <table:covered-table-cell/>\n";
        var a = function (a, n, i) {
            var s = [];
            s.push('      <table:table table:name="' + tt(n.SheetNames[i]) + '" table:style-name="ta1">\n');
            var f = 0,
                o = 0,
                c = La(a["!ref"] || "A1");
            var l = a["!merges"] || [],
                u = 0;
            var h = Array.isArray(a);
            if (a["!cols"]) {
                for (o = 0; o <= c.e.c; ++o) s.push("        <table:table-column" + (a["!cols"][o] ? ' table:style-name="co' + a["!cols"][o].ods + '"' : "") + "></table:table-column>\n")
            }
            var d = "",
                v = a["!rows"] || [];
            for (f = 0; f < c.s.r; ++f) {
                d = v[f] ? ' table:style-name="ro' + v[f].ods + '"' : "";
                s.push("        <table:table-row" + d + "></table:table-row>\n")
            }
            for (; f <= c.e.r; ++f) {
                d = v[f] ? ' table:style-name="ro' + v[f].ods + '"' : "";
                s.push("        <table:table-row" + d + ">\n");
                for (o = 0; o < c.s.c; ++o) s.push(r);
                for (; o <= c.e.c; ++o) {
                    var p = false,
                        m = {},
                        b = "";
                    for (u = 0; u != l.length; ++u) {
                        if (l[u].s.c > o) continue;
                        if (l[u].s.r > f) continue;
                        if (l[u].e.c < o) continue;
                        if (l[u].e.r < f) continue;
                        if (l[u].s.c != o || l[u].s.r != f) p = true;
                        m["table:number-columns-spanned"] = l[u].e.c - l[u].s.c + 1;
                        m["table:number-rows-spanned"] = l[u].e.r - l[u].s.r + 1;
                        break
                    }
                    if (p) {
                        s.push(t);
                        continue
                    }
                    var g = Pa({
                            r: f,
                            c: o
                        }),
                        w = h ? (a[f] || [])[o] : a[g];
                    if (w && w.f) {
                        m["table:formula"] = tt(Cd(w.f));
                        if (w.F) {
                            if (w.F.slice(0, g.length) == g) {
                                var k = La(w.F);
                                m["table:number-matrix-columns-spanned"] = k.e.c - k.s.c + 1;
                                m["table:number-matrix-rows-spanned"] = k.e.r - k.s.r + 1
                            }
                        }
                    }
                    if (!w) {
                        s.push(r);
                        continue
                    }
                    switch (w.t) {
                        case "b":
                            b = w.v ? "TRUE" : "FALSE";
                            m["office:value-type"] = "boolean";
                            m["office:boolean-value"] = w.v ? "true" : "false";
                            break;
                        case "n":
                            b = w.w || String(w.v || 0);
                            m["office:value-type"] = "float";
                            m["office:value"] = w.v || 0;
                            break;
                        case "s":
                            ;
                        case "str":
                            b = w.v == null ? "" : w.v;
                            m["office:value-type"] = "string";
                            break;
                        case "d":
                            b = w.w || wr(w.v).toISOString();
                            m["office:value-type"] = "date";
                            m["office:date-value"] = wr(w.v).toISOString();
                            m["table:style-name"] = "ce1";
                            break;
                        default:
                            s.push(r);
                            continue;
                    }
                    var T = e(b);
                    if (w.l && w.l.Target) {
                        var E = w.l.Target;
                        E = E.charAt(0) == "#" ? "#" + Od(E.slice(1)) : E;
                        if (E.charAt(0) != "#" && !E.match(/^\w+:/)) E = "../" + E;
                        T = _t("text:a", T, {
                            "xlink:href": E.replace(/&/g, "&amp;")
                        })
                    }
                    s.push("          " + _t("table:table-cell", _t("text:p", T, {}), m) + "\n")
                }
                s.push("        </table:table-row>\n")
            }
            s.push("      </table:table>\n");
            return s.join("")
        };
        var n = function (e, r) {
            e.push(" <office:automatic-styles>\n");
            e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
            e.push('   <number:month number:style="long"/>\n');
            e.push("   <number:text>/</number:text>\n");
            e.push('   <number:day number:style="long"/>\n');
            e.push("   <number:text>/</number:text>\n");
            e.push("   <number:year/>\n");
            e.push("  </number:date-style>\n");
            var t = 0;
            r.SheetNames.map(function (e) {
                return r.Sheets[e]
            }).forEach(function (r) {
                if (!r) return;
                if (r["!cols"]) {
                    for (var a = 0; a < r["!cols"].length; ++a)
                        if (r["!cols"][a]) {
                            var n = r["!cols"][a];
                            if (n.width == null && n.wpx == null && n.wch == null) continue;
                            Dc(n);
                            n.ods = t;
                            var i = r["!cols"][a].wpx + "px";
                            e.push('  <style:style style:name="co' + t + '" style:family="table-column">\n');
                            e.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + i + '"/>\n');
                            e.push("  </style:style>\n");
                            ++t
                        }
                }
            });
            var a = 0;
            r.SheetNames.map(function (e) {
                return r.Sheets[e]
            }).forEach(function (r) {
                if (!r) return;
                if (r["!rows"]) {
                    for (var t = 0; t < r["!rows"].length; ++t)
                        if (r["!rows"][t]) {
                            r["!rows"][t].ods = a;
                            var n = r["!rows"][t].hpx + "px";
                            e.push('  <style:style style:name="ro' + a + '" style:family="table-row">\n');
                            e.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + n + '"/>\n');
                            e.push("  </style:style>\n");
                            ++a
                        }
                }
            });
            e.push('  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">\n');
            e.push('   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>\n');
            e.push("  </style:style>\n");
            e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
            e.push(" </office:automatic-styles>\n")
        };
        return function i(e, r) {
            var t = [zr];
            var i = St({
                "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
                "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
                "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
                "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
                "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
                "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
                "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
                "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
                "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
                "xmlns:math": "http://www.w3.org/1998/Math/MathML",
                "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
                "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
                "xmlns:ooo": "http://openoffice.org/2004/office",
                "xmlns:ooow": "http://openoffice.org/2004/writer",
                "xmlns:oooc": "http://openoffice.org/2004/calc",
                "xmlns:dom": "http://www.w3.org/2001/xml-events",
                "xmlns:xforms": "http://www.w3.org/2002/xforms",
                "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
                "xmlns:rpt": "http://openoffice.org/2005/report",
                "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
                "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
                "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
                "xmlns:tableooo": "http://openoffice.org/2009/table",
                "xmlns:drawooo": "http://openoffice.org/2010/draw",
                "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
                "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
                "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
                "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
                "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
                "office:version": "1.2"
            });
            var s = St({
                "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
                "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
            });
            if (r.bookType == "fods") {
                t.push("<office:document" + i + s + ">\n");
                t.push(ui().replace(/office:document-meta/g, "office:meta"))
            } else t.push("<office:document-content" + i + ">\n");
            n(t, e);
            t.push("  <office:body>\n");
            t.push("    <office:spreadsheet>\n");
            for (var f = 0; f != e.SheetNames.length; ++f) t.push(a(e.Sheets[e.SheetNames[f]], e, f, r));
            t.push("    </office:spreadsheet>\n");
            t.push("  </office:body>\n");
            if (r.bookType == "fods") t.push("</office:document>");
            else t.push("</office:document-content>");
            return t.join("")
        }
    }();

    function Kb(e, r) {
        if (r.bookType == "fods") return Yb(e, r);
        var t = Br();
        var a = "";
        var n = [];
        var i = [];
        a = "mimetype";
        Ur(t, a, "application/vnd.oasis.opendocument.spreadsheet");
        a = "content.xml";
        Ur(t, a, Yb(e, r));
        n.push([a, "text/xml"]);
        i.push([a, "ContentFile"]);
        a = "styles.xml";
        Ur(t, a, $b(e, r));
        n.push([a, "text/xml"]);
        i.push([a, "StylesFile"]);
        a = "meta.xml";
        Ur(t, a, zr + ui());
        n.push([a, "text/xml"]);
        i.push([a, "MetadataFile"]);
        a = "manifest.rdf";
        Ur(t, a, li(i));
        n.push([a, "application/rdf+xml"]);
        a = "META-INF/manifest.xml";
        Ur(t, a, fi(n));
        return t
    }

    function Jb(e) {
        return new DataView(e.buffer, e.byteOffset, e.byteLength)
    }

    function qb(e) {
        return typeof TextDecoder != "undefined" ? (new TextDecoder).decode(e) : vt(C(e))
    }

    function Zb(e) {
        return typeof TextEncoder != "undefined" ? (new TextEncoder).encode(e) : A(pt(e))
    }

    function Qb(e, r) {
        e: for (var t = 0; t <= e.length - r.length; ++t) {
            for (var a = 0; a < r.length; ++a)
                if (e[t + a] != r[a]) continue e;
            return true
        }
        return false
    }

    function eg(e) {
        var r = e.reduce(function (e, r) {
            return e + r.length
        }, 0);
        var t = new Uint8Array(r);
        var a = 0;
        e.forEach(function (e) {
            t.set(e, a);
            a += e.length
        });
        return t
    }

    function rg(e) {
        e -= e >> 1 & 1431655765;
        e = (e & 858993459) + (e >> 2 & 858993459);
        return (e + (e >> 4) & 252645135) * 16843009 >>> 24
    }

    function tg(e, r) {
        var t = (e[r + 15] & 127) << 7 | e[r + 14] >> 1;
        var a = e[r + 14] & 1;
        for (var n = r + 13; n >= r; --n) a = a * 256 + e[n];
        return (e[r + 15] & 128 ? -a : a) * Math.pow(10, t - 6176)
    }

    function ag(e, r, t) {
        var a = Math.floor(t == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(t))) + 6176 - 16;
        var n = t / Math.pow(10, a - 6176);
        e[r + 15] |= a >> 7;
        e[r + 14] |= (a & 127) << 1;
        for (var i = 0; n >= 1; ++i, n /= 256) e[r + i] = n & 255;
        e[r + 15] |= t >= 0 ? 0 : 128
    }

    function ng(e, r) {
        var t = r ? r[0] : 0;
        var a = e[t] & 127;
        e: if (e[t++] >= 128) {
            a |= (e[t] & 127) << 7;
            if (e[t++] < 128) break e;
            a |= (e[t] & 127) << 14;
            if (e[t++] < 128) break e;
            a |= (e[t] & 127) << 21;
            if (e[t++] < 128) break e;
            a += (e[t] & 127) * Math.pow(2, 28);
            ++t;
            if (e[t++] < 128) break e;
            a += (e[t] & 127) * Math.pow(2, 35);
            ++t;
            if (e[t++] < 128) break e;
            a += (e[t] & 127) * Math.pow(2, 42);
            ++t;
            if (e[t++] < 128) break e
        }
        if (r) r[0] = t;
        return a
    }

    function ig(e) {
        var r = new Uint8Array(7);
        r[0] = e & 127;
        var t = 1;
        e: if (e > 127) {
            r[t - 1] |= 128;
            r[t] = e >> 7 & 127;
            ++t;
            if (e <= 16383) break e;
            r[t - 1] |= 128;
            r[t] = e >> 14 & 127;
            ++t;
            if (e <= 2097151) break e;
            r[t - 1] |= 128;
            r[t] = e >> 21 & 127;
            ++t;
            if (e <= 268435455) break e;
            r[t - 1] |= 128;
            r[t] = e / 256 >>> 21 & 127;
            ++t;
            if (e <= 34359738367) break e;
            r[t - 1] |= 128;
            r[t] = e / 65536 >>> 21 & 127;
            ++t;
            if (e <= 4398046511103) break e;
            r[t - 1] |= 128;
            r[t] = e / 16777216 >>> 21 & 127;
            ++t
        }
        return r.slice(0, t)
    }

    function sg(e) {
        var r = 0,
            t = e[r] & 127;
        e: if (e[r++] >= 128) {
            t |= (e[r] & 127) << 7;
            if (e[r++] < 128) break e;
            t |= (e[r] & 127) << 14;
            if (e[r++] < 128) break e;
            t |= (e[r] & 127) << 21;
            if (e[r++] < 128) break e;
            t |= (e[r] & 127) << 28
        }
        return t
    }

    function fg(e) {
        var r = [],
            t = [0];
        while (t[0] < e.length) {
            var a = t[0];
            var n = ng(e, t);
            var i = n & 7;
            n = Math.floor(n / 8);
            var s = 0;
            var f;
            if (n == 0) break;
            switch (i) {
                case 0: {
                    var o = t[0];
                    while (e[t[0]++] >= 128);
                    f = e.slice(o, t[0])
                }
                break;
            case 5:
                s = 4;
                f = e.slice(t[0], t[0] + s);
                t[0] += s;
                break;
            case 1:
                s = 8;
                f = e.slice(t[0], t[0] + s);
                t[0] += s;
                break;
            case 2:
                s = ng(e, t);
                f = e.slice(t[0], t[0] + s);
                t[0] += s;
                break;
            case 3:
                ;
            case 4:
                ;
            default:
                throw new Error("PB Type ".concat(i, " for Field ").concat(n, " at offset ").concat(a));
            }
            var c = {
                data: f,
                type: i
            };
            if (r[n] == null) r[n] = [c];
            else r[n].push(c)
        }
        return r
    }

    function og(e) {
        var r = [];
        e.forEach(function (e, t) {
            if (t == 0) return;
            e.forEach(function (e) {
                if (!e.data) return;
                r.push(ig(t * 8 + e.type));
                if (e.type == 2) r.push(ig(e.data.length));
                r.push(e.data)
            })
        });
        return eg(r)
    }

    function cg(e, r) {
        return (e == null ? void 0 : e.map(function (e) {
            return r(e.data)
        })) || []
    }

    function lg(e) {
        var r;
        var t = [],
            a = [0];
        while (a[0] < e.length) {
            var n = ng(e, a);
            var i = fg(e.slice(a[0], a[0] + n));
            a[0] += n;
            var s = {
                id: sg(i[1][0].data),
                messages: []
            };
            i[2].forEach(function (r) {
                var t = fg(r.data);
                var n = sg(t[3][0].data);
                s.messages.push({
                    meta: t,
                    data: e.slice(a[0], a[0] + n)
                });
                a[0] += n
            });
            if ((r = i[3]) == null ? void 0 : r[0]) s.merge = sg(i[3][0].data) >>> 0 > 0;
            t.push(s)
        }
        return t
    }

    function ug(e) {
        var r = [];
        e.forEach(function (e) {
            var t = [
                [],
                [{
                    data: ig(e.id),
                    type: 0
                }],
                []
            ];
            if (e.merge != null) t[3] = [{
                data: ig(+!!e.merge),
                type: 0
            }];
            var a = [];
            e.messages.forEach(function (e) {
                a.push(e.data);
                e.meta[3] = [{
                    type: 0,
                    data: ig(e.data.length)
                }];
                t[2].push({
                    data: og(e.meta),
                    type: 2
                })
            });
            var n = og(t);
            r.push(ig(n.length));
            r.push(n);
            a.forEach(function (e) {
                return r.push(e)
            })
        });
        return eg(r)
    }

    function hg(e, r) {
        if (e != 0) throw new Error("Unexpected Snappy chunk type ".concat(e));
        var t = [0];
        var a = ng(r, t);
        var n = [];
        while (t[0] < r.length) {
            var i = r[t[0]] & 3;
            if (i == 0) {
                var s = r[t[0]++] >> 2;
                if (s < 60) ++s;
                else {
                    var f = s - 59;
                    s = r[t[0]];
                    if (f > 1) s |= r[t[0] + 1] << 8;
                    if (f > 2) s |= r[t[0] + 2] << 16;
                    if (f > 3) s |= r[t[0] + 3] << 24;
                    s >>>= 0;
                    s++;
                    t[0] += f
                }
                n.push(r.slice(t[0], t[0] + s));
                t[0] += s;
                continue
            } else {
                var o = 0,
                    c = 0;
                if (i == 1) {
                    c = (r[t[0]] >> 2 & 7) + 4;
                    o = (r[t[0]++] & 224) << 3;
                    o |= r[t[0]++]
                } else {
                    c = (r[t[0]++] >> 2) + 1;
                    if (i == 2) {
                        o = r[t[0]] | r[t[0] + 1] << 8;
                        t[0] += 2
                    } else {
                        o = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0;
                        t[0] += 4
                    }
                }
                n = [eg(n)];
                if (o == 0) throw new Error("Invalid offset 0");
                if (o > n[0].length) throw new Error("Invalid offset beyond length");
                if (c >= o) {
                    n.push(n[0].slice(-o));
                    c -= o;
                    while (c >= n[n.length - 1].length) {
                        n.push(n[n.length - 1]);
                        c -= n[n.length - 1].length
                    }
                }
                n.push(n[0].slice(-o, -o + c))
            }
        }
        var l = eg(n);
        if (l.length != a) throw new Error("Unexpected length: ".concat(l.length, " != ").concat(a));
        return l
    }

    function dg(e) {
        var r = [];
        var t = 0;
        while (t < e.length) {
            var a = e[t++];
            var n = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
            t += 3;
            r.push(hg(a, e.slice(t, t + n)));
            t += n
        }
        if (t !== e.length) throw new Error("data is not a valid framed stream!");
        return eg(r)
    }

    function vg(e) {
        var r = [];
        var t = 0;
        while (t < e.length) {
            var a = Math.min(e.length - t, 268435455);
            var n = new Uint8Array(4);
            r.push(n);
            var i = ig(a);
            var s = i.length;
            r.push(i);
            if (a <= 60) {
                s++;
                r.push(new Uint8Array([a - 1 << 2]))
            } else if (a <= 256) {
                s += 2;
                r.push(new Uint8Array([240, a - 1 & 255]))
            } else if (a <= 65536) {
                s += 3;
                r.push(new Uint8Array([244, a - 1 & 255, a - 1 >> 8 & 255]))
            } else if (a <= 16777216) {
                s += 4;
                r.push(new Uint8Array([248, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255]))
            } else if (a <= 4294967296) {
                s += 5;
                r.push(new Uint8Array([252, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255, a - 1 >>> 24 & 255]))
            }
            r.push(e.slice(t, t + a));
            s += a;
            n[0] = 0;
            n[1] = s & 255;
            n[2] = s >> 8 & 255;
            n[3] = s >> 16 & 255;
            t += a
        }
        return eg(r)
    }

    function pg(e, r, t, a) {
        var n = Jb(e);
        var i = n.getUint32(4, true);
        var s = (a > 1 ? 12 : 8) + rg(i & (a > 1 ? 3470 : 398)) * 4;
        var f = -1,
            o = -1,
            c = NaN,
            l = new Date(2001, 0, 1);
        if (i & 512) {
            f = n.getUint32(s, true);
            s += 4
        }
        s += rg(i & (a > 1 ? 12288 : 4096)) * 4;
        if (i & 16) {
            o = n.getUint32(s, true);
            s += 4
        }
        if (i & 32) {
            c = n.getFloat64(s, true);
            s += 8
        }
        if (i & 64) {
            l.setTime(l.getTime() + n.getFloat64(s, true) * 1e3);
            s += 8
        }
        var u;
        switch (e[2]) {
            case 0:
                break;
            case 2:
                u = {
                    t: "n",
                    v: c
                };
                break;
            case 3:
                u = {
                    t: "s",
                    v: r[o]
                };
                break;
            case 5:
                u = {
                    t: "d",
                    v: l
                };
                break;
            case 6:
                u = {
                    t: "b",
                    v: c > 0
                };
                break;
            case 7:
                u = {
                    t: "n",
                    v: c / 86400
                };
                break;
            case 8:
                u = {
                    t: "e",
                    v: 0
                };
                break;
            case 9: {
                if (f > -1) u = {
                    t: "s",
                    v: t[f]
                };
                else throw new Error("Unsupported cell type ".concat(e.slice(0, 4)))
            }
            break;
        default:
            throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
        }
        return u
    }

    function mg(e, r, t) {
        var a = Jb(e);
        var n = a.getUint32(8, true);
        var i = 12;
        var s = -1,
            f = -1,
            o = NaN,
            c = NaN,
            l = new Date(2001, 0, 1);
        if (n & 1) {
            o = tg(e, i);
            i += 16
        }
        if (n & 2) {
            c = a.getFloat64(i, true);
            i += 8
        }
        if (n & 4) {
            l.setTime(l.getTime() + a.getFloat64(i, true) * 1e3);
            i += 8
        }
        if (n & 8) {
            f = a.getUint32(i, true);
            i += 4
        }
        if (n & 16) {
            s = a.getUint32(i, true);
            i += 4
        }
        var u;
        switch (e[1]) {
            case 0:
                break;
            case 2:
                u = {
                    t: "n",
                    v: o
                };
                break;
            case 3:
                u = {
                    t: "s",
                    v: r[f]
                };
                break;
            case 5:
                u = {
                    t: "d",
                    v: l
                };
                break;
            case 6:
                u = {
                    t: "b",
                    v: c > 0
                };
                break;
            case 7:
                u = {
                    t: "n",
                    v: c / 86400
                };
                break;
            case 8:
                u = {
                    t: "e",
                    v: 0
                };
                break;
            case 9: {
                if (s > -1) u = {
                    t: "s",
                    v: t[s]
                };
                else throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)))
            }
            break;
        case 10:
            u = {
                t: "n",
                v: o
            };
            break;
        default:
            throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)));
        }
        return u
    }

    function bg(e, r) {
        var t = new Uint8Array(32),
            a = Jb(t),
            n = 12,
            i = 0;
        t[0] = 5;
        switch (e.t) {
            case "n":
                t[1] = 2;
                ag(t, n, e.v);
                i |= 1;
                n += 16;
                break;
            case "b":
                t[1] = 6;
                a.setFloat64(n, e.v ? 1 : 0, true);
                i |= 2;
                n += 8;
                break;
            case "s":
                if (r.indexOf(e.v) == -1) throw new Error("Value ".concat(e.v, " missing from SST!"));
                t[1] = 3;
                a.setUint32(n, r.indexOf(e.v), true);
                i |= 8;
                n += 4;
                break;
            default:
                throw "unsupported cell type " + e.t;
        }
        a.setUint32(8, i, true);
        return t.slice(0, n)
    }

    function gg(e, r) {
        var t = new Uint8Array(32),
            a = Jb(t),
            n = 12,
            i = 0;
        t[0] = 3;
        switch (e.t) {
            case "n":
                t[2] = 2;
                a.setFloat64(n, e.v, true);
                i |= 32;
                n += 8;
                break;
            case "b":
                t[2] = 6;
                a.setFloat64(n, e.v ? 1 : 0, true);
                i |= 32;
                n += 8;
                break;
            case "s":
                if (r.indexOf(e.v) == -1) throw new Error("Value ".concat(e.v, " missing from SST!"));
                t[2] = 3;
                a.setUint32(n, r.indexOf(e.v), true);
                i |= 16;
                n += 4;
                break;
            default:
                throw "unsupported cell type " + e.t;
        }
        a.setUint32(4, i, true);
        return t.slice(0, n)
    }

    function wg(e, r, t) {
        switch (e[0]) {
            case 0:
                ;
            case 1:
                ;
            case 2:
                ;
            case 3:
                return pg(e, r, t, e[0]);
            case 5:
                return mg(e, r, t);
            default:
                throw new Error("Unsupported payload version ".concat(e[0]));
        }
    }

    function kg(e) {
        var r = fg(e);
        return ng(r[1][0].data)
    }

    function Tg(e) {
        return og([
            [],
            [{
                type: 0,
                data: ig(e)
            }]
        ])
    }

    function Eg(e, r) {
        var t = fg(r.data);
        var a = sg(t[1][0].data);
        var n = t[3];
        var i = [];
        (n || []).forEach(function (r) {
            var t = fg(r.data);
            var n = sg(t[1][0].data) >>> 0;
            switch (a) {
                case 1:
                    i[n] = qb(t[3][0].data);
                    break;
                case 8: {
                    var s = e[kg(t[9][0].data)][0];
                    var f = fg(s.data);
                    var o = e[kg(f[1][0].data)][0];
                    var c = sg(o.meta[1][0].data);
                    if (c != 2001) throw new Error("2000 unexpected reference to ".concat(c));
                    var l = fg(o.data);
                    i[n] = l[3].map(function (e) {
                        return qb(e.data)
                    }).join("")
                }
                break;
            }
        });
        return i
    }

    function yg(e, r) {
        var t, a, n, i, s, f, o, c, l, u, h, d, v, p;
        var m = fg(e);
        var b = sg(m[1][0].data) >>> 0;
        var g = sg(m[2][0].data) >>> 0;
        var w = ((a = (t = m[8]) == null ? void 0 : t[0]) == null ? void 0 : a.data) && sg(m[8][0].data) > 0 || false;
        var k, T;
        if (((i = (n = m[7]) == null ? void 0 : n[0]) == null ? void 0 : i.data) && r != 0) {
            k = (f = (s = m[7]) == null ? void 0 : s[0]) == null ? void 0 : f.data;
            T = (c = (o = m[6]) == null ? void 0 : o[0]) == null ? void 0 : c.data
        } else if (((u = (l = m[4]) == null ? void 0 : l[0]) == null ? void 0 : u.data) && r != 1) {
            k = (d = (h = m[4]) == null ? void 0 : h[0]) == null ? void 0 : d.data;
            T = (p = (v = m[3]) == null ? void 0 : v[0]) == null ? void 0 : p.data
        } else throw "NUMBERS Tile missing ".concat(r, " cell storage");
        var E = w ? 4 : 1;
        var y = Jb(k);
        var S = [];
        for (var _ = 0; _ < k.length / 2; ++_) {
            var A = y.getUint16(_ * 2, true);
            if (A < 65535) S.push([_, A])
        }
        if (S.length != g) throw "Expected ".concat(g, " cells, found ").concat(S.length);
        var x = [];
        for (_ = 0; _ < S.length - 1; ++_) x[S[_][0]] = T.subarray(S[_][1] * E, S[_ + 1][1] * E);
        if (S.length >= 1) x[S[S.length - 1][0]] = T.subarray(S[S.length - 1][1] * E);
        return {
            R: b,
            cells: x
        }
    }

    function Sg(e, r) {
        var t;
        var a = fg(r.data);
        var n = -1;
        if ((t = a == null ? void 0 : a[7]) == null ? void 0 : t[0]) {
            if (sg(a[7][0].data) >>> 0) n = 1;
            else n = 0
        }
        var i = cg(a[5], function (e) {
            return yg(e, n)
        });
        return {
            nrows: sg(a[4][0].data) >>> 0,
            data: i.reduce(function (e, r) {
                if (!e[r.R]) e[r.R] = [];
                r.cells.forEach(function (t, a) {
                    if (e[r.R][a]) throw new Error("Duplicate cell r=".concat(r.R, " c=").concat(a));
                    e[r.R][a] = t
                });
                return e
            }, [])
        }
    }

    function _g(e, r, t) {
        var a, n, i;
        var s = fg(r.data);
        var f = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: 0,
                c: 0
            }
        };
        f.e.r = (sg(s[6][0].data) >>> 0) - 1;
        if (f.e.r < 0) throw new Error("Invalid row varint ".concat(s[6][0].data));
        f.e.c = (sg(s[7][0].data) >>> 0) - 1;
        if (f.e.c < 0) throw new Error("Invalid col varint ".concat(s[7][0].data));
        t["!ref"] = Ma(f);
        var o = fg(s[4][0].data);
        var c = Eg(e, e[kg(o[4][0].data)][0]);
        var l = ((a = o[17]) == null ? void 0 : a[0]) ? Eg(e, e[kg(o[17][0].data)][0]) : [];
        var u = fg(o[3][0].data);
        var h = 0;
        u[1].forEach(function (r) {
            var a = fg(r.data);
            var n = e[kg(a[2][0].data)][0];
            var i = sg(n.meta[1][0].data);
            if (i != 6002) throw new Error("6001 unexpected reference to ".concat(i));
            var s = Sg(e, n);
            s.data.forEach(function (e, r) {
                e.forEach(function (e, a) {
                    var n = Pa({
                        r: h + r,
                        c: a
                    });
                    var i = wg(e, c, l);
                    if (i) t[n] = i
                })
            });
            h += s.nrows
        });
        if ((n = o[13]) == null ? void 0 : n[0]) {
            var d = e[kg(o[13][0].data)][0];
            var v = sg(d.meta[1][0].data);
            if (v != 6144) throw new Error("Expected merge type 6144, found ".concat(v));
            t["!merges"] = (i = fg(d.data)) == null ? void 0 : i[1].map(function (e) {
                var r = fg(e.data);
                var t = Jb(fg(r[1][0].data)[1][0].data),
                    a = Jb(fg(r[2][0].data)[1][0].data);
                return {
                    s: {
                        r: t.getUint16(0, true),
                        c: t.getUint16(2, true)
                    },
                    e: {
                        r: t.getUint16(0, true) + a.getUint16(0, true) - 1,
                        c: t.getUint16(2, true) + a.getUint16(2, true) - 1
                    }
                }
            })
        }
    }

    function Ag(e, r) {
        var t = fg(r.data);
        var a = {
            "!ref": "A1"
        };
        var n = e[kg(t[2][0].data)];
        var i = sg(n[0].meta[1][0].data);
        if (i != 6001) throw new Error("6000 unexpected reference to ".concat(i));
        _g(e, n[0], a);
        return a
    }

    function xg(e, r) {
        var t;
        var a = fg(r.data);
        var n = {
            name: ((t = a[1]) == null ? void 0 : t[0]) ? qb(a[1][0].data) : "",
            sheets: []
        };
        var i = cg(a[2], kg);
        i.forEach(function (r) {
            e[r].forEach(function (r) {
                var t = sg(r.meta[1][0].data);
                if (t == 6e3) n.sheets.push(Ag(e, r))
            })
        });
        return n
    }

    function Cg(e, r) {
        var t;
        var a = xw();
        var n = fg(r.data);
        if ((t = n[2]) == null ? void 0 : t[0]) throw new Error("Keynote presentations are not supported");
        var i = cg(n[1], kg);
        i.forEach(function (r) {
            e[r].forEach(function (r) {
                var t = sg(r.meta[1][0].data);
                if (t == 2) {
                    var n = xg(e, r);
                    n.sheets.forEach(function (e, r) {
                        Cw(a, e, r == 0 ? n.name : n.name + "_" + r, true)
                    })
                }
            })
        });
        if (a.SheetNames.length == 0) throw new Error("Empty NUMBERS file");
        return a
    }

    function Rg(e) {
        var r, t, a, n, i, s, f, o;
        var c = {},
            l = [];
        e.FullPaths.forEach(function (e) {
            if (e.match(/\.iwpv2/)) throw new Error("Unsupported password protection")
        });
        e.FileIndex.forEach(function (e) {
            if (!e.name.match(/\.iwa$/)) return;
            var r;
            try {
                r = dg(e.content)
            } catch (t) {
                return console.log("?? " + e.content.length + " " + (t.message || t))
            }
            var a;
            try {
                a = lg(r)
            } catch (t) {
                return console.log("## " + (t.message || t))
            }
            a.forEach(function (e) {
                c[e.id] = e.messages;
                l.push(e.id)
            })
        });
        if (!l.length) throw new Error("File has no messages");
        if (((n = (a = (t = (r = c == null ? void 0 : c[1]) == null ? void 0 : r[0]) == null ? void 0 : t.meta) == null ? void 0 : a[1]) == null ? void 0 : n[0].data) && sg(c[1][0].meta[1][0].data) == 1e4) throw new Error("Pages documents are not supported");
        var u = ((o = (f = (s = (i = c == null ? void 0 : c[1]) == null ? void 0 : i[0]) == null ? void 0 : s.meta) == null ? void 0 : f[1]) == null ? void 0 : o[0].data) && sg(c[1][0].meta[1][0].data) == 1 && c[1][0];
        if (!u) l.forEach(function (e) {
            c[e].forEach(function (e) {
                var r = sg(e.meta[1][0].data) >>> 0;
                if (r == 1) {
                    if (!u) u = e;
                    else throw new Error("Document has multiple roots")
                }
            })
        });
        if (!u) throw new Error("Cannot find Document root");
        return Cg(c, u)
    }

    function Og(e, r, t, a) {
        var n, i;
        if (!((n = e[6]) == null ? void 0 : n[0]) || !((i = e[7]) == null ? void 0 : i[0])) throw "Mutation only works on post-BNC storages!";
        var s = 0;
        if (e[7][0].data.length < 2 * r.length) {
            var f = new Uint8Array(2 * r.length);
            f.set(e[7][0].data);
            e[7][0].data = f
        }
        if (e[4][0].data.length < 2 * r.length) {
            var o = new Uint8Array(2 * r.length);
            o.set(e[4][0].data);
            e[4][0].data = o
        }
        var c = Jb(e[7][0].data),
            l = 0,
            u = [];
        var h = Jb(e[4][0].data),
            d = 0,
            v = [];
        var p = a ? 4 : 1;
        for (var m = 0; m < r.length; ++m) {
            if (r[m] == null) {
                c.setUint16(m * 2, 65535, true);
                h.setUint16(m * 2, 65535);
                continue
            }
            c.setUint16(m * 2, l / p, true);
            h.setUint16(m * 2, d / p, true);
            var b, g;
            switch (typeof r[m]) {
                case "string":
                    b = bg({
                        t: "s",
                        v: r[m]
                    }, t);
                    g = gg({
                        t: "s",
                        v: r[m]
                    }, t);
                    break;
                case "number":
                    b = bg({
                        t: "n",
                        v: r[m]
                    }, t);
                    g = gg({
                        t: "n",
                        v: r[m]
                    }, t);
                    break;
                case "boolean":
                    b = bg({
                        t: "b",
                        v: r[m]
                    }, t);
                    g = gg({
                        t: "b",
                        v: r[m]
                    }, t);
                    break;
                default:
                    throw new Error("Unsupported value " + r[m]);
            }
            u.push(b);
            l += b.length; {
                v.push(g);
                d += g.length
            }++s
        }
        e[2][0].data = ig(s);
        e[5][0].data = ig(5);
        for (; m < e[7][0].data.length / 2; ++m) {
            c.setUint16(m * 2, 65535, true);
            h.setUint16(m * 2, 65535, true)
        }
        e[6][0].data = eg(u);
        e[3][0].data = eg(v);
        e[8] = [{
            type: 0,
            data: ig(a ? 1 : 0)
        }];
        return s
    }

    function Ig(e, r) {
        return {
            meta: [
                [],
                [{
                    type: 0,
                    data: ig(e)
                }]
            ],
            data: r
        }
    }
    var Ng = true;

    function Fg(e, r) {
        var t;
        if (!r || !r.numbers) throw new Error("Must pass a `numbers` option -- check the README");
        var a = e.Sheets[e.SheetNames[0]];
        if (e.SheetNames.length > 1) console.error("The Numbers writer currently writes only the first table");
        var n = La(a["!ref"]);
        n.s.r = n.s.c = 0;
        var i = false;
        if (n.e.c > 999) {
            i = true;
            n.e.c = 999
        }
        if (n.e.r > 254) {
            i = true;
            n.e.r = 254
        }
        if (i) console.error("The Numbers writer is currently limited to ".concat(Ma(n)));
        var s = bw(a, {
            range: n,
            header: 1
        });
        var f = ["~Sh33tJ5~"];
        s.forEach(function (e) {
            return e.forEach(function (e) {
                if (typeof e == "string") f.push(e)
            })
        });
        var o = {};
        var c = [];
        var l = Ze.read(r.numbers, {
            type: "base64"
        });
        l.FileIndex.map(function (e, r) {
            return [e, l.FullPaths[r]]
        }).forEach(function (e) {
            var r = e[0],
                t = e[1];
            if (r.type != 2) return;
            if (!r.name.match(/\.iwa/)) return;
            var a = r.content;
            var n = dg(a);
            var i = lg(n);
            i.forEach(function (e) {
                c.push(e.id);
                o[e.id] = {
                    deps: [],
                    location: t,
                    type: sg(e.messages[0].meta[1][0].data)
                }
            })
        });
        c.sort(function (e, r) {
            return e - r
        });
        var u = c.filter(function (e) {
            return e > 1
        }).map(function (e) {
            return [e, ig(e)]
        });
        l.FileIndex.map(function (e, r) {
            return [e, l.FullPaths[r]]
        }).forEach(function (e) {
            var r = e[0];
            if (!r.name.match(/\.iwa/)) return;
            var t = lg(dg(r.content));
            t.forEach(function (e) {
                u.forEach(function (r) {
                    if (e.messages.some(function (e) {
                            return sg(e.meta[1][0].data) != 11006 && Qb(e.data, r[1])
                        })) {
                        o[r[0]].deps.push(e.id)
                    }
                })
            })
        });

        function h(e) {
            for (var r = 927262; r < 2e6; ++r)
                if (!o[r]) {
                    o[r] = e;
                    return r
                } throw new Error("Too many messages")
        }
        var d = Ze.find(l, o[1].location);
        var v = lg(dg(d.content));
        var p;
        for (var m = 0; m < v.length; ++m) {
            var b = v[m];
            if (b.id == 1) p = b
        }
        var g = kg(fg(p.messages[0].data)[1][0].data);
        d = Ze.find(l, o[g].location);
        v = lg(dg(d.content));
        for (m = 0; m < v.length; ++m) {
            b = v[m];
            if (b.id == g) p = b
        }
        var w = fg(p.messages[0].data); {
            w[1] = [{
                type: 2,
                data: Zb(e.SheetNames[0])
            }]
        }
        p.messages[0].data = og(w);
        d.content = vg(ug(v));
        d.size = d.content.length;
        g = kg(w[2][0].data);
        d = Ze.find(l, o[g].location);
        v = lg(dg(d.content));
        for (m = 0; m < v.length; ++m) {
            b = v[m];
            if (b.id == g) p = b
        }
        g = kg(fg(p.messages[0].data)[2][0].data);
        d = Ze.find(l, o[g].location);
        v = lg(dg(d.content));
        for (m = 0; m < v.length; ++m) {
            b = v[m];
            if (b.id == g) p = b
        }
        var k = fg(p.messages[0].data); {
            k[6][0].data = ig(n.e.r + 1);
            k[7][0].data = ig(n.e.c + 1);
            var T = kg(k[46][0].data);
            var E = Ze.find(l, o[T].location);
            var y = lg(dg(E.content)); {
                for (var S = 0; S < y.length; ++S) {
                    if (y[S].id == T) break
                }
                if (y[S].id != T) throw "Bad ColumnRowUIDMapArchive";
                var _ = fg(y[S].messages[0].data);
                _[1] = [];
                _[2] = [], _[3] = [];
                for (var A = 0; A <= n.e.c; ++A) {
                    _[1].push({
                        type: 2,
                        data: og([
                            [],
                            [{
                                type: 0,
                                data: ig(A + 420690)
                            }],
                            [{
                                type: 0,
                                data: ig(A + 420690)
                            }]
                        ])
                    });
                    _[2].push({
                        type: 0,
                        data: ig(A)
                    });
                    _[3].push({
                        type: 0,
                        data: ig(A)
                    })
                }
                _[4] = [];
                _[5] = [], _[6] = [];
                for (var x = 0; x <= n.e.r; ++x) {
                    _[4].push({
                        type: 2,
                        data: og([
                            [],
                            [{
                                type: 0,
                                data: ig(x + 726270)
                            }],
                            [{
                                type: 0,
                                data: ig(x + 726270)
                            }]
                        ])
                    });
                    _[5].push({
                        type: 0,
                        data: ig(x)
                    });
                    _[6].push({
                        type: 0,
                        data: ig(x)
                    })
                }
                y[S].messages[0].data = og(_)
            }
            E.content = vg(ug(y));
            E.size = E.content.length;
            delete k[46];
            var C = fg(k[4][0].data); {
                C[7][0].data = ig(n.e.r + 1);
                var R = fg(C[1][0].data);
                var O = kg(R[2][0].data);
                E = Ze.find(l, o[O].location);
                y = lg(dg(E.content)); {
                    if (y[0].id != O) throw "Bad HeaderStorageBucket";
                    var I = fg(y[0].messages[0].data);
                    if ((t = I == null ? void 0 : I[2]) == null ? void 0 : t[0])
                        for (x = 0; x < s.length; ++x) {
                            var N = fg(I[2][0].data);
                            N[1][0].data = ig(x);
                            N[4][0].data = ig(s[x].length);
                            I[2][x] = {
                                type: I[2][0].type,
                                data: og(N)
                            }
                        }
                    y[0].messages[0].data = og(I)
                }
                E.content = vg(ug(y));
                E.size = E.content.length;
                var F = kg(C[2][0].data);
                E = Ze.find(l, o[F].location);
                y = lg(dg(E.content)); {
                    if (y[0].id != F) throw "Bad HeaderStorageBucket";
                    I = fg(y[0].messages[0].data);
                    for (A = 0; A <= n.e.c; ++A) {
                        N = fg(I[2][0].data);
                        N[1][0].data = ig(A);
                        N[4][0].data = ig(n.e.r + 1);
                        I[2][A] = {
                            type: I[2][0].type,
                            data: og(N)
                        }
                    }
                    y[0].messages[0].data = og(I)
                }
                E.content = vg(ug(y));
                E.size = E.content.length;
                if (a["!merges"]) {
                    var D = h({
                        type: 6144,
                        deps: [g],
                        location: o[g].location
                    });
                    var P = [
                        [],
                        []
                    ];
                    a["!merges"].forEach(function (e) {
                        P[1].push({
                            type: 2,
                            data: og([
                                [],
                                [{
                                    type: 2,
                                    data: og([
                                        [],
                                        [{
                                            type: 5,
                                            data: new Uint8Array(new Uint16Array([e.s.r, e.s.c]).buffer)
                                        }]
                                    ])
                                }],
                                [{
                                    type: 2,
                                    data: og([
                                        [],
                                        [{
                                            type: 5,
                                            data: new Uint8Array(new Uint16Array([e.e.r - e.s.r + 1, e.e.c - e.s.c + 1]).buffer)
                                        }]
                                    ])
                                }]
                            ])
                        })
                    });
                    C[13] = [{
                        type: 2,
                        data: Tg(D)
                    }];
                    v.push({
                        id: D,
                        messages: [Ig(6144, og(P))]
                    })
                }
                var L = kg(C[4][0].data);
                (function () {
                    var e = Ze.find(l, o[L].location);
                    var r = lg(dg(e.content));
                    var t;
                    for (var a = 0; a < r.length; ++a) {
                        var n = r[a];
                        if (n.id == L) t = n
                    }
                    var i = fg(t.messages[0].data); {
                        i[3] = [];
                        f.forEach(function (e, r) {
                            i[3].push({
                                type: 2,
                                data: og([
                                    [],
                                    [{
                                        type: 0,
                                        data: ig(r)
                                    }],
                                    [{
                                        type: 0,
                                        data: ig(1)
                                    }],
                                    [{
                                        type: 2,
                                        data: Zb(e)
                                    }]
                                ])
                            })
                        })
                    }
                    t.messages[0].data = og(i);
                    e.content = vg(ug(r));
                    e.size = e.content.length
                })();
                var M = fg(C[3][0].data); {
                    var U = M[1][0];
                    M[3] = [{
                        type: 0,
                        data: ig(Ng ? 1 : 0)
                    }];
                    var B = fg(U.data); {
                        var W = kg(B[2][0].data);
                        (function () {
                            var e = Ze.find(l, o[W].location);
                            var r = lg(dg(e.content));
                            var t;
                            for (var a = 0; a < r.length; ++a) {
                                var i = r[a];
                                if (i.id == W) t = i
                            }
                            var c = fg(t.messages[0].data); {
                                delete c[6];
                                delete M[7];
                                var u = new Uint8Array(c[5][0].data);
                                c[5] = [];
                                for (var h = 0; h <= n.e.r; ++h) {
                                    var d = fg(u);
                                    Og(d, s[h], f, Ng);
                                    d[1][0].data = ig(h);
                                    c[5].push({
                                        data: og(d),
                                        type: 2
                                    })
                                }
                                c[1] = [{
                                    type: 0,
                                    data: ig(0)
                                }];
                                c[2] = [{
                                    type: 0,
                                    data: ig(0)
                                }];
                                c[3] = [{
                                    type: 0,
                                    data: ig(0)
                                }];
                                c[4] = [{
                                    type: 0,
                                    data: ig(n.e.r + 1)
                                }];
                                c[6] = [{
                                    type: 0,
                                    data: ig(5)
                                }];
                                c[7] = [{
                                    type: 0,
                                    data: ig(1)
                                }];
                                c[8] = [{
                                    type: 0,
                                    data: ig(Ng ? 1 : 0)
                                }]
                            }
                            t.messages[0].data = og(c);
                            e.content = vg(ug(r));
                            e.size = e.content.length
                        })()
                    }
                    U.data = og(B)
                }
                C[3][0].data = og(M)
            }
            k[4][0].data = og(C)
        }
        p.messages[0].data = og(k);
        d.content = vg(ug(v));
        d.size = d.content.length;
        return l
    }

    function Dg(e) {
        return function r(t) {
            for (var a = 0; a != e.length; ++a) {
                var n = e[a];
                if (t[n[0]] === undefined) t[n[0]] = n[1];
                if (n[2] === "n") t[n[0]] = Number(t[n[0]])
            }
        }
    }

    function Pg(e) {
        Dg([
            ["cellNF", false],
            ["cellHTML", true],
            ["cellFormula", true],
            ["cellStyles", false],
            ["cellText", true],
            ["cellDates", false],
            ["sheetStubs", false],
            ["sheetRows", 0, "n"],
            ["bookDeps", false],
            ["bookSheets", false],
            ["bookProps", false],
            ["bookFiles", false],
            ["bookVBA", false],
            ["password", ""],
            ["WTF", false]
        ])(e)
    }

    function Lg(e) {
        Dg([
            ["cellDates", false],
            ["bookSST", false],
            ["bookType", "xlsx"],
            ["compression", false],
            ["WTF", false]
        ])(e)
    }

    function Mg(e) {
        if (ei.WS.indexOf(e) > -1) return "sheet";
        if (ei.CS && e == ei.CS) return "chart";
        if (ei.DS && e == ei.DS) return "dialog";
        if (ei.MS && e == ei.MS) return "macro";
        return e && e.length ? e : "sheet"
    }

    function Ug(e, r) {
        if (!e) return 0;
        try {
            e = r.map(function a(r) {
                if (!r.id) r.id = r.strRelID;
                return [r.name, e["!id"][r.id].Target, Mg(e["!id"][r.id].Type)]
            })
        } catch (t) {
            return null
        }
        return !e || e.length === 0 ? null : e
    }

    function Bg(e, r, t, a, n, i, s, f, o, c, l, u) {
        try {
            i[a] = ti(Pr(e, t, true), r);
            var h = Dr(e, r);
            var d;
            switch (f) {
                case "sheet":
                    d = mm(h, r, n, o, i[a], c, l, u);
                    break;
                case "chart":
                    d = bm(h, r, n, o, i[a], c, l, u);
                    if (!d || !d["!drawel"]) break;
                    var v = Hr(d["!drawel"].Target, r);
                    var p = ri(v);
                    var m = iu(Pr(e, v, true), ti(Pr(e, p, true), v));
                    var b = Hr(m, v);
                    var g = ri(b);
                    d = Up(Pr(e, b, true), b, o, ti(Pr(e, g, true), b), c, d);
                    break;
                case "macro":
                    d = gm(h, r, n, o, i[a], c, l, u);
                    break;
                case "dialog":
                    d = wm(h, r, n, o, i[a], c, l, u);
                    break;
                default:
                    throw new Error("Unrecognized sheet type " + f);
            }
            s[a] = d;
            var w = [];
            if (i && i[a]) nr(i[a]).forEach(function (t) {
                var n = "";
                if (i[a][t].Type == ei.CMNT) {
                    n = Hr(i[a][t].Target, r);
                    var s = Em(Dr(e, n, true), n, o);
                    if (!s || !s.length) return;
                    ou(d, s, false)
                }
                if (i[a][t].Type == ei.TCMNT) {
                    n = Hr(i[a][t].Target, r);
                    w = w.concat(uu(Dr(e, n, true), o))
                }
            });
            if (w && w.length) ou(d, w, true, o.people || [])
        } catch (k) {
            if (o.WTF) throw k
        }
    }

    function Wg(e) {
        return e.charAt(0) == "/" ? e.slice(1) : e
    }

    function Hg(e, r) {
        Ve();
        r = r || {};
        Pg(r);
        if (Nr(e, "META-INF/manifest.xml")) return jb(e, r);
        if (Nr(e, "objectdata.xml")) return jb(e, r);
        if (Nr(e, "Index/Document.iwa")) {
            if (typeof Uint8Array == "undefined") throw new Error("NUMBERS file parsing requires Uint8Array support");
            if (typeof Rg != "undefined") {
                if (e.FileIndex) return Rg(e);
                var t = Ze.utils.cfb_new();
                Mr(e).forEach(function (r) {
                    Ur(t, r, Lr(e, r))
                });
                return Rg(t)
            }
            throw new Error("Unsupported NUMBERS file")
        }
        if (!Nr(e, "[Content_Types].xml")) {
            if (Nr(e, "index.xml.gz")) throw new Error("Unsupported NUMBERS 08 file");
            if (Nr(e, "index.xml")) throw new Error("Unsupported NUMBERS 09 file");
            throw new Error("Unsupported ZIP file")
        }
        var a = Mr(e);
        var n = Zn(Pr(e, "[Content_Types].xml"));
        var i = false;
        var s, f;
        if (n.workbooks.length === 0) {
            f = "xl/workbook.xml";
            if (Dr(e, f, true)) n.workbooks.push(f)
        }
        if (n.workbooks.length === 0) {
            f = "xl/workbook.bin";
            if (!Dr(e, f, true)) throw new Error("Could not find workbook");
            n.workbooks.push(f);
            i = true
        }
        if (n.workbooks[0].slice(-3) == "bin") i = true;
        var o = {};
        var c = {};
        if (!r.bookSheets && !r.bookProps) {
            Id = [];
            if (n.sst) try {
                Id = Tm(Dr(e, Wg(n.sst)), n.sst, r)
            } catch (l) {
                if (r.WTF) throw l
            }
            if (r.cellStyles && n.themes.length) o = Fl(Pr(e, n.themes[0].replace(/^\//, ""), true) || "", r);
            if (n.style) c = km(Dr(e, Wg(n.style)), n.style, o, r)
        }
        n.links.map(function (t) {
            try {
                var a = ti(Pr(e, ri(Wg(t))), t);
                return Sm(Dr(e, Wg(t)), a, t, r)
            } catch (n) {}
        });
        var u = pm(Dr(e, Wg(n.workbooks[0])), n.workbooks[0], r);
        var h = {},
            d = "";
        if (n.coreprops.length) {
            d = Dr(e, Wg(n.coreprops[0]), true);
            if (d) h = vi(d);
            if (n.extprops.length !== 0) {
                d = Dr(e, Wg(n.extprops[0]), true);
                if (d) ki(d, h, r)
            }
        }
        var v = {};
        if (!r.bookSheets || r.bookProps) {
            if (n.custprops.length !== 0) {
                d = Pr(e, Wg(n.custprops[0]), true);
                if (d) v = yi(d, r)
            }
        }
        var p = {};
        if (r.bookSheets || r.bookProps) {
            if (u.Sheets) s = u.Sheets.map(function I(e) {
                return e.name
            });
            else if (h.Worksheets && h.SheetNames.length > 0) s = h.SheetNames;
            if (r.bookProps) {
                p.Props = h;
                p.Custprops = v
            }
            if (r.bookSheets && typeof s !== "undefined") p.SheetNames = s;
            if (r.bookSheets ? p.SheetNames : r.bookProps) return p
        }
        s = {};
        var m = {};
        if (r.bookDeps && n.calcchain) m = ym(Dr(e, Wg(n.calcchain)), n.calcchain, r);
        var b = 0;
        var g = {};
        var w, k; {
            var T = u.Sheets;
            h.Worksheets = T.length;
            h.SheetNames = [];
            for (var E = 0; E != T.length; ++E) {
                h.SheetNames[E] = T[E].name
            }
        }
        var y = i ? "bin" : "xml";
        var S = n.workbooks[0].lastIndexOf("/");
        var _ = (n.workbooks[0].slice(0, S + 1) + "_rels/" + n.workbooks[0].slice(S + 1) + ".rels").replace(/^\//, "");
        if (!Nr(e, _)) _ = "xl/_rels/workbook." + y + ".rels";
        var A = ti(Pr(e, _, true), _.replace(/_rels.*/, "s5s"));
        if ((n.metadata || []).length >= 1) {
            r.xlmeta = _m(Dr(e, Wg(n.metadata[0])), n.metadata[0], r)
        }
        if ((n.people || []).length >= 1) {
            r.people = du(Dr(e, Wg(n.people[0])), r)
        }
        if (A) A = Ug(A, u.Sheets);
        var x = Dr(e, "xl/worksheets/sheet.xml", true) ? 1 : 0;
        e: for (b = 0; b != h.Worksheets; ++b) {
            var C = "sheet";
            if (A && A[b]) {
                w = "xl/" + A[b][1].replace(/[\/]?xl\//, "");
                if (!Nr(e, w)) w = A[b][1];
                if (!Nr(e, w)) w = _.replace(/_rels\/.*$/, "") + A[b][1];
                C = A[b][2]
            } else {
                w = "xl/worksheets/sheet" + (b + 1 - x) + "." + y;
                w = w.replace(/sheet0\./, "sheet.")
            }
            k = w.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
            if (r && r.sheets != null) switch (typeof r.sheets) {
                case "number":
                    if (b != r.sheets) continue e;
                    break;
                case "string":
                    if (h.SheetNames[b].toLowerCase() != r.sheets.toLowerCase()) continue e;
                    break;
                default:
                    if (Array.isArray && Array.isArray(r.sheets)) {
                        var R = false;
                        for (var O = 0; O != r.sheets.length; ++O) {
                            if (typeof r.sheets[O] == "number" && r.sheets[O] == b) R = 1;
                            if (typeof r.sheets[O] == "string" && r.sheets[O].toLowerCase() == h.SheetNames[b].toLowerCase()) R = 1
                        }
                        if (!R) continue e
                    };
            }
            Bg(e, w, k, h.SheetNames[b], b, g, s, C, r, u, o, c)
        }
        p = {
            Directory: n,
            Workbook: u,
            Props: h,
            Custprops: v,
            Deps: m,
            Sheets: s,
            SheetNames: h.SheetNames,
            Strings: Id,
            Styles: c,
            Themes: o,
            SSF: Tr(Y)
        };
        if (r && r.bookFiles) {
            if (e.files) {
                p.keys = a;
                p.files = e.files
            } else {
                p.keys = [];
                p.files = {};
                e.FullPaths.forEach(function (r, t) {
                    r = r.replace(/^Root Entry[\/]/, "");
                    p.keys.push(r);
                    p.files[r] = e.FileIndex[t]
                })
            }
        }
        if (r && r.bookVBA) {
            if (n.vba.length > 0) p.vbaraw = Dr(e, Wg(n.vba[0]), true);
            else if (n.defaults && n.defaults.bin === Tu) p.vbaraw = Dr(e, "xl/vbaProject.bin", true)
        }
        return p
    }

    function zg(e, r) {
        var t = r || {};
        var a = "Workbook",
            n = Ze.find(e, a);
        try {
            a = "/!DataSpaces/Version";
            n = Ze.find(e, a);
            if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
            Zo(n.content);
            a = "/!DataSpaces/DataSpaceMap";
            n = Ze.find(e, a);
            if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
            var i = ec(n.content);
            if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + a);
            a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";
            n = Ze.find(e, a);
            if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
            var s = rc(n.content);
            if (s.length != 1 || s[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + a);
            a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";
            n = Ze.find(e, a);
            if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
            ac(n.content)
        } catch (f) {}
        a = "/EncryptionInfo";
        n = Ze.find(e, a);
        if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
        var o = sc(n.content);
        a = "/EncryptedPackage";
        n = Ze.find(e, a);
        if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
        if (o[0] == 4 && typeof decrypt_agile !== "undefined") return decrypt_agile(o[1], n.content, t.password || "", t);
        if (o[0] == 2 && typeof decrypt_std76 !== "undefined") return decrypt_std76(o[1], n.content, t.password || "", t);
        throw new Error("File is password-protected")
    }

    function Vg(e, r) {
        if (e && !e.SSF) {
            e.SSF = Tr(Y)
        }
        if (e && e.SSF) {
            Ve();
            ze(e.SSF);
            r.revssf = fr(e.SSF);
            r.revssf[e.SSF[65535]] = 0;
            r.ssf = e.SSF
        }
        r.rels = {};
        r.wbrels = {};
        r.Strings = [];
        r.Strings.Count = 0;
        r.Strings.Unique = 0;
        if (Fd) r.revStrings = new Map;
        else {
            r.revStrings = {};
            r.revStrings.foo = [];
            delete r.revStrings.foo
        }
        var t = "bin";
        var a = true;
        var n = qn();
        Lg(r = r || {});
        var i = Br();
        var s = "",
            f = 0;
        r.cellXfs = [];
        Md(r.cellXfs, {}, {
            revssf: {
                General: 0
            }
        });
        if (!e.Props) e.Props = {};
        s = "docProps/core.xml";
        Ur(i, s, mi(e.Props, r));
        n.coreprops.push(s);
        ni(r.rels, 2, s, ei.CORE_PROPS);
        s = "docProps/app.xml";
        if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
        else {
            var o = [];
            for (var c = 0; c < e.SheetNames.length; ++c)
                if ((e.Workbook.Sheets[c] || {}).Hidden != 2) o.push(e.SheetNames[c]);
            e.Props.SheetNames = o
        }
        e.Props.Worksheets = e.Props.SheetNames.length;
        Ur(i, s, Ti(e.Props, r));
        n.extprops.push(s);
        ni(r.rels, 3, s, ei.EXT_PROPS);
        if (e.Custprops !== e.Props && nr(e.Custprops || {}).length > 0) {
            s = "docProps/custom.xml";
            Ur(i, s, Si(e.Custprops, r));
            n.custprops.push(s);
            ni(r.rels, 4, s, ei.CUST_PROPS)
        }
        for (f = 1; f <= e.SheetNames.length; ++f) {
            var l = {
                "!id": {}
            };
            var u = e.Sheets[e.SheetNames[f - 1]];
            var h = (u || {})["!type"] || "sheet";
            switch (h) {
                case "chart":
                    ;
                default:
                    s = "xl/worksheets/sheet" + f + "." + t;
                    Ur(i, s, Lp(f - 1, r, e, l));
                    n.sheets.push(s);
                    ni(r.wbrels, -1, "worksheets/sheet" + f + "." + t, ei.WS[0]);
            }
            if (u) {
                var d = u["!comments"];
                var v = false;
                var p = "";
                if (d && d.length > 0) {
                    p = "xl/comments" + f + "." + t;
                    Ur(i, p, ku(d, r));
                    n.comments.push(p);
                    ni(l, -1, "../comments" + f + "." + t, ei.CMNT);
                    v = true
                }
                if (u["!legacy"]) {
                    if (v) Ur(i, "xl/drawings/vmlDrawing" + f + ".vml", su(f, u["!comments"]))
                }
                delete u["!comments"];
                delete u["!legacy"]
            }
            if (l["!id"].rId1) Ur(i, ri(s), ai(l))
        }
        if (r.Strings != null && r.Strings.length > 0) {
            s = "xl/sharedStrings." + t;
            Ur(i, s, Ko(r.Strings, r));
            n.strs.push(s);
            ni(r.wbrels, -1, "sharedStrings." + t, ei.SST)
        }
        s = "xl/workbook." + t;
        Ur(i, s, vm(e, r));
        n.workbooks.push(s);
        ni(r.rels, 1, s, ei.WB);
        s = "xl/theme/theme1.xml";
        Ur(i, s, Dl(e.Themes, r));
        n.themes.push(s);
        ni(r.wbrels, -1, "theme/theme1.xml", ei.THEME);
        s = "xl/styles." + t;
        Ur(i, s, yl(e, r));
        n.styles.push(s);
        ni(r.wbrels, -1, "styles." + t, ei.STY);
        if (e.vbaraw && a) {
            s = "xl/vbaProject.bin";
            Ur(i, s, e.vbaraw);
            n.vba.push(s);
            ni(r.wbrels, -1, "vbaProject.bin", ei.VBA)
        }
        s = "xl/metadata." + t;
        Ur(i, s, ql());
        n.metadata.push(s);
        ni(r.wbrels, -1, "metadata." + t, ei.XLMETA);
        Ur(i, "[Content_Types].xml", Qn(n, r));
        Ur(i, "_rels/.rels", ai(r.rels));
        Ur(i, "xl/_rels/workbook." + t + ".rels", ai(r.wbrels));
        delete r.revssf;
        delete r.ssf;
        return i
    }

    function Gg(e, r) {
        if (e && !e.SSF) {
            e.SSF = Tr(Y)
        }
        if (e && e.SSF) {
            Ve();
            ze(e.SSF);
            r.revssf = fr(e.SSF);
            r.revssf[e.SSF[65535]] = 0;
            r.ssf = e.SSF
        }
        r.rels = {};
        r.wbrels = {};
        r.Strings = [];
        r.Strings.Count = 0;
        r.Strings.Unique = 0;
        if (Fd) r.revStrings = new Map;
        else {
            r.revStrings = {};
            r.revStrings.foo = [];
            delete r.revStrings.foo
        }
        var t = "xml";
        var a = Su.indexOf(r.bookType) > -1;
        var n = qn();
        Lg(r = r || {});
        var i = Br();
        var s = "",
            f = 0;
        r.cellXfs = [];
        Md(r.cellXfs, {}, {
            revssf: {
                General: 0
            }
        });
        if (!e.Props) e.Props = {};
        s = "docProps/core.xml";
        Ur(i, s, mi(e.Props, r));
        n.coreprops.push(s);
        ni(r.rels, 2, s, ei.CORE_PROPS);
        s = "docProps/app.xml";
        if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
        else {
            var o = [];
            for (var c = 0; c < e.SheetNames.length; ++c)
                if ((e.Workbook.Sheets[c] || {}).Hidden != 2) o.push(e.SheetNames[c]);
            e.Props.SheetNames = o
        }
        e.Props.Worksheets = e.Props.SheetNames.length;
        Ur(i, s, Ti(e.Props, r));
        n.extprops.push(s);
        ni(r.rels, 3, s, ei.EXT_PROPS);
        if (e.Custprops !== e.Props && nr(e.Custprops || {}).length > 0) {
            s = "docProps/custom.xml";
            Ur(i, s, Si(e.Custprops, r));
            n.custprops.push(s);
            ni(r.rels, 4, s, ei.CUST_PROPS)
        }
        var l = ["SheetJ5"];
        r.tcid = 0;
        for (f = 1; f <= e.SheetNames.length; ++f) {
            var u = {
                "!id": {}
            };
            var h = e.Sheets[e.SheetNames[f - 1]];
            var d = (h || {})["!type"] || "sheet";
            switch (d) {
                case "chart":
                    ;
                default:
                    s = "xl/worksheets/sheet" + f + "." + t;
                    Ur(i, s, gv(f - 1, r, e, u));
                    n.sheets.push(s);
                    ni(r.wbrels, -1, "worksheets/sheet" + f + "." + t, ei.WS[0]);
            }
            if (h) {
                var v = h["!comments"];
                var p = false;
                var m = "";
                if (v && v.length > 0) {
                    var b = false;
                    v.forEach(function (e) {
                        e[1].forEach(function (e) {
                            if (e.T == true) b = true
                        })
                    });
                    if (b) {
                        m = "xl/threadedComments/threadedComment" + f + ".xml";
                        Ur(i, m, hu(v, l, r));
                        n.threadedcomments.push(m);
                        ni(u, -1, "../threadedComments/threadedComment" + f + ".xml", ei.TCMNT)
                    }
                    m = "xl/comments" + f + "." + t;
                    Ur(i, m, lu(v, r));
                    n.comments.push(m);
                    ni(u, -1, "../comments" + f + "." + t, ei.CMNT);
                    p = true
                }
                if (h["!legacy"]) {
                    if (p) Ur(i, "xl/drawings/vmlDrawing" + f + ".vml", su(f, h["!comments"]))
                }
                delete h["!comments"];
                delete h["!legacy"]
            }
            if (u["!id"].rId1) Ur(i, ri(s), ai(u))
        }
        if (r.Strings != null && r.Strings.length > 0) {
            s = "xl/sharedStrings." + t;
            Ur(i, s, Go(r.Strings, r));
            n.strs.push(s);
            ni(r.wbrels, -1, "sharedStrings." + t, ei.SST)
        }
        s = "xl/workbook." + t;
        Ur(i, s, tm(e, r));
        n.workbooks.push(s);
        ni(r.rels, 1, s, ei.WB);
        s = "xl/theme/theme1.xml";
        Ur(i, s, Dl(e.Themes, r));
        n.themes.push(s);
        ni(r.wbrels, -1, "theme/theme1.xml", ei.THEME);
        s = "xl/styles." + t;
        Ur(i, s, Jc(e, r));
        n.styles.push(s);
        ni(r.wbrels, -1, "styles." + t, ei.STY);
        if (e.vbaraw && a) {
            s = "xl/vbaProject.bin";
            Ur(i, s, e.vbaraw);
            n.vba.push(s);
            ni(r.wbrels, -1, "vbaProject.bin", ei.VBA)
        }
        s = "xl/metadata." + t;
        Ur(i, s, Ql());
        n.metadata.push(s);
        ni(r.wbrels, -1, "metadata." + t, ei.XLMETA);
        if (l.length > 1) {
            s = "xl/persons/person.xml";
            Ur(i, s, vu(l, r));
            n.people.push(s);
            ni(r.wbrels, -1, "persons/person.xml", ei.PEOPLE)
        }
        Ur(i, "[Content_Types].xml", Qn(n, r));
        Ur(i, "_rels/.rels", ai(r.rels));
        Ur(i, "xl/_rels/workbook." + t + ".rels", ai(r.wbrels));
        delete r.revssf;
        delete r.ssf;
        return i
    }

    function jg(e, r) {
        var t = "";
        switch ((r || {}).type || "base64") {
            case "buffer":
                return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
            case "base64":
                t = T(e.slice(0, 12));
                break;
            case "binary":
                t = e;
                break;
            case "array":
                return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
            default:
                throw new Error("Unrecognized type " + (r && r.type || "undefined"));
        }
        return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3), t.charCodeAt(4), t.charCodeAt(5), t.charCodeAt(6), t.charCodeAt(7)]
    }

    function Xg(e, r) {
        if (Ze.find(e, "EncryptedPackage")) return zg(e, r);
        return fb(e, r)
    }

    function $g(e, r) {
        var t, a = e;
        var n = r || {};
        if (!n.type) n.type = E && Buffer.isBuffer(e) ? "buffer" : "base64";
        t = Wr(a, n);
        return Hg(t, n)
    }

    function Yg(e, r) {
        var t = 0;
        e: while (t < e.length) switch (e.charCodeAt(t)) {
            case 10:
                ;
            case 13:
                ;
            case 32:
                ++t;
                break;
            case 60:
                return Um(e.slice(t), r);
            default:
                break e;
        }
        return Ro.to_workbook(e, r)
    }

    function Kg(e, r) {
        var t = "",
            a = jg(e, r);
        switch (r.type) {
            case "base64":
                t = T(e);
                break;
            case "binary":
                t = e;
                break;
            case "buffer":
                t = e.toString("binary");
                break;
            case "array":
                t = kr(e);
                break;
            default:
                throw new Error("Unrecognized type " + r.type);
        }
        if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = vt(t);
        r.type = "binary";
        return Yg(t, r)
    }

    function Jg(e, r) {
        var t = e;
        if (r.type == "base64") t = T(t);
        t = a.utils.decode(1200, t.slice(2), "str");
        r.type = "binary";
        return Yg(t, r)
    }

    function qg(e) {
        return !e.match(/[^\x00-\x7F]/) ? e : pt(e)
    }

    function Zg(e, r, t, a) {
        if (a) {
            t.type = "string";
            return Ro.to_workbook(e, t)
        }
        return Ro.to_workbook(r, t)
    }

    function Qg(e, r) {
        c();
        var t = r || {};
        if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer) return Qg(new Uint8Array(e), (t = Tr(t), t.type = "array", t));
        if (typeof Uint8Array !== "undefined" && e instanceof Uint8Array && !t.type) t.type = typeof Deno !== "undefined" ? "buffer" : "array";
        var a = e,
            n = [0, 0, 0, 0],
            i = false;
        if (t.cellStyles) {
            t.cellNF = true;
            t.sheetStubs = true
        }
        Nd = {};
        if (t.dateNF) Nd.dateNF = t.dateNF;
        if (!t.type) t.type = E && Buffer.isBuffer(e) ? "buffer" : "base64";
        if (t.type == "file") {
            t.type = E ? "buffer" : "binary";
            a = ar(e);
            if (typeof Uint8Array !== "undefined" && !E) t.type = "array"
        }
        if (t.type == "string") {
            i = true;
            t.type = "binary";
            t.codepage = 65001;
            a = qg(e)
        }
        if (t.type == "array" && typeof Uint8Array !== "undefined" && e instanceof Uint8Array && typeof ArrayBuffer !== "undefined") {
            var s = new ArrayBuffer(3),
                f = new Uint8Array(s);
            f.foo = "bar";
            if (!f.foo) {
                t = Tr(t);
                t.type = "array";
                return Qg(O(a), t)
            }
        }
        switch ((n = jg(a, t))[0]) {
            case 208:
                if (n[1] === 207 && n[2] === 17 && n[3] === 224 && n[4] === 161 && n[5] === 177 && n[6] === 26 && n[7] === 225) return Xg(Ze.read(a, t), t);
                break;
            case 9:
                if (n[1] <= 8) return fb(a, t);
                break;
            case 60:
                return Um(a, t);
            case 73:
                if (n[1] === 73 && n[2] === 42 && n[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
                if (n[1] === 68) return Oo(a, t);
                break;
            case 84:
                if (n[1] === 65 && n[2] === 66 && n[3] === 76) return xo.to_workbook(a, t);
                break;
            case 80:
                return n[1] === 75 && n[2] < 9 && n[3] < 9 ? $g(a, t) : Zg(e, a, t, i);
            case 239:
                return n[3] === 60 ? Um(a, t) : Zg(e, a, t, i);
            case 255:
                if (n[1] === 254) {
                    return Jg(a, t)
                } else if (n[1] === 0 && n[2] === 2 && n[3] === 0) return Io.to_workbook(a, t);
                break;
            case 0:
                if (n[1] === 0) {
                    if (n[2] >= 2 && n[3] === 0) return Io.to_workbook(a, t);
                    if (n[2] === 0 && (n[3] === 8 || n[3] === 9)) return Io.to_workbook(a, t)
                }
                break;
            case 3:
                ;
            case 131:
                ;
            case 139:
                ;
            case 140:
                return _o.to_workbook(a, t);
            case 123:
                if (n[1] === 92 && n[2] === 114 && n[3] === 116) return wc.to_workbook(a, t);
                break;
            case 10:
                ;
            case 13:
                ;
            case 32:
                return Kg(a, t);
            case 137:
                if (n[1] === 80 && n[2] === 78 && n[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
                break;
            case 8:
                if (n[1] === 231) throw new Error("Unsupported Multiplan 1.x file!");
                break;
            case 12:
                if (n[1] === 236) throw new Error("Unsupported Multiplan 2.x file!");
                if (n[1] === 237) throw new Error("Unsupported Multiplan 3.x file!");
                break;
        }
        if (So.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31) return _o.to_workbook(a, t);
        return Zg(e, a, t, i)
    }

    function ew(e, r) {
        var t = r || {};
        t.type = "file";
        return Qg(e, t)
    }

    function rw(e, r) {
        switch (r.type) {
            case "base64":
                ;
            case "binary":
                break;
            case "buffer":
                ;
            case "array":
                r.type = "";
                break;
            case "file":
                return tr(r.file, Ze.write(e, {
                    type: E ? "buffer" : ""
                }));
            case "string":
                throw new Error("'string' output type invalid for '" + r.bookType + "' files");
            default:
                throw new Error("Unrecognized type " + r.type);
        }
        return Ze.write(e, r)
    }

    function tw(e, r) {
        switch (r.bookType) {
            case "ods":
                return Kb(e, r);
            case "numbers":
                return Fg(e, r);
            case "xlsb":
                return Vg(e, r);
            default:
                return Gg(e, r);
        }
    }

    function aw(e, r) {
        var t = Tr(r || {});
        var a = tw(e, t);
        return iw(a, t)
    }

    function nw(e, r) {
        var t = Tr(r || {});
        var a = Gg(e, t);
        return iw(a, t)
    }

    function iw(e, r) {
        var t = {};
        var a = E ? "nodebuffer" : typeof Uint8Array !== "undefined" ? "array" : "string";
        if (r.compression) t.compression = "DEFLATE";
        if (r.password) t.type = a;
        else switch (r.type) {
            case "base64":
                t.type = "base64";
                break;
            case "binary":
                t.type = "string";
                break;
            case "string":
                throw new Error("'string' output type invalid for '" + r.bookType + "' files");
            case "buffer":
                ;
            case "file":
                t.type = a;
                break;
            default:
                throw new Error("Unrecognized type " + r.type);
        }
        var n = e.FullPaths ? Ze.write(e, {
            fileType: "zip",
            type: {
                nodebuffer: "buffer",
                string: "binary"
            } [t.type] || t.type,
            compression: !!r.compression
        }) : e.generate(t);
        if (typeof Deno !== "undefined") {
            if (typeof n == "string") {
                if (r.type == "binary" || r.type == "base64") return n;
                n = new Uint8Array(x(n))
            }
        }
        if (r.password && typeof encrypt_agile !== "undefined") return rw(encrypt_agile(n, r.password), r);
        if (r.type === "file") return tr(r.file, n);
        return r.type == "string" ? vt(n) : n
    }

    function sw(e, r) {
        var t = r || {};
        var a = ob(e, t);
        return rw(a, t)
    }

    function fw(e, r, t) {
        if (!t) t = "";
        var a = t + e;
        switch (r.type) {
            case "base64":
                return k(pt(a));
            case "binary":
                return pt(a);
            case "string":
                return e;
            case "file":
                return tr(r.file, a, "utf8");
            case "buffer": {
                if (E) return y(a, "utf8");
                else if (typeof TextEncoder !== "undefined") return (new TextEncoder).encode(a);
                else return fw(a, {
                    type: "binary"
                }).split("").map(function (e) {
                    return e.charCodeAt(0)
                })
            };
        }
        throw new Error("Unrecognized type " + r.type)
    }

    function ow(e, r) {
        switch (r.type) {
            case "base64":
                return k(e);
            case "binary":
                return e;
            case "string":
                return e;
            case "file":
                return tr(r.file, e, "binary");
            case "buffer": {
                if (E) return y(e, "binary");
                else return e.split("").map(function (e) {
                    return e.charCodeAt(0)
                })
            };
        }
        throw new Error("Unrecognized type " + r.type)
    }

    function cw(e, r) {
        switch (r.type) {
            case "string":
                ;
            case "base64":
                ;
            case "binary":
                var t = "";
                for (var a = 0; a < e.length; ++a) t += String.fromCharCode(e[a]);
                return r.type == "base64" ? k(t) : r.type == "string" ? vt(t) : t;
            case "file":
                return tr(r.file, e);
            case "buffer":
                return e;
            default:
                throw new Error("Unrecognized type " + r.type);
        }
    }

    function lw(e, r) {
        c();
        Qp(e);
        var t = Tr(r || {});
        if (t.cellStyles) {
            t.cellNF = true;
            t.sheetStubs = true
        }
        if (t.type == "array") {
            t.type = "binary";
            var a = lw(e, t);
            t.type = "array";
            return x(a)
        }
        return nw(e, t)
    }

    function uw(e, r) {
        c();
        Qp(e);
        var t = Tr(r || {});
        if (t.cellStyles) {
            t.cellNF = true;
            t.sheetStubs = true
        }
        if (t.type == "array") {
            t.type = "binary";
            var a = uw(e, t);
            t.type = "array";
            return x(a)
        }
        var n = 0;
        if (t.sheet) {
            if (typeof t.sheet == "number") n = t.sheet;
            else n = e.SheetNames.indexOf(t.sheet);
            if (!e.SheetNames[n]) throw new Error("Sheet not found: " + t.sheet + " : " + typeof t.sheet)
        }
        switch (t.bookType || "xlsb") {
            case "xml":
                ;
            case "xlml":
                return fw(qm(e, t), t);
            case "slk":
                ;
            case "sylk":
                return fw(Ao.from_sheet(e.Sheets[e.SheetNames[n]], t), t);
            case "htm":
                ;
            case "html":
                return fw(Lb(e.Sheets[e.SheetNames[n]], t), t);
            case "txt":
                return ow(Tw(e.Sheets[e.SheetNames[n]], t), t);
            case "csv":
                return fw(kw(e.Sheets[e.SheetNames[n]], t), t, "\ufeff");
            case "dif":
                return fw(xo.from_sheet(e.Sheets[e.SheetNames[n]], t), t);
            case "dbf":
                return cw(_o.from_sheet(e.Sheets[e.SheetNames[n]], t), t);
            case "prn":
                return fw(Ro.from_sheet(e.Sheets[e.SheetNames[n]], t), t);
            case "rtf":
                return fw(wc.from_sheet(e.Sheets[e.SheetNames[n]], t), t);
            case "eth":
                return fw(Co.from_sheet(e.Sheets[e.SheetNames[n]], t), t);
            case "fods":
                return fw(Kb(e, t), t);
            case "wk1":
                return cw(Io.sheet_to_wk1(e.Sheets[e.SheetNames[n]], t), t);
            case "wk3":
                return cw(Io.book_to_wk3(e, t), t);
            case "biff2":
                if (!t.biff) t.biff = 2;
            case "biff3":
                if (!t.biff) t.biff = 3;
            case "biff4":
                if (!t.biff) t.biff = 4;
                return cw(Rb(e, t), t);
            case "biff5":
                if (!t.biff) t.biff = 5;
            case "biff8":
                ;
            case "xla":
                ;
            case "xls":
                if (!t.biff) t.biff = 8;
                return sw(e, t);
            case "xlsx":
                ;
            case "xlsm":
                ;
            case "xlam":
                ;
            case "xlsb":
                ;
            case "numbers":
                ;
            case "ods":
                return aw(e, t);
            default:
                throw new Error("Unrecognized bookType |" + t.bookType + "|");
        }
    }

    function hw(e) {
        if (e.bookType) return;
        var r = {
            xls: "biff8",
            htm: "html",
            slk: "sylk",
            socialcalc: "eth",
            Sh33tJS: "WTF"
        };
        var t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
        if (t.match(/^\.[a-z]+$/)) e.bookType = t.slice(1);
        e.bookType = r[e.bookType] || e.bookType
    }

    function dw(e, r, t) {
        var a = t || {};
        a.type = "file";
        a.file = r;
        hw(a);
        return uw(e, a)
    }

    function vw(e, r, t) {
        var a = t || {};
        a.type = "file";
        a.file = r;
        hw(a);
        return lw(e, a)
    }

    function pw(e, r, t, a) {
        var n = t || {};
        n.type = "file";
        n.file = e;
        hw(n);
        n.type = "buffer";
        var i = a;
        if (!(i instanceof Function)) i = t;
        return Qe.writeFile(e, uw(r, n), i)
    }

    function mw(e, r, t, a, n, i, s, f) {
        var o = Aa(t);
        var c = f.defval,
            l = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw");
        var u = true;
        var h = n === 1 ? [] : {};
        if (n !== 1) {
            if (Object.defineProperty) try {
                Object.defineProperty(h, "__rowNum__", {
                    value: t,
                    enumerable: false
                })
            } catch (d) {
                h.__rowNum__ = t
            } else h.__rowNum__ = t
        }
        if (!s || e[t])
            for (var v = r.s.c; v <= r.e.c; ++v) {
                var p = s ? e[t][v] : e[a[v] + o];
                if (p === undefined || p.t === undefined) {
                    if (c === undefined) continue;
                    if (i[v] != null) {
                        h[i[v]] = c
                    }
                    continue
                }
                var m = p.v;
                switch (p.t) {
                    case "z":
                        if (m == null) break;
                        continue;
                    case "e":
                        m = m == 0 ? null : void 0;
                        break;
                    case "s":
                        ;
                    case "d":
                        ;
                    case "b":
                        ;
                    case "n":
                        break;
                    default:
                        throw new Error("unrecognized type " + p.t);
                }
                if (i[v] != null) {
                    if (m == null) {
                        if (p.t == "e" && m === null) h[i[v]] = null;
                        else if (c !== undefined) h[i[v]] = c;
                        else if (l && m === null) h[i[v]] = null;
                        else continue
                    } else {
                        h[i[v]] = l && (p.t !== "n" || p.t === "n" && f.rawNumbers !== false) ? m : Wa(p, m, f)
                    }
                    if (m != null) u = false
                }
            }
        return {
            row: h,
            isempty: u
        }
    }

    function bw(e, r) {
        if (e == null || e["!ref"] == null) return [];
        var t = {
                t: "n",
                v: 0
            },
            a = 0,
            n = 1,
            i = [],
            s = 0,
            f = "";
        var o = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: 0,
                c: 0
            }
        };
        var c = r || {};
        var l = c.range != null ? c.range : e["!ref"];
        if (c.header === 1) a = 1;
        else if (c.header === "A") a = 2;
        else if (Array.isArray(c.header)) a = 3;
        else if (c.header == null) a = 0;
        switch (typeof l) {
            case "string":
                o = Ua(l);
                break;
            case "number":
                o = Ua(e["!ref"]);
                o.s.r = l;
                break;
            default:
                o = l;
        }
        if (a > 0) n = 0;
        var u = Aa(o.s.r);
        var h = [];
        var d = [];
        var v = 0,
            p = 0;
        var m = Array.isArray(e);
        var b = o.s.r,
            g = 0;
        var w = {};
        if (m && !e[b]) e[b] = [];
        var k = c.skipHidden && e["!cols"] || [];
        var T = c.skipHidden && e["!rows"] || [];
        for (g = o.s.c; g <= o.e.c; ++g) {
            if ((k[g] || {}).hidden) continue;
            h[g] = Oa(g);
            t = m ? e[b][g] : e[h[g] + u];
            switch (a) {
                case 1:
                    i[g] = g - o.s.c;
                    break;
                case 2:
                    i[g] = h[g];
                    break;
                case 3:
                    i[g] = c.header[g - o.s.c];
                    break;
                default:
                    if (t == null) t = {
                        w: "__EMPTY",
                        t: "s"
                    };
                    f = s = Wa(t, null, c);
                    p = w[s] || 0;
                    if (!p) w[s] = 1;
                    else {
                        do {
                            f = s + "_" + p++
                        } while (w[f]);
                        w[s] = p;
                        w[f] = 1
                    }
                    i[g] = f;
            }
        }
        for (b = o.s.r + n; b <= o.e.r; ++b) {
            if ((T[b] || {}).hidden) continue;
            var E = mw(e, o, b, h, a, i, m, c);
            if (E.isempty === false || (a === 1 ? c.blankrows !== false : !!c.blankrows)) d[v++] = E.row
        }
        d.length = v;
        return d
    }
    var gw = /"/g;

    function ww(e, r, t, a, n, i, s, f) {
        var o = true;
        var c = [],
            l = "",
            u = Aa(t);
        for (var h = r.s.c; h <= r.e.c; ++h) {
            if (!a[h]) continue;
            var d = f.dense ? (e[t] || [])[h] : e[a[h] + u];
            if (d == null) l = "";
            else if (d.v != null) {
                o = false;
                l = "" + (f.rawNumbers && d.t == "n" ? d.v : Wa(d, null, f));
                for (var v = 0, p = 0; v !== l.length; ++v)
                    if ((p = l.charCodeAt(v)) === n || p === i || p === 34 || f.forceQuotes) {
                        l = '"' + l.replace(gw, '""') + '"';
                        break
                    } if (l == "ID") l = '"ID"'
            } else if (d.f != null && !d.F) {
                o = false;
                l = "=" + d.f;
                if (l.indexOf(",") >= 0) l = '"' + l.replace(gw, '""') + '"'
            } else l = "";
            c.push(l)
        }
        if (f.blankrows === false && o) return null;
        return c.join(s)
    }

    function kw(e, r) {
        var t = [];
        var a = r == null ? {} : r;
        if (e == null || e["!ref"] == null) return "";
        var n = Ua(e["!ref"]);
        var i = a.FS !== undefined ? a.FS : ",",
            s = i.charCodeAt(0);
        var f = a.RS !== undefined ? a.RS : "\n",
            o = f.charCodeAt(0);
        var c = new RegExp((i == "|" ? "\\|" : i) + "+$");
        var l = "",
            u = [];
        a.dense = Array.isArray(e);
        var h = a.skipHidden && e["!cols"] || [];
        var d = a.skipHidden && e["!rows"] || [];
        for (var v = n.s.c; v <= n.e.c; ++v)
            if (!(h[v] || {}).hidden) u[v] = Oa(v);
        var p = 0;
        for (var m = n.s.r; m <= n.e.r; ++m) {
            if ((d[m] || {}).hidden) continue;
            l = ww(e, n, m, u, s, o, i, a);
            if (l == null) {
                continue
            }
            if (a.strip) l = l.replace(c, "");
            if (l || a.blankrows !== false) t.push((p++ ? f : "") + l)
        }
        delete a.dense;
        return t.join("")
    }

    function Tw(e, r) {
        if (!r) r = {};
        r.FS = "\t";
        r.RS = "\n";
        var t = kw(e, r);
        if (typeof a == "undefined" || r.type == "string") return t;
        var n = a.utils.encode(1200, t, "str");
        return String.fromCharCode(255) + String.fromCharCode(254) + n
    }

    function Ew(e) {
        var r = "",
            t, a = "";
        if (e == null || e["!ref"] == null) return [];
        var n = Ua(e["!ref"]),
            i = "",
            s = [],
            f;
        var o = [];
        var c = Array.isArray(e);
        for (f = n.s.c; f <= n.e.c; ++f) s[f] = Oa(f);
        for (var l = n.s.r; l <= n.e.r; ++l) {
            i = Aa(l);
            for (f = n.s.c; f <= n.e.c; ++f) {
                r = s[f] + i;
                t = c ? (e[l] || [])[f] : e[r];
                a = "";
                if (t === undefined) continue;
                else if (t.F != null) {
                    r = t.F;
                    if (!t.f) continue;
                    a = t.f;
                    if (r.indexOf(":") == -1) r = r + ":" + r
                }
                if (t.f != null) a = t.f;
                else if (t.t == "z") continue;
                else if (t.t == "n" && t.v != null) a = "" + t.v;
                else if (t.t == "b") a = t.v ? "TRUE" : "FALSE";
                else if (t.w !== undefined) a = "'" + t.w;
                else if (t.v === undefined) continue;
                else if (t.t == "s") a = "'" + t.v;
                else a = "" + t.v;
                o[o.length] = r + "=" + a
            }
        }
        return o
    }

    function yw(e, r, t) {
        var a = t || {};
        var n = +!a.skipHeader;
        var i = e || {};
        var s = 0,
            f = 0;
        if (i && a.origin != null) {
            if (typeof a.origin == "number") s = a.origin;
            else {
                var o = typeof a.origin == "string" ? Da(a.origin) : a.origin;
                s = o.r;
                f = o.c
            }
        }
        var c;
        var l = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: f,
                r: s + r.length - 1 + n
            }
        };
        if (i["!ref"]) {
            var u = Ua(i["!ref"]);
            l.e.c = Math.max(l.e.c, u.e.c);
            l.e.r = Math.max(l.e.r, u.e.r);
            if (s == -1) {
                s = u.e.r + 1;
                l.e.r = s + r.length - 1 + n
            }
        } else {
            if (s == -1) {
                s = 0;
                l.e.r = r.length - 1 + n
            }
        }
        var h = a.header || [],
            d = 0;
        r.forEach(function (e, r) {
            nr(e).forEach(function (t) {
                if ((d = h.indexOf(t)) == -1) h[d = h.length] = t;
                var o = e[t];
                var l = "z";
                var u = "";
                var v = Pa({
                    c: f + d,
                    r: s + r + n
                });
                c = _w(i, v);
                if (o && typeof o === "object" && !(o instanceof Date)) {
                    i[v] = o
                } else {
                    if (typeof o == "number") l = "n";
                    else if (typeof o == "boolean") l = "b";
                    else if (typeof o == "string") l = "s";
                    else if (o instanceof Date) {
                        l = "d";
                        if (!a.cellDates) {
                            l = "n";
                            o = lr(o)
                        }
                        u = a.dateNF || Y[14]
                    } else if (o === null && a.nullError) {
                        l = "e";
                        o = 0
                    }
                    if (!c) i[v] = c = {
                        t: l,
                        v: o
                    };
                    else {
                        c.t = l;
                        c.v = o;
                        delete c.w;
                        delete c.R;
                        if (u) c.z = u
                    }
                    if (u) c.z = u
                }
            })
        });
        l.e.c = Math.max(l.e.c, f + h.length - 1);
        var v = Aa(s);
        if (n)
            for (d = 0; d < h.length; ++d) i[Oa(d + f) + v] = {
                t: "s",
                v: h[d]
            };
        i["!ref"] = Ma(l);
        return i
    }

    function Sw(e, r) {
        return yw(null, e, r)
    }

    function _w(e, r, t) {
        if (typeof r == "string") {
            if (Array.isArray(e)) {
                var a = Da(r);
                if (!e[a.r]) e[a.r] = [];
                return e[a.r][a.c] || (e[a.r][a.c] = {
                    t: "z"
                })
            }
            return e[r] || (e[r] = {
                t: "z"
            })
        }
        if (typeof r != "number") return _w(e, Pa(r));
        return _w(e, Pa({
            r: r,
            c: t || 0
        }))
    }

    function Aw(e, r) {
        if (typeof r == "number") {
            if (r >= 0 && e.SheetNames.length > r) return r;
            throw new Error("Cannot find sheet # " + r)
        } else if (typeof r == "string") {
            var t = e.SheetNames.indexOf(r);
            if (t > -1) return t;
            throw new Error("Cannot find sheet name |" + r + "|")
        } else throw new Error("Cannot find sheet |" + r + "|")
    }

    function xw() {
        return {
            SheetNames: [],
            Sheets: {}
        }
    }

    function Cw(e, r, t, a) {
        var n = 1;
        if (!t)
            for (; n <= 65535; ++n, t = undefined)
                if (e.SheetNames.indexOf(t = "Sheet" + n) == -1) break;
        if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
        if (a && e.SheetNames.indexOf(t) >= 0) {
            var i = t.match(/(^.*?)(\d+)$/);
            n = i && +i[2] || 0;
            var s = i && i[1] || t;
            for (++n; n <= 65535; ++n)
                if (e.SheetNames.indexOf(t = s + n) == -1) break
        }
        qp(t);
        if (e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
        e.SheetNames.push(t);
        e.Sheets[t] = r;
        return t
    }

    function Rw(e, r, t) {
        if (!e.Workbook) e.Workbook = {};
        if (!e.Workbook.Sheets) e.Workbook.Sheets = [];
        var a = Aw(e, r);
        if (!e.Workbook.Sheets[a]) e.Workbook.Sheets[a] = {};
        switch (t) {
            case 0:
                ;
            case 1:
                ;
            case 2:
                break;
            default:
                throw new Error("Bad sheet visibility setting " + t);
        }
        e.Workbook.Sheets[a].Hidden = t
    }

    function Ow(e, r) {
        e.z = r;
        return e
    }

    function Iw(e, r, t) {
        if (!r) {
            delete e.l
        } else {
            e.l = {
                Target: r
            };
            if (t) e.l.Tooltip = t
        }
        return e
    }

    function Nw(e, r, t) {
        return Iw(e, "#" + r, t)
    }

    function Fw(e, r, t) {
        if (!e.c) e.c = [];
        e.c.push({
            t: r,
            a: t || "SheetJS"
        })
    }

    function Dw(e, r, t, a) {
        var n = typeof r != "string" ? r : Ua(r);
        var i = typeof r == "string" ? r : Ma(r);
        for (var s = n.s.r; s <= n.e.r; ++s)
            for (var f = n.s.c; f <= n.e.c; ++f) {
                var o = _w(e, s, f);
                o.t = "n";
                o.F = i;
                delete o.v;
                if (s == n.s.r && f == n.s.c) {
                    o.f = t;
                    if (a) o.D = true
                }
            }
        var c = La(e["!ref"]);
        if (c.s.r > n.s.r) c.s.r = n.s.r;
        if (c.s.c > n.s.c) c.s.c = n.s.c;
        if (c.e.r < n.e.r) c.e.r = n.e.r;
        if (c.e.c < n.e.c) c.e.c = n.e.c;
        e["!ref"] = Ma(c);
        return e
    }
    var Pw = {
        encode_col: Oa,
        encode_row: Aa,
        encode_cell: Pa,
        encode_range: Ma,
        decode_col: Ra,
        decode_row: _a,
        split_cell: Fa,
        decode_cell: Da,
        decode_range: La,
        format_cell: Wa,
        sheet_add_aoa: za,
        sheet_add_json: yw,
        sheet_add_dom: Mb,
        aoa_to_sheet: Va,
        json_to_sheet: Sw,
        table_to_sheet: Ub,
        table_to_book: Bb,
        sheet_to_csv: kw,
        sheet_to_txt: Tw,
        sheet_to_json: bw,
        sheet_to_html: Lb,
        sheet_to_formulae: Ew,
        sheet_to_row_object_array: bw,
        sheet_get_cell: _w,
        book_new: xw,
        book_append_sheet: Cw,
        book_set_sheet_visibility: Rw,
        cell_set_number_format: Ow,
        cell_set_hyperlink: Iw,
        cell_set_internal_link: Nw,
        cell_add_comment: Fw,
        sheet_set_array_formula: Dw,
        consts: {
            SHEET_VISIBLE: 0,
            SHEET_HIDDEN: 1,
            SHEET_VERY_HIDDEN: 2
        }
    };
    var Lw;

    function Mw(e) {
        Lw = e
    }

    function Uw(e, r) {
        var t = Lw();
        var a = r == null ? {} : r;
        if (e == null || e["!ref"] == null) {
            t.push(null);
            return t
        }
        var n = Ua(e["!ref"]);
        var i = a.FS !== undefined ? a.FS : ",",
            s = i.charCodeAt(0);
        var f = a.RS !== undefined ? a.RS : "\n",
            o = f.charCodeAt(0);
        var c = new RegExp((i == "|" ? "\\|" : i) + "+$");
        var l = "",
            u = [];
        a.dense = Array.isArray(e);
        var h = a.skipHidden && e["!cols"] || [];
        var d = a.skipHidden && e["!rows"] || [];
        for (var v = n.s.c; v <= n.e.c; ++v)
            if (!(h[v] || {}).hidden) u[v] = Oa(v);
        var p = n.s.r;
        var m = false,
            b = 0;
        t._read = function () {
            if (!m) {
                m = true;
                return t.push("\ufeff")
            }
            while (p <= n.e.r) {
                ++p;
                if ((d[p - 1] || {}).hidden) continue;
                l = ww(e, n, p - 1, u, s, o, i, a);
                if (l != null) {
                    if (a.strip) l = l.replace(c, "");
                    if (l || a.blankrows !== false) return t.push((b++ ? f : "") + l)
                }
            }
            return t.push(null)
        };
        return t
    }

    function Bw(e, r) {
        var t = Lw();
        var a = r || {};
        var n = a.header != null ? a.header : Nb;
        var i = a.footer != null ? a.footer : Fb;
        t.push(n);
        var s = La(e["!ref"]);
        a.dense = Array.isArray(e);
        t.push(Pb(e, s, a));
        var f = s.s.r;
        var o = false;
        t._read = function () {
            if (f > s.e.r) {
                if (!o) {
                    o = true;
                    t.push("</table>" + i)
                }
                return t.push(null)
            }
            while (f <= s.e.r) {
                t.push(Ib(e, s, f, a));
                ++f;
                break
            }
        };
        return t
    }

    function Ww(e, r) {
        var t = Lw({
            objectMode: true
        });
        if (e == null || e["!ref"] == null) {
            t.push(null);
            return t
        }
        var a = {
                t: "n",
                v: 0
            },
            n = 0,
            i = 1,
            s = [],
            f = 0,
            o = "";
        var c = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: 0,
                c: 0
            }
        };
        var l = r || {};
        var u = l.range != null ? l.range : e["!ref"];
        if (l.header === 1) n = 1;
        else if (l.header === "A") n = 2;
        else if (Array.isArray(l.header)) n = 3;
        switch (typeof u) {
            case "string":
                c = Ua(u);
                break;
            case "number":
                c = Ua(e["!ref"]);
                c.s.r = u;
                break;
            default:
                c = u;
        }
        if (n > 0) i = 0;
        var h = Aa(c.s.r);
        var d = [];
        var v = 0;
        var p = Array.isArray(e);
        var m = c.s.r,
            b = 0;
        var g = {};
        if (p && !e[m]) e[m] = [];
        var w = l.skipHidden && e["!cols"] || [];
        var k = l.skipHidden && e["!rows"] || [];
        for (b = c.s.c; b <= c.e.c; ++b) {
            if ((w[b] || {}).hidden) continue;
            d[b] = Oa(b);
            a = p ? e[m][b] : e[d[b] + h];
            switch (n) {
                case 1:
                    s[b] = b - c.s.c;
                    break;
                case 2:
                    s[b] = d[b];
                    break;
                case 3:
                    s[b] = l.header[b - c.s.c];
                    break;
                default:
                    if (a == null) a = {
                        w: "__EMPTY",
                        t: "s"
                    };
                    o = f = Wa(a, null, l);
                    v = g[f] || 0;
                    if (!v) g[f] = 1;
                    else {
                        do {
                            o = f + "_" + v++
                        } while (g[o]);
                        g[f] = v;
                        g[o] = 1
                    }
                    s[b] = o;
            }
        }
        m = c.s.r + i;
        t._read = function () {
            while (m <= c.e.r) {
                if ((k[m - 1] || {}).hidden) continue;
                var r = mw(e, c, m, d, n, s, p, l);
                ++m;
                if (r.isempty === false || (n === 1 ? l.blankrows !== false : !!l.blankrows)) {
                    t.push(r.row);
                    return
                }
            }
            return t.push(null)
        };
        return t
    }
    var Hw = {
        to_json: Ww,
        to_html: Bw,
        to_csv: Uw,
        set_readable: Mw
    };
    if (typeof fb !== "undefined") e.parse_xlscfb = fb;
    e.parse_zip = Hg;
    e.read = Qg;
    e.readFile = ew;
    e.readFileSync = ew;
    e.write = uw;
    e.writeFile = dw;
    e.writeFileSync = dw;
    e.writeFileAsync = pw;
    e.utils = Pw;
    e.writeXLSX = lw;
    e.writeFileXLSX = vw;
    e.SSF = Ge;
    if (typeof Hw !== "undefined") e.stream = Hw;
    if (typeof Ze !== "undefined") e.CFB = Ze;
    if (typeof require !== "undefined") {
        var zw = undefined;
        if ((zw || {}).Readable) Mw(zw.Readable);
        try {
            Qe = undefined
        } catch (Vw) {}
    }
}
if (typeof exports !== "undefined") make_xlsx_lib(exports);
else if (typeof module !== "undefined" && module.exports) make_xlsx_lib(module.exports);
else if (typeof define === "function" && define.amd) define("xlsx", function () {
    if (!XLSX.version) make_xlsx_lib(XLSX);
    return XLSX
});
else make_xlsx_lib(XLSX);
if (typeof window !== "undefined" && !window.XLSX) try {
    window.XLSX = XLSX
} catch (e) {}