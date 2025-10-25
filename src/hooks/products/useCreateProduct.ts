import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateProduct = () =>{
    const queryCliente = useQueryClient();
    const navigate = useNavigate();

    const {mutate,isPending} = useMutation({
        mutationFn: createProduct,
        onSuccess: () =>{
            queryCliente.invalidateQueries({
                queryKey: ['product'],
            });
            navigate('/dashboard/productos');
        },
        onError: (error) =>{
            toast.error('Ocurrio un Error al crear el Producto'),
            console.log(error)
        }
    });

    return{
        mutate,
        isPending,
    }
}