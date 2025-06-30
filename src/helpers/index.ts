import type { color, product, variantProduct } from "../interface";

//funsion para formatear el precio a $

export const formaPrice = (price:number) => {
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
        // si el color existe comparar precio
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

    // obtener el precio más bajo
    const price = Math.min(...colors.map(item => item.price));

    // devolver el producto formateado
    return {
      ...product,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
    };
  });
};