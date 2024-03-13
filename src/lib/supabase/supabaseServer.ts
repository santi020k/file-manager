import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseServer = () => {
  cookies().getAll() // Keep cookies in the JS execution context for Next.js build
  return createServerComponentClient<Database>({ cookies })
}

export default supabaseServer
