import { useMutation, useQueryClient } from "@tanstack/react-query"
import { singUP } from "../../actions"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"



export const useRegister = () => {

   const navigate = useNavigate();
   const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn : singUP,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['user']});
        navigate('/');
    },
    onError: (err) =>{
        toast.error(err.message, {
            position:'bottom-right'});
    },
  });
  return{
    mutate,
    isPending,
  }
};
