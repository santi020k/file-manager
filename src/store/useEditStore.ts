import { create } from 'zustand'

interface Edit {
  isOpen: boolean
  id?: string
}

interface EditState {
  edit: Edit
  openEdit: (id: string) => void
  closeEdit: () => void
}

const initialState = { isOpen: false }

const useEditStore = create<EditState>()(set => ({
  edit: initialState,
  openEdit: id => set(() => ({
    edit: {
      isOpen: true,
      id
    }
  })),
  closeEdit: () => set(() => ({
    edit: {
      isOpen: false,
      id: undefined
    }
  }))
}))

export default useEditStore
