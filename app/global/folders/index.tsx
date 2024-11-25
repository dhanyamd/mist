'use client'
import FolderDuotone from '@/app/icons/foldertone'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useQueryData } from '@/app/hooks/useQueryData'
import { getWorkSpaceFolders } from '@/app/actions/workspace'
import { useMutationDataState } from '@/app/hooks/useMutationData'
import Folders from './folders'

type Props = {
    workspaceId : string
}

export type FolderProps = {
    status : number
    data : ({
        _count : {
            videos : number
        } 
    } & {
        id : string,
        name : string,
        createdAt : Date,
        workspaceId : string | null
    }
)[]
}

const Folder = ({workspaceId} : Props) => {
    const {data, isFetched} = useQueryData(["workspace-folders"], () => getWorkSpaceFolders(workspaceId))
    const {latestVariables} = useMutationDataState(['create-folder'] )

    const { status, data: folders } = data as FolderProps
  
  return (
    <div className='flex flex-col gap-4'   suppressHydrationWarning>
      <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <FolderDuotone/>
        <h2 className='text-[#BDBDBD] text-xl'>Folders</h2>
      </div>
      <div className='flex items-center gap-2'>
       <h2 className='text-[#BDBDBD]'>See all</h2>
       <ArrowRight color='#707070'/>
      </div>
      </div>
      <section className={cn( status!== 200 && "justify-center", 'flex items-center gap-4 overflow-x-auto w-full')}>
        {status !== 200 ? (
            <p className='text-neutral-300'>No folders in workspace</p>
        ) : (
            <>
            {latestVariables && latestVariables.status === 'pending' && (
                 <Folders
                 name={latestVariables.variables.name}
                 id={latestVariables.variables.id}
                 optimistic
                 />
            )}
            {folders.map((folder) => (
                <Folders
                id={folder.name}
                count={folder._count.videos}
                name={folder.name}
                key={folder.id}
                />
            ))}
            </>
        )}
      </section>
    </div>
  )
}

export default Folder
