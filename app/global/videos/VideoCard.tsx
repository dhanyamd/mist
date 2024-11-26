import Loader from '@/app/(website)/_components/loader'
import React from 'react'
import CardMenu from './video-menu'
type Props = {
    User: {
      firstname: string | null
      lastname: string | null
      image: string | null
    } | null
    id: string
    Folder: {
      id: string
      name: string
    } | null
    createdAt: Date
    title: string | null
    source: string
    processing: boolean
    workspaceId: string
  }
const VideoCard = (props : Props) => {
  return <Loader state={false}>
    <div className='overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl'>
    <div className='absolute top-3 right-3 z-50 flex flex-col gap-y-3'>
      <CardMenu 
      currentFolder={props.Folder?.id}
      videoId={props.id}
      currentFolderName={props.Folder?.name}
      currentWorkspace={props.workspaceId}
      />
    </div>
    </div>
  </Loader>
}

export default VideoCard
