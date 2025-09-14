import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "../actions";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared/Loader";
import { useUser } from "../hooks";


export const ClientLayout = () => {

const { session, isLoading:isLoadingSession} = useUser();

const navigate = useNavigate();

useEffect(() => {
    supabase.auth.onAuthStateChange(async(event,currentSession)=>{
        if(event === 'SIGNED_OUT' || !currentSession){
            navigate('/login');
        }
    });
},[navigate]);

if(isLoadingSession)return <Loader/>

const handleLogout = async () =>{
 await signOut()
};

return (

    <div className="flex flex-col gap-5">

        {/*Menu*/}
        <nav className="flex justify-center gap-10 text-sm font-medium">
            <NavLink to= '/account/pedidos' className={({isActive})=> `${isActive ? 'underline': 'hover:underline'}`}>
            Pedidos
            </NavLink>
        {/*Todo: link dashboard*/ }

            <button className="hover:underline"
            onClick={handleLogout}>
            Cerrar sessión
            </button>
        </nav>

        <main className="container mt-12 flex-1">
            <Outlet/>
        </main>
    </div>
  )
}
