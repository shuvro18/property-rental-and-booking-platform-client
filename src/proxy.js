
import { headers } from 'next/headers';
import { auth } from './app/lib/auth'

import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const url = request.nextUrl;

    const session = await auth.api.getSession({
    headers: await headers()
   })

   if(url.pathname === "/properties"){
    return NextResponse.next()
   }

   if(!session){
    return NextResponse.redirect(new URL('/register', request.url))
   }

//    return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/properties/:path*'],
}