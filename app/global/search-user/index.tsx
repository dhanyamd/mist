import { useSearch } from '@/app/hooks/useSearch'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {
    workspaceId : string
}

const Search = ({workspaceId} : Props) => {
  const {query, isFetching, onSearchQuery, onUsers} = useSearch(
    'get-users',
     'USERS'
  )
 /* const {mutate, isPending} = useMutationData(['invite-member'], 
    (data : {recieverId : string, email : string}) => {

    }
  )*/
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
        {onUsers?.map((user) => (
          <div key={user.id}
           className='flex gap-x-3 items-center border-2 p-3 rounded-xl'
          >
            </div>
        ))}
      </div>
      {isFetching ? (
        <div className='flex flex-col gap-y-2'>
          <Skeleton className='w-full h-8 rounded-xl' />
           </div>
       ) : !onUsers ? (
            <p className='text-center text-sm text-[#a4a4a4] '>No users found</p>
       ) : (
        ''
       )
       }
    </div>
  )
}

export default Search
