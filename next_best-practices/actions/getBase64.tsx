import { getPlaiceholder } from 'plaiceholder'

export default async function getBase64(url: string) {
  try {
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Failed to fetch image')

    const buffer = await res.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
