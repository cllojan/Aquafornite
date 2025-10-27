import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"
import { nextCookies } from "better-auth/next-js"
import { createAuthMiddleware } from "better-auth/api";
import bcrypt from "bcrypt";
import argon2 from "argon2";
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',

  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,

  },
  user:{
    additionalFields:{
      discord_name:{
        type:"string",
        required:false,
      }
    }
  },
  account:{
    additionalFields:{
      global_name:{
        type:"string",
        required:false,
      }
    }
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      permissions: 2048 | 16384,
      mapProfileToUser: async (profile) => {        
        return {
        discord_id: profile.id,
        discord_name: profile.display_name
      }}
    },


  },
  plugins: [nextCookies()],  
  databaseHooks:{
    account:{
      update:{
        after:async (account)=>{
          
          if(account.id){
            await prisma.user.update({
              where: {id:account.userId},
              data:{
                discord_id:account.accountId,
                
              }
            })
          }
        }
      }
    }
  }
});