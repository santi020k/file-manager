import { User } from '@/lib/supabase/supabaseClient'

import { create } from 'zustand'

interface UserState {
  user?: User
  isLoading: boolean
  onStartLoading: () => void
  onSaveUser: (user?: User) => void
}

const useUserStore = create<UserState>()(set => ({
  user: undefined,
  isLoading: false,
  onSaveUser: user => set(() => ({
    user,
    isLoading: false
  })),
  onStartLoading: () => set(() => ({
    isLoading: true
  }))
}))

export default useUserStore
