import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlok/index'
import Skeleton from '../components/PizzaBlok/Skeleton'
import PaginationBlock from '../components/PaginationBlock'

export default function Home({ searchInput }) {
  const [items, setItems] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const [activeCategory, setActiveCategory] = React.useState(0)
  const [currentPage, setcurrentPage] = React.useState(1)
  const [activeSort, setActiveSort] = React.useState({
    name: 'популярности (DESC)',
    sort: 'rating',
  })

  const pizzas = items
    .filter(el => el.title.toLowerCase().includes(searchInput.toLowerCase()))
    .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const CategoryId = activeCategory > 0 ? `&category=${activeCategory}` : ''
  const sort = activeSort.sort.replace('-', '')
  const orderBy = activeSort.sort.includes('-') ? 'desc' : 'asc'

  React.useEffect(() => {
    setLoading(true)
    fetch(
      `https://681605f032debfe95dbd2aab.mockapi.io/items?page=${currentPage}&limit=8&${CategoryId}&sortBy=${sort}&order=${orderBy}`,
    )
      .then(response => response.json())
      .then(data => {
        setItems(data)
        setLoading(false)
      })
  }, [activeCategory, activeSort, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} setActive={id => setActiveCategory(id)} />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <PaginationBlock setcurrentPage={number => setcurrentPage(number)} />
    </div>
  )
}
