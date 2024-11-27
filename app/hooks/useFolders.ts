import { useAppSelector } from "../redux/store"
import { useEffect, useState } from 'react'
import { useMutationData } from './useMutationData'
import { getWorkSpaceFolders, moveVideoLocation } from "../actions/workspace"
import useZodForm from "./useZodform"
import { moveSchema } from "../global/forms/change-video-location/schema"

export const useMoveFolders = (videoId : string, currentWorkspace : string) => {
  //redux state
    const {folders} = useAppSelector((state) => state.FolderReducer)
    const {workspaces} = useAppSelector((state) => state.WorkSpaceReducer)

    const [isFetching, setIsFetching] = useState(false)
    //state of folders
    const [isFolder, setIsFolder] = useState<
    | ({_count : {videos : number}} & {
        id : string 
        name : string 
        createdAt : Date 
        workspaceId : string | null 
    })[] | undefined>(undefined)

  const {mutate, isPending} = useMutationData(['change-video-location'], (data : {folder_id : string; workspace_id : string}) => 
    moveVideoLocation(videoId, data.folder_id, data.workspace_id)
)

  const {errors, register, watch, onFormSubmit} = useZodForm(moveSchema, mutate, {folder_id : null, workspace_id : currentWorkspace})

  //fetch folders with useEffect 
  const fetchFolders = async(workspace : string) => {
    setIsFetching(false)
    const folders = await getWorkSpaceFolders(workspace) 
    setIsFetching(false)
    //@ts-ignore
    setIsFolder(folders.data) 
  }
  useEffect(() => {
   fetchFolders(currentWorkspace)
  },[])

  useEffect(() => {
   const workspace = watch(async(value) => {
    if(value.workspace_id) fetchFolders(value.workspace_id)
   })
  
   return () => workspace.unsubscribe()
  },[watch])

  return {
    onFormSubmit,
    errors,
   register,
   isPending,
   folders,
   workspaces,
   isFetching,
   isFolder 

  }
}