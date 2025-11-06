import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "../../actions";




export const useOrderAdmin = (id:number) =>{ 
    const {data,isLoading} = useQuery({
        queryKey: ['order','admin',id],
        queryFn :() => getOrderById(id),
        retry : false,
        enabled: !!id,
    });

    return{
        data,
        isLoading,
    };
};