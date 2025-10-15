import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form"
import type { ProductFormValues } from "../../../lib/Validator"

interface Props{
    control: Control<ProductFormValues>
    errors: FieldErrors <ProductFormValues>
    register: UseFormRegister<ProductFormValues>
};

const headerVariants = ['Stock','Precio','Almacenamiento','color',''];

export const VariantsInput = ({control,errors,register}:Props) => {
  
    const {fields,remove,append} = useFieldArray({
        control,
        name:'variants',
    });
  
    return (
    <div className="flex flex-col gap-3">
        <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="grid grid-cols-5 gap-4 justify-start">
                {headerVariants.map((header, index)=>(
                    <p key={index} className="text-xs font-semibold text-slate-800">
                        {header}
                    </p>
                ))}
            </div>
                {
                    fields.map((field, index)=>(
                     <div key={field.id}>
                        <div className="grid grid-cols-5 gap-4 items-center">
                            <input type='number' placeholder='Stock' 
                            {...register(`variants.${index}.stock`,{valueAsNumber:true})} />
                        </div>
                     </div>   
                    ))
                }
        </div>
    </div>
  )
}
