'use client'
import { getNotifications } from '@/app/actions/workspace'
import { useQueryData } from '@/app/hooks/useQueryData'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import React from 'react'

type Props = {}

const Notifications = (props : Props) => {
    const {data : notifications, isFetched} = useQueryData(['user-notifications'], getNotifications)
    const {data : notification, status} = notifications as {
        status : number,
        data : {
            notification :{
                id : string,
                userId : string | null,
                content : string
            }[]
        }
    } 
    if(status !== 200){
        return (
            <div className='flex justify-center items-center h-full w-full'>
               <p>No notifications</p>
            </div>
        )
    }
  return (
    <div className='flex flex-col'>
      {notification.notification.map((n) =>(
        <div key={n.id} className='border-2 flex gap-x-3 items-center rounded-lg p-3'>
            <Avatar>
                <AvatarFallback>
                    <User/>
                </AvatarFallback>
            </Avatar>
            <p>{n.content}</p>
            </div>
      ))}
    </div>
  )
}

export default Notifications
