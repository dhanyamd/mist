"use client"
//TODO : the subscription plan should be proupdate it later
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { usePathname, useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { getNotifications, getWorkspaces } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import { NotificationsProps, WorkspaceProps } from '@/app/types/index.types'
import Modal from '@/app/global/modal'
import { PlusCircle } from 'lucide-react'
import Search from '@/app/global/search-user'
import { MENU_ITEMS } from '@/app/constants'
import SidebarItems from './sidebar-items'
import WorkspacePlaceholder from './WorkspacePlaceholder'
import GlobalCard from '@/app/global/global-card'
import { Button } from '../ui/button'
import Loader from '@/app/(website)/_components/loader'

type Props = {
  activeWorkspaceId : string
}

const Sidebar = ({activeWorkspaceId} : Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const {data : notifications} = useQueryData(['user-notifications'],getNotifications )
   const {data , isFetched} = useQueryData(['user-workspaces'],getWorkspaces)
   const {data : workspace} = data as WorkspaceProps
    const {data : count} = notifications as NotificationsProps
    const menuItems = MENU_ITEMS(activeWorkspaceId)
    const onChangeActiveWorkspace = (value : string) => {
        router.push(`/dashboard/${value}`)
    }
    //modal disapperars if it's a private workspace 
    const currentWorkpace = workspace.workspace.find((s) => s.id == activeWorkspaceId)

  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden '>
      <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
        <p className='text-3xl font-bold flex justify-center pr-[5rem] items-center leading-7'>Mist</p>
      </div>
      <Select
      //default value to persist the user's value in this case the name of workspace
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
      <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
       <SelectValue placeholder="Select a workspace">
       </SelectValue>
      </SelectTrigger>
      <SelectContent className='bg-[#111111] backdrop-blur-xl'>
        <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator/>
            {workspace?.workspace.map((workspace : any) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 && 
            workspace.members.map((workspace) => 
            workspace.WorkSpace && 
           <SelectItem key={workspace.WorkSpace.id} value={workspace.WorkSpace.id}>
             {workspace.WorkSpace.name}

           </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
      </Select>
      
     { currentWorkpace?.type == "PERSONAL" && workspace.subscription?.plan == "FREE" &&  <Modal
      trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace" 
          >
            <Search workspaceId={activeWorkspaceId} />
      </Modal>}
      <p className='w-full text-[#9D9D9D] font-bold mt-4'>Menu</p>
      <nav className='w-full'>
      <ul>
          {menuItems.map((item) => (
             <SidebarItems
             href={item.href}
             title={item.title}
             icon={item.icon}
            selected={pathname == item.href}
            key={item.title}
            notifications={
              (item.title == 'Notifications' && 
                count._count  && 
                count._count.notifications
              ) || 0
            }
            />
          ))}
        </ul>
      </nav>
      <Separator className='w-4/5'/>
      <p className='w-full text-[#9D9D9D] font-bold mt-4'>Workspaces</p>
      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === 'FREE'
              ? 'Upgrade to create workspaces'
              : 'No Workspaces'}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== 'PERSONAL' && (
                  <SidebarItems
                    href={`/dashboard/${item.id}`}
                    selected={pathname === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItems
                href={`/dashboard/${item.WorkSpace.id}`}
                selected={pathname === `/dashboard/${item.WorkSpace.id}`}
                title={item.WorkSpace.name}
                notifications={0}
                key={item.WorkSpace.name}
                icon={
                  <WorkspacePlaceholder>
                    {item.WorkSpace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === 'FREE' && (
        <GlobalCard
          title="Upgrade to Pro"
          description=" Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button>Upgrade</Button>
          }
        />
      )}
    </div>

  )}

  export default Sidebar

