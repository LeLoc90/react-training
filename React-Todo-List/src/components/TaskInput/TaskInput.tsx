import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Task } from '../../@types/task.type'

interface TaskInputProps {
  addTask: React.Dispatch<React.SetStateAction<Task[]>>
  list: Task[]
  currentTask?: Task
}

const initialTask = {
  id: new Date().toISOString(),
  done: false,
  name: '',
  editing: false
}

export default function TaskInput(props: TaskInputProps) {
  const { addTask, list, currentTask } = props
  const [task, setTask] = useState<Task>(currentTask || initialTask)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => {
      return {
        ...prev,
        name: e.target.value
      }
    })
  }
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentTask) {
        handleEditedTask(currentTask.id)
      } else {
        handleAddTask()
      }
    }
    if (e.key === 'Escape' && currentTask) {
      addTask((prev) =>
        prev.map((item) =>
          item.id !== currentTask.id ? item : { ...currentTask, editing: false }
        )
      )
    }
  }

  const handleAddTask = () => {
    const duplicateTask = list.some((prevTask) => prevTask.name === task.name)
    if (!duplicateTask && task.name.trim() !== '') {
      addTask((prev) => [...prev, task])
    }
    const newTask = {
      id: new Date().toISOString(),
      done: false,
      name: '',
      editing: false
    }
    setTask(newTask)
  }

  const handleEditedTask = (id: string) => {
    if (task.name.trim() !== '') {
      addTask((prev) =>
        prev.map((item) =>
          item.id !== id ? { ...item } : { ...task, editing: false }
        )
      )
    }
  }

  return (
    <div className={styles.form}>
      <input
        type='text'
        value={task.name}
        onChange={(e) => handleOnChange(e)}
        onKeyDown={(e) => handleOnKeyDown(e)}
      />

      {currentTask ? (
        <button onClick={(e) => handleEditedTask(currentTask.id)}>✔️</button>
      ) : (
        <button onClick={handleAddTask}>➕</button>
      )}
    </div>
  )
}
