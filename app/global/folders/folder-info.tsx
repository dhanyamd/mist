'use client'
import { getFolderInfo } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import React from 'react'
import { FolderProps } from '@/app/types/index.types'

type Props = {
    folderId : string
}

const FolderInfo = ({folderId} : Props) => {
    const {data} = useQueryData(["folder-info"], () => getFolderInfo(folderId))
    const {data : folder} = data as FolderProps
  return (
    <div className='flex items-center'>
      <h2 className='text-[#BdBdBd] text-2xl'>{folder.name}</h2>
    </div>
  )
}

export default FolderInfo
