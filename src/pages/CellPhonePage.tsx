import { LuMinus, } from "react-icons/lu";
import { Separator } from "../components/shared/Separator";
import { formatPrice } from "../helpers";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { ProductDescription } from "../components/OneProduct/ProductDescription";
import { GridImages } from "../components/OneProduct/GridImages";
import { useProduct } from "../hooks/products/useProduct";
import { useEffect, useMemo, useState } from "react";
import type { variantProduct } from "../interface";
import { Tag } from "../components/shared/Tag";
import { Loader } from "../components/shared/Loader";
import { FaPlus } from "react-icons/fa6";
import { useCounterStore } from "../store/Counter.store";
import { useCartStore } from "../store";
import toast from "react-hot-toast";

interface Acc{
    [key:string]:{
        name: string;
        storages: string[];
    }
}

export const CellPhonePage = () => {

    const {slug} = useParams<{slug:string}>();

    const [currentSlug, setcurrentSlug] = useState(slug);

    const {product,isLoading,isError} = useProduct(currentSlug || '');

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<variantProduct | null>(null);

    const count = useCounterStore(state => state.count);
    const increment = useCounterStore(state => state.increment);
    const decrement = useCounterStore(state => state.decrement);

    const addItem = useCartStore (state =>state.addItem);

    const navigate = useNavigate();

    const colors = useMemo(() => {
        return product?.variants.reduce((acc:Acc,variant:variantProduct)=>{
            const {color,color_name,storage} = variant;

            if(!acc[color]){
                acc[color] ={
                    name: color_name,
                    storages: [],
                 };
            }
            if(!acc[color].storages.includes(storage)){
                acc[color].storages.push(storage)
            }
            return acc;
        },{} as Acc
    ) || {};
    },[product?.variants]);

    //color Prdeterminado
    const availableColors = Object.keys(colors)
        useEffect (()=>{
            if (!selectedColor && availableColors.length > 0){
                setSelectedColor(availableColors[0]);
            }

        },[availableColors,selectedColor]);

    // actualizar storage
    useEffect(() => {
        if(selectedColor && colors[selectedColor] && !selectedStorage){
            setSelectedStorage(colors[selectedColor].storages[0]);
        }
    },[selectedColor,colors,selectedStorage]);


    //obtener la variante seleccionada
    useEffect(()=>{
            if(selectedColor && selectedStorage){
                const variant = product?.variants.find(
                    variant => 
                    variant.color === selectedColor &&
                    variant.storage === selectedStorage);
             setSelectedVariant(variant as variantProduct)       
            };
    },[selectedColor,selectedStorage,product?.variants]);
    
    //Stock
    const IsOutOfStock = selectedVariant?.stock === 0;

    //funcion para añadir al carrito
    const addToCart = () =>{
        if(selectedVariant){
            addItem({
                variantId:selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0] || '',
                color: selectedVariant.color_name || '',
                storage: selectedVariant.storage,
                price:selectedVariant.price,
                quantity:count,
            });
            toast.success('Producto añadido al carrito',{position:'bottom-right'});
        }
    };

    //funsion para comprar ahora
    const buyNow = () =>{
        if(selectedVariant){
            addItem({
                variantId:selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0] || '',
                color: selectedVariant.color_name || '',
                storage: selectedVariant.storage,
                price:selectedVariant.price,
                quantity:count,
            });
            navigate ('/checkout');
        }
    };
//resetear slug en la url
    useEffect(()=>{
        setcurrentSlug(slug);
        //reiniciar busqueda
        setSelectedColor(null);
        setSelectedStorage(null);
        setSelectedVariant(null);
    },[slug]);



    if(isLoading)return <Loader/>;

    if(!product || isError)return(
        <div className="felx justify-center items-center h-[80Vh]">
            <p>Producto no encontrado</p>
        </div>
    );

    return (<>
    <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
        <div>
           <GridImages images={product.images}/>
        </div>
        <div  className="flex-1 space-y-5">
                <h1 className="text-3xl font-bold tracking-tigth">
                   {product.name}
                </h1>

                <div className="flex gap-5 item-center">
                    <span className="tracking-wide text-lg font-semibold">{formatPrice(selectedVariant?.price || product.variants[0].price)}</span>
                    
                <div className="relative">
                    {IsOutOfStock && <Tag contentTag="agotado"/>}
                </div>
            </div>

            <Separator/>

            {/*Caracteristicas */}
             <ul className="space-y-2 ml-7 my-10">
               {
                product.features.map(feature =>( 
                <li 
                key={feature}
                className="text-sm flex items-center gap-3 tracking-tight font-medium">
                    <span className="bg-black w-[5px] h-[5px] rounded-full"/>
                    {feature}
                </li>))
               }
             </ul>

            <div className="flex flex-col gap-3">
                    <p>color:{selectedColor && colors[selectedColor].name}</p>
                    <div className="flex gap-3">
                        {
                            availableColors.map(color =>(
                            <button 
                            key={color}
                            className={`w-8 h-8 rounded-full flex justify-center items-center ${ selectedColor === color? 'bg-blue-500' : 'bg-gray-500'}`}

                            onClick={()=> setSelectedColor(color)}
                            >
                            <span className="w-[26px] h-[26px] rounded-full" style={{backgroundColor:color}}/>
                        </button>))
                        }
                        
                    </div>
            </div> 

        {/*Opciones de almacenamiento*/} 
        <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">
                Almacenamiento disponible
            </p>
                {selectedColor && (
                    <div className="flex gap-3">
                <select className="border border-gray-300 rounded-lg px-3 py-1" value={selectedStorage || ''}
                    onChange={e => setSelectedStorage(e.target.value)}
                >
                    {
                        colors [selectedColor].storages.map(storage =>(
                            <option value={storage} key={storage}>{storage}</option>
                        ))    
                    
                    }
                </select>
            </div> 
                )}   
        </div>
        {/*Comprar*/}
        {
            IsOutOfStock ? (
                <button
                className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full"
                disabled>
                    Agotado
                </button>
            ):(
                <>
                {/*Contador */}
                <div className="space-y-3">
                    <p className="text-sm font-medium">
                        Cantidad
                    </p>
                    <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                        <button onClick={decrement}
                            disabled= {count === 1}>
                            <LuMinus size={15}/>
                        </button>
                        <span className="text-slate-500 text-sm">{count}</span>
                        <button onClick={increment}>
                            <FaPlus size={15}/>
                        </button>
                    </div>
                </div>
                {/*Botones de accion */}

                <div className="flex flex-col gap-3">
                    <button className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg[#e2e2e2]" onClick={addToCart}>
                        Agregar al carrito.
                    </button>
                    <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full" onClick={buyNow}>
                        Comprar ahora
                    </button>
                </div>
                </>
            )}

            <div className="flex pt-2">
                <div className="flex flex-col gap-1 flex-1 items-center">
                    <CiDeliveryTruck size={35}/>
                    <p className="text-xs font-semibold">
                        Envio Gratis
                    </p>
                </div>
                <Link to="#" className="flex flex-col gap-1 flex-1 items-center justify-center">
                    <BsChatLeftText size={30}/>
                    <p className="flex flex-col items-cente text-xs">
                        <span className="font-semibold">
                            ¿Necesitas ayuda?
                        </span>
                        Contactanos Aqui!
                    </p>
                </Link>
            </div>
        </div>
    </div>
                {/**Descripción */}
    <ProductDescription content={product.description}/>                
  </>
  );
};
