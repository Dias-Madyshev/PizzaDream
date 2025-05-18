import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../redux/filtersSlice'
import { RootState } from '../@types/types'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector((state: RootState) => state.filters.categoryId)

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
