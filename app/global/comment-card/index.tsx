'use client'
import { CommentRepliesProps } from '@/app/types/index.types'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type Props = {
    comment : string 
    author : {image : string, firstname : string, lastname : string} 
    videoId : string 
    commentId? : string 
    isReply? : boolean 
    reply : CommentRepliesProps[]
}

const CommentCard = ({comment, commentId, author, videoId, isReply, reply} : Props) => {
   // const[onReply, setOnReply] = useState<boolean>(false)
   
  return   <Card className={cn(isReply ? "bg-[#1D1D1D] pl-10 border-none" : "border-[1px] bg-[#1D1D1D] p-5")}>
     <div className='flex gap-x-2 items-center'>
     <Avatar>
          <AvatarImage
            src={author?.image}
            alt="author"
          />
        </Avatar>
     <p className='text-sm text-[#BDBDBD] capitalize'>{author?.firstname} {author?.lastname}</p>
     </div>
     </Card>
  
}

export default CommentCard
