import styles from './taskInput.module.scss'
export default function TaskInput() {
  return (
    <form className={styles.form}>
      <input type='text' />
      <button type='submit'>➕</button>
    </form>
  )
}
