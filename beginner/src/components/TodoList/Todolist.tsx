import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
export default function Todolist() {
  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <TaskInput />
      <TaskList />
      <TaskList doneList />
    </div>
  )
}
