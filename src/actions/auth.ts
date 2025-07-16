import { supabase } from "../supabase/client";

interface IAuthRegister {
    email: string;
    password: string;
    fullname: string;
    phone?: string;
};

interface IAuthLogin {
    email: string;
    password: string;
};

export const singUP = async ({
    email,password,fullname,phone,
}:IAuthRegister)=>{
    try{
       // 1. crear al usuario:
       const {data, error} = await supabase.auth.signUp({
        email,password
       });
       if(error){throw new Error(error.message)}

    const  userId = data.user?.id; 
    
    if(!userId){throw new Error('Error al obtener el id del usuario')};

    //2. autenticar al usuario:

    const {error: singnInError} = await supabase.auth.signInWithPassword({
        email,password
    });

    if(singnInError){throw new Error ('Email o Contraceña incorrectos')};

    //3. instertar el rol por defecto - CUSTOMER(Cliente):
    const {error:roleError}= await supabase.from('user_roles').insert({
        user_id: userId,
        roles: 'customer',
    })
    if(roleError){
        console.log(roleError);
        throw new Error('Error al registrar el rol del usuario')
    }
     //4. insertar los datos del usuario en la tabla customer(clientes):
    const {error:customerError} = await supabase.from('customers').insert({
        user_id: userId,
        full_name: fullname,
        phone,
        email,
    })
    if(customerError){
        throw new Error('Error al registrar datos del usuario')
    }
    return data;

    }catch(error){
        console.log(error)
        throw new Error ('Error al regitrar usuario')
    }
};

export const signIn = async  ({email, password}: IAuthLogin)=>{

    const {data, error} = await supabase.auth.signInWithPassword({
        email, password
    });

    if(error){throw new Error ('Email o Contraceña incorrectos')};
    return data;
};

export const signOut = async () =>{
    const {error} = await supabase.auth.signOut();

    if(error){
        console.log(error);
        throw new Error('Error al cerrar sesión')
    }
};


export const getSession = async () =>{
    const {data, error} = await supabase.auth.getSession();
    
    if(error){
        console.log(error);
        throw new Error('Error al obtener sesión');
    }return data;
}
