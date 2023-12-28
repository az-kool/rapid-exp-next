export const dynamic = 'force-dynamic'

import { Invoice } from '@/lib/definitions'
import sql from '@/lib/db.js'

async function getInvoiceData(request: Request) {
  const res = await sql<Invoice[]>`select * from invoices`;
  return res
}


export async function GET(request: Request) {
  const invoices = await getInvoiceData(request);
  return Response.json(invoices)
}