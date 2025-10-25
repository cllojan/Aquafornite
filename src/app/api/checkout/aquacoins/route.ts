import { NextResponse, NextRequest } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil"
})

export async function POST(req: NextRequest) {
    try{
        const {userId, coins} = await req.json();
    if(!userId || !coins){
        return NextResponse.json({error: "Faltan Datos"}, {status: 400});

    }
    console.log(userId, coins)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: `${coins.quantity} AquaCoins` },
              unit_amount: coins.price,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.BETTER_AUTH_URL}/success`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/`,
        metadata:{
            userId:userId ?? "",
            items:JSON.stringify(coins),
          }
      });
    
      return NextResponse.json({ url: session.url });
    }catch(err:any){
        console.error(err)
        return NextResponse.json(
          { error: err.message || "Internal server error" },
          { status: 500 }
        )
    }
}
