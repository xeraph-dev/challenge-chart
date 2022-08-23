interface SalesFilter {
  brands: string[]
  categories: string[]
  products: string[]
}

interface SalesFilterOptions {
  brand?: string
  category?: string
  product?: string
}

interface Sale {
  brand: string
  category: string
  date: string
  id: number
  product: string
  value: number
}
