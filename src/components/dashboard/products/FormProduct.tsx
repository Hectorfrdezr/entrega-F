import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { productSchema, type ProductFormValues } from "../../../lib/Validator";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SectionForProduct } from "./SectionForProduct";
import { InputForm } from "./InputForm";
import { FeaturesInput } from "./FeaturesInput";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UploaderImages } from "./UploaderImages";
import { Editor } from "./Editor";

interface Props{

  titleForm: string;
}




export const FormProduct = ({titleForm}:Props) => {

      const {register, handleSubmit,formState:{errors},setValue,watch,control} = useForm<ProductFormValues>(
        {
          resolver: zodResolver(productSchema)
        }
      );

      const navigate = useNavigate();
 
      const onSubmit = handleSubmit((data) => {
        console.log(data)
      });

      const watchNAme = watch('name');

      useEffect(()=>{
          if(!watchNAme)return

          const generatedSlug = generateSlug(watchNAme)
          setValue('slug', generatedSlug, {shouldValidate:true})
      },[watchNAme, setValue])

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

            <SectionForProduct titleSection="Detalles del Producto" className="lg:col-span-2 lg:row-span-2">
              <input type="text" />
              <InputForm
                type="text"
                placeholder="Ejemplo: iphone 13 Pro max"
                label="nombre"
                name='name'
                register={register}
                errors={errors}
                required={true}
              />
              <FeaturesInput control={control} errors={errors}/>
            </SectionForProduct>

            <SectionForProduct>
              <InputForm
                type="text"
                label='slug'
                placeholder="Iphone-13-pro-max"
                name='slug'
                register={register}
                errors={errors}
              />
              <InputForm
                type="text"
                placeholder="Apple"
                label='Marca'
                name='brand'
                register={register}
                errors={errors}
                required
              />
            </SectionForProduct>

              <SectionForProduct titleSection="Variantes del Producto" className="lg:col-span-2 h-fit">
                  <VariantsInput 
                  control={control} errors={errors} register={register}/>
              </SectionForProduct>

              <SectionForProduct titleSection="imagines del producto">
                <UploaderImages
                errors={errors}
                setValue={setValue}
                watch={watch}/>
              </SectionForProduct>

             <SectionForProduct titleSection="Descripción del producto"
             className="col-span-full"
             >
                <Editor 
                  setValue={setValue}
                  errors={errors}
                />
              </SectionForProduct> 

            <div className="flex gap-3 absolute top-0 right-0">
                <button className=" border border-slate-400 text-slate-600 py-2 px-3 text-sm font-medium rounded-md"
                type='button'
                onClick={() => navigate(-1)}>Calncelar</button>

                <button className="bg-black text-white py-2 px-3 text-sm font-medium rounded-md" 
                type='submit'
                >Guardar Producto</button>
            </div>
        </form>
    </div>
  )
}
