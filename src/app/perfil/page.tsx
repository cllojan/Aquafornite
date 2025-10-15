'use client'
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function page() {
    const {user, isLoading} = useUser();
    const router = useRouter();
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
                                            <img src="<?= !empty($_SESSION['avatar']) ? $_SESSION['avatar'] : '/assets/usuario.png' ?>"
                                                alt="avatar" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center justify-center">
                                        <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center ">
                                        </p>
                                        <p className="text-base font-normal leading-normal text-center ">
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
                            <table className="table">

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
                                    <tr>
                                        <td></td>
                                        <td><select className="select">
                                            <option>
                                                $
                                            </option>
                                        </select>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline badge-success"></span>
                                        </td>
                                        <td></td>
                                        <th>

                                            <span className="truncate">View</span>

                                        </th>
                                    </tr>
                                    <tr>
                                        <td >No hay pedidos registrados.</td>
                                    </tr>

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