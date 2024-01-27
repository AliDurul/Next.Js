import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware'


// export function middleware(req: NextRequest) {

//      if (req.nextUrl.pathname.startsWith('/dashboard')) {
//           console.log('lee');

//      }

//      return NextResponse.next()
// }

export const config = { matcher: ['/dashboard'] }