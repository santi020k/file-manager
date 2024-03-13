'use client'

import * as React from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IconBrandGoogleFilled, IconLoader2 } from '@tabler/icons-react'
import Button from '@/atoms/button/button'
import { ToastAction, ToasterVariants } from '@/atoms/toast/toast'
import useToast from '@/hooks/use-toast'
import type { Database } from '@/lib/database.types'
import { cn } from '@/lib/utils'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm ({ className, ...props }: UserAuthFormProps) {
  const [
    isLoading,
    setIsLoading
  ] = React.useState<boolean>(false)
  const { toast } = useToast()

  const supabase = createClientComponentClient<Database>()

  const handleGoogleOAuth = async () => {
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    }) ?? { error: undefined }

    if (error) {
      setIsLoading(false)
      toast({
        variant: ToasterVariants.Destructive,
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction onClick={handleGoogleOAuth} altText="Try again">Try again</ToastAction>
      })
    }
  }

  return (
    <div className={cn(
      'grid gap-6',
      className
    )} {...props}>
      <Button variant="outline" type="button" onClick={handleGoogleOAuth} disabled={isLoading}>
        {isLoading && <IconLoader2 stroke={1} className="mr-1 animate-spin" />}
        {!isLoading && <IconBrandGoogleFilled size={16} className="mr-1" />}
        Google
      </Button>
    </div>
  )
}
