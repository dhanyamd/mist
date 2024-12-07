"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export const onAuthenticateUser = async () => {
    try {
      const user = await currentUser()
      if (!user) {
        return { status: 403 }
      }
  
      const userExist = await client.user.findUnique({
        where: {
          clerkid: user.id,
        },
        include: {
          workspace: {
            where: {
              User: {
                clerkid: user.id,
              },
            },
          },
        },
      })
      if (userExist) {
        return { status: 200, user: userExist }
      }
      
      const newUser = await client.user.create({
        data: {
          clerkid: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstname: user.firstName,
          lastname: user.lastName,
          image: user.imageUrl,
          studio: {
            create: {},
          },
          subscription: {
            create: {},
          },
          workspace: {
            create: {
              name: `${user.firstName}'s Workspace`,
              type: 'PERSONAL',
            },
          },
        },
        include: {
          workspace: {
            where: {
              User: {
                clerkid: user.id,
              },
            },
          },
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      })
      if (newUser) {
        return { status: 201, user: newUser }
      }
      return { status: 400 }
    } catch (error) {
      console.log('🔴 ERROR', error)
      return { status: 500 }
    }
  }

  export const searchUsers = async(query : string) => {
    try{
      const user = await currentUser()
      if(!user) return {status : 400}

      const users = await client.user.findMany({
        where : {
          OR : [
            {firstname : {contains : query}},
            {lastname : {contains : query}},
            {email : {contains : query}}

          ],
          NOT : [{clerkid : user.id}]
        },
        select : {
          id : true,
          subscription : {
            select : {
              plan : true
            }
          },
          firstname : true,
          lastname : true,
          email : true,
          image : true
        }
      })
      if(users && users.length > 0){
        return {status : 200, data : users}
      }
      return {status : 404, data : null}
    }catch(error){
      console.log("error", error)
      return {status : 500, data : null}

    }
  }

  export const getPaymentInfo = async () => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
  
      const payment = await client.user.findUnique({
        where: {
          clerkid: user.id,
        },
        select: {
          subscription: {
           select : {plan : true}
          },
        },
      })
      if (payment) {
        return { status: 200, data: payment }
      }
    } catch (error) {
      return { status: 400 }
    }
  }
  
  export const getFirstView = async() => {
    try{
      const user = await currentUser();
      if(!user) return {status : 402}
      const userData = await client.user.findUnique({
        where : {
          clerkid : user.id
        },
        select : {
          firstView : true
        }
      })
      if(userData){
        return {status : 200, data : userData.firstView}
      }
      return { status : 403, data : false}
    }catch(error){}
    
  }

  export const enableFirstView = async(state : boolean) => {
    try{
      const user = await currentUser();
      if(!user) return {status : 400}
      const view = await client.user.update({
        where : {
          clerkid : user.id
        },
        data : {
          firstView : state
        }
      })

      if(view){
        return {status : 200, data : "Settings updated!"}
      }
    }catch(error){
      return {status : 404} 
    }
  }
  export const createCommentAndReply = async (
    userId: string,
    comment: string,
    videoId: string,
    commentId?: string | undefined
  ) => {
    try {
      if (commentId) {
        const reply = await client.comment.update({
          where: {
            id: commentId,
          },
          data: {
            reply: {
              create: {
                comment,
                userId,
                videoId,
              },
            },
          },
        })
        if (reply) {
          return { status: 200, data: 'Reply posted' }
        }
      }
  
      const newComment = await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          Comment: {
            create: {
              comment,
              userId,
            },
          },
        },
      })
      if (newComment) return { status: 200, data: 'New comment added' }
    } catch (error) {
      return { status: 400 }
    }
  }


export const getUserProfile = async() => {
try{
  const user = await currentUser();
  if(!user) return {status:402}
  const profileIdandImage = await client.user.findUnique({
    where : {
      clerkid : user.id
    },
    select : {
      id : true,
      image : true
    }
  })
  if(profileIdandImage){
    return {status : 200, data : profileIdandImage}
  }
}catch(error){}
}

export const getVideoComments = async (Id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        OR: [{ videoId: Id }, { commentId: Id }],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    })

    return { status: 200, data: comments }
  } catch (error) {
    return { status: 400 }
  }
}