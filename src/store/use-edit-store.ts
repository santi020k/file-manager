import { type Media } from '@/hooks/use-media'
import { create } from 'zustand'

interface Edit {
  isOpen: boolean
  media?: Media
}

interface EditState {
  edit: Edit
  openEdit: (media: Media) => void
  closeEdit: () => void
}

const initialState = { isOpen: false }

const useEditStore = create<EditState>()(set => ({
  edit: initialState,
  openEdit: media => set(() => ({
    edit: {
      isOpen: true,
      media
    }
  })),
  closeEdit: () => set(() => ({
    edit: {
      isOpen: false,
      media: undefined
    }
  }))
}))

export default useEditStore
