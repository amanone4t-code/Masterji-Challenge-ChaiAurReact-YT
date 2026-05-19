import { useState } from "react"


function App() {
  const [color, setColor] = useState("black")

  const colors = [
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "White", value: "white" },
    { name: "Black", value: "black" },
  ]

  return (
    <div className="w-full h-screen duration-300 ease-in-out flex flex-col items-center justify-center" style={{ backgroundColor: color }}>
      <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border border-gray-200/50">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Background Changer</h1>
        <p className="text-gray-600 text-center mb-6">Current: <span className="font-semibold capitalize text-gray-800">{color}</span></p>

        <div className="flex flex-wrap justify-center gap-3">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 border-2 border-gray-300 hover:border-gray-400 ${c.value === 'white' ? 'text-gray-800' : 'text-white'}`}
              style={{ backgroundColor: c.value }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
