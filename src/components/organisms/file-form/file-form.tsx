'use client'

import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/button/button'
import Input from '@/atoms/input/input'
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/atoms/select/select'

import Form, {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/molecules/form/form'

import supabaseClient from '@/lib/supabase/supabaseClient'

import useUserStore from '@/store/use-user-store'

import useMedia, { ByOptions } from '@/hooks/use-media'
import useMessages from '@/hooks/use-messages'

import { fileFormSchema } from '@/schemas/file'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface InitialValues {
  name?: string
  url?: string
  type?: string
  folder?: string
}

export interface FileFormProps {
  initialValues?: InitialValues
}

const defaultForm = {
  name: '',
  url: '',
  type: '',
  folder: ''
}

const FileForm: React.FC<FileFormProps> = ({ initialValues }) => {
  const user = useUserStore(state => state.user)
  const { errorMessage, successMessage } = useMessages()
  const { getMedias } = useMedia()
  const supabase = supabaseClient()
  const form = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: useMemo(() => initialValues ?? defaultForm, [initialValues])
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues])

  // TODO: Refactor
  const onSubmit = async (values: z.infer<typeof fileFormSchema>) => {
    if (initialValues?.folder === values.folder) return false

    const oldDirection = `${user?.id}/${initialValues?.folder ?? ByOptions.Documents}/${values.name}`
    const newDirection = `${user?.id}/${values.folder ?? ByOptions.Documents}/${values.name}`
    const { data } = await supabase
      .storage
      .from('uploads')
      .move(oldDirection, newDirection)

    if (data) {
      successMessage()

      // TODO: improve with new js pattern matching, no need to update everything
      getMedias(ByOptions.Documents)

      getMedias(ByOptions.Privates)

      getMedias(ByOptions.Drive)

      return true
    } else {
      errorMessage(() => onSubmit(values))

      return false
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled placeholder="the-file.pdf" {...field} />
              </FormControl>
              <FormDescription>
                This is the file display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input disabled placeholder="https://supabase.com/the-file.pdf" {...field} />
              </FormControl>
              <FormDescription>
                This is the file url.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input disabled placeholder="PDF" {...field} />
              </FormControl>
              <FormDescription>
                This is the type of file.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="folder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folders</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Folder" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ByOptions.Documents}>Documents</SelectItem>
                  <SelectItem value={ByOptions.Privates}>Private Documents</SelectItem>
                  <SelectItem value={ByOptions.Drive}>Google Drive</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Whether you want to store them in a public repository, keep them private,
                or seamlessly integrate them with your Google Drive projects
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default FileForm
