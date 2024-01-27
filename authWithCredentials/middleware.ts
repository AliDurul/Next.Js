import { NextRequest, NextResponse } from 'next/server';

// export {default} from 'next-auth/middleware'


export function middleware(req:NextRequest){
     console.log('lee');

     return NextResponse.next()
}

export const config = {matcher:['/dashboard']}