import { useState } from "react"
import { FaEllipsis } from "react-icons/fa6"
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDeleteProduct, useProducts } from "../../../hooks";
import { Loader } from "../../shared/Loader";
import { formateDatesort, formatPrice } from "../../../helpers";
import { Pagination } from "../../shared/Pagination";


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

    const [selectedVariants, setSelectedVariants] = useState<{[key: string]:number}>({});

    const [openMenuIndex, setOpenMenuIndex] = useState <number | null>(null);

    const [page, setPage] = useState(1)

    const {products,isLoading,totalProducts} = useProducts({page});

    const {mutate, isPending}= useDeleteProduct();
    
    const handleMenuToggle = (index:number) =>{
        if(openMenuIndex === index){
            setOpenMenuIndex(null);
        }else{
            setOpenMenuIndex(index);
        }
    };

    const handleVariantChange = (productId:string,VariantIndex:number) =>{
        setSelectedVariants({
            ...selectedVariants,
            [productId]:VariantIndex
        })
    };
    
    const handleDeleteProduct = (id:string) =>{
        mutate(id);
        setOpenMenuIndex(null);
    }
   
    if (!products || isLoading || !totalProducts || isPending) return <Loader/>
    
    return (
        <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
        <h1 className="font-bold text-xl">Productos</h1>
        <p className="text-sm mt-1 mb-8 font-regular text-gray-500">
            Gestiona tus productos y mira las estadisticas de tus ventas
        </p>

         {/*Tabala */}   
        <div className="w-full">
  {/* Vista para pantallas medianas y grandes */}
  <div className="hidden sm:block overflow-x-auto">
    <table className="min-w-full text-sm text-left border-collapse">
      <thead className="border-b border-gray-200">
        <tr className="font-semibold text-gray-700">
          {tableHeaders.map((header, index) => (
            <th key={index} className="px-4 py-2 whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {products?.map((product, index) => {
          const selectedVariantIndex = selectedVariants[product.id] ?? 0;
          const selectedVariant = product.variants[selectedVariantIndex] || {};

          return (
            <tr key={index} className="border-b hover:bg-gray-50">
              {/* Imagen */}
              <td className="p-3 align-middle">
                <img
                  src={product.images[0]}
                  alt="Imagen Product"
                  className="w-14 h-14 aspect-square rounded-md object-contain"
                />
              </td>

              {/* Nombre */}
              <td className="p-3 font-medium text-gray-900 whitespace-nowrap">
                {product.name}
              </td>

              {/* Variante */}
              <td className="p-3">
                <select
                  className="border border-gray-300 rounded-md p-1 w-full"
                  onChange={(e) => handleVariantChange(product.id, Number(e.target.value))}
                  value={selectedVariantIndex}
                >
                  {product.variants.map((variant, variantIndex) => (
                    <option key={variant.id} value={variantIndex}>
                      {variant.color_name} - {variant.storage}
                    </option>
                  ))}
                </select>
              </td>

              {/* Precio */}
              <td className="p-3">{formatPrice(selectedVariant?.price)}</td>

              {/* Stock */}
              <td className="p-3">{(selectedVariant.stock || 0).toString()}</td>

              {/* Fecha */}
              <td className="p-3">{formateDatesort(product.created_at)}</td>

              {/* Menú acciones */}
              <td className="p-3 text-right relative">
                <button className="text-slate-900" onClick={() => handleMenuToggle(index)}>
                  <FaEllipsis />
                </button>
                {openMenuIndex === index && (
                  <div
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 w-[120px]"
                    role="menu"
                  >
                    <Link
                      to={`/dashboard/productos/editar/${product.slug}`}
                      className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Editar <HiOutlineExternalLink size={13} />
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* Vista tipo cards para móviles */}
  <div className="sm:hidden space-y-4">
    {products?.map((product, index) => {
      const selectedVariantIndex = selectedVariants[product.id] ?? 0;
      const selectedVariant = product.variants[selectedVariantIndex] || {};

      return (
        <div
          key={index}
          className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-16 h-16 rounded-md object-contain"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{formatPrice(selectedVariant?.price)}</p>
              <p className="text-xs text-gray-500">Stock: {selectedVariant.stock || 0}</p>
              <select
                className="border border-gray-300 rounded-md p-1 mt-2 w-full text-sm"
                onChange={(e) => handleVariantChange(product.id, Number(e.target.value))}
                value={selectedVariantIndex}
              >
                {product.variants.map((variant, variantIndex) => (
                  <option key={variant.id} value={variantIndex}>
                    {variant.color_name} - {variant.storage}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <button
              className="text-slate-900"
              onClick={() => handleMenuToggle(index)}
            >
              <FaEllipsis />
            </button>
            {openMenuIndex === index && (
              <div
                className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 w-[120px]"
                role="menu"
              >
                <Link
                  to={`/dashboard/productos/editar/${product.slug}`}
                  className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  Editar <HiOutlineExternalLink size={13} />
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>

  {/* Paginación */}
  <div className="mt-6">
    <Pagination page={page} setPage={setPage} totalItems={totalProducts} />
  </div>
</div>
</div>
)};
