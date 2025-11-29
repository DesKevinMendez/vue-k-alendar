import { ref as G, readonly as Ds, computed as se, defineComponent as W, createElementBlock as x, openBlock as k, Fragment as qe, renderList as Pe, toDisplayString as B, createElementVNode as D, createVNode as ye, unref as Z, normalizeStyle as Mt, normalizeClass as Ms, createCommentVNode as Q, createBlock as K, useModel as wn, watch as ft, onMounted as Es, onUnmounted as xs, withModifiers as Is, renderSlot as nt, mergeModels as Lt, withCtx as $t, isRef as Cs } from "vue";
class le extends Error {
}
class bs extends le {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class Ns extends le {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Vs extends le {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class me extends le {
}
class vn extends le {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class V extends le {
}
class ee extends le {
  constructor() {
    super("Zone is an abstract class");
  }
}
const d = "numeric", Y = "short", $ = "long", Ye = {
  year: d,
  month: d,
  day: d
}, pn = {
  year: d,
  month: Y,
  day: d
}, _s = {
  year: d,
  month: Y,
  day: d,
  weekday: Y
}, kn = {
  year: d,
  month: $,
  day: d
}, Tn = {
  year: d,
  month: $,
  day: d,
  weekday: $
}, On = {
  hour: d,
  minute: d
}, Sn = {
  hour: d,
  minute: d,
  second: d
}, Dn = {
  hour: d,
  minute: d,
  second: d,
  timeZoneName: Y
}, Mn = {
  hour: d,
  minute: d,
  second: d,
  timeZoneName: $
}, En = {
  hour: d,
  minute: d,
  hourCycle: "h23"
}, xn = {
  hour: d,
  minute: d,
  second: d,
  hourCycle: "h23"
}, In = {
  hour: d,
  minute: d,
  second: d,
  hourCycle: "h23",
  timeZoneName: Y
}, Cn = {
  hour: d,
  minute: d,
  second: d,
  hourCycle: "h23",
  timeZoneName: $
}, bn = {
  year: d,
  month: d,
  day: d,
  hour: d,
  minute: d
}, Nn = {
  year: d,
  month: d,
  day: d,
  hour: d,
  minute: d,
  second: d
}, Vn = {
  year: d,
  month: Y,
  day: d,
  hour: d,
  minute: d
}, _n = {
  year: d,
  month: Y,
  day: d,
  hour: d,
  minute: d,
  second: d
}, Fs = {
  year: d,
  month: Y,
  day: d,
  weekday: Y,
  hour: d,
  minute: d
}, Fn = {
  year: d,
  month: $,
  day: d,
  hour: d,
  minute: d,
  timeZoneName: Y
}, Ln = {
  year: d,
  month: $,
  day: d,
  hour: d,
  minute: d,
  second: d,
  timeZoneName: Y
}, $n = {
  year: d,
  month: $,
  day: d,
  weekday: $,
  hour: d,
  minute: d,
  timeZoneName: $
}, Wn = {
  year: d,
  month: $,
  day: d,
  weekday: $,
  hour: d,
  minute: d,
  second: d,
  timeZoneName: $
};
class Ne {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new ee();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new ee();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new ee();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, t) {
    throw new ee();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    throw new ee();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new ee();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new ee();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new ee();
  }
}
let st = null;
class je extends Ne {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return st === null && (st = new je()), st;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(e, { format: t, locale: s }) {
    return Gn(e, t, s);
  }
  /** @override **/
  formatOffset(e, t) {
    return Ce(this.offset(e), t);
  }
  /** @override **/
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  /** @override **/
  equals(e) {
    return e.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
const ht = /* @__PURE__ */ new Map();
function Ls(n) {
  let e = ht.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), ht.set(n, e)), e;
}
const $s = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function Ws(n, e) {
  const t = n.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, r, i, o, a, l, u, c] = s;
  return [o, r, i, a, l, u, c];
}
function zs(n, e) {
  const t = n.formatToParts(e), s = [];
  for (let r = 0; r < t.length; r++) {
    const { type: i, value: o } = t[r], a = $s[i];
    i === "era" ? s[a] = o : w(a) || (s[a] = parseInt(o, 10));
  }
  return s;
}
const rt = /* @__PURE__ */ new Map();
class X extends Ne {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let t = rt.get(e);
    return t === void 0 && rt.set(e, t = new X(e)), t;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    rt.clear(), ht.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(e) {
    if (!e)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), this.zoneName = e, this.valid = X.isValidZone(e);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !1;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, { format: t, locale: s }) {
    return Gn(e, t, s, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Ce(this.offset(e), t);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    if (!this.valid) return NaN;
    const t = new Date(e);
    if (isNaN(t)) return NaN;
    const s = Ls(this.name);
    let [r, i, o, a, l, u, c] = s.formatToParts ? zs(s, t) : Ws(s, t);
    a === "BC" && (r = -Math.abs(r) + 1);
    const p = Qe({
      year: r,
      month: i,
      day: o,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: c,
      millisecond: 0
    });
    let f = +t;
    const g = f % 1e3;
    return f -= g >= 0 ? g : 1e3 + g, (p - f) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
}
let Wt = {};
function Zs(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Wt[t];
  return s || (s = new Intl.ListFormat(n, e), Wt[t] = s), s;
}
const mt = /* @__PURE__ */ new Map();
function yt(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = mt.get(t);
  return s === void 0 && (s = new Intl.DateTimeFormat(n, e), mt.set(t, s)), s;
}
const gt = /* @__PURE__ */ new Map();
function As(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = gt.get(t);
  return s === void 0 && (s = new Intl.NumberFormat(n, e), gt.set(t, s)), s;
}
const wt = /* @__PURE__ */ new Map();
function Rs(n, e = {}) {
  const { base: t, ...s } = e, r = JSON.stringify([n, s]);
  let i = wt.get(r);
  return i === void 0 && (i = new Intl.RelativeTimeFormat(n, e), wt.set(r, i)), i;
}
let Ee = null;
function Hs() {
  return Ee || (Ee = new Intl.DateTimeFormat().resolvedOptions().locale, Ee);
}
const vt = /* @__PURE__ */ new Map();
function zn(n) {
  let e = vt.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat(n).resolvedOptions(), vt.set(n, e)), e;
}
const pt = /* @__PURE__ */ new Map();
function Us(n) {
  let e = pt.get(n);
  if (!e) {
    const t = new Intl.Locale(n);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, "minimalDays" in e || (e = { ...Zn, ...e }), pt.set(n, e);
  }
  return e;
}
function qs(n) {
  const e = n.indexOf("-x-");
  e !== -1 && (n = n.substring(0, e));
  const t = n.indexOf("-u-");
  if (t === -1)
    return [n];
  {
    let s, r;
    try {
      s = yt(n).resolvedOptions(), r = n;
    } catch {
      const l = n.substring(0, t);
      s = yt(l).resolvedOptions(), r = l;
    }
    const { numberingSystem: i, calendar: o } = s;
    return [r, i, o];
  }
}
function Ps(n, e, t) {
  return (t || e) && (n.includes("-u-") || (n += "-u"), t && (n += `-ca-${t}`), e && (n += `-nu-${e}`)), n;
}
function Ys(n) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const s = h.utc(2009, t, 1);
    e.push(n(s));
  }
  return e;
}
function Bs(n) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const s = h.utc(2016, 11, 13 + t);
    e.push(n(s));
  }
  return e;
}
function $e(n, e, t, s) {
  const r = n.listingMode();
  return r === "error" ? null : r === "en" ? t(e) : s(e);
}
function Gs(n) {
  return n.numberingSystem && n.numberingSystem !== "latn" ? !1 : n.numberingSystem === "latn" || !n.locale || n.locale.startsWith("en") || zn(n.locale).numberingSystem === "latn";
}
class Js {
  constructor(e, t, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: r, floor: i, ...o } = s;
    if (!t || Object.keys(o).length > 0) {
      const a = { useGrouping: !1, ...s };
      s.padTo > 0 && (a.minimumIntegerDigits = s.padTo), this.inf = As(e, a);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : bt(e, 3);
      return b(t, this.padTo);
    }
  }
}
class js {
  constructor(e, t, s) {
    this.opts = s, this.originalZone = void 0;
    let r;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const o = -1 * (e.offset / 60), a = o >= 0 ? `Etc/GMT+${o}` : `Etc/GMT${o}`;
      e.offset !== 0 && X.create(a).valid ? (r = a, this.dt = e) : (r = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, r = e.zone.name) : (r = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const i = { ...this.opts };
    i.timeZone = i.timeZone || r, this.dtf = yt(t, i);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: e }) => e).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? e.map((t) => {
      if (t.type === "timeZoneName") {
        const s = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...t,
          value: s
        };
      } else
        return t;
    }) : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Ks {
  constructor(e, t, s) {
    this.opts = { style: "long", ...s }, !t && Yn() && (this.rtf = Rs(e, s));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : pr(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const Zn = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class E {
  static fromOpts(e) {
    return E.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, s, r, i = !1) {
    const o = e || C.defaultLocale, a = o || (i ? "en-US" : Hs()), l = t || C.defaultNumberingSystem, u = s || C.defaultOutputCalendar, c = Tt(r) || C.defaultWeekSettings;
    return new E(a, l, u, c, o);
  }
  static resetCache() {
    Ee = null, mt.clear(), gt.clear(), wt.clear(), vt.clear(), pt.clear();
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: s, weekSettings: r } = {}) {
    return E.create(e, t, s, r);
  }
  constructor(e, t, s, r, i) {
    const [o, a, l] = qs(e);
    this.locale = o, this.numberingSystem = t || a || null, this.outputCalendar = s || l || null, this.weekSettings = r, this.intl = Ps(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = Gs(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : E.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      Tt(e.weekSettings) || this.weekSettings,
      e.defaultToEN || !1
    );
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(e, t = !1) {
    return $e(this, e, Kn, () => {
      const s = this.intl === "ja" || this.intl.startsWith("ja-");
      t &= !s;
      const r = t ? { month: e, day: "numeric" } : { month: e }, i = t ? "format" : "standalone";
      if (!this.monthsCache[i][e]) {
        const o = s ? (a) => this.dtFormatter(a, r).format() : (a) => this.extract(a, r, "month");
        this.monthsCache[i][e] = Ys(o);
      }
      return this.monthsCache[i][e];
    });
  }
  weekdays(e, t = !1) {
    return $e(this, e, es, () => {
      const s = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, r = t ? "format" : "standalone";
      return this.weekdaysCache[r][e] || (this.weekdaysCache[r][e] = Bs(
        (i) => this.extract(i, s, "weekday")
      )), this.weekdaysCache[r][e];
    });
  }
  meridiems() {
    return $e(
      this,
      void 0,
      () => ts,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [h.utc(2016, 11, 13, 9), h.utc(2016, 11, 13, 19)].map(
            (t) => this.extract(t, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return $e(this, e, ns, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [h.utc(-40, 1, 1), h.utc(2017, 1, 1)].map(
        (s) => this.extract(s, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, s) {
    const r = this.dtFormatter(e, t), i = r.formatToParts(), o = i.find((a) => a.type.toLowerCase() === s);
    return o ? o.value : null;
  }
  numberFormatter(e = {}) {
    return new Js(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new js(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new Ks(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return Zs(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || zn(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : Bn() ? Us(this.locale) : Zn;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return this.locale === e.locale && this.numberingSystem === e.numberingSystem && this.outputCalendar === e.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
}
let it = null;
class F extends Ne {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return it === null && (it = new F(0)), it;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? F.utcInstance : new F(e);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(e) {
    if (e) {
      const t = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (t)
        return new F(Xe(t[1], t[2]));
    }
    return null;
  }
  constructor(e) {
    super(), this.fixed = e;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Ce(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Ce(-this.fixed, "narrow")}`;
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Ce(this.fixed, t);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !0;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return !0;
  }
}
class Qs extends Ne {
  constructor(e) {
    super(), this.zoneName = e;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function ne(n, e) {
  if (w(n) || n === null)
    return e;
  if (n instanceof Ne)
    return n;
  if (rr(n)) {
    const t = n.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? je.instance : t === "utc" || t === "gmt" ? F.utcInstance : F.parseSpecifier(t) || X.create(n);
  } else return re(n) ? F.instance(n) : typeof n == "object" && "offset" in n && typeof n.offset == "function" ? n : new Qs(n);
}
const Et = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, zt = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, Xs = Et.hanidec.replace(/[\[|\]]/g, "").split("");
function er(n) {
  let e = parseInt(n, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < n.length; t++) {
      const s = n.charCodeAt(t);
      if (n[t].search(Et.hanidec) !== -1)
        e += Xs.indexOf(n[t]);
      else
        for (const r in zt) {
          const [i, o] = zt[r];
          s >= i && s <= o && (e += s - i);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const kt = /* @__PURE__ */ new Map();
function tr() {
  kt.clear();
}
function U({ numberingSystem: n }, e = "") {
  const t = n || "latn";
  let s = kt.get(t);
  s === void 0 && (s = /* @__PURE__ */ new Map(), kt.set(t, s));
  let r = s.get(e);
  return r === void 0 && (r = new RegExp(`${Et[t]}${e}`), s.set(e, r)), r;
}
let Zt = () => Date.now(), At = "system", Rt = null, Ht = null, Ut = null, qt = 60, Pt, Yt = null;
class C {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Zt;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Zt = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    At = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return ne(At, je.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Rt;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    Rt = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return Ht;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    Ht = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Ut;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    Ut = e;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return Yt;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    Yt = Tt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return qt;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(e) {
    qt = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Pt;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Pt = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    E.resetCache(), X.resetCache(), h.resetCache(), tr();
  }
}
class P {
  constructor(e, t) {
    this.reason = e, this.explanation = t;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const An = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Rn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function A(n, e) {
  return new P(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${n}, which is invalid`
  );
}
function xt(n, e, t) {
  const s = new Date(Date.UTC(n, e - 1, t));
  n < 100 && n >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const r = s.getUTCDay();
  return r === 0 ? 7 : r;
}
function Hn(n, e, t) {
  return t + (Ve(n) ? Rn : An)[e - 1];
}
function Un(n, e) {
  const t = Ve(n) ? Rn : An, s = t.findIndex((i) => i < e), r = e - t[s];
  return { month: s + 1, day: r };
}
function It(n, e) {
  return (n - e + 7) % 7 + 1;
}
function Be(n, e = 4, t = 1) {
  const { year: s, month: r, day: i } = n, o = Hn(s, r, i), a = It(xt(s, r, i), t);
  let l = Math.floor((o - a + 14 - e) / 7), u;
  return l < 1 ? (u = s - 1, l = be(u, e, t)) : l > be(s, e, t) ? (u = s + 1, l = 1) : u = s, { weekYear: u, weekNumber: l, weekday: a, ...et(n) };
}
function Bt(n, e = 4, t = 1) {
  const { weekYear: s, weekNumber: r, weekday: i } = n, o = It(xt(s, 1, e), t), a = ge(s);
  let l = r * 7 + i - o - 7 + e, u;
  l < 1 ? (u = s - 1, l += ge(u)) : l > a ? (u = s + 1, l -= ge(s)) : u = s;
  const { month: c, day: m } = Un(u, l);
  return { year: u, month: c, day: m, ...et(n) };
}
function at(n) {
  const { year: e, month: t, day: s } = n, r = Hn(e, t, s);
  return { year: e, ordinal: r, ...et(n) };
}
function Gt(n) {
  const { year: e, ordinal: t } = n, { month: s, day: r } = Un(e, t);
  return { year: e, month: s, day: r, ...et(n) };
}
function Jt(n, e) {
  if (!w(n.localWeekday) || !w(n.localWeekNumber) || !w(n.localWeekYear)) {
    if (!w(n.weekday) || !w(n.weekNumber) || !w(n.weekYear))
      throw new me(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return w(n.localWeekday) || (n.weekday = n.localWeekday), w(n.localWeekNumber) || (n.weekNumber = n.localWeekNumber), w(n.localWeekYear) || (n.weekYear = n.localWeekYear), delete n.localWeekday, delete n.localWeekNumber, delete n.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function nr(n, e = 4, t = 1) {
  const s = Ke(n.weekYear), r = R(
    n.weekNumber,
    1,
    be(n.weekYear, e, t)
  ), i = R(n.weekday, 1, 7);
  return s ? r ? i ? !1 : A("weekday", n.weekday) : A("week", n.weekNumber) : A("weekYear", n.weekYear);
}
function sr(n) {
  const e = Ke(n.year), t = R(n.ordinal, 1, ge(n.year));
  return e ? t ? !1 : A("ordinal", n.ordinal) : A("year", n.year);
}
function qn(n) {
  const e = Ke(n.year), t = R(n.month, 1, 12), s = R(n.day, 1, Ge(n.year, n.month));
  return e ? t ? s ? !1 : A("day", n.day) : A("month", n.month) : A("year", n.year);
}
function Pn(n) {
  const { hour: e, minute: t, second: s, millisecond: r } = n, i = R(e, 0, 23) || e === 24 && t === 0 && s === 0 && r === 0, o = R(t, 0, 59), a = R(s, 0, 59), l = R(r, 0, 999);
  return i ? o ? a ? l ? !1 : A("millisecond", r) : A("second", s) : A("minute", t) : A("hour", e);
}
function w(n) {
  return typeof n > "u";
}
function re(n) {
  return typeof n == "number";
}
function Ke(n) {
  return typeof n == "number" && n % 1 === 0;
}
function rr(n) {
  return typeof n == "string";
}
function ir(n) {
  return Object.prototype.toString.call(n) === "[object Date]";
}
function Yn() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function Bn() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function ar(n) {
  return Array.isArray(n) ? n : [n];
}
function jt(n, e, t) {
  if (n.length !== 0)
    return n.reduce((s, r) => {
      const i = [e(r), r];
      return s && t(s[0], i[0]) === s[0] ? s : i;
    }, null)[1];
}
function or(n, e) {
  return e.reduce((t, s) => (t[s] = n[s], t), {});
}
function ve(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Tt(n) {
  if (n == null)
    return null;
  if (typeof n != "object")
    throw new V("Week settings must be an object");
  if (!R(n.firstDay, 1, 7) || !R(n.minimalDays, 1, 7) || !Array.isArray(n.weekend) || n.weekend.some((e) => !R(e, 1, 7)))
    throw new V("Invalid week settings");
  return {
    firstDay: n.firstDay,
    minimalDays: n.minimalDays,
    weekend: Array.from(n.weekend)
  };
}
function R(n, e, t) {
  return Ke(n) && n >= e && n <= t;
}
function lr(n, e) {
  return n - e * Math.floor(n / e);
}
function b(n, e = 2) {
  const t = n < 0;
  let s;
  return t ? s = "-" + ("" + -n).padStart(e, "0") : s = ("" + n).padStart(e, "0"), s;
}
function te(n) {
  if (!(w(n) || n === null || n === ""))
    return parseInt(n, 10);
}
function ie(n) {
  if (!(w(n) || n === null || n === ""))
    return parseFloat(n);
}
function Ct(n) {
  if (!(w(n) || n === null || n === "")) {
    const e = parseFloat("0." + n) * 1e3;
    return Math.floor(e);
  }
}
function bt(n, e, t = "round") {
  const s = 10 ** e;
  switch (t) {
    case "expand":
      return n > 0 ? Math.ceil(n * s) / s : Math.floor(n * s) / s;
    case "trunc":
      return Math.trunc(n * s) / s;
    case "round":
      return Math.round(n * s) / s;
    case "floor":
      return Math.floor(n * s) / s;
    case "ceil":
      return Math.ceil(n * s) / s;
    default:
      throw new RangeError(`Value rounding ${t} is out of range`);
  }
}
function Ve(n) {
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0);
}
function ge(n) {
  return Ve(n) ? 366 : 365;
}
function Ge(n, e) {
  const t = lr(e - 1, 12) + 1, s = n + (e - t) / 12;
  return t === 2 ? Ve(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function Qe(n) {
  let e = Date.UTC(
    n.year,
    n.month - 1,
    n.day,
    n.hour,
    n.minute,
    n.second,
    n.millisecond
  );
  return n.year < 100 && n.year >= 0 && (e = new Date(e), e.setUTCFullYear(n.year, n.month - 1, n.day)), +e;
}
function Kt(n, e, t) {
  return -It(xt(n, 1, e), t) + e - 1;
}
function be(n, e = 4, t = 1) {
  const s = Kt(n, e, t), r = Kt(n + 1, e, t);
  return (ge(n) - s + r) / 7;
}
function Ot(n) {
  return n > 99 ? n : n > C.twoDigitCutoffYear ? 1900 + n : 2e3 + n;
}
function Gn(n, e, t, s = null) {
  const r = new Date(n), i = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (i.timeZone = s);
  const o = { timeZoneName: e, ...i }, a = new Intl.DateTimeFormat(t, o).formatToParts(r).find((l) => l.type.toLowerCase() === "timezonename");
  return a ? a.value : null;
}
function Xe(n, e) {
  let t = parseInt(n, 10);
  Number.isNaN(t) && (t = 0);
  const s = parseInt(e, 10) || 0, r = t < 0 || Object.is(t, -0) ? -s : s;
  return t * 60 + r;
}
function Jn(n) {
  const e = Number(n);
  if (typeof n == "boolean" || n === "" || !Number.isFinite(e))
    throw new V(`Invalid unit value ${n}`);
  return e;
}
function Je(n, e) {
  const t = {};
  for (const s in n)
    if (ve(n, s)) {
      const r = n[s];
      if (r == null) continue;
      t[e(s)] = Jn(r);
    }
  return t;
}
function Ce(n, e) {
  const t = Math.trunc(Math.abs(n / 60)), s = Math.trunc(Math.abs(n % 60)), r = n >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${r}${b(t, 2)}:${b(s, 2)}`;
    case "narrow":
      return `${r}${t}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${r}${b(t, 2)}${b(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function et(n) {
  return or(n, ["hour", "minute", "second", "millisecond"]);
}
const ur = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], jn = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], cr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Kn(n) {
  switch (n) {
    case "narrow":
      return [...cr];
    case "short":
      return [...jn];
    case "long":
      return [...ur];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const Qn = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], Xn = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], dr = ["M", "T", "W", "T", "F", "S", "S"];
function es(n) {
  switch (n) {
    case "narrow":
      return [...dr];
    case "short":
      return [...Xn];
    case "long":
      return [...Qn];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const ts = ["AM", "PM"], fr = ["Before Christ", "Anno Domini"], hr = ["BC", "AD"], mr = ["B", "A"];
function ns(n) {
  switch (n) {
    case "narrow":
      return [...mr];
    case "short":
      return [...hr];
    case "long":
      return [...fr];
    default:
      return null;
  }
}
function yr(n) {
  return ts[n.hour < 12 ? 0 : 1];
}
function gr(n, e) {
  return es(e)[n.weekday - 1];
}
function wr(n, e) {
  return Kn(e)[n.month - 1];
}
function vr(n, e) {
  return ns(e)[n.year < 0 ? 0 : 1];
}
function pr(n, e, t = "always", s = !1) {
  const r = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, i = ["hours", "minutes", "seconds"].indexOf(n) === -1;
  if (t === "auto" && i) {
    const m = n === "days";
    switch (e) {
      case 1:
        return m ? "tomorrow" : `next ${r[n][0]}`;
      case -1:
        return m ? "yesterday" : `last ${r[n][0]}`;
      case 0:
        return m ? "today" : `this ${r[n][0]}`;
    }
  }
  const o = Object.is(e, -0) || e < 0, a = Math.abs(e), l = a === 1, u = r[n], c = s ? l ? u[1] : u[2] || u[1] : l ? r[n][0] : n;
  return o ? `${a} ${c} ago` : `in ${a} ${c}`;
}
function Qt(n, e) {
  let t = "";
  for (const s of n)
    s.literal ? t += s.val : t += e(s.val);
  return t;
}
const kr = {
  D: Ye,
  DD: pn,
  DDD: kn,
  DDDD: Tn,
  t: On,
  tt: Sn,
  ttt: Dn,
  tttt: Mn,
  T: En,
  TT: xn,
  TTT: In,
  TTTT: Cn,
  f: bn,
  ff: Vn,
  fff: Fn,
  ffff: $n,
  F: Nn,
  FF: _n,
  FFF: Ln,
  FFFF: Wn
};
class _ {
  static create(e, t = {}) {
    return new _(e, t);
  }
  static parseFormat(e) {
    let t = null, s = "", r = !1;
    const i = [];
    for (let o = 0; o < e.length; o++) {
      const a = e.charAt(o);
      a === "'" ? ((s.length > 0 || r) && i.push({
        literal: r || /^\s+$/.test(s),
        val: s === "" ? "'" : s
      }), t = null, s = "", r = !r) : r || a === t ? s += a : (s.length > 0 && i.push({ literal: /^\s+$/.test(s), val: s }), s = a, t = a);
    }
    return s.length > 0 && i.push({ literal: r || /^\s+$/.test(s), val: s }), i;
  }
  static macroTokenToFormatOpts(e) {
    return kr[e];
  }
  constructor(e, t) {
    this.opts = t, this.loc = e, this.systemLoc = null;
  }
  formatWithSystemDefault(e, t) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, { ...this.opts, ...t }).format();
  }
  dtFormatter(e, t = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...t });
  }
  formatDateTime(e, t) {
    return this.dtFormatter(e, t).format();
  }
  formatDateTimeParts(e, t) {
    return this.dtFormatter(e, t).formatToParts();
  }
  formatInterval(e, t) {
    return this.dtFormatter(e.start, t).dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
  }
  resolvedOptions(e, t) {
    return this.dtFormatter(e, t).resolvedOptions();
  }
  num(e, t = 0, s = void 0) {
    if (this.opts.forceSimple)
      return b(e, t);
    const r = { ...this.opts };
    return t > 0 && (r.padTo = t), s && (r.signDisplay = s), this.loc.numberFormatter(r).format(e);
  }
  formatDateTimeFromString(e, t) {
    const s = this.loc.listingMode() === "en", r = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", i = (f, g) => this.loc.extract(e, f, g), o = (f) => e.isOffsetFixed && e.offset === 0 && f.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, f.format) : "", a = () => s ? yr(e) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (f, g) => s ? wr(e, f) : i(g ? { month: f } : { month: f, day: "numeric" }, "month"), u = (f, g) => s ? gr(e, f) : i(
      g ? { weekday: f } : { weekday: f, month: "long", day: "numeric" },
      "weekday"
    ), c = (f) => {
      const g = _.macroTokenToFormatOpts(f);
      return g ? this.formatWithSystemDefault(e, g) : f;
    }, m = (f) => s ? vr(e, f) : i({ era: f }, "era"), p = (f) => {
      switch (f) {
        case "S":
          return this.num(e.millisecond);
        case "u":
        case "SSS":
          return this.num(e.millisecond, 3);
        case "s":
          return this.num(e.second);
        case "ss":
          return this.num(e.second, 2);
        case "uu":
          return this.num(Math.floor(e.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(e.millisecond / 100));
        case "m":
          return this.num(e.minute);
        case "mm":
          return this.num(e.minute, 2);
        case "h":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
        case "hh":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
        case "H":
          return this.num(e.hour);
        case "HH":
          return this.num(e.hour, 2);
        case "Z":
          return o({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return o({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return o({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return e.zone.offsetName(e.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return e.zone.offsetName(e.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return e.zoneName;
        case "a":
          return a();
        case "d":
          return r ? i({ day: "numeric" }, "day") : this.num(e.day);
        case "dd":
          return r ? i({ day: "2-digit" }, "day") : this.num(e.day, 2);
        case "c":
          return this.num(e.weekday);
        case "ccc":
          return u("short", !0);
        case "cccc":
          return u("long", !0);
        case "ccccc":
          return u("narrow", !0);
        case "E":
          return this.num(e.weekday);
        case "EEE":
          return u("short", !1);
        case "EEEE":
          return u("long", !1);
        case "EEEEE":
          return u("narrow", !1);
        case "L":
          return r ? i({ month: "numeric", day: "numeric" }, "month") : this.num(e.month);
        case "LL":
          return r ? i({ month: "2-digit", day: "numeric" }, "month") : this.num(e.month, 2);
        case "LLL":
          return l("short", !0);
        case "LLLL":
          return l("long", !0);
        case "LLLLL":
          return l("narrow", !0);
        case "M":
          return r ? i({ month: "numeric" }, "month") : this.num(e.month);
        case "MM":
          return r ? i({ month: "2-digit" }, "month") : this.num(e.month, 2);
        case "MMM":
          return l("short", !1);
        case "MMMM":
          return l("long", !1);
        case "MMMMM":
          return l("narrow", !1);
        case "y":
          return r ? i({ year: "numeric" }, "year") : this.num(e.year);
        case "yy":
          return r ? i({ year: "2-digit" }, "year") : this.num(e.year.toString().slice(-2), 2);
        case "yyyy":
          return r ? i({ year: "numeric" }, "year") : this.num(e.year, 4);
        case "yyyyyy":
          return r ? i({ year: "numeric" }, "year") : this.num(e.year, 6);
        case "G":
          return m("short");
        case "GG":
          return m("long");
        case "GGGGG":
          return m("narrow");
        case "kk":
          return this.num(e.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(e.weekYear, 4);
        case "W":
          return this.num(e.weekNumber);
        case "WW":
          return this.num(e.weekNumber, 2);
        case "n":
          return this.num(e.localWeekNumber);
        case "nn":
          return this.num(e.localWeekNumber, 2);
        case "ii":
          return this.num(e.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(e.localWeekYear, 4);
        case "o":
          return this.num(e.ordinal);
        case "ooo":
          return this.num(e.ordinal, 3);
        case "q":
          return this.num(e.quarter);
        case "qq":
          return this.num(e.quarter, 2);
        case "X":
          return this.num(Math.floor(e.ts / 1e3));
        case "x":
          return this.num(e.ts);
        default:
          return c(f);
      }
    };
    return Qt(_.parseFormat(t), p);
  }
  formatDurationFromString(e, t) {
    const s = this.opts.signMode === "negativeLargestOnly" ? -1 : 1, r = (c) => {
      switch (c[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "w":
          return "weeks";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return null;
      }
    }, i = (c, m) => (p) => {
      const f = r(p);
      if (f) {
        const g = m.isNegativeDuration && f !== m.largestUnit ? s : 1;
        let O;
        return this.opts.signMode === "negativeLargestOnly" && f !== m.largestUnit ? O = "never" : this.opts.signMode === "all" ? O = "always" : O = "auto", this.num(c.get(f) * g, p.length, O);
      } else
        return p;
    }, o = _.parseFormat(t), a = o.reduce(
      (c, { literal: m, val: p }) => m ? c : c.concat(p),
      []
    ), l = e.shiftTo(...a.map(r).filter((c) => c)), u = {
      isNegativeDuration: l < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(l.values)[0]
    };
    return Qt(o, i(l, u));
  }
}
const ss = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function pe(...n) {
  const e = n.reduce((t, s) => t + s.source, "");
  return RegExp(`^${e}$`);
}
function ke(...n) {
  return (e) => n.reduce(
    ([t, s, r], i) => {
      const [o, a, l] = i(e, r);
      return [{ ...t, ...o }, a || s, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function Te(n, ...e) {
  if (n == null)
    return [null, null];
  for (const [t, s] of e) {
    const r = t.exec(n);
    if (r)
      return s(r);
  }
  return [null, null];
}
function rs(...n) {
  return (e, t) => {
    const s = {};
    let r;
    for (r = 0; r < n.length; r++)
      s[n[r]] = te(e[t + r]);
    return [s, null, t + r];
  };
}
const is = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, Tr = `(?:${is.source}?(?:\\[(${ss.source})\\])?)?`, Nt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, as = RegExp(`${Nt.source}${Tr}`), Vt = RegExp(`(?:[Tt]${as.source})?`), Or = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Sr = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Dr = /(\d{4})-?(\d{3})/, Mr = rs("weekYear", "weekNumber", "weekDay"), Er = rs("year", "ordinal"), xr = /(\d{4})-(\d\d)-(\d\d)/, os = RegExp(
  `${Nt.source} ?(?:${is.source}|(${ss.source}))?`
), Ir = RegExp(`(?: ${os.source})?`);
function we(n, e, t) {
  const s = n[e];
  return w(s) ? t : te(s);
}
function Cr(n, e) {
  return [{
    year: we(n, e),
    month: we(n, e + 1, 1),
    day: we(n, e + 2, 1)
  }, null, e + 3];
}
function Oe(n, e) {
  return [{
    hours: we(n, e, 0),
    minutes: we(n, e + 1, 0),
    seconds: we(n, e + 2, 0),
    milliseconds: Ct(n[e + 3])
  }, null, e + 4];
}
function _e(n, e) {
  const t = !n[e] && !n[e + 1], s = Xe(n[e + 1], n[e + 2]), r = t ? null : F.instance(s);
  return [{}, r, e + 3];
}
function Fe(n, e) {
  const t = n[e] ? X.create(n[e]) : null;
  return [{}, t, e + 1];
}
const br = RegExp(`^T?${Nt.source}$`), Nr = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Vr(n) {
  const [e, t, s, r, i, o, a, l, u] = n, c = e[0] === "-", m = l && l[0] === "-", p = (f, g = !1) => f !== void 0 && (g || f && c) ? -f : f;
  return [
    {
      years: p(ie(t)),
      months: p(ie(s)),
      weeks: p(ie(r)),
      days: p(ie(i)),
      hours: p(ie(o)),
      minutes: p(ie(a)),
      seconds: p(ie(l), l === "-0"),
      milliseconds: p(Ct(u), m)
    }
  ];
}
const _r = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function _t(n, e, t, s, r, i, o) {
  const a = {
    year: e.length === 2 ? Ot(te(e)) : te(e),
    month: jn.indexOf(t) + 1,
    day: te(s),
    hour: te(r),
    minute: te(i)
  };
  return o && (a.second = te(o)), n && (a.weekday = n.length > 3 ? Qn.indexOf(n) + 1 : Xn.indexOf(n) + 1), a;
}
const Fr = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Lr(n) {
  const [
    ,
    e,
    t,
    s,
    r,
    i,
    o,
    a,
    l,
    u,
    c,
    m
  ] = n, p = _t(e, r, s, t, i, o, a);
  let f;
  return l ? f = _r[l] : u ? f = 0 : f = Xe(c, m), [p, new F(f)];
}
function $r(n) {
  return n.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const Wr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, zr = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Zr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Xt(n) {
  const [, e, t, s, r, i, o, a] = n;
  return [_t(e, r, s, t, i, o, a), F.utcInstance];
}
function Ar(n) {
  const [, e, t, s, r, i, o, a] = n;
  return [_t(e, a, t, s, r, i, o), F.utcInstance];
}
const Rr = pe(Or, Vt), Hr = pe(Sr, Vt), Ur = pe(Dr, Vt), qr = pe(as), ls = ke(
  Cr,
  Oe,
  _e,
  Fe
), Pr = ke(
  Mr,
  Oe,
  _e,
  Fe
), Yr = ke(
  Er,
  Oe,
  _e,
  Fe
), Br = ke(
  Oe,
  _e,
  Fe
);
function Gr(n) {
  return Te(
    n,
    [Rr, ls],
    [Hr, Pr],
    [Ur, Yr],
    [qr, Br]
  );
}
function Jr(n) {
  return Te($r(n), [Fr, Lr]);
}
function jr(n) {
  return Te(
    n,
    [Wr, Xt],
    [zr, Xt],
    [Zr, Ar]
  );
}
function Kr(n) {
  return Te(n, [Nr, Vr]);
}
const Qr = ke(Oe);
function Xr(n) {
  return Te(n, [br, Qr]);
}
const ei = pe(xr, Ir), ti = pe(os), ni = ke(
  Oe,
  _e,
  Fe
);
function si(n) {
  return Te(
    n,
    [ei, ls],
    [ti, ni]
  );
}
const en = "Invalid Duration", us = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, ri = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...us
}, z = 146097 / 400, de = 146097 / 4800, ii = {
  years: {
    quarters: 4,
    months: 12,
    weeks: z / 7,
    days: z,
    hours: z * 24,
    minutes: z * 24 * 60,
    seconds: z * 24 * 60 * 60,
    milliseconds: z * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: z / 28,
    days: z / 4,
    hours: z * 24 / 4,
    minutes: z * 24 * 60 / 4,
    seconds: z * 24 * 60 * 60 / 4,
    milliseconds: z * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: de / 7,
    days: de,
    hours: de * 24,
    minutes: de * 24 * 60,
    seconds: de * 24 * 60 * 60,
    milliseconds: de * 24 * 60 * 60 * 1e3
  },
  ...us
}, oe = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], ai = oe.slice(0).reverse();
function j(n, e, t = !1) {
  const s = {
    values: t ? e.values : { ...n.values, ...e.values || {} },
    loc: n.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || n.conversionAccuracy,
    matrix: e.matrix || n.matrix
  };
  return new T(s);
}
function cs(n, e) {
  let t = e.milliseconds ?? 0;
  for (const s of ai.slice(1))
    e[s] && (t += e[s] * n[s].milliseconds);
  return t;
}
function tn(n, e) {
  const t = cs(n, e) < 0 ? -1 : 1;
  oe.reduceRight((s, r) => {
    if (w(e[r]))
      return s;
    if (s) {
      const i = e[s] * t, o = n[r][s], a = Math.floor(i / o);
      e[r] += a * t, e[s] -= a * o * t;
    }
    return r;
  }, null), oe.reduce((s, r) => {
    if (w(e[r]))
      return s;
    if (s) {
      const i = e[s] % 1;
      e[s] -= i, e[r] += i * n[s][r];
    }
    return r;
  }, null);
}
function nn(n) {
  const e = {};
  for (const [t, s] of Object.entries(n))
    s !== 0 && (e[t] = s);
  return e;
}
class T {
  /**
   * @private
   */
  constructor(e) {
    const t = e.conversionAccuracy === "longterm" || !1;
    let s = t ? ii : ri;
    e.matrix && (s = e.matrix), this.values = e.values, this.loc = e.loc || E.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = s, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(e, t) {
    return T.fromObject({ milliseconds: e }, t);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(e, t = {}) {
    if (e == null || typeof e != "object")
      throw new V(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new T({
      values: Je(e, T.normalizeUnit),
      loc: E.fromObject(t),
      conversionAccuracy: t.conversionAccuracy,
      matrix: t.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(e) {
    if (re(e))
      return T.fromMillis(e);
    if (T.isDuration(e))
      return e;
    if (typeof e == "object")
      return T.fromObject(e);
    throw new V(
      `Unknown duration argument ${e} of type ${typeof e}`
    );
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(e, t) {
    const [s] = Kr(e);
    return s ? T.fromObject(s, t) : T.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(e, t) {
    const [s] = Xr(e);
    return s ? T.fromObject(s, t) : T.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new V("need to specify a reason the Duration is invalid");
    const s = e instanceof P ? e : new P(e, t);
    if (C.throwOnInvalid)
      throw new Vs(s);
    return new T({ invalid: s });
  }
  /**
   * @private
   */
  static normalizeUnit(e) {
    const t = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[e && e.toLowerCase()];
    if (!t) throw new vn(e);
    return t;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(e) {
    return e && e.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @param {'negative'|'all'|'negativeLargestOnly'} [opts.signMode=negative] - How to handle signs
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @example Duration.fromObject({ days: 6, seconds: 2 }).toFormat("d s", { signMode: "all" }) //=> "+6 +2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "all" }) //=> "-6 -2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "negativeLargestOnly" }) //=> "-6 2"
   * @return {string}
   */
  toFormat(e, t = {}) {
    const s = {
      ...t,
      floor: t.round !== !1 && t.floor !== !1
    };
    return this.isValid ? _.create(this.loc, s).formatDurationFromString(this, e) : en;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @param {boolean} [opts.showZeros=true] - Show all units previously used by the duration even if they are zero
   * @example
   * ```js
   * var dur = Duration.fromObject({ months: 1, weeks: 0, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 month, 0 weeks, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 month, 0 weeks, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 mth, 0 wks, 5 hr, 6 min'
   * dur.toHuman({ showZeros: false }) //=> '1 month, 5 hours, 6 minutes'
   * ```
   */
  toHuman(e = {}) {
    if (!this.isValid) return en;
    const t = e.showZeros !== !1, s = oe.map((r) => {
      const i = this.values[r];
      return w(i) || i === 0 && !t ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: r.slice(0, -1) }).format(i);
    }).filter((r) => r);
    return this.loc.listFormatter({ type: "conjunction", style: e.listStyle || "narrow", ...e }).format(s);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) return null;
    let e = "P";
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += bt(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(e = {}) {
    if (!this.isValid) return null;
    const t = this.toMillis();
    return t < 0 || t >= 864e5 ? null : (e = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...e,
      includeOffset: !1
    }, h.fromMillis(t, { zone: "UTC" }).toISOTime(e));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? cs(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(e) {
    if (!this.isValid) return this;
    const t = T.fromDurationLike(e), s = {};
    for (const r of oe)
      (ve(t.values, r) || ve(this.values, r)) && (s[r] = t.get(r) + this.get(r));
    return j(this, { values: s }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = T.fromDurationLike(e);
    return this.plus(t.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(e) {
    if (!this.isValid) return this;
    const t = {};
    for (const s of Object.keys(this.values))
      t[s] = Jn(e(this.values[s], s));
    return j(this, { values: t }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(e) {
    return this[T.normalizeUnit(e)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(e) {
    if (!this.isValid) return this;
    const t = { ...this.values, ...Je(e, T.normalizeUnit) };
    return j(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: s, matrix: r } = {}) {
    const o = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: r, conversionAccuracy: s };
    return j(this, o);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const e = this.toObject();
    return tn(this.matrix, e), j(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = nn(this.normalize().shiftToAll().toObject());
    return j(this, { values: e }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...e) {
    if (!this.isValid) return this;
    if (e.length === 0)
      return this;
    e = e.map((o) => T.normalizeUnit(o));
    const t = {}, s = {}, r = this.toObject();
    let i;
    for (const o of oe)
      if (e.indexOf(o) >= 0) {
        i = o;
        let a = 0;
        for (const u in s)
          a += this.matrix[u][o] * s[u], s[u] = 0;
        re(r[o]) && (a += r[o]);
        const l = Math.trunc(a);
        t[o] = l, s[o] = (a * 1e3 - l * 1e3) / 1e3;
      } else re(r[o]) && (s[o] = r[o]);
    for (const o in s)
      s[o] !== 0 && (t[i] += o === i ? s[o] : s[o] / this.matrix[i][o]);
    return tn(this.matrix, t), j(this, { values: t }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ) : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const e = {};
    for (const t of Object.keys(this.values))
      e[t] = this.values[t] === 0 ? 0 : -this.values[t];
    return j(this, { values: e }, !0);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const e = nn(this.values);
    return j(this, { values: e }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(e) {
    if (!this.isValid || !e.isValid || !this.loc.equals(e.loc))
      return !1;
    function t(s, r) {
      return s === void 0 || s === 0 ? r === void 0 || r === 0 : s === r;
    }
    for (const s of oe)
      if (!t(this.values[s], e.values[s]))
        return !1;
    return !0;
  }
}
const fe = "Invalid Interval";
function oi(n, e) {
  return !n || !n.isValid ? I.invalid("missing or invalid start") : !e || !e.isValid ? I.invalid("missing or invalid end") : e < n ? I.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${n.toISO()} and end=${e.toISO()}`
  ) : null;
}
class I {
  /**
   * @private
   */
  constructor(e) {
    this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new V("need to specify a reason the Interval is invalid");
    const s = e instanceof P ? e : new P(e, t);
    if (C.throwOnInvalid)
      throw new Ns(s);
    return new I({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const s = Me(e), r = Me(t), i = oi(s, r);
    return i ?? new I({
      start: s,
      end: r
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(e, t) {
    const s = T.fromDurationLike(t), r = Me(e);
    return I.fromDateTimes(r, r.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const s = T.fromDurationLike(t), r = Me(e);
    return I.fromDateTimes(r.minus(s), r);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(e, t) {
    const [s, r] = (e || "").split("/", 2);
    if (s && r) {
      let i, o;
      try {
        i = h.fromISO(s, t), o = i.isValid;
      } catch {
        o = !1;
      }
      let a, l;
      try {
        a = h.fromISO(r, t), l = a.isValid;
      } catch {
        l = !1;
      }
      if (o && l)
        return I.fromDateTimes(i, a);
      if (o) {
        const u = T.fromISO(r, t);
        if (u.isValid)
          return I.after(i, u);
      } else if (l) {
        const u = T.fromISO(s, t);
        if (u.isValid)
          return I.before(a, u);
      }
    }
    return I.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(e) {
    return e && e.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval. This is the first instant which is not part of the interval
   * (Interval is half-open).
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns the last DateTime included in the interval (since end is not part of the interval)
   * @type {DateTime}
   */
  get lastDateTime() {
    return this.isValid && this.e ? this.e.minus(1) : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(e = "milliseconds", t) {
    if (!this.isValid) return NaN;
    const s = this.start.startOf(e, t);
    let r;
    return t != null && t.useLocaleWeeks ? r = this.end.reconfigure({ locale: s.locale }) : r = this.end, r = r.startOf(e, t), Math.floor(r.diff(s, e).get(e)) + (r.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(e) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(e) {
    return this.isValid ? this.s > e : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(e) {
    return this.isValid ? this.e <= e : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(e) {
    return this.isValid ? this.s <= e && this.e > e : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start: e, end: t } = {}) {
    return this.isValid ? I.fromDateTimes(e || this.s, t || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const t = e.map(Me).filter((o) => this.contains(o)).sort((o, a) => o.toMillis() - a.toMillis()), s = [];
    let { s: r } = this, i = 0;
    for (; r < this.e; ) {
      const o = t[i] || this.e, a = +o > +this.e ? this.e : o;
      s.push(I.fromDateTimes(r, a)), r = a, i += 1;
    }
    return s;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(e) {
    const t = T.fromDurationLike(e);
    if (!this.isValid || !t.isValid || t.as("milliseconds") === 0)
      return [];
    let { s } = this, r = 1, i;
    const o = [];
    for (; s < this.e; ) {
      const a = this.start.plus(t.mapUnits((l) => l * r));
      i = +a > +this.e ? this.e : a, o.push(I.fromDateTimes(s, i)), s = i, r += 1;
    }
    return o;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(e) {
    return this.isValid ? +this.e == +e.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(e) {
    return this.isValid ? +e.e == +this.s : !1;
  }
  /**
   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(e) {
    return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(e) {
    return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(e) {
    if (!this.isValid) return this;
    const t = this.s > e.s ? this.s : e.s, s = this.e < e.e ? this.e : e.e;
    return t >= s ? null : I.fromDateTimes(t, s);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(e) {
    if (!this.isValid) return this;
    const t = this.s < e.s ? this.s : e.s, s = this.e > e.e ? this.e : e.e;
    return I.fromDateTimes(t, s);
  }
  /**
   * Merge an array of Intervals into an equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
   * and ending with the latest.
   *
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(e) {
    const [t, s] = e.sort((r, i) => r.s - i.s).reduce(
      ([r, i], o) => i ? i.overlaps(o) || i.abutsStart(o) ? [r, i.union(o)] : [r.concat([i]), o] : [r, o],
      [[], null]
    );
    return s && t.push(s), t;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(e) {
    let t = null, s = 0;
    const r = [], i = e.map((l) => [
      { time: l.s, type: "s" },
      { time: l.e, type: "e" }
    ]), o = Array.prototype.concat(...i), a = o.sort((l, u) => l.time - u.time);
    for (const l of a)
      s += l.type === "s" ? 1 : -1, s === 1 ? t = l.time : (t && +t != +l.time && r.push(I.fromDateTimes(t, l.time)), t = null);
    return I.merge(r);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return I.xor([this].concat(e)).map((t) => this.intersection(t)).filter((t) => t && !t.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : fe;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(e = Ye, t = {}) {
    return this.isValid ? _.create(this.s.loc.clone(t), e).formatInterval(this) : fe;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : fe;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : fe;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : fe;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(e, { separator: t = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : fe;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(e, t) {
    return this.isValid ? this.e.diff(this.s, e, t) : T.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return I.fromDateTimes(e(this.s), e(this.e));
  }
}
class We {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = C.defaultZone) {
    const t = h.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return X.isValidZone(e);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(e) {
    return ne(e, C.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || E.create(e)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || E.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || E.create(e)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(e = "long", { locale: t = null, numberingSystem: s = null, locObj: r = null, outputCalendar: i = "gregory" } = {}) {
    return (r || E.create(t, s, i)).months(e);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(e = "long", { locale: t = null, numberingSystem: s = null, locObj: r = null, outputCalendar: i = "gregory" } = {}) {
    return (r || E.create(t, s, i)).months(e, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(e = "long", { locale: t = null, numberingSystem: s = null, locObj: r = null } = {}) {
    return (r || E.create(t, s, null)).weekdays(e);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(e = "long", { locale: t = null, numberingSystem: s = null, locObj: r = null } = {}) {
    return (r || E.create(t, s, null)).weekdays(e, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale: e = null } = {}) {
    return E.create(e).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(e = "short", { locale: t = null } = {}) {
    return E.create(t, null, "gregory").eras(e);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: Yn(), localeWeek: Bn() };
  }
}
function sn(n, e) {
  const t = (r) => r.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = t(e) - t(n);
  return Math.floor(T.fromMillis(s).as("days"));
}
function li(n, e, t) {
  const s = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const c = sn(l, u);
        return (c - c % 7) / 7;
      }
    ],
    ["days", sn]
  ], r = {}, i = n;
  let o, a;
  for (const [l, u] of s)
    t.indexOf(l) >= 0 && (o = l, r[l] = u(n, e), a = i.plus(r), a > e ? (r[l]--, n = i.plus(r), n > e && (a = n, r[l]--, n = i.plus(r))) : n = a);
  return [n, r, a, o];
}
function ui(n, e, t, s) {
  let [r, i, o, a] = li(n, e, t);
  const l = e - r, u = t.filter(
    (m) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(m) >= 0
  );
  u.length === 0 && (o < e && (o = r.plus({ [a]: 1 })), o !== r && (i[a] = (i[a] || 0) + l / (o - r)));
  const c = T.fromObject(i, s);
  return u.length > 0 ? T.fromMillis(l, s).shiftTo(...u).plus(c) : c;
}
const ci = "missing Intl.DateTimeFormat.formatToParts support";
function S(n, e = (t) => t) {
  return { regex: n, deser: ([t]) => e(er(t)) };
}
const di = " ", ds = `[ ${di}]`, fs = new RegExp(ds, "g");
function fi(n) {
  return n.replace(/\./g, "\\.?").replace(fs, ds);
}
function rn(n) {
  return n.replace(/\./g, "").replace(fs, " ").toLowerCase();
}
function q(n, e) {
  return n === null ? null : {
    regex: RegExp(n.map(fi).join("|")),
    deser: ([t]) => n.findIndex((s) => rn(t) === rn(s)) + e
  };
}
function an(n, e) {
  return { regex: n, deser: ([, t, s]) => Xe(t, s), groups: e };
}
function ze(n) {
  return { regex: n, deser: ([e]) => e };
}
function hi(n) {
  return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function mi(n, e) {
  const t = U(e), s = U(e, "{2}"), r = U(e, "{3}"), i = U(e, "{4}"), o = U(e, "{6}"), a = U(e, "{1,2}"), l = U(e, "{1,3}"), u = U(e, "{1,6}"), c = U(e, "{1,9}"), m = U(e, "{2,4}"), p = U(e, "{4,6}"), f = (y) => ({ regex: RegExp(hi(y.val)), deser: ([v]) => v, literal: !0 }), O = ((y) => {
    if (n.literal)
      return f(y);
    switch (y.val) {
      case "G":
        return q(e.eras("short"), 0);
      case "GG":
        return q(e.eras("long"), 0);
      case "y":
        return S(u);
      case "yy":
        return S(m, Ot);
      case "yyyy":
        return S(i);
      case "yyyyy":
        return S(p);
      case "yyyyyy":
        return S(o);
      case "M":
        return S(a);
      case "MM":
        return S(s);
      case "MMM":
        return q(e.months("short", !0), 1);
      case "MMMM":
        return q(e.months("long", !0), 1);
      case "L":
        return S(a);
      case "LL":
        return S(s);
      case "LLL":
        return q(e.months("short", !1), 1);
      case "LLLL":
        return q(e.months("long", !1), 1);
      case "d":
        return S(a);
      case "dd":
        return S(s);
      case "o":
        return S(l);
      case "ooo":
        return S(r);
      case "HH":
        return S(s);
      case "H":
        return S(a);
      case "hh":
        return S(s);
      case "h":
        return S(a);
      case "mm":
        return S(s);
      case "m":
        return S(a);
      case "q":
        return S(a);
      case "qq":
        return S(s);
      case "s":
        return S(a);
      case "ss":
        return S(s);
      case "S":
        return S(l);
      case "SSS":
        return S(r);
      case "u":
        return ze(c);
      case "uu":
        return ze(a);
      case "uuu":
        return S(t);
      case "a":
        return q(e.meridiems(), 0);
      case "kkkk":
        return S(i);
      case "kk":
        return S(m, Ot);
      case "W":
        return S(a);
      case "WW":
        return S(s);
      case "E":
      case "c":
        return S(t);
      case "EEE":
        return q(e.weekdays("short", !1), 1);
      case "EEEE":
        return q(e.weekdays("long", !1), 1);
      case "ccc":
        return q(e.weekdays("short", !0), 1);
      case "cccc":
        return q(e.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return an(new RegExp(`([+-]${a.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return an(new RegExp(`([+-]${a.source})(${s.source})?`), 2);
      case "z":
        return ze(/[a-z_+-/]{1,256}?/i);
      case " ":
        return ze(/[^\S\n\r]/);
      default:
        return f(y);
    }
  })(n) || {
    invalidReason: ci
  };
  return O.token = n, O;
}
const yi = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function gi(n, e, t) {
  const { type: s, value: r } = n;
  if (s === "literal") {
    const l = /^\s+$/.test(r);
    return {
      literal: !l,
      val: l ? " " : r
    };
  }
  const i = e[s];
  let o = s;
  s === "hour" && (e.hour12 != null ? o = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? o = "hour12" : o = "hour24" : o = t.hour12 ? "hour12" : "hour24");
  let a = yi[o];
  if (typeof a == "object" && (a = a[i]), a)
    return {
      literal: !1,
      val: a
    };
}
function wi(n) {
  return [`^${n.map((t) => t.regex).reduce((t, s) => `${t}(${s.source})`, "")}$`, n];
}
function vi(n, e, t) {
  const s = n.match(e);
  if (s) {
    const r = {};
    let i = 1;
    for (const o in t)
      if (ve(t, o)) {
        const a = t[o], l = a.groups ? a.groups + 1 : 1;
        !a.literal && a.token && (r[a.token.val[0]] = a.deser(s.slice(i, i + l))), i += l;
      }
    return [s, r];
  } else
    return [s, {}];
}
function pi(n) {
  const e = (i) => {
    switch (i) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let t = null, s;
  return w(n.z) || (t = X.create(n.z)), w(n.Z) || (t || (t = new F(n.Z)), s = n.Z), w(n.q) || (n.M = (n.q - 1) * 3 + 1), w(n.h) || (n.h < 12 && n.a === 1 ? n.h += 12 : n.h === 12 && n.a === 0 && (n.h = 0)), n.G === 0 && n.y && (n.y = -n.y), w(n.u) || (n.S = Ct(n.u)), [Object.keys(n).reduce((i, o) => {
    const a = e(o);
    return a && (i[a] = n[o]), i;
  }, {}), t, s];
}
let ot = null;
function ki() {
  return ot || (ot = h.fromMillis(1555555555555)), ot;
}
function Ti(n, e) {
  if (n.literal)
    return n;
  const t = _.macroTokenToFormatOpts(n.val), s = gs(t, e);
  return s == null || s.includes(void 0) ? n : s;
}
function hs(n, e) {
  return Array.prototype.concat(...n.map((t) => Ti(t, e)));
}
class ms {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = hs(_.parseFormat(t), e), this.units = this.tokens.map((s) => mi(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, r] = wi(this.units);
      this.regex = RegExp(s, "i"), this.handlers = r;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, s] = vi(e, this.regex, this.handlers), [r, i, o] = s ? pi(s) : [null, null, void 0];
      if (ve(s, "a") && ve(s, "H"))
        throw new me(
          "Can't include meridiem when specifying 24-hour format"
        );
      return {
        input: e,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches: t,
        matches: s,
        result: r,
        zone: i,
        specificOffset: o
      };
    } else
      return { input: e, tokens: this.tokens, invalidReason: this.invalidReason };
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
}
function ys(n, e, t) {
  return new ms(n, t).explainFromTokens(e);
}
function Oi(n, e, t) {
  const { result: s, zone: r, specificOffset: i, invalidReason: o } = ys(n, e, t);
  return [s, r, i, o];
}
function gs(n, e) {
  if (!n)
    return null;
  const s = _.create(e, n).dtFormatter(ki()), r = s.formatToParts(), i = s.resolvedOptions();
  return r.map((o) => gi(o, n, i));
}
const lt = "Invalid DateTime", on = 864e13;
function xe(n) {
  return new P("unsupported zone", `the zone "${n.name}" is not supported`);
}
function ut(n) {
  return n.weekData === null && (n.weekData = Be(n.c)), n.weekData;
}
function ct(n) {
  return n.localWeekData === null && (n.localWeekData = Be(
    n.c,
    n.loc.getMinDaysInFirstWeek(),
    n.loc.getStartOfWeek()
  )), n.localWeekData;
}
function ae(n, e) {
  const t = {
    ts: n.ts,
    zone: n.zone,
    c: n.c,
    o: n.o,
    loc: n.loc,
    invalid: n.invalid
  };
  return new h({ ...t, ...e, old: t });
}
function ws(n, e, t) {
  let s = n - e * 60 * 1e3;
  const r = t.offset(s);
  if (e === r)
    return [s, e];
  s -= (r - e) * 60 * 1e3;
  const i = t.offset(s);
  return r === i ? [s, r] : [n - Math.min(r, i) * 60 * 1e3, Math.max(r, i)];
}
function Ze(n, e) {
  n += e * 60 * 1e3;
  const t = new Date(n);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
    hour: t.getUTCHours(),
    minute: t.getUTCMinutes(),
    second: t.getUTCSeconds(),
    millisecond: t.getUTCMilliseconds()
  };
}
function Re(n, e, t) {
  return ws(Qe(n), e, t);
}
function ln(n, e) {
  const t = n.o, s = n.c.year + Math.trunc(e.years), r = n.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, i = {
    ...n.c,
    year: s,
    month: r,
    day: Math.min(n.c.day, Ge(s, r)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, o = T.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), a = Qe(i);
  let [l, u] = ws(a, t, n.zone);
  return o !== 0 && (l += o, u = n.zone.offset(l)), { ts: l, o: u };
}
function he(n, e, t, s, r, i) {
  const { setZone: o, zone: a } = t;
  if (n && Object.keys(n).length !== 0 || e) {
    const l = e || a, u = h.fromObject(n, {
      ...t,
      zone: l,
      specificOffset: i
    });
    return o ? u : u.setZone(a);
  } else
    return h.invalid(
      new P("unparsable", `the input "${r}" can't be parsed as ${s}`)
    );
}
function Ae(n, e, t = !0) {
  return n.isValid ? _.create(E.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(n, e) : null;
}
function dt(n, e, t) {
  const s = n.c.year > 9999 || n.c.year < 0;
  let r = "";
  if (s && n.c.year >= 0 && (r += "+"), r += b(n.c.year, s ? 6 : 4), t === "year") return r;
  if (e) {
    if (r += "-", r += b(n.c.month), t === "month") return r;
    r += "-";
  } else if (r += b(n.c.month), t === "month") return r;
  return r += b(n.c.day), r;
}
function un(n, e, t, s, r, i, o) {
  let a = !t || n.c.millisecond !== 0 || n.c.second !== 0, l = "";
  switch (o) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (l += b(n.c.hour), o === "hour") break;
      if (e) {
        if (l += ":", l += b(n.c.minute), o === "minute") break;
        a && (l += ":", l += b(n.c.second));
      } else {
        if (l += b(n.c.minute), o === "minute") break;
        a && (l += b(n.c.second));
      }
      if (o === "second") break;
      a && (!s || n.c.millisecond !== 0) && (l += ".", l += b(n.c.millisecond, 3));
  }
  return r && (n.isOffsetFixed && n.offset === 0 && !i ? l += "Z" : n.o < 0 ? (l += "-", l += b(Math.trunc(-n.o / 60)), l += ":", l += b(Math.trunc(-n.o % 60))) : (l += "+", l += b(Math.trunc(n.o / 60)), l += ":", l += b(Math.trunc(n.o % 60)))), i && (l += "[" + n.zone.ianaName + "]"), l;
}
const vs = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Si = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Di = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, He = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Mi = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], Ei = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Ue(n) {
  const e = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[n.toLowerCase()];
  if (!e) throw new vn(n);
  return e;
}
function cn(n) {
  switch (n.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return Ue(n);
  }
}
function xi(n) {
  if (Ie === void 0 && (Ie = C.now()), n.type !== "iana")
    return n.offset(Ie);
  const e = n.name;
  let t = St.get(e);
  return t === void 0 && (t = n.offset(Ie), St.set(e, t)), t;
}
function dn(n, e) {
  const t = ne(e.zone, C.defaultZone);
  if (!t.isValid)
    return h.invalid(xe(t));
  const s = E.fromObject(e);
  let r, i;
  if (w(n.year))
    r = C.now();
  else {
    for (const l of He)
      w(n[l]) && (n[l] = vs[l]);
    const o = qn(n) || Pn(n);
    if (o)
      return h.invalid(o);
    const a = xi(t);
    [r, i] = Re(n, a, t);
  }
  return new h({ ts: r, zone: t, loc: s, o: i });
}
function fn(n, e, t) {
  const s = w(t.round) ? !0 : t.round, r = w(t.rounding) ? "trunc" : t.rounding, i = (a, l) => (a = bt(a, s || t.calendary ? 0 : 2, t.calendary ? "round" : r), e.loc.clone(t).relFormatter(t).format(a, l)), o = (a) => t.calendary ? e.hasSame(n, a) ? 0 : e.startOf(a).diff(n.startOf(a), a).get(a) : e.diff(n, a).get(a);
  if (t.unit)
    return i(o(t.unit), t.unit);
  for (const a of t.units) {
    const l = o(a);
    if (Math.abs(l) >= 1)
      return i(l, a);
  }
  return i(n > e ? -0 : 0, t.units[t.units.length - 1]);
}
function hn(n) {
  let e = {}, t;
  return n.length > 0 && typeof n[n.length - 1] == "object" ? (e = n[n.length - 1], t = Array.from(n).slice(0, n.length - 1)) : t = Array.from(n), [e, t];
}
let Ie;
const St = /* @__PURE__ */ new Map();
class h {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || C.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new P("invalid input") : null) || (t.isValid ? null : xe(t));
    this.ts = w(e.ts) ? C.now() : e.ts;
    let r = null, i = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [r, i] = [e.old.c, e.old.o];
      else {
        const a = re(e.o) && !e.old ? e.o : t.offset(this.ts);
        r = Ze(this.ts, a), s = Number.isNaN(r.year) ? new P("invalid input") : null, r = s ? null : r, i = s ? null : a;
      }
    this._zone = t, this.loc = e.loc || E.create(), this.invalid = s, this.weekData = null, this.localWeekData = null, this.c = r, this.o = i, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new h({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [e, t] = hn(arguments), [s, r, i, o, a, l, u] = t;
    return dn({ year: s, month: r, day: i, hour: o, minute: a, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [e, t] = hn(arguments), [s, r, i, o, a, l, u] = t;
    return e.zone = F.utcInstance, dn({ year: s, month: r, day: i, hour: o, minute: a, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const s = ir(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return h.invalid("invalid input");
    const r = ne(t.zone, C.defaultZone);
    return r.isValid ? new h({
      ts: s,
      zone: r,
      loc: E.fromObject(t)
    }) : h.invalid(xe(r));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(e, t = {}) {
    if (re(e))
      return e < -on || e > on ? h.invalid("Timestamp out of range") : new h({
        ts: e,
        zone: ne(t.zone, C.defaultZone),
        loc: E.fromObject(t)
      });
    throw new V(
      `fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`
    );
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(e, t = {}) {
    if (re(e))
      return new h({
        ts: e * 1e3,
        zone: ne(t.zone, C.defaultZone),
        loc: E.fromObject(t)
      });
    throw new V("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(e, t = {}) {
    e = e || {};
    const s = ne(t.zone, C.defaultZone);
    if (!s.isValid)
      return h.invalid(xe(s));
    const r = E.fromObject(t), i = Je(e, cn), { minDaysInFirstWeek: o, startOfWeek: a } = Jt(i, r), l = C.now(), u = w(t.specificOffset) ? s.offset(l) : t.specificOffset, c = !w(i.ordinal), m = !w(i.year), p = !w(i.month) || !w(i.day), f = m || p, g = i.weekYear || i.weekNumber;
    if ((f || c) && g)
      throw new me(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (p && c)
      throw new me("Can't mix ordinal dates with month/day");
    const O = g || i.weekday && !f;
    let y, v, N = Ze(l, u);
    O ? (y = Mi, v = Si, N = Be(N, o, a)) : c ? (y = Ei, v = Di, N = at(N)) : (y = He, v = vs);
    let H = !1;
    for (const De of y) {
      const Ss = i[De];
      w(Ss) ? H ? i[De] = v[De] : i[De] = N[De] : H = !0;
    }
    const J = O ? nr(i, o, a) : c ? sr(i) : qn(i), M = J || Pn(i);
    if (M)
      return h.invalid(M);
    const ce = O ? Bt(i, o, a) : c ? Gt(i) : i, [tt, Os] = Re(ce, u, s), Se = new h({
      ts: tt,
      zone: s,
      o: Os,
      loc: r
    });
    return i.weekday && f && e.weekday !== Se.weekday ? h.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${i.weekday} and a date of ${Se.toISO()}`
    ) : Se.isValid ? Se : h.invalid(Se.invalid);
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(e, t = {}) {
    const [s, r] = Gr(e);
    return he(s, r, t, "ISO 8601", e);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(e, t = {}) {
    const [s, r] = Jr(e);
    return he(s, r, t, "RFC 2822", e);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(e, t = {}) {
    const [s, r] = jr(e);
    return he(s, r, t, "HTTP", t);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(e, t, s = {}) {
    if (w(e) || w(t))
      throw new V("fromFormat requires an input string and a format");
    const { locale: r = null, numberingSystem: i = null } = s, o = E.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    }), [a, l, u, c] = Oi(o, e, t);
    return c ? h.invalid(c) : he(a, l, s, `format ${t}`, e, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, t, s = {}) {
    return h.fromFormat(e, t, s);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(e, t = {}) {
    const [s, r] = si(e);
    return he(s, r, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new V("need to specify a reason the DateTime is invalid");
    const s = e instanceof P ? e : new P(e, t);
    if (C.throwOnInvalid)
      throw new bs(s);
    return new h({ invalid: s });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(e) {
    return e && e.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(e, t = {}) {
    const s = gs(e, E.fromObject(t));
    return s ? s.map((r) => r ? r.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(e, t = {}) {
    return hs(_.parseFormat(e), E.fromObject(t)).map((r) => r.val).join("");
  }
  static resetCache() {
    Ie = void 0, St.clear();
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(e) {
    return this[e];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? ut(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? ut(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? ut(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? ct(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? ct(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? ct(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? at(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? We.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? We.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? We.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? We.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const e = 864e5, t = 6e4, s = Qe(this.c), r = this.zone.offset(s - e), i = this.zone.offset(s + e), o = this.zone.offset(s - r * t), a = this.zone.offset(s - i * t);
    if (o === a)
      return [this];
    const l = s - o * t, u = s - a * t, c = Ze(l, o), m = Ze(u, a);
    return c.hour === m.hour && c.minute === m.minute && c.second === m.second && c.millisecond === m.millisecond ? [ae(this, { ts: l }), ae(this, { ts: u })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Ve(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Ge(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? ge(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? be(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? be(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(e = {}) {
    const { locale: t, numberingSystem: s, calendar: r } = _.create(
      this.loc.clone(e),
      e
    ).resolvedOptions(this);
    return { locale: t, numberingSystem: s, outputCalendar: r };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(e = 0, t = {}) {
    return this.setZone(F.instance(e), t);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(C.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(e, { keepLocalTime: t = !1, keepCalendarTime: s = !1 } = {}) {
    if (e = ne(e, C.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let r = this.ts;
      if (t || s) {
        const i = e.offset(this.ts), o = this.toObject();
        [r] = Re(o, i, e);
      }
      return ae(this, { ts: r, zone: e });
    } else
      return h.invalid(xe(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: s } = {}) {
    const r = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: s });
    return ae(this, { loc: r });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(e) {
    return this.reconfigure({ locale: e });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(e) {
    if (!this.isValid) return this;
    const t = Je(e, cn), { minDaysInFirstWeek: s, startOfWeek: r } = Jt(t, this.loc), i = !w(t.weekYear) || !w(t.weekNumber) || !w(t.weekday), o = !w(t.ordinal), a = !w(t.year), l = !w(t.month) || !w(t.day), u = a || l, c = t.weekYear || t.weekNumber;
    if ((u || o) && c)
      throw new me(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && o)
      throw new me("Can't mix ordinal dates with month/day");
    let m;
    i ? m = Bt(
      { ...Be(this.c, s, r), ...t },
      s,
      r
    ) : w(t.ordinal) ? (m = { ...this.toObject(), ...t }, w(t.day) && (m.day = Math.min(Ge(m.year, m.month), m.day))) : m = Gt({ ...at(this.c), ...t });
    const [p, f] = Re(m, this.o, this.zone);
    return ae(this, { ts: p, o: f });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(e) {
    if (!this.isValid) return this;
    const t = T.fromDurationLike(e);
    return ae(this, ln(this, t));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = T.fromDurationLike(e).negate();
    return ae(this, ln(this, t));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(e, { useLocaleWeeks: t = !1 } = {}) {
    if (!this.isValid) return this;
    const s = {}, r = T.normalizeUnit(e);
    switch (r) {
      case "years":
        s.month = 1;
      case "quarters":
      case "months":
        s.day = 1;
      case "weeks":
      case "days":
        s.hour = 0;
      case "hours":
        s.minute = 0;
      case "minutes":
        s.second = 0;
      case "seconds":
        s.millisecond = 0;
        break;
    }
    if (r === "weeks")
      if (t) {
        const i = this.loc.getStartOfWeek(), { weekday: o } = this;
        o < i && (s.weekNumber = this.weekNumber - 1), s.weekday = i;
      } else
        s.weekday = 1;
    if (r === "quarters") {
      const i = Math.ceil(this.month / 3);
      s.month = (i - 1) * 3 + 1;
    }
    return this.set(s);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(e, t) {
    return this.isValid ? this.plus({ [e]: 1 }).startOf(e, t).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(e, t = {}) {
    return this.isValid ? _.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : lt;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(e = Ye, t = {}) {
    return this.isValid ? _.create(this.loc.clone(t), e).formatDateTime(this) : lt;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(e = {}) {
    return this.isValid ? _.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'years', 'months', 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @example DateTime.now().toISO({ precision: 'day' }) //=> '2017-04-22Z'
   * @example DateTime.now().toISO({ precision: 'minute' }) //=> '2017-04-22T20:47Z'
   * @return {string|null}
   */
  toISO({
    format: e = "extended",
    suppressSeconds: t = !1,
    suppressMilliseconds: s = !1,
    includeOffset: r = !0,
    extendedZone: i = !1,
    precision: o = "milliseconds"
  } = {}) {
    if (!this.isValid)
      return null;
    o = Ue(o);
    const a = e === "extended";
    let l = dt(this, a, o);
    return He.indexOf(o) >= 3 && (l += "T"), l += un(
      this,
      a,
      t,
      s,
      r,
      i,
      o
    ), l;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='day'] - truncate output to desired precision: 'years', 'months', or 'days'.
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @example DateTime.utc(1982, 5, 25).toISODate({ precision: 'month' }) //=> '1982-05'
   * @return {string|null}
   */
  toISODate({ format: e = "extended", precision: t = "day" } = {}) {
    return this.isValid ? dt(this, e === "extended", Ue(t)) : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Ae(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, second: 56 }).toISOTime({ precision: 'minute' }) //=> '07:34Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: t = !1,
    includeOffset: s = !0,
    includePrefix: r = !1,
    extendedZone: i = !1,
    format: o = "extended",
    precision: a = "milliseconds"
  } = {}) {
    return this.isValid ? (a = Ue(a), (r && He.indexOf(a) >= 3 ? "T" : "") + un(
      this,
      o === "extended",
      t,
      e,
      s,
      i,
      a
    )) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Ae(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return Ae(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? dt(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset: e = !0, includeZone: t = !1, includeOffsetSpace: s = !0 } = {}) {
    let r = "HH:mm:ss.SSS";
    return (t || e) && (s && (r += " "), t ? r += "z" : e && (r += "ZZ")), Ae(this, r, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(e = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : lt;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(e = {}) {
    if (!this.isValid) return {};
    const t = { ...this.c };
    return e.includeConfig && (t.outputCalendar = this.outputCalendar, t.numberingSystem = this.loc.numberingSystem, t.locale = this.loc.locale), t;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(e, t = "milliseconds", s = {}) {
    if (!this.isValid || !e.isValid)
      return T.invalid("created by diffing an invalid DateTime");
    const r = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, i = ar(t).map(T.normalizeUnit), o = e.valueOf() > this.valueOf(), a = o ? this : e, l = o ? e : this, u = ui(a, l, i, r);
    return o ? u.negate() : u;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(e = "milliseconds", t = {}) {
    return this.diff(h.now(), e, t);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(e) {
    return this.isValid ? I.fromDateTimes(this, e) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(e, t, s) {
    if (!this.isValid) return !1;
    const r = e.valueOf(), i = this.setZone(e.zone, { keepLocalTime: !0 });
    return i.startOf(t, s) <= r && r <= i.endOf(t, s);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(e) {
    return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds towards zero by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {string} [options.rounding="trunc"] - rounding method to use when rounding the numbers in the output. Can be "trunc" (toward zero), "expand" (away from zero), "round", "floor", or "ceil".
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(e = {}) {
    if (!this.isValid) return null;
    const t = e.base || h.fromObject({}, { zone: this.zone }), s = e.padding ? this < t ? -e.padding : e.padding : 0;
    let r = ["years", "months", "days", "hours", "minutes", "seconds"], i = e.unit;
    return Array.isArray(e.unit) && (r = e.unit, i = void 0), fn(t, this.plus(s), {
      ...e,
      numeric: "always",
      units: r,
      unit: i
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(e = {}) {
    return this.isValid ? fn(e.base || h.fromObject({}, { zone: this.zone }), this, {
      ...e,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...e) {
    if (!e.every(h.isDateTime))
      throw new V("min requires all arguments be DateTimes");
    return jt(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(h.isDateTime))
      throw new V("max requires all arguments be DateTimes");
    return jt(e, (t) => t.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(e, t, s = {}) {
    const { locale: r = null, numberingSystem: i = null } = s, o = E.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    return ys(o, e, t);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, t, s = {}) {
    return h.fromFormatExplain(e, t, s);
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(e, t = {}) {
    const { locale: s = null, numberingSystem: r = null } = t, i = E.fromOpts({
      locale: s,
      numberingSystem: r,
      defaultToEN: !0
    });
    return new ms(i, e);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {Object} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(e, t, s = {}) {
    if (w(e) || w(t))
      throw new V(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: r = null, numberingSystem: i = null } = s, o = E.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    if (!o.equals(t.locale))
      throw new V(
        `fromFormatParser called with a locale of ${o}, but the format parser was created for ${t.locale}`
      );
    const { result: a, zone: l, specificOffset: u, invalidReason: c } = t.explainFromTokens(e);
    return c ? h.invalid(c) : he(
      a,
      l,
      s,
      `format ${t.format}`,
      e,
      u
    );
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return Ye;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return pn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return _s;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return kn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Tn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return On;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Sn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Dn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Mn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return En;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return xn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return In;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Cn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return bn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Nn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Vn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return _n;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return Fs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Fn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Ln;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return $n;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Wn;
  }
}
function Me(n) {
  if (h.isDateTime(n))
    return n;
  if (n && n.valueOf && re(n.valueOf()))
    return h.fromJSDate(n);
  if (n && typeof n == "object")
    return h.fromObject(n);
  throw new V(
    `Unknown datetime argument: ${n}, of type ${typeof n}`
  );
}
const ps = G("en"), Ii = Ds(ps);
function Le() {
  return {
    lang: Ii,
    setLang: (e) => {
      ps.value = e, C.defaultLocale = e;
    }
  };
}
const mn = G(!1), Ci = G({ x: 0, y: 0 });
function Dt() {
  const n = () => {
    mn.value = !1;
  }, e = (s) => {
    const r = s.getBoundingClientRect();
    return {
      top: r.top,
      bottom: window.innerHeight - r.bottom,
      left: r.left,
      right: window.innerWidth - r.right
    };
  };
  return { collision: (s) => {
    let i = { x: 0, y: 0 };
    const o = s.getBoundingClientRect(), a = {
      bottomRight: {
        x: o.right,
        y: o.bottom
      },
      bottomLeft: {
        x: o.left - 400,
        y: o.bottom
      },
      topRight: {
        x: o.right,
        y: o.top - 400
      },
      topLeft: {
        x: o.left - 400,
        y: o.top - 400
      }
    }, { left: l, bottom: u, right: c, top: m } = e(s), p = [
      // Check if it doesn't fit on the left side; if not, render it at the bottom right.
      { condition: l < 400, position: a.bottomRight },
      // Check if it doesn't fit on the right side; if not, render it at the bottom left.
      { condition: c < 400, position: a.bottomLeft },
      // Check if it doesn't fit on the top side; if not, render it at the top right.
      { condition: u < 400, position: a.topLeft },
      // Check if it doesn't fit on the bottom side; if not, render it at the top left.
      { condition: m < 400, position: a.bottomRight },
      // Check if it doesn't fit on top and right; if not, render it at the bottom left.
      { condition: m < 400 && c < 400, position: a.bottomLeft },
      // Check if it doesn't fit on the left and botton; if not, render it at the top right.
      { condition: l < 400 && u < 400, position: a.topRight }
    ];
    for (const { condition: f, position: g } of p)
      f && (i = g);
    if (l < 400 && u < 400 && c < 400) {
      const f = 400 - c + 16;
      i = { x: a.topLeft.x + f, y: a.topLeft.y };
    }
    if (l < 400 && m < 400 && u < 400 && c > 400) {
      const f = 400 - m + 16;
      i = { x: a.bottomRight.x, y: a.topLeft.y + f };
    }
    if (m < 400 && u < 400) {
      const f = 400 - m + 16;
      i = {
        x: a.bottomRight.x,
        y: a.topLeft.y + f
      };
    }
    if (m < 400 && u < 400 && c < 400 && l > 400) {
      const f = 400 - m + 16;
      i = {
        x: a.bottomLeft.x,
        y: a.topLeft.y + f
      };
    }
    return l > 400 && c > 400 && m > 400 && u > 400 && (i = { x: a.bottomRight.x, y: a.bottomRight.y }), i;
  }, openEventsDetailDialog: mn, dialogPositionToRender: Ci, closeDialog: n };
}
function Ft() {
  const { lang: n } = Le(), e = (s, r) => h.fromISO(s).setLocale(n.value).toLocaleString(r), t = se(() => h.now().toISODate());
  return {
    formatDate: e,
    today: t
  };
}
const bi = G([]), yn = G([]), gn = G(h.now()), Ni = G(null);
function ue() {
  const { today: n } = Ft(), { lang: e } = Le(), t = se(() => yn.value.map((a) => ({
    ...a,
    date_calendar_to_render: a.start_date
  }))), s = (a) => {
    const [l, u, c] = a.split("-").map(Number), m = h.now().set({ year: l, month: u, day: c }), p = m.startOf("month"), f = m.endOf("month"), g = p.startOf("week"), O = f.endOf("week"), y = [];
    let v = g;
    for (; v <= O; )
      y.push(v.toISODate()), v = v.plus({ days: 1 });
    return y;
  }, r = (a, {
    startDate: l,
    endDate: u
  }) => {
    const c = h.fromISO(a), m = h.fromISO(l), p = h.fromISO(u);
    return I.fromDateTimes(m, p).contains(c);
  }, i = (a) => s(a).map((l) => {
    const u = [], c = [], m = h.fromISO(l), p = h.fromISO(a);
    t.value.forEach((g) => {
      g.end_date && r(l, {
        startDate: g.start_date,
        endDate: g.end_date
      }) ? c.push({ ...g, date_calendar_to_render: l }) : c.push(g);
    });
    const f = c.filter((g) => m.hasSame(h.fromISO(g.date_calendar_to_render), "day"));
    return m.hasSame(p, "month") || u.push("other-month-date"), m.hasSame(h.fromISO(n.value), "day") && u.push("selected"), {
      day: l,
      class: u.join(" "),
      events: f || [],
      text: h.fromISO(l).day.toString()
    };
  }), o = se(() => h.fromJSDate(gn.value.toJSDate()).setLocale(e.value).toFormat("MMMM yyyy"));
  return {
    eventsToShowInCalendar: yn,
    calendarDaySelect: Ni,
    title: o,
    monthDays: bi,
    generateCalendar: i,
    currentDate: gn
  };
}
const Vi = { class: "k-alendar-days-container" }, _i = /* @__PURE__ */ W({
  __name: "CDays",
  setup(n) {
    const { lang: e } = Le(), t = () => {
      const s = h.now().startOf("week"), r = h.now().endOf("week"), i = [];
      let o = s;
      for (; o <= r; )
        i.push(o.setLocale(e.value).toFormat("ccc")), o = o.plus({ days: 1 });
      return i;
    };
    return (s, r) => (k(), x("div", Vi, [
      (k(!0), x(qe, null, Pe(t(), (i) => (k(), x("div", { key: i }, B(i), 1))), 128))
    ]));
  }
}), L = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, r] of e)
    t[s] = r;
  return t;
}, Fi = /* @__PURE__ */ L(_i, [["__scopeId", "data-v-dd3cd879"]]), Li = /* @__PURE__ */ W({
  __name: "ButtonPrevMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const t = e, { currentDate: s, monthDays: r, generateCalendar: i } = ue(), o = () => {
      s.value = s.value.minus({ months: 1 });
      const a = h.fromJSDate(s.value.toJSDate()).toFormat("yyyy-MM-dd");
      r.value = i(a), t("handle", a);
    };
    return (a, l) => (k(), x("button", {
      type: "button",
      class: "k-alendar-navegation-prev",
      onClick: o
    }, "←"));
  }
}), $i = /* @__PURE__ */ L(Li, [["__scopeId", "data-v-9bfa9322"]]), Wi = /* @__PURE__ */ W({
  __name: "ButtonNextMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const { currentDate: t, monthDays: s, generateCalendar: r } = ue(), i = e, o = () => {
      t.value = t.value.plus({ months: 1 });
      const a = h.fromJSDate(t.value.toJSDate()).toFormat("yyyy-MM-dd");
      s.value = r(a), i("handle", a);
    };
    return (a, l) => (k(), x("button", {
      type: "button",
      class: "k-alendar-navegation-left",
      onClick: o
    }, "→"));
  }
}), zi = /* @__PURE__ */ L(Wi, [["__scopeId", "data-v-4b86600a"]]), Zi = {
  en: {
    dayView: "Day",
    monthView: "Month",
    buttons: {
      today: "Today"
    }
  },
  es: {
    dayView: "Día",
    monthView: "Mes",
    buttons: {
      today: "Hoy"
    }
  },
  fr: {
    dayView: "Jour",
    monthView: "Mois",
    buttons: {
      today: "Aujourd'hui"
    }
  },
  it: {
    dayView: "Giorno",
    monthView: "Mese",
    buttons: {
      today: "Oggi"
    }
  },
  de: {
    dayView: "Tag",
    monthView: "Monat",
    buttons: {
      today: "Heute"
    }
  },
  pt: {
    dayView: "Dia",
    monthView: "Mês",
    buttons: {
      today: "Hoje"
    }
  },
  nl: {
    dayView: "Dag",
    monthView: "Maand",
    buttons: {
      today: "Vandaag"
    }
  },
  ru: {
    dayView: "День",
    monthView: "Месяц",
    buttons: {
      today: "Сегодня"
    }
  },
  ja: {
    dayView: "日",
    monthView: "月",
    buttons: {
      today: "今日"
    }
  },
  zh: {
    dayView: "日",
    monthView: "月",
    buttons: {
      today: "今天"
    }
  },
  ko: {
    dayView: "일",
    monthView: "월",
    buttons: {
      today: "오늘"
    }
  },
  ar: {
    dayView: "يوم",
    monthView: "شهر",
    buttons: {
      today: "اليوم"
    }
  },
  he: {
    dayView: "יום",
    monthView: "חודש",
    buttons: {
      today: "היום"
    }
  },
  id: {
    dayView: "Hari",
    monthView: "Bulan",
    buttons: {
      today: "Hari ini"
    }
  },
  tr: {
    dayView: "Gün",
    monthView: "Ay",
    buttons: {
      today: "Bugün"
    }
  },
  vi: {
    dayView: "Ngày",
    monthView: "Tháng",
    buttons: {
      today: "Hôm nay"
    }
  },
  th: {
    dayView: "วัน",
    monthView: "เดือน",
    buttons: {
      today: "วันนี้"
    }
  },
  pl: {
    dayView: "Dzień",
    monthView: "Miesiąc",
    buttons: {
      today: "Dzisiaj"
    }
  },
  hu: {
    dayView: "Nap",
    monthView: "Hónap",
    buttons: {
      today: "Ma"
    }
  },
  cs: {
    dayView: "Den",
    monthView: "Měsíc",
    buttons: {
      today: "Dnes"
    }
  },
  sk: {
    dayView: "Deň",
    monthView: "Mesiac",
    buttons: {
      today: "Dnes"
    }
  },
  hr: {
    dayView: "Dan",
    monthView: "Mjesec",
    buttons: {
      today: "Danas"
    }
  },
  ro: {
    dayView: "Zi",
    monthView: "Lună",
    buttons: {
      today: "Astăzi"
    }
  },
  bg: {
    dayView: "Ден",
    monthView: "Месец",
    buttons: {
      today: "Днес"
    }
  },
  sl: {
    dayView: "Dan",
    monthView: "Mesec",
    buttons: {
      today: "Danes"
    }
  },
  et: {
    dayView: "Päev",
    monthView: "Kuu",
    buttons: {
      today: "Täna"
    }
  }
}, Ai = /* @__PURE__ */ W({
  __name: "ButtonTodayMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const t = e, { currentDate: s, monthDays: r, generateCalendar: i } = ue(), { today: o } = Ft(), { lang: a } = Le(), l = () => {
      s.value = h.now(), r.value = i(o.value), t("handle", o.value);
    }, u = se(() => Zi[a.value].buttons.today || "Today");
    return (c, m) => (k(), x("button", {
      type: "button",
      class: "k-alendar-today-button",
      onClick: l
    }, B(u.value), 1));
  }
}), Ri = /* @__PURE__ */ L(Ai, [["__scopeId", "data-v-4da96950"]]), Hi = { class: "k-alendar-header-container" }, Ui = { class: "left-buttons" }, qi = { class: "center-title" }, Pi = /* @__PURE__ */ W({
  __name: "CHeader",
  emits: ["handlePrevMonth", "handleNextMonth", "handleToToday"],
  setup(n, { emit: e }) {
    const { title: t } = ue(), s = e, r = (a) => {
      s("handlePrevMonth", a);
    }, i = (a) => {
      s("handleNextMonth", a);
    }, o = (a) => {
      s("handleToToday", a);
    };
    return (a, l) => (k(), x("header", Hi, [
      D("div", Ui, [
        D("div", null, [
          ye($i, { onHandle: r }),
          ye(zi, { onHandle: i })
        ]),
        ye(Ri, { onHandle: o })
      ]),
      D("div", qi, [
        D("h2", null, B(Z(t)), 1)
      ])
    ]));
  }
}), Yi = /* @__PURE__ */ L(Pi, [["__scopeId", "data-v-985876b4"]]), Bi = G({
  id: "",
  title: "",
  start_date: "",
  description: ""
});
function ks() {
  return {
    eventSelected: Bi
  };
}
const Gi = /* @__PURE__ */ W({
  __name: "KEventItem",
  props: {
    event: {},
    calendar: {}
  },
  emits: ["eventClicked"],
  setup(n, { emit: e }) {
    const t = e, s = n, r = (i) => {
      t("eventClicked", { mauseEvent: i, event: s.event, calendar: s.calendar });
    };
    return (i, o) => (k(), x("li", {
      style: Mt({
        "background-color": n.event.id === "more" ? "gray" : n.event.color ? n.event.color : "#374151"
      }),
      onClick: r
    }, [
      D("h3", null, B(n.event.title), 1)
    ], 4));
  }
}), Ts = /* @__PURE__ */ L(Gi, [["__scopeId", "data-v-2ec57e40"]]), Ji = { class: "k-alendar-container" }, ji = ["onClick"], Ki = { class: "k-alendar-span-container" }, Qi = { class: "k-alendar-text" }, Xi = {
  key: 0,
  class: "point"
}, ea = {
  key: 0,
  class: "events"
}, ta = /* @__PURE__ */ W({
  __name: "CIndex",
  emits: ["eventClicked", "plusEventCountClicked"],
  setup(n, { emit: e }) {
    const { openEventsDetailDialog: t, dialogPositionToRender: s } = Dt(), { monthDays: r, calendarDaySelect: i } = ue(), { eventSelected: o } = ks(), { collision: a } = Dt(), l = e, u = G({}), c = (g) => {
      if (window.innerWidth < 768) {
        const v = Math.floor((window.innerWidth - 400) / 2);
        s.value = { x: v, y: 16 }, g.events.length > 0 && (g.events.length === 1 ? (o.value = g.events[0], g.events[0].id != "more" && l("eventClicked", g.events[0])) : (o.value = {
          id: "more",
          title: "",
          start_date: "",
          description: ""
        }, l("plusEventCountClicked", { events: g.events })), i.value = g, t.value = !0);
      }
    }, m = ({
      mauseEvent: g,
      event: O,
      calendar: y
    }) => {
      if (o.value = O, i.value = y, y.events.length > 0) {
        let v = g.target;
        v.tagName === "H3" && (v = v.parentElement), s.value = a(v), t.value = !0;
      }
      O.id != "more" ? l("eventClicked", O) : l("plusEventCountClicked", { events: i.value.events });
    }, p = (g) => {
      var M;
      const O = u.value[g];
      let y = 0;
      const v = 32, N = 8, H = 8;
      let J = 0;
      if (O) {
        y = O.clientHeight - H * 2;
        const ce = (M = O.querySelector("span.k-alendar-text")) == null ? void 0 : M.offsetHeight;
        y -= ce || 0, J = Math.floor(
          y / (v + N)
        );
      }
      return J;
    }, f = (g, O) => {
      const y = p(g), v = O.slice(0, y);
      return O.length - y > 0 && v.splice(v.length - 1, 1, {
        id: "more",
        title: `+${O.length + 1 - y}`,
        start_date: "",
        description: ""
      }), v;
    };
    return (g, O) => (k(), x("div", Ji, [
      (k(!0), x(qe, null, Pe(Z(r), (y) => (k(), x("div", {
        key: y.day.toString(),
        onClick: (v) => c(y),
        class: Ms([y.class, "date"]),
        ref_for: !0,
        ref: (v) => u.value[y.day] = v
      }, [
        D("div", Ki, [
          D("span", Qi, B(y.text), 1),
          y.events.length > 0 ? (k(), x("span", Xi)) : Q("", !0)
        ]),
        y.events.length > 0 ? (k(), x("div", ea, [
          D("ul", null, [
            (k(!0), x(qe, null, Pe(f(y.day, y.events), (v) => (k(), K(Ts, {
              key: v.id,
              event: v,
              calendar: y,
              onEventClicked: m
            }, null, 8, ["event", "calendar"]))), 128))
          ])
        ])) : Q("", !0)
      ], 10, ji))), 128))
    ]));
  }
}), na = /* @__PURE__ */ L(ta, [["__scopeId", "data-v-5c2e6b21"]]), sa = ["open"], ra = { class: "k-alendar-dialog-main" }, ia = /* @__PURE__ */ W({
  __name: "KDialog",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = wn(n, "modelValue"), t = G(null);
    ft(e, (r) => {
      t.value && r ? t.value.showModal() : t.value && t.value.close();
    }), Es(() => {
      t.value && t.value.addEventListener("close", () => {
        s();
      });
    }), xs(() => {
      t.value && t.value.removeEventListener("close", () => {
        s();
      });
    });
    const s = () => {
      e.value = !1;
    };
    return (r, i) => (k(), x("dialog", {
      ref_key: "dialog",
      ref: t,
      id: "k-alendar-dialog",
      "modal-mode": "mega",
      class: "k-alendar-dialog",
      open: e.value,
      onClick: Is(s, ["self"])
    }, [
      D("header", null, [
        nt(r.$slots, "header"),
        D("button", {
          class: "k-alendar-button-close",
          type: "button",
          onClick: s
        }, [...i[0] || (i[0] = [
          D("svg", {
            "aria-hidden": "true",
            focusable: "false",
            "data-prefix": "fas",
            "data-icon": "xmark",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 320 512"
          }, [
            D("path", {
              class: "",
              fill: "currentColor",
              d: "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
            })
          ], -1)
        ])])
      ]),
      D("article", ra, [
        nt(r.$slots, "default")
      ]),
      D("footer", null, [
        nt(r.$slots, "footer")
      ])
    ], 8, sa));
  }
}), aa = {}, oa = {
  class: "k-alendar-button-edit-delete",
  type: "button"
};
function la(n, e) {
  return k(), x("button", oa, [...e[0] || (e[0] = [
    D("svg", {
      class: "h-5 w-5 text-gray-600",
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "far",
      "data-icon": "trash-can",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512"
    }, [
      D("path", {
        class: "",
        fill: "currentColor",
        d: "M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
      })
    ], -1)
  ])]);
}
const ua = /* @__PURE__ */ L(aa, [["render", la], ["__scopeId", "data-v-58b8063e"]]), ca = {}, da = {
  class: "k-alendar-button-edit-delete",
  type: "button"
};
function fa(n, e) {
  return k(), x("button", da, [...e[0] || (e[0] = [
    D("svg", {
      class: "h-5 w-5 text-gray-600",
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "far",
      "data-icon": "pen-to-square",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, [
      D("path", {
        class: "",
        fill: "currentColor",
        d: "M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
      })
    ], -1)
  ])]);
}
const ha = /* @__PURE__ */ L(ca, [["render", fa], ["__scopeId", "data-v-bf161d91"]]), ma = { class: "autor" }, ya = /* @__PURE__ */ W({
  __name: "EDAutor",
  props: {
    autor: {}
  },
  setup(n) {
    return (e, t) => (k(), x("div", ma, [
      t[0] || (t[0] = D("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "far",
        "data-icon": "user",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512"
      }, [
        D("path", {
          class: "",
          fill: "currentColor",
          d: "M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
        })
      ], -1)),
      D("p", null, B(n.autor), 1)
    ]));
  }
}), ga = /* @__PURE__ */ L(ya, [["__scopeId", "data-v-9c08a59e"]]), wa = { class: "content" }, va = /* @__PURE__ */ W({
  __name: "EDContent",
  props: {
    content: {}
  },
  setup(n) {
    return (e, t) => (k(), x("div", wa, [
      t[0] || (t[0] = D("svg", {
        class: "h-5 w-5 text-gray-600 dark:text-gray-300",
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "far",
        "data-icon": "comment",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, [
        D("path", {
          class: "",
          fill: "currentColor",
          d: "M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
        })
      ], -1)),
      D("p", null, B(n.content), 1)
    ]));
  }
}), pa = /* @__PURE__ */ L(va, [["__scopeId", "data-v-7de34190"]]), ka = { class: "title" }, Ta = /* @__PURE__ */ W({
  __name: "EDTitle",
  props: {
    event: {}
  },
  setup(n) {
    return (e, t) => {
      var s, r;
      return k(), x("div", ka, [
        (s = n.event) != null && s.color ? (k(), x("span", {
          key: 0,
          class: "circle",
          style: Mt({ backgroundColor: n.event.color })
        }, null, 4)) : Q("", !0),
        D("h2", null, B((r = n.event) == null ? void 0 : r.title), 1)
      ]);
    };
  }
}), Oa = /* @__PURE__ */ L(Ta, [["__scopeId", "data-v-16f01c17"]]), Sa = {
  key: 0,
  class: "flex justify-between"
}, Da = { key: 1 }, Ma = ["datetime"], Ea = {
  key: 0,
  class: "k-alendar-event-detail-main-wrapper"
}, xa = { class: "dates" }, Ia = ["datetime"], Ca = { key: 1 }, ba = { class: "events" }, Na = /* @__PURE__ */ W({
  __name: "KAlendarEventDetailDialog",
  props: /* @__PURE__ */ Lt({
    canEdit: { type: Boolean },
    canDelete: { type: Boolean }
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Lt(["edit", "delete", "eventClicked", "eventTitleClicked"], ["update:modelValue"]),
  setup(n, { emit: e }) {
    const { formatDate: t } = Ft(), { eventSelected: s } = ks(), { calendarDaySelect: r } = ue(), i = wn(n, "modelValue"), o = e, a = (y) => {
      const v = h.fromISO(y);
      return v.isValid && (v.hour !== 0 || v.minute !== 0 || v.second !== 0);
    }, l = se(() => {
      var y;
      return ((y = s.value) == null ? void 0 : y.id) === "more";
    }), u = se(() => {
      var y;
      return (y = r.value) == null ? void 0 : y.events;
    }), c = se(() => {
      var v;
      const y = (v = r.value) == null ? void 0 : v.day;
      return y ? t(y, h.DATE_FULL) : "";
    }), m = se(() => {
      if (!s.value || !s.value.start_date) return "";
      const y = a(s.value.start_date) ? h.DATETIME_MED : h.DATE_FULL;
      if (s.value.end_date) {
        const v = a(s.value.end_date) ? h.DATETIME_MED : h.DATE_FULL, N = t(s.value.start_date, y), H = t(s.value.end_date, v);
        return `${N} - ${H}`;
      }
      return `${t(s.value.start_date, y)}`;
    }), p = () => {
      o("eventTitleClicked", s.value);
    }, f = () => {
      o("edit", s.value);
    }, g = () => {
      o("delete", s.value);
    }, O = ({ event: y }) => {
      s.value = y, o("eventClicked", y);
    };
    return (y, v) => (k(), K(ia, {
      modelValue: i.value,
      "onUpdate:modelValue": v[0] || (v[0] = (N) => i.value = N)
    }, {
      header: $t(() => [
        l.value ? (k(), x("div", Da, [
          D("span", null, [
            D("time", { datetime: c.value }, B(c.value), 9, Ma)
          ])
        ])) : (k(), x("div", Sa, [
          n.canEdit ? (k(), K(ha, {
            key: 0,
            onClick: f
          })) : Q("", !0),
          n.canDelete ? (k(), K(ua, {
            key: 1,
            onClick: g
          })) : Q("", !0)
        ]))
      ]),
      default: $t(() => {
        var N, H, J;
        return [
          l.value ? (k(), x("section", Ca, [
            D("div", ba, [
              D("ul", null, [
                (k(!0), x(qe, null, Pe(u.value, (M) => (k(), K(Ts, {
                  key: M.id,
                  event: M,
                  calendar: Z(r),
                  onEventClicked: O
                }, null, 8, ["event", "calendar"]))), 128))
              ])
            ])
          ])) : (k(), x("section", Ea, [
            (N = Z(s)) != null && N.title ? (k(), K(Oa, {
              key: 0,
              event: Z(s),
              onClick: p
            }, null, 8, ["event"])) : Q("", !0),
            D("div", xa, [
              D("time", { datetime: m.value }, B(m.value), 9, Ia)
            ]),
            (H = Z(s)) != null && H.autor ? (k(), K(ga, {
              key: 1,
              autor: Z(s).autor
            }, null, 8, ["autor"])) : Q("", !0),
            (J = Z(s)) != null && J.description ? (k(), K(pa, {
              key: 2,
              content: Z(s).description
            }, null, 8, ["content"])) : Q("", !0)
          ]))
        ];
      }),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Va = /* @__PURE__ */ L(Na, [["__scopeId", "data-v-59bb36ea"]]), _a = { class: "k-alendar-wrapper-container" }, Fa = /* @__PURE__ */ W({
  __name: "KAlendar",
  props: {
    events: {},
    lang: {},
    canEdit: { type: Boolean },
    canDelete: { type: Boolean },
    withDefaultModal: { type: Boolean }
  },
  emits: [
    "delete",
    "edit",
    "eventClicked",
    "eventTitleClicked",
    "nextMonth",
    "prevMonth",
    "toToday",
    "plusEventCountClicked"
  ],
  setup(n, { emit: e }) {
    const t = e, s = n, { setLang: r } = Le(), { openEventsDetailDialog: i, dialogPositionToRender: o, closeDialog: a } = Dt(), { eventsToShowInCalendar: l, generateCalendar: u, monthDays: c, currentDate: m } = ue(), p = (M) => {
      t("prevMonth", M);
    }, f = (M) => {
      t("nextMonth", M);
    }, g = (M) => {
      t("toToday", M);
    }, O = () => {
      l.value = s.events, c.value = u(m.value.toFormat("yyyy-MM-dd"));
    };
    ft(
      () => s.lang,
      (M) => {
        M && r(M);
      },
      { immediate: !0 }
    ), ft(
      s,
      ({ events: M }) => {
        M && O();
      },
      { immediate: !0, deep: !0 }
    );
    const y = (M) => {
      t("eventClicked", M);
    }, v = (M) => {
      t("eventTitleClicked", { event: M, closeDialog: a });
    }, N = (M) => {
      t("edit", { event: M, closeDialog: a });
    }, H = (M) => {
      t("delete", { event: M, closeDialog: a });
    }, J = ({ events: M }) => {
      t("plusEventCountClicked", { events: M, closeDialog: a });
    };
    return (M, ce) => (k(), x("section", _a, [
      ye(Yi, {
        onHandlePrevMonth: p,
        onHandleNextMonth: f,
        onHandleToToday: g
      }),
      ye(Fi),
      ye(na, {
        onEventClicked: y,
        onPlusEventCountClicked: J
      }),
      n.withDefaultModal ? (k(), K(Va, {
        key: 0,
        modelValue: Z(i),
        "onUpdate:modelValue": ce[0] || (ce[0] = (tt) => Cs(i) ? i.value = tt : null),
        canDelete: n.canDelete,
        canEdit: n.canEdit,
        onEventClicked: y,
        onEventTitleClicked: v,
        onEdit: N,
        onDelete: H,
        style: Mt({
          top: `${Z(o).y}px`,
          left: `${Z(o).x}px`
        })
      }, null, 8, ["modelValue", "canDelete", "canEdit", "style"])) : Q("", !0)
    ]));
  }
}), $a = /* @__PURE__ */ L(Fa, [["__scopeId", "data-v-435be947"]]);
export {
  $a as KAlendar
};
