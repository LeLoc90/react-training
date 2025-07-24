import { Task } from '../../@types/task.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  isDoneList?: boolean
  list: Task[]
  addToOtherList: React.Dispatch<React.SetStateAction<Task[]>>
  removeFromThisList: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function TaskList(props: TaskListProps) {
  const { isDoneList, list, addToOtherList, removeFromThisList } = props

  const toggleDone = (id: string) => {
    const currentTask = list.find((task) => task.id === id)
    removeFromThisList(list.filter((task) => task.id !== id))
    if (currentTask) {
      addToOtherList((prev) => [...prev, currentTask])
    }
  }

  return (
    <>
      {list.length > 0 && (
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
                <button className={styles.taskAction}>✏️</button>
                <button className={styles.taskAction}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
