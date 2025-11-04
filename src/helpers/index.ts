import type { color, product, variantProduct } from "../interface";

//funsion para formatear el precio a $

export const formatPrice = (price:number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    }).format(price);
    
};

// función para preparar los productos
export const prepareProducts = (products: product[]) => {
  return products.map(product => {
    // agrupar por color
    const colors = product.variants.reduce((acc: color[], variant: variantProduct) => {
      const existingColor = acc.find(item => item.color === variant.color);

      if (existingColor) {
        // si el color existe comparar precio:
        existingColor.price = Math.min(existingColor.price, variant.price);
      } else {
        acc.push({
          color: variant.color,
          price: variant.price,
          name: variant.color_name ?? variant.color, // Ajusta según tus datos
        });
      }

      return acc;
    }, []);

    // obtener el precio más bajo:
    const price = Math.min(...colors.map(item => item.price));

    // devolver el producto formateado:
    return {
      ...product,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
    };
  });
};


//Funcion para formatear la fecha  dd/mm/year:

export const  formateDatelong = (date:string): string=>{
    const dateObject = new Date(date);

    return dateObject.toLocaleDateString('es-ES',{
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};

//funcion para obtener el estado del pedido en español:

export const getStatus = (status: string): string =>{
    switch(status){
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'Procesando';
      case 'Shipped':
        return 'Enviado';    
      case 'Delivered':
        return 'Entregado'; 
        default:
          return status;   
    }
};

//funcion para formatear fecha dd/mm/yy:

export const  formateDatesort = (date:string): string=>{
    const dateObject = new Date(date);

    return dateObject.toLocaleDateString('es-ES',{
      year: 'numeric',
      month: '2-digit',
      day: 'numeric'
    });
};

//Funcion para generar el slug de un producto:

export const generateSlug = (name:string): string=>{
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// funsion para extraer el path relativo de la URL

export const extractFilePath =  (url: string) =>{
  const parts = url.split('/storage/v1/object/public/product-images/')

  if(parts.length !== 2){
    throw new Error (`Url de imagen no valida: ${url}`)
  }
  return parts[1]
}