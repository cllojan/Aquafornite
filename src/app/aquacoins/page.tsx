'use client'
import Header from "@/components/Header";
import { signOut, useSession } from "@/lib/auth-client";
const aquacoinslist = [
    {
        quantity: 1000,
        price: 5,
        image: "/images/aquacoin1.png",
    },
    {
        quantity: 2800,
        price: 5,
        image: "/images/aquacoin2.png",
    },
    {
        quantity: 5000,
        price: 5,
        image: "/images/aquacoin3.png",
    },
    {
        quantity: 13500,
        price: 5,
        image: "/images/aquacoin4.png",
    },
]
export default function AquaCoinsPage() {
    const { data: session } = useSession();
    const handleAqua = async (items: any) => {        
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session?.user?.id ?? null, 
                coins: items,
            }),
        })
        console.log(session)
        console.log(items)
        const { url } = await response.json();
        console.log(url)
        window.location.href = url
    }
    return (
        <>
        <Header/>
        <div className="pt-10  w-full flex flex-col  min-h-screen p-2">
            <div className="container p-6">
                <div className="items grid grid-cols-2 gap-2 md:gap-4 mt-4  xl:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {
                        aquacoinslist.map((item, index) => (
                            <div key={index} className="item group card image-full flex-shrink-0  h-[230px] md:h-[280px] max-w-xs relative overflow-hidden cursor-pointer shadow-[0px_0px_80px_-44px_rgba(0,_0,_0,_0.7)] bg-gradient-to-b from-sky-300 to-indigo-600"
                                data-name="pack de guerreros costeros" data-rarity="Epic" data-categoria="Guerreros costeros"
                                data-tipo="" >
                                <img loading="lazy" alt="Pack de Guerreros costeros"
                                    className="z-0 w-full object-cover h-full transition-transform duration-700 ease-out group-hover:scale-105 active:scale-105"
                                    src={item.image} />
                                <div
                                    className="w-full pl-2 pr-2 pb-10  translate-y-8 absolute bg-gradient-to-t from-zinc-900  ellipsis to-transparent bottom-[-50] z-9 pb-2  group-hover:-translate-y-8 transition-transform duration-300">
                                    <div className="flex flex-col">
                                        <h3 className="text-white text-lg font-semibold text-shadow-sm">{item.quantity} aquacoins</h3>
                                        <div className="flex flex-row items-center text-white  font-semibold truncate ellipsis text-center">

                                            <p>${item.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="buy-button btn mt-2  w-full  btn-primary text-white font-medium transition-colors"
                                        onClick={() => handleAqua(item)}
                                        >Comprar</button>
                                </div>
                            </div>
                        ))
                    }
                    <div className="item group card image-full flex-shrink-0  h-[230px] md:h-[280px] max-w-xs relative overflow-hidden cursor-pointer shadow-[0px_0px_80px_-44px_rgba(0,_0,_0,_0.7)] bg-gradient-to-b from-sky-300 to-indigo-600"
                        data-name="pack de guerreros costeros" data-rarity="Epic" data-categoria="Guerreros costeros"
                        data-tipo="" >
                        <img loading="lazy" alt="Pack de Guerreros costeros"
                            className="z-0 w-full object-cover h-full transition-transform duration-700 ease-out group-hover:scale-105 active:scale-105"
                            src="/images/aquacoin.png" />
                        <div
                            className="w-full pl-2 pr-2 pb-10  translate-y-8 absolute bg-gradient-to-t from-zinc-900  ellipsis to-transparent bottom-[-50] z-9 pb-2  group-hover:-translate-y-8 transition-transform duration-300">
                            <div className="flex flex-col">
                                <h3 className="text-white/75 text-lg font-semibold text-shadow-sm">La cantidad que quieras</h3>
                                <div className="flex flex-row items-center text-white  font-semibold truncate ellipsis text-center">

                                </div>
                            </div>
                            <button
                                className="buy-button btn mt-2  w-full  btn-primary text-white font-medium transition-colors">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

