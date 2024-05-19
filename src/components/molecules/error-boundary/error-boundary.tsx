'use client'

// I hope you don't have to see this page, but better this than a blank page due to an error or crash

import React, { Component, ErrorInfo, ReactNode } from 'react'

import Button from '@/atoms/button/button'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error: Error): ErrorBoundaryState {
    console.error(error)

    return { hasError: true }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    // TODO: Pending error handling, like Sentry
    console.error({
      error,
      errorInfo
    })
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h2 className="mb-1 mt-0">Oops, there is an error!</h2>
          <p className="mb-6">We will work to solve it</p>
          <Button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
