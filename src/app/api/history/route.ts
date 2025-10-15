import {query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('user_id');
    if(!userId){
        return NextResponse.json({
            error:'El parametro user_id es obligatorio'
        },{status:400})

    }
    try{
        const sql = `SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC`;
        const rows = await query(sql, [userId]);        
        return NextResponse.json({history: rows})
    }catch(error){
        console.error('❌ Error al obtener historial:', error);
        return NextResponse.json(
          { error: 'Error interno del servidor' },
          { status: 500 }
        );
    }
    
}

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const {user_id, items, total} = body;
        if(!user_id || !Array.isArray(items) || !total){
            console.log(user_id, items,total)
            return NextResponse.json({error:"Datos faltantes o invalidos"}, {status:400} )        
        }        
        const itemsJSON = JSON.stringify(items);
        const sql = `
            INSERT INTO history (user_id, items, total)
            VALUES (?, ?, ?)
        `
        const result = await query(sql, [user_id, itemsJSON, total])
        console.log(result)
        return NextResponse.json({
            message: "Historial guardado correctamente",
            insertId: result 
        },{status:201})
    }catch(error){
        console.error("❌ Error al guardar historial:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
    
}
export const runtime = 'edge';