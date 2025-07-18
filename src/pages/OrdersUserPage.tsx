
import { Link } from 'react-router-dom'

export const OrdersUserPage = () => {
  return (
    <div className='flex flex-col gap-6 items-center'>
        <div className="flex gap-2">
            <h1 className="text-3xl font-bold">
                Pedidos
            </h1>
            <span className='w-5 h-5 rounded-full bg-black text-white text-[11px] flex justify-center items-center mt-1'>
                30
            </span>
        </div>
        {
            [].length === 0 ? (
                <>
                <p className="text-slate-600 text-[13px]">
                    Todavia no has hecho ningun pedido
                </p>
                <Link to='/producto' className='bg-black text-white uppercase font-semibold tracking-widest text-xs y-4 rounded-full px-8'>
                    Empezar a comprar
                </Link>
            </>
            ):(
                <div>Tabla de ordenes</div>
            )}
    </div>
  )
}
