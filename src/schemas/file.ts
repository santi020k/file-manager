import { z } from 'zod'

const fileFormSchema = z.object({
  name: z.string().min(2),
  url: z.string().min(2),
  type: z.string().min(1),
  folder: z.string().min(2)
})

export {
  fileFormSchema
}
