'use client'
import useSWR from "swr";
import {createContext, useContext, ReactNode} from "react";

const fetcher = (url:string) => fetch(url).then(res=>res.json());
interface UserData{
    id:string;
    name:string;
    email:string;
    aquacoins:number;
    image?:string;
    discord_name?:string;
    discord_id?:string;
}


const UserContext = createContext<{user: UserData | null; isLoading: boolean;}|null>(null);

export function UserProvider({children}:{children:ReactNode}){
    const {data:user, error,isLoading} = useSWR<UserData>("/api/profile", fetcher);
    return (
        <UserContext.Provider value={{user:user || null, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    const context = useContext(UserContext);
    if(!context){
        throw new Error("Error: useUser debe ser usado dentro de UserProvider");        
    }
    return context;
}