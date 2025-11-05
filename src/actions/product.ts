import { extractFilePath } from "../helpers";
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

                if (image instanceof File) {
                const safeName = image.name.replace(/\s+/g, "-").toLowerCase();

                const {data,error} = await supabase.storage.from('product-images').upload(`${folderName}-${safeName}`,image);

                if(error) throw new Error(error.message);

                const imageUrl =  `${supabase.storage.from('product-images').getPublicUrl(data.path).data.publicUrl
                }`;
                return imageUrl;
            }
            if(typeof image === 'string'){
                return image;
            }
            throw new Error(`Tipo de imagen no soportado: ${typeof image}`)
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
};

export const deleteProduct = async (productId: string) =>{
    //1. eliminar la variantes del producto:
    const {error:varianstError} = await supabase.from('variants').delete().eq('product_id',productId)

        if(varianstError) throw new Error(varianstError.message);

    //2. Obtener las imagenes del producto:
    const {data: productImages, error: imagesError} = await supabase.from('products').select('images').eq('id',productId).single();

    if(imagesError) throw new Error(imagesError.message)

    //3. eliminar el producto:
    const {error: deletError} = await supabase.from('products').delete().eq('id', productId);

        if(deletError) throw new Error(deletError.message)
    
    // Eliminar imagenes del bucket:
    if(productImages.images.length > 0){
        const folderName = productId;

        const paths = productImages.images.map(image => {
            const fileName = image.split('/').pop();
            return `${folderName}/${fileName}`;
        });

        const {error: storegeError} = await supabase.storage.from('product-images').remove(paths);

        if(storegeError) throw new Error(storegeError.message);
    }
    return true
};


export const updateProduct = async (
    productId: string,
    productInput: ProductInput
) => {
    //1. obtener imagenes actuales
    const {data: currentProduct, error: currentProductError} = await supabase.from('products').select('images').eq('id',productId).single();

    if(currentProductError) throw new Error (currentProductError.message);

    const existingImages = currentProduct.images || [];

    //2. Actualizar la informacion individual del producto

    const {data: updatedProduct, error: productError} = await supabase.from('products').update({
        name: productInput.name,
        brand: productInput.brand,
        slug: productInput.slug,
        description: productInput.description
    }).eq('id', productId).select().single();

    if(productError) throw new Error(productError.message);

    //3. Manejo de imagen

    const folderName = productId;

  const ValidImages = (productInput.images || []).filter((img) => !!img);

    //3.1 Identificar las imagenes q han sido eliminadas

    const imageToDelete = existingImages.filter((img: string) => !ValidImages.includes(img));

    //3.2 Obtener los pathc de los archivos a eliminar

    const fileToDelete = imageToDelete.map(extractFilePath);

    //3.3 eliminar images del bucle

    if(fileToDelete.length > 0){
        const {error: deleteImageError} = await supabase.storage.from('products-images').remove(fileToDelete)

         if (deleteImageError) throw new Error(deleteImageError.message);
            console.log(`Imagenes eliminadas: ${fileToDelete.join(",")}`); 
    }
    //3.4 subir las nuevas imagenes y construir el array de imagenes actualizado
    const uploadedImages = await Promise.all(
        ValidImages.map(async (image)=>{
            if(image instanceof File){
                const safeName = image.name.replace(/\s+/g, "-").toLowerCase();
              const {data, error} = await supabase.storage.from('product-images').upload(`${folderName}/${productId}-${safeName}`, image);
              
              if(error) throw new Error(error.message);

              const imageUrl = supabase.storage.from('product-images').getPublicUrl(data.path).data.publicUrl;

            return imageUrl;
            }else if(typeof image === 'string'){
                return image
            }else{
           console.warn("Tipo de imagen desconocido:", image);
            return null;
            }
        })
    );

    //Filtrar nulos si los hubiera

    const finalImages = uploadedImages.filter(Boolean) as string[];
    
    //4. actualizar el producto con las imagenes actualizadas

    const {error:updateImagesError} = await supabase
    .from('products')
    .update({images:finalImages})
    .eq('id', productId);

    if(updateImagesError) throw new Error(updateImagesError.message);

    //5. actualizar variantes del producto

    const existingVariants = productInput.variants.filter(v => v.id);
    const newVariants = productInput.variants.filter(v => !v.id);
    //5.1 modificar variantes existentes
    if(existingVariants.length > 0){
        const {error: updateVariantsError} = await supabase.from('variants').upsert(existingVariants.map(variants =>({
            id: variants.id,
           product_id:productId,
           stock: variants.stock,
           price: variants.price,
           storage: variants.storage,
           color: variants.color,
           color_name: variants.colorName
    })),{
        onConflict: 'id',
    }
    );
    if(updateVariantsError) throw new Error(updateVariantsError.message)
    }

    //5.2 crear y guardar las variantes

    let newVariantIds: string[] = [];

    if(newVariants.length > 0){
        const {data, error: insertVariantError} = await supabase.from('variants').insert(newVariants.map(variants =>({
           product_id:productId,
           stock: variants.stock,
           price: variants.price,
           storage: variants.storage,
           color: variants.color,
           color_name: variants.colorName,
        }))).select();

        if(insertVariantError) throw new Error(insertVariantError.message);

        newVariantIds = data.map(variant => variant.id);
    };

    //5.3 combinar las variantes

    const currentVariantIds = [
        ...existingVariants.map(v => v.id),
        ...newVariantIds,
    ];

    //5.4 Actualizar las variantes en supabase

    const {error:deleteVariantError} = await supabase.from('variants').delete().eq('product_id', productId).not('id','in', `(${currentVariantIds ? currentVariantIds.join(','): 0})`);

    if(deleteVariantError) throw new Error(deleteVariantError.message);

    return updatedProduct;
};