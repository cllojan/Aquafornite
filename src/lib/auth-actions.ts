"use server"
import {auth} from "./auth";
import {headers} from "next/headers"
import {redirect} from "next/navigation"
import bcrypt from "bcrypt";
import argon2 from "argon2";
type ServerActionResult<T> = | {success: true, data: T} | {success: false, error: string};
export class ServerActionError extends Error {
    constructor(message:string) {
      super(message);
      this.name = "ServerActionError";
    }
  }
   
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
        resultUrl = url as string;
    }catch(error ){
        if(error instanceof ServerActionError){
            return {success:false, error: error.message};
        }        
        throw error;
    }   
    if(resultUrl){
        redirect(resultUrl);
    }
}
export const signOut = async () => {
    const result = await auth.api.signOut({headers: await headers()})
    return result;
}