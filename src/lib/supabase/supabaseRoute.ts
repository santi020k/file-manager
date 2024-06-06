import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

const supabaseRoute = () => createRouteHandlerClient<Database>({ cookies })

export default supabaseRoute
