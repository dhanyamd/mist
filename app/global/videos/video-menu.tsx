import React from 'react'
import Modal from '../modal'
import { Move } from 'lucide-react'
import ChangeVideoLocation from '../forms/change-video-location'

type Props = {
    videoId : string
    currentWorkspace? : string 
    currentFolder? : string 
    currentFolderName? : string
}

const CardMenu = ({videoId, currentFolder, currentFolderName, currentWorkspace}: Props) => {
  return (
   <Modal 
   className='flex items-center gap-x-2 cursor-pointer'
   title='Move to new workspace/folder'
   description='This action cannot be undone. This will permanently delete your account and remover your data from our servers'
   trigger={
    <Move 
    size={20}
    fill='#a4a4a4'
    className='text-[#a4a4a4]'
    />
   }
   >
     <ChangeVideoLocation
     videoId={videoId}
      currentFolder={currentFolder}
       currentFolderName={currentFolderName}
        currentWorkspace={currentWorkspace}
     />
   </Modal>
  )
}

export default CardMenu
