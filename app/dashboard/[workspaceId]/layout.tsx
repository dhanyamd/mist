"use server"
import React from 'react'
import { redirect } from 'next/navigation'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { onAuthenticateUser } from '@/app/actions/user'
import { getAllUserVideos, getNotifications, getWorkSpaceFolders, getWorkspaces, verifyAccessToWorkspace } from '@/app/actions/workspace'
import Sidebar from '@/components/sidebar/Sidebar'


type Props = {
  params: { workspaceId: string }
  children: React.ReactNode
}

const Layout = async ({  params: {workspaceId }, children }: Props) => {
  const auth = await onAuthenticateUser()
  if (!auth.user?.workspace) redirect('/auth/sign-in')
  if (!auth.user.workspace.length) redirect('/auth/sign-in')
  const hasAccess = await verifyAccessToWorkspace(workspaceId)

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`)
  }

  if (!hasAccess.data?.workspace) return null

  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkspaces(),
  })

  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
  })

  await query.prefetchQuery({
    queryKey : ["workspace-folders"],
    queryFn : () => getWorkSpaceFolders(workspaceId)
  })
  await query.prefetchQuery({
    queryKey : ["user-videos"],
    queryFn : () => getAllUserVideos(workspaceId)
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex min-h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
         
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout