import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import supabaseServer from '@/lib/supabase/supabaseServer'
import Header from '@/molecules/header/header'
import ListStorages from '@/organisms/list-storages/list-storages'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
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
