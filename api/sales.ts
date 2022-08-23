import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function (req: VercelRequest, res: VercelResponse) {
  const file = join(process.cwd(), '__mocks__', 'sales.json')
  const salesMock = JSON.parse(readFileSync(file, 'utf8')) as Sale[]

  const query = req.query as SalesFilterOptions

  const data = salesMock.filter(
    v =>
      (!query.brand || query.brand === v.brand) &&
      (!query.category || query.category === v.category) &&
      (!query.product || query.product === v.product),
  )

  res.setHeader('Content-Type', 'application/json')
  res.send(data)
}
