import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FileObject } from '@supabase/storage-js'
import { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

export const supabaseClient = () => {
  return createClientComponentClient<Database>()
}

export default supabaseClient

export { type FileObject, type User }
