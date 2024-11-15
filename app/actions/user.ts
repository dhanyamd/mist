"use server"

import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async() => {
  try{
   const user = await currentUser();
   if(!user){
    return {status : 403}
   }
  const existingUser = await prisma?.user.findUnique({
      where : {
        clerkid : user.id
      },
      include : {
        workspace : {
            where : {
                User : {
                    clerkid : user.id
                }
            }
        }
      }
   })
   if(existingUser){
    return {status :200, user : existingUser}
   }

   const newuser = await prisma?.user.create({
    data : {
        clerkid : user.id,
        email : user.emailAddresses[0].emailAddress,
        firstname : user.firstName,
        lastname : user.lastName,
        image : user.imageUrl,
        studio :{
            create : {}
        },
        subscription : {
            create : {}
        },
        workspace : {
            create : {
                name : `${user.firstName}'s workspace`,
                type : "PERSONAL"
            }
        }
    },
    include : {
        workspace : {
            where : {
                User : {
                    clerkid : user.id
                }
            }
        },
        subscription : {
            select : {
                plan : true
            }
        }
    }
   });
   if(newuser){
    return {status : 201, user : newuser}
   }
   return {status : 400}
  }catch(error : any){
    console.error()
    return {status : 500}
  }
}