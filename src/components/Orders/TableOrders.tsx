import type { OrderItemsSingle } from "../../interface";

interface Props {
    orders: OrderItemsSingle[];

}

const tableHeaders = ['ID','Fecha','Estado','Total',];


const TableOrders = ({orders}: Props) => {
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
                {
                    orders.map(order =>(
                        <tr key={order.id} className="cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                                <td className="p-4 font-medium tracking-tighter">{order.id}</td>
                                <td className="p-4 font-medium tracking-tighter">{order.createAt}</td>
                                <td className="p-4 font-medium tracking-tighter">{order.status}</td>
                                <td className="p-4 font-medium tracking-tighter">{order.total_amount}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default TableOrders