import { useState } from "react"
import { Link } from "react-router-dom"

export const Loginpage = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
        <h1 className="text-4xl font-bold capitalize">
            Iniciar sección
        </h1>
        <p className="text-sm font-medium">
            ¡Que bueno tenerte de vuelta!
        </p>
        <>
        <form action="" className="flex flex-col gap-4 items-center w-full sm:w-[400px] lg:w-[500px] mt-10">

            <input type="email" placeholder="Ingresa tu correo"
            className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            value={email} onChange={e => setemail(e.target.value)}/>
            
            <input type="email" placeholder="Ingresa tu contraseña"
            className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" 
            value={password} onChange={e => setpassword(e.target.value)}/>

            <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
                Iniciar sesión
            </button>

        </form>

        <p className="text-sm text-stone-800">
            ¿No tienes una cuenta?
               <Link to='/registro' className="underline ml-12">Registrate
               </Link> 
        </p>
        </>
    </div>
  )
}
