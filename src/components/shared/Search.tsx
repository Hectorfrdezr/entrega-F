import { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/Global.store";
import { formatPrice } from "../../helpers";
import { searchProducts } from "../../actions";
import type { product } from "../../interface";
import { Link } from "react-router-dom";

export const Search = () => {

const [searchTerm, setsearchTerm] = useState('');
const [searchResult, setsearchResult] = useState<product[]>([])
const closeSearch = useGlobalStore (state => state.closeSheet);

const handleSearch = async (e: React.FormEvent) =>{
    e.preventDefault()
    if(searchTerm.trim()){
        const products= await searchProducts(searchTerm);
        setsearchResult(products);

    }
}

  return (
    <>
    <div className="py-5 px-7 flex gap-10 border-b items-center border-slate-200">
        <form className="flex gap-3 items-center flex-1 cursor-pointer"
        onSubmit={handleSearch}>
            <HiOutlineSearch size={22}/>
            <input type="text"  placeholder="Buscar" className="outline-none w-full text-sm" value={searchTerm} onChange={ e=> setsearchTerm(e.target.value)}/>

        </form>
        <button>
            <IoMdClose size={25} className="text-black" onClick={closeSearch}/>
        </button>
    </div>

    {/*resultados de busqueda*/}

    <div className="p-5">
        {
            searchResult.length > 0 ?(
                <ul>
                    {
                        searchResult.map(product =>(
                            <li className="py-2 group" key={product.id}>
                        <Link
                            to={`/productos/${product.slug}`} className="flex items-center gap-3"
                            onClick={closeSearch}>
                            <img 
                            src={product.images[0]} 
                            alt={product.name}  className="h-20 w-20 object-contain p-3"/>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold group-hover:underline">{product.name}</p>
                                <p className="text-[13px] text-gray-600">{product.variants[0].storage}/{''}
                                {product.variants[0].color_name}   
                                </p>
                                <p className="text-sm font-meium-text-gray-600">{formatPrice(product.variants[0].price)}</p>
                            </div>
                        </Link>
                    </li>
                    ))}
                </ul>
            ):(<p className="text-sm text-gray-600">No se encontraron resultados</p>)
        }
    </div>
    
    </>
  )
}
