import { useSearch } from '@/app/hooks/useSearch'
import React from 'react'

type Props = {
    workspaceId : string
}

const Search = ({workspaceId} : Props) => {
  const {query, isFetching, onSearchQuery, onUsers} = useSearch(
    'get-users',
     "USERS"
  )
  return (
    <div>
      
    </div>
  )
}

export default Search
