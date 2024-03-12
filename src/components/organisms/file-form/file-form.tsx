'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/atoms/button/button'
import Input from '@/atoms/input/input'
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
      project: ''
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
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Private Documents" {...field} />
              </FormControl>
              <FormDescription>
                This is the project of the file.
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
