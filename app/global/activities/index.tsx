import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import CommentForm from '../comment-form'

type Props = {
    author : string
    videoId : string
}
const Activities = ({author, videoId} : Props) => {
  return (
<TabsContent value='Activity' className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-5'>
<CommentForm author={author} videoId={videoId}/>
</TabsContent>
  )
}

export default Activities
