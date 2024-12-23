import { client } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, {params} : {params : {id : string}}) {
   try {
     const body = await req.json()
     const {id} = params 

     const personalWorkspaceId = await client.user.findUnique({
        where : {
            id : id
        },
          select : {
             workspace : {
                where : {
                    type : "PERSONAL"
                },
                select : {
                    id : true
                },
                orderBy : {
                    createdAt : "asc"
                }
             }
          }
     })
     const startProcessing = await client.workSpace.update({
        where : {
            id : personalWorkspaceId?.workspace[0].id
        },
        data : {
            videos : {
                create : {
                    source : body.filename,
                    userId : id 
                }
            }
        },
        select : {
            User : {
                select : {
                    subscription : {
                        select : {
                            plan : true
                        }
                    }
                }
            }
        }
     })
      if( startProcessing){
        return NextResponse.json({
            status : 200,
            plan : startProcessing?.User?.subscription?.plan
        })
      }
      return NextResponse.json({
        status : 400,
        message : "Failed to start processing"
      })
   }catch(error){
     console.log("🔴Error! Upload failed process aborted", error)
   }
}
