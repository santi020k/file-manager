'use client'

import * as React from 'react'

import { IconBrandGmail, IconLoader2 } from '@tabler/icons-react'
import { Button } from '@/atoms/button/button'
import { cn } from '@/lib/utils'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm ({ className, ...props }: UserAuthFormProps) {
  const [
    isLoading,
    setIsLoading
  ] = React.useState<boolean>(false)

  const handleClick = () => {
    setIsLoading(true)

    setTimeout(
      () => {
        setIsLoading(false)
      },
      3000
    )
  }

  return (
    <div className={cn(
      'grid gap-6',
      className
    )} {...props}>
      <Button variant="outline" type="button" onClick={handleClick} disabled={isLoading}>
        {isLoading && <IconLoader2 className='mr-1 animate-spin' />}
        {!isLoading && <IconBrandGmail className='mr-1' />}
        Google
      </Button>
    </div>
  )
}