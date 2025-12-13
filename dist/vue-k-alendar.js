import { ref as ne, readonly as Vt, computed as C, defineComponent as J, createElementBlock as M, openBlock as O, Fragment as j, renderList as ee, normalizeClass as Et, unref as Y, toDisplayString as W, createVNode as he, createElementVNode as E, normalizeStyle as Nt, createCommentVNode as Te, createBlock as Ge, watch as zt } from "vue";
class me extends Error {
}
class Ds extends me {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class Ms extends me {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Is extends me {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class ke extends me {
}
class Sn extends me {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class x extends me {
}
class re extends me {
  constructor() {
    super("Zone is an abstract class");
  }
}
const m = "numeric", G = "short", A = "long", Ke = {
  year: m,
  month: m,
  day: m
}, Tn = {
  year: m,
  month: G,
  day: m
}, Vs = {
  year: m,
  month: G,
  day: m,
  weekday: G
}, On = {
  year: m,
  month: A,
  day: m
}, Dn = {
  year: m,
  month: A,
  day: m,
  weekday: A
}, Mn = {
  hour: m,
  minute: m
}, In = {
  hour: m,
  minute: m,
  second: m
}, Vn = {
  hour: m,
  minute: m,
  second: m,
  timeZoneName: G
}, En = {
  hour: m,
  minute: m,
  second: m,
  timeZoneName: A
}, Nn = {
  hour: m,
  minute: m,
  hourCycle: "h23"
}, _n = {
  hour: m,
  minute: m,
  second: m,
  hourCycle: "h23"
}, bn = {
  hour: m,
  minute: m,
  second: m,
  hourCycle: "h23",
  timeZoneName: G
}, Cn = {
  hour: m,
  minute: m,
  second: m,
  hourCycle: "h23",
  timeZoneName: A
}, xn = {
  year: m,
  month: m,
  day: m,
  hour: m,
  minute: m
}, Fn = {
  year: m,
  month: m,
  day: m,
  hour: m,
  minute: m,
  second: m
}, $n = {
  year: m,
  month: G,
  day: m,
  hour: m,
  minute: m
}, Wn = {
  year: m,
  month: G,
  day: m,
  hour: m,
  minute: m,
  second: m
}, Es = {
  year: m,
  month: G,
  day: m,
  weekday: G,
  hour: m,
  minute: m
}, Ln = {
  year: m,
  month: A,
  day: m,
  hour: m,
  minute: m,
  timeZoneName: G
}, Zn = {
  year: m,
  month: A,
  day: m,
  hour: m,
  minute: m,
  second: m,
  timeZoneName: G
}, An = {
  year: m,
  month: A,
  day: m,
  weekday: A,
  hour: m,
  minute: m,
  timeZoneName: A
}, zn = {
  year: m,
  month: A,
  day: m,
  weekday: A,
  hour: m,
  minute: m,
  second: m,
  timeZoneName: A
};
class Ze {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new re();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new re();
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
    throw new re();
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
    throw new re();
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
    throw new re();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new re();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new re();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new re();
  }
}
let at = null;
class tt extends Ze {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return at === null && (at = new tt()), at;
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
    return Kn(e, t, s);
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
const gt = /* @__PURE__ */ new Map();
function Ns(n) {
  let e = gt.get(n);
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
  }), gt.set(n, e)), e;
}
const _s = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function bs(n, e) {
  const t = n.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, r, i, a, o, l, u, d] = s;
  return [a, r, i, o, l, u, d];
}
function Cs(n, e) {
  const t = n.formatToParts(e), s = [];
  for (let r = 0; r < t.length; r++) {
    const { type: i, value: a } = t[r], o = _s[i];
    i === "era" ? s[o] = a : p(o) || (s[o] = parseInt(a, 10));
  }
  return s;
}
const ot = /* @__PURE__ */ new Map();
class te extends Ze {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let t = ot.get(e);
    return t === void 0 && ot.set(e, t = new te(e)), t;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ot.clear(), gt.clear();
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
    super(), this.zoneName = e, this.valid = te.isValidZone(e);
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
    return Kn(e, t, s, this.name);
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
    const s = Ns(this.name);
    let [r, i, a, o, l, u, d] = s.formatToParts ? Cs(s, t) : bs(s, t);
    o === "BC" && (r = -Math.abs(r) + 1);
    const g = st({
      year: r,
      month: i,
      day: a,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: d,
      millisecond: 0
    });
    let c = +t;
    const y = c % 1e3;
    return c -= y >= 0 ? y : 1e3 + y, (g - c) / (60 * 1e3);
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
let Ht = {};
function xs(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Ht[t];
  return s || (s = new Intl.ListFormat(n, e), Ht[t] = s), s;
}
const wt = /* @__PURE__ */ new Map();
function vt(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = wt.get(t);
  return s === void 0 && (s = new Intl.DateTimeFormat(n, e), wt.set(t, s)), s;
}
const kt = /* @__PURE__ */ new Map();
function Fs(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = kt.get(t);
  return s === void 0 && (s = new Intl.NumberFormat(n, e), kt.set(t, s)), s;
}
const pt = /* @__PURE__ */ new Map();
function $s(n, e = {}) {
  const { base: t, ...s } = e, r = JSON.stringify([n, s]);
  let i = pt.get(r);
  return i === void 0 && (i = new Intl.RelativeTimeFormat(n, e), pt.set(r, i)), i;
}
let Ce = null;
function Ws() {
  return Ce || (Ce = new Intl.DateTimeFormat().resolvedOptions().locale, Ce);
}
const St = /* @__PURE__ */ new Map();
function Hn(n) {
  let e = St.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat(n).resolvedOptions(), St.set(n, e)), e;
}
const Tt = /* @__PURE__ */ new Map();
function Ls(n) {
  let e = Tt.get(n);
  if (!e) {
    const t = new Intl.Locale(n);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, "minimalDays" in e || (e = { ...Rn, ...e }), Tt.set(n, e);
  }
  return e;
}
function Zs(n) {
  const e = n.indexOf("-x-");
  e !== -1 && (n = n.substring(0, e));
  const t = n.indexOf("-u-");
  if (t === -1)
    return [n];
  {
    let s, r;
    try {
      s = vt(n).resolvedOptions(), r = n;
    } catch {
      const l = n.substring(0, t);
      s = vt(l).resolvedOptions(), r = l;
    }
    const { numberingSystem: i, calendar: a } = s;
    return [r, i, a];
  }
}
function As(n, e, t) {
  return (t || e) && (n.includes("-u-") || (n += "-u"), t && (n += `-ca-${t}`), e && (n += `-nu-${e}`)), n;
}
function zs(n) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const s = h.utc(2009, t, 1);
    e.push(n(s));
  }
  return e;
}
function Hs(n) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const s = h.utc(2016, 11, 13 + t);
    e.push(n(s));
  }
  return e;
}
function Re(n, e, t, s) {
  const r = n.listingMode();
  return r === "error" ? null : r === "en" ? t(e) : s(e);
}
function Rs(n) {
  return n.numberingSystem && n.numberingSystem !== "latn" ? !1 : n.numberingSystem === "latn" || !n.locale || n.locale.startsWith("en") || Hn(n.locale).numberingSystem === "latn";
}
class Us {
  constructor(e, t, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: r, floor: i, ...a } = s;
    if (!t || Object.keys(a).length > 0) {
      const o = { useGrouping: !1, ...s };
      s.padTo > 0 && (o.minimumIntegerDigits = s.padTo), this.inf = Fs(e, o);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : Ft(e, 3);
      return b(t, this.padTo);
    }
  }
}
class qs {
  constructor(e, t, s) {
    this.opts = s, this.originalZone = void 0;
    let r;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const a = -1 * (e.offset / 60), o = a >= 0 ? `Etc/GMT+${a}` : `Etc/GMT${a}`;
      e.offset !== 0 && te.create(o).valid ? (r = o, this.dt = e) : (r = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, r = e.zone.name) : (r = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const i = { ...this.opts };
    i.timeZone = i.timeZone || r, this.dtf = vt(t, i);
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
class Ys {
  constructor(e, t, s) {
    this.opts = { style: "long", ...s }, !t && Bn() && (this.rtf = $s(e, s));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : fr(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const Rn = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class V {
  static fromOpts(e) {
    return V.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, s, r, i = !1) {
    const a = e || _.defaultLocale, o = a || (i ? "en-US" : Ws()), l = t || _.defaultNumberingSystem, u = s || _.defaultOutputCalendar, d = Dt(r) || _.defaultWeekSettings;
    return new V(o, l, u, d, a);
  }
  static resetCache() {
    Ce = null, wt.clear(), kt.clear(), pt.clear(), St.clear(), Tt.clear();
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: s, weekSettings: r } = {}) {
    return V.create(e, t, s, r);
  }
  constructor(e, t, s, r, i) {
    const [a, o, l] = Zs(e);
    this.locale = a, this.numberingSystem = t || o || null, this.outputCalendar = s || l || null, this.weekSettings = r, this.intl = As(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = Rs(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : V.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      Dt(e.weekSettings) || this.weekSettings,
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
    return Re(this, e, es, () => {
      const s = this.intl === "ja" || this.intl.startsWith("ja-");
      t &= !s;
      const r = t ? { month: e, day: "numeric" } : { month: e }, i = t ? "format" : "standalone";
      if (!this.monthsCache[i][e]) {
        const a = s ? (o) => this.dtFormatter(o, r).format() : (o) => this.extract(o, r, "month");
        this.monthsCache[i][e] = zs(a);
      }
      return this.monthsCache[i][e];
    });
  }
  weekdays(e, t = !1) {
    return Re(this, e, ss, () => {
      const s = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, r = t ? "format" : "standalone";
      return this.weekdaysCache[r][e] || (this.weekdaysCache[r][e] = Hs(
        (i) => this.extract(i, s, "weekday")
      )), this.weekdaysCache[r][e];
    });
  }
  meridiems() {
    return Re(
      this,
      void 0,
      () => rs,
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
    return Re(this, e, is, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [h.utc(-40, 1, 1), h.utc(2017, 1, 1)].map(
        (s) => this.extract(s, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, s) {
    const r = this.dtFormatter(e, t), i = r.formatToParts(), a = i.find((o) => o.type.toLowerCase() === s);
    return a ? a.value : null;
  }
  numberFormatter(e = {}) {
    return new Us(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new qs(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new Ys(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return xs(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || Hn(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : jn() ? Ls(this.locale) : Rn;
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
let lt = null;
class L extends Ze {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return lt === null && (lt = new L(0)), lt;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? L.utcInstance : new L(e);
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
        return new L(rt(t[1], t[2]));
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
class Ps extends Ze {
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
function ae(n, e) {
  if (p(n) || n === null)
    return e;
  if (n instanceof Ze)
    return n;
  if (Qs(n)) {
    const t = n.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? tt.instance : t === "utc" || t === "gmt" ? L.utcInstance : L.parseSpecifier(t) || te.create(n);
  } else return oe(n) ? L.instance(n) : typeof n == "object" && "offset" in n && typeof n.offset == "function" ? n : new Ps(n);
}
const _t = {
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
}, Rt = {
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
}, Gs = _t.hanidec.replace(/[\[|\]]/g, "").split("");
function Js(n) {
  let e = parseInt(n, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < n.length; t++) {
      const s = n.charCodeAt(t);
      if (n[t].search(_t.hanidec) !== -1)
        e += Gs.indexOf(n[t]);
      else
        for (const r in Rt) {
          const [i, a] = Rt[r];
          s >= i && s <= a && (e += s - i);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const Ot = /* @__PURE__ */ new Map();
function Bs() {
  Ot.clear();
}
function U({ numberingSystem: n }, e = "") {
  const t = n || "latn";
  let s = Ot.get(t);
  s === void 0 && (s = /* @__PURE__ */ new Map(), Ot.set(t, s));
  let r = s.get(e);
  return r === void 0 && (r = new RegExp(`${_t[t]}${e}`), s.set(e, r)), r;
}
let Ut = () => Date.now(), qt = "system", Yt = null, Pt = null, Gt = null, Jt = 60, Bt, jt = null;
class _ {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Ut;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Ut = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    qt = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return ae(qt, tt.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return Yt;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    Yt = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return Pt;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    Pt = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Gt;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    Gt = e;
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
    return jt;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    jt = Dt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return Jt;
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
    Jt = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Bt;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Bt = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    V.resetCache(), te.resetCache(), h.resetCache(), Bs();
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
const Un = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], qn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function H(n, e) {
  return new P(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${n}, which is invalid`
  );
}
function bt(n, e, t) {
  const s = new Date(Date.UTC(n, e - 1, t));
  n < 100 && n >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const r = s.getUTCDay();
  return r === 0 ? 7 : r;
}
function Yn(n, e, t) {
  return t + (Ae(n) ? qn : Un)[e - 1];
}
function Pn(n, e) {
  const t = Ae(n) ? qn : Un, s = t.findIndex((i) => i < e), r = e - t[s];
  return { month: s + 1, day: r };
}
function Ct(n, e) {
  return (n - e + 7) % 7 + 1;
}
function Qe(n, e = 4, t = 1) {
  const { year: s, month: r, day: i } = n, a = Yn(s, r, i), o = Ct(bt(s, r, i), t);
  let l = Math.floor((a - o + 14 - e) / 7), u;
  return l < 1 ? (u = s - 1, l = We(u, e, t)) : l > We(s, e, t) ? (u = s + 1, l = 1) : u = s, { weekYear: u, weekNumber: l, weekday: o, ...it(n) };
}
function Kt(n, e = 4, t = 1) {
  const { weekYear: s, weekNumber: r, weekday: i } = n, a = Ct(bt(s, 1, e), t), o = pe(s);
  let l = r * 7 + i - a - 7 + e, u;
  l < 1 ? (u = s - 1, l += pe(u)) : l > o ? (u = s + 1, l -= pe(s)) : u = s;
  const { month: d, day: f } = Pn(u, l);
  return { year: u, month: d, day: f, ...it(n) };
}
function ut(n) {
  const { year: e, month: t, day: s } = n, r = Yn(e, t, s);
  return { year: e, ordinal: r, ...it(n) };
}
function Qt(n) {
  const { year: e, ordinal: t } = n, { month: s, day: r } = Pn(e, t);
  return { year: e, month: s, day: r, ...it(n) };
}
function Xt(n, e) {
  if (!p(n.localWeekday) || !p(n.localWeekNumber) || !p(n.localWeekYear)) {
    if (!p(n.weekday) || !p(n.weekNumber) || !p(n.weekYear))
      throw new ke(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return p(n.localWeekday) || (n.weekday = n.localWeekday), p(n.localWeekNumber) || (n.weekNumber = n.localWeekNumber), p(n.localWeekYear) || (n.weekYear = n.localWeekYear), delete n.localWeekday, delete n.localWeekNumber, delete n.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function js(n, e = 4, t = 1) {
  const s = nt(n.weekYear), r = R(
    n.weekNumber,
    1,
    We(n.weekYear, e, t)
  ), i = R(n.weekday, 1, 7);
  return s ? r ? i ? !1 : H("weekday", n.weekday) : H("week", n.weekNumber) : H("weekYear", n.weekYear);
}
function Ks(n) {
  const e = nt(n.year), t = R(n.ordinal, 1, pe(n.year));
  return e ? t ? !1 : H("ordinal", n.ordinal) : H("year", n.year);
}
function Gn(n) {
  const e = nt(n.year), t = R(n.month, 1, 12), s = R(n.day, 1, Xe(n.year, n.month));
  return e ? t ? s ? !1 : H("day", n.day) : H("month", n.month) : H("year", n.year);
}
function Jn(n) {
  const { hour: e, minute: t, second: s, millisecond: r } = n, i = R(e, 0, 23) || e === 24 && t === 0 && s === 0 && r === 0, a = R(t, 0, 59), o = R(s, 0, 59), l = R(r, 0, 999);
  return i ? a ? o ? l ? !1 : H("millisecond", r) : H("second", s) : H("minute", t) : H("hour", e);
}
function p(n) {
  return typeof n > "u";
}
function oe(n) {
  return typeof n == "number";
}
function nt(n) {
  return typeof n == "number" && n % 1 === 0;
}
function Qs(n) {
  return typeof n == "string";
}
function Xs(n) {
  return Object.prototype.toString.call(n) === "[object Date]";
}
function Bn() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function jn() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function er(n) {
  return Array.isArray(n) ? n : [n];
}
function en(n, e, t) {
  if (n.length !== 0)
    return n.reduce((s, r) => {
      const i = [e(r), r];
      return s && t(s[0], i[0]) === s[0] ? s : i;
    }, null)[1];
}
function tr(n, e) {
  return e.reduce((t, s) => (t[s] = n[s], t), {});
}
function Oe(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Dt(n) {
  if (n == null)
    return null;
  if (typeof n != "object")
    throw new x("Week settings must be an object");
  if (!R(n.firstDay, 1, 7) || !R(n.minimalDays, 1, 7) || !Array.isArray(n.weekend) || n.weekend.some((e) => !R(e, 1, 7)))
    throw new x("Invalid week settings");
  return {
    firstDay: n.firstDay,
    minimalDays: n.minimalDays,
    weekend: Array.from(n.weekend)
  };
}
function R(n, e, t) {
  return nt(n) && n >= e && n <= t;
}
function nr(n, e) {
  return n - e * Math.floor(n / e);
}
function b(n, e = 2) {
  const t = n < 0;
  let s;
  return t ? s = "-" + ("" + -n).padStart(e, "0") : s = ("" + n).padStart(e, "0"), s;
}
function ie(n) {
  if (!(p(n) || n === null || n === ""))
    return parseInt(n, 10);
}
function ce(n) {
  if (!(p(n) || n === null || n === ""))
    return parseFloat(n);
}
function xt(n) {
  if (!(p(n) || n === null || n === "")) {
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
function pe(n) {
  return Ae(n) ? 366 : 365;
}
function Xe(n, e) {
  const t = nr(e - 1, 12) + 1, s = n + (e - t) / 12;
  return t === 2 ? Ae(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function st(n) {
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
function tn(n, e, t) {
  return -Ct(bt(n, 1, e), t) + e - 1;
}
function We(n, e = 4, t = 1) {
  const s = tn(n, e, t), r = tn(n + 1, e, t);
  return (pe(n) - s + r) / 7;
}
function Mt(n) {
  return n > 99 ? n : n > _.twoDigitCutoffYear ? 1900 + n : 2e3 + n;
}
function Kn(n, e, t, s = null) {
  const r = new Date(n), i = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (i.timeZone = s);
  const a = { timeZoneName: e, ...i }, o = new Intl.DateTimeFormat(t, a).formatToParts(r).find((l) => l.type.toLowerCase() === "timezonename");
  return o ? o.value : null;
}
function rt(n, e) {
  let t = parseInt(n, 10);
  Number.isNaN(t) && (t = 0);
  const s = parseInt(e, 10) || 0, r = t < 0 || Object.is(t, -0) ? -s : s;
  return t * 60 + r;
}
function Qn(n) {
  const e = Number(n);
  if (typeof n == "boolean" || n === "" || !Number.isFinite(e))
    throw new x(`Invalid unit value ${n}`);
  return e;
}
function et(n, e) {
  const t = {};
  for (const s in n)
    if (Oe(n, s)) {
      const r = n[s];
      if (r == null) continue;
      t[e(s)] = Qn(r);
    }
  return t;
}
function $e(n, e) {
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
function it(n) {
  return tr(n, ["hour", "minute", "second", "millisecond"]);
}
const sr = [
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
], Xn = [
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
], rr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function es(n) {
  switch (n) {
    case "narrow":
      return [...rr];
    case "short":
      return [...Xn];
    case "long":
      return [...sr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const ts = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], ns = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], ir = ["M", "T", "W", "T", "F", "S", "S"];
function ss(n) {
  switch (n) {
    case "narrow":
      return [...ir];
    case "short":
      return [...ns];
    case "long":
      return [...ts];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const rs = ["AM", "PM"], ar = ["Before Christ", "Anno Domini"], or = ["BC", "AD"], lr = ["B", "A"];
function is(n) {
  switch (n) {
    case "narrow":
      return [...lr];
    case "short":
      return [...or];
    case "long":
      return [...ar];
    default:
      return null;
  }
}
function ur(n) {
  return rs[n.hour < 12 ? 0 : 1];
}
function cr(n, e) {
  return ss(e)[n.weekday - 1];
}
function dr(n, e) {
  return es(e)[n.month - 1];
}
function hr(n, e) {
  return is(e)[n.year < 0 ? 0 : 1];
}
function fr(n, e, t = "always", s = !1) {
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
    const f = n === "days";
    switch (e) {
      case 1:
        return f ? "tomorrow" : `next ${r[n][0]}`;
      case -1:
        return f ? "yesterday" : `last ${r[n][0]}`;
      case 0:
        return f ? "today" : `this ${r[n][0]}`;
    }
  }
  const a = Object.is(e, -0) || e < 0, o = Math.abs(e), l = o === 1, u = r[n], d = s ? l ? u[1] : u[2] || u[1] : l ? r[n][0] : n;
  return a ? `${o} ${d} ago` : `in ${o} ${d}`;
}
function nn(n, e) {
  let t = "";
  for (const s of n)
    s.literal ? t += s.val : t += e(s.val);
  return t;
}
const mr = {
  D: Ke,
  DD: Tn,
  DDD: On,
  DDDD: Dn,
  t: Mn,
  tt: In,
  ttt: Vn,
  tttt: En,
  T: Nn,
  TT: _n,
  TTT: bn,
  TTTT: Cn,
  f: xn,
  ff: $n,
  fff: Ln,
  ffff: An,
  F: Fn,
  FF: Wn,
  FFF: Zn,
  FFFF: zn
};
class F {
  static create(e, t = {}) {
    return new F(e, t);
  }
  static parseFormat(e) {
    let t = null, s = "", r = !1;
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const o = e.charAt(a);
      o === "'" ? ((s.length > 0 || r) && i.push({
        literal: r || /^\s+$/.test(s),
        val: s === "" ? "'" : s
      }), t = null, s = "", r = !r) : r || o === t ? s += o : (s.length > 0 && i.push({ literal: /^\s+$/.test(s), val: s }), s = o, t = o);
    }
    return s.length > 0 && i.push({ literal: r || /^\s+$/.test(s), val: s }), i;
  }
  static macroTokenToFormatOpts(e) {
    return mr[e];
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
    const s = this.loc.listingMode() === "en", r = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", i = (c, y) => this.loc.extract(e, c, y), a = (c) => e.isOffsetFixed && e.offset === 0 && c.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, c.format) : "", o = () => s ? ur(e) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (c, y) => s ? dr(e, c) : i(y ? { month: c } : { month: c, day: "numeric" }, "month"), u = (c, y) => s ? cr(e, c) : i(
      y ? { weekday: c } : { weekday: c, month: "long", day: "numeric" },
      "weekday"
    ), d = (c) => {
      const y = F.macroTokenToFormatOpts(c);
      return y ? this.formatWithSystemDefault(e, y) : c;
    }, f = (c) => s ? hr(e, c) : i({ era: c }, "era"), g = (c) => {
      switch (c) {
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
          return a({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return a({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return a({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return e.zone.offsetName(e.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return e.zone.offsetName(e.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return e.zoneName;
        case "a":
          return o();
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
          return f("short");
        case "GG":
          return f("long");
        case "GGGGG":
          return f("narrow");
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
          return d(c);
      }
    };
    return nn(F.parseFormat(t), g);
  }
  formatDurationFromString(e, t) {
    const s = this.opts.signMode === "negativeLargestOnly" ? -1 : 1, r = (d) => {
      switch (d[0]) {
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
    }, i = (d, f) => (g) => {
      const c = r(g);
      if (c) {
        const y = f.isNegativeDuration && c !== f.largestUnit ? s : 1;
        let k;
        return this.opts.signMode === "negativeLargestOnly" && c !== f.largestUnit ? k = "never" : this.opts.signMode === "all" ? k = "always" : k = "auto", this.num(d.get(c) * y, g.length, k);
      } else
        return g;
    }, a = F.parseFormat(t), o = a.reduce(
      (d, { literal: f, val: g }) => f ? d : d.concat(g),
      []
    ), l = e.shiftTo(...o.map(r).filter((d) => d)), u = {
      isNegativeDuration: l < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(l.values)[0]
    };
    return nn(a, i(l, u));
  }
}
const as = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function De(...n) {
  const e = n.reduce((t, s) => t + s.source, "");
  return RegExp(`^${e}$`);
}
function Me(...n) {
  return (e) => n.reduce(
    ([t, s, r], i) => {
      const [a, o, l] = i(e, r);
      return [{ ...t, ...a }, o || s, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function Ie(n, ...e) {
  if (n == null)
    return [null, null];
  for (const [t, s] of e) {
    const r = t.exec(n);
    if (r)
      return s(r);
  }
  return [null, null];
}
function os(...n) {
  return (e, t) => {
    const s = {};
    let r;
    for (r = 0; r < n.length; r++)
      s[n[r]] = ie(e[t + r]);
    return [s, null, t + r];
  };
}
const ls = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, yr = `(?:${ls.source}?(?:\\[(${as.source})\\])?)?`, $t = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, us = RegExp(`${$t.source}${yr}`), Wt = RegExp(`(?:[Tt]${us.source})?`), gr = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, wr = /(\d{4})-?W(\d\d)(?:-?(\d))?/, vr = /(\d{4})-?(\d{3})/, kr = os("weekYear", "weekNumber", "weekDay"), pr = os("year", "ordinal"), Sr = /(\d{4})-(\d\d)-(\d\d)/, cs = RegExp(
  `${$t.source} ?(?:${ls.source}|(${as.source}))?`
), Tr = RegExp(`(?: ${cs.source})?`);
function Se(n, e, t) {
  const s = n[e];
  return p(s) ? t : ie(s);
}
function Or(n, e) {
  return [{
    year: Se(n, e),
    month: Se(n, e + 1, 1),
    day: Se(n, e + 2, 1)
  }, null, e + 3];
}
function Ve(n, e) {
  return [{
    hours: Se(n, e, 0),
    minutes: Se(n, e + 1, 0),
    seconds: Se(n, e + 2, 0),
    milliseconds: xt(n[e + 3])
  }, null, e + 4];
}
function ze(n, e) {
  const t = !n[e] && !n[e + 1], s = rt(n[e + 1], n[e + 2]), r = t ? null : L.instance(s);
  return [{}, r, e + 3];
}
function He(n, e) {
  const t = n[e] ? te.create(n[e]) : null;
  return [{}, t, e + 1];
}
const Dr = RegExp(`^T?${$t.source}$`), Mr = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Ir(n) {
  const [e, t, s, r, i, a, o, l, u] = n, d = e[0] === "-", f = l && l[0] === "-", g = (c, y = !1) => c !== void 0 && (y || c && d) ? -c : c;
  return [
    {
      years: g(ce(t)),
      months: g(ce(s)),
      weeks: g(ce(r)),
      days: g(ce(i)),
      hours: g(ce(a)),
      minutes: g(ce(o)),
      seconds: g(ce(l), l === "-0"),
      milliseconds: g(xt(u), f)
    }
  ];
}
const Vr = {
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
function Lt(n, e, t, s, r, i, a) {
  const o = {
    year: e.length === 2 ? Mt(ie(e)) : ie(e),
    month: Xn.indexOf(t) + 1,
    day: ie(s),
    hour: ie(r),
    minute: ie(i)
  };
  return a && (o.second = ie(a)), n && (o.weekday = n.length > 3 ? ts.indexOf(n) + 1 : ns.indexOf(n) + 1), o;
}
const Er = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Nr(n) {
  const [
    ,
    e,
    t,
    s,
    r,
    i,
    a,
    o,
    l,
    u,
    d,
    f
  ] = n, g = Lt(e, r, s, t, i, a, o);
  let c;
  return l ? c = Vr[l] : u ? c = 0 : c = rt(d, f), [g, new L(c)];
}
function _r(n) {
  return n.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const br = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, Cr = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, xr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function sn(n) {
  const [, e, t, s, r, i, a, o] = n;
  return [Lt(e, r, s, t, i, a, o), L.utcInstance];
}
function Fr(n) {
  const [, e, t, s, r, i, a, o] = n;
  return [Lt(e, o, t, s, r, i, a), L.utcInstance];
}
const $r = De(gr, Wt), Wr = De(wr, Wt), Lr = De(vr, Wt), Zr = De(us), ds = Me(
  Or,
  Ve,
  ze,
  He
), Ar = Me(
  kr,
  Ve,
  ze,
  He
), zr = Me(
  pr,
  Ve,
  ze,
  He
), Hr = Me(
  Ve,
  ze,
  He
);
function Rr(n) {
  return Ie(
    n,
    [$r, ds],
    [Wr, Ar],
    [Lr, zr],
    [Zr, Hr]
  );
}
function Ur(n) {
  return Ie(_r(n), [Er, Nr]);
}
function qr(n) {
  return Ie(
    n,
    [br, sn],
    [Cr, sn],
    [xr, Fr]
  );
}
function Yr(n) {
  return Ie(n, [Mr, Ir]);
}
const Pr = Me(Ve);
function Gr(n) {
  return Ie(n, [Dr, Pr]);
}
const Jr = De(Sr, Tr), Br = De(cs), jr = Me(
  Ve,
  ze,
  He
);
function Kr(n) {
  return Ie(
    n,
    [Jr, ds],
    [Br, jr]
  );
}
const rn = "Invalid Duration", hs = {
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
}, Qr = {
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
  ...hs
}, z = 146097 / 400, ge = 146097 / 4800, Xr = {
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
    weeks: ge / 7,
    days: ge,
    hours: ge * 24,
    minutes: ge * 24 * 60,
    seconds: ge * 24 * 60 * 60,
    milliseconds: ge * 24 * 60 * 60 * 1e3
  },
  ...hs
}, fe = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], ei = fe.slice(0).reverse();
function X(n, e, t = !1) {
  const s = {
    values: t ? e.values : { ...n.values, ...e.values || {} },
    loc: n.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || n.conversionAccuracy,
    matrix: e.matrix || n.matrix
  };
  return new D(s);
}
function fs(n, e) {
  let t = e.milliseconds ?? 0;
  for (const s of ei.slice(1))
    e[s] && (t += e[s] * n[s].milliseconds);
  return t;
}
function an(n, e) {
  const t = fs(n, e) < 0 ? -1 : 1;
  fe.reduceRight((s, r) => {
    if (p(e[r]))
      return s;
    if (s) {
      const i = e[s] * t, a = n[r][s], o = Math.floor(i / a);
      e[r] += o * t, e[s] -= o * a * t;
    }
    return r;
  }, null), fe.reduce((s, r) => {
    if (p(e[r]))
      return s;
    if (s) {
      const i = e[s] % 1;
      e[s] -= i, e[r] += i * n[s][r];
    }
    return r;
  }, null);
}
function on(n) {
  const e = {};
  for (const [t, s] of Object.entries(n))
    s !== 0 && (e[t] = s);
  return e;
}
class D {
  /**
   * @private
   */
  constructor(e) {
    const t = e.conversionAccuracy === "longterm" || !1;
    let s = t ? Xr : Qr;
    e.matrix && (s = e.matrix), this.values = e.values, this.loc = e.loc || V.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = s, this.isLuxonDuration = !0;
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
    return D.fromObject({ milliseconds: e }, t);
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
      throw new x(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new D({
      values: et(e, D.normalizeUnit),
      loc: V.fromObject(t),
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
    if (oe(e))
      return D.fromMillis(e);
    if (D.isDuration(e))
      return e;
    if (typeof e == "object")
      return D.fromObject(e);
    throw new x(
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
    const [s] = Yr(e);
    return s ? D.fromObject(s, t) : D.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
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
    const [s] = Gr(e);
    return s ? D.fromObject(s, t) : D.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new x("need to specify a reason the Duration is invalid");
    const s = e instanceof P ? e : new P(e, t);
    if (_.throwOnInvalid)
      throw new Is(s);
    return new D({ invalid: s });
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
    if (!t) throw new Sn(e);
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
    return this.isValid ? F.create(this.loc, s).formatDurationFromString(this, e) : rn;
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
    if (!this.isValid) return rn;
    const t = e.showZeros !== !1, s = fe.map((r) => {
      const i = this.values[r];
      return p(i) || i === 0 && !t ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: r.slice(0, -1) }).format(i);
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
    return this.isValid ? fs(this.matrix, this.values) : NaN;
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
    const t = D.fromDurationLike(e), s = {};
    for (const r of fe)
      (Oe(t.values, r) || Oe(this.values, r)) && (s[r] = t.get(r) + this.get(r));
    return X(this, { values: s }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = D.fromDurationLike(e);
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
      t[s] = Qn(e(this.values[s], s));
    return X(this, { values: t }, !0);
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
    return this[D.normalizeUnit(e)];
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
    const t = { ...this.values, ...et(e, D.normalizeUnit) };
    return X(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: s, matrix: r } = {}) {
    const a = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: r, conversionAccuracy: s };
    return X(this, a);
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
    return an(this.matrix, e), X(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = on(this.normalize().shiftToAll().toObject());
    return X(this, { values: e }, !0);
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
    e = e.map((a) => D.normalizeUnit(a));
    const t = {}, s = {}, r = this.toObject();
    let i;
    for (const a of fe)
      if (e.indexOf(a) >= 0) {
        i = a;
        let o = 0;
        for (const u in s)
          o += this.matrix[u][a] * s[u], s[u] = 0;
        oe(r[a]) && (o += r[a]);
        const l = Math.trunc(o);
        t[a] = l, s[a] = (o * 1e3 - l * 1e3) / 1e3;
      } else oe(r[a]) && (s[a] = r[a]);
    for (const a in s)
      s[a] !== 0 && (t[i] += a === i ? s[a] : s[a] / this.matrix[i][a]);
    return an(this.matrix, t), X(this, { values: t }, !0);
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
    return X(this, { values: e }, !0);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const e = on(this.values);
    return X(this, { values: e }, !0);
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
    for (const s of fe)
      if (!t(this.values[s], e.values[s]))
        return !1;
    return !0;
  }
}
const we = "Invalid Interval";
function ti(n, e) {
  return !n || !n.isValid ? N.invalid("missing or invalid start") : !e || !e.isValid ? N.invalid("missing or invalid end") : e < n ? N.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${n.toISO()} and end=${e.toISO()}`
  ) : null;
}
class N {
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
      throw new x("need to specify a reason the Interval is invalid");
    const s = e instanceof P ? e : new P(e, t);
    if (_.throwOnInvalid)
      throw new Ms(s);
    return new N({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const s = be(e), r = be(t), i = ti(s, r);
    return i ?? new N({
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
    const s = D.fromDurationLike(t), r = be(e);
    return N.fromDateTimes(r, r.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const s = D.fromDurationLike(t), r = be(e);
    return N.fromDateTimes(r.minus(s), r);
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
      let i, a;
      try {
        i = h.fromISO(s, t), a = i.isValid;
      } catch {
        a = !1;
      }
      let o, l;
      try {
        o = h.fromISO(r, t), l = o.isValid;
      } catch {
        l = !1;
      }
      if (a && l)
        return N.fromDateTimes(i, o);
      if (a) {
        const u = D.fromISO(r, t);
        if (u.isValid)
          return N.after(i, u);
      } else if (l) {
        const u = D.fromISO(s, t);
        if (u.isValid)
          return N.before(o, u);
      }
    }
    return N.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
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
    return this.isValid ? N.fromDateTimes(e || this.s, t || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const t = e.map(be).filter((a) => this.contains(a)).sort((a, o) => a.toMillis() - o.toMillis()), s = [];
    let { s: r } = this, i = 0;
    for (; r < this.e; ) {
      const a = t[i] || this.e, o = +a > +this.e ? this.e : a;
      s.push(N.fromDateTimes(r, o)), r = o, i += 1;
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
    const t = D.fromDurationLike(e);
    if (!this.isValid || !t.isValid || t.as("milliseconds") === 0)
      return [];
    let { s } = this, r = 1, i;
    const a = [];
    for (; s < this.e; ) {
      const o = this.start.plus(t.mapUnits((l) => l * r));
      i = +o > +this.e ? this.e : o, a.push(N.fromDateTimes(s, i)), s = i, r += 1;
    }
    return a;
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
    return t >= s ? null : N.fromDateTimes(t, s);
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
    return N.fromDateTimes(t, s);
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
      ([r, i], a) => i ? i.overlaps(a) || i.abutsStart(a) ? [r, i.union(a)] : [r.concat([i]), a] : [r, a],
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
    ]), a = Array.prototype.concat(...i), o = a.sort((l, u) => l.time - u.time);
    for (const l of o)
      s += l.type === "s" ? 1 : -1, s === 1 ? t = l.time : (t && +t != +l.time && r.push(N.fromDateTimes(t, l.time)), t = null);
    return N.merge(r);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return N.xor([this].concat(e)).map((t) => this.intersection(t)).filter((t) => t && !t.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : we;
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
  toLocaleString(e = Ke, t = {}) {
    return this.isValid ? F.create(this.s.loc.clone(t), e).formatInterval(this) : we;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : we;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : we;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : we;
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
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : we;
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
    return this.isValid ? this.e.diff(this.s, e, t) : D.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return N.fromDateTimes(e(this.s), e(this.e));
  }
}
class Ue {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = _.defaultZone) {
    const t = h.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return te.isValidZone(e);
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
    return ae(e, _.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || V.create(e)).getStartOfWeek();
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
    return (t || V.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || V.create(e)).getWeekendDays().slice();
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
    return (r || V.create(t, s, i)).months(e);
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
    return (r || V.create(t, s, i)).months(e, !0);
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
    return (r || V.create(t, s, null)).weekdays(e);
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
    return (r || V.create(t, s, null)).weekdays(e, !0);
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
    return V.create(e).meridiems();
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
    return V.create(t, null, "gregory").eras(e);
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
    return { relative: Bn(), localeWeek: jn() };
  }
}
function ln(n, e) {
  const t = (r) => r.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = t(e) - t(n);
  return Math.floor(D.fromMillis(s).as("days"));
}
function ni(n, e, t) {
  const s = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const d = ln(l, u);
        return (d - d % 7) / 7;
      }
    ],
    ["days", ln]
  ], r = {}, i = n;
  let a, o;
  for (const [l, u] of s)
    t.indexOf(l) >= 0 && (a = l, r[l] = u(n, e), o = i.plus(r), o > e ? (r[l]--, n = i.plus(r), n > e && (o = n, r[l]--, n = i.plus(r))) : n = o);
  return [n, r, o, a];
}
function si(n, e, t, s) {
  let [r, i, a, o] = ni(n, e, t);
  const l = e - r, u = t.filter(
    (f) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(f) >= 0
  );
  u.length === 0 && (a < e && (a = r.plus({ [o]: 1 })), a !== r && (i[o] = (i[o] || 0) + l / (a - r)));
  const d = D.fromObject(i, s);
  return u.length > 0 ? D.fromMillis(l, s).shiftTo(...u).plus(d) : d;
}
const ri = "missing Intl.DateTimeFormat.formatToParts support";
function I(n, e = (t) => t) {
  return { regex: n, deser: ([t]) => e(Js(t)) };
}
const ii = " ", ms = `[ ${ii}]`, ys = new RegExp(ms, "g");
function ai(n) {
  return n.replace(/\./g, "\\.?").replace(ys, ms);
}
function un(n) {
  return n.replace(/\./g, "").replace(ys, " ").toLowerCase();
}
function q(n, e) {
  return n === null ? null : {
    regex: RegExp(n.map(ai).join("|")),
    deser: ([t]) => n.findIndex((s) => un(t) === un(s)) + e
  };
}
function cn(n, e) {
  return { regex: n, deser: ([, t, s]) => rt(t, s), groups: e };
}
function qe(n) {
  return { regex: n, deser: ([e]) => e };
}
function oi(n) {
  return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function li(n, e) {
  const t = U(e), s = U(e, "{2}"), r = U(e, "{3}"), i = U(e, "{4}"), a = U(e, "{6}"), o = U(e, "{1,2}"), l = U(e, "{1,3}"), u = U(e, "{1,6}"), d = U(e, "{1,9}"), f = U(e, "{2,4}"), g = U(e, "{4,6}"), c = (w) => ({ regex: RegExp(oi(w.val)), deser: ([v]) => v, literal: !0 }), k = ((w) => {
    if (n.literal)
      return c(w);
    switch (w.val) {
      case "G":
        return q(e.eras("short"), 0);
      case "GG":
        return q(e.eras("long"), 0);
      case "y":
        return I(u);
      case "yy":
        return I(f, Mt);
      case "yyyy":
        return I(i);
      case "yyyyy":
        return I(g);
      case "yyyyyy":
        return I(a);
      case "M":
        return I(o);
      case "MM":
        return I(s);
      case "MMM":
        return q(e.months("short", !0), 1);
      case "MMMM":
        return q(e.months("long", !0), 1);
      case "L":
        return I(o);
      case "LL":
        return I(s);
      case "LLL":
        return q(e.months("short", !1), 1);
      case "LLLL":
        return q(e.months("long", !1), 1);
      case "d":
        return I(o);
      case "dd":
        return I(s);
      case "o":
        return I(l);
      case "ooo":
        return I(r);
      case "HH":
        return I(s);
      case "H":
        return I(o);
      case "hh":
        return I(s);
      case "h":
        return I(o);
      case "mm":
        return I(s);
      case "m":
        return I(o);
      case "q":
        return I(o);
      case "qq":
        return I(s);
      case "s":
        return I(o);
      case "ss":
        return I(s);
      case "S":
        return I(l);
      case "SSS":
        return I(r);
      case "u":
        return qe(d);
      case "uu":
        return qe(o);
      case "uuu":
        return I(t);
      case "a":
        return q(e.meridiems(), 0);
      case "kkkk":
        return I(i);
      case "kk":
        return I(f, Mt);
      case "W":
        return I(o);
      case "WW":
        return I(s);
      case "E":
      case "c":
        return I(t);
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
        return cn(new RegExp(`([+-]${o.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return cn(new RegExp(`([+-]${o.source})(${s.source})?`), 2);
      case "z":
        return qe(/[a-z_+-/]{1,256}?/i);
      case " ":
        return qe(/[^\S\n\r]/);
      default:
        return c(w);
    }
  })(n) || {
    invalidReason: ri
  };
  return k.token = n, k;
}
const ui = {
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
function ci(n, e, t) {
  const { type: s, value: r } = n;
  if (s === "literal") {
    const l = /^\s+$/.test(r);
    return {
      literal: !l,
      val: l ? " " : r
    };
  }
  const i = e[s];
  let a = s;
  s === "hour" && (e.hour12 != null ? a = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? a = "hour12" : a = "hour24" : a = t.hour12 ? "hour12" : "hour24");
  let o = ui[a];
  if (typeof o == "object" && (o = o[i]), o)
    return {
      literal: !1,
      val: o
    };
}
function di(n) {
  return [`^${n.map((t) => t.regex).reduce((t, s) => `${t}(${s.source})`, "")}$`, n];
}
function hi(n, e, t) {
  const s = n.match(e);
  if (s) {
    const r = {};
    let i = 1;
    for (const a in t)
      if (Oe(t, a)) {
        const o = t[a], l = o.groups ? o.groups + 1 : 1;
        !o.literal && o.token && (r[o.token.val[0]] = o.deser(s.slice(i, i + l))), i += l;
      }
    return [s, r];
  } else
    return [s, {}];
}
function fi(n) {
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
  return p(n.z) || (t = te.create(n.z)), p(n.Z) || (t || (t = new L(n.Z)), s = n.Z), p(n.q) || (n.M = (n.q - 1) * 3 + 1), p(n.h) || (n.h < 12 && n.a === 1 ? n.h += 12 : n.h === 12 && n.a === 0 && (n.h = 0)), n.G === 0 && n.y && (n.y = -n.y), p(n.u) || (n.S = xt(n.u)), [Object.keys(n).reduce((i, a) => {
    const o = e(a);
    return o && (i[o] = n[a]), i;
  }, {}), t, s];
}
let ct = null;
function mi() {
  return ct || (ct = h.fromMillis(1555555555555)), ct;
}
function yi(n, e) {
  if (n.literal)
    return n;
  const t = F.macroTokenToFormatOpts(n.val), s = ks(t, e);
  return s == null || s.includes(void 0) ? n : s;
}
function gs(n, e) {
  return Array.prototype.concat(...n.map((t) => yi(t, e)));
}
class ws {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = gs(F.parseFormat(t), e), this.units = this.tokens.map((s) => li(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, r] = di(this.units);
      this.regex = RegExp(s, "i"), this.handlers = r;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, s] = hi(e, this.regex, this.handlers), [r, i, a] = s ? fi(s) : [null, null, void 0];
      if (Oe(s, "a") && Oe(s, "H"))
        throw new ke(
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
        specificOffset: a
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
function vs(n, e, t) {
  return new ws(n, t).explainFromTokens(e);
}
function gi(n, e, t) {
  const { result: s, zone: r, specificOffset: i, invalidReason: a } = vs(n, e, t);
  return [s, r, i, a];
}
function ks(n, e) {
  if (!n)
    return null;
  const s = F.create(e, n).dtFormatter(mi()), r = s.formatToParts(), i = s.resolvedOptions();
  return r.map((a) => ci(a, n, i));
}
const dt = "Invalid DateTime", dn = 864e13;
function xe(n) {
  return new P("unsupported zone", `the zone "${n.name}" is not supported`);
}
function ht(n) {
  return n.weekData === null && (n.weekData = Qe(n.c)), n.weekData;
}
function ft(n) {
  return n.localWeekData === null && (n.localWeekData = Qe(
    n.c,
    n.loc.getMinDaysInFirstWeek(),
    n.loc.getStartOfWeek()
  )), n.localWeekData;
}
function de(n, e) {
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
function ps(n, e, t) {
  let s = n - e * 60 * 1e3;
  const r = t.offset(s);
  if (e === r)
    return [s, e];
  s -= (r - e) * 60 * 1e3;
  const i = t.offset(s);
  return r === i ? [s, r] : [n - Math.min(r, i) * 60 * 1e3, Math.max(r, i)];
}
function Ye(n, e) {
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
function Je(n, e, t) {
  return ps(st(n), e, t);
}
function hn(n, e) {
  const t = n.o, s = n.c.year + Math.trunc(e.years), r = n.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, i = {
    ...n.c,
    year: s,
    month: r,
    day: Math.min(n.c.day, Xe(s, r)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, a = D.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), o = st(i);
  let [l, u] = ps(o, t, n.zone);
  return a !== 0 && (l += a, u = n.zone.offset(l)), { ts: l, o: u };
}
function ve(n, e, t, s, r, i) {
  const { setZone: a, zone: o } = t;
  if (n && Object.keys(n).length !== 0 || e) {
    const l = e || o, u = h.fromObject(n, {
      ...t,
      zone: l,
      specificOffset: i
    });
    return a ? u : u.setZone(o);
  } else
    return h.invalid(
      new P("unparsable", `the input "${r}" can't be parsed as ${s}`)
    );
}
function Pe(n, e, t = !0) {
  return n.isValid ? F.create(V.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(n, e) : null;
}
function mt(n, e, t) {
  const s = n.c.year > 9999 || n.c.year < 0;
  let r = "";
  if (s && n.c.year >= 0 && (r += "+"), r += b(n.c.year, s ? 6 : 4), t === "year") return r;
  if (e) {
    if (r += "-", r += b(n.c.month), t === "month") return r;
    r += "-";
  } else if (r += b(n.c.month), t === "month") return r;
  return r += b(n.c.day), r;
}
function fn(n, e, t, s, r, i, a) {
  let o = !t || n.c.millisecond !== 0 || n.c.second !== 0, l = "";
  switch (a) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (l += b(n.c.hour), a === "hour") break;
      if (e) {
        if (l += ":", l += b(n.c.minute), a === "minute") break;
        o && (l += ":", l += b(n.c.second));
      } else {
        if (l += b(n.c.minute), a === "minute") break;
        o && (l += b(n.c.second));
      }
      if (a === "second") break;
      o && (!s || n.c.millisecond !== 0) && (l += ".", l += b(n.c.millisecond, 3));
  }
  return r && (n.isOffsetFixed && n.offset === 0 && !i ? l += "Z" : n.o < 0 ? (l += "-", l += b(Math.trunc(-n.o / 60)), l += ":", l += b(Math.trunc(-n.o % 60))) : (l += "+", l += b(Math.trunc(n.o / 60)), l += ":", l += b(Math.trunc(n.o % 60)))), i && (l += "[" + n.zone.ianaName + "]"), l;
}
const Ss = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, wi = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, vi = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Be = ["year", "month", "day", "hour", "minute", "second", "millisecond"], ki = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], pi = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function je(n) {
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
  if (!e) throw new Sn(n);
  return e;
}
function mn(n) {
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
      return je(n);
  }
}
function Si(n) {
  if (Fe === void 0 && (Fe = _.now()), n.type !== "iana")
    return n.offset(Fe);
  const e = n.name;
  let t = It.get(e);
  return t === void 0 && (t = n.offset(Fe), It.set(e, t)), t;
}
function yn(n, e) {
  const t = ae(e.zone, _.defaultZone);
  if (!t.isValid)
    return h.invalid(xe(t));
  const s = V.fromObject(e);
  let r, i;
  if (p(n.year))
    r = _.now();
  else {
    for (const l of Be)
      p(n[l]) && (n[l] = Ss[l]);
    const a = Gn(n) || Jn(n);
    if (a)
      return h.invalid(a);
    const o = Si(t);
    [r, i] = Je(n, o, t);
  }
  return new h({ ts: r, zone: t, loc: s, o: i });
}
function gn(n, e, t) {
  const s = p(t.round) ? !0 : t.round, r = p(t.rounding) ? "trunc" : t.rounding, i = (o, l) => (o = Ft(o, s || t.calendary ? 0 : 2, t.calendary ? "round" : r), e.loc.clone(t).relFormatter(t).format(o, l)), a = (o) => t.calendary ? e.hasSame(n, o) ? 0 : e.startOf(o).diff(n.startOf(o), o).get(o) : e.diff(n, o).get(o);
  if (t.unit)
    return i(a(t.unit), t.unit);
  for (const o of t.units) {
    const l = a(o);
    if (Math.abs(l) >= 1)
      return i(l, o);
  }
  return i(n > e ? -0 : 0, t.units[t.units.length - 1]);
}
function wn(n) {
  let e = {}, t;
  return n.length > 0 && typeof n[n.length - 1] == "object" ? (e = n[n.length - 1], t = Array.from(n).slice(0, n.length - 1)) : t = Array.from(n), [e, t];
}
let Fe;
const It = /* @__PURE__ */ new Map();
class h {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || _.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new P("invalid input") : null) || (t.isValid ? null : xe(t));
    this.ts = p(e.ts) ? _.now() : e.ts;
    let r = null, i = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [r, i] = [e.old.c, e.old.o];
      else {
        const o = oe(e.o) && !e.old ? e.o : t.offset(this.ts);
        r = Ye(this.ts, o), s = Number.isNaN(r.year) ? new P("invalid input") : null, r = s ? null : r, i = s ? null : o;
      }
    this._zone = t, this.loc = e.loc || V.create(), this.invalid = s, this.weekData = null, this.localWeekData = null, this.c = r, this.o = i, this.isLuxonDateTime = !0;
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
    const [e, t] = wn(arguments), [s, r, i, a, o, l, u] = t;
    return yn({ year: s, month: r, day: i, hour: a, minute: o, second: l, millisecond: u }, e);
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
    const [e, t] = wn(arguments), [s, r, i, a, o, l, u] = t;
    return e.zone = L.utcInstance, yn({ year: s, month: r, day: i, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const s = Xs(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return h.invalid("invalid input");
    const r = ae(t.zone, _.defaultZone);
    return r.isValid ? new h({
      ts: s,
      zone: r,
      loc: V.fromObject(t)
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
    if (oe(e))
      return e < -dn || e > dn ? h.invalid("Timestamp out of range") : new h({
        ts: e,
        zone: ae(t.zone, _.defaultZone),
        loc: V.fromObject(t)
      });
    throw new x(
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
    if (oe(e))
      return new h({
        ts: e * 1e3,
        zone: ae(t.zone, _.defaultZone),
        loc: V.fromObject(t)
      });
    throw new x("fromSeconds requires a numerical input");
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
    const s = ae(t.zone, _.defaultZone);
    if (!s.isValid)
      return h.invalid(xe(s));
    const r = V.fromObject(t), i = et(e, mn), { minDaysInFirstWeek: a, startOfWeek: o } = Xt(i, r), l = _.now(), u = p(t.specificOffset) ? s.offset(l) : t.specificOffset, d = !p(i.ordinal), f = !p(i.year), g = !p(i.month) || !p(i.day), c = f || g, y = i.weekYear || i.weekNumber;
    if ((c || d) && y)
      throw new ke(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (g && d)
      throw new ke("Can't mix ordinal dates with month/day");
    const k = y || i.weekday && !c;
    let w, v, S = Ye(l, u);
    k ? (w = ki, v = wi, S = Qe(S, a, o)) : d ? (w = pi, v = vi, S = ut(S)) : (w = Be, v = Ss);
    let T = !1;
    for (const Q of w) {
      const At = i[Q];
      p(At) ? T ? i[Q] = v[Q] : i[Q] = S[Q] : T = !0;
    }
    const Z = k ? js(i, a, o) : d ? Ks(i) : Gn(i), $ = Z || Jn(i);
    if ($)
      return h.invalid($);
    const _e = k ? Kt(i, a, o) : d ? Qt(i) : i, [ue, se] = Je(_e, u, s), K = new h({
      ts: ue,
      zone: s,
      o: se,
      loc: r
    });
    return i.weekday && c && e.weekday !== K.weekday ? h.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${i.weekday} and a date of ${K.toISO()}`
    ) : K.isValid ? K : h.invalid(K.invalid);
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
    const [s, r] = Rr(e);
    return ve(s, r, t, "ISO 8601", e);
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
    const [s, r] = Ur(e);
    return ve(s, r, t, "RFC 2822", e);
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
    const [s, r] = qr(e);
    return ve(s, r, t, "HTTP", t);
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
    if (p(e) || p(t))
      throw new x("fromFormat requires an input string and a format");
    const { locale: r = null, numberingSystem: i = null } = s, a = V.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    }), [o, l, u, d] = gi(a, e, t);
    return d ? h.invalid(d) : ve(o, l, s, `format ${t}`, e, u);
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
    const [s, r] = Kr(e);
    return ve(s, r, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new x("need to specify a reason the DateTime is invalid");
    const s = e instanceof P ? e : new P(e, t);
    if (_.throwOnInvalid)
      throw new Ds(s);
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
    const s = ks(e, V.fromObject(t));
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
    return gs(F.parseFormat(e), V.fromObject(t)).map((r) => r.val).join("");
  }
  static resetCache() {
    Fe = void 0, It.clear();
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
    return this.isValid ? ft(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? ft(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? ft(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? ut(this.c).ordinal : NaN;
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
    const e = 864e5, t = 6e4, s = st(this.c), r = this.zone.offset(s - e), i = this.zone.offset(s + e), a = this.zone.offset(s - r * t), o = this.zone.offset(s - i * t);
    if (a === o)
      return [this];
    const l = s - a * t, u = s - o * t, d = Ye(l, a), f = Ye(u, o);
    return d.hour === f.hour && d.minute === f.minute && d.second === f.second && d.millisecond === f.millisecond ? [de(this, { ts: l }), de(this, { ts: u })] : [this];
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
    return Xe(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? pe(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? We(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? We(
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
    const { locale: t, numberingSystem: s, calendar: r } = F.create(
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
    return this.setZone(L.instance(e), t);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(_.defaultZone);
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
    if (e = ae(e, _.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let r = this.ts;
      if (t || s) {
        const i = e.offset(this.ts), a = this.toObject();
        [r] = Je(a, i, e);
      }
      return de(this, { ts: r, zone: e });
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
    return de(this, { loc: r });
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
    const t = et(e, mn), { minDaysInFirstWeek: s, startOfWeek: r } = Xt(t, this.loc), i = !p(t.weekYear) || !p(t.weekNumber) || !p(t.weekday), a = !p(t.ordinal), o = !p(t.year), l = !p(t.month) || !p(t.day), u = o || l, d = t.weekYear || t.weekNumber;
    if ((u || a) && d)
      throw new ke(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && a)
      throw new ke("Can't mix ordinal dates with month/day");
    let f;
    i ? f = Kt(
      { ...Qe(this.c, s, r), ...t },
      s,
      r
    ) : p(t.ordinal) ? (f = { ...this.toObject(), ...t }, p(t.day) && (f.day = Math.min(Xe(f.year, f.month), f.day))) : f = Qt({ ...ut(this.c), ...t });
    const [g, c] = Je(f, this.o, this.zone);
    return de(this, { ts: g, o: c });
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
    const t = D.fromDurationLike(e);
    return de(this, hn(this, t));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = D.fromDurationLike(e).negate();
    return de(this, hn(this, t));
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
    const s = {}, r = D.normalizeUnit(e);
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
        const i = this.loc.getStartOfWeek(), { weekday: a } = this;
        a < i && (s.weekNumber = this.weekNumber - 1), s.weekday = i;
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
    return this.isValid ? F.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : dt;
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
  toLocaleString(e = Ke, t = {}) {
    return this.isValid ? F.create(this.loc.clone(t), e).formatDateTime(this) : dt;
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
    return this.isValid ? F.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
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
    precision: a = "milliseconds"
  } = {}) {
    if (!this.isValid)
      return null;
    a = je(a);
    const o = e === "extended";
    let l = mt(this, o, a);
    return Be.indexOf(a) >= 3 && (l += "T"), l += fn(
      this,
      o,
      t,
      s,
      r,
      i,
      a
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
    return this.isValid ? mt(this, e === "extended", je(t)) : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Pe(this, "kkkk-'W'WW-c");
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
    format: a = "extended",
    precision: o = "milliseconds"
  } = {}) {
    return this.isValid ? (o = je(o), (r && Be.indexOf(o) >= 3 ? "T" : "") + fn(
      this,
      a === "extended",
      t,
      e,
      s,
      i,
      o
    )) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Pe(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
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
    return Pe(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? mt(this, !0) : null;
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
    return (t || e) && (s && (r += " "), t ? r += "z" : e && (r += "ZZ")), Pe(this, r, !0);
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
    return this.isValid ? this.toISO() : dt;
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
      return D.invalid("created by diffing an invalid DateTime");
    const r = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, i = er(t).map(D.normalizeUnit), a = e.valueOf() > this.valueOf(), o = a ? this : e, l = a ? e : this, u = si(o, l, i, r);
    return a ? u.negate() : u;
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
    return this.isValid ? N.fromDateTimes(this, e) : this;
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
    return Array.isArray(e.unit) && (r = e.unit, i = void 0), gn(t, this.plus(s), {
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
    return this.isValid ? gn(e.base || h.fromObject({}, { zone: this.zone }), this, {
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
      throw new x("min requires all arguments be DateTimes");
    return en(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(h.isDateTime))
      throw new x("max requires all arguments be DateTimes");
    return en(e, (t) => t.valueOf(), Math.max);
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
    const { locale: r = null, numberingSystem: i = null } = s, a = V.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    return vs(a, e, t);
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
    const { locale: s = null, numberingSystem: r = null } = t, i = V.fromOpts({
      locale: s,
      numberingSystem: r,
      defaultToEN: !0
    });
    return new ws(i, e);
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
    if (p(e) || p(t))
      throw new x(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: r = null, numberingSystem: i = null } = s, a = V.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    if (!a.equals(t.locale))
      throw new x(
        `fromFormatParser called with a locale of ${a}, but the format parser was created for ${t.locale}`
      );
    const { result: o, zone: l, specificOffset: u, invalidReason: d } = t.explainFromTokens(e);
    return d ? h.invalid(d) : ve(
      o,
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
    return Ke;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return Tn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return Vs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return On;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Dn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Mn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return In;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return Vn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return En;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Nn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return _n;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return bn;
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
    return xn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Fn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return $n;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Wn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return Es;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Ln;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Zn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return An;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return zn;
  }
}
function be(n) {
  if (h.isDateTime(n))
    return n;
  if (n && n.valueOf && oe(n.valueOf()))
    return h.fromJSDate(n);
  if (n && typeof n == "object")
    return h.fromObject(n);
  throw new x(
    `Unknown datetime argument: ${n}, of type ${typeof n}`
  );
}
const Ts = ne("en"), Ti = Vt(Ts);
function le() {
  return {
    lang: Ti,
    setLang: (e) => {
      Ts.value = e, _.defaultLocale = e;
    }
  };
}
const yt = ne(h.now().toISODate() || "");
function ye() {
  const { lang: n } = le(), e = (s) => {
    yt.value = s;
  }, t = C(() => h.fromISO(yt.value).setLocale(n.value).toFormat("dd MMMM yyyy"));
  return {
    currentDay: Vt(yt),
    currentDayWithFormat: t,
    setCurrentDay: e
  };
}
const vn = ne("calendar");
function Ee() {
  const n = (e) => {
    vn.value = e;
  };
  return {
    currentView: Vt(vn),
    setCurrentView: n
  };
}
const Oi = { class: "k-alendar-days-container" }, Di = ["onClick"], Mi = /* @__PURE__ */ J({
  __name: "KWeekDays",
  emits: ["dateClicked"],
  setup(n, { emit: e }) {
    const { currentDay: t, setCurrentDay: s } = ye(), { currentView: r } = Ee(), { lang: i } = le(), a = e, o = (u) => {
      s(u), a("dateClicked", u);
    }, l = () => {
      const u = h.fromISO(t.value).startOf("week"), d = h.fromISO(t.value).endOf("week"), f = [];
      let g = u;
      for (; g <= d; )
        f.push({
          text: g.setLocale(i.value).toFormat("ccc"),
          date: g.toISODate() || ""
        }), g = g.plus({ days: 1 });
      return f;
    };
    return (u, d) => (O(), M("div", Oi, [
      (O(!0), M(j, null, ee(l(), (f) => (O(), M("div", {
        onClick: (g) => o(f.date),
        key: f.date,
        class: Et({
          today: f.date === Y(t) && Y(r) === "day",
          "k-alendar-day": Y(r) === "day"
        })
      }, W(f.text), 11, Di))), 128))
    ]));
  }
}), B = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, r] of e)
    t[s] = r;
  return t;
}, Os = /* @__PURE__ */ B(Mi, [["__scopeId", "data-v-2ca025f4"]]), Ii = { class: "k-day-view-container" }, Vi = { class: "k-day-view-events" }, Ei = { class: "k-day-view-hour" }, Ni = { class: "k-day-view-events-container" }, _i = ["calendar-hour-container"], bi = ["onClick"], Ci = { class: "k-day-view-event-title" }, xi = { class: "k-day-view-event-time" }, Fi = /* @__PURE__ */ J({
  __name: "KDayView",
  props: {
    events: {}
  },
  emits: ["event"],
  setup(n, { emit: e }) {
    const t = n, s = e, { currentDay: r } = ye(), i = C(() => t.events), a = C(() => i.value.slice().sort((k, w) => new Date(k.start_date).getTime() - new Date(w.start_date).getTime())), o = C(() => a.value.filter((k) => h.fromISO(k.start_date).toFormat("yyyy-MM-dd") === r.value)), l = C(() => {
      const k = {};
      for (let w = 0; w < 24; w++)
        k[w] = [];
      return o.value.forEach((w) => {
        const v = h.fromISO(w.start_date);
        if (v.isValid) {
          const S = v.hour;
          k[S].push(w);
        }
      }), Object.keys(k).forEach((w) => {
        const v = parseInt(w);
        k[v].sort((S, T) => {
          const Z = h.fromISO(S.start_date), $ = h.fromISO(T.start_date);
          return Z.toMillis() - $.toMillis();
        });
      }), Array.from({ length: 24 }, (w, v) => k[v]);
    }), u = (k, w, v) => {
      const S = h.fromISO(k.start_date);
      if (!S.isValid || S.hour !== w) return 0;
      const T = S.toMillis(), Z = k.end_date ? h.fromISO(k.end_date).toMillis() : S.plus({ hours: 1 }).toMillis(), $ = l.value[w];
      let _e = 0;
      for (let ue = 0; ue < v; ue++) {
        const se = $[ue], K = h.fromISO(se.start_date).toMillis(), Q = se.end_date ? h.fromISO(se.end_date).toMillis() : h.fromISO(se.start_date).plus({ hours: 1 }).toMillis();
        T < Q && Z > K && _e++;
      }
      return _e * 70;
    }, d = (k) => {
      const w = h.fromISO(k.start_date);
      return w.isValid ? (w.minute + w.second / 60) / 60 * 100 : 0;
    }, f = (k, w) => {
      const v = h.fromISO(k.start_date), S = 100;
      if (!v.isValid) return S;
      const T = v.hour, Z = v.minute + v.second / 60;
      if (T !== w)
        return 0;
      if (k.end_date) {
        const $ = h.fromISO(k.end_date);
        if ($.isValid && ($.hour !== 0 || $.minute !== 0 || $.second !== 0)) {
          const ue = $.hour, se = $.minute + $.second / 60, K = T * 60 + Z, Q = ue * 60 + se;
          return Math.max(Q - K, 15) / 60 * 100;
        }
      }
      return S;
    }, g = (k) => {
      const w = h.fromISO(k.start_date);
      if (!w.isValid) return "";
      if (!(w.hour !== 0 || w.minute !== 0 || w.second !== 0)) return "All day";
      if (k.end_date) {
        const S = h.fromISO(k.end_date);
        if (S.isValid && (S.hour !== 0 || S.minute !== 0 || S.second !== 0))
          return `${w.toFormat("hh:mm a")} - ${S.toFormat("hh:mm a")}`;
      }
      return w.toFormat("hh:mm a");
    }, c = C(() => Array.from({ length: 24 }, (k, w) => {
      const v = w;
      return v === 0 ? "12:00 AM" : v < 12 ? `${v.toString().padStart(2, "0")}:00 AM` : v === 12 ? "12:00 PM" : `${(v - 12).toString().padStart(2, "0")}:00 PM`;
    })), y = (k) => {
      s("event", k);
    };
    return (k, w) => (O(), M("div", Ii, [
      he(Os),
      E("section", Vi, [
        E("div", Ei, [
          (O(!0), M(j, null, ee(c.value, (v) => (O(), M("div", {
            class: "k-day-view-hour-slot",
            key: v
          }, [
            E("h2", null, W(v), 1)
          ]))), 128))
        ]),
        E("div", Ni, [
          (O(!0), M(j, null, ee(c.value, (v, S) => (O(), M("div", {
            class: "k-day-view-event-slot",
            key: v,
            "calendar-hour-container": v
          }, [
            (O(!0), M(j, null, ee(l.value[S], (T, Z) => (O(), M("div", {
              key: T.id,
              class: "k-day-view-event-item",
              style: Nt({
                backgroundColor: T.color || "#3b82f6",
                top: `${d(T)}%`,
                left: `${u(T, S, Z)}px`,
                width: `calc(100% - ${u(T, S, Z)}px)`,
                height: `${f(T, S)}%`,
                zIndex: 10 + Z
              }),
              onClick: ($) => y(T)
            }, [
              E("h3", Ci, W(T.title), 1),
              E("p", xi, W(g(T)), 1)
            ], 12, bi))), 128))
          ], 8, _i))), 128))
        ])
      ])
    ]));
  }
}), $i = /* @__PURE__ */ B(Fi, [["__scopeId", "data-v-95dbde8b"]]);
function Zt() {
  const { lang: n } = le(), e = (s, r) => h.fromISO(s).setLocale(n.value).toLocaleString(r), t = C(() => h.now().toISODate());
  return {
    formatDate: e,
    today: t
  };
}
const Wi = ne([]), kn = ne([]), pn = ne(h.now()), Li = ne(null);
function Ne() {
  const { today: n } = Zt(), { lang: e } = le(), t = C(() => kn.value.map((o) => ({
    ...o,
    date_calendar_to_render: o.start_date
  }))), s = (o) => {
    const [l, u, d] = o.split("-").map(Number), f = h.now().set({ year: l, month: u, day: d }), g = f.startOf("month"), c = f.endOf("month"), y = g.startOf("week"), k = c.endOf("week"), w = [];
    let v = y;
    for (; v <= k; )
      w.push(v.toISODate()), v = v.plus({ days: 1 });
    return w;
  }, r = (o, {
    startDate: l,
    endDate: u
  }) => {
    const d = h.fromISO(o), f = h.fromISO(l), g = h.fromISO(u);
    return N.fromDateTimes(f, g).contains(d);
  }, i = (o) => s(o).map((l) => {
    const u = [], d = [], f = h.fromISO(l), g = h.fromISO(o);
    t.value.forEach((y) => {
      y.end_date && r(l, {
        startDate: y.start_date,
        endDate: y.end_date
      }) ? d.push({ ...y, date_calendar_to_render: l }) : d.push(y);
    });
    const c = d.filter((y) => f.hasSame(h.fromISO(y.date_calendar_to_render), "day"));
    return f.hasSame(g, "month") || u.push("other-month-date"), f.hasSame(h.fromISO(n.value), "day") && u.push("selected"), {
      day: l,
      class: u.join(" "),
      events: c || [],
      text: h.fromISO(l).day.toString()
    };
  }), a = C(() => h.fromJSDate(pn.value.toJSDate()).setLocale(e.value).toFormat("MMMM yyyy"));
  return {
    eventsToShowInCalendar: kn,
    calendarDaySelect: Li,
    title: a,
    monthDays: Wi,
    generateCalendar: i,
    currentDate: pn
  };
}
const Zi = ne({
  id: "",
  title: "",
  start_date: "",
  description: ""
});
function Ai() {
  return {
    eventSelected: Zi
  };
}
const zi = /* @__PURE__ */ J({
  __name: "KEventItem",
  props: {
    event: {},
    calendar: {}
  },
  emits: ["event"],
  setup(n, { emit: e }) {
    const t = e, s = n, r = C(() => s.event), i = (a) => {
      t("event", { mauseEvent: a, event: s.event, calendar: s.calendar });
    };
    return (a, o) => (O(), M("li", {
      style: Nt({
        "background-color": r.value.id === "more" ? "gray" : r.value.color ? r.value.color : "#374151"
      }),
      onClick: i
    }, [
      E("h3", null, W(r.value.title), 1)
    ], 4));
  }
}), Hi = /* @__PURE__ */ B(zi, [["__scopeId", "data-v-807583f7"]]), Ri = { class: "k-alendar-container" }, Ui = ["onClick"], qi = { class: "k-alendar-span-container" }, Yi = { class: "k-alendar-text" }, Pi = {
  key: 0,
  class: "point"
}, Gi = {
  key: 0,
  class: "events"
}, Ji = /* @__PURE__ */ J({
  __name: "KCalendar",
  emits: ["event", "events"],
  setup(n, { emit: e }) {
    const { monthDays: t, calendarDaySelect: s } = Ne(), { eventSelected: r } = Ai(), i = e, a = ne({}), o = (f) => {
      window.innerWidth < 768 && f.events.length > 0 && (f.events.length === 1 ? (r.value = f.events[0], f.events[0].id != "more" && i("event", f.events[0])) : (r.value = {
        id: "more",
        title: "",
        start_date: "",
        description: ""
      }, i("events", { events: f.events })), s.value = f);
    }, l = ({
      mauseEvent: f,
      event: g,
      calendar: c
    }) => {
      if (r.value = g, s.value = c, c.events.length > 0) {
        let y = f.target;
        y.tagName === "H3" && (y = y.parentElement);
      }
      g.id != "more" ? i("event", g) : i("events", { events: s.value.events });
    }, u = (f) => {
      var S;
      const g = a.value[f];
      let c = 0;
      const y = 32, k = 8, w = 8;
      let v = 0;
      if (g) {
        c = g.clientHeight - w * 2;
        const T = (S = g.querySelector("span.k-alendar-text")) == null ? void 0 : S.offsetHeight;
        c -= T || 0, v = Math.floor(
          c / (y + k)
        );
      }
      return v;
    }, d = (f, g) => {
      const c = u(f), y = g.slice(0, c);
      return g.length - c > 0 && y.splice(y.length - 1, 1, {
        id: "more",
        title: `+${g.length + 1 - c}`,
        start_date: "",
        description: ""
      }), y;
    };
    return (f, g) => (O(), M(j, null, [
      he(Os),
      E("div", Ri, [
        (O(!0), M(j, null, ee(Y(t), (c) => (O(), M("div", {
          key: c.day.toString(),
          onClick: (y) => o(c),
          class: Et([c.class, "date"]),
          ref_for: !0,
          ref: (y) => a.value[c.day] = y
        }, [
          E("div", qi, [
            E("span", Yi, W(c.text), 1),
            c.events.length > 0 ? (O(), M("span", Pi)) : Te("", !0)
          ]),
          c.events.length > 0 ? (O(), M("div", Gi, [
            E("ul", null, [
              (O(!0), M(j, null, ee(d(c.day, c.events), (y) => (O(), Ge(Hi, {
                key: y.id,
                event: y,
                calendar: c,
                onEvent: l
              }, null, 8, ["event", "calendar"]))), 128))
            ])
          ])) : Te("", !0)
        ], 10, Ui))), 128))
      ])
    ], 64));
  }
}), Bi = /* @__PURE__ */ B(Ji, [["__scopeId", "data-v-479b68a9"]]), ji = /* @__PURE__ */ J({
  __name: "ButtonNextMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const { currentDate: t, monthDays: s, generateCalendar: r } = Ne(), i = e, { currentView: a } = Ee(), { currentDay: o, setCurrentDay: l } = ye(), u = () => {
      if (a.value === "day") {
        l(h.fromISO(o.value).plus({ days: 1 }).toISODate() || "");
        return;
      }
      t.value = t.value.plus({ months: 1 });
      const d = h.fromJSDate(t.value.toJSDate()).toFormat("yyyy-MM-dd");
      s.value = r(d), i("handle", d);
    };
    return (d, f) => (O(), M("button", {
      type: "button",
      class: "k-alendar-navegation-left",
      onClick: u
    }, "→"));
  }
}), Ki = /* @__PURE__ */ B(ji, [["__scopeId", "data-v-57d01dfc"]]), Qi = /* @__PURE__ */ J({
  __name: "ButtonPrevMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const t = e, { currentDate: s, monthDays: r, generateCalendar: i } = Ne(), { currentView: a } = Ee(), { currentDay: o, setCurrentDay: l } = ye(), u = () => {
      if (a.value === "day") {
        l(h.fromISO(o.value).minus({ days: 1 }).toISODate() || "");
        return;
      }
      s.value = s.value.minus({ months: 1 });
      const d = h.fromJSDate(s.value.toJSDate()).toFormat("yyyy-MM-dd");
      r.value = i(d), t("handle", d);
    };
    return (d, f) => (O(), M("button", {
      type: "button",
      class: "k-alendar-navegation-prev",
      onClick: u
    }, "←"));
  }
}), Xi = /* @__PURE__ */ B(Qi, [["__scopeId", "data-v-60436416"]]), Le = {
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
}, ea = /* @__PURE__ */ J({
  __name: "ButtonTodayMonth",
  emits: ["handle"],
  setup(n, { emit: e }) {
    const t = e, { currentDate: s, monthDays: r, generateCalendar: i } = Ne(), { today: a } = Zt(), { lang: o } = le(), l = () => {
      s.value = h.now(), r.value = i(a.value), t("handle", a.value);
    }, u = C(() => Le[o.value].buttons.today || "Today");
    return (d, f) => (O(), M("button", {
      type: "button",
      class: "k-alendar-today-button",
      onClick: l
    }, W(u.value), 1));
  }
}), ta = /* @__PURE__ */ B(ea, [["__scopeId", "data-v-4da96950"]]), na = { class: "k-view-selector-container" }, sa = ["onClick"], ra = /* @__PURE__ */ J({
  __name: "KViewSelector",
  setup(n) {
    const { lang: e } = le(), { setCurrentDay: t } = ye(), { today: s } = Zt(), { currentView: r, setCurrentView: i } = Ee(), a = C(() => {
      const l = Le[e.value] || Le.en;
      return [
        { label: l.monthView, value: "calendar" },
        { label: l.dayView, value: "day" },
        { label: l.listView, value: "list" }
      ];
    }), o = (l) => {
      i(l), t(s.value);
    };
    return (l, u) => (O(), M("div", na, [
      (O(!0), M(j, null, ee(a.value, (d) => (O(), M("button", {
        key: d.value,
        onClick: (f) => o(d.value),
        class: Et([
          "k-view-selector-button",
          { "k-view-selector-button-active": Y(r) === d.value }
        ])
      }, W(d.label), 11, sa))), 128))
    ]));
  }
}), ia = /* @__PURE__ */ B(ra, [["__scopeId", "data-v-16b9efd5"]]), aa = { class: "k-alendar-header-container" }, oa = { class: "left-buttons" }, la = { class: "navigation-buttons-group" }, ua = { class: "title-and-controls" }, ca = { class: "center-title" }, da = { class: "right-controls" }, ha = /* @__PURE__ */ J({
  __name: "KCalendarHeader",
  emits: ["handlePrevMonth", "handleNextMonth", "handleToToday"],
  setup(n, { emit: e }) {
    const { title: t } = Ne(), { currentView: s } = Ee(), { currentDayWithFormat: r } = ye(), i = C(() => s.value === "day" ? r.value : t.value), a = e, o = (d) => {
      a("handlePrevMonth", d);
    }, l = (d) => {
      a("handleNextMonth", d);
    }, u = (d) => {
      a("handleToToday", d);
    };
    return (d, f) => (O(), M("header", aa, [
      E("div", oa, [
        E("div", la, [
          he(Xi, { onHandle: o }),
          he(Ki, { onHandle: l })
        ]),
        he(ta, { onHandle: u })
      ]),
      E("div", ua, [
        E("div", ca, [
          E("h2", null, W(i.value), 1)
        ]),
        E("div", da, [
          he(ia)
        ])
      ])
    ]));
  }
}), fa = /* @__PURE__ */ B(ha, [["__scopeId", "data-v-b96f8085"]]), ma = { class: "k-list-calendar-container" }, ya = { class: "day-header" }, ga = { class: "day-header-full-date" }, wa = { class: "day-header-simple-date" }, va = ["onClick"], ka = { class: "k-list-calendar-event-time" }, pa = { class: "k-list-calendar-event-title" }, Sa = { class: "k-list-calendar-event-title-container" }, Ta = { class: "k-list-calendar-event-title-text" }, Oa = { class: "k-list-calendar-event-description" }, Da = {
  key: 0,
  class: "nothing-to-show-message"
}, Ma = /* @__PURE__ */ J({
  __name: "KListCalendar",
  props: {
    events: {}
  },
  emits: ["event"],
  setup(n, { emit: e }) {
    const { lang: t } = le(), s = n, r = C(() => s.events), i = e, a = C(() => r.value.slice().sort((c, y) => new Date(c.start_date).getTime() - new Date(y.start_date).getTime())), o = C(() => a.value.reduce((c, y) => (c[y.start_date] = [...c[y.start_date] || [], y], c), {})), l = (c) => h.fromISO(c).setLocale(t.value).toFormat("EEEE, dd MMMM yyyy"), u = (c) => h.fromISO(c).hour !== 0 || h.fromISO(c).minute !== 0 || h.fromISO(c).second !== 0, d = (c) => {
      var v;
      const y = c.start_date;
      if (!h.fromISO(y).isValid)
        return "-";
      if (!u(y))
        return ((v = Le[t.value]) == null ? void 0 : v.allDay) || "All day";
      if (c.end_date) {
        const S = c.end_date, T = h.fromISO(S).isValid, Z = u(S);
        if (T && Z)
          return `${h.fromISO(y).toFormat("hh:mm a")} - ${h.fromISO(S).toFormat("hh:mm a")}`;
      }
      return h.fromISO(y).toFormat("hh:mm a");
    }, f = (c) => h.fromISO(c).toFormat("yyyy-MM-dd"), g = (c) => {
      i("event", c);
    };
    return (c, y) => {
      var k;
      return O(), M("div", ma, [
        (O(!0), M(j, null, ee(Object.entries(o.value), ([w, v]) => (O(), M("div", { key: w }, [
          E("div", ya, [
            E("p", ga, W(l(w)), 1),
            E("h3", wa, W(f(w)), 1)
          ]),
          (O(!0), M(j, null, ee(v, (S) => (O(), M("div", {
            key: S.id,
            class: "k-list-calendar-event",
            onClick: (T) => g(S)
          }, [
            E("h4", ka, W(d(S)), 1),
            E("div", pa, [
              E("div", Sa, [
                S.color ? (O(), M("span", {
                  key: 0,
                  style: Nt({ backgroundColor: S.color }),
                  class: "k-list-calendar-event-title-color"
                }, null, 4)) : Te("", !0),
                E("h2", Ta, W(S.title), 1)
              ]),
              E("p", Oa, W(S.description), 1)
            ])
          ], 8, va))), 128))
        ]))), 128)),
        r.value.length === 0 ? (O(), M("div", Da, W(((k = Y(Le)[Y(t)]) == null ? void 0 : k.nothingToShow) || "No events found"), 1)) : Te("", !0)
      ]);
    };
  }
}), Ia = /* @__PURE__ */ B(Ma, [["__scopeId", "data-v-253568a9"]]), Va = { class: "k-alendar-wrapper-container" }, Ea = /* @__PURE__ */ J({
  __name: "VueKAlendar",
  props: {
    events: {},
    lang: {},
    view: {}
  },
  emits: [
    "event",
    "nextMonth",
    "prevMonth",
    "toToday",
    "events"
  ],
  setup(n, { emit: e }) {
    const t = e, s = n, { currentView: r, setCurrentView: i } = Ee();
    i(s.view || "calendar");
    const a = C(() => s.events), { setLang: o } = le(), { eventsToShowInCalendar: l, generateCalendar: u, monthDays: d, currentDate: f } = Ne(), { setCurrentDay: g } = ye(), c = (T) => {
      t("prevMonth", T);
    }, y = (T) => {
      t("nextMonth", T);
    }, k = (T) => {
      g(T), t("toToday", T);
    }, w = () => {
      l.value = s.events, d.value = u(f.value.toFormat("yyyy-MM-dd"));
    };
    zt(
      () => s.lang,
      (T) => {
        T && o(T);
      },
      { immediate: !0 }
    ), zt(
      s,
      ({ events: T }) => {
        T && w();
      },
      { immediate: !0, deep: !0 }
    );
    const v = (T) => {
      t("event", T);
    }, S = ({ events: T }) => {
      t("events", T);
    };
    return (T, Z) => (O(), M("section", Va, [
      he(fa, {
        view: Y(r),
        onHandlePrevMonth: c,
        onHandleNextMonth: y,
        onHandleToToday: k
      }, null, 8, ["view"]),
      Y(r) === "calendar" ? (O(), Ge(Bi, {
        key: 0,
        onEvent: v,
        onEvents: S
      })) : Y(r) === "list" ? (O(), Ge(Ia, {
        key: 1,
        events: a.value,
        onEvent: v
      }, null, 8, ["events"])) : Te("", !0),
      Y(r) === "day" ? (O(), Ge($i, {
        key: 2,
        events: a.value,
        onEvent: v
      }, null, 8, ["events"])) : Te("", !0)
    ]));
  }
}), _a = /* @__PURE__ */ B(Ea, [["__scopeId", "data-v-a5f46d91"]]);
export {
  _a as KAlendar
};
