import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { productSchema } from "../../../lib/Validator";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Props{

  titleForm: string;
}




export const FormProduct = ({titleForm}:Props) => {

      const {register, handleSubmit,formState:{errors},setValue,watch,control} = useForm(
        {
          resolver: zodResolver(productSchema)
        }
      );

      const navigate = useNavigate();
 
      const onSubmit = handleSubmit((data) => {
        console.log(data)
      });

  return (
    <div className="flex flex-col gap-6 relative">
        <div className="flex justify-between item-center">
          <div className="flex items-center gap-3">
            <button className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105" onClick={()=> navigate(-1)}>
              <IoArrowBack size={18} className="transition-all group-hover:scale-125"/>
            </button>
            <h2 className="font-bold tracking-tight text-2xl capitalize">
              {titleForm}
            </h2>
          </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1" onSubmit={onSubmit}>

        </form>
    </div>
  )
}
