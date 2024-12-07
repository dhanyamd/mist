import { getUserProfile, getVideoComments } from '@/app/actions/user'
import { previewVideo } from '@/app/actions/workspace'
import VideoPreview from '@/app/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params : {
        videoId : string
    }
}

const VideoPage = async({params : {videoId}} : Props) => {
    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ['preview-video'],
        queryFn : () => previewVideo(videoId)
    })

    await query.prefetchQuery({
        queryKey : ['user-profile'],
        queryFn : () => getUserProfile
    })

    
    await query.prefetchQuery({
        queryKey : ['video-comments'],
        queryFn : () => getVideoComments(videoId)
    })
  return (
   <HydrationBoundary state={dehydrate(query)}>
        <VideoPreview videoId={videoId} />
   </HydrationBoundary>
  )
}

export default VideoPage
