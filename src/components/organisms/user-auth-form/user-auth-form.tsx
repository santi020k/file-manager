'use client'

import * as React from 'react'

import Button from '@/atoms/button/button'
import useMessages from '@/hooks/use-messages'
import supabaseClient from '@/lib/supabase/supabaseClient'
import { cn } from '@/lib/utils'
import { IconBrandGoogleFilled, IconLoader2 } from '@tabler/icons-react'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [
    isLoading,
    setIsLoading
  ] = React.useState<boolean>(false)

  const { errorMessage } = useMessages()
  const supabase = supabaseClient()

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

      errorMessage(handleGoogleOAuth)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Button variant="outline" type="button" onClick={handleGoogleOAuth} disabled={isLoading}>
        {isLoading ? <IconLoader2 stroke={1} className="mr-1 animate-spin" /> : null}
        {!isLoading && <IconBrandGoogleFilled size={16} className="mr-1" />}
        Google
      </Button>
    </div>
  )
}
