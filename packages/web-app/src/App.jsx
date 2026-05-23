import { Suspense, useEffect, useMemo, useState } from 'react'
import './App.css'
import { SearchInput } from './components/SearchInput'
import { ProductCard } from './components/ProductCard';
// import { debounce } from './util/debounce';
import { throttle } from './util/throttle';

function App() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('')

  const debouncedSetInput = useMemo(() => throttle(setInput, 100), [])

  const handleOnChange = (e) => {
    debouncedSetInput(e.target.value)
  }

  const productMemo = useMemo(() => {
    if (Array.isArray(products) && products.length > 0) {
      const term = input.trim().toLowerCase()
      const list = term
        ? products.filter((product) => product.name.toLowerCase().includes(term))
        : products
      return list.length > 0
        ? list.map((product) => (
          <ProductCard key={product.id} {...product} image={{ src: product.image, height: product.imageHeight, width: product.imageWidth }} />
        ))
        : "No matching products"
    }
    return "No products available"
  }, [products, input])

  useEffect(() => {
    fetch('http://localhost:5173/data/mock-data.json').then(async (res) => {
      try {
        const { products } = await res.json()
        setProducts(products)
      } catch (error) {
        console.error(error)
      }
    })
  }, [])

  return (
    <>
      <section id="center">
        <SearchInput value={input} onChangeCallback={handleOnChange} />
      </section>
      <Suspense fallback="Loading products...">
        <section style={{ width: '100%', height: '100%', maxHeight: '600px' }}>
          {productMemo}
        </section>
      </Suspense>
    </>
  )
}

export default App
