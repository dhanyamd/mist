/*import { Send, X } from 'lucide-react'
import React from 'react'
import FormGenerator from '../form-generator'
import { useVideoComment } from '@/app/hooks/useVideos'
import { Button } from '@/components/ui/button'
import Loader from '@/app/(website)/_components/loader'

type Props = {
    videoId : string
    commentId? : string
    createdAt? : string
    author : string
    close? : () => void
}

const CommentForm = ({videoId, close,commentId,author, createdAt}: Props) => {
    const {errors, isPending, register, onFormSubmit} = useVideoComment(videoId, commentId as string)

  return (
    <form className='relative w-full' onSubmit={onFormSubmit}>
    <FormGenerator 
    register={register}
    errors={errors}
    placeholder={`Respond about ${author}`}
    name='comment'
    inputType='textarea'
    lines={8}
    type='text'
    />

    <Button className='p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent' type='submit'>
    <Loader state={isPending}/>
    <Send className="text-white/50 cursor-pointer hover:bg-white/80" size={18}/>
    </Button>
    </form>
  )
}

export default CommentForm*/

'use client'

import { useVideoComment } from '@/app/hooks/useVideos'
import { Send, X } from 'lucide-react'
import React from 'react'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '@/app/(website)/_components/loader'

type Props = {
  videoId: string
  commentId?: string
  author: string
  close?: () => void
}

const CommentForm = ({ author, videoId, close, commentId }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  )

  return (
    <form
      className="relative w-full"
      onSubmit={onFormSubmit}
    >
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />
      <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent "
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  )
}

export default CommentForm
