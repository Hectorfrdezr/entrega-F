import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type sheetContent = 'cart' | 'search' | null;

export interface GlobalState{
    isSheetOpen: boolean;
    sheetContent: sheetContent;
    activeNavMobile: boolean;    

openSheet: (content: sheetContent) => void;
closeSheet: () => void;
setActiveNavMobile: (active: boolean) => void;
};

const storeApi: StateCreator<GlobalState> = set => ({
    isSheetOpen: false,
    sheetContent: null,
    activeNavMobile: false,


    openSheet: (content) =>{

        set({isSheetOpen: true, sheetContent: content});
    },
    closeSheet: () => {
        set({isSheetOpen: false, sheetContent:null});
    },
    setActiveNavMobile: active =>{
        set({activeNavMobile: active});
    }
});

export const useGlobalStore = create<GlobalState>()(devtools(storeApi));