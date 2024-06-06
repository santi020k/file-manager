'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Button, { ButtonVariants } from '@/atoms/button/button'
import Separator from '@/atoms/separator/separator'
import DialogConfirm from '@/components/molecules/dialog-confirm/dialog-confirm'
import useMedia, { ByOptions } from '@/hooks/use-media'
import useMessages from '@/hooks/use-messages'
import supabaseClient from '@/lib/supabase/supabaseClient'
import DialogDrive from '@/organisms/dialog-drive/dialog-drive'
import DialogFileUpload from '@/organisms/dialog-file-upload/dialog-file-upload'
import useBatchStore from '@/store/use-batch-store'
import useEditStore from '@/store/use-edit-store'
import { IconCheckbox, IconLogout, IconX } from '@tabler/icons-react'

const Header = () => {
  const batch = useBatchStore(state => state.batch)
  const toggleBatch = useBatchStore(state => state.toggleBatch)
  const closeEdit = useEditStore(state => state.closeEdit)
  const supabase = supabaseClient()
  const router = useRouter()
  const { getMedias } = useMedia()
  const { errorMessage, successMessage } = useMessages()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      errorMessage(handleLogout)
    } else {
      router.push('/login')
    }
  }

  const handleDelete = async () => {
    if (!batch.selected.length) {
      successMessage('there was nothing to delete')

      return false
    }

    const { data, error } = await supabase
      .storage
      .from('uploads')
      .remove(batch.selected)

    if (error || !data.length) {
      errorMessage(handleLogout)

      return true
    } else {
      getMedias(ByOptions.Documents)

      getMedias(ByOptions.Privates)

      getMedias(ByOptions.Drive)

      successMessage()

      return false
    }
  }

  const handleToggleBatch = () => {
    closeEdit()

    toggleBatch()
  }

  return (
    <header className="fixed z-40 w-screen bg-white">
      <div className="container flex flex-col items-start justify-between space-y-2 px-2 py-4 sm:flex-row sm:items-center sm:space-y-0 sm:px-8 md:h-16">
        <div className="relative mx-auto h-10 w-48 sm:mx-0">
          <Image className="m-0" fill src="/assets/logos/logo-dark.svg" alt="logo" />
        </div>

        <div className="ml-auto flex w-full flex-wrap justify-center gap-2 sm:justify-end">
          {!batch.isOpen && (
            <>
              <DialogDrive />
              <DialogFileUpload />
            </>
          )}
          {batch.isOpen
            ? (
              <>
                <DialogConfirm onConfirm={handleDelete} />
                <Button variant={ButtonVariants.Secondary} onClick={handleToggleBatch}>
                  Cancel
                  <IconX stroke={1} size={18} className="ml-1" />
                </Button>
              </>
            )
            : (
              <Button variant={ButtonVariants.Secondary} onClick={handleToggleBatch}>
                Batch
                <IconCheckbox stroke={1} size={18} className="ml-1" />
              </Button>
            )}
          <Button variant={ButtonVariants.Secondary} onClick={handleLogout}>
            Logout
            <IconLogout stroke={1} size={18} className="ml-1" />
          </Button>
        </div>
      </div>
      <Separator />
    </header>
  )
}

export default Header
