export default function useConfig(): {
    lang: Readonly<import('vue').Ref<string, string>>;
    setLang: (langStr: string) => void;
};
