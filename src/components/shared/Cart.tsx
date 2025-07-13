import { HiOutlineShoppingBag } from "react-icons/hi"
import { useGlobalStore } from "../../store/Global.store";
import { IoMdClose } from "react-icons/io";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CartItem } from "./CartItem";
import { useCartStore } from "../../store/Cart.store";

export const Cart = () => {


  const CartItems =  useCartStore (state => state.items);
  const ClearCart = useCartStore (state => state.cleanCart);
  const totalItemsInCart = useCartStore (state=> state.totalItemsInCart);
  const closeSheet = useGlobalStore (state => state.closeSheet)

  return (
    <div className="felx flex-col h-full">
      <div className="px-5 py-7 flex justify-between items-center border-b border-slate-200">
        <span className="flex gap-3 items-center font-semibold">
          <HiOutlineShoppingBag size={20}/>
          {totalItemsInCart}articulos
        </span>
          <button>
                    <IoMdClose size={25} className="text-black" onClick={closeSheet}/>
                </button>
      </div>

      {
        totalItemsInCart > 0 ? (
          <>
      <div className="p-7 overflow-auto-flex-1">
        <ul className="space-y-9">
          <li>
              {
               CartItems.map(item =>(
                <CartItem
              item={item} key={item.variantId}/>
               ))
              }
          </li> 
        </ul>
      </div>
    {/**Botones de accion */}
      <div className="mt-4 p-7">
        <Link to='/checkout'
        className="w-full bg-black text-white py-3.5 flex rounded-full items-center justify-center gap-3">
        <RiSecurePaymentFill size={24}/>
        Continuar con la compra 
        </Link>
        <button
        className="mt-3 w-full text-black border border-black rounded-full py-3" onClick={ClearCart}>Limpiar carrito</button>
      </div>
      </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-7">
            <p className="text-sm font-medium tracking-tight">Carrito vacio</p>
            <Link to='/producto' className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold" onClick={closeSheet}>
            Empezar tu compra</Link>
          </div>
        )
      }
    {/*articulos*/}
      
    </div>
  )
}
