import { Spinner } from '@/components/Spinner'
import React from 'react'

type Props = {}
const loading = () => {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <Spinner />
    </div>
  )
}

export default loading
