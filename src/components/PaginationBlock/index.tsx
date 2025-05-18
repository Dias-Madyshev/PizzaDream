import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  totalItems,
  itemsPerPage,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage)

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={currentPage - 1}
    />
  )
}

export default Pagination
