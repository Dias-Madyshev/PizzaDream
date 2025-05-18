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

  const handlePageChange = (selectedItem: { selected: number }) => {
    onChangePage(selectedItem.selected + 1)
  }

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageChange}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
