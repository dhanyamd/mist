import CreateFolders from '@/app/global/create-folders'
import CreateWorkspaces from '@/app/global/create-workspace'
import Folders from '@/app/global/folders'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

type Props = {
  params : {workspaceId : string}
}

const page = ({params} : Props) => {
  return (
    <div>
      <Tabs
      defaultValue='videos'
      className='mt-6'
      >
<div className='flex w-full justify-between items-center'>
  <TabsList className='bg-transparent gap-2 pl-0'>
    <TabsTrigger className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525] '
    value='videos'
    >
      Videos
      </TabsTrigger>
    <TabsTrigger value='archive' className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]'>
      Archive</TabsTrigger>
  </TabsList>
  <div className='flex gap-x-3 pb-2'>
  <CreateWorkspaces/>
  <CreateFolders workspaceId={params.workspaceId}/>
  </div>
</div>
<section className='py-9'>
<TabsContent value='videos'>
<Folders workspaceId={params.workspaceId}/>
</TabsContent>
</section>
      </Tabs>
    </div>
  )
}

export default page
