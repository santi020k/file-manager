'use client'

import { Metadata } from 'next'
import Gallery from '@/components/organisms/gallery/gallery'
import { cn } from '@/lib/utils'
import useEditStore from '@/store/useEditStore'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

const Dashboard = () => {
  const edit = useEditStore(state => state.edit)
  const { openEdit, closeEdit } = useEditStore(state => state)

  const handleEdit = (id?: number) => {
    if (id && id !== edit.id) {
      openEdit(id)
    } else {
      closeEdit()
    }
  }

  return (
    <div className="container h-screen pb-0 pt-[65px]">
      <div className={cn(
        'grid h-full items-stretch gap-6',
        edit.isOpen && 'md:grid-cols-[1fr_200px]'
      )}>
        {/* Sidebar */}
        <aside className={cn(
          'hidden flex-col space-y-4 py-6 md:order-2',
          edit.isOpen && 'flex'
        )}>
          <div className="grid gap-2">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Edit
            </span>
            {/* TODO: Form for edit here */}
          </div>
        </aside>

        {/* Content */}
        <section className="overflow-auto p-6 pb-16 md:order-1">
          <Gallery onEdit={handleEdit} />
        </section>
      </div>
    </div>
  )
}
export default Dashboard
