import { Separator } from "../components/shared/Separator";

const availableBrans = [
    'Samsung',
    'Apple',
    'Huawei',
    'Xiaomi',
    'Realme',
    'Honor',
];



export const Filter = () => {
  return (
    <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
        <h3 className="font-semibold text-xl-mb-4">
            filtros
        </h3>
    {/*separador*/}
        <Separator/>
    {/*Filtros*/ }
    <div className="flex flex-col gap-3">
            <h3 className="text-lg font-midium-text-black">marcas</h3>
        </div> 

        <div className="flex flex-col gap-2">
            {availableBrans.map(brands => (
                <label key={brands} className="inline-flex items-center">
                        <input type="checkbox" className="text-black border-black focus:ring-black accent-black" />
                        <span className="ml-2 text-black text-sm cursor-pointer">{brands}</span>
                </label>
            ))}    
            
        </div>   

    </div>
  )
}
