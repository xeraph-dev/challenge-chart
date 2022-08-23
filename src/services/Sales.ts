export interface ApiRepository {
  getBrands: () => Promise<string[]>
  getCategories: () => Promise<string[]>
  getProducts: () => Promise<string[]>
  getSales: (filter: SalesFilterOptions) => Promise<Sale[]>
}

export const apiRepository: ApiRepository = {
  async getBrands() {
    return fetch(`/api/brands`).then(res => res.json())
  },
  async getCategories() {
    return fetch(`/api/categories`).then(res => res.json())
  },
  async getProducts() {
    return fetch(`/api/products`).then(res => res.json())
  },
  async getSales(filter) {
    let url = `/api/sales?`
    const query = []

    if (filter.brand) query.push(`brand=${filter.brand}`)
    if (filter.product) query.push(`product=${filter.product}`)
    if (filter.category) query.push(`category=${filter.category}`)

    url += query.join('&')

    return fetch(url).then(res => res.json())
  },
}
