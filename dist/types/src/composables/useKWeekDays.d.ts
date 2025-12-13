export default function (): {
    currentDay: Readonly<import('vue').Ref<string, string>>;
    currentDayWithFormat: import('vue').ComputedRef<string>;
    setCurrentDay: (date: string) => void;
};
