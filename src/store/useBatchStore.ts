import { create } from 'zustand'

interface Batch {
  isOpen: boolean
  selected: number[]
}

interface BatchState {
  batch: Batch
  toggleBatch: () => void
  handleSelected: (id: number) => void
}

const initialState = {
  isOpen: false,
  selected: []
}

const useBatchStore = create<BatchState>()(set => ({
  batch: initialState,
  toggleBatch: () => set(({ batch }) => ({
    batch: {
      isOpen: !batch.isOpen,
      selected: []
    }
  })),
  handleSelected: id => set(({ batch }) => {
    const filteredSelected = batch.selected?.filter(selected => selected !== id)
    const isFiltered = filteredSelected?.length !== batch.selected?.length
    if (!isFiltered || !batch.selected.length) {
      return ({
        batch: {
          ...batch,
          selected: [
            ...batch.selected,
            id
          ]
        }
      })
    }

    return ({
      batch: {
        ...batch,
        selected: filteredSelected
      }
    })
  })
}))

export default useBatchStore
