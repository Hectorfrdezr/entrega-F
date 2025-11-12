import { NavLink } from "react-router-dom"
import { dashboardLinks } from "../constants/Links"
import { Logo } from "../shared/Logo"
import { IoClose, IoLogOutOutline, IoMenu } from "react-icons/io5"
import { signOut } from "../../actions"
import { useState } from "react"


export const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () =>{
      await signOut();
  };

  const toggleMenu = () => setIsOpen(!isOpen);


  return (
      <>
      
      <button
        className="fixed top-4 left-4 z-50 bg-red-500 text-white p-2 rounded-md lg:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    

    <div  className={`fixed top-0 left-0 h-screen bg-stone-800 text-white flex flex-col gap-10 items-center p-5 z-50 transition-all duration-300 
        ${isOpen ? "translate-x-0 w-[250px]" : "-translate-x-full w-[250px]"} 
        lg:w-[250px] lg:translate-x-0`}>
        <Logo isDashboard/>

        <nav className="w-full space-y-5 flex-1">
            {
              dashboardLinks.map(link => (
                <NavLink 
                key={link.id}
                to={link.href}
                 onClick={() => setIsOpen(false)}
                className={({isActive}) => `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${isActive ? 'text-white bg-red-500' : 'text-white bg-red-500'} lg:pl-5 lg:justify-start`}>
                  {link.icon}
                  <p className="font-semibold hidden lg:block">
                  {link.title}
                  </p>
                </NavLink>
              ))
            }
        </nav>
        <button className="bg-red-500 py-[10px] rounded-md flex items-center justify-center gap-2 font-semibold text-sm hover:underline" onClick={handleLogout}>
          <span className="hidden lg:block|">Cerrar sesión</span>
          <IoLogOutOutline size={20} className="inline-block"/>
        </button>
    </div>
    </>
  )
}
