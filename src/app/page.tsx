import { Metadata } from 'next'
import Header from '@/molecules/header/header'
import ListStorages from '@/organisms/list-storages/list-storages'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

const Dashboard = () => (
  <main className="flex h-screen max-h-screen flex-col">
    <Header />
    <ListStorages />
  </main>
)

export default Dashboard
