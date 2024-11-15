'use client'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { useRouter } from 'next/navigation'
import { Separator } from './ui/separator'

type Props = {
    activeWorkSpaceId : string
}

const Sidebar = ({activeWorkSpaceId} : Props) => {
    const router = useRouter()
    const onChangeActiveWorkspace = (value : string) => {
        router.push(`/dashboard/${value}`)
    }
  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden '>
      <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
        <p className='text-3xl font-bold flex justify-center pr-[5rem] items-center leading-7'>Mist</p>
      </div>
      <Select
        defaultValue={activeWorkSpaceId}
        onValueChange={onChangeActiveWorkspace}
      >
      <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
       <SelectValue placeholder="Select a workspace"> Select a workspace
       </SelectValue>
      </SelectTrigger>
      <SelectContent className='bg-[#111111] backdrop-blur-xl'>
        <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator/>
            
        </SelectGroup>
      </SelectContent>
      </Select>
    </div>
  )
}

export default Sidebar
