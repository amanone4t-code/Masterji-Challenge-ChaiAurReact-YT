import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()

        if(!todo.trim()) return 

        addTodo({todo: todo.trim(), completed: false})
        setTodo("")
    }
    
    return (
        <form onSubmit={add} className="flex items-center gap-3 w-full">
            <input
                type="text"
                placeholder="Add a new task..."
                className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none py-2 px-1"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="text-xs font-semibold px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 rounded-lg transition-all active:scale-[0.98] shrink-0 cursor-pointer"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;


