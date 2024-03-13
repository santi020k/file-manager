'use client'

import { IconX } from '@tabler/icons-react'
import { Metadata } from 'next'
import Gallery from '@/components/organisms/gallery/gallery'
import useMedia, { ByOptions } from '@/hooks/use-media'
import useUser, { type User } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import FileForm from '@/organisms/file-form/file-form'
import useEditStore from '@/store/useEditStore'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

const Dashboard = () => {
  const { user } = useUser()
  const { medias: mediasDocument, isLoading: isLoadingDocument } = useMedia(
    user as User,
    ByOptions.Documents
  )
  const { medias: mediasPrivate, isLoading: isLoadingPrivate } = useMedia(
    user as User,
    ByOptions.Privates
  )
  const { medias: mediasDrive, isLoading: isLoadingDrive } = useMedia(
    user as User,
    ByOptions.Drive
  )
  const edit = useEditStore(state => state.edit)
  const { openEdit, closeEdit } = useEditStore(state => state)

  const handleEdit = (id?: string) => {
    if (id && id !== edit.id) {
      openEdit(id)
    } else {
      closeEdit()
    }
  }

  return (
    <div className="container overflow-x-hidden px-0 pt-[160px] sm:overflow-x-visible sm:pt-[65px]">
      <div className={cn(
        'grid items-stretch',
        edit.isOpen && 'grid-cols-[300px_1fr] md:grid-cols-[1fr_300px]'
      )}>
        {/* Sidebar */}
        <aside className={cn(
          'hidden flex-col space-y-4 py-6 md:order-2 border-r sm:border-r-0 sm:border-l p-0',
          edit.isOpen && 'flex'
        )}>
          <div className="sticky top-[65px] flex h-[calc(100vh-65px)] flex-col gap-2 overflow-y-auto p-6">
            <div className="flex flex-row flex-nowrap items-center justify-between sm:my-8">
              <h3 className="m-0">
                  Edit
              </h3>
              <div className="flex size-8 cursor-pointer items-center justify-center" onClick={() => handleEdit()}>
                <IconX stroke={1} size={18} />
              </div>
            </div>

            <FileForm />

          </div>
        </aside>

        <div>
          {/* Content */}
          <section className="p-6 pb-16 md:order-1">
            <Gallery title="Documents" medias={mediasDocument} onEdit={handleEdit} isLoading={isLoadingDocument} />
          </section>

          <section className="p-6 pb-16 md:order-1">
            <Gallery title="Private Documents" medias={mediasPrivate} onEdit={handleEdit} isLoading={isLoadingPrivate} />
          </section>

          <section className="p-6 pb-16 md:order-1">
            <Gallery title="Drive" medias={mediasDrive} onEdit={handleEdit} isLoading={isLoadingDrive} />
          </section>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
