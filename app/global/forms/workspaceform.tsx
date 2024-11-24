import { useCreateWorkspace } from '@/app/hooks/useCreateWorkspace'
import React from 'react'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '@/app/(website)/_components/loader'

const WorkspaceForm = () => {
    const {errors, isPending, onFormSubmit, register} = useCreateWorkspace()
  return (
    <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>
     <FormGenerator 
              register={register}
              placeholder='Workspace name'
              label='Name'
              errors={errors}
              inputType='input'
              type='text' name={'name'}     />
                  <Button className='text-sm w-full ' type='submit' disabled={isPending}>
                    <Loader state={isPending}>Create workspace</Loader>
                  </Button>

    </form>
  )
}

export default WorkspaceForm
