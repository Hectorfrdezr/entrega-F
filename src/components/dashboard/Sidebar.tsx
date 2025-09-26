import { Logo } from "../shared/Logo"


export const Sidebar = () => {
  return (
    <div className="w-[120px] bg-stone-800 text-white flex flex-col gap-10 items-center p-5 fixed h-screen lg:w-[250px]">
        <Logo/>

        <nav className="w-full space-y-5 flex-1">
            
        </nav>
    </div>
  )
}
