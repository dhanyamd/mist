import Loader from '@/app/(website)/_components/loader'
import React from 'react'
import ChangeVideoLocation from '../forms/change-video-location'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dot, Share2, User } from 'lucide-react'
import CopyLink from './copy-link'
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
   // const daysAgo = Math.floor(new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
   const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  )

  return  <Loader
  className="bg-[#171717] flex justify-center items-center border-[1px] border-[rgb(37,37,37)] rounded-xl"
  state={props.processing}
>
  <div suppressHydrationWarning className=" group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
    <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
      <CardMenu
        currentFolderName={props.Folder?.name}
        videoId={props.id}
        currentWorkspace={props.workspaceId}
        currentFolder={props.Folder?.id}
      />   
   <CopyLink className="p-0 h-5 bg-hover:bg-transparent bg-[#252525]" videoId={props.id}/>
    </div>
    <Link
          href={`/dashboard/${props.workspaceId}/video/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
                <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div suppressHydrationWarning={true} className='px-5 py-3 flex flex-col gap-y-2 z-20'>
          <h2 className='text-sm font-semibold text-[#BDBDBD]'>{props.title}</h2>
          <div className='flex gap-x-2 items-center mt-4'>
           <Avatar className='mt-2 w-8 h-8'>
            <AvatarImage src={props?.User?.image as string }/>
            <AvatarFallback>
                <User/>
            </AvatarFallback>
           </Avatar>
          <div>
          <p className='capitalize text-[#BDBDBD] text-sm'>
            {props.User?.firstname} {props.User?.lastname}
          </p>
          <p className='text-[#6D6D6D]  text-xs flex items-center'>
             <Dot/>  {daysAgo == 0 ? "Today" : `${daysAgo}d ago`}
          </p>
          </div>
          </div>
          <div className='mt-4'>
              <span className='flex gap-x-1 items-center'>
                <Share2 fill='#9D9D9D' className='text-[#9D9D9D]' size={12}
                />
                <p className='text-xs text-[#9D9D9D] capitalize'>
                    {props.User?.firstname}'s Wokspace
                </p>
              </span>
          </div>
          </div>
            </Link>
    </div>


  </Loader>
}

export default VideoCard
/*
 <ChangeVideoLocation
    currentFolder={props.Folder?.id}
    currentFolderName={props.Folder?.name}
    videoId={props.id}
    currentWorkspace={props.workspaceId}
    />

*/