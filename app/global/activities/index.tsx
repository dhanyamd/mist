/*import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import CommentForm from '../comment-form'
import CommentCard from '../comment-card'
import { useQueryData } from '@/app/hooks/useQueryData'
import { getVideoComments } from '@/app/actions/user'
import { VideoCommentProps } from '@/app/types/index.types'

type Props = {
    author : string
    videoId : string
}
const Activities = ({author, videoId} : Props) => {
    const {data} = useQueryData(['video-comments'], () => getVideoComments(videoId))
    const {data : comments} = data as VideoCommentProps
  return (
<TabsContent value='Activity' className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-5'>
<CommentForm author={author} videoId={videoId}/>
 {comments?.map((comment) => (
    <CommentCard
    comment={comment.comment}
    key={comment.id}
    author={{
      image: comment.User?.image as string,
      firstname: comment.User?.firstname!,
      lastname: comment.User?.lastname!,
    }}
    videoId={videoId}
    reply={comment.reply}
    commentId={comment.id}
  />
 ) )}
</TabsContent>
  )
}

export default Activities
*/

'use client'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import CommentCard from '../comment-card'
import { useQueryData } from '@/app/hooks/useQueryData'
import { getVideoComments } from '@/app/actions/user'
import { VideoCommentProps } from '@/app/types/index.types'
import CommentForm from '../comment-form'


type Props = {
  author: string
  videoId: string
}

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQueryData(['video-comments'], () =>
    getVideoComments(videoId)
  )

  const { data: comments } = data as VideoCommentProps


  return (
    <TabsContent
      value="Activity"
      className="rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm
        author={author}
        videoId={videoId}
      />
      {comments?.map((comment) => (
        <CommentCard
          comment={comment.comment}
          key={comment.id}
          author={{
            image: comment.User?.image!,
            firstname: comment.User?.firstname!,
            lastname: comment.User?.lastname!,
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
          //createdAt={comment.createdAt}
        />
      ))}
    </TabsContent>
  )
}

export default Activities
