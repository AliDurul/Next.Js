'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidateUsers() {
  revalidateTag('users')
  // redirect('/revalidate')
}

export async function revalidateTodos() {
  revalidateTag('todos')
  redirect('/revalidate')
}

export async function revalidateAll() {
  revalidatePath('/revalidate')
  redirect('/revalidate')
}