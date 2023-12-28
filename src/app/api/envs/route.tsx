import 'server-only'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const host = process.env['PGSQL_HOST']
    const env = process.env['NODE_ENV']
    try {
        return Response.json({ environment: env, host: host })
    }
    catch (r) { console.error(r) }
}