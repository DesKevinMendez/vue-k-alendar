import { ref as j, readonly as It, defineComponent as H, createElementBlock as O, openBlock as k, Fragment as te, renderList as se, normalizeClass as Ct, unref as F, toDisplayString as L, computed as z, createVNode as me, createElementVNode as T, normalizeStyle as ze, createCommentVNode as U, createBlock as B, useModel as Mn, watch as gt, onMounted as Ns, onUnmounted as xs, withModifiers as $s, renderSlot as at, mergeModels as Ht, withCtx as Rt, isRef as Fs } from "vue";
class ge extends Error {
}
class Ls extends ge {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class zs extends ge {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Ws extends ge {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class Se extends ge {
}
class En extends ge {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class A extends ge {
}
class le extends ge {
  constructor() {
    super("Zone is an abstract class");
  }
}
const g = "numeric", ne = "short", q = "long", je = {
  year: g,
  month: g,
  day: g
}, _n = {
  year: g,
  month: ne,
  day: g
}, As = {
  year: g,
  month: ne,
  day: g,
  weekday: ne
}, Vn = {
  year: g,
  month: q,
  day: g
}, In = {
  year: g,
  month: q,
  day: g,
  weekday: q
}, Cn = {
  hour: g,
  minute: g
}, bn = {
  hour: g,
  minute: g,
  second: g
}, Nn = {
  hour: g,
  minute: g,
  second: g,
  timeZoneName: ne
}, xn = {
  hour: g,
  minute: g,
  second: g,
  timeZoneName: q
}, $n = {
  hour: g,
  minute: g,
  hourCycle: "h23"
}, Fn = {
  hour: g,
  minute: g,
  second: g,
  hourCycle: "h23"
}, Ln = {
  hour: g,
  minute: g,
  second: g,
  hourCycle: "h23",
  timeZoneName: ne
}, zn = {
  hour: g,
  minute: g,
  second: g,
  hourCycle: "h23",
  timeZoneName: q
}, Wn = {
  year: g,
  month: g,
  day: g,
  hour: g,
  minute: g
}, An = {
  year: g,
  month: g,
  day: g,
  hour: g,
  minute: g,
  second: g
}, Zn = {
  year: g,
  month: ne,
  day: g,
  hour: g,
  minute: g
}, Hn = {
  year: g,
  month: ne,
  day: g,
  hour: g,
  minute: g,
  second: g
}, Zs = {
  year: g,
  month: ne,
  day: g,
  weekday: ne,
  hour: g,
  minute: g
}, Rn = {
  year: g,
  month: q,
  day: g,
  hour: g,
  minute: g,
  timeZoneName: ne
}, Un = {
  year: g,
  month: q,
  day: g,
  hour: g,
  minute: g,
  second: g,
  timeZoneName: ne
}, qn = {
  year: g,
  month: q,
  day: g,
  weekday: q,
  hour: g,
  minute: g,
  timeZoneName: q
}, Pn = {
  year: g,
  month: q,
  day: g,
  weekday: q,
  hour: g,
  minute: g,
  second: g,
  timeZoneName: q
};
class We {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new le();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new le();
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
    throw new le();
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
    throw new le();
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
    throw new le();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new le();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new le();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new le();
  }
}
let ot = null;
class et extends We {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return ot === null && (ot = new et()), ot;
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
    return ns(e, t, s);
  }
  /** @override **/
  formatOffset(e, t) {
    return $e(this.offset(e), t);
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
const wt = /* @__PURE__ */ new Map();
function Hs(n) {
  let e = wt.get(n);
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
  }), wt.set(n, e)), e;
}
const Rs = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function Us(n, e) {
  const t = n.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, r, i, o, a, l, u, c] = s;
  return [o, r, i, a, l, u, c];
}
function qs(n, e) {
  const t = n.formatToParts(e), s = [];
  for (let r = 0; r < t.length; r++) {
    const { type: i, value: o } = t[r], a = Rs[i];
    i === "era" ? s[a] = o : S(a) || (s[a] = parseInt(o, 10));
  }
  return s;
}
const lt = /* @__PURE__ */ new Map();
class oe extends We {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let t = lt.get(e);
    return t === void 0 && lt.set(e, t = new oe(e)), t;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    lt.clear(), wt.clear();
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
    super(), this.zoneName = e, this.valid = oe.isValidZone(e);
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
    return ns(e, t, s, this.name);
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
    return $e(this.offset(e), t);
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
    const s = Hs(this.name);
    let [r, i, o, a, l, u, c] = s.formatToParts ? qs(s, t) : Us(s, t);
    a === "BC" && (r = -Math.abs(r) + 1);
    const D = nt({
      year: r,
      month: i,
      day: o,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: c,
      millisecond: 0
    });
    let d = +t;
    const w = d % 1e3;
    return d -= w >= 0 ? w : 1e3 + w, (D - d) / (60 * 1e3);
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
let Ut = {};
function Ps(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Ut[t];
  return s || (s = new Intl.ListFormat(n, e), Ut[t] = s), s;
}
const vt = /* @__PURE__ */ new Map();
function kt(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = vt.get(t);
  return s === void 0 && (s = new Intl.DateTimeFormat(n, e), vt.set(t, s)), s;
}
const pt = /* @__PURE__ */ new Map();
function Ys(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = pt.get(t);
  return s === void 0 && (s = new Intl.NumberFormat(n, e), pt.set(t, s)), s;
}
const Tt = /* @__PURE__ */ new Map();
function Bs(n, e = {}) {
  const { base: t, ...s } = e, r = JSON.stringify([n, s]);
  let i = Tt.get(r);
  return i === void 0 && (i = new Intl.RelativeTimeFormat(n, e), Tt.set(r, i)), i;
}
let be = null;
function Gs() {
  return be || (be = new Intl.DateTimeFormat().resolvedOptions().locale, be);
}
const St = /* @__PURE__ */ new Map();
function Yn(n) {
  let e = St.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat(n).resolvedOptions(), St.set(n, e)), e;
}
const Dt = /* @__PURE__ */ new Map();
function Js(n) {
  let e = Dt.get(n);
  if (!e) {
    const t = new Intl.Locale(n);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, "minimalDays" in e || (e = { ...Bn, ...e }), Dt.set(n, e);
  }
  return e;
}
function js(n) {
  const e = n.indexOf("-x-");
  e !== -1 && (n = n.substring(0, e));
  const t = n.indexOf("-u-");
  if (t === -1)
    return [n];
  {
    let s, r;
    try {
      s = kt(n).resolvedOptions(), r = n;
    } catch {
      const l = n.substring(0, t);
      s = kt(l).resolvedOptions(), r = l;
    }
    const { numberingSystem: i, calendar: o } = s;
    return [r, i, o];
  }
}
function Ks(n, e, t) {
  return (t || e) && (n.includes("-u-") || (n += "-u"), t && (n += `-ca-${t}`), e && (n += `-nu-${e}`)), n;
}
function Qs(n) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const s = f.utc(2009, t, 1);
    e.push(n(s));
  }
  return e;
}
function Xs(n) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const s = f.utc(2016, 11, 13 + t);
    e.push(n(s));
  }
  return e;
}
function Re(n, e, t, s) {
  const r = n.listingMode();
  return r === "error" ? null : r === "en" ? t(e) : s(e);
}
function er(n) {
  return n.numberingSystem && n.numberingSystem !== "latn" ? !1 : n.numberingSystem === "latn" || !n.locale || n.locale.startsWith("en") || Yn(n.locale).numberingSystem === "latn";
}
class tr {
  constructor(e, t, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: r, floor: i, ...o } = s;
    if (!t || Object.keys(o).length > 0) {
      const a = { useGrouping: !1, ...s };
      s.padTo > 0 && (a.minimumIntegerDigits = s.padTo), this.inf = Ys(e, a);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : Ft(e, 3);
      return $(t, this.padTo);
    }
  }
}
class nr {
  constructor(e, t, s) {
    this.opts = s, this.originalZone = void 0;
    let r;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const o = -1 * (e.offset / 60), a = o >= 0 ? `Etc/GMT+${o}` : `Etc/GMT${o}`;
      e.offset !== 0 && oe.create(a).valid ? (r = a, this.dt = e) : (r = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, r = e.zone.name) : (r = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const i = { ...this.opts };
    i.timeZone = i.timeZone || r, this.dtf = kt(t, i);
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
class sr {
  constructor(e, t, s) {
    this.opts = { style: "long", ...s }, !t && es() && (this.rtf = Bs(e, s));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : Mr(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const Bn = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class I {
  static fromOpts(e) {
    return I.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, s, r, i = !1) {
    const o = e || N.defaultLocale, a = o || (i ? "en-US" : Gs()), l = t || N.defaultNumberingSystem, u = s || N.defaultOutputCalendar, c = Mt(r) || N.defaultWeekSettings;
    return new I(a, l, u, c, o);
  }
  static resetCache() {
    be = null, vt.clear(), pt.clear(), Tt.clear(), St.clear(), Dt.clear();
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: s, weekSettings: r } = {}) {
    return I.create(e, t, s, r);
  }
  constructor(e, t, s, r, i) {
    const [o, a, l] = js(e);
    this.locale = o, this.numberingSystem = t || a || null, this.outputCalendar = s || l || null, this.weekSettings = r, this.intl = Ks(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = er(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : I.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      Mt(e.weekSettings) || this.weekSettings,
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
    return Re(this, e, is, () => {
      const s = this.intl === "ja" || this.intl.startsWith("ja-");
      t &= !s;
      const r = t ? { month: e, day: "numeric" } : { month: e }, i = t ? "format" : "standalone";
      if (!this.monthsCache[i][e]) {
        const o = s ? (a) => this.dtFormatter(a, r).format() : (a) => this.extract(a, r, "month");
        this.monthsCache[i][e] = Qs(o);
      }
      return this.monthsCache[i][e];
    });
  }
  weekdays(e, t = !1) {
    return Re(this, e, ls, () => {
      const s = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, r = t ? "format" : "standalone";
      return this.weekdaysCache[r][e] || (this.weekdaysCache[r][e] = Xs(
        (i) => this.extract(i, s, "weekday")
      )), this.weekdaysCache[r][e];
    });
  }
  meridiems() {
    return Re(
      this,
      void 0,
      () => us,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [f.utc(2016, 11, 13, 9), f.utc(2016, 11, 13, 19)].map(
            (t) => this.extract(t, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return Re(this, e, cs, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [f.utc(-40, 1, 1), f.utc(2017, 1, 1)].map(
        (s) => this.extract(s, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, s) {
    const r = this.dtFormatter(e, t), i = r.formatToParts(), o = i.find((a) => a.type.toLowerCase() === s);
    return o ? o.value : null;
  }
  numberFormatter(e = {}) {
    return new tr(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new nr(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new sr(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return Ps(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || Yn(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : ts() ? Js(this.locale) : Bn;
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
let ut = null;
class R extends We {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return ut === null && (ut = new R(0)), ut;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? R.utcInstance : new R(e);
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
        return new R(st(t[1], t[2]));
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
    return this.fixed === 0 ? "UTC" : `UTC${$e(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${$e(-this.fixed, "narrow")}`;
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
    return $e(this.fixed, t);
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
class rr extends We {
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
function ce(n, e) {
  if (S(n) || n === null)
    return e;
  if (n instanceof We)
    return n;
  if (cr(n)) {
    const t = n.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? et.instance : t === "utc" || t === "gmt" ? R.utcInstance : R.parseSpecifier(t) || oe.create(n);
  } else return de(n) ? R.instance(n) : typeof n == "object" && "offset" in n && typeof n.offset == "function" ? n : new rr(n);
}
const bt = {
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
}, qt = {
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
}, ir = bt.hanidec.replace(/[\[|\]]/g, "").split("");
function ar(n) {
  let e = parseInt(n, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < n.length; t++) {
      const s = n.charCodeAt(t);
      if (n[t].search(bt.hanidec) !== -1)
        e += ir.indexOf(n[t]);
      else
        for (const r in qt) {
          const [i, o] = qt[r];
          s >= i && s <= o && (e += s - i);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const Ot = /* @__PURE__ */ new Map();
function or() {
  Ot.clear();
}
function Q({ numberingSystem: n }, e = "") {
  const t = n || "latn";
  let s = Ot.get(t);
  s === void 0 && (s = /* @__PURE__ */ new Map(), Ot.set(t, s));
  let r = s.get(e);
  return r === void 0 && (r = new RegExp(`${bt[t]}${e}`), s.set(e, r)), r;
}
let Pt = () => Date.now(), Yt = "system", Bt = null, Gt = null, Jt = null, jt = 60, Kt, Qt = null;
class N {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Pt;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Pt = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    Yt = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return ce(Yt, et.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Bt;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    Bt = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return Gt;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    Gt = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Jt;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    Jt = e;
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
    return Qt;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    Qt = Mt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return jt;
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
    jt = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Kt;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Kt = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    I.resetCache(), oe.resetCache(), f.resetCache(), or();
  }
}
class ee {
  constructor(e, t) {
    this.reason = e, this.explanation = t;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const Gn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Jn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function G(n, e) {
  return new ee(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${n}, which is invalid`
  );
}
function Nt(n, e, t) {
  const s = new Date(Date.UTC(n, e - 1, t));
  n < 100 && n >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const r = s.getUTCDay();
  return r === 0 ? 7 : r;
}
function jn(n, e, t) {
  return t + (Ae(n) ? Jn : Gn)[e - 1];
}
function Kn(n, e) {
  const t = Ae(n) ? Jn : Gn, s = t.findIndex((i) => i < e), r = e - t[s];
  return { month: s + 1, day: r };
}
function xt(n, e) {
  return (n - e + 7) % 7 + 1;
}
function Ke(n, e = 4, t = 1) {
  const { year: s, month: r, day: i } = n, o = jn(s, r, i), a = xt(Nt(s, r, i), t);
  let l = Math.floor((o - a + 14 - e) / 7), u;
  return l < 1 ? (u = s - 1, l = Fe(u, e, t)) : l > Fe(s, e, t) ? (u = s + 1, l = 1) : u = s, { weekYear: u, weekNumber: l, weekday: a, ...rt(n) };
}
function Xt(n, e = 4, t = 1) {
  const { weekYear: s, weekNumber: r, weekday: i } = n, o = xt(Nt(s, 1, e), t), a = De(s);
  let l = r * 7 + i - o - 7 + e, u;
  l < 1 ? (u = s - 1, l += De(u)) : l > a ? (u = s + 1, l -= De(s)) : u = s;
  const { month: c, day: m } = Kn(u, l);
  return { year: u, month: c, day: m, ...rt(n) };
}
function ct(n) {
  const { year: e, month: t, day: s } = n, r = jn(e, t, s);
  return { year: e, ordinal: r, ...rt(n) };
}
function en(n) {
  const { year: e, ordinal: t } = n, { month: s, day: r } = Kn(e, t);
  return { year: e, month: s, day: r, ...rt(n) };
}
function tn(n, e) {
  if (!S(n.localWeekday) || !S(n.localWeekNumber) || !S(n.localWeekYear)) {
    if (!S(n.weekday) || !S(n.weekNumber) || !S(n.weekYear))
      throw new Se(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return S(n.localWeekday) || (n.weekday = n.localWeekday), S(n.localWeekNumber) || (n.weekNumber = n.localWeekNumber), S(n.localWeekYear) || (n.weekYear = n.localWeekYear), delete n.localWeekday, delete n.localWeekNumber, delete n.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function lr(n, e = 4, t = 1) {
  const s = tt(n.weekYear), r = J(
    n.weekNumber,
    1,
    Fe(n.weekYear, e, t)
  ), i = J(n.weekday, 1, 7);
  return s ? r ? i ? !1 : G("weekday", n.weekday) : G("week", n.weekNumber) : G("weekYear", n.weekYear);
}
function ur(n) {
  const e = tt(n.year), t = J(n.ordinal, 1, De(n.year));
  return e ? t ? !1 : G("ordinal", n.ordinal) : G("year", n.year);
}
function Qn(n) {
  const e = tt(n.year), t = J(n.month, 1, 12), s = J(n.day, 1, Qe(n.year, n.month));
  return e ? t ? s ? !1 : G("day", n.day) : G("month", n.month) : G("year", n.year);
}
function Xn(n) {
  const { hour: e, minute: t, second: s, millisecond: r } = n, i = J(e, 0, 23) || e === 24 && t === 0 && s === 0 && r === 0, o = J(t, 0, 59), a = J(s, 0, 59), l = J(r, 0, 999);
  return i ? o ? a ? l ? !1 : G("millisecond", r) : G("second", s) : G("minute", t) : G("hour", e);
}
function S(n) {
  return typeof n > "u";
}
function de(n) {
  return typeof n == "number";
}
function tt(n) {
  return typeof n == "number" && n % 1 === 0;
}
function cr(n) {
  return typeof n == "string";
}
function dr(n) {
  return Object.prototype.toString.call(n) === "[object Date]";
}
function es() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function ts() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function fr(n) {
  return Array.isArray(n) ? n : [n];
}
function nn(n, e, t) {
  if (n.length !== 0)
    return n.reduce((s, r) => {
      const i = [e(r), r];
      return s && t(s[0], i[0]) === s[0] ? s : i;
    }, null)[1];
}
function hr(n, e) {
  return e.reduce((t, s) => (t[s] = n[s], t), {});
}
function Me(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Mt(n) {
  if (n == null)
    return null;
  if (typeof n != "object")
    throw new A("Week settings must be an object");
  if (!J(n.firstDay, 1, 7) || !J(n.minimalDays, 1, 7) || !Array.isArray(n.weekend) || n.weekend.some((e) => !J(e, 1, 7)))
    throw new A("Invalid week settings");
  return {
    firstDay: n.firstDay,
    minimalDays: n.minimalDays,
    weekend: Array.from(n.weekend)
  };
}
function J(n, e, t) {
  return tt(n) && n >= e && n <= t;
}
function mr(n, e) {
  return n - e * Math.floor(n / e);
}
function $(n, e = 2) {
  const t = n < 0;
  let s;
  return t ? s = "-" + ("" + -n).padStart(e, "0") : s = ("" + n).padStart(e, "0"), s;
}
function ue(n) {
  if (!(S(n) || n === null || n === ""))
    return parseInt(n, 10);
}
function fe(n) {
  if (!(S(n) || n === null || n === ""))
    return parseFloat(n);
}
function $t(n) {
  if (!(S(n) || n === null || n === "")) {
    const e = parseFloat("0." + n) * 1e3;
    return Math.floor(e);
  }
}
function Ft(n, e, t = "round") {
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
function Ae(n) {
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0);
}
function De(n) {
  return Ae(n) ? 366 : 365;
}
function Qe(n, e) {
  const t = mr(e - 1, 12) + 1, s = n + (e - t) / 12;
  return t === 2 ? Ae(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function nt(n) {
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
function sn(n, e, t) {
  return -xt(Nt(n, 1, e), t) + e - 1;
}
function Fe(n, e = 4, t = 1) {
  const s = sn(n, e, t), r = sn(n + 1, e, t);
  return (De(n) - s + r) / 7;
}
function Et(n) {
  return n > 99 ? n : n > N.twoDigitCutoffYear ? 1900 + n : 2e3 + n;
}
function ns(n, e, t, s = null) {
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
function st(n, e) {
  let t = parseInt(n, 10);
  Number.isNaN(t) && (t = 0);
  const s = parseInt(e, 10) || 0, r = t < 0 || Object.is(t, -0) ? -s : s;
  return t * 60 + r;
}
function ss(n) {
  const e = Number(n);
  if (typeof n == "boolean" || n === "" || !Number.isFinite(e))
    throw new A(`Invalid unit value ${n}`);
  return e;
}
function Xe(n, e) {
  const t = {};
  for (const s in n)
    if (Me(n, s)) {
      const r = n[s];
      if (r == null) continue;
      t[e(s)] = ss(r);
    }
  return t;
}
function $e(n, e) {
  const t = Math.trunc(Math.abs(n / 60)), s = Math.trunc(Math.abs(n % 60)), r = n >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${r}${$(t, 2)}:${$(s, 2)}`;
    case "narrow":
      return `${r}${t}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${r}${$(t, 2)}${$(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function rt(n) {
  return hr(n, ["hour", "minute", "second", "millisecond"]);
}
const yr = [
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
], rs = [
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
], gr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function is(n) {
  switch (n) {
    case "narrow":
      return [...gr];
    case "short":
      return [...rs];
    case "long":
      return [...yr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const as = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], os = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], wr = ["M", "T", "W", "T", "F", "S", "S"];
function ls(n) {
  switch (n) {
    case "narrow":
      return [...wr];
    case "short":
      return [...os];
    case "long":
      return [...as];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const us = ["AM", "PM"], vr = ["Before Christ", "Anno Domini"], kr = ["BC", "AD"], pr = ["B", "A"];
function cs(n) {
  switch (n) {
    case "narrow":
      return [...pr];
    case "short":
      return [...kr];
    case "long":
      return [...vr];
    default:
      return null;
  }
}
function Tr(n) {
  return us[n.hour < 12 ? 0 : 1];
}
function Sr(n, e) {
  return ls(e)[n.weekday - 1];
}
function Dr(n, e) {
  return is(e)[n.month - 1];
}
function Or(n, e) {
  return cs(e)[n.year < 0 ? 0 : 1];
}
function Mr(n, e, t = "always", s = !1) {
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
function rn(n, e) {
  let t = "";
  for (const s of n)
    s.literal ? t += s.val : t += e(s.val);
  return t;
}
const Er = {
  D: je,
  DD: _n,
  DDD: Vn,
  DDDD: In,
  t: Cn,
  tt: bn,
  ttt: Nn,
  tttt: xn,
  T: $n,
  TT: Fn,
  TTT: Ln,
  TTTT: zn,
  f: Wn,
  ff: Zn,
  fff: Rn,
  ffff: qn,
  F: An,
  FF: Hn,
  FFF: Un,
  FFFF: Pn
};
class Z {
  static create(e, t = {}) {
    return new Z(e, t);
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
    return Er[e];
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
      return $(e, t);
    const r = { ...this.opts };
    return t > 0 && (r.padTo = t), s && (r.signDisplay = s), this.loc.numberFormatter(r).format(e);
  }
  formatDateTimeFromString(e, t) {
    const s = this.loc.listingMode() === "en", r = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", i = (d, w) => this.loc.extract(e, d, w), o = (d) => e.isOffsetFixed && e.offset === 0 && d.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, d.format) : "", a = () => s ? Tr(e) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (d, w) => s ? Dr(e, d) : i(w ? { month: d } : { month: d, day: "numeric" }, "month"), u = (d, w) => s ? Sr(e, d) : i(
      w ? { weekday: d } : { weekday: d, month: "long", day: "numeric" },
      "weekday"
    ), c = (d) => {
      const w = Z.macroTokenToFormatOpts(d);
      return w ? this.formatWithSystemDefault(e, w) : d;
    }, m = (d) => s ? Or(e, d) : i({ era: d }, "era"), D = (d) => {
      switch (d) {
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
          return c(d);
      }
    };
    return rn(Z.parseFormat(t), D);
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
    }, i = (c, m) => (D) => {
      const d = r(D);
      if (d) {
        const w = m.isNegativeDuration && d !== m.largestUnit ? s : 1;
        let v;
        return this.opts.signMode === "negativeLargestOnly" && d !== m.largestUnit ? v = "never" : this.opts.signMode === "all" ? v = "always" : v = "auto", this.num(c.get(d) * w, D.length, v);
      } else
        return D;
    }, o = Z.parseFormat(t), a = o.reduce(
      (c, { literal: m, val: D }) => m ? c : c.concat(D),
      []
    ), l = e.shiftTo(...a.map(r).filter((c) => c)), u = {
      isNegativeDuration: l < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(l.values)[0]
    };
    return rn(o, i(l, u));
  }
}
const ds = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Ee(...n) {
  const e = n.reduce((t, s) => t + s.source, "");
  return RegExp(`^${e}$`);
}
function _e(...n) {
  return (e) => n.reduce(
    ([t, s, r], i) => {
      const [o, a, l] = i(e, r);
      return [{ ...t, ...o }, a || s, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function Ve(n, ...e) {
  if (n == null)
    return [null, null];
  for (const [t, s] of e) {
    const r = t.exec(n);
    if (r)
      return s(r);
  }
  return [null, null];
}
function fs(...n) {
  return (e, t) => {
    const s = {};
    let r;
    for (r = 0; r < n.length; r++)
      s[n[r]] = ue(e[t + r]);
    return [s, null, t + r];
  };
}
const hs = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, _r = `(?:${hs.source}?(?:\\[(${ds.source})\\])?)?`, Lt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, ms = RegExp(`${Lt.source}${_r}`), zt = RegExp(`(?:[Tt]${ms.source})?`), Vr = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Ir = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Cr = /(\d{4})-?(\d{3})/, br = fs("weekYear", "weekNumber", "weekDay"), Nr = fs("year", "ordinal"), xr = /(\d{4})-(\d\d)-(\d\d)/, ys = RegExp(
  `${Lt.source} ?(?:${hs.source}|(${ds.source}))?`
), $r = RegExp(`(?: ${ys.source})?`);
function Oe(n, e, t) {
  const s = n[e];
  return S(s) ? t : ue(s);
}
function Fr(n, e) {
  return [{
    year: Oe(n, e),
    month: Oe(n, e + 1, 1),
    day: Oe(n, e + 2, 1)
  }, null, e + 3];
}
function Ie(n, e) {
  return [{
    hours: Oe(n, e, 0),
    minutes: Oe(n, e + 1, 0),
    seconds: Oe(n, e + 2, 0),
    milliseconds: $t(n[e + 3])
  }, null, e + 4];
}
function Ze(n, e) {
  const t = !n[e] && !n[e + 1], s = st(n[e + 1], n[e + 2]), r = t ? null : R.instance(s);
  return [{}, r, e + 3];
}
function He(n, e) {
  const t = n[e] ? oe.create(n[e]) : null;
  return [{}, t, e + 1];
}
const Lr = RegExp(`^T?${Lt.source}$`), zr = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Wr(n) {
  const [e, t, s, r, i, o, a, l, u] = n, c = e[0] === "-", m = l && l[0] === "-", D = (d, w = !1) => d !== void 0 && (w || d && c) ? -d : d;
  return [
    {
      years: D(fe(t)),
      months: D(fe(s)),
      weeks: D(fe(r)),
      days: D(fe(i)),
      hours: D(fe(o)),
      minutes: D(fe(a)),
      seconds: D(fe(l), l === "-0"),
      milliseconds: D($t(u), m)
    }
  ];
}
const Ar = {
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
function Wt(n, e, t, s, r, i, o) {
  const a = {
    year: e.length === 2 ? Et(ue(e)) : ue(e),
    month: rs.indexOf(t) + 1,
    day: ue(s),
    hour: ue(r),
    minute: ue(i)
  };
  return o && (a.second = ue(o)), n && (a.weekday = n.length > 3 ? as.indexOf(n) + 1 : os.indexOf(n) + 1), a;
}
const Zr = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Hr(n) {
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
  ] = n, D = Wt(e, r, s, t, i, o, a);
  let d;
  return l ? d = Ar[l] : u ? d = 0 : d = st(c, m), [D, new R(d)];
}
function Rr(n) {
  return n.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const Ur = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, qr = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Pr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function an(n) {
  const [, e, t, s, r, i, o, a] = n;
  return [Wt(e, r, s, t, i, o, a), R.utcInstance];
}
function Yr(n) {
  const [, e, t, s, r, i, o, a] = n;
  return [Wt(e, a, t, s, r, i, o), R.utcInstance];
}
const Br = Ee(Vr, zt), Gr = Ee(Ir, zt), Jr = Ee(Cr, zt), jr = Ee(ms), gs = _e(
  Fr,
  Ie,
  Ze,
  He
), Kr = _e(
  br,
  Ie,
  Ze,
  He
), Qr = _e(
  Nr,
  Ie,
  Ze,
  He
), Xr = _e(
  Ie,
  Ze,
  He
);
function ei(n) {
  return Ve(
    n,
    [Br, gs],
    [Gr, Kr],
    [Jr, Qr],
    [jr, Xr]
  );
}
function ti(n) {
  return Ve(Rr(n), [Zr, Hr]);
}
function ni(n) {
  return Ve(
    n,
    [Ur, an],
    [qr, an],
    [Pr, Yr]
  );
}
function si(n) {
  return Ve(n, [zr, Wr]);
}
const ri = _e(Ie);
function ii(n) {
  return Ve(n, [Lr, ri]);
}
const ai = Ee(xr, $r), oi = Ee(ys), li = _e(
  Ie,
  Ze,
  He
);
function ui(n) {
  return Ve(
    n,
    [ai, gs],
    [oi, li]
  );
}
const on = "Invalid Duration", ws = {
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
}, ci = {
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
  ...ws
}, Y = 146097 / 400, ke = 146097 / 4800, di = {
  years: {
    quarters: 4,
    months: 12,
    weeks: Y / 7,
    days: Y,
    hours: Y * 24,
    minutes: Y * 24 * 60,
    seconds: Y * 24 * 60 * 60,
    milliseconds: Y * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Y / 28,
    days: Y / 4,
    hours: Y * 24 / 4,
    minutes: Y * 24 * 60 / 4,
    seconds: Y * 24 * 60 * 60 / 4,
    milliseconds: Y * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: ke / 7,
    days: ke,
    hours: ke * 24,
    minutes: ke * 24 * 60,
    seconds: ke * 24 * 60 * 60,
    milliseconds: ke * 24 * 60 * 60 * 1e3
  },
  ...ws
}, ye = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], fi = ye.slice(0).reverse();
function ae(n, e, t = !1) {
  const s = {
    values: t ? e.values : { ...n.values, ...e.values || {} },
    loc: n.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || n.conversionAccuracy,
    matrix: e.matrix || n.matrix
  };
  return new E(s);
}
function vs(n, e) {
  let t = e.milliseconds ?? 0;
  for (const s of fi.slice(1))
    e[s] && (t += e[s] * n[s].milliseconds);
  return t;
}
function ln(n, e) {
  const t = vs(n, e) < 0 ? -1 : 1;
  ye.reduceRight((s, r) => {
    if (S(e[r]))
      return s;
    if (s) {
      const i = e[s] * t, o = n[r][s], a = Math.floor(i / o);
      e[r] += a * t, e[s] -= a * o * t;
    }
    return r;
  }, null), ye.reduce((s, r) => {
    if (S(e[r]))
      return s;
    if (s) {
      const i = e[s] % 1;
      e[s] -= i, e[r] += i * n[s][r];
    }
    return r;
  }, null);
}
function un(n) {
  const e = {};
  for (const [t, s] of Object.entries(n))
    s !== 0 && (e[t] = s);
  return e;
}
class E {
  /**
   * @private
   */
  constructor(e) {
    const t = e.conversionAccuracy === "longterm" || !1;
    let s = t ? di : ci;
    e.matrix && (s = e.matrix), this.values = e.values, this.loc = e.loc || I.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = s, this.isLuxonDuration = !0;
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
    return E.fromObject({ milliseconds: e }, t);
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
      throw new A(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new E({
      values: Xe(e, E.normalizeUnit),
      loc: I.fromObject(t),
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
    if (de(e))
      return E.fromMillis(e);
    if (E.isDuration(e))
      return e;
    if (typeof e == "object")
      return E.fromObject(e);
    throw new A(
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
    const [s] = si(e);
    return s ? E.fromObject(s, t) : E.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
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
    const [s] = ii(e);
    return s ? E.fromObject(s, t) : E.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new A("need to specify a reason the Duration is invalid");
    const s = e instanceof ee ? e : new ee(e, t);
    if (N.throwOnInvalid)
      throw new Ws(s);
    return new E({ invalid: s });
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
    if (!t) throw new En(e);
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
    return this.isValid ? Z.create(this.loc, s).formatDurationFromString(this, e) : on;
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
    if (!this.isValid) return on;
    const t = e.showZeros !== !1, s = ye.map((r) => {
      const i = this.values[r];
      return S(i) || i === 0 && !t ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: r.slice(0, -1) }).format(i);
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
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += Ft(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
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
    }, f.fromMillis(t, { zone: "UTC" }).toISOTime(e));
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
    return this.isValid ? vs(this.matrix, this.values) : NaN;
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
    const t = E.fromDurationLike(e), s = {};
    for (const r of ye)
      (Me(t.values, r) || Me(this.values, r)) && (s[r] = t.get(r) + this.get(r));
    return ae(this, { values: s }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = E.fromDurationLike(e);
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
      t[s] = ss(e(this.values[s], s));
    return ae(this, { values: t }, !0);
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
    return this[E.normalizeUnit(e)];
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
    const t = { ...this.values, ...Xe(e, E.normalizeUnit) };
    return ae(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: s, matrix: r } = {}) {
    const o = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: r, conversionAccuracy: s };
    return ae(this, o);
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
    return ln(this.matrix, e), ae(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = un(this.normalize().shiftToAll().toObject());
    return ae(this, { values: e }, !0);
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
    e = e.map((o) => E.normalizeUnit(o));
    const t = {}, s = {}, r = this.toObject();
    let i;
    for (const o of ye)
      if (e.indexOf(o) >= 0) {
        i = o;
        let a = 0;
        for (const u in s)
          a += this.matrix[u][o] * s[u], s[u] = 0;
        de(r[o]) && (a += r[o]);
        const l = Math.trunc(a);
        t[o] = l, s[o] = (a * 1e3 - l * 1e3) / 1e3;
      } else de(r[o]) && (s[o] = r[o]);
    for (const o in s)
      s[o] !== 0 && (t[i] += o === i ? s[o] : s[o] / this.matrix[i][o]);
    return ln(this.matrix, t), ae(this, { values: t }, !0);
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
    return ae(this, { values: e }, !0);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const e = un(this.values);
    return ae(this, { values: e }, !0);
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
    for (const s of ye)
      if (!t(this.values[s], e.values[s]))
        return !1;
    return !0;
  }
}
const pe = "Invalid Interval";
function hi(n, e) {
  return !n || !n.isValid ? b.invalid("missing or invalid start") : !e || !e.isValid ? b.invalid("missing or invalid end") : e < n ? b.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${n.toISO()} and end=${e.toISO()}`
  ) : null;
}
class b {
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
      throw new A("need to specify a reason the Interval is invalid");
    const s = e instanceof ee ? e : new ee(e, t);
    if (N.throwOnInvalid)
      throw new zs(s);
    return new b({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const s = Ce(e), r = Ce(t), i = hi(s, r);
    return i ?? new b({
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
    const s = E.fromDurationLike(t), r = Ce(e);
    return b.fromDateTimes(r, r.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const s = E.fromDurationLike(t), r = Ce(e);
    return b.fromDateTimes(r.minus(s), r);
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
        i = f.fromISO(s, t), o = i.isValid;
      } catch {
        o = !1;
      }
      let a, l;
      try {
        a = f.fromISO(r, t), l = a.isValid;
      } catch {
        l = !1;
      }
      if (o && l)
        return b.fromDateTimes(i, a);
      if (o) {
        const u = E.fromISO(r, t);
        if (u.isValid)
          return b.after(i, u);
      } else if (l) {
        const u = E.fromISO(s, t);
        if (u.isValid)
          return b.before(a, u);
      }
    }
    return b.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
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
    return this.isValid ? b.fromDateTimes(e || this.s, t || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const t = e.map(Ce).filter((o) => this.contains(o)).sort((o, a) => o.toMillis() - a.toMillis()), s = [];
    let { s: r } = this, i = 0;
    for (; r < this.e; ) {
      const o = t[i] || this.e, a = +o > +this.e ? this.e : o;
      s.push(b.fromDateTimes(r, a)), r = a, i += 1;
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
    const t = E.fromDurationLike(e);
    if (!this.isValid || !t.isValid || t.as("milliseconds") === 0)
      return [];
    let { s } = this, r = 1, i;
    const o = [];
    for (; s < this.e; ) {
      const a = this.start.plus(t.mapUnits((l) => l * r));
      i = +a > +this.e ? this.e : a, o.push(b.fromDateTimes(s, i)), s = i, r += 1;
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
    return t >= s ? null : b.fromDateTimes(t, s);
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
    return b.fromDateTimes(t, s);
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
      s += l.type === "s" ? 1 : -1, s === 1 ? t = l.time : (t && +t != +l.time && r.push(b.fromDateTimes(t, l.time)), t = null);
    return b.merge(r);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return b.xor([this].concat(e)).map((t) => this.intersection(t)).filter((t) => t && !t.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : pe;
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
  toLocaleString(e = je, t = {}) {
    return this.isValid ? Z.create(this.s.loc.clone(t), e).formatInterval(this) : pe;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : pe;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : pe;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : pe;
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
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : pe;
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
    return this.isValid ? this.e.diff(this.s, e, t) : E.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return b.fromDateTimes(e(this.s), e(this.e));
  }
}
class Ue {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = N.defaultZone) {
    const t = f.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return oe.isValidZone(e);
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
    return ce(e, N.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || I.create(e)).getStartOfWeek();
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
    return (t || I.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || I.create(e)).getWeekendDays().slice();
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
    return (r || I.create(t, s, i)).months(e);
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
    return (r || I.create(t, s, i)).months(e, !0);
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
    return (r || I.create(t, s, null)).weekdays(e);
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
    return (r || I.create(t, s, null)).weekdays(e, !0);
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
    return I.create(e).meridiems();
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
    return I.create(t, null, "gregory").eras(e);
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
    return { relative: es(), localeWeek: ts() };
  }
}
function cn(n, e) {
  const t = (r) => r.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = t(e) - t(n);
  return Math.floor(E.fromMillis(s).as("days"));
}
function mi(n, e, t) {
  const s = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const c = cn(l, u);
        return (c - c % 7) / 7;
      }
    ],
    ["days", cn]
  ], r = {}, i = n;
  let o, a;
  for (const [l, u] of s)
    t.indexOf(l) >= 0 && (o = l, r[l] = u(n, e), a = i.plus(r), a > e ? (r[l]--, n = i.plus(r), n > e && (a = n, r[l]--, n = i.plus(r))) : n = a);
  return [n, r, a, o];
}
function yi(n, e, t, s) {
  let [r, i, o, a] = mi(n, e, t);
  const l = e - r, u = t.filter(
    (m) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(m) >= 0
  );
  u.length === 0 && (o < e && (o = r.plus({ [a]: 1 })), o !== r && (i[a] = (i[a] || 0) + l / (o - r)));
  const c = E.fromObject(i, s);
  return u.length > 0 ? E.fromMillis(l, s).shiftTo(...u).plus(c) : c;
}
const gi = "missing Intl.DateTimeFormat.formatToParts support";
function _(n, e = (t) => t) {
  return { regex: n, deser: ([t]) => e(ar(t)) };
}
const wi = " ", ks = `[ ${wi}]`, ps = new RegExp(ks, "g");
function vi(n) {
  return n.replace(/\./g, "\\.?").replace(ps, ks);
}
function dn(n) {
  return n.replace(/\./g, "").replace(ps, " ").toLowerCase();
}
function X(n, e) {
  return n === null ? null : {
    regex: RegExp(n.map(vi).join("|")),
    deser: ([t]) => n.findIndex((s) => dn(t) === dn(s)) + e
  };
}
function fn(n, e) {
  return { regex: n, deser: ([, t, s]) => st(t, s), groups: e };
}
function qe(n) {
  return { regex: n, deser: ([e]) => e };
}
function ki(n) {
  return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function pi(n, e) {
  const t = Q(e), s = Q(e, "{2}"), r = Q(e, "{3}"), i = Q(e, "{4}"), o = Q(e, "{6}"), a = Q(e, "{1,2}"), l = Q(e, "{1,3}"), u = Q(e, "{1,6}"), c = Q(e, "{1,9}"), m = Q(e, "{2,4}"), D = Q(e, "{4,6}"), d = (h) => ({ regex: RegExp(ki(h.val)), deser: ([y]) => y, literal: !0 }), v = ((h) => {
    if (n.literal)
      return d(h);
    switch (h.val) {
      case "G":
        return X(e.eras("short"), 0);
      case "GG":
        return X(e.eras("long"), 0);
      case "y":
        return _(u);
      case "yy":
        return _(m, Et);
      case "yyyy":
        return _(i);
      case "yyyyy":
        return _(D);
      case "yyyyyy":
        return _(o);
      case "M":
        return _(a);
      case "MM":
        return _(s);
      case "MMM":
        return X(e.months("short", !0), 1);
      case "MMMM":
        return X(e.months("long", !0), 1);
      case "L":
        return _(a);
      case "LL":
        return _(s);
      case "LLL":
        return X(e.months("short", !1), 1);
      case "LLLL":
        return X(e.months("long", !1), 1);
      case "d":
        return _(a);
      case "dd":
        return _(s);
      case "o":
        return _(l);
      case "ooo":
        return _(r);
      case "HH":
        return _(s);
      case "H":
        return _(a);
      case "hh":
        return _(s);
      case "h":
        return _(a);
      case "mm":
        return _(s);
      case "m":
        return _(a);
      case "q":
        return _(a);
      case "qq":
        return _(s);
      case "s":
        return _(a);
      case "ss":
        return _(s);
      case "S":
        return _(l);
      case "SSS":
        return _(r);
      case "u":
        return qe(c);
      case "uu":
        return qe(a);
      case "uuu":
        return _(t);
      case "a":
        return X(e.meridiems(), 0);
      case "kkkk":
        return _(i);
      case "kk":
        return _(m, Et);
      case "W":
        return _(a);
      case "WW":
        return _(s);
      case "E":
      case "c":
        return _(t);
      case "EEE":
        return X(e.weekdays("short", !1), 1);
      case "EEEE":
        return X(e.weekdays("long", !1), 1);
      case "ccc":
        return X(e.weekdays("short", !0), 1);
      case "cccc":
        return X(e.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return fn(new RegExp(`([+-]${a.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return fn(new RegExp(`([+-]${a.source})(${s.source})?`), 2);
      case "z":
        return qe(/[a-z_+-/]{1,256}?/i);
      case " ":
        return qe(/[^\S\n\r]/);
      default:
        return d(h);
    }
  })(n) || {
    invalidReason: gi
  };
  return v.token = n, v;
}
const Ti = {
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
function Si(n, e, t) {
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
  let a = Ti[o];
  if (typeof a == "object" && (a = a[i]), a)
    return {
      literal: !1,
      val: a
    };
}
function Di(n) {
  return [`^${n.map((t) => t.regex).reduce((t, s) => `${t}(${s.source})`, "")}$`, n];
}
function Oi(n, e, t) {
  const s = n.match(e);
  if (s) {
    const r = {};
    let i = 1;
    for (const o in t)
      if (Me(t, o)) {
        const a = t[o], l = a.groups ? a.groups + 1 : 1;
        !a.literal && a.token && (r[a.token.val[0]] = a.deser(s.slice(i, i + l))), i += l;
      }
    return [s, r];
  } else
    return [s, {}];
}
function Mi(n) {
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
  return S(n.z) || (t = oe.create(n.z)), S(n.Z) || (t || (t = new R(n.Z)), s = n.Z), S(n.q) || (n.M = (n.q - 1) * 3 + 1), S(n.h) || (n.h < 12 && n.a === 1 ? n.h += 12 : n.h === 12 && n.a === 0 && (n.h = 0)), n.G === 0 && n.y && (n.y = -n.y), S(n.u) || (n.S = $t(n.u)), [Object.keys(n).reduce((i, o) => {
    const a = e(o);
    return a && (i[a] = n[o]), i;
  }, {}), t, s];
}
let dt = null;
function Ei() {
  return dt || (dt = f.fromMillis(1555555555555)), dt;
}
function _i(n, e) {
  if (n.literal)
    return n;
  const t = Z.macroTokenToFormatOpts(n.val), s = Os(t, e);
  return s == null || s.includes(void 0) ? n : s;
}
function Ts(n, e) {
  return Array.prototype.concat(...n.map((t) => _i(t, e)));
}
class Ss {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = Ts(Z.parseFormat(t), e), this.units = this.tokens.map((s) => pi(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, r] = Di(this.units);
      this.regex = RegExp(s, "i"), this.handlers = r;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, s] = Oi(e, this.regex, this.handlers), [r, i, o] = s ? Mi(s) : [null, null, void 0];
      if (Me(s, "a") && Me(s, "H"))
        throw new Se(
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
function Ds(n, e, t) {
  return new Ss(n, t).explainFromTokens(e);
}
function Vi(n, e, t) {
  const { result: s, zone: r, specificOffset: i, invalidReason: o } = Ds(n, e, t);
  return [s, r, i, o];
}
function Os(n, e) {
  if (!n)
    return null;
  const s = Z.create(e, n).dtFormatter(Ei()), r = s.formatToParts(), i = s.resolvedOptions();
  return r.map((o) => Si(o, n, i));
}
const ft = "Invalid DateTime", hn = 864e13;
function Ne(n) {
  return new ee("unsupported zone", `the zone "${n.name}" is not supported`);
}
function ht(n) {
  return n.weekData === null && (n.weekData = Ke(n.c)), n.weekData;
}
function mt(n) {
  return n.localWeekData === null && (n.localWeekData = Ke(
    n.c,
    n.loc.getMinDaysInFirstWeek(),
    n.loc.getStartOfWeek()
  )), n.localWeekData;
}
function he(n, e) {
  const t = {
    ts: n.ts,
    zone: n.zone,
    c: n.c,
    o: n.o,
    loc: n.loc,
    invalid: n.invalid
  };
  return new f({ ...t, ...e, old: t });
}
function Ms(n, e, t) {
  let s = n - e * 60 * 1e3;
  const r = t.offset(s);
  if (e === r)
    return [s, e];
  s -= (r - e) * 60 * 1e3;
  const i = t.offset(s);
  return r === i ? [s, r] : [n - Math.min(r, i) * 60 * 1e3, Math.max(r, i)];
}
function Pe(n, e) {
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
function Be(n, e, t) {
  return Ms(nt(n), e, t);
}
function mn(n, e) {
  const t = n.o, s = n.c.year + Math.trunc(e.years), r = n.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, i = {
    ...n.c,
    year: s,
    month: r,
    day: Math.min(n.c.day, Qe(s, r)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, o = E.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), a = nt(i);
  let [l, u] = Ms(a, t, n.zone);
  return o !== 0 && (l += o, u = n.zone.offset(l)), { ts: l, o: u };
}
function Te(n, e, t, s, r, i) {
  const { setZone: o, zone: a } = t;
  if (n && Object.keys(n).length !== 0 || e) {
    const l = e || a, u = f.fromObject(n, {
      ...t,
      zone: l,
      specificOffset: i
    });
    return o ? u : u.setZone(a);
  } else
    return f.invalid(
      new ee("unparsable", `the input "${r}" can't be parsed as ${s}`)
    );
}
function Ye(n, e, t = !0) {
  return n.isValid ? Z.create(I.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(n, e) : null;
}
function yt(n, e, t) {
  const s = n.c.year > 9999 || n.c.year < 0;
  let r = "";
  if (s && n.c.year >= 0 && (r += "+"), r += $(n.c.year, s ? 6 : 4), t === "year") return r;
  if (e) {
    if (r += "-", r += $(n.c.month), t === "month") return r;
    r += "-";
  } else if (r += $(n.c.month), t === "month") return r;
  return r += $(n.c.day), r;
}
function yn(n, e, t, s, r, i, o) {
  let a = !t || n.c.millisecond !== 0 || n.c.second !== 0, l = "";
  switch (o) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (l += $(n.c.hour), o === "hour") break;
      if (e) {
        if (l += ":", l += $(n.c.minute), o === "minute") break;
        a && (l += ":", l += $(n.c.second));
      } else {
        if (l += $(n.c.minute), o === "minute") break;
        a && (l += $(n.c.second));
      }
      if (o === "second") break;
      a && (!s || n.c.millisecond !== 0) && (l += ".", l += $(n.c.millisecond, 3));
  }
  return r && (n.isOffsetFixed && n.offset === 0 && !i ? l += "Z" : n.o < 0 ? (l += "-", l += $(Math.trunc(-n.o / 60)), l += ":", l += $(Math.trunc(-n.o % 60))) : (l += "+", l += $(Math.trunc(n.o / 60)), l += ":", l += $(Math.trunc(n.o % 60)))), i && (l += "[" + n.zone.ianaName + "]"), l;
}
const Es = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ii = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ci = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ge = ["year", "month", "day", "hour", "minute", "second", "millisecond"], bi = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], Ni = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Je(n) {
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
  if (!e) throw new En(n);
  return e;
}
function gn(n) {
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
      return Je(n);
  }
}
function xi(n) {
  if (xe === void 0 && (xe = N.now()), n.type !== "iana")
    return n.offset(xe);
  const e = n.name;
  let t = _t.get(e);
  return t === void 0 && (t = n.offset(xe), _t.set(e, t)), t;
}
function wn(n, e) {
  const t = ce(e.zone, N.defaultZone);
  if (!t.isValid)
    return f.invalid(Ne(t));
  const s = I.fromObject(e);
  let r, i;
  if (S(n.year))
    r = N.now();
  else {
    for (const l of Ge)
      S(n[l]) && (n[l] = Es[l]);
    const o = Qn(n) || Xn(n);
    if (o)
      return f.invalid(o);
    const a = xi(t);
    [r, i] = Be(n, a, t);
  }
  return new f({ ts: r, zone: t, loc: s, o: i });
}
function vn(n, e, t) {
  const s = S(t.round) ? !0 : t.round, r = S(t.rounding) ? "trunc" : t.rounding, i = (a, l) => (a = Ft(a, s || t.calendary ? 0 : 2, t.calendary ? "round" : r), e.loc.clone(t).relFormatter(t).format(a, l)), o = (a) => t.calendary ? e.hasSame(n, a) ? 0 : e.startOf(a).diff(n.startOf(a), a).get(a) : e.diff(n, a).get(a);
  if (t.unit)
    return i(o(t.unit), t.unit);
  for (const a of t.units) {
    const l = o(a);
    if (Math.abs(l) >= 1)
      return i(l, a);
  }
  return i(n > e ? -0 : 0, t.units[t.units.length - 1]);
}
function kn(n) {
  let e = {}, t;
  return n.length > 0 && typeof n[n.length - 1] == "object" ? (e = n[n.length - 1], t = Array.from(n).slice(0, n.length - 1)) : t = Array.from(n), [e, t];
}
let xe;
const _t = /* @__PURE__ */ new Map();
class f {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || N.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new ee("invalid input") : null) || (t.isValid ? null : Ne(t));
    this.ts = S(e.ts) ? N.now() : e.ts;
    let r = null, i = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [r, i] = [e.old.c, e.old.o];
      else {
        const a = de(e.o) && !e.old ? e.o : t.offset(this.ts);
        r = Pe(this.ts, a), s = Number.isNaN(r.year) ? new ee("invalid input") : null, r = s ? null : r, i = s ? null : a;
      }
    this._zone = t, this.loc = e.loc || I.create(), this.invalid = s, this.weekData = null, this.localWeekData = null, this.c = r, this.o = i, this.isLuxonDateTime = !0;
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
    return new f({});
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
    const [e, t] = kn(arguments), [s, r, i, o, a, l, u] = t;
    return wn({ year: s, month: r, day: i, hour: o, minute: a, second: l, millisecond: u }, e);
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
    const [e, t] = kn(arguments), [s, r, i, o, a, l, u] = t;
    return e.zone = R.utcInstance, wn({ year: s, month: r, day: i, hour: o, minute: a, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const s = dr(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return f.invalid("invalid input");
    const r = ce(t.zone, N.defaultZone);
    return r.isValid ? new f({
      ts: s,
      zone: r,
      loc: I.fromObject(t)
    }) : f.invalid(Ne(r));
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
    if (de(e))
      return e < -hn || e > hn ? f.invalid("Timestamp out of range") : new f({
        ts: e,
        zone: ce(t.zone, N.defaultZone),
        loc: I.fromObject(t)
      });
    throw new A(
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
    if (de(e))
      return new f({
        ts: e * 1e3,
        zone: ce(t.zone, N.defaultZone),
        loc: I.fromObject(t)
      });
    throw new A("fromSeconds requires a numerical input");
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
    const s = ce(t.zone, N.defaultZone);
    if (!s.isValid)
      return f.invalid(Ne(s));
    const r = I.fromObject(t), i = Xe(e, gn), { minDaysInFirstWeek: o, startOfWeek: a } = tn(i, r), l = N.now(), u = S(t.specificOffset) ? s.offset(l) : t.specificOffset, c = !S(i.ordinal), m = !S(i.year), D = !S(i.month) || !S(i.day), d = m || D, w = i.weekYear || i.weekNumber;
    if ((d || c) && w)
      throw new Se(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (D && c)
      throw new Se("Can't mix ordinal dates with month/day");
    const v = w || i.weekday && !d;
    let h, y, p = Pe(l, u);
    v ? (h = bi, y = Ii, p = Ke(p, o, a)) : c ? (h = Ni, y = Ci, p = ct(p)) : (h = Ge, y = Es);
    let M = !1;
    for (const K of h) {
      const Zt = i[K];
      S(Zt) ? M ? i[K] = y[K] : i[K] = p[K] : M = !0;
    }
    const x = v ? lr(i, o, a) : c ? ur(i) : Qn(i), C = x || Xn(i);
    if (C)
      return f.invalid(C);
    const re = v ? Xt(i, o, a) : c ? en(i) : i, [ie, V] = Be(re, u, s), P = new f({
      ts: ie,
      zone: s,
      o: V,
      loc: r
    });
    return i.weekday && d && e.weekday !== P.weekday ? f.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${i.weekday} and a date of ${P.toISO()}`
    ) : P.isValid ? P : f.invalid(P.invalid);
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
    const [s, r] = ei(e);
    return Te(s, r, t, "ISO 8601", e);
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
    const [s, r] = ti(e);
    return Te(s, r, t, "RFC 2822", e);
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
    const [s, r] = ni(e);
    return Te(s, r, t, "HTTP", t);
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
    if (S(e) || S(t))
      throw new A("fromFormat requires an input string and a format");
    const { locale: r = null, numberingSystem: i = null } = s, o = I.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    }), [a, l, u, c] = Vi(o, e, t);
    return c ? f.invalid(c) : Te(a, l, s, `format ${t}`, e, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, t, s = {}) {
    return f.fromFormat(e, t, s);
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
    const [s, r] = ui(e);
    return Te(s, r, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new A("need to specify a reason the DateTime is invalid");
    const s = e instanceof ee ? e : new ee(e, t);
    if (N.throwOnInvalid)
      throw new Ls(s);
    return new f({ invalid: s });
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
    const s = Os(e, I.fromObject(t));
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
    return Ts(Z.parseFormat(e), I.fromObject(t)).map((r) => r.val).join("");
  }
  static resetCache() {
    xe = void 0, _t.clear();
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
    return this.isValid ? ht(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? ht(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? ht(this).weekday : NaN;
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
    return this.isValid ? mt(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? mt(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? mt(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? ct(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Ue.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Ue.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Ue.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Ue.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
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
    const e = 864e5, t = 6e4, s = nt(this.c), r = this.zone.offset(s - e), i = this.zone.offset(s + e), o = this.zone.offset(s - r * t), a = this.zone.offset(s - i * t);
    if (o === a)
      return [this];
    const l = s - o * t, u = s - a * t, c = Pe(l, o), m = Pe(u, a);
    return c.hour === m.hour && c.minute === m.minute && c.second === m.second && c.millisecond === m.millisecond ? [he(this, { ts: l }), he(this, { ts: u })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Ae(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Qe(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? De(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Fe(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? Fe(
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
    const { locale: t, numberingSystem: s, calendar: r } = Z.create(
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
    return this.setZone(R.instance(e), t);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(N.defaultZone);
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
    if (e = ce(e, N.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let r = this.ts;
      if (t || s) {
        const i = e.offset(this.ts), o = this.toObject();
        [r] = Be(o, i, e);
      }
      return he(this, { ts: r, zone: e });
    } else
      return f.invalid(Ne(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: s } = {}) {
    const r = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: s });
    return he(this, { loc: r });
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
    const t = Xe(e, gn), { minDaysInFirstWeek: s, startOfWeek: r } = tn(t, this.loc), i = !S(t.weekYear) || !S(t.weekNumber) || !S(t.weekday), o = !S(t.ordinal), a = !S(t.year), l = !S(t.month) || !S(t.day), u = a || l, c = t.weekYear || t.weekNumber;
    if ((u || o) && c)
      throw new Se(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && o)
      throw new Se("Can't mix ordinal dates with month/day");
    let m;
    i ? m = Xt(
      { ...Ke(this.c, s, r), ...t },
      s,
      r
    ) : S(t.ordinal) ? (m = { ...this.toObject(), ...t }, S(t.day) && (m.day = Math.min(Qe(m.year, m.month), m.day))) : m = en({ ...ct(this.c), ...t });
    const [D, d] = Be(m, this.o, this.zone);
    return he(this, { ts: D, o: d });
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
    const t = E.fromDurationLike(e);
    return he(this, mn(this, t));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = E.fromDurationLike(e).negate();
    return he(this, mn(this, t));
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
    const s = {}, r = E.normalizeUnit(e);
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
    return this.isValid ? Z.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : ft;
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
  toLocaleString(e = je, t = {}) {
    return this.isValid ? Z.create(this.loc.clone(t), e).formatDateTime(this) : ft;
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
    return this.isValid ? Z.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
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
    o = Je(o);
    const a = e === "extended";
    let l = yt(this, a, o);
    return Ge.indexOf(o) >= 3 && (l += "T"), l += yn(
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
    return this.isValid ? yt(this, e === "extended", Je(t)) : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Ye(this, "kkkk-'W'WW-c");
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
    return this.isValid ? (a = Je(a), (r && Ge.indexOf(a) >= 3 ? "T" : "") + yn(
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
    return Ye(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
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
    return Ye(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? yt(this, !0) : null;
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
    return (t || e) && (s && (r += " "), t ? r += "z" : e && (r += "ZZ")), Ye(this, r, !0);
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
    return this.isValid ? this.toISO() : ft;
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
      return E.invalid("created by diffing an invalid DateTime");
    const r = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, i = fr(t).map(E.normalizeUnit), o = e.valueOf() > this.valueOf(), a = o ? this : e, l = o ? e : this, u = yi(a, l, i, r);
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
    return this.diff(f.now(), e, t);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(e) {
    return this.isValid ? b.fromDateTimes(this, e) : this;
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
    const t = e.base || f.fromObject({}, { zone: this.zone }), s = e.padding ? this < t ? -e.padding : e.padding : 0;
    let r = ["years", "months", "days", "hours", "minutes", "seconds"], i = e.unit;
    return Array.isArray(e.unit) && (r = e.unit, i = void 0), vn(t, this.plus(s), {
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
    return this.isValid ? vn(e.base || f.fromObject({}, { zone: this.zone }), this, {
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
    if (!e.every(f.isDateTime))
      throw new A("min requires all arguments be DateTimes");
    return nn(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(f.isDateTime))
      throw new A("max requires all arguments be DateTimes");
    return nn(e, (t) => t.valueOf(), Math.max);
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
    const { locale: r = null, numberingSystem: i = null } = s, o = I.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    return Ds(o, e, t);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, t, s = {}) {
    return f.fromFormatExplain(e, t, s);
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
    const { locale: s = null, numberingSystem: r = null } = t, i = I.fromOpts({
      locale: s,
      numberingSystem: r,
      defaultToEN: !0
    });
    return new Ss(i, e);
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
    if (S(e) || S(t))
      throw new A(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: r = null, numberingSystem: i = null } = s, o = I.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    if (!o.equals(t.locale))
      throw new A(
        `fromFormatParser called with a locale of ${o}, but the format parser was created for ${t.locale}`
      );
    const { result: a, zone: l, specificOffset: u, invalidReason: c } = t.explainFromTokens(e);
    return c ? f.invalid(c) : Te(
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
    return je;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return _n;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return As;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return Vn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return In;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Cn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return bn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Nn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return xn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return $n;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Fn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Ln;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return zn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Wn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return An;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Zn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Hn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return Zs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Rn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Un;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return qn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Pn;
  }
}
function Ce(n) {
  if (f.isDateTime(n))
    return n;
  if (n && n.valueOf && de(n.valueOf()))
    return f.fromJSDate(n);
  if (n && typeof n == "object")
    return f.fromObject(n);
  throw new A(
    `Unknown datetime argument: ${n}, of type ${typeof n}`
  );
}
const pn = j(f.now().toISODate() || "");
function At() {
  const n = (e) => {
    pn.value = e;
  };
  return {
    currentDay: It(pn),
    setCurrentDay: n
  };
}
const _s = j("en"), $i = It(_s);
function we() {
  return {
    lang: $i,
    setLang: (e) => {
      _s.value = e, N.defaultLocale = e;
    }
  };
}
const Fi = { class: "k-alendar-days-container" }, Li = ["onClick"], zi = /* @__PURE__ */ H({
  __name: "KWeekDays",
  emits: ["dateClicked"],
  setup(n, { emit: e }) {
    const { currentDay: t, setCurrentDay: s } = At(), { lang: r } = we(), i = e, o = (l) => {
      s(l), i("dateClicked", l);
    }, a = () => {
      const l = f.now().startOf("week"), u = f.now().endOf("week"), c = [];
      let m = l;
      for (; m <= u; )
        c.push({
          text: m.setLocale(r.value).toFormat("ccc"),
          date: m.toISODate() || ""
        }), m = m.plus({ days: 1 });
      return c;
    };
    return (l, u) => (k(), O("div", Fi, [
      (k(!0), O(te, null, se(a(), (c) => (k(), O("div", {
        class: Ct(["k-alendar-day", { today: c.date === F(t) }]),
        onClick: (m) => o(c.date),
        key: c.date
      }, L(c.text), 11, Li))), 128))
    ]));
  }
}), W = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, r] of e)
    t[s] = r;
  return t;
}, Vs = /* @__PURE__ */ W(zi, [["__scopeId", "data-v-45cd916e"]]), Wi = { class: "k-day-view-container" }, Ai = { class: "k-day-view-events" }, Zi = { class: "k-day-view-hour" }, Hi = { class: "k-day-view-events-container" }, Ri = ["calendar-hour-container"], Ui = ["onClick"], qi = { class: "k-day-view-event-title" }, Pi = { class: "k-day-view-event-time" }, Yi = /* @__PURE__ */ H({
  __name: "KDayView",
  props: {
    events: {}
  },
  emits: ["eventClicked"],
  setup(n, { emit: e }) {
    const t = n, s = e, { currentDay: r } = At(), i = z(() => t.events), o = z(() => i.value.slice().sort((v, h) => new Date(v.start_date).getTime() - new Date(h.start_date).getTime())), a = z(() => o.value.filter((v) => f.fromISO(v.start_date).toFormat("yyyy-MM-dd") === r.value)), l = z(() => {
      const v = {};
      for (let h = 0; h < 24; h++)
        v[h] = [];
      return a.value.forEach((h) => {
        const y = f.fromISO(h.start_date);
        if (y.isValid) {
          const p = y.hour;
          v[p].push(h);
        }
      }), Object.keys(v).forEach((h) => {
        const y = parseInt(h);
        v[y].sort((p, M) => {
          const x = f.fromISO(p.start_date), C = f.fromISO(M.start_date);
          return x.toMillis() - C.toMillis();
        });
      }), Array.from({ length: 24 }, (h, y) => v[y]);
    }), u = (v, h, y) => {
      const p = f.fromISO(v.start_date);
      if (!p.isValid || p.hour !== h) return 0;
      const M = p.toMillis(), x = v.end_date ? f.fromISO(v.end_date).toMillis() : p.plus({ hours: 1 }).toMillis(), C = l.value[h];
      let re = 0;
      for (let ie = 0; ie < y; ie++) {
        const V = C[ie], P = f.fromISO(V.start_date).toMillis(), K = V.end_date ? f.fromISO(V.end_date).toMillis() : f.fromISO(V.start_date).plus({ hours: 1 }).toMillis();
        M < K && x > P && re++;
      }
      return re * 70;
    }, c = (v) => {
      const h = f.fromISO(v.start_date);
      return h.isValid ? (h.minute + h.second / 60) / 60 * 100 : 0;
    }, m = (v, h) => {
      const y = f.fromISO(v.start_date), p = 100;
      if (!y.isValid) return p;
      const M = y.hour, x = y.minute + y.second / 60;
      if (M !== h)
        return 0;
      if (v.end_date) {
        const C = f.fromISO(v.end_date);
        if (C.isValid && (C.hour !== 0 || C.minute !== 0 || C.second !== 0)) {
          const ie = C.hour, V = C.minute + C.second / 60, P = M * 60 + x, K = ie * 60 + V;
          return Math.max(K - P, 15) / 60 * 100;
        }
      }
      return p;
    }, D = (v) => {
      const h = f.fromISO(v.start_date);
      if (!h.isValid) return "";
      if (!(h.hour !== 0 || h.minute !== 0 || h.second !== 0)) return "All day";
      if (v.end_date) {
        const p = f.fromISO(v.end_date);
        if (p.isValid && (p.hour !== 0 || p.minute !== 0 || p.second !== 0))
          return `${h.toFormat("hh:mm a")} - ${p.toFormat("hh:mm a")}`;
      }
      return h.toFormat("hh:mm a");
    }, d = z(() => Array.from({ length: 24 }, (v, h) => {
      const y = h;
      return y === 0 ? "12:00 AM" : y < 12 ? `${y.toString().padStart(2, "0")}:00 AM` : y === 12 ? "12:00 PM" : `${(y - 12).toString().padStart(2, "0")}:00 PM`;
    })), w = (v) => {
      s("eventClicked", v);
    };
    return (v, h) => (k(), O("div", Wi, [
      me(Vs),
      T("section", Ai, [
        T("div", Zi, [
          (k(!0), O(te, null, se(d.value, (y) => (k(), O("div", {
            class: "k-day-view-hour-slot",
            key: y
          }, [
            T("h2", null, L(y), 1)
          ]))), 128))
        ]),
        T("div", Hi, [
          (k(!0), O(te, null, se(d.value, (y, p) => (k(), O("div", {
            class: "k-day-view-event-slot",
            key: y,
            "calendar-hour-container": y
          }, [
            (k(!0), O(te, null, se(l.value[p], (M, x) => (k(), O("div", {
              key: M.id,
              class: "k-day-view-event-item",
              style: ze({
                backgroundColor: M.color || "#3b82f6",
                top: `${c(M)}%`,
                left: `${u(M, p, x)}px`,
                width: `calc(100% - ${u(M, p, x)}px)`,
                height: `${m(M, p)}%`,
                zIndex: 10 + x
              }),
              onClick: (C) => w(M)
            }, [
              T("h3", qi, L(M.title), 1),
              T("p", Pi, L(D(M)), 1)
            ], 12, Ui))), 128))
          ], 8, Ri))), 128))
        ])
      ])
    ]));
  }
}), Bi = /* @__PURE__ */ W(Yi, [["__scopeId", "data-v-0197430a"]]), Tn = j(!1), Gi = j({ x: 0, y: 0 });
function Vt() {
  const n = () => {
    Tn.value = !1;
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
    }, { left: l, bottom: u, right: c, top: m } = e(s), D = [
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
    for (const { condition: d, position: w } of D)
      d && (i = w);
    if (l < 400 && u < 400 && c < 400) {
      const d = 400 - c + 16;
      i = { x: a.topLeft.x + d, y: a.topLeft.y };
    }
    if (l < 400 && m < 400 && u < 400 && c > 400) {
      const d = 400 - m + 16;
      i = { x: a.bottomRight.x, y: a.topLeft.y + d };
    }
    if (m < 400 && u < 400) {
      const d = 400 - m + 16;
      i = {
        x: a.bottomRight.x,
        y: a.topLeft.y + d
      };
    }
    if (m < 400 && u < 400 && c < 400 && l > 400) {
      const d = 400 - m + 16;
      i = {
        x: a.bottomLeft.x,
        y: a.topLeft.y + d
      };
    }
    return l > 400 && c > 400 && m > 400 && u > 400 && (i = { x: a.bottomRight.x, y: a.bottomRight.y }), i;
  }, openEventsDetailDialog: Tn, dialogPositionToRender: Gi, closeDialog: n };
}
function it() {
  const { lang: n } = we(), e = (s, r) => f.fromISO(s).setLocale(n.value).toLocaleString(r), t = z(() => f.now().toISODate());
  return {
    formatDate: e,
    today: t
  };
}
const Ji = j([]), Sn = j([]), Dn = j(f.now()), ji = j(null);
function ve() {
  const { today: n } = it(), { lang: e } = we(), t = z(() => Sn.value.map((a) => ({
    ...a,
    date_calendar_to_render: a.start_date
  }))), s = (a) => {
    const [l, u, c] = a.split("-").map(Number), m = f.now().set({ year: l, month: u, day: c }), D = m.startOf("month"), d = m.endOf("month"), w = D.startOf("week"), v = d.endOf("week"), h = [];
    let y = w;
    for (; y <= v; )
      h.push(y.toISODate()), y = y.plus({ days: 1 });
    return h;
  }, r = (a, {
    startDate: l,
    endDate: u
  }) => {
    const c = f.fromISO(a), m = f.fromISO(l), D = f.fromISO(u);
    return b.fromDateTimes(m, D).contains(c);
  }, i = (a) => s(a).map((l) => {
    const u = [], c = [], m = f.fromISO(l), D = f.fromISO(a);
    t.value.forEach((w) => {
      w.end_date && r(l, {
        startDate: w.start_date,
        endDate: w.end_date
      }) ? c.push({ ...w, date_calendar_to_render: l }) : c.push(w);
    });
    const d = c.filter((w) => m.hasSame(f.fromISO(w.date_calendar_to_render), "day"));
    return m.hasSame(D, "month") || u.push("other-month-date"), m.hasSame(f.fromISO(n.value), "day") && u.push("selected"), {
      day: l,
      class: u.join(" "),
      events: d || [],
      text: f.fromISO(l).day.toString()
    };
  }), o = z(() => f.fromJSDate(Dn.value.toJSDate()).setLocale(e.value).toFormat("MMMM yyyy"));
  return {
    eventsToShowInCalendar: Sn,
    calendarDaySelect: ji,
    title: o,
    monthDays: Ji,
    generateCalendar: i,
    currentDate: Dn
  };
}
const On = j("calendar");
function Is() {
  const n = (e) => {
    On.value = e;
  };
  return {
    currentView: It(On),
    setCurrentView: n
  };
}
const Ki = j({
  id: "",
  title: "",
  start_date: "",
  description: ""
});
function Cs() {
  return {
    eventSelected: Ki
  };
}
const Qi = /* @__PURE__ */ H({
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
    return (i, o) => (k(), O("li", {
      style: ze({
        "background-color": n.event.id === "more" ? "gray" : n.event.color ? n.event.color : "#374151"
      }),
      onClick: r
    }, [
      T("h3", null, L(n.event.title), 1)
    ], 4));
  }
}), bs = /* @__PURE__ */ W(Qi, [["__scopeId", "data-v-2ec57e40"]]), Xi = { class: "k-alendar-container" }, ea = ["onClick"], ta = { class: "k-alendar-span-container" }, na = { class: "k-alendar-text" }, sa = {
  key: 0,
  class: "point"
}, ra = {
  key: 0,
  class: "events"
}, ia = /* @__PURE__ */ H({
  __name: "KCalendar",
  emits: ["eventClicked", "plusEventCountClicked"],
  setup(n, { emit: e }) {
    const { openEventsDetailDialog: t, dialogPositionToRender: s } = Vt(), { monthDays: r, calendarDaySelect: i } = ve(), { eventSelected: o } = Cs(), { collision: a } = Vt(), l = e, u = j({}), c = (w) => {
      if (window.innerWidth < 768) {
        const y = Math.floor((window.innerWidth - 400) / 2);
        s.value = { x: y, y: 16 }, w.events.length > 0 && (w.events.length === 1 ? (o.value = w.events[0], w.events[0].id != "more" && l("eventClicked", w.events[0])) : (o.value = {
          id: "more",
          title: "",
          start_date: "",
          description: ""
        }, l("plusEventCountClicked", { events: w.events })), i.value = w, t.value = !0);
      }
    }, m = ({
      mauseEvent: w,
      event: v,
      calendar: h
    }) => {
      if (o.value = v, i.value = h, h.events.length > 0) {
        let y = w.target;
        y.tagName === "H3" && (y = y.parentElement), s.value = a(y), t.value = !0;
      }
      v.id != "more" ? l("eventClicked", v) : l("plusEventCountClicked", { events: i.value.events });
    }, D = (w) => {
      var C;
      const v = u.value[w];
      let h = 0;
      const y = 32, p = 8, M = 8;
      let x = 0;
      if (v) {
        h = v.clientHeight - M * 2;
        const re = (C = v.querySelector("span.k-alendar-text")) == null ? void 0 : C.offsetHeight;
        h -= re || 0, x = Math.floor(
          h / (y + p)
        );
      }
      return x;
    }, d = (w, v) => {
      const h = D(w), y = v.slice(0, h);
      return v.length - h > 0 && y.splice(y.length - 1, 1, {
        id: "more",
        title: `+${v.length + 1 - h}`,
        start_date: "",
        description: ""
      }), y;
    };
    return (w, v) => (k(), O(te, null, [
      me(Vs),
      T("div", Xi, [
        (k(!0), O(te, null, se(F(r), (h) => (k(), O("div", {
          key: h.day.toString(),
          onClick: (y) => c(h),
          class: Ct([h.class, "date"]),
          ref_for: !0,
          ref: (y) => u.value[h.day] = y
        }, [
          T("div", ta, [
            T("span", na, L(h.text), 1),
            h.events.length > 0 ? (k(), O("span", sa)) : U("", !0)
          ]),
          h.events.length > 0 ? (k(), O("div", ra, [
            T("ul", null, [
              (k(!0), O(te, null, se(d(h.day, h.events), (y) => (k(), B(bs, {
                key: y.id,
                event: y,
                calendar: h,
                onEventClicked: m
              }, null, 8, ["event", "calendar"]))), 128))
            ])
          ])) : U("", !0)
        ], 10, ea))), 128))
      ])
    ], 64));
  }
}), aa = /* @__PURE__ */ W(ia, [["__scopeId", "data-v-e8a32f0f"]]), oa = /* @__PURE__ */ H({
  __name: "ButtonNextMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const { currentDate: t, monthDays: s, generateCalendar: r } = ve(), i = e, o = () => {
      t.value = t.value.plus({ months: 1 });
      const a = f.fromJSDate(t.value.toJSDate()).toFormat("yyyy-MM-dd");
      s.value = r(a), i("handle", a);
    };
    return (a, l) => (k(), O("button", {
      type: "button",
      class: "k-alendar-navegation-left",
      onClick: o
    }, "→"));
  }
}), la = /* @__PURE__ */ W(oa, [["__scopeId", "data-v-4b86600a"]]), ua = /* @__PURE__ */ H({
  __name: "ButtonPrevMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const t = e, { currentDate: s, monthDays: r, generateCalendar: i } = ve(), o = () => {
      s.value = s.value.minus({ months: 1 });
      const a = f.fromJSDate(s.value.toJSDate()).toFormat("yyyy-MM-dd");
      r.value = i(a), t("handle", a);
    };
    return (a, l) => (k(), O("button", {
      type: "button",
      class: "k-alendar-navegation-prev",
      onClick: o
    }, "←"));
  }
}), ca = /* @__PURE__ */ W(ua, [["__scopeId", "data-v-9bfa9322"]]), Le = {
  en: {
    dayView: "Day",
    monthView: "Month",
    listView: "List",
    allDay: "All day",
    nothingToShow: "No events found",
    buttons: {
      today: "Today"
    }
  },
  es: {
    dayView: "Día",
    monthView: "Mes",
    listView: "Lista",
    allDay: "Todo el día",
    nothingToShow: "No se encontraron eventos",
    buttons: {
      today: "Hoy"
    }
  },
  fr: {
    dayView: "Jour",
    monthView: "Mois",
    listView: "Liste",
    allDay: "Toute la journée",
    nothingToShow: "Aucun événement trouvé",
    buttons: {
      today: "Aujourd'hui"
    }
  },
  it: {
    dayView: "Giorno",
    monthView: "Mese",
    listView: "Elenco",
    allDay: "Tutto il giorno",
    nothingToShow: "Nessun evento trovato",
    buttons: {
      today: "Oggi"
    }
  },
  de: {
    dayView: "Tag",
    monthView: "Monat",
    listView: "Liste",
    allDay: "Ganztägig",
    nothingToShow: "Keine Ereignisse gefunden",
    buttons: {
      today: "Heute"
    }
  },
  pt: {
    dayView: "Dia",
    monthView: "Mês",
    listView: "Lista",
    allDay: "Dia inteiro",
    nothingToShow: "Nenhum evento encontrado",
    buttons: {
      today: "Hoje"
    }
  },
  nl: {
    dayView: "Dag",
    monthView: "Maand",
    listView: "Lijst",
    allDay: "Hele dag",
    nothingToShow: "Geen evenementen gevonden",
    buttons: {
      today: "Vandaag"
    }
  },
  ru: {
    dayView: "День",
    monthView: "Месяц",
    listView: "Список",
    allDay: "Весь день",
    nothingToShow: "События не найдены",
    buttons: {
      today: "Сегодня"
    }
  },
  ja: {
    dayView: "日",
    monthView: "月",
    listView: "リスト",
    allDay: "終日",
    nothingToShow: "イベントが見つかりませんでした",
    buttons: {
      today: "今日"
    }
  },
  zh: {
    dayView: "日",
    monthView: "月",
    listView: "列表",
    allDay: "全天",
    nothingToShow: "未找到事件",
    buttons: {
      today: "今天"
    }
  },
  ko: {
    dayView: "일",
    monthView: "월",
    listView: "목록",
    allDay: "하루 종일",
    nothingToShow: "이벤트를 찾을 수 없습니다",
    buttons: {
      today: "오늘"
    }
  },
  ar: {
    dayView: "يوم",
    monthView: "شهر",
    listView: "قائمة",
    allDay: "طوال اليوم",
    nothingToShow: "لم يتم العثور على أحداث",
    buttons: {
      today: "اليوم"
    }
  },
  he: {
    dayView: "יום",
    monthView: "חודש",
    listView: "רשימה",
    allDay: "כל היום",
    nothingToShow: "לא נמצאו אירועים",
    buttons: {
      today: "היום"
    }
  },
  id: {
    dayView: "Hari",
    monthView: "Bulan",
    listView: "Daftar",
    allDay: "Sepanjang hari",
    nothingToShow: "Tidak ada acara yang ditemukan",
    buttons: {
      today: "Hari ini"
    }
  },
  tr: {
    dayView: "Gün",
    monthView: "Ay",
    listView: "Liste",
    allDay: "Tüm gün",
    nothingToShow: "Etkinlik bulunamadı",
    buttons: {
      today: "Bugün"
    }
  },
  vi: {
    dayView: "Ngày",
    monthView: "Tháng",
    listView: "Danh sách",
    allDay: "Cả ngày",
    nothingToShow: "Không tìm thấy sự kiện",
    buttons: {
      today: "Hôm nay"
    }
  },
  th: {
    dayView: "วัน",
    monthView: "เดือน",
    listView: "รายการ",
    allDay: "ทั้งวัน",
    nothingToShow: "ไม่พบเหตุการณ์",
    buttons: {
      today: "วันนี้"
    }
  },
  pl: {
    dayView: "Dzień",
    monthView: "Miesiąc",
    listView: "Lista",
    allDay: "Cały dzień",
    nothingToShow: "Nie znaleziono wydarzeń",
    buttons: {
      today: "Dzisiaj"
    }
  },
  hu: {
    dayView: "Nap",
    monthView: "Hónap",
    listView: "Lista",
    allDay: "Egész nap",
    nothingToShow: "Nem találhatók események",
    buttons: {
      today: "Ma"
    }
  },
  cs: {
    dayView: "Den",
    monthView: "Měsíc",
    listView: "Seznam",
    allDay: "Celý den",
    nothingToShow: "Nebyly nalezeny žádné události",
    buttons: {
      today: "Dnes"
    }
  },
  sk: {
    dayView: "Deň",
    monthView: "Mesiac",
    listView: "Zoznam",
    allDay: "Celý deň",
    nothingToShow: "Nenašli sa žiadne udalosti",
    buttons: {
      today: "Dnes"
    }
  },
  hr: {
    dayView: "Dan",
    monthView: "Mjesec",
    listView: "Lista",
    allDay: "Cijeli dan",
    nothingToShow: "Nisu pronađeni događaji",
    buttons: {
      today: "Danas"
    }
  },
  ro: {
    dayView: "Zi",
    monthView: "Lună",
    listView: "Listă",
    allDay: "Toată ziua",
    nothingToShow: "Nu s-au găsit evenimente",
    buttons: {
      today: "Astăzi"
    }
  },
  bg: {
    dayView: "Ден",
    monthView: "Месец",
    listView: "Списък",
    allDay: "Цял ден",
    nothingToShow: "Не са намерени събития",
    buttons: {
      today: "Днес"
    }
  },
  sl: {
    dayView: "Dan",
    monthView: "Mesec",
    listView: "Seznam",
    allDay: "Ves dan",
    nothingToShow: "Ni dogodkov ni najdenih",
    buttons: {
      today: "Danes"
    }
  },
  et: {
    dayView: "Päev",
    monthView: "Kuu",
    listView: "Nimekiri",
    allDay: "Kogu päev",
    nothingToShow: "Sündmusi ei leitud",
    buttons: {
      today: "Täna"
    }
  }
}, da = /* @__PURE__ */ H({
  __name: "ButtonTodayMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const t = e, { currentDate: s, monthDays: r, generateCalendar: i } = ve(), { today: o } = it(), { lang: a } = we(), l = () => {
      s.value = f.now(), r.value = i(o.value), t("handle", o.value);
    }, u = z(() => Le[a.value].buttons.today || "Today");
    return (c, m) => (k(), O("button", {
      type: "button",
      class: "k-alendar-today-button",
      onClick: l
    }, L(u.value), 1));
  }
}), fa = /* @__PURE__ */ W(da, [["__scopeId", "data-v-4da96950"]]), ha = { class: "k-view-selector-container" }, ma = ["onClick"], ya = /* @__PURE__ */ H({
  __name: "KViewSelector",
  setup(n) {
    const { lang: e } = we(), { setCurrentDay: t } = At(), { today: s } = it(), { currentView: r, setCurrentView: i } = Is(), o = z(() => {
      const l = Le[e.value] || Le.en;
      return [
        { label: l.monthView, value: "calendar" },
        { label: l.dayView, value: "day" },
        { label: l.listView, value: "list" }
      ];
    }), a = (l) => {
      i(l), t(s.value);
    };
    return (l, u) => (k(), O("div", ha, [
      (k(!0), O(te, null, se(o.value, (c) => (k(), O("button", {
        key: c.value,
        onClick: (m) => a(c.value),
        class: Ct([
          "k-view-selector-button",
          { "k-view-selector-button-active": F(r) === c.value }
        ])
      }, L(c.label), 11, ma))), 128))
    ]));
  }
}), ga = /* @__PURE__ */ W(ya, [["__scopeId", "data-v-16b9efd5"]]), wa = { class: "k-alendar-header-container" }, va = { class: "left-buttons" }, ka = { class: "navigation-buttons-group" }, pa = { class: "title-and-controls" }, Ta = { class: "center-title" }, Sa = { class: "right-controls" }, Da = /* @__PURE__ */ H({
  __name: "KCalendarHeader",
  emits: ["handlePrevMonth", "handleNextMonth", "handleToToday"],
  setup(n, { emit: e }) {
    const { title: t } = ve(), s = e, r = (a) => {
      s("handlePrevMonth", a);
    }, i = (a) => {
      s("handleNextMonth", a);
    }, o = (a) => {
      s("handleToToday", a);
    };
    return (a, l) => (k(), O("header", wa, [
      T("div", va, [
        T("div", ka, [
          me(ca, { onHandle: r }),
          me(la, { onHandle: i })
        ]),
        me(fa, { onHandle: o })
      ]),
      T("div", pa, [
        T("div", Ta, [
          T("h2", null, L(F(t)), 1)
        ]),
        T("div", Sa, [
          me(ga)
        ])
      ])
    ]));
  }
}), Oa = /* @__PURE__ */ W(Da, [["__scopeId", "data-v-074e7161"]]), Ma = ["open"], Ea = { class: "k-alendar-dialog-main" }, _a = /* @__PURE__ */ H({
  __name: "KDialog",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Mn(n, "modelValue"), t = j(null);
    gt(e, (r) => {
      t.value && r ? t.value.showModal() : t.value && t.value.close();
    }), Ns(() => {
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
    return (r, i) => (k(), O("dialog", {
      ref_key: "dialog",
      ref: t,
      id: "k-alendar-dialog",
      "modal-mode": "mega",
      class: "k-alendar-dialog",
      open: e.value,
      onClick: $s(s, ["self"])
    }, [
      T("header", null, [
        at(r.$slots, "header"),
        T("button", {
          class: "k-alendar-button-close",
          type: "button",
          onClick: s
        }, [...i[0] || (i[0] = [
          T("svg", {
            "aria-hidden": "true",
            focusable: "false",
            "data-prefix": "fas",
            "data-icon": "xmark",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 320 512"
          }, [
            T("path", {
              class: "",
              fill: "currentColor",
              d: "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
            })
          ], -1)
        ])])
      ]),
      T("article", Ea, [
        at(r.$slots, "default")
      ]),
      T("footer", null, [
        at(r.$slots, "footer")
      ])
    ], 8, Ma));
  }
}), Va = {}, Ia = {
  class: "k-alendar-button-edit-delete",
  type: "button"
};
function Ca(n, e) {
  return k(), O("button", Ia, [...e[0] || (e[0] = [
    T("svg", {
      class: "h-5 w-5 text-gray-600",
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "far",
      "data-icon": "trash-can",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512"
    }, [
      T("path", {
        class: "",
        fill: "currentColor",
        d: "M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
      })
    ], -1)
  ])]);
}
const ba = /* @__PURE__ */ W(Va, [["render", Ca], ["__scopeId", "data-v-58b8063e"]]), Na = {}, xa = {
  class: "k-alendar-button-edit-delete",
  type: "button"
};
function $a(n, e) {
  return k(), O("button", xa, [...e[0] || (e[0] = [
    T("svg", {
      class: "h-5 w-5 text-gray-600",
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "far",
      "data-icon": "pen-to-square",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, [
      T("path", {
        class: "",
        fill: "currentColor",
        d: "M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
      })
    ], -1)
  ])]);
}
const Fa = /* @__PURE__ */ W(Na, [["render", $a], ["__scopeId", "data-v-bf161d91"]]), La = { class: "autor" }, za = /* @__PURE__ */ H({
  __name: "EDAutor",
  props: {
    autor: {}
  },
  setup(n) {
    return (e, t) => (k(), O("div", La, [
      t[0] || (t[0] = T("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "far",
        "data-icon": "user",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512"
      }, [
        T("path", {
          class: "",
          fill: "currentColor",
          d: "M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
        })
      ], -1)),
      T("p", null, L(n.autor), 1)
    ]));
  }
}), Wa = /* @__PURE__ */ W(za, [["__scopeId", "data-v-9c08a59e"]]), Aa = { class: "content" }, Za = /* @__PURE__ */ H({
  __name: "EDContent",
  props: {
    content: {}
  },
  setup(n) {
    return (e, t) => (k(), O("div", Aa, [
      t[0] || (t[0] = T("svg", {
        class: "h-5 w-5 text-gray-600 dark:text-gray-300",
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "far",
        "data-icon": "comment",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, [
        T("path", {
          class: "",
          fill: "currentColor",
          d: "M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
        })
      ], -1)),
      T("p", null, L(n.content), 1)
    ]));
  }
}), Ha = /* @__PURE__ */ W(Za, [["__scopeId", "data-v-7de34190"]]), Ra = { class: "title" }, Ua = /* @__PURE__ */ H({
  __name: "EDTitle",
  props: {
    event: {}
  },
  setup(n) {
    return (e, t) => {
      var s, r;
      return k(), O("div", Ra, [
        (s = n.event) != null && s.color ? (k(), O("span", {
          key: 0,
          class: "circle",
          style: ze({ backgroundColor: n.event.color })
        }, null, 4)) : U("", !0),
        T("h2", null, L((r = n.event) == null ? void 0 : r.title), 1)
      ]);
    };
  }
}), qa = /* @__PURE__ */ W(Ua, [["__scopeId", "data-v-16f01c17"]]), Pa = {
  key: 0,
  class: "flex justify-between"
}, Ya = { key: 1 }, Ba = ["datetime"], Ga = {
  key: 0,
  class: "k-alendar-event-detail-main-wrapper"
}, Ja = { class: "dates" }, ja = ["datetime"], Ka = { key: 1 }, Qa = { class: "events" }, Xa = /* @__PURE__ */ H({
  __name: "KAlendarEventDetailDialog",
  props: /* @__PURE__ */ Ht({
    canEdit: { type: Boolean },
    canDelete: { type: Boolean }
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ht(["edit", "delete", "eventClicked", "eventTitleClicked"], ["update:modelValue"]),
  setup(n, { emit: e }) {
    const { formatDate: t } = it(), { eventSelected: s } = Cs(), { calendarDaySelect: r } = ve(), i = Mn(n, "modelValue"), o = e, a = (h) => {
      const y = f.fromISO(h);
      return y.isValid && (y.hour !== 0 || y.minute !== 0 || y.second !== 0);
    }, l = z(() => {
      var h;
      return ((h = s.value) == null ? void 0 : h.id) === "more";
    }), u = z(() => {
      var h;
      return (h = r.value) == null ? void 0 : h.events;
    }), c = z(() => {
      var y;
      const h = (y = r.value) == null ? void 0 : y.day;
      return h ? t(h, f.DATE_FULL) : "";
    }), m = z(() => {
      if (!s.value || !s.value.start_date) return "";
      const h = a(s.value.start_date) ? f.DATETIME_MED : f.DATE_FULL;
      if (s.value.end_date) {
        const y = a(s.value.end_date) ? f.DATETIME_MED : f.DATE_FULL, p = t(s.value.start_date, h), M = t(s.value.end_date, y);
        return `${p} - ${M}`;
      }
      return `${t(s.value.start_date, h)}`;
    }), D = () => {
      o("eventTitleClicked", s.value);
    }, d = () => {
      o("edit", s.value);
    }, w = () => {
      o("delete", s.value);
    }, v = ({ event: h }) => {
      s.value = h, o("eventClicked", h);
    };
    return (h, y) => (k(), B(_a, {
      modelValue: i.value,
      "onUpdate:modelValue": y[0] || (y[0] = (p) => i.value = p)
    }, {
      header: Rt(() => [
        l.value ? (k(), O("div", Ya, [
          T("span", null, [
            T("time", { datetime: c.value }, L(c.value), 9, Ba)
          ])
        ])) : (k(), O("div", Pa, [
          n.canEdit ? (k(), B(Fa, {
            key: 0,
            onClick: d
          })) : U("", !0),
          n.canDelete ? (k(), B(ba, {
            key: 1,
            onClick: w
          })) : U("", !0)
        ]))
      ]),
      default: Rt(() => {
        var p, M, x;
        return [
          l.value ? (k(), O("section", Ka, [
            T("div", Qa, [
              T("ul", null, [
                (k(!0), O(te, null, se(u.value, (C) => (k(), B(bs, {
                  key: C.id,
                  event: C,
                  calendar: F(r),
                  onEventClicked: v
                }, null, 8, ["event", "calendar"]))), 128))
              ])
            ])
          ])) : (k(), O("section", Ga, [
            (p = F(s)) != null && p.title ? (k(), B(qa, {
              key: 0,
              event: F(s),
              onClick: D
            }, null, 8, ["event"])) : U("", !0),
            T("div", Ja, [
              T("time", { datetime: m.value }, L(m.value), 9, ja)
            ]),
            (M = F(s)) != null && M.autor ? (k(), B(Wa, {
              key: 1,
              autor: F(s).autor
            }, null, 8, ["autor"])) : U("", !0),
            (x = F(s)) != null && x.description ? (k(), B(Ha, {
              key: 2,
              content: F(s).description
            }, null, 8, ["content"])) : U("", !0)
          ]))
        ];
      }),
      _: 1
    }, 8, ["modelValue"]));
  }
}), eo = /* @__PURE__ */ W(Xa, [["__scopeId", "data-v-59bb36ea"]]), to = { class: "k-list-calendar-container" }, no = { class: "day-header" }, so = { class: "day-header-full-date" }, ro = { class: "day-header-simple-date" }, io = ["onClick"], ao = { class: "k-list-calendar-event-time" }, oo = { class: "k-list-calendar-event-title" }, lo = { class: "k-list-calendar-event-title-container" }, uo = { class: "k-list-calendar-event-title-text" }, co = { class: "k-list-calendar-event-description" }, fo = {
  key: 0,
  class: "nothing-to-show-message"
}, ho = /* @__PURE__ */ H({
  __name: "KListCalendar",
  props: {
    events: {}
  },
  emits: ["eventClicked"],
  setup(n, { emit: e }) {
    const { lang: t } = we(), s = n, r = z(() => s.events), i = e, o = z(() => r.value.slice().sort((d, w) => new Date(d.start_date).getTime() - new Date(w.start_date).getTime())), a = z(() => o.value.reduce((d, w) => (d[w.start_date] = [...d[w.start_date] || [], w], d), {})), l = (d) => f.fromISO(d).setLocale(t.value).toFormat("EEEE, dd MMMM yyyy"), u = (d) => f.fromISO(d).hour !== 0 || f.fromISO(d).minute !== 0 || f.fromISO(d).second !== 0, c = (d) => {
      var y;
      const w = d.start_date;
      if (!f.fromISO(w).isValid)
        return "-";
      if (!u(w))
        return ((y = Le[t.value]) == null ? void 0 : y.allDay) || "All day";
      if (d.end_date) {
        const p = d.end_date, M = f.fromISO(p).isValid, x = u(p);
        if (M && x)
          return `${f.fromISO(w).toFormat("hh:mm a")} - ${f.fromISO(p).toFormat("hh:mm a")}`;
      }
      return f.fromISO(w).toFormat("hh:mm a");
    }, m = (d) => f.fromISO(d).toFormat("yyyy-MM-dd"), D = (d) => {
      i("eventClicked", d);
    };
    return (d, w) => {
      var v;
      return k(), O("div", to, [
        (k(!0), O(te, null, se(Object.entries(a.value), ([h, y]) => (k(), O("div", { key: h }, [
          T("div", no, [
            T("p", so, L(l(h)), 1),
            T("h3", ro, L(m(h)), 1)
          ]),
          (k(!0), O(te, null, se(y, (p) => (k(), O("div", {
            key: p.id,
            class: "k-list-calendar-event",
            onClick: (M) => D(p)
          }, [
            T("h4", ao, L(c(p)), 1),
            T("div", oo, [
              T("div", lo, [
                p.color ? (k(), O("span", {
                  key: 0,
                  style: ze({ backgroundColor: p.color }),
                  class: "k-list-calendar-event-title-color"
                }, null, 4)) : U("", !0),
                T("h2", uo, L(p.title), 1)
              ]),
              T("p", co, L(p.description), 1)
            ])
          ], 8, io))), 128))
        ]))), 128)),
        r.value.length === 0 ? (k(), O("div", fo, L(((v = F(Le)[F(t)]) == null ? void 0 : v.nothingToShow) || "No events found"), 1)) : U("", !0)
      ]);
    };
  }
}), mo = /* @__PURE__ */ W(ho, [["__scopeId", "data-v-5f926829"]]), yo = { class: "k-alendar-wrapper-container" }, go = /* @__PURE__ */ H({
  __name: "VueKAlendar",
  props: {
    events: {},
    lang: {},
    canEdit: { type: Boolean },
    canDelete: { type: Boolean },
    withDefaultModal: { type: Boolean },
    view: {}
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
    const t = e, s = n, { currentView: r, setCurrentView: i } = Is();
    i(s.view || "calendar");
    const o = z(() => s.events), { setLang: a } = we(), { openEventsDetailDialog: l, dialogPositionToRender: u, closeDialog: c } = Vt(), { eventsToShowInCalendar: m, generateCalendar: D, monthDays: d, currentDate: w } = ve(), v = (V) => {
      t("prevMonth", V);
    }, h = (V) => {
      t("nextMonth", V);
    }, y = (V) => {
      t("toToday", V);
    }, p = () => {
      m.value = s.events, d.value = D(w.value.toFormat("yyyy-MM-dd"));
    };
    gt(
      () => s.lang,
      (V) => {
        V && a(V);
      },
      { immediate: !0 }
    ), gt(
      s,
      ({ events: V }) => {
        V && p();
      },
      { immediate: !0, deep: !0 }
    );
    const M = (V) => {
      t("eventClicked", V);
    }, x = (V) => {
      t("eventTitleClicked", { event: V, closeDialog: c });
    }, C = (V) => {
      t("edit", { event: V, closeDialog: c });
    }, re = (V) => {
      t("delete", { event: V, closeDialog: c });
    }, ie = ({ events: V }) => {
      t("plusEventCountClicked", { events: V, closeDialog: c });
    };
    return (V, P) => (k(), O("section", yo, [
      me(Oa, {
        view: F(r),
        onHandlePrevMonth: v,
        onHandleNextMonth: h,
        onHandleToToday: y
      }, null, 8, ["view"]),
      F(r) === "calendar" ? (k(), B(aa, {
        key: 0,
        onEventClicked: M,
        onPlusEventCountClicked: ie
      })) : F(r) === "list" ? (k(), B(mo, {
        key: 1,
        events: o.value,
        onEventClicked: M
      }, null, 8, ["events"])) : U("", !0),
      F(r) === "day" ? (k(), B(Bi, {
        key: 2,
        events: o.value,
        onEventClicked: M
      }, null, 8, ["events"])) : U("", !0),
      n.withDefaultModal ? (k(), B(eo, {
        key: 3,
        modelValue: F(l),
        "onUpdate:modelValue": P[0] || (P[0] = (K) => Fs(l) ? l.value = K : null),
        canDelete: n.canDelete,
        canEdit: n.canEdit,
        onEventClicked: M,
        onEventTitleClicked: x,
        onEdit: C,
        onDelete: re,
        style: ze({
          top: `${F(u).y}px`,
          left: `${F(u).x}px`
        })
      }, null, 8, ["modelValue", "canDelete", "canEdit", "style"])) : U("", !0)
    ]));
  }
}), vo = /* @__PURE__ */ W(go, [["__scopeId", "data-v-ff04983b"]]);
export {
  vo as KAlendar
};
