import React from 'react'
import styles from './SearchBlock.module.scss'

export default function index({ searchInput, setSeatchInput }) {
  console.log()
  return (
    <div className={styles.root}>
      <svg
        className={styles.search}
        height="512"
        viewBox="0 0 512 512"
        width="512"
        xmlns="http://www.w3.org/2000/svg">
        <title />
        <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
      </svg>
      <input
        className={styles.searchInput}
        value={searchInput}
        onChange={e => setSeatchInput(e.currentTarget.value)}
        type="text"
        placeholder="Найти пиццу"
      />
      {searchInput && (
        <svg
          onClick={() => setSeatchInput('')}
          className={styles.clear}
          xmlns="http://www.w3.org/2000/svg">
          <polygon
            fill-rule="evenodd"
            points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
          />
        </svg>
      )}
    </div>
  )
}
