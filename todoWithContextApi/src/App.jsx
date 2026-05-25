import { useState, useEffect } from "react"
import { TodoProvider } from "./context"
import { TodoForm, TodoItem } from "./components"

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-start items-center px-4 py-16 sm:py-24 overflow-hidden selection:bg-neutral-800 selection:text-neutral-100">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neutral-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-xl flex flex-col gap-8 z-10 fade-in">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              Workspace
            </span>
            <div className="flex justify-between items-baseline">
              <h1 className="text-3xl font-light tracking-tight text-neutral-200">
                Tasks<span className="font-semibold text-neutral-400">.</span>
              </h1>
              {totalCount > 0 && (
                <span className="text-xs font-mono text-neutral-500">
                  {completedCount}/{totalCount} Completed
                </span>
              )}
            </div>
            
            {/* Progress Bar */}
            {totalCount > 0 && (
              <div className="w-full h-[2px] bg-neutral-900 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-neutral-300 transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
          </div>

          {/* Todo Input Area */}
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-4 shadow-sm">
            <TodoForm />
          </div>

          {/* Filter Navigation */}
          <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
            <div className="flex gap-2">
              {["all", "active", "completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                    filter === tab
                      ? "bg-neutral-900 text-neutral-200 border border-neutral-800"
                      : "text-neutral-500 hover:text-neutral-300 border border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs text-neutral-600 font-mono">
              {filteredTodos.length} items shown
            </span>
          </div>

          {/* Todo List */}
          <div className="flex flex-col gap-3 min-h-[200px]">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-neutral-900 rounded-2xl text-center">
                <p className="text-sm text-neutral-500">
                  {filter === "all"
                    ? "No tasks yet. Create one above to get started."
                    : filter === "active"
                    ? "All caught up! No active tasks."
                    : "No completed tasks yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

