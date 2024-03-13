import { useEffect } from 'react'

import useMedia, { ByOptions } from '@/hooks/use-media'
import useUser, { type User } from '@/hooks/use-user'
import useMediasStore from '@/store/use-medias-store'

const useMedias = () => {
  const medias = useMediasStore(state => state.medias)
  const onUpdateMedias = useMediasStore(state => state.onUpdateMedias)

  const { user } = useUser()
  const { medias: mediasDocument, isLoading: isLoadingDocument, getMedias: getMediasDocument } = useMedia(
    user as User,
    ByOptions.Documents
  )
  const { medias: mediasPrivate, isLoading: isLoadingPrivate, getMedias: getMediasPrivate } = useMedia(
    user as User,
    ByOptions.Privates
  )
  const { medias: mediasDrive, isLoading: isLoadingDrive, getMedias: getMediasDrive } = useMedia(
    user as User,
    ByOptions.Drive
  )

  useEffect(
    () => {
      onUpdateMedias(
        ByOptions.Documents,
        mediasDocument
      )
      onUpdateMedias(
        ByOptions.Privates,
        mediasPrivate
      )
      onUpdateMedias(
        ByOptions.Drive,
        mediasDrive
      )
    },
    [
      mediasDocument,
      mediasPrivate,
      mediasDrive
    ]
  )

  return {
    mediasDocument: medias[ByOptions.Documents],
    isLoadingDocument,
    getMediasDocument,
    mediasPrivate: medias[ByOptions.Privates],
    isLoadingPrivate,
    getMediasPrivate,
    mediasDrive: medias[ByOptions.Drive],
    isLoadingDrive,
    getMediasDrive
  }
}

export default useMedias
