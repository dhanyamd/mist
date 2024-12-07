import { useMutationData } from './useMutationData'
import { useQueryData } from './useQueryData'
import { createCommentandReply, getUserProfile } from '@/app/actions/user'
import useZodForm from './useZodform'
import { createcommentSchema } from '../global/comment-form/schema'

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data } = useQueryData(['user-profile'], getUserProfile)

  const { status, data: user } = data as {
    status: number
    data: { id: string; image: string }
  }
  const { isPending, mutate } = useMutationData(
    ['new-comment'],
    (data: { comment: string }) =>
      createCommentandReply(user.id, data.comment, videoId, commentId),
    'video-comments',
    () => reset()
  )

  const { register, onFormSubmit, errors, reset } = useZodForm(
    createcommentSchema,
    mutate
  )
  return { register, errors, onFormSubmit, isPending }
}