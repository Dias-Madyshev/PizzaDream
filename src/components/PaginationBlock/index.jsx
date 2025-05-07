import React from 'react'
import style from './PaginationBlock.module.scss'
import ReactPaginate from 'react-paginate'

export default function index({ setcurrentPage }) {
  return (
    <div className={style.root}>
      <ReactPaginate
        className={style.list}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => setcurrentPage(event.selected + 1  )}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
