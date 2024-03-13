import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/lib/database.types'
import Header from '@/molecules/header/header'
import ListStorages from '@/organisms/list-storages/list-storages'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data } = await supabase.from('todos').select()
  console.log(
    '🚀 ~ Dashboard ~ data:',
    data
  )

  return (
    <main className="flex h-screen max-h-screen flex-col">
      <Header />
      <ListStorages />
    </main>
  )
}

export default Dashboard
