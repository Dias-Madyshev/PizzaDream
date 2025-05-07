import React from 'react'

export default function Categories({ activeCategory, setActive }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => {
          return (
            <li
              onClick={() => setActive(index)}
              className={activeCategory === index ? 'active' : ''}
              key={index}>
              {el}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
