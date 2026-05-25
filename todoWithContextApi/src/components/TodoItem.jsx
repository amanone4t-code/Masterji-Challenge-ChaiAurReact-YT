import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo();

  const editTodo = () => {
    if (!todoMsg.trim()) return;
    updateTodo(todo.id, {...todo, todo: todoMsg.trim()})
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editTodo();
    }
  }

  return (
      <div
          className={`flex items-center justify-between border rounded-xl px-4 py-3.5 gap-x-4 transition-all duration-200 ${
              todo.completed 
                ? "border-neutral-900/60 bg-neutral-950/40 text-neutral-500" 
                : "border-neutral-900 bg-neutral-900/20 hover:border-neutral-800 text-neutral-200"
          }`}
      >
          <div className="flex items-center gap-3 w-full min-w-0">
              <input
                  type="checkbox"
                  className="w-4 h-4 accent-neutral-100 border border-neutral-700 bg-neutral-900 rounded cursor-pointer transition-all shrink-0"
                  checked={todo.completed}
                  onChange={toggleCompleted}
              />
              <input
                  type="text"
                  className={`w-full bg-transparent text-sm outline-none transition-all ${
                      isTodoEditable 
                        ? "border-b border-neutral-700 px-1 text-neutral-100" 
                        : "border-transparent text-neutral-300"
                  } ${todo.completed ? "line-through text-neutral-600 decoration-neutral-800" : ""}`}
                  value={todoMsg}
                  onChange={(e) => setTodoMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  readOnly={!isTodoEditable}
              />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
              {/* Edit, Save Button */}
              <button
                  className="inline-flex w-7 h-7 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-neutral-900 justify-center items-center transition-all disabled:opacity-30 cursor-pointer"
                  onClick={() => {
                      if (todo.completed) return;

                      if (isTodoEditable) {
                          editTodo();
                      } else setIsTodoEditable((prev) => !prev);
                  }}
                  disabled={todo.completed}
                  title={isTodoEditable ? "Save" : "Edit"}
              >
                  {isTodoEditable ? (
                      /* Save icon */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-200">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                  ) : (
                      /* Edit icon */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.013a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                  )}
              </button>
              
              {/* Delete Todo Button */}
              <button
                  className="inline-flex w-7 h-7 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-neutral-900 justify-center items-center transition-all cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete"
              >
                  {/* Close / Delete icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-500 hover:text-neutral-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
              </button>
          </div>
      </div>
  );
}

export default TodoItem;

