import { create } from 'zustand'

interface Edit {
  isOpen: boolean
  id?: number
}

interface EditState {
  edit: Edit
  openEdit: (id: number) => void
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
