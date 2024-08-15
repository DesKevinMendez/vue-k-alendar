import { Settings } from "luxon";
import { readonly, ref } from "vue";
const langCalendar = ref('en')
const lang = readonly(langCalendar)

export default function useConfig() {

  const setLang = (langStr: string) => {
    langCalendar.value = langStr;
    Settings.defaultLocale = langStr;
  }

  return {
    lang,
    setLang
  }
}