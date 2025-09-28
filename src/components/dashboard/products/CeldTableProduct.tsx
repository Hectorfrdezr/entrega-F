interface Props {

    content:string;
}


export const CeldTableProduct = ({
    content
}:Props) => {
  return (
    <td className="p-4 font-medium tracking-tighter">
          {content}                  
    </td>    
  )
}
