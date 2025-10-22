import { useFieldArray, useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form"
import type { ProductFormValues } from "../../../lib/Validator"
import { IoIosAddCircleOutline,  IoIosCloseCircle } from "react-icons/io"
import { useEffect, useState } from "react"

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

    const [colorActive, setColorActive] = useState<boolean[]>([]);

    const addVariant = ()=>{
        append({
           stock: 0,
           price: 0,
           storage: '',
            color: '',
            colorName: '',
        })
    }

    const removeVariant = (index: number) =>{
        remove(index);
    };

    const toggleColorActive = (index:number) =>{
        setColorActive(prev=> prev.map((item, i)=>i === index ? !item : item))
    };

    //Usar useWacth una sola vez para observar los valores del color y el colorName

    const colorValues = useWatch({
        control,
        name: fields.map((_,index)=> `variants.${index}.color`as const)
    });
    const colorNAmeValues = useWatch({
        control,
        name: fields.map((_,index)=> `variants.${index}.colorName`as const)
    });

    const getFirstError = (variantError: FieldErrors<ProductFormValues['variants'][number]>)=>{
        if(variantError){
            const keys= Object.keys(variantError) as (keyof typeof variantError)[];
            if(keys.length > 0 ){
                return variantError[keys[0]]?.message;
            }
        }
    };

 useEffect(()=>{
    setColorActive(prev => fields.map((_, index)=> prev[index] || false))
 },[fields]);


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
                            {...register(`variants.${index}.stock`,{valueAsNumber:true,
                             })} 
                             className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"/>
                             
                            <input type='number' step='0.01' placeholder='Precrio' 
                            {...register(`variants.${index}.price`,{valueAsNumber:true,
                             })} 
                             className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"/>
                            
                            <input type='text' placeholder='64 GB' 
                            {...register(`variants.${index}.storage`)} 
                             className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"/>

                             <div className="flex relative ">
                                    {colorActive[index] && (
                                        <div className="absolute bg-stone-100 rounded-md bottom-8 left-[40px] p-1 w-[100px] h-fit space-y-2">
                                            <input type="color" {...register(`variants.${index}.color`)} className="rounded-md px-3 py-1.5 w-full"/>

                                            <input type="text" placeholder="Negro"
                                            {...register(`variants.${index}.colorName`)} 
                                            className="rounded-md py-1.5 w-full text-xs focus:outline-none font-semibold placeholder:font-normal"/>
                                        </div>
                                    )}
                                    <button className="border w-full h-8 cursor-pointer rounded text-xs font-medium flex items-center justify-center" type="button" onClick={()=> toggleColorActive(index)}>
                                        {
                                           colorValues[index] && colorNAmeValues
                                           [index] ? (
                                            <span className={`inline-block w-4 h-4 rounded-full bg-block`}
                                            style={{backgroundColor: colorValues[index]}}/>
                                           ):('Añadir color') 
                                        }
                                    </button>
                             </div>

                             <div className="flex justify-end">
                                <button type="button" onClick={()=> removeVariant(index)} className="p-1">
                                    <IoIosCloseCircle size={20} />
                                </button>
                             </div>
                        </div>
                             {errors.variants && errors.variants[index] && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {getFirstError(errors.variants[index])}
                                    </p>
                                )
                             }
                     </div>   
                    ))}
        </div>
        <button type="button" onClick={addVariant} className="px-4 py-2 text-slate-800 rounded-md text-sm font-semibold tracking-tight flex items-center gap-1 self-center hover:bg-slate-100">
            <IoIosAddCircleOutline size={16}/>
            Añadir Variante
        </button>

        {fields.length === 0 && errors.variants &&(
            <p className="text-red-500 text-xs mt-1">
                Debes añadir al menos una variante
            </p>
        )}
    </div>
  );
};
