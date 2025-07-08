import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <Link to='/' className="text-2xl font-bold tracking-tighter transition-all">
        <p className="hidden lg:block">
            Laptop
            <span className="text-red-700">PC</span>
        </p>

        <p className="flex text-4xl lg:hidden">
            <span className="-skew-x-6">L</span>
            <span className="text-red-700 skew-x-6 ">P</span>
        </p>
    </Link>
  )
};

