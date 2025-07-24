import { Task } from '../../@types/task.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  isDoneList?: boolean
  list: Task[]
  addToOtherList: React.Dispatch<React.SetStateAction<Task[]>>
  removeFromThisList: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function TaskList({
  isDoneList = false,
  list,
  addToOtherList,
  removeFromThisList
}: TaskListProps) {
  const toggleDone = (id: string) => {
    const currentTask = list.find((task) => task.id === id)
    if (currentTask) {
      removeFromThisList((prev) => prev.filter((task) => task.id !== id))
      addToOtherList((prev) => [...prev, currentTask])
    }
  }

  const handlRemoveTask = (id: string) => {
    removeFromThisList((prev) => prev.filter((task) => task.id !== id))
  }

  if (list.length === 0) return null

  return (
    <div>
      <h2>{isDoneList ? 'Done' : 'Tasks'}</h2>
      {list.map((task) => (
        <div className={styles.taskRow} key={task.id}>
          <input
            type='checkbox'
            checked={isDoneList}
            onChange={() => toggleDone(task.id)}
          />
          <span
            className={`${styles.taskName} ${isDoneList ? styles.taskDone : ''}`}
          >
            {task.name}
          </span>
          <div className={styles.taskActions}>
            <button className={styles.taskAction} aria-label='Edit Task'>
              ✏️
            </button>
            <button
              className={styles.taskAction}
              aria-label='Delete Task'
              onClick={() => handlRemoveTask(task.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
