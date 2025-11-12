import { IoAddCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { TableProducts } from "../../components/dashboard"


export const DashboardProductsPage = () => {
  return (
    <div className="h-full flex flex-col gap-2">
        <Link to='/dashboard/productos/new' className="max-h-[calc(100vh-100px)] fixed z-40 bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold mb-3">
          <IoAddCircleOutline className="inline-block"/>Nuevo Producto
        </Link>

        <TableProducts/>
    </div>
  )
}
