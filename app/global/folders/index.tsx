import FolderPlusDuotine from '@/app/icons/folder-duo-tone'
import FolderDuotone from '@/app/icons/foldertone'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import Folders from './folders'

type Props = {
    workspaceId : string
}

const Folder = (props : Props) => {
  return (
    <div className='flex flex-col gap-4'>
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
      <section className={cn('flex items-center gap-4 overflow-x-auto w-full')}>
     <Folders name='Folder title' id={''}/>
      </section>
    </div>
  )
}

export default Folder
