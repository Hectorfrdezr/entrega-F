import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/dashboard'
import { useUser } from '../hooks';
import { useEffect, useState } from 'react';
import { getSession, getUserRole } from '../actions';
import { Loader } from '../components/shared/Loader';
import { supabase } from '../supabase/client';

export const DashboardLayout = () => {

   const navigate = useNavigate();

   const {session, isLoading} = useUser();

   const [roleLoading,setRoleLoading] =useState(true);

   useEffect(()=>{
      const checkRole = async() => {
        setRoleLoading(true);
        const session = await getSession();

        if(!session){
          navigate('/login')
        };

        const role = await getUserRole(session?.session?.user.id as string)
        
          if(role !== 'admin'){
                navigate('/',{replace: true})
          }

          setRoleLoading(false)
      };

      checkRole();

      supabase.auth.onAuthStateChange(async(event,currentSession)=>{
            if(event === 'SIGNED_OUT' || !currentSession){
                 navigate('/login', {replace:true});
              }
          });

   },[navigate]);

   if(isLoading || !session || roleLoading) return <Loader/>;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-montserrat 
                sm:flex-row sm:items-start sm:justify-between p-4 sm:p-6 md:p-8 transition-all duration-300">
      <Sidebar/>
      <main className='container flex-col overflow-y-auto max-h-screen m-5 mt-12 flex-1 text-slate-800 ml-0 lg:ml-[270px] transition-all duration-300'>
        
        <Outlet/>
      </main>
    </div>
  )
}
