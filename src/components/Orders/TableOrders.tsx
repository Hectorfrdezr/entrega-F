import { useNavigate } from "react-router-dom";
import { formateDatelong, formatPrice, getStatus } from "../../helpers";
import type { OrderItemSingle } from "../../interface";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { getUserRole } from "../../actions";
import toast from "react-hot-toast";

interface Props {
    orders:OrderItemSingle[];

}

const tableHeaders = ['ID','Fecha','Estado','Total',];


const TableOrders = ({orders}: Props) => {

    const navigate = useNavigate();

    const [role, setRole] = useState<string | null>(null);

    const [loadingRole, setLoadingRole] = useState(true);


    //verifica si usario es admin o no:
    useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const userRole = await getUserRole(user.id);
          setRole(userRole);
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
      } finally {
        setLoadingRole(false);
      }
    };
    fetchUserRole();
  }, []);

  const handleRowClick = (id: string) => {
    if (role === "admin") {
      navigate(`/account/pedido/${id}`);
    } else {
      toast.error("Acceso denegado: solo los administradores pueden ver los detalles del pedido.");
    }
  };

  if (loadingRole) {
    return (
      <div className="w-full text-center py-4 text-gray-500">
        Cargando permisos...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
        <table className="text-sm w-full  caption-bottom overflow-auto">
            <thead className="border-b border-gray-200 pb-3">
                <tr className="text-sm font-bold">
                    {tableHeaders.map((header, index)=>(
                        <th key={index} className="h-12 px-4 text-left">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>

            <tbody className="[&_tr:last-child]:border-0">
                {orders.map((order) =>(
                        <tr 
                        key={order.id}
                        onClick={()=>handleRowClick(order.id.toString())} 
                        className={`transition-colors duration-200 ${
                        role === "admin"
                            ? "cursor-pointer hover:bg-gray-100"
                            : "opacity-50 cursor-not-allowed"
                             }`}
                                >
                                <td className="p-4 font-medium tracking-tighter">{order.id}</td>
                                <td className="p-4 font-medium tracking-tighter">{formateDatelong(order.created_at)}</td>
                                <td className="p-4 font-medium tracking-tighter">{getStatus(order.status)}</td>
                                <td className="p-4 font-medium tracking-tighter">{formatPrice (order.total_amount)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableOrders