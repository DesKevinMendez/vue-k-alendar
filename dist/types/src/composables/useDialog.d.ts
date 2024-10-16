export declare function useDialog(): {
    collision: (target: HTMLElement) => {
        x: number;
        y: number;
    };
    openEventsDetailDialog: import('vue').Ref<boolean, boolean>;
    dialogPositionToRender: import('vue').Ref<{
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    } | {
        x: number;
        y: number;
    }>;
    closeDialog: () => void;
};
