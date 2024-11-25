export type WorkspaceProps = {
    data: {
      subscription: {
        plan: 'FREE' | 'PRO'
      } | null
      workspace: {
        id: string
        name: string
        type: 'PUBLIC' | 'PERSONAL'
      }[]
      members: {
        WorkSpace: {
          id: string
          name: string
          type: 'PUBLIC' | 'PERSONAL'
        }
      }[]
    }
  }
  
  export type NotificationsProps = {
    status : number,
    data : {
      _count : {
        notifications : number 
      }
    }
  }

  export type FolderProps = {
    status : number
    data : {
      name : string
      _count : {
        videos : number
      }
    }
  }