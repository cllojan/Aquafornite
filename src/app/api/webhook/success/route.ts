import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-08-27.basil"
})

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature") as string;
    const body = await req.text();

    try {
        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
           if(session.metadata?.type === "aquacoins"){
            const userId = session.metadata?.userId;
            const coins = JSON.parse(session.metadata?.items || "[]");
            const total = session.amount_total! / 100;
            if(userId){
                await prisma.user.update({
                    where:{id:userId},
                    data:{aquacoins:{increment:coins.quantity}},
                })
                await prisma.aquacoins_history.create({
                    data: {
                        user_id: userId,
                        amount: coins?.quantity,                        
                    },
                });
                console.log("Orden guardada");
            }
           }else{
            const userId = session.metadata?.userId;
            const items = JSON.parse(session.metadata?.items || "[]");
            const total = session.amount_total! / 100;
            if(userId){
                await prisma.orders.create({
                    data: {
                        user_id: userId,
                        items: JSON.stringify(items),
                        total: total,
                    },
                });
                console.log("Orden guardada");
            }
           }
            
        }
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (e:any) {
        console.error("❌ Error en Webhook:", e.message);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
};