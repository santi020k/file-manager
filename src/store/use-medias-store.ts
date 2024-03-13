import { create } from 'zustand'
import { ByOptions, type Media } from '@/hooks/use-media'

interface Medias {
  [ByOptions.Documents]: Media[]
  [ByOptions.Privates]: Media[]
  [ByOptions.Drive]: Media[]
}

interface MediasState {
  medias: Medias
  isLoading: boolean
  onUpdateMedias: (type: ByOptions, medias: Media[]) => void
}

// TODO: Improve this for scalability
const initialState = {
  [ByOptions.Documents]: [],
  [ByOptions.Privates]: [],
  [ByOptions.Drive]: []
}

const useMediasStore = create<MediasState>()(set => ({
  medias: initialState,
  isLoading: true,
  onUpdateMedias: (type, medias) => set(state => ({
    medias: {
      ...state.medias,
      [type]: medias
    }
  }))
}))

export default useMediasStore
