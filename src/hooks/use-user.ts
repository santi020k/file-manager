import supabaseClient, { User } from '@/lib/supabase/supabaseClient'
import useUserStore from '@/store/use-user-store'

// TODO: move to store
const useUser = () => {
  const user = useUserStore(state => state.user)
  const { onSaveUser, isLoading, onStartLoading } = useUserStore(state => state)
  const supabase = supabaseClient()

  const getUser = async () => {
    onStartLoading()

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      onSaveUser(user)
    }
  }

  if (!isLoading && !user) getUser()

  return { user }
}

export { type User }

export default useUser
