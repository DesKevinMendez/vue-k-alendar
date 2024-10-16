import { KEvent } from '../types';
export default function useEvent(): {
    eventSelected: import('vue').Ref<{
        id: string;
        title: string;
        start_date: string;
        end_date?: string | null | undefined;
        description: string;
        autor?: string | undefined;
        color?: string | undefined;
    }, KEvent | {
        id: string;
        title: string;
        start_date: string;
        end_date?: string | null | undefined;
        description: string;
        autor?: string | undefined;
        color?: string | undefined;
    }>;
};
