'use client'
import { useCreateFolders } from '@/app/hooks/useCreateFolders'
import FolderPlusDuotine from '@/app/icons/folder-duo-tone'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
    workspaceId : string
}

const CreateFolders = ({workspaceId} : Props) => {
    const {onCreateNewFolder} = useCreateFolders(workspaceId)
  return (
    <Button 
    onClick={onCreateNewFolder}
    className='bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-6 rounded-2xl'>
       <FolderPlusDuotine/>
      Create Folders
    </Button>
  )
}

export default CreateFolders
