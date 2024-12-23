import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req : NextRequest, {params} : {params : {id : string}}) => {
    try {
       const body = await req.json()
       const {id} = params 

       const completVideoProcessing = await client.video.update({
        where : {
            userId : id,
             source : body.filename
        },
        data : {
            processing : false,
        }
       })
       if(completVideoProcessing){
        console.log("🟢 Video processing completed successfully")
        return NextResponse.json({
            status : 200,
            message : "Video processing completed successfully"
        })
       }
       return NextResponse.json({
        status : 400,
        message : "Failed to complete video processing"
       })
    }catch(error){
        console.log("🔴Error! Upload failed process aborted", error)
    }
}