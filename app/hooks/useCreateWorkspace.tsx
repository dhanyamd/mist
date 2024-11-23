import { CreateWorkspace } from "../actions/workspace"
import { workspaceSchema } from "../global/forms/workspaceSchema"
import { useMutationData } from "./useMutationData"
import useZodForm from "./useZodform"

export const useCreateWorkspace = () => {
    const {mutate, isPending} = useMutationData(["create-workspaces"], (data : {name : string}) => CreateWorkspace(data.name),'user-workspaces')

    const {errors, onFormSubmit, register} = useZodForm(workspaceSchema, mutate )
    return {errors, onFormSubmit, register, isPending}
}