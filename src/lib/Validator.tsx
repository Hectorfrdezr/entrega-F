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