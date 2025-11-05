import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "../../actions";
import type { ProductInput } from "../../interface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateProduct = (productid: string) => {

    const queryCliente = useQueryClient();
    const navigate = useNavigate();

    const {mutate,isPending} = useMutation({
        mutationFn:async (data: ProductInput) => updateProduct(productid,data),
        onSuccess:() =>{
            queryCliente.invalidateQueries({
                queryKey:['products']
            });
            toast.success('Producto actualizado',{position: 'bottom-right'});
            navigate('/dashboard/productos');
        },
        onError:(error) => 
            {console.log(error)
            toast.error('Ocurrió un error al actualizar el producto',{position: 'bottom-right'})}
    })

    return{
        mutate,isPending
    }
}
