'use client'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getWorkSpaceFolders } from '@/app/actions/workspace'
import { useMutationDataState } from '@/app/hooks/useMutationData'
import { useQueryData } from '@/app/hooks/useQueryData'
import FolderDuotone from '@/app/icons/foldertone'
import Folder from './folders'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/app/redux/slices/folder'

type Props = {
  workspaceId: string
}

export type FoldersProps = {
  status: number
  data: ({
    _count: {
      videos: number
    }
  } & {
    id: string
    name: string
    createdAt: Date
    workSpaceId: string | null
  })[]
}

const Folders = ({ workspaceId }: Props) => {
 
  const { data, isFetched } = useQueryData(['workspace-folders'], () =>
    getWorkSpaceFolders(workspaceId)
  )
    const dispatch = useDispatch()
  const { latestVariables } = useMutationDataState(['create-folder'])

  const { status, data: folders } = data as FoldersProps

   if (isFetched && folders) {
     dispatch(FOLDERS({ folders : folders}))
   }
 

  return (
    <div
      className="flex flex-col gap-4"
      suppressHydrationWarning
    >
      <div className="flex items-center  justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl"> Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <div
        className={cn(
          status !== 200 && 'justify-center',
          'flex items-center gap-4 overflow-x-auto w-full'
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === 'pending' && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => (
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        )}
      </div>
    
    </div>
  )
}

export default Folders