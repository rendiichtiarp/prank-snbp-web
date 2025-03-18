import React from 'react'
import Rejected from './components/Rejected'
import styles from './page.module.css'

export default function page() {
  return (
    <div className={styles.container}>
      <Rejected/>
    </div>
  )
}
