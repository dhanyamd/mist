import { Button } from '@/components/ui/button'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-bold flex items-center gap-x-3">
        <Menu className="w-8 h-8" />
        Mist
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/"
          className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
        >
          Home
        </Link>
        <Link href="/">Pricing</Link>
        <Link href="/">Contact</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button className="text-base flex gap-x-2">
          <User fill="#000" />
          Login
        </Button>
      </Link>
    </div>
  )
}

export default LandingPageNavBar