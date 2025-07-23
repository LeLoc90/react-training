import styles from './taskList.module.scss'

interface TaskListProps {
  doneList?: boolean
}

export default function TaskList(props: TaskListProps) {
  return (
    <div>
      <h2>{props.doneList ? 'Done' : 'Tasks'}</h2>
      <div className={styles.taskRow}>
        <input type='checkbox' />
        <span className={`${styles.taskName}`}>Gym</span>
        <div className={styles.taskActions}>
          <button className={styles.taskAction}>✏️</button>
          <button className={styles.taskAction}>🗑️</button>
        </div>
      </div>

      <div className={styles.taskRow}>
        <input type='checkbox' />
        <span className={`${styles.taskName} ${styles.taskDone}`}>
          Read Book
        </span>
        <div className={styles.taskActions}>
          <button className={styles.taskAction}>✏️</button>
          <button className={styles.taskAction}>🗑️</button>
        </div>
      </div>
    </div>
  )
}
