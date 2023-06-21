export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/my',
    '/tv/:path*',
    '/films/:path*',
    '/serials/:path*',
    '/cabinet/:path*',
    '/sport',
    '/children',
  ],
}
