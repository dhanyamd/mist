import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    transcript : string
}

const VideoTranscript = ({transcript} : Props) => {
  return (
   <TabsContent value='Transcript' >
    <p className='text-[#a7a7a7]'>{transcript}</p>
   </TabsContent>
  )
}

export default VideoTranscript
