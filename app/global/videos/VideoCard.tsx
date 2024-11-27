import Loader from '@/app/(website)/_components/loader'
import React from 'react'
import CardMenu from './video-menu'
import ChangeVideoLocation from '../forms/change-video-location'
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

    <ChangeVideoLocation 
    
    />
  </Loader>
}

export default VideoCard
