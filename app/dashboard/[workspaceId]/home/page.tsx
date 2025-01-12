import VideoCard from '@/app/global/videos/VideoCard'
import { getAllUserVideos } from '@/app/actions/workspace'

type Props = {
    params : {
        workspaceId : string
        folderId : string
    }
}
const Home = async ({params}: Props) => {
   
  const videos = await getAllUserVideos(params.workspaceId)
  //const post = await howToPost()

  console.log(videos)

  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <h1 className="text-2xl font-bold">A Message From Mist</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-1/2">
        {videos.status === 200
          ? videos.data?.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                workspaceId={params.workspaceId}
              />
            ))
          : ''}
   
      </div>
    </div>
  )
}

export default Home