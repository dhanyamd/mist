import { useEditVideo } from '@/app/hooks/useEditVideo'
import React from 'react'
import FormGenerator from '../../form-generator'

type Props = {
    videoId : string
    title : string
    description : string
}

const EditVideoForm = ({videoId, title, description} : Props) => {
    const {errors, onFormSubmit, register, reset, watch, isPending} = useEditVideo(videoId, title, description)
  return <form onSubmit={onFormSubmit} className='flex flex-col gap-y-5'>
        <FormGenerator
        register={register}
        errors={errors}
        name='title'
        inputType='input'
        label='Title'
        placeholder={'Video title... '}
        type='text'
        />

       <FormGenerator
        register={register}
        errors={errors}
        name='description'
        inputType='textarea'
        label='Description'
        placeholder={'Video description... '}
        />
  </form>
}

export default EditVideoForm
