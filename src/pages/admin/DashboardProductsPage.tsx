import { IoAddCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { DashboardHeader, TableProducts } from "../../components/dashboard"


export const DashboardProductsPage = () => {
  return (
    <div className="h-ful flex flex-col gap-4">
      <DashboardHeader 
      title="Administar"
      actionButton={
        <Link 
        to='/dashboard/productos/new'
        className="flex items-center gap-2 bg-black text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition-all">
          <IoAddCircleOutline className="inline-block" size={18}/>
          Nuevo Producto
        </Link>
      }/>        
        <main className="flex-1 p-4 sm:p-6">
        <TableProducts/>
        </main>
    </div>
  )
}
