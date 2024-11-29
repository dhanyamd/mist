import Loader from '@/app/(website)/_components/loader'
import { useMoveFolders } from '@/app/hooks/useFolders'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {
    videoId : string
    currentWorkspace? : string 
    currentFolder? : string 
    currentFolderName? : string
}

const ChangeVideoLocation = ({videoId, currentFolder, currentFolderName, currentWorkspace} : Props) => {
    const { errors, folders, isFetching, isFolder, isPending, onFormSubmit, register, workspaces} = 
    useMoveFolders(videoId, currentWorkspace!)
   const folder = folders.find((f) => f.id === currentFolder)
   const workspace = workspaces.find((f) => f.id === currentWorkspace)
  return (
    <form
    className="flex flex-col gap-y-5"
    onSubmit={onFormSubmit}
  >
    <div className="boder-[1px] rounded-xl p-5">
      <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
      {workspace && <p className='mt-1'>{workspace.name}</p>}
      <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
      {folder ? <p className='mt-1'>{folder.name}</p> : 'This video has no folder'}
    </div>
    <Separator orientation="horizontal" />
    <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
      <h2 className="text-md text-[#a4a4a4]">To</h2>
      <Label className="flex-col gap-y-2 flex">
        <p className="text-md">Workspace</p>
        <select
          className="rounded-xl text-base bg-transparent"
          {...register('workspace_id')}
        >
          {workspaces.map((space) => (
            <option
              key={space.id}
              className="text-[#a4a4a4]"
              value={space.id}
            >
              {space.name}
            </option>
          ))}
        </select>
      </Label>
      {isFetching ? (
        <Skeleton className="w-full h-[40px] rounded-xl" />
      ) : (
        <Label className="flex flex-col gap-y-2">
          <p className="text-md">Folders in this workspace</p>
          {isFolder && isFolder.length > 0 ? (
            <select
              {...register('folder_id')}
              className="rounded-xl bg-transparent text-base"
            >
              {isFolder.map((folder, key) =>
                key === 0 ? (
                  <option
                    className="text-[#a4a4a4]"
                    key={folder.id}
                    value={folder.name}
                  >
                    {folder.name}
                  </option>
                ) : (
                  <option 
                    className="text-[#a4a4a4]"
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                )
              )}
            </select>
          ) : (
            <p className="text-[#a4a4a4] text-sm">
              This workspace has no folders
            </p>
          )}
        </Label>
      )}
    </div>
    <Button>
      <Loader
        state={isPending}
        color="#000"
      >
        Transfer
      </Loader>
    </Button>
  </form>
  )
}

export default ChangeVideoLocation
