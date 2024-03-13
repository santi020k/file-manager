import { useEffect } from 'react'

import useMessages from '@/hooks/use-messages'
import useUser from '@/hooks/use-user'
import supabaseClient, { FileObject, User } from '@/lib/supabase/supabaseClient'
import useMediasStore from '@/store/use-medias-store'

export enum ByOptions {
  Documents = 'documents',
  Privates = 'privates',
  Drive = 'drive'
}

export interface Media extends FileObject {
  url: string
}

// TODO: Separate into two hook
const useMedia = () => {
  const { user } = useUser()
  const medias = useMediasStore(state => state.medias)
  const isLoading = useMediasStore(state => state.isLoading)

  const { onUpdateMedias, onStartLoading } = useMediasStore(state => state)

  const { errorMessage } = useMessages()

  const supabase = supabaseClient()

  const addUrl = async (files: FileObject[], thisBy: ByOptions) => {
    let temporalMedias: Media[] = []
    await Promise.allSettled(files.map(file => (
      supabase.storage.from('uploads').createSignedUrl(
        `${user?.id}/${thisBy}/${file.name}`,
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

    onUpdateMedias(
      thisBy,
      temporalMedias
    )
  }

  const getMedias = async (thisBy: ByOptions) => {
    onStartLoading(thisBy)
    const { data: files, error } = await supabase.storage.from('uploads').list(
      `${user?.id}/${thisBy ?? ByOptions.Documents}/`,
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
      await addUrl(
        files,
        thisBy
      )
    } else {
      errorMessage(() => getMedias(thisBy))
      console.error(error)
    }
  }

  useEffect(
    () => {
      if (user && medias.documents.isLoading) {
        getMedias(ByOptions.Documents)
        getMedias(ByOptions.Privates)
        getMedias(ByOptions.Drive)
      }
    },
    [user]
  )

  return {
    isLoading,
    mediasDocuments: medias[ByOptions.Documents],
    mediasPrivates: medias[ByOptions.Privates],
    mediasDrive: medias[ByOptions.Drive],
    getMedias
  }
}

export { type User, type FileObject }

export default useMedia
