import React from 'react'
import { Task } from '../../@types/task.type'
import styles from './taskList.module.scss'
import TaskInput from '../TaskInput'

interface TaskListProps {
  isDoneList?: boolean
  list: Task[]
  addToOtherList: React.Dispatch<React.SetStateAction<Task[]>>
  handleFromThisList: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function TaskList({
  isDoneList = false,
  list,
  addToOtherList,
  handleFromThisList
}: TaskListProps) {
  const toggleDone = (id: string) => {
    const currentTask = list.find((task) => task.id === id)
    if (currentTask) {
      handleFromThisList((prev) => prev.filter((task) => task.id !== id))
      addToOtherList((prev) => [...prev, { ...currentTask, editing: false }])
    }
  }

  const handlRemoveTask = (id: string) => {
    handleFromThisList((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleEditing = (id: string) => {
    handleFromThisList((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, editing: !task.editing }
          : { ...task, editing: false }
      )
    )
  }

  if (list.length === 0) return null

  return (
    <>
      <h2>{isDoneList ? 'Done' : 'Tasks'}</h2>
      {list.map((task) => (
        <div className={styles.taskRow} key={task.id}>
          <input
            type='checkbox'
            checked={isDoneList}
            onChange={() => toggleDone(task.id)}
          />
          <div className={styles.taskName}>
            {!task.editing ? (
              <span
                className={`${styles.taskName} ${isDoneList ? styles.taskDone : ''}`}
              >
                {task.name}
              </span>
            ) : (
              <TaskInput
                addTask={handleFromThisList}
                list={list}
                currentTask={task}
              />
            )}
          </div>

          <div className={styles.taskActions}>
            {!isDoneList && (
              <button
                className={styles.taskAction}
                aria-label='Edit Task'
                onClick={() => toggleEditing(task.id)}
              >
                ✏️
              </button>
            )}

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
    </>
  )
}
