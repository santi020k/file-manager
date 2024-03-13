import { ByOptions, type Media } from '@/hooks/use-media'

import { create } from 'zustand'

interface MediaStore {
  medias: Media[]
  isLoading: boolean
}

interface Medias {
  [ByOptions.Documents]: MediaStore
  [ByOptions.Privates]: MediaStore
  [ByOptions.Drive]: MediaStore
}

interface MediasState {
  medias: Medias
  onUpdateMedias: (type: ByOptions, medias: Media[]) => void
  onStartLoading: (type: ByOptions) => void
}

// TODO: Improve this for scalability
const initialState = {
  documents: {
    isLoading: true,
    medias: []
  },
  privates: {
    isLoading: true,
    medias: []
  },
  drive: {
    isLoading: true,
    medias: []
  }
}

const useMediasStore = create<MediasState>()(set => ({
  medias: initialState,
  onUpdateMedias: (type, medias) => set(state => ({
    medias: {
      ...state.medias,
      [type]: {
        medias,
        isLoading: false
      }
    }
  })),
  onStartLoading: type => set(state => (({
    medias: {
      ...state.medias,
      [type]: {
        isLoading: true
      }
    }
  })))
}))

export default useMediasStore
