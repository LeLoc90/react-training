import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Task } from '../../@types/task.type'

interface TaskInputProps {
  addTask: React.Dispatch<React.SetStateAction<Task[]>>
  list: Task[]
}

const initialTask = {
  id: new Date().toISOString(),
  done: false,
  name: ''
}

export default function TaskInput(props: TaskInputProps) {
  const { addTask, list } = props
  const [task, setTask] = useState<Task>(initialTask)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => {
      return {
        ...prev,
        name: e.target.value
      }
    })
  }

  const handleAddTask = () => {
    const duplicateTask = list.some((prevTask) => prevTask.name === task.name)
    if (!duplicateTask && task.name.trim() !== '') {
      addTask((prev) => [...prev, task])
    }
    const newTask = {
      id: new Date().toISOString(),
      done: false,
      name: ''
    }
    setTask(newTask)
  }

  return (
    <div className={styles.form}>
      <input
        type='text'
        value={task.name}
        onChange={(e) => handleOnChange(e)}
      />
      <button onClick={handleAddTask}>➕</button>
    </div>
  )
}
