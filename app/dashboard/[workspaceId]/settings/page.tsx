'use client'
import { enableFirstView, getFirstView } from '@/app/actions/user'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {}

const Settings = (props : Props) => {
    const[firstView, setFirstView] = useState<undefined | boolean>(undefined)

    useEffect(() => {
      const fetchData = async () => {
      const response = await getFirstView()
      if(response?.status === 200) setFirstView(response.data)
      }
    fetchData()
    },[firstView])

        const switchState = async (checked: boolean) => {
          const view = await enableFirstView(checked)
          if (view) {
            toast(view.status === 200 ? 'Success' : 'Failed', {
              description: view.data,
            })
          }
        }
      
  return (
    <div>
      <h2 className='text-2xl font-bold mt-4'>Video Sharing Settings</h2>
      <p className='text-muted-foreground pt-1 max-w-3xl'>
      Enabling this feature will send you notifications when someone watched
        your video for the first time. This feature can help during client
        outreach.
      </p>
      <Label className='flex gap-x-3 items-center mt-4 text-md'>
      Enable First View
      <Switch
      onCheckedChange={switchState}
      checked={firstView}
      onClick={() => setFirstView(!firstView)}
       disabled={firstView === undefined}
      />
      </Label>
    </div>
  )
}

export default Settings
