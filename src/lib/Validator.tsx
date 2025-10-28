import type { JSONContent } from '@tiptap/react';
import {z} from 'zod';

export const userRegisterSchema = z.object({
  email: z
  .string()
  .email('Por favor, ingrese un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  fullName: z.string().min(1, 'El nombre completo es requerido'),
  phone: z.string().optional(),
});

export const addressSchema = z.object({
  addressLine1: z
  .string()
  .min(1,'La dirección requerida')
  .max(100, 'la dirección no debe exceder los 100 carácteres'),

  addressLine2: z
  .string()
  .max(100, 'la dirección no debe exceder los 100 carácteres')
  .optional(),

  city: z
  .string()
  .min(1,'la ciudad es requerida')
  .max(50,'la cuidad no debe exceder los 50 carácteres'),
  
  state: z
  .string()
  .min(1,'el estado es requerida')
  .max(50,'el estado no debe exceder los 50 carácteres'),
  
  postalCode: z
  .string()
  .max(8,'el codigo no debe exceder los 50 carácteres')
  .optional(),

  country:z.string().min(1,'el pais es requerido')
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;

export type AddressFormValues = z.infer<typeof addressSchema>;

export const isContentEmpty = (value:JSONContent): boolean=>{
  if(!value || !Array.isArray(value.content) || value.content.length == 0){
    return true;
  }
  return !value.content.some(
    (node) => 
      node.type === 'paragraph' && 
      Array.isArray(node.content) && 
      node.content.some(
        (textNode) => 
          textNode.type === 'text' && 
          textNode.text?.trim() !== '')
  );
}
 

export const productSchema =
 z.object({
  name: z
  .string()
  .min(1, 'El nombre del producto es obligatorio'),
  
  brand: z
  .string()
  .min(1, 'La marca del producto es obligatoria'),
  
  slug: z
  .string()
  .min(1, 'el slug del producto es obligatorio').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Slug inválido'),
  features: z.array(z.object({
    value: z.string().min(1, 'La caracteristicas no pueden estar vacias'),
  })),
  
  
  description: z.custom<JSONContent>(
    (value) => !isContentEmpty(value as JSONContent),
    { message: "La descripción no puede estar vacía" }
  ),

    variants: z.array(
      z.object({
          id: z.
          string()
          .optional(),
          
          stock: z
          .number(),
          
          
          price: z
          .number()
          .min(0.01, 'El precio debe ser mayor a 0'),
          
          storage: z
          .string()
          .min(1, 'El almacenamiento es requerido'),
          
          color: z
          .string()
          .regex(/^(?:#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})|rgba?\(\s*(?:\d{1,3}%?\s*,\s*){2}\d{1,3}%?(?:\s*,\s*(?:0|0?\.\d+|1(?:\.0+)?))?\s*\)|hsla?\(\s*\d{1,3}(?:\.\d+)?(?:deg|grad|rad|turn)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(?:,\s*(?:0|0?\.\d+|1(?:\.0+)?))?\s*\))$/, 'El color debe ser valido en formato hexadexcimal,rgb o hsl'),
          
          colorName: z
          .string()
          .min(1,'el nombre del color es obligatorio'),

    })
  ).min(1, 'Debe al ver al menor una variante'),
  
  images: z
  .array(z.any())
  .min(1, ' debe haber al menos una imagen'), 
});

export type ProductFormValues = z.infer<typeof productSchema>