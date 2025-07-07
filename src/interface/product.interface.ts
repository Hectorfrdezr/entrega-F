import type { Json } from "../supabase/supabase";


export interface color {
    name:string;
    color: string;
    price:number;
};

export interface variantProduct{
    id:string;
    stock: number;
    price: number;
    storage: string;
    color: string;
    color_name: string;
}

export interface product{
    id: string;
    name:string;
    brand:string;
    slug:string;
    features:string[];
    description: Json;
    images:string[];
    created_at: string;
    variants:variantProduct[];
};

export interface PreparedProducts{
    id: string;
    name:string;
    brand:string;
    slug:string;
    features:string[];
    description: Json;
    images:string[];
    created_at: string;
    price:number;
    colors: {
        name:string;
       color: string;
    }[],
    variants:variantProduct[];
};
