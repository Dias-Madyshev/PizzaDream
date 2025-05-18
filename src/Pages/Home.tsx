import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Sort, { sortList, ListType } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlok'
import Skeleton from '../components/PizzaBlok/Skeleton'
import Pagination from '../components/PaginationBlock'

import { setCurrentPage, setFilters } from '../redux/filtersSlice'
import { fetchPizzas } from '../redux/pizzaSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, PizzaItem } from '../@types/types'
import { AppDispatch } from '../redux/store'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { items, status, totalCount } = useSelector((state: RootState) => state.pizzas)
  const { categoryId, sortFilter, currentPage, search } = useSelector(
    (state: RootState) => state.filters,
  )

  const itemsPerPage = 8

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sortFilter.sortProperty.replace('-', '')
    const order = sortFilter.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? String(categoryId) : ''
    const searchValue = search || ''

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search: searchValue,
        page: String(currentPage),
        limit: String(itemsPerPage),
      }),
    )
  }

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortFilter.sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortFilter.sortProperty, currentPage])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find((obj: ListType) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          categoryId: String(categoryId),
          currentPage: String(currentPage),
          sortFilter: sort || sortList[0],
        }),
      )
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sortFilter.sortProperty, search, currentPage])

  const pizzas = items.map((obj: PizzaItem) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]}</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}

export default Home
