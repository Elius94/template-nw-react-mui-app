var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/restructure/dist/main.cjs
var require_main = __commonJS({
  "node_modules/restructure/dist/main.cjs"(exports2, module2) {
    function $parcel$export(e, n, v, s) {
      Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
    }
    function $parcel$exportWildcard(dest, source) {
      Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) {
          return;
        }
        Object.defineProperty(dest, key, {
          enumerable: true,
          get: function get() {
            return source[key];
          }
        });
      });
      return dest;
    }
    $parcel$export(module2.exports, "EncodeStream", () => $1ed46182c1410e1d$export$9b4f661deaa36c3e);
    $parcel$export(module2.exports, "DecodeStream", () => $8ae20583b93e4933$export$c18b354bac7948e9);
    $parcel$export(module2.exports, "Array", () => $8ea28a08eae2a116$export$c4be6576ca6fe4aa);
    $parcel$export(module2.exports, "LazyArray", () => $444f112d3cbc7e9f$export$5576c026028d4983);
    $parcel$export(module2.exports, "Bitfield", () => $3def237a34a226b5$export$96b43b8a49f688ea);
    $parcel$export(module2.exports, "Boolean", () => $8415e91bb83faf74$export$ff887cefee4d61ec);
    $parcel$export(module2.exports, "Buffer", () => $08d28604119af47e$export$7d22a0eea6656474);
    $parcel$export(module2.exports, "Enum", () => $070ce31ea947467f$export$deb82508dd66d288);
    $parcel$export(module2.exports, "Optional", () => $80703542fcfb6ff0$export$7acb7b24c478f9c6);
    $parcel$export(module2.exports, "Reserved", () => $f4fd49878232508a$export$da9b5fe187a9aa1);
    $parcel$export(module2.exports, "String", () => $d8705cd4022e7dcf$export$89b8e0fa65f6a914);
    $parcel$export(module2.exports, "Struct", () => $aa8b66bae6abe658$export$eabc71f011df675a);
    $parcel$export(module2.exports, "VersionedStruct", () => $fcb208a95f6d048b$export$95a8b60f4da7dec8);
    var $8ae20583b93e4933$var$ENCODING_MAPPING = {
      utf16le: "utf-16le",
      ucs2: "utf-16le",
      utf16be: "utf-16be"
    };
    var $8ae20583b93e4933$export$c18b354bac7948e9 = class {
      constructor(buffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        this.pos = 0;
        this.length = this.buffer.length;
      }
      readString(length, encoding = "ascii") {
        encoding = $8ae20583b93e4933$var$ENCODING_MAPPING[encoding] || encoding;
        let buf = this.readBuffer(length);
        try {
          let decoder = new TextDecoder(encoding);
          return decoder.decode(buf);
        } catch (err) {
          return buf;
        }
      }
      readBuffer(length) {
        return this.buffer.slice(this.pos, this.pos += length);
      }
      readUInt24BE() {
        return (this.readUInt16BE() << 8) + this.readUInt8();
      }
      readUInt24LE() {
        return this.readUInt16LE() + (this.readUInt8() << 16);
      }
      readInt24BE() {
        return (this.readInt16BE() << 8) + this.readUInt8();
      }
      readInt24LE() {
        return this.readUInt16LE() + (this.readInt8() << 16);
      }
    };
    $8ae20583b93e4933$export$c18b354bac7948e9.TYPES = {
      UInt8: 1,
      UInt16: 2,
      UInt24: 3,
      UInt32: 4,
      Int8: 1,
      Int16: 2,
      Int24: 3,
      Int32: 4,
      Float: 4,
      Double: 8
    };
    for (let key of Object.getOwnPropertyNames(DataView.prototype))
      if (key.slice(0, 3) === "get") {
        let type = key.slice(3).replace("Ui", "UI");
        if (type === "Float32")
          type = "Float";
        else if (type === "Float64")
          type = "Double";
        let bytes = $8ae20583b93e4933$export$c18b354bac7948e9.TYPES[type];
        $8ae20583b93e4933$export$c18b354bac7948e9.prototype["read" + type + (bytes === 1 ? "" : "BE")] = function() {
          const ret = this.view[key](this.pos, false);
          this.pos += bytes;
          return ret;
        };
        if (bytes !== 1)
          $8ae20583b93e4933$export$c18b354bac7948e9.prototype["read" + type + "LE"] = function() {
            const ret = this.view[key](this.pos, true);
            this.pos += bytes;
            return ret;
          };
      }
    var $1ed46182c1410e1d$var$textEncoder = new TextEncoder();
    var $1ed46182c1410e1d$var$isBigEndian = new Uint8Array(new Uint16Array([
      4660
    ]).buffer)[0] == 18;
    var $1ed46182c1410e1d$export$9b4f661deaa36c3e = class {
      constructor(buffer) {
        this.buffer = buffer;
        this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
        this.pos = 0;
      }
      writeBuffer(buffer) {
        this.buffer.set(buffer, this.pos);
        this.pos += buffer.length;
      }
      writeString(string, encoding = "ascii") {
        let buf;
        switch (encoding) {
          case "utf16le":
          case "utf16-le":
          case "ucs2":
            buf = $1ed46182c1410e1d$var$stringToUtf16(string, $1ed46182c1410e1d$var$isBigEndian);
            break;
          case "utf16be":
          case "utf16-be":
            buf = $1ed46182c1410e1d$var$stringToUtf16(string, !$1ed46182c1410e1d$var$isBigEndian);
            break;
          case "utf8":
            buf = $1ed46182c1410e1d$var$textEncoder.encode(string);
            break;
          case "ascii":
            buf = $1ed46182c1410e1d$var$stringToAscii(string);
            break;
          default:
            throw new Error(`Unsupported encoding: ${encoding}`);
        }
        this.writeBuffer(buf);
      }
      writeUInt24BE(val) {
        this.buffer[this.pos++] = val >>> 16 & 255;
        this.buffer[this.pos++] = val >>> 8 & 255;
        this.buffer[this.pos++] = val & 255;
      }
      writeUInt24LE(val) {
        this.buffer[this.pos++] = val & 255;
        this.buffer[this.pos++] = val >>> 8 & 255;
        this.buffer[this.pos++] = val >>> 16 & 255;
      }
      writeInt24BE(val) {
        if (val >= 0)
          this.writeUInt24BE(val);
        else
          this.writeUInt24BE(val + 16777215 + 1);
      }
      writeInt24LE(val) {
        if (val >= 0)
          this.writeUInt24LE(val);
        else
          this.writeUInt24LE(val + 16777215 + 1);
      }
      fill(val, length) {
        if (length < this.buffer.length) {
          this.buffer.fill(val, this.pos, this.pos + length);
          this.pos += length;
        } else {
          const buf = new Uint8Array(length);
          buf.fill(val);
          this.writeBuffer(buf);
        }
      }
    };
    function $1ed46182c1410e1d$var$stringToUtf16(string, swap) {
      let buf = new Uint16Array(string.length);
      for (let i = 0; i < string.length; i++) {
        let code = string.charCodeAt(i);
        if (swap)
          code = code >> 8 | (code & 255) << 8;
        buf[i] = code;
      }
      return new Uint8Array(buf.buffer);
    }
    function $1ed46182c1410e1d$var$stringToAscii(string) {
      let buf = new Uint8Array(string.length);
      for (let i = 0; i < string.length; i++)
        buf[i] = string.charCodeAt(i);
      return buf;
    }
    for (let key of Object.getOwnPropertyNames(DataView.prototype))
      if (key.slice(0, 3) === "set") {
        let type = key.slice(3).replace("Ui", "UI");
        if (type === "Float32")
          type = "Float";
        else if (type === "Float64")
          type = "Double";
        let bytes = (0, $8ae20583b93e4933$export$c18b354bac7948e9).TYPES[type];
        $1ed46182c1410e1d$export$9b4f661deaa36c3e.prototype["write" + type + (bytes === 1 ? "" : "BE")] = function(value) {
          this.view[key](this.pos, value, false);
          this.pos += bytes;
        };
        if (bytes !== 1)
          $1ed46182c1410e1d$export$9b4f661deaa36c3e.prototype["write" + type + "LE"] = function(value) {
            this.view[key](this.pos, value, true);
            this.pos += bytes;
          };
      }
    var $8d21f7fa58802901$export$ef88aa0d34c34520 = class {
      fromBuffer(buffer) {
        let stream = new (0, $8ae20583b93e4933$export$c18b354bac7948e9)(buffer);
        return this.decode(stream);
      }
      toBuffer(value) {
        let size = this.size(value);
        let buffer = new Uint8Array(size);
        let stream = new (0, $1ed46182c1410e1d$export$9b4f661deaa36c3e)(buffer);
        this.encode(stream, value);
        return buffer;
      }
    };
    var $af65abf7bf65ac42$exports = {};
    $parcel$export($af65abf7bf65ac42$exports, "Number", () => $af65abf7bf65ac42$export$fffa67e515d04022);
    $parcel$export($af65abf7bf65ac42$exports, "uint8", () => $af65abf7bf65ac42$export$52e103c63c4e68cf);
    $parcel$export($af65abf7bf65ac42$exports, "uint16be", () => $af65abf7bf65ac42$export$60dfe43c8297a8f8);
    $parcel$export($af65abf7bf65ac42$exports, "uint16", () => $af65abf7bf65ac42$export$56bd24b5a3ee8456);
    $parcel$export($af65abf7bf65ac42$exports, "uint16le", () => $af65abf7bf65ac42$export$b92d76f0ca6d1789);
    $parcel$export($af65abf7bf65ac42$exports, "uint24be", () => $af65abf7bf65ac42$export$255f45171f96b50c);
    $parcel$export($af65abf7bf65ac42$exports, "uint24", () => $af65abf7bf65ac42$export$1925298fbd719b21);
    $parcel$export($af65abf7bf65ac42$exports, "uint24le", () => $af65abf7bf65ac42$export$758e1dafc8dc7271);
    $parcel$export($af65abf7bf65ac42$exports, "uint32be", () => $af65abf7bf65ac42$export$74c16dba6c885532);
    $parcel$export($af65abf7bf65ac42$exports, "uint32", () => $af65abf7bf65ac42$export$de9ffb9418dd7d0d);
    $parcel$export($af65abf7bf65ac42$exports, "uint32le", () => $af65abf7bf65ac42$export$5f744bb30a534bc9);
    $parcel$export($af65abf7bf65ac42$exports, "int8", () => $af65abf7bf65ac42$export$5984f25eab09961f);
    $parcel$export($af65abf7bf65ac42$exports, "int16be", () => $af65abf7bf65ac42$export$198ae7d10d26a900);
    $parcel$export($af65abf7bf65ac42$exports, "int16", () => $af65abf7bf65ac42$export$c35c15c7caeff2b6);
    $parcel$export($af65abf7bf65ac42$exports, "int16le", () => $af65abf7bf65ac42$export$399cc4b7169e5aed);
    $parcel$export($af65abf7bf65ac42$exports, "int24be", () => $af65abf7bf65ac42$export$3676d1f71eca2ec0);
    $parcel$export($af65abf7bf65ac42$exports, "int24", () => $af65abf7bf65ac42$export$73f695d681ac61f9);
    $parcel$export($af65abf7bf65ac42$exports, "int24le", () => $af65abf7bf65ac42$export$671f8672dbd40a4);
    $parcel$export($af65abf7bf65ac42$exports, "int32be", () => $af65abf7bf65ac42$export$78a2ac3d09dd42d5);
    $parcel$export($af65abf7bf65ac42$exports, "int32", () => $af65abf7bf65ac42$export$1d95835383bb05a);
    $parcel$export($af65abf7bf65ac42$exports, "int32le", () => $af65abf7bf65ac42$export$5ec1f146e759329a);
    $parcel$export($af65abf7bf65ac42$exports, "floatbe", () => $af65abf7bf65ac42$export$92b5c14c6abb5c97);
    $parcel$export($af65abf7bf65ac42$exports, "float", () => $af65abf7bf65ac42$export$6b5cd3983e3ee5ab);
    $parcel$export($af65abf7bf65ac42$exports, "floatle", () => $af65abf7bf65ac42$export$6d20592bc4cb19d9);
    $parcel$export($af65abf7bf65ac42$exports, "doublebe", () => $af65abf7bf65ac42$export$e50b9e97e4d43631);
    $parcel$export($af65abf7bf65ac42$exports, "double", () => $af65abf7bf65ac42$export$7b3cbda67be88f5f);
    $parcel$export($af65abf7bf65ac42$exports, "doublele", () => $af65abf7bf65ac42$export$6f53315aa512b751);
    $parcel$export($af65abf7bf65ac42$exports, "Fixed", () => $af65abf7bf65ac42$export$13475bbd2a37a9b4);
    $parcel$export($af65abf7bf65ac42$exports, "fixed16be", () => $af65abf7bf65ac42$export$f87b441e6bd90278);
    $parcel$export($af65abf7bf65ac42$exports, "fixed16", () => $af65abf7bf65ac42$export$a3abada75ef55921);
    $parcel$export($af65abf7bf65ac42$exports, "fixed16le", () => $af65abf7bf65ac42$export$3752a2886837dc22);
    $parcel$export($af65abf7bf65ac42$exports, "fixed32be", () => $af65abf7bf65ac42$export$dd71d8d9bc792632);
    $parcel$export($af65abf7bf65ac42$exports, "fixed32", () => $af65abf7bf65ac42$export$e913265d48471f2d);
    $parcel$export($af65abf7bf65ac42$exports, "fixed32le", () => $af65abf7bf65ac42$export$7fc47db6a5fc8223);
    var $af65abf7bf65ac42$export$fffa67e515d04022 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type, endian = "BE") {
        super();
        this.type = type;
        this.endian = endian;
        this.fn = this.type;
        if (this.type[this.type.length - 1] !== "8")
          this.fn += this.endian;
      }
      size() {
        return (0, $8ae20583b93e4933$export$c18b354bac7948e9).TYPES[this.type];
      }
      decode(stream) {
        return stream[`read${this.fn}`]();
      }
      encode(stream, val) {
        return stream[`write${this.fn}`](val);
      }
    };
    var $af65abf7bf65ac42$export$52e103c63c4e68cf = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt8");
    var $af65abf7bf65ac42$export$60dfe43c8297a8f8 = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt16", "BE");
    var $af65abf7bf65ac42$export$56bd24b5a3ee8456 = $af65abf7bf65ac42$export$60dfe43c8297a8f8;
    var $af65abf7bf65ac42$export$b92d76f0ca6d1789 = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt16", "LE");
    var $af65abf7bf65ac42$export$255f45171f96b50c = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt24", "BE");
    var $af65abf7bf65ac42$export$1925298fbd719b21 = $af65abf7bf65ac42$export$255f45171f96b50c;
    var $af65abf7bf65ac42$export$758e1dafc8dc7271 = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt24", "LE");
    var $af65abf7bf65ac42$export$74c16dba6c885532 = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt32", "BE");
    var $af65abf7bf65ac42$export$de9ffb9418dd7d0d = $af65abf7bf65ac42$export$74c16dba6c885532;
    var $af65abf7bf65ac42$export$5f744bb30a534bc9 = new $af65abf7bf65ac42$export$fffa67e515d04022("UInt32", "LE");
    var $af65abf7bf65ac42$export$5984f25eab09961f = new $af65abf7bf65ac42$export$fffa67e515d04022("Int8");
    var $af65abf7bf65ac42$export$198ae7d10d26a900 = new $af65abf7bf65ac42$export$fffa67e515d04022("Int16", "BE");
    var $af65abf7bf65ac42$export$c35c15c7caeff2b6 = $af65abf7bf65ac42$export$198ae7d10d26a900;
    var $af65abf7bf65ac42$export$399cc4b7169e5aed = new $af65abf7bf65ac42$export$fffa67e515d04022("Int16", "LE");
    var $af65abf7bf65ac42$export$3676d1f71eca2ec0 = new $af65abf7bf65ac42$export$fffa67e515d04022("Int24", "BE");
    var $af65abf7bf65ac42$export$73f695d681ac61f9 = $af65abf7bf65ac42$export$3676d1f71eca2ec0;
    var $af65abf7bf65ac42$export$671f8672dbd40a4 = new $af65abf7bf65ac42$export$fffa67e515d04022("Int24", "LE");
    var $af65abf7bf65ac42$export$78a2ac3d09dd42d5 = new $af65abf7bf65ac42$export$fffa67e515d04022("Int32", "BE");
    var $af65abf7bf65ac42$export$1d95835383bb05a = $af65abf7bf65ac42$export$78a2ac3d09dd42d5;
    var $af65abf7bf65ac42$export$5ec1f146e759329a = new $af65abf7bf65ac42$export$fffa67e515d04022("Int32", "LE");
    var $af65abf7bf65ac42$export$92b5c14c6abb5c97 = new $af65abf7bf65ac42$export$fffa67e515d04022("Float", "BE");
    var $af65abf7bf65ac42$export$6b5cd3983e3ee5ab = $af65abf7bf65ac42$export$92b5c14c6abb5c97;
    var $af65abf7bf65ac42$export$6d20592bc4cb19d9 = new $af65abf7bf65ac42$export$fffa67e515d04022("Float", "LE");
    var $af65abf7bf65ac42$export$e50b9e97e4d43631 = new $af65abf7bf65ac42$export$fffa67e515d04022("Double", "BE");
    var $af65abf7bf65ac42$export$7b3cbda67be88f5f = $af65abf7bf65ac42$export$e50b9e97e4d43631;
    var $af65abf7bf65ac42$export$6f53315aa512b751 = new $af65abf7bf65ac42$export$fffa67e515d04022("Double", "LE");
    var $af65abf7bf65ac42$export$13475bbd2a37a9b4 = class extends $af65abf7bf65ac42$export$fffa67e515d04022 {
      constructor(size, endian, fracBits = size >> 1) {
        super(`Int${size}`, endian);
        this._point = 1 << fracBits;
      }
      decode(stream) {
        return super.decode(stream) / this._point;
      }
      encode(stream, val) {
        return super.encode(stream, val * this._point | 0);
      }
    };
    var $af65abf7bf65ac42$export$f87b441e6bd90278 = new $af65abf7bf65ac42$export$13475bbd2a37a9b4(16, "BE");
    var $af65abf7bf65ac42$export$a3abada75ef55921 = $af65abf7bf65ac42$export$f87b441e6bd90278;
    var $af65abf7bf65ac42$export$3752a2886837dc22 = new $af65abf7bf65ac42$export$13475bbd2a37a9b4(16, "LE");
    var $af65abf7bf65ac42$export$dd71d8d9bc792632 = new $af65abf7bf65ac42$export$13475bbd2a37a9b4(32, "BE");
    var $af65abf7bf65ac42$export$e913265d48471f2d = $af65abf7bf65ac42$export$dd71d8d9bc792632;
    var $af65abf7bf65ac42$export$7fc47db6a5fc8223 = new $af65abf7bf65ac42$export$13475bbd2a37a9b4(32, "LE");
    var $4559ecf940edc78d$exports = {};
    $parcel$export($4559ecf940edc78d$exports, "resolveLength", () => $4559ecf940edc78d$export$83b6dc3503c1fda6);
    $parcel$export($4559ecf940edc78d$exports, "PropertyDescriptor", () => $4559ecf940edc78d$export$41705b1d644e0f14);
    function $4559ecf940edc78d$export$83b6dc3503c1fda6(length, stream, parent) {
      let res;
      if (typeof length === "number")
        res = length;
      else if (typeof length === "function")
        res = length.call(parent, parent);
      else if (parent && typeof length === "string")
        res = parent[length];
      else if (stream && length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
        res = length.decode(stream);
      if (isNaN(res))
        throw new Error("Not a fixed size");
      return res;
    }
    var $4559ecf940edc78d$export$41705b1d644e0f14 = class {
      constructor(opts = {}) {
        this.enumerable = true;
        this.configurable = true;
        for (let key in opts) {
          const val = opts[key];
          this[key] = val;
        }
      }
    };
    var $8ea28a08eae2a116$export$c4be6576ca6fe4aa = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type, length, lengthType = "count") {
        super();
        this.type = type;
        this.length = length;
        this.lengthType = lengthType;
      }
      decode(stream, parent) {
        let length;
        const { pos } = stream;
        const res = [];
        let ctx = parent;
        if (this.length != null)
          length = $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, stream, parent);
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022)) {
          Object.defineProperties(res, {
            parent: {
              value: parent
            },
            _startOffset: {
              value: pos
            },
            _currentOffset: {
              value: 0,
              writable: true
            },
            _length: {
              value: length
            }
          });
          ctx = res;
        }
        if (length == null || this.lengthType === "bytes") {
          const target = length != null ? stream.pos + length : (parent != null ? parent._length : void 0) ? parent._startOffset + parent._length : stream.length;
          while (stream.pos < target)
            res.push(this.type.decode(stream, ctx));
        } else
          for (let i = 0, end = length; i < end; i++)
            res.push(this.type.decode(stream, ctx));
        return res;
      }
      size(array, ctx, includePointers = true) {
        if (!array)
          return this.type.size(null, ctx) * $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, null, ctx);
        let size = 0;
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022)) {
          size += this.length.size();
          ctx = {
            parent: ctx,
            pointerSize: 0
          };
        }
        for (let item of array)
          size += this.type.size(item, ctx);
        if (ctx && includePointers && this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
          size += ctx.pointerSize;
        return size;
      }
      encode(stream, array, parent) {
        let ctx = parent;
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022)) {
          ctx = {
            pointers: [],
            startOffset: stream.pos,
            parent
          };
          ctx.pointerOffset = stream.pos + this.size(array, ctx, false);
          this.length.encode(stream, array.length);
        }
        for (let item of array)
          this.type.encode(stream, item, ctx);
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022)) {
          let i = 0;
          while (i < ctx.pointers.length) {
            const ptr = ctx.pointers[i++];
            ptr.type.encode(stream, ptr.val, ptr.parent);
          }
        }
      }
    };
    var $444f112d3cbc7e9f$export$5576c026028d4983 = class extends (0, $8ea28a08eae2a116$export$c4be6576ca6fe4aa) {
      decode(stream, parent) {
        const { pos } = stream;
        const length = $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, stream, parent);
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
          parent = {
            parent,
            _startOffset: pos,
            _currentOffset: 0,
            _length: length
          };
        const res = new $444f112d3cbc7e9f$var$LazyArrayValue(this.type, length, stream, parent);
        stream.pos += length * this.type.size(null, parent);
        return res;
      }
      size(val, ctx) {
        if (val instanceof $444f112d3cbc7e9f$var$LazyArrayValue)
          val = val.toArray();
        return super.size(val, ctx);
      }
      encode(stream, val, ctx) {
        if (val instanceof $444f112d3cbc7e9f$var$LazyArrayValue)
          val = val.toArray();
        return super.encode(stream, val, ctx);
      }
    };
    var $444f112d3cbc7e9f$var$LazyArrayValue = class {
      constructor(type, length, stream, ctx) {
        this.type = type;
        this.length = length;
        this.stream = stream;
        this.ctx = ctx;
        this.base = this.stream.pos;
        this.items = [];
      }
      get(index) {
        if (index < 0 || index >= this.length)
          return void 0;
        if (this.items[index] == null) {
          const { pos } = this.stream;
          this.stream.pos = this.base + this.type.size(null, this.ctx) * index;
          this.items[index] = this.type.decode(this.stream, this.ctx);
          this.stream.pos = pos;
        }
        return this.items[index];
      }
      toArray() {
        const result = [];
        for (let i = 0, end = this.length; i < end; i++)
          result.push(this.get(i));
        return result;
      }
    };
    var $3def237a34a226b5$export$96b43b8a49f688ea = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type, flags = []) {
        super();
        this.type = type;
        this.flags = flags;
      }
      decode(stream) {
        const val = this.type.decode(stream);
        const res = {};
        for (let i = 0; i < this.flags.length; i++) {
          const flag = this.flags[i];
          if (flag != null)
            res[flag] = !!(val & 1 << i);
        }
        return res;
      }
      size() {
        return this.type.size();
      }
      encode(stream, keys) {
        let val = 0;
        for (let i = 0; i < this.flags.length; i++) {
          const flag = this.flags[i];
          if (flag != null) {
            if (keys[flag])
              val |= 1 << i;
          }
        }
        return this.type.encode(stream, val);
      }
    };
    var $8415e91bb83faf74$export$ff887cefee4d61ec = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type) {
        super();
        this.type = type;
      }
      decode(stream, parent) {
        return !!this.type.decode(stream, parent);
      }
      size(val, parent) {
        return this.type.size(val, parent);
      }
      encode(stream, val, parent) {
        return this.type.encode(stream, +val, parent);
      }
    };
    var $08d28604119af47e$export$7d22a0eea6656474 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(length) {
        super();
        this.length = length;
      }
      decode(stream, parent) {
        const length = $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, stream, parent);
        return stream.readBuffer(length);
      }
      size(val, parent) {
        if (!val)
          return $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, null, parent);
        let len = val.length;
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
          len += this.length.size();
        return len;
      }
      encode(stream, buf, parent) {
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
          this.length.encode(stream, buf.length);
        return stream.writeBuffer(buf);
      }
    };
    var $070ce31ea947467f$export$deb82508dd66d288 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type, options = []) {
        super();
        this.type = type;
        this.options = options;
      }
      decode(stream) {
        const index = this.type.decode(stream);
        return this.options[index] || index;
      }
      size() {
        return this.type.size();
      }
      encode(stream, val) {
        const index = this.options.indexOf(val);
        if (index === -1)
          throw new Error(`Unknown option in enum: ${val}`);
        return this.type.encode(stream, index);
      }
    };
    var $80703542fcfb6ff0$export$7acb7b24c478f9c6 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type, condition = true) {
        super();
        this.type = type;
        this.condition = condition;
      }
      decode(stream, parent) {
        let { condition } = this;
        if (typeof condition === "function")
          condition = condition.call(parent, parent);
        if (condition)
          return this.type.decode(stream, parent);
      }
      size(val, parent) {
        let { condition } = this;
        if (typeof condition === "function")
          condition = condition.call(parent, parent);
        if (condition)
          return this.type.size(val, parent);
        else
          return 0;
      }
      encode(stream, val, parent) {
        let { condition } = this;
        if (typeof condition === "function")
          condition = condition.call(parent, parent);
        if (condition)
          return this.type.encode(stream, val, parent);
      }
    };
    var $f4fd49878232508a$export$da9b5fe187a9aa1 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(type, count = 1) {
        super();
        this.type = type;
        this.count = count;
      }
      decode(stream, parent) {
        stream.pos += this.size(null, parent);
        return void 0;
      }
      size(data, parent) {
        const count = $4559ecf940edc78d$export$83b6dc3503c1fda6(this.count, null, parent);
        return this.type.size() * count;
      }
      encode(stream, val, parent) {
        return stream.fill(0, this.size(val, parent));
      }
    };
    var $d8705cd4022e7dcf$export$89b8e0fa65f6a914 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(length, encoding = "ascii") {
        super();
        this.length = length;
        this.encoding = encoding;
      }
      decode(stream, parent) {
        let length, pos;
        if (this.length != null)
          length = $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, stream, parent);
        else {
          let buffer;
          ({ buffer, length, pos } = stream);
          while (pos < length && buffer[pos] !== 0)
            ++pos;
          length = pos - stream.pos;
        }
        let { encoding } = this;
        if (typeof encoding === "function")
          encoding = encoding.call(parent, parent) || "ascii";
        const string = stream.readString(length, encoding);
        if (this.length == null && stream.pos < stream.length)
          stream.pos++;
        return string;
      }
      size(val, parent) {
        if (!val)
          return $4559ecf940edc78d$export$83b6dc3503c1fda6(this.length, null, parent);
        let { encoding } = this;
        if (typeof encoding === "function")
          encoding = encoding.call(parent != null ? parent.val : void 0, parent != null ? parent.val : void 0) || "ascii";
        if (encoding === "utf16be")
          encoding = "utf16le";
        let size = $d8705cd4022e7dcf$var$byteLength(val, encoding);
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
          size += this.length.size();
        if (this.length == null)
          size++;
        return size;
      }
      encode(stream, val, parent) {
        let { encoding } = this;
        if (typeof encoding === "function")
          encoding = encoding.call(parent != null ? parent.val : void 0, parent != null ? parent.val : void 0) || "ascii";
        if (this.length instanceof (0, $af65abf7bf65ac42$export$fffa67e515d04022))
          this.length.encode(stream, $d8705cd4022e7dcf$var$byteLength(val, encoding));
        stream.writeString(val, encoding);
        if (this.length == null)
          return stream.writeUInt8(0);
      }
    };
    function $d8705cd4022e7dcf$var$byteLength(string, encoding) {
      switch (encoding) {
        case "ascii":
          return string.length;
        case "utf8":
          let len = 0;
          for (let i = 0; i < string.length; i++) {
            let c = string.charCodeAt(i);
            if (c >= 55296 && c <= 56319 && i < string.length - 1) {
              let c2 = string.charCodeAt(++i);
              if ((c2 & 64512) === 56320)
                c = ((c & 1023) << 10) + (c2 & 1023) + 65536;
              else
                i--;
            }
            if ((c & 4294967168) === 0)
              len++;
            else if ((c & 4294965248) === 0)
              len += 2;
            else if ((c & 4294901760) === 0)
              len += 3;
            else if ((c & 4292870144) === 0)
              len += 4;
          }
          return len;
        case "utf16le":
        case "utf16-le":
        case "utf16be":
        case "utf16-be":
        case "ucs2":
          return string.length * 2;
        default:
          throw new Error("Unknown encoding " + encoding);
      }
    }
    var $aa8b66bae6abe658$export$eabc71f011df675a = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(fields = {}) {
        super();
        this.fields = fields;
      }
      decode(stream, parent, length = 0) {
        const res = this._setup(stream, parent, length);
        this._parseFields(stream, res, this.fields);
        if (this.process != null)
          this.process.call(res, stream);
        return res;
      }
      _setup(stream, parent, length) {
        const res = {};
        Object.defineProperties(res, {
          parent: {
            value: parent
          },
          _startOffset: {
            value: stream.pos
          },
          _currentOffset: {
            value: 0,
            writable: true
          },
          _length: {
            value: length
          }
        });
        return res;
      }
      _parseFields(stream, res, fields) {
        for (let key in fields) {
          var val;
          const type = fields[key];
          if (typeof type === "function")
            val = type.call(res, res);
          else
            val = type.decode(stream, res);
          if (val !== void 0) {
            if (val instanceof $4559ecf940edc78d$export$41705b1d644e0f14)
              Object.defineProperty(res, key, val);
            else
              res[key] = val;
          }
          res._currentOffset = stream.pos - res._startOffset;
        }
      }
      size(val, parent, includePointers = true) {
        if (val == null)
          val = {};
        const ctx = {
          parent,
          val,
          pointerSize: 0
        };
        if (this.preEncode != null)
          this.preEncode.call(val);
        let size = 0;
        for (let key in this.fields) {
          const type = this.fields[key];
          if (type.size != null)
            size += type.size(val[key], ctx);
        }
        if (includePointers)
          size += ctx.pointerSize;
        return size;
      }
      encode(stream, val, parent) {
        let type;
        if (this.preEncode != null)
          this.preEncode.call(val, stream);
        const ctx = {
          pointers: [],
          startOffset: stream.pos,
          parent,
          val,
          pointerSize: 0
        };
        ctx.pointerOffset = stream.pos + this.size(val, ctx, false);
        for (let key in this.fields) {
          type = this.fields[key];
          if (type.encode != null)
            type.encode(stream, val[key], ctx);
        }
        let i = 0;
        while (i < ctx.pointers.length) {
          const ptr = ctx.pointers[i++];
          ptr.type.encode(stream, ptr.val, ptr.parent);
        }
      }
    };
    var $fcb208a95f6d048b$var$getPath = (object, pathArray) => {
      return pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object);
    };
    var $fcb208a95f6d048b$export$95a8b60f4da7dec8 = class extends (0, $aa8b66bae6abe658$export$eabc71f011df675a) {
      constructor(type, versions = {}) {
        super();
        this.type = type;
        this.versions = versions;
        if (typeof type === "string")
          this.versionPath = type.split(".");
      }
      decode(stream, parent, length = 0) {
        const res = this._setup(stream, parent, length);
        if (typeof this.type === "string")
          res.version = $fcb208a95f6d048b$var$getPath(parent, this.versionPath);
        else
          res.version = this.type.decode(stream);
        if (this.versions.header)
          this._parseFields(stream, res, this.versions.header);
        const fields = this.versions[res.version];
        if (fields == null)
          throw new Error(`Unknown version ${res.version}`);
        if (fields instanceof $fcb208a95f6d048b$export$95a8b60f4da7dec8)
          return fields.decode(stream, parent);
        this._parseFields(stream, res, fields);
        if (this.process != null)
          this.process.call(res, stream);
        return res;
      }
      size(val, parent, includePointers = true) {
        let key, type;
        if (!val)
          throw new Error("Not a fixed size");
        if (this.preEncode != null)
          this.preEncode.call(val);
        const ctx = {
          parent,
          val,
          pointerSize: 0
        };
        let size = 0;
        if (typeof this.type !== "string")
          size += this.type.size(val.version, ctx);
        if (this.versions.header)
          for (key in this.versions.header) {
            type = this.versions.header[key];
            if (type.size != null)
              size += type.size(val[key], ctx);
          }
        const fields = this.versions[val.version];
        if (fields == null)
          throw new Error(`Unknown version ${val.version}`);
        for (key in fields) {
          type = fields[key];
          if (type.size != null)
            size += type.size(val[key], ctx);
        }
        if (includePointers)
          size += ctx.pointerSize;
        return size;
      }
      encode(stream, val, parent) {
        let key, type;
        if (this.preEncode != null)
          this.preEncode.call(val, stream);
        const ctx = {
          pointers: [],
          startOffset: stream.pos,
          parent,
          val,
          pointerSize: 0
        };
        ctx.pointerOffset = stream.pos + this.size(val, ctx, false);
        if (typeof this.type !== "string")
          this.type.encode(stream, val.version);
        if (this.versions.header)
          for (key in this.versions.header) {
            type = this.versions.header[key];
            if (type.encode != null)
              type.encode(stream, val[key], ctx);
          }
        const fields = this.versions[val.version];
        for (key in fields) {
          type = fields[key];
          if (type.encode != null)
            type.encode(stream, val[key], ctx);
        }
        let i = 0;
        while (i < ctx.pointers.length) {
          const ptr = ctx.pointers[i++];
          ptr.type.encode(stream, ptr.val, ptr.parent);
        }
      }
    };
    var $92184962f8f0d5e2$exports = {};
    $parcel$export($92184962f8f0d5e2$exports, "Pointer", () => $92184962f8f0d5e2$export$b56007f12edf0c17);
    $parcel$export($92184962f8f0d5e2$exports, "VoidPointer", () => $92184962f8f0d5e2$export$df5cb1f3d04f5a0f);
    var $92184962f8f0d5e2$export$b56007f12edf0c17 = class extends (0, $8d21f7fa58802901$export$ef88aa0d34c34520) {
      constructor(offsetType, type, options = {}) {
        super();
        this.offsetType = offsetType;
        this.type = type;
        this.options = options;
        if (this.type === "void")
          this.type = null;
        if (this.options.type == null)
          this.options.type = "local";
        if (this.options.allowNull == null)
          this.options.allowNull = true;
        if (this.options.nullValue == null)
          this.options.nullValue = 0;
        if (this.options.lazy == null)
          this.options.lazy = false;
        if (this.options.relativeTo) {
          if (typeof this.options.relativeTo !== "function")
            throw new Error("relativeTo option must be a function");
          this.relativeToGetter = options.relativeTo;
        }
      }
      decode(stream, ctx) {
        const offset = this.offsetType.decode(stream, ctx);
        if (offset === this.options.nullValue && this.options.allowNull)
          return null;
        let relative;
        switch (this.options.type) {
          case "local":
            relative = ctx._startOffset;
            break;
          case "immediate":
            relative = stream.pos - this.offsetType.size();
            break;
          case "parent":
            relative = ctx.parent._startOffset;
            break;
          default:
            var c = ctx;
            while (c.parent)
              c = c.parent;
            relative = c._startOffset || 0;
        }
        if (this.options.relativeTo)
          relative += this.relativeToGetter(ctx);
        const ptr = offset + relative;
        if (this.type != null) {
          let val = null;
          const decodeValue = () => {
            if (val != null)
              return val;
            const { pos } = stream;
            stream.pos = ptr;
            val = this.type.decode(stream, ctx);
            stream.pos = pos;
            return val;
          };
          if (this.options.lazy)
            return new $4559ecf940edc78d$export$41705b1d644e0f14({
              get: decodeValue
            });
          return decodeValue();
        } else
          return ptr;
      }
      size(val, ctx) {
        const parent = ctx;
        switch (this.options.type) {
          case "local":
          case "immediate":
            break;
          case "parent":
            ctx = ctx.parent;
            break;
          default:
            while (ctx.parent)
              ctx = ctx.parent;
        }
        let { type } = this;
        if (type == null) {
          if (!(val instanceof $92184962f8f0d5e2$export$df5cb1f3d04f5a0f))
            throw new Error("Must be a VoidPointer");
          ({ type } = val);
          val = val.value;
        }
        if (val && ctx) {
          let size = type.size(val, parent);
          ctx.pointerSize += size;
        }
        return this.offsetType.size();
      }
      encode(stream, val, ctx) {
        let relative;
        const parent = ctx;
        if (val == null) {
          this.offsetType.encode(stream, this.options.nullValue);
          return;
        }
        switch (this.options.type) {
          case "local":
            relative = ctx.startOffset;
            break;
          case "immediate":
            relative = stream.pos + this.offsetType.size(val, parent);
            break;
          case "parent":
            ctx = ctx.parent;
            relative = ctx.startOffset;
            break;
          default:
            relative = 0;
            while (ctx.parent)
              ctx = ctx.parent;
        }
        if (this.options.relativeTo)
          relative += this.relativeToGetter(parent.val);
        this.offsetType.encode(stream, ctx.pointerOffset - relative);
        let { type } = this;
        if (type == null) {
          if (!(val instanceof $92184962f8f0d5e2$export$df5cb1f3d04f5a0f))
            throw new Error("Must be a VoidPointer");
          ({ type } = val);
          val = val.value;
        }
        ctx.pointers.push({
          type,
          val,
          parent
        });
        return ctx.pointerOffset += type.size(val, parent);
      }
    };
    var $92184962f8f0d5e2$export$df5cb1f3d04f5a0f = class {
      constructor(type, value) {
        this.type = type;
        this.value = value;
      }
    };
    $parcel$exportWildcard(module2.exports, $4559ecf940edc78d$exports);
    $parcel$exportWildcard(module2.exports, $af65abf7bf65ac42$exports);
    $parcel$exportWildcard(module2.exports, $92184962f8f0d5e2$exports);
  }
});

