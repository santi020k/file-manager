'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { fileFormSchema } from '@/schemas/file'

const FileForm = () => {
  const form = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: {
      name: '',
      url: '',
      type: '',
      folder: ''
    }
  })

  function onSubmit (values: z.infer<typeof fileFormSchema>) {
    console.log(values)
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Folder" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="private">Private Documents</SelectItem>
                  <SelectItem value="public">Public Documents</SelectItem>
                  <SelectItem value="drive">Google Drive</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Whether you want to store them in a public repository, keep them private, or seamlessly integrate them with your Google Drive projects
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
