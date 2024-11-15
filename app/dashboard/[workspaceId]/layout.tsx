import { onAuthenticateUser } from '@/app/actions/user'
import { getAllUserVideos, getNotifications, getWorkSpaceFolders, getWorkspaces, verifyAccessToWorkspace } from '@/app/actions/workspace'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
 params : {workspaceId : string},
 children : React.ReactNode
}

const layout = async({params : {workspaceId}, children } : Props) => {
    const auth = await onAuthenticateUser();
    if(!auth.user?.workspace) return redirect("/auth/sign-in")
        if(!auth.user?.workspace.length) return redirect("/auth/sign-in")
      const hasAccess = await verifyAccessToWorkspace(workspaceId)      
    
      if(hasAccess.status !== 200){
          return redirect(`/dashboard/${auth.user.workspace[0].id}`)
      }
      if(!hasAccess) return null;

      const query = new QueryClient();
      await query.prefetchQuery({
        queryKey : ["workspace-folders"],
        queryFn : () => getWorkSpaceFolders(workspaceId)
      })
      await query.prefetchQuery({
        queryKey : ["user-videos"],
        queryFn : () => getAllUserVideos(workspaceId)
      })
      await query.prefetchQuery({
        queryKey : ["user-workspaces"],
        queryFn : () => getWorkspaces()
      })
      await query.prefetchQuery({
        queryKey : ["user-notifications"],
        queryFn : () => getNotifications()
      })
  return (
    <div>
      
    </div>
  )
}

export default layout
