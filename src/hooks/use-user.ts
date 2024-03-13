import { useEffect, useState } from 'react'

import supabaseClient, { User } from '@/lib/supabase/supabaseClient'

const useUser = () => {
  const [
    user,
    setUser
  ] = useState<User>()
  const supabase = supabaseClient()

  useEffect(
    () => {
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
        } else {
          setUser(undefined)
        }
      }
      getUser()
    },
    // TODO: fix Later
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { user }
}

export { type User }

export default useUser
