import { Link } from "react-router-dom";
import {z} from 'zod';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


export const userRegisterSchema = z.object({
  email: z
  .string()
  .email('Por favor, ingrese un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  fullName: z.string().min(1, 'El nombre completo es requerido'),
  phone: z.string().optional(),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;

export const Registro = () => {

  const {register, handleSubmit, formState:{errors}} = useForm<UserRegisterFormValues>({
    defaultValues:{
      fullName:'',
      email: '',
      password: '',
      phone: '',
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const onLogin =  handleSubmit(data => {
    console.log(data);
  })

  console.log(errors);

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
        <h1 className="text-4xl font-bold capitalize">
            Registrarse
        </h1>
        <p className="text-sm font-medium">
            ¡Para registrarse rellene el formulario!
        </p>

         <>
        <form action="" className="flex flex-col gap-4 items-center w-full sm:w-[400px] lg:w-[500px] mt-10" onSubmit={onLogin}>

            <input type="text" placeholder="Nombre y Apellido"
            className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            {...register('fullName')}
           />
           {
            errors.fullName && (<p className="text-red-500">{errors.fullName.message}</p>)
           }
            <input type="text" placeholder="Telefono"
            className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
           {...register('phone')}
           />
            {
            errors.phone && (<p className="text-red-500">{errors.phone.message}</p>)
           }
            <input type="email" placeholder="Ingrese un correo electrónico"
            className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            {...register('email')}
           />
             {
            errors.email && (<p className="text-red-500">{errors.email.message}</p>)
           }
            <input type="password" placeholder="Ingrese una contraseña"
            className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
            {...register('password')} 
            />
             {
            errors.password && (<p className="text-red-500">{errors.password.message}</p>)
           }
            <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
                Registrarme
            </button>

        </form>

        <p className="text-sm text-stone-800">
            ¿Ya tienes una cuenta?
               <Link to='/login' className="underline ml-12">Inicia sesión
               </Link> 
        </p>
        </>
    </div>
  )
};
