import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ICartItem } from "../components/shared/CartItem";

export interface CartState{
    items: ICartItem[];
    totalItemsInCart: number;
    totalAmount:number;
  
    addItem:(item:ICartItem)=> void;
    removeItem:(variantId:string) => void;
    updateQuantity: (variantId:string, quantity: number)=> void;
    cleanCart: () => void;
};

const StoreApi: StateCreator<CartState> = set =>({

    items: [],
    totalItemsInCart: 0,
    totalAmount: 0,

    addItem:item =>{
        set(state => {
            const existingitemIndex = state.items.findIndex(i => i.variantId === item.variantId);

            let updateItems;

           if(existingitemIndex >=0){
            updateItems = state.items.map((i,index) => index === existingitemIndex ? {...i,quantity: i.quantity + item.quantity}: i);
           } else{
                updateItems = [...state.items, item];
           }
           const newTotalItems = updateItems.reduce((acc, i)=> acc + i.quantity, 0);

           const newTotalAmount = updateItems.reduce((acc, i)=> acc + i.price * i.quantity, 0);

           return{
                items: updateItems,
                totalItemsInCart:newTotalItems,
                totalAmount:newTotalAmount,
           }
        })
    },
    
    removeItem:VariantId =>{
        set(state => {

            const updateItems = state.items.filter(i => i.variantId !== VariantId)

             const newTotalItems = updateItems.reduce((acc, i)=> acc + i.quantity, 0);

           const newTotalAmount = updateItems.reduce((acc, i)=> acc + i.price * i.quantity, 0);

           return{
                items: updateItems,
                totalItemsInCart:newTotalItems,
                totalAmount:newTotalAmount,
           }
        })
    },
    
    updateQuantity:(variantId, quantity)=>{
        set(state =>{
            const updateItems = state.items.map(i => i.variantId === variantId ? {...i,quantity}: i);

             const newTotalItems = updateItems.reduce((acc, i)=> acc + i.quantity, 0);

           const newTotalAmount = updateItems.reduce((acc, i)=> acc + i.price * i.quantity, 0);

           return{
                items: updateItems,
                totalItemsInCart:newTotalItems,
                totalAmount:newTotalAmount,
           }
        })
    },

     cleanCart: ()=> {
        set({items:[],totalAmount: 0, totalItemsInCart: 0});
    }
});
 
export const useCartStore = create<CartState>()(devtools(
    persist(StoreApi, {
        name:'cart-store',
    })
)); 