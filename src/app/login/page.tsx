import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { UserAuthForm } from '@/components/organisms/user-auth-form/user-auth-form'

import supabaseServer from '@/lib/supabase/supabaseServer'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login file manager app'
}

const LoginPage = async () => {
  const supabase = supabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session) redirect('/')

  return (
    <main
      className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-login bg-cover bg-center opacity-75" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="rounded-xl bg-[#31363F]/75 px-6 py-2 backdrop-blur">
            <div className="relative h-12 w-64">
              <Image className="m-0" fill src="/assets/logos/logo-light.svg" alt="logo" />
            </div>
          </div>
        </div>
      </div>
      <section className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="mb-0 text-2xl font-semibold tracking-tight">
              Create or login to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Simplify your file management experience
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            {' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>
            {' '}
            and
            {' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
