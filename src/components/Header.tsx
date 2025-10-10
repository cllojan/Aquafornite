'use client'

import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { useSkinCart } from "@/hooks/useSkinCart";
import { ShopCartBold } from "@/components/icons/ShopCartBold"
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SelectedItems from "./SelectedItems";
import { signOut, useSession } from "@/lib/auth-client";
import Skin, { SkinWithDiscount } from "@/interfaces/skin.interface";
const countryOptions = [
    { id: "usd", label: "DOLAR", icon: <Icon icon="emojione-v1:flag-for-united-states" fontSize={28} style={{ color: 'white' }} /> },
    { id: "mx", label: "MXN", icon: <Icon icon="emojione-v1:flag-for-mexico" fontSize={28} style={{ color: 'white' }} /> },
    { id: "sol", label: "SOL", icon: <Icon icon="emojione-v1:flag-for-peru" fontSize={28} style={{ color: 'white' }} /> },

]


const Header = () => {

    const [theme, setTheme] = useState('corporate');
    const { data: session } = useSession();
    console.log(session)

    const { items, removeAll, removeItem } = useSkinCart()
    const skins = items.map(skin => skin.discount)
    const total = skins.reduce((total, price) => total + price, 0)

    const router = useRouter();
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme])
    const handlePay = async () => {
        const formatedItems = items.map(item => ({
            name: item.bundle.name || item.brItems?.[0].name,
            price: item.discount,
            images: item?.newDisplayAsset?.renderImages[0].image,
            quantity: 1,
        }))
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: formatedItems,
            }),
        })
        const { url } = await response.json();
        window.location.href = url
    }
    const handleCountryChange = (value: any) => {
        console.log("País seleccionado:", value.id)
    }
    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");

        } catch (e) {
            console.error("Error", e)
        }
    }
    const getBackgroundStyle = (skin: Skin) => {
        const colors = skin?.colors;
        if (!colors) {
            return { background: '#333' }; // Default color if no colors are provided
        }
        const colorStops = [];
        if (colors.color1) colorStops.push(`#${colors.color1}`);
        if (colors.color2) colorStops.push(`#${colors.color3}`);


        return { background: `linear-gradient(to bottom, ${colorStops.join(', ')})` };
    };
    return (
        <div className="fixed z-1000 w-full flex flex-row items-center justify-between bg-black/10 backdrop-blur-md navbar shadow-sm px-8 z-3">

            <div className="flex items-center">

                <div className="flex-1 flex-row items-center justify-center mt-2">
                    <div className="font-fortnite text-3xl text-white">AQUAFORNAIS</div>
                </div>
                {/*
                <div className="flex text-white gap-5 items-center ml-10 ">
                    <Link href="/">Inicio</Link>
                    <Link href="/shop">Tienda</Link>
                    <Link href="/about">Acerca de Nosotros</Link>
                </div>*/}
            </div>
            <div className="flex items-center">

                <SelectedItems options={countryOptions} onChange={handleCountryChange} />

                <div className=" relative drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button border-none btn btn-ghost hover:bg-transparent hover:border-none ">

                            {
                                items.length === 0
                                    ?
                                    <div className=" flex flex-row ">
                                        <Icon icon="solar:cart-large-2-outline" fontSize={28} style={{ color: 'white' }} />
                                    </div>
                                    :
                                    <div className=" flex flex-row items-center">
                                        <Icon icon="solar:cart-large-2-outline" fontSize={28} style={{ color: 'white' }} />
                                        <span className="badge badge-sm badge-secondary">{items.length}</span>
                                    </div>
                            }


                        </label>
                    </div>
                    <div className="drawer-side  z-90">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "></label>
                        <div className="z-1000 menu bg-base-200 text-base-content min-h-full w-70 md:w-80 p-4 flex flex-col">
                            {/* Sidebar content here */}
                            <div className="flex items-center mb-10">
                                <h1 className="flex-1 text-lg">Carrito de compras</h1>
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
                                        <Icon icon="solar:exit-bold" fontSize={25} style={{ color: 'black' }} />
                                    </label>
                                </div>
                            </div>
                            <div className="z-100 flex w-full flex-col ">
                                {
                                    items.length === 0
                                        ?
                                        (<div className="flex flex-col justify-center gap-7 items-center">
                                            <Icon icon="bi:cart-x" fontSize={75} />
                                            <h1 className="text-lg text-center">Carrito de compras <span className="text-error text-center text-bold">vacio!</span></h1>
                                            <p className="text-center">Agrega algunos productos antes de proceder con la compra </p>
                                        </div>) :
                                        items.map((item, inx) => (
                                            <div className="" key={inx}>
                                                <div className="w-full flex flex-row ">
                                                    <div
                                                        className="size-24 shrink-0 overflow-hidden rounded-md "
                                                        style={{

                                                            ...getBackgroundStyle(item)
                                                        }}
                                                    >
                                                        <img className="size-full object-cover" src={item.newDisplayAsset?.renderImages[0].image || item.tracks[0].albumArt} alt="" />
                                                    </div>
                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div className="flex justify-between  font-medium ">
                                                            <h3 >{item?.bundle?.name || item.brItems?.[0].name || item.tracks?.[0].title}</h3>
                                                            <p className="ml-4">{item.discount}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500"></p>
                                                            <span className="group cursor-pointer" onClick={e => removeItem(item.mainId)}><Icon className="group-hover:text-error" icon="solar:trash-bin-2-bold" fontSize={25} /></span>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" divider"></div>
                                            </div>
                                        ))

                                }
                                <div className="" >
                                    <div className="w-full h-20 flex flex-row ">
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div className="flex justify-between  font-medium ">
                                                <h3 ></h3>
                                                <p className="ml-4"></p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500"></p>
                                                <span className="group cursor-pointer"> </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        {
                            items.length == 0 ?
                                ''
                                :
                                (
                                    <div className=" pl-3 pr-5 pb-5 w-70 md:w-80 flex flex-col  bg-base-200  ">
                                        <span className="text-lg font-bold">{items.length} skins</span>
                                        <span className="text-info text-base ">Total: {total.toFixed(2)}</span>
                                        <button className="mt-5 btn btn-success btn-block" onClick={handlePay}>Comprar<Icon icon="solar:wallet-money-bold" fontSize={25} /></button>

                                    </div>
                                )
                        }
                    </div>
                </div>

                {
                    session?.user ? <div className=" dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full flex items-center">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />

                            </div>

                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between" href="/perfil">
                                    Perfil
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={() => setTheme(theme === 'corporate' ? 'dark' : 'corporate')}
                                >
                                    Dark/Light
                                </button>
                            </li>
                            <li><button onClick={handleSignOut}>
                                Cerrar Sesion
                            </button >
                            </li>
                        </ul>
                    </div> :
                        <div className=" dropdown dropdown-end">

                            <a href="/auth" className="btn btn-primary m-0 p-0 w-30 ">
                                Iniciar Sesión
                            </a>

                        </div>
                }

            </div>

        </div>
    );
};

export default Header;
