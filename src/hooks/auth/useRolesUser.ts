import { useQuery } from "@tanstack/react-query"
import { getUserRole } from "../../actions";




export const useRolesUser = (userId: string) => {

    const {data,
        isLoading} 
        = useQuery({
       queryKey:['rol_user'],
       queryFn: async ()=> await getUserRole(userId) ,
       enabled: !!userId,
    });

    return{
        data,
        isLoading,
    };
}; 