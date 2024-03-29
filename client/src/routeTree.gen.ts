// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ForgotImport } from './routes/forgot'
import { Route as ConfirmImport } from './routes/confirm'

// Create Virtual Routes

const SignupLazyImport = createFileRoute('/signup')()
const SigninLazyImport = createFileRoute('/signin')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SignupLazyRoute = SignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const SigninLazyRoute = SigninLazyImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signin.lazy').then((d) => d.Route))

const ForgotRoute = ForgotImport.update({
  path: '/forgot',
  getParentRoute: () => rootRoute,
} as any)

const ConfirmRoute = ConfirmImport.update({
  path: '/confirm',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/confirm': {
      preLoaderRoute: typeof ConfirmImport
      parentRoute: typeof rootRoute
    }
    '/forgot': {
      preLoaderRoute: typeof ForgotImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      preLoaderRoute: typeof SigninLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      preLoaderRoute: typeof SignupLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  ConfirmRoute,
  ForgotRoute,
  SigninLazyRoute,
  SignupLazyRoute,
])
