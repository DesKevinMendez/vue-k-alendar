export default function (): {
    currentDay: Readonly<import('vue').Ref<string, string>>;
    setCurrentDay: (date: string) => void;
};
