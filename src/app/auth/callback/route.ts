import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import supabaseRoute from '@/lib/supabase/supabaseRoute'

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = supabaseRoute()

    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
