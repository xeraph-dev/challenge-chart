import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function (req: VercelRequest, res: VercelResponse) {
  const file = join(process.cwd(), '__mocks__', 'sales.json')
  const salesMock = JSON.parse(readFileSync(file, 'utf8')) as Sale[]

  const data = new Set(salesMock.map(v => v.brand))

  res.setHeader('Content-Type', 'application/json')
  res.send([...data].sort())
}