// src/utils/tcp.js
var r = require_main();
var net = require("net");
var path = require("path");
var fs = require("fs");
function checkIfValidIP(str) {
  const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  return regexExp.test(str);
}
var Nb_message = 0;
var DEFAULT_PORT = 80;
var DEFAULT_HOST = "localhost";
var MSG_ID = {
  Rec_config: 255,
  Rec_config_ACK: 254,
  Rec_STOP: 0,
  Rec_vmc_message: 1,
  Rec_kf_message: 3
};
var TYPE_CONFIG = {
  vmc: 1,
  kf: 3
};
var REC_MODE = {
  cyclic: 0,
  snap: 1,
  onRequest: 2
};
var Header = new r.Struct({
  Id_comm: r.uint8,
  Time_sec: r.uint32le,
  Time_ms: r.uint32le
});
var ConfigStruct = new r.Struct({
  Header,
  Length: r.uint32le,
  Nb_mess: r.uint16le,
  Type_config: r.uint8,
  Rec_mode: r.uint8,
  Samples_N: r.uint16le,
  Cycles_C: r.uint16le
});
var AckNackStruct = new r.Struct({
  Header,
  Length: r.uint32le,
  Nb_mess: r.uint16le,
  Type_config: r.uint8,
  Rec_mode: r.uint8,
  Samples_N: r.uint16le,
  Cycles_C: r.uint16le
});
var p_vmc_system_data_t = new r.Struct({
  b_reset: new r.Boolean(r.uint8),
  cycle_time: r.floatle,
  available_state_size: r.uint32le
});
var p_vmc_actuators_ava_t = new r.Struct({
  incli_more_fore: new r.Boolean(r.uint8),
  incli_less_fore: new r.Boolean(r.uint8),
  main_port: new r.Boolean(r.uint8),
  main_star: new r.Boolean(r.uint8),
  ver_aft: new r.Boolean(r.uint8),
  dpr_port: new r.Boolean(r.uint8),
  dpr_star: new r.Boolean(r.uint8),
  foil: new r.Boolean(r.uint8),
  winch: new r.Boolean(r.uint8)
});
var p_vmc_measure_t = new r.Struct({
  b_depth_val: new r.Boolean(r.uint8),
  depth: r.floatle,
  b_depth_rate_val: new r.Boolean(r.uint8),
  depth_rate: r.floatle,
  b_altitude_val: new r.Boolean(r.uint8),
  altitude: r.floatle,
  b_pitch_val: new r.Boolean(r.uint8),
  pitch: r.floatle,
  b_pitch_rate_val: new r.Boolean(r.uint8),
  pitch_rate: r.floatle,
  b_yaw_val: new r.Boolean(r.uint8),
  yaw: r.floatle,
  b_yaw_rate_val: new r.Boolean(r.uint8),
  yaw_rate: r.floatle,
  b_rhp_val: new r.Boolean(r.uint8),
  rhp_x: r.floatle,
  rhp_y: r.floatle,
  b_ahp_val: new r.Boolean(r.uint8),
  ahp_x: r.floatle,
  ahp_y: r.floatle,
  b_stw_val: new r.Boolean(r.uint8),
  stw_u: r.floatle,
  stw_v: r.floatle,
  b_sog_val: new r.Boolean(r.uint8),
  sog_u: r.floatle,
  sog_v: r.floatle,
  b_len_val: new r.Boolean(r.uint8),
  len: r.floatle
});
var p_vmc_command_t = new r.Struct({
  b_ver_auto: new r.Boolean(r.uint8),
  ver_auto_mode: r.uint8,
  ver_depth_auto_sp: r.floatle,
  ver_altitude_auto_sp: r.floatle,
  ver_pitch_auto_sp: r.floatle,
  ver_depth_rate_auto_sp: r.floatle,
  b_ver_manu: new r.Boolean(r.uint8),
  ver_depth_manu: r.floatle,
  ver_pitch_manu: r.floatle,
  b_yaw_auto: new r.Boolean(r.uint8),
  yaw_auto_mode: r.uint8,
  yaw_auto_sp: r.floatle,
  yaw_rate_auto_sp: r.floatle,
  b_yaw_manu: new r.Boolean(r.uint8),
  yaw_manu: r.floatle,
  b_winch_auto: new r.Boolean(r.uint8),
  b_towed: new r.Boolean(r.uint8),
  b_winch_manu: new r.Boolean(r.uint8),
  winch_speed: r.floatle,
  b_hdis_auto: new r.Boolean(r.uint8),
  hdis_auto_sp: r.floatle,
  b_hdis_stdb: new r.Boolean(r.uint8),
  b_g2p_auto: new r.Boolean(r.uint8),
  g2p_auto_mode: r.uint8,
  g2p_ahp_x_auto_sp: r.floatle,
  g2p_ahp_y_auto_sp: r.floatle,
  g2p_depth_auto_sp: r.floatle,
  g2p_altitude_auto_sp: r.floatle,
  g2p_yaw_auto_sp: r.floatle,
  b_g2p_stdb: new r.Boolean(r.uint8),
  longitudinal_speed_manu: r.floatle,
  lateral_speed_manu: r.floatle
});
var p_vmc_service_input_t = new r.Struct({
  in_int8: new r.Array(r.int8, 4),
  in_spfp: new r.Array(r.floatle, 16)
});
var p_vmc_control_t = new r.Struct({
  b_incli_more_fore_speed_val: new r.Boolean(r.uint8),
  incli_more_fore_speed: r.floatle,
  b_incli_less_fore_speed_val: new r.Boolean(r.uint8),
  incli_less_fore_speed: r.floatle,
  b_main_port_speed_val: new r.Boolean(r.uint8),
  main_port_speed: r.floatle,
  b_main_star_speed_val: new r.Boolean(r.uint8),
  main_star_speed: r.floatle,
  b_ver_aft_speed_val: new r.Boolean(r.uint8),
  ver_aft_speed: r.floatle,
  b_dpr_port_angle_val: new r.Boolean(r.uint8),
  dpr_port_angle: r.floatle,
  b_dpr_star_angle_val: new r.Boolean(r.uint8),
  dpr_star_angle: r.floatle,
  b_foil_angle_val: new r.Boolean(r.uint8),
  foil_angle: r.floatle,
  b_winch_speed_val: new r.Boolean(r.uint8),
  winch_speed: r.floatle
});
var p_vmc_data_t = new r.Struct({
  b_depth_auto_ava: new r.Boolean(r.uint8),
  b_depth_auto_eng: new r.Boolean(r.uint8),
  b_depth_auto_ach: new r.Boolean(r.uint8),
  b_depth_auto_ala: new r.Boolean(r.uint8),
  b_depth_pitch_auto_ava: new r.Boolean(r.uint8),
  b_depth_pitch_auto_eng: new r.Boolean(r.uint8),
  b_depth_pitch_auto_ach: new r.Boolean(r.uint8),
  b_depth_pitch_auto_ala: new r.Boolean(r.uint8),
  b_altitude_auto_ava: new r.Boolean(r.uint8),
  b_altitude_auto_eng: new r.Boolean(r.uint8),
  b_altitude_auto_ach: new r.Boolean(r.uint8),
  b_altitude_auto_ala: new r.Boolean(r.uint8),
  b_altitude_pitch_auto_ava: new r.Boolean(r.uint8),
  b_altitude_pitch_auto_eng: new r.Boolean(r.uint8),
  b_altitude_pitch_auto_ach: new r.Boolean(r.uint8),
  b_altitude_pitch_auto_ala: new r.Boolean(r.uint8),
  b_depth_rate_auto_ava: new r.Boolean(r.uint8),
  b_depth_rate_auto_eng: new r.Boolean(r.uint8),
  b_depth_rate_auto_ala: new r.Boolean(r.uint8),
  b_yaw_auto_ava: new r.Boolean(r.uint8),
  b_yaw_auto_eng: new r.Boolean(r.uint8),
  b_yaw_auto_ach: new r.Boolean(r.uint8),
  b_yaw_auto_ala: new r.Boolean(r.uint8),
  b_yaw_rate_auto_ava: new r.Boolean(r.uint8),
  b_yaw_rate_auto_eng: new r.Boolean(r.uint8),
  b_yaw_rate_auto_ala: new r.Boolean(r.uint8),
  b_winch_free_rov_auto_ava: new r.Boolean(r.uint8),
  b_winch_free_rov_auto_eng: new r.Boolean(r.uint8),
  b_winch_free_rov_auto_ala: new r.Boolean(r.uint8),
  b_winch_towed_rov_auto_ava: new r.Boolean(r.uint8),
  b_winch_towed_rov_auto_eng: new r.Boolean(r.uint8),
  b_winch_towed_rov_auto_ala: new r.Boolean(r.uint8),
  b_hdis_auto_ava: new r.Boolean(r.uint8),
  b_hdis_auto_eng: new r.Boolean(r.uint8),
  b_hdis_auto_ach: new r.Boolean(r.uint8),
  b_hdis_auto_ala: new r.Boolean(r.uint8),
  b_g2p_depth_auto_ava: new r.Boolean(r.uint8),
  b_g2p_depth_auto_eng: new r.Boolean(r.uint8),
  b_g2p_depth_auto_ach: new r.Boolean(r.uint8),
  b_g2p_depth_auto_ala: new r.Boolean(r.uint8),
  b_g2p_altitude_auto_ava: new r.Boolean(r.uint8),
  b_g2p_altitude_auto_eng: new r.Boolean(r.uint8),
  b_g2p_altitude_auto_ach: new r.Boolean(r.uint8),
  b_g2p_altitude_auto_ala: new r.Boolean(r.uint8)
});
var p_vmc_service_output_t = new r.Struct({
  out_int8: new r.Array(r.uint8, 4),
  out_spfp: new r.Array(r.floatle, 16)
});
var p_vmc_input_t = new r.Struct({
  system_data: p_vmc_system_data_t,
  actuators_ava: p_vmc_actuators_ava_t,
  measure: p_vmc_measure_t,
  command: p_vmc_command_t,
  service_input: p_vmc_service_input_t
});
var p_vmc_output_t = new r.Struct({
  control: p_vmc_control_t,
  data: p_vmc_data_t,
  watchdog: r.uint8,
  b_rec_trigger: new r.Boolean(r.uint8),
  service_output: p_vmc_service_output_t
});
var p_RecSample_vmc = new r.Struct({
  v_in: p_vmc_input_t,
  v_out: p_vmc_output_t
});
var p_KF_system_data_t = new r.Struct({
  kf_reset: new r.Boolean(r.uint8),
  kf_cycle_time: r.floatle,
  kf_available_state_size: r.uint32le
});
var p_KF_measure_t = new r.Struct({
  b_depth_val: new r.Boolean(r.uint8),
  depth: r.floatle,
  depth_filt: r.floatle,
  b_depth_fail: new r.Boolean(r.uint8),
  roll: r.floatle,
  roll_filt: r.floatle,
  pitch: r.floatle,
  pitch_filt: r.floatle,
  yaw: r.floatle,
  yaw_filt: r.floatle,
  b_usbl_x_val: new r.Boolean(r.uint8),
  b_usbl_y_val: new r.Boolean(r.uint8),
  b_usbl_z_val: new r.Boolean(r.uint8),
  usbl_x: r.floatle,
  usbl_y: r.floatle,
  usbl_z: r.floatle,
  b_usbl_fail: new r.Boolean(r.uint8),
  b_stw_u_val: new r.Boolean(r.uint8),
  b_stw_v_val: new r.Boolean(r.uint8),
  b_stw_w_val: new r.Boolean(r.uint8),
  stw_u: r.floatle,
  stw_v: r.floatle,
  stw_w: r.floatle,
  b_sog_u_val: new r.Boolean(r.uint8),
  b_sog_v_val: new r.Boolean(r.uint8),
  b_sog_w_val: new r.Boolean(r.uint8),
  sog_u: r.floatle,
  sog_v: r.floatle,
  sog_w: r.floatle,
  acc_x: r.floatle,
  acc_y: r.floatle,
  acc_z: r.floatle,
  acc_x_filt: r.floatle,
  acc_y_filt: r.floatle,
  acc_z_filt: r.floatle,
  b_ahrs_fail: new r.Boolean(r.uint8),
  b_altitude_val: new r.Boolean(r.uint8),
  altitude: r.floatle,
  b_dvl_fail: new r.Boolean(r.uint8)
});
var p_KF_service_input_t = new r.Struct({
  in_int8: new r.Array(r.int8, 4),
  in_spfp: new r.Array(r.floatle, 4)
});
var p_KF_command_t = new r.Struct({
  kf_activate: new r.Boolean(r.uint8),
  kf_deactivate: new r.Boolean(r.uint8)
});
var p_KF_input_t = new r.Struct({
  kf_system_data: p_KF_system_data_t,
  kf_measure: p_KF_measure_t,
  use_filt: new r.Boolean(r.uint8),
  kf_service_input: p_KF_service_input_t,
  kf_command: p_KF_command_t
});
var p_KF_service_output_t = new r.Struct({
  out_int8: new r.Array(r.int8, 4),
  out_spfp: new r.Array(r.floatle, 10)
});
var p_KF_estimates_t = new r.Struct({
  pos_ned_x: r.floatle,
  pos_ned_y: r.floatle,
  pos_ned_z: r.floatle,
  vel_ned_x: r.floatle,
  vel_ned_y: r.floatle,
  vel_ned_z: r.floatle,
  b_pos_ned_x_fail: new r.Boolean(r.uint8),
  b_pos_ned_y_fail: new r.Boolean(r.uint8),
  b_pos_ned_z_fail: new r.Boolean(r.uint8),
  b_vel_ned_x_fail: new r.Boolean(r.uint8),
  b_vel_ned_y_fail: new r.Boolean(r.uint8),
  b_vel_ned_z_fail: new r.Boolean(r.uint8),
  b_yaw_fail: new r.Boolean(r.uint8),
  P_matrix: new r.Array(r.floatle, 225)
});
var StopStruct = new r.Struct({
  Header,
  Length: r.uint16le,
  Type_message: r.uint8
});
var RecordingVmcStruct = new r.Struct({
  Header,
  Length: r.uint32le,
  Vmc_input_t: p_vmc_input_t,
  Vmc_output_t: p_vmc_service_output_t
});
var RecordingKfStruct = new r.Struct({
  Header,
  Length: r.uint32le,
  Kf_input_t: p_KF_input_t,
  Kf_output_t: p_KF_service_output_t
});
var typeMappping = {
  "UInt8": "vmc_uint8_t",
  "UInt16LE": "vmc_uint16_t",
  "UInt32LE": "vmc_uint32_t",
  "FloatLE": "vmc_spfp_t",
  "Int8": "vmc_int8_t",
  "Int16LE": "vmc_int16_t",
  "Int32LE": "vmc_int32_t",
  "Boolean": "vmc_bool_t"
};
function getFields(struct) {
  let fields = [];
  for (let field of Object.keys(struct.fields)) {
    if (Object.keys(struct.fields[field]).includes("fields")) {
      fields.push(...getFields(struct.fields[field]));
    } else {
      fields.push({ [field]: struct.fields[field].fn || struct.fields[field].type.fn });
    }
  }
  return fields;
}
function getTypedFields(struct) {
  let fields = getFields(struct);
  let typedFields = [];
  for (let field of fields) {
    typedFields.push({ [Object.keys(field)[0]]: typeMappping[field[Object.keys(field)[0]]] });
  }
  return typedFields;
}
function searchProperty(name, object) {
  for (const property in object) {
    if (property === name) {
      return object[property];
    } else if (typeof object[property] === "object") {
      const result = searchProperty(name, object[property]);
      if (result) {
        return result;
      }
    }
  }
}
function combineValuesAndTypes(namesAndValues, namesAndTypes) {
  const combinedObject = {};
  for (const property in namesAndTypes) {
    const nameAndType = namesAndTypes[property];
    const name = Object.keys(nameAndType)[0];
    const type = nameAndType[name];
    combinedObject[name] = { value: searchProperty(name, namesAndValues) || 0, type };
  }
  return combinedObject;
}
var TcpConnect = class {
  constructor(host = DEFAULT_HOST, port = DEFAULT_PORT) {
    this.host = checkIfValidIP(host) ? host : DEFAULT_HOST;
    this.port = Number(port) || DEFAULT_PORT;
    if (this.instance) {
      return this.instance;
    } else {
      process.send({ event: "init" });
      this.client = null;
      this.connected = false;
      this.commandType = null;
      this.instance = this;
      this.outDir = "";
      this.outName = "";
      this.config = {
        "vmc": {},
        "kf": {}
      };
    }
  }
  async connect() {
    this.client = net.createConnection(this.port, this.host, () => {
      this.connected = true;
      console.log("Connected to " + this.host + ":" + this.port);
      process.send({ event: "connected" });
    });
    this.client.on("data", (data) => {
      this.manageData(data);
    });
    this.client.on("error", (err) => {
      console.log("Error: " + err);
      process.send({ event: "error", err });
    });
    this.client.on("close", () => {
      this.connected = false;
      console.log("Disconnected");
      process.send({ event: "closed" });
    });
    this.client.on("end", () => {
      this.connected = false;
      console.log("Disconnected");
      process.send({ event: "end" });
    });
    this.client.on("timeout", () => {
      console.log("Timeout");
      process.send({ event: "timeout" });
    });
  }
  disconnect() {
    if (!this.connected) {
      return;
    }
    this.client.end();
    this.connected = false;
    delete this;
  }
  changeSettings(host, port, outDir, outName) {
    console.log("Changing settings: " + host + ":" + port + " " + outDir + " " + outName);
    if (this.connected) {
      this.disconnect();
      this.host = host;
      this.port = port;
      this.outDir = outDir;
      this.outName = outName;
      this.connect();
    } else {
      this.host = host;
      this.port = port;
      this.outDir = outDir;
      this.outName = outName;
    }
  }
  isConnected() {
    return this.connected;
  }
  manageData(data) {
    const header = data.slice(0, Header.size());
    const headerStruct = Header.fromBuffer(header);
    const headerId = headerStruct.Id_comm;
    const headerLength = headerStruct.Length;
    const headerTime = headerStruct.Time_sec;
    const headerTimeMs = headerStruct.Time_ms;
    switch (headerId) {
      case MSG_ID.Rec_config_ACK:
        console.log("Received config ACK");
        break;
      case MSG_ID.Rec_vmc_message:
        const arr = new Uint8Array(data);
        const bVmcTruncated = arr.slice(0, RecordingVmcStruct.size());
        const vmcStruct = RecordingVmcStruct.fromBuffer(bVmcTruncated);
        this.appendDataToFile(vmcStruct, "vmc");
        break;
      case MSG_ID.Rec_kf_message:
        const arrKf = new Uint8Array(data);
        const bKfTruncated = arrKf.slice(0, RecordingKfStruct.size());
        const kfStruct = RecordingKfStruct.fromBuffer(bKfTruncated);
        this.appendDataToFile(kfStruct, "kf");
        break;
      default:
        console.log("Received unknown message");
        break;
    }
  }
  setConfig(config, type) {
    const { mode, samples, cycles, recording } = config;
    if (recording) {
      const hdr = {
        Id_comm: MSG_ID.Rec_config,
        Time_sec: (/* @__PURE__ */ new Date()).getTime() / 1e3,
        Time_ms: (/* @__PURE__ */ new Date()).getTime()
      };
      console.log("Sending header: " + hdr.toString("hex"));
      console.log("Samples: " + samples);
      console.log("Cycles: " + cycles);
      const structToSend = ConfigStruct.toBuffer({
        Header: hdr,
        Length: ConfigStruct.size(),
        Nb_mess: Nb_message,
        Type_config: TYPE_CONFIG[type],
        Rec_mode: REC_MODE[mode],
        Samples_N: samples,
        Cycles_C: cycles
      });
      this.config[type] = config;
      Nb_message++;
      console.log("Sending config: " + structToSend.toString("hex"));
      this.sendAction("start", { data: structToSend });
    } else {
      const hdr = {
        Id_comm: MSG_ID.Rec_STOP,
        Time_sec: (/* @__PURE__ */ new Date()).getTime() / 1e3,
        Time_ms: (/* @__PURE__ */ new Date()).getTime()
      };
      const structToSend = StopStruct.toBuffer({
        Header: hdr,
        Length: StopStruct.size(),
        Type_message: TYPE_CONFIG[type]
      });
      console.log("Sending stop: " + structToSend.toString("hex"));
      this.sendAction("stop", { data: structToSend });
    }
  }
  sendAction(action, options = {}) {
    console.log("Sending action: " + action + " with options: " + JSON.stringify(options));
    if (!this.connected) {
      console.log("Not connected");
      return;
    }
    const res = this.client.write(options.data);
    console.log("Sending payload: " + options.data.toString("hex") + " Response: " + res);
  }
  appendDataToFile(struct, type) {
    const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const mode = this.config[type].mode;
    const samples = this.config[type].samples;
    const cycles = this.config[type].cycles;
    let name = this.outName + "_" + date + "_" + type;
    Object.keys(REC_MODE).forEach((key) => {
      if (key === mode) {
        name += "_" + key;
        switch (key) {
          case "cyclic":
            name += "_" + cycles;
            break;
          case "snap":
            name += "_" + samples;
            break;
          default:
            break;
        }
      }
    });
    const fileName = path.join(this.outDir, name + ".txt");
    const typedStruct = getTypedFields(type === "vmc" ? RecordingVmcStruct : RecordingKfStruct);
    if (!fs.existsSync(fileName)) {
      const nameArr = typedStruct.map((e) => Object.keys(e)[0]);
      const typeArr = typedStruct.map((e) => Object.values(e)[0]);
      const header = `% ${name} 
% 
% 
%${nameArr.map((e) => " ".repeat(25 - e.length) + e).join("")} 
%${typeArr.map((e) => " ".repeat(25 - e.length) + e).join("")} 
%
`;
      fs.writeFileSync(fileName, header);
    }
    const fullFilled = combineValuesAndTypes(struct, typedStruct);
    let row = "";
    Object.keys(fullFilled).forEach((key) => {
      if (Array.isArray(fullFilled[key].value))
        return;
      row += `${" ".repeat(25 - fullFilled[key].value.toString().length)}${fullFilled[key].value}\r\n`;
    });
    fs.appendFileSync(fileName, row);
  }
};
if (require.main === module) {
  const ip = process.argv[2];
  const port = process.argv[3];
  const outDir = process.argv[4];
  const outName = process.argv[5];
  const client = new TcpConnect(ip, port);
  client.changeSettings(ip, port, outDir, outName);
  process.on("message", (message) => {
    switch (message.event) {
      case "connect":
        client.connect();
        break;
      case "disconnect":
        client.disconnect();
        break;
      case "changeSettings":
        client.changeSettings(message.data.ip, message.data.port, message.data.outDir, message.data.outName);
        break;
      case "sendAction":
        client.sendAction(message.action, message.options);
        break;
      case "kfConfig":
        console.log("Setting KF config " + message.data);
        client.setConfig(message.data, "kf");
        break;
      case "vmcConfig":
        console.log("Setting VMC config " + message.data);
        client.setConfig(message.data, "vmc");
        break;
      default:
        console.log("Unknown event: " + message.event);
    }
  });
}
console.log = function(d) {
  process.send({ event: "log", data: d });
};
