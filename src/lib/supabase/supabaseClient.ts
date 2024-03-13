import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

export const supabaseClient = () => {
  return createClientComponentClient<Database>()
}

export default supabaseClient
