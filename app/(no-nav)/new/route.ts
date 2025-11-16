import { customAlphabet } from 'nanoid'
import { getShorten } from '@/lib/utils'

export const dynamic = 'auto'
export const dynamicParams = true
export const runtime = 'edge'


export async function GET(): Promise<Response> {
    return new Response(null, {
        status: 307, // Use 308 for a permanent redirect, 307 for a temporary redirect
        headers: {
            Location: `/new/${getShorten()}`,
            'Cache-Control': 'no-store, max-age=0',
        },
    })
}