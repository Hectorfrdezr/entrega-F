import { prepareProducts } from "../helpers"
import { CardProduct } from "../products/CardProduct";
import { Filter } from "../products/Filter";
import { useFilteredProducts } from "../hooks";
import { useState } from "react";
import { Pagination } from "../components/shared/Pagination";

export const CellPhones = () => {

 const [page,setPage] = useState(1);
 const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const {data:products = [],isLoading, totalProducts} = useFilteredProducts({
    page,
    brands:selectedBrands
  });


  const preparedProducts = prepareProducts(products);

  return (
    <>
      <h1 className="text-5xl font-semibold test-center mb-12">
        Celulares
      </h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-colsl-5">
          <Filter
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />

          {
            isLoading ?(
              <div className="col-span-2 flex items-center justify-center h-[500px]">Cargando</div>
            ):(
                <div className="col-span-2 lg:col-span-2 cl:col-span-4 flex flex-col gap-12">

                <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                    {preparedProducts.map(product =>(
                       <CardProduct 
                                      key={product.id}
                                      name = {product.name}
                                      price= {product.price}
                                      colors ={product.colors}
                                      img= {product.images[0]}
                                      slug={product.slug}
                                      variants={product.variants}
                                     />
                    ))}
                </div>
                <Pagination
                  totalItems = {totalProducts}
                  page = {page}
                  setPage = {setPage}
                
                />
          </div>
            )
          } 
      </div>
    </>
  )
};
