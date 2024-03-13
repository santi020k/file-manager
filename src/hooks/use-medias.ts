import useMedia, { ByOptions } from '@/hooks/use-media'
import useUser, { type User } from '@/hooks/use-user'

const useMedias = () => {
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

  return {
    mediasDocument,
    isLoadingDocument,
    getMediasDocument,
    mediasPrivate,
    isLoadingPrivate,
    getMediasPrivate,
    mediasDrive,
    isLoadingDrive,
    getMediasDrive
  }
}

export default useMedias
