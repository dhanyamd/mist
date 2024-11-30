'use client'
import { previewVideo } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import { VideosProps } from '@/app/types/index.types'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    videoId : string
}

const VideoPreview = ({videoId} : Props) => {
    const router = useRouter()
    const {data} = useQueryData(['preview-video'], () => previewVideo(videoId))
    const {data : video, status, author} = data as VideosProps
    if(status !== 200) router.push('/')
     const daysAgo = Math.floor(
            (new Date().getTime() - video.createdAt.getTime())/ (24 * 60 * 60 *1000)
        )
   return <div>VideoPreview</div>
    }
export default VideoPreview
