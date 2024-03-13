import { useEffect, useState } from 'react'

import useMessages from '@/hooks/use-messages'
import supabaseClient, { FileObject, User } from '@/lib/supabase/supabaseClient'

const useMedia = (user: User) => {
  const [
    media,
    setMedia
  ] = useState<FileObject[]>([])
  const { errorMessage } = useMessages()

  const supabase = supabaseClient()

  const getMedia = async () => {
    const { data, error } = await supabase.storage.from('uploads').list(
      user?.id + '/',
      {
        limit: 10,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc'
        }
      }
    )

    if (data) {
      setMedia(data)
    } else {
      errorMessage(getMedia)
      console.error(error)
    }
  }

  useEffect(
    () => {
      getMedia()
    },
    []
  )

  return {
    media,
    getMedia
  }
}

export { type User, type FileObject }

export default useMedia
