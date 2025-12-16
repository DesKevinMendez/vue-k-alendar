import { ref as H, readonly as q, computed as T, defineComponent as I, createElementBlock as w, openBlock as h, Fragment as $, renderList as E, normalizeClass as Q, unref as O, toDisplayString as M, watch as Z, createVNode as L, createElementVNode as S, normalizeStyle as U, createCommentVNode as z, createBlock as P } from "vue";
import { Settings as at, DateTime as e, Interval as st } from "luxon";
const nt = H("en"), rt = q(nt);
function x() {
  return {
    lang: rt,
    setLang: (v) => {
      nt.value = v, at.defaultLocale = v;
    }
  };
}
const G = H(e.now().toISODate() || "");
function N() {
  const { lang: V } = x(), v = (i) => {
    G.value = i;
  }, s = T(() => e.fromISO(G.value).setLocale(V.value).toFormat("dd MMMM yyyy"));
  return {
    currentDay: q(G),
    currentDayWithFormat: s,
    setCurrentDay: v
  };
}
const Y = H("calendar");
function B() {
  const V = (v) => {
    Y.value = v;
  };
  return {
    currentView: q(Y),
    setCurrentView: V
  };
}
const it = { class: "k-alendar-days-container" }, lt = ["onClick"], ct = /* @__PURE__ */ I({
  __name: "KWeekDays",
  emits: ["dateClicked"],
  setup(V, { emit: v }) {
    const { currentDay: s, setCurrentDay: i } = N(), { currentView: l } = B(), { lang: p } = x(), D = v, g = (f) => {
      i(f), D("dateClicked", f);
    }, m = () => {
      const f = e.fromISO(s.value).startOf("week"), c = e.fromISO(s.value).endOf("week"), n = [];
      let y = f;
      for (; y <= c; )
        n.push({
          text: y.setLocale(p.value).toFormat("ccc"),
          date: y.toISODate() || ""
        }), y = y.plus({ days: 1 });
      return n;
    };
    return (f, c) => (h(), w("div", it, [
      (h(!0), w($, null, E(m(), (n) => (h(), w("div", {
        onClick: (y) => g(n.date),
        key: n.date,
        class: Q({
          today: n.date === O(s) && O(l) === "day",
          "k-alendar-day": O(l) === "day"
        })
      }, M(n.text), 11, lt))), 128))
    ]));
  }
}), b = (V, v) => {
  const s = V.__vccOpts || V;
  for (const [i, l] of v)
    s[i] = l;
  return s;
}, ot = /* @__PURE__ */ b(ct, [["__scopeId", "data-v-2ca025f4"]]), dt = { class: "k-day-view-container" }, ut = { class: "k-day-view-events" }, ht = { class: "k-day-view-hour" }, mt = { class: "k-day-view-events-container" }, vt = ["calendar-hour-container"], yt = ["onClick"], _t = { class: "k-day-view-event-title" }, ft = { class: "k-day-view-event-time" }, wt = /* @__PURE__ */ I({
  __name: "KDayView",
  props: {
    events: {}
  },
  emits: ["event", "day"],
  setup(V, { emit: v }) {
    const s = V, i = v, { currentDay: l } = N(), p = T(() => s.events), D = T(() => p.value.slice().sort((u, a) => new Date(u.start_date).getTime() - new Date(a.start_date).getTime())), g = T(() => D.value.filter((u) => e.fromISO(u.start_date).toFormat("yyyy-MM-dd") === l.value)), m = T(() => {
      const u = {};
      for (let a = 0; a < 24; a++)
        u[a] = [];
      return g.value.forEach((a) => {
        const o = e.fromISO(a.start_date);
        if (o.isValid) {
          const d = o.hour;
          u[d].push(a);
        }
      }), Object.keys(u).forEach((a) => {
        const o = parseInt(a);
        u[o].sort((d, k) => {
          const C = e.fromISO(d.start_date), _ = e.fromISO(k.start_date);
          return C.toMillis() - _.toMillis();
        });
      }), Array.from({ length: 24 }, (a, o) => u[o]);
    }), f = (u, a, o) => {
      const d = e.fromISO(u.start_date);
      if (!d.isValid || d.hour !== a) return 0;
      const k = d.toMillis(), C = u.end_date ? e.fromISO(u.end_date).toMillis() : d.plus({ hours: 1 }).toMillis(), _ = m.value[a];
      let K = 0;
      for (let j = 0; j < o; j++) {
        const F = _[j], W = e.fromISO(F.start_date).toMillis(), J = F.end_date ? e.fromISO(F.end_date).toMillis() : e.fromISO(F.start_date).plus({ hours: 1 }).toMillis();
        k < J && C > W && K++;
      }
      return K * 70;
    }, c = (u) => {
      const a = e.fromISO(u.start_date);
      return a.isValid ? (a.minute + a.second / 60) / 60 * 100 : 0;
    }, n = (u, a) => {
      const o = e.fromISO(u.start_date), d = 100;
      if (!o.isValid) return d;
      const k = o.hour, C = o.minute + o.second / 60;
      if (k !== a)
        return 0;
      if (u.end_date) {
        const _ = e.fromISO(u.end_date);
        if (_.isValid && (_.hour !== 0 || _.minute !== 0 || _.second !== 0)) {
          const j = _.hour, F = _.minute + _.second / 60, W = k * 60 + C, J = j * 60 + F;
          return Math.max(J - W, 15) / 60 * 100;
        }
      }
      return d;
    }, y = (u) => {
      const a = e.fromISO(u.start_date);
      if (!a.isValid) return "";
      if (!(a.hour !== 0 || a.minute !== 0 || a.second !== 0)) return "All day";
      if (u.end_date) {
        const d = e.fromISO(u.end_date);
        if (d.isValid && (d.hour !== 0 || d.minute !== 0 || d.second !== 0))
          return `${a.toFormat("hh:mm a")} - ${d.toFormat("hh:mm a")}`;
      }
      return a.toFormat("hh:mm a");
    }, t = T(() => Array.from({ length: 24 }, (u, a) => {
      const o = a;
      return o === 0 ? "12:00 AM" : o < 12 ? `${o.toString().padStart(2, "0")}:00 AM` : o === 12 ? "12:00 PM" : `${(o - 12).toString().padStart(2, "0")}:00 PM`;
    }));
    Z(() => l.value, () => {
      i("day", l.value);
    }, { immediate: !0 });
    const r = (u) => {
      i("event", u);
    };
    return (u, a) => (h(), w("div", dt, [
      L(ot),
      S("section", ut, [
        S("div", ht, [
          (h(!0), w($, null, E(t.value, (o) => (h(), w("div", {
            class: "k-day-view-hour-slot",
            key: o
          }, [
            S("h2", null, M(o), 1)
          ]))), 128))
        ]),
        S("div", mt, [
          (h(!0), w($, null, E(t.value, (o, d) => (h(), w("div", {
            class: "k-day-view-event-slot",
            key: o,
            "calendar-hour-container": o
          }, [
            (h(!0), w($, null, E(m.value[d], (k, C) => (h(), w("div", {
              key: k.id,
              class: "k-day-view-event-item",
              style: U({
                backgroundColor: k.color || "#3b82f6",
                top: `${c(k)}%`,
                left: `${f(k, d, C)}px`,
                width: `calc(100% - ${f(k, d, C)}px)`,
                height: `${n(k, d)}%`,
                zIndex: 10 + C
              }),
              onClick: (_) => r(k)
            }, [
              S("h3", _t, M(k.title), 1),
              S("p", ft, M(y(k)), 1)
            ], 12, yt))), 128))
          ], 8, vt))), 128))
        ])
      ])
    ]));
  }
}), gt = /* @__PURE__ */ b(wt, [["__scopeId", "data-v-ec39ef41"]]);
function X() {
  const { lang: V } = x(), v = (i, l) => e.fromISO(i).setLocale(V.value).toLocaleString(l), s = T(() => e.now().toISODate());
  return {
    formatDate: v,
    today: s
  };
}
const Dt = H([]), tt = H([]), et = H(e.now()), pt = H(null);
function A() {
  const { today: V } = X(), { lang: v } = x(), s = T(() => tt.value.map((g) => ({
    ...g,
    date_calendar_to_render: g.start_date
  }))), i = (g) => {
    const [m, f, c] = g.split("-").map(Number), n = e.now().set({ year: m, month: f, day: c }), y = n.startOf("month"), t = n.endOf("month"), r = y.startOf("week"), u = t.endOf("week"), a = [];
    let o = r;
    for (; o <= u; )
      a.push(o.toISODate()), o = o.plus({ days: 1 });
    return a;
  }, l = (g, {
    startDate: m,
    endDate: f
  }) => {
    const c = e.fromISO(g), n = e.fromISO(m), y = e.fromISO(f);
    return st.fromDateTimes(n, y).contains(c);
  }, p = (g) => i(g).map((m) => {
    const f = [], c = [], n = e.fromISO(m), y = e.fromISO(g);
    s.value.forEach((r) => {
      r.end_date && l(m, {
        startDate: r.start_date,
        endDate: r.end_date
      }) ? c.push({ ...r, date_calendar_to_render: m }) : c.push(r);
    });
    const t = c.filter((r) => n.hasSame(e.fromISO(r.date_calendar_to_render), "day"));
    return n.hasSame(y, "month") || f.push("other-month-date"), n.hasSame(e.fromISO(V.value), "day") && f.push("selected"), {
      day: m,
      class: f.join(" "),
      events: t || [],
      text: e.fromISO(m).day.toString()
    };
  }), D = T(() => e.fromJSDate(et.value.toJSDate()).setLocale(v.value).toFormat("MMMM yyyy"));
  return {
    eventsToShowInCalendar: tt,
    calendarDaySelect: pt,
    title: D,
    monthDays: Dt,
    generateCalendar: p,
    currentDate: et
  };
}
const Vt = H({
  id: "",
  title: "",
  start_date: "",
  description: ""
});
function St() {
  return {
    eventSelected: Vt
  };
}
const kt = /* @__PURE__ */ I({
  __name: "KEventItem",
  props: {
    event: {},
    calendar: {}
  },
  emits: ["event"],
  setup(V, { emit: v }) {
    const s = v, i = V, l = T(() => i.event), p = (D) => {
      s("event", { mauseEvent: D, event: i.event, calendar: i.calendar });
    };
    return (D, g) => (h(), w("li", {
      style: U({
        "background-color": l.value.id === "more" ? "gray" : l.value.color ? l.value.color : "#374151"
      }),
      onClick: p
    }, [
      S("h3", null, M(l.value.title), 1)
    ], 4));
  }
}), Tt = /* @__PURE__ */ b(kt, [["__scopeId", "data-v-807583f7"]]), Mt = { class: "k-alendar-container" }, Ct = ["onClick"], Ot = { class: "k-alendar-span-container" }, It = { class: "k-alendar-text" }, bt = {
  key: 0,
  class: "point"
}, $t = {
  key: 0,
  class: "events"
}, Et = /* @__PURE__ */ I({
  __name: "KCalendar",
  emits: ["event", "events", "date"],
  setup(V, { emit: v }) {
    const { monthDays: s, calendarDaySelect: i } = A(), { eventSelected: l } = St(), p = v, D = H({}), g = (n) => {
      const y = window.innerWidth < 768;
      p("date", { day: n.day, events: n.events }), y && n.events.length > 0 && (n.events.length === 1 ? (l.value = n.events[0], n.events[0].id != "more" && p("event", n.events[0])) : (l.value = {
        id: "more",
        title: "",
        start_date: "",
        description: ""
      }, p("events", { events: n.events })), i.value = n);
    }, m = ({
      mauseEvent: n,
      event: y,
      calendar: t
    }) => {
      if (l.value = y, i.value = t, t.events.length > 0) {
        let r = n.target;
        r.tagName === "H3" && (r = r.parentElement);
      }
      y.id != "more" ? p("event", y) : p("events", { events: i.value.events });
    }, f = (n) => {
      var d;
      const y = D.value[n];
      let t = 0;
      const r = 32, u = 8, a = 8;
      let o = 0;
      if (y) {
        t = y.clientHeight - a * 2;
        const k = (d = y.querySelector("span.k-alendar-text")) == null ? void 0 : d.offsetHeight;
        t -= k || 0, o = Math.floor(
          t / (r + u)
        );
      }
      return o;
    }, c = (n, y) => {
      const t = f(n), r = y.slice(0, t);
      return y.length - t > 0 && r.splice(r.length - 1, 1, {
        id: "more",
        title: `+${y.length + 1 - t}`,
        start_date: "",
        description: ""
      }), r;
    };
    return (n, y) => (h(), w($, null, [
      L(ot),
      S("div", Mt, [
        (h(!0), w($, null, E(O(s), (t) => (h(), w("div", {
          key: t.day.toString(),
          onClick: (r) => g(t),
          class: Q([t.class, "date"]),
          ref_for: !0,
          ref: (r) => D.value[t.day] = r
        }, [
          S("div", Ot, [
            S("span", It, M(t.text), 1),
            t.events.length > 0 ? (h(), w("span", bt)) : z("", !0)
          ]),
          t.events.length > 0 ? (h(), w("div", $t, [
            S("ul", null, [
              (h(!0), w($, null, E(c(t.day, t.events), (r) => (h(), P(Tt, {
                key: r.id,
                event: r,
                calendar: t,
                onEvent: m
              }, null, 8, ["event", "calendar"]))), 128))
            ])
          ])) : z("", !0)
        ], 10, Ct))), 128))
      ])
    ], 64));
  }
}), Ht = /* @__PURE__ */ b(Et, [["__scopeId", "data-v-f872de1c"]]), xt = /* @__PURE__ */ I({
  __name: "ButtonNextMonth",
  emits: ["handle"],
  setup(V, { emit: v }) {
    const { currentDate: s, monthDays: i, generateCalendar: l } = A(), p = v, { currentView: D } = B(), { currentDay: g, setCurrentDay: m } = N(), f = () => {
      if (D.value === "day") {
        m(e.fromISO(g.value).plus({ days: 1 }).toISODate() || "");
        return;
      }
      s.value = s.value.plus({ months: 1 });
      const c = e.fromJSDate(s.value.toJSDate()).toFormat("yyyy-MM-dd");
      i.value = l(c), p("handle", c);
    };
    return (c, n) => (h(), w("button", {
      type: "button",
      class: "k-alendar-navegation-left",
      onClick: f
    }, "→"));
  }
}), Lt = /* @__PURE__ */ b(xt, [["__scopeId", "data-v-57d01dfc"]]), Nt = /* @__PURE__ */ I({
  __name: "ButtonPrevMonth",
  emits: ["handle"],
  setup(V, { emit: v }) {
    const s = v, { currentDate: i, monthDays: l, generateCalendar: p } = A(), { currentView: D } = B(), { currentDay: g, setCurrentDay: m } = N(), f = () => {
      if (D.value === "day") {
        m(e.fromISO(g.value).minus({ days: 1 }).toISODate() || "");
        return;
      }
      i.value = i.value.minus({ months: 1 });
      const c = e.fromJSDate(i.value.toJSDate()).toFormat("yyyy-MM-dd");
      l.value = p(c), s("handle", c);
    };
    return (c, n) => (h(), w("button", {
      type: "button",
      class: "k-alendar-navegation-prev",
      onClick: f
    }, "←"));
  }
}), Kt = /* @__PURE__ */ b(Nt, [["__scopeId", "data-v-60436416"]]), R = {
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
}, Ft = /* @__PURE__ */ I({
  __name: "ButtonTodayMonth",
  emits: ["handle"],
  setup(V, { emit: v }) {
    const s = v, { currentDate: i, monthDays: l, generateCalendar: p } = A(), { today: D } = X(), { lang: g } = x(), m = () => {
      i.value = e.now(), l.value = p(D.value), s("handle", D.value);
    }, f = T(() => R[g.value].buttons.today || "Today");
    return (c, n) => (h(), w("button", {
      type: "button",
      class: "k-alendar-today-button",
      onClick: m
    }, M(f.value), 1));
  }
}), zt = /* @__PURE__ */ b(Ft, [["__scopeId", "data-v-4da96950"]]), Bt = { class: "k-view-selector-container" }, At = ["onClick"], jt = /* @__PURE__ */ I({
  __name: "KViewSelector",
  setup(V) {
    const { lang: v } = x(), { setCurrentDay: s } = N(), { today: i } = X(), { currentView: l, setCurrentView: p } = B(), D = T(() => {
      const m = R[v.value] || R.en;
      return [
        { label: m.monthView, value: "calendar" },
        { label: m.dayView, value: "day" },
        { label: m.listView, value: "list" }
      ];
    }), g = (m) => {
      p(m), s(i.value);
    };
    return (m, f) => (h(), w("div", Bt, [
      (h(!0), w($, null, E(D.value, (c) => (h(), w("button", {
        key: c.value,
        onClick: (n) => g(c.value),
        class: Q([
          "k-view-selector-button",
          { "k-view-selector-button-active": O(l) === c.value }
        ])
      }, M(c.label), 11, At))), 128))
    ]));
  }
}), Rt = /* @__PURE__ */ b(jt, [["__scopeId", "data-v-16b9efd5"]]), Pt = { class: "k-alendar-header-container" }, Wt = { class: "left-buttons" }, Jt = { class: "navigation-buttons-group" }, Gt = { class: "title-and-controls" }, Zt = { class: "center-title" }, qt = { class: "right-controls" }, Qt = /* @__PURE__ */ I({
  __name: "KCalendarHeader",
  emits: ["handlePrevMonth", "handleNextMonth", "handleToToday"],
  setup(V, { emit: v }) {
    const { title: s } = A(), { currentView: i } = B(), { currentDayWithFormat: l } = N(), p = T(() => i.value === "day" ? l.value : s.value), D = v, g = (c) => {
      D("handlePrevMonth", c);
    }, m = (c) => {
      D("handleNextMonth", c);
    }, f = (c) => {
      D("handleToToday", c);
    };
    return (c, n) => (h(), w("header", Pt, [
      S("div", Wt, [
        S("div", Jt, [
          L(Kt, { onHandle: g }),
          L(Lt, { onHandle: m })
        ]),
        L(zt, { onHandle: f })
      ]),
      S("div", Gt, [
        S("div", Zt, [
          S("h2", null, M(p.value), 1)
        ]),
        S("div", qt, [
          L(Rt)
        ])
      ])
    ]));
  }
}), Ut = /* @__PURE__ */ b(Qt, [["__scopeId", "data-v-b96f8085"]]), Xt = { class: "k-list-calendar-container" }, Yt = { class: "day-header" }, te = { class: "day-header-full-date" }, ee = { class: "day-header-simple-date" }, ne = ["onClick"], oe = { class: "k-list-calendar-event-time" }, ae = { class: "k-list-calendar-event-title" }, se = { class: "k-list-calendar-event-title-container" }, re = { class: "k-list-calendar-event-title-text" }, ie = { class: "k-list-calendar-event-description" }, le = {
  key: 0,
  class: "nothing-to-show-message"
}, ce = /* @__PURE__ */ I({
  __name: "KListCalendar",
  props: {
    events: {}
  },
  emits: ["event"],
  setup(V, { emit: v }) {
    const { lang: s } = x(), i = V, l = T(() => i.events), p = v, D = T(() => l.value.slice().sort((t, r) => new Date(t.start_date).getTime() - new Date(r.start_date).getTime())), g = T(() => D.value.reduce((t, r) => (t[r.start_date] = [...t[r.start_date] || [], r], t), {})), m = (t) => e.fromISO(t).setLocale(s.value).toFormat("EEEE, dd MMMM yyyy"), f = (t) => e.fromISO(t).hour !== 0 || e.fromISO(t).minute !== 0 || e.fromISO(t).second !== 0, c = (t) => {
      var o;
      const r = t.start_date;
      if (!e.fromISO(r).isValid)
        return "-";
      if (!f(r))
        return ((o = R[s.value]) == null ? void 0 : o.allDay) || "All day";
      if (t.end_date) {
        const d = t.end_date, k = e.fromISO(d).isValid, C = f(d);
        if (k && C)
          return `${e.fromISO(r).toFormat("hh:mm a")} - ${e.fromISO(d).toFormat("hh:mm a")}`;
      }
      return e.fromISO(r).toFormat("hh:mm a");
    }, n = (t) => e.fromISO(t).toFormat("yyyy-MM-dd"), y = (t) => {
      p("event", t);
    };
    return (t, r) => {
      var u;
      return h(), w("div", Xt, [
        (h(!0), w($, null, E(Object.entries(g.value), ([a, o]) => (h(), w("div", { key: a }, [
          S("div", Yt, [
            S("p", te, M(m(a)), 1),
            S("h3", ee, M(n(a)), 1)
          ]),
          (h(!0), w($, null, E(o, (d) => (h(), w("div", {
            key: d.id,
            class: "k-list-calendar-event",
            onClick: (k) => y(d)
          }, [
            S("h4", oe, M(c(d)), 1),
            S("div", ae, [
              S("div", se, [
                d.color ? (h(), w("span", {
                  key: 0,
                  style: U({ backgroundColor: d.color }),
                  class: "k-list-calendar-event-title-color"
                }, null, 4)) : z("", !0),
                S("h2", re, M(d.title), 1)
              ]),
              S("p", ie, M(d.description), 1)
            ])
          ], 8, ne))), 128))
        ]))), 128)),
        l.value.length === 0 ? (h(), w("div", le, M(((u = O(R)[O(s)]) == null ? void 0 : u.nothingToShow) || "No events found"), 1)) : z("", !0)
      ]);
    };
  }
}), de = /* @__PURE__ */ b(ce, [["__scopeId", "data-v-253568a9"]]), ue = { class: "k-alendar-wrapper-container" }, he = /* @__PURE__ */ I({
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
    "events",
    "date",
    "day"
  ],
  setup(V, { emit: v }) {
    const s = v, i = V, { currentView: l, setCurrentView: p } = B();
    p(i.view || "calendar");
    const D = T(() => i.events), { setLang: g } = x(), { eventsToShowInCalendar: m, generateCalendar: f, monthDays: c, currentDate: n } = A(), { setCurrentDay: y } = N(), t = (_) => {
      s("prevMonth", _);
    }, r = (_) => {
      s("nextMonth", _);
    }, u = (_) => {
      y(_), s("toToday", _);
    }, a = () => {
      m.value = i.events, c.value = f(n.value.toFormat("yyyy-MM-dd"));
    };
    Z(
      () => i.lang,
      (_) => {
        _ && g(_);
      },
      { immediate: !0 }
    ), Z(
      i,
      ({ events: _ }) => {
        _ && a();
      },
      { immediate: !0, deep: !0 }
    );
    const o = (_) => {
      s("event", _);
    }, d = ({ events: _ }) => {
      s("events", _);
    }, k = ({ day: _, events: K }) => {
      s("date", { day: _, events: K });
    }, C = (_) => {
      s("day", _);
    };
    return (_, K) => (h(), w("section", ue, [
      L(Ut, {
        view: O(l),
        onHandlePrevMonth: t,
        onHandleNextMonth: r,
        onHandleToToday: u
      }, null, 8, ["view"]),
      O(l) === "calendar" ? (h(), P(Ht, {
        key: 0,
        onEvent: o,
        onEvents: d,
        onDate: k
      })) : O(l) === "list" ? (h(), P(de, {
        key: 1,
        events: D.value,
        onEvent: o
      }, null, 8, ["events"])) : z("", !0),
      O(l) === "day" ? (h(), P(gt, {
        key: 2,
        events: D.value,
        onEvent: o,
        onDay: C
      }, null, 8, ["events"])) : z("", !0)
    ]));
  }
}), _e = /* @__PURE__ */ b(he, [["__scopeId", "data-v-fbef979f"]]);
export {
  _e as KAlendar
};
