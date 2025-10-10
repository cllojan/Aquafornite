"use server";
import { useUser } from "@clerk/nextjs";
import {auth, clerkClient} from "@clerk/nextjs/server";

export async function getUser(){
    const {userId} = await auth();
    if(!userId) return [];
    const user = await useUser()
    return user
}