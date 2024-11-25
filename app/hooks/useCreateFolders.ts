import { createFolders } from "../actions/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolders = (workspaceId : string) => {
    const {mutate} = useMutationData(['create-folder'], () => createFolders(workspaceId), 'workspace-folders')
    
    const onCreateNewFolder = () => {
        mutate({name : "Untitled", id : 'optimistic-id'})
    }
    return {onCreateNewFolder}
}