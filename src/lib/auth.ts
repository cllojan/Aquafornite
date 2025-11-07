import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from '@prisma/client/edge'
import { nextCookies } from "better-auth/next-js"
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  datasourceUrl:"prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19ab1pHaWpqUmFRbXFmS2FETk5taXYiLCJhcGlfa2V5IjoiMDFLOUU1MDJQTVhaU1hSUjVLWUFZQU1HSjAiLCJ0ZW5hbnRfaWQiOiI0ODMyNDI5ZDAwODhmMmYyMmFjYjYzMzgwZmJhMjE0MjMwMjQ3ZjdiNWE1ZjIwMWQ5MDk0OTVkZWM1NThjZjExIiwiaW50ZXJuYWxfc2VjcmV0IjoiMjgzNjBlYjAtYTc2My00ZTM1LWJhZTQtZjM0MjNhZDE0OGEwIn0.oR0t4e3UrRnw5rZSxgEQhPY_NxJyTak3C67qPQshZ2o"
}).$extends(withAccelerate());

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
        discord_name: profile.username || "NO ES USERNAME"
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