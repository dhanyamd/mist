import { getWixContent } from '@/app/actions/workspace'
import React from 'react'

type Props = {}

const Home = async(props : Props) => {
 const videos = await getWixContent()
 console.log(videos)
  return (
    <div>
      Home
    </div>
  )
}

export default Home
