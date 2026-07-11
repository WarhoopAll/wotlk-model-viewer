// vendor/viewer.min.js
(() => {
  var t = {
    591: (t2, e2, i2) => {
      var r = {};
      (0, i2(236).assign)(r, i2(555), i2(843), i2(619)), t2.exports = r;
    },
    555: (t2, e2, i2) => {
      var r = i2(405), n = i2(236), a = i2(373), s = i2(898), o = i2(292), l = Object.prototype.toString;
      function h(t3) {
        if (!(this instanceof h)) return new h(t3);
        this.options = n.assign({
          level: -1,
          method: 8,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: 0,
          to: ""
        }, t3 || {});
        var e3 = this.options;
        e3.raw && e3.windowBits > 0 ? e3.windowBits = -e3.windowBits : e3.gzip && e3.windowBits > 0 && e3.windowBits < 16 && (e3.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new o(), this.strm.avail_out = 0;
        var i3 = r.deflateInit2(this.strm, e3.level, e3.method, e3.windowBits, e3.memLevel, e3.strategy);
        if (0 !== i3) throw new Error(s[i3]);
        if (e3.header && r.deflateSetHeader(this.strm, e3.header), e3.dictionary) {
          var u2;
          if (u2 = "string" == typeof e3.dictionary ? a.string2buf(e3.dictionary) : "[object ArrayBuffer]" === l.call(e3.dictionary) ? new Uint8Array(e3.dictionary) : e3.dictionary, 0 !== (i3 = r.deflateSetDictionary(this.strm, u2))) throw new Error(s[i3]);
          this._dict_set = true;
        }
      }
      function u(t3, e3) {
        var i3 = new h(e3);
        if (i3.push(t3, true), i3.err) throw i3.msg || s[i3.err];
        return i3.result;
      }
      h.prototype.push = function(t3, e3) {
        var i3, s2, o2 = this.strm, h2 = this.options.chunkSize;
        if (this.ended) return false;
        s2 = e3 === ~~e3 ? e3 : true === e3 ? 4 : 0, "string" == typeof t3 ? o2.input = a.string2buf(t3) : "[object ArrayBuffer]" === l.call(t3) ? o2.input = new Uint8Array(t3) : o2.input = t3, o2.next_in = 0, o2.avail_in = o2.input.length;
        do {
          if (0 === o2.avail_out && (o2.output = new n.Buf8(h2), o2.next_out = 0, o2.avail_out = h2), 1 !== (i3 = r.deflate(o2, s2)) && 0 !== i3) return this.onEnd(i3), this.ended = true, false;
          0 !== o2.avail_out && (0 !== o2.avail_in || 4 !== s2 && 2 !== s2) || ("string" === this.options.to ? this.onData(a.buf2binstring(n.shrinkBuf(o2.output, o2.next_out))) : this.onData(n.shrinkBuf(o2.output, o2.next_out)));
        } while ((o2.avail_in > 0 || 0 === o2.avail_out) && 1 !== i3);
        return 4 === s2 ? (i3 = r.deflateEnd(this.strm), this.onEnd(i3), this.ended = true, 0 === i3) : 2 !== s2 || (this.onEnd(0), o2.avail_out = 0, true);
      }, h.prototype.onData = function(t3) {
        this.chunks.push(t3);
      }, h.prototype.onEnd = function(t3) {
        0 === t3 && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = t3, this.msg = this.strm.msg;
      }, e2.Deflate = h, e2.deflate = u, e2.deflateRaw = function(t3, e3) {
        return (e3 = e3 || {}).raw = true, u(t3, e3);
      }, e2.gzip = function(t3, e3) {
        return (e3 = e3 || {}).gzip = true, u(t3, e3);
      };
    },
    843: (t2, e2, i2) => {
      var r = i2(948), n = i2(236), a = i2(373), s = i2(619), o = i2(898), l = i2(292), h = i2(401), u = Object.prototype.toString;
      function c(t3) {
        if (!(this instanceof c)) return new c(t3);
        this.options = n.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t3 || {});
        var e3 = this.options;
        e3.raw && e3.windowBits >= 0 && e3.windowBits < 16 && (e3.windowBits = -e3.windowBits, 0 === e3.windowBits && (e3.windowBits = -15)), !(e3.windowBits >= 0 && e3.windowBits < 16) || t3 && t3.windowBits || (e3.windowBits += 32), e3.windowBits > 15 && e3.windowBits < 48 && 0 == (15 & e3.windowBits) && (e3.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new l(), this.strm.avail_out = 0;
        var i3 = r.inflateInit2(this.strm, e3.windowBits);
        if (i3 !== s.Z_OK) throw new Error(o[i3]);
        if (this.header = new h(), r.inflateGetHeader(this.strm, this.header), e3.dictionary && ("string" == typeof e3.dictionary ? e3.dictionary = a.string2buf(e3.dictionary) : "[object ArrayBuffer]" === u.call(e3.dictionary) && (e3.dictionary = new Uint8Array(e3.dictionary)), e3.raw && (i3 = r.inflateSetDictionary(this.strm, e3.dictionary)) !== s.Z_OK)) throw new Error(o[i3]);
      }
      function f(t3, e3) {
        var i3 = new c(e3);
        if (i3.push(t3, true), i3.err) throw i3.msg || o[i3.err];
        return i3.result;
      }
      c.prototype.push = function(t3, e3) {
        var i3, o2, l2, h2, c2, f2 = this.strm, d = this.options.chunkSize, b = this.options.dictionary, g = false;
        if (this.ended) return false;
        o2 = e3 === ~~e3 ? e3 : true === e3 ? s.Z_FINISH : s.Z_NO_FLUSH, "string" == typeof t3 ? f2.input = a.binstring2buf(t3) : "[object ArrayBuffer]" === u.call(t3) ? f2.input = new Uint8Array(t3) : f2.input = t3, f2.next_in = 0, f2.avail_in = f2.input.length;
        do {
          if (0 === f2.avail_out && (f2.output = new n.Buf8(d), f2.next_out = 0, f2.avail_out = d), (i3 = r.inflate(f2, s.Z_NO_FLUSH)) === s.Z_NEED_DICT && b && (i3 = r.inflateSetDictionary(this.strm, b)), i3 === s.Z_BUF_ERROR && true === g && (i3 = s.Z_OK, g = false), i3 !== s.Z_STREAM_END && i3 !== s.Z_OK) return this.onEnd(i3), this.ended = true, false;
          f2.next_out && (0 !== f2.avail_out && i3 !== s.Z_STREAM_END && (0 !== f2.avail_in || o2 !== s.Z_FINISH && o2 !== s.Z_SYNC_FLUSH) || ("string" === this.options.to ? (l2 = a.utf8border(f2.output, f2.next_out), h2 = f2.next_out - l2, c2 = a.buf2string(f2.output, l2), f2.next_out = h2, f2.avail_out = d - h2, h2 && n.arraySet(f2.output, f2.output, l2, h2, 0), this.onData(c2)) : this.onData(n.shrinkBuf(f2.output, f2.next_out)))), 0 === f2.avail_in && 0 === f2.avail_out && (g = true);
        } while ((f2.avail_in > 0 || 0 === f2.avail_out) && i3 !== s.Z_STREAM_END);
        return i3 === s.Z_STREAM_END && (o2 = s.Z_FINISH), o2 === s.Z_FINISH ? (i3 = r.inflateEnd(this.strm), this.onEnd(i3), this.ended = true, i3 === s.Z_OK) : o2 !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK), f2.avail_out = 0, true);
      }, c.prototype.onData = function(t3) {
        this.chunks.push(t3);
      }, c.prototype.onEnd = function(t3) {
        t3 === s.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = t3, this.msg = this.strm.msg;
      }, e2.Inflate = c, e2.inflate = f, e2.inflateRaw = function(t3, e3) {
        return (e3 = e3 || {}).raw = true, f(t3, e3);
      }, e2.ungzip = f;
    },
    236: (t2, e2) => {
      var i2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      function r(t3, e3) {
        return Object.prototype.hasOwnProperty.call(t3, e3);
      }
      e2.assign = function(t3) {
        for (var e3 = Array.prototype.slice.call(arguments, 1); e3.length; ) {
          var i3 = e3.shift();
          if (i3) {
            if ("object" != typeof i3) throw new TypeError(i3 + "must be non-object");
            for (var n2 in i3) r(i3, n2) && (t3[n2] = i3[n2]);
          }
        }
        return t3;
      }, e2.shrinkBuf = function(t3, e3) {
        return t3.length === e3 ? t3 : t3.subarray ? t3.subarray(0, e3) : (t3.length = e3, t3);
      };
      var n = {
        arraySet: function(t3, e3, i3, r2, n2) {
          if (e3.subarray && t3.subarray) t3.set(e3.subarray(i3, i3 + r2), n2);
          else for (var a2 = 0; a2 < r2; a2++) t3[n2 + a2] = e3[i3 + a2];
        },
        flattenChunks: function(t3) {
          var e3, i3, r2, n2, a2, s;
          for (r2 = 0, e3 = 0, i3 = t3.length; e3 < i3; e3++) r2 += t3[e3].length;
          for (s = new Uint8Array(r2), n2 = 0, e3 = 0, i3 = t3.length; e3 < i3; e3++) a2 = t3[e3], s.set(a2, n2), n2 += a2.length;
          return s;
        }
      }, a = {
        arraySet: function(t3, e3, i3, r2, n2) {
          for (var a2 = 0; a2 < r2; a2++) t3[n2 + a2] = e3[i3 + a2];
        },
        flattenChunks: function(t3) {
          return [].concat.apply([], t3);
        }
      };
      e2.setTyped = function(t3) {
        t3 ? (e2.Buf8 = Uint8Array, e2.Buf16 = Uint16Array, e2.Buf32 = Int32Array, e2.assign(e2, n)) : (e2.Buf8 = Array, e2.Buf16 = Array, e2.Buf32 = Array, e2.assign(e2, a));
      }, e2.setTyped(i2);
    },
    373: (t2, e2, i2) => {
      var r = i2(236), n = true, a = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (t3) {
        n = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (t3) {
        a = false;
      }
      for (var s = new r.Buf8(256), o = 0; o < 256; o++) s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;
      function l(t3, e3) {
        if (e3 < 65534 && (t3.subarray && a || !t3.subarray && n)) return String.fromCharCode.apply(null, r.shrinkBuf(t3, e3));
        for (var i3 = "", s2 = 0; s2 < e3; s2++) i3 += String.fromCharCode(t3[s2]);
        return i3;
      }
      s[254] = s[254] = 1, e2.string2buf = function(t3) {
        var e3, i3, n2, a2, s2, o2 = t3.length, l2 = 0;
        for (a2 = 0; a2 < o2; a2++) 55296 == (64512 & (i3 = t3.charCodeAt(a2))) && a2 + 1 < o2 && 56320 == (64512 & (n2 = t3.charCodeAt(a2 + 1))) && (i3 = 65536 + (i3 - 55296 << 10) + (n2 - 56320), a2++), l2 += i3 < 128 ? 1 : i3 < 2048 ? 2 : i3 < 65536 ? 3 : 4;
        for (e3 = new r.Buf8(l2), s2 = 0, a2 = 0; s2 < l2; a2++) 55296 == (64512 & (i3 = t3.charCodeAt(a2))) && a2 + 1 < o2 && 56320 == (64512 & (n2 = t3.charCodeAt(a2 + 1))) && (i3 = 65536 + (i3 - 55296 << 10) + (n2 - 56320), a2++), i3 < 128 ? e3[s2++] = i3 : i3 < 2048 ? (e3[s2++] = 192 | i3 >>> 6, e3[s2++] = 128 | 63 & i3) : i3 < 65536 ? (e3[s2++] = 224 | i3 >>> 12, e3[s2++] = 128 | i3 >>> 6 & 63, e3[s2++] = 128 | 63 & i3) : (e3[s2++] = 240 | i3 >>> 18, e3[s2++] = 128 | i3 >>> 12 & 63, e3[s2++] = 128 | i3 >>> 6 & 63, e3[s2++] = 128 | 63 & i3);
        return e3;
      }, e2.buf2binstring = function(t3) {
        return l(t3, t3.length);
      }, e2.binstring2buf = function(t3) {
        for (var e3 = new r.Buf8(t3.length), i3 = 0, n2 = e3.length; i3 < n2; i3++) e3[i3] = t3.charCodeAt(i3);
        return e3;
      }, e2.buf2string = function(t3, e3) {
        var i3, r2, n2, a2, o2 = e3 || t3.length, h = new Array(2 * o2);
        for (r2 = 0, i3 = 0; i3 < o2; ) if ((n2 = t3[i3++]) < 128) h[r2++] = n2;
        else if ((a2 = s[n2]) > 4) h[r2++] = 65533, i3 += a2 - 1;
        else {
          for (n2 &= 2 === a2 ? 31 : 3 === a2 ? 15 : 7; a2 > 1 && i3 < o2; ) n2 = n2 << 6 | 63 & t3[i3++], a2--;
          a2 > 1 ? h[r2++] = 65533 : n2 < 65536 ? h[r2++] = n2 : (n2 -= 65536, h[r2++] = 55296 | n2 >> 10 & 1023, h[r2++] = 56320 | 1023 & n2);
        }
        return l(h, r2);
      }, e2.utf8border = function(t3, e3) {
        var i3;
        for ((e3 = e3 || t3.length) > t3.length && (e3 = t3.length), i3 = e3 - 1; i3 >= 0 && 128 == (192 & t3[i3]); ) i3--;
        return i3 < 0 || 0 === i3 ? e3 : i3 + s[t3[i3]] > e3 ? i3 : e3;
      };
    },
    69: (t2) => {
      t2.exports = function(t3, e2, i2, r) {
        for (var n = 65535 & t3 | 0, a = t3 >>> 16 & 65535 | 0, s = 0; 0 !== i2; ) {
          i2 -= s = i2 > 2e3 ? 2e3 : i2;
          do {
            a = a + (n = n + e2[r++] | 0) | 0;
          } while (--s);
          n %= 65521, a %= 65521;
        }
        return n | a << 16 | 0;
      };
    },
    619: (t2) => {
      t2.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
      };
    },
    869: (t2) => {
      var e2 = (function() {
        for (var t3, e3 = [], i2 = 0; i2 < 256; i2++) {
          t3 = i2;
          for (var r = 0; r < 8; r++) t3 = 1 & t3 ? 3988292384 ^ t3 >>> 1 : t3 >>> 1;
          e3[i2] = t3;
        }
        return e3;
      })();
      t2.exports = function(t3, i2, r, n) {
        var a = e2, s = n + r;
        t3 ^= -1;
        for (var o = n; o < s; o++) t3 = t3 >>> 8 ^ a[255 & (t3 ^ i2[o])];
        return -1 ^ t3;
      };
    },
    405: (t2, e2, i2) => {
      var r, n = i2(236), a = i2(342), s = i2(69), o = i2(869), l = i2(898), h = -2, u = 258, c = 262, f = 103, d = 113, b = 666;
      function g(t3, e3) {
        return t3.msg = l[e3], e3;
      }
      function _(t3) {
        return (t3 << 1) - (t3 > 4 ? 9 : 0);
      }
      function p(t3) {
        for (var e3 = t3.length; --e3 >= 0; ) t3[e3] = 0;
      }
      function m(t3) {
        var e3 = t3.state, i3 = e3.pending;
        i3 > t3.avail_out && (i3 = t3.avail_out), 0 !== i3 && (n.arraySet(t3.output, e3.pending_buf, e3.pending_out, i3, t3.next_out), t3.next_out += i3, e3.pending_out += i3, t3.total_out += i3, t3.avail_out -= i3, e3.pending -= i3, 0 === e3.pending && (e3.pending_out = 0));
      }
      function v(t3, e3) {
        a._tr_flush_block(t3, t3.block_start >= 0 ? t3.block_start : -1, t3.strstart - t3.block_start, e3), t3.block_start = t3.strstart, m(t3.strm);
      }
      function x(t3, e3) {
        t3.pending_buf[t3.pending++] = e3;
      }
      function T(t3, e3) {
        t3.pending_buf[t3.pending++] = e3 >>> 8 & 255, t3.pending_buf[t3.pending++] = 255 & e3;
      }
      function w(t3, e3) {
        var i3, r2, n2 = t3.max_chain_length, a2 = t3.strstart, s2 = t3.prev_length, o2 = t3.nice_match, l2 = t3.strstart > t3.w_size - c ? t3.strstart - (t3.w_size - c) : 0, h2 = t3.window, f2 = t3.w_mask, d2 = t3.prev, b2 = t3.strstart + u, g2 = h2[a2 + s2 - 1], _2 = h2[a2 + s2];
        t3.prev_length >= t3.good_match && (n2 >>= 2), o2 > t3.lookahead && (o2 = t3.lookahead);
        do {
          if (h2[(i3 = e3) + s2] === _2 && h2[i3 + s2 - 1] === g2 && h2[i3] === h2[a2] && h2[++i3] === h2[a2 + 1]) {
            a2 += 2, i3++;
            do {
            } while (h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && h2[++a2] === h2[++i3] && a2 < b2);
            if (r2 = u - (b2 - a2), a2 = b2 - u, r2 > s2) {
              if (t3.match_start = e3, s2 = r2, r2 >= o2) break;
              g2 = h2[a2 + s2 - 1], _2 = h2[a2 + s2];
            }
          }
        } while ((e3 = d2[e3 & f2]) > l2 && 0 != --n2);
        return s2 <= t3.lookahead ? s2 : t3.lookahead;
      }
      function y(t3) {
        var e3, i3, r2, a2, l2, h2, u2, f2, d2, b2, g2 = t3.w_size;
        do {
          if (a2 = t3.window_size - t3.lookahead - t3.strstart, t3.strstart >= g2 + (g2 - c)) {
            n.arraySet(t3.window, t3.window, g2, g2, 0), t3.match_start -= g2, t3.strstart -= g2, t3.block_start -= g2, e3 = i3 = t3.hash_size;
            do {
              r2 = t3.head[--e3], t3.head[e3] = r2 >= g2 ? r2 - g2 : 0;
            } while (--i3);
            e3 = i3 = g2;
            do {
              r2 = t3.prev[--e3], t3.prev[e3] = r2 >= g2 ? r2 - g2 : 0;
            } while (--i3);
            a2 += g2;
          }
          if (0 === t3.strm.avail_in) break;
          if (h2 = t3.strm, u2 = t3.window, f2 = t3.strstart + t3.lookahead, d2 = a2, b2 = void 0, (b2 = h2.avail_in) > d2 && (b2 = d2), i3 = 0 === b2 ? 0 : (h2.avail_in -= b2, n.arraySet(u2, h2.input, h2.next_in, b2, f2), 1 === h2.state.wrap ? h2.adler = s(h2.adler, u2, b2, f2) : 2 === h2.state.wrap && (h2.adler = o(h2.adler, u2, b2, f2)), h2.next_in += b2, h2.total_in += b2, b2), t3.lookahead += i3, t3.lookahead + t3.insert >= 3) for (l2 = t3.strstart - t3.insert, t3.ins_h = t3.window[l2], t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[l2 + 1]) & t3.hash_mask; t3.insert && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[l2 + 3 - 1]) & t3.hash_mask, t3.prev[l2 & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = l2, l2++, t3.insert--, !(t3.lookahead + t3.insert < 3)); ) ;
        } while (t3.lookahead < c && 0 !== t3.strm.avail_in);
      }
      function A(t3, e3) {
        for (var i3, r2; ; ) {
          if (t3.lookahead < c) {
            if (y(t3), t3.lookahead < c && 0 === e3) return 1;
            if (0 === t3.lookahead) break;
          }
          if (i3 = 0, t3.lookahead >= 3 && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + 3 - 1]) & t3.hash_mask, i3 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart), 0 !== i3 && t3.strstart - i3 <= t3.w_size - c && (t3.match_length = w(t3, i3)), t3.match_length >= 3) if (r2 = a._tr_tally(t3, t3.strstart - t3.match_start, t3.match_length - 3), t3.lookahead -= t3.match_length, t3.match_length <= t3.max_lazy_match && t3.lookahead >= 3) {
            t3.match_length--;
            do {
              t3.strstart++, t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + 3 - 1]) & t3.hash_mask, i3 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart;
            } while (0 != --t3.match_length);
            t3.strstart++;
          } else t3.strstart += t3.match_length, t3.match_length = 0, t3.ins_h = t3.window[t3.strstart], t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + 1]) & t3.hash_mask;
          else r2 = a._tr_tally(t3, 0, t3.window[t3.strstart]), t3.lookahead--, t3.strstart++;
          if (r2 && (v(t3, false), 0 === t3.strm.avail_out)) return 1;
        }
        return t3.insert = t3.strstart < 2 ? t3.strstart : 2, 4 === e3 ? (v(t3, true), 0 === t3.strm.avail_out ? 3 : 4) : t3.last_lit && (v(t3, false), 0 === t3.strm.avail_out) ? 1 : 2;
      }
      function E(t3, e3) {
        for (var i3, r2, n2; ; ) {
          if (t3.lookahead < c) {
            if (y(t3), t3.lookahead < c && 0 === e3) return 1;
            if (0 === t3.lookahead) break;
          }
          if (i3 = 0, t3.lookahead >= 3 && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + 3 - 1]) & t3.hash_mask, i3 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart), t3.prev_length = t3.match_length, t3.prev_match = t3.match_start, t3.match_length = 2, 0 !== i3 && t3.prev_length < t3.max_lazy_match && t3.strstart - i3 <= t3.w_size - c && (t3.match_length = w(t3, i3), t3.match_length <= 5 && (1 === t3.strategy || 3 === t3.match_length && t3.strstart - t3.match_start > 4096) && (t3.match_length = 2)), t3.prev_length >= 3 && t3.match_length <= t3.prev_length) {
            n2 = t3.strstart + t3.lookahead - 3, r2 = a._tr_tally(t3, t3.strstart - 1 - t3.prev_match, t3.prev_length - 3), t3.lookahead -= t3.prev_length - 1, t3.prev_length -= 2;
            do {
              ++t3.strstart <= n2 && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + 3 - 1]) & t3.hash_mask, i3 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart);
            } while (0 != --t3.prev_length);
            if (t3.match_available = 0, t3.match_length = 2, t3.strstart++, r2 && (v(t3, false), 0 === t3.strm.avail_out)) return 1;
          } else if (t3.match_available) {
            if ((r2 = a._tr_tally(t3, 0, t3.window[t3.strstart - 1])) && v(t3, false), t3.strstart++, t3.lookahead--, 0 === t3.strm.avail_out) return 1;
          } else t3.match_available = 1, t3.strstart++, t3.lookahead--;
        }
        return t3.match_available && (r2 = a._tr_tally(t3, 0, t3.window[t3.strstart - 1]), t3.match_available = 0), t3.insert = t3.strstart < 2 ? t3.strstart : 2, 4 === e3 ? (v(t3, true), 0 === t3.strm.avail_out ? 3 : 4) : t3.last_lit && (v(t3, false), 0 === t3.strm.avail_out) ? 1 : 2;
      }
      function C(t3, e3, i3, r2, n2) {
        this.good_length = t3, this.max_lazy = e3, this.nice_length = i3, this.max_chain = r2, this.func = n2;
      }
      function S() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new n.Buf16(1146), this.dyn_dtree = new n.Buf16(122), this.bl_tree = new n.Buf16(78), p(this.dyn_ltree), p(this.dyn_dtree), p(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new n.Buf16(16), this.heap = new n.Buf16(573), p(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new n.Buf16(573), p(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function M(t3) {
        var e3;
        return t3 && t3.state ? (t3.total_in = t3.total_out = 0, t3.data_type = 2, (e3 = t3.state).pending = 0, e3.pending_out = 0, e3.wrap < 0 && (e3.wrap = -e3.wrap), e3.status = e3.wrap ? 42 : d, t3.adler = 2 === e3.wrap ? 0 : 1, e3.last_flush = 0, a._tr_init(e3), 0) : g(t3, h);
      }
      function k(t3) {
        var e3, i3 = M(t3);
        return 0 === i3 && ((e3 = t3.state).window_size = 2 * e3.w_size, p(e3.head), e3.max_lazy_match = r[e3.level].max_lazy, e3.good_match = r[e3.level].good_length, e3.nice_match = r[e3.level].nice_length, e3.max_chain_length = r[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = 2, e3.match_available = 0, e3.ins_h = 0), i3;
      }
      function F(t3, e3, i3, r2, a2, s2) {
        if (!t3) return h;
        var o2 = 1;
        if (-1 === e3 && (e3 = 6), r2 < 0 ? (o2 = 0, r2 = -r2) : r2 > 15 && (o2 = 2, r2 -= 16), a2 < 1 || a2 > 9 || 8 !== i3 || r2 < 8 || r2 > 15 || e3 < 0 || e3 > 9 || s2 < 0 || s2 > 4) return g(t3, h);
        8 === r2 && (r2 = 9);
        var l2 = new S();
        return t3.state = l2, l2.strm = t3, l2.wrap = o2, l2.gzhead = null, l2.w_bits = r2, l2.w_size = 1 << l2.w_bits, l2.w_mask = l2.w_size - 1, l2.hash_bits = a2 + 7, l2.hash_size = 1 << l2.hash_bits, l2.hash_mask = l2.hash_size - 1, l2.hash_shift = ~~((l2.hash_bits + 3 - 1) / 3), l2.window = new n.Buf8(2 * l2.w_size), l2.head = new n.Buf16(l2.hash_size), l2.prev = new n.Buf16(l2.w_size), l2.lit_bufsize = 1 << a2 + 6, l2.pending_buf_size = 4 * l2.lit_bufsize, l2.pending_buf = new n.Buf8(l2.pending_buf_size), l2.d_buf = 1 * l2.lit_bufsize, l2.l_buf = 3 * l2.lit_bufsize, l2.level = e3, l2.strategy = s2, l2.method = i3, k(t3);
      }
      r = [new C(0, 0, 0, 0, (function(t3, e3) {
        var i3 = 65535;
        for (i3 > t3.pending_buf_size - 5 && (i3 = t3.pending_buf_size - 5); ; ) {
          if (t3.lookahead <= 1) {
            if (y(t3), 0 === t3.lookahead && 0 === e3) return 1;
            if (0 === t3.lookahead) break;
          }
          t3.strstart += t3.lookahead, t3.lookahead = 0;
          var r2 = t3.block_start + i3;
          if ((0 === t3.strstart || t3.strstart >= r2) && (t3.lookahead = t3.strstart - r2, t3.strstart = r2, v(t3, false), 0 === t3.strm.avail_out)) return 1;
          if (t3.strstart - t3.block_start >= t3.w_size - c && (v(t3, false), 0 === t3.strm.avail_out)) return 1;
        }
        return t3.insert = 0, 4 === e3 ? (v(t3, true), 0 === t3.strm.avail_out ? 3 : 4) : (t3.strstart > t3.block_start && (v(t3, false), t3.strm.avail_out), 1);
      })), new C(4, 4, 8, 4, A), new C(4, 5, 16, 8, A), new C(4, 6, 32, 32, A), new C(4, 4, 16, 16, E), new C(8, 16, 32, 32, E), new C(8, 16, 128, 128, E), new C(8, 32, 128, 256, E), new C(32, 128, 258, 1024, E), new C(32, 258, 258, 4096, E)], e2.deflateInit = function(t3, e3) {
        return F(t3, e3, 8, 15, 8, 0);
      }, e2.deflateInit2 = F, e2.deflateReset = k, e2.deflateResetKeep = M, e2.deflateSetHeader = function(t3, e3) {
        return t3 && t3.state ? 2 !== t3.state.wrap ? h : (t3.state.gzhead = e3, 0) : h;
      }, e2.deflate = function(t3, e3) {
        var i3, n2, s2, l2;
        if (!t3 || !t3.state || e3 > 5 || e3 < 0) return t3 ? g(t3, h) : h;
        if (n2 = t3.state, !t3.output || !t3.input && 0 !== t3.avail_in || n2.status === b && 4 !== e3) return g(t3, 0 === t3.avail_out ? -5 : h);
        if (n2.strm = t3, i3 = n2.last_flush, n2.last_flush = e3, 42 === n2.status) if (2 === n2.wrap) t3.adler = 0, x(n2, 31), x(n2, 139), x(n2, 8), n2.gzhead ? (x(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), x(n2, 255 & n2.gzhead.time), x(n2, n2.gzhead.time >> 8 & 255), x(n2, n2.gzhead.time >> 16 & 255), x(n2, n2.gzhead.time >> 24 & 255), x(n2, 9 === n2.level ? 2 : n2.strategy >= 2 || n2.level < 2 ? 4 : 0), x(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (x(n2, 255 & n2.gzhead.extra.length), x(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (x(n2, 0), x(n2, 0), x(n2, 0), x(n2, 0), x(n2, 0), x(n2, 9 === n2.level ? 2 : n2.strategy >= 2 || n2.level < 2 ? 4 : 0), x(n2, 3), n2.status = d);
        else {
          var c2 = 8 + (n2.w_bits - 8 << 4) << 8;
          c2 |= (n2.strategy >= 2 || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (c2 |= 32), c2 += 31 - c2 % 31, n2.status = d, T(n2, c2), 0 !== n2.strstart && (T(n2, t3.adler >>> 16), T(n2, 65535 & t3.adler)), t3.adler = 1;
        }
        if (69 === n2.status) if (n2.gzhead.extra) {
          for (s2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > s2 && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending - s2, s2)), m(t3), s2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) x(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
          n2.gzhead.hcrc && n2.pending > s2 && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending - s2, s2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
        } else n2.status = 73;
        if (73 === n2.status) if (n2.gzhead.name) {
          s2 = n2.pending;
          do {
            if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > s2 && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending - s2, s2)), m(t3), s2 = n2.pending, n2.pending === n2.pending_buf_size)) {
              l2 = 1;
              break;
            }
            l2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, x(n2, l2);
          } while (0 !== l2);
          n2.gzhead.hcrc && n2.pending > s2 && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending - s2, s2)), 0 === l2 && (n2.gzindex = 0, n2.status = 91);
        } else n2.status = 91;
        if (91 === n2.status) if (n2.gzhead.comment) {
          s2 = n2.pending;
          do {
            if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > s2 && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending - s2, s2)), m(t3), s2 = n2.pending, n2.pending === n2.pending_buf_size)) {
              l2 = 1;
              break;
            }
            l2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, x(n2, l2);
          } while (0 !== l2);
          n2.gzhead.hcrc && n2.pending > s2 && (t3.adler = o(t3.adler, n2.pending_buf, n2.pending - s2, s2)), 0 === l2 && (n2.status = f);
        } else n2.status = f;
        if (n2.status === f && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && m(t3), n2.pending + 2 <= n2.pending_buf_size && (x(n2, 255 & t3.adler), x(n2, t3.adler >> 8 & 255), t3.adler = 0, n2.status = d)) : n2.status = d), 0 !== n2.pending) {
          if (m(t3), 0 === t3.avail_out) return n2.last_flush = -1, 0;
        } else if (0 === t3.avail_in && _(e3) <= _(i3) && 4 !== e3) return g(t3, -5);
        if (n2.status === b && 0 !== t3.avail_in) return g(t3, -5);
        if (0 !== t3.avail_in || 0 !== n2.lookahead || 0 !== e3 && n2.status !== b) {
          var w2 = 2 === n2.strategy ? (function(t4, e4) {
            for (var i4; ; ) {
              if (0 === t4.lookahead && (y(t4), 0 === t4.lookahead)) {
                if (0 === e4) return 1;
                break;
              }
              if (t4.match_length = 0, i4 = a._tr_tally(t4, 0, t4.window[t4.strstart]), t4.lookahead--, t4.strstart++, i4 && (v(t4, false), 0 === t4.strm.avail_out)) return 1;
            }
            return t4.insert = 0, 4 === e4 ? (v(t4, true), 0 === t4.strm.avail_out ? 3 : 4) : t4.last_lit && (v(t4, false), 0 === t4.strm.avail_out) ? 1 : 2;
          })(n2, e3) : 3 === n2.strategy ? (function(t4, e4) {
            for (var i4, r2, n3, s3, o2 = t4.window; ; ) {
              if (t4.lookahead <= u) {
                if (y(t4), t4.lookahead <= u && 0 === e4) return 1;
                if (0 === t4.lookahead) break;
              }
              if (t4.match_length = 0, t4.lookahead >= 3 && t4.strstart > 0 && (r2 = o2[n3 = t4.strstart - 1]) === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3]) {
                s3 = t4.strstart + u;
                do {
                } while (r2 === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3] && r2 === o2[++n3] && n3 < s3);
                t4.match_length = u - (s3 - n3), t4.match_length > t4.lookahead && (t4.match_length = t4.lookahead);
              }
              if (t4.match_length >= 3 ? (i4 = a._tr_tally(t4, 1, t4.match_length - 3), t4.lookahead -= t4.match_length, t4.strstart += t4.match_length, t4.match_length = 0) : (i4 = a._tr_tally(t4, 0, t4.window[t4.strstart]), t4.lookahead--, t4.strstart++), i4 && (v(t4, false), 0 === t4.strm.avail_out)) return 1;
            }
            return t4.insert = 0, 4 === e4 ? (v(t4, true), 0 === t4.strm.avail_out ? 3 : 4) : t4.last_lit && (v(t4, false), 0 === t4.strm.avail_out) ? 1 : 2;
          })(n2, e3) : r[n2.level].func(n2, e3);
          if (3 !== w2 && 4 !== w2 || (n2.status = b), 1 === w2 || 3 === w2) return 0 === t3.avail_out && (n2.last_flush = -1), 0;
          if (2 === w2 && (1 === e3 ? a._tr_align(n2) : 5 !== e3 && (a._tr_stored_block(n2, 0, 0, false), 3 === e3 && (p(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), m(t3), 0 === t3.avail_out)) return n2.last_flush = -1, 0;
        }
        return 4 !== e3 ? 0 : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (x(n2, 255 & t3.adler), x(n2, t3.adler >> 8 & 255), x(n2, t3.adler >> 16 & 255), x(n2, t3.adler >> 24 & 255), x(n2, 255 & t3.total_in), x(n2, t3.total_in >> 8 & 255), x(n2, t3.total_in >> 16 & 255), x(n2, t3.total_in >> 24 & 255)) : (T(n2, t3.adler >>> 16), T(n2, 65535 & t3.adler)), m(t3), n2.wrap > 0 && (n2.wrap = -n2.wrap), 0 !== n2.pending ? 0 : 1);
      }, e2.deflateEnd = function(t3) {
        var e3;
        return t3 && t3.state ? 42 !== (e3 = t3.state.status) && 69 !== e3 && 73 !== e3 && 91 !== e3 && e3 !== f && e3 !== d && e3 !== b ? g(t3, h) : (t3.state = null, e3 === d ? g(t3, -3) : 0) : h;
      }, e2.deflateSetDictionary = function(t3, e3) {
        var i3, r2, a2, o2, l2, u2, c2, f2, d2 = e3.length;
        if (!t3 || !t3.state) return h;
        if (2 === (o2 = (i3 = t3.state).wrap) || 1 === o2 && 42 !== i3.status || i3.lookahead) return h;
        for (1 === o2 && (t3.adler = s(t3.adler, e3, d2, 0)), i3.wrap = 0, d2 >= i3.w_size && (0 === o2 && (p(i3.head), i3.strstart = 0, i3.block_start = 0, i3.insert = 0), f2 = new n.Buf8(i3.w_size), n.arraySet(f2, e3, d2 - i3.w_size, i3.w_size, 0), e3 = f2, d2 = i3.w_size), l2 = t3.avail_in, u2 = t3.next_in, c2 = t3.input, t3.avail_in = d2, t3.next_in = 0, t3.input = e3, y(i3); i3.lookahead >= 3; ) {
          r2 = i3.strstart, a2 = i3.lookahead - 2;
          do {
            i3.ins_h = (i3.ins_h << i3.hash_shift ^ i3.window[r2 + 3 - 1]) & i3.hash_mask, i3.prev[r2 & i3.w_mask] = i3.head[i3.ins_h], i3.head[i3.ins_h] = r2, r2++;
          } while (--a2);
          i3.strstart = r2, i3.lookahead = 2, y(i3);
        }
        return i3.strstart += i3.lookahead, i3.block_start = i3.strstart, i3.insert = i3.lookahead, i3.lookahead = 0, i3.match_length = i3.prev_length = 2, i3.match_available = 0, t3.next_in = u2, t3.input = c2, t3.avail_in = l2, i3.wrap = o2, 0;
      }, e2.deflateInfo = "pako deflate (from Nodeca project)";
    },
    401: (t2) => {
      t2.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    },
    264: (t2) => {
      t2.exports = function(t3, e2) {
        var i2, r, n, a, s, o, l, h, u, c, f, d, b, g, _, p, m, v, x, T, w, y, A, E, C;
        i2 = t3.state, r = t3.next_in, E = t3.input, n = r + (t3.avail_in - 5), a = t3.next_out, C = t3.output, s = a - (e2 - t3.avail_out), o = a + (t3.avail_out - 257), l = i2.dmax, h = i2.wsize, u = i2.whave, c = i2.wnext, f = i2.window, d = i2.hold, b = i2.bits, g = i2.lencode, _ = i2.distcode, p = (1 << i2.lenbits) - 1, m = (1 << i2.distbits) - 1;
        t: do {
          b < 15 && (d += E[r++] << b, b += 8, d += E[r++] << b, b += 8), v = g[d & p];
          e: for (; ; ) {
            if (d >>>= x = v >>> 24, b -= x, 0 === (x = v >>> 16 & 255)) C[a++] = 65535 & v;
            else {
              if (!(16 & x)) {
                if (0 == (64 & x)) {
                  v = g[(65535 & v) + (d & (1 << x) - 1)];
                  continue e;
                }
                if (32 & x) {
                  i2.mode = 12;
                  break t;
                }
                t3.msg = "invalid literal/length code", i2.mode = 30;
                break t;
              }
              T = 65535 & v, (x &= 15) && (b < x && (d += E[r++] << b, b += 8), T += d & (1 << x) - 1, d >>>= x, b -= x), b < 15 && (d += E[r++] << b, b += 8, d += E[r++] << b, b += 8), v = _[d & m];
              i: for (; ; ) {
                if (d >>>= x = v >>> 24, b -= x, !(16 & (x = v >>> 16 & 255))) {
                  if (0 == (64 & x)) {
                    v = _[(65535 & v) + (d & (1 << x) - 1)];
                    continue i;
                  }
                  t3.msg = "invalid distance code", i2.mode = 30;
                  break t;
                }
                if (w = 65535 & v, b < (x &= 15) && (d += E[r++] << b, (b += 8) < x && (d += E[r++] << b, b += 8)), (w += d & (1 << x) - 1) > l) {
                  t3.msg = "invalid distance too far back", i2.mode = 30;
                  break t;
                }
                if (d >>>= x, b -= x, w > (x = a - s)) {
                  if ((x = w - x) > u && i2.sane) {
                    t3.msg = "invalid distance too far back", i2.mode = 30;
                    break t;
                  }
                  if (y = 0, A = f, 0 === c) {
                    if (y += h - x, x < T) {
                      T -= x;
                      do {
                        C[a++] = f[y++];
                      } while (--x);
                      y = a - w, A = C;
                    }
                  } else if (c < x) {
                    if (y += h + c - x, (x -= c) < T) {
                      T -= x;
                      do {
                        C[a++] = f[y++];
                      } while (--x);
                      if (y = 0, c < T) {
                        T -= x = c;
                        do {
                          C[a++] = f[y++];
                        } while (--x);
                        y = a - w, A = C;
                      }
                    }
                  } else if (y += c - x, x < T) {
                    T -= x;
                    do {
                      C[a++] = f[y++];
                    } while (--x);
                    y = a - w, A = C;
                  }
                  for (; T > 2; ) C[a++] = A[y++], C[a++] = A[y++], C[a++] = A[y++], T -= 3;
                  T && (C[a++] = A[y++], T > 1 && (C[a++] = A[y++]));
                } else {
                  y = a - w;
                  do {
                    C[a++] = C[y++], C[a++] = C[y++], C[a++] = C[y++], T -= 3;
                  } while (T > 2);
                  T && (C[a++] = C[y++], T > 1 && (C[a++] = C[y++]));
                }
                break;
              }
            }
            break;
          }
        } while (r < n && a < o);
        r -= T = b >> 3, d &= (1 << (b -= T << 3)) - 1, t3.next_in = r, t3.next_out = a, t3.avail_in = r < n ? n - r + 5 : 5 - (r - n), t3.avail_out = a < o ? o - a + 257 : 257 - (a - o), i2.hold = d, i2.bits = b;
      };
    },
    948: (t2, e2, i2) => {
      var r = i2(236), n = i2(69), a = i2(869), s = i2(264), o = i2(241), l = -2, h = 12, u = 30;
      function c(t3) {
        return (t3 >>> 24 & 255) + (t3 >>> 8 & 65280) + ((65280 & t3) << 8) + ((255 & t3) << 24);
      }
      function f() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function d(t3) {
        var e3;
        return t3 && t3.state ? (e3 = t3.state, t3.total_in = t3.total_out = e3.total = 0, t3.msg = "", e3.wrap && (t3.adler = 1 & e3.wrap), e3.mode = 1, e3.last = 0, e3.havedict = 0, e3.dmax = 32768, e3.head = null, e3.hold = 0, e3.bits = 0, e3.lencode = e3.lendyn = new r.Buf32(852), e3.distcode = e3.distdyn = new r.Buf32(592), e3.sane = 1, e3.back = -1, 0) : l;
      }
      function b(t3) {
        var e3;
        return t3 && t3.state ? ((e3 = t3.state).wsize = 0, e3.whave = 0, e3.wnext = 0, d(t3)) : l;
      }
      function g(t3, e3) {
        var i3, r2;
        return t3 && t3.state ? (r2 = t3.state, e3 < 0 ? (i3 = 0, e3 = -e3) : (i3 = 1 + (e3 >> 4), e3 < 48 && (e3 &= 15)), e3 && (e3 < 8 || e3 > 15) ? l : (null !== r2.window && r2.wbits !== e3 && (r2.window = null), r2.wrap = i3, r2.wbits = e3, b(t3))) : l;
      }
      function _(t3, e3) {
        var i3, r2;
        return t3 ? (r2 = new f(), t3.state = r2, r2.window = null, 0 !== (i3 = g(t3, e3)) && (t3.state = null), i3) : l;
      }
      var p, m, v = true;
      function x(t3) {
        if (v) {
          var e3;
          for (p = new r.Buf32(512), m = new r.Buf32(32), e3 = 0; e3 < 144; ) t3.lens[e3++] = 8;
          for (; e3 < 256; ) t3.lens[e3++] = 9;
          for (; e3 < 280; ) t3.lens[e3++] = 7;
          for (; e3 < 288; ) t3.lens[e3++] = 8;
          for (o(1, t3.lens, 0, 288, p, 0, t3.work, { bits: 9 }), e3 = 0; e3 < 32; ) t3.lens[e3++] = 5;
          o(2, t3.lens, 0, 32, m, 0, t3.work, { bits: 5 }), v = false;
        }
        t3.lencode = p, t3.lenbits = 9, t3.distcode = m, t3.distbits = 5;
      }
      function T(t3, e3, i3, n2) {
        var a2, s2 = t3.state;
        return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new r.Buf8(s2.wsize)), n2 >= s2.wsize ? (r.arraySet(s2.window, e3, i3 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : ((a2 = s2.wsize - s2.wnext) > n2 && (a2 = n2), r.arraySet(s2.window, e3, i3 - n2, a2, s2.wnext), (n2 -= a2) ? (r.arraySet(s2.window, e3, i3 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += a2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += a2))), 0;
      }
      e2.inflateReset = b, e2.inflateReset2 = g, e2.inflateResetKeep = d, e2.inflateInit = function(t3) {
        return _(t3, 15);
      }, e2.inflateInit2 = _, e2.inflate = function(t3, e3) {
        var i3, f2, d2, b2, g2, _2, p2, m2, v2, w, y, A, E, C, S, M, k, F, R, D, I, U, B, P, z = 0, O = new r.Buf8(4), N = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!t3 || !t3.state || !t3.output || !t3.input && 0 !== t3.avail_in) return l;
        (i3 = t3.state).mode === h && (i3.mode = 13), g2 = t3.next_out, d2 = t3.output, p2 = t3.avail_out, b2 = t3.next_in, f2 = t3.input, _2 = t3.avail_in, m2 = i3.hold, v2 = i3.bits, w = _2, y = p2, U = 0;
        t: for (; ; ) switch (i3.mode) {
          case 1:
            if (0 === i3.wrap) {
              i3.mode = 13;
              break;
            }
            for (; v2 < 16; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            if (2 & i3.wrap && 35615 === m2) {
              i3.check = 0, O[0] = 255 & m2, O[1] = m2 >>> 8 & 255, i3.check = a(i3.check, O, 2, 0), m2 = 0, v2 = 0, i3.mode = 2;
              break;
            }
            if (i3.flags = 0, i3.head && (i3.head.done = false), !(1 & i3.wrap) || (((255 & m2) << 8) + (m2 >> 8)) % 31) {
              t3.msg = "incorrect header check", i3.mode = u;
              break;
            }
            if (8 != (15 & m2)) {
              t3.msg = "unknown compression method", i3.mode = u;
              break;
            }
            if (v2 -= 4, I = 8 + (15 & (m2 >>>= 4)), 0 === i3.wbits) i3.wbits = I;
            else if (I > i3.wbits) {
              t3.msg = "invalid window size", i3.mode = u;
              break;
            }
            i3.dmax = 1 << I, t3.adler = i3.check = 1, i3.mode = 512 & m2 ? 10 : h, m2 = 0, v2 = 0;
            break;
          case 2:
            for (; v2 < 16; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            if (i3.flags = m2, 8 != (255 & i3.flags)) {
              t3.msg = "unknown compression method", i3.mode = u;
              break;
            }
            if (57344 & i3.flags) {
              t3.msg = "unknown header flags set", i3.mode = u;
              break;
            }
            i3.head && (i3.head.text = m2 >> 8 & 1), 512 & i3.flags && (O[0] = 255 & m2, O[1] = m2 >>> 8 & 255, i3.check = a(i3.check, O, 2, 0)), m2 = 0, v2 = 0, i3.mode = 3;
          case 3:
            for (; v2 < 32; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            i3.head && (i3.head.time = m2), 512 & i3.flags && (O[0] = 255 & m2, O[1] = m2 >>> 8 & 255, O[2] = m2 >>> 16 & 255, O[3] = m2 >>> 24 & 255, i3.check = a(i3.check, O, 4, 0)), m2 = 0, v2 = 0, i3.mode = 4;
          case 4:
            for (; v2 < 16; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            i3.head && (i3.head.xflags = 255 & m2, i3.head.os = m2 >> 8), 512 & i3.flags && (O[0] = 255 & m2, O[1] = m2 >>> 8 & 255, i3.check = a(i3.check, O, 2, 0)), m2 = 0, v2 = 0, i3.mode = 5;
          case 5:
            if (1024 & i3.flags) {
              for (; v2 < 16; ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              i3.length = m2, i3.head && (i3.head.extra_len = m2), 512 & i3.flags && (O[0] = 255 & m2, O[1] = m2 >>> 8 & 255, i3.check = a(i3.check, O, 2, 0)), m2 = 0, v2 = 0;
            } else i3.head && (i3.head.extra = null);
            i3.mode = 6;
          case 6:
            if (1024 & i3.flags && ((A = i3.length) > _2 && (A = _2), A && (i3.head && (I = i3.head.extra_len - i3.length, i3.head.extra || (i3.head.extra = new Array(i3.head.extra_len)), r.arraySet(i3.head.extra, f2, b2, A, I)), 512 & i3.flags && (i3.check = a(i3.check, f2, A, b2)), _2 -= A, b2 += A, i3.length -= A), i3.length)) break t;
            i3.length = 0, i3.mode = 7;
          case 7:
            if (2048 & i3.flags) {
              if (0 === _2) break t;
              A = 0;
              do {
                I = f2[b2 + A++], i3.head && I && i3.length < 65536 && (i3.head.name += String.fromCharCode(I));
              } while (I && A < _2);
              if (512 & i3.flags && (i3.check = a(i3.check, f2, A, b2)), _2 -= A, b2 += A, I) break t;
            } else i3.head && (i3.head.name = null);
            i3.length = 0, i3.mode = 8;
          case 8:
            if (4096 & i3.flags) {
              if (0 === _2) break t;
              A = 0;
              do {
                I = f2[b2 + A++], i3.head && I && i3.length < 65536 && (i3.head.comment += String.fromCharCode(I));
              } while (I && A < _2);
              if (512 & i3.flags && (i3.check = a(i3.check, f2, A, b2)), _2 -= A, b2 += A, I) break t;
            } else i3.head && (i3.head.comment = null);
            i3.mode = 9;
          case 9:
            if (512 & i3.flags) {
              for (; v2 < 16; ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              if (m2 !== (65535 & i3.check)) {
                t3.msg = "header crc mismatch", i3.mode = u;
                break;
              }
              m2 = 0, v2 = 0;
            }
            i3.head && (i3.head.hcrc = i3.flags >> 9 & 1, i3.head.done = true), t3.adler = i3.check = 0, i3.mode = h;
            break;
          case 10:
            for (; v2 < 32; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            t3.adler = i3.check = c(m2), m2 = 0, v2 = 0, i3.mode = 11;
          case 11:
            if (0 === i3.havedict) return t3.next_out = g2, t3.avail_out = p2, t3.next_in = b2, t3.avail_in = _2, i3.hold = m2, i3.bits = v2, 2;
            t3.adler = i3.check = 1, i3.mode = h;
          case h:
            if (5 === e3 || 6 === e3) break t;
          case 13:
            if (i3.last) {
              m2 >>>= 7 & v2, v2 -= 7 & v2, i3.mode = 27;
              break;
            }
            for (; v2 < 3; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            switch (i3.last = 1 & m2, v2 -= 1, 3 & (m2 >>>= 1)) {
              case 0:
                i3.mode = 14;
                break;
              case 1:
                if (x(i3), i3.mode = 20, 6 === e3) {
                  m2 >>>= 2, v2 -= 2;
                  break t;
                }
                break;
              case 2:
                i3.mode = 17;
                break;
              case 3:
                t3.msg = "invalid block type", i3.mode = u;
            }
            m2 >>>= 2, v2 -= 2;
            break;
          case 14:
            for (m2 >>>= 7 & v2, v2 -= 7 & v2; v2 < 32; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            if ((65535 & m2) != (m2 >>> 16 ^ 65535)) {
              t3.msg = "invalid stored block lengths", i3.mode = u;
              break;
            }
            if (i3.length = 65535 & m2, m2 = 0, v2 = 0, i3.mode = 15, 6 === e3) break t;
          case 15:
            i3.mode = 16;
          case 16:
            if (A = i3.length) {
              if (A > _2 && (A = _2), A > p2 && (A = p2), 0 === A) break t;
              r.arraySet(d2, f2, b2, A, g2), _2 -= A, b2 += A, p2 -= A, g2 += A, i3.length -= A;
              break;
            }
            i3.mode = h;
            break;
          case 17:
            for (; v2 < 14; ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            if (i3.nlen = 257 + (31 & m2), m2 >>>= 5, v2 -= 5, i3.ndist = 1 + (31 & m2), m2 >>>= 5, v2 -= 5, i3.ncode = 4 + (15 & m2), m2 >>>= 4, v2 -= 4, i3.nlen > 286 || i3.ndist > 30) {
              t3.msg = "too many length or distance symbols", i3.mode = u;
              break;
            }
            i3.have = 0, i3.mode = 18;
          case 18:
            for (; i3.have < i3.ncode; ) {
              for (; v2 < 3; ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              i3.lens[N[i3.have++]] = 7 & m2, m2 >>>= 3, v2 -= 3;
            }
            for (; i3.have < 19; ) i3.lens[N[i3.have++]] = 0;
            if (i3.lencode = i3.lendyn, i3.lenbits = 7, B = { bits: i3.lenbits }, U = o(0, i3.lens, 0, 19, i3.lencode, 0, i3.work, B), i3.lenbits = B.bits, U) {
              t3.msg = "invalid code lengths set", i3.mode = u;
              break;
            }
            i3.have = 0, i3.mode = 19;
          case 19:
            for (; i3.have < i3.nlen + i3.ndist; ) {
              for (; M = (z = i3.lencode[m2 & (1 << i3.lenbits) - 1]) >>> 16 & 255, k = 65535 & z, !((S = z >>> 24) <= v2); ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              if (k < 16) m2 >>>= S, v2 -= S, i3.lens[i3.have++] = k;
              else {
                if (16 === k) {
                  for (P = S + 2; v2 < P; ) {
                    if (0 === _2) break t;
                    _2--, m2 += f2[b2++] << v2, v2 += 8;
                  }
                  if (m2 >>>= S, v2 -= S, 0 === i3.have) {
                    t3.msg = "invalid bit length repeat", i3.mode = u;
                    break;
                  }
                  I = i3.lens[i3.have - 1], A = 3 + (3 & m2), m2 >>>= 2, v2 -= 2;
                } else if (17 === k) {
                  for (P = S + 3; v2 < P; ) {
                    if (0 === _2) break t;
                    _2--, m2 += f2[b2++] << v2, v2 += 8;
                  }
                  v2 -= S, I = 0, A = 3 + (7 & (m2 >>>= S)), m2 >>>= 3, v2 -= 3;
                } else {
                  for (P = S + 7; v2 < P; ) {
                    if (0 === _2) break t;
                    _2--, m2 += f2[b2++] << v2, v2 += 8;
                  }
                  v2 -= S, I = 0, A = 11 + (127 & (m2 >>>= S)), m2 >>>= 7, v2 -= 7;
                }
                if (i3.have + A > i3.nlen + i3.ndist) {
                  t3.msg = "invalid bit length repeat", i3.mode = u;
                  break;
                }
                for (; A--; ) i3.lens[i3.have++] = I;
              }
            }
            if (i3.mode === u) break;
            if (0 === i3.lens[256]) {
              t3.msg = "invalid code -- missing end-of-block", i3.mode = u;
              break;
            }
            if (i3.lenbits = 9, B = { bits: i3.lenbits }, U = o(1, i3.lens, 0, i3.nlen, i3.lencode, 0, i3.work, B), i3.lenbits = B.bits, U) {
              t3.msg = "invalid literal/lengths set", i3.mode = u;
              break;
            }
            if (i3.distbits = 6, i3.distcode = i3.distdyn, B = { bits: i3.distbits }, U = o(2, i3.lens, i3.nlen, i3.ndist, i3.distcode, 0, i3.work, B), i3.distbits = B.bits, U) {
              t3.msg = "invalid distances set", i3.mode = u;
              break;
            }
            if (i3.mode = 20, 6 === e3) break t;
          case 20:
            i3.mode = 21;
          case 21:
            if (_2 >= 6 && p2 >= 258) {
              t3.next_out = g2, t3.avail_out = p2, t3.next_in = b2, t3.avail_in = _2, i3.hold = m2, i3.bits = v2, s(t3, y), g2 = t3.next_out, d2 = t3.output, p2 = t3.avail_out, b2 = t3.next_in, f2 = t3.input, _2 = t3.avail_in, m2 = i3.hold, v2 = i3.bits, i3.mode === h && (i3.back = -1);
              break;
            }
            for (i3.back = 0; M = (z = i3.lencode[m2 & (1 << i3.lenbits) - 1]) >>> 16 & 255, k = 65535 & z, !((S = z >>> 24) <= v2); ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            if (M && 0 == (240 & M)) {
              for (F = S, R = M, D = k; M = (z = i3.lencode[D + ((m2 & (1 << F + R) - 1) >> F)]) >>> 16 & 255, k = 65535 & z, !(F + (S = z >>> 24) <= v2); ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              m2 >>>= F, v2 -= F, i3.back += F;
            }
            if (m2 >>>= S, v2 -= S, i3.back += S, i3.length = k, 0 === M) {
              i3.mode = 26;
              break;
            }
            if (32 & M) {
              i3.back = -1, i3.mode = h;
              break;
            }
            if (64 & M) {
              t3.msg = "invalid literal/length code", i3.mode = u;
              break;
            }
            i3.extra = 15 & M, i3.mode = 22;
          case 22:
            if (i3.extra) {
              for (P = i3.extra; v2 < P; ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              i3.length += m2 & (1 << i3.extra) - 1, m2 >>>= i3.extra, v2 -= i3.extra, i3.back += i3.extra;
            }
            i3.was = i3.length, i3.mode = 23;
          case 23:
            for (; M = (z = i3.distcode[m2 & (1 << i3.distbits) - 1]) >>> 16 & 255, k = 65535 & z, !((S = z >>> 24) <= v2); ) {
              if (0 === _2) break t;
              _2--, m2 += f2[b2++] << v2, v2 += 8;
            }
            if (0 == (240 & M)) {
              for (F = S, R = M, D = k; M = (z = i3.distcode[D + ((m2 & (1 << F + R) - 1) >> F)]) >>> 16 & 255, k = 65535 & z, !(F + (S = z >>> 24) <= v2); ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              m2 >>>= F, v2 -= F, i3.back += F;
            }
            if (m2 >>>= S, v2 -= S, i3.back += S, 64 & M) {
              t3.msg = "invalid distance code", i3.mode = u;
              break;
            }
            i3.offset = k, i3.extra = 15 & M, i3.mode = 24;
          case 24:
            if (i3.extra) {
              for (P = i3.extra; v2 < P; ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              i3.offset += m2 & (1 << i3.extra) - 1, m2 >>>= i3.extra, v2 -= i3.extra, i3.back += i3.extra;
            }
            if (i3.offset > i3.dmax) {
              t3.msg = "invalid distance too far back", i3.mode = u;
              break;
            }
            i3.mode = 25;
          case 25:
            if (0 === p2) break t;
            if (A = y - p2, i3.offset > A) {
              if ((A = i3.offset - A) > i3.whave && i3.sane) {
                t3.msg = "invalid distance too far back", i3.mode = u;
                break;
              }
              A > i3.wnext ? (A -= i3.wnext, E = i3.wsize - A) : E = i3.wnext - A, A > i3.length && (A = i3.length), C = i3.window;
            } else C = d2, E = g2 - i3.offset, A = i3.length;
            A > p2 && (A = p2), p2 -= A, i3.length -= A;
            do {
              d2[g2++] = C[E++];
            } while (--A);
            0 === i3.length && (i3.mode = 21);
            break;
          case 26:
            if (0 === p2) break t;
            d2[g2++] = i3.length, p2--, i3.mode = 21;
            break;
          case 27:
            if (i3.wrap) {
              for (; v2 < 32; ) {
                if (0 === _2) break t;
                _2--, m2 |= f2[b2++] << v2, v2 += 8;
              }
              if (y -= p2, t3.total_out += y, i3.total += y, y && (t3.adler = i3.check = i3.flags ? a(i3.check, d2, y, g2 - y) : n(i3.check, d2, y, g2 - y)), y = p2, (i3.flags ? m2 : c(m2)) !== i3.check) {
                t3.msg = "incorrect data check", i3.mode = u;
                break;
              }
              m2 = 0, v2 = 0;
            }
            i3.mode = 28;
          case 28:
            if (i3.wrap && i3.flags) {
              for (; v2 < 32; ) {
                if (0 === _2) break t;
                _2--, m2 += f2[b2++] << v2, v2 += 8;
              }
              if (m2 !== (4294967295 & i3.total)) {
                t3.msg = "incorrect length check", i3.mode = u;
                break;
              }
              m2 = 0, v2 = 0;
            }
            i3.mode = 29;
          case 29:
            U = 1;
            break t;
          case u:
            U = -3;
            break t;
          case 31:
            return -4;
          default:
            return l;
        }
        return t3.next_out = g2, t3.avail_out = p2, t3.next_in = b2, t3.avail_in = _2, i3.hold = m2, i3.bits = v2, (i3.wsize || y !== t3.avail_out && i3.mode < u && (i3.mode < 27 || 4 !== e3)) && T(t3, t3.output, t3.next_out, y - t3.avail_out) ? (i3.mode = 31, -4) : (w -= t3.avail_in, y -= t3.avail_out, t3.total_in += w, t3.total_out += y, i3.total += y, i3.wrap && y && (t3.adler = i3.check = i3.flags ? a(i3.check, d2, y, t3.next_out - y) : n(i3.check, d2, y, t3.next_out - y)), t3.data_type = i3.bits + (i3.last ? 64 : 0) + (i3.mode === h ? 128 : 0) + (20 === i3.mode || 15 === i3.mode ? 256 : 0), (0 === w && 0 === y || 4 === e3) && 0 === U && (U = -5), U);
      }, e2.inflateEnd = function(t3) {
        if (!t3 || !t3.state) return l;
        var e3 = t3.state;
        return e3.window && (e3.window = null), t3.state = null, 0;
      }, e2.inflateGetHeader = function(t3, e3) {
        var i3;
        return t3 && t3.state ? 0 == (2 & (i3 = t3.state).wrap) ? l : (i3.head = e3, e3.done = false, 0) : l;
      }, e2.inflateSetDictionary = function(t3, e3) {
        var i3, r2 = e3.length;
        return t3 && t3.state ? 0 !== (i3 = t3.state).wrap && 11 !== i3.mode ? l : 11 === i3.mode && n(1, e3, r2, 0) !== i3.check ? -3 : T(t3, e3, r2, r2) ? (i3.mode = 31, -4) : (i3.havedict = 1, 0) : l;
      }, e2.inflateInfo = "pako inflate (from Nodeca project)";
    },
    241: (t2, e2, i2) => {
      var r = i2(236), n = 15, a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], l = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t2.exports = function(t3, e3, i3, h, u, c, f, d) {
        var b, g, _, p, m, v, x, T, w, y = d.bits, A = 0, E = 0, C = 0, S = 0, M = 0, k = 0, F = 0, R = 0, D = 0, I = 0, U = null, B = 0, P = new r.Buf16(16), z = new r.Buf16(16), O = null, N = 0;
        for (A = 0; A <= n; A++) P[A] = 0;
        for (E = 0; E < h; E++) P[e3[i3 + E]]++;
        for (M = y, S = n; S >= 1 && 0 === P[S]; S--) ;
        if (M > S && (M = S), 0 === S) return u[c++] = 20971520, u[c++] = 20971520, d.bits = 1, 0;
        for (C = 1; C < S && 0 === P[C]; C++) ;
        for (M < C && (M = C), R = 1, A = 1; A <= n; A++) if (R <<= 1, (R -= P[A]) < 0) return -1;
        if (R > 0 && (0 === t3 || 1 !== S)) return -1;
        for (z[1] = 0, A = 1; A < n; A++) z[A + 1] = z[A] + P[A];
        for (E = 0; E < h; E++) 0 !== e3[i3 + E] && (f[z[e3[i3 + E]]++] = E);
        if (0 === t3 ? (U = O = f, v = 19) : 1 === t3 ? (U = a, B -= 257, O = s, N -= 257, v = 256) : (U = o, O = l, v = -1), I = 0, E = 0, A = C, m = c, k = M, F = 0, _ = -1, p = (D = 1 << M) - 1, 1 === t3 && D > 852 || 2 === t3 && D > 592) return 1;
        for (; ; ) {
          x = A - F, f[E] < v ? (T = 0, w = f[E]) : f[E] > v ? (T = O[N + f[E]], w = U[B + f[E]]) : (T = 96, w = 0), b = 1 << A - F, C = g = 1 << k;
          do {
            u[m + (I >> F) + (g -= b)] = x << 24 | T << 16 | w | 0;
          } while (0 !== g);
          for (b = 1 << A - 1; I & b; ) b >>= 1;
          if (0 !== b ? (I &= b - 1, I += b) : I = 0, E++, 0 == --P[A]) {
            if (A === S) break;
            A = e3[i3 + f[E]];
          }
          if (A > M && (I & p) !== _) {
            for (0 === F && (F = M), m += C, R = 1 << (k = A - F); k + F < S && !((R -= P[k + F]) <= 0); ) k++, R <<= 1;
            if (D += 1 << k, 1 === t3 && D > 852 || 2 === t3 && D > 592) return 1;
            u[_ = I & p] = M << 24 | k << 16 | m - c | 0;
          }
        }
        return 0 !== I && (u[m + I] = A - F << 24 | 64 << 16 | 0), d.bits = M, 0;
      };
    },
    898: (t2) => {
      t2.exports = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
      };
    },
    342: (t2, e2, i2) => {
      var r = i2(236);
      function n(t3) {
        for (var e3 = t3.length; --e3 >= 0; ) t3[e3] = 0;
      }
      var a = 256, s = 286, o = 30, l = 15, h = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], f = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], d = new Array(576);
      n(d);
      var b = new Array(60);
      n(b);
      var g = new Array(512);
      n(g);
      var _ = new Array(256);
      n(_);
      var p = new Array(29);
      n(p);
      var m, v, x, T = new Array(o);
      function w(t3, e3, i3, r2, n2) {
        this.static_tree = t3, this.extra_bits = e3, this.extra_base = i3, this.elems = r2, this.max_length = n2, this.has_stree = t3 && t3.length;
      }
      function y(t3, e3) {
        this.dyn_tree = t3, this.max_code = 0, this.stat_desc = e3;
      }
      function A(t3) {
        return t3 < 256 ? g[t3] : g[256 + (t3 >>> 7)];
      }
      function E(t3, e3) {
        t3.pending_buf[t3.pending++] = 255 & e3, t3.pending_buf[t3.pending++] = e3 >>> 8 & 255;
      }
      function C(t3, e3, i3) {
        t3.bi_valid > 16 - i3 ? (t3.bi_buf |= e3 << t3.bi_valid & 65535, E(t3, t3.bi_buf), t3.bi_buf = e3 >> 16 - t3.bi_valid, t3.bi_valid += i3 - 16) : (t3.bi_buf |= e3 << t3.bi_valid & 65535, t3.bi_valid += i3);
      }
      function S(t3, e3, i3) {
        C(t3, i3[2 * e3], i3[2 * e3 + 1]);
      }
      function M(t3, e3) {
        var i3 = 0;
        do {
          i3 |= 1 & t3, t3 >>>= 1, i3 <<= 1;
        } while (--e3 > 0);
        return i3 >>> 1;
      }
      function k(t3, e3, i3) {
        var r2, n2, a2 = new Array(16), s2 = 0;
        for (r2 = 1; r2 <= l; r2++) a2[r2] = s2 = s2 + i3[r2 - 1] << 1;
        for (n2 = 0; n2 <= e3; n2++) {
          var o2 = t3[2 * n2 + 1];
          0 !== o2 && (t3[2 * n2] = M(a2[o2]++, o2));
        }
      }
      function F(t3) {
        var e3;
        for (e3 = 0; e3 < s; e3++) t3.dyn_ltree[2 * e3] = 0;
        for (e3 = 0; e3 < o; e3++) t3.dyn_dtree[2 * e3] = 0;
        for (e3 = 0; e3 < 19; e3++) t3.bl_tree[2 * e3] = 0;
        t3.dyn_ltree[512] = 1, t3.opt_len = t3.static_len = 0, t3.last_lit = t3.matches = 0;
      }
      function R(t3) {
        t3.bi_valid > 8 ? E(t3, t3.bi_buf) : t3.bi_valid > 0 && (t3.pending_buf[t3.pending++] = t3.bi_buf), t3.bi_buf = 0, t3.bi_valid = 0;
      }
      function D(t3, e3, i3, r2) {
        var n2 = 2 * e3, a2 = 2 * i3;
        return t3[n2] < t3[a2] || t3[n2] === t3[a2] && r2[e3] <= r2[i3];
      }
      function I(t3, e3, i3) {
        for (var r2 = t3.heap[i3], n2 = i3 << 1; n2 <= t3.heap_len && (n2 < t3.heap_len && D(e3, t3.heap[n2 + 1], t3.heap[n2], t3.depth) && n2++, !D(e3, r2, t3.heap[n2], t3.depth)); ) t3.heap[i3] = t3.heap[n2], i3 = n2, n2 <<= 1;
        t3.heap[i3] = r2;
      }
      function U(t3, e3, i3) {
        var r2, n2, s2, o2, l2 = 0;
        if (0 !== t3.last_lit) do {
          r2 = t3.pending_buf[t3.d_buf + 2 * l2] << 8 | t3.pending_buf[t3.d_buf + 2 * l2 + 1], n2 = t3.pending_buf[t3.l_buf + l2], l2++, 0 === r2 ? S(t3, n2, e3) : (S(t3, (s2 = _[n2]) + a + 1, e3), 0 !== (o2 = h[s2]) && C(t3, n2 -= p[s2], o2), S(t3, s2 = A(--r2), i3), 0 !== (o2 = u[s2]) && C(t3, r2 -= T[s2], o2));
        } while (l2 < t3.last_lit);
        S(t3, 256, e3);
      }
      function B(t3, e3) {
        var i3, r2, n2, a2 = e3.dyn_tree, s2 = e3.stat_desc.static_tree, o2 = e3.stat_desc.has_stree, h2 = e3.stat_desc.elems, u2 = -1;
        for (t3.heap_len = 0, t3.heap_max = 573, i3 = 0; i3 < h2; i3++) 0 !== a2[2 * i3] ? (t3.heap[++t3.heap_len] = u2 = i3, t3.depth[i3] = 0) : a2[2 * i3 + 1] = 0;
        for (; t3.heap_len < 2; ) a2[2 * (n2 = t3.heap[++t3.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, t3.depth[n2] = 0, t3.opt_len--, o2 && (t3.static_len -= s2[2 * n2 + 1]);
        for (e3.max_code = u2, i3 = t3.heap_len >> 1; i3 >= 1; i3--) I(t3, a2, i3);
        n2 = h2;
        do {
          i3 = t3.heap[1], t3.heap[1] = t3.heap[t3.heap_len--], I(t3, a2, 1), r2 = t3.heap[1], t3.heap[--t3.heap_max] = i3, t3.heap[--t3.heap_max] = r2, a2[2 * n2] = a2[2 * i3] + a2[2 * r2], t3.depth[n2] = (t3.depth[i3] >= t3.depth[r2] ? t3.depth[i3] : t3.depth[r2]) + 1, a2[2 * i3 + 1] = a2[2 * r2 + 1] = n2, t3.heap[1] = n2++, I(t3, a2, 1);
        } while (t3.heap_len >= 2);
        t3.heap[--t3.heap_max] = t3.heap[1], (function(t4, e4) {
          var i4, r3, n3, a3, s3, o3, h3 = e4.dyn_tree, u3 = e4.max_code, c2 = e4.stat_desc.static_tree, f2 = e4.stat_desc.has_stree, d2 = e4.stat_desc.extra_bits, b2 = e4.stat_desc.extra_base, g2 = e4.stat_desc.max_length, _2 = 0;
          for (a3 = 0; a3 <= l; a3++) t4.bl_count[a3] = 0;
          for (h3[2 * t4.heap[t4.heap_max] + 1] = 0, i4 = t4.heap_max + 1; i4 < 573; i4++) (a3 = h3[2 * h3[2 * (r3 = t4.heap[i4]) + 1] + 1] + 1) > g2 && (a3 = g2, _2++), h3[2 * r3 + 1] = a3, r3 > u3 || (t4.bl_count[a3]++, s3 = 0, r3 >= b2 && (s3 = d2[r3 - b2]), o3 = h3[2 * r3], t4.opt_len += o3 * (a3 + s3), f2 && (t4.static_len += o3 * (c2[2 * r3 + 1] + s3)));
          if (0 !== _2) {
            do {
              for (a3 = g2 - 1; 0 === t4.bl_count[a3]; ) a3--;
              t4.bl_count[a3]--, t4.bl_count[a3 + 1] += 2, t4.bl_count[g2]--, _2 -= 2;
            } while (_2 > 0);
            for (a3 = g2; 0 !== a3; a3--) for (r3 = t4.bl_count[a3]; 0 !== r3; ) (n3 = t4.heap[--i4]) > u3 || (h3[2 * n3 + 1] !== a3 && (t4.opt_len += (a3 - h3[2 * n3 + 1]) * h3[2 * n3], h3[2 * n3 + 1] = a3), r3--);
          }
        })(t3, e3), k(a2, u2, t3.bl_count);
      }
      function P(t3, e3, i3) {
        var r2, n2, a2 = -1, s2 = e3[1], o2 = 0, l2 = 7, h2 = 4;
        for (0 === s2 && (l2 = 138, h2 = 3), e3[2 * (i3 + 1) + 1] = 65535, r2 = 0; r2 <= i3; r2++) n2 = s2, s2 = e3[2 * (r2 + 1) + 1], ++o2 < l2 && n2 === s2 || (o2 < h2 ? t3.bl_tree[2 * n2] += o2 : 0 !== n2 ? (n2 !== a2 && t3.bl_tree[2 * n2]++, t3.bl_tree[32]++) : o2 <= 10 ? t3.bl_tree[34]++ : t3.bl_tree[36]++, o2 = 0, a2 = n2, 0 === s2 ? (l2 = 138, h2 = 3) : n2 === s2 ? (l2 = 6, h2 = 3) : (l2 = 7, h2 = 4));
      }
      function z(t3, e3, i3) {
        var r2, n2, a2 = -1, s2 = e3[1], o2 = 0, l2 = 7, h2 = 4;
        for (0 === s2 && (l2 = 138, h2 = 3), r2 = 0; r2 <= i3; r2++) if (n2 = s2, s2 = e3[2 * (r2 + 1) + 1], !(++o2 < l2 && n2 === s2)) {
          if (o2 < h2) do {
            S(t3, n2, t3.bl_tree);
          } while (0 != --o2);
          else 0 !== n2 ? (n2 !== a2 && (S(t3, n2, t3.bl_tree), o2--), S(t3, 16, t3.bl_tree), C(t3, o2 - 3, 2)) : o2 <= 10 ? (S(t3, 17, t3.bl_tree), C(t3, o2 - 3, 3)) : (S(t3, 18, t3.bl_tree), C(t3, o2 - 11, 7));
          o2 = 0, a2 = n2, 0 === s2 ? (l2 = 138, h2 = 3) : n2 === s2 ? (l2 = 6, h2 = 3) : (l2 = 7, h2 = 4);
        }
      }
      n(T);
      var O = false;
      function N(t3, e3, i3, n2) {
        C(t3, 0 + (n2 ? 1 : 0), 3), (function(t4, e4, i4, n3) {
          R(t4), n3 && (E(t4, i4), E(t4, ~i4)), r.arraySet(t4.pending_buf, t4.window, e4, i4, t4.pending), t4.pending += i4;
        })(t3, e3, i3, true);
      }
      e2._tr_init = function(t3) {
        O || (!(function() {
          var t4, e3, i3, r2, n2, a2 = new Array(16);
          for (i3 = 0, r2 = 0; r2 < 28; r2++) for (p[r2] = i3, t4 = 0; t4 < 1 << h[r2]; t4++) _[i3++] = r2;
          for (_[i3 - 1] = r2, n2 = 0, r2 = 0; r2 < 16; r2++) for (T[r2] = n2, t4 = 0; t4 < 1 << u[r2]; t4++) g[n2++] = r2;
          for (n2 >>= 7; r2 < o; r2++) for (T[r2] = n2 << 7, t4 = 0; t4 < 1 << u[r2] - 7; t4++) g[256 + n2++] = r2;
          for (e3 = 0; e3 <= l; e3++) a2[e3] = 0;
          for (t4 = 0; t4 <= 143; ) d[2 * t4 + 1] = 8, t4++, a2[8]++;
          for (; t4 <= 255; ) d[2 * t4 + 1] = 9, t4++, a2[9]++;
          for (; t4 <= 279; ) d[2 * t4 + 1] = 7, t4++, a2[7]++;
          for (; t4 <= 287; ) d[2 * t4 + 1] = 8, t4++, a2[8]++;
          for (k(d, 287, a2), t4 = 0; t4 < o; t4++) b[2 * t4 + 1] = 5, b[2 * t4] = M(t4, 5);
          m = new w(d, h, 257, s, l), v = new w(b, u, 0, o, l), x = new w(new Array(0), c, 0, 19, 7);
        })(), O = true), t3.l_desc = new y(t3.dyn_ltree, m), t3.d_desc = new y(t3.dyn_dtree, v), t3.bl_desc = new y(t3.bl_tree, x), t3.bi_buf = 0, t3.bi_valid = 0, F(t3);
      }, e2._tr_stored_block = N, e2._tr_flush_block = function(t3, e3, i3, r2) {
        var n2, s2, o2 = 0;
        t3.level > 0 ? (2 === t3.strm.data_type && (t3.strm.data_type = (function(t4) {
          var e4, i4 = 4093624447;
          for (e4 = 0; e4 <= 31; e4++, i4 >>>= 1) if (1 & i4 && 0 !== t4.dyn_ltree[2 * e4]) return 0;
          if (0 !== t4.dyn_ltree[18] || 0 !== t4.dyn_ltree[20] || 0 !== t4.dyn_ltree[26]) return 1;
          for (e4 = 32; e4 < a; e4++) if (0 !== t4.dyn_ltree[2 * e4]) return 1;
          return 0;
        })(t3)), B(t3, t3.l_desc), B(t3, t3.d_desc), o2 = (function(t4) {
          var e4;
          for (P(t4, t4.dyn_ltree, t4.l_desc.max_code), P(t4, t4.dyn_dtree, t4.d_desc.max_code), B(t4, t4.bl_desc), e4 = 18; e4 >= 3 && 0 === t4.bl_tree[2 * f[e4] + 1]; e4--) ;
          return t4.opt_len += 3 * (e4 + 1) + 5 + 5 + 4, e4;
        })(t3), n2 = t3.opt_len + 3 + 7 >>> 3, (s2 = t3.static_len + 3 + 7 >>> 3) <= n2 && (n2 = s2)) : n2 = s2 = i3 + 5, i3 + 4 <= n2 && -1 !== e3 ? N(t3, e3, i3, r2) : 4 === t3.strategy || s2 === n2 ? (C(t3, 2 + (r2 ? 1 : 0), 3), U(t3, d, b)) : (C(t3, 4 + (r2 ? 1 : 0), 3), (function(t4, e4, i4, r3) {
          var n3;
          for (C(t4, e4 - 257, 5), C(t4, i4 - 1, 5), C(t4, r3 - 4, 4), n3 = 0; n3 < r3; n3++) C(t4, t4.bl_tree[2 * f[n3] + 1], 3);
          z(t4, t4.dyn_ltree, e4 - 1), z(t4, t4.dyn_dtree, i4 - 1);
        })(t3, t3.l_desc.max_code + 1, t3.d_desc.max_code + 1, o2 + 1), U(t3, t3.dyn_ltree, t3.dyn_dtree)), F(t3), r2 && R(t3);
      }, e2._tr_tally = function(t3, e3, i3) {
        return t3.pending_buf[t3.d_buf + 2 * t3.last_lit] = e3 >>> 8 & 255, t3.pending_buf[t3.d_buf + 2 * t3.last_lit + 1] = 255 & e3, t3.pending_buf[t3.l_buf + t3.last_lit] = 255 & i3, t3.last_lit++, 0 === e3 ? t3.dyn_ltree[2 * i3]++ : (t3.matches++, e3--, t3.dyn_ltree[2 * (_[i3] + a + 1)]++, t3.dyn_dtree[2 * A(e3)]++), t3.last_lit === t3.lit_bufsize - 1;
      }, e2._tr_align = function(t3) {
        C(t3, 2, 3), S(t3, 256, d), (function(t4) {
          16 === t4.bi_valid ? (E(t4, t4.bi_buf), t4.bi_buf = 0, t4.bi_valid = 0) : t4.bi_valid >= 8 && (t4.pending_buf[t4.pending++] = 255 & t4.bi_buf, t4.bi_buf >>= 8, t4.bi_valid -= 8);
        })(t3);
      };
    },
    292: (t2) => {
      t2.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    },
    287: () => {
      var t2, e2;
      window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t3, e3) {
        window.setTimeout(t3, 1e3 / 0);
      }, jQuery.support.cors = true, $.ajaxTransport ? ($.ajaxSetup({ flatOptions: { renderer: true } }), $.ajaxTransport("+binary", (function(t3, e3, i2) {
        if (window.FormData && (t3.dataType && "binary" == t3.dataType || t3.data && (window.ArrayBuffer && t3.data instanceof ArrayBuffer || window.Blob && t3.data instanceof Blob))) return {
          send: function(e4, i3) {
            var r = new XMLHttpRequest(), n = t3.url, a = t3.type, s = t3.responseType || "blob", o = t3.data || null;
            t3.renderer && r.addEventListener("progress", (function(e5) {
              e5.lengthComputable && (t3.renderer.downloads[this.responseURL] ? t3.renderer.downloads[this.responseURL].loaded = e5.loaded : t3.renderer.downloads[this.responseURL] = {
                loaded: e5.loaded,
                total: e5.total
              }, t3.renderer.updateProgress());
            })), r.addEventListener("load", (function() {
              t3.renderer && (delete t3.renderer.downloads[this.responseURL], t3.renderer.updateProgress());
              var e5 = {};
              e5[t3.dataType] = r.response, i3(r.status, r.statusText, e5, r.getAllResponseHeaders());
            })), r.open(a, n, true), r.responseType = s, r.send(o);
          },
          abort: function() {
            i2.abort();
          }
        };
      }))) : (t2 = $.httpData, $.httpData = function(e3, i2, r) {
        return "binary" == i2 ? e3.response : t2(e3, i2, r);
      }, $.ajaxSetup({
        beforeSend: function(t3, e3) {
          "binary" == e3.dataType && (t3.responseType = e3.responseType || "arraybuffer", t3.addEventListener("progress", (function(t4) {
            e3.renderer && t4.lengthComputable && (e3.renderer.downloads[this.responseURL] ? e3.renderer.downloads[this.responseURL].loaded = t4.loaded : e3.renderer.downloads[this.responseURL] = {
              loaded: t4.loaded,
              total: t4.total
            }, e3.renderer.updateProgress());
          }), false), t3.addEventListener("load", (function() {
            e3.renderer && (delete e3.renderer.downloads[this.responseURL], e3.renderer.updateProgress());
          }), false));
        }
      })), Math.randomInt = Math.randomInt || function(t3, e3) {
        return Math.floor(Math.random() * (e3 - t3)) + t3;
      }, "function" != typeof Object.create && (Object.create = (e2 = function() {
      }, function(t3) {
        if (arguments.length > 1) throw Error("Second argument not supported");
        if ("object" != typeof t3) throw TypeError("Argument must be an object");
        e2.prototype = t3;
        var i2 = new e2();
        return e2.prototype = null, i2;
      })), window.console = window.console || {
        log: function() {
        },
        error: function() {
        },
        warn: function() {
        }
      };
    }
  }, e = {};
  function i(r) {
    var n = e[r];
    if (void 0 !== n) return n.exports;
    var a = e[r] = { exports: {} };
    return t[r](a, a.exports, i), a.exports;
  }
  (() => {
    i(287);
    let t2 = Float32Array;
    function e2(e3, i2, r2) {
      const n2 = new t2(3);
      return e3 && (n2[0] = e3), i2 && (n2[1] = i2), r2 && (n2[2] = r2), n2;
    }
    function r(e3, i2, r2) {
      return (r2 = r2 || new t2(3))[0] = e3[0] + i2[0], r2[1] = e3[1] + i2[1], r2[2] = e3[2] + i2[2], r2;
    }
    function n(e3, i2, r2) {
      return (r2 = r2 || new t2(3))[0] = e3[0] * i2[0], r2[1] = e3[1] * i2[1], r2[2] = e3[2] * i2[2], r2;
    }
    let a = Float32Array;
    function s(t3) {
      return (t3 = t3 || new a(16))[0] = 1, t3[1] = 0, t3[2] = 0, t3[3] = 0, t3[4] = 0, t3[5] = 1, t3[6] = 0, t3[7] = 0, t3[8] = 0, t3[9] = 0, t3[10] = 1, t3[11] = 0, t3[12] = 0, t3[13] = 0, t3[14] = 0, t3[15] = 1, t3;
    }
    function o(t3, e3) {
      e3 = e3 || new a(16);
      const i2 = t3[0], r2 = t3[1], n2 = t3[2], s2 = t3[3], o2 = t3[4], l2 = t3[5], h2 = t3[6], u2 = t3[7], c2 = t3[8], f2 = t3[9], d2 = t3[10], b2 = t3[11], g2 = t3[12], _2 = t3[13], p2 = t3[14], m2 = t3[15], v2 = d2 * m2, x2 = p2 * b2, T2 = h2 * m2, w2 = p2 * u2, y2 = h2 * b2, A2 = d2 * u2, E2 = n2 * m2, C2 = p2 * s2, S2 = n2 * b2, M2 = d2 * s2, k2 = n2 * u2, F2 = h2 * s2, R2 = c2 * _2, D2 = g2 * f2, I2 = o2 * _2, U2 = g2 * l2, B2 = o2 * f2, P2 = c2 * l2, z2 = i2 * _2, O2 = g2 * r2, N2 = i2 * f2, L2 = c2 * r2, H2 = i2 * l2, V2 = o2 * r2, j2 = v2 * l2 + w2 * f2 + y2 * _2 - (x2 * l2 + T2 * f2 + A2 * _2), G2 = x2 * r2 + E2 * f2 + M2 * _2 - (v2 * r2 + C2 * f2 + S2 * _2), X2 = T2 * r2 + C2 * l2 + k2 * _2 - (w2 * r2 + E2 * l2 + F2 * _2), q2 = A2 * r2 + S2 * l2 + F2 * f2 - (y2 * r2 + M2 * l2 + k2 * f2), W2 = 1 / (i2 * j2 + o2 * G2 + c2 * X2 + g2 * q2);
      return e3[0] = W2 * j2, e3[1] = W2 * G2, e3[2] = W2 * X2, e3[3] = W2 * q2, e3[4] = W2 * (x2 * o2 + T2 * c2 + A2 * g2 - (v2 * o2 + w2 * c2 + y2 * g2)), e3[5] = W2 * (v2 * i2 + C2 * c2 + S2 * g2 - (x2 * i2 + E2 * c2 + M2 * g2)), e3[6] = W2 * (w2 * i2 + E2 * o2 + F2 * g2 - (T2 * i2 + C2 * o2 + k2 * g2)), e3[7] = W2 * (y2 * i2 + M2 * o2 + k2 * c2 - (A2 * i2 + S2 * o2 + F2 * c2)), e3[8] = W2 * (R2 * u2 + U2 * b2 + B2 * m2 - (D2 * u2 + I2 * b2 + P2 * m2)), e3[9] = W2 * (D2 * s2 + z2 * b2 + L2 * m2 - (R2 * s2 + O2 * b2 + N2 * m2)), e3[10] = W2 * (I2 * s2 + O2 * u2 + H2 * m2 - (U2 * s2 + z2 * u2 + V2 * m2)), e3[11] = W2 * (P2 * s2 + N2 * u2 + V2 * b2 - (B2 * s2 + L2 * u2 + H2 * b2)), e3[12] = W2 * (I2 * d2 + P2 * p2 + D2 * h2 - (B2 * p2 + R2 * h2 + U2 * d2)), e3[13] = W2 * (N2 * p2 + R2 * n2 + O2 * d2 - (z2 * d2 + L2 * p2 + D2 * n2)), e3[14] = W2 * (z2 * h2 + V2 * p2 + U2 * n2 - (H2 * p2 + I2 * n2 + O2 * h2)), e3[15] = W2 * (H2 * d2 + B2 * n2 + L2 * h2 - (N2 * h2 + V2 * d2 + P2 * n2)), e3;
    }
    function l(t3, i2, r2) {
      r2 = r2 || e2();
      const n2 = i2[0], a2 = i2[1], s2 = i2[2], o2 = n2 * t3[3] + a2 * t3[7] + s2 * t3[11] + t3[15];
      return r2[0] = (n2 * t3[0] + a2 * t3[4] + s2 * t3[8] + t3[12]) / o2, r2[1] = (n2 * t3[1] + a2 * t3[5] + s2 * t3[9] + t3[13]) / o2, r2[2] = (n2 * t3[2] + a2 * t3[6] + s2 * t3[10] + t3[14]) / o2, r2;
    }
    function h(t3, i2, r2) {
      r2 = r2 || e2();
      const n2 = i2[0], a2 = i2[1], s2 = i2[2];
      return r2[0] = n2 * t3[0] + a2 * t3[4] + s2 * t3[8], r2[1] = n2 * t3[1] + a2 * t3[5] + s2 * t3[9], r2[2] = n2 * t3[2] + a2 * t3[6] + s2 * t3[10], r2;
    }
    const u = 5120, c = 5121, f = 5122, d = 5123, b = 5124, g = 5125, _ = 5126, p = {};
    {
      const t3 = p;
      t3[u] = Int8Array, t3[5121] = Uint8Array, t3[5122] = Int16Array, t3[5123] = Uint16Array, t3[b] = Int32Array, t3[5125] = Uint32Array, t3[5126] = Float32Array, t3[32819] = Uint16Array, t3[32820] = Uint16Array, t3[33635] = Uint16Array, t3[5131] = Uint16Array, t3[33640] = Uint32Array, t3[35899] = Uint32Array, t3[35902] = Uint32Array, t3[36269] = Uint32Array, t3[34042] = Uint32Array;
    }
    function m(t3) {
      if (t3 instanceof Int8Array) return u;
      if (t3 instanceof Uint8Array) return c;
      if (t3 instanceof Uint8ClampedArray) return c;
      if (t3 instanceof Int16Array) return f;
      if (t3 instanceof Uint16Array) return d;
      if (t3 instanceof Int32Array) return b;
      if (t3 instanceof Uint32Array) return g;
      if (t3 instanceof Float32Array) return _;
      throw new Error("unsupported typed array type");
    }
    function v(t3) {
      if (t3 === Int8Array) return u;
      if (t3 === Uint8Array) return c;
      if (t3 === Uint8ClampedArray) return c;
      if (t3 === Int16Array) return f;
      if (t3 === Uint16Array) return d;
      if (t3 === Int32Array) return b;
      if (t3 === Uint32Array) return g;
      if (t3 === Float32Array) return _;
      throw new Error("unsupported typed array type");
    }
    const x = "undefined" != typeof SharedArrayBuffer ? function(t3) {
      return t3 && t3.buffer && (t3.buffer instanceof ArrayBuffer || t3.buffer instanceof SharedArrayBuffer);
    } : function(t3) {
      return t3 && t3.buffer && t3.buffer instanceof ArrayBuffer;
    };
    function T(...t3) {
      console.error(...t3);
    }
    function w(t3, e3) {
      return "undefined" != typeof WebGLTexture && e3 instanceof WebGLTexture;
    }
    const y = 34962, A = { attribPrefix: "" };
    function E(t3, e3, i2, r2, n2) {
      t3.bindBuffer(e3, i2), t3.bufferData(e3, r2, n2 || 35044);
    }
    function C(t3, e3, i2, r2) {
      if (n2 = e3, "undefined" != typeof WebGLBuffer && n2 instanceof WebGLBuffer) return e3;
      var n2;
      i2 = i2 || y;
      const a2 = t3.createBuffer();
      return E(t3, i2, a2, e3, r2), a2;
    }
    function S(t3) {
      return "indices" === t3;
    }
    function M(t3) {
      return t3.length ? t3 : t3.data;
    }
    const k = /coord|texture/i, F = /color|colour/i;
    function R(t3, e3) {
      let i2;
      if (i2 = k.test(t3) ? 2 : F.test(t3) ? 4 : 3, e3 % i2 > 0) throw new Error(`Can not guess numComponents for attribute '${t3}'. Tried ${i2} but ${e3} values is not evenly divisible by ${i2}. You should specify it.`);
      return i2;
    }
    function D(t3, e3) {
      return t3.numComponents || t3.size || R(e3, M(t3).length);
    }
    function I(t3, e3) {
      if (x(t3)) return t3;
      if (x(t3.data)) return t3.data;
      Array.isArray(t3) && (t3 = { data: t3 });
      let i2 = t3.type;
      return i2 || (i2 = S(e3) ? Uint16Array : Float32Array), new i2(t3.data);
    }
    function U(t3, e3) {
      const i2 = {};
      return Object.keys(e3).forEach((function(r2) {
        if (!S(r2)) {
          const a2 = e3[r2], s2 = a2.attrib || a2.name || a2.attribName || A.attribPrefix + r2;
          if (a2.value) {
            if (!Array.isArray(a2.value) && !x(a2.value)) throw new Error("array.value is not array or typedarray");
            i2[s2] = { value: a2.value };
          } else {
            let e4, o2, l2, h2;
            if (a2.buffer && a2.buffer instanceof WebGLBuffer) e4 = a2.buffer, h2 = a2.numComponents || a2.size, o2 = a2.type, l2 = a2.normalize;
            else if ("number" == typeof a2 || "number" == typeof a2.data) {
              const i3 = a2.data || a2, s3 = a2.type || Float32Array, u2 = i3 * s3.BYTES_PER_ELEMENT;
              o2 = v(s3), l2 = void 0 !== a2.normalize ? a2.normalize : (n2 = s3) === Int8Array || n2 === Uint8Array, h2 = a2.numComponents || a2.size || R(r2, i3), e4 = t3.createBuffer(), t3.bindBuffer(y, e4), t3.bufferData(y, u2, a2.drawType || 35044);
            } else {
              const i3 = I(a2, r2);
              e4 = C(t3, i3, void 0, a2.drawType), o2 = m(i3), l2 = void 0 !== a2.normalize ? a2.normalize : (function(t4) {
                return t4 instanceof Int8Array || t4 instanceof Uint8Array;
              })(i3), h2 = D(a2, r2);
            }
            i2[s2] = {
              buffer: e4,
              numComponents: h2,
              type: o2,
              normalize: l2,
              stride: a2.stride || 0,
              offset: a2.offset || 0,
              divisor: void 0 === a2.divisor ? void 0 : a2.divisor,
              drawType: a2.drawType
            };
          }
        }
        var n2;
      })), t3.bindBuffer(y, null), i2;
    }
    const B = ["position", "positions", "a_position"];
    function P(t3, e3, i2) {
      const r2 = U(t3, e3), n2 = Object.assign({}, i2 || {});
      n2.attribs = Object.assign({}, i2 ? i2.attribs : {}, r2);
      const a2 = e3.indices;
      if (a2) {
        const e4 = I(a2, "indices");
        n2.indices = C(t3, e4, 34963), n2.numElements = e4.length, n2.elementType = m(e4);
      } else n2.numElements || (n2.numElements = (function(t4, e4) {
        let i3, r3;
        for (r3 = 0; r3 < B.length && (i3 = B[r3], !(i3 in e4)) && (i3 = A.attribPrefix + i3, !(i3 in e4)); ++r3) ;
        r3 === B.length && (i3 = Object.keys(e4)[0]);
        const n3 = e4[i3];
        t4.bindBuffer(y, n3.buffer);
        const a3 = t4.getBufferParameter(y, 34660);
        var s2;
        t4.bindBuffer(y, null);
        const o2 = a3 / (5120 === (s2 = n3.type) || 5121 === s2 ? 1 : 5122 === s2 || 5123 === s2 ? 2 : 5124 === s2 || 5125 === s2 || 5126 === s2 ? 4 : 0), l2 = n3.numComponents || n3.size, h2 = o2 / l2;
        if (h2 % 1 != 0) throw new Error(`numComponents ${l2} not correct for length ${length}`);
        return h2;
      })(t3, n2.attribs));
      return n2;
    }
    function z(t3, e3, i2) {
      const r2 = "indices" === i2 ? 34963 : y;
      return C(t3, I(e3, i2), r2);
    }
    function O(t3, e3) {
      const i2 = {};
      return Object.keys(e3).forEach((function(r2) {
        i2[r2] = z(t3, e3[r2], r2);
      })), e3.indices ? (i2.numElements = e3.indices.length, i2.elementType = m(I(e3.indices))) : i2.numElements = (function(t4) {
        let e4, i3;
        for (i3 = 0; i3 < B.length && (e4 = B[i3], !(e4 in t4)); ++i3) ;
        i3 === B.length && (e4 = Object.keys(t4)[0]);
        const r2 = t4[e4], n2 = M(r2).length, a2 = D(r2, e4), s2 = n2 / a2;
        if (n2 % a2 > 0) throw new Error(`numComponents ${a2} not correct for length ${n2}`);
        return s2;
      })(e3), i2;
    }
    function N(t3, e3) {
      let i2 = 0;
      return t3.push = function() {
        for (let e4 = 0; e4 < arguments.length; ++e4) {
          const r2 = arguments[e4];
          if (r2 instanceof Array || x(r2)) for (let e5 = 0; e5 < r2.length; ++e5) t3[i2++] = r2[e5];
          else t3[i2++] = r2;
        }
      }, t3.reset = function(t4) {
        i2 = t4 || 0;
      }, t3.numComponents = e3, Object.defineProperty(t3, "numElements", {
        get: function() {
          return this.length / this.numComponents | 0;
        }
      }), t3;
    }
    function L(t3, e3, i2) {
      return N(new (i2 || Float32Array)(t3 * e3), t3);
    }
    function H(t3, e3, i2) {
      const r2 = t3.length, n2 = new Float32Array(3);
      for (let a2 = 0; a2 < r2; a2 += 3) i2(e3, [t3[a2], t3[a2 + 1], t3[a2 + 2]], n2), t3[a2] = n2[0], t3[a2 + 1] = n2[1], t3[a2 + 2] = n2[2];
    }
    function V(t3, i2, r2) {
      r2 = r2 || e2();
      const n2 = i2[0], a2 = i2[1], s2 = i2[2];
      return r2[0] = n2 * t3[0] + a2 * t3[1] + s2 * t3[2], r2[1] = n2 * t3[4] + a2 * t3[5] + s2 * t3[6], r2[2] = n2 * t3[8] + a2 * t3[9] + s2 * t3[10], r2;
    }
    function j(t3, e3) {
      return H(t3, e3, h), t3;
    }
    function G(t3, e3) {
      return H(t3, o(e3), V), t3;
    }
    function X(t3, e3) {
      return H(t3, e3, l), t3;
    }
    function q(t3, e3) {
      return Object.keys(t3).forEach((function(i2) {
        const r2 = t3[i2];
        i2.indexOf("pos") >= 0 ? X(r2, e3) : i2.indexOf("tan") >= 0 || i2.indexOf("binorm") >= 0 ? j(r2, e3) : i2.indexOf("norm") >= 0 && G(r2, e3);
      })), t3;
    }
    function W(t3, e3, i2) {
      return t3 = t3 || 2, {
        position: {
          numComponents: 2,
          data: [(e3 = e3 || 0) + -1 * (t3 *= 0.5), (i2 = i2 || 0) + -1 * t3, e3 + 1 * t3, i2 + -1 * t3, e3 + -1 * t3, i2 + 1 * t3, e3 + 1 * t3, i2 + 1 * t3]
        },
        normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
        indices: [0, 1, 2, 2, 1, 3]
      };
    }
    function Y(t3, e3, i2, r2, n2) {
      t3 = t3 || 1, e3 = e3 || 1, i2 = i2 || 1, r2 = r2 || 1, n2 = n2 || s();
      const a2 = (i2 + 1) * (r2 + 1), o2 = L(3, a2), l2 = L(3, a2), h2 = L(2, a2);
      for (let n3 = 0; n3 <= r2; n3++) for (let a3 = 0; a3 <= i2; a3++) {
        const s2 = a3 / i2, u3 = n3 / r2;
        o2.push(t3 * s2 - 0.5 * t3, 0, e3 * u3 - 0.5 * e3), l2.push(0, 1, 0), h2.push(s2, u3);
      }
      const u2 = i2 + 1, c2 = L(3, i2 * r2 * 2, Uint16Array);
      for (let t4 = 0; t4 < r2; t4++) for (let e4 = 0; e4 < i2; e4++) c2.push((t4 + 0) * u2 + e4, (t4 + 1) * u2 + e4, (t4 + 0) * u2 + e4 + 1), c2.push((t4 + 1) * u2 + e4, (t4 + 1) * u2 + e4 + 1, (t4 + 0) * u2 + e4 + 1);
      return q({ position: o2, normal: l2, texcoord: h2, indices: c2 }, n2);
    }
    function Z(t3, e3, i2, r2, n2, a2, s2) {
      if (e3 <= 0 || i2 <= 0) throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
      r2 = r2 || 0, a2 = a2 || 0;
      const o2 = (n2 = n2 || Math.PI) - r2, l2 = (s2 = s2 || 2 * Math.PI) - a2, h2 = (e3 + 1) * (i2 + 1), u2 = L(3, h2), c2 = L(3, h2), f2 = L(2, h2);
      for (let n3 = 0; n3 <= i2; n3++) for (let s3 = 0; s3 <= e3; s3++) {
        const h3 = s3 / e3, d3 = n3 / i2, b3 = l2 * h3 + a2, g2 = o2 * d3 + r2, _2 = Math.sin(b3), p2 = Math.cos(b3), m2 = Math.sin(g2), v2 = p2 * m2, x2 = Math.cos(g2), T2 = _2 * m2;
        u2.push(t3 * v2, t3 * x2, t3 * T2), c2.push(v2, x2, T2), f2.push(1 - h3, d3);
      }
      const d2 = e3 + 1, b2 = L(3, e3 * i2 * 2, Uint16Array);
      for (let t4 = 0; t4 < e3; t4++) for (let e4 = 0; e4 < i2; e4++) b2.push((e4 + 0) * d2 + t4, (e4 + 0) * d2 + t4 + 1, (e4 + 1) * d2 + t4), b2.push((e4 + 1) * d2 + t4, (e4 + 0) * d2 + t4 + 1, (e4 + 1) * d2 + t4 + 1);
      return { position: u2, normal: c2, texcoord: f2, indices: b2 };
    }
    const J = [[3, 7, 5, 1], [6, 2, 0, 4], [6, 7, 3, 2], [0, 1, 5, 4], [7, 6, 4, 5], [2, 3, 1, 0]];
    function K(t3) {
      const e3 = (t3 = t3 || 1) / 2, i2 = [[-e3, -e3, -e3], [+e3, -e3, -e3], [-e3, +e3, -e3], [+e3, +e3, -e3], [-e3, -e3, +e3], [+e3, -e3, +e3], [-e3, +e3, +e3], [+e3, +e3, +e3]], r2 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], n2 = [[1, 0], [0, 0], [0, 1], [1, 1]], a2 = L(3, 24), s2 = L(3, 24), o2 = L(2, 24), l2 = L(3, 12, Uint16Array);
      for (let t4 = 0; t4 < 6; ++t4) {
        const e4 = J[t4];
        for (let l3 = 0; l3 < 4; ++l3) {
          const h3 = i2[e4[l3]], u2 = r2[t4], c2 = n2[l3];
          a2.push(h3), s2.push(u2), o2.push(c2);
        }
        const h2 = 4 * t4;
        l2.push(h2 + 0, h2 + 1, h2 + 2), l2.push(h2 + 0, h2 + 2, h2 + 3);
      }
      return { position: a2, normal: s2, texcoord: o2, indices: l2 };
    }
    function Q(t3, e3, i2, r2, n2, a2, s2) {
      if (r2 < 3) throw new Error("radialSubdivisions must be 3 or greater");
      if (n2 < 1) throw new Error("verticalSubdivisions must be 1 or greater");
      const o2 = void 0 === a2 || a2, l2 = void 0 === s2 || s2, h2 = (o2 ? 2 : 0) + (l2 ? 2 : 0), u2 = (r2 + 1) * (n2 + 1 + h2), c2 = L(3, u2), f2 = L(3, u2), d2 = L(2, u2), b2 = L(3, r2 * (n2 + h2 / 2) * 2, Uint16Array), g2 = r2 + 1, _2 = Math.atan2(t3 - e3, i2), p2 = Math.cos(_2), m2 = Math.sin(_2), v2 = n2 + (l2 ? 2 : 0);
      for (let a3 = o2 ? -2 : 0; a3 <= v2; ++a3) {
        let s3, o3 = a3 / n2, l3 = i2 * o3;
        a3 < 0 ? (l3 = 0, o3 = 1, s3 = t3) : a3 > n2 ? (l3 = i2, o3 = 1, s3 = e3) : s3 = t3 + a3 / n2 * (e3 - t3), -2 !== a3 && a3 !== n2 + 2 || (s3 = 0, o3 = 0), l3 -= i2 / 2;
        for (let t4 = 0; t4 < g2; ++t4) {
          const e4 = Math.sin(t4 * Math.PI * 2 / r2), i3 = Math.cos(t4 * Math.PI * 2 / r2);
          c2.push(e4 * s3, l3, i3 * s3), a3 < 0 ? f2.push(0, -1, 0) : a3 > n2 ? f2.push(0, 1, 0) : 0 === s3 ? f2.push(0, 0, 0) : f2.push(e4 * p2, m2, i3 * p2), d2.push(t4 / r2, 1 - o3);
        }
      }
      for (let t4 = 0; t4 < n2 + h2; ++t4) if (!(1 === t4 && o2 || t4 === n2 + h2 - 2 && l2)) for (let e4 = 0; e4 < r2; ++e4) b2.push(g2 * (t4 + 0) + 0 + e4, g2 * (t4 + 0) + 1 + e4, g2 * (t4 + 1) + 1 + e4), b2.push(g2 * (t4 + 0) + 0 + e4, g2 * (t4 + 1) + 1 + e4, g2 * (t4 + 1) + 0 + e4);
      return { position: c2, normal: f2, texcoord: d2, indices: b2 };
    }
    function tt(t3, e3) {
      e3 = e3 || [];
      const i2 = [];
      for (let r2 = 0; r2 < t3.length; r2 += 4) {
        const n2 = t3[r2], a2 = t3.slice(r2 + 1, r2 + 4);
        a2.push.apply(a2, e3);
        for (let t4 = 0; t4 < n2; ++t4) i2.push.apply(i2, a2);
      }
      return i2;
    }
    function et() {
      const t3 = [0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, 30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0, 30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0, 0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, 30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, 30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30, 0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30, 100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, 30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, 30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30, 30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30, 67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, 30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, 30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30, 0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0, 0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0], e3 = tt([18, 0, 0, 1, 18, 0, 0, -1, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, -1, 0, 0]), i2 = tt([18, 200, 70, 120, 18, 80, 70, 200, 6, 70, 200, 210, 6, 200, 200, 70, 6, 210, 100, 70, 6, 210, 160, 70, 6, 70, 180, 210, 6, 100, 70, 210, 6, 76, 210, 100, 6, 140, 210, 80, 6, 90, 130, 110, 6, 160, 160, 220], [255]), r2 = t3.length / 3, n2 = {
        position: L(3, r2),
        texcoord: L(2, r2),
        normal: L(3, r2),
        color: L(4, r2, Uint8Array),
        indices: L(3, r2 / 3, Uint16Array)
      };
      n2.position.push(t3), n2.texcoord.push([0.22, 0.19, 0.22, 0.79, 0.34, 0.19, 0.22, 0.79, 0.34, 0.79, 0.34, 0.19, 0.34, 0.19, 0.34, 0.31, 0.62, 0.19, 0.34, 0.31, 0.62, 0.31, 0.62, 0.19, 0.34, 0.43, 0.34, 0.55, 0.49, 0.43, 0.34, 0.55, 0.49, 0.55, 0.49, 0.43, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0]), n2.normal.push(e3), n2.color.push(i2);
      for (let t4 = 0; t4 < r2; ++t4) n2.indices.push(t4);
      return n2;
    }
    function it(t3, e3, i2, a2, s2, o2, l2) {
      if (s2 <= 0) throw new Error("subdivisionDown must be > 0");
      const h2 = (l2 = l2 || 1) - (o2 = o2 || 0), u2 = 2 * (s2 + 1) * 4, c2 = L(3, u2), f2 = L(3, u2), d2 = L(2, u2);
      function b2(t4, e4, i3) {
        return t4 + (e4 - t4) * i3;
      }
      function g2(e4, i3, l3, u3, g3, _3) {
        for (let p3 = 0; p3 <= s2; p3++) {
          const m3 = i3 / 1, v2 = p3 / s2, x2 = 2 * (m3 - 0.5), T2 = (o2 + v2 * h2) * Math.PI, w2 = Math.sin(T2), y2 = Math.cos(T2), A2 = b2(t3, e4, w2), E2 = x2 * a2, C2 = y2 * t3, S2 = w2 * A2;
          c2.push(E2, C2, S2);
          const M2 = r(n([0, w2, y2], l3), u3);
          f2.push(M2), d2.push(m3 * g3 + _3, v2);
        }
      }
      for (let t4 = 0; t4 < 2; t4++) {
        const r2 = 2 * (t4 / 1 - 0.5);
        g2(e3, t4, [1, 1, 1], [0, 0, 0], 1, 0), g2(e3, t4, [0, 0, 0], [r2, 0, 0], 0, 0), g2(i2, t4, [1, 1, 1], [0, 0, 0], 1, 0), g2(i2, t4, [0, 0, 0], [r2, 0, 0], 0, 1);
      }
      const _2 = L(3, 2 * s2 * 4, Uint16Array);
      function p2(t4, e4) {
        for (let i3 = 0; i3 < s2; ++i3) _2.push(t4 + i3 + 0, t4 + i3 + 1, e4 + i3 + 0), _2.push(t4 + i3 + 1, e4 + i3 + 1, e4 + i3 + 0);
      }
      const m2 = s2 + 1;
      return p2(0 * m2, 4 * m2), p2(5 * m2, 7 * m2), p2(6 * m2, 2 * m2), p2(3 * m2, 1 * m2), {
        position: c2,
        normal: f2,
        texcoord: d2,
        indices: _2
      };
    }
    function rt(t3, e3, i2, r2, n2, a2) {
      return Q(t3, t3, e3, i2, r2, n2, a2);
    }
    function nt(t3, e3, i2, r2, n2, a2) {
      if (i2 < 3) throw new Error("radialSubdivisions must be 3 or greater");
      if (r2 < 3) throw new Error("verticalSubdivisions must be 3 or greater");
      n2 = n2 || 0;
      const s2 = (a2 = a2 || 2 * Math.PI) - n2, o2 = i2 + 1, l2 = r2 + 1, h2 = o2 * l2, u2 = L(3, h2), c2 = L(3, h2), f2 = L(2, h2), d2 = L(3, i2 * r2 * 2, Uint16Array);
      for (let a3 = 0; a3 < l2; ++a3) {
        const l3 = a3 / r2, h3 = l3 * Math.PI * 2, d3 = Math.sin(h3), b2 = t3 + d3 * e3, g2 = Math.cos(h3), _2 = g2 * e3;
        for (let t4 = 0; t4 < o2; ++t4) {
          const e4 = t4 / i2, r3 = n2 + e4 * s2, a4 = Math.sin(r3), o3 = Math.cos(r3), h4 = a4 * b2, p2 = o3 * b2, m2 = a4 * d3, v2 = o3 * d3;
          u2.push(h4, _2, p2), c2.push(m2, g2, v2), f2.push(e4, 1 - l3);
        }
      }
      for (let t4 = 0; t4 < r2; ++t4) for (let e4 = 0; e4 < i2; ++e4) {
        const i3 = 1 + e4, r3 = 1 + t4;
        d2.push(o2 * t4 + e4, o2 * r3 + e4, o2 * t4 + i3), d2.push(o2 * r3 + e4, o2 * r3 + i3, o2 * t4 + i3);
      }
      return { position: u2, normal: c2, texcoord: f2, indices: d2 };
    }
    function at(t3, e3, i2, r2, n2) {
      if (e3 < 3) throw new Error("divisions must be at least 3");
      n2 = n2 || 1, r2 = r2 || 0;
      const a2 = (e3 + 1) * ((i2 = i2 || 1) + 1), s2 = L(3, a2), o2 = L(3, a2), l2 = L(2, a2), h2 = L(3, i2 * e3 * 2, Uint16Array);
      let u2 = 0;
      const c2 = t3 - r2, f2 = e3 + 1;
      for (let t4 = 0; t4 <= i2; ++t4) {
        const a3 = r2 + c2 * Math.pow(t4 / i2, n2);
        for (let r3 = 0; r3 <= e3; ++r3) {
          const n3 = 2 * Math.PI * r3 / e3, c3 = a3 * Math.cos(n3), d2 = a3 * Math.sin(n3);
          if (s2.push(c3, 0, d2), o2.push(0, 1, 0), l2.push(1 - r3 / e3, t4 / i2), t4 > 0 && r3 !== e3) {
            const t5 = u2 + (r3 + 1), e4 = u2 + r3, i3 = u2 + r3 - f2, n4 = u2 + (r3 + 1) - f2;
            h2.push(t5, e4, i3), h2.push(t5, i3, n4);
          }
        }
        u2 += e3 + 1;
      }
      return { position: s2, normal: o2, texcoord: l2, indices: h2 };
    }
    function st(t3) {
      return function(e3) {
        const i2 = t3.apply(this, Array.prototype.slice.call(arguments, 1));
        return O(e3, i2);
      };
    }
    function ot(t3) {
      return function(e3) {
        const i2 = t3.apply(null, Array.prototype.slice.call(arguments, 1));
        return P(e3, i2);
      };
    }
    ot(et), st(et), ot(K), st(K), ot(Y), st(Y), ot(Z), st(Z), ot(Q), st(Q), ot(W), st(W), ot(it), st(it), ot(rt), st(rt), ot(nt), st(nt), ot(at), st(at);
    function lt(t3) {
      return !!t3.texStorage2D;
    }
    const ht = /* @__PURE__ */ (function() {
      const t3 = {}, e3 = {};
      return function(i2, r2) {
        return (function(i3) {
          const r3 = i3.constructor.name;
          if (!t3[r3]) {
            for (const t4 in i3) if ("number" == typeof i3[t4]) {
              const r4 = e3[i3[t4]];
              e3[i3[t4]] = r4 ? `${r4} | ${t4}` : t4;
            }
            t3[r3] = true;
          }
        })(i2), e3[r2] || ("number" == typeof r2 ? `0x${r2.toString(16)}` : r2);
      };
    })();
    new Uint8Array([128, 192, 255, 255]), /* @__PURE__ */ (function() {
      let t3;
    })();
    const ut = 6407, ct = 6408, ft = 33319, dt = 6403, bt = {};
    {
      const t3 = bt;
      t3[6406] = { numColorComponents: 1 }, t3[6409] = { numColorComponents: 1 }, t3[6410] = { numColorComponents: 2 }, t3[ut] = { numColorComponents: 3 }, t3[ct] = { numColorComponents: 4 }, t3[dt] = { numColorComponents: 1 }, t3[36244] = { numColorComponents: 1 }, t3[ft] = { numColorComponents: 2 }, t3[33320] = { numColorComponents: 2 }, t3[ut] = { numColorComponents: 3 }, t3[36248] = { numColorComponents: 3 }, t3[ct] = { numColorComponents: 4 }, t3[36249] = { numColorComponents: 4 }, t3[6402] = { numColorComponents: 1 }, t3[34041] = { numColorComponents: 2 };
    }
    const gt = T;
    function _t(t3) {
      return "undefined" != typeof document && document.getElementById ? document.getElementById(t3) : null;
    }
    const pt = 33984, mt = 34962, vt = 5126, xt = 5124, Tt = 5125, wt = 3553, yt = 34067, At = 32879, Et = 35866, Ct = {};
    function St(t3, e3) {
      return Ct[e3].bindPoint;
    }
    function Mt(t3, e3) {
      return function(i2) {
        t3.uniform1i(e3, i2);
      };
    }
    function kt(t3, e3) {
      return function(i2) {
        t3.uniform1iv(e3, i2);
      };
    }
    function Ft(t3, e3) {
      return function(i2) {
        t3.uniform2iv(e3, i2);
      };
    }
    function Rt(t3, e3) {
      return function(i2) {
        t3.uniform3iv(e3, i2);
      };
    }
    function Dt(t3, e3) {
      return function(i2) {
        t3.uniform4iv(e3, i2);
      };
    }
    function It(t3, e3, i2, r2) {
      const n2 = St(0, e3);
      return lt(t3) ? function(e4) {
        let a2, s2;
        w(0, e4) ? (a2 = e4, s2 = null) : (a2 = e4.texture, s2 = e4.sampler), t3.uniform1i(r2, i2), t3.activeTexture(pt + i2), t3.bindTexture(n2, a2), t3.bindSampler(i2, s2);
      } : function(e4) {
        t3.uniform1i(r2, i2), t3.activeTexture(pt + i2), t3.bindTexture(n2, e4);
      };
    }
    function Ut(t3, e3, i2, r2, n2) {
      const a2 = St(0, e3), s2 = new Int32Array(n2);
      for (let t4 = 0; t4 < n2; ++t4) s2[t4] = i2 + t4;
      return lt(t3) ? function(e4) {
        t3.uniform1iv(r2, s2), e4.forEach((function(e5, r3) {
          let n3, o2;
          t3.activeTexture(pt + s2[r3]), w(0, e5) ? (n3 = e5, o2 = null) : (n3 = e5.texture, o2 = e5.sampler), t3.bindSampler(i2, o2), t3.bindTexture(a2, n3);
        }));
      } : function(e4) {
        t3.uniform1iv(r2, s2), e4.forEach((function(e5, i3) {
          t3.activeTexture(pt + s2[i3]), t3.bindTexture(a2, e5);
        }));
      };
    }
    function Bt(t3, e3) {
      return function(i2) {
        if (i2.value) switch (t3.disableVertexAttribArray(e3), i2.value.length) {
          case 4:
            t3.vertexAttrib4fv(e3, i2.value);
            break;
          case 3:
            t3.vertexAttrib3fv(e3, i2.value);
            break;
          case 2:
            t3.vertexAttrib2fv(e3, i2.value);
            break;
          case 1:
            t3.vertexAttrib1fv(e3, i2.value);
            break;
          default:
            throw new Error("the length of a float constant value must be between 1 and 4!");
        }
        else t3.bindBuffer(mt, i2.buffer), t3.enableVertexAttribArray(e3), t3.vertexAttribPointer(e3, i2.numComponents || i2.size, i2.type || vt, i2.normalize || false, i2.stride || 0, i2.offset || 0), void 0 !== i2.divisor && t3.vertexAttribDivisor(e3, i2.divisor);
      };
    }
    function Pt(t3, e3) {
      return function(i2) {
        if (i2.value) {
          if (t3.disableVertexAttribArray(e3), 4 !== i2.value.length) throw new Error("The length of an integer constant value must be 4!");
          t3.vertexAttrib4iv(e3, i2.value);
        } else t3.bindBuffer(mt, i2.buffer), t3.enableVertexAttribArray(e3), t3.vertexAttribIPointer(e3, i2.numComponents || i2.size, i2.type || xt, i2.stride || 0, i2.offset || 0), void 0 !== i2.divisor && t3.vertexAttribDivisor(e3, i2.divisor);
      };
    }
    function zt(t3, e3) {
      return function(i2) {
        if (i2.value) {
          if (t3.disableVertexAttribArray(e3), 4 !== i2.value.length) throw new Error("The length of an unsigned integer constant value must be 4!");
          t3.vertexAttrib4uiv(e3, i2.value);
        } else t3.bindBuffer(mt, i2.buffer), t3.enableVertexAttribArray(e3), t3.vertexAttribIPointer(e3, i2.numComponents || i2.size, i2.type || Tt, i2.stride || 0, i2.offset || 0), void 0 !== i2.divisor && t3.vertexAttribDivisor(e3, i2.divisor);
      };
    }
    function Ot(t3, e3, i2) {
      const r2 = i2.size, n2 = i2.count;
      return function(i3) {
        t3.bindBuffer(mt, i3.buffer);
        const a2 = i3.size || i3.numComponents || r2, s2 = a2 / n2, o2 = i3.type || vt, l2 = Ct[o2].size * a2, h2 = i3.normalize || false, u2 = i3.offset || 0, c2 = l2 / n2;
        for (let r3 = 0; r3 < n2; ++r3) t3.enableVertexAttribArray(e3 + r3), t3.vertexAttribPointer(e3 + r3, s2, o2, h2, l2, u2 + c2 * r3), void 0 !== i3.divisor && t3.vertexAttribDivisor(e3 + r3, i3.divisor);
      };
    }
    Ct[5126] = {
      Type: Float32Array,
      size: 4,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform1f(e3, i2);
        };
      },
      arraySetter: function(t3, e3) {
        return function(i2) {
          t3.uniform1fv(e3, i2);
        };
      }
    }, Ct[35664] = {
      Type: Float32Array,
      size: 8,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform2fv(e3, i2);
        };
      },
      cols: 2
    }, Ct[35665] = {
      Type: Float32Array,
      size: 12,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform3fv(e3, i2);
        };
      },
      cols: 3
    }, Ct[35666] = {
      Type: Float32Array,
      size: 16,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform4fv(e3, i2);
        };
      },
      cols: 4
    }, Ct[5124] = { Type: Int32Array, size: 4, setter: Mt, arraySetter: kt }, Ct[35667] = {
      Type: Int32Array,
      size: 8,
      setter: Ft,
      cols: 2
    }, Ct[35668] = { Type: Int32Array, size: 12, setter: Rt, cols: 3 }, Ct[35669] = {
      Type: Int32Array,
      size: 16,
      setter: Dt,
      cols: 4
    }, Ct[5125] = {
      Type: Uint32Array,
      size: 4,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform1ui(e3, i2);
        };
      },
      arraySetter: function(t3, e3) {
        return function(i2) {
          t3.uniform1uiv(e3, i2);
        };
      }
    }, Ct[36294] = {
      Type: Uint32Array,
      size: 8,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform2uiv(e3, i2);
        };
      },
      cols: 2
    }, Ct[36295] = {
      Type: Uint32Array,
      size: 12,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform3uiv(e3, i2);
        };
      },
      cols: 3
    }, Ct[36296] = {
      Type: Uint32Array,
      size: 16,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniform4uiv(e3, i2);
        };
      },
      cols: 4
    }, Ct[35670] = { Type: Uint32Array, size: 4, setter: Mt, arraySetter: kt }, Ct[35671] = {
      Type: Uint32Array,
      size: 8,
      setter: Ft,
      cols: 2
    }, Ct[35672] = { Type: Uint32Array, size: 12, setter: Rt, cols: 3 }, Ct[35673] = {
      Type: Uint32Array,
      size: 16,
      setter: Dt,
      cols: 4
    }, Ct[35674] = {
      Type: Float32Array,
      size: 32,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix2fv(e3, false, i2);
        };
      },
      rows: 2,
      cols: 2
    }, Ct[35675] = {
      Type: Float32Array,
      size: 48,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix3fv(e3, false, i2);
        };
      },
      rows: 3,
      cols: 3
    }, Ct[35676] = {
      Type: Float32Array,
      size: 64,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix4fv(e3, false, i2);
        };
      },
      rows: 4,
      cols: 4
    }, Ct[35685] = {
      Type: Float32Array,
      size: 32,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix2x3fv(e3, false, i2);
        };
      },
      rows: 2,
      cols: 3
    }, Ct[35686] = {
      Type: Float32Array,
      size: 32,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix2x4fv(e3, false, i2);
        };
      },
      rows: 2,
      cols: 4
    }, Ct[35687] = {
      Type: Float32Array,
      size: 48,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix3x2fv(e3, false, i2);
        };
      },
      rows: 3,
      cols: 2
    }, Ct[35688] = {
      Type: Float32Array,
      size: 48,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix3x4fv(e3, false, i2);
        };
      },
      rows: 3,
      cols: 4
    }, Ct[35689] = {
      Type: Float32Array,
      size: 64,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix4x2fv(e3, false, i2);
        };
      },
      rows: 4,
      cols: 2
    }, Ct[35690] = {
      Type: Float32Array,
      size: 64,
      setter: function(t3, e3) {
        return function(i2) {
          t3.uniformMatrix4x3fv(e3, false, i2);
        };
      },
      rows: 4,
      cols: 3
    }, Ct[35678] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: wt }, Ct[35680] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: yt
    }, Ct[35679] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: At }, Ct[35682] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: wt
    }, Ct[36289] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: Et }, Ct[36292] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: Et
    }, Ct[36293] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: yt }, Ct[36298] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: wt
    }, Ct[36299] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: At }, Ct[36300] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: yt
    }, Ct[36303] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: Et }, Ct[36306] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: wt
    }, Ct[36307] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: At }, Ct[36308] = {
      Type: null,
      size: 0,
      setter: It,
      arraySetter: Ut,
      bindPoint: yt
    }, Ct[36311] = { Type: null, size: 0, setter: It, arraySetter: Ut, bindPoint: Et };
    const Nt = {};
    Nt[5126] = { size: 4, setter: Bt }, Nt[35664] = { size: 8, setter: Bt }, Nt[35665] = {
      size: 12,
      setter: Bt
    }, Nt[35666] = { size: 16, setter: Bt }, Nt[5124] = { size: 4, setter: Pt }, Nt[35667] = {
      size: 8,
      setter: Pt
    }, Nt[35668] = { size: 12, setter: Pt }, Nt[35669] = { size: 16, setter: Pt }, Nt[5125] = {
      size: 4,
      setter: zt
    }, Nt[36294] = { size: 8, setter: zt }, Nt[36295] = { size: 12, setter: zt }, Nt[36296] = {
      size: 16,
      setter: zt
    }, Nt[35670] = { size: 4, setter: Pt }, Nt[35671] = { size: 8, setter: Pt }, Nt[35672] = {
      size: 12,
      setter: Pt
    }, Nt[35673] = { size: 16, setter: Pt }, Nt[35674] = { size: 4, setter: Ot, count: 2 }, Nt[35675] = {
      size: 9,
      setter: Ot,
      count: 3
    }, Nt[35676] = { size: 16, setter: Ot, count: 4 };
    const Lt = /ERROR:\s*\d+:(\d+)/gi;
    function Ht(t3, e3 = "", i2 = 0) {
      const r2 = [...e3.matchAll(Lt)], n2 = new Map(r2.map(((t4, i3) => {
        const n3 = parseInt(t4[1]), a2 = r2[i3 + 1], s2 = a2 ? a2.index : e3.length;
        return [n3 - 1, e3.substring(t4.index, s2)];
      })));
      return t3.split("\n").map(((t4, e4) => {
        const r3 = n2.get(e4);
        return `${e4 + 1 + i2}: ${t4}${r3 ? `

^^^ ${r3}` : ""}`;
      })).join("\n");
    }
    const Vt = /^[ \t]*\n/;
    function jt(t3, e3, i2, r2) {
      const n2 = r2 || gt, a2 = t3.createShader(i2);
      let s2 = 0;
      Vt.test(e3) && (s2 = 1, e3 = e3.replace(Vt, "")), t3.shaderSource(a2, e3), t3.compileShader(a2);
      if (!t3.getShaderParameter(a2, 35713)) {
        const r3 = t3.getShaderInfoLog(a2);
        return n2(`${Ht(e3, r3, s2)}
Error compiling ${ht(t3, i2)}: ${r3}`), t3.deleteShader(a2), null;
      }
      return a2;
    }
    function Gt(t3, e3, i2) {
      let r2, n2;
      if ("function" == typeof e3 && (i2 = e3, e3 = void 0), "function" == typeof t3) i2 = t3, t3 = void 0;
      else if (t3 && !Array.isArray(t3)) {
        if (t3.errorCallback) return t3;
        const e4 = t3;
        i2 = e4.errorCallback, t3 = e4.attribLocations, r2 = e4.transformFeedbackVaryings, n2 = e4.transformFeedbackMode;
      }
      const a2 = { errorCallback: i2 || gt, transformFeedbackVaryings: r2, transformFeedbackMode: n2 };
      if (t3) {
        let i3 = {};
        Array.isArray(t3) ? t3.forEach((function(t4, r3) {
          i3[t4] = e3 ? e3[r3] : r3;
        })) : i3 = t3, a2.attribLocations = i3;
      }
      return a2;
    }
    const Xt = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
    function qt(t3, e3) {
      return e3.indexOf("frag") >= 0 ? 35632 : e3.indexOf("vert") >= 0 ? 35633 : void 0;
    }
    function Wt(t3, e3) {
      e3.forEach((function(e4) {
        t3.deleteShader(e4);
      }));
    }
    function Yt(t3, e3, i2, r2, n2) {
      const a2 = Gt(i2, r2, n2), s2 = [], o2 = [];
      for (let i3 = 0; i3 < e3.length; ++i3) {
        let r3 = e3[i3];
        if ("string" == typeof r3) {
          const e4 = _t(r3), n3 = e4 ? e4.text : r3;
          let s3 = t3[Xt[i3]];
          e4 && e4.type && (s3 = qt(0, e4.type) || s3), r3 = jt(t3, n3, s3, a2.errorCallback), o2.push(r3);
        }
        l2 = r3, "undefined" != typeof WebGLShader && l2 instanceof WebGLShader && s2.push(r3);
      }
      var l2;
      if (s2.length !== e3.length) return a2.errorCallback("not enough shaders for program"), Wt(t3, o2), null;
      const h2 = t3.createProgram();
      s2.forEach((function(e4) {
        t3.attachShader(h2, e4);
      })), a2.attribLocations && Object.keys(a2.attribLocations).forEach((function(e4) {
        t3.bindAttribLocation(h2, a2.attribLocations[e4], e4);
      }));
      let u2 = a2.transformFeedbackVaryings;
      u2 && (u2.attribs && (u2 = u2.attribs), Array.isArray(u2) || (u2 = Object.keys(u2)), t3.transformFeedbackVaryings(h2, u2, a2.transformFeedbackMode || 35981)), t3.linkProgram(h2);
      if (!t3.getProgramParameter(h2, 35714)) {
        const e4 = t3.getProgramInfoLog(h2);
        return a2.errorCallback(`${s2.map(((e5) => {
          const i3 = Ht(t3.getShaderSource(e5), "", 0), r3 = t3.getShaderParameter(e5, t3.SHADER_TYPE);
          return `${ht(t3, r3)}
${i3}}`;
        })).join("\n")}
Error in program linking: ${e4}`), t3.deleteProgram(h2), Wt(t3, o2), null;
      }
      return h2;
    }
    function Zt(t3, e3, i2, r2, n2) {
      const a2 = Gt(i2, r2, n2), s2 = [];
      for (let i3 = 0; i3 < e3.length; ++i3) {
        const r3 = jt(t3, e3[i3], t3[Xt[i3]], a2.errorCallback);
        if (!r3) return null;
        s2.push(r3);
      }
      return Yt(t3, s2, a2);
    }
    function Jt(t3) {
      const e3 = t3.name;
      return e3.startsWith("gl_") || e3.startsWith("webgl_");
    }
    const Kt = /(\.|\[|]|\w+)/g;
    function $t(t3, e3, i2, r2) {
      const n2 = t3.split(Kt).filter(((t4) => "" !== t4));
      let a2 = 0, s2 = "";
      for (; ; ) {
        const t4 = n2[a2++];
        s2 += t4;
        const l2 = (o2 = t4[0]) >= "0" && o2 <= "9", h2 = l2 ? parseInt(t4) : t4;
        l2 && (s2 += n2[a2++]);
        if (a2 === n2.length) {
          i2[h2] = e3;
          break;
        }
        {
          const t5 = n2[a2++], e4 = "[" === t5, o3 = i2[h2] || (e4 ? [] : {});
          i2[h2] = o3, i2 = o3, r2[s2] = r2[s2] || /* @__PURE__ */ (function(t6) {
            return function(e5) {
              ie(t6, e5);
            };
          })(o3), s2 += t5;
        }
      }
      var o2;
    }
    function Qt(t3, e3) {
      let i2 = 0;
      function r2(e4, r3, n3) {
        const a3 = r3.name.endsWith("[0]"), s3 = r3.type, o2 = Ct[s3];
        if (!o2) throw new Error(`unknown type: 0x${s3.toString(16)}`);
        let l2;
        if (o2.bindPoint) {
          const e5 = i2;
          i2 += r3.size, l2 = a3 ? o2.arraySetter(t3, s3, e5, n3, r3.size) : o2.setter(t3, s3, e5, n3, r3.size);
        } else l2 = o2.arraySetter && a3 ? o2.arraySetter(t3, n3) : o2.setter(t3, n3);
        return l2.location = n3, l2;
      }
      const n2 = {}, a2 = {}, s2 = t3.getProgramParameter(e3, 35718);
      for (let i3 = 0; i3 < s2; ++i3) {
        const s3 = t3.getActiveUniform(e3, i3);
        if (Jt(s3)) continue;
        let o2 = s3.name;
        o2.endsWith("[0]") && (o2 = o2.substr(0, o2.length - 3));
        const l2 = t3.getUniformLocation(e3, s3.name);
        if (l2) {
          const t4 = r2(0, s3, l2);
          n2[o2] = t4, $t(o2, t4, a2, n2);
        }
      }
      return n2;
    }
    function te(t3, e3) {
      const i2 = {}, r2 = t3.getProgramParameter(e3, 35971);
      for (let n2 = 0; n2 < r2; ++n2) {
        const r3 = t3.getTransformFeedbackVarying(e3, n2);
        i2[r3.name] = { index: n2, type: r3.type, size: r3.size };
      }
      return i2;
    }
    function ee(t3, e3) {
      const i2 = t3.getProgramParameter(e3, 35718), r2 = [], n2 = [];
      for (let a3 = 0; a3 < i2; ++a3) {
        n2.push(a3), r2.push({});
        const i3 = t3.getActiveUniform(e3, a3);
        r2[a3].name = i3.name;
      }
      [["UNIFORM_TYPE", "type"], ["UNIFORM_SIZE", "size"], ["UNIFORM_BLOCK_INDEX", "blockNdx"], ["UNIFORM_OFFSET", "offset"]].forEach((function(i3) {
        const a3 = i3[0], s3 = i3[1];
        t3.getActiveUniforms(e3, n2, t3[a3]).forEach((function(t4, e4) {
          r2[e4][s3] = t4;
        }));
      }));
      const a2 = {}, s2 = t3.getProgramParameter(e3, 35382);
      for (let i3 = 0; i3 < s2; ++i3) {
        const r3 = t3.getActiveUniformBlockName(e3, i3), n3 = {
          index: t3.getUniformBlockIndex(e3, r3),
          usedByVertexShader: t3.getActiveUniformBlockParameter(e3, i3, 35396),
          usedByFragmentShader: t3.getActiveUniformBlockParameter(e3, i3, 35398),
          size: t3.getActiveUniformBlockParameter(e3, i3, 35392),
          uniformIndices: t3.getActiveUniformBlockParameter(e3, i3, 35395)
        };
        n3.used = n3.usedByVertexShader || n3.usedByFragmentShader, a2[r3] = n3;
      }
      return { blockSpecs: a2, uniformData: r2 };
    }
    function ie(t3, e3) {
      for (const i2 in e3) {
        const r2 = t3[i2];
        "function" == typeof r2 ? r2(e3[i2]) : ie(t3[i2], e3[i2]);
      }
    }
    function re(t3, ...e3) {
      const i2 = t3.uniformSetters || t3, r2 = e3.length;
      for (let t4 = 0; t4 < r2; ++t4) {
        const r3 = e3[t4];
        if (Array.isArray(r3)) {
          const t5 = r3.length;
          for (let e4 = 0; e4 < t5; ++e4) re(i2, r3[e4]);
        } else for (const t5 in r3) {
          const e4 = i2[t5];
          e4 && e4(r3[t5]);
        }
      }
    }
    function ne(t3, e3) {
      const i2 = {}, r2 = t3.getProgramParameter(e3, 35721);
      for (let n2 = 0; n2 < r2; ++n2) {
        const r3 = t3.getActiveAttrib(e3, n2);
        if (Jt(r3)) continue;
        const a2 = t3.getAttribLocation(e3, r3.name), s2 = Nt[r3.type], o2 = s2.setter(t3, a2, s2);
        o2.location = a2, i2[r3.name] = o2;
      }
      return i2;
    }
    function ae(t3, e3) {
      const i2 = { program: e3, uniformSetters: Qt(t3, e3), attribSetters: ne(t3, e3) };
      return lt(t3) && (i2.uniformBlockSpec = ee(t3, e3), i2.transformFeedbackInfo = te(t3, e3)), i2;
    }
    function se(t3, e3, i2, r2, n2) {
      const a2 = Gt(i2, r2, n2);
      let s2 = true;
      if (e3 = e3.map((function(t4) {
        if (t4.indexOf("\n") < 0) {
          const e4 = _t(t4);
          e4 ? t4 = e4.text : (a2.errorCallback("no element with id: " + t4), s2 = false);
        }
        return t4;
      })), !s2) return null;
      const o2 = Zt(t3, e3, a2);
      return o2 ? ae(t3, o2) : null;
    }
    const oe = 36096, le = 33306, he = {};
    he[34041] = le, he[6401] = 36128, he[36168] = 36128, he[6402] = oe, he[33189] = oe, he[33190] = oe, he[36012] = oe, he[35056] = le, he[36013] = le;
    const ue = {};
    ue[32854] = true, ue[32855] = true, ue[36194] = true, ue[34041] = true, ue[33189] = true, ue[6401] = true, ue[36168] = true;
    var ce = {};
    const fe = { position: 3, normal: 3, tangent: 3, texcoord: 2, texcoord0: 2, texcoord1: 2, texcoord2: 2 };
    var de = {};
    class be {
      constructor() {
        this.attribs = {};
      }
      disableAll() {
        for (let t3 in this.attribs) this.gl.disableVertexAttribArray(this.attribs[t3]);
        this.attribs = {};
      }
      enable(t3, e3) {
        this.gl = t3;
        var i2 = {};
        for (let n2 in e3) {
          var r2 = e3[n2];
          void 0 !== r2.loc && (void 0 === this.attribs[r2.loc] && t3.enableVertexAttribArray(r2.loc), t3.vertexAttribPointer(r2.loc, r2.size, r2.type, false, r2.stride, r2.offset), i2[r2.loc] = r2.loc, this.attribs[n2] = null);
        }
        for (let t4 in this.attribs) ;
        this.attribs = i2;
      }
    }
    class ge {
      static CreateProgramAttributes(t3, e3) {
        var i2 = {}, r2 = 0;
        for (let s2 in e3) {
          var n2 = e3[s2], a2 = fe[s2];
          i2[n2] = { type: t3.FLOAT, size: a2, offset: 4 * r2 }, r2 += a2;
        }
        for (let t4 in i2) i2[t4].stride = 4 * r2;
        return i2;
      }
      CleanUpPrograms() {
        de = {};
      }
      ReleaseProgram(t3) {
      }
      static _GetProgram(t3) {
        return de[t3];
      }
      static RegisterProgram(t3, e3) {
        if (!de[t3]) {
          var i2 = e3.shaders;
          de[t3] = { shaders: [i2[0], i2[1]], attributes: e3.attributes };
        }
        return de[t3];
      }
      static GetProgram(t3, e3, i2, r2) {
        var n2 = de[e3], a2 = "";
        for (var s2 in i2) a2 += s2 + ":" + i2[s2] + "-";
        if (!n2) {
          var o2 = e3.split("."), l2 = ce[o2[0]][o2[1]];
          l2 && (n2 = ge.RegisterProgram(e3, l2));
        }
        if (!n2) throw "Program not registered: " + o2;
        n2.programInfo || (n2.programInfo = {}), n2.programInfo[a2] = ge.CompileProgram(t3, n2.shaders, i2), r2 = r2 || n2.attributes && ge.CreateProgramAttributes(t3, n2.attributes);
        var h2 = n2.programInfo[a2];
        if (r2) for (var s2 in r2) {
          var u2 = h2.attribSetters[s2];
          u2 && (r2[s2] = r2[s2] || {}, r2[s2].loc = u2.location);
        }
        return h2.attributes = r2, h2;
      }
      static CompileProgram(t3, e3, i2, r2) {
        var n2 = "";
        for (var a2 in i2) {
          var s2 = i2[a2];
          n2 = "#define " + a2 + " " + (null === s2 ? "" : s2) + "\n";
        }
        var o2 = {};
        const l2 = se(t3, [n2 + e3[0], n2 + e3[1]], null, null);
        if (r2) for (var a2 in r2) {
          var h2 = l2.attribSetters[a2];
          h2 && (r2[a2] = r2[a2] || {}, r2[a2].loc = h2.location);
        }
        for (var a2 in l2.uniformSetters) o2[a2] = l2.uniformSetters[a2].location;
        return l2.uniforms = o2, l2;
      }
    }
    var _e = new ge(), pe = 1e-6, me = "undefined" != typeof Float32Array ? Float32Array : Array;
    Math.random;
    Math.PI;
    function ve() {
      var t3 = new me(3);
      return me != Float32Array && (t3[0] = 0, t3[1] = 0, t3[2] = 0), t3;
    }
    function xe(t3) {
      var e3 = new me(3);
      return e3[0] = t3[0], e3[1] = t3[1], e3[2] = t3[2], e3;
    }
    function Te(t3) {
      var e3 = t3[0], i2 = t3[1], r2 = t3[2];
      return Math.hypot(e3, i2, r2);
    }
    function we(t3, e3, i2) {
      var r2 = new me(3);
      return r2[0] = t3, r2[1] = e3, r2[2] = i2, r2;
    }
    function ye(t3, e3) {
      return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3;
    }
    function Ae(t3, e3, i2, r2) {
      return t3[0] = e3, t3[1] = i2, t3[2] = r2, t3;
    }
    function Ee(t3, e3, i2) {
      return t3[0] = e3[0] + i2[0], t3[1] = e3[1] + i2[1], t3[2] = e3[2] + i2[2], t3;
    }
    function Ce(t3, e3, i2) {
      return t3[0] = e3[0] - i2[0], t3[1] = e3[1] - i2[1], t3[2] = e3[2] - i2[2], t3;
    }
    function Se(t3, e3, i2) {
      return t3[0] = e3[0] * i2[0], t3[1] = e3[1] * i2[1], t3[2] = e3[2] * i2[2], t3;
    }
    function Me(t3, e3, i2) {
      return t3[0] = Math.min(e3[0], i2[0]), t3[1] = Math.min(e3[1], i2[1]), t3[2] = Math.min(e3[2], i2[2]), t3;
    }
    function ke(t3, e3, i2) {
      return t3[0] = Math.max(e3[0], i2[0]), t3[1] = Math.max(e3[1], i2[1]), t3[2] = Math.max(e3[2], i2[2]), t3;
    }
    function Fe(t3, e3, i2) {
      return t3[0] = e3[0] * i2, t3[1] = e3[1] * i2, t3[2] = e3[2] * i2, t3;
    }
    function Re(t3, e3, i2, r2) {
      return t3[0] = e3[0] + i2[0] * r2, t3[1] = e3[1] + i2[1] * r2, t3[2] = e3[2] + i2[2] * r2, t3;
    }
    function De(t3) {
      var e3 = t3[0], i2 = t3[1], r2 = t3[2];
      return e3 * e3 + i2 * i2 + r2 * r2;
    }
    function Ie(t3, e3) {
      return t3[0] = -e3[0], t3[1] = -e3[1], t3[2] = -e3[2], t3;
    }
    function Ue(t3, e3) {
      var i2 = e3[0], r2 = e3[1], n2 = e3[2], a2 = i2 * i2 + r2 * r2 + n2 * n2;
      return a2 > 0 && (a2 = 1 / Math.sqrt(a2)), t3[0] = e3[0] * a2, t3[1] = e3[1] * a2, t3[2] = e3[2] * a2, t3;
    }
    function Be(t3, e3) {
      return t3[0] * e3[0] + t3[1] * e3[1] + t3[2] * e3[2];
    }
    function Pe(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = i2[0], o2 = i2[1], l2 = i2[2];
      return t3[0] = n2 * l2 - a2 * o2, t3[1] = a2 * s2 - r2 * l2, t3[2] = r2 * o2 - n2 * s2, t3;
    }
    function ze(t3, e3, i2, r2) {
      var n2 = e3[0], a2 = e3[1], s2 = e3[2];
      return t3[0] = n2 + r2 * (i2[0] - n2), t3[1] = a2 + r2 * (i2[1] - a2), t3[2] = s2 + r2 * (i2[2] - s2), t3;
    }
    function Oe(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = i2[3] * r2 + i2[7] * n2 + i2[11] * a2 + i2[15];
      return s2 = s2 || 1, t3[0] = (i2[0] * r2 + i2[4] * n2 + i2[8] * a2 + i2[12]) / s2, t3[1] = (i2[1] * r2 + i2[5] * n2 + i2[9] * a2 + i2[13]) / s2, t3[2] = (i2[2] * r2 + i2[6] * n2 + i2[10] * a2 + i2[14]) / s2, t3;
    }
    function Ne(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2];
      return t3[0] = r2 * i2[0] + n2 * i2[3] + a2 * i2[6], t3[1] = r2 * i2[1] + n2 * i2[4] + a2 * i2[7], t3[2] = r2 * i2[2] + n2 * i2[5] + a2 * i2[8], t3;
    }
    Math.hypot || (Math.hypot = function() {
      for (var t3 = 0, e3 = arguments.length; e3--; ) t3 += arguments[e3] * arguments[e3];
      return Math.sqrt(t3);
    });
    var Le, He = Ce, Ve = Te;
    Le = ve();
    function je() {
      var t3 = new me(16);
      return me != Float32Array && (t3[1] = 0, t3[2] = 0, t3[3] = 0, t3[4] = 0, t3[6] = 0, t3[7] = 0, t3[8] = 0, t3[9] = 0, t3[11] = 0, t3[12] = 0, t3[13] = 0, t3[14] = 0), t3[0] = 1, t3[5] = 1, t3[10] = 1, t3[15] = 1, t3;
    }
    function Ge(t3, e3) {
      return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3[4] = e3[4], t3[5] = e3[5], t3[6] = e3[6], t3[7] = e3[7], t3[8] = e3[8], t3[9] = e3[9], t3[10] = e3[10], t3[11] = e3[11], t3[12] = e3[12], t3[13] = e3[13], t3[14] = e3[14], t3[15] = e3[15], t3;
    }
    function Xe(t3, e3, i2, r2, n2, a2, s2, o2, l2, h2, u2, c2, f2, d2, b2, g2) {
      var _2 = new me(16);
      return _2[0] = t3, _2[1] = e3, _2[2] = i2, _2[3] = r2, _2[4] = n2, _2[5] = a2, _2[6] = s2, _2[7] = o2, _2[8] = l2, _2[9] = h2, _2[10] = u2, _2[11] = c2, _2[12] = f2, _2[13] = d2, _2[14] = b2, _2[15] = g2, _2;
    }
    function qe(t3) {
      return t3[0] = 1, t3[1] = 0, t3[2] = 0, t3[3] = 0, t3[4] = 0, t3[5] = 1, t3[6] = 0, t3[7] = 0, t3[8] = 0, t3[9] = 0, t3[10] = 1, t3[11] = 0, t3[12] = 0, t3[13] = 0, t3[14] = 0, t3[15] = 1, t3;
    }
    function We(t3, e3) {
      var i2 = e3[0], r2 = e3[1], n2 = e3[2], a2 = e3[3], s2 = e3[4], o2 = e3[5], l2 = e3[6], h2 = e3[7], u2 = e3[8], c2 = e3[9], f2 = e3[10], d2 = e3[11], b2 = e3[12], g2 = e3[13], _2 = e3[14], p2 = e3[15], m2 = i2 * o2 - r2 * s2, v2 = i2 * l2 - n2 * s2, x2 = i2 * h2 - a2 * s2, T2 = r2 * l2 - n2 * o2, w2 = r2 * h2 - a2 * o2, y2 = n2 * h2 - a2 * l2, A2 = u2 * g2 - c2 * b2, E2 = u2 * _2 - f2 * b2, C2 = u2 * p2 - d2 * b2, S2 = c2 * _2 - f2 * g2, M2 = c2 * p2 - d2 * g2, k2 = f2 * p2 - d2 * _2, F2 = m2 * k2 - v2 * M2 + x2 * S2 + T2 * C2 - w2 * E2 + y2 * A2;
      return F2 ? (F2 = 1 / F2, t3[0] = (o2 * k2 - l2 * M2 + h2 * S2) * F2, t3[1] = (n2 * M2 - r2 * k2 - a2 * S2) * F2, t3[2] = (g2 * y2 - _2 * w2 + p2 * T2) * F2, t3[3] = (f2 * w2 - c2 * y2 - d2 * T2) * F2, t3[4] = (l2 * C2 - s2 * k2 - h2 * E2) * F2, t3[5] = (i2 * k2 - n2 * C2 + a2 * E2) * F2, t3[6] = (_2 * x2 - b2 * y2 - p2 * v2) * F2, t3[7] = (u2 * y2 - f2 * x2 + d2 * v2) * F2, t3[8] = (s2 * M2 - o2 * C2 + h2 * A2) * F2, t3[9] = (r2 * C2 - i2 * M2 - a2 * A2) * F2, t3[10] = (b2 * w2 - g2 * x2 + p2 * m2) * F2, t3[11] = (c2 * x2 - u2 * w2 - d2 * m2) * F2, t3[12] = (o2 * E2 - s2 * S2 - l2 * A2) * F2, t3[13] = (i2 * S2 - r2 * E2 + n2 * A2) * F2, t3[14] = (g2 * v2 - b2 * T2 - _2 * m2) * F2, t3[15] = (u2 * T2 - c2 * v2 + f2 * m2) * F2, t3) : null;
    }
    function Ye(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = e3[3], o2 = e3[4], l2 = e3[5], h2 = e3[6], u2 = e3[7], c2 = e3[8], f2 = e3[9], d2 = e3[10], b2 = e3[11], g2 = e3[12], _2 = e3[13], p2 = e3[14], m2 = e3[15], v2 = i2[0], x2 = i2[1], T2 = i2[2], w2 = i2[3];
      return t3[0] = v2 * r2 + x2 * o2 + T2 * c2 + w2 * g2, t3[1] = v2 * n2 + x2 * l2 + T2 * f2 + w2 * _2, t3[2] = v2 * a2 + x2 * h2 + T2 * d2 + w2 * p2, t3[3] = v2 * s2 + x2 * u2 + T2 * b2 + w2 * m2, v2 = i2[4], x2 = i2[5], T2 = i2[6], w2 = i2[7], t3[4] = v2 * r2 + x2 * o2 + T2 * c2 + w2 * g2, t3[5] = v2 * n2 + x2 * l2 + T2 * f2 + w2 * _2, t3[6] = v2 * a2 + x2 * h2 + T2 * d2 + w2 * p2, t3[7] = v2 * s2 + x2 * u2 + T2 * b2 + w2 * m2, v2 = i2[8], x2 = i2[9], T2 = i2[10], w2 = i2[11], t3[8] = v2 * r2 + x2 * o2 + T2 * c2 + w2 * g2, t3[9] = v2 * n2 + x2 * l2 + T2 * f2 + w2 * _2, t3[10] = v2 * a2 + x2 * h2 + T2 * d2 + w2 * p2, t3[11] = v2 * s2 + x2 * u2 + T2 * b2 + w2 * m2, v2 = i2[12], x2 = i2[13], T2 = i2[14], w2 = i2[15], t3[12] = v2 * r2 + x2 * o2 + T2 * c2 + w2 * g2, t3[13] = v2 * n2 + x2 * l2 + T2 * f2 + w2 * _2, t3[14] = v2 * a2 + x2 * h2 + T2 * d2 + w2 * p2, t3[15] = v2 * s2 + x2 * u2 + T2 * b2 + w2 * m2, t3;
    }
    function Ze(t3, e3, i2) {
      var r2, n2, a2, s2, o2, l2, h2, u2, c2, f2, d2, b2, g2 = i2[0], _2 = i2[1], p2 = i2[2];
      return e3 === t3 ? (t3[12] = e3[0] * g2 + e3[4] * _2 + e3[8] * p2 + e3[12], t3[13] = e3[1] * g2 + e3[5] * _2 + e3[9] * p2 + e3[13], t3[14] = e3[2] * g2 + e3[6] * _2 + e3[10] * p2 + e3[14], t3[15] = e3[3] * g2 + e3[7] * _2 + e3[11] * p2 + e3[15]) : (r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = e3[3], o2 = e3[4], l2 = e3[5], h2 = e3[6], u2 = e3[7], c2 = e3[8], f2 = e3[9], d2 = e3[10], b2 = e3[11], t3[0] = r2, t3[1] = n2, t3[2] = a2, t3[3] = s2, t3[4] = o2, t3[5] = l2, t3[6] = h2, t3[7] = u2, t3[8] = c2, t3[9] = f2, t3[10] = d2, t3[11] = b2, t3[12] = r2 * g2 + o2 * _2 + c2 * p2 + e3[12], t3[13] = n2 * g2 + l2 * _2 + f2 * p2 + e3[13], t3[14] = a2 * g2 + h2 * _2 + d2 * p2 + e3[14], t3[15] = s2 * g2 + u2 * _2 + b2 * p2 + e3[15]), t3;
    }
    function Je(t3, e3, i2) {
      var r2 = i2[0], n2 = i2[1], a2 = i2[2];
      return t3[0] = e3[0] * r2, t3[1] = e3[1] * r2, t3[2] = e3[2] * r2, t3[3] = e3[3] * r2, t3[4] = e3[4] * n2, t3[5] = e3[5] * n2, t3[6] = e3[6] * n2, t3[7] = e3[7] * n2, t3[8] = e3[8] * a2, t3[9] = e3[9] * a2, t3[10] = e3[10] * a2, t3[11] = e3[11] * a2, t3[12] = e3[12], t3[13] = e3[13], t3[14] = e3[14], t3[15] = e3[15], t3;
    }
    function Ke(t3, e3, i2) {
      var r2 = Math.sin(i2), n2 = Math.cos(i2), a2 = e3[4], s2 = e3[5], o2 = e3[6], l2 = e3[7], h2 = e3[8], u2 = e3[9], c2 = e3[10], f2 = e3[11];
      return e3 !== t3 && (t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3[12] = e3[12], t3[13] = e3[13], t3[14] = e3[14], t3[15] = e3[15]), t3[4] = a2 * n2 + h2 * r2, t3[5] = s2 * n2 + u2 * r2, t3[6] = o2 * n2 + c2 * r2, t3[7] = l2 * n2 + f2 * r2, t3[8] = h2 * n2 - a2 * r2, t3[9] = u2 * n2 - s2 * r2, t3[10] = c2 * n2 - o2 * r2, t3[11] = f2 * n2 - l2 * r2, t3;
    }
    function $e(t3, e3, i2) {
      var r2 = Math.sin(i2), n2 = Math.cos(i2), a2 = e3[0], s2 = e3[1], o2 = e3[2], l2 = e3[3], h2 = e3[8], u2 = e3[9], c2 = e3[10], f2 = e3[11];
      return e3 !== t3 && (t3[4] = e3[4], t3[5] = e3[5], t3[6] = e3[6], t3[7] = e3[7], t3[12] = e3[12], t3[13] = e3[13], t3[14] = e3[14], t3[15] = e3[15]), t3[0] = a2 * n2 - h2 * r2, t3[1] = s2 * n2 - u2 * r2, t3[2] = o2 * n2 - c2 * r2, t3[3] = l2 * n2 - f2 * r2, t3[8] = a2 * r2 + h2 * n2, t3[9] = s2 * r2 + u2 * n2, t3[10] = o2 * r2 + c2 * n2, t3[11] = l2 * r2 + f2 * n2, t3;
    }
    function Qe(t3, e3, i2) {
      var r2 = Math.sin(i2), n2 = Math.cos(i2), a2 = e3[0], s2 = e3[1], o2 = e3[2], l2 = e3[3], h2 = e3[4], u2 = e3[5], c2 = e3[6], f2 = e3[7];
      return e3 !== t3 && (t3[8] = e3[8], t3[9] = e3[9], t3[10] = e3[10], t3[11] = e3[11], t3[12] = e3[12], t3[13] = e3[13], t3[14] = e3[14], t3[15] = e3[15]), t3[0] = a2 * n2 + h2 * r2, t3[1] = s2 * n2 + u2 * r2, t3[2] = o2 * n2 + c2 * r2, t3[3] = l2 * n2 + f2 * r2, t3[4] = h2 * n2 - a2 * r2, t3[5] = u2 * n2 - s2 * r2, t3[6] = c2 * n2 - o2 * r2, t3[7] = f2 * n2 - l2 * r2, t3;
    }
    function ti(t3, e3) {
      return t3[0] = 1, t3[1] = 0, t3[2] = 0, t3[3] = 0, t3[4] = 0, t3[5] = 1, t3[6] = 0, t3[7] = 0, t3[8] = 0, t3[9] = 0, t3[10] = 1, t3[11] = 0, t3[12] = e3[0], t3[13] = e3[1], t3[14] = e3[2], t3[15] = 1, t3;
    }
    function ei(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = e3[3], o2 = r2 + r2, l2 = n2 + n2, h2 = a2 + a2, u2 = r2 * o2, c2 = r2 * l2, f2 = r2 * h2, d2 = n2 * l2, b2 = n2 * h2, g2 = a2 * h2, _2 = s2 * o2, p2 = s2 * l2, m2 = s2 * h2;
      return t3[0] = 1 - (d2 + g2), t3[1] = c2 + m2, t3[2] = f2 - p2, t3[3] = 0, t3[4] = c2 - m2, t3[5] = 1 - (u2 + g2), t3[6] = b2 + _2, t3[7] = 0, t3[8] = f2 + p2, t3[9] = b2 - _2, t3[10] = 1 - (u2 + d2), t3[11] = 0, t3[12] = i2[0], t3[13] = i2[1], t3[14] = i2[2], t3[15] = 1, t3;
    }
    function ii(t3, e3) {
      return t3[0] = e3[12], t3[1] = e3[13], t3[2] = e3[14], t3;
    }
    function ri(t3, e3) {
      var i2 = e3[0], r2 = e3[1], n2 = e3[2], a2 = e3[4], s2 = e3[5], o2 = e3[6], l2 = e3[8], h2 = e3[9], u2 = e3[10];
      return t3[0] = Math.hypot(i2, r2, n2), t3[1] = Math.hypot(a2, s2, o2), t3[2] = Math.hypot(l2, h2, u2), t3;
    }
    var ni = function(t3, e3, i2, r2, n2) {
      var a2, s2 = 1 / Math.tan(e3 / 2);
      return t3[0] = s2 / i2, t3[1] = 0, t3[2] = 0, t3[3] = 0, t3[4] = 0, t3[5] = s2, t3[6] = 0, t3[7] = 0, t3[8] = 0, t3[9] = 0, t3[11] = -1, t3[12] = 0, t3[13] = 0, t3[15] = 0, null != n2 && n2 !== 1 / 0 ? (a2 = 1 / (r2 - n2), t3[10] = (n2 + r2) * a2, t3[14] = 2 * n2 * r2 * a2) : (t3[10] = -1, t3[14] = -2 * r2), t3;
    };
    var ai = Ye;
    const si = { 147259: true }, oi = { 28060: true, 28063: true, 28082: true, 41903: true, 42147: true, 44808: true, 45271: true };
    const li = {
      2: { GeosetType: 15, Original: 2, Override: 11 },
      3: { GeosetType: 15, Original: 3, Override: 12 },
      4: { GeosetType: 15, Original: 4, Override: 13 },
      5: { GeosetType: 15, Original: 5, Override: 14 },
      6: { GeosetType: 15, Original: 6, Override: 15 },
      7: { GeosetType: 15, Original: 7, Override: 16 },
      8: { GeosetType: 15, Original: 8, Override: 17 },
      9: { GeosetType: 15, Original: 9, Override: 18 },
      10: { GeosetType: 15, Original: 10, Override: 19 }
    }, hi = {
      ITEM: 1,
      HELM: 2,
      SHOULDER: 4,
      NPC: 8,
      CHARACTER: 16,
      HUMANOIDNPC: 32,
      OBJECT: 64,
      ARMOR: 128,
      PATH: 256,
      ITEMVISUAL: 512,
      COLLECTION: 1024
    }, ui = { MALE: 0, FEMALE: 1, 0: "male", 1: "female" }, ci = 5, fi = 15, di = 21, bi = 27, gi = 30, _i = {
      1: "human",
      2: "orc",
      3: "dwarf",
      4: "nightelf",
      5: "scourge",
      6: "tauren",
      7: "gnome",
      8: "troll",
      9: "goblin",
      10: "bloodelf",
      11: "draenei",
      12: "felorc",
      13: "naga_",
      14: "broken",
      15: "skeleton",
      16: "vrykul",
      17: "tuskarr",
      18: "foresttroll",
      19: "taunka",
      20: "northrendskeleton",
      21: "icetroll",
      22: "worgen",
      23: "gilnean",
      24: "pandaren",
      25: "pandarena",
      26: "pandarenh",
      27: "nightborne",
      28: "highmountaintauren",
      29: "voidelf",
      30: "lightforgeddraenei",
      31: "zandalaritroll",
      32: "kultiran",
      33: "thinhuman",
      34: "darkirondwarf",
      35: "vulpera",
      36: "magharorc",
      37: "mechagnome"
    }, pi = [0, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 21, 22, 22, 16, 21, 0, 19, 5, 21, 22, 22, 0, 21, 21, 27], mi = [0, 16, 0, 15, 1, 8, 10, 5, 6, 6, 7, 0, 0, 17, 18, 19, 14, 20, 0, 9, 8, 21, 22, 23, 0, 24, 25, 0], vi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], xi = [0, 2, 0, 4, 128, 128, 128, 128, 128, 128, 128, 0, 0, 1, 1, 1, 128, 1, 0, 128, 128, 1, 1, 1, 0, 1, 1, 2], Ti = 1, wi = 3, yi = 4, Ai = 5, Ei = 6, Ci = 7, Si = 8, Mi = 9, ki = 10, Fi = 13, Ri = 14, Di = 15, Ii = 16, Ui = 19, Bi = 20, Pi = 21, zi = 22, Oi = 23, Ni = 26, Li = 1, Hi = 10, Vi = [13, 14, 15, 16, 17, 88, 89], ji = [8, 9, 10, 11, 12, 86, 87], Gi = 3, Xi = 5, qi = 7, Wi = 12, Yi = [{ x: 0, y: 0, w: 0.5, h: 0.25 }, { x: 0, y: 0.25, w: 0.5, h: 0.25 }, { x: 0, y: 0.5, w: 0.5, h: 0.125 }, {
      x: 0.5,
      y: 0,
      w: 0.5,
      h: 0.25
    }, { x: 0.5, y: 0.25, w: 0.5, h: 0.125 }, { x: 0.5, y: 0.375, w: 0.5, h: 0.25 }, {
      x: 0.5,
      y: 0.625,
      w: 0.5,
      h: 0.25
    }, { x: 0.5, y: 0.875, w: 0.5, h: 0.125 }, {}, { x: 0, y: 0.625, w: 0.5, h: 0.125 }, {
      x: 0,
      y: 0.75,
      w: 0.5,
      h: 0.25
    }, {}, { x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 0, w: 1, h: 1 }], Zi = [{ x: 0, y: 0, w: 0.25, h: 0.25 }, { x: 0, y: 0.25, w: 0.25, h: 0.25 }, { x: 0, y: 0.5, w: 0.25, h: 0.125 }, {
      x: 0.25,
      y: 0,
      w: 0.25,
      h: 0.25
    }, { x: 0.25, y: 0.25, w: 0.25, h: 0.125 }, { x: 0.25, y: 0.375, w: 0.25, h: 0.25 }, {
      x: 0.25,
      y: 0.625,
      w: 0.25,
      h: 0.25
    }, { x: 0.25, y: 0.875, w: 0.25, h: 0.125 }, { x: 0.75, y: 0.75, w: 0.25, h: 0.25 }, { x: 0.5, y: 0, w: 0.5, h: 1 }, {
      x: 0.5,
      y: 0,
      w: 0.5,
      h: 1
    }, { x: 0.5, y: 0, w: 0.5, h: 1 }, { x: 0, y: 0, w: 0.5, h: 1 }, { x: 0, y: 0, w: 1, h: 1 }, {
      x: 0,
      y: 0,
      w: 0.5,
      h: 1
    }], Ji = {
      40: [5, 0, 5, 1, 5, 0, 5, 1],
      37: [7, 0, 7, 1, 7, 0, 7, 1],
      36: [2, 0, 2, 1, 2, 0, 2, 1],
      35: [9, 0, 9, 1, 9, 0, 9, 1],
      34: [3, 0, 3, 1, 3, 0, 3, 1],
      33: [5, 1, 0, -1, 5, 0, 0, -1],
      31: [0, -1, 8, 1, 0, -1, 8, 1],
      30: [11, 0, 11, 1, 11, 0, 11, 1],
      29: [10, 0, 10, 1, 10, 0, 10, 1],
      28: [6, 0, 6, 1, 6, 0, 6, 1],
      27: [4, 0, 4, 1, 4, 0, 4, 1],
      26: [24, 0, 24, 1, 24, 0, 24, 1],
      25: [24, 0, 24, 1, 24, 0, 24, 1],
      23: [1, 0, 1, 1, 1, 0, 1, 1],
      15: [5, 0, 5, 1, 5, 0, 5, 1]
    }, Ki = { 21: 26, 22: 27, 15: 28, 17: 26, 25: 32, 13: 32, 23: 33, 14: 28, 26: 26 }, $i = {
      0: { 21: 26, 22: 27 },
      1: { 21: 26, 22: 27 },
      2: { 21: 30, 22: 31 },
      3: { 21: 32, 22: 33 },
      4: { 21: 26, 22: 27, 15: 28 },
      5: { 21: 26 },
      6: { 21: 26, 22: 27 },
      7: { 21: 26, 22: 27 },
      8: { 21: 26, 22: 27 },
      9: { 21: 33, 22: 28 }
    };
    function Qi() {
      var t3 = new me(4);
      return me != Float32Array && (t3[0] = 0, t3[1] = 0, t3[2] = 0, t3[3] = 0), t3;
    }
    function tr(t3) {
      var e3 = new me(4);
      return e3[0] = t3[0], e3[1] = t3[1], e3[2] = t3[2], e3[3] = t3[3], e3;
    }
    function er(t3, e3, i2, r2) {
      var n2 = new me(4);
      return n2[0] = t3, n2[1] = e3, n2[2] = i2, n2[3] = r2, n2;
    }
    function ir(t3, e3) {
      return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3;
    }
    function rr(t3, e3, i2) {
      return t3[0] = e3[0] + i2[0], t3[1] = e3[1] + i2[1], t3[2] = e3[2] + i2[2], t3[3] = e3[3] + i2[3], t3;
    }
    function nr(t3, e3, i2) {
      return t3[0] = e3[0] - i2[0], t3[1] = e3[1] - i2[1], t3[2] = e3[2] - i2[2], t3[3] = e3[3] - i2[3], t3;
    }
    function ar(t3, e3, i2) {
      return t3[0] = e3[0] * i2, t3[1] = e3[1] * i2, t3[2] = e3[2] * i2, t3[3] = e3[3] * i2, t3;
    }
    function sr(t3) {
      var e3 = t3[0], i2 = t3[1], r2 = t3[2], n2 = t3[3];
      return Math.hypot(e3, i2, r2, n2);
    }
    function or(t3, e3) {
      var i2 = e3[0], r2 = e3[1], n2 = e3[2], a2 = e3[3], s2 = i2 * i2 + r2 * r2 + n2 * n2 + a2 * a2;
      return s2 > 0 && (s2 = 1 / Math.sqrt(s2)), t3[0] = i2 * s2, t3[1] = r2 * s2, t3[2] = n2 * s2, t3[3] = a2 * s2, t3;
    }
    function lr(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = e3[3];
      return t3[0] = i2[0] * r2 + i2[4] * n2 + i2[8] * a2 + i2[12] * s2, t3[1] = i2[1] * r2 + i2[5] * n2 + i2[9] * a2 + i2[13] * s2, t3[2] = i2[2] * r2 + i2[6] * n2 + i2[10] * a2 + i2[14] * s2, t3[3] = i2[3] * r2 + i2[7] * n2 + i2[11] * a2 + i2[15] * s2, t3;
    }
    var hr = sr;
    !(function() {
      var t3 = Qi();
    })();
    const ur = class {
      constructor(t3) {
        var e3 = this;
        e3.a = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), e3.b = er(t3.getFloat(), t3.getFloat(), t3.getFloat(), 0), e3.c = t3.getFloat(), e3.d = t3.getFloat(), e3.e = t3.getFloat(), e3.f = t3.getFloat(), e3.g = [t3.getUint8(), t3.getUint8(), t3.getUint8(), t3.getUint8()], e3.h = [t3.getUint8(), t3.getUint8(), t3.getUint8(), t3.getUint8()], e3.i = xe(e3.a), e3.j = tr(e3.b);
      }
      l() {
        var t3 = this;
        t3.a = null, t3.b = null, t3.g = null, t3.h = null, t3.i = null, t3.j = null;
      }
    };
    const cr = class {
      constructor(t3) {
        var e3 = this;
        e3.a = t3.getUint16(), e3.b = t3.getUint16(), e3.g = t3.getUint32(), e3.c = t3.getUint32(), e3.d = t3.getUint16(), e3.e = t3.getUint16(), e3.f = t3.getUint16(), e3.h = t3.getInt16(), e3.i = t3.getUint16(), t3.getBool() && (e3.j = t3.getString());
      }
      k() {
      }
    };
    function fr() {
      var t3 = new me(2);
      return me != Float32Array && (t3[0] = 0, t3[1] = 0), t3;
    }
    function dr(t3, e3) {
      var i2 = new me(2);
      return i2[0] = t3, i2[1] = e3, i2;
    }
    function br(t3, e3, i2) {
      return t3[0] = e3, t3[1] = i2, t3;
    }
    function gr(t3, e3, i2) {
      return t3[0] = e3[0] * i2[0], t3[1] = e3[1] * i2[1], t3;
    }
    function _r(t3, e3, i2) {
      return t3[0] = e3[0] * i2, t3[1] = e3[1] * i2, t3;
    }
    !(function() {
      var t3 = fr();
    })();
    function pr() {
      var t3 = new me(9);
      return me != Float32Array && (t3[1] = 0, t3[2] = 0, t3[3] = 0, t3[5] = 0, t3[6] = 0, t3[7] = 0), t3[0] = 1, t3[4] = 1, t3[8] = 1, t3;
    }
    function mr(t3, e3) {
      return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[4], t3[4] = e3[5], t3[5] = e3[6], t3[6] = e3[8], t3[7] = e3[9], t3[8] = e3[10], t3;
    }
    function vr(t3, e3, i2) {
      var r2 = e3[0], n2 = e3[1], a2 = e3[2], s2 = e3[3], o2 = e3[4], l2 = e3[5], h2 = e3[6], u2 = e3[7], c2 = e3[8], f2 = i2[0], d2 = i2[1], b2 = i2[2], g2 = i2[3], _2 = i2[4], p2 = i2[5], m2 = i2[6], v2 = i2[7], x2 = i2[8];
      return t3[0] = f2 * r2 + d2 * s2 + b2 * h2, t3[1] = f2 * n2 + d2 * o2 + b2 * u2, t3[2] = f2 * a2 + d2 * l2 + b2 * c2, t3[3] = g2 * r2 + _2 * s2 + p2 * h2, t3[4] = g2 * n2 + _2 * o2 + p2 * u2, t3[5] = g2 * a2 + _2 * l2 + p2 * c2, t3[6] = m2 * r2 + v2 * s2 + x2 * h2, t3[7] = m2 * n2 + v2 * o2 + x2 * u2, t3[8] = m2 * a2 + v2 * l2 + x2 * c2, t3;
    }
    function xr() {
      var t3 = new me(4);
      return me != Float32Array && (t3[0] = 0, t3[1] = 0, t3[2] = 0), t3[3] = 1, t3;
    }
    function Tr(t3, e3, i2) {
      i2 *= 0.5;
      var r2 = Math.sin(i2);
      return t3[0] = r2 * e3[0], t3[1] = r2 * e3[1], t3[2] = r2 * e3[2], t3[3] = Math.cos(i2), t3;
    }
    function wr(t3, e3, i2, r2) {
      var n2, a2, s2, o2, l2, h2 = e3[0], u2 = e3[1], c2 = e3[2], f2 = e3[3], d2 = i2[0], b2 = i2[1], g2 = i2[2], _2 = i2[3];
      return (a2 = h2 * d2 + u2 * b2 + c2 * g2 + f2 * _2) < 0 && (a2 = -a2, d2 = -d2, b2 = -b2, g2 = -g2, _2 = -_2), 1 - a2 > pe ? (n2 = Math.acos(a2), s2 = Math.sin(n2), o2 = Math.sin((1 - r2) * n2) / s2, l2 = Math.sin(r2 * n2) / s2) : (o2 = 1 - r2, l2 = r2), t3[0] = o2 * h2 + l2 * d2, t3[1] = o2 * u2 + l2 * b2, t3[2] = o2 * c2 + l2 * g2, t3[3] = o2 * f2 + l2 * _2, t3;
    }
    var yr, Ar, Er, Cr, Sr, Mr, kr = ir, Fr = function(t3, e3, i2, r2, n2) {
      return t3[0] = e3, t3[1] = i2, t3[2] = r2, t3[3] = n2, t3;
    }, Rr = or;
    yr = ve(), Ar = we(1, 0, 0), Er = we(0, 1, 0), Cr = xr(), Sr = xr(), Mr = pr();
    class Dr {
      constructor() {
        this.a = -1, this.b = null, this.c = 0;
      }
    }
    class Ir {
      constructor() {
        this.a = new Dr(), this.b = new Dr(), this.c = 0, this.d = false;
      }
    }
    class Ur {
      f() {
        var t3 = this;
        if (t3.b) for (var e3 = 0; e3 < t3.b.length; ++e3) t3.b[e3] = null;
        return t3.a = null, t3.b = null, null;
      }
      k(t3, e3, i2, r2) {
        let n2 = this;
        if (null == r2 && (r2 = this.g()), this.d >= 0 && (t3 = this.d < e3.length ? e3[this.d] : e3[0]), 0 != n2.c || n2.b.length > 1) {
          if (n2.a.length > 1) {
            var a2 = n2.a[n2.a.length - 1];
            a2 > 0 && t3 > a2 && this.d < 0 && (t3 %= a2);
            for (var s2 = 0, o2 = n2.a.length, l2 = 0; l2 < o2; ++l2) if (t3 >= n2.a[l2] && t3 < n2.a[l2 + 1]) {
              s2 = l2;
              break;
            }
            var h2 = n2.a[s2], u2 = n2.a[s2 + 1], c2 = 0;
            return h2 != u2 && (c2 = (t3 - h2) / (u2 - h2)), 1 == n2.c ? n2.h(n2.b[s2], n2.b[s2 + 1], c2, r2) : r2 = n2.i(r2, n2.b[s2]);
          }
          return n2.b.length > 0 ? r2 = n2.i(r2, n2.b[0]) : i2;
        }
        return 0 == n2.b.length ? r2 : r2 = n2.i(r2, n2.b[0]);
      }
      l(t3) {
        var e3, i2 = this;
        i2.c = t3.getInt16(), i2.d = t3.getInt16(), i2.e = t3.getBool();
        var r2 = t3.getInt32();
        for (i2.a = new Array(r2), e3 = 0; e3 < r2; ++e3) i2.a[e3] = t3.getInt32();
        var n2 = t3.getInt32();
        for (i2.b = new Array(n2), e3 = 0; e3 < n2; ++e3) i2.b[e3] = i2.j(t3);
      }
    }
    class Br extends Ur {
      constructor(t3) {
        super();
        this.ba = ve(), this.l(t3);
      }
      g() {
        return ve();
      }
      h(t3, e3, i2, r2) {
        return ze(r2, t3, e3, i2);
      }
      i(t3, e3) {
        return ye(t3, e3), t3;
      }
      j(t3) {
        return Ae(ve(), t3.getFloat(), t3.getFloat(), t3.getFloat());
      }
    }
    class Pr extends Ur {
      constructor(t3) {
        super();
        this.l(t3), this.ba = xr();
      }
      g() {
        return xr();
      }
      h(t3, e3, i2, r2) {
        return wr(r2, t3, e3, i2);
      }
      i(t3, e3) {
        return kr(t3, e3), t3;
      }
      j(t3) {
        return Fr(xr(), -t3.getFloat(), -t3.getFloat(), -t3.getFloat(), t3.getFloat());
      }
    }
    class zr extends Ur {
      constructor(t3) {
        super();
        this.l(t3);
      }
      j(t3) {
        return t3.getUint16();
      }
      g() {
        return 0;
      }
      h(t3, e3, i2, r2) {
        return t3 + (e3 - t3) * i2;
      }
      i(t3, e3) {
        return e3;
      }
    }
    class Or extends zr {
      j(t3) {
        return t3.getFloat();
      }
    }
    class Nr extends zr {
      j(t3) {
        return t3.getUint8();
      }
    }
    class Lr {
      d() {
        for (var t3 = this, e3 = 0; e3 < t3.b.length; ++e3) t3.b[e3] = null;
        return t3.a = null, t3.b = null, t3.c = null, null;
      }
      i(t3, e3, i2, r2) {
        let n2 = this;
        i2 || (i2 = this.e());
        let a2 = r2 || n2.b;
        if (n2.b.length > 1 && n2.a.length > 1) {
          var s2 = n2.a[n2.a.length - 1];
          s2 > 0 && t3 > s2 && (t3 %= s2);
          for (var o2 = 0, l2 = n2.a.length, h2 = 0; h2 < l2 - 1; ++h2) if (t3 > n2.a[h2] && t3 <= n2.a[h2 + 1]) {
            o2 = h2;
            break;
          }
          var u2 = n2.a[o2], c2 = n2.a[o2 + 1], f2 = 0;
          return u2 != c2 && (f2 = (t3 - u2) / (c2 - u2)), n2.f(a2[o2], a2[o2 + 1], f2, i2);
        }
        return a2.length > 0 ? i2 = n2.g(i2, a2[0]) : e3;
      }
      j(t3) {
        var e3, i2 = this, r2 = t3.getInt32();
        for (i2.a = new Array(r2), e3 = 0; e3 < r2; ++e3) i2.a[e3] = t3.getInt16() / 32767;
        var n2 = t3.getInt32();
        for (i2.b = new Array(n2), e3 = 0; e3 < n2; ++e3) i2.b[e3] = i2.h(t3);
      }
    }
    class Hr extends Lr {
      constructor(t3) {
        super();
        this.ba = fr(), this.j(t3);
      }
      e() {
        return fr();
      }
      f(t3, e3, i2, r2) {
        return n2 = r2, s2 = e3, o2 = i2, l2 = (a2 = t3)[0], h2 = a2[1], n2[0] = l2 + o2 * (s2[0] - l2), n2[1] = h2 + o2 * (s2[1] - h2), n2;
        var n2, a2, s2, o2, l2, h2;
      }
      g(t3, e3) {
        var i2, r2;
        return r2 = e3, (i2 = t3)[0] = r2[0], i2[1] = r2[1], t3;
      }
      h(t3) {
        return br(fr(), t3.getFloat(), t3.getFloat());
      }
    }
    class Vr extends Lr {
      constructor(t3) {
        super();
        this.j(t3);
      }
      e() {
        return ve();
      }
      f(t3, e3, i2, r2) {
        return ze(r2, t3, e3, i2);
      }
      g(t3, e3) {
        return ye(t3, e3), t3;
      }
      h(t3) {
        return Ae(ve(), t3.getFloat(), t3.getFloat(), t3.getFloat());
      }
    }
    class jr extends Lr {
      constructor(t3) {
        super();
        this.j(t3);
      }
      e() {
        return 0;
      }
      f(t3, e3, i2, r2) {
        return t3 + (e3 - t3) * i2;
      }
      g(t3, e3) {
        return t3;
      }
      h(t3) {
        return t3.getUint16();
      }
    }
    class Gr {
      constructor(t3, e3) {
        this.b(t3, e3);
      }
      b(t3, e3) {
        var i2 = t3.getInt32();
        this.a = new Array(i2);
        for (let r2 = 0; r2 < i2; ++r2) this.a[r2] = new e3(t3);
      }
      c(t3) {
        return !(!this.a || 0 == this.a.length) && (t3 >= this.a.length && (t3 = 0), this.a[t3].e);
      }
      d(t3, e3, i2, r2) {
        if (!this.a || 0 == this.a.length) return i2;
        let n2 = t3.a.a;
        n2 >= this.a.length && (n2 = 0);
        let a2 = this.a[n2].k(t3.a.c, e3, i2, r2);
        if (t3.c > 0 && t3.c < 1) {
          let n3 = this.a[0].g(), s2 = t3.b.a;
          s2 >= this.a.length && (s2 = 0);
          let o2 = this.a[s2].k(t3.b.c, e3, i2, n3);
          o2 || (o2 = n3), n3 = this.a[0].g(), a2 = this.a[0].h(o2, a2, t3.c, n3), r2 && this.a[0].i(r2, n3);
        }
        return a2;
      }
      e() {
        if (this.a && 0 != this.a.length) {
          for (var t3 = 0; t3 < this.a.length; ++t3) this.a[t3].f(), this.a[t3] = null;
          return null;
        }
      }
    }
    function Xr(t3, e3) {
      return er(t3[4 * e3 + 0], t3[4 * e3 + 1], t3[4 * e3 + 2], 0);
    }
    function qr(t3, e3, i2) {
      for (let r2 = 0; r2 < 4; r2++) t3[4 * e3 + r2] = i2[r2];
    }
    const Wr = class {
      constructor(t3, e3, i2) {
        this.t = null, this.u = null, this.v = null;
        var r2 = this;
        r2.a = t3, r2.b = e3, r2.c = i2.getInt32(), r2.d = i2.getUint32(), r2.e = i2.getInt16(), r2.f = i2.getUint16(), r2.g = i2.getUint32(), r2.h = we(i2.getFloat(), i2.getFloat(), i2.getFloat()), r2.i = new Gr(i2, Br), r2.j = new Gr(i2, Pr), r2.k = new Gr(i2, Br), r2.l = ve(), r2.m = je(), r2.n = ve(), r2.o = xr(), r2.p = je(), r2.q = false, r2.r = false, r2.s = false;
      }
      y() {
        var t3 = this;
        t3.a = null, t3.h = null, t3.l = null, t3.m = null, t3.n = null, t3.o = null, t3.p = null, t3.i.e(), t3.j.e(), t3.k.e(), t3.i = null, t3.j = null, t3.k = null;
      }
      z() {
        this.q = true;
        for (var t3 = 0; t3 < 16; ++t3) this.m[t3] = 0;
      }
      A(t3) {
        t3 ? (null == this.t && (this.t = new Ir()), this.a.bt(t3, this.t)) : this.t = null;
        let e3 = this.a.ai[this.b];
        for (let i2 = 0; i2 < e3.length; i2++) this.a.ap[e3[i2]].A(t3);
      }
      B(t3) {
        t3 ? (null == this.u && (this.u = new Ir()), this.a.bt(t3, this.u)) : this.u = null;
        let e3 = this.a.ai[this.b];
        for (let i2 = 0; i2 < e3.length; i2++) this.a.ap[e3[i2]].B(t3);
      }
      C(t3) {
        var e3 = this;
        if (e3.q) return void e3.z();
        if (null != this.t && this.a.bX(this.t, t3), e3.r || e3.s) return;
        if (e3.r = true, !e3.a) return;
        qe(e3.m);
        var i2 = e3.a.R;
        if (!i2) return;
        let r2 = je();
        if (Ye(r2, r2, this.a.aS.viewMatrix), Ye(r2, r2, this.a.U), Ye(e3.m, e3.m, r2), e3.e > -1) {
          e3.a.ap[e3.e].C(t3);
          let i3 = je();
          if (Ge(i3, e3.a.ap[e3.e].m), Ye(i3, r2, i3), 1 & e3.d || 2 & e3.d || 4 & e3.d) {
            if (4 & e3.d && 2 & e3.d) qr(i3, 0, Xr(r2, 0)), qr(i3, 1, Xr(r2, 1)), qr(i3, 2, Xr(r2, 2));
            else if (4 & e3.d) {
              {
                let t4 = Xr(r2, 0), e4 = sr(t4);
                ar(t4, t4, sr(Xr(i3, 0)) / e4), qr(i3, 0, t4);
              }
              {
                let t4 = Xr(r2, 1), e4 = sr(t4);
                ar(t4, t4, sr(Xr(i3, 1)) / e4), qr(i3, 1, t4);
              }
              {
                let t4 = Xr(r2, 2), e4 = sr(t4);
                ar(t4, t4, sr(Xr(i3, 2)) / e4), qr(i3, 2, t4);
              }
            } else if (2 & e3.d) {
              {
                let t4 = Xr(r2, 0);
                ar(t4, t4, 1 / sr(Xr(i3, 0))), ar(t4, t4, sr(Xr(r2, 0))), qr(i3, 0, t4);
              }
              {
                let t4 = Xr(r2, 1);
                ar(t4, t4, 1 / sr(Xr(i3, 1))), ar(t4, t4, sr(Xr(r2, 1))), qr(i3, 1, t4);
              }
              {
                let t4 = Xr(r2, 2);
                ar(t4, t4, 1 / sr(Xr(i3, 2))), ar(t4, t4, sr(Xr(r2, 2))), qr(i3, 2, t4);
              }
            }
            if (1 & e3.d) qr(i3, 3, Xr(r2, 3));
            else {
              let t4 = er(e3.h[0], e3.h[1], e3.h[2], 1), n4 = Qi();
              ir(n4, t4), n4[3] = 0;
              let a3 = Qi(), s3 = Qi();
              lr(a3, t4, e3.a.ap[e3.e].m), lr(a3, a3, r2), lr(s3, n4, i3), nr(a3, a3, s3), a3[3] = 1, qr(i3, 3, a3);
            }
          }
          let n3 = je();
          We(n3, r2), Ye(i3, n3, i3), Ye(e3.m, e3.m, i3);
        }
        let n2 = null;
        if (null != this.t) {
          let t4 = this.D(this.t);
          this.a.S || (this.w = t4), n2 = this.a.S ? this.w : t4;
        } else {
          let t4 = this.D(i2);
          this.a.S || (this.w = t4), n2 = this.a.S ? this.w : t4;
        }
        let a2 = null;
        if (null != this.u) {
          let t4 = this.D(this.u);
          this.a.S || (this.x = t4), a2 = this.a.S ? this.x : t4;
        }
        let s2 = null != n2 || null != a2, o2 = je();
        s2 && (null != n2 && Ye(o2, o2, n2), null != a2 && Ye(o2, o2, a2)), null != this.v && (Ze(o2, o2, this.h), Ye(o2, o2, this.v), Ze(o2, o2, Ie(this.n, this.h))), Ye(e3.m, e3.m, o2);
        let l2 = 120 & e3.d;
        if (l2) {
          let t4 = je();
          Ge(t4, e3.m);
          let i3 = e3.m, r3 = ve();
          ri(r3, e3.m);
          let n3 = Qi();
          if (16 == l2) {
            let t5 = Xr(e3.m, 0);
            ar(t5, t5, 1 / Te(t5)), qr(e3.m, 0, t5);
            let r4 = er(i3[4], -i3[0], 0, 0);
            qr(i3, 1, or(r4, r4)), Pe(n3, r4, t5), n3[3] = 0, qr(i3, 2, n3);
          } else if (l2 > 16) {
            if (32 == l2) {
              let t5 = Xr(i3, 1);
              ar(t5, t5, 1 / sr(t5)), qr(e3.m, 1, t5);
              let r4 = er(-i3[5], i3[1], 0, 0);
              qr(i3, 0, or(r4, r4)), n3[3] = 0, qr(i3, 2, n3);
            } else if (64 == l2) {
              let t5 = Xr(i3, 2);
              or(t5, t5), qr(i3, 2, t5);
              let e4 = er(t5[1], -t5[0], 0, 0);
              or(e4, e4), qr(i3, 1, e4), Pe(n3, t5, e4), n3[3] = 0, qr(i3, 0, n3);
            }
          } else if (8 == l2) {
            let t5 = this.a.h;
            if (s2) {
              let e4 = Xr(o2, 0);
              e4 = er(e4[1], e4[2], -e4[0], 0), or(e4, e4), qr(i3, 0, e4);
              let r4 = Xr(o2, 1);
              r4 = er(t5 ? -r4[1] : r4[1], t5 ? -r4[2] : r4[2], t5 ? r4[0] : -r4[0], 0), or(r4, r4), qr(i3, 1, r4);
              let n4 = Xr(o2, 2);
              n4 = er(n4[1], n4[2], -n4[0], 0), or(n4, n4), qr(i3, 2, n4);
            } else {
              qr(i3, 0, er(0, 0, -1, 0)), qr(i3, 1, er(t5 ? -1 : 1, 0, 0, 0)), qr(i3, 2, er(0, 1, 0, 0));
            }
          }
          let a3 = er(this.h[0], this.h[1], this.h[2], 1), h2 = er(this.h[0], this.h[1], this.h[2], 0), u2 = Xr(i3, 0), c2 = Xr(i3, 1), f2 = Xr(i3, 2);
          ar(u2, u2, r3[0]), ar(c2, c2, r3[1]), ar(f2, f2, r3[2]), qr(i3, 0, u2), qr(i3, 1, c2), qr(i3, 2, f2), lr(a3, a3, t4), lr(h2, h2, i3);
          let d2 = Qi();
          nr(d2, a3, h2), d2[3] = 1, qr(i3, 3, d2);
        }
        We(r2, r2), Ye(e3.m, r2, e3.m), Oe(e3.l, e3.h, e3.m);
      }
      D(t3) {
        var e3 = this.i.c(t3.a.a), i2 = this.j.c(t3.a.a), r2 = this.k.c(t3.a.a);
        if (0 != (640 & this.d)) {
          let w2 = je();
          return qe(w2), Ze(w2, w2, this.h), e3 && (this.n = this.i.d(t3, this.a.aX), Ze(w2, w2, this.n)), i2 && (this.o = this.j.d(t3, this.a.aX, xr()), n2 = this.p, a2 = this.o, s2 = a2[0], o2 = a2[1], l2 = a2[2], h2 = a2[3], d2 = s2 * (u2 = s2 + s2), b2 = o2 * u2, g2 = o2 * (c2 = o2 + o2), _2 = l2 * u2, p2 = l2 * c2, m2 = l2 * (f2 = l2 + l2), v2 = h2 * u2, x2 = h2 * c2, T2 = h2 * f2, n2[0] = 1 - g2 - m2, n2[1] = b2 + T2, n2[2] = _2 - x2, n2[3] = 0, n2[4] = b2 - T2, n2[5] = 1 - d2 - m2, n2[6] = p2 + v2, n2[7] = 0, n2[8] = _2 + x2, n2[9] = p2 - v2, n2[10] = 1 - d2 - g2, n2[11] = 0, n2[12] = 0, n2[13] = 0, n2[14] = 0, n2[15] = 1, Ye(w2, w2, this.p)), r2 && (this.n = this.k.d(t3, this.a.aX), Je(w2, w2, this.n)), Ze(w2, w2, Ie(this.n, this.h)), w2;
        }
        var n2, a2, s2, o2, l2, h2, u2, c2, f2, d2, b2, g2, _2, p2, m2, v2, x2, T2;
        return null;
      }
    };
    const Yr = class {
      constructor(t3) {
        var e3 = this;
        e3.a = t3.getUint16(), e3.b = t3.getUint16(), e3.c = t3.getUint16(), e3.d = t3.getUint16(), e3.e = t3.getUint16() + 65536 * e3.b, e3.f = t3.getUint16(), e3.g = t3.getUint16(), e3.h = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), e3.i = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), e3.j = t3.getFloat();
      }
      k() {
        this.h = null, this.i = null;
      }
    };
    var Zr = i(591);
    const Jr = class {
      constructor(t3) {
        this.a = t3.getUint16(), this.b = t3.getUint16();
      }
      static c(t3) {
        t3.E = false, t3.o.av && t3.g < t3.o.av.length ? t3.r = t3.o.av[t3.g] : t3.r = {
          a: 0,
          b: 0
        }, t3.x = 0 != (1 & t3.r.a), t3.y = 0 == (4 & t3.r.a), t3.z = 0 != (16 & t3.r.a);
      }
    };
    class Kr {
      static a(t3) {
        const e3 = 32767 & t3;
        return e3 < $r.length ? $r[e3] : (WH.debug("Unknown shader effect:", e3), ["PS_Combiners_Opaque", "VS_Diffuse_T1"]);
      }
      static b(t3, e3) {
        var i2 = "";
        if (-1e3 == t3 && 3 == e3) return "Skin";
        if (32768 & t3) return Kr.a(t3)[0];
        if (1 == e3) i2 = 112 & t3 ? "PS_Combiners_Mod" : "PS_Combiners_Opaque";
        else {
          i2 = (112 & t3 ? "PS_Combiners_Mod" : "PS_Combiners_Opaque") + "_" + (112 & t3 ? ["Opaque", "Mod", "Mod", "Add", "Mod2x", "Mod", "Mod2xNA", "AddNA"] : ["Opaque", "Mod", "Mod", "AddAlpha", "Mod2x", "Mod", "Mod2xNA", "AddAlpha"])[7 & t3];
        }
        return i2;
      }
      static c(t3, e3) {
        var i2 = "";
        if (-1e3 == t3 && 3 == e3) i2 = "T1_T1_T1";
        else {
          if (32768 & t3) return Kr.a(t3)[1];
          i2 = 1 == e3 ? 128 & t3 ? "Env" : 16384 & t3 ? "T2" : "T1" : 128 & t3 ? 8 & t3 ? "Env_Env" : "Env_T1" : 8 & t3 ? "T1_Env" : 16384 & t3 ? "T1_T2" : "T1_T1";
        }
        return "VS_Diffuse_" + i2;
      }
      static d(t3, e3, i2) {
        var r2 = Kr.b(t3, e3), n2 = Kr.c(t3, e3), a2 = "Wow." + n2 + "_" + r2;
        if (ge._GetProgram(a2)) return { name: a2 };
        var s2 = {
          shaders: [Kr.f(n2), Kr.g(r2, i2)],
          attributes: {
            position: "aPosition",
            normal: "aNormal",
            texcoord0: "aTexCoord0",
            texcoord1: "aTexCoord1"
          }
        };
        return ge.RegisterProgram(a2, s2), { name: a2 };
      }
      static e(t3) {
        var e3 = {}, i2 = {
          texcoord1: function(t4, e4) {
            t4.INPUT_TEXCOORD1 = "aTexCoord" + e4;
          }
        };
        for (var r2 in t3.options) {
          var n2 = t3.options[r2];
          i2[r2](e3, n2);
        }
        return { name: "Wow." + t3.name, config: e3 };
      }
      static f(t3) {
        var e3 = "";
        if (e3 += "vTexCoord1 = (uTextureMatrix1 * vec4(aTexCoord0, 0, 1)).st;\n", e3 += "vTexCoord2 = (uTextureMatrix2 * vec4(aTexCoord1, 0, 1)).st;\n", "VS" === t3.substr(0, 2)) {
          var i2 = (t3 = t3.substr(3)).split("_"), r2 = i2[0];
          if ("Diffuse" === r2 || "Color" === r2) {
            e3 = "", i2.splice(0, 1);
            var n2 = {
              T1: ["uTextureMatrix1", "aTexCoord0"],
              T2: ["uTextureMatrix2", "aTexCoord1"],
              T3: ["", "aTexCoord2"],
              Env: ["", "texEnv"]
            }, a2 = 1;
            for (var s2 in i2) n2[i2[s2]] ? (n2[i2[s2]][0] && "texEnv" != n2[i2[s2]][1] ? e3 += "vTexCoord" + a2 + " = (" + n2[i2[s2]][0] + " * vec4(" + n2[i2[s2]][1] + ", 0, 1)).st;\n" : "texEnv" == n2[i2[s2]][1] ? e3 += "vTexCoord" + a2 + " = texEnv;\n" : e3 += "vTexCoord" + a2 + " = (uTextureMatrix" + a2 + " * vec4(" + n2[i2[s2]][1] + ", 0, 1)).st;\n", a2++) : WH.debug("Missing vertex shader def?", t3);
          }
        }
        return "            attribute vec3 aPosition;\n            attribute vec3 aNormal;\n            attribute vec2 aTexCoord0;\n            attribute vec2 aTexCoord1;\n            attribute vec3 aColor;\n            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform mat4 uModelMatrix;\n            uniform mat4 uPanningMatrix;\n            uniform mat4 uViewMatrix;\n            uniform mat4 uProjMatrix;\n            uniform mat4 uTextureMatrix1;\n            uniform mat4 uTextureMatrix2;\n            uniform mat4 uTextureMatrix3;\n            uniform mat4 uTextureMatrix4;\n            uniform vec3 uCameraPos;\n            uniform bool uHasTexture1;\n            uniform bool uHasTexture2;\n            uniform bool uHasTexture3;\n            uniform bool uHasTexture4;\n            \n            vec2 sphereMap(vec3 vertex, vec3 normal)\n            {\n               vec3 normPos = -(normalize(vertex.xyz));\n               vec3 temp = (normPos - (normal * (2.0 * dot(normPos, normal))));\n               temp = vec3(temp.x, temp.y, temp.z + 1.0);\n               vec2 texCoord = ((normalize(temp).xy * 0.5) + vec2(0.5));\n               return texCoord;\n            }\n            void main(void) {\n              vec4 pos = uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vPosition = pos.rgb;\n              vNormal = normalize(mat3(uViewMatrix * uModelMatrix) * aNormal);\n              vec2 texEnv = sphereMap(pos.xyz,vNormal.xyz);\n              gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n            \n            " + e3 + "\n              vNormal = mat3(uViewMatrix * uModelMatrix) * aNormal;            }";
      }
      static g(t3, e3) {
        var i2 = Qr[t3];
        i2 || (WH.debug("Missing pixel shader def", t3), i2 = Qr[t3 = "PS_Combiners_Opaque_Mod"]);
        for (var r2 = "		" + i2.slice(1, i2.length).join("\n		"), n2 = 0; n2 < i2[0]; n2++) {
          var a2 = n2 + 1;
          r2 = "vec4 tex" + n2 + " = texture2D(uTexture" + a2 + ", vTexCoord" + a2 + ".st);\n" + r2;
        }
        return "            precision mediump float;            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform bool uHasTexture1;\n            uniform bool uHasTexture2;\n            uniform bool uHasTexture3;\n            uniform bool uHasTexture4;\n            uniform bool uHasAlpha;\n            uniform bool uHasSpecEmiss;\n            uniform bool uHasEmissiveGlowing;\n            uniform int uBlendMode;\n            uniform bool uUnlit;\n            uniform vec4 uColor;\n            uniform vec4 uAmbientColor;\n            uniform vec4 uDiffuseColor;\n            uniform vec4 uPrimaryColor;\n            uniform vec4 uSecondaryColor;\n            uniform vec3 uLightDir1;\n            uniform vec3 uLightDir2;\n            uniform vec3 uLightDir3;\n            uniform sampler2D uTexture1;\n            uniform sampler2D uTexture2;\n            uniform sampler2D uTexture3;\n            uniform sampler2D uTexture4;\n            uniform sampler2D uAlpha;\n            uniform vec4 uTexSampleAlpha;\n            \n            void main(void) {\n            vec4 _output = vec4(1.0);\n            vec4 _input = uColor;\n            vec3 _specular = vec3(0.0);            " + r2 + "\n            \n            if (uBlendMode == 13) {\n                _output.a = _output.a * _input.a;\n            } else if (uBlendMode == 1) {\n                if (_output.a < (128.0/255.0))\n                    discard;\n                _output.a = _input.a;\n            } else if (uBlendMode == 0) {\n                _output.a = _input.a;\n            } else {\n                _output.a = _output.a * _input.a;\n            }\n            // if (uBlendMode > 1) {\n            //     if (_output.a < (1.0/255.0)) {\n            //         discard;\n            //     }\n            // }\n            if (!uUnlit) {                vec4 litColor = uAmbientColor;                vec3 normal = normalize(vNormal);                                float dp = max(0.0, dot(normal, uLightDir1));                litColor += uPrimaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir2));                litColor += uSecondaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir3));                litColor += uSecondaryColor * dp;                                litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));                _output *= (litColor * uDiffuseColor);            }            _output += vec4(_specular, 0.0);            gl_FragColor = _output.xyzw;\n            }";
      }
    }
    const $r = [["PS_Combiners_Opaque_Mod2xNA_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_AddAlpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_AddAlpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Mod2xNA_Alpha_Add", "VS_Diffuse_T1_Env_T1", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Mod_AddAlpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_AddAlpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_AddAlpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_AddAlpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Alpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Mod2xNA_Alpha_3s", "VS_Diffuse_T1_Env_T1", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Opaque_AddAlpha_Wgt", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_Add_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_ModNA_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_AddAlpha_Wgt", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_AddAlpha_Wgt", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_AddAlpha_Wgt", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Mod_Add_Wgt", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha", "VS_Diffuse_T1_Env_T1", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Mod_Dual_Crossfade", "VS_Diffuse_T1", "HS_T1", "DS_T1"], ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_T1", "HS_T1", "DS_T1"], ["PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha", "VS_Diffuse_T1_Env_T2", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Mod_Mod", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_Masked_Dual_Crossfade", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Alpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha", "VS_Diffuse_T1_Env_T2", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_Env", "HS_T1", "DS_T1"], ["PS_Guild", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"], ["PS_Guild_NoBorder", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2_T3"], ["PS_Guild_Opaque", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"], ["PS_Illum", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod_Mod_Mod_Const", "VS_Diffuse_T1_T2_T3", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Mod_Mod_Mod_Const", "VS_Color_T1_T2_T3", "HS_T1_T2_T3", "DS_T1_T2_T3"], ["PS_Combiners_Opaque", "VS_Diffuse_T1", "HS_T1", "DS_T1"], ["PS_Combiners_Mod_Mod2x", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"], ["PS_Combiners_Mod", "VS_Diffuse_EdgeFade_T1", "HS_T1_T2", "DS_T1_T2"], ["PS_Unknown_34821", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"]], Qr = {
      PS_Combiners_Add: [1, "_output.rgb = _input.rgb + tex0.rgb;", "_output.a = _input.a + tex0.a;"],
      PS_Combiners_Decal: [1, "_output.rgb = mix(_input.rgb, tex0.rgb, _input.a);", "_output.a = _input.a;"],
      PS_Combiners_Fade: [1, "_output.rgb = mix(tex0.rgb, _input.rgb, _input.a);", "_output.a = _input.a;"],
      PS_Combiners_Mod: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = tex0.a;"],
      PS_Combiners_Mod2x: [1, "_output.rgb = _input.rgb * tex0.rgb * 2.0;", "_output.a = tex0.a * 2.0;"],
      PS_Combiners_Opaque: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = 1.0;"],
      PS_Combiners_Add_Add: [2, "_output.rgb = (_input.rgb + tex0.rgb) + tex1.rgb;", "_output.a = (_input.a + tex0.a) + tex1.a;"],
      PS_Combiners_Add_Mod: [2, "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;", "_output.a = (_input.a + tex0.a) * tex1.a;"],
      PS_Combiners_Add_Mod2x: [2, "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb * 2.0;", "_output.a = (_input.a + tex0.a) * tex1.a * 2.0;"],
      PS_Combiners_Add_Opaque: [2, "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;", "_output.a = _input.a + tex0.a;"],
      PS_Combiners_Mod_AddNA: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_output.a = tex0.a;", "_specular = tex1.rgb;"],
      PS_Combiners_Mod_Mod: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = tex0.a * tex1.a;"],
      PS_Combiners_Mod_Mod2x: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = tex0.a * tex1.a * 2.0;"],
      PS_Combiners_Mod_Add: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_output.a = tex0.a + tex1.a;", "_specular = tex1.rgb;"],
      PS_Combiners_Mod_Mod2xNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = tex0.a;"],
      PS_Combiners_Mod_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = tex0.a;"],
      PS_Combiners_Mod2x_Add: [2, "_output.rgb = (_input.rgb * tex0.rgb) * 2.0 + tex1.rgb;", "_output.a = (tex0.a) * 2.0 + tex1.a;"],
      PS_Combiners_Mod2x_Mod2x: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 4.0;", "_output.a = (tex0.a) * tex1.a * 4.0;"],
      PS_Combiners_Mod2x_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = tex0.a * 2.0;"],
      PS_Combiners_Opaque_Add: [2, "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;", "_output.a = _input.a + tex1.a;"],
      PS_Combiners_Opaque_AddAlpha: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_specular = (tex1.rgb * tex1.a);"],
      PS_Combiners_Opaque_AddAlpha_Wgt: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_specular = (tex1.rgb * tex1.a) * uTexSampleAlpha.g;"],
      PS_Combiners_Opaque_AddAlpha_Alpha: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_specular = (tex1.rgb * tex1.a * (1.0 - tex0.a));"],
      PS_Combiners_Opaque_AddNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;", "_output.a = _input.a;"],
      PS_Combiners_Opaque_Mod: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = tex1.a;"],
      PS_Combiners_Opaque_Mod2x: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = tex1.a * 2.0;"],
      PS_Combiners_Opaque_Mod2xNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", ""],
      PS_Combiners_Opaque_Mod2xNA_Alpha: [2, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));", ""],
      PS_Combiners_Opaque_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", ""],
      PS_Combiners_Opaque_Mod2xNA_Alpha_Add: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));", "_specular = tex2.rgb * tex2.a * uTexSampleAlpha.b; "],
      PS_Combiners_Mod_Mod_Mod_Const: [3, "_output.rgb = _input.rgb * (tex0 * tex1 * tex2).rgb;", "_output.a = (tex0 * tex1 * tex2).a;"],
      PS_Combiners_Mod_AddAlpha: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_output.a = tex0.a;", "_specular = tex1.rgb * tex1.a;"],
      PS_Combiners_Mod_AddAlpha_Wgt: [2, "_output.rgb = (_input.rgb * tex0.rgb);", "_output.a = tex0.a;", "_specular = tex1.rgb * tex1.a * uTexSampleAlpha.g;"],
      PS_Combiners_Mod_AddAlpha_Alpha: [2, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = (tex0.a + tex1.a * (0.3 * tex1.r + 0.59 * tex1.g + 0.11 * tex1.b));", "_specular = tex1.rgb * tex1.a * (1.0 - tex0.a);"],
      PS_Combiners_Opaque_Mod_Add_Wgt: [2, "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));", "_specular = (tex0.rgb * tex0.a) * uTexSampleAlpha.r;"],
      PS_Guild: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));", "_output.a = tex0.a;"],
      PS_Guild_Opaque: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));", ""],
      PS_Guild_NoBorder: [2, "_output.rgb = _input.rgb * tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a));", "_output.a = tex0.a;"],
      PS_Combiners_Opaque_Alpha_Alpha: [2, "_output.rgb = _input.rgb * mix(mix(tex0.rgb, tex1.rgb, vec3(tex1.a)), tex0.rgb, vec3(tex0.a));", ""],
      PS_Combiners_Opaque_Mod2xNA_Alpha_3s: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex2.rgb, vec3(tex2.a));"],
      PS_Combiners_Mod_Add_Alpha: [2, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = (tex0.a + tex1.a);", "_specular = tex1.rgb * (1.0 - tex0.a);"],
      PS_Combiners_Opaque_ModNA_Alpha: [2, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb, tex0.rgb, vec3(tex0.a));", ""],
      PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha: [3, "float glowOpacity = clamp((tex2.a * vec4(1.0, 1.0, 1.0, 1.0).z), 0.0, 1.0); _output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.000000, tex0.rgb, vec3(tex0.a)) * (1.0 - glowOpacity);", "_specular = tex2.rgb * glowOpacity;"],
      PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha: [3, "_output.rgb = _input.rgb * mix(mix(tex0.rgb * tex1.rgb * 2.000000, tex2.rgb, vec3(tex2.a)), tex0.rgb, vec3(tex0.a));", ""],
      PS_Combiners_Mod_Depth: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = tex0.a;"],
      PS_Combiners_Opaque_Alpha: [2, "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));", ""],
      Skin: [3, "//Fresnel Rim\r\nif (uHasSpecEmiss) {\r\n    vec3 emissiveColor = tex2.rgb;\r\n    vec3 emissiveTerm = tex2.rgb;\r\n    if (uHasEmissiveGlowing) {\r\n        vec3 eyeVec_120 = vPosition.xyz;\r\n        vec3 t121 = -(eyeVec_120);\r\n        vec2 term_126 = vec2(dot(t121, vNormal), dot(normalize(t121), (vNormal * vec3(0.0500000007, 0.0500000007, 1.0))));\r\n        vec2 invTerm_128 = (vec2(1.0) - clamp(term_126, 0.0, 1.0));\r\n        vec2 f_129 = (invTerm_128 * invTerm_128);\r\n        float fresnel_rim_133 = pow((f_129.x + f_129.y), 0.600000024);\r\n        vec3 t136 = (tex2.rgb /*+ ((vec3(0.0500000007, 0.0, 0.400000006) * 1.0) * fresnel_rim_133)*/);\r\n        emissiveColor = vec3(t136.r, tex2.g, t136.b);\r\n\r\n        float t267 = dot(normalize(vNormal),  normalize(-(vPosition.xyz)));\r\n        emissiveTerm = mix(vec3(0.0), 2.0*emissiveColor, vec3(pow(clamp(t267, 0.0, 1.0), (( 128.0 * (tex2.a)) + 9.99999975e-006))));\r\n    }\r\n\r\n    _output.rgb = _input.rgb * tex0.rgb + tex1.rgb + emissiveTerm.rgb;\r\n} else {\r\n    _output.rgb = _input.rgb * tex0.rgb;\r\n}\r\n_output.a = tex0.a; //"],
      PS_Combiners_Mod_Dual_Crossfade: [3, "_output.rgb = _input.rgb * mix(mix(tex0, texture2D(uTexture2,vTexCoord1), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,vTexCoord1), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).rgb;", "_output.a = mix(mix(tex0, texture2D(uTexture2,vTexCoord1), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,vTexCoord1), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).a;"],
      PS_Combiners_Mod_Masked_Dual_Crossfade: [4, "_output.rgb = _input.rgb * mix(mix(tex0, texture2D(uTexture2,texCoord), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,texCoord), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).rgb;", "_output.a = mix(mix(tex0, texture2D(uTexture2,texCoord), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,texCoord), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).a * texture(uTexture4,texCoord2).a;"],
      PS_Unknown_34821: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = tex0.a * tex1.a;"]
    }, tn = Kr;
    const en = class {
      constructor() {
        this.h = false, this.i = true;
      }
    }, rn = [0, 1, 2, 10, 3, 4, 5, 13];
    const nn = class {
      constructor(t3) {
        this.E = false, this.F = false;
        var e3 = this;
        e3.a = t3.getUint8(), e3.b = t3.getInt8(), e3.c = t3.getUint16(), e3.d = t3.getUint16(), e3.e = t3.getUint16(), e3.f = t3.getInt16(), e3.g = t3.getUint16(), e3.h = t3.getUint16(), e3.i = t3.getUint16(), e3.j = t3.getInt16(), e3.k = t3.getUint16(), e3.l = t3.getInt16(), e3.m = t3.getInt16(), e3.n = true, e3.o = null, e3.p = null, e3.q = 0, e3.r = null, e3.s = [], e3.t = [], e3.u = new Array(), e3.v = null, e3.w = [], e3.x = false, e3.y = false, e3.z = false, e3.A = Qi(), e3.B = ve(), e3.C = xr();
      }
      K(t3) {
        var e3 = this;
        e3.o = t3, e3.p = t3.as[e3.d], e3.q = e3.p.a, Jr.c(e3);
        let i2 = this.o.ax[e3.j];
        1 == this.i && i2 > -1 && 1 == this.o.aw[i2].c && (this.c = -1e3, this.i = 3);
        const r2 = tn.d(e3.c, e3.i, e3.r);
        e3.H = r2;
        for (let i3 = 0; i3 < e3.i; i3++) {
          if (e3.j > -1 && e3.j < t3.ax.length) {
            let r3 = t3.ax[e3.j + i3];
            r3 > -1 && r3 < t3.aw.length && e3.s.splice(i3, 0, t3.aw[r3]);
          }
          if (e3.m > -1 && e3.m < t3.az.length) {
            let r3 = t3.az[e3.m + i3];
            r3 > -1 && t3.ay && r3 < t3.ay.length ? e3.t.splice(i3, 0, t3.ay[r3]) : e3.t.splice(i3, 0, null);
          }
          if (e3.l > -1 && e3.l < t3.aF.length) {
            let r3 = t3.aF[e3.l + i3];
            r3 > -1 && r3 < t3.aE.length ? e3.w.splice(i3, 0, t3.aE[r3]) : e3.w.splice(i3, 0, null);
          }
        }
        this.u = new Array(e3.t.length);
        for (let t4 = 0; t4 < this.u.length; t4++) this.u[t4] = je();
        e3.E && (e3.s = e3.s.reverse(), e3.t = e3.t.reverse()), t3.aD && e3.f > -1 && e3.f < t3.aD.length && (e3.v = t3.aD[e3.f]), e3.D = this.r.b > 1;
      }
      L() {
        const t3 = this, e3 = t3.o.aS.context, i2 = ge.GetProgram(e3, t3.H.name, t3.H.config);
        t3.G = i2, t3.H = i2.program, t3.I = i2.uniforms;
      }
      M() {
        let t3 = er(this.p.i[0], this.p.i[1], this.p.i[2], 1), e3 = this.o.ap[this.p.g].m, i2 = je();
        Ye(i2, i2, this.o.aW.uViewMatrix), Ye(i2, i2, this.o.U), Ye(i2, i2, e3), lr(t3, t3, i2), t3[3] = 0;
        let r2 = hr(t3);
        if ((3 & this.a) > 0) {
          let e4 = Qi();
          r2 > 0 ? ar(e4, t3, 1 / r2) : ir(e4, t3), ar(e4, e4, Te(we(i2[8], i2[9], i2[10])) * this.p.j), 1 & this.a ? nr(e4, t3, e4) : rr(e4, t3, e4), r2 = sr(e4);
        }
        return r2;
      }
      N(t3) {
        const e3 = this, i2 = e3.o, r2 = e3.o.aS.context, n2 = e3.o.R;
        if (e3.G || e3.L(), !e3.G.program) return;
        if (this.J || (this.J = new en(), this.J.a = e3.G, this.J.b = Object.assign({}, i2.aW)), this.J.c = i2.aU, this.J.d = i2.aV, this.J.b = Object.assign({}, i2.aW), e3.A[0] = e3.A[1] = e3.A[2] = e3.A[3] = 1, e3.v && e3.v.g(n2, e3.o.aX, e3.A), e3.w[0] && (e3.A[3] *= e3.w[0].d(n2, e3.o.aX)), e3.A[3] <= 1e-3) return;
        let a2 = e3.r.b;
        const s2 = [0, 0, 0];
        for (let t4 = 0; t4 < e3.w.length; t4++) {
          const i3 = e3.w[t4];
          i3 && (s2[t4] = i3.d(n2, e3.o.aX));
        }
        this.J.b.uColor = e3.A, this.J.b.uTexSampleAlpha = er(s2[0], s2[1], s2[2], 0), this.J.b.uBlendMode = a2, this.J.b.uHasSpecEmiss = i2.aJ && i2.aJ.h, this.J.b.uHasEmissiveGlowing = i2.n == bi || i2.n == gi, this.J.e = rn[a2], this.J.i = !this.o.aY, this.J.b.uUnlit = e3.x ? 1 : 0, this.J.n = this.M(), this.J.m = this.b, this.J.o = this.h;
        const o2 = this.O();
        let l2 = true;
        for (const t4 in o2) {
          const e4 = o2[t4], i3 = e4.a && e4.a.d;
          l2 = l2 && (null == e4.a || null != i3), i3 && (this.J.b[e4.c] = i3);
        }
        l2 && !e3.F && (e3.F = true), e3.t.forEach(((t4, i3) => {
          if (!e3.o.S && (qe(e3.u[i3]), e3.t[i3])) {
            let t5 = false, r3 = false;
            e3.t[i3].a && e3.t[i3].a.c(n2.a.a) ? (e3.B = e3.t[i3].a.d(n2, e3.o.aX), r3 = true) : Ae(e3.B, 0, 0, 0), e3.t[i3].b && e3.t[i3].b.c(n2.a.a) ? (e3.C = e3.t[i3].b.d(n2, e3.o.aX), t5 = true) : Fr(e3.C, 0, 0, 0, 1);
            let a3, s3 = false;
            if (e3.t[i3].c && e3.t[i3].c.c(n2.a.a) && (a3 = e3.t[i3].c.d(n2, e3.o.aX), s3 = true), qe(e3.u[i3]), Ze(e3.u[i3], e3.u[i3], we(0.5, 0.5, 0)), s3 && Je(e3.u[i3], e3.u[i3], a3), t5) {
              let t6 = je();
              ei(t6, e3.C, [0, 0, 0]), Ye(e3.u[i3], e3.u[i3], t6);
            }
            r3 && Ze(e3.u[i3], e3.u[i3], e3.B), Ze(e3.u[i3], e3.u[i3], we(-0.5, -0.5, 0));
          }
          this.J.b["uTextureMatrix" + (i3 + 1).toString()] = e3.u[i3];
        })), this.J.h = e3.y, this.J.f = !e3.z, this.J.j = r2.TRIANGLES, this.J.l = 2 * e3.p.e, this.J.k = e3.p.f, t3.push(this.J);
      }
      O() {
        let t3 = 0;
        const e3 = [];
        this.s.forEach(((i3, r2) => {
          const n2 = r2;
          let a2 = null;
          if (this.s[n2]) if (this.s[0] && 1 == this.s[0].c && r2 > 0) 1 == r2 ? a2 = this.o.aJ && this.o.aJ.b ? { d: this.o.aJ.b } : { d: this.o.aS.blackPixelTexture } : 2 == r2 && (a2 = this.o.aJ && this.o.aJ.c ? { d: this.o.aJ.c } : { d: this.o.aS.blackPixelTexture });
          else if (1 == this.s[n2].c) this.o.aK ? a2 = this.o.aK.a : this.o.aJ && this.o.aJ.a && (a2 = { d: this.o.aJ.a });
          else if (this.s[n2].f) a2 = this.s[n2].f;
          else if (((this.o.a.type < 8 || this.o.a.type > 32) && 2 == this.s[n2].c || [2, 11, 12, 13].includes(this.s[n2].c)) && this.o.B[this.s[n2].b]) a2 = this.o.B[this.s[n2].b];
          else if (-1 != this.s[n2].c && this.o.B[this.s[n2].c]) a2 = this.o.B[this.s[n2].c];
          else if (-1 != this.s[n2].c && this.o.C[this.s[n2].c][n2]) a2 = this.o.C[this.s[n2].c][n2].a;
          else if (8 == this.s[n2].c && this.o.v) a2 = this.o.v.C[this.s[n2].c][0].a;
          else if (!this.s[n2].e && this.j + t3 < this.o.aw.length) {
            let e4 = this.o.aw[this.j + t3];
            e4 && e4.f && (a2 = e4.f);
          } else this.s[n2].g || WH.debug("can't find texture for material", n2, "type", this.s[n2].c), this.s[n2].g = true;
          e3[n2] = a2, t3++;
        }));
        const i2 = {};
        for (let r2 = 0; r2 < t3; r2++) i2["Texture" + (r2 + 1)] = {
          a: e3[r2],
          b: r2,
          c: "uTexture" + (r2 + 1),
          d: "TEXTURE" + r2
        };
        return i2;
      }
      get show() {
        return this.n;
      }
      set show(t3) {
        this.n = t3;
      }
      get meshId() {
        return this.q;
      }
      P() {
        this.o = null, this.p = null, this.r = null, this.s = null, this.t = null, this.v = null, this.w = null, this.A = null, this.u = null, this.B = null, this.C = null;
      }
    };
    const an = class {
      constructor(t3, e3, i2) {
        var r2 = this;
        t3.aS.context;
        0 == i2 && console.log("Texture file is 0"), r2.b = t3, r2.c = t3.k.contentPath + "textures/" + i2 + ".webp", r2.d = null, r2.f = false, (function(t4, e4) {
          t4.a = new Image(), t4.a.crossOrigin = "", t4.a.onload = function() {
            t4.i();
          }, t4.a.onerror = function() {
            t4.a = null;
          }, t4.a.src = t4.c;
        })(r2);
      }
      g() {
        return this.f;
      }
      h() {
        var t3 = this;
        if (t3.b) {
          var e3 = t3.b.aS.context;
          t3.d && e3.deleteTexture(t3.d), t3.d = null, t3.b = null;
        }
      }
      i() {
        var t3 = this;
        if (t3.b) {
          var e3 = t3.b.aS.context;
          t3.d = e3.createTexture(), e3.bindTexture(e3.TEXTURE_2D, t3.d), e3.pixelStorei(e3.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false), e3.texImage2D(e3.TEXTURE_2D, 0, e3.RGBA, e3.RGBA, e3.UNSIGNED_BYTE, t3.a), r2(t3.a.width) && r2(t3.a.height) ? e3.generateMipmap(e3.TEXTURE_2D) : (e3.texParameteri(e3.TEXTURE_2D, e3.TEXTURE_WRAP_S, e3.CLAMP_TO_EDGE), e3.texParameteri(e3.TEXTURE_2D, e3.TEXTURE_WRAP_T, e3.CLAMP_TO_EDGE), e3.texParameteri(e3.TEXTURE_2D, e3.TEXTURE_MIN_FILTER, e3.LINEAR));
          var i2 = t3.b.aS.aniFilterExt;
          i2 && e3.texParameteri(e3.TEXTURE_2D, i2.TEXTURE_MAX_ANISOTROPY_EXT, t3.b.aS.aniFilterMax), t3.f = true;
        }
        function r2(t4) {
          return 0 == (t4 & t4 - 1);
        }
      }
    };
    const sn = class {
      constructor(t3, e3, i2) {
        var r2 = this;
        r2.a = t3, r2.b = e3, r2.c = i2.getInt32(), r2.d = i2.getUint32(), r2.e = i2.getUint32(), r2.f = null, r2.g = false, r2.i();
      }
      h() {
        var t3 = this;
        t3.a = null, t3.f && t3.f.h(), t3.f = null;
      }
      i() {
        var t3 = this;
        0 != t3.e && (t3.f = new an(t3.a, 0, t3.e));
      }
    };
    const on = class {
      constructor(t3) {
        this.a = new Gr(t3, Br), this.b = new Gr(t3, Pr), this.c = new Gr(t3, Br);
      }
      d() {
        var t3 = this;
        t3.a && (t3.a.e(), t3.a = null), t3.b && (t3.b.e(), t3.b = null), t3.c && (t3.c.e(), t3.c = null);
      }
    };
    const ln = class {
      constructor(t3) {
        var e3 = this;
        e3.a = t3.getInt32(), e3.b = t3.getInt32(), e3.c = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), e3.d = -1;
      }
      e() {
        this.c = null;
      }
    };
    const hn = class {
      constructor(t3) {
        this.a = new Gr(t3, Br), this.b = new Gr(t3, zr);
      }
      c() {
        var t3 = this;
        t3.a && t3.a.e(), t3.b && t3.b.e();
      }
      d(t3) {
        return !!this.a && this.a.c(t3);
      }
      e(t3) {
        return !!this.b && this.b.c(t3);
      }
      f(t3) {
        return this.d(t3) || this.e(t3);
      }
      g(t3, e3, i2) {
        var r2 = this;
        i2 ? i2[0] = i2[1] = i2[2] = i2[3] = 1 : i2 = er(1, 1, 1, 1);
        let n2 = we(1, 1, 1);
        return r2.d(t3.a.a) && r2.a.d(t3, e3, n2, n2), r2.e(t3.a.a) && (i2[3] = r2.b.d(t3, e3, i2[3]) / 32767), i2[0] = n2[0], i2[1] = n2[1], i2[2] = n2[2], i2;
      }
    };
    const un = class {
      constructor(t3) {
        this.a = new Gr(t3, zr);
      }
      b() {
        this.a.e(), this.a = null;
      }
      c(t3) {
        return this.a.c(t3);
      }
      d(t3, e3) {
        var i2 = 1;
        this.c(t3.a.a) && (i2 = this.a.d(t3, e3, i2) / 32767);
        return i2 > 1 ? i2 = 1 : i2 < 0 && (i2 = 0), i2;
      }
    };
    const cn = class {
      constructor() {
        this.a = 0, this.b = 0, this.c = -1, this.d = null, this.e = null;
      }
    };
    class fn extends cn {
    }
    const dn = class {
      constructor(t3, e3) {
        this.d = false, this.a = t3, this.b = e3, this.c = new Array(e3.length);
      }
      e(t3) {
        for (let e3 = 0; e3 < this.b.length; e3++) this.c[e3] && this.c[e3].e && this.c[e3].e.setAnimation(t3);
      }
      f(t3) {
        this.d = t3;
      }
      g(t3) {
        for (let e3 = 0; e3 < this.b.length; e3++) switch (this.b[e3].EffectType) {
          case 1:
            if (1 == this.b[e3].ProcEffectType) {
              let t4 = this.b[e3].Value[0];
              this.a.V = er((t4 >> 16 & 255) / 255, (t4 >> 8 & 255) / 255, (255 & t4) / 255, this.a.V[3]);
            } else if (14 == this.b[e3].ProcEffectType) {
              let t4 = Math.min(Math.max(this.b[e3].Value[0], 0), 1);
              this.a.V[3] = t4;
            } else if (22 == this.b[e3].ProcEffectType) {
              let t4 = this.b[e3].Value[3];
              this.a.V = er((t4 >> 16 & 255) / 255, (t4 >> 8 & 255) / 255, (255 & t4) / 255, this.a.V[3]);
            }
            break;
          case 2:
            this.h(e3, t3);
        }
      }
      h(t3, e3) {
        if (!this.a) return;
        if (!this.a.d) return;
        if (!this.c[t3]) {
          let e4 = this.b[t3].AttachmentID;
          this.b[t3].Positioner > -1 && (e4 = this.b[t3].Positioner), e4 < 0 && (e4 = 19);
          let i3 = this.a.bV(e4);
          if (this.c[t3] = new fn(), this.c[t3].d = i3, this.c[t3].c = i3 ? i3.b : -1, 0 == this.b[t3].ModelType) {
            let e5 = { type: hi.PATH, id: this.b[t3].Model, parent: this.a, shoulder: -1 };
            this.c[t3].e = new $n(this.a.aS, this.a.k, e5, 0, false, true, false);
          } else if (1 == this.b[t3].ModelType) {
            let e5 = this.a.n > 0 ? this.a.n : 1, i4 = -1 != this.a.o ? this.a.o : 0;
            this.a.n = e5, this.a.o = i4, this.c[t3].ba = new _n(this.a, this.b[t3].InvType, this.b[t3].Model, e5, i4);
          } else if (2 == this.b[t3].ModelType) {
            let e5 = { type: hi.NPC, id: this.b[t3].Model, parent: this.a, shoulder: -1 };
            this.c[t3].e = new $n(this.a.aS, this.a.k, e5, 0, false, true, false);
          }
        }
        if (!(0 != this.b[t3].ModelType || this.c[t3].e && this.c[t3].e.d)) return;
        if (!(1 != this.b[t3].ModelType || this.c[t3].ba && this.c[t3].ba.m)) return;
        if (!(2 != this.b[t3].ModelType || this.c[t3].e && this.c[t3].e.d)) return;
        let i2 = je();
        Qe(i2, i2, -this.b[t3].Yaw), $e(i2, i2, this.b[t3].Pitch), Ke(i2, i2, this.b[t3].Roll), Je(i2, i2, [this.b[t3].Scale1, this.b[t3].Scale1, this.b[t3].Scale1]), Je(i2, i2, [this.b[t3].Scale2, this.b[t3].Scale2, this.b[t3].Scale2]);
        let r2 = je();
        if (this.c[t3].d) {
          let e4 = this.c[t3].d.c;
          Ye(r2, r2, this.a.ap[this.c[t3].c].m), Ze(r2, r2, we(e4[0], e4[1], e4[2]));
        }
        if (Ze(r2, r2, we(this.b[t3].Offset[0], -this.b[t3].Offset[1], this.b[t3].Offset[2])), Ye(r2, r2, i2), 0 == this.b[t3].ModelType) {
          let i3 = this.c[t3].e;
          i3.setAnimPaused(this.d), i3.bs(this.a.U, r2, null, null), i3.bY(e3);
        } else if (1 == this.b[t3].ModelType) for (let i3 = 0; i3 < this.c[t3].ba.i.length; i3++) {
          let n2 = this.c[t3].ba.i[i3].e;
          n2.d && (n2.setAnimPaused(this.d), n2.bs(this.a.U, r2, null, null), n2.bY(e3));
        }
        else if (2 == this.b[t3].ModelType) {
          let i3 = this.c[t3].e;
          i3.setAnimPaused(this.d), i3.bs(this.a.U, r2, null, null), i3.bY(e3);
        }
      }
    };
    const bn = class {
      constructor(t3, e3, i2) {
        var r2 = this;
        r2.a = t3, r2.d = e3, r2.b = [], r2.c = false, r2.f = [], i2 && r2.h(i2);
      }
      g() {
        var t3 = this;
        if (t3.a = null, t3.b) {
          for (var e3 = 0; e3 < t3.b.length; ++e3) {
            var i2 = t3.b[e3];
            i2 && (i2.e && i2.e.ba(), i2.e = null, i2.d = null, t3.b[e3] = null);
          }
          t3.b = null;
        }
      }
      h(t3) {
        var e3 = this;
        e3.e = t3;
        var i2 = e3.a.k.contentPath + "meta/itemvisual/" + e3.e + ".json";
        $.getJSON(i2, (function(t4) {
          e3.i(t4);
        }));
      }
      i(t3) {
        var e3 = this;
        if (e3.b = new Array(7), t3.ItemEffects) for (let r3 = 0; r3 < t3.ItemEffects.length; ++r3) {
          let n2 = t3.ItemEffects[r3];
          if (-1 == n2.SubClass || this.d == n2.SubClass) {
            if (n2.Model) {
              e3.b[n2.Slot - 1] = new cn();
              var i2 = { type: hi.PATH, id: n2.Model, parent: e3.a, shoulder: -1 };
              e3.b[n2.Slot - 1].e = new $n(e3.a.aS, e3.a.k, i2, 0, false, true, false);
            }
            n2.kit && (this.a.E, this.a.E.push(new dn(this.a, n2.kit.effects)));
          }
        }
        for (var r2 = 0; r2 < e3.b.length; ++r2) if (t3.Equipment[r2] && null == e3.b[r2]) {
          e3.b[r2] = new cn();
          i2 = { type: hi.PATH, id: t3.Equipment[r2], parent: e3.a, shoulder: -1 };
          e3.b[r2].e = new $n(e3.a.aS, e3.a.k, i2, r2, false, true, false);
        }
        e3.c = true, e3.a.bH();
      }
      j(t3) {
        if (this.a.d) {
          for (var e3 = 0; e3 < this.f.length; e3++) this.f[e3].g(t3);
          for (var i2 = 0; i2 < this.b.length; i2++) {
            var r2 = this.b[i2];
            if (r2) {
              let e4 = we(0, 0, 0);
              if (i2 >= 5 || r2 && r2.d && (e4 = r2.d.c), -1 != r2.c) {
                let i3 = this.a.ap[r2.c].m;
                r2.e.bs(this.a.U, i3, e4, null), r2.e.bY(t3);
              }
            }
          }
        }
      }
    };
    class gn {
      static a(t3, e3, i2, r2, n2) {
        let a2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (!e3) return WH.debug("selectBestTexture:", "textures are null"), null;
        for (let t4 = 0; t4 < e3.length; t4++) {
          let s2 = e3[t4], o2 = s2.Gender, l2 = s2.Class, h2 = s2.Race, u2 = s2.ExtraData, c2 = 0;
          if (i2 > 1 || o2 != i2) {
            if (o2 < 2) continue;
            c2 = 0;
          } else c2 = 2;
          let f2 = 1;
          if (r2 > 0 && l2 == r2) f2 = 0;
          else if (l2 > 0) continue;
          let d2 = 1;
          if (n2 > 0 && h2 == n2) d2 = 0;
          else if (h2 > 0) continue;
          a2[u2 + 3 * (d2 + 2 * (c2 + f2))] = s2.FileDataId;
        }
        for (let t4 = 0; t4 < 2; t4++) for (let e4 = 0; e4 < 2; e4++) for (let i3 = 0; i3 < 2; i3++) {
          let r3 = 3 * (t4 + 2 * (e4 + 2 * i3));
          if (a2[r3] > 0) {
            let t5;
            return t5 = { a: a2[r3], b: a2[r3 + 1], c: a2[r3 + 2] }, t5;
          }
        }
        if (t3) {
          let a3 = t3.bR(i2, n2, true);
          if (a3 && 0 != a3[0]) return n2 = a3[0], i2 = a3[1], gn.a(t3, e3, i2, r2, n2);
        }
        return null;
      }
      static b(t3, e3, i2, r2, n2, a2) {
        let s2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let t4 = 0; t4 < e3.length; t4++) {
          let o3 = e3[t4], l2 = o3.Gender, h2 = o3.Class, u2 = o3.Race, c2 = o3.ExtraData, f2 = 0;
          if (r2 > 1 || l2 != r2) {
            if (l2 < 2) continue;
            f2 = 0;
          } else f2 = 2;
          let d2 = 1;
          if (n2 > 0 && h2 == n2) d2 = 0;
          else if (h2 > 0) continue;
          let b2 = 1;
          if (a2 > 0 && u2 == a2) b2 = 0;
          else if (u2 > 0) continue;
          let g2 = 1;
          if (-1 == i2 || c2 != i2) {
            if (-1 != c2 && -1 != i2) continue;
          } else g2 = 0;
          s2[g2 + 2 * (b2 + 2 * (f2 + d2))] = o3.FileDataId;
        }
        for (let t4 = 0; t4 < 2; t4++) for (let e4 = 0; e4 < 2; e4++) for (let i3 = 0; i3 < 2; i3++) for (let r3 = 0; r3 < 2; r3++) {
          let n3 = r3 + 2 * (t4 + 2 * (e4 + 2 * i3));
          if (s2[n3]) return s2[n3];
        }
        if (t3) {
          var o2 = t3.bR(r2, a2, false);
          if (o2 && 0 != o2[0]) return a2 = o2[0], r2 = o2[1], gn.b(t3, e3, i2, r2, n2, a2);
        }
        return 0;
      }
    }
    const _n = class {
      constructor(t3, e3, i2, r2, n2) {
        this.q = null, this.r = [], WH.debug("Creating item", i2), this.a = t3, this.b = e3, this.s = i2, this.t = r2, this.u = n2, this.e = pi[e3], this.f = mi[e3], this.i = null, this.j = null, this.k = null, this.g = 0, this.h = 0, this.m = false, this.n = false, this.o = 0, this.p = 3, i2 && this.y();
      }
      x() {
        var t3 = this;
        if (t3.i) {
          for (let e3 = 0; e3 < t3.i.length; ++e3) t3.i[e3].e && t3.i[e3].e.ba(), t3.i[e3].e = null, t3.i[e3].d = null, t3.i[e3] = null;
          t3.i = null;
        }
        if (t3.j) {
          for (let e3 = 0; e3 < t3.j.length; ++e3) t3.j[e3].texture && t3.j[e3].texture.h(), t3.j[e3].texture = null, t3.j[e3] = null;
          t3.j = null;
        }
        if (t3.k = null, t3.l = null, t3.r) {
          for (let e3 = 0; e3 < t3.r.length; e3++) t3.r[e3].g();
          t3.r = null;
        }
        t3.m = false, t3.q && (t3.q.ba(), t3.q = null), t3.a && (t3.a.bB(), t3.a = null), WH.debug("Destroyed item", this.s);
      }
      y() {
        let t3 = this;
        WH.debug("Loading item", this.s);
        let e3 = "meta/item/";
        const i2 = this.b;
        i2 != Ti && i2 != wi && i2 != yi && i2 != Ai && i2 != Ei && i2 != Ci && i2 != Si && i2 != Mi && i2 != ki && i2 != Ii && i2 != Ui && i2 != Bi || (e3 = "meta/armor/" + i2 + "/");
        let r2 = t3.a.k.contentPath + e3 + t3.s + ".json";
        $.getJSON(r2).done((function(e4) {
          t3.z(e4);
        })).fail((function(e4, i3, r3) {
          let n2 = i3 + ", " + r3;
          WH.debug("Error loading item metadata", t3.s, n2), t3.n = true;
        }));
      }
      z(t3) {
        if (!this.a) return void WH.debug("Item was destroyed before it was loaded", this.s);
        if (this.h = parseInt(t3.Item.Flags), this.g = parseInt(t3.Item.InventoryType), this.c = parseInt(t3.Item.ItemClass), this.d = parseInt(t3.Item.ItemSubClass), t3.ComponentTextures) {
          this.j = [];
          for (let e4 in t3.ComponentTextures) {
            const i2 = parseInt(e4), r2 = gn.a(this.a, t3.TextureFiles[t3.ComponentTextures[e4]], this.a.o, this.a.p, this.a.n);
            if (r2) {
              let t4;
              t4 = {
                region: i2,
                gender: this.a.o,
                file: r2.a,
                texture: null
              }, i2 != Wi ? t4.texture = new an(this.a, i2, r2.a) : this.b == Ii && (this.a.B[2] = new an(this.a, 2, r2.a)), this.j.push(t4);
            }
          }
        }
        if (this.k = t3.Item.GeosetGroup, this.l = t3.Item.AttachGeosetGroup, this.b == Ti) {
          0 == this.a.o ? this.v = t3.Item.HideGeosetMale : this.w = t3.Item.HideGeosetFemale;
        }
        if (this.b == wi ? this.i = new Array(2) : xi[this.b] != hi.ARMOR && (this.i = new Array(1)), this.i) for (let e4 = 0; e4 < this.i.length; ++e4) {
          const i2 = { race: this.t, gender: this.u, bone: -1, attachment: null, model: null }, r2 = { type: xi[this.b], id: this.s, parent: this.a, shoulder: 0 };
          this.b == wi && (r2.shoulder = e4 + 1), i2.e = new $n(this.a.aS, this.a.k, r2, e4, false, false, true), i2.e.n = this.t, i2.e.o = this.u, i2.e.bS(t3, r2.type), this.i[e4] = i2;
        }
        if ((this.b == Ei || this.b == Ii) && t3.ComponentModels) {
          let e4 = 0;
          if (this.b == Ii && (e4 = 1), t3.ComponentModels[e4]) {
            const i2 = { type: xi[this.b], id: this.s, parent: this.a, shoulder: 0 }, r2 = new $n(this.a.aS, this.a.k, i2, 0, false, false, true);
            r2.u = t3;
            const n2 = { race: 0, gender: 0, bone: -1, attachment: null, model: null };
            n2.e = r2, this.i = [n2];
            let a2 = 1, s2 = 0, o2 = 1;
            this.a && (a2 = this.a.n, s2 = this.a.o, o2 = this.a.p);
            const l2 = t3.ComponentModels[e4], h2 = gn.b(r2, t3.ModelFiles[l2], -1, s2, o2, a2);
            if (h2) {
              r2.bQ(hi.PATH, h2);
              const i3 = 0 == e4 ? t3.Textures : t3.Textures2;
              if (i3) for (let t4 in i3) 0 != i3[t4] && (r2.B[+t4] = new an(r2, parseInt(t4), i3[t4]));
            }
          }
        }
        const e3 = this.b;
        if ((e3 == yi || e3 == Ai || e3 == Bi || e3 == Ei || e3 == Ci || e3 == ki || e3 == Si || e3 == Ti || e3 == Ii) && t3.ComponentModels) {
          let i2 = 0;
          if (e3 != Ti && e3 != Ei || (i2 = 1), t3.ComponentModels[i2]) {
            const r2 = t3.ComponentModels[i2];
            if (r2 && t3.ModelFiles && t3.ModelFiles[r2]) {
              const n2 = { type: xi[e3], id: this.s, parent: this.a, shoulder: 0 }, a2 = new $n(this.a.aS, this.a.k, n2, 0, false, false, true);
              a2.u = t3;
              let s2 = 1, o2 = 0, l2 = 1;
              this.a && (s2 = this.a.n, o2 = this.a.o, l2 = this.a.p);
              const h2 = gn.b(a2, t3.ModelFiles[r2], -1, o2, l2, s2);
              if (h2) {
                this.q = a2, a2.bQ(hi.PATH, h2);
                const e4 = 0 == i2 ? t3.Textures : t3.Textures2;
                if (e4) for (let t4 in e4) 0 != e4[t4] && (a2.B[+t4] = new an(a2, parseInt(t4), e4[t4]));
              }
            }
          }
        }
        if (e3 == Ci && this.k[2] > 0 && (this.f += 2), 0 != this.o) {
          const t4 = 2 == this.c ? this.d : -1;
          for (let e4 = 0; e4 < this.i.length; e4++) this.r.push(new bn(this.i[e4].e, t4, this.o));
        }
        this.a.bH(), this.m = true, WH.debug("Loaded item", this.s);
      }
      A(t3) {
        for (let t4 = 0; t4 < this.r.length; t4++) this.r[t4].g();
        this.r = [], this.o = t3;
      }
      B(t3) {
        this.p = t3;
      }
      C(t3) {
        if (!this.i) return;
        if (this.a.d) {
          const t4 = this.a.bN(this.e, this);
          for (let e4 = 0; e4 < this.i.length; ++e4) if (this.i[e4] && t4.length > e4) {
            let i3 = this.a.aB[t4[e4]];
            if (this.i[e4].c = i3.b, this.i[e4].d = i3, this.r[e4] && this.r[e4].b) {
              const t5 = this.i[e4].e;
              for (let r2 = 0; r2 < this.r[e4].b.length; r2++) if (t5.aB && this.r[e4].b[r2]) {
                if (r2 < 5) {
                  if (!t5.aB[r2]) continue;
                  i3 = t5.aB[r2];
                } else i3 = t5.bV(19);
                this.r[e4].b[r2].c = i3.b, this.r[e4].b[r2].d = i3;
              }
            }
          }
        }
        let e3 = je(), i2 = ve();
        for (let r2 = 0; r2 < this.i.length; ++r2) {
          const n2 = this.i[r2];
          if (n2 && n2.e) {
            if (this.b == wi) {
              if (1 == n2.e.a.shoulder && 0 == (1 & this.p)) continue;
              if (2 == n2.e.a.shoulder && 0 == (2 & this.p)) continue;
            }
            if (n2.c > -1 && n2.c < this.a.ap.length) {
              this.r[r2] && n2.e.d && this.r[r2].j(t3);
              let a2 = false, s2 = si[n2.e.a.id];
              if (qe(e3), s2 && (Ae(i2, 1, 1, -1), Je(e3, e3, i2), a2 = true), this.b != zi && this.b != Oi && this.e != zi || 0 == (256 & this.h) || (Ae(i2, 1, -1, 1), Je(e3, e3, i2), a2 = true, n2.e.h = true), n2.e.aY = a2, 5 == this.a.H && this.b == Ni && 2 == this.c && 18 == this.d && (qe(e3), Ke(e3, e3, -Math.PI / 2)), 27 == this.b) {
                let t4 = n2.e.u.Scale;
                Ae(i2, t4, t4, t4), Je(e3, e3, i2);
              }
              n2.e.bs(this.a.U, this.a.ap[n2.c].m, n2.d.c, e3), n2.e.bW(), n2.e.bY(t3);
            } else -1 == n2.c && this.a.bG(n2.e, t3);
          }
        }
      }
    };
    const pn = class {
      constructor(t3) {
        this.c = t3, this.b = 267320826 ^ t3;
        let e3 = new ArrayBuffer(4);
        this.a = new DataView(e3);
      }
      d() {
        let t3 = this.b;
        return t3 ^= t3 << 13, t3 ^= t3 >> 17, t3 ^= t3 << 5, this.b = t3, t3;
      }
      e() {
        let t3, e3 = this.d();
        return this.a.setInt32(0, 1065353216 | 8388607 & e3), t3 = 2147483648 & e3 ? 2 - this.a.getFloat32(0) : this.a.getFloat32(0) - 2, t3;
      }
      f() {
        let t3 = this.d();
        return this.a.setInt32(0, 1065353216 | 8388607 & t3), this.a.getFloat32(0) - 1;
      }
    };
    const mn = class {
      constructor() {
        this.a = 0, this.b = 0, this.c = 0, this.d = 0, this.e = ve(), this.f = 0, this.g = 0, this.h = 0, this.i = 0, this.j = 0;
      }
    };
    const vn = class {
      constructor(t3, e3) {
        this.b = t3, this.c = e3, this.a = new mn();
      }
      d() {
        return this.a.d + this.b.e() * this.c.u;
      }
      e() {
        return this.a.d + this.c.u;
      }
      f() {
        return this.a.c + this.c.s;
      }
      g(t3) {
        return this.a.c + 30518509e-12 * t3 * this.c.s;
      }
      h() {
        let t3 = this.a.a;
        return t3 *= 1 + this.a.b * this.b.e(), t3;
      }
      i() {
        return this.a;
      }
      j(t3) {
        ye(t3, this.a.e);
      }
    };
    const xn = class extends vn {
      k(t3, e3) {
        let i2, r2 = e3 * this.b.f(), n2 = this.b.e();
        i2 = n2 < 1 ? n2 > -1 ? Math.trunc(32767 * n2 + 0.5) : -32767 : 32767, t3.d = i2;
        let a2 = this.g(i2);
        a2 < 1e-3 && (a2 = 1e-3), t3.b = (function(t4, e4) {
          let i3 = Math.abs(t4), r3 = Math.abs(e4);
          return Number((i3 - Math.floor(i3 / r3) * r3).toPrecision(8)) * Math.sign(t4);
        })(r2, a2), t3.e = 65535 & this.b.d(), Ae(t3.a, this.b.e() * this.a.g * 0.5, this.b.e() * this.a.h * 0.5, 0);
        let s2 = this.h(), o2 = this.a.f;
        if (o2 < 1e-3) {
          let e4 = this.a.i * this.b.e(), i3 = this.a.j * this.b.e(), r3 = Math.sin(e4), n3 = Math.sin(i3), a3 = Math.cos(e4), o3 = Math.cos(i3);
          Ae(t3.c, o3 * r3 * s2, n3 * r3 * s2, a3 * s2);
        } else {
          let e4 = ve();
          ye(e4, t3.a), e4[2] = e4[2] - o2, Te(e4) > 1e-4 && (Ue(e4, e4), Fe(t3.c, e4, s2));
        }
      }
    };
    const Tn = class extends vn {
      constructor(t3, e3, i2) {
        super(t3, e3), this.ba = i2;
      }
      k(t3, e3) {
        let i2, r2 = e3 * this.b.f(), n2 = this.b.e();
        i2 = n2 < 1 ? n2 > -1 ? Math.trunc(32767 * n2 + 0.5) : -32767 : 32767, t3.d = i2;
        let a2 = this.g(i2);
        a2 < 1e-3 && (a2 = 1e-3), t3.b = (function(t4, e4) {
          let i3 = Math.abs(t4), r3 = Math.abs(e4);
          return Number((i3 - Math.floor(i3 / r3) * r3).toPrecision(8)) * Math.sign(t4);
        })(r2, a2), t3.e = 65535 & this.b.d();
        let s2 = this.a.h - this.a.g, o2 = this.a.g + s2 * this.b.f(), l2 = this.a.i * this.b.e(), h2 = this.a.j * this.b.e(), u2 = Math.cos(l2), c2 = we(u2 * Math.cos(h2), u2 * Math.sin(h2), Math.sin(l2));
        Fe(t3.a, c2, o2);
        let f2 = this.h(), d2 = this.a.f, b2 = we(0.5, 0.5, 0.5);
        0 == d2 ? this.ba ? Ae(b2, 0, 0, 1) : Ae(b2, u2 * Math.cos(h2), u2 * Math.sin(h2), Math.sin(l2)) : (Ae(b2, 0, 0, d2), Ce(b2, t3.a, b2), Te(b2) > 1e-4 && Ue(b2, b2)), Fe(t3.c, b2, f2);
      }
    };
    const wn = class {
      constructor(t3) {
        this.a = t3.getInt32(), this.b = t3.getUint32(), this.c = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), this.d = t3.getInt16(), this.e = t3.getInt16(), 0 != (268435456 & this.b) && (this.f = [0, 0, 0], this.f[0] = 31 & this.e, this.f[1] = this.e >> 5 & 31, this.f[2] = this.e >> 10 & 31), this.g = t3.getUint8(), this.h = t3.getUint8(), this.i = t3.getUint16(), this.j = t3.getUint16(), this.k = t3.getUint16(), this.l = t3.getUint16(), this.m = new Gr(t3, Or), this.n = new Gr(t3, Or), this.o = new Gr(t3, Or), this.p = new Gr(t3, Or), this.q = new Gr(t3, Br), this.r = new Gr(t3, Or), this.s = t3.getFloat(), this.t = new Gr(t3, Or), this.u = t3.getFloat(), this.v = new Gr(t3, Or), this.w = new Gr(t3, Or), this.x = new Gr(t3, Or), this.y = new Vr(t3), this.z = new jr(t3), this.A = new Hr(t3), this.B = [t3.getFloat(), t3.getFloat()], this.C = new jr(t3), this.D = new jr(t3), this.E = t3.getFloat(), this.F = t3.getFloat(), this.G = t3.getFloat(), this.H = [t3.getFloat(), t3.getFloat()], this.I = t3.getFloat(), this.J = t3.getFloat(), this.K = t3.getFloat(), this.L = t3.getFloat(), this.M = t3.getFloat(), this.N = t3.getFloat(), this.O = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), this.P = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), this.Q = we(t3.getFloat(), t3.getFloat(), t3.getFloat()), this.R = t3.getFloat(), this.S = t3.getFloat(), this.T = t3.getFloat(), this.U = t3.getFloat(), this.V = t3.getFloat();
        var e3 = t3.getInt32();
        this.W = new Array(e3);
        for (var i2 = 0; i2 < e3; i2++) this.W[i2] = we(t3.getFloat(), t3.getFloat(), t3.getFloat());
        this.X = new Gr(t3, Nr), this.Y = dr(t3.getFloat(), t3.getFloat()), this.Z = [dr(t3.getFloat(), t3.getFloat()), dr(t3.getFloat(), t3.getFloat())], this.aa = [dr(t3.getFloat(), t3.getFloat()), dr(t3.getFloat(), t3.getFloat())];
      }
    };
    const yn = class {
      constructor() {
        this.a = ve(), this.b = 0, this.c = ve(), this.d = 0, this.e = 2147483647 * Math.random() >> 0, this.f = [fr(), fr()], this.g = [fr(), fr()];
      }
    };
    let An = new Array(128);
    for (let t3 = 0; t3 < 128; t3++) An[t3] = Math.random();
    const En = Xe(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    class Cn {
    }
    class Sn {
      constructor() {
        this.a = ve(), this.b = 0, this.c = { a: fr(), b: ve(), c: 0, d: 0, e: 0 };
      }
    }
    function Mn(t3) {
      return er((t3 >> 16 & 255) / 255, (t3 >> 8 & 255) / 255, (t3 >> 0 & 255) / 255, (t3 >> 24 & 255) / 255);
    }
    const kn = class {
      constructor(t3, e3) {
        this.E = 0, this.U = false, this.a = (/* @__PURE__ */ new Date()).getTime(), this.b = t3;
        let i2 = new wn(e3);
        if (i2.i >= 11 && i2.i <= 13) {
          let e4;
          t3.u.Item && t3.u.Item.ParticleColor ? e4 = t3.u.Item.ParticleColor : t3.u.Creature && t3.u.Creature.ParticleColor && (e4 = t3.u.Creature.ParticleColor), e4 && (this.H = [Qi(), Qi(), Qi()], ir(this.H[0], Mn(e4.Start[i2.i - 11])), ir(this.H[1], Mn(e4.Mid[i2.i - 11])), ir(this.H[2], Mn(e4.End[i2.i - 11])));
        }
        this.c = i2, this.d = je(), this.e = je(), this.f = je(), this.g = je(), this.h = Qi(), this.i = pr(), this.j = ve(), this.k = 1, this.l = ve(), this.m = 0, this.n = ve(), this.o = ve(), this.p = [], this.q = ve(), this.r = 0, this.s = 0, this.t = 0, this.u = 0, this.v = ve(), this.w = ve(), this.x = 0, this.y = 0, this.z = 0, this.A = 0, this.B = 0, this.C = 0, this.D = 0, this.F = [], this.G = [];
        for (let t4 = 0; t4 < 1e3; t4++) this.G.push(4 * t4 + 0), this.G.push(4 * t4 + 1), this.G.push(4 * t4 + 2), this.G.push(4 * t4 + 3), this.G.push(4 * t4 + 2), this.G.push(4 * t4 + 1);
        switch (this.J = new pn(2147483647 * Math.random() >> 0), this.c.h) {
          case 1:
            this.I = new xn(this.J, i2);
            break;
          case 2:
            this.I = new Tn(this.J, i2, 0 != (256 & this.c.b));
            break;
          default:
            this.I = null, WH.debug("Found unimplemented generator ", this.c.h);
        }
        const r2 = this.c.U - this.c.S;
        0 != r2 ? (this.s = (this.c.V - this.c.T) / r2, this.t = this.c.T - this.c.S * this.s) : (this.s = 0, this.t = 0);
        let n2 = this.c.l;
        n2 <= 0 && (n2 = 1);
        let a2 = this.c.k;
        a2 <= 0 && (a2 = 1), this.y = n2 * a2 - 1, this.z = 0;
        let s2 = n2, o2 = -1;
        do {
          ++o2, s2 >>= 1;
        } while (s2);
        if (this.A = o2, this.B = n2 - 1, this.z = 0, (32768 & this.c.b) > 0) {
          let t4 = (this.y + 1) * this.J.d();
          this.z = t4 / 4294967296 | 0;
        }
        if (this.C = 1 / n2, this.D = 1 / a2, (269484032 & this.c.b) > 0) {
          const t4 = 0 != (1 & this.c.b >> 28);
          this.r = t4 ? 2 : 3;
        } else this.r = 0;
        this.K = i2.g > 1;
      }
      W() {
        var t3 = this;
        t3.b = null, t3.c.c = null, t3.c.O = null, t3.c.P = null, t3.c.m = t3.c.m.e(), t3.c.n = t3.c.n.e(), t3.c.o = t3.c.o.e(), t3.c.p = t3.c.p.e(), t3.c.q = t3.c.q.e(), t3.c.r = t3.c.r.e(), t3.c.t = t3.c.t.e(), t3.c.v = t3.c.v.e(), t3.c.w = t3.c.w.e(), t3.c.x = t3.c.x.e(), t3.c.X = t3.c.X.e(), t3.c.y = t3.c.y.d(), t3.c.z = t3.c.z.d(), t3.c.A = t3.c.A.d(), t3.c.C = t3.c.C.d(), t3.c.D = t3.c.D.d(), t3.p = null;
      }
      X(t3, e3, i2) {
        if (!this.I) return;
        let r2 = je(), n2 = this.I.i(), a2 = true;
        this.c.X.c(t3.a.a) && (a2 = this.c.X.d(t3, this.b.aX) > 0), this.T = a2;
        const s2 = we(0, 0, 0);
        a2 && (n2.a = this.c.m.d(t3, this.b.aX, 0), n2.b = this.c.n.d(t3, this.b.aX, 0), n2.i = this.c.o.d(t3, this.b.aX, 0), n2.j = this.c.p.d(t3, this.b.aX, 0), this.c.q.d(t3, this.b.aX, s2, n2.e), n2.c = this.c.r.d(t3, this.b.aX, 0), n2.d = this.c.t.d(t3, this.b.aX, 0), n2.h = this.c.w.d(t3, this.b.aX, 0), n2.g = this.c.v.d(t3, this.b.aX, 0), n2.f = i2 ? i2.a : this.c.x.d(t3, this.b.aX, 0)), Ye(r2, r2, this.b.U), Ye(r2, r2, this.b.ap[this.c.d].m);
        let o2 = je();
        ti(o2, we(this.c.c[0], this.c.c[1], this.c.c[2])), Ye(r2, r2, o2), Ye(r2, r2, En);
        let l2 = je(), h2 = ve();
        We(l2, this.b.aS.viewMatrix), ii(h2, l2), this.aa(e3, r2, h2, null, this.b.aS.viewMatrix), this.ak(this.b.aS.viewMatrix);
        let u2 = this.b.aS.context;
        this.L ? (u2.bindBuffer(u2.ARRAY_BUFFER, this.L), u2.bufferData(u2.ARRAY_BUFFER, new Float32Array(this.F), u2.DYNAMIC_DRAW)) : (this.L = u2.createBuffer(), u2.bindBuffer(u2.ARRAY_BUFFER, this.L), u2.bufferData(u2.ARRAY_BUFFER, new Float32Array(this.F), u2.DYNAMIC_DRAW)), this.M || (this.M = u2.createBuffer(), u2.bindBuffer(u2.ELEMENT_ARRAY_BUFFER, this.M), u2.bufferData(u2.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.G), u2.DYNAMIC_DRAW));
      }
      Y(t3) {
        if (this.p.length <= 0) return;
        const e3 = this.b.aS.context;
        if (this.V || (this.V = new en(), this.V.a = se(e3, ["        attribute vec3 aPosition;\n        attribute vec4 aColor;        attribute vec2 aTexcoord0;        attribute vec2 aTexcoord1;        attribute vec2 aTexcoord2;                varying vec4 vColor;        varying vec2 vTexcoord0;        varying vec2 vTexcoord1;        varying vec2 vTexcoord2;                uniform mat4 uModelMatrix;        uniform mat4 uViewMatrix;        uniform mat4 uProjMatrix;                void main(void) {            vec4 pos = vec4(aPosition, 1);                        gl_Position = uProjMatrix * pos;                    vColor = aColor;        vTexcoord0 = aTexcoord0;        vTexcoord1 = aTexcoord1;        vTexcoord2 = aTexcoord2;        }    ", "        precision mediump float;\n                varying vec4 vColor;        varying vec2 vTexcoord0;        varying vec2 vTexcoord1;        varying vec2 vTexcoord2;                uniform bool uHasTexture;        uniform bool uHasTexture2;        uniform bool uHasTexture3;        uniform bool uHasAlpha;        uniform int uBlendMode;        uniform int uPixelShader;        uniform sampler2D uTexture;        uniform sampler2D uTexture2;        uniform sampler2D uTexture3;        uniform float uAlphaTreshold;                void main(void) {            float lo_thresh = 0.01;            vec4 color = vec4(1, 1, 1, 1);            vec4 tex = vec4(1, 1, 1, 1);            vec4 tex2 = vec4(1, 1, 1, 1);            vec4 tex3 = vec4(1, 1, 1, 1);            if (uHasTexture) {                tex = texture2D(uTexture, vTexcoord0).rgba;            }            if (uHasTexture2) {                tex2 = texture2D(uTexture2, vTexcoord1).rgba;            }            if (uHasTexture3) {                tex3 = texture2D(uTexture3, vTexcoord2).rgba;            }            vec4 finalColor = vec4((tex * vColor ).rgb, tex.a*vColor.a );            if (uPixelShader == 0) {                 vec3 matDiffuse = vColor.xyz * tex.rgb;                finalColor = vec4(matDiffuse.rgb, tex.a*vColor.a);            } else if (uPixelShader == 1) {             vec4 textureMod = tex*tex2;             float texAlpha = (textureMod.w * tex3.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            } else if (uPixelShader == 2) {              vec4 textureMod = tex*tex2*tex3;             float texAlpha = (textureMod.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            } else if (uPixelShader == 3) {              vec4 textureMod = tex*tex2*tex3;             float texAlpha = (textureMod.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            };            if (finalColor.a < uAlphaTreshold ) discard;            gl_FragColor = finalColor;        }    "], null, null), this.V.b = {}, this.V.a.attributes = [{
          loc: e3.getAttribLocation(this.V.a.program, "aPosition"),
          type: e3.FLOAT,
          size: 3,
          offset: 0,
          stride: 52
        }, {
          loc: e3.getAttribLocation(this.V.a.program, "aColor"),
          type: e3.FLOAT,
          size: 4,
          offset: 12,
          stride: 52
        }, {
          loc: e3.getAttribLocation(this.V.a.program, "aTexcoord0"),
          type: e3.FLOAT,
          size: 2,
          offset: 28,
          stride: 52
        }, {
          loc: e3.getAttribLocation(this.V.a.program, "aTexcoord1"),
          type: e3.FLOAT,
          size: 2,
          offset: 36,
          stride: 52
        }, {
          loc: e3.getAttribLocation(this.V.a.program, "aTexcoord2"),
          type: e3.FLOAT,
          size: 2,
          offset: 44,
          stride: 52
        }], this.V.c = this.L, this.V.d = this.M, this.V.m = this.c.j), !this.S) if (this.S = [null, null, null], 0 != (268435456 & this.c.b)) {
          WH.debug("multitexture particle", this.c.f[0], this.c.f[1], this.c.f[2], this);
          for (let t4 = 0; t4 < this.c.f.length; t4++) {
            const e4 = this.c.f[t4];
            e4 > -1 && e4 < this.b.aw.length && (this.S[t4] = this.b.aw[e4]);
          }
        } else this.c.e > -1 && this.c.e < this.b.aw.length && (this.S[0] = this.b.aw[this.c.e]);
        if (!this.S[0].f || !this.S[0].f.f) return;
        this.V.b.uViewMatrix = this.b.aS.viewMatrix, this.V.b.uProjMatrix = this.b.aS.projMatrix, this.V.b.uBlendMode = this.c.g, this.V.b.uPixelShader = this.r > 1 ? this.r - 1 : 0;
        let i2 = [this.S[0] && this.S[0].f && this.S[0].f.f, this.S[1] && this.S[1].f && this.S[1].f.f, this.S[2] && this.S[2].f && this.S[2].f.f];
        this.V.b.uTexture = this.S[0].f.d, this.V.b.uTexture2 = i2[1] ? this.S[1].f.d : null, this.V.b.uTexture3 = i2[2] ? this.S[2].f.d : null, this.V.b.uHasTexture = i2[0] ? 1 : 0, this.V.b.uHasTexture2 = i2[1] ? 1 : 0, this.V.b.uHasTexture3 = i2[2] ? 1 : 0;
        let r2 = this.c.g;
        4 == r2 && (r2 = 3), this.V.e = r2, this.V.i = !this.b.aY;
        let n2 = -1;
        1 == r2 ? n2 = 0.501960814 : r2 > 1 && (n2 = 1 / 255), this.V.b.uAlphaTreshold = n2, this.V.h = false, this.V.f = false, this.V.j = e3.TRIANGLES, this.V.k = 6 * this.E >> 0, this.V.l = 0, t3.push(this.V);
      }
      Z(t3, e3) {
        if (0 == (16 & this.c.b)) for (let i2 = 0; i2 < this.p.length; i2++) {
          const r2 = this.p[i2];
          Oe(r2.a, r2.a, t3), Ne(r2.c, r2.c, e3);
        }
      }
      aa(t3, e3, i2, r2, n2) {
        if (null == this.I) return;
        if (this.b.S) return;
        ii(this.l, this.d);
        let a2 = Qi();
        ii(a2, e3), a2[3] = 1, lr(a2, a2, n2), this.m = a2[2];
        let s2 = ve();
        if (ii(s2, n2), this.ab(e3, s2, r2), t3 > 0) {
          let e4 = ve();
          if (ii(e4, this.d), 16384 & this.c.b) {
            Ce(this.o, e4, this.l);
            let i3 = this.s * (Te(this.o) / t3) + this.t;
            i3 >= 0 && (i3 = Math.min(i3, 1)), Fe(this.n, this.o, i3);
          }
          if (64 & this.c.b) {
            this.u += t3;
            let i3 = 0.03;
            if (this.u > i3) if (this.u = 0, 0 == this.p.length) {
              let t4 = i3 / this.u, r3 = ve();
              Ce(r3, e4, this.l);
              let n3 = t4 * this.c.I;
              Se(this.v, r3, we(n3, n3, n3));
            } else Ae(this.v, 0, 0, 0);
          }
          this.ac(t3);
        }
      }
      ab(t3, e3, i2) {
        if (ye(this.w, e3), null == i2 || 16 & this.c.b) Ge(this.d, t3);
        else {
          let e4 = je();
          We(e4, i2), Ye(this.d, e4, t3);
        }
        let r2 = ve();
        ri(r2, t3), this.k = r2[0];
      }
      ac(t3) {
        if ((t3 = Math.max(t3, 0)) < 0.1) ye(this.n, this.o);
        else {
          let e3 = Math.floor(t3 / 0.1);
          t3 = -0.1 * e3 + t3;
          let i2 = Math.min(Math.floor(this.I.i().lifespan / 0.1), e3), r2 = i2 + 1, n2 = 1;
          n2 = r2 < 0 ? (1 & r2 | r2 >> 1) + (1 & r2 | r2 >> 1) : r2, Fe(this.n, this.o, 1 / n2);
          for (let t4 = 0; t4 < i2; t4++) this.ad(0.1);
        }
        this.ad(t3);
      }
      ad(t3) {
        let e3 = new Cn();
        if (t3 < 0) return;
        this.c.b, this.ae(e3, t3), this.af(t3);
        let i2 = 0;
        for (; i2 < this.p.length; ) {
          let r2 = this.p[i2];
          r2.b = r2.b + t3, r2.b > Math.max(this.I.g(r2.e), 1e-3) ? (this.ai(i2), i2--) : this.aj(r2, t3, e3) || (this.ai(i2), i2--), i2++;
        }
      }
      ae(t3, e3) {
        t3.a = ve(), t3.b = ve(), t3.c = ve(), t3.d = 0;
        let i2 = we(e3, e3, e3), r2 = e3 * e3 * 0.5, n2 = we(r2, r2, r2);
        Se(t3.a, this.c.Q, i2);
        let a2 = ve();
        this.I.j(a2), Se(t3.b, a2, i2), Se(t3.c, a2, n2), t3.d = this.c.J * e3;
      }
      af(t3) {
        if (!this.T) return;
        let e3 = this.I.d();
        for (this.x = this.x + t3 * e3; this.x > 1; ) this.ag(t3), this.x -= 1;
      }
      ag(t3) {
        let e3 = this.ah();
        if (this.I.k(e3, t3), !(16 & this.c.b)) {
          let t4 = er(e3.a[0], e3.a[1], e3.a[2], 1), i3 = er(e3.c[0], e3.c[1], e3.c[2], 0);
          lr(t4, t4, this.d), lr(i3, i3, this.d), ye(e3.a, t4), ye(e3.c, i3), 8192 & this.c.b && (e3.a[2] = 0);
        }
        if (64 & this.c.b) {
          let t4 = 1 + this.I.i().speedVariation * this.J.e(), i3 = ve();
          Fe(i3, this.v, t4), Ee(e3.c, e3.c, i3);
        }
        if (this.r >= 2) for (let t4 = 0; t4 < 2; t4++) {
          e3.f[t4][0] = this.J.f(), e3.f[t4][1] = this.J.f();
          let a2 = fr();
          _r(a2, this.c.aa[t4], this.J.e()), i2 = e3.g[t4], r2 = a2, n2 = this.c.Z[t4], i2[0] = r2[0] + n2[0], i2[1] = r2[1] + n2[1];
        }
        var i2, r2, n2;
      }
      ah() {
        let t3 = new yn();
        return this.p.push(t3), t3;
      }
      ai(t3) {
        this.p.splice(t3, 1);
      }
      aj(t3, e3, i2) {
        if (this.r >= 2) for (let i3 = 0; i3 < 2; i3++) {
          let r3 = t3.f[i3][0] + e3 * t3.g[i3][0];
          t3.f[i3][0] = r3 - Math.floor(r3), r3 = t3.f[i3][1] + e3 * t3.g[i3][1], t3.f[i3][1] = r3 - Math.floor(r3);
        }
        Ee(t3.c, t3.c, i2.a), 16384 & this.c.b && 2 * e3 < t3.b && Ee(t3.a, t3.a, this.n);
        let r2 = we(e3, e3, e3), n2 = ve();
        if (Se(n2, t3.c, r2), Ee(t3.c, t3.c, i2.b), Fe(t3.c, t3.c, 1 - i2.d), Ee(t3.a, t3.a, n2), Ee(t3.a, t3.a, i2.c), 2 == this.c.h && 128 & this.c.b) {
          let e4 = ve();
          if (ye(e4, t3.a), 16 & this.c.b) {
            if (Be(e4, n2) > 0) return false;
          } else {
            let i3 = ve();
            if (ii(i3, this.d), Ce(e4, t3.a, i3), Be(e4, n2) > 0) return false;
          }
        }
        return true;
      }
      ak(t3) {
        if (this.F.length = 0, 0 == this.p.length && null != this.I) return;
        We(this.f, t3), mr(pr(), t3), this.al(null, t3);
        let e3 = 0;
        for (let t4 = 0; t4 < this.p.length; t4++) {
          let i2 = this.p[t4], r2 = new Sn();
          if (this.an(i2, r2) && (131072 & this.c.b && (this.ap(i2, r2), e3++), 262144 & this.c.b && (this.aq(i2, r2), e3++)), e3 >= 1e3) break;
        }
        this.E = e3;
      }
      al(t3, e3) {
        var i2, r2, n2;
        16 & this.c.b ? Ye(this.g, e3, this.d) : null != t3 ? Ye(this.g, e3, t3) : Ge(this.g, e3), ii(this.h, e3), 4096 & this.c.b && (mr(this.i, this.g), 16 & this.c.b && Math.abs(this.k) > 0 && (i2 = this.i, r2 = this.i, n2 = 1 / this.k, i2[0] = r2[0] * n2, i2[1] = r2[1] * n2, i2[2] = r2[2] * n2, i2[3] = r2[3] * n2, i2[4] = r2[4] * n2, i2[5] = r2[5] * n2, i2[6] = r2[6] * n2, i2[7] = r2[7] * n2, i2[8] = r2[8] * n2), Ae(this.j, this.i[6], this.i[7], this.i[8]), De(this.j) <= 23841858e-14 ? Ae(this.j, 0, 0, 1) : Ue(this.j, this.j));
      }
      am(t3) {
        let e3 = 0, i2 = 0;
        if (0 != this.c.K || 0 != this.c.N) {
          let r2 = new pn(t3.e);
          e3 = 0 == this.c.L ? this.c.K : this.c.K + r2.e() * this.c.L, i2 = 0 == this.c.N ? this.c.M : this.c.M + r2.e() * this.c.N;
        } else e3 = this.c.K, i2 = this.c.M;
        return { deltaSpin: i2, baseSpin: e3 };
      }
      an(t3, e3) {
        let i2 = this.c.G, r2 = this.c.H, n2 = r2[0], a2 = r2[1] - n2, s2 = 0, o2 = t3.e, l2 = t3.b;
        if ((i2 < 1 || 0 != a2) && (s2 = 127 & l2 * this.c.F + o2), i2 < An[s2]) return 0;
        this.ao(t3, e3, o2);
        let h2 = a2 * An[s2] + n2;
        _r(e3.c.a, e3.c.a, h2), 32 & this.c.b && _r(e3.c.a, e3.c.a, this.k);
        let u2 = er(t3.a[0], t3.a[1], t3.a[2], 1);
        return lr(u2, u2, this.g), ye(e3.a, u2), e3.b = 1, 1;
      }
      ao(t3, e3, i2) {
        let r2 = t3.b / this.I.f(), n2 = new pn(i2);
        Math.min(r2, 1) <= 0 ? r2 = 0 : r2 >= 1 && (r2 = 1);
        let a2 = we(255, 255, 255), s2 = dr(1, 1), o2 = 1, l2 = e3.c;
        this.c.y.i(r2, a2, l2.b, this.H), this.H || Fe(l2.b, l2.b, 1 / 255), this.c.A.i(r2, s2, l2.a), l2.e = this.c.z.i(r2, 1) / 32767;
        let h2 = 0;
        this.c.C.a.length > 0 ? (o2 = 0, l2.c = this.c.C.i(r2, o2), l2.c = this.y & l2.c + this.z) : 65536 & this.c.b ? (h2 = (this.y + 1) * n2.d(), l2.c = h2 / 4294967296 | 0) : l2.c = 0, o2 = 0, l2.d = this.c.D.i(r2, o2), l2.d = l2.d + this.z & this.y;
        let u2 = 1;
        524288 & this.c.b ? (u2 = Math.max(1 + n2.e() * this.c.B[1], 99999997e-12), l2.a[0] = Math.max(1 + n2.e() * this.c.B[0], 99999997e-12) * l2.a[0]) : (u2 = Math.max(1 + n2.e() * this.c.B[0], 99999997e-12), l2.a[0] = u2 * l2.a[0]), l2.a[1] = u2 * l2.a[1];
      }
      ap(t3, e3) {
        let i2 = dr((e3.c.c & this.B) * this.C, (e3.c.c >> this.A) * this.D), r2 = 0, n2 = 0, a2 = this.am(t3);
        r2 = a2.baseSpin, n2 = a2.deltaSpin;
        let s2 = 0, o2 = we(0, 0, 0), l2 = we(0, 0, 0), h2 = false, u2 = false;
        if (4 & this.c.b && De(t3.c) > 23841858e-14) if (s2 = 1, 4096 & this.c.b) h2 = true;
        else {
          let i3 = er(-t3.c[0], -t3.c[1], -t3.c[2], 0);
          lr(i3, i3, this.g);
          let r3 = ve();
          ye(r3, i3);
          let n3 = 0, a3 = De(r3);
          n3 = a3 <= 23841858e-14 ? 0 : 1 / Math.sqrt(a3);
          let s3 = ve();
          ye(s3, r3), Fe(s3, s3, n3), ye(o2, s3), Fe(o2, o2, e3.c.a[0]), l2 = we(s3[1], -s3[0], 0), Fe(l2, l2, e3.c.a[1]), u2 = true, h2 = false;
        }
        if ((4096 & this.c.b || h2) && !u2) {
          let i3 = pr();
          c2 = i3, f2 = this.i, c2[0] = f2[0], c2[1] = f2[1], c2[2] = f2[2], c2[3] = f2[3], c2[4] = f2[4], c2[5] = f2[5], c2[6] = f2[6], c2[7] = f2[7], c2[8] = f2[8];
          let a3 = e3.c.a[0];
          if (s2) {
            let r3 = 0, n3 = we(-t3.c[0], -t3.c[1], -t3.c[2]), s3 = De(n3);
            r3 = s3 <= 23841858e-14 ? 0 : 1 / Math.sqrt(s3), vr(i3, this.i, (function(t4, e4, i4, r4, n4, a4, s4, o3, l3) {
              var h3 = new me(9);
              return h3[0] = t4, h3[1] = e4, h3[2] = i4, h3[3] = r4, h3[4] = n4, h3[5] = a4, h3[6] = s4, h3[7] = o3, h3[8] = l3, h3;
            })(n3[0] * r3, n3[1] * r3, 0, -n3[1] * r3, n3[0] * r3, 0, 0, 0, 1)), r3 > 23841858e-14 && (a3 = e3.c.a[0] * (1 / Math.sqrt(De(t3.c)) / r3));
          }
          if (this.r, Ae(o2, i3[0], i3[1], i3[2]), Fe(o2, o2, a3), Ae(l2, i3[3], i3[4], i3[5]), Fe(l2, l2, e3.c.a[1]), n2 = l2[0], u2 = true, 0 != this.c.M || 0 != this.c.N) {
            let e4 = r2 + n2 * t3.b;
            512 & this.c.b && 1 & t3.e && (e4 = -e4);
            let i4 = ve();
            ye(i4, this.j), this.r;
            let a4 = pr(), s3 = xr();
            Tr(s3, i4, e4), (function(t4, e5) {
              var i5 = e5[0], r3 = e5[1], n3 = e5[2], a5 = e5[3], s4 = i5 + i5, o3 = r3 + r3, l3 = n3 + n3, h3 = i5 * s4, u3 = r3 * s4, c3 = r3 * o3, f3 = n3 * s4, d2 = n3 * o3, b2 = n3 * l3, g2 = a5 * s4, _2 = a5 * o3, p2 = a5 * l3;
              t4[0] = 1 - c3 - b2, t4[3] = u3 - p2, t4[6] = f3 + _2, t4[1] = u3 + p2, t4[4] = 1 - h3 - b2, t4[7] = d2 - g2, t4[2] = f3 - _2, t4[5] = d2 + g2, t4[8] = 1 - h3 - c3;
            })(a4, s3), Ne(o2, o2, a4), Ae(l2, n2, l2[1], l2[2]), Ne(l2, l2, a4);
          }
        }
        var c2, f2;
        if (!u2) if (0 != this.c.M || 0 != this.c.N) {
          let i3 = r2 + n2 * t3.b;
          512 & this.c.b && 1 & t3.e && (i3 = -i3);
          let a3 = Math.cos(i3), s3 = Math.sin(i3);
          Ae(o2, a3, s3, 0), Fe(o2, o2, e3.c.a[0]), Ae(l2, -s3, a3, 0), Fe(l2, l2, e3.c.a[1]), 134217728 & this.c.b && Ee(e3.a, e3.a, we(l2[0], l2[1], 0));
        } else Ae(o2, e3.c.a[0], 0, 0), Ae(l2, 0, e3.c.a[1], 0);
        return this.ar(o2, l2, e3.a, e3.c.b, e3.c.e, i2[0], i2[1], t3.f), 0;
      }
      aq(t3, e3) {
        let i2 = dr((e3.c.d & this.B) * this.C, (e3.c.d >> this.A) * this.D), r2 = we(0, 0, 0), n2 = we(0, 0, 0), a2 = this.c.E;
        1024 & this.c.b && (a2 = Math.min(t3.b, a2));
        let s2 = Qi();
        Fe(s2, t3.c, -1), s2[3] = 0, lr(s2, s2, this.g), Fe(s2, s2, a2);
        let o2 = we(s2[0], s2[1], 0);
        if (Be(o2, o2) > 1e-4) {
          let t4 = 1 / Te(o2);
          _r(e3.c.a, e3.c.a, t4), gr(o2, o2, e3.c.a), n2 = we(-o2[1], o2[0], 0), Fe(r2, s2, 0.5), Ee(e3.a, e3.a, r2);
        } else r2 = we(0.05 * e3.c.a[0], 0, 0), n2 = we(0, 0.05 * e3.c.a[1], 0);
        return this.ar(r2, n2, e3.a, e3.c.b, e3.c.e, i2[0], i2[1], t3.f), 1;
      }
      ar(t3, e3, i2, r2, n2, a2, s2, o2) {
        const l2 = [-1, -1, 1, 1], h2 = [1, -1, 1, -1], u2 = [0, 0, 1, 1], c2 = [0, 1, 0, 1];
        let f2 = ve(), d2 = fr(), b2 = fr(), g2 = fr();
        for (let _2 = 0; _2 < 4; _2++) Ae(f2, 0, 0, 0), Re(f2, f2, t3, l2[_2]), Re(f2, f2, e3, h2[_2]), Ee(f2, f2, i2), br(d2, u2[_2] * this.C + a2, c2[_2] * this.D + s2), br(b2, u2[_2] * this.c.Y[0] + o2[0][0], c2[_2] * this.c.Y[0] + o2[0][1]), br(g2, u2[_2] * this.c.Y[1] + o2[1][0], c2[_2] * this.c.Y[1] + o2[1][1]), this.F.push(f2[0]), this.F.push(f2[1]), this.F.push(f2[2]), this.F.push(r2[0]), this.F.push(r2[1]), this.F.push(r2[2]), this.F.push(n2), this.F.push(d2[0]), this.F.push(d2[1]), this.F.push(b2[0]), this.F.push(b2[1]), this.F.push(g2[0]), this.F.push(g2[1]);
      }
    };
    const Fn = class {
      constructor(t3) {
        this.a = t3.getFloat();
      }
    };
    const Rn = class {
      constructor(t3) {
        this.buffer = new DataView(t3), this.position = 0;
      }
      getBool() {
        var t3 = 0 != this.buffer.getUint8(this.position);
        return this.position += 1, t3;
      }
      getUint8() {
        var t3 = this.buffer.getUint8(this.position);
        return this.position += 1, t3;
      }
      getInt8() {
        var t3 = this.buffer.getInt8(this.position);
        return this.position += 1, t3;
      }
      getUint16() {
        var t3 = this.buffer.getUint16(this.position, true);
        return this.position += 2, t3;
      }
      getInt16() {
        var t3 = this.buffer.getInt16(this.position, true);
        return this.position += 2, t3;
      }
      getUint32() {
        var t3 = this.buffer.getUint32(this.position, true);
        return this.position += 4, t3;
      }
      getInt32() {
        var t3 = this.buffer.getInt32(this.position, true);
        return this.position += 4, t3;
      }
      getFloat() {
        var t3 = this.buffer.getFloat32(this.position, true);
        return this.position += 4, t3;
      }
      getString(t3) {
        void 0 === t3 && (t3 = this.getUint16());
        for (var e3 = "", i2 = 0; i2 < t3; ++i2) e3 += String.fromCharCode(this.getUint8());
        return e3;
      }
      setBool(t3) {
        this.buffer.setUint8(this.position, t3 ? 1 : 0), this.position += 1;
      }
      setUint8(t3) {
        this.buffer.setUint8(this.position, t3), this.position += 1;
      }
      setInt8(t3) {
        this.buffer.setInt8(this.position, t3), this.position += 1;
      }
      setUint16(t3) {
        this.buffer.setUint16(this.position, t3, true), this.position += 2;
      }
      setInt16(t3) {
        this.buffer.setInt16(this.position, t3, true), this.position += 2;
      }
      setUint32(t3) {
        this.buffer.setUint32(this.position, t3, true), this.position += 4;
      }
      setInt32(t3) {
        this.buffer.setInt32(this.position, t3, true), this.position += 4;
      }
      setFloat(t3) {
        this.buffer.setFloat32(this.position, t3, true), this.position += 4;
      }
    };
    class Dn {
      constructor() {
        this.a = ve(), this.b = Qi(), this.c = fr();
      }
    }
    class In {
    }
    const Un = [0, 1, 2, 10, 3, 4, 5, 13];
    function Bn(t3, e3) {
      return we(t3[4 * e3 + 0], t3[4 * e3 + 1], t3[4 * e3 + 2]);
    }
    class Pn {
    }
    const zn = class {
      constructor(t3, e3) {
        this.g = ve(), this.h = ve(), this.p = new In(), this.q = ve(), this.r = ve(), this.s = ve(), this.t = ve(), this.u = ve(), this.v = ve(), this.w = ve(), this.x = ve(), this.y = ve(), this.z = ve(), this.A = ve(), this.B = ve(), this.O = ve(), this.V = t3.aS.context, this.a = t3;
        let i2 = new Pn();
        var r2;
        if (i2.a = e3.getInt32(), i2.b = e3.getInt32(), i2.c = we(e3.getFloat(), e3.getFloat(), e3.getFloat()), (r2 = e3.getInt32()) > 0) {
          i2.j = new Array(r2);
          for (let t4 = 0; t4 < r2; ++t4) i2.j[t4] = e3.getInt16();
        }
        if ((r2 = e3.getInt32()) > 0) {
          i2.k = new Array(r2);
          for (let t4 = 0; t4 < r2; ++t4) i2.k[t4] = e3.getInt16();
        }
        i2.l = new Gr(e3, Br), i2.m = new Gr(e3, zr), i2.n = new Gr(e3, Or), i2.o = new Gr(e3, Or), i2.d = e3.getFloat(), i2.e = e3.getFloat(), i2.f = e3.getFloat(), i2.g = e3.getInt16(), i2.h = e3.getInt16(), i2.p = new Gr(e3, zr), i2.q = new Gr(e3, Nr), i2.r = e3.getInt16(), this.U = i2, this.ab = new Array(i2.k.length), this.ae = new Array(i2.k.length);
        for (let e4 = 0; e4 < i2.k.length; e4++) this.ae[e4] = t3.av[i2.k[e4]];
        let n2 = er(255, 255, 255, 255), a2 = new In();
        a2.a = 0, a2.b = 0, a2.c = 1, a2.d = 1, this.au(i2.d, i2.e, n2, a2, i2.h, i2.g), this.ag(i2.f), this.af(false);
      }
      af(t3) {
        this.L = t3, this.L || (this.J = false);
      }
      ag(t3) {
        this.S = t3;
      }
      ah() {
        return this.e == this.d;
      }
      ai(t3) {
        this.R = t3;
      }
      aj(t3) {
        this.Q = t3;
      }
      ak(t3) {
        this.F[3] = Math.max(t3, 0);
      }
      al() {
        let t3 = ve();
        He(t3, this.g, this.O);
        let e3 = De(t3);
        Fe(t3, this.q, this.R), Ce(this.w, this.g, t3), Fe(t3, this.r, this.R), Ce(this.x, this.O, t3), Fe(t3, this.q, this.Q), Ee(this.y, this.g, t3), Fe(t3, this.r, this.Q), Ee(this.z, this.O, t3), Fe(this.u, this.s, e3), Fe(this.v, this.t, e3);
      }
      am(t3, e3, i2) {
        let r2;
        if (this.M && this.L) {
          r2 = t3;
          let i3 = ve();
          ii(i3, r2), Ee(i3, i3, e3), ye(this.h, e3), this.J ? (ye(this.g, this.O), ye(this.s, this.t), ye(this.q, this.r)) : (ye(this.g, i3), this.s = Bn(r2, 2), this.q = Bn(r2, 1), this.f = 0, this.J = true), this.O = i3, this.t = Bn(r2, 2), this.r = Bn(r2, 1);
        }
      }
      an(t3) {
        var e3 = pr();
        mr(e3, t3), this.s = Ne(this.s, this.s, e3), this.q = Ne(this.q, this.q, e3), this.t = Ne(this.t, this.t, e3), this.r = Ne(this.r, this.r, e3), this.g = Oe(this.g, this.g, t3), this.O = Oe(this.O, this.O, t3);
        for (var i2 = 0; i2 < this.i.length; i2++) Oe(this.i[i2].a, this.i[i2].a, t3);
      }
      ao(t3, e3, i2) {
        this.F[2] = i2, this.F[1] = e3, this.F[0] = t3;
      }
      ap(t3) {
        if (this.P != t3) {
          this.P = t3;
          let e3 = t3 % this.I, i2 = e3;
          0 != (2147483648 & e3) && (i2 = (1 & e3 | e3 >> 1) + (1 & e3 | e3 >> 1));
          let r2 = i2 * this.l + this.G.b;
          this.p.b = r2;
          let n2 = t3 / this.I, a2 = n2;
          0 != (2147483648 & n2) && (n2 = 1 & n2 | n2 >> 1, a2 = n2 + n2, r2 = this.p.b);
          let s2 = a2 * this.m + this.G.a;
          this.p.a = s2, this.p.d = r2 + this.l, this.p.c = s2 + this.m;
        }
      }
      aq(t3, e3, i2) {
        let r2, n2 = this.i[2 * this.d], a2 = this.i[2 * this.d + 1], s2 = ve();
        Fe(s2, this.v, 1 - e3), Ce(s2, this.x, s2), Fe(n2.a, s2, e3), Fe(s2, this.u, e3), Ee(s2, this.w, s2), Fe(s2, s2, 1 - e3), Ee(n2.a, n2.a, s2), Fe(s2, this.v, 1 - e3), Ce(s2, this.z, s2), Fe(a2.a, s2, e3), Fe(s2, this.u, e3), Ee(s2, this.y, s2), Fe(s2, s2, 1 - e3), Ee(a2.a, a2.a, s2), this.c[this.d] = t3, r2 = i2, this.d = this.d + r2, this.d >= this.c.length && (this.d -= this.c.length);
      }
      ar(t3, e3) {
        if (this.a.S) return;
        let i2 = ve(), r2 = 1;
        i2 = this.U.l.d(t3, this.a.aX, i2), r2 = this.U.m.d(t3, this.a.aX), this.ao(i2[0], i2[1], i2[2]), this.ak(r2 / 32767);
        let n2 = this.U.n.d(t3, this.a.aX);
        this.aj(n2);
        let a2 = this.U.o.d(t3, this.a.aX);
        this.ai(a2);
        let s2 = this.U.p.d(t3, this.a.aX);
        this.ap(s2);
        let o2 = this.U.q.d(t3, this.a.aX, 1);
        this.af(0 != o2);
        let l2 = je();
        ai(l2, this.a.U, this.a.ap[this.U.b].m), Ze(l2, l2, this.U.c);
        let h2 = ve();
        this.am(l2, h2, null), this.as(e3, false);
      }
      as(t3, e3) {
        let i2, r2, n2, a2, s2, o2, l2, h2, u2, c2, f2, d2, b2, g2, _2, p2, m2, v2, x2, T2, w2, y2, A2, E2, C2, S2, M2, k2, F2, R2, D2, I2, U2, B2, P2, z2, O2, N2, L2, H2, V2, j2, G2, X2, q2, W2, Y2, Z2;
        for (this.N || this.C > 0 && (t3 = 1 / this.C + 99999997e-12), t3 >= 0 ? this.D <= t3 && (t3 = this.D) : t3 = 0, v2 = this.e; v2 != this.d && !(t3 + this.c[v2] <= this.D); v2 = this.e) this.e = this.at(this.e, 1);
        if (!e3 && this.M && this.L && this.J) {
          D2 = t3 * this.C + this.f, Z2 = this.F, this.al();
          let e4 = false;
          if (B2 = 0, D2 < 1 ? e4 = true : (Y2 = this.f, U2 = 1 / (D2 - Y2), m2 = Math.floor(D2 - 1), B2 = Math.ceil(Math.max(m2, 0))), -1 == B2 || e4) ;
          else for (I2 = 1, v2 = 1; R2 = this.d, N2 = this.i.length, this.i[2 * R2].b = Z2, x2 = 2 * this.d + 1, L2 = this.i.length, this.i[x2].b = Z2, this.aq((v2 - Y2) * U2 * -t3, (v2 - Y2) * U2, 1), -1 != --B2; v2 = I2) I2 += 1, Y2 = this.f;
          T2 = Math.floor(D2), this.f = D2 - T2, this.aq(0, 1, 0), F2 = this.d, H2 = this.i.length, w2 = this.i[2 * F2], y2 = this.p.b, w2.c[1] = this.p.a, w2.c[0] = y2, A2 = 2 * this.d + 1, V2 = this.i.length, E2 = this.i[A2], C2 = this.p.b, E2.c[1] = this.p.c, E2.c[0] = C2, k2 = this.d, j2 = this.i.length, this.i[2 * k2].b = Z2, S2 = 2 * this.d + 1, G2 = this.i.length, this.i[S2].b = Z2;
        }
        this.A[2] = 34028235e31, this.A[1] = 34028235e31, this.A[0] = 34028235e31, this.B[2] = -34028235e31, this.B[1] = -34028235e31, this.B[0] = -34028235e31, P2 = this.e;
        for (let e4 = this.e; e4 != this.d; P2 = e4) p2 = 2 * e4, W2 = this.i.length, M2 = P2, O2 = this.i[2 * e4], i2 = p2 + 1, r2 = this.i[2 * e4 + 1], n2 = (this.S + this.S) * this.c[M2] * t3 + t3 * this.S * t3, O2.a[2] = O2.a[2] + n2, r2.a[2] = n2 + r2.a[2], a2 = O2.a[0], s2 = this.A[0], s2 > O2.a[0] && (s2 = O2.a[0], this.A[0] = a2, a2 = O2.a[0]), o2 = O2.a[1], l2 = this.A[1], l2 > o2 && (l2 = O2.a[1], this.A[1] = o2, o2 = O2.a[1]), h2 = O2.a[2], u2 = this.A[2], u2 > h2 && (u2 = O2.a[2], this.A[2] = h2, h2 = O2.a[2]), a2 > this.B[0] && (this.B[0] = a2), o2 > this.B[1] && (this.B[1] = o2), h2 > this.B[2] && (this.B[2] = h2), c2 = r2.a[0], s2 > r2.a[0] && (this.A[0] = c2, c2 = r2.a[0]), f2 = r2.a[1], l2 > f2 && (this.A[1] = f2, f2 = r2.a[1]), d2 = r2.a[2], u2 > d2 && (this.A[2] = d2, d2 = r2.a[2]), c2 > this.B[0] && (this.B[0] = c2), f2 > this.B[1] && (this.B[1] = f2), d2 > this.B[2] && (this.B[2] = d2), X2 = this.c.length, this.c[M2] = t3 + this.c[M2], b2 = this.l, q2 = this.c.length, g2 = b2 * this.c[M2] * this.k + this.p.b, O2.c[1] = this.p.a, O2.c[0] = g2, r2.c[1] = this.p.c, r2.c[0] = g2, _2 = this.c.length, z2 = P2 + 1, e4 = z2 - _2, _2 > z2 && (e4 = z2);
        this.N = true;
      }
      at(t3, e3) {
        let i2 = e3 + t3;
        t3 = i2;
        let r2 = this.c.length;
        return i2 >= r2 && (t3 = i2 - r2), t3;
      }
      au(t3, e3, i2, r2, n2, a2) {
        let s2, o2, l2, h2, u2, c2, f2, d2;
        f2 = Math.ceil(t3), d2 = Math.max(0.25, e3), s2 = Math.ceil(d2 * f2), o2 = Math.ceil(Math.max(s2 + 1 + 1, 0)), this.c = new Array(o2), this.e = 0, this.d = 0, this.f = 0, this.J = false, this.i = new Array(2 * o2);
        for (let t4 = 0; t4 < this.i.length; t4++) {
          this.i[t4] = new Dn();
          let e4 = this.i[t4];
          e4.a[0] = 0, e4.a[1] = 0, e4.a[2] = 0, e4.b = er(0, 0, 0, 0), e4.c[0] = 0, e4.c[1] = 0;
        }
        this.j = new Array(4 * o2);
        for (let t4 = 0; t4 < this.j.length; t4++) this.j[t4] = t4 % (2 * o2);
        this.k = 1 / d2, l2 = a2, 0 != (2147483648 & a2) && (l2 = (1 & a2 | a2 >> 1) + (1 & a2 | a2 >> 1)), this.l = (r2.d - r2.b) / l2, h2 = n2, 0 != (2147483648 & n2) && (h2 = (1 & n2 | n2 >> 1) + (1 & n2 | n2 >> 1)), this.m = (r2.c - r2.a) / h2, this.n = 1 / this.l, this.o = 1 / this.m, this.C = f2, this.D = d2, ar(i2, i2, 1 / 255), this.F = i2, this.G = r2, this.H = n2, this.I = a2, this.P = 0, u2 = 0 * this.l + this.G.b, this.p.b = u2, c2 = 0 * this.m + this.G.a, this.p.a = c2, this.p.d = u2 + this.l, this.p.c = c2 + this.m, this.Q = 10, this.R = 10, this.S = 0, this.M = true, this.L = true, this.K = true;
      }
      av() {
        let t3 = new Array(this.i.length);
        for (let e4 = 0, i2 = 0; e4 < this.i.length; ++e4) t3[i2++] = this.i[e4].a[0], t3[i2++] = this.i[e4].a[1], t3[i2++] = this.i[e4].a[2], t3[i2++] = this.i[e4].b[0], t3[i2++] = this.i[e4].b[1], t3[i2++] = this.i[e4].b[2], t3[i2++] = this.i[e4].b[3], t3[i2++] = this.i[e4].c[0], t3[i2++] = this.i[e4].c[1];
        if (this.ah()) return;
        let e3 = this.V;
        this.W ? (e3.bindBuffer(e3.ARRAY_BUFFER, this.W), e3.bufferData(e3.ARRAY_BUFFER, new Float32Array(t3), e3.DYNAMIC_DRAW)) : (this.W = e3.createBuffer(), e3.bindBuffer(e3.ARRAY_BUFFER, this.W), e3.bufferData(e3.ARRAY_BUFFER, new Float32Array(t3), e3.DYNAMIC_DRAW)), this.X ? (e3.bindBuffer(e3.ELEMENT_ARRAY_BUFFER, this.X), e3.bufferData(e3.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.j), e3.DYNAMIC_DRAW)) : (this.X = e3.createBuffer(), e3.bindBuffer(e3.ELEMENT_ARRAY_BUFFER, this.X), e3.bufferData(e3.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.j), e3.DYNAMIC_DRAW));
      }
      aw(t3) {
        if (this.ah()) return;
        let e3 = this.V;
        for (let r2 = 0; r2 < this.U.j.length; r2++) {
          if (!this.ab[r2]) {
            let t4 = new en();
            t4.a = se(e3, ["        attribute vec3 aPosition;\n        attribute vec4 aColor;\n        attribute vec2 aTexcoord0;\n        uniform mat4 uViewMatrix;\n        uniform mat4 uProjMatrix;\n        varying vec4 vColor;\n        varying vec2 vTexcoord0;\n        void main() {\n            vec4 aPositionVec4 = vec4(aPosition, 1);\n            vColor = aColor;\n            vTexcoord0 = aTexcoord0;\n            gl_Position = uProjMatrix * uViewMatrix * aPositionVec4;\n        }", "    precision mediump float;    varying vec4 vColor;\n    varying vec2 vTexcoord0;\n    uniform sampler2D uTexture;\n    void main() {\n        vec4 tex = texture2D(uTexture, vTexcoord0).rgba;\n        gl_FragColor = vec4((vColor.rgb*tex.rgb), tex.a * vColor.a );\n    }"], null, null), t4.b = {}, t4.a.attributes = [{
              loc: e3.getAttribLocation(t4.a.program, "aPosition"),
              type: e3.FLOAT,
              size: 3,
              offset: 0,
              stride: 36
            }, {
              loc: e3.getAttribLocation(t4.a.program, "aColor"),
              type: e3.FLOAT,
              size: 4,
              offset: 12,
              stride: 36
            }, {
              loc: e3.getAttribLocation(t4.a.program, "aTexcoord0"),
              type: e3.FLOAT,
              size: 2,
              offset: 28,
              stride: 36
            }], t4.c = this.W, t4.d = this.X, this.ab[r2] = t4;
          }
          var i2 = this.U.j[r2];
          if (i2 <= -1 || i2 > this.a.aw.length) continue;
          let n2 = this.a.aw[i2];
          if (!n2.f || !n2.f.f) continue;
          let a2 = r2;
          a2 >= this.U.k.length && (a2 = 0);
          let s2 = this.a.av[this.U.k[a2]];
          this.ab[r2].b.uViewMatrix = this.a.aS.viewMatrix, this.ab[r2].b.uProjMatrix = this.a.aS.projMatrix, this.ab[r2].b.uTexture = n2.f.d, this.ab[r2].h = false, this.ab[r2].f = false, this.ab[r2].e = Un[s2.b], this.ab[r2].i = !this.a.aY;
          let o2 = this.d > this.e ? 2 * (this.d - this.e) + 2 : 2 * (this.c.length + this.d - this.e) + 2;
          this.ab[r2].j = e3.TRIANGLE_STRIP, this.ab[r2].k = o2, this.ab[r2].l = 2 * this.e * 2, t3.push(this.ab[r2]);
        }
      }
    }, On = "uniform float x;\r\nuniform float y;\r\nuniform float width;\r\nuniform float height;\r\n\r\nattribute vec2 aTextCoord;\r\nvarying vec2 vTextCoords;\r\nvoid main() {\r\n    vTextCoords = aTextCoord;\r\n\r\n    vec2 pos = vec2(\r\n        (x + aTextCoord.x*width)* 2.0 - 1.0,\r\n        (y + aTextCoord.y*height)* 2.0 - 1.0\r\n    );\r\n\r\n    gl_Position = vec4(pos.x, pos.y, 0, 1);\r\n}";
    class Nn {
      constructor() {
        this.a = null, this.b = null, this.c = null;
      }
      d() {
        null != this.a && this.a.h(), null != this.b && this.b.h(), null != this.c && this.c.h();
      }
      e() {
        return !(this.a && !this.a.g()) && (!(this.b && !this.b.g()) && !(this.c && !this.c.g()));
      }
    }
    class Ln {
      constructor() {
        this.a = null, this.b = null, this.c = null, this.d = {}, this.i = new be();
      }
    }
    let Hn = null, Vn = null, jn = null;
    class Gn {
      constructor(t3, e3, i2) {
        this.h = false, this.e = t3, this.f = e3, this.g = i2, (function(t4) {
          Vn = t4.createTexture(), t4.bindTexture(t4.TEXTURE_2D, Vn), t4.texImage2D(t4.TEXTURE_2D, 0, t4.RGBA, 1, 1, 0, t4.RGBA, t4.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0])), t4.bindTexture(t4.TEXTURE_2D, null), jn = t4.createTexture(), t4.bindTexture(t4.TEXTURE_2D, jn), t4.texImage2D(t4.TEXTURE_2D, 0, t4.RGBA, 1, 1, 0, t4.RGBA, t4.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])), t4.bindTexture(t4.TEXTURE_2D, null), Hn = new Ln();
          let e4 = Hn;
          e4.a = se(t4, [On, "precision mediump float;\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\nuniform int layer;\r\nuniform vec2 screenResolution;\r\n\r\nfloat overlayBlend(float a, float b) {\r\n    if (b <= 0.5) {\r\n        return 2.0 * a * b;\r\n    } else {\r\n        return 1.0 - ((2.0 * (1.0 - a) * (1.0 - b)));\r\n//        return (1.0 - (1.0 - 2.0 * (a - 0.5)) * (1.0 - b));\r\n    }\r\n}\r\n\r\nfloat alphaStraightBlend(float a, float b, float alpha) {\r\n    return (a * alpha) + (b * (1.0 - alpha));\r\n}\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    //Blit and Inferior Alpha\r\n    if (uBlendMode == 0 || uBlendMode == 4) {\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec3 finalColor = mix(backGround.rgb, diffuse.rgb, diffuse.a);\r\n\r\n        diffuse  = vec4(finalColor.rgb, 1.0);\r\n    } else\r\n    if (uBlendMode == 1) {\r\n        // Multiply blending //\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 multTexture = diffuse;\r\n        vec3 finalColor = (diffuse.rgb * backGround.rgb);\r\n\r\n        diffuse  = vec4(finalColor.rgb, 1.0);\r\n    }  else if (uBlendMode == 2) {\r\n        // Overlay Blending //\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 overlayTex = diffuse;\r\n\r\n        vec3 finalColor = vec3(\r\n            overlayBlend(overlayTex.r, backGround.r),\r\n            overlayBlend(overlayTex.g, backGround.g),\r\n            overlayBlend(overlayTex.b, backGround.b)\r\n        );\r\n\r\n        diffuse = vec4(finalColor, 1.0);\r\n//        diffuse  = vec4(finalColor.rgb, overlayTex.a);\r\n    } else if (uBlendMode == 3) {\r\n//        if (diffuse.a > 0.5) discard;\r\n        // Alpha Straight //\r\n        vec4 overlayTex = diffuse;\r\n\r\n        float alphaMult = 1.0;\r\n        vec3 finalColor = vec3(\r\n            alphaStraightBlend(overlayTex.r, backGround.r, alphaMult*overlayTex.a),\r\n            alphaStraightBlend(overlayTex.g, backGround.g, alphaMult*overlayTex.a),\r\n            alphaStraightBlend(overlayTex.b, backGround.b, alphaMult*overlayTex.a)\r\n        );\r\n\r\n        diffuse  = vec4(finalColor.rgb, 1.0);\r\n//        diffuse  = vec4(1.0,1.0,1.0, 1.0-overlayTex.a);\r\n    }\r\n\r\n    gl_FragColor = diffuse;\r\n}"], null, null), e4.b = se(t4, [On, "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 specular = texture2D( uSpecularTexture, vTextCoords.xy );\r\n    if (diffuse.a < 0.001) discard;\r\n    gl_FragColor = vec4(specular.rgb, 1.0);\r\n}"], null, null), e4.c = se(t4, [On, "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform vec2 screenResolution;\r\nuniform int uBlendMode;\r\nuniform float emissiveAlphaOverride;\r\nuniform int layer;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 emissive = texture2D( uEmissiveTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    if (diffuse.a < 0.001) discard;\r\n//    if (emissive.a < 0.001) discard;\r\n\r\n    //TODO: This is a hack from what was obeserved in Nightbourn texture customization with tatoos.\r\n    //TODO: But Maybe switch should be over layer or something else instead of blend\r\n    float alpha = 1.0;\r\n\r\n    if (emissiveAlphaOverride > -1.0) {\r\n        alpha = emissiveAlphaOverride;\r\n    } else if (layer <= 1) {\r\n        alpha = 0.0;\r\n    } else {\r\n        alpha = emissive.a;\r\n    }\r\n\r\n\r\n    gl_FragColor = vec4(emissive.rgb, alpha);\r\n}"], null, null), e4.d = {}, e4.f = t4.createBuffer(), t4.bindBuffer(t4.ARRAY_BUFFER, e4.f), t4.bufferData(t4.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t4.STATIC_DRAW), t4.bindBuffer(t4.ARRAY_BUFFER, null), e4.e = t4.createBuffer(), t4.bindBuffer(t4.ELEMENT_ARRAY_BUFFER, e4.e), t4.bufferData(t4.ELEMENT_ARRAY_BUFFER, new Int16Array([0, 1, 2, 1, 3, 2]), t4.STATIC_DRAW), t4.bindBuffer(t4.ELEMENT_ARRAY_BUFFER, null), e4.g = t4.createFramebuffer(), e4.h = {
            loc: t4.getAttribLocation(e4.a.program, "aTextCoord"),
            type: t4.FLOAT,
            size: 2,
            offset: 0,
            stride: 0
          };
        })(t3);
      }
      i() {
        let t3 = this.e;
        this.d && t3.deleteTexture(this.d), this.a && t3.deleteTexture(this.a), this.b && t3.deleteTexture(this.b), this.c && t3.deleteTexture(this.c), this.d = t3.createTexture(), t3.bindTexture(t3.TEXTURE_2D, this.d), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.f, this.g, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.texParameteri(t3.TEXTURE_2D, t3.TEXTURE_MIN_FILTER, t3.LINEAR), this.a = t3.createTexture(), t3.bindTexture(t3.TEXTURE_2D, this.a), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.f, this.g, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.texParameteri(t3.TEXTURE_2D, t3.TEXTURE_MIN_FILTER, t3.LINEAR), this.b = t3.createTexture(), t3.bindTexture(t3.TEXTURE_2D, this.b), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.f, this.g, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.texParameteri(t3.TEXTURE_2D, t3.TEXTURE_MIN_FILTER, t3.LINEAR), this.c = t3.createTexture(), t3.bindTexture(t3.TEXTURE_2D, this.c), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.f, this.g, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.texParameteri(t3.TEXTURE_2D, t3.TEXTURE_MIN_FILTER, t3.LINEAR), t3.bindTexture(t3.TEXTURE_2D, null), t3.bindFramebuffer(t3.FRAMEBUFFER, Hn.g), t3.framebufferTexture2D(t3.FRAMEBUFFER, t3.COLOR_ATTACHMENT0, t3.TEXTURE_2D, this.a, 0), t3.clear(t3.COLOR_BUFFER_BIT | t3.DEPTH_BUFFER_BIT), t3.framebufferTexture2D(t3.FRAMEBUFFER, t3.COLOR_ATTACHMENT0, t3.TEXTURE_2D, this.b, 0), t3.clear(t3.COLOR_BUFFER_BIT | t3.DEPTH_BUFFER_BIT), t3.framebufferTexture2D(t3.FRAMEBUFFER, t3.COLOR_ATTACHMENT0, t3.TEXTURE_2D, this.c, 0), t3.clear(t3.COLOR_BUFFER_BIT | t3.DEPTH_BUFFER_BIT), t3.useProgram(Hn.b.program), t3.bindBuffer(t3.ARRAY_BUFFER, Hn.f), t3.bindBuffer(t3.ELEMENT_ARRAY_BUFFER, Hn.e), Hn.i.disableAll(), Hn.i.enable(t3, [Hn.h]), t3.viewport(0, 0, this.f, this.g);
      }
      j(t3, e3, i2, r2, n2, a2, s2, o2) {
        let l2 = this.e;
        Hn.d.x = e3, Hn.d.y = i2, Hn.d.width = r2, Hn.d.height = n2, null == t3.b && null == t3.c || (this.h = true);
        let h2 = 0;
        4 == a2 ? h2 = 1 : 6 == a2 ? h2 = 2 : 9 == a2 ? h2 = 3 : 15 == a2 && (h2 = 4), Hn.d.uBlendMode = h2, Hn.d.screenResolution = new Float32Array([this.f, this.g]), Hn.d.uDiffuseTexture = null != t3.a ? t3.a.d : Vn, Hn.d.uSpecularTexture = null != t3.b ? t3.b.d : Vn, Hn.d.uEmissiveTexture = null != t3.c ? t3.c.d : jn, Hn.d.renderResultTexture = null != this.d ? this.d : Vn, Hn.d.layer = s2, Hn.d.emissiveAlphaOverride = o2, l2.disable(l2.CULL_FACE), l2.disable(l2.DEPTH_TEST), l2.disable(l2.BLEND), l2.useProgram(Hn.a.program), l2.framebufferTexture2D(l2.FRAMEBUFFER, l2.COLOR_ATTACHMENT0, l2.TEXTURE_2D, this.a, 0), l2.bindTexture(l2.TEXTURE_2D, this.d), l2.copyTexImage2D(l2.TEXTURE_2D, 0, l2.RGBA, 0, 0, this.f, this.g, 0), l2.bindTexture(l2.TEXTURE_2D, null), re(Hn.a, Hn.d), l2.drawElements(l2.TRIANGLES, 6, l2.UNSIGNED_SHORT, 0), l2.useProgram(Hn.b.program), l2.framebufferTexture2D(l2.FRAMEBUFFER, l2.COLOR_ATTACHMENT0, l2.TEXTURE_2D, this.b, 0), l2.bindTexture(l2.TEXTURE_2D, this.d), l2.copyTexImage2D(l2.TEXTURE_2D, 0, l2.RGBA, 0, 0, this.f, this.g, 0), l2.bindTexture(l2.TEXTURE_2D, null), re(Hn.b, Hn.d), l2.drawElements(l2.TRIANGLES, 6, l2.UNSIGNED_SHORT, 0), l2.useProgram(Hn.c.program), l2.framebufferTexture2D(l2.FRAMEBUFFER, l2.COLOR_ATTACHMENT0, l2.TEXTURE_2D, this.c, 0), l2.bindTexture(l2.TEXTURE_2D, this.d), l2.copyTexImage2D(l2.TEXTURE_2D, 0, l2.RGBA, 0, 0, this.f, this.g, 0), l2.bindTexture(l2.TEXTURE_2D, null), re(Hn.c, Hn.d), l2.drawElements(l2.TRIANGLES, 6, l2.UNSIGNED_SHORT, 0), l2.useProgram(null);
      }
      k() {
        let t3 = this.e;
        t3.bindFramebuffer(t3.FRAMEBUFFER, null), t3.enable(t3.CULL_FACE), t3.enable(t3.DEPTH_TEST);
      }
    }
    class Xn {
      constructor(t3, e3) {
        this.a = t3, this.b = e3;
      }
      c() {
        const t3 = [];
        for (let e4 of this.b.Options) for (let i2 of e4.Choices) for (let e5 of i2.Elements) e5.SkinnedModel && t3.push(e5.SkinnedModel.CollectionFileDataID);
        const e3 = new Set(t3);
        if (0 != e3.size) {
          e3.size > 1 && WH.debug("more than 1 skinned model detected!");
          let i2 = t3[0], r2 = { type: hi.PATH, id: i2, parent: this.a, shoulder: 0 };
          this.a.aR = new $n(this.a.aS, this.a.k, r2, 0, false, false, false);
        }
      }
      d(t3) {
        return gn.a(this.a, this.b.TextureFiles[t3], this.a.o, this.a.p, this.a.n);
      }
      e(t3) {
        WH.debug("applyCustomization options", t3), this.a.M = [], this.a.bu(0);
        for (let t4 = 0; t4 < this.a.K.length; t4++) this.a.K[t4] = -1;
        if (this.a.aR) for (let t4 = 0; t4 < this.a.aR.K.length; t4++) this.a.aR.K[t4] = -1;
        for (let e3 = 0; e3 < t3.length; e3++) {
          let i2 = this.b.Options.find(((i3) => i3.Id == t3[e3].optionId));
          if (WH.debug("option", i2), i2) {
            let r2 = i2.Choices.find(((i3) => i3.Id == t3[e3].choiceId));
            if (WH.debug("choice", r2), r2) {
              let e4 = r2.Elements.filter(((e5) => e5.BoneSet && e5.BoneSet.BoneFileDataID && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID)))));
              e4.length > 0 && this.a.bu(e4[0].BoneSet.BoneFileDataID);
              let n2 = r2.Elements.filter(((e5) => e5.Material && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID)))));
              n2.sort(((t4, e5) => e5.VariationChoiceID - t4.VariationChoiceID)), n2.forEach(((t4) => {
                WH.debug("element material", t4);
                let e5 = this.d(t4.Material.MaterialResourcesID);
                if (!e5) return void WH.debug("element material: can't get texture files for material", t4);
                let i3 = this.b.TextureLayers.find(((e6) => e6.ChrModelTextureTargetID == t4.Material.TextureTarget));
                i3 ? 1 == i3.TextureType ? t4.Material.TextureTarget == Li ? this.a.C[1][0] = this.a.bA(1, e5) : this.a.D[t4.Material.TextureTarget] || (this.a.D[t4.Material.TextureTarget] = this.a.bA(i3.TextureSection, e5)) : 6 == i3.TextureType ? this.a.C[6][0] = this.a.bA(6, e5) : 7 == i3.TextureType ? this.a.C[7][0] = this.a.bA(7, e5) : 8 == i3.TextureType ? this.a.C[8][0] = this.a.bA(8, e5) : 10 == i3.TextureType ? this.a.C[10][0] = this.a.bA(10, e5) : 19 == i3.TextureType ? this.a.C[19][0] = this.a.bA(19, e5) : 20 == i3.TextureType ? this.a.C[20][0] = this.a.bA(20, e5) : 21 == i3.TextureType ? this.a.C[21][0] = this.a.bA(21, e5) : 22 == i3.TextureType ? this.a.C[22][0] = this.a.bA(22, e5) : WH.debug("unhandled texture type", i3.TextureType, "target", t4.Material.TextureTarget) : WH.debug("element material: can't get texture layer for material", t4);
              })), r2.Elements.filter(((e5) => e5.Geoset && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID))))).forEach(((t4) => {
                WH.debug("element geoset", t4), this.a.bD(t4.Geoset);
              })), r2.Elements.filter(((e5) => e5.SkinnedModel && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID))))).forEach(((t4) => {
                WH.debug("element skinnedmodel", t4), this.a.aR && this.a.aR.bD(t4.SkinnedModel);
              }));
              let a2 = r2.Elements.find(((e5) => 0 != e5.CondModelFileDataId && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID)))));
              if (24 == i2.Id || 353 == i2.Id) {
                if (a2 && !this.a.c) {
                  WH.debug("element condModel", a2);
                  let e5 = this.a.aS, i3 = this.a.a, r3 = e5.models.indexOf(this.a);
                  if (r3 > -1) {
                    e5.models.splice(r3, 1), WH.debug("test 1!", t3, e5.options, i3), e5.options.charCustomization = this.a.q;
                    let n3 = new $n(e5, e5.options, i3, r3, true, false, false, a2.CondModelFileDataId);
                    return n3.q = this.a.q, e5.models.push(n3), void this.a.ba();
                  }
                } else if (!a2 && this.a.c) {
                  let e5 = this.a.aS, i3 = this.a.a, r3 = e5.models.indexOf(this.a);
                  if (r3 > -1) {
                    e5.models.splice(r3, 1), WH.debug("test 2!", t3, e5.options, i3), e5.options.charCustomization = this.a.q;
                    let n3 = new $n(e5, e5.options, i3, r3, true, false, false);
                    return n3.q = this.a.q, e5.models.push(n3), void this.a.ba();
                  }
                }
              }
              r2.Elements.filter(((e5) => e5.ChrCustItemGeoModifyID && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID))))).forEach(((t4) => {
                WH.debug("element ChrCustItemGeoModify", t4), this.a && this.a.M.push(t4.ChrCustItemGeoModifyID);
              }));
            }
          }
        }
        if (!this.a.C[6][0]) {
          let e3 = this.b.Options.find(((t4) => t4.Id == this.b.HairStyleOptionId));
          if (e3) {
            let i2 = e3.Choices[1];
            if (i2) {
              let e4 = i2.Elements.filter(((e5) => e5.Material && e5.Material.TextureTarget == Hi && (0 == e5.VariationChoiceID || t3.some(((t4) => t4.choiceId == e5.VariationChoiceID)))));
              if (e4.length > 0) {
                let t4 = this.d(e4[0].Material.MaterialResourcesID);
                t4 && (this.a.C[6][0] = this.a.bA(6, t4));
              }
            }
          }
        }
      }
      f() {
        let t3 = [];
        for (let e3 = 0; e3 < this.b.Options.length; e3++) {
          let i2 = this.b.Options[e3];
          if (i2) {
            let e4 = i2.Choices[0];
            e4 && t3.push({ optionId: i2.Id, choiceId: e4.Id });
          }
        }
        this.e(t3);
      }
      g(t3) {
        let e3 = { options: t3, sheathMain: -1, sheathOff: -1 };
        for (let t4 of this.b.Options) e3.options.some(((e4) => e4.optionId == t4.Id)) || e3.options.push({
          optionId: t4.Id,
          choiceId: t4.Choices[0].Id
        });
        return e3;
      }
    }
    const qn = function(t3, e3) {
      const i2 = Math.abs(t3), r2 = Math.abs(e3);
      return Number((i2 - Math.floor(i2 / r2) * r2).toPrecision(8)) * Math.sign(t3);
    }, Wn = 44, Yn = 4400, Zn = "DressingRoom", Jn = "Stand";
    class Kn {
      constructor(t3, e3, i2, r2, n2, a2, s2, o2) {
        this.e = false, this.r = 0, this.s = null, this.t = null, this.E = [], this.M = [], this.R = new Ir(), this.T = false, this.an = [], this.aG = [], this.aH = [], this.aJ = null, this.aQ = false, this.aT = null, this.aU = null, this.aV = null, this.aX = [], this.aY = false;
        var l2 = this;
        if (l2.e = n2, l2.aS = t3, l2.a = i2, l2.b = r2, l2.c = o2, l2.d = false, l2.f = true, l2.g = true, this.h = false, l2.ad = a2, l2.k = e3, "classic" == l2.k.gameDataEnv ? (pi[14] = 14, pi[15] = 15) : (pi[14] = 22, pi[15] = 22), l2.i = null, l2.l = l2.k.mount && l2.k.mount.type == hi.NPC && l2.k.mount.id == l2.a.id, l2.j = null, l2.m = l2.k.pet && l2.k.pet.type == hi.NPC && l2.k.pet.id == l2.a.id, l2.a.type == hi.CHARACTER && l2.k.mount && l2.k.mount.type == hi.NPC && l2.k.mount.id && (l2.k.mount.parent = l2, l2.i = new Kn(t3, e3, l2.k.mount, 0, false, false, false)), l2.a.type == hi.CHARACTER && l2.k.pet && l2.k.pet.type == hi.NPC && l2.k.pet.id && (l2.k.pet.parent = l2, l2.j = new Kn(t3, e3, l2.k.pet, 0, false, false, false)), l2.k.extraModels && !l2.a.parent) {
          l2.A = [];
          const i3 = l2.k.extraModels;
          if ($.isArray(i3)) for (let r3 = 0; r3 < i3.length; ++r3) {
            const n3 = { type: hi.PATH, id: i3[r3][0], parent: l2, shoulder: -1 };
            l2.A.push(new Kn(t3, e3, n3, 0, false, false, false));
          }
        }
        l2.n = 0, l2.o = -1, l2.p = l2.k.cls ? parseInt(l2.k.cls) : 0, l2.u = null, l2.v = l2.a.parent || null, l2.x = /* @__PURE__ */ new Map(), this.y = [null, null], l2.w = false, l2.B = {}, l2.aJ = null, l2.aK = null, l2.C = [];
        for (let t4 = 0; t4 < 25; t4++) l2.C.push({});
        l2.D = {}, l2.H = -1, l2.I = -1, l2.J = new Array(Wn), l2.K = new Array(Wn), l2.L = [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], l2.N = null, l2.O = 0;
        for (let t4 = 0; t4 < Wn; t4++) l2.J[t4] = 100 * t4 + l2.L[t4];
        l2.P = 0, l2.Q = 0, l2.R.c = 0, l2.R.a.a = -1, l2.S = false, l2.U = je(), l2.V = er(1, 1, 1, 1), l2.W = [0.35, 0.35, 0.35, 1], l2.X = [1, 1, 1, 1], l2.Y = [0.35, 0.35, 0.35, 1], l2.Z = ve(), l2.aa = ve(), l2.ab = ve(), Ue(l2.Z, [5, -3, 3]), Ue(l2.aa, [5, 5, 5]), Ue(l2.ab, [-5, -5, -5]), l2.ac = false, l2.ae = we(0, 0, 0), l2.af = we(0, 0, 0), l2.ag = we(0, 0, 0), l2.boundsSize = we(0, 0, 0), l2.ak = null, l2.al = null, l2.an = null, l2.ao = null, l2.ap = null, l2.aq = null, l2.ar = null, l2.as = null, l2.at = null, l2.au = null, l2.av = null, l2.aw = null, l2.ax = null, l2.ay = null, l2.az = null, l2.aA = null, l2.aB = null, l2.aC = null, l2.aD = null, l2.aE = null, l2.aF = null, l2.aG = null, l2.aH = null, l2.aM = je(), l2.aN = ve(), l2.aO = ve(), l2.aP = Qi(), s2 || l2.bP();
      }
      bZ(t3) {
        if (this[t3]) {
          for (var e3 = this[t3], i2 = 0; i2 < e3.length; ++i2) e3[i2] && e3[i2].destroy && e3[i2].destroy(), e3[i2] = null;
          this[t3] = null;
        }
      }
      ba() {
        var t3 = this;
        if (this.aQ = true, this.d = false, t3.aK && t3.aK.d(), t3.C) for (let e3 = 0; e3 < t3.C.length; ++e3) for (const i2 in t3.C[e3]) t3.C[e3][i2].d();
        if (t3.B) for (const e3 in t3.B) t3.B[e3].h();
        if (t3.al && (t3.al = null), t3.ao && (t3.ao = null), t3.aq && (t3.aq = null), t3.ar && (t3.ar = null), t3.au && (t3.au = null), t3.ax && (t3.ax = null), t3.az && (t3.az = null), t3.aA && (t3.aA = null), t3.aC && (t3.aC = null), t3.aF && (t3.aF = null), t3.av) for (let e3 = 0; e3 < t3.av.length; ++e3) t3.av[e3] = null;
        t3.av = null, this.bZ("vertices"), this.bZ("animations"), this.bZ("bones"), this.bZ("meshes"), this.bZ("texUnits"), this.bZ("materials"), this.bZ("textureAnims"), this.bZ("attachments"), this.bZ("colors"), this.bZ("alphas"), this.bZ("particleEmitters"), this.bZ("ribbonEmitters"), this.bZ("skins"), this.bZ("faces"), this.bZ("hairs"), this.an = null, t3.x && t3.x.forEach(((e3, i2) => {
          e3.x(), t3.x.set(i2, null);
        })), t3.i && t3.i.ba(), t3.i = null, t3.j && t3.j.ba(), t3.j = null, t3.aR && t3.aR.ba(), t3.aR = null, t3.a = null, t3.x = null, t3.B = null, t3.C = null, t3.J = null, t3.U = null, t3.W = null, t3.X = null, t3.Y = null, t3.Z = null, t3.aa = null, t3.ab = null, t3.ae = null, t3.af = null, t3.ag = null, t3.boundsSize = null, t3.aM = null, t3.aN = null, t3.aO = null, t3.aP = null;
      }
      getNumAnimations() {
        const t3 = this.i ? this.i : this;
        return t3.an ? t3.an.length + 1 : 0;
      }
      getAnimation(t3) {
        const e3 = this.i ? this.i : this;
        return e3.an && t3 > -1 && t3 < e3.an.length ? e3.an[t3].j : t3 == e3.an.length ? Zn : "";
      }
      resetAnimation() {
        (this.i ? this.i : this).setAnimation(Jn);
      }
      setAnimPaused(t3) {
        var e3;
        this.S = t3, null === (e3 = this.i) || void 0 === e3 || e3.setAnimPaused(t3), this.E.forEach(((e4) => e4.f(t3)));
      }
      setAnimNoSubAnim(t3) {
        this.T = t3;
      }
      bg(t3) {
        var e3;
        null === (e3 = this.j) || void 0 === e3 || e3.setAnimation(t3);
      }
      setItems(t3) {
        WH.debug("setItems", t3);
        const e3 = [];
        for (let i2 = 0; i2 < t3.length; i2++) e3.push([t3[i2].slot, t3[i2].display, t3[i2].visual]);
        e3.forEach(((t4) => {
          const e4 = [parseInt(t4[0]), parseInt(t4[1])];
          this.k.items.push(e4);
        })), this.bK(e3), this.w = true;
      }
      attachList(t3) {
        WH.debug("attachList", t3);
        const e3 = t3.split(","), i2 = [];
        for (let t4 = 0; t4 < e3.length; t4 += 2) i2.push([e3[t4], e3[t4 + 1]]);
        i2.forEach(((t4) => {
          const e4 = [parseInt(t4[0]), parseInt(t4[1])];
          this.k.items.push(e4);
        })), this.bK(i2), this.w = true;
      }
      clearSlots(t3) {
        WH.debug("clearSlots", t3);
        const e3 = t3.split(",");
        for (let t4 = 0; t4 < e3.length; ++t4) {
          this.bM(parseInt(e3[t4]));
          const i2 = [];
          this.k.items.forEach(((e4) => {
            0 != this.k.items[t4].indexOf(parseInt(e4)) && i2.push(e4);
          })), this.k.items = i2;
        }
        this.bJ(), this.w = true;
      }
      setShouldersOverride(t3) {
        if (WH.debug("setShouldersOverride", t3), !t3 || 2 != t3.length) return;
        for (let t4 = 0; t4 < 2; t4++) {
          const e4 = this.y[t4];
          e4 && e4.x(), this.y[t4] = null;
        }
        for (let e4 = 0; e4 < 2; e4++) if (null != t3[e4]) {
          const i2 = new _n(this, wi, t3[e4], this.n, this.o);
          let r2 = 0;
          r2 = 0 == e4 ? 1 : 2, i2.B(r2), this.y[e4] = i2;
        }
        const e3 = this.x.get(wi);
        if (e3) {
          let t4 = 3;
          for (let e4 = 0; e4 < 2; e4++) this.y[e4] && (t4 &= ~(1 << e4));
          e3.B(t4);
        }
      }
      setSheath(t3, e3) {
        this.H = t3, this.I = e3, this.bJ();
      }
      setAppearance(t3) {
        var e3;
        const i2 = function(t4, e4) {
          t4[e4].d(), delete t4[e4];
        };
        if (this.C[1][0] && i2(this.C[1], 0), this.C[6][0] && i2(this.C[6], 0), this.C[8][0] && i2(this.C[8], 0), this.C[19][0] && i2(this.C[19], 0), this.C[19][1] && i2(this.C[19], 1), this.D) for (const t4 in this.D) this.D[t4].d(), delete this.D[t4];
        this.q = t3, this.H = t3.sheathMain, this.I = t3.sheathOff, null === (e3 = this.F) || void 0 === e3 || e3.e(t3.options), this.w = true, this.bB(), this.bJ();
      }
      setCustomizationsLoadedCallback(t3) {
        this.G = t3;
      }
      isLoaded() {
        return this.i ? this.i.d && this.d : this.d;
      }
      setParticlesEnabled(t3) {
        this.f = t3, this.x.forEach((function(e3) {
          if (e3.i) {
            for (let i2 = 0; i2 < e3.i.length; ++i2) if (e3.i[i2] && (e3.i[i2].e.setParticlesEnabled(t3), e3.r[i2] && e3.r[i2].b)) {
              const r2 = e3.i[i2].e;
              for (let n2 = 0; n2 < e3.r[i2].b.length; n2++) r2.aB && r2.aB[n2] && e3.r[i2].b[n2] && e3.r[i2].b[n2].e.setParticlesEnabled(t3);
            }
          }
        }));
      }
      setRibbonsEnabled(t3) {
        this.g = t3;
      }
      getTexUnits() {
        return this.aL;
      }
      bs(t3, e3, i2, r2) {
        Ge(this.U, t3), Ye(this.U, this.U, e3), i2 && Ze(this.U, this.U, i2), r2 && Ye(this.U, this.U, r2);
      }
      bt(t3, e3) {
        let i2 = false;
        const r2 = t3 == Zn;
        r2 && (t3 = Jn);
        for (let n2 = 0; n2 < this.an.length; ++n2) {
          const a2 = this.an[n2];
          if (a2.j && (a2.j == t3 && 0 == a2.b)) {
            i2 = true, e3.a.a = n2, e3.a.b = a2, e3.a.c = 0, e3.b = new Dr(), e3.c = 0, e3.d = r2, WH.debug("Set animation to", a2.a, a2.j);
            break;
          }
        }
        t3 == Jn || i2 || this.bt(Jn, e3);
      }
      bu(t3) {
        if (this.r == t3) return;
        if (this.d) for (let t4 = 0; t4 < this.ap.length; t4++) this.ap[t4].v = null;
        if (this.r = t3, t3 <= 0) return;
        let e3 = this.k.contentPath + "bone/" + t3 + ".bone", i2 = this;
        $.ajax({
          url: e3,
          type: "GET",
          dataType: "binary",
          responseType: "arraybuffer",
          processData: false,
          renderer: this.aS,
          success: function(t4) {
            i2.bv(t4);
          },
          error: function(t4, e4, i3) {
            console.log(i3);
          }
        });
      }
      bv(t3) {
        let e3 = new Rn(t3);
        e3.getInt32();
        for (; e3.position < e3.buffer.byteLength; ) {
          let t4 = String.fromCharCode(e3.getUint8(), e3.getUint8(), e3.getUint8(), e3.getUint8()), i2 = e3.getUint32();
          if ("BIDA" == t4) {
            let t5 = i2 / 2;
            this.s = new Array(t5);
            for (let i3 = 0; i3 < t5; i3++) this.s[i3] = e3.getUint16();
          }
          if ("BOMT" == t4) {
            let t5 = i2 / 64;
            this.t = new Array(t5);
            for (let i3 = 0; i3 < t5; i3++) {
              let t6 = Xe(e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat(), e3.getFloat());
              this.t[i3] = t6;
            }
          }
        }
        this.d && this.bw();
      }
      bw() {
        if (!(this.r <= 0) && this.s && this.s.length) for (let t3 = 0; t3 < this.s.length; t3++) this.ap[this.s[t3]].v = this.t[t3];
      }
      setAnimation(t3) {
        this.an && (this.i && (this.i.setAnimation(t3), t3 = oi[this.i.a.id] ? "StealthStand" : "Mount"), this.bt(t3, this.R), this.x.forEach(((e3) => {
          if (e3.i) for (let i2 = 0; i2 < e3.i.length; i2++) e3.i[i2].e.setAnimation(t3);
        })), this.E && this.E.forEach(((e3) => e3.e(t3))));
      }
      by(t3) {
        let e3 = this, i2 = e3.aS.context;
        if (!e3.ak || !e3.al) return;
        const r2 = 10 * e3.ak.length;
        if (e3.aT || (e3.aT = new Float32Array(r2)), t3) {
          var n2 = e3.aT, a2 = e3.ak;
          for (let t4 = 0, e4 = 0; t4 < r2; ++e4) n2[t4 + 0] = a2[e4].i[0], n2[t4 + 1] = a2[e4].i[1], n2[t4 + 2] = a2[e4].i[2], n2[t4 + 3] = a2[e4].j[0], n2[t4 + 4] = a2[e4].j[1], n2[t4 + 5] = a2[e4].j[2], n2[t4 + 6] = a2[e4].c, n2[t4 + 7] = a2[e4].d, n2[t4 + 8] = a2[e4].e, n2[t4 + 9] = a2[e4].f, t4 += 10;
        }
        e3.aU ? (i2.bindBuffer(i2.ARRAY_BUFFER, e3.aU), i2.bufferSubData(i2.ARRAY_BUFFER, 0, e3.aT)) : (e3.aU = i2.createBuffer(), i2.bindBuffer(i2.ARRAY_BUFFER, e3.aU), i2.bufferData(i2.ARRAY_BUFFER, e3.aT, i2.DYNAMIC_DRAW), e3.aV = i2.createBuffer(), i2.bindBuffer(i2.ELEMENT_ARRAY_BUFFER, e3.aV), i2.bufferData(i2.ELEMENT_ARRAY_BUFFER, new Uint16Array(e3.al), i2.STATIC_DRAW));
      }
      bz() {
        let t3, e3 = this, i2 = er(1, 1, 1, 1), r2 = e3.ae, n2 = e3.af, a2 = e3.aN;
        if (Ae(r2, 9999, 9999, 999), Ae(n2, -9999, -9999, -9999), !e3.at) return qe(e3.U), e3.v || (e3.aS.distance = 1), false;
        for (let a3 = 0; a3 < e3.at.length; ++a3) {
          let s3 = e3.at[a3];
          if (!s3.show) continue;
          if (i2[0] = i2[1] = i2[2] = i2[3] = 1, e3.R.a.a > 0 && (s3.v && (i2 = s3.v.g(e3.R, this.aX)), s3.w[0] && (i2[3] *= s3.w[0].d(e3.R, this.aX))), i2[3] < 0.01) continue;
          let o3 = s3.p;
          for (let i3 = 0; i3 < o3.f; ++i3) t3 = e3.ak[e3.al[o3.e + i3]].i, Me(r2, r2, t3), ke(n2, n2, t3);
        }
        const s2 = e3.aR;
        if (s2 && s2.d && s2.at && s2.at.length > 0) for (let e4 = 0; e4 < s2.at.length; ++e4) {
          let i3 = s2.at[e4];
          if (!i3.show) continue;
          let a3 = i3.p;
          for (let e5 = 0; e5 < a3.f; ++e5) t3 = s2.ak[s2.al[a3.e + e5]].i, Me(r2, r2, t3), ke(n2, n2, t3);
        }
        e3.i && e3.i.d && e3.i.bz() && (ye(r2, Fe(r2, e3.i.ae, 1.1)), ye(n2, Fe(n2, e3.i.af, 1.1)), n2[2] *= 1.75), e3.a.type == hi.NPC && (Fe(r2, r2, e3.u.Scale), Fe(n2, n2, e3.u.Scale)), Ce(e3.boundsSize, n2, r2), Re(e3.ag, r2, e3.boundsSize, 0.5);
        let o2, l2, h2 = e3.boundsSize[2];
        const u2 = e3.u && e3.u.Scale ? e3.u.Scale : 1;
        if (e3.a.type != hi.ITEM ? (o2 = e3.boundsSize[1], l2 = e3.boundsSize[0]) : (o2 = e3.boundsSize[0], l2 = e3.boundsSize[1]), !e3.v) {
          const t4 = e3.aS.width / e3.aS.height, i3 = 2 * Math.tan(e3.aS.fov / 2 * 0.0174532925), r3 = 1.2 * h2 / i3, n3 = 1.2 * o2 / (i3 * t4);
          e3.aS.distance = Math.max(Math.max(r3, n3), 2 * l2);
        }
        return qe(e3.U), e3.a.type != hi.ITEM && Qe(e3.U, e3.U, Math.PI / 2), Ze(e3.U, e3.U, Ie(a2, e3.ag)), Ae(e3.aN, u2, u2, u2), Je(e3.U, e3.U, e3.aN), true;
      }
      bA(t3, e3) {
        let i2 = new Nn();
        return e3.a > 0 && (i2.a = new an(this, t3, e3.a)), e3.b > 0 && (i2.b = new an(this, t3, e3.b)), e3.c > 0 && (i2.c = new an(this, t3, e3.c)), i2;
      }
      bB() {
        this.aQ || (this.a.type != hi.CHARACTER && this.a.type != hi.NPC && this.a.type != hi.HUMANOIDNPC || this.n < 1 ? this.bF() : (this.bH(), this.aK || (this.w = true)));
      }
      bC(t3) {
        t3 && (this.J[t3.geosetType] = 100 * t3.geosetType + t3.geosetID);
      }
      bD(t3) {
        t3 && (this.K[t3.GeosetType] = 100 * t3.GeosetType + t3.GeosetID);
      }
      bE(t3, e3, i2) {
        if (!this.at || 0 == this.at.length) return false;
        let r2;
        for (let n2 = 0; n2 < this.at.length; ++n2) r2 = this.at[n2], r2.meshId >= t3 && r2.meshId <= e3 && (r2.show = i2);
        return true;
      }
      bF() {
        if (this.bE(0, 0, true), 0 != this.O && (this.bE(1, 1699, false), this.N)) for (let t3 of this.N) {
          let e3 = 100 * (t3.GeosetIndex + 1), i2 = e3 + t3.GeosetValue;
          this.bE(e3, e3 + 99, false), this.bE(i2, i2, true);
        }
      }
      bG(t3, e3) {
        let i2 = [];
        for (let t4 = 0; t4 < this.ap.length; t4++) i2[this.ap[t4].g] = t4;
        let r2 = t3.ap;
        if (r2) {
          for (let t4 = 0; t4 < r2.length; t4++) {
            let e4 = i2[r2[t4].g];
            if ("number" != typeof e4) continue;
            let n2 = r2[t4].m, a2 = this.ap[e4].m;
            r2[t4].s = true, Ge(n2, a2);
          }
          qe(this.aM), t3.bs(this.U, this.aM), t3.bW(), t3.bY(e3);
        }
      }
      bH() {
        var t3 = this;
        if (!t3.at || 0 == t3.at.length) return;
        for (let e4 = 0; e4 < Wn; e4++) t3.J[e4] = 100 * e4 + t3.L[e4];
        t3.bE(0, Yn, false), t3.bE(0, 0, true);
        for (let e4 = 0; e4 < t3.K.length; e4++) -1 != this.K[e4] && (this.J[e4] = this.K[e4]);
        for (let e4 = 0; e4 < t3.J.length; e4++) t3.bE(t3.J[e4], t3.J[e4], true);
        let e3 = t3.x.get(Ti), i2 = t3.x.get(yi), r2 = t3.x.get(Ai), n2 = t3.x.get(Ei), a2 = t3.x.get(Ci), s2 = t3.x.get(Si), o2 = t3.x.get(Mi), l2 = t3.x.get(ki), h2 = t3.x.get(Ui), u2 = t3.x.get(Ii);
        function c2(t4, e4, i3) {
          if (!t4.at) return;
          let r3 = i3 + 1, n3 = e4 > 0 ? i3 + e4 : r3, a3 = t4.at.some(((t5) => t5.meshId == n3));
          n3 = a3 ? n3 : r3, t4.bE(n3, n3, true);
        }
        function f2(t4, e4, i3) {
          if (!t4.at) return;
          let r3 = 100 * i3, n3 = r3 + t4.L[i3] + e4;
          t4.bE(r3, r3 + 99, false), t4.bE(n3, n3, true);
        }
        if (t3.x.forEach(((t4) => {
          if (t4 && t4.q) {
            let e4 = t4.q;
            e4.bE(0, Yn, false), t4.b == Ti ? (c2(e4, t4.k[0], 2700), c2(e4, t4.k[1], 2100)) : t4.b == wi ? c2(e4, t4.k[0], 2600) : t4.b == yi ? (c2(e4, t4.k[0], 800), c2(e4, t4.k[1], 1e3)) : t4.b == Ai || t4.b == Bi ? (c2(e4, t4.k[0], 800), c2(e4, t4.k[1], 1e3), c2(e4, t4.k[2], 1300), c2(e4, t4.k[3], 2200), c2(e4, t4.k[4], 2800)) : t4.b == Ei ? c2(e4, t4.k[0], 1800) : t4.b == Ci ? (c2(e4, t4.k[0], 1100), c2(e4, t4.k[1], 900), c2(e4, t4.k[2], 1300)) : t4.b == Si ? (c2(e4, t4.k[0], 500), c2(e4, t4.k[1], 2e3)) : t4.b == ki ? (c2(e4, t4.k[0], 400), c2(e4, t4.k[1], 2300)) : t4.b == Ii ? c2(e4, t4.k[0], 1500) : t4.b == Ui && c2(e4, t4.k[0], 1200);
          }
        })), t3.x.forEach(((t4) => {
          if (t4 && t4.i) for (let e4 of t4.i) {
            let i3 = e4.e;
            t4.b == Ti ? (f2(i3, t4.l[0], 27), f2(i3, t4.l[1], 21)) : t4.b == wi ? f2(i3, t4.l[0], 26) : t4.b == yi ? (f2(i3, t4.l[0], 8), f2(i3, t4.l[1], 10)) : t4.b == Ai || t4.b == Bi ? (f2(i3, t4.l[0], 8), f2(i3, t4.l[1], 10), f2(i3, t4.l[2], 13), f2(i3, t4.l[3], 22), f2(i3, t4.l[4], 28)) : t4.b == Ei ? f2(i3, t4.l[0], 18) : t4.b == Ci ? (f2(i3, t4.l[0], 11), f2(i3, t4.l[1], 9), f2(i3, t4.l[2], 13)) : t4.b == Si ? (f2(i3, t4.l[0], 5), f2(i3, t4.l[1], 20)) : t4.b == ki ? (f2(i3, t4.l[0], 4), f2(i3, t4.l[1], 23)) : t4.b == Ii ? f2(i3, t4.l[0], 15) : t4.b == Ui && f2(i3, t4.l[0], 12);
          }
        })), e3) {
          const i3 = t3.n, r3 = t3.o == ui.MALE ? e3.v : e3.w;
          if (r3) {
            for (let e4 = 0; e4 < r3.length; e4++) if (r3[e4].RaceId == i3) {
              const n3 = r3[e4].GeosetGroup;
              if (i3 == ci && (1 == n3 || 2 == n3)) continue;
              if (n3 < Wn) if (0 == n3) t3.bE(1, 99, false);
              else {
                const e5 = 100 * n3;
                t3.bE(e5, e5 + 99, false);
              }
            }
          }
        }
        let d2 = 0;
        if (h2 && (d2 |= 16), l2 && l2.k && l2.k[0]) {
          let e4 = 401 + l2.k[0];
          t3.bE(401, 499, false), t3.bE(e4, e4, true), l2.f += 2;
        } else if (r2 && r2.k && r2.k[0]) {
          let e4 = 801 + r2.k[0];
          t3.bE(e4, e4, true);
        }
        if (!(r2 || n2 || o2) && i2 && i2.k && i2.k[0]) {
          let e4 = 801 + i2.k[0];
          t3.bE(e4, e4, true);
        }
        if (h2) 0 == (1048576 & h2.h) && (t3.bE(2200, 2299, false), t3.bE(2202, 2202, true));
        else if (r2 && r2.k && r2.k[3]) {
          let e4 = 2201 + r2.k[3];
          t3.bE(2200, 2299, false), t3.bE(e4, e4, true);
        }
        let b2 = false;
        n2 && n2.k && n2.k[0] && (b2 = 0 != (512 & n2.h));
        let g2, _2 = false, p2 = false;
        if (r2 && r2.k && r2.k[2]) {
          p2 = true, t3.bE(501, 599, false), t3.bE(902, 999, false), t3.bE(1100, 1199, false), t3.bE(1300, 1399, false);
          let e4 = 1301 + r2.k[2];
          t3.bE(e4, e4, true);
        } else if (a2 && a2.k && a2.k[2]) {
          _2 = true, t3.bE(501, 599, false), t3.bE(902, 999, false), t3.bE(1100, 1199, false), t3.bE(1300, 1399, false);
          let e4 = 1301 + a2.k[2];
          t3.bE(e4, e4, true);
        } else if (s2 && s2.k && s2.k[0]) {
          t3.bE(501, 599, false), t3.bE(901, 901, true);
          let e4 = 501 + s2.k[0];
          t3.bE(e4, e4, true);
        } else {
          let e4;
          e4 = a2 && a2.k && a2.k[1] ? 901 + a2.k[1] : 901, t3.bE(e4, e4, true);
        }
        g2 = s2 && s2.k && s2.k[1] ? 2e3 + s2.k[1] : s2 && 0 == (1048576 & s2.h) ? 2002 : 2001, t3.bE(2001, 2099, false), t3.bE(g2, g2, true);
        let m2 = false, v2 = p2 || _2;
        if (!v2 && h2 && h2.k && h2.k[0]) {
          let e4;
          m2 = false, b2 ? (m2 = true, e4 = 1203) : (m2 = true, e4 = 1201 + h2.k[0]), t3.bE(e4, e4, true);
        } else 16 & d2 && (t3.bE(1201, 1201, true), v2 || (t3.bE(1202, 1202, true), m2 = true));
        if (!m2 && !p2) {
          if (r2 && r2.k && r2.k[1]) {
            let e4 = 1001 + r2.k[1];
            t3.bE(e4, e4, true);
          } else if (i2 && i2.k && i2.k[1]) {
            let e4 = 1001 + i2.k[1];
            t3.bE(e4, e4, true);
          }
        }
        if (!p2 && a2 && a2.k && a2.k[0]) {
          let e4 = a2.k[0], i3 = 1101 + e4;
          e4 > 2 ? (t3.bE(1300, 1399, false), t3.bE(i3, i3, true)) : m2 || t3.bE(i3, i3, true);
        }
        if (u2 && u2.k && u2.k[0]) {
          t3.bE(1500, 1599, false);
          let e4 = 1501 + u2.k[0];
          if (this.M.length > 0) for (let t4 of this.M) {
            const i3 = li[t4];
            i3 && 15 == i3.a && i3.b == u2.k[0] + 1 && (e4 = 1500 + i3.c);
          }
          t3.bE(e4, e4, true);
        }
        if (n2 && n2.k && n2.k[0]) {
          t3.bE(1800, 1899, false);
          let e4 = 1801 + n2.k[0];
          t3.bE(e4, e4, true);
        }
        if (a2 || p2 || _2 || m2 || b2 ? t3.bE(1400, 1499, false) : t3.bE(1401, 1401, true), t3.aR) {
          let e4 = t3.aR;
          e4.bE(0, Yn, false);
          for (let t4 = 0; t4 < e4.K.length; t4++) if (e4.bE(e4.K[t4], e4.K[t4], true), e4.at) {
            let i3 = e4.K[t4];
            if (e4.at.some(((t5) => t5.meshId == i3))) {
              let e5 = 100 * t4;
              this.bE(e5, e5 + 99, false);
            }
          }
        }
      }
      bI() {
        var t3 = this;
        let e3 = false;
        if (t3.x.forEach(((t4) => {
          if (t4.m || t4.n) {
            if (t4.j) for (let i3 = 0; i3 < t4.j.length; ++i3) t4.j[i3].texture && !t4.j[i3].texture.g() && (e3 = true);
          } else e3 = true;
        })), e3) return;
        if (!t3.C[1][0] || t3.C[1][0] && !t3.C[1][0].e()) return;
        if (!this.aJ) {
          var i2 = t3.C[1][0].a, r2 = i2.a.width, n2 = i2.a.height;
          this.aJ = new Gn(t3.aS.context, r2, n2);
        }
        let a2 = this.aJ;
        a2.i();
        let s2 = true, o2 = true;
        t3.n != fi && t3.n != di || (o2 = false), t3.x.forEach(((t4) => {
          let e4 = t4.e;
          e4 != yi && e4 != Ai && e4 != Ui || (s2 = false), e4 == Ci && (o2 = false);
        }));
        let l2, h2 = Yi;
        a2.f != a2.g && (h2 = Zi);
        let u2 = this.F.b.TextureLayers, c2 = this.F.b.TextureSections, f2 = -1;
        if (this.n == bi) for (let t4 of u2) 9 == t4.BlendMode && 1 == t4.TextureType && t4.Layer > f2 && (f2 = t4.Layer);
        for (let e4 of u2) {
          if (1 != e4.TextureType) continue;
          if (0 == e4.Layer) {
            a2.j(t3.C[1][0], 0, 0, 1, 1, 0, 0, 0);
            continue;
          }
          let i3 = -1;
          e4.Layer == f2 && (i3 = 0);
          let r3 = this.D[e4.ChrModelTextureTargetID];
          if (r3) {
            if (!r3.e()) return void WH.debug("texture target", e4.ChrModelTextureTargetID, "layer", e4.Layer, "not ready!");
            let t4 = e4.TextureSection;
            if (t4 != Gi && t4 != Xi || s2 && t4 == Gi || o2 && t4 == Xi) {
              let n3 = 0, s3 = 0, o3 = 1, u3 = 1;
              if (-1 != t4) if (c2) {
                let e5 = c2.find(((e6) => e6.SectionType == t4));
                n3 = e5.X, s3 = e5.Y, o3 = e5.Width, u3 = e5.Height;
              } else l2 = h2[t4], n3 = l2.x, s3 = l2.y, o3 = l2.w, u3 = l2.h;
              a2.j(r3, n3, s3, o3, u3, e4.BlendMode, e4.Layer, i3);
            }
          }
        }
        let d2 = [];
        t3.x.forEach(((t4) => {
          d2.push(t4);
        })), d2.sort((function(t4, e4) {
          return t4.f - e4.f;
        }));
        for (let e4 = 0; e4 < d2.length; ++e4) {
          let i3 = d2[e4];
          if (i3.j) for (let e5 = 0; e5 < i3.j.length; ++e5) {
            let r3 = i3.j[e5];
            if (r3.gender == t3.o && r3.texture && r3.texture.g() && r3.region != Wi) {
              if (0 != (2 & t3.u.RaceFlags) && r3.region == qi) continue;
              l2 = h2[r3.region];
              let e6 = new Nn();
              e6.a = r3.texture, a2.j(e6, l2.x, l2.y, l2.w, l2.h, 0, -1, -1);
            }
          }
        }
        a2.k(), t3.w = false;
      }
      bJ() {
        if (!this.d) return;
        let t3 = (-1 == this.I || !this.I) && null != this.x.get(zi), e3 = !(-1 != this.H && this.H || null == this.x.get(Fi) && null == this.x.get(Pi));
        for (let e4 of Vi) {
          let i2 = this.ar[e4];
          i2 > 0 && i2 < this.ap.length && this.ap[i2].A(t3 ? "HandsClosed" : "");
        }
        for (let t4 of ji) {
          let i2 = this.ar[t4];
          i2 > 0 && i2 < this.ap.length && this.ap[i2].A(e3 ? "HandsClosed" : "");
        }
      }
      bK(t3) {
        if ($.isArray(t3)) for (let e3 = 0; e3 < t3.length; ++e3) this.bL(t3[e3][0], t3[e3][1], t3[e3][2]);
        else for (let e3 in t3) this.bL(parseInt(e3), t3[e3]);
        this.bJ();
      }
      bL(t3, e3, i2) {
        let r2 = new _n(this, t3, e3, this.n, this.o);
        i2 && r2.A(i2);
        let n2 = r2.e, a2 = vi[t3];
        this.x.get(n2) && 0 != a2 ? (r2.e = a2, this.x.set(a2, r2)) : this.x.set(n2, r2);
      }
      bM(t3) {
        var e3 = this.x.get(t3);
        e3 || (t3 = pi[t3], e3 = this.x.get(t3)), e3 && (this.x.delete(t3), e3.x());
      }
      bN(t3, e3) {
        const i2 = [], r2 = { [Ri]: (t4) => [0], [Ni]: (t4) => 2 == t4.c && 18 == t4.d ? [1] : null };
        if (this.aB && this.aC) {
          const n2 = {
            1: (t4) => [11],
            3: (t4) => [6, 5],
            22: (t4) => {
              var e4;
              return (null === (e4 = r2[t4.b]) || void 0 === e4 ? void 0 : e4.call(r2, t4)) || [2];
            },
            21: (t4) => [1],
            17: (t4) => [1],
            15: (t4) => [2],
            25: (t4) => [1],
            13: (t4) => [1],
            14: (t4) => [0],
            23: (t4) => [2],
            6: (t4) => [53],
            26: (t4) => [1],
            16: (t4) => [57],
            27: (t4) => [55]
          };
          if (n2[t3]) {
            const r3 = n2[t3](e3);
            for (let n3 = 0; n3 < r3.length; ++n3) {
              let a2 = r3[n3];
              (this.H >= 0 || this.I >= 0 || this.i) && Ki[t3] && (a2 = Ki[t3]), this.H >= 0 && t3 == Pi && $i[this.H][t3] && (a2 = $i[this.H][t3]), this.I >= 0 && t3 == zi && $i[this.I][t3] && (a2 = $i[this.I][t3]), e3.g == Di && this.I >= 0 && t3 == zi && $i[this.I][e3.b] && (a2 = $i[this.I][e3.b]), a2 >= this.aC.length || -1 == this.aC[a2] || i2.push(this.aC[a2]);
            }
          }
        }
        return i2;
      }
      bO() {
        if (this.at) {
          for (let t3 = 0; t3 < this.at.length; ++t3) this.at[t3].K(this);
          this.aL = this.at.concat();
        }
        this.setAnimation(Jn), this.by(true), this.bz(), this.bB(), this.d = true, this.bw(), this.bJ(), this.l && this.v.d && this.v.bz(), this.m && this.v.d && this.v.bz(), this.v && this.v.d && !this.ad && this.v.bH();
      }
      bP() {
        this.a && this.a.type && this.a.id && this.bQ(this.a.type, this.a.id);
      }
      bQ(t3, e3) {
        let i2, r2 = this;
        t3 == hi.ITEM ? i2 = "meta/item/" : t3 == hi.HELM ? i2 = "meta/armor/1/" : t3 == hi.SHOULDER ? i2 = "meta/armor/3/" : t3 == hi.NPC || t3 == hi.HUMANOIDNPC ? i2 = "meta/npc/" : t3 == hi.OBJECT ? i2 = "meta/object/" : t3 == hi.CHARACTER ? i2 = "meta/character/" : t3 == hi.ITEMVISUAL && (i2 = "meta/itemvisual/"), i2 ? (i2 = this.k.contentPath + i2 + e3 + ".json", (function(t4) {
          $.getJSON(i2).done((function(e4) {
            r2.bS(e4, t4);
          })).fail((function(t5, e4, i3) {
            let r3 = e4 + ", " + i3;
            console.log("Model:_load Error loading metadata: " + r3);
          }));
        })(t3)) : t3 == hi.PATH && (this.u || (this.u = {}), i2 = this.k.contentPath + "mo3/" + e3 + ".mo3", $.ajax({
          url: i2,
          type: "GET",
          dataType: "binary",
          responseType: "arraybuffer",
          processData: false,
          renderer: this.aS,
          success: function(t4) {
            r2.bT(t4);
          },
          error: function(t4, e4, i3) {
            console.log(i3);
          }
        }));
      }
      bR(t3, e3, i2) {
        const r2 = Ji[e3];
        if (r2) {
          const e4 = i2 ? 4 : 0;
          return r2.slice(2 * t3 + e4, 2 * t3 + e4 + 2);
        }
      }
      bS(t3, e3) {
        var i2, r2, n2 = this;
        if (e3 || (e3 = n2.a.type), n2.u || (n2.u = t3), e3 == hi.CHARACTER) {
          let e4 = this.c ? this.c : t3.Model;
          n2.n = t3.Race, n2.o = t3.Gender, n2.k.cls && (n2.p = parseInt(n2.k.cls));
          let a2 = n2.k.contentPath + "meta/charactercustomization2/" + t3.Race + "_" + t3.Gender + ".json";
          if ($.getJSON(a2, (function(t4) {
            var e5, i3, r3;
            if (WH.debug("Got customization data v2", t4), n2.F = new Xn(n2, t4), null === (e5 = n2.G) || void 0 === e5 || e5.call(n2, n2.F.b), n2.F.c(), n2.q) n2.setAppearance(n2.q);
            else if (n2.a.type != hi.CHARACTER && n2.u.Race > 0 && (null === (r3 = null === (i3 = n2.u) || void 0 === i3 ? void 0 : i3.Creature) || void 0 === r3 ? void 0 : r3.CreatureCustomizations)) {
              let t5 = n2.F.g(n2.u.Creature.CreatureCustomizations);
              n2.setAppearance(t5);
            } else n2.F.f();
            n2.w && n2.bB();
          })), n2.u.Creature && n2.u.Creature.Texture && (n2.aK = this.bA(-1, gn.a(null, n2.u.TextureFiles[n2.u.Creature.Texture], 3, 0, 0))), n2.bQ(hi.PATH, e4), n2.u.Equipment && n2.bK(n2.u.Equipment), n2.k.items && n2.bK(n2.k.items), n2.k.shouldersOverride && n2.setShouldersOverride(n2.k.shouldersOverride), n2.a.type != hi.CHARACTER && n2.u.Race > 0) {
            if (n2.F && (null === (r2 = null === (i2 = n2.u) || void 0 === i2 ? void 0 : i2.Creature) || void 0 === r2 ? void 0 : r2.CreatureCustomizations)) {
              let t4 = n2.F.g(n2.u.Creature.CreatureCustomizations);
              n2.q = t4;
            }
          } else n2.k.charCustomization && (n2.q = n2.k.charCustomization);
        } else if (e3 == hi.HELM) {
          let e4 = 1, i3 = 0, r3 = 1;
          if (n2.v && (e4 = n2.v.n, i3 = n2.v.o, r3 = n2.v.p), t3.ComponentModels) {
            let a2 = t3.ComponentModels[0];
            a2 && t3.ModelFiles && t3.ModelFiles[a2] && (27 == t3.Item.InventoryType ? n2.bQ(hi.PATH, t3.ModelFiles[a2][0].FileDataId) : (n2.v || t3.ModelFiles[a2].some(((t4) => t4.Race == e4)) || (e4 = t3.ModelFiles[a2][0].Race), n2.bQ(hi.PATH, gn.b(n2, t3.ModelFiles[a2], -1, i3, r3, e4))));
          }
          if (t3.Textures) for (let e5 in t3.Textures) 0 != t3.Textures[e5] && (n2.B[parseInt(e5)] = new an(n2, parseInt(e5), t3.Textures[e5]));
        } else if (e3 == hi.SHOULDER) {
          let e4 = 1, i3 = 0, r3 = 1;
          if (n2.v && (e4 = n2.v.n, i3 = n2.v.o, r3 = n2.v.p), t3.ComponentModels) {
            let a2 = t3.ComponentModels[0], s2 = t3.ComponentModels[1];
            if (1 == n2.a.shoulder || void 0 === n2.a.shoulder && a2) {
              if (a2 && t3.ModelFiles[a2] && n2.bQ(hi.PATH, gn.b(n2, t3.ModelFiles[a2], 0, i3, r3, e4)), t3.Textures) for (let e5 in t3.Textures) 0 != t3.Textures[e5] && (n2.B[+e5] = new an(n2, parseInt(e5), t3.Textures[e5]));
            } else if ((2 == n2.a.shoulder || void 0 === n2.a.shoulder && s2) && (s2 && t3.ModelFiles[s2] && n2.bQ(hi.PATH, gn.b(n2, t3.ModelFiles[s2], 1, i3, r3, e4)), t3.Textures2)) for (let e5 in t3.Textures2) 0 != t3.Textures2[e5] && (n2.B[+e5] = new an(n2, parseInt(e5), t3.Textures2[e5]));
          }
        } else if (e3 == hi.ITEMVISUAL) n2.bQ(hi.PATH, t3.Equipment[n2.b]);
        else if (e3 == hi.ITEM) {
          let e4 = 1, i3 = 0, r3 = 1;
          if (n2.v && (e4 = n2.v.n, i3 = n2.v.o, r3 = n2.v.p), t3.ComponentModels) {
            let a2 = t3.ComponentModels[0];
            a2 && t3.ModelFiles && t3.ModelFiles[a2] && n2.bQ(hi.PATH, gn.b(n2, t3.ModelFiles[a2], -1, i3, r3, e4));
          }
          if (t3.Textures) for (let e5 in t3.Textures) 0 != t3.Textures[e5] && (n2.B[+e5] = new an(n2, parseInt(e5), t3.Textures[e5]));
        } else {
          if (t3.stateKit && this.E.push(new dn(this, t3.stateKit.effects)), t3.Creature && (n2.N = t3.Creature.CreatureGeosetData, n2.O = t3.Creature.CreatureGeosetDataID), t3.Textures) for (let e4 in t3.Textures) 0 != t3.Textures[e4] && (n2.B[+e4] = new an(n2, parseInt(e4), t3.Textures[e4]));
          else if (t3.ComponentTextures && n2.v) {
            let e4 = n2.v.o;
            for (let i3 in t3.ComponentTextures) {
              let r3 = t3.TextureFiles[t3.ComponentTextures[i3]];
              for (let t4 = 0; t4 < r3.length; t4++) {
                let a2 = r3[t4];
                a2.Gender != e4 && 3 != a2.Gender || (n2.B[+i3] = new an(n2, parseInt(i3), a2.FileDataId));
              }
            }
          }
          if (t3.Model) n2.bQ(hi.PATH, t3.Model);
          else if (t3.Race > 0) {
            const e4 = _i[t3.Race] + ui[t3.Gender];
            n2.n = t3.Race, n2.o = t3.Gender, n2.bQ(hi.CHARACTER, e4);
          }
        }
      }
      bT(t3) {
        if (!t3) return void console.error("Bad buffer for DataView");
        let e3 = this, i2 = new Rn(t3);
        if (604210112 != i2.getUint32()) return void console.log("Bad magic value");
        if (i2.getUint32() < 2e3) return void console.log("Bad version");
        e3.aj = i2.getUint32();
        var r2 = i2.getUint32(), n2 = i2.getUint32(), a2 = i2.getUint32(), s2 = i2.getUint32(), o2 = i2.getUint32(), l2 = i2.getUint32(), h2 = i2.getUint32(), u2 = i2.getUint32(), c2 = i2.getUint32(), f2 = i2.getUint32(), d2 = i2.getUint32(), b2 = i2.getUint32(), g2 = i2.getUint32(), _2 = i2.getUint32(), p2 = i2.getUint32(), m2 = i2.getUint32(), v2 = i2.getUint32(), x2 = i2.getUint32(), T2 = i2.getUint32(), w2 = i2.getUint32(), y2 = i2.getUint32(), A2 = i2.getUint32(), E2 = i2.getUint32(), C2 = i2.getUint32(), S2 = i2.getUint32(), M2 = i2.getUint32();
        let k2 = new Uint8Array(t3, i2.position), F2 = null;
        try {
          F2 = (0, Zr.inflate)(k2);
        } catch (t4) {
          return void console.log("Decompression error: " + t4);
        }
        if (F2.length < M2) console.log("Unexpected data size", F2.length, M2);
        else {
          i2 = new Rn(F2.buffer), i2.position = r2;
          var R2, D2 = i2.getInt32();
          if (D2 > 0) {
            e3.ak = new Array(D2);
            for (let t4 = 0; t4 < D2; ++t4) e3.ak[t4] = new ur(i2);
          }
          if (i2.position = n2, (R2 = i2.getInt32()) > 0) {
            e3.al = new Array(R2);
            for (let t4 = 0; t4 < R2; ++t4) e3.al[t4] = i2.getUint16();
          }
          if (i2.position = a2, (R2 = i2.getInt32()) > 0) {
            e3.am = new Array(R2), e3.aX = new Array(R2);
            for (let t4 = 0; t4 < R2; ++t4) e3.am[t4] = i2.getUint32(), e3.aX[t4] = 0;
          }
          i2.position = s2;
          var I2 = i2.getInt32();
          if (I2 > 0) {
            e3.an = new Array(I2);
            for (let t4 = 0; t4 < I2; ++t4) e3.an[t4] = new cr(i2);
          }
          i2.position = o2;
          var U2 = i2.getInt32();
          if (U2 > 0) {
            e3.ao = new Array(U2);
            for (let t4 = 0; t4 < U2; ++t4) e3.ao[t4] = i2.getInt16();
          }
          i2.position = l2;
          var B2 = i2.getInt32();
          if (B2 > 0) {
            e3.ap = new Array(B2);
            for (let t4 = 0; t4 < B2; ++t4) e3.ap[t4] = new Wr(e3, t4, i2);
            this.ai = new Array(B2);
            for (let t4 = 0; t4 < B2; t4++) {
              this.ai[t4] = [];
              for (let i3 = 0; i3 < B2; i3++) e3.ap[i3].e == t4 && this.ai[t4].push(i3);
            }
          }
          i2.position = h2;
          var P2 = i2.getInt32();
          if (P2 > 0) {
            e3.aq = new Array(P2);
            for (let t4 = 0; t4 < P2; ++t4) e3.aq[t4] = i2.getInt16();
          }
          i2.position = u2;
          var z2 = i2.getInt32();
          if (z2 > 0) {
            e3.ar = new Array(z2);
            for (let t4 = 0; t4 < z2; ++t4) e3.ar[t4] = i2.getInt16();
          }
          i2.position = c2;
          var O2 = i2.getInt32();
          if (O2 > 0) {
            e3.as = new Array(O2);
            for (let t4 = 0; t4 < O2; ++t4) e3.as[t4] = new Yr(i2);
          }
          i2.position = f2;
          var N2 = i2.getInt32();
          if (N2 > 0) {
            e3.at = new Array(N2);
            for (let t4 = 0; t4 < N2; ++t4) e3.at[t4] = new nn(i2);
          }
          i2.position = d2;
          var L2 = i2.getInt32();
          if (L2 > 0) {
            e3.au = new Array(L2);
            for (let t4 = 0; t4 < L2; ++t4) e3.au[t4] = i2.getInt16();
          }
          i2.position = b2;
          var H2 = i2.getInt32();
          if (H2 > 0) {
            e3.av = new Array(H2);
            for (let t4 = 0; t4 < H2; ++t4) e3.av[t4] = new Jr(i2);
          }
          i2.position = g2;
          var V2 = i2.getInt32();
          if (V2 > 0) {
            e3.aw = new Array(V2);
            for (let t4 = 0; t4 < V2; ++t4) e3.aw[t4] = new sn(e3, t4, i2);
          }
          i2.position = _2;
          var j2 = i2.getInt32();
          if (j2 > 0) {
            e3.ax = new Array(j2);
            for (let t4 = 0; t4 < j2; ++t4) e3.ax[t4] = i2.getInt16();
          }
          i2.position = p2;
          var G2 = i2.getInt32();
          if (G2 > 0) {
            e3.ay = new Array(G2);
            for (let t4 = 0; t4 < G2; ++t4) e3.ay[t4] = new on(i2);
          }
          i2.position = m2;
          var X2 = i2.getInt32();
          if (X2 > 0) {
            e3.az = new Array(X2);
            for (let t4 = 0; t4 < X2; ++t4) e3.az[t4] = i2.getInt16();
          }
          i2.position = v2;
          var q2 = i2.getInt32();
          if (q2 > 0) {
            e3.aA = new Array(q2);
            for (let t4 = 0; t4 < q2; ++t4) e3.aA[t4] = i2.getInt16();
          }
          i2.position = x2;
          var W2 = i2.getInt32();
          if (W2 > 0) {
            e3.aB = new Array(W2);
            for (let t4 = 0; t4 < W2; ++t4) e3.aB[t4] = new ln(i2);
          }
          i2.position = T2;
          var Y2 = i2.getInt32();
          if (Y2 > 0) {
            e3.aC = new Array(Y2);
            for (let t4 = 0; t4 < Y2; ++t4) e3.aC[t4] = i2.getInt16();
          }
          i2.position = w2;
          var Z2 = i2.getInt32();
          if (Z2 > 0) {
            e3.aD = new Array(Z2);
            for (let t4 = 0; t4 < Z2; ++t4) e3.aD[t4] = new hn(i2);
          }
          i2.position = y2;
          var J2 = i2.getInt32();
          if (J2 > 0) {
            e3.aE = new Array(J2);
            for (let t4 = 0; t4 < J2; ++t4) e3.aE[t4] = new un(i2);
          }
          i2.position = A2;
          var K2 = i2.getInt32();
          if (K2 > 0) {
            e3.aF = new Array(K2);
            for (let t4 = 0; t4 < K2; ++t4) e3.aF[t4] = i2.getInt16();
          }
          i2.position = E2;
          var $2 = i2.getInt32();
          if ($2 > 0) {
            e3.aG = new Array($2);
            for (let t4 = 0; t4 < $2; ++t4) e3.aG[t4] = new kn(e3, i2);
          }
          i2.position = S2;
          var Q2 = i2.getInt32();
          if (Q2 > 0 && S2 > 0) {
            e3.aI = new Array(Q2);
            for (let t4 = 0; t4 < Q2; ++t4) e3.aI[t4] = new Fn(i2);
          }
          i2.position = C2;
          var tt2 = i2.getInt32();
          if (tt2 > 0) {
            e3.aH = new Array(tt2);
            for (let t4 = 0; t4 < tt2; ++t4) e3.aH[t4] = new zn(e3, i2);
          }
          e3.bO();
        }
      }
      bU(t3) {
        var e3 = pr();
        if (mr(e3, t3), this.aG) for (var i2 = 0; i2 < this.aG.length; i2++) this.aG[i2].Z(t3, e3);
        if (this.aH) for (i2 = 0; i2 < this.aH.length; i2++) this.aH[i2].an(t3);
      }
      bV(t3) {
        let e3 = null;
        return this.aC && this.aC.length ? (e3 = t3 < this.aC.length ? this.aB[this.aC[t3]] : this.aB[this.aC[0]], e3) : null;
      }
      bW() {
        const t3 = this;
        if (!t3.d) return;
        t3.Q++;
        let e3 = t3.aS.time - t3.P;
        if (e3 > 0 && (t3.P = t3.aS.time), this.e && this.R.a && this.R.a.b) {
          let i3 = ve();
          const r3 = [4, 119, 233, 242, 348, 526, 527, 544, 545];
          [5, 143, 234, 524, 525, 540, 541, 556, 557].indexOf(this.R.a.b.a) > -1 ? i3 = we(0, -5 * e3 / 1e3, 0) : r3.indexOf(this.R.a.b.a) > -1 && (i3 = we(0, -3 * e3 / 1e3, 0));
          let n3 = je();
          if (ti(n3, i3), this.bU(n3), this.i && this.i.bU(n3), this.aR && this.aR.bU(n3), t3.A) for (let e4 = 0; e4 < t3.A.length; e4++) this.aR.bU(n3);
        }
        if (!this.S && t3.R.a.a > -1) {
          let t4 = e3;
          for (let e4 = 0; e4 < this.aX.length; e4++) this.aX[e4] += t4, this.am[e4] > 0 && (this.aX[e4] %= this.am[e4]);
          this.bX(this.R, t4);
        }
        let i2, r2, n2, a2 = t3.at ? t3.at.length : 0;
        for (let e4 = 0; e4 < a2; ++e4) if (n2 = t3.at[e4], n2.show) {
          i2 = n2.p.f, r2 = n2.p.e;
          for (let e5 = 0; e5 < i2; ++e5) t3.ak[t3.al[r2 + e5]].k = t3.Q;
        }
        t3.aL && t3.aL.sort((function(t4, e4) {
          return t4.b != e4.b ? t4.b - e4.b : t4.meshId - e4.meshId;
        }));
        let s2 = t3.ap.length, o2 = t3.aT;
        if (t3.ap && t3.an) {
          for (let e4 = 0; e4 < s2; ++e4) t3.ap[e4].r = false;
          for (let i3 = 0; i3 < s2; ++i3) t3.ap[i3].C(e3);
          if (t3.ak) {
            let e4, i3, r3, n3, a3 = t3.ak.length, s3 = t3.aO, l2 = t3.aP;
            for (let h2 = 0; h2 < a3; ++h2) {
              if (e4 = t3.ak[h2], e4.k != t3.Q) continue;
              n3 = h2 * 10, o2[n3] = o2[n3 + 1] = o2[n3 + 2] = o2[n3 + 3] = o2[n3 + 4] = o2[n3 + 5] = 0;
              for (let a4 = 0; a4 < 4; ++a4) r3 = e4.g[a4] / 255, r3 > 0 && (i3 = t3.ap[e4.h[a4]], Oe(s3, e4.a, i3.m), lr(l2, e4.b, i3.m), o2[n3 + 0] += s3[0] * r3, o2[n3 + 1] += s3[1] * r3, o2[n3 + 2] += s3[2] * r3, o2[n3 + 3] += l2[0] * r3, o2[n3 + 4] += l2[1] * r3, o2[n3 + 5] += l2[2] * r3);
              e4.i[0] = o2[n3 + 0], e4.i[1] = o2[n3 + 1], e4.i[2] = o2[n3 + 2], e4.j[0] = o2[n3 + 3], e4.j[1] = o2[n3 + 4], e4.j[2] = o2[n3 + 5];
            }
            t3.by(false), t3.ac || (t3.ac = true, t3.bz());
          }
        }
        if (t3.i && t3.i.d) {
          const e4 = t3.i.aB[t3.i.aC[0]], i3 = 1 / t3.i.u.Scale;
          Ae(t3.aN, i3, i3, i3), qe(t3.aM), Je(t3.aM, t3.aM, t3.aN), t3.bs(t3.i.U, t3.i.ap[e4.b].m, e4.c, t3.aM);
        }
        if (t3.j && t3.j.d) {
          const e4 = t3.aB[t3.aC[19]], i3 = t3.k.pet.scale || 0.2 / t3.j.u.Scale;
          Ae(t3.aN, i3, i3, i3), qe(t3.aM), Je(t3.aM, t3.aM, t3.aN);
          const r3 = xe(e4.c);
          Ee(r3, r3, t3.k.pet.offset || we(0, -1.25, 0)), t3.j.bs(t3.U, t3.ap[e4.b].m, r3, t3.aM);
        }
        si[t3.a.id] && !t3.v && (qe(t3.U), Ae(t3.aN, 1, 1, -1), Je(t3.U, t3.U, t3.aN)), t3.w && t3.bI();
      }
      bX(t3, e3) {
        if (t3.a.c += e3, t3.b.a < 0 && !this.T && !t3.d) if (t3.a.b.h > -1) {
          let e4 = 32767 * Math.random(), i3 = 0, r3 = t3.a.a, n3 = this.an[r3];
          for (i3 += n3.d; i3 < e4 && n3.h > -1; ) r3 = n3.h, n3 = this.an[r3], i3 += n3.d;
          t3.b.a = r3, t3.b.b = this.an[r3], t3.b.c = 0;
        } else {
          let e4 = this.an.find(((e5) => e5.a == t3.a.b.a && 0 == e5.b));
          e4 && (t3.b.a = e4.i, t3.b.b = e4, t3.b.c = 0);
        }
        let i2 = t3.a, r2 = t3.b, n2 = i2.b.g - i2.c, a2 = 0, s2 = null;
        if (r2.a > -1 && (s2 = this.an[r2.a], a2 = s2.e), a2 > 0 && n2 < a2 ? (r2.c = qn(a2 - n2, s2.g), t3.c = n2 / a2) : t3.c = 1, i2.c >= i2.b.g) if (r2.a > -1) {
          if (r2.a > -1) for (; 0 == (32 & this.an[r2.a].c) && (64 & this.an[r2.a].c) > 0 && (r2.a = this.an[r2.a].i, r2.b = this.an[r2.a], !(r2.a < 0)); ) ;
          t3.a = r2, t3.b = new Dr(), t3.c = 1;
        } else i2.b.g > 0 && (i2.c = qn(i2.c, i2.b.g));
      }
      bY(t3) {
        var e3 = this;
        if (this.v ? ir(e3.V, this.v.V) : e3.V = er(1, 1, 1, 1), e3.i && e3.i.bY(t3), e3.d) {
          if (e3.j && e3.j.bY(t3), e3.bW(), this.E && this.E.forEach(((e4) => e4.g(t3))), e3.aW = {
            uModelMatrix: e3.U,
            uViewMatrix: e3.aS.viewMatrix,
            uProjMatrix: e3.aS.projMatrix,
            uCameraPos: e3.aS.eye,
            uAmbientColor: e3.W,
            uDiffuseColor: e3.V,
            uPrimaryColor: e3.X,
            uSecondaryColor: e3.Y,
            uLightDir1: e3.Z,
            uLightDir2: e3.aa,
            uLightDir3: e3.ab
          }, e3.aU && e3.aL) for (let i2 = 0; i2 < e3.aL.length; ++i2) e3.aL[i2].show && e3.aL[i2].N(t3);
          if (e3.aG && e3.f) for (let i2 = 0; i2 < e3.aG.length; ++i2) {
            let r2 = e3.aI ? e3.aI[i2] : null;
            e3.aG[i2].X(e3.R, e3.aS.delta, r2), e3.aG[i2].Y(t3);
          }
          if (e3.aH && e3.g) for (let i2 = 0; i2 < e3.aH.length; ++i2) e3.aH[i2].ar(e3.R, e3.aS.delta), e3.aH[i2].av(), e3.aH[i2].aw(t3);
          if (e3.aR && e3.bG(e3.aR, t3), e3.x.forEach(((i2, r2) => {
            if (i2) {
              if (2 == i2.c && 13 == i2.d) {
                if (i2.e == Pi && -1 != e3.H) return;
                if (i2.e == zi && -1 != e3.I) return;
              }
              i2.C(t3);
            }
          })), e3.y.forEach(((e4, i2) => {
            e4 && e4.i && e4.C(t3);
          })), e3.A) for (let i2 = 0; i2 < e3.A.length; i2++) for (let i3 = 0; i3 < e3.A.length; i3++) {
            let r2 = e3.A[i3];
            if (!r2.d) continue;
            let n2 = e3.aC[e3.k.extraModels[i3][1]];
            if (-1 == n2) {
              console.log("invalid extra model attachment", e3.k.extraModels[i3][1]);
              continue;
            }
            let a2 = e3.aB[n2], s2 = e3.k.extraModels[i3][2];
            Ae(e3.aN, s2, s2, s2), qe(e3.aM), Je(e3.aM, e3.aM, e3.aN), Ke(e3.aM, e3.aM, e3.k.extraModels[i3][3]), $e(e3.aM, e3.aM, e3.k.extraModels[i3][4]), Qe(e3.aM, e3.aM, e3.k.extraModels[i3][5]), r2.bs(e3.U, e3.ap[a2.b].m, a2.c, e3.aM), r2.bW(), r2.bY(t3);
          }
          e3.x.forEach(((i2, r2) => {
            i2 && i2.q && e3.bG(i2.q, t3);
          }));
        }
      }
    }
    const $n = Kn, Qn = { 2: "Wowhead", 3: "LolKing", 6: "HeroKing", 7: "DestinyDB" };
    class ta {
      constructor(t3) {
        if (!t3.type || !Qn[t3.type]) throw "Viewer error: Bad viewer type given";
        if (!t3.container) throw "Viewer error: Bad container given";
        if (!t3.aspect) throw "Viewer error: Bad aspect ratio given";
        if (!t3.contentPath) throw "Viewer error: No content path given";
        this.type = t3.type;
        this.container = t3.container;
        this.aspect = parseFloat(t3.aspect);
        this.renderer = null;
        this.options = t3;
        const e3 = this.container.width();
        const i2 = Math.round(e3 / this.aspect);
        this.init(e3, i2);
      }
      destroy() {
        this.renderer && this.renderer.destroy(), this.options = null, this.container = null;
      }
      init(t3, e3) {
        if (void 0 !== typeof window.Uint8Array && void 0 !== typeof window.DataView) try {
          const t4 = document.createElement("canvas");
          if (!(t4.getContext("webgl", { alpha: false }) || t4.getContext("experimental-webgl", { alpha: false }))) return void console.log("viewer init failed");
        } catch (t4) {
          return void console.log("viewer init failed");
        }
        this.mode = 1, this.renderer = new ia(this), this.renderer.resize(t3, e3), this.renderer.init();
      }
      setAdaptiveMode(t3) {
        this.renderer.setAdaptiveMode(t3);
      }
      setZoom(t3) {
        this.renderer.zoom.target = t3;
      }
      setOffset(t3, e3) {
        this.renderer.setTranslation(t3, e3, 0);
      }
      setFullscreen(t3) {
        t3 ? ta.requestFullscreen(this.renderer.canvas[0]) : ta.exitFullscreen();
      }
      method(t3, e3) {
        return void 0 === e3 && (e3 = []), this.renderer ? this.renderer.method(t3, [].concat(e3)) : null;
      }
      option(t3, e3) {
        return void 0 !== e3 && (this.options[t3] = e3), this.options[t3];
      }
      static isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      }
      static requestFullscreen(t3) {
        document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || (t3.requestFullscreen ? t3.requestFullscreen() : t3.webkitRequestFullscreen ? t3.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : t3.mozRequestFullScreen ? t3.mozRequestFullScreen() : t3.msRequestFullscreen && t3.msRequestFullscreen());
      }
      static exitFullscreen() {
        (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) && (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen());
      }
    }
    const ea = ta;
    const ia = class {
      constructor(t3) {
        this.currFrame = 0, this.clearColor = we(0, 0, 0), this.addedCss = false, this.progressShown = false, this.attributeState = new be(), this.onContextMenu = function(t4) {
          return false;
        };
        var e3 = this;
        e3.viewer = t3, e3.options = t3.options, e3.downloads = {}, e3.context = null, e3.width = 0, e3.height = 0, e3.time = 0, e3.delta = 0, e3.models = [], e3.screenshotDataURL = null, e3.makeDataURL = false, e3.screenshotCallback = null, e3.azimuth = 1.5 * Math.PI, e3.zenith = Math.PI / 2, e3.distance = 15, e3.fov = 30, e3.zoom = {
          rateStep: 0.1,
          rateAccelerationDecay: 0.4,
          interpolationRate: 0.3,
          range: [0.3, 4],
          rateCurrent: 0,
          target: 1,
          current: 1
        }, e3.zoom.range = e3.zoom.range.map((function(t4) {
          return Math.log(t4) / Math.log(1 + e3.zoom.rateStep);
        })), e3.translation = we(0, 0, 0), e3.target = we(0, 0, 0), e3.eye = we(0, 0, 0), e3.up = we(0, 0, 1), e3.lookDir = ve(), e3.fullscreen = false, e3.projMatrix = je(), e3.viewMatrix = je(), e3.panningMatrix = je(), e3.viewOffset = ve(), e3.aniFilterExt = null, e3.aniFilterMax = 0, this.addedCss || (this.addedCss = true, $("head"));
      }
      updateProgress() {
        var t3 = this, e3 = 0, i2 = 0;
        for (var r2 in t3.downloads) e3 += t3.downloads[r2].total, i2 += t3.downloads[r2].loaded;
        if (e3 <= 0) t3.progressShown && (t3.progressBg.hide(), t3.progressBar.hide(), t3.progressShown = false);
        else {
          t3.progressShown || (t3.progressBg.show(), t3.progressBar.show(), t3.progressShown = true);
          var n2 = i2 / e3;
          t3.progressBar.width(Math.round(t3.width * n2) + "px");
        }
      }
      destroy() {
        var t3 = this;
        if (t3.stop = true, t3.canvas && (t3.canvas.detach(), t3.progressBg.detach(), t3.progressBar.detach(), t3.canvas.off("mousedown touchstart", t3.onMouseDown).off("DOMMouseScroll", t3.onMouseScroll).off("mousewheel", t3.onMouseWheel).off("dblclick", t3.onDoubleClick).off("contextmenu", t3.onContextMenu), $(window).off("resize", t3.onFullscreen), $(document).off("mouseup touchend", t3.onMouseUp).off("mousemove touchmove", t3.onMouseMove), t3.canvas = t3.progressBg = t3.progressBar = null), t3.context) {
          var e3 = t3.context;
          t3.bgTexture && e3.deleteTexture(t3.bgTexture), t3.bgTexture = null, t3.program && e3.deleteProgram(t3.program), t3.program = null, t3.vb && e3.deleteBuffer(t3.vb), t3.vs && e3.deleteShader(t3.vs), t3.fs && e3.deleteShader(t3.fs), t3.vb = t3.vs = t3.fs = null;
        }
        t3.bgImg && (t3.bgImg = null);
        for (var i2 = 0; i2 < t3.models.length; ++i2) t3.models[i2].ba(), t3.models[i2] = null;
        t3.models = [];
      }
      method(t3, e3) {
        if (this.models.length > 0 && this.models[0]) {
          const i2 = this.models[0][t3];
          return i2 ? i2.apply(this.models[0], e3) : void WH.debug("Unknown viewer method", t3, "args", e3);
        }
      }
      getTime() {
        return window.performance && window.performance.now ? window.performance.now() : Date.now();
      }
      draw(t3) {
        var e3, i2 = this, r2 = i2.context;
        i2.delta = 1e-3 * (t3 - i2.time), i2.time = t3, i2.currFrame++, i2.updateCamera(), r2.bindFramebuffer(r2.FRAMEBUFFER, null), r2.viewport(0, 0, i2.width, i2.height), r2.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], 0), r2.clear(r2.COLOR_BUFFER_BIT | r2.DEPTH_BUFFER_BIT), i2.bgTexture && i2.program && (r2.useProgram(i2.program), r2.activeTexture(r2.TEXTURE0), r2.bindTexture(r2.TEXTURE_2D, i2.bgTexture), r2.uniform1i(i2.uTexture, 0), r2.bindBuffer(r2.ARRAY_BUFFER, i2.vb), r2.bindBuffer(r2.ELEMENT_ARRAY_BUFFER, null), r2.enableVertexAttribArray(i2.aPosition), r2.vertexAttribPointer(i2.aPosition, 2, r2.FLOAT, false, 16, 0), r2.enableVertexAttribArray(i2.aTexCoord), r2.vertexAttribPointer(i2.aTexCoord, 2, r2.FLOAT, false, 16, 8), r2.depthMask(false), r2.disable(r2.CULL_FACE), r2.blendFunc(r2.ONE, r2.ZERO), r2.drawArrays(r2.TRIANGLE_STRIP, 0, 4), r2.blendFunc(r2.SRC_ALPHA, r2.ONE_MINUS_SRC_ALPHA), r2.enable(r2.CULL_FACE), r2.depthMask(true), r2.disableVertexAttribArray(i2.aPosition), r2.disableVertexAttribArray(i2.aTexCoord));
        let n2 = new Array();
        for (e3 = 0; e3 < i2.models.length; ++e3) i2.models[e3].bY(n2);
        n2.sort(((t4, e4) => {
          let i3 = t4.e > 1, r3 = e4.e > 1;
          return i3 > r3 ? 1 : i3 < r3 ? -1 : t4.m != e4.m ? e4.m > t4.m ? -1 : 1 : t4.n > e4.n ? -1 : t4.n < e4.n ? 1 : e4.o != t4.o ? e4.o < t4.o ? 1 : -1 : e4.e != t4.e ? t4.e < e4.e ? -1 : 1 : 0;
        })), r2.viewport(0, 0, i2.width, i2.height), this.attributeState.disableAll(), n2.forEach(((t4) => {
          r2.useProgram(t4.a.program), r2.bindBuffer(r2.ARRAY_BUFFER, t4.c), r2.bindBuffer(r2.ELEMENT_ARRAY_BUFFER, t4.d), this.attributeState.enable(r2, t4.a.attributes), re(t4.a, t4.b), t4.h ? r2.enable(r2.CULL_FACE) : r2.disable(r2.CULL_FACE), t4.i ? r2.frontFace(r2.CCW) : r2.frontFace(r2.CW), this.setBlendMode(r2, t4.e), r2.depthMask(t4.f), r2.drawElements(t4.j, t4.k, r2.UNSIGNED_SHORT, t4.l);
        })), this.attributeState.disableAll();
      }
      setAdaptiveMode(t3) {
        this.addaptiveMode = t3, t3 && $(window).trigger("resize");
      }
      setTranslation(t3, e3, i2) {
        this.translation = we(t3, e3, i2);
      }
      setBlendMode(t3, e3) {
        switch (0 == e3 ? t3.disable(t3.BLEND) : (t3.enable(t3.BLEND), t3.blendEquation(t3.FUNC_ADD)), e3) {
          case 0:
            break;
          case 1:
            t3.blendFuncSeparate(t3.ONE, t3.ZERO, t3.ONE, t3.ONE);
            break;
          case 2:
            t3.blendFuncSeparate(t3.SRC_ALPHA, t3.ONE_MINUS_SRC_ALPHA, t3.ONE, t3.ONE);
            break;
          case 3:
            t3.blendFuncSeparate(t3.SRC_ALPHA, t3.ONE, t3.ONE, t3.ONE);
            break;
          case 4:
            t3.blendFuncSeparate(t3.DST_COLOR, t3.ZERO, t3.ONE, t3.ONE);
            break;
          case 5:
            t3.blendFuncSeparate(t3.DST_COLOR, t3.SRC_COLOR, t3.ONE, t3.ONE);
            break;
          case 6:
            t3.blendFuncSeparate(t3.DST_COLOR, t3.ONE, t3.ONE, t3.ONE);
            break;
          case 10:
            t3.blendFunc(t3.ONE, t3.ONE);
            break;
          case 7:
            t3.blendFuncSeparate(t3.ONE_MINUS_SRC_ALPHA, t3.ONE, t3.ONE, t3.ONE);
            break;
          case 8:
            t3.blendFuncSeparate(t3.ONE_MINUS_SRC_ALPHA, t3.ZERO, t3.ONE, t3.ONE);
            break;
          case 13:
            t3.blendFuncSeparate(t3.ONE, t3.ONE_MINUS_SRC_ALPHA, t3.ONE, t3.ONE);
            break;
          default:
            throw 3735927486;
        }
      }
      updateCamera() {
        var t3 = this;
        t3.zoom.target += t3.zoom.rateCurrent, t3.zoom.rateCurrent *= 1 - t3.zoom.rateAccelerationDecay, t3.zoom.target = -Math.max(Math.min(-t3.zoom.target, t3.zoom.range[1]), t3.zoom.range[0]), t3.zoom.current += (t3.zoom.target - t3.zoom.current) * t3.zoom.interpolationRate;
        var e3 = t3.distance * Math.pow(t3.zoom.rateStep + 0.7, -t3.zoom.current), i2 = t3.azimuth, r2 = t3.zenith;
        1 == t3.up[2] ? (t3.eye[0] = -e3 * Math.sin(r2) * Math.cos(i2) + t3.target[0], t3.eye[1] = -e3 * Math.sin(r2) * Math.sin(i2) + t3.target[1], t3.eye[2] = -e3 * Math.cos(r2) + t3.target[2]) : (t3.eye[0] = -e3 * Math.sin(r2) * Math.cos(i2) + t3.target[0], t3.eye[1] = -e3 * Math.cos(r2) + t3.target[1], t3.eye[2] = -e3 * Math.sin(r2) * Math.sin(i2) + t3.target[2]), Ce(t3.lookDir, t3.target, t3.eye), Ue(t3.lookDir, t3.lookDir), (function(t4, e4, i3, r3) {
          var n2, a2, s2, o2, l2, h2, u2, c2, f2, d2, b2 = e4[0], g2 = e4[1], _2 = e4[2], p2 = r3[0], m2 = r3[1], v2 = r3[2], x2 = i3[0], T2 = i3[1], w2 = i3[2];
          Math.abs(b2 - x2) < pe && Math.abs(g2 - T2) < pe && Math.abs(_2 - w2) < pe ? qe(t4) : (u2 = b2 - x2, c2 = g2 - T2, f2 = _2 - w2, n2 = m2 * (f2 *= d2 = 1 / Math.hypot(u2, c2, f2)) - v2 * (c2 *= d2), a2 = v2 * (u2 *= d2) - p2 * f2, s2 = p2 * c2 - m2 * u2, (d2 = Math.hypot(n2, a2, s2)) ? (n2 *= d2 = 1 / d2, a2 *= d2, s2 *= d2) : (n2 = 0, a2 = 0, s2 = 0), o2 = c2 * s2 - f2 * a2, l2 = f2 * n2 - u2 * s2, h2 = u2 * a2 - c2 * n2, (d2 = Math.hypot(o2, l2, h2)) ? (o2 *= d2 = 1 / d2, l2 *= d2, h2 *= d2) : (o2 = 0, l2 = 0, h2 = 0), t4[0] = n2, t4[1] = o2, t4[2] = u2, t4[3] = 0, t4[4] = a2, t4[5] = l2, t4[6] = c2, t4[7] = 0, t4[8] = s2, t4[9] = h2, t4[10] = f2, t4[11] = 0, t4[12] = -(n2 * b2 + a2 * g2 + s2 * _2), t4[13] = -(o2 * b2 + l2 * g2 + h2 * _2), t4[14] = -(u2 * b2 + c2 * g2 + f2 * _2), t4[15] = 1);
        })(t3.viewMatrix, t3.eye, t3.target, t3.up), qe(t3.panningMatrix), 1 == t3.up[2] ? Ae(t3.viewOffset, t3.translation[0], -t3.translation[1], 0) : Ae(t3.viewOffset, t3.translation[0], 0, t3.translation[1]), Ze(t3.panningMatrix, t3.panningMatrix, t3.viewOffset), Ye(t3.viewMatrix, t3.panningMatrix, t3.viewMatrix);
      }
      init() {
        var t3, e3 = this, i2 = e3.context;
        this.blackPixelTexture = i2.createTexture(), i2.bindTexture(i2.TEXTURE_2D, this.blackPixelTexture), i2.texImage2D(i2.TEXTURE_2D, 0, i2.RGBA, 1, 1, 0, i2.RGBA, i2.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 1])), i2.bindTexture(i2.TEXTURE_2D, null), ni(e3.projMatrix, 0.0174532925 * e3.fov, e3.viewer.aspect, 0.1, 5e3), e3.updateCamera(), i2.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], 0), i2.enable(i2.DEPTH_TEST), i2.depthFunc(i2.LEQUAL), i2.blendFunc(i2.SRC_ALPHA, i2.ONE_MINUS_SRC_ALPHA), i2.enable(i2.BLEND);
        var r2 = null;
        if (2 === e3.viewer.type) r2 = $n;
        if ((e3.options.models || e3.options.items) && r2) {
          var n2 = [].concat(e3.options.models);
          if (n2.length > 0) for (t3 = 0; t3 < n2.length; ++t3) e3.models.push(new r2(e3, e3.options, n2[t3], t3, true, false, false));
        }
        !(function t4() {
          if (!e3.stop) {
            window.requestAnimationFrame(t4);
            var r3 = e3.getTime();
            if (false !== e3.makeDataURL) {
              if (e3.canvas[0].toDataURL) {
                var n3 = e3.clearColor, a2 = e3.bgTexture;
                e3.options.transparent && (e3.bgTexture = null, e3.clearColor = we(0, 0, 0)), e3.draw(r3);
                var s2 = e3.width * e3.height * 4, o2 = new Uint8Array(s2);
                i2.readPixels(0, 0, e3.width, e3.height, i2.RGBA, i2.UNSIGNED_BYTE, o2);
                let t5 = null;
                e3.options.transparent ? (e3.clearColor = we(1, 1, 1), e3.draw(r3), t5 = new Uint8Array(s2), i2.readPixels(0, 0, e3.width, e3.height, i2.RGBA, i2.UNSIGNED_BYTE, t5)) : t5 = o2;
                for (var l2 = new Uint8Array(s2), h2 = 0, u2 = e3.height - 1; u2 >= 0; u2--) for (var c2 = 0; c2 < e3.width; c2++) {
                  var f2 = 4 * (u2 * e3.width + c2), d2 = 255 - (t5[h2 + 0] - o2[h2 + 0]), b2 = o2[h2 + 0], g2 = o2[h2 + 1], _2 = o2[h2 + 2];
                  o2[h2 + 3];
                  l2[f2 + 0] = b2, l2[f2 + 1] = g2, l2[f2 + 2] = _2, l2[f2 + 3] = d2, h2 += 4;
                }
                var p2 = document.createElement("canvas"), m2 = p2.getContext("2d");
                p2.width = e3.width, p2.height = e3.height;
                var v2 = m2.createImageData(e3.width, e3.height);
                v2.data.set(l2), m2.putImageData(v2, 0, 0), e3.screenshotDataURL = p2.toDataURL.apply(p2, e3.makeDataURL), e3.screenshotCallback && (e3.screenshotCallback(), e3.screenshotCallback = null), e3.clearColor = n3, e3.bgTexture = a2;
              }
              e3.makeDataURL = false;
            }
            e3.draw(r3);
          }
        })();
      }
      onDoubleClick(t3) {
        ea.isFullscreen() ? ea.exitFullscreen() : ea.requestFullscreen(this.canvas[0]);
      }
      onFullscreen(t3) {
        let e3 = this;
        if (e3.viewer.container) if (!e3.fullscreen && ea.isFullscreen() || this.addaptiveMode) {
          if (e3.restoreWidth = e3.width, e3.restoreHeight = e3.height, e3.fullscreen = true, ea.isFullscreen()) {
            var i2 = $(window);
            let t4 = window.screen.width || i2.width(), e4 = window.screen.height || i2.height();
            this.onResize(t4, e4, t4 / e4);
          } else if (this.addaptiveMode) {
            var r2 = e3.viewer.container;
            this.onResize(r2.width(), r2.height(), r2.width() / r2.height());
          }
        } else e3.fullscreen && !ea.isFullscreen() && (e3.fullscreen = false, this.onResize(e3.restoreWidth, e3.restoreHeight, e3.viewer.aspect));
      }
      onResize(t3, e3, i2) {
        this.resize(t3, e3), ni(this.projMatrix, 0.0174532925 * this.fov, i2, 0.1, 5e3);
      }
      onMouseDown(t3) {
        let e3 = this;
        3 == t3.which || t3.ctrlKey ? e3.rightMouseDown = true : e3.mouseDown = true, "touchstart" == t3.type ? (e3.mouseX = t3.originalEvent.touches[0].clientX, e3.mouseY = t3.originalEvent.touches[0].clientY) : (e3.mouseX = t3.clientX, e3.mouseY = t3.clientY), $("body").addClass("unselectable");
      }
      onMouseScroll(t3) {
        return this.zoom.rateCurrent += t3.originalEvent.detail > 0 ? 1 : -1, t3.preventDefault(), false;
      }
      onMouseWheel(t3) {
        if (!this.options.wheelEventValidation || this.options.wheelEventValidation.call(this, t3)) return this.zoom.rateCurrent += t3.originalEvent.wheelDelta > 0 ? 1 : -1, t3.preventDefault(), false;
      }
      onMouseUp(t3) {
        let e3 = this;
        (e3.mouseDown || e3.rightMouseDown) && ($("body").removeClass("unselectable"), e3.mouseDown = false, e3.rightMouseDown = false);
      }
      onMouseMove(t3) {
        let e3 = this;
        if ((e3.mouseDown || e3.rightMouseDown) && void 0 !== e3.mouseX) {
          var i2, r2;
          "touchmove" == t3.type ? (t3.preventDefault(), i2 = t3.originalEvent.touches[0].clientX, r2 = t3.originalEvent.touches[0].clientY) : (i2 = t3.clientX, r2 = t3.clientY);
          var n2 = (i2 - e3.mouseX) / e3.width * Math.PI * 2, a2 = (r2 - e3.mouseY) / e3.width * Math.PI * 2;
          if (e3.mouseDown) {
            1 == e3.up[2] ? e3.azimuth -= n2 : e3.azimuth += n2, e3.zenith += a2;
            for (var s2 = 2 * Math.PI; e3.azimuth < 0; ) e3.azimuth += s2;
            for (; e3.azimuth > s2; ) e3.azimuth -= s2;
            e3.zenith < 1e-4 && (e3.zenith = 1e-4), e3.zenith >= Math.PI && (e3.zenith = Math.PI - 1e-4);
          } else e3.translation[0] += n2, e3.translation[1] += a2;
          e3.mouseX = i2, e3.mouseY = r2;
        }
      }
      resize(t3, e3) {
        var i2 = this;
        if (i2.width !== t3 || i2.height !== e3) {
          if (i2.fullscreen || i2.viewer.container.css({
            height: e3 + "px",
            position: "relative"
          }), i2.width = t3, i2.height = e3, i2.canvas) i2.canvas.attr({
            width: t3,
            height: e3
          }), i2.canvas.css({
            width: t3 + "px",
            height: e3 + "px"
          }), i2.context.viewport(0, 0, i2.width, i2.height);
          else {
            if (i2.canvas = $("<canvas/>"), i2.canvas.attr({
              width: t3,
              height: e3
            }), i2.viewer.container.append(i2.canvas), i2.context = i2.canvas[0].getContext("webgl", {
              alpha: true,
              premultipliedAlpha: false
            }) || i2.canvas[0].getContext("experimental-webgl", {
              alpha: true,
              premultipliedAlpha: false
            }), i2.progressBg = $("<div/>", {
              css: {
                display: "none",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "10px",
                borderRadius: "100px"
              }
            }), i2.progressBar = $("<div/>", {
              css: {
                display: "none",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: "10px",
                borderRadius: "100px",
                backgroundColor: "rgb(99 102 241)"
              }
            }), i2.viewer.container.append(i2.progressBg), i2.viewer.container.append(i2.progressBar), !i2.context) return alert("No WebGL support, sorry! You should totally use Chrome."), i2.canvas.detach(), void (i2.canvas = null);
            const r2 = i2.context.getExtension("EXT_texture_filter_anisotropic") || i2.context.getExtension("MOZ_EXT_texture_filter_anisotropic") || i2.context.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            r2 ? (i2.aniFilterExt = r2, i2.aniFilterMax = i2.context.getParameter(r2.MAX_TEXTURE_MAX_ANISOTROPY_EXT), WH.debug("Texture anisotropy enabled", i2.aniFilterMax)) : WH.debug("Texture anisotropy disabled (not supported)"), i2.canvas.on("mousedown touchstart", i2.onMouseDown.bind(i2)).on("DOMMouseScroll", i2.onMouseScroll.bind(i2)).on("mousewheel", i2.onMouseWheel.bind(i2)).on("dblclick", i2.onDoubleClick.bind(i2)).on("contextmenu", i2.onContextMenu.bind(i2)), $(window).on("resize", i2.onFullscreen.bind(i2)), $(document).on("mouseup touchend", i2.onMouseUp.bind(i2)).on("mousemove touchmove", i2.onMouseMove.bind(i2)), i2.onFullscreen(null);
          }
          i2.options.background && i2.loadBackground();
        }
      }
      loadBackground() {
        var t3 = this, e3 = t3.context;
        const i2 = function() {
          t3.vb = e3.createBuffer(), e3.bindBuffer(e3.ARRAY_BUFFER, t3.vb), e3.bufferData(e3.ARRAY_BUFFER, new Float32Array(16), e3.DYNAMIC_DRAW);
          var i3 = t3.compileShader(e3.VERTEX_SHADER, "    attribute vec2 aPosition;    attribute vec2 aTexCoord;        varying vec2 vTexCoord;        void main(void) {        vTexCoord = aTexCoord;        gl_Position = vec4(aPosition, 0, 1);    }    "), r3 = t3.compileShader(e3.FRAGMENT_SHADER, "    precision mediump float;    varying vec2 vTexCoord;        uniform sampler2D uTexture;        void main(void) {        gl_FragColor = texture2D(uTexture, vTexCoord);    }    "), n2 = e3.createProgram();
          e3.attachShader(n2, i3), e3.attachShader(n2, r3), e3.linkProgram(n2), e3.getProgramParameter(n2, e3.LINK_STATUS) ? (t3.vs = i3, t3.fs = r3, t3.program = n2, t3.uTexture = e3.getUniformLocation(n2, "uTexture"), t3.aPosition = e3.getAttribLocation(n2, "aPosition"), t3.aTexCoord = e3.getAttribLocation(n2, "aTexCoord")) : console.error("Error linking shaders");
        }, r2 = function() {
          var i3 = t3.width / t3.bgImg.width, r3 = t3.height / t3.bgImg.height;
          const n2 = [-1, -1, 0, r3, 1, -1, i3, r3, -1, 1, 0, 0, 1, 1, i3, 0];
          e3.bindBuffer(e3.ARRAY_BUFFER, t3.vb), e3.bufferSubData(e3.ARRAY_BUFFER, 0, new Float32Array(n2));
        };
        t3.bgImg ? t3.bgImg.loaded && (t3.vb || i2(), r2()) : (t3.bgImg = new Image(), t3.bgImg.crossOrigin = "", t3.bgImg.onload = function() {
          t3.bgImg.loaded = true, t3.bgTexture = e3.createTexture(), e3.bindTexture(e3.TEXTURE_2D, t3.bgTexture), e3.texImage2D(e3.TEXTURE_2D, 0, e3.RGBA, e3.RGBA, e3.UNSIGNED_BYTE, t3.bgImg), e3.texParameteri(e3.TEXTURE_2D, e3.TEXTURE_MIN_FILTER, e3.LINEAR), t3.vb || i2(), r2();
        }, t3.bgImg.onerror = function() {
          t3.bgImg = null;
        }, t3.bgImg.src = t3.options.contentPath + t3.options.background);
      }
      compileShader(t3, e3) {
        var i2 = this.context, r2 = i2.createShader(t3);
        if (i2.shaderSource(r2, e3), i2.compileShader(r2), !i2.getShaderParameter(r2, i2.COMPILE_STATUS)) throw "Shader compile error: " + i2.getShaderInfoLog(r2);
        return r2;
      }
    };
    let ra = { Types: hi };
    const na = Object.assign(ea, { Tools: _e, WebGL: ia, WEBGL: 1, WOW: 2, FLASH: 2, Wow: ra });
    window.ZamModelViewer = na;
  })();
})();

// setup.js
if (!window.CONTENT_PATH) {
  window.CONTENT_PATH = `/data/`;
}
var WebP = class {
  getImageExtension() {
    return `.webp`;
  }
};
if (!window.WH) {
  window.WH = {};
  window.WH.debug = function(...args) {
    console.log(args);
  };
  window.WH.defaultAnimation = `Stand`;
  window.WH.WebP = new WebP();
  window.WH.Wow = {
    Item: {
      INVENTORY_TYPE_HEAD: 1,
      INVENTORY_TYPE_NECK: 2,
      INVENTORY_TYPE_SHOULDERS: 3,
      INVENTORY_TYPE_SHIRT: 4,
      INVENTORY_TYPE_CHEST: 5,
      INVENTORY_TYPE_WAIST: 6,
      INVENTORY_TYPE_LEGS: 7,
      INVENTORY_TYPE_FEET: 8,
      INVENTORY_TYPE_WRISTS: 9,
      INVENTORY_TYPE_HANDS: 10,
      INVENTORY_TYPE_FINGER: 11,
      INVENTORY_TYPE_TRINKET: 12,
      INVENTORY_TYPE_ONE_HAND: 13,
      INVENTORY_TYPE_SHIELD: 14,
      INVENTORY_TYPE_RANGED: 15,
      INVENTORY_TYPE_BACK: 16,
      INVENTORY_TYPE_TWO_HAND: 17,
      INVENTORY_TYPE_BAG: 18,
      INVENTORY_TYPE_TABARD: 19,
      INVENTORY_TYPE_ROBE: 20,
      INVENTORY_TYPE_MAIN_HAND: 21,
      INVENTORY_TYPE_OFF_HAND: 22,
      INVENTORY_TYPE_HELD_IN_OFF_HAND: 23,
      INVENTORY_TYPE_PROJECTILE: 24,
      INVENTORY_TYPE_THROWN: 25,
      INVENTORY_TYPE_RANGED_RIGHT: 26,
      INVENTORY_TYPE_QUIVER: 27,
      INVENTORY_TYPE_RELIC: 28,
      INVENTORY_TYPE_PROFESSION_TOOL: 29,
      INVENTORY_TYPE_PROFESSION_ACCESSORY: 30
    }
  };
}
var WH2 = window.WH;

// character_modeling.js
var NOT_DISPLAYED_SLOTS = /* @__PURE__ */ new Set([
  2,
  // neck
  11,
  // finger1
  12,
  // finger1
  13,
  // trinket1
  14
  // trinket2
]);
var RACES = {
  1: `human`,
  2: `orc`,
  3: `dwarf`,
  4: `nightelf`,
  5: `scourge`,
  6: `tauren`,
  7: `gnome`,
  8: `troll`,
  10: `bloodelf`,
  11: `draenei`
};
var modelingType = {
  ARMOR: 128,
  CHARACTER: 16,
  COLLECTION: 1024,
  HELM: 2,
  HUMANOIDNPC: 32,
  ITEM: 1,
  ITEMVISUAL: 512,
  NPC: 8,
  OBJECT: 64,
  PATH: 256,
  SHOULDER: 4
};
var characterPart = {
  Face: `face`,
  "Skin Color": `skin`,
  "Hair Style": `hairStyle`,
  "Hair Color": `hairColor`,
  "Facial Hair": `facialStyle`,
  Mustache: `facialStyle`,
  Beard: `facialStyle`,
  Sideburns: `facialStyle`,
  "Face Shape": `facialStyle`,
  Eyebrow: `facialStyle`,
  "Jaw Features": void 0,
  "Face Features": void 0,
  "Skin Type": void 0,
  Ears: `ears`,
  "Fur Color": `furColor`,
  Snout: `snout`,
  Blindfold: void 0,
  Tattoo: void 0,
  "Eye Color": void 0,
  "Tattoo Color": void 0,
  Armbands: void 0,
  "Jewelry Color": void 0,
  Bracelets: void 0,
  Necklace: void 0,
  Earring: void 0,
  "Primary Color": `primaryColor`,
  "Secondary Color Strength": `secondaryColorStrength`,
  "Secondary Color": `secondaryColor`,
  "Horn Color": `hornColor`,
  Horns: `horns`,
  "Body Size": `bodySize`
};
function getCharacterOptions(character, fullOptions) {
  const options = fullOptions?.Options || [];
  const optionsMap = new Map(options.map((e) => [e.Name, e]));
  const missingChoice = [];
  const ret = [];
  for (const prop in characterPart) {
    const part = optionsMap.get(prop);
    if (!part || !part.Choices || part.Choices.length === 0) {
      continue;
    }
    const partKey = characterPart[prop];
    let choiceId;
    if (partKey && character[partKey] !== void 0) {
      const choice = part.Choices?.[character[partKey]];
      choiceId = choice ? choice.Id : void 0;
    }
    if (choiceId === void 0) {
      choiceId = part.Choices[0]?.Id;
      if (partKey && character[partKey] !== void 0) {
        missingChoice.push(partKey);
      }
    }
    if (choiceId !== void 0) {
      ret.push({
        optionId: part.Id,
        choiceId
      });
    }
  }
  if (missingChoice.length > 0) {
    window.WH.debug(`In character: `, character, `the following options are missing`, missingChoice);
  }
  return ret;
}
function optionsFromModel(model, fullOptions) {
  const { race, gender } = model;
  const retGender = gender === 1 ? `female` : `male`;
  const raceToModelId = RACES[race] + retGender;
  const characterItems = model.items ? model.items.filter((e) => Array.isArray(e) && !NOT_DISPLAYED_SLOTS.has(e[0])) : [];
  const options = getCharacterOptions(model, fullOptions);
  const charCustomization = {
    options
  };
  const ret = {
    items: characterItems,
    models: {
      id: raceToModelId,
      type: modelingType.CHARACTER
    }
  };
  if (!model.noCharCustomization) {
    ret.charCustomization = charCustomization;
  }
  return ret;
}
async function getDisplaySlot(item, slot, displayId) {
  if (typeof item !== `number`) {
    throw new Error(`item must be a number`);
  }
  if (typeof slot !== `number`) {
    throw new Error(`slot must be a number`);
  }
  if (typeof displayId !== `number`) {
    throw new Error(`displayId must be a number`);
  }
  try {
    await fetch(`${window.CONTENT_PATH}meta/armor/${slot}/${displayId}.json`).then((response) => response.json());
    return {
      displaySlot: slot,
      displayId
    };
  } catch (e) {
  }
  const retSlot = {
    5: 20,
    // chest
    16: 21,
    // main hand
    18: 22
    // off hand
  }[slot];
  if (!retSlot) {
    window.WH.debug(`Item: ${item} display: ${displayId} or slot: ${slot} not found for `);
    return {
      displaySlot: slot,
      displayId
    };
  }
  return {
    displaySlot: retSlot,
    displayId
  };
}
async function findItemsInEquipments(equipments) {
  const results = await Promise.all(equipments.map(async (equipment) => {
    if (NOT_DISPLAYED_SLOTS.has(equipment.slot)) return null;
    const hasTransmog = equipment.transmog && Object.keys(equipment.transmog).length !== 0;
    const displayedItem = hasTransmog ? equipment.transmog : equipment.item;
    if (!displayedItem) return null;
    const displaySlot = await getDisplaySlot(
      displayedItem.entry,
      equipment.slot,
      displayedItem.displayid
    );
    return [displaySlot.displaySlot, displaySlot.displayId];
  }));
  return results.filter(Boolean);
}
var _optionsCache = /* @__PURE__ */ new Map();
async function findRaceGenderOptions(race, gender) {
  const key = `${race}_${gender}`;
  if (_optionsCache.has(key)) return _optionsCache.get(key);
  const options = await fetch(`${window.CONTENT_PATH}meta/charactercustomization2/${key}.json`).then(
    (response) => response.json()
  );
  const data = options.data || options;
  _optionsCache.set(key, data);
  return data;
}

// wow_model_viewer.js
var WowModelViewer = class extends ZamModelViewer {
  _currentCharacterOptions = 0;
  _characterGender = null;
  _characterRace = null;
  get currentCharacterOptions() {
    return this._currentCharacterOptions;
  }
  set currentCharacterOptions(v) {
    this._currentCharacterOptions = v;
  }
  get characterGender() {
    return this._characterGender;
  }
  set characterGender(v) {
    this._characterGender = v;
  }
  get characterRace() {
    return this._characterRace;
  }
  set characterRace(v) {
    this._characterRace = v;
  }
  /**
   * Returns the list of animation names
   * @returns {Array.<string>}
   */
  getListAnimations() {
    if (!this.renderer?.actors?.[0]?.h?.P?.Q) {
      return [];
    }
    return this.renderer.actors[0].h.P.Q.map((e) => e.l);
  }
  /**
   * Change character distance
   * @param {number} val
   */
  setDistance(val) {
    if (this.renderer) {
      this.renderer.distance = val;
    }
  }
  /**
   * Returns character distance
   * @return {number}
   */
  getDistance() {
    return this.renderer?.distance;
  }
  /**
   * Change the animation
   * @param {string} val
   */
  setAnimation(val) {
    this.renderer?.actors?.[0]?.setAnimation(val);
  }
  /**
   * Play / Pause the animation
   * @param {boolean} val
   */
  setAnimPaused(val) {
    if (val === ``) {
      throw new Error(`Empty value not allowed`);
    }
    this.renderer?.actors?.[0]?.setAnimPaused(val);
  }
  /**
   * Set azimuth value this value is the angle to the azimuth based on PI
   * @param {number} val
   */
  setAzimuth(val) {
    if (this.renderer) {
      this.renderer.azimuth = val;
    }
  }
  /**
   * Set zenith value this value is the angle to the azimuth based on PI
   * @param {number} val
   */
  setZenith(val) {
    if (this.renderer) {
      this.renderer.zenith = val;
    }
  }
  /**
   * Returns azimuth value this value is the angle to the azimuth based on PI
   * @return {number}
   */
  getAzimuth() {
    return this.renderer?.azimuth ?? 0;
  }
  /**
   * Returns zenith value this value is the angle to the azimuth based on PI
   * @return {number}
   */
  getZenith() {
    return this.renderer?.zenith ?? 0;
  }
  /**
   * This methode is based on `updateViewer` from Paperdoll.js (https://wow.zamimg.com/js/Paperdoll.js?3ee7ec5121)
   *
   * @param slot {number}: Item slot number
   * @param displayId {number}: Item display id
   * @param enchant {number}: Enchant (experimental not tested)
   */
  updateItemViewer(slot, displayId, enchant) {
    const s = window.WH.Wow.Item;
    if (slot === s.INVENTORY_TYPE_SHOULDERS) {
    }
    const a = slot === s.INVENTORY_TYPE_ROBE ? s.INVENTORY_TYPE_CHEST : slot;
    window.WH.debug(`Clearing model viewer slot:`, a.toString());
    this.method(`clearSlots`, slot.toString());
    if (displayId) {
      window.WH.debug(`Attaching to model viewer slot:`, slot.toString(), `Display ID:`, displayId, `Enchant Visual:`, enchant);
      this.method(`setItems`, [[{
        slot,
        display: displayId,
        visual: enchant || 0
      }]]);
    }
  }
  setNewAppearance(options) {
    if (!this.currentCharacterOptions) {
      throw Error(`Character options are not set`);
    }
    const characterOptions = getCharacterOptions(options, this.currentCharacterOptions);
    const race = this.characterRace;
    const gender = this.characterGender;
    this.method(`setAppearance`, { race, gender, options: characterOptions });
  }
};

// profile.js
var marks = {};
var timers = {};
var _observer = null;
function mark(name) {
  marks[name] = performance.now();
  window.WH?.debug(`[TIMING] ${name}`);
}
function start(name) {
  timers[name] = performance.now();
}
function end(name) {
  if (!timers[name]) return;
  const elapsed = (performance.now() - timers[name]).toFixed(1);
  window.WH?.debug(`[TIMING] ${name}: ${elapsed}ms`);
  delete timers[name];
  return parseFloat(elapsed);
}
function summary() {
  const entries = Object.entries(marks).sort((a, b) => a[1] - b[1]).map(([name, time], i, arr) => {
    const fromStart = (time - arr[0][1]).toFixed(1);
    const fromPrev = i > 0 ? (time - arr[i - 1][1]).toFixed(1) : "0.0";
    return `${name}: +${fromStart}ms (step ${fromPrev}ms)`;
  });
  window.WH?.debug(`[TIMING] === PROFILE SUMMARY ===`);
  entries.forEach((e) => window.WH?.debug(`[TIMING] ${e}`));
  window.WH?.debug(`[TIMING] ====================`);
}
function initNetMonitor() {
  if (_observer) return;
  if (typeof PerformanceObserver === "undefined") return;
  _observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const url = entry.name.replace(/^.*\/data\//, "data/");
      const size = entry.transferSize > 0 ? ` ${Math.round(entry.transferSize / 1024)}KB` : "";
      window.WH?.debug(`[NET] ${entry.initiatorType}: ${url} = ${entry.duration.toFixed(1)}ms${size}`);
    }
  });
  try {
    _observer.observe({ type: "resource", buffered: true });
    window.WH?.debug(`[TIMING] Network monitor started`);
  } catch (e) {
    window.WH?.debug(`[TIMING] Resource Timing API not available`);
  }
}
function netSummary() {
  if (typeof performance.getEntriesByType !== "function") return;
  const resources = performance.getEntriesByType("resource").filter((e) => e.name.includes("/data/") && e.transferSize > 0).sort((a, b) => b.duration - a.duration);
  window.WH?.debug(`[NET] === SLOWEST REQUESTS ===`);
  let totalSize = 0;
  for (const r of resources.slice(0, 20)) {
    const url = r.name.replace(/^.*\/data\//, "data/");
    const size = Math.round(r.transferSize / 1024);
    totalSize += r.transferSize;
    window.WH?.debug(`[NET] ${url}: ${r.duration.toFixed(1)}ms (${size}KB) [${r.initiatorType}]`);
  }
  window.WH?.debug(`[NET] Total: ${resources.length} requests, ${Math.round(totalSize / 1024)}KB`);
  window.WH?.debug(`[NET] ========================`);
}
function monitorDraw() {
  const WebGL = window.ZamModelViewer?.WebGL;
  if (!WebGL || WebGL.prototype.__monitored) return;
  WebGL.prototype.__monitored = true;
  const orig = WebGL.prototype.draw;
  WebGL.prototype.draw = function(t) {
    const s = performance.now();
    orig.call(this, t);
    const elapsed = performance.now() - s;
    if (this.currFrame <= 10 || elapsed > 30) {
      window.WH?.debug(`[DRAW] frame ${this.currFrame}: ${elapsed.toFixed(1)}ms`);
    }
  };
  window.WH?.debug("[TIMING] draw() monitor installed");
}

// mo3-cache.js
var _cache = /* @__PURE__ */ new Map();
function patchAjax() {
  if (typeof jQuery === "undefined") return false;
  if (jQuery._mo3Patched) return true;
  jQuery._mo3Patched = true;
  const _orig = jQuery.ajax;
  jQuery.ajax = function(opts) {
    if (typeof opts === "string") opts = { url: opts };
    const url = opts.url || "";
    if (url.includes(".mo3") && _cache.has(url)) {
      const data = _cache.get(url);
      window.WH?.debug(`[MO3-CACHE] HIT: ${url.replace(/^.*\/mo3\//, "mo3/")} (${(data.byteLength / 1024).toFixed(0)}KB)`);
      queueMicrotask(() => {
        opts.success?.(data);
        opts.complete?.(data, "success");
      });
      const xhr = { readyState: 4, status: 200, response: data, responseText: null };
      return xhr;
    }
    return _orig.apply(this, arguments);
  };
  window.WH?.debug("[MO3-CACHE] $.ajax patched");
  return true;
}
async function preload(ids) {
  patchAjax();
  const base = window.CONTENT_PATH || "/data/";
  const toFetch = ids.filter((id) => !_cache.has(base + "mo3/" + id + ".mo3"));
  if (toFetch.length === 0) {
    window.WH?.debug(`[MO3-CACHE] All ${ids.length} MO3 files already cached`);
    return;
  }
  window.WH?.debug(`[MO3-CACHE] Preloading ${toFetch.length} MO3 files...`);
  const results = await Promise.allSettled(
    toFetch.map(async (id) => {
      const url = base + "mo3/" + id + ".mo3";
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${url}`);
      const buf = await resp.arrayBuffer();
      _cache.set(url, buf);
      return { id, size: buf.byteLength };
    })
  );
  const ok = results.filter((r) => r.status === "fulfilled").length;
  const totalSize = results.filter((r) => r.status === "fulfilled").reduce((s, r) => s + r.value.size, 0);
  window.WH?.debug(`[MO3-CACHE] Preloaded ${ok}/${toFetch.length} MO3 files (${(totalSize / 1024 / 1024).toFixed(1)}MB)`);
  for (const r of results) {
    if (r.status === "rejected") window.WH?.debug(`[MO3-CACHE] Failed: ${r.reason}`);
  }
}
function clear() {
  _cache.clear();
}

// index.js
async function generateModels(aspect, containerSelector, model) {
  initNetMonitor();
  mark(`generateModels start`);
  let modelOptions;
  let fullOptions;
  if (model.id && model.type) {
    const { id, type } = model;
    modelOptions = { models: { id, type } };
  } else {
    const { race, gender } = model;
    start(`findRaceGenderOptions`);
    fullOptions = await findRaceGenderOptions(
      race,
      gender
    );
    end(`findRaceGenderOptions`);
    start(`optionsFromModel`);
    modelOptions = optionsFromModel(model, fullOptions);
    end(`optionsFromModel`);
  }
  modelOptions = {
    hd: true,
    ...modelOptions
  };
  const models = {
    type: 2,
    contentPath: window.CONTENT_PATH,
    // eslint-disable-next-line no-undef
    container: jQuery(containerSelector),
    aspect,
    ...modelOptions,
    ...model?.hideProgressBar ? { hideProgressBar: true } : {}
  };
  window.WH?.debug(`Creating viewer with options`, models);
  mark(`new WowModelViewer()`);
  start(`WowModelViewer constructor + loading`);
  const wowModelViewer = await new WowModelViewer(models);
  monitorDraw();
  if (models.hideProgressBar && wowModelViewer.renderer) {
    const r = wowModelViewer.renderer;
    r.updateProgress = function() {
      this.progressBg?.hide();
      this.progressBar?.hide();
      this.progressShown = false;
    };
    r.updateProgress();
  }
  if (fullOptions) {
    wowModelViewer.currentCharacterOptions = fullOptions;
    wowModelViewer.characterGender = model.gender;
    wowModelViewer.characterRace = model.race;
  }
  mark(`generateModels end`);
  const renderer = wowModelViewer.renderer;
  const checkDownloads = () => {
    const downloads = renderer.downloads || {};
    const pending = Object.values(downloads).filter((d) => d.total > d.loaded);
    if (pending.length === 0) {
      window.WH?.debug(`[TIMING] All engine downloads complete`);
      summary();
      setTimeout(() => netSummary(), 500);
      let frames = 0;
      const waitFrame = () => {
        if (++frames >= 2) {
          model?.onReady?.();
          return;
        }
        requestAnimationFrame(waitFrame);
      };
      requestAnimationFrame(waitFrame);
    } else {
      setTimeout(checkDownloads, 100);
    }
  };
  setTimeout(checkDownloads, 100);
  return wowModelViewer;
}
export {
  clear,
  findItemsInEquipments,
  findRaceGenderOptions,
  generateModels,
  getDisplaySlot,
  modelingType,
  patchAjax,
  preload
};
