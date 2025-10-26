
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('user_id');
        if (!userId) {
            return NextResponse.json({
                error: 'El parametro user_id es obligatorio'
            }, { status: 400 })

        }

        const history = await prisma.orders.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });

        return NextResponse.json({ history }, { status: 200 });
    } catch (error) {
        console.error('❌ Error al obtener historial:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }

}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { user_id, items, total } = body;
        if (!user_id || !Array.isArray(items) || !total) {
            console.log(user_id, items, total)
            return NextResponse.json({ error: "Datos faltantes o invalidos" }, { status: 400 })
        }
        const itemsJSON = JSON.stringify(items);
        const sql = `
            INSERT INTO history (user_id, items, total)
            VALUES (?, ?, ?)
        `
        const newOrder = await prisma.orders.create({
            data: {
                user_id: user_id,
                items: JSON.stringify(items), // Prisma espera un `String`, así que lo convertimos
                total: total
            }
        });

        return NextResponse.json(
            { message: 'Orden guardada correctamente', insertId: newOrder.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error al guardar historial:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }

}
