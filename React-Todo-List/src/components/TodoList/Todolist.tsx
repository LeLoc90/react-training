import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Task } from '../../@types/task.type'
export default function Todolist() {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [doneList, setDoneList] = useState<Task[]>([])
  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <TaskInput addTask={setTaskList} list={[...taskList, ...doneList]} />
      <TaskList
        list={taskList}
        handleFromThisList={setTaskList}
        addToOtherList={setDoneList}
      />
      <TaskList
        list={doneList}
        handleFromThisList={setDoneList}
        addToOtherList={setTaskList}
        isDoneList
      />
    </div>
  )
}
