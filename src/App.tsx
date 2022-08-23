import './App.scss'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

import Navbar from './components/Navbar'
import { repos } from './services/repo'

export default function App() {
  const [chartFilter, setChartFilter] = useState<SalesFilter>()
  const [category, setCategory] = useState<string>()
  const [product, setProduct] = useState<string>()
  const [brand, setBrand] = useState<string>()
  const [data, setData] = useState<Sale[]>()
  const [loading, setLoading] = useState(true)

  const filteredData = useMemo(() => {
    const res: number[] = new Array(12).fill(0)

    data?.forEach(v => {
      res[new Date(+v.date).getMonth()] += v.value
    })

    return res
  }, [data])

  const options = useMemo(
    () => ({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Sales By Month for:',
      },
      series: [
        {
          name: 'Sales',
          data: filteredData,
        },
      ],
      xAxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        crosshair: true,
        title: 'Months',
      },
      yAxis: {
        title: {
          text: 'Sales',
        },
      },
    }),
    [filteredData],
  )

  const getSalesFilter = useCallback(async () => {
    setLoading(true)
    const categories = await repos.api.getCategories()
    const products = await repos.api.getProducts()
    const brands = await repos.api.getBrands()

    setChartFilter({
      categories,
      products,
      brands,
    })

    setLoading(false)
  }, [])

  const getSales = useCallback(async () => {
    if (!loading) {
      const sales = await repos.api.getSales({
        brand,
        category,
        product,
      })

      setData(sales)
    }
  }, [brand, category, product, loading])

  useLayoutEffect(() => {
    getSalesFilter()
  }, [getSalesFilter])

  useLayoutEffect(() => {
    getSales()
  }, [getSales])

  return (
    <div className="app">
      <Navbar pageTitle="Username" title="Sales Report" />
      <div className="filters">
        <label>
          <span>Category</span>
          <select
            name="category"
            onChange={event => setCategory(event.target.value)}
          >
            <option value="" selected />
            {chartFilter?.categories.map(v => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Product</span>
          <select
            name="product"
            onChange={event => setProduct(event.target.value)}
          >
            <option value="" selected />
            {chartFilter?.products.map(v => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Brands</span>
          <select
            name="brands"
            onChange={event => setBrand(event.target.value)}
          >
            <option value="" selected />
            {chartFilter?.brands.map(v => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}
