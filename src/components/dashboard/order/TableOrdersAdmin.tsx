
import { useNavigate } from "react-router-dom";
import { formateDatelong, formatPrice } from "../../../helpers";
import type { OrderWithCustomer } from "../../../interface";
import { useChangeStatusOrder } from "../../../hooks";

const tableHeaders = ['Cliente','Fecha','Estado','Total']

const statusOptions = [
    {value: 'Pending',  label:'Pendiente'},
    {value: 'Paid', label:'Pagado'},
    {value: 'Shipped',  label:'Enviado'},
    {value: 'Delivered',  label:'Entregado'},
];

interface Props{
    orders: OrderWithCustomer[];
};

export const TableOrdersAdmin = ({orders}: Props) => {

    const navigate = useNavigate();

    const {mutate} = useChangeStatusOrder();

    const handleStatusChange = (id:number, status:string)=>{
        mutate({id,status})
    }

    return (
    <div className="relative w-full h-full overflow-x-auto">
        <table className="hidden md:table w-full text-sm text-left border-collapse min-w-[600px] md:min-w-full">
                <thead className="borde-b border-gray-200 bg-gray-50">
                    <tr className="text-xs md:text-sm font-semibold text-gray-700">
                        {tableHeaders.map((header,index)=>(
                            <th key={index} className="px-4 py-3 whitespace-nowrap">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="[&_tr:last-child]:border-0">
                        {orders.map((order)=>(
                            <tr key={order.id} className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={()=> navigate(`/dashboard/ordenes/${order.id}`)}>
                                <td className="p-4 flex flex-col gap-1 min-w-[180px]">
                                    <span className="font-semibold text-gray-900 text-sm">{order.customers?.full_name}</span>
                                    <span className="text-gray-600 text-xs truncate">
                                        {order.customers?.email}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-800 whitespace-nowrap">
                                   {
                                    formateDatelong(order.created_at)
                                   }
                                </td>
                                <td className="p-4">
                                   <select value={order.status} onClick={e =>e.stopPropagation()}
                                    className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    onChange={e => handleStatusChange(order.id, e.target.value)}>
                                        {statusOptions.map(option =>(
                                            <option value={option.value} key={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4 text-gray-900 font-medium whitespace-nowrap">
                                   {
                                    formatPrice(order.total_amount)
                                   }
                                </td>
                            </tr>
                        ))}
                </tbody>
        </table>

         {/* Diseño móvil tipo "cards" */}
    <div className="md:hidden flex flex-col gap-4 mt-4">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => navigate(`/dashboard/ordenes/${order.id}`)}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <p className="font-semibold text-gray-900 text-base">
            {order.customers?.full_name}
          </p>
          <p className="text-gray-600 text-sm mb-2">{order.customers?.email}</p>

          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-medium text-gray-700">
              {formateDatelong(order.created_at)}
            </span>
            <span className="font-medium text-gray-900">
              {formatPrice(order.total_amount)}
            </span>
          </div>

          <select
            value={order.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {statusOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  </div>
);
}
