import React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/Spinner'

type Props = {
  state: boolean
  className?: string
  color?: string
  children?: React.ReactNode
}

const Loader = ({ state, className, color, children }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner />
    </div>
  ) : (
    children
  )
}

export default Loader