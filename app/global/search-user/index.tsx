'use client'
import Loader from '@/app/(website)/_components/loader'
import { inviteMembers } from '@/app/actions/user'
import { useMutationData } from '@/app/hooks/useMutationData'
import { useSearch } from '@/app/hooks/useSearch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from 'lucide-react'
import React from 'react'

type Props = {
    workspaceId : string
}

const Search = ({workspaceId} : Props) => {
  const {query, isFetching, onSearchQuery, onUsers} = useSearch(
    'get-users',
     'USERS'
  )
  const {mutate, isPending} = useMutationData(['invite-member'], 
    (data : {recieverId : string, email : string}) => inviteMembers( data.email, data.recieverId, workspaceId)
  )
  return (
    <div className='flex flex-col gap-y-5'>
      <Input 
      onChange={onSearchQuery}
      value={query}
      className='bg-transaprent border-2 outline-none'
      placeholder='Search for you workspace'
      type='text'
      />
      <div>
    
      </div>
      {isFetching ? (
        <div className='flex flex-col gap-y-2'>
          <Skeleton className='w-full h-8 rounded-xl' />
           </div>
       ) : !onUsers ? (
            <p className='text-center text-sm text-[#a4a4a4]'>No users found</p>
       ) : (
        <div>
          {onUsers.map((user) => (
            <div key={user.id}
            className='flex gap-x-3 items-center border-2 p-3 rounded-xl'
           >
              <Avatar>
                 <AvatarImage src={user.image as string} />
                 <AvatarFallback>
                   <User />
                 </AvatarFallback>
               </Avatar>
               <div className='flex flex-col items-start'>
              <h3 className='text-bold text-lg capitalize'>{user.firstname} {user.lastname}</h3>
              <p className='lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]'>{user?.subscription?.plan}</p>
                 </div>
                 <div className='flex-1 flex justify-end items-center'>
                   <Button onClick={() => mutate({reciverId : user.id, email: user.email})} variant={'default'} className='w-5/12 font-bold' >
                     <Loader state={isPending} color='#000'>
                       Invite
                     </Loader>
                   </Button>
                   </div>
               </div>
          ))}
          </div>
       )
       }
    </div>
  )
}

export default Search
