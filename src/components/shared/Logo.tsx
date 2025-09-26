import { Link } from "react-router-dom"

interface Props {
  isDashboard? : boolean;
}

export const Logo = ({isDashboard}: Props) => {
  return (
    <Link to='/' className={`text-2xl font-bold tracking-tighter transition-all ${isDashboard  && 'hover:scale-105'} `}>
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

