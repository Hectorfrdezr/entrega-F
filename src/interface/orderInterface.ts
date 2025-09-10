export interface OrderInput {
    address:{
       addessLine1 : string;
       addessLine2? : string;
       city: string;
       state : string;
       postalCode: string;
       country: string;
       customer_id: string;
    };
    cartItems:{
        variantId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
}