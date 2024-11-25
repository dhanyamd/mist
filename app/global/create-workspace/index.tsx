'use client'
import { getWorkspaces } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import FolderPlusDuotine from '@/app/icons/folder-duo-tone'
import WorkspaceForm from '../forms/workspaceform'

type Props = {}

const CreateWorkspaces = (props : Props) => {
    const {data} = useQueryData(['user-workspaces'], getWorkspaces)
    const {data : plan} = data as {
        status : number,
        data : {
            subscription : {
                plan : "PRO" | "FREE"
            } | null
        }
    } 

        return  ( 
        <Modal 
           title='Create a workspace'
           description='Workspaces helps you to collaborate with team members. You are 
           assigned a default personal workspace where you can share videos in private 
           with yourself'
           trigger={<Button className='bg-[#1D1D1D]  text-[#a79d9d] flex items-center gap-2 py-6 px-4 rounded-xl'>
             <FolderPlusDuotine/>
             Create a workspace
           </Button>}
           >
            <WorkspaceForm/>
            </Modal>
)
    }


export default CreateWorkspaces
