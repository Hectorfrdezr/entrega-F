import { useForm } from "react-hook-form"
import { InputAddress } from "./InputAddress"
import { addressFormValues, addressSchema } from "../../lib/Validator"
import { zodResolver } from "@hookform/resolvers/zod"

export const FormCheckout = () => {

    const {register,formState: {errors},handleSubmit,} = useForm<addressFormValues>({
        resolver: zodResolver(addressSchema)
    });

    const onSubmit = handleSubmit(data =>{
        console.log(data)
    })
  return (
    <div>
        <form className="flex flex-col gap-6"
              onSubmit={onSubmit}>
            
            <div className="flex flex-col gap-3">
                
                <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>

                <InputAddress/>

            <select className="border border-saltel-200 rounded-md p-3">

                <option value="Chile">Chile</option>
            </select>
            </div>

            <div className="flex flex-col gap-3">
            <p className="text-sm font-midium">Metódos de envíos</p>
            <div className="flex justifi-between items-center text-sm border border-stale-600 bg-stone-100 py-4 rounded-md px-6">
                <span className="font-normal">Estandar</span>
                <span className="font-semibold">Gratís</span>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 rounded-ss-md rounded-se-md px-6">
                <span>Depósito Bancario</span>
            </div>

            <div className="bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md">
                <p>Compra a travez de transferencia bancaria</p>
                <p>BANCO ESTADO</p>
                <p>Giro:LaptopPC</p>
                <p>Rut:123456789000</p>
                <p>Tipo de cuenta: Corriente</p>
                <p>Número de cuenta:123456789012</p>
                <p>La información será compartida nuevamnete una vez jaya finalizado la compra</p>
            </div>
        </div>
        <div className="flex flex-col gap-6">
            <h3 className="text-semibold text-3xl">
                Resumen de compra
            </h3>
            {/*Lista de elemento */}
        </div>
        <button  type="submit" className="bg-black text-white py-3.5 font-bold tracking.wide rounded-md mt-2">Finalizar Pedido</button>
        </form>
    </div>
    )
}
