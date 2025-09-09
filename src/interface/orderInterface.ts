export interface OrderInput {
    addres:{
       addessLine1 : string;
       addessLine2? : string;
       city: string;
       state : string;
       postalCode: string;
       country: string;
    };
    cartItems:{
        variantId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: string;
}