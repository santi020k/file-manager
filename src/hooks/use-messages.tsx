import { ToastAction, ToasterVariants } from '@/atoms/toast/toast'

import useToast from '@/hooks/use-toast'

const useMessages = () => {
  const { toast } = useToast()

  const errorMessage = (onTryAgain: () => void) => {
    // TODO: This could be improved more with more information about the error, but if I have time I will organize it later
    toast({
      variant: ToasterVariants.Destructive,
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: <ToastAction onClick={onTryAgain} altText="Try again">Try again</ToastAction>
    })
  }

  const successMessage = (message?: string) => {
    toast({
      variant: ToasterVariants.Default,
      title: 'Success!',
      description: message ?? 'Operation successful'
    })
  }

  return {
    errorMessage,
    successMessage
  }
}

export default useMessages
