import { Link } from "react-router-dom"
import { useCartStore } from "../store"
import { FormCheckout } from "../components/checkout/FormCheckout";

export const CheckoutPage = () => {

  const totalItems = useCartStore(state => state.totalItemsInCart);

  return (
    <div style={{
      minHeight: 'clacl(100vh - 100px',
    }}
    >
      <header className="h-[100px] bg-white text-black flex items-center justyfi-center flex-col px-10 border-b border-slate-200">
        <Link to='/' className="text-4xl font-bold self-center trackiing-tighter transition-all md:text-5xl md:self-start">
          <p>
            Laptop 
            <span className="text-red-600">Pc</span>
          </p>
        </Link>
      </header>

      <main className="w-full h-full flex relative">
          {
            totalItems === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5 w-full"
              style={{
                    height: 'calc(100vh - 100px)'
                  }}>
                    <p>Su carro esta vacio.</p>
                    <Link to='/producto' className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold">
            Empezar tu compra</Link>
              </div>
            ) : (
              <>
                <div className="w-full md: w-[50%] p-10">
                  <FormCheckout/>
                </div>
                <div className="bg-stone-100 w-[50%] sticky top-0 roght-0 p-10 hidden md:block"
                  style={{
                    minHeight: 'calc(100vh - 100px)'
                  }}
                >

                </div>
              </>
            )
          }
      </main>
    </div>
  )
}
