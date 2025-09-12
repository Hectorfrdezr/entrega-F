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
        customer_id: customerId,
        address_line1: order.address.addressLine1,
        address_line2: order.address.addressLine2,
        city: order.address.city,
        postal_code: order.address.postalCode,
        state: order.address.state,
        country: order.address.country
    })
    .select()
    .single()

    if(addressError){
        throw new Error(addressError.message)
    }

    const {data: orderData, error: orderError} = await supabase
    .from('orders')
    .insert({
        customer_id: customerId,
        address_id: addressData.id,
        total_amount: order.totalAmount,
        status: 'Pending',

})
    .select()
    .single()

    if(orderError){
        throw new Error(orderError.message)
    }
    
    const orderItems = order.cartItems.map(item => ({
        order_id: orderData.id,
        variant_id: item.variantId,
        quantity: item.quantity,
        price: item.price,
    }))

    const {error: orderItemsError} = await supabase.from('order_items').insert(orderItems);

    if (orderItemsError){
        throw new Error(orderItemsError.message)
    }

    for (const item of order.cartItems){
        const {data: variantData} = await supabase
        .from('variants')
        .select('stock')
        .eq('id', item.variantId)
        .single()
        
        if(!variantData){
           throw new Error('No se encontro la variante')
        }
        
        const newStock = variantData.stock - item.quantity;

        const {error: updateStockError}= await supabase
        .from('variants')
        .update({
            stock: newStock,
        })
        .eq('id', item.variantId);

        if(updateStockError){
            throw new Error('No se pudo actualizar el stock de la variante');
        }
        
     }
    
    return orderData; 
};