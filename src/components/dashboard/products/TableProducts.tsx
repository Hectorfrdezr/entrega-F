import { useState } from "react"
import { FaEllipsis } from "react-icons/fa6"
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

const tableHeaders = [
    '',
    'Nombre',
    'Variante',
    'Precio',
    'Stock',
    'Fecha de creación',
    '',
]





export const TableProducts = () => {

    const [openMenuIndex, setOpenMenuIndex] = useState <number | null>(null);

    const handleDeleteProduct = (id:string) =>{
        console.log(id)
    }

  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
        <h1 className="font-bold text-xl">Productos</h1>
        <p className="text-sm mt-1 mb-8 font-regular text-gray-500">
            Gestiona tus productos y mira las estadisticas de tus ventas
        </p>

         {/*Tabala */}   
        <div className="relative w-full h-full">
            <table className="text-sm w-full caption-bottom overflow-auto">
                <thead className="border-b border-gray-200 pb-3">
                    <tr className="text-sm font-bold">
                        {tableHeaders.map((header, index) =>(
                            <th key={index} className="h-12 px-4 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 align-middle sm:table-cell">
                            <img src="1" alt="Imagen Product" loading="lazy" decoding="async" className="w-16 h-16 aspect-square rounded-md object-contain" />
                        </td>
                        <td className="p-4 font-medium tracking-tighter">
                            Producto 1
                        </td>
                        <td className="p-4 font-medium tracking-tighter">
                            Variante 1
                        </td>
                        <td className="p-4 font-medium tracking-tighter">
                            35.00
                        </td>
                        <td className="p-4 font-medium tracking-tighter">
                            12
                        </td>
                        <td className="p-4 font-medium tracking-tighter">
                            12/12/2025
                        </td>
                        <td className="relative">
                            <button className="text-slate-900" onClick={()=>setOpenMenuIndex(1)}><FaEllipsis/></button>
                            {
                                openMenuIndex === 1 && (
                                    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 w-[120px]" role="menu">
                                        <Link to={`/dashboard/productos/editar/${'test-prueba'}`}
                                        className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg:gray-100">
                                        Editar <HiOutlineExternalLink size={13} className="inline-block"/>
                                        </Link>
                                        <button className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100" onClick={() => handleDeleteProduct('1')}>
                                            Eliminar
                                        </button>
                                    </div>
                                )
                            }
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
  )
}
