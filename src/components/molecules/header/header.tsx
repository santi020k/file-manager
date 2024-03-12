'use client'

import { IconBrandGoogleDrive, IconCheckbox, IconLogout, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import Button, { ButtonVariants } from '@/atoms/button/button'
import Separator from '@/atoms/separator/separator'
import SelectedOptions from '@/molecules/selected-options/selected-options'
import DialogFileUpload from '@/organisms/dialog-file-upload/dialog-file-upload'
import useBatchStore from '@/store/useBatchStore'

const Header = () => {
  const batch = useBatchStore(state => state.batch)
  const { toggleBatch } = useBatchStore(state => state)

  return (
    <header className="fixed z-40 w-screen bg-white">
      <div className="container flex flex-col items-start justify-between space-y-2 px-2 py-4 sm:flex-row sm:items-center sm:space-y-0 sm:px-8 md:h-16">
        <div className="relative mx-auto h-10 w-48 sm:mx-0">
          <Image className="m-0" fill src="/assets/logos/logo-dark.svg" alt="logo" />
        </div>

        <div className="ml-auto flex w-full flex-wrap justify-center gap-2 sm:justify-end">
          {!batch.isOpen && (
            <>
              <Button variant={ButtonVariants.Secondary}>
                Drive
                <IconBrandGoogleDrive stroke={1} size={18} className="ml-1" />
              </Button>
              <DialogFileUpload />
            </>
          )}
          {batch.isOpen
            ? (
              <>
                <SelectedOptions />
                <Button variant={ButtonVariants.Secondary} onClick={toggleBatch}>
                  Cancel
                  <IconX stroke={1} size={18} className="ml-1" />
                </Button>
              </>
            )
            : (
              <Button variant={ButtonVariants.Secondary} onClick={toggleBatch}>
                Batch
                <IconCheckbox stroke={1} size={18} className="ml-1" />
              </Button>
            )}
          <Button variant={ButtonVariants.Secondary} onClick={() => {}}>
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
