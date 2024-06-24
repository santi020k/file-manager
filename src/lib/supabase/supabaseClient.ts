import type { Database } from '@/lib/database.types'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FileObject } from '@supabase/storage-js'
import { User } from '@supabase/supabase-js'

export const supabaseClient = () => createClientComponentClient<Database>()

export default supabaseClient

export { type FileObject, type User }
