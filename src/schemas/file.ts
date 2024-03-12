import { z } from 'zod'

const fileFormSchema = z.object({
  name: z.string().min(2)
    .max(50),
  url: z.string().min(2),
  type: z.string().min(1),
  project: z.string().min(2)
})

export {
  fileFormSchema
}
