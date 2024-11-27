import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {
    videoId : string
    currentWorkspace? : string 
    currentFolder? : string 
    currentFolderName? : string
}

const ChangeVideoLocation = ({videoId, currentFolder, currentFolderName, currentWorkspace} : Props) => {
  return (
   <form className='flex flex-col gap-y-5'>
 <div className='border-[1px] rounded-xl p-5'>
<h2 className='text-xs mb-5 text-[#a4a4a4]'> Current</h2>
<h2 className='text-[#a4a4a4]'>Workspace</h2>
<p className='text-sm text-[#a4a4a4]'>This video has no folder</p>
 </div>
 <Separator orientation='horizontal'/>
 <div className='flex flex-col gap-y-5 border-[1px] rounded-xl'>
<Label className='flex flex-col gap-y-2' >
<p className='text-xs'>Workspace</p>
<select className='text-base rounded-xl bg-transparent'>
<option 
className='text-[#a4a4a4]'
value={'fdfdfs'}
> workspace 
    </option>
</select>
</Label>
 </div>
   </form>
  )
}

export default ChangeVideoLocation
