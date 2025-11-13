import { useState } from "react"
import { Link } from "react-router-dom"

export const NewLetter = () => {
  
  const [email, setEmail] = useState('');
  
  
  return (
    <div className="relative bg-gray-500 text-white py-20">
      {/*imgende de fondo*/}

         <div className="absolute inset-0 bg-cover bg-center opacity-70 h-full"
            style={{backgroundImage: 'url(/img/background-newsletter.webp)'}}
        />

        {/*contenido*/}
        <div className="container z-10 relative p-5 md:p-0">
          <div className="w-full text-black bg-white p-12 space-y-5 md:w-[50%] lg:w-[40%]">
              <p className="text-xs uppercase font-semibold">
                  Suscribete a nuestro servicio y recibe promociones exclusivas.
              </p>
              <p className="text-xs font-mediun w-[80%] leading-5">
                  Introduce tu correo para reibir Ofertas. 
              </p>
              <form className="flex flex-col gap-5 xl:flex-row">
                    <input type="email" 
                    className="border border-slate-200 focus:outline-none rounded-full py-3 px-5 w-full text-medium"
                    placeholder="Correo Electronico"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <Link 
                    to={`/registro?email=${encodeURIComponent(email)}`}
                    className="bg-black text-white font-semibold rounded-full uppercase tracking-wider py-3 px-6 text-xs xl:px-5" >Suscribirme</Link>
              </form>
          </div>
        </div>
    </div>
  )
}
