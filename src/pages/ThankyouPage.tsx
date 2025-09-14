import { useParams } from "react-router-dom"



export const ThankyouPage = () => {

    const {id} = useParams<{id: string}>();

  return (
    <div>Gracias por tu compra -pedido # {id}</div>
  )
}
