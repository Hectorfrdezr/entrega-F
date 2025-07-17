import { NavLink } from "react-router-dom";
import { navbarLinks } from "../constants/Links";
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import {Logo} from "./Logo";
import { useGlobalStore } from "../../store/Global.store";
import { useCartStore } from "../../store";
import { useUser } from "../../hooks";
import { LuLoader } from "react-icons/lu";

export const Navbar = () => {

    const openSheet = useGlobalStore(state=> state.openSheet);

    const setActiveNavMobile = useGlobalStore(state=> state.setActiveNavMobile);

    const totalItemInCart = useCartStore (state => state.totalItemsInCart);

    const {session, isLoading} = useUser();

    const userId = session?.user.id;

  return (
    <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
       <Logo/>
        
        <nav className="spaxe-x-5 hidden md:flex gap-4">
           {navbarLinks.map(link => (
                <NavLink 
                key={link.id}
                to={link.href}
                className = {({isActive}) => 
                        `${isActive ? 'text-red-700 underline' : ''} transition-all duration-300 font-medium hover:text-red-700 hover:underline `}
                >
                   {link.title} 
                </NavLink>
            ))}
        </nav>
        <div className="flex gap-5 items-center" >
            <button onClick={()=> openSheet('search')} >
                <HiOutlineSearch size ={25}/> 
            </button>

            {
                isLoading ? (
                <div className="w-full h-full felx justify-center mt-20">
                <LuLoader className="animate-spin" size={60}/>
                </div>)
                : session ? (
                    <div className="relative">
                {/* User Nav*/ }
                <Link to ='/login' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">R</Link>
            </div>
                ):(
                    <Link to={'/login'}>
                    <HiOutlineUser size={25}/>
                    </Link>
                )
            }

            <button className="relative" onClick={()=> openSheet('cart')}>
                <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">{totalItemInCart}</span>
                <HiOutlineShoppingBag size={25} />
            </button>
        </div>
       <button className="md:hidden" onClick={()=>setActiveNavMobile(true)}>
            <FaBarsStaggered size={25}/>
        </button> 
    </header>
  );
};
