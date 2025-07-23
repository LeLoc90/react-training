import styles from './taskList.module.scss'
export default function TaskList() {
  return (
    <div>
      <h2>Tasks</h2>
      <div className={styles.taskRow}>
        <input type='checkbox' />
        <span className={styles.taskName}>Gym</span>
        <div className={styles.taskActions}>
          <button className={styles.taskAction}>✏️</button>
          <button className={styles.taskAction}>🗑️</button>
        </div>
      </div>
    </div>
  )
}
