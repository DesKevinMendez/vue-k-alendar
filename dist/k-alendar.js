import { computed as Me, ref as ee, onMounted as Tn, defineComponent as lt, useModel as Sn, watch as On, onUnmounted as xs, openBlock as N, createElementBlock as V, withModifiers as Is, createElementVNode as T, renderSlot as yt, normalizeStyle as bt, toDisplayString as te, mergeModels as Ut, toRefs as Ns, watchEffect as Cs, createBlock as Dt, withCtx as Ht, createCommentVNode as st, Fragment as Ke, renderList as Qe, unref as K, pushScopeId as Dn, popScopeId as Mn, normalizeClass as bs, createVNode as Vs } from "vue";
class ge extends Error {
}
class Fs extends ge {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class Ws extends ge {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Ls extends ge {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class Ee extends ge {
}
class En extends ge {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class $ extends ge {
}
class se extends ge {
  constructor() {
    super("Zone is an abstract class");
  }
}
const c = "numeric", B = "short", R = "long", rt = {
  year: c,
  month: c,
  day: c
}, xn = {
  year: c,
  month: B,
  day: c
}, $s = {
  year: c,
  month: B,
  day: c,
  weekday: B
}, In = {
  year: c,
  month: R,
  day: c
}, Nn = {
  year: c,
  month: R,
  day: c,
  weekday: R
}, Cn = {
  hour: c,
  minute: c
}, bn = {
  hour: c,
  minute: c,
  second: c
}, Vn = {
  hour: c,
  minute: c,
  second: c,
  timeZoneName: B
}, Fn = {
  hour: c,
  minute: c,
  second: c,
  timeZoneName: R
}, Wn = {
  hour: c,
  minute: c,
  hourCycle: "h23"
}, Ln = {
  hour: c,
  minute: c,
  second: c,
  hourCycle: "h23"
}, $n = {
  hour: c,
  minute: c,
  second: c,
  hourCycle: "h23",
  timeZoneName: B
}, _n = {
  hour: c,
  minute: c,
  second: c,
  hourCycle: "h23",
  timeZoneName: R
}, Zn = {
  year: c,
  month: c,
  day: c,
  hour: c,
  minute: c
}, zn = {
  year: c,
  month: c,
  day: c,
  hour: c,
  minute: c,
  second: c
}, An = {
  year: c,
  month: B,
  day: c,
  hour: c,
  minute: c
}, Rn = {
  year: c,
  month: B,
  day: c,
  hour: c,
  minute: c,
  second: c
}, _s = {
  year: c,
  month: B,
  day: c,
  weekday: B,
  hour: c,
  minute: c
}, Un = {
  year: c,
  month: R,
  day: c,
  hour: c,
  minute: c,
  timeZoneName: B
}, Hn = {
  year: c,
  month: R,
  day: c,
  hour: c,
  minute: c,
  second: c,
  timeZoneName: B
}, qn = {
  year: c,
  month: R,
  day: c,
  weekday: R,
  hour: c,
  minute: c,
  timeZoneName: R
}, Yn = {
  year: c,
  month: R,
  day: c,
  weekday: R,
  hour: c,
  minute: c,
  second: c,
  timeZoneName: R
};
class Ae {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new se();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new se();
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
    throw new se();
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
    throw new se();
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
    throw new se();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new se();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new se();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new se();
  }
}
let gt = null;
class ut extends Ae {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return gt === null && (gt = new ut()), gt;
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
    return es(e, t, s);
  }
  /** @override **/
  formatOffset(e, t) {
    return Ze(this.offset(e), t);
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
let Xe = {};
function Zs(n) {
  return Xe[n] || (Xe[n] = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  })), Xe[n];
}
const zs = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function As(n, e) {
  const t = n.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, r, i, a, o, l, u, h] = s;
  return [a, r, i, o, l, u, h];
}
function Rs(n, e) {
  const t = n.formatToParts(e), s = [];
  for (let r = 0; r < t.length; r++) {
    const { type: i, value: a } = t[r], o = zs[i];
    i === "era" ? s[o] = a : g(o) || (s[o] = parseInt(a, 10));
  }
  return s;
}
let Ye = {};
class ne extends Ae {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    return Ye[e] || (Ye[e] = new ne(e)), Ye[e];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    Ye = {}, Xe = {};
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
    super(), this.zoneName = e, this.valid = ne.isValidZone(e);
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
    return es(e, t, s, this.name);
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
    return Ze(this.offset(e), t);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    const t = new Date(e);
    if (isNaN(t)) return NaN;
    const s = Zs(this.name);
    let [r, i, a, o, l, u, h] = s.formatToParts ? Rs(s, t) : As(s, t);
    o === "BC" && (r = -Math.abs(r) + 1);
    const v = dt({
      year: r,
      month: i,
      day: a,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: h,
      millisecond: 0
    });
    let f = +t;
    const p = f % 1e3;
    return f -= p >= 0 ? p : 1e3 + p, (v - f) / (60 * 1e3);
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
let qt = {};
function Us(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = qt[t];
  return s || (s = new Intl.ListFormat(n, e), qt[t] = s), s;
}
let Mt = {};
function Et(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Mt[t];
  return s || (s = new Intl.DateTimeFormat(n, e), Mt[t] = s), s;
}
let xt = {};
function Hs(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = xt[t];
  return s || (s = new Intl.NumberFormat(n, e), xt[t] = s), s;
}
let It = {};
function qs(n, e = {}) {
  const { base: t, ...s } = e, r = JSON.stringify([n, s]);
  let i = It[r];
  return i || (i = new Intl.RelativeTimeFormat(n, e), It[r] = i), i;
}
let $e = null;
function Ys() {
  return $e || ($e = new Intl.DateTimeFormat().resolvedOptions().locale, $e);
}
let Yt = {};
function Ps(n) {
  let e = Yt[n];
  if (!e) {
    const t = new Intl.Locale(n);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, Yt[n] = e;
  }
  return e;
}
function Gs(n) {
  const e = n.indexOf("-x-");
  e !== -1 && (n = n.substring(0, e));
  const t = n.indexOf("-u-");
  if (t === -1)
    return [n];
  {
    let s, r;
    try {
      s = Et(n).resolvedOptions(), r = n;
    } catch {
      const l = n.substring(0, t);
      s = Et(l).resolvedOptions(), r = l;
    }
    const { numberingSystem: i, calendar: a } = s;
    return [r, i, a];
  }
}
function Js(n, e, t) {
  return (t || e) && (n.includes("-u-") || (n += "-u"), t && (n += `-ca-${t}`), e && (n += `-nu-${e}`)), n;
}
function Bs(n) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const s = d.utc(2009, t, 1);
    e.push(n(s));
  }
  return e;
}
function js(n) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const s = d.utc(2016, 11, 13 + t);
    e.push(n(s));
  }
  return e;
}
function Pe(n, e, t, s) {
  const r = n.listingMode();
  return r === "error" ? null : r === "en" ? t(e) : s(e);
}
function Ks(n) {
  return n.numberingSystem && n.numberingSystem !== "latn" ? !1 : n.numberingSystem === "latn" || !n.locale || n.locale.startsWith("en") || new Intl.DateTimeFormat(n.intl).resolvedOptions().numberingSystem === "latn";
}
class Qs {
  constructor(e, t, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: r, floor: i, ...a } = s;
    if (!t || Object.keys(a).length > 0) {
      const o = { useGrouping: !1, ...s };
      s.padTo > 0 && (o.minimumIntegerDigits = s.padTo), this.inf = Hs(e, o);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : $t(e, 3);
      return F(t, this.padTo);
    }
  }
}
class Xs {
  constructor(e, t, s) {
    this.opts = s, this.originalZone = void 0;
    let r;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const a = -1 * (e.offset / 60), o = a >= 0 ? `Etc/GMT+${a}` : `Etc/GMT${a}`;
      e.offset !== 0 && ne.create(o).valid ? (r = o, this.dt = e) : (r = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, r = e.zone.name) : (r = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const i = { ...this.opts };
    i.timeZone = i.timeZone || r, this.dtf = Et(t, i);
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
class er {
  constructor(e, t, s) {
    this.opts = { style: "long", ...s }, !t && Qn() && (this.rtf = qs(e, s));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : Or(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const tr = {
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
    const a = e || C.defaultLocale, o = a || (i ? "en-US" : Ys()), l = t || C.defaultNumberingSystem, u = s || C.defaultOutputCalendar, h = Nt(r) || C.defaultWeekSettings;
    return new E(o, l, u, h, a);
  }
  static resetCache() {
    $e = null, Mt = {}, xt = {}, It = {};
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: s, weekSettings: r } = {}) {
    return E.create(e, t, s, r);
  }
  constructor(e, t, s, r, i) {
    const [a, o, l] = Gs(e);
    this.locale = a, this.numberingSystem = t || o || null, this.outputCalendar = s || l || null, this.weekSettings = r, this.intl = Js(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = Ks(this)), this.fastNumbersCached;
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
      Nt(e.weekSettings) || this.weekSettings,
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
    return Pe(this, e, ss, () => {
      const s = t ? { month: e, day: "numeric" } : { month: e }, r = t ? "format" : "standalone";
      return this.monthsCache[r][e] || (this.monthsCache[r][e] = Bs((i) => this.extract(i, s, "month"))), this.monthsCache[r][e];
    });
  }
  weekdays(e, t = !1) {
    return Pe(this, e, as, () => {
      const s = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, r = t ? "format" : "standalone";
      return this.weekdaysCache[r][e] || (this.weekdaysCache[r][e] = js(
        (i) => this.extract(i, s, "weekday")
      )), this.weekdaysCache[r][e];
    });
  }
  meridiems() {
    return Pe(
      this,
      void 0,
      () => os,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [d.utc(2016, 11, 13, 9), d.utc(2016, 11, 13, 19)].map(
            (t) => this.extract(t, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return Pe(this, e, ls, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [d.utc(-40, 1, 1), d.utc(2017, 1, 1)].map(
        (s) => this.extract(s, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, s) {
    const r = this.dtFormatter(e, t), i = r.formatToParts(), a = i.find((o) => o.type.toLowerCase() === s);
    return a ? a.value : null;
  }
  numberFormatter(e = {}) {
    return new Qs(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new Xs(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new er(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return Us(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : Xn() ? Ps(this.locale) : tr;
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
let wt = null;
class Z extends Ae {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return wt === null && (wt = new Z(0)), wt;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? Z.utcInstance : new Z(e);
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
        return new Z(ft(t[1], t[2]));
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
    return this.fixed === 0 ? "UTC" : `UTC${Ze(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Ze(-this.fixed, "narrow")}`;
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
    return Ze(this.fixed, t);
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
class nr extends Ae {
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
function oe(n, e) {
  if (g(n) || n === null)
    return e;
  if (n instanceof Ae)
    return n;
  if (lr(n)) {
    const t = n.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? ut.instance : t === "utc" || t === "gmt" ? Z.utcInstance : Z.parseSpecifier(t) || ne.create(n);
  } else return le(n) ? Z.instance(n) : typeof n == "object" && "offset" in n && typeof n.offset == "function" ? n : new nr(n);
}
const Vt = {
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
}, Pt = {
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
}, sr = Vt.hanidec.replace(/[\[|\]]/g, "").split("");
function rr(n) {
  let e = parseInt(n, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < n.length; t++) {
      const s = n.charCodeAt(t);
      if (n[t].search(Vt.hanidec) !== -1)
        e += sr.indexOf(n[t]);
      else
        for (const r in Pt) {
          const [i, a] = Pt[r];
          s >= i && s <= a && (e += s - i);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
let De = {};
function ir() {
  De = {};
}
function P({ numberingSystem: n }, e = "") {
  const t = n || "latn";
  return De[t] || (De[t] = {}), De[t][e] || (De[t][e] = new RegExp(`${Vt[t]}${e}`)), De[t][e];
}
let Gt = () => Date.now(), Jt = "system", Bt = null, jt = null, Kt = null, Qt = 60, Xt, en = null;
class C {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Gt;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Gt = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    Jt = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return oe(Jt, ut.instance);
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
    return jt;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    jt = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Kt;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    Kt = e;
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
    return en;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    en = Nt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return Qt;
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
    Qt = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Xt;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Xt = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    E.resetCache(), ne.resetCache(), d.resetCache(), ir();
  }
}
class J {
  constructor(e, t) {
    this.reason = e, this.explanation = t;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const Pn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Gn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function H(n, e) {
  return new J(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${n}, which is invalid`
  );
}
function Ft(n, e, t) {
  const s = new Date(Date.UTC(n, e - 1, t));
  n < 100 && n >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const r = s.getUTCDay();
  return r === 0 ? 7 : r;
}
function Jn(n, e, t) {
  return t + (Re(n) ? Gn : Pn)[e - 1];
}
function Bn(n, e) {
  const t = Re(n) ? Gn : Pn, s = t.findIndex((i) => i < e), r = e - t[s];
  return { month: s + 1, day: r };
}
function Wt(n, e) {
  return (n - e + 7) % 7 + 1;
}
function it(n, e = 4, t = 1) {
  const { year: s, month: r, day: i } = n, a = Jn(s, r, i), o = Wt(Ft(s, r, i), t);
  let l = Math.floor((a - o + 14 - e) / 7), u;
  return l < 1 ? (u = s - 1, l = ze(u, e, t)) : l > ze(s, e, t) ? (u = s + 1, l = 1) : u = s, { weekYear: u, weekNumber: l, weekday: o, ...ht(n) };
}
function tn(n, e = 4, t = 1) {
  const { weekYear: s, weekNumber: r, weekday: i } = n, a = Wt(Ft(s, 1, e), t), o = xe(s);
  let l = r * 7 + i - a - 7 + e, u;
  l < 1 ? (u = s - 1, l += xe(u)) : l > o ? (u = s + 1, l -= xe(s)) : u = s;
  const { month: h, day: m } = Bn(u, l);
  return { year: u, month: h, day: m, ...ht(n) };
}
function vt(n) {
  const { year: e, month: t, day: s } = n, r = Jn(e, t, s);
  return { year: e, ordinal: r, ...ht(n) };
}
function nn(n) {
  const { year: e, ordinal: t } = n, { month: s, day: r } = Bn(e, t);
  return { year: e, month: s, day: r, ...ht(n) };
}
function sn(n, e) {
  if (!g(n.localWeekday) || !g(n.localWeekNumber) || !g(n.localWeekYear)) {
    if (!g(n.weekday) || !g(n.weekNumber) || !g(n.weekYear))
      throw new Ee(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return g(n.localWeekday) || (n.weekday = n.localWeekday), g(n.localWeekNumber) || (n.weekNumber = n.localWeekNumber), g(n.localWeekYear) || (n.weekYear = n.localWeekYear), delete n.localWeekday, delete n.localWeekNumber, delete n.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function ar(n, e = 4, t = 1) {
  const s = ct(n.weekYear), r = q(
    n.weekNumber,
    1,
    ze(n.weekYear, e, t)
  ), i = q(n.weekday, 1, 7);
  return s ? r ? i ? !1 : H("weekday", n.weekday) : H("week", n.weekNumber) : H("weekYear", n.weekYear);
}
function or(n) {
  const e = ct(n.year), t = q(n.ordinal, 1, xe(n.year));
  return e ? t ? !1 : H("ordinal", n.ordinal) : H("year", n.year);
}
function jn(n) {
  const e = ct(n.year), t = q(n.month, 1, 12), s = q(n.day, 1, at(n.year, n.month));
  return e ? t ? s ? !1 : H("day", n.day) : H("month", n.month) : H("year", n.year);
}
function Kn(n) {
  const { hour: e, minute: t, second: s, millisecond: r } = n, i = q(e, 0, 23) || e === 24 && t === 0 && s === 0 && r === 0, a = q(t, 0, 59), o = q(s, 0, 59), l = q(r, 0, 999);
  return i ? a ? o ? l ? !1 : H("millisecond", r) : H("second", s) : H("minute", t) : H("hour", e);
}
function g(n) {
  return typeof n > "u";
}
function le(n) {
  return typeof n == "number";
}
function ct(n) {
  return typeof n == "number" && n % 1 === 0;
}
function lr(n) {
  return typeof n == "string";
}
function ur(n) {
  return Object.prototype.toString.call(n) === "[object Date]";
}
function Qn() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function Xn() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function cr(n) {
  return Array.isArray(n) ? n : [n];
}
function rn(n, e, t) {
  if (n.length !== 0)
    return n.reduce((s, r) => {
      const i = [e(r), r];
      return s && t(s[0], i[0]) === s[0] ? s : i;
    }, null)[1];
}
function dr(n, e) {
  return e.reduce((t, s) => (t[s] = n[s], t), {});
}
function Ne(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Nt(n) {
  if (n == null)
    return null;
  if (typeof n != "object")
    throw new $("Week settings must be an object");
  if (!q(n.firstDay, 1, 7) || !q(n.minimalDays, 1, 7) || !Array.isArray(n.weekend) || n.weekend.some((e) => !q(e, 1, 7)))
    throw new $("Invalid week settings");
  return {
    firstDay: n.firstDay,
    minimalDays: n.minimalDays,
    weekend: Array.from(n.weekend)
  };
}
function q(n, e, t) {
  return ct(n) && n >= e && n <= t;
}
function fr(n, e) {
  return n - e * Math.floor(n / e);
}
function F(n, e = 2) {
  const t = n < 0;
  let s;
  return t ? s = "-" + ("" + -n).padStart(e, "0") : s = ("" + n).padStart(e, "0"), s;
}
function ae(n) {
  if (!(g(n) || n === null || n === ""))
    return parseInt(n, 10);
}
function he(n) {
  if (!(g(n) || n === null || n === ""))
    return parseFloat(n);
}
function Lt(n) {
  if (!(g(n) || n === null || n === "")) {
    const e = parseFloat("0." + n) * 1e3;
    return Math.floor(e);
  }
}
function $t(n, e, t = !1) {
  const s = 10 ** e;
  return (t ? Math.trunc : Math.round)(n * s) / s;
}
function Re(n) {
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0);
}
function xe(n) {
  return Re(n) ? 366 : 365;
}
function at(n, e) {
  const t = fr(e - 1, 12) + 1, s = n + (e - t) / 12;
  return t === 2 ? Re(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function dt(n) {
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
function an(n, e, t) {
  return -Wt(Ft(n, 1, e), t) + e - 1;
}
function ze(n, e = 4, t = 1) {
  const s = an(n, e, t), r = an(n + 1, e, t);
  return (xe(n) - s + r) / 7;
}
function Ct(n) {
  return n > 99 ? n : n > C.twoDigitCutoffYear ? 1900 + n : 2e3 + n;
}
function es(n, e, t, s = null) {
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
function ft(n, e) {
  let t = parseInt(n, 10);
  Number.isNaN(t) && (t = 0);
  const s = parseInt(e, 10) || 0, r = t < 0 || Object.is(t, -0) ? -s : s;
  return t * 60 + r;
}
function ts(n) {
  const e = Number(n);
  if (typeof n == "boolean" || n === "" || Number.isNaN(e))
    throw new $(`Invalid unit value ${n}`);
  return e;
}
function ot(n, e) {
  const t = {};
  for (const s in n)
    if (Ne(n, s)) {
      const r = n[s];
      if (r == null) continue;
      t[e(s)] = ts(r);
    }
  return t;
}
function Ze(n, e) {
  const t = Math.trunc(Math.abs(n / 60)), s = Math.trunc(Math.abs(n % 60)), r = n >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${r}${F(t, 2)}:${F(s, 2)}`;
    case "narrow":
      return `${r}${t}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${r}${F(t, 2)}${F(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function ht(n) {
  return dr(n, ["hour", "minute", "second", "millisecond"]);
}
const hr = [
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
], ns = [
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
], mr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function ss(n) {
  switch (n) {
    case "narrow":
      return [...mr];
    case "short":
      return [...ns];
    case "long":
      return [...hr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const rs = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], is = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], yr = ["M", "T", "W", "T", "F", "S", "S"];
function as(n) {
  switch (n) {
    case "narrow":
      return [...yr];
    case "short":
      return [...is];
    case "long":
      return [...rs];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const os = ["AM", "PM"], gr = ["Before Christ", "Anno Domini"], wr = ["BC", "AD"], vr = ["B", "A"];
function ls(n) {
  switch (n) {
    case "narrow":
      return [...vr];
    case "short":
      return [...wr];
    case "long":
      return [...gr];
    default:
      return null;
  }
}
function pr(n) {
  return os[n.hour < 12 ? 0 : 1];
}
function kr(n, e) {
  return as(e)[n.weekday - 1];
}
function Tr(n, e) {
  return ss(e)[n.month - 1];
}
function Sr(n, e) {
  return ls(e)[n.year < 0 ? 0 : 1];
}
function Or(n, e, t = "always", s = !1) {
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
  const a = Object.is(e, -0) || e < 0, o = Math.abs(e), l = o === 1, u = r[n], h = s ? l ? u[1] : u[2] || u[1] : l ? r[n][0] : n;
  return a ? `${o} ${h} ago` : `in ${o} ${h}`;
}
function on(n, e) {
  let t = "";
  for (const s of n)
    s.literal ? t += s.val : t += e(s.val);
  return t;
}
const Dr = {
  D: rt,
  DD: xn,
  DDD: In,
  DDDD: Nn,
  t: Cn,
  tt: bn,
  ttt: Vn,
  tttt: Fn,
  T: Wn,
  TT: Ln,
  TTT: $n,
  TTTT: _n,
  f: Zn,
  ff: An,
  fff: Un,
  ffff: qn,
  F: zn,
  FF: Rn,
  FFF: Hn,
  FFFF: Yn
};
class _ {
  static create(e, t = {}) {
    return new _(e, t);
  }
  static parseFormat(e) {
    let t = null, s = "", r = !1;
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const o = e.charAt(a);
      o === "'" ? (s.length > 0 && i.push({ literal: r || /^\s+$/.test(s), val: s }), t = null, s = "", r = !r) : r || o === t ? s += o : (s.length > 0 && i.push({ literal: /^\s+$/.test(s), val: s }), s = o, t = o);
    }
    return s.length > 0 && i.push({ literal: r || /^\s+$/.test(s), val: s }), i;
  }
  static macroTokenToFormatOpts(e) {
    return Dr[e];
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
  num(e, t = 0) {
    if (this.opts.forceSimple)
      return F(e, t);
    const s = { ...this.opts };
    return t > 0 && (s.padTo = t), this.loc.numberFormatter(s).format(e);
  }
  formatDateTimeFromString(e, t) {
    const s = this.loc.listingMode() === "en", r = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", i = (f, p) => this.loc.extract(e, f, p), a = (f) => e.isOffsetFixed && e.offset === 0 && f.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, f.format) : "", o = () => s ? pr(e) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (f, p) => s ? Tr(e, f) : i(p ? { month: f } : { month: f, day: "numeric" }, "month"), u = (f, p) => s ? kr(e, f) : i(
      p ? { weekday: f } : { weekday: f, month: "long", day: "numeric" },
      "weekday"
    ), h = (f) => {
      const p = _.macroTokenToFormatOpts(f);
      return p ? this.formatWithSystemDefault(e, p) : f;
    }, m = (f) => s ? Sr(e, f) : i({ era: f }, "era"), v = (f) => {
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
          return h(f);
      }
    };
    return on(_.parseFormat(t), v);
  }
  formatDurationFromString(e, t) {
    const s = (l) => {
      switch (l[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, r = (l) => (u) => {
      const h = s(u);
      return h ? this.num(l.get(h), u.length) : u;
    }, i = _.parseFormat(t), a = i.reduce(
      (l, { literal: u, val: h }) => u ? l : l.concat(h),
      []
    ), o = e.shiftTo(...a.map(s).filter((l) => l));
    return on(i, r(o));
  }
}
const us = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Ce(...n) {
  const e = n.reduce((t, s) => t + s.source, "");
  return RegExp(`^${e}$`);
}
function be(...n) {
  return (e) => n.reduce(
    ([t, s, r], i) => {
      const [a, o, l] = i(e, r);
      return [{ ...t, ...a }, o || s, l];
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
function cs(...n) {
  return (e, t) => {
    const s = {};
    let r;
    for (r = 0; r < n.length; r++)
      s[n[r]] = ae(e[t + r]);
    return [s, null, t + r];
  };
}
const ds = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, Mr = `(?:${ds.source}?(?:\\[(${us.source})\\])?)?`, _t = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, fs = RegExp(`${_t.source}${Mr}`), Zt = RegExp(`(?:T${fs.source})?`), Er = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, xr = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Ir = /(\d{4})-?(\d{3})/, Nr = cs("weekYear", "weekNumber", "weekDay"), Cr = cs("year", "ordinal"), br = /(\d{4})-(\d\d)-(\d\d)/, hs = RegExp(
  `${_t.source} ?(?:${ds.source}|(${us.source}))?`
), Vr = RegExp(`(?: ${hs.source})?`);
function Ie(n, e, t) {
  const s = n[e];
  return g(s) ? t : ae(s);
}
function Fr(n, e) {
  return [{
    year: Ie(n, e),
    month: Ie(n, e + 1, 1),
    day: Ie(n, e + 2, 1)
  }, null, e + 3];
}
function Fe(n, e) {
  return [{
    hours: Ie(n, e, 0),
    minutes: Ie(n, e + 1, 0),
    seconds: Ie(n, e + 2, 0),
    milliseconds: Lt(n[e + 3])
  }, null, e + 4];
}
function Ue(n, e) {
  const t = !n[e] && !n[e + 1], s = ft(n[e + 1], n[e + 2]), r = t ? null : Z.instance(s);
  return [{}, r, e + 3];
}
function He(n, e) {
  const t = n[e] ? ne.create(n[e]) : null;
  return [{}, t, e + 1];
}
const Wr = RegExp(`^T?${_t.source}$`), Lr = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function $r(n) {
  const [e, t, s, r, i, a, o, l, u] = n, h = e[0] === "-", m = l && l[0] === "-", v = (f, p = !1) => f !== void 0 && (p || f && h) ? -f : f;
  return [
    {
      years: v(he(t)),
      months: v(he(s)),
      weeks: v(he(r)),
      days: v(he(i)),
      hours: v(he(a)),
      minutes: v(he(o)),
      seconds: v(he(l), l === "-0"),
      milliseconds: v(Lt(u), m)
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
function zt(n, e, t, s, r, i, a) {
  const o = {
    year: e.length === 2 ? Ct(ae(e)) : ae(e),
    month: ns.indexOf(t) + 1,
    day: ae(s),
    hour: ae(r),
    minute: ae(i)
  };
  return a && (o.second = ae(a)), n && (o.weekday = n.length > 3 ? rs.indexOf(n) + 1 : is.indexOf(n) + 1), o;
}
const Zr = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function zr(n) {
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
    h,
    m
  ] = n, v = zt(e, r, s, t, i, a, o);
  let f;
  return l ? f = _r[l] : u ? f = 0 : f = ft(h, m), [v, new Z(f)];
}
function Ar(n) {
  return n.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const Rr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, Ur = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Hr = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function ln(n) {
  const [, e, t, s, r, i, a, o] = n;
  return [zt(e, r, s, t, i, a, o), Z.utcInstance];
}
function qr(n) {
  const [, e, t, s, r, i, a, o] = n;
  return [zt(e, o, t, s, r, i, a), Z.utcInstance];
}
const Yr = Ce(Er, Zt), Pr = Ce(xr, Zt), Gr = Ce(Ir, Zt), Jr = Ce(fs), ms = be(
  Fr,
  Fe,
  Ue,
  He
), Br = be(
  Nr,
  Fe,
  Ue,
  He
), jr = be(
  Cr,
  Fe,
  Ue,
  He
), Kr = be(
  Fe,
  Ue,
  He
);
function Qr(n) {
  return Ve(
    n,
    [Yr, ms],
    [Pr, Br],
    [Gr, jr],
    [Jr, Kr]
  );
}
function Xr(n) {
  return Ve(Ar(n), [Zr, zr]);
}
function ei(n) {
  return Ve(
    n,
    [Rr, ln],
    [Ur, ln],
    [Hr, qr]
  );
}
function ti(n) {
  return Ve(n, [Lr, $r]);
}
const ni = be(Fe);
function si(n) {
  return Ve(n, [Wr, ni]);
}
const ri = Ce(br, Vr), ii = Ce(hs), ai = be(
  Fe,
  Ue,
  He
);
function oi(n) {
  return Ve(
    n,
    [ri, ms],
    [ii, ai]
  );
}
const un = "Invalid Duration", ys = {
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
}, li = {
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
  ...ys
}, U = 146097 / 400, Te = 146097 / 4800, ui = {
  years: {
    quarters: 4,
    months: 12,
    weeks: U / 7,
    days: U,
    hours: U * 24,
    minutes: U * 24 * 60,
    seconds: U * 24 * 60 * 60,
    milliseconds: U * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: U / 28,
    days: U / 4,
    hours: U * 24 / 4,
    minutes: U * 24 * 60 / 4,
    seconds: U * 24 * 60 * 60 / 4,
    milliseconds: U * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: Te / 7,
    days: Te,
    hours: Te * 24,
    minutes: Te * 24 * 60,
    seconds: Te * 24 * 60 * 60,
    milliseconds: Te * 24 * 60 * 60 * 1e3
  },
  ...ys
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
], ci = ye.slice(0).reverse();
function re(n, e, t = !1) {
  const s = {
    values: t ? e.values : { ...n.values, ...e.values || {} },
    loc: n.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || n.conversionAccuracy,
    matrix: e.matrix || n.matrix
  };
  return new D(s);
}
function gs(n, e) {
  let t = e.milliseconds ?? 0;
  for (const s of ci.slice(1))
    e[s] && (t += e[s] * n[s].milliseconds);
  return t;
}
function cn(n, e) {
  const t = gs(n, e) < 0 ? -1 : 1;
  ye.reduceRight((s, r) => {
    if (g(e[r]))
      return s;
    if (s) {
      const i = e[s] * t, a = n[r][s], o = Math.floor(i / a);
      e[r] += o * t, e[s] -= o * a * t;
    }
    return r;
  }, null), ye.reduce((s, r) => {
    if (g(e[r]))
      return s;
    if (s) {
      const i = e[s] % 1;
      e[s] -= i, e[r] += i * n[s][r];
    }
    return r;
  }, null);
}
function di(n) {
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
    let s = t ? ui : li;
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
      throw new $(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new D({
      values: ot(e, D.normalizeUnit),
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
    if (le(e))
      return D.fromMillis(e);
    if (D.isDuration(e))
      return e;
    if (typeof e == "object")
      return D.fromObject(e);
    throw new $(
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
    const [s] = ti(e);
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
    const [s] = si(e);
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
      throw new $("need to specify a reason the Duration is invalid");
    const s = e instanceof J ? e : new J(e, t);
    if (C.throwOnInvalid)
      throw new Ls(s);
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
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(e, t = {}) {
    const s = {
      ...t,
      floor: t.round !== !1 && t.floor !== !1
    };
    return this.isValid ? _.create(this.loc, s).formatDurationFromString(this, e) : un;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(e = {}) {
    if (!this.isValid) return un;
    const t = ye.map((s) => {
      const r = this.values[s];
      return g(r) ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: s.slice(0, -1) }).format(r);
    }).filter((s) => s);
    return this.loc.listFormatter({ type: "conjunction", style: e.listStyle || "narrow", ...e }).format(t);
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
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += $t(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
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
    }, d.fromMillis(t, { zone: "UTC" }).toISOTime(e));
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
    return this.isValid ? gs(this.matrix, this.values) : NaN;
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
    for (const r of ye)
      (Ne(t.values, r) || Ne(this.values, r)) && (s[r] = t.get(r) + this.get(r));
    return re(this, { values: s }, !0);
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
      t[s] = ts(e(this.values[s], s));
    return re(this, { values: t }, !0);
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
    const t = { ...this.values, ...ot(e, D.normalizeUnit) };
    return re(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: s, matrix: r } = {}) {
    const a = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: r, conversionAccuracy: s };
    return re(this, a);
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
    return cn(this.matrix, e), re(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = di(this.normalize().shiftToAll().toObject());
    return re(this, { values: e }, !0);
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
    for (const a of ye)
      if (e.indexOf(a) >= 0) {
        i = a;
        let o = 0;
        for (const u in s)
          o += this.matrix[u][a] * s[u], s[u] = 0;
        le(r[a]) && (o += r[a]);
        const l = Math.trunc(o);
        t[a] = l, s[a] = (o * 1e3 - l * 1e3) / 1e3;
      } else le(r[a]) && (s[a] = r[a]);
    for (const a in s)
      s[a] !== 0 && (t[i] += a === i ? s[a] : s[a] / this.matrix[i][a]);
    return cn(this.matrix, t), re(this, { values: t }, !0);
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
    return re(this, { values: e }, !0);
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
const Se = "Invalid Interval";
function fi(n, e) {
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
      throw new $("need to specify a reason the Interval is invalid");
    const s = e instanceof J ? e : new J(e, t);
    if (C.throwOnInvalid)
      throw new Ws(s);
    return new I({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const s = We(e), r = We(t), i = fi(s, r);
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
    const s = D.fromDurationLike(t), r = We(e);
    return I.fromDateTimes(r, r.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const s = D.fromDurationLike(t), r = We(e);
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
      let i, a;
      try {
        i = d.fromISO(s, t), a = i.isValid;
      } catch {
        a = !1;
      }
      let o, l;
      try {
        o = d.fromISO(r, t), l = o.isValid;
      } catch {
        l = !1;
      }
      if (a && l)
        return I.fromDateTimes(i, o);
      if (a) {
        const u = D.fromISO(r, t);
        if (u.isValid)
          return I.after(i, u);
      } else if (l) {
        const u = D.fromISO(s, t);
        if (u.isValid)
          return I.before(o, u);
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
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
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
    const t = e.map(We).filter((a) => this.contains(a)).sort((a, o) => a.toMillis() - o.toMillis()), s = [];
    let { s: r } = this, i = 0;
    for (; r < this.e; ) {
      const a = t[i] || this.e, o = +a > +this.e ? this.e : a;
      s.push(I.fromDateTimes(r, o)), r = o, i += 1;
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
      i = +o > +this.e ? this.e : o, a.push(I.fromDateTimes(s, i)), s = i, r += 1;
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
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
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
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : Se;
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
  toLocaleString(e = rt, t = {}) {
    return this.isValid ? _.create(this.s.loc.clone(t), e).formatInterval(this) : Se;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : Se;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : Se;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : Se;
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
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : Se;
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
    return I.fromDateTimes(e(this.s), e(this.e));
  }
}
class Ge {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = C.defaultZone) {
    const t = d.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return ne.isValidZone(e);
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
    return oe(e, C.defaultZone);
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
    return { relative: Qn(), localeWeek: Xn() };
  }
}
function dn(n, e) {
  const t = (r) => r.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = t(e) - t(n);
  return Math.floor(D.fromMillis(s).as("days"));
}
function hi(n, e, t) {
  const s = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const h = dn(l, u);
        return (h - h % 7) / 7;
      }
    ],
    ["days", dn]
  ], r = {}, i = n;
  let a, o;
  for (const [l, u] of s)
    t.indexOf(l) >= 0 && (a = l, r[l] = u(n, e), o = i.plus(r), o > e ? (r[l]--, n = i.plus(r), n > e && (o = n, r[l]--, n = i.plus(r))) : n = o);
  return [n, r, o, a];
}
function mi(n, e, t, s) {
  let [r, i, a, o] = hi(n, e, t);
  const l = e - r, u = t.filter(
    (m) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(m) >= 0
  );
  u.length === 0 && (a < e && (a = r.plus({ [o]: 1 })), a !== r && (i[o] = (i[o] || 0) + l / (a - r)));
  const h = D.fromObject(i, s);
  return u.length > 0 ? D.fromMillis(l, s).shiftTo(...u).plus(h) : h;
}
const yi = "missing Intl.DateTimeFormat.formatToParts support";
function M(n, e = (t) => t) {
  return { regex: n, deser: ([t]) => e(rr(t)) };
}
const gi = " ", ws = `[ ${gi}]`, vs = new RegExp(ws, "g");
function wi(n) {
  return n.replace(/\./g, "\\.?").replace(vs, ws);
}
function fn(n) {
  return n.replace(/\./g, "").replace(vs, " ").toLowerCase();
}
function G(n, e) {
  return n === null ? null : {
    regex: RegExp(n.map(wi).join("|")),
    deser: ([t]) => n.findIndex((s) => fn(t) === fn(s)) + e
  };
}
function hn(n, e) {
  return { regex: n, deser: ([, t, s]) => ft(t, s), groups: e };
}
function Je(n) {
  return { regex: n, deser: ([e]) => e };
}
function vi(n) {
  return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function pi(n, e) {
  const t = P(e), s = P(e, "{2}"), r = P(e, "{3}"), i = P(e, "{4}"), a = P(e, "{6}"), o = P(e, "{1,2}"), l = P(e, "{1,3}"), u = P(e, "{1,6}"), h = P(e, "{1,9}"), m = P(e, "{2,4}"), v = P(e, "{4,6}"), f = (S) => ({ regex: RegExp(vi(S.val)), deser: ([L]) => L, literal: !0 }), b = ((S) => {
    if (n.literal)
      return f(S);
    switch (S.val) {
      case "G":
        return G(e.eras("short"), 0);
      case "GG":
        return G(e.eras("long"), 0);
      case "y":
        return M(u);
      case "yy":
        return M(m, Ct);
      case "yyyy":
        return M(i);
      case "yyyyy":
        return M(v);
      case "yyyyyy":
        return M(a);
      case "M":
        return M(o);
      case "MM":
        return M(s);
      case "MMM":
        return G(e.months("short", !0), 1);
      case "MMMM":
        return G(e.months("long", !0), 1);
      case "L":
        return M(o);
      case "LL":
        return M(s);
      case "LLL":
        return G(e.months("short", !1), 1);
      case "LLLL":
        return G(e.months("long", !1), 1);
      case "d":
        return M(o);
      case "dd":
        return M(s);
      case "o":
        return M(l);
      case "ooo":
        return M(r);
      case "HH":
        return M(s);
      case "H":
        return M(o);
      case "hh":
        return M(s);
      case "h":
        return M(o);
      case "mm":
        return M(s);
      case "m":
        return M(o);
      case "q":
        return M(o);
      case "qq":
        return M(s);
      case "s":
        return M(o);
      case "ss":
        return M(s);
      case "S":
        return M(l);
      case "SSS":
        return M(r);
      case "u":
        return Je(h);
      case "uu":
        return Je(o);
      case "uuu":
        return M(t);
      case "a":
        return G(e.meridiems(), 0);
      case "kkkk":
        return M(i);
      case "kk":
        return M(m, Ct);
      case "W":
        return M(o);
      case "WW":
        return M(s);
      case "E":
      case "c":
        return M(t);
      case "EEE":
        return G(e.weekdays("short", !1), 1);
      case "EEEE":
        return G(e.weekdays("long", !1), 1);
      case "ccc":
        return G(e.weekdays("short", !0), 1);
      case "cccc":
        return G(e.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return hn(new RegExp(`([+-]${o.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return hn(new RegExp(`([+-]${o.source})(${s.source})?`), 2);
      case "z":
        return Je(/[a-z_+-/]{1,256}?/i);
      case " ":
        return Je(/[^\S\n\r]/);
      default:
        return f(S);
    }
  })(n) || {
    invalidReason: yi
  };
  return b.token = n, b;
}
const ki = {
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
function Ti(n, e, t) {
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
  let o = ki[a];
  if (typeof o == "object" && (o = o[i]), o)
    return {
      literal: !1,
      val: o
    };
}
function Si(n) {
  return [`^${n.map((t) => t.regex).reduce((t, s) => `${t}(${s.source})`, "")}$`, n];
}
function Oi(n, e, t) {
  const s = n.match(e);
  if (s) {
    const r = {};
    let i = 1;
    for (const a in t)
      if (Ne(t, a)) {
        const o = t[a], l = o.groups ? o.groups + 1 : 1;
        !o.literal && o.token && (r[o.token.val[0]] = o.deser(s.slice(i, i + l))), i += l;
      }
    return [s, r];
  } else
    return [s, {}];
}
function Di(n) {
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
  return g(n.z) || (t = ne.create(n.z)), g(n.Z) || (t || (t = new Z(n.Z)), s = n.Z), g(n.q) || (n.M = (n.q - 1) * 3 + 1), g(n.h) || (n.h < 12 && n.a === 1 ? n.h += 12 : n.h === 12 && n.a === 0 && (n.h = 0)), n.G === 0 && n.y && (n.y = -n.y), g(n.u) || (n.S = Lt(n.u)), [Object.keys(n).reduce((i, a) => {
    const o = e(a);
    return o && (i[o] = n[a]), i;
  }, {}), t, s];
}
let pt = null;
function Mi() {
  return pt || (pt = d.fromMillis(1555555555555)), pt;
}
function Ei(n, e) {
  if (n.literal)
    return n;
  const t = _.macroTokenToFormatOpts(n.val), s = Ss(t, e);
  return s == null || s.includes(void 0) ? n : s;
}
function ps(n, e) {
  return Array.prototype.concat(...n.map((t) => Ei(t, e)));
}
class ks {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = ps(_.parseFormat(t), e), this.units = this.tokens.map((s) => pi(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, r] = Si(this.units);
      this.regex = RegExp(s, "i"), this.handlers = r;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, s] = Oi(e, this.regex, this.handlers), [r, i, a] = s ? Di(s) : [null, null, void 0];
      if (Ne(s, "a") && Ne(s, "H"))
        throw new Ee(
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
function Ts(n, e, t) {
  return new ks(n, t).explainFromTokens(e);
}
function xi(n, e, t) {
  const { result: s, zone: r, specificOffset: i, invalidReason: a } = Ts(n, e, t);
  return [s, r, i, a];
}
function Ss(n, e) {
  if (!n)
    return null;
  const s = _.create(e, n).dtFormatter(Mi()), r = s.formatToParts(), i = s.resolvedOptions();
  return r.map((a) => Ti(a, n, i));
}
const kt = "Invalid DateTime", mn = 864e13;
function _e(n) {
  return new J("unsupported zone", `the zone "${n.name}" is not supported`);
}
function Tt(n) {
  return n.weekData === null && (n.weekData = it(n.c)), n.weekData;
}
function St(n) {
  return n.localWeekData === null && (n.localWeekData = it(
    n.c,
    n.loc.getMinDaysInFirstWeek(),
    n.loc.getStartOfWeek()
  )), n.localWeekData;
}
function me(n, e) {
  const t = {
    ts: n.ts,
    zone: n.zone,
    c: n.c,
    o: n.o,
    loc: n.loc,
    invalid: n.invalid
  };
  return new d({ ...t, ...e, old: t });
}
function Os(n, e, t) {
  let s = n - e * 60 * 1e3;
  const r = t.offset(s);
  if (e === r)
    return [s, e];
  s -= (r - e) * 60 * 1e3;
  const i = t.offset(s);
  return r === i ? [s, r] : [n - Math.min(r, i) * 60 * 1e3, Math.max(r, i)];
}
function Be(n, e) {
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
function et(n, e, t) {
  return Os(dt(n), e, t);
}
function yn(n, e) {
  const t = n.o, s = n.c.year + Math.trunc(e.years), r = n.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, i = {
    ...n.c,
    year: s,
    month: r,
    day: Math.min(n.c.day, at(s, r)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
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
  }).as("milliseconds"), o = dt(i);
  let [l, u] = Os(o, t, n.zone);
  return a !== 0 && (l += a, u = n.zone.offset(l)), { ts: l, o: u };
}
function Oe(n, e, t, s, r, i) {
  const { setZone: a, zone: o } = t;
  if (n && Object.keys(n).length !== 0 || e) {
    const l = e || o, u = d.fromObject(n, {
      ...t,
      zone: l,
      specificOffset: i
    });
    return a ? u : u.setZone(o);
  } else
    return d.invalid(
      new J("unparsable", `the input "${r}" can't be parsed as ${s}`)
    );
}
function je(n, e, t = !0) {
  return n.isValid ? _.create(E.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(n, e) : null;
}
function Ot(n, e) {
  const t = n.c.year > 9999 || n.c.year < 0;
  let s = "";
  return t && n.c.year >= 0 && (s += "+"), s += F(n.c.year, t ? 6 : 4), e ? (s += "-", s += F(n.c.month), s += "-", s += F(n.c.day)) : (s += F(n.c.month), s += F(n.c.day)), s;
}
function gn(n, e, t, s, r, i) {
  let a = F(n.c.hour);
  return e ? (a += ":", a += F(n.c.minute), (n.c.millisecond !== 0 || n.c.second !== 0 || !t) && (a += ":")) : a += F(n.c.minute), (n.c.millisecond !== 0 || n.c.second !== 0 || !t) && (a += F(n.c.second), (n.c.millisecond !== 0 || !s) && (a += ".", a += F(n.c.millisecond, 3))), r && (n.isOffsetFixed && n.offset === 0 && !i ? a += "Z" : n.o < 0 ? (a += "-", a += F(Math.trunc(-n.o / 60)), a += ":", a += F(Math.trunc(-n.o % 60))) : (a += "+", a += F(Math.trunc(n.o / 60)), a += ":", a += F(Math.trunc(n.o % 60)))), i && (a += "[" + n.zone.ianaName + "]"), a;
}
const Ds = {
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
}, Ni = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ms = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Ci = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], bi = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Vi(n) {
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
function wn(n) {
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
      return Vi(n);
  }
}
function Fi(n) {
  return nt[n] || (tt === void 0 && (tt = C.now()), nt[n] = n.offset(tt)), nt[n];
}
function vn(n, e) {
  const t = oe(e.zone, C.defaultZone);
  if (!t.isValid)
    return d.invalid(_e(t));
  const s = E.fromObject(e);
  let r, i;
  if (g(n.year))
    r = C.now();
  else {
    for (const l of Ms)
      g(n[l]) && (n[l] = Ds[l]);
    const a = jn(n) || Kn(n);
    if (a)
      return d.invalid(a);
    const o = Fi(t);
    [r, i] = et(n, o, t);
  }
  return new d({ ts: r, zone: t, loc: s, o: i });
}
function pn(n, e, t) {
  const s = g(t.round) ? !0 : t.round, r = (a, o) => (a = $t(a, s || t.calendary ? 0 : 2, !0), e.loc.clone(t).relFormatter(t).format(a, o)), i = (a) => t.calendary ? e.hasSame(n, a) ? 0 : e.startOf(a).diff(n.startOf(a), a).get(a) : e.diff(n, a).get(a);
  if (t.unit)
    return r(i(t.unit), t.unit);
  for (const a of t.units) {
    const o = i(a);
    if (Math.abs(o) >= 1)
      return r(o, a);
  }
  return r(n > e ? -0 : 0, t.units[t.units.length - 1]);
}
function kn(n) {
  let e = {}, t;
  return n.length > 0 && typeof n[n.length - 1] == "object" ? (e = n[n.length - 1], t = Array.from(n).slice(0, n.length - 1)) : t = Array.from(n), [e, t];
}
let tt, nt = {};
class d {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || C.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new J("invalid input") : null) || (t.isValid ? null : _e(t));
    this.ts = g(e.ts) ? C.now() : e.ts;
    let r = null, i = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [r, i] = [e.old.c, e.old.o];
      else {
        const o = le(e.o) && !e.old ? e.o : t.offset(this.ts);
        r = Be(this.ts, o), s = Number.isNaN(r.year) ? new J("invalid input") : null, r = s ? null : r, i = s ? null : o;
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
    return new d({});
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
    const [e, t] = kn(arguments), [s, r, i, a, o, l, u] = t;
    return vn({ year: s, month: r, day: i, hour: a, minute: o, second: l, millisecond: u }, e);
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
    const [e, t] = kn(arguments), [s, r, i, a, o, l, u] = t;
    return e.zone = Z.utcInstance, vn({ year: s, month: r, day: i, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const s = ur(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return d.invalid("invalid input");
    const r = oe(t.zone, C.defaultZone);
    return r.isValid ? new d({
      ts: s,
      zone: r,
      loc: E.fromObject(t)
    }) : d.invalid(_e(r));
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
    if (le(e))
      return e < -mn || e > mn ? d.invalid("Timestamp out of range") : new d({
        ts: e,
        zone: oe(t.zone, C.defaultZone),
        loc: E.fromObject(t)
      });
    throw new $(
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
    if (le(e))
      return new d({
        ts: e * 1e3,
        zone: oe(t.zone, C.defaultZone),
        loc: E.fromObject(t)
      });
    throw new $("fromSeconds requires a numerical input");
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
    const s = oe(t.zone, C.defaultZone);
    if (!s.isValid)
      return d.invalid(_e(s));
    const r = E.fromObject(t), i = ot(e, wn), { minDaysInFirstWeek: a, startOfWeek: o } = sn(i, r), l = C.now(), u = g(t.specificOffset) ? s.offset(l) : t.specificOffset, h = !g(i.ordinal), m = !g(i.year), v = !g(i.month) || !g(i.day), f = m || v, p = i.weekYear || i.weekNumber;
    if ((f || h) && p)
      throw new Ee(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (v && h)
      throw new Ee("Can't mix ordinal dates with month/day");
    const b = p || i.weekday && !f;
    let S, L, O = Be(l, u);
    b ? (S = Ci, L = Ii, O = it(O, a, o)) : h ? (S = bi, L = Ni, O = vt(O)) : (S = Ms, L = Ds);
    let W = !1;
    for (const w of S) {
      const y = i[w];
      g(y) ? W ? i[w] = L[w] : i[w] = O[w] : W = !0;
    }
    const A = b ? ar(i, a, o) : h ? or(i) : jn(i), z = A || Kn(i);
    if (z)
      return d.invalid(z);
    const we = b ? tn(i, a, o) : h ? nn(i) : i, [ve, x] = et(we, u, s), k = new d({
      ts: ve,
      zone: s,
      o: x,
      loc: r
    });
    return i.weekday && f && e.weekday !== k.weekday ? d.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${i.weekday} and a date of ${k.toISO()}`
    ) : k.isValid ? k : d.invalid(k.invalid);
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
    const [s, r] = Qr(e);
    return Oe(s, r, t, "ISO 8601", e);
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
    const [s, r] = Xr(e);
    return Oe(s, r, t, "RFC 2822", e);
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
    const [s, r] = ei(e);
    return Oe(s, r, t, "HTTP", t);
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
    if (g(e) || g(t))
      throw new $("fromFormat requires an input string and a format");
    const { locale: r = null, numberingSystem: i = null } = s, a = E.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    }), [o, l, u, h] = xi(a, e, t);
    return h ? d.invalid(h) : Oe(o, l, s, `format ${t}`, e, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, t, s = {}) {
    return d.fromFormat(e, t, s);
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
    const [s, r] = oi(e);
    return Oe(s, r, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new $("need to specify a reason the DateTime is invalid");
    const s = e instanceof J ? e : new J(e, t);
    if (C.throwOnInvalid)
      throw new Fs(s);
    return new d({ invalid: s });
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
    const s = Ss(e, E.fromObject(t));
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
    return ps(_.parseFormat(e), E.fromObject(t)).map((r) => r.val).join("");
  }
  static resetCache() {
    tt = void 0, nt = {};
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
    return this.isValid ? Tt(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? Tt(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? Tt(this).weekday : NaN;
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
    return this.isValid ? St(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? St(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? St(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? vt(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Ge.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Ge.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Ge.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Ge.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
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
    const e = 864e5, t = 6e4, s = dt(this.c), r = this.zone.offset(s - e), i = this.zone.offset(s + e), a = this.zone.offset(s - r * t), o = this.zone.offset(s - i * t);
    if (a === o)
      return [this];
    const l = s - a * t, u = s - o * t, h = Be(l, a), m = Be(u, o);
    return h.hour === m.hour && h.minute === m.minute && h.second === m.second && h.millisecond === m.millisecond ? [me(this, { ts: l }), me(this, { ts: u })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Re(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return at(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? xe(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? ze(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? ze(
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
    return this.setZone(Z.instance(e), t);
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
    if (e = oe(e, C.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let r = this.ts;
      if (t || s) {
        const i = e.offset(this.ts), a = this.toObject();
        [r] = et(a, i, e);
      }
      return me(this, { ts: r, zone: e });
    } else
      return d.invalid(_e(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: s } = {}) {
    const r = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: s });
    return me(this, { loc: r });
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
    const t = ot(e, wn), { minDaysInFirstWeek: s, startOfWeek: r } = sn(t, this.loc), i = !g(t.weekYear) || !g(t.weekNumber) || !g(t.weekday), a = !g(t.ordinal), o = !g(t.year), l = !g(t.month) || !g(t.day), u = o || l, h = t.weekYear || t.weekNumber;
    if ((u || a) && h)
      throw new Ee(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && a)
      throw new Ee("Can't mix ordinal dates with month/day");
    let m;
    i ? m = tn(
      { ...it(this.c, s, r), ...t },
      s,
      r
    ) : g(t.ordinal) ? (m = { ...this.toObject(), ...t }, g(t.day) && (m.day = Math.min(at(m.year, m.month), m.day))) : m = nn({ ...vt(this.c), ...t });
    const [v, f] = et(m, this.o, this.zone);
    return me(this, { ts: v, o: f });
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
    return me(this, yn(this, t));
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
    return me(this, yn(this, t));
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
    return this.isValid ? _.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : kt;
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
  toLocaleString(e = rt, t = {}) {
    return this.isValid ? _.create(this.loc.clone(t), e).formatDateTime(this) : kt;
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
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({
    format: e = "extended",
    suppressSeconds: t = !1,
    suppressMilliseconds: s = !1,
    includeOffset: r = !0,
    extendedZone: i = !1
  } = {}) {
    if (!this.isValid)
      return null;
    const a = e === "extended";
    let o = Ot(this, a);
    return o += "T", o += gn(this, a, t, s, r, i), o;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format: e = "extended" } = {}) {
    return this.isValid ? Ot(this, e === "extended") : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return je(this, "kkkk-'W'WW-c");
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
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: t = !1,
    includeOffset: s = !0,
    includePrefix: r = !1,
    extendedZone: i = !1,
    format: a = "extended"
  } = {}) {
    return this.isValid ? (r ? "T" : "") + gn(
      this,
      a === "extended",
      t,
      e,
      s,
      i
    ) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return je(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
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
    return je(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return this.isValid ? Ot(this, !0) : null;
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
    return (t || e) && (s && (r += " "), t ? r += "z" : e && (r += "ZZ")), je(this, r, !0);
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
    return this.isValid ? this.toISO() : kt;
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
   * Returns the epoch seconds of this DateTime.
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
    const r = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, i = cr(t).map(D.normalizeUnit), a = e.valueOf() > this.valueOf(), o = a ? this : e, l = a ? e : this, u = mi(o, l, i, r);
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
    return this.diff(d.now(), e, t);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
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
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
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
    const t = e.base || d.fromObject({}, { zone: this.zone }), s = e.padding ? this < t ? -e.padding : e.padding : 0;
    let r = ["years", "months", "days", "hours", "minutes", "seconds"], i = e.unit;
    return Array.isArray(e.unit) && (r = e.unit, i = void 0), pn(t, this.plus(s), {
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
    return this.isValid ? pn(e.base || d.fromObject({}, { zone: this.zone }), this, {
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
    if (!e.every(d.isDateTime))
      throw new $("min requires all arguments be DateTimes");
    return rn(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(d.isDateTime))
      throw new $("max requires all arguments be DateTimes");
    return rn(e, (t) => t.valueOf(), Math.max);
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
    const { locale: r = null, numberingSystem: i = null } = s, a = E.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    return Ts(a, e, t);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, t, s = {}) {
    return d.fromFormatExplain(e, t, s);
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
    return new ks(i, e);
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
    if (g(e) || g(t))
      throw new $(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: r = null, numberingSystem: i = null } = s, a = E.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    if (!a.equals(t.locale))
      throw new $(
        `fromFormatParser called with a locale of ${a}, but the format parser was created for ${t.locale}`
      );
    const { result: o, zone: l, specificOffset: u, invalidReason: h } = t.explainFromTokens(e);
    return h ? d.invalid(h) : Oe(
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
    return rt;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return xn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return $s;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return In;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Nn;
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
    return Vn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Fn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Wn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Ln;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return $n;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return _n;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Zn;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return zn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return An;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Rn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return _s;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Un;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Hn;
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
    return Yn;
  }
}
function We(n) {
  if (d.isDateTime(n))
    return n;
  if (n && n.valueOf && le(n.valueOf()))
    return d.fromJSDate(n);
  if (n && typeof n == "object")
    return d.fromObject(n);
  throw new $(
    `Unknown datetime argument: ${n}, of type ${typeof n}`
  );
}
function At() {
  const n = (t, s) => d.fromISO(t).setZone("utc").toLocaleString(s), e = Me(() => d.utc().toISODate());
  return {
    formatDate: n,
    todayUTC: e
  };
}
const Le = ee([]), ie = ee(d.utc());
C.defaultLocale = "es";
function Wi(n, e) {
  const { todayUTC: t } = At(), s = () => {
    const m = d.utc().startOf("week"), v = d.utc().endOf("week"), f = [];
    let p = m;
    for (; p <= v; )
      f.push(p.setLocale("es").toFormat("ccc")), p = p.plus({ days: 1 });
    return f;
  }, r = (m) => {
    const [v, f, p] = m.split("-").map(Number), b = d.utc().set({ year: v, month: f, day: p }), S = b.startOf("month"), L = b.endOf("month"), O = S.startOf("week"), W = L.endOf("week"), A = [];
    let z = O;
    for (; z <= W; )
      A.push(z.toISODate()), z = z.plus({ days: 1 });
    return A;
  }, i = (m, {
    startDate: v,
    endDate: f
  }) => {
    const p = d.fromISO(m), b = d.fromISO(v, { zone: "utc" }), S = d.fromISO(f, { zone: "utc" });
    return I.fromDateTimes(b, S).contains(p);
  }, a = (m) => r(m).map((v) => {
    const f = [], p = [], b = d.fromISO(v), S = d.fromISO(m);
    n.forEach((O) => {
      O.end_date && i(v, {
        startDate: O.start_date,
        endDate: O.end_date
      }) ? p.push({ ...O, start_date: v }) : p.push(O);
    });
    const L = p.filter((O) => b.hasSame(d.fromISO(O.start_date), "day"));
    return b.hasSame(S, "month") || f.push("other-month-date"), b.hasSame(d.fromISO(t.value), "day") && f.push("selected"), {
      day: v,
      class: f.join(" "),
      events: L || [],
      text: d.fromISO(v).day.toString()
    };
  });
  Tn(() => {
    Le.value = a(t.value);
  });
  const o = Me(() => d.fromJSDate(ie.value.toJSDate()).toFormat("MMMM yyyy"));
  return { nextMonth: () => {
    ie.value = ie.value.plus({ months: 1 });
    const m = d.fromJSDate(ie.value.toJSDate()).toFormat("yyyy-MM-dd");
    Le.value = a(m), e("nextMonth", m);
  }, prevMonth: () => {
    ie.value = ie.value.minus({ months: 1 });
    const m = d.fromJSDate(ie.value.toJSDate()).toFormat("yyyy-MM-dd");
    Le.value = a(m), e("prevMonth", m);
  }, toToday: () => {
    ie.value = d.utc(), Le.value = a(t.value), e("toToday", t.value);
  }, title: o, monthDays: Le, getWeekDays: s, generateCalendar: a };
}
const Li = ["open"], $i = /* @__PURE__ */ T("path", {
  class: "",
  fill: "currentColor",
  d: "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
}, null, -1), _i = [
  $i
], Zi = { class: "k-alendar-dialog-main" }, zi = /* @__PURE__ */ lt({
  __name: "KAlendarDialog",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Sn(n, "modelValue"), t = ee(null);
    On(e, (r) => {
      t.value && r ? t.value.showModal() : t.value && t.value.close();
    }), Tn(() => {
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
    return (r, i) => (N(), V("dialog", {
      ref_key: "dialog",
      ref: t,
      id: "k-alendar-dialog",
      "modal-mode": "mega",
      class: "k-alendar-dialog",
      open: e.value,
      onClick: Is(s, ["self"])
    }, [
      T("header", null, [
        yt(r.$slots, "header"),
        (N(), V("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "xmark",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 320 512",
          onClick: s
        }, _i))
      ]),
      T("article", Zi, [
        yt(r.$slots, "default")
      ]),
      T("footer", null, [
        yt(r.$slots, "footer")
      ])
    ], 8, Li));
  }
}), Ai = /* @__PURE__ */ lt({
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
    return (i, a) => (N(), V("li", {
      style: bt({
        "background-color": i.event.id === "more" ? "gray" : i.event.color ? i.event.color : "#374151"
      }),
      onClick: r
    }, [
      T("h3", null, te(i.event.title), 1)
    ], 4));
  }
}), Rt = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, r] of e)
    t[s] = r;
  return t;
}, Es = /* @__PURE__ */ Rt(Ai, [["__scopeId", "data-v-2ec57e40"]]), mt = (n) => (Dn("data-v-b4ada680"), n = n(), Mn(), n), Ri = {
  key: 0,
  class: "flex justify-between space-x-3"
}, Ui = /* @__PURE__ */ mt(() => /* @__PURE__ */ T("path", {
  class: "",
  fill: "currentColor",
  d: "M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
}, null, -1)), Hi = [
  Ui
], qi = /* @__PURE__ */ mt(() => /* @__PURE__ */ T("path", {
  class: "",
  fill: "currentColor",
  d: "M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
}, null, -1)), Yi = [
  qi
], Pi = { key: 1 }, Gi = ["datetime"], Ji = {
  key: 0,
  class: "k-alendar-event-detail-main-wrapper"
}, Bi = { class: "title" }, ji = { class: "dates" }, Ki = ["datetime"], Qi = {
  key: 0,
  class: "autor"
}, Xi = /* @__PURE__ */ mt(() => /* @__PURE__ */ T("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "far",
  "data-icon": "user",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512",
  "data-v-af0b188d": ""
}, [
  /* @__PURE__ */ T("path", {
    class: "",
    fill: "currentColor",
    d: "M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
  })
], -1)), ea = { class: "content" }, ta = /* @__PURE__ */ mt(() => /* @__PURE__ */ T("svg", {
  class: "h-5 w-5 text-gray-600 dark:text-gray-300",
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "far",
  "data-icon": "comment",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, [
  /* @__PURE__ */ T("path", {
    class: "",
    fill: "currentColor",
    d: "M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
  })
], -1)), na = { key: 1 }, sa = { class: "events" }, ra = /* @__PURE__ */ lt({
  __name: "KAlendarEventDetailDialog",
  props: /* @__PURE__ */ Ut({
    event: {},
    calendar: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ut(["edit", "delete"], ["update:modelValue"]),
  setup(n, { emit: e }) {
    const { formatDate: t } = At(), s = Sn(n, "modelValue"), r = ee(null), i = n, { event: a, calendar: o } = Ns(i), l = e, u = Me(() => {
      var O;
      return ((O = r.value) == null ? void 0 : O.id) === "more";
    });
    Cs(() => {
      r.value = a.value;
    });
    const h = () => {
      s.value = !1;
    }, m = () => {
      l("edit", { closeDialog: h, event: r.value });
    }, v = () => {
      l("delete", { closeDialog: h, event: r.value });
    }, f = Me(() => {
      var O;
      return (O = o.value) == null ? void 0 : O.events;
    }), p = Me(() => {
      var W;
      const O = (W = o.value) == null ? void 0 : W.day;
      return O ? t(O, d.DATE_FULL) : "";
    }), b = ({ event: O }) => {
      r.value = O;
    }, S = (O) => {
      const W = d.fromISO(O);
      return W.isValid && (W.hour !== 0 || W.minute !== 0 || W.second !== 0);
    }, L = Me(() => {
      if (!r.value || !r.value.start_date) return "";
      const O = S(r.value.start_date) ? d.DATETIME_MED : d.DATE_FULL;
      if (r.value.end_date) {
        const W = S(r.value.end_date) ? d.DATETIME_MED : d.DATE_FULL, A = t(r.value.start_date, O), z = t(r.value.end_date, W);
        return `${A} - ${z}`;
      }
      return `${t(r.value.start_date, O)}`;
    });
    return (O, W) => (N(), Dt(zi, {
      modelValue: s.value,
      "onUpdate:modelValue": W[0] || (W[0] = (A) => s.value = A)
    }, {
      header: Ht(() => [
        u.value ? (N(), V("div", Pi, [
          T("span", null, [
            T("time", { datetime: p.value }, te(p.value), 9, Gi)
          ])
        ])) : (N(), V("div", Ri, [
          (N(), V("svg", {
            class: "h-5 w-5 text-gray-600",
            "aria-hidden": "true",
            focusable: "false",
            "data-prefix": "far",
            "data-icon": "pen-to-square",
            role: "img",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 512 512",
            onClick: m
          }, Hi)),
          (N(), V("svg", {
            class: "h-5 w-5 text-gray-600",
            "aria-hidden": "true",
            focusable: "false",
            "data-prefix": "far",
            "data-icon": "trash-can",
            role: "img",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 448 512",
            onClick: v
          }, Yi))
        ]))
      ]),
      default: Ht(() => {
        var A, z, we, ve, x;
        return [
          u.value ? (N(), V("section", na, [
            T("div", sa, [
              T("ul", null, [
                (N(!0), V(Ke, null, Qe(f.value, (k) => (N(), Dt(Es, {
                  key: k.id,
                  event: k,
                  calendar: K(o),
                  onEventClicked: b
                }, null, 8, ["event", "calendar"]))), 128))
              ])
            ])
          ])) : (N(), V("section", Ji, [
            T("div", Bi, [
              (A = r.value) != null && A.color ? (N(), V("span", {
                key: 0,
                class: "circle",
                style: bt({ backgroundColor: r.value.color })
              }, null, 4)) : st("", !0),
              T("h2", null, te((z = r.value) == null ? void 0 : z.title), 1)
            ]),
            T("div", ji, [
              T("time", { datetime: L.value }, te(L.value), 9, Ki)
            ]),
            (we = r.value) != null && we.autor ? (N(), V("div", Qi, [
              Xi,
              T("p", null, te((ve = r.value) == null ? void 0 : ve.autor), 1)
            ])) : st("", !0),
            T("div", ea, [
              ta,
              T("p", null, te((x = r.value) == null ? void 0 : x.description), 1)
            ])
          ]))
        ];
      }),
      _: 1
    }, 8, ["modelValue"]));
  }
}), ia = /* @__PURE__ */ Rt(ra, [["__scopeId", "data-v-b4ada680"]]), aa = (n) => (Dn("data-v-7a2d2107"), n = n(), Mn(), n), oa = { class: "k-alendar-wrapper-container" }, la = { class: "k-alendar-header-container" }, ua = { class: "left-buttons" }, ca = { class: "navegation-buttons" }, da = { class: "center-title" }, fa = /* @__PURE__ */ aa(() => /* @__PURE__ */ T("div", { class: "right-buttons" }, null, -1)), ha = { class: "k-alendar-days-container" }, ma = { class: "k-alendar-container" }, ya = ["onClick"], ga = { class: "k-alendar-span-container" }, wa = { class: "k-alendar-text" }, va = {
  key: 0,
  class: "point"
}, pa = {
  key: 0,
  class: "events"
}, ka = /* @__PURE__ */ lt({
  __name: "KAlendar",
  props: {
    events: {}
  },
  emits: ["nextMonth", "prevMonth", "toToday", "edit", "delete"],
  setup(n, { emit: e }) {
    const t = e, s = n, { nextMonth: r, prevMonth: i, toToday: a, title: o, generateCalendar: l, monthDays: u, getWeekDays: h } = Wi(s.events, t), { todayUTC: m } = At();
    On(s.events, () => {
      u.value = l(m.value);
    });
    const v = ee({
      id: "",
      title: "",
      start_date: "",
      description: ""
    }), f = ee(null), p = ee({}), b = ee(!1), S = ee({ x: 0, y: 0 }), L = ({
      mauseEvent: x,
      event: k,
      calendar: w
    }) => {
      v.value = k, f.value = w;
      const y = 400;
      if (w.events.length > 0) {
        let ue = x.target;
        ue.tagName === "H3" && (ue = ue.parentElement);
        const j = ue.getBoundingClientRect(), Y = {
          x: j.right,
          y: j.bottom
        }, Q = {
          x: j.left - y,
          y: j.bottom
        }, qe = {
          x: j.right,
          y: j.top - y
        }, pe = {
          x: j.left - y,
          y: j.top - y
        }, { left: ke, bottom: ce, right: de, top: X } = A(ue);
        if (ke < y && (S.value = { x: Y.x, y: Y.y }), de < y && (S.value = { x: Q.x, y: Q.y }), ce < y && (S.value = { x: pe.x, y: pe.y }), X < y && (S.value = { x: Y.x, y: Y.y }), X < y && de < y && (S.value = { x: Q.x, y: Q.y }), ke < y && ce < y && (S.value = { x: qe.x, y: qe.y }), ke < y && ce < y && de < y) {
          const fe = y - de + 16;
          S.value = { x: Q.x + fe, y: pe.y };
        }
        if (ke < y && X < y && ce < y && de > y) {
          const fe = y - X + 16;
          S.value = {
            x: Y.x,
            y: pe.y + fe
          };
        }
        if (X < y && ce < y) {
          const fe = y - X + 16;
          S.value = {
            x: Y.x,
            y: pe.y + fe
          };
        }
        if (X < y && ce < y && de < y && ke > y) {
          const fe = y - X + 16;
          S.value = {
            x: Q.x,
            y: pe.y + fe
          };
        }
        ke > y && de > y && X > y && ce > y && (S.value = { x: Y.x, y: Y.y }), b.value = !0;
      }
    }, O = ({ closeDialog: x, event: k }) => {
      t("edit", { closeDialog: x, event: k });
    }, W = ({ closeDialog: x, event: k }) => {
      t("delete", { closeDialog: x, event: k });
    }, A = (x) => {
      const k = x.getBoundingClientRect();
      return {
        top: k.top,
        bottom: window.innerHeight - k.bottom,
        left: k.left,
        right: window.innerWidth - k.right
      };
    }, z = (x) => {
      var Q;
      const k = p.value[x];
      let w = 0;
      const y = 32, ue = 8, j = 8;
      let Y = 0;
      if (k) {
        w = k.clientHeight - j * 2;
        const qe = (Q = k.querySelector("span.k-alendar-text")) == null ? void 0 : Q.offsetHeight;
        w -= qe || 0, Y = Math.floor(
          w / (y + ue)
        );
      }
      return Y;
    }, we = (x, k) => {
      const w = z(x), y = k.slice(0, w);
      return k.length - w > 0 && y.splice(y.length - 1, 1, {
        id: "more",
        title: `+${k.length + 1 - w}`,
        start_date: "",
        description: ""
      }), y;
    }, ve = (x) => {
      if (window.innerWidth < 768) {
        const w = Math.floor((window.innerWidth - 400) / 2);
        S.value = { x: w, y: 16 }, x.events.length > 0 && (x.events.length === 1 ? v.value = x.events[0] : v.value = {
          id: "more",
          title: `+${x.events.length} eventos`,
          start_date: "",
          description: ""
        }, f.value = x, b.value = !0);
      }
    };
    return (x, k) => (N(), V("section", oa, [
      T("header", la, [
        T("div", ua, [
          T("div", ca, [
            T("button", {
              type: "button",
              class: "k-alendar-navegation-prev",
              onClick: k[0] || (k[0] = //@ts-ignore
              (...w) => K(i) && K(i)(...w))
            }, "←"),
            T("button", {
              type: "button",
              class: "k-alendar-navegation-left",
              onClick: k[1] || (k[1] = //@ts-ignore
              (...w) => K(r) && K(r)(...w))
            }, "→")
          ]),
          T("button", {
            type: "button",
            class: "k-alendar-today-button",
            onClick: k[2] || (k[2] = //@ts-ignore
            (...w) => K(a) && K(a)(...w))
          }, "Ahora"),
          T("div", da, [
            T("h2", null, te(K(o)), 1)
          ])
        ]),
        fa
      ]),
      T("div", ha, [
        (N(!0), V(Ke, null, Qe(K(h)(), (w) => (N(), V("div", { key: w }, te(w), 1))), 128))
      ]),
      T("div", ma, [
        (N(!0), V(Ke, null, Qe(K(u), (w) => (N(), V("div", {
          key: w.day.toString(),
          onClick: (y) => ve(w),
          class: bs([w.class, "date"]),
          ref_for: !0,
          ref: (y) => p.value[w.day] = y
        }, [
          T("div", ga, [
            T("span", wa, te(w.text), 1),
            w.events.length > 0 ? (N(), V("span", va)) : st("", !0)
          ]),
          w.events.length > 0 ? (N(), V("div", pa, [
            T("ul", null, [
              (N(!0), V(Ke, null, Qe(we(w.day, w.events), (y) => (N(), Dt(Es, {
                key: y.id,
                event: y,
                calendar: w,
                onEventClicked: L
              }, null, 8, ["event", "calendar"]))), 128))
            ])
          ])) : st("", !0)
        ], 10, ya))), 128))
      ]),
      Vs(ia, {
        modelValue: b.value,
        "onUpdate:modelValue": k[3] || (k[3] = (w) => b.value = w),
        event: v.value,
        calendar: f.value,
        onEdit: O,
        onDelete: W,
        style: bt({
          top: `${S.value.y}px`,
          left: `${S.value.x}px`
        })
      }, null, 8, ["modelValue", "event", "calendar", "style"])
    ]));
  }
}), Sa = /* @__PURE__ */ Rt(ka, [["__scopeId", "data-v-7a2d2107"]]);
export {
  Sa as KAlendar
};
