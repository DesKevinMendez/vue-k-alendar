import { View } from '../types/Calendar';
export default function (): {
    currentView: Readonly<import('vue').Ref<View, View>>;
    setCurrentView: (view: View) => void;
};
