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
  const [
    isLoading,
    setIsLoading
  ] = useState<boolean>(true)
  const { errorMessage } = useMessages()

  const supabase = supabaseClient()

  const addUrl = async (files: FileObject[]) => {
    let temporalMedias: Media[] = []
    await Promise.allSettled(files.map(file => (
      supabase.storage.from('uploads').createSignedUrl(
        `${user?.id}/${by ?? ByOptions.Documents}/${file.name}`,
        3600
      )
        .then(({ data }) => {
          temporalMedias = [
            ...temporalMedias,
            {
              ...file,
              url: data?.signedUrl ?? ''
            }
          ]
        })
    )))

    setMedias(temporalMedias)
  }

  const getMedias = async () => {
    setIsLoading(true)
    const { data: files, error } = await supabase.storage.from('uploads').list(
      `${user?.id}/${by ?? ByOptions.Documents}/`,
      {
        // TODO: Add pagination or infinite scroll (Future)
        limit: 9999,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc'
        }
      }
    )

    if (files) {
      await addUrl(files)
    } else {
      errorMessage(getMedias)
      console.error(error)
    }

    setIsLoading(false)
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
    isLoading,
    medias,
    getMedias
  }
}

export { type User, type FileObject }

export default useMedia
