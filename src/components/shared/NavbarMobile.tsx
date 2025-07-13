import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/Global.store"
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../constants/Links";

export const NavbarMobile = () => {
 
        const setActiveNavMobile = useGlobalStore(
            state => state.setActiveNavMobile
        );
    
  return (
    <div className="bg-white text-black h-screen w-full fixed shadow-lg animate-slide-in-left z-50 justify-center py-32">
        <button className="absolute top-5 right-5"
        onClick={()=> setActiveNavMobile(false)}
        >
            <IoMdClose size={30} className="text-black"/>
        </button>


     {/*Contenido*/}
        <div className="flex flex-col gap-20">
            <Link to='/'className="text-4xl text-center font-bold tracking-tighter transition-all" 
            onClick={()=> setActiveNavMobile(false)}>
                <p>Laptop <span className="text-red-700">PC</span></p>
            </Link>
            <nav className="flex flex-col items-center gap-5">
                {navbarLinks.map(item =>(
                    <NavLink
                    to={item.href}
                    key={item.id}
                    onClick={()=> setActiveNavMobile(false)}
                    className={({isActive})=>`
                    ${isActive ? 'text-red-700 underline':''} transition-all duration-300 font-semibold text-xl hover:text-red-700 hover:underline
                    `
                }
                    >{item.title}</NavLink>
                ))}
            </nav>
        </div>
    </div>
  )
}
