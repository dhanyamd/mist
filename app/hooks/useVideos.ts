import { createCommentandReply, getUserProfile } from "../actions/user"
import { createcommentSchema } from "../global/comment-form/schema"
import { useMutationData } from "./useMutationData"
import { useQueryData } from "./useQueryData"
import useZodForm from "./useZodform"

export const useVideo = (videoId : string, commentId : string) => {
    const {data} = useQueryData(['use-profile'], getUserProfile)

    const {status, data : user} = data as {
        status : number 
        data : {id : string, image : string}
    }
    
    const {mutate, isPending} = useMutationData(['new-comment'], (data : {comment : string}) =>
         createCommentandReply(user.id, data.comment, videoId, commentId), 'video-comments', () => reset())
        
    const {register, onFormSubmit, reset, errors} = useZodForm(
        createcommentSchema,
        mutate
    )
    return {register, onFormSubmit, errors, isPending}

}