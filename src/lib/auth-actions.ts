"use server"
import {auth} from "./auth";
import {headers} from "next/headers"
import {redirect} from "next/navigation"
import bcrypt from "bcrypt";
import argon2 from "argon2";

export const signUp = async (email: string , password: string ,name: string) => {

    const result = await auth.api.signUpEmail({
        body: {
            email, password,name, callbackURL:'/perfil'
        }
    })
    redirect("/perfil"); 
    return result;
}
export const signIn = async (email: string , password: string) => {
    const result = await auth.api.signInEmail({
        body: {
            email, password, callbackURL:'/perfil'
        }
    })
    redirect("/perfil"); 
    return result;

}
export const signInSocial = async(provider: "google" | "discord")=>{
    let resultUrl: string | null = null;
    try{
        const {url} = await auth.api.signInSocial({
            body:{
                provider,
                callbackURL:'/perfil',
            }
    
        });
        resultUrl = url as string
    }catch(error){
        console.error(error);
        return {success:false, message: "Error authenticating with social provider"}
    }
    if(resultUrl){
        redirect(resultUrl);
    }
    return {success: true};
}
export const signOut = async () => {
    const result = await auth.api.signOut({headers: await headers()})
    return result;
}