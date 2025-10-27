import type { ProductInput } from "../interface";
import { supabase } from "../supabase/client";

export const getProducts = async (page:number) =>{
     const itemsPerPage = 10;
    const from = (page -1) * itemsPerPage;
    const to = from + itemsPerPage -1;

    const {data:products, error, count} = await supabase
    .from('products')
    .select('*,variants(*)',{count: 'exact'})
    .order('created_at',{ascending:false})
    .range(from, to);

    if(error){
        console.log(error.message);
        throw new Error(error.message);
    }return {products, count};
};

export const getFilteredProducts = async ({
    page = 1, 
    brands=[],
}:{
    page: number;
    brands: string[];
}) => {

    const itemsPerPage = 10;
    const from = (page -1) * itemsPerPage;
    const to = from + itemsPerPage -1;

    let query = supabase
    .from('products')
    .select ('*,variants(*)',{count: 'exact'})
    .order ('created_at', {ascending:false})
    .range(from,to);

    if(brands.length > 0){
        query = query.in('brand', brands);
    }

    const {data, error, count} = await query;
        
    if (error){
            console.log(error.message);
            throw Error (error.message);
        }

    return {data, count};
};

export const getRecentProducts = async () => {
    const {data:products, error} = await supabase
    .from('products')
    .select('*,variants(*)')
    .order('created_at',{ascending:false})
    .limit(4);
        
    if (error){
            console.log(error.message);
            throw Error (error.message);
        }

    return products;
    
};

export const getRandomtProducts = async () => {
    const {data:products, error} = await supabase
    .from('products')
    .select('*,variants(*)')
    .limit(20);
        
    if (error){
            console.log(error.message);
            throw Error (error.message);
        }

        const randomProducts = products
        .sort(()=> 0.5 - Math.random())
        .slice(0.4);

    return randomProducts;
};

export const  getProductBySlug = async (slug: string) => {
    const {data, error} = await supabase
    .from('products')
    .select('*,variants(*)')
    .eq('slug',slug)
    .single();

    if(error){
        console.log(error.message);
        throw new Error(error.message);
    }return data;
};

export const searchProducts = async(searchTerm: string) =>{
    const {data, error} = await supabase
    .from('products')
    .select('*,variants(*)').ilike('name',`%${searchTerm}%`);

      if(error){
        console.log(error.message);
        throw new Error(error.message);
    }return data;
};

//Administrador:

export const createProduct = async(productInput:ProductInput)=>{
    try{   
        //1. Crea el producto para obtener el ID:
        const {data:product,error:productError} = await supabase.from('products')
        .insert({
            name: productInput.name,
            brand: productInput.brand,
            slug: productInput.slug,
            features: productInput.features,
            description: productInput.description,           
            images:[],
        })
        .select().single();

        if(productError) throw new Error(productError.message);

        //2. Subir imagenes al bucle dentro de una carpeta que se creara a partir del prodcuto:
         const folderName = product.id;

         const uploadedImages = await Promise.all(
            productInput.images.map(async(image)=>{
                const {data,error} = await supabase.storage.from('product-images').upload(`${folderName}/${product.id}-${image.name}`,image);

                if(error) throw new Error(error.message);

                const imageUrl =  `${supabase.storage.from('product-images').getPublicUrl(data.path).data.publicUrl
                }`;
                return imageUrl;
            })
         );

         //3. Actualizar el producto con la imagen subida.
         const {error: updatedError} = await supabase.from('products').update({
            images: uploadedImages,
         }).eq('id', product.id)

         if(updatedError) throw new Error(updatedError.message);

         //4. Crear las variantes del producto:
         const variants = productInput.variants.map(variant =>({
                product_id: product.id,
                stock: variant.stock,
                price: variant.price,
                storage: variant.storage,
                color: variant.color,
                color_name: variant.colorName,
         }));

         const {error:varianstError} = await supabase.from('variants').insert(variants);

         if(varianstError) throw new Error(varianstError.message)

        return product;

    }catch(error){
        console.log(error)
        throw new Error('Error inesperado, Vuelva a intentarlo');
    }
} 