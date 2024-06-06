'use client'

import { useEffect, useMemo } from 'react'

import Gallery from '@/components/organisms/gallery/gallery'
import useMedia, { ByOptions, type Media } from '@/hooks/use-media'
import useUser from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import FileForm from '@/organisms/file-form/file-form'
import useEditStore from '@/store/use-edit-store'
import useMediasStore from '@/store/use-medias-store'
import { IconX } from '@tabler/icons-react'

const ListStorages = () => {
  const medias = useMediasStore(state => state.medias)
  const edit = useEditStore(state => state.edit)
  const { openEdit, closeEdit } = useEditStore(state => state)
  const { getMedias } = useMedia()
  const { user } = useUser()

  const handleEdit = (media?: Media) => {
    if (media?.id && media.id !== edit?.media?.id) {
      openEdit(media)
    } else {
      closeEdit()
    }
  }

  // TODO: Move this
  let folder = ByOptions.Documents

  if (edit?.media?.url.split('/').includes(ByOptions.Privates)) {
    folder = ByOptions.Privates
  } else if (edit?.media?.url.split('/').includes(ByOptions.Drive)) {
    folder = ByOptions.Drive
  }

  const formInitialValues = useMemo(() => ({
    name: edit?.media?.name ?? '',
    url: edit?.media?.url ?? '',
    type: edit?.media?.metadata?.mimetype?.split('/')?.[0] ?? '',
    folder
  }), [edit?.media])

  useEffect(() => {
    if (user) {
      getMedias(ByOptions.Documents)

      getMedias(ByOptions.Privates)

      getMedias(ByOptions.Drive)
    }
  }, [user])

  return (
    <div className="container overflow-x-hidden px-0 pt-[160px] sm:overflow-x-visible sm:pt-[65px]">
      <div className={cn('grid items-stretch', edit.isOpen && 'grid-cols-[300px_1fr] md:grid-cols-[1fr_300px]')}>
        {/* Sidebar */}
        <aside className={cn('hidden flex-col space-y-4 py-6 md:order-2 border-r sm:border-r-0 sm:border-l p-0', edit.isOpen && 'flex')}>
          <div className="sticky top-[65px] flex h-[calc(100vh-65px)] flex-col gap-2 overflow-y-auto p-6">
            <div className="flex flex-row flex-nowrap items-center justify-between sm:my-8">
              <h3 className="m-0">
                Edit
              </h3>
              <div className="flex size-8 cursor-pointer items-center justify-center" onClick={closeEdit}>
                <IconX stroke={1} size={18} />
              </div>
            </div>

            {edit.isOpen ? <FileForm initialValues={formInitialValues} /> : null}

          </div>
        </aside>

        <div>
          <section className="p-6 pb-16 md:order-1">
            <Gallery title="Documents" medias={medias[ByOptions.Documents].medias} onEdit={handleEdit} isLoading={medias[ByOptions.Documents].isLoading} byOption={ByOptions.Documents} />
          </section>

          <section className="p-6 pb-16 md:order-1">
            <Gallery title="Private Documents" medias={medias[ByOptions.Privates].medias} onEdit={handleEdit} isLoading={medias[ByOptions.Privates].isLoading} byOption={ByOptions.Privates} />
          </section>

          <section className="p-6 pb-16 md:order-1">
            <Gallery title="Drive" medias={medias[ByOptions.Drive].medias} onEdit={handleEdit} isLoading={medias[ByOptions.Drive].isLoading} byOption={ByOptions.Drive} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default ListStorages
