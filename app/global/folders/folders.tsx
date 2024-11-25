'use client'
import Loader from '@/app/(website)/_components/loader'
import { renameFolders } from '@/app/actions/workspace'
import { useMutationData, useMutationDataState } from '@/app/hooks/useMutationData'
import FolderDuotone from '@/app/icons/foldertone'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

type Props = {
    name : string 
    id : string
    optimistic? : boolean 
    count? : number
}

const Folders = ({id,name,count,optimistic} : Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const folderCardRef = useRef<HTMLDivElement | null>(null)

    const pathname = usePathname()
    const router = useRouter()
    const [onRename, setOnRename] = useState(false)

    const Rename = () => setOnRename(true)
    const Renamed = () => setOnRename(false)

    const {mutate, isPending } = useMutationData(['rename-folders'],
       (data : {name : string}) => renameFolders(id, data.name),
       'workspace-folders',
        Renamed)
    const handleFolderClick =() => {
      if (onRename) return
      router.push(`${pathname}/folder/${id}`)
    }
    
    const { latestVariables } = useMutationDataState(['rename-folders'])

    const handleDoubleClick = (e : React.MouseEvent<HTMLParagraphElement>) => {
     e.stopPropagation()
     Rename()
    }

    const updateFolderEvent = (e: React.FocusEvent<HTMLInputElement>) => {
     if(inputRef.current && folderCardRef.current){
        if(
          !inputRef.current.contains(e.target as Node | null) && 
          !folderCardRef.current.contains(e.target as Node | null)
      ) {
        if(inputRef.current.value){
          mutate({name : inputRef.current.value})
        }
        else 
          Renamed()
      }
      }
    }  
  return (
    <div
    onClick={handleFolderClick}
    ref={folderCardRef}
    className=
    {cn(optimistic && 'opacity-60', 'flex items-center gap-2 hover:bg-neutral-800 cursor-pointer transition duration-150 justify-between min-w-[250px] py-5 px-4 rounded-lg border-[1px]' )}
    
    >
      <Loader state={isPending}>
        <div className='flex flex-col gap-[1px]'>
        {onRename ? (
          <Input 
           onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            updateFolderEvent(e)
          }}
          autoFocus
          ref={inputRef}
          placeholder={name}
        className='border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0' />) : (
          <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
              onDoubleClick={handleDoubleClick}
            >
              {latestVariables &&
              latestVariables.status === 'pending' &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
           )}
          <span className='text-sm text-neutral-500'>{count || 0} videos</span>
          </div>
      </Loader>
      <FolderDuotone/>
    </div>
  )
}


export default Folders
