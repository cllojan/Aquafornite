'use client'
import Header from '@/components/Header'
import User from '@/components/user';
import { useUser } from '@/hooks/useUser';

import { Icon } from '@iconify/react/dist/iconify.js';
import { format } from "date-fns";
import React, { useEffect, useState } from 'react'

interface HistoryItems{
    name:string,
    image:string,
    price:number

}
interface History {
    id:number,
    items:HistoryItems[],
    total:number,
    created_at:string

}
export default function UserPage() {

    const { user, isLoading } = useUser();
    const [history, setHistory] = useState<History[]>([]);
    useEffect(() => {
        if (!isLoading || !user) return;
        const fetchHistory = async () => {
            const res = await fetch(`/api/history?user_id=${user?.id}`)

            const data = await res.json();
            setHistory(data.history)
        }
        fetchHistory()
    }, [isLoading, user])
    console.log(history)
    return (

        <div className="min-h-screen">
            <Header />
            <div className="gap-1 h-fullpx-6 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
                    <User data={user} />
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Historial de compra</h2>
                    <div className="overflow-x-auto h-full">
                        <table className="table">
                            {/* head */}
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
                                {/* row 1<th>
                                        <details className="dropdown bg-transparent">
                                            <summary className="btn m-1 bg-transparent border-none">open or close</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                <li><a>Item 1</a></li>
                                                <li><a>Item 2</a></li>
                                            </ul>
                                        </details>
                                    </th> */}
                                {history?.map((items, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>
                                        <details className="dropdown bg-transparent">
                                            <summary className="btn m-1 bg-transparent border-none">Skins compradas <Icon icon="solar:alt-arrow-down-outline" className="mt-1" width="20" height="20"  /></summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                               {items.items.map((item,inx ) => (                                                
                                                    <li  key={inx} className="flex flex-row nowrap">{item.name} <span className="badge badge-soft badge-info">{item.price}$</span></li>
                                                
                                               ))}
                                            </ul>
                                        </details>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline badge-success">{items.total}$</span> 
                                        </td>
                                        <td>{format(new Date(items.created_at), 'yyyy-MM-dd / HH:MM')}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs disable">View</button>
                                        </th>
                                    </tr>
                                ))}

                            </tbody>
                            {/* foot */}
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
            </div>

        </div>


    )
}
