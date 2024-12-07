import z from 'zod'

export const createcommentSchema = z.object({
    comment : z.string().min(1, {message : "message caanot be empty"})
})