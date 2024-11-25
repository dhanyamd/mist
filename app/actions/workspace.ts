"use server"
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const verifyAccessToWorkspace = async(workspaceId : string) => {
    try{
        const user = await currentUser();

        if(!user){
          return {status : 404}
        }
      
        const isUserInWorkspace = await client.workSpace.findUnique({
          where : {
              id : workspaceId,
              OR : [
                  {
                      User : {
                          clerkid : user.id
                      }
                  },
              ],
              members : {
                  every : {
                      User : {
                          clerkid : user.id
                      }
                  }
              }
          }
        })
        return {
            status : 200,
            data : {workspace : isUserInWorkspace}
        }
    }catch(error){
        console.log("error", error)
        return {status : 400}
    }
}

export const getWorkSpaceFolders = async(workspaceId : string) => {
   try{
     const folders = await client.folder.findMany({
        where : {
            workSpaceId : workspaceId
        },
        include : {
            _count : {
                select : {
                    videos : true
                }
            }
        }
     })
     if(folders && folders.length > 0 ){
        return {status : 200, data : folders}
     }
     return {status : 403, data : []}
   }catch(error){
    console.log("error", error)
    return {status : 400, data : []}
   }
}

export const getAllUserVideos = async(workSpaceId : string) => {
 try{
    const user = await currentUser()
    if(!user) return {status : 404}
    const videos = await client.video.findMany({
        where : {
            OR : [{workSpaceId}, {folderId : workSpaceId}]
        },
        select : {
            id : true,
            title : true,
            createdAt : true,
            source : true,
            processing : true,
            Folder : {
                select : {
                    id : true,
                    name : true
                }
            },
            User : {
                select : {
                    firstname : true,
                    lastname : true,
                    image : true
                }
            }
        
        },
        orderBy : {
            createdAt : "asc"
        }
    })
   if(videos && videos.length > 0){
    return {status : 200, data : videos}
   }
   return {status : 404}
 }catch(error){
    console.log("error", error)
    return {status : 404}
 }
}

export const getWorkspaces = async() => {
    try{
      const user = await currentUser()
      if(!user) return {status : 400}

      const workspaces = await client.user.findUnique({
        where : {
            clerkid : user.id
        },
        select : {
            subscription : {
                select : {
                    plan : true
                }
            },
            workspace : {
                select : {
                    id : true,
                    name : true,
                    type : true
                }
            },
            members : {
                select : {
                    WorkSpace : {
                        select : {
                            id : true,
                            name : true,
                            type : true
                        }
                    }
                }
            }
        }
      })
      if(workspaces){
        return {status : 200, data : workspaces}
      }
      return {status : 402}
    }catch(error){
        console.log("error", error)
        return {status : 403}
    }
}

export const getNotifications = async() => {
    try{
      const user = await currentUser();
      if(!user) return {status : 400}

      const notifications = await client.user.findUnique({
        where : {
            clerkid : user.id
        },
        select : {
            notification : true,
            _count : {
                select : {
                    notification : true
                }
            }
        }
      })
      if(notifications && notifications.notification.length > 0 ){
        return {status : 200 , data : notifications}
      }
      return { status : 404, data : []}
    }catch(error){
        console.log("error", error)
        return {status : 403, data : []}
    
    }
}

export const CreateWorkspace = async(name : string) => {
  try{
   const user = await currentUser();
   if(!user) return {status : 404}

   const authorized = await client.user.findUnique({
    where : {
        clerkid : user.id
    },
    select : {
        subscription : {
            select : {
                plan : true
            }
        }
    }
   })
   //TODO: make it to pro later
   if(authorized?.subscription?.plan === "FREE"){
    const workspace = await client.user.update({
        where : {
            clerkid : user.id
        },
        data : {
            workspace : {
                create : {
                    name,
                    type : "PUBLIC"
                }
            }
        }
    })
    if(workspace){
        return {status : 201, data : "workspace created"}
    }
   }
   return {status : 401, data : "you are not authorized to create a workspace"}
  }catch(error){
    return {status : 400}
  }
}

export const renameFolders = async(folderId : string, name : string) => {
   try{
      const folders = await client.folder.update({
        where : {
            id : folderId
        },
        data : {
            name : name
        }
      })
      if(folders){
        return {status : 200, data : "folder renamed"}
      }
      return {status : 400, data : "folder doesn't exist"}
   }catch(error){
    return {status : 404, data : "something went wrong in renaming the folders"}
   }
}

export const createFolders = async(workspaceId : string) => {
    try{
      const newFolder = await client.workSpace.update({
        where : {
            id : workspaceId
        },
        data : {
            folders : {
                create : {name : "Untitled"}
            }
        }
      })
      if(newFolder){
        return {status : 200, data : "New folder created"}
      }
      return {status : 401, data : 'Could not create folder'}
    }catch(error){
        return {status : 400, data : "Couldn't create new folder. something went wrong"}
    }
}

export const getFolderInfo = async(folderId : string) => {
   try{
     const folder = await client.folder.findUnique({
        where : {
            id : folderId
        },
        select : {
            name : true,
            _count : {
                select : {
                    videos : true
                }
            }
        }
    })
    if(folder){
        return {status : 200, data : folder}
    }
    return {status : 400, data : []}
   }catch(error){
      return {status : 404, data : "folder not found! soemthing went wrong"}
   } 
}