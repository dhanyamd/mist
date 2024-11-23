import { useCreateWorkspace } from '@/app/hooks/useCreateWorkspace'
import React from 'react'

const WorkspaceForm = () => {
    const {errors, isPending, onFormSubmit, register} = useCreateWorkspace()
  return (
    <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>

    </form>
  )
}

export default WorkspaceForm
