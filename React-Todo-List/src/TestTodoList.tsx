/* eslint-disable prettier/prettier */
import { useState, useCallback, useMemo } from 'react'

// Optimized TodoList component

// Use React.FC for better typing
export const TestTodoList: React.FC = () => {
  // Use useMemo to avoid parsing localStorage on every render
  const initialList = useMemo(() => {
    const storedList = localStorage.getItem('storedList')
    return storedList ? (JSON.parse(storedList) as string[]) : []
  }, [])

  const [showList, setShowList] = useState<boolean>(true)
  const [task, setTask] = useState<string>('')
  const [list, setList] = useState<string[]>(initialList)
  const [doneList, setDoneList] = useState<string[]>([])

  // useCallback to memoize handlers and avoid unnecessary re-renders
  const handleAdd = useCallback(() => {
    const trimmedTask = task.trim()
    if (!list.includes(trimmedTask) && trimmedTask !== '') {
      const newList = [...list, trimmedTask]
      setList(newList)
      localStorage.setItem('storedList', JSON.stringify(newList)) // store newList, not old list
      setTask('')
    }
  }, [task, list])

  const handleDelete = useCallback(
    (listItem: string) => {
      const newList = list.filter((item) => listItem !== item)
      const newDoneList = doneList.filter((item) => listItem !== item)
      setDoneList(newDoneList)
      setList(newList)
      localStorage.setItem('storedList', JSON.stringify(newList))
    },
    [list, doneList]
  )

  const handleDoneTask = useCallback(
    (item: string) => {
      if (!doneList.includes(item)) {
        setDoneList((prev) => [...prev, item])
      } else {
        setDoneList((prev) => prev.filter((done) => done !== item))
      }
    },
    [doneList]
  )

  // Use React.Fragment instead of nested <ul> for better semantics
  return (
    <div className='container'>
      <input
        type='text'
        className='input'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button
        style={{ margin: 40 }}
        onClick={() => setShowList((prev) => !prev)}
      >
        Show List
      </button>

      {showList && (
        <ul className='list'>
          {list.map((item, index) => (
            // Use <li> as root element, not <ul>
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                listStyle: 'none'
              }}
            >
              <input
                id={`${index}-${item}`}
                type='checkbox'
                checked={doneList.includes(item)}
                onChange={() => handleDoneTask(item)}
              />
              <span
                style={{
                  margin: 8,
                  textDecoration: doneList.includes(item)
                    ? 'line-through'
                    : 'none'
                }}
              >
                {item}
              </span>
              <button
                style={{ marginLeft: 12 }}
                onClick={() => handleDelete(item)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>Total tasks: {list.length}</p>
    </div>
  )
}

// Optimizations:
// - useMemo for initial list from localStorage
// - useCallback for handlers to avoid unnecessary re-renders
// - Store newList in localStorage after add/delete
// - Use <li> instead of nested <ul> for each item
// - Use checked prop for checkbox to reflect done state
