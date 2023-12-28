export const dynamic = 'force-dynamic'

import { Invoice } from '@/lib/definitions'
import { get_sql } from '@/lib/db.js'

async function getInvoiceData(request: Request) {
    const sql = await get_sql()
    const res = await sql <Invoice[]>`select * from invoices`;
    return res
}


export async function GET(request: Request) {
    const invoices = await getInvoiceData(request);
    return Response.json(invoices)
}