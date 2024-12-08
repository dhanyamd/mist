import { acceptInvite } from '@/app/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params : {
        inviteId : string
    }
}

const Invite = async({params : {inviteId}} : Props) => {
 const invite = await acceptInvite(inviteId)
 if(invite.status == 404) return redirect('/auth/sign-in')

if(invite.status == 401) {
    return (
        <div className='h-screen container flex flex-col gap-y-2 justify-center items-center'>
           <h2 className='text-white text-6xl font-bold'>Not authorized</h2>
           <p>You are not authorised to accept this invite</p>
        </div>
    )
}
if(invite.status === 200) return redirect('/auth/callback')
}

export default Invite
