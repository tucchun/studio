! function(t, i) {
    "function" == typeof define && define.amd ? define(i) : "object" == typeof exports ? module.exports = i(require, exports, module) : t.protect = i()
}(this, function(t, i, r) {
    function o(t, i, r) {
        null != t && ("number" == typeof t ? this.fromNumber(t, i, r) : null == i && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, i))
    }

    function s() {
        return new o(null)
    }

    function n(t, i, r, o, s, n) {
        for (; --n >= 0;) {
            var e = i * this[t++] + r[o] + s;
            s = Math.floor(e / 67108864), r[o++] = 67108863 & e
        }
        return s
    }

    function e(t, i, r, o, s, n) {
        for (var e = 32767 & i, h = i >> 15; --n >= 0;) {
            var u = 32767 & this[t],
                f = this[t++] >> 15,
                p = h * u + f * e;
            u = e * u + ((32767 & p) << 15) + r[o] + (1073741823 & s), s = (u >>> 30) + (p >>> 15) + h * f + (s >>> 30), r[o++] = 1073741823 & u
        }
        return s
    }

    function h(t, i, r, o, s, n) {
        for (var e = 16383 & i, h = i >> 14; --n >= 0;) {
            var u = 16383 & this[t],
                f = this[t++] >> 14,
                p = h * u + f * e;
            u = e * u + ((16383 & p) << 14) + r[o] + s, s = (u >> 28) + (p >> 14) + h * f, r[o++] = 268435455 & u
        }
        return s
    }

    function u(t) {
        return wi.charAt(t)
    }

    function f(t, i) {
        var r = Ai[t.charCodeAt(i)];
        return null == r ? -1 : r
    }

    function p(t) {
        for (var i = this.t - 1; i >= 0; --i) t[i] = this[i];
        t.t = this.t, t.s = this.s
    }

    function a(t) {
        this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
    }

    function c(t) {
        var i = s();
        return i.fromInt(t), i
    }

    function l(t, i) {
        var r;
        if (16 == i) r = 4;
        else if (8 == i) r = 3;
        else if (256 == i) r = 8;
        else if (2 == i) r = 1;
        else if (32 == i) r = 5;
        else {
            if (4 != i) return void this.fromRadix(t, i);
            r = 2
        }
        this.t = 0, this.s = 0;
        for (var s = t.length, n = !1, e = 0; --s >= 0;) {
            var h = 8 == r ? 255 & t[s] : f(t, s);
            0 > h ? "-" == t.charAt(s) && (n = !0) : (n = !1, 0 == e ? this[this.t++] = h : e + r > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - e) - 1) << e, this[this.t++] = h >> this.DB - e) : this[this.t - 1] |= h << e, e += r, e >= this.DB && (e -= this.DB))
        }
        8 == r && 0 != (128 & t[0]) && (this.s = -1, e > 0 && (this[this.t - 1] |= (1 << this.DB - e) - 1 << e)), this.clamp(), n && o.ZERO.subTo(this, this)
    }

    function m() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
    }

    function v(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var i;
        if (16 == t) i = 4;
        else if (8 == t) i = 3;
        else if (2 == t) i = 1;
        else if (32 == t) i = 5;
        else {
            if (4 != t) return this.toRadix(t);
            i = 2
        }
        var r, o = (1 << i) - 1,
            s = !1,
            n = "",
            e = this.t,
            h = this.DB - e * this.DB % i;
        if (e-- > 0)
            for (h < this.DB && (r = this[e] >> h) > 0 && (s = !0, n = u(r)); e >= 0;) i > h ? (r = (this[e] & (1 << h) - 1) << i - h, r |= this[--e] >> (h += this.DB - i)) : (r = this[e] >> (h -= i) & o, 0 >= h && (h += this.DB, --e)), r > 0 && (s = !0), s && (n += u(r));
        return s ? n : "0"
    }

    function y() {
        var t = s();
        return o.ZERO.subTo(this, t), t
    }

    function T() {
        return this.s < 0 ? this.negate() : this
    }

    function d(t) {
        var i = this.s - t.s;
        if (0 != i) return i;
        var r = this.t;
        if (i = r - t.t, 0 != i) return this.s < 0 ? -i : i;
        for (; --r >= 0;)
            if (0 != (i = this[r] - t[r])) return i;
        return 0
    }

    function D(t) {
        var i, r = 1;
        return 0 != (i = t >>> 16) && (t = i, r += 16), 0 != (i = t >> 8) && (t = i, r += 8), 0 != (i = t >> 4) && (t = i, r += 4), 0 != (i = t >> 2) && (t = i, r += 2), 0 != (i = t >> 1) && (t = i, r += 1), r
    }

    function B() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + D(this[this.t - 1] ^ this.s & this.DM)
    }

    function g(t, i) {
        var r;
        for (r = this.t - 1; r >= 0; --r) i[r + t] = this[r];
        for (r = t - 1; r >= 0; --r) i[r] = 0;
        i.t = this.t + t, i.s = this.s
    }

    function b(t, i) {
        for (var r = t; r < this.t; ++r) i[r - t] = this[r];
        i.t = Math.max(this.t - t, 0), i.s = this.s
    }

    function S(t, i) {
        var r, o = t % this.DB,
            s = this.DB - o,
            n = (1 << s) - 1,
            e = Math.floor(t / this.DB),
            h = this.s << o & this.DM;
        for (r = this.t - 1; r >= 0; --r) i[r + e + 1] = this[r] >> s | h, h = (this[r] & n) << o;
        for (r = e - 1; r >= 0; --r) i[r] = 0;
        i[e] = h, i.t = this.t + e + 1, i.s = this.s, i.clamp()
    }

    function w(t, i) {
        i.s = this.s;
        var r = Math.floor(t / this.DB);
        if (r >= this.t) return void(i.t = 0);
        var o = t % this.DB,
            s = this.DB - o,
            n = (1 << o) - 1;
        i[0] = this[r] >> o;
        for (var e = r + 1; e < this.t; ++e) i[e - r - 1] |= (this[e] & n) << s, i[e - r] = this[e] >> o;
        o > 0 && (i[this.t - r - 1] |= (this.s & n) << s), i.t = this.t - r, i.clamp()
    }

    function A(t, i) {
        for (var r = 0, o = 0, s = Math.min(t.t, this.t); s > r;) o += this[r] - t[r], i[r++] = o & this.DM, o >>= this.DB;
        if (t.t < this.t) {
            for (o -= t.s; r < this.t;) o += this[r], i[r++] = o & this.DM, o >>= this.DB;
            o += this.s
        } else {
            for (o += this.s; r < t.t;) o -= t[r], i[r++] = o & this.DM, o >>= this.DB;
            o -= t.s
        }
        i.s = 0 > o ? -1 : 0, -1 > o ? i[r++] = this.DV + o : o > 0 && (i[r++] = o), i.t = r, i.clamp()
    }

    function E(t, i) {
        var r = this.abs(),
            s = t.abs(),
            n = r.t;
        for (i.t = n + s.t; --n >= 0;) i[n] = 0;
        for (n = 0; n < s.t; ++n) i[n + r.t] = r.am(0, s[n], i, n, 0, r.t);
        i.s = 0, i.clamp(), this.s != t.s && o.ZERO.subTo(i, i)
    }

    function M(t) {
        for (var i = this.abs(), r = t.t = 2 * i.t; --r >= 0;) t[r] = 0;
        for (r = 0; r < i.t - 1; ++r) {
            var o = i.am(r, i[r], t, 2 * r, 0, 1);
            (t[r + i.t] += i.am(r + 1, 2 * i[r], t, 2 * r + 1, o, i.t - r - 1)) >= i.DV && (t[r + i.t] -= i.DV, t[r + i.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += i.am(r, i[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
    }

    function R(t, i, r) {
        var n = t.abs();
        if (!(n.t <= 0)) {
            var e = this.abs();
            if (e.t < n.t) return null != i && i.fromInt(0), void(null != r && this.copyTo(r));
            null == r && (r = s());
            var h = s(),
                u = this.s,
                f = t.s,
                p = this.DB - D(n[n.t - 1]);
            p > 0 ? (n.lShiftTo(p, h), e.lShiftTo(p, r)) : (n.copyTo(h), e.copyTo(r));
            var a = h.t,
                c = h[a - 1];
            if (0 != c) {
                var l = c * (1 << this.F1) + (a > 1 ? h[a - 2] >> this.F2 : 0),
                    m = this.FV / l,
                    v = (1 << this.F1) / l,
                    y = 1 << this.F2,
                    T = r.t,
                    d = T - a,
                    B = null == i ? s() : i;
                for (h.dlShiftTo(d, B), r.compareTo(B) >= 0 && (r[r.t++] = 1, r.subTo(B, r)), o.ONE.dlShiftTo(a, B), B.subTo(h, h); h.t < a;) h[h.t++] = 0;
                for (; --d >= 0;) {
                    var g = r[--T] == c ? this.DM : Math.floor(r[T] * m + (r[T - 1] + y) * v);
                    if ((r[T] += h.am(0, g, r, d, 0, a)) < g)
                        for (h.dlShiftTo(d, B), r.subTo(B, r); r[T] < --g;) r.subTo(B, r)
                }
                null != i && (r.drShiftTo(a, i), u != f && o.ZERO.subTo(i, i)), r.t = a, r.clamp(), p > 0 && r.rShiftTo(p, r), 0 > u && o.ZERO.subTo(r, r)
            }
        }
    }

    function O(t) {
        var i = s();
        return this.abs().divRemTo(t, null, i), this.s < 0 && i.compareTo(o.ZERO) > 0 && t.subTo(i, i), i
    }

    function C(t) {
        this.m = t
    }

    function F(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }

    function q(t) {
        return t
    }

    function V(t) {
        t.divRemTo(this.m, null, t)
    }

    function x(t, i, r) {
        t.multiplyTo(i, r), this.reduce(r)
    }

    function N(t, i) {
        t.squareTo(i), this.reduce(i)
    }

    function I() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var i = 3 & t;
        return i = i * (2 - (15 & t) * i) & 15, i = i * (2 - (255 & t) * i) & 255, i = i * (2 - ((65535 & t) * i & 65535)) & 65535, i = i * (2 - t * i % this.DV) % this.DV, i > 0 ? this.DV - i : -i
    }

    function L(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
    }

    function P(t) {
        var i = s();
        return t.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), t.s < 0 && i.compareTo(o.ZERO) > 0 && this.m.subTo(i, i), i
    }

    function Z(t) {
        var i = s();
        return t.copyTo(i), this.reduce(i), i
    }

    function j(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var r = 32767 & t[i],
                o = r * this.mpl + ((r * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (r = i + this.m.t, t[r] += this.m.am(0, o, t, i, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }

    function k(t, i) {
        t.squareTo(i), this.reduce(i)
    }

    function z(t, i, r) {
        t.multiplyTo(i, r), this.reduce(r)
    }

    function U() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }

    function G(t, i) {
        if (t > 4294967295 || 1 > t) return o.ONE;
        var r = s(),
            n = s(),
            e = i.convert(this),
            h = D(t) - 1;
        for (e.copyTo(r); --h >= 0;)
            if (i.sqrTo(r, n), (t & 1 << h) > 0) i.mulTo(n, e, r);
            else {
                var u = r;
                r = n, n = u
            }
        return i.revert(r)
    }

    function H(t, i) {
        var r;
        return r = 256 > t || i.isEven() ? new C(i) : new L(i), this.exp(t, r)
    }

    function J() {
        var t = s();
        return this.copyTo(t), t
    }

    function K() {
        if (this.s < 0) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1
        } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }

    function Q() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24
    }

    function W() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16
    }

    function X(t) {
        return Math.floor(Math.LN2 * this.DB / Math.log(t))
    }

    function Y() {
        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
    }

    function $(t) {
        if (null == t && (t = 10), 0 == this.signum() || 2 > t || t > 36) return "0";
        var i = this.chunkSize(t),
            r = Math.pow(t, i),
            o = c(r),
            n = s(),
            e = s(),
            h = "";
        for (this.divRemTo(o, n, e); n.signum() > 0;) h = (r + e.intValue()).toString(t).substr(1) + h, n.divRemTo(o, n, e);
        return e.intValue().toString(t) + h
    }

    function _(t, i) {
        this.fromInt(0), null == i && (i = 10);
        for (var r = this.chunkSize(i), s = Math.pow(i, r), n = !1, e = 0, h = 0, u = 0; u < t.length; ++u) {
            var p = f(t, u);
            0 > p ? "-" == t.charAt(u) && 0 == this.signum() && (n = !0) : (h = i * h + p, ++e >= r && (this.dMultiply(s), this.dAddOffset(h, 0), e = 0, h = 0))
        }
        e > 0 && (this.dMultiply(Math.pow(i, e)), this.dAddOffset(h, 0)), n && o.ZERO.subTo(this, this)
    }

    function tt(t, i, r) {
        if ("number" == typeof i)
            if (2 > t) this.fromInt(1);
            else
                for (this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(o.ONE.shiftLeft(t - 1), ut, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(i);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(o.ONE.shiftLeft(t - 1), this);
        else {
            var s = new Array,
                n = 7 & t;
            s.length = (t >> 3) + 1, i.nextBytes(s), n > 0 ? s[0] &= (1 << n) - 1 : s[0] = 0, this.fromString(s, 256)
        }
    }

    function it() {
        var t = this.t,
            i = new Array;
        i[0] = this.s;
        var r, o = this.DB - t * this.DB % 8,
            s = 0;
        if (t-- > 0)
            for (o < this.DB && (r = this[t] >> o) != (this.s & this.DM) >> o && (i[s++] = r | this.s << this.DB - o); t >= 0;) 8 > o ? (r = (this[t] & (1 << o) - 1) << 8 - o, r |= this[--t] >> (o += this.DB - 8)) : (r = this[t] >> (o -= 8) & 255, 0 >= o && (o += this.DB, --t)), 0 != (128 & r) && (r |= -256), 0 == s && (128 & this.s) != (128 & r) && ++s, (s > 0 || r != this.s) && (i[s++] = r);
        return i
    }

    function rt(t) {
        return 0 == this.compareTo(t)
    }

    function ot(t) {
        return this.compareTo(t) < 0 ? this : t
    }

    function st(t) {
        return this.compareTo(t) > 0 ? this : t
    }

    function nt(t, i, r) {
        var o, s, n = Math.min(t.t, this.t);
        for (o = 0; n > o; ++o) r[o] = i(this[o], t[o]);
        if (t.t < this.t) {
            for (s = t.s & this.DM, o = n; o < this.t; ++o) r[o] = i(this[o], s);
            r.t = this.t
        } else {
            for (s = this.s & this.DM, o = n; o < t.t; ++o) r[o] = i(s, t[o]);
            r.t = t.t
        }
        r.s = i(this.s, t.s), r.clamp()
    }

    function et(t, i) {
        return t & i
    }

    function ht(t) {
        var i = s();
        return this.bitwiseTo(t, et, i), i
    }

    function ut(t, i) {
        return t | i
    }

    function ft(t) {
        var i = s();
        return this.bitwiseTo(t, ut, i), i
    }

    function pt(t, i) {
        return t ^ i
    }

    function at(t) {
        var i = s();
        return this.bitwiseTo(t, pt, i), i
    }

    function ct(t, i) {
        return t & ~i
    }

    function lt(t) {
        var i = s();
        return this.bitwiseTo(t, ct, i), i
    }

    function mt() {
        for (var t = s(), i = 0; i < this.t; ++i) t[i] = this.DM & ~this[i];
        return t.t = this.t, t.s = ~this.s, t
    }

    function vt(t) {
        var i = s();
        return 0 > t ? this.rShiftTo(-t, i) : this.lShiftTo(t, i), i
    }

    function yt(t) {
        var i = s();
        return 0 > t ? this.lShiftTo(-t, i) : this.rShiftTo(t, i), i
    }

    function Tt(t) {
        if (0 == t) return -1;
        var i = 0;
        return 0 == (65535 & t) && (t >>= 16, i += 16), 0 == (255 & t) && (t >>= 8, i += 8), 0 == (15 & t) && (t >>= 4, i += 4), 0 == (3 & t) && (t >>= 2, i += 2), 0 == (1 & t) && ++i, i
    }

    function dt() {
        for (var t = 0; t < this.t; ++t)
            if (0 != this[t]) return t * this.DB + Tt(this[t]);
        return this.s < 0 ? this.t * this.DB : -1
    }

    function Dt(t) {
        for (var i = 0; 0 != t;) t &= t - 1, ++i;
        return i
    }

    function Bt() {
        for (var t = 0, i = this.s & this.DM, r = 0; r < this.t; ++r) t += Dt(this[r] ^ i);
        return t
    }

    function gt(t) {
        var i = Math.floor(t / this.DB);
        return i >= this.t ? 0 != this.s : 0 != (this[i] & 1 << t % this.DB)
    }

    function bt(t, i) {
        var r = o.ONE.shiftLeft(t);
        return this.bitwiseTo(r, i, r), r
    }

    function St(t) {
        return this.changeBit(t, ut)
    }

    function wt(t) {
        return this.changeBit(t, ct)
    }

    function At(t) {
        return this.changeBit(t, pt)
    }

    function Et(t, i) {
        for (var r = 0, o = 0, s = Math.min(t.t, this.t); s > r;) o += this[r] + t[r], i[r++] = o & this.DM, o >>= this.DB;
        if (t.t < this.t) {
            for (o += t.s; r < this.t;) o += this[r], i[r++] = o & this.DM, o >>= this.DB;
            o += this.s
        } else {
            for (o += this.s; r < t.t;) o += t[r], i[r++] = o & this.DM, o >>= this.DB;
            o += t.s
        }
        i.s = 0 > o ? -1 : 0, o > 0 ? i[r++] = o : -1 > o && (i[r++] = this.DV + o), i.t = r, i.clamp()
    }

    function Mt(t) {
        var i = s();
        return this.addTo(t, i), i
    }

    function Rt(t) {
        var i = s();
        return this.subTo(t, i), i
    }

    function Ot(t) {
        var i = s();
        return this.multiplyTo(t, i), i
    }

    function Ct() {
        var t = s();
        return this.squareTo(t), t
    }

    function Ft(t) {
        var i = s();
        return this.divRemTo(t, i, null), i
    }

    function qt(t) {
        var i = s();
        return this.divRemTo(t, null, i), i
    }

    function Vt(t) {
        var i = s(),
            r = s();
        return this.divRemTo(t, i, r), new Array(i, r)
    }

    function xt(t) {
        this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
    }

    function Nt(t, i) {
        if (0 != t) {
            for (; this.t <= i;) this[this.t++] = 0;
            for (this[i] += t; this[i] >= this.DV;) this[i] -= this.DV, ++i >= this.t && (this[this.t++] = 0), ++this[i]
        }
    }

    function It() {}

    function Lt(t) {
        return t
    }

    function Pt(t, i, r) {
        t.multiplyTo(i, r)
    }

    function Zt(t, i) {
        t.squareTo(i)
    }

    function jt(t) {
        return this.exp(t, new It)
    }

    function kt(t, i, r) {
        var o = Math.min(this.t + t.t, i);
        for (r.s = 0, r.t = o; o > 0;) r[--o] = 0;
        var s;
        for (s = r.t - this.t; s > o; ++o) r[o + this.t] = this.am(0, t[o], r, o, 0, this.t);
        for (s = Math.min(t.t, i); s > o; ++o) this.am(0, t[o], r, o, 0, i - o);
        r.clamp()
    }

    function zt(t, i, r) {
        --i;
        var o = r.t = this.t + t.t - i;
        for (r.s = 0; --o >= 0;) r[o] = 0;
        for (o = Math.max(i - this.t, 0); o < t.t; ++o) r[this.t + o - i] = this.am(i - o, t[o], r, 0, 0, this.t + o - i);
        r.clamp(), r.drShiftTo(1, r)
    }

    function Ut(t) {
        this.r2 = s(), this.q3 = s(), o.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
    }

    function Gt(t) {
        if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
        if (t.compareTo(this.m) < 0) return t;
        var i = s();
        return t.copyTo(i), this.reduce(i), i
    }

    function Ht(t) {
        return t
    }

    function Jt(t) {
        for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
    }

    function Kt(t, i) {
        t.squareTo(i), this.reduce(i)
    }

    function Qt(t, i, r) {
        t.multiplyTo(i, r), this.reduce(r)
    }

    function Wt(t, i) {
        var r, o, n = t.bitLength(),
            e = c(1);
        if (0 >= n) return e;
        r = 18 > n ? 1 : 48 > n ? 3 : 144 > n ? 4 : 768 > n ? 5 : 6, o = 8 > n ? new C(i) : i.isEven() ? new Ut(i) : new L(i);
        var h = new Array,
            u = 3,
            f = r - 1,
            p = (1 << r) - 1;
        if (h[1] = o.convert(this), r > 1) {
            var a = s();
            for (o.sqrTo(h[1], a); p >= u;) h[u] = s(), o.mulTo(a, h[u - 2], h[u]), u += 2
        }
        var l, m, v = t.t - 1,
            y = !0,
            T = s();
        for (n = D(t[v]) - 1; v >= 0;) {
            for (n >= f ? l = t[v] >> n - f & p : (l = (t[v] & (1 << n + 1) - 1) << f - n, v > 0 && (l |= t[v - 1] >> this.DB + n - f)), u = r; 0 == (1 & l);) l >>= 1, --u;
            if ((n -= u) < 0 && (n += this.DB, --v), y) h[l].copyTo(e), y = !1;
            else {
                for (; u > 1;) o.sqrTo(e, T), o.sqrTo(T, e), u -= 2;
                u > 0 ? o.sqrTo(e, T) : (m = e, e = T, T = m), o.mulTo(T, h[l], e)
            }
            for (; v >= 0 && 0 == (t[v] & 1 << n);) o.sqrTo(e, T), m = e, e = T, T = m, --n < 0 && (n = this.DB - 1, --v)
        }
        return o.revert(e)
    }

    function Xt(t) {
        var i = this.s < 0 ? this.negate() : this.clone(),
            r = t.s < 0 ? t.negate() : t.clone();
        if (i.compareTo(r) < 0) {
            var o = i;
            i = r, r = o
        }
        var s = i.getLowestSetBit(),
            n = r.getLowestSetBit();
        if (0 > n) return i;
        for (n > s && (n = s), n > 0 && (i.rShiftTo(n, i), r.rShiftTo(n, r)); i.signum() > 0;)(s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i), (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r), i.compareTo(r) >= 0 ? (i.subTo(r, i), i.rShiftTo(1, i)) : (r.subTo(i, r), r.rShiftTo(1, r));
        return n > 0 && r.lShiftTo(n, r), r
    }

    function Yt(t) {
        if (0 >= t) return 0;
        var i = this.DV % t,
            r = this.s < 0 ? t - 1 : 0;
        if (this.t > 0)
            if (0 == i) r = this[0] % t;
            else
                for (var o = this.t - 1; o >= 0; --o) r = (i * r + this[o]) % t;
        return r
    }

    function $t(t) {
        var i = t.isEven();
        if (this.isEven() && i || 0 == t.signum()) return o.ZERO;
        for (var r = t.clone(), s = this.clone(), n = c(1), e = c(0), h = c(0), u = c(1); 0 != r.signum();) {
            for (; r.isEven();) r.rShiftTo(1, r), i ? (n.isEven() && e.isEven() || (n.addTo(this, n), e.subTo(t, e)), n.rShiftTo(1, n)) : e.isEven() || e.subTo(t, e), e.rShiftTo(1, e);
            for (; s.isEven();) s.rShiftTo(1, s), i ? (h.isEven() && u.isEven() || (h.addTo(this, h), u.subTo(t, u)), h.rShiftTo(1, h)) : u.isEven() || u.subTo(t, u), u.rShiftTo(1, u);
            r.compareTo(s) >= 0 ? (r.subTo(s, r), i && n.subTo(h, n), e.subTo(u, e)) : (s.subTo(r, s), i && h.subTo(n, h), u.subTo(e, u))
        }
        return 0 != s.compareTo(o.ONE) ? o.ZERO : u.compareTo(t) >= 0 ? u.subtract(t) : u.signum() < 0 ? (u.addTo(t, u), u.signum() < 0 ? u.add(t) : u) : u
    }

    function _t(t) {
        var i, r = this.abs();
        if (1 == r.t && r[0] <= Ei[Ei.length - 1]) {
            for (i = 0; i < Ei.length; ++i)
                if (r[0] == Ei[i]) return !0;
            return !1
        }
        if (r.isEven()) return !1;
        for (i = 1; i < Ei.length;) {
            for (var o = Ei[i], s = i + 1; s < Ei.length && Mi > o;) o *= Ei[s++];
            for (o = r.modInt(o); s > i;)
                if (o % Ei[i++] == 0) return !1
        }
        return r.millerRabin(t)
    }

    function ti(t) {
        var i = this.subtract(o.ONE),
            r = i.getLowestSetBit();
        if (0 >= r) return !1;
        var n = i.shiftRight(r);
        t = t + 1 >> 1, t > Ei.length && (t = Ei.length);
        for (var e = s(), h = 0; t > h; ++h) {
            e.fromInt(Ei[Math.floor(Math.random() * Ei.length)]);
            var u = e.modPow(n, this);
            if (0 != u.compareTo(o.ONE) && 0 != u.compareTo(i)) {
                for (var f = 1; f++ < r && 0 != u.compareTo(i);)
                    if (u = u.modPowInt(2, this), 0 == u.compareTo(o.ONE)) return !1;
                if (0 != u.compareTo(i)) return !1
            }
        }
        return !0
    }

    function ii() {
        this.i = 0, this.j = 0, this.S = new Array
    }

    function ri(t) {
        var i, r, o;
        for (i = 0; 256 > i; ++i) this.S[i] = i;
        for (r = 0, i = 0; 256 > i; ++i) r = r + this.S[i] + t[i % t.length] & 255, o = this.S[i], this.S[i] = this.S[r], this.S[r] = o;
        this.i = 0, this.j = 0
    }

    function oi() {
        var t;
        return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
    }

    function si() {
        return new ii
    }

    function ni(t) {
        Oi[Ci++] ^= 255 & t, Oi[Ci++] ^= t >> 8 & 255, Oi[Ci++] ^= t >> 16 & 255, Oi[Ci++] ^= t >> 24 & 255, Ci >= Fi && (Ci -= Fi)
    }

    function ei() {
        ni((new Date).getTime())
    }

    function hi() {
        if (null == Ri) {
            for (ei(), Ri = si(), Ri.init(Oi), Ci = 0; Ci < Oi.length; ++Ci) Oi[Ci] = 0;
            Ci = 0
        }
        return Ri.next()
    }

    function ui(t) {
        var i;
        for (i = 0; i < t.length; ++i) t[i] = hi()
    }

    function fi() {}

    function pi(t, i) {
        return new o(t, i)
    }

    function ai(t, i) {
        if (i < t.length + 11) return alert("Message too long for RSA"), null;
        for (var r = new Array, s = t.length - 1; s >= 0 && i > 0;) {
            var n = t.charCodeAt(s--);
            128 > n ? r[--i] = n : n > 127 && 2048 > n ? (r[--i] = 63 & n | 128, r[--i] = n >> 6 | 192) : (r[--i] = 63 & n | 128, r[--i] = n >> 6 & 63 | 128, r[--i] = n >> 12 | 224)
        }
        r[--i] = 0;
        for (var e = new fi, h = new Array; i > 2;) {
            for (h[0] = 0; 0 == h[0];) e.nextBytes(h);
            r[--i] = h[0]
        }
        return r[--i] = 2, r[--i] = 0, new o(r)
    }

    function ci() {
        this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
    }

    function li(t, i) {
        null != t && null != i && t.length > 0 && i.length > 0 ? (this.n = pi(t, 16), this.e = parseInt(i, 16)) : alert("Invalid RSA public key")
    }

    function mi(t) {
        return t.modPowInt(this.e, this.n)
    }

    function vi(t) {
        var i = ai(t, this.n.bitLength() + 7 >> 3);
        if (null == i) return null;
        var r = this.doPublic(i);
        if (null == r) return null;
        var o = r.toString(16);
        return 0 == (1 & o.length) ? o : "0" + o
    }

    function yi(t) {
        var i, r, o = "";
        for (i = 0; i + 3 <= t.length; i += 3) r = parseInt(t.substring(i, i + 3), 16), o += Ni.charAt(r >> 6) + Ni.charAt(63 & r);
        for (i + 1 == t.length ? (r = parseInt(t.substring(i, i + 1), 16), o += Ni.charAt(r << 2)) : i + 2 == t.length && (r = parseInt(t.substring(i, i + 2), 16), o += Ni.charAt(r >> 2) + Ni.charAt((3 & r) << 4));
            (3 & o.length) > 0;) o += Ii;
        return o
    }

    function Ti(t, r) {
        var i = new ci;
        // if (!r) {
        //   r = "DD6D6E6EF7C05FEBC442A06BC873EFB0F4283BA887FD8A6033D17BFC2D2DB506A17F75A112434A28BB53C73973C6B471BF41B7E729C1ABD8942736E8A87A99BF847898C62CD336A3BF687B5B0BC581AC5732B40F94691F3B5115C6A8B98E4C1FDF81C6E35893D19AB8C8DACCF9179B31288F59A61C2D3C2B2FED368CFB3B739D";
        // }
        return i.setPublic(r, "10001"), yi(i.encrypt(t))
    }
    var di, Di = 0xdeadbeefcafe,
        Bi = 15715070 == (16777215 & Di);
    Bi && "Microsoft Internet Explorer" == navigator.appName ? (o.prototype.am = e, di = 30) : Bi && "Netscape" != navigator.appName ? (o.prototype.am = n, di = 26) : (o.prototype.am = h, di = 28), o.prototype.DB = di, o.prototype.DM = (1 << di) - 1, o.prototype.DV = 1 << di;
    var gi = 52;
    o.prototype.FV = Math.pow(2, gi), o.prototype.F1 = gi - di, o.prototype.F2 = 2 * di - gi;
    var bi, Si, wi = "0123456789abcdefghijklmnopqrstuvwxyz",
        Ai = new Array;
    for (bi = "0".charCodeAt(0), Si = 0; 9 >= Si; ++Si) Ai[bi++] = Si;
    for (bi = "a".charCodeAt(0), Si = 10; 36 > Si; ++Si) Ai[bi++] = Si;
    for (bi = "A".charCodeAt(0), Si = 10; 36 > Si; ++Si) Ai[bi++] = Si;
    C.prototype.convert = F, C.prototype.revert = q, C.prototype.reduce = V, C.prototype.mulTo = x, C.prototype.sqrTo = N, L.prototype.convert = P, L.prototype.revert = Z, L.prototype.reduce = j, L.prototype.mulTo = z, L.prototype.sqrTo = k, o.prototype.copyTo = p, o.prototype.fromInt = a, o.prototype.fromString = l, o.prototype.clamp = m, o.prototype.dlShiftTo = g, o.prototype.drShiftTo = b, o.prototype.lShiftTo = S, o.prototype.rShiftTo = w, o.prototype.subTo = A, o.prototype.multiplyTo = E, o.prototype.squareTo = M, o.prototype.divRemTo = R, o.prototype.invDigit = I, o.prototype.isEven = U, o.prototype.exp = G, o.prototype.toString = v, o.prototype.negate = y, o.prototype.abs = T, o.prototype.compareTo = d, o.prototype.bitLength = B, o.prototype.mod = O, o.prototype.modPowInt = H, o.ZERO = c(0), o.ONE = c(1), It.prototype.convert = Lt, It.prototype.revert = Lt, It.prototype.mulTo = Pt, It.prototype.sqrTo = Zt, Ut.prototype.convert = Gt, Ut.prototype.revert = Ht, Ut.prototype.reduce = Jt, Ut.prototype.mulTo = Qt, Ut.prototype.sqrTo = Kt;
    var Ei = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
        Mi = (1 << 26) / Ei[Ei.length - 1];
    o.prototype.chunkSize = X, o.prototype.toRadix = $, o.prototype.fromRadix = _, o.prototype.fromNumber = tt, o.prototype.bitwiseTo = nt, o.prototype.changeBit = bt, o.prototype.addTo = Et, o.prototype.dMultiply = xt, o.prototype.dAddOffset = Nt, o.prototype.multiplyLowerTo = kt, o.prototype.multiplyUpperTo = zt, o.prototype.modInt = Yt, o.prototype.millerRabin = ti, o.prototype.clone = J, o.prototype.intValue = K, o.prototype.byteValue = Q, o.prototype.shortValue = W, o.prototype.signum = Y, o.prototype.toByteArray = it, o.prototype.equals = rt, o.prototype.min = ot, o.prototype.max = st, o.prototype.and = ht, o.prototype.or = ft, o.prototype.xor = at, o.prototype.andNot = lt, o.prototype.not = mt, o.prototype.shiftLeft = vt, o.prototype.shiftRight = yt, o.prototype.getLowestSetBit = dt, o.prototype.bitCount = Bt, o.prototype.testBit = gt, o.prototype.setBit = St, o.prototype.clearBit = wt, o.prototype.flipBit = At, o.prototype.add = Mt, o.prototype.subtract = Rt, o.prototype.multiply = Ot, o.prototype.divide = Ft, o.prototype.remainder = qt, o.prototype.divideAndRemainder = Vt, o.prototype.modPow = Wt, o.prototype.modInverse = $t, o.prototype.pow = jt, o.prototype.gcd = Xt, o.prototype.isProbablePrime = _t, o.prototype.square = Ct, ii.prototype.init = ri, ii.prototype.next = oi;
    var Ri, Oi, Ci, Fi = 256;
    if (null == Oi) {
        Oi = new Array, Ci = 0;
        var qi;
        if (window.crypto && window.crypto.getRandomValues) {
            var Vi = new Uint8Array(32);
            for (window.crypto.getRandomValues(Vi), qi = 0; 32 > qi; ++qi) Oi[Ci++] = Vi[qi]
        }
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
            var xi = window.crypto.random(32);
            for (qi = 0; qi < xi.length; ++qi) Oi[Ci++] = 255 & xi.charCodeAt(qi)
        }
        for (; Fi > Ci;) qi = Math.floor(65536 * Math.random()), Oi[Ci++] = qi >>> 8, Oi[Ci++] = 255 & qi;
        Ci = 0, ei()
    }
    fi.prototype.nextBytes = ui, ci.prototype.doPublic = mi, ci.prototype.setPublic = li, ci.prototype.encrypt = vi;
    var Ni = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        Ii = "=";
    return Ti
});
