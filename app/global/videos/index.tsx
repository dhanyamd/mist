'use client'
import { getAllUserVideos } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import VideoRecorderDuotone from '@/app/icons/video-recorder-duotone'
import { VideoProps } from '@/app/types/index.types'
import { cn } from '@/lib/utils'
import React from 'react'
import VideoCard from './VideoCard'

type Props = {
  folderId: string
  videosKey: string
  workspaceId: string
}

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  )

  const { status: videosStatus, data: videos } = videoData as VideoProps

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? 'p-5'
            : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {videosStatus === 200 ? (
          videos.map((video) => (
            <VideoCard
              key={video.id}
              workspaceId={workspaceId}
              {...video}
            />
          ))
        ) : (
          <p className="text-[#BDBDBD]"> No videos in workspace</p>
        )}
      </section>
    </div>
  )
}

export default Videos