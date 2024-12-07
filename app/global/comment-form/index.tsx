import { useVideo } from '@/app/hooks/useVideos'
import React from 'react'

type Props = {
    videoId : string
    commentId? : string
    author : string
    close? : () => void
}

const CommentForm = ({videoId, close,commentId,author}: Props) => {
    const {errors, isPending, register, onFormSubmit} = useVideo(videoId, commentId as string)
  return (
    <form>

    </form>
  )
}

export default CommentForm
