'use client'
import { previewVideo, sendEmailFirstView } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import { VideosProps } from '@/app/types/index.types'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import CopyLink from '../copy-link'
import RichLink from '../richlink'
import { truncateString } from '@/lib/utils'
import { Download } from 'lucide-react'
import TabsMenu from '../../tabs'
import AiTools from '../../ai-tools'
import VideoTranscript from '../../video-transcript'
import { TabsContent } from '@/components/ui/tabs'
import Activities from '../../activities'

type Props = {
    videoId : string
}

const VideoPreview = ({videoId} : Props) => {
    const router = useRouter()
    const {data} = useQueryData(['preview-video'], () => previewVideo(videoId))
    const {data : video, status, author} = data as VideosProps
     const notifyFirstView = async() => sendEmailFirstView(videoId)
     const daysAgo = Math.floor(
            (new Date().getTime() - video?.createdAt.getTime())/ (24 * 60 * 60 *1000)
        )
      useEffect(() => {
        if(video.views == 0){
          notifyFirstView()
        }
        return () => {
          notifyFirstView()
        }
      },[])
   return   <div className='grid grid-cols-1 xl:grid-cols-3 lg:py-10 gap-5 overflow-y-auto'>
   <div className='flex flex-col lg:col-span-2 gap-y-10'>
  <div>
    <div className='flex gap-x-5 items-start justify-between'>
        <h2 className='text-white text-4xl font-bold'>{video.title}</h2>
        {/*{author ? (
           <EditVideo
            videoId={videoId}
            title={video.title as string}
            description={video.description as string}
            />
        ) : (
<></>
        )} */}
    </div>
    <span className='flex gap-x-3 mt-4'>
  <p className='capitalize text-[#9D9D9D]'>
    {video.User?.firstname}  {video.User?.lastname}
  </p>
  <p className='text-[#707070]'>
  {daysAgo == 0 ? 'Today' : `${daysAgo}d ago`}
  </p>
    </span>
   </div>
   <video preload='metadata'
    className='w-full aspect-video opacity-50 rounded-xl ' 
    controls 
    >
    <source src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`} />
    </video>
    <div className='flex flex-col gap-y-4 text-2xl'>
 <div className='flex gap-x-5 items-center justify-between'>
    <p className='text-[#BDBDBD] font-semibold'>Description</p>
    {/*{author ? (
           <EditVideo
            videoId={videoId}
            title={video.title as string}
            description={video.description as string}
            />
        ) : (
<></>
        )} */}
 </div>
 <p className='text-[#9D9D9D] text-lg text-medium'>{video.description}</p>
    </div>
    </div>
    <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end gap-x-3 items-center">
          <CopyLink
            variant="outline"
            className="rounded-full bg-transparent px-10"
            videoId={videoId}
          />
          <RichLink 
          id={videoId}
          source={video.source}
          description={truncateString(video.description as string, 150)}
          title={video.title as string}/>
          <Download className='text-[#4d4c4c]'/>
          </div>
        <div>
          <TabsMenu defaultValue='AI Tools' triggers={['AI Tools', 'Transcript', 'Activity']}  >
          <AiTools
              videoId={videoId}
              trial={video.User?.trial!}
              plan={video.User?.subscription?.plan!}
            />
            <VideoTranscript transcript={video.description as string}/>
            <Activities
              author={video.User?.firstname as string}
              videoId={videoId}
            />
          </TabsMenu>
        </div>
          </div>
</div>

   
    }
export default VideoPreview
