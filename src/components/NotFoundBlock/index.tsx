import React from 'react'
import styles from './NotFoundBlock.module.scss'

const index = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожелению данная страница отсутсвует в нашем магазине</p>
    </div>
  )
}
export default index
