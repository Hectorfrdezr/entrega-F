import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/Global.store"
import { Cart } from "./Cart";
import { Search } from "./Search";

export const Sheet = () => {

    const sheetContent = useGlobalStore(state => state.sheetContent);
    const closeSheet = useGlobalStore (state => state.closeSheet);

    const sheetRef = useRef<HTMLDivElement | null >(null)

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
    //funsion para desaparecer barra con click
    
    const handleOutsideClick = (event: MouseEvent)=>{
        if(sheetRef.current && !sheetRef.current.contains(event.target as Node)){
            closeSheet();
        }
    };

    //agregar listener

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('mousedown', handleOutsideClick);
    };
    },[closeSheet])

    //renderización

    const renderContent = () =>{
        switch(sheetContent){
            case 'cart':
                return <Cart/>;
            case 'search':
                return <Search/>;
            default: return null;    
        }
    };


  return (
    <div className="fixed inset-0  bg-[rgba(0,0,0,0.5)] border-spacing-0.5 z-50 flex justify-end animate-fade-in">
        <div ref={sheetRef} className="bg-white text-black h-screen w-[500px] shadow-lg animate-slide-in">
            {renderContent()}
        </div>
    </div>
  )
}
