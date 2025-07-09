import { LuMinus } from "react-icons/lu";
import { Separator } from "../components/shared/Separator";
import { formatPrice } from "../helpers";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { ProductDescription } from "../components/OneProduct/ProductDescription";
import { GridImages } from "../components/OneProduct/GridImages";

export const CellPhonePage = () => {
    return (<>
    <div className="h-fit flex flex-col md:flex-row gap-16 mt_8">
        <div>
           <GridImages images={[]}/>
        </div>
        <div  className="flex-1 space-y-5">
                <h1 className="text-3xl font-bold tracking-tigth">
                    Samsung Galaxy s21 ultra 5g
                </h1>

                <div className="flex gap-5 item-center">
                    <span className="tracking-wide text-lg font-semibold">{formatPrice(1200)}</span>
                    
                <div className="relative">
                    {/*Agotado*/}
                    <span>Agotado</span>
                </div>
            </div>

            <Separator/>

            {/*Caracteristicas */}
             <ul className="space-y-2 ml-7 my-10">
                <li className="text-sm flex items-center gap-3 tracking-tight font-medium">
                    <span className="bg-black w-[5px] h-[5px] rounded-full"/>
                    256gb almacenamiento
                </li>
             </ul>

            <div className="flex flex-col gap-3">
                    <p>color azul</p>
                    <div className="flex gap-3">
                        <button className={`w-8 h-8 rounded-full flex justify-center items-center ${ true ? 'bg-blue-500' : 'bg-gray-500'}`}>
                            <span className="w-[26px] h-[26px] rounded-full" style={{backgroundColor:'blue'}}/>
                        </button>
                    </div>
            </div>

        {/*Opciones de almacenamiento*/}
        <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">
                Almacenamiento disponible
            </p>
            <div className="flex gap-3">
                <select className="border border-gray-300 rounded-lg px-3 py-1">
                    <option value="">256Gb</option>
                </select>
            </div>    
        </div>
        {/*Comprar*/}
        {
            false ? (
                <button
                className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg[#e2e2e2] w-full"
                disabled>
                    Agotado
                </button>
            ):(
                <>
                {/*Contador */}
                <div className="space-y-3">
                    <p className="text-sm font-medium">
                        Cantidad
                    </p>
                    <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                        <button>
                            <LuMinus size={15}/>
                        </button>
                        <span className="text-slate-500 text-sm">1</span>
                        <button>
                            <LuMinus size={15}/>
                        </button>
                    </div>
                </div>
                {/*Botones de accion */}

                <div className="flex flex-col gap-3">
                    <button className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg[#e2e2e2]">
                        Agregar al carrito.
                    </button>
                    <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full">
                        Comprar ahora
                    </button>
                </div>
                </>
            )}

            <div className="flex pt-2">
                <div className="flex flex-col gap-1 flex-1 items-center">
                    <CiDeliveryTruck size={35}/>
                    <p className="text-xs font-semibold">
                        Envio Gratis
                    </p>
                </div>
                <Link to="#" className="flex flex-col gap-1 flex-1 items-center justify-center">
                    <BsChatLeftText size={30}/>
                    <p className="flex flex-col items-cente text-xs">
                        <span className="font-semibold">
                            ¿Necesitas ayuda?
                        </span>
                        Contactanos Aqui!
                    </p>
                </Link>
            </div>
        </div>
    </div>
                {/**Descripción */}
    <ProductDescription/>                
  </>
  );
};
