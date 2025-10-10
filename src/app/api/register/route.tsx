import { query } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
interface User{
    id:number;
    username:string;
    email:string;
    password:string;
}
export async function POST(req: NextRequest, res:NextResponse){
    const body = req.body;
    
    
}