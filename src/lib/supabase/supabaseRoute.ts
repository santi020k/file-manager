import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'

const supabaseRoute = () => {
  return createRouteHandlerClient<Database>({ cookies })
}

export default supabaseRoute
