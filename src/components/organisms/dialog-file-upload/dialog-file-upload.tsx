'use client'

import React, { useRef, useState } from 'react'

import Button, { ButtonVariants } from '@/atoms/button/button'
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/atoms/dialog/dialog'
import Input from '@/atoms/input/input'
import Label from '@/atoms/label/label'
import Progress from '@/atoms/progress/progress'

import supabaseClient from '@/lib/supabase/supabaseClient'

import useUserStore from '@/store/use-user-store'

import useMedia, { ByOptions } from '@/hooks/use-media'
import useMessages from '@/hooks/use-messages'
import useProgress from '@/hooks/use-progress'

import { IconFileUpload } from '@tabler/icons-react'

const DialogFileUpload = () => {
  const [
    file,
    setFile
  ] = useState<File>()
  const [
    isLoading,
    setIsLoading
  ] = useState(false)
  const user = useUserStore(state => state.user)
  const refInput = useRef<HTMLInputElement | null>(null)
  const { getMedias } = useMedia()
  const { errorMessage, successMessage } = useMessages()
  const { progress, startProgress, endProgress } = useProgress()
  const supabase = supabaseClient()

  const reset = () => {
    if (refInput?.current?.value) {
      refInput.current.value = ''
    }
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0])
  }

  // TODO: Refactor, a lot of responsibilities
  const uploadImage = async () => {
    if (!file) return false

    setIsLoading(true)

    const isBigFile = file.size > 500000000

    startProgress({ start: isBigFile ? 10 : 30, increases: isBigFile ? 5 : 30 })

    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(`${user?.id}/documents/${crypto.randomUUID()}-${file.name}`, file)

    if (data) {
      getMedias(ByOptions.Documents)

      reset()

      successMessage('File successfully uploaded')
    } else {
      console.error(error)

      errorMessage(uploadImage)
    }

    setIsLoading(false)

    endProgress()

    return true
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ButtonVariants.Secondary}>
          Upload
          <IconFileUpload stroke={1} size={18} className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mt-0">Upload File</DialogTitle>
          <DialogDescription>
            Quickly and easily upload files with our intuitive upload file
            ui/infrastructure. Simply select your files, and they&#39;ll be ready to go in no time
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="upload" className="sr-only">
              Upload
            </Label>
            <Input
              id="upload"
              type="file"
              ref={refInput}
              onChange={handleFile}
            />
          </div>

          <Button type="submit" size="sm" className="px-3" disabled={isLoading || !file} onClick={uploadImage}>
            <span className="sr-only">Upload</span>
            <IconFileUpload stroke={1} size={18} />
          </Button>

        </div>
        {!!progress && <Progress value={progress} />}
      </DialogContent>
    </Dialog>
  )
}

export default DialogFileUpload
