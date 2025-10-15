import {NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {headers } from "next/headers"
import {PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(){
    const session = await auth.api.getSession({
            headers: await headers(),
        });
    if(!session){
        return NextResponse.json({error: "No Autorizado"},{status:401});
    }
    const user = await prisma.user.findUnique({
        where:{id:parseInt(session.user.id)},
        select:{
            id:true,
            email:true,
            name:true,
            aquacoins:true,
            image:true,
            discord_name:true,
            discord_id:true,
        }
    });

    if(!user){
        return NextResponse.json({error: "Usuario no encontrado"},{status:404})
    }
    return NextResponse.json(user);
}
export const runtime = 'edge';