import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Header from '@/components/organisms/header/header'
import supabaseServer from '@/lib/supabase/supabaseServer'
import ListStorages from '@/organisms/list-storages/list-storages'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Discover unparalleled efficiency and insights with our intuitive dashboard'
}

const Dashboard = async () => {
  const supabase = supabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="flex h-screen max-h-screen flex-col">
      <Header />
      <ListStorages />
    </main>
  )
}

export default Dashboard
