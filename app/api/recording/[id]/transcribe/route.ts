import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, {params} : {params : {id : string}}) {
    const body = await req.json()
    const {id} = params 
    try {
        const content = await JSON.parse(body.content)
        const transcribed = await client.video.update({
            where : {
                id : id 
            },
            data : {
                title : content.title,
                description : content.description,
                summery : body.transcript,
            }
        })
        if(transcribed){
            console.log('🟢 Transcribed video successfully')
            return NextResponse.json({
                status : 200,
                message : "Transcribed video successfully"
            })
        }
    }catch(error){
        console.log("🔴Error! Upload failed process aborted", error)    
    }
}
