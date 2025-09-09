import type { OrderInput } from "../interface";
import { supabase } from "../supabase/client";




export const createOrder = async(order: OrderInput) => {
    
    const {data,error: errorUSer} = await supabase.auth.getUser();

    if(errorUSer){
        throw new Error(errorUSer.message);
    }

    const userId = data.user.id;

    const {data: customer, error:errorCustomer} = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', userId)
    .single();

    if(errorCustomer){
        throw new Error(errorCustomer.message);
    }

    const customerId = customer.id;

    for (const item of order.cartItems){
        const {data: variantData, error: variantError} = await supabase
        .from('variants')
        .select('stock')
        .eq('id',item.variantId)
        .single();

        if(variantError){
            throw new Error(variantError.message)
        }

        if(variantData.stock < item.quantity){
            throw new Error('No hay stock suficiente en los artículos seleccionado')
        }
    }

    const {data: addressData, error: addressError} = await supabase
    .from('addresses')
    .insert({
        address_line1: order.addres.addessLine1,
        city: order.addres.city,
        postal_code: order.addres.postalCode,
        state: order.addres.state,
        coutry: order.addres.country
    })
    .select()
    .single()

    if(addressError){
        throw new Error(addressError.message)
    }
}