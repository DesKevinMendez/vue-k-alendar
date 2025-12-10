export type Translations = {
  dayView: string;
  monthView: string;
  allDay: string;
  nothingToShow: string;
  buttons: {
    today: string;
  };
};

export const translations: Record<string, Translations> = {
  en: {
    dayView: 'Day',
    monthView: 'Month',
    allDay: 'All day',
    nothingToShow: 'No events found',
    buttons: {
      today: 'Today',
    }
  },
  es: {
    dayView: 'Día',
    monthView: 'Mes',
    allDay: 'Todo el día',
    nothingToShow: 'No se encontraron eventos',
    buttons: {
      today: 'Hoy',
    }
  },
  fr: {
    dayView: 'Jour',
    monthView: 'Mois',
    allDay: 'Toute la journée',
    nothingToShow: 'Aucun événement trouvé',
    buttons: {
      today: 'Aujourd\'hui',
    }
  },
  it: {
    dayView: 'Giorno',
    monthView: 'Mese',
    allDay: 'Tutto il giorno',
    nothingToShow: 'Nessun evento trovato',
    buttons: {
      today: 'Oggi',
    }
  },
  de: {
    dayView: 'Tag',
    monthView: 'Monat',
    allDay: 'Ganztägig',
    nothingToShow: 'Keine Ereignisse gefunden',
    buttons: {
      today: 'Heute',
    }
  },
  pt: {
    dayView: 'Dia',
    monthView: 'Mês',
    allDay: 'Dia inteiro',
    nothingToShow: 'Nenhum evento encontrado',
    buttons: {
      today: 'Hoje',
    }
  },
  nl: {
    dayView: 'Dag',
    monthView: 'Maand',
    allDay: 'Hele dag',
    nothingToShow: 'Geen evenementen gevonden',
    buttons: {
      today: 'Vandaag',
    }
  },
  ru: {
    dayView: 'День',
    monthView: 'Месяц',
    allDay: 'Весь день',
    nothingToShow: 'События не найдены',
    buttons: {
      today: 'Сегодня',
    }
  },
  ja: {
    dayView: '日',
    monthView: '月',
    allDay: '終日',
    nothingToShow: 'イベントが見つかりませんでした',
    buttons: {
      today: '今日',
    }
  },
  zh: {
    dayView: '日',
    monthView: '月',
    allDay: '全天',
    nothingToShow: '未找到事件',
    buttons: {
      today: '今天',
    }
  },
  ko: {
    dayView: '일',
    monthView: '월',
    allDay: '하루 종일',
    nothingToShow: '이벤트를 찾을 수 없습니다',
    buttons: {
      today: '오늘',
    }
  },
  ar: {
    dayView: 'يوم',
    monthView: 'شهر',
    allDay: 'طوال اليوم',
    nothingToShow: 'لم يتم العثور على أحداث',
    buttons: {
      today: 'اليوم',
    }
  },
  he: {
    dayView: 'יום',
    monthView: 'חודש',
    allDay: 'כל היום',
    nothingToShow: 'לא נמצאו אירועים',
    buttons: {
      today: 'היום',
    }
  },
  id: {
    dayView: 'Hari',
    monthView: 'Bulan',
    allDay: 'Sepanjang hari',
    nothingToShow: 'Tidak ada acara yang ditemukan',
    buttons: {
      today: 'Hari ini',
    }
  },
  tr: {
    dayView: 'Gün',
    monthView: 'Ay',
    allDay: 'Tüm gün',
    nothingToShow: 'Etkinlik bulunamadı',
    buttons: {
      today: 'Bugün',
    }
  },
  vi: {
    dayView: 'Ngày',
    monthView: 'Tháng',
    allDay: 'Cả ngày',
    nothingToShow: 'Không tìm thấy sự kiện',
    buttons: {
      today: 'Hôm nay',
    }
  },
  th: {
    dayView: 'วัน',
    monthView: 'เดือน',
    allDay: 'ทั้งวัน',
    nothingToShow: 'ไม่พบเหตุการณ์',
    buttons: {
      today: 'วันนี้',
    }
  },
  pl: {
    dayView: 'Dzień',
    monthView: 'Miesiąc',
    allDay: 'Cały dzień',
    nothingToShow: 'Nie znaleziono wydarzeń',
    buttons: {
      today: 'Dzisiaj',
    }
  },
  hu: {
    dayView: 'Nap',
    monthView: 'Hónap',
    allDay: 'Egész nap',
    nothingToShow: 'Nem találhatók események',
    buttons: {
      today: 'Ma',
    }
  },
  cs: {
    dayView: 'Den',
    monthView: 'Měsíc',
    allDay: 'Celý den',
    nothingToShow: 'Nebyly nalezeny žádné události',
    buttons: {
      today: 'Dnes',
    }
  },
  sk: {
    dayView: 'Deň',
    monthView: 'Mesiac',
    allDay: 'Celý deň',
    nothingToShow: 'Nenašli sa žiadne udalosti',
    buttons: {
      today: 'Dnes',
    }
  },
  hr: {
    dayView: 'Dan',
    monthView: 'Mjesec',
    allDay: 'Cijeli dan',
    nothingToShow: 'Nisu pronađeni događaji',
    buttons: {
      today: 'Danas',
    }
  },
  ro: {
    dayView: 'Zi',
    monthView: 'Lună',
    allDay: 'Toată ziua',
    nothingToShow: 'Nu s-au găsit evenimente',
    buttons: {
      today: 'Astăzi',
    }
  },
  bg: {
    dayView: 'Ден',
    monthView: 'Месец',
    allDay: 'Цял ден',
    nothingToShow: 'Не са намерени събития',
    buttons: {
      today: 'Днес',
    }
  },
  sl: {
    dayView: 'Dan',
    monthView: 'Mesec',
    allDay: 'Ves dan',
    nothingToShow: 'Ni dogodkov ni najdenih',
    buttons: {
      today: 'Danes',
    }
  },
  et: {
    dayView: 'Päev',
    monthView: 'Kuu',
    allDay: 'Kogu päev',
    nothingToShow: 'Sündmusi ei leitud',
    buttons: {
      today: 'Täna',
    }
  },
};