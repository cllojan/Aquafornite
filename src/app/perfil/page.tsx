'use client'
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";

export default function Page() {
    const { user, isLoading } = useUser();
    const { data: session } = useSession();
    const [history, setHistory] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const res = await fetch(`/api/history?user_id=${user.id}`);
                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error("Error al obtener historial:", err);
            }
        };

        fetchHistory();
    }, [user]);
    console.log(history)
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10" />
            </div>
        );
    }
    return (
        <div className="bg-[radial-gradient(ellipse_at_left,_#0774BB_0%,_#052F6F_75%,_#040A3F_100%)] bg-fixed">
            <Header />
            <div className="pt-20 w-full h-screen flex justify-center align-center">
                <div className="gap-1 h-full px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
                        <div className="flex p-4 @container">
                            <div className="flex w-full flex-col gap-4 items-center">
                                <div className="flex gap-4 flex-col items-center">
                                    <div className="avatar">
                                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2\">
                                            <img src={session?.user?.image ?? "/images/aquaprofile.png"}
                                                alt="avatar" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center justify-center">
                                        <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center ">
                                            {session?.user.name}
                                        </p>
                                        <p className="text-slate-200 font-normal leading-normal text-center ">
                                            {user?.discord_name}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto">
                                    <span className="truncate">Edit Profile</span>
                                </button>
                            </div>
                        </div>
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Historial
                            de compra</h2>
                        <div className="overflow-x-auto h-full">
                            <table className="table bg-slate-200">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Skins</th>
                                        <th>Total</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        history.length > 0 ?
                                            history.map(elm => (
                                                <tr>
                                                    <td>{elm.id}</td>
                                                    <td><select className="select">
                                                        {
                                                            JSON.parse(elm.items).map((item:any) => (
                                                                <option>{item.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-outline badge-success">{elm.total}</span>
                                                    </td>
                                                    <td>{elm.created_at}</td>
                                                    <th>

                                                        <span className="truncate">View</span>

                                                    </th>
                                                </tr>
                                            ))
                                            :
                                            (
                                                <tr>
                                                    <td >No hay pedidos registrados.</td>
                                                </tr>
                                            )
                                        /*
                                        
                                        */

                                    }

                                   

                                </tbody>

                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Skins</th>
                                        <th>Total</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}