import { useState } from "react"


function App() {
  const [color, setColor] = useState("black")

  return (
    <>
      <div className="w-full h-screen duration-200" style={{backgroundColor: color}}>
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-2xl bg-white px-3 py-2 rounded-3xl border-2 border-black">
            <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg border-2 border-black" 
            style={{backgroundColor: "red"}}
            onClick={() => setColor("red")}
            >Red</button>
            <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg border-2 border-black" 
            style={{backgroundColor: "green"}}
            onClick={() => setColor("green")}
            >Green</button>
            <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg border-2 border-black" 
            style={{backgroundColor: "Blue"}}
            onClick={() => setColor("Blue")}
            >Blue</button>
            <button className="outline-none px-4 py-1 rounded-full text-black shadow-lg border-2 border-black" 
            style={{backgroundColor: "White"}}
            onClick={() => setColor("White")}
            >White</button>
            <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg border-2 border-black" 
            style={{backgroundColor: "Black"}}
            onClick={() => setColor("Black")}
            >Black</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
