'use client'
import { useSkinCart } from "@/hooks/useSkinCart";
import { useUser } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default  function Success(){
    
    const {items, removeAll} =  useSkinCart();
    const { user,isLoaded } = useUser();
    const [hasSaved, setHasSaved] = useState(false);
    
    useEffect(() => {
        if (!isLoaded || items.length === 0 || hasSaved) return;
        const sendToHistory = async () => {
            if (!user) {
                console.log("⚠️ Usuario no registrado, no se guardará historial.");
                removeAll()
                return;
              }
            try {
                const skinsDiscount = items.map(skin => skin.discount)
    
                const history = {
                    user_id:user?.id,
                    items: items.map(item => ({
                        name:item?.bundle?.name || item?.brItems?.[0].name || item.tracks?.[0].title,
                        price:item.discount,
                        image:item?.newDisplayAsset?.renderImages[0].image || item.tracks[0].albumArt
                    })),
                    total:skinsDiscount.reduce((sum ,item) => sum + item,0)
                }
                console.log(history)
                const res = await fetch('/api/history', {
                    method:"POST",
                    headers:{
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(history)
                })

                const data = await res.json();
                console.log('Historial guardado', data);
                
            }catch(e){
                console.log("Error al guardar",e);
            }
            finally{
                removeAll()
                setHasSaved(true)
            }

        }
        sendToHistory();
    },[isLoaded,items,user,hasSaved])
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-4 flex justify-center">
                    <Image src={'/images/check_circle.png'} alt="check" width={100} height={100}/>
                </div>
                <h1 className="text-3xl font-bold mb-2">Gracias!</h1>
                <p className="text-gray-00 mb-8">Tu compra fue exitosa </p>
                <Link href="/">
                    <button className="btn btn-primary">Volver a la inicio</button>
                </Link>
            </div>
        </div>
    )
}