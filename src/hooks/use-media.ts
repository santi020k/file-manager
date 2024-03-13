import { useEffect, useState } from 'react'

import useMessages from '@/hooks/use-messages'
import supabaseClient, { FileObject, User } from '@/lib/supabase/supabaseClient'

export enum ByOptions {
  Documents = 'documents',
  Privates = 'privates',
  Drive = 'rive'
}

export interface Media extends FileObject {
  url: string
}

const useMedia = (user: User, by?: string) => {
  const [
    medias,
    setMedias
  ] = useState<Media[]>([])
  const { errorMessage } = useMessages()

  const supabase = supabaseClient()

  const addUrl = async (files: FileObject[]) => {
    let temporalMedias: Media[] = []
    for (const file of files) {
      const { data } = await supabase.storage.from('uploads').createSignedUrl(
        `${user?.id}/${by ?? ByOptions.Documents}/${file.name}`,
        3600
      )
      temporalMedias = [
        ...temporalMedias,
        {
          ...file,
          url: data?.signedUrl ?? ''
        }
      ]
    }

    setMedias(temporalMedias)
  }

  const getMedias = async () => {
    const { data: files, error } = await supabase.storage.from('uploads').list(
      `${user?.id}/${by ?? ByOptions.Documents}/`,
      {
        limit: 10,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc'
        }
      }
    )

    if (files) {
      addUrl(files)
    } else {
      errorMessage(getMedias)
      console.error(error)
    }
  }

  useEffect(
    () => {
      if (user) {
        getMedias()
      }
    },
    [user]
  )

  return {
    medias,
    getMedias
  }
}

export { type User, type FileObject }

export default useMedia
