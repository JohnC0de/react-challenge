// Challenge: create a dot when the user clicks on the screen, add three buttons: one to clear all dots, one to undo the last dot, and one to redo the last undo

import { useState } from "react"

export default function App() {
  type Dot = {
    clientX: number
    clientY: number
  }
  type DotAttributes = {
    color: string
    size: number
  }
  const [dotsAttributes, setDotsAttributes] = useState<DotAttributes>({
    color: "#000",
    size: 5
  })
  const [dots, setDots] = useState<Dot[]>([])
  const [removedDots, setRemovedDots] = useState<Dot[]>([])

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = e
    setDots([...dots, { clientX, clientY }])
    setRemovedDots([])
  }

  function handleUndo() {
    if (dots.length === 0) return
    const newDots = [...dots]
    const lastDot = newDots.pop()
    setDots(newDots)
    setRemovedDots([...removedDots, lastDot!])
  }

  function handleRedo() {
    if (removedDots.length === 0) return
    const newRemovedDots = [...removedDots]
    const lastRemovedDot = newRemovedDots.pop()
    setRemovedDots(newRemovedDots)
    setDots([...dots, lastRemovedDot!])
  }

  function handleStyles(dot: Dot) {
    const { color, size } = dotsAttributes

    return {
      backgroundColor: color,
      width: size * 10 + "px",
      height: size * 10 + "px",
      left: dot.clientX - size * 5,
      top: dot.clientY - size * 5
    }
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div id="menu" className="flex gap-4 m-2">
        <button className="p-2 border rounded-xl bg-slate-800 text-white " onClick={() => setDots([])}>
          Clear
        </button>
        <button
          className="p-2 border rounded-xl bg-slate-800 text-white disabled:bg-slate-500"
          onClick={handleUndo}
          disabled={dots.length === 0}
        >
          Undo
        </button>
        <button
          className="p-2 border rounded-xl bg-slate-800 text-white disabled:bg-slate-500"
          onClick={handleRedo}
          disabled={removedDots.length === 0}
        >
          Redo
        </button>
        {/* Change dot size */}
        <div
          className="flex flex-col text-center items-center"
          defaultValue={5}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const size = e.target.value
            setDotsAttributes({ ...dotsAttributes, size: parseInt(size) })
            console.log(dotsAttributes)
          }}
        >
          <label htmlFor="dot-size">Dot Size:</label>
          <input type="range" min="1" max="10" />
        </div>
        {/* Change dot color */}
        <div
          className="flex text-center items-center"
          defaultValue={"#000"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const color = e.target.value
            setDotsAttributes({ ...dotsAttributes, color })
          }}
        >
          <label htmlFor="dot-color">Dot Color:</label>
          <input type="color" className="ml-2" />
        </div>
      </div>
      {/* Add a grid svg to the background of the canvas */}
      <div id="canvas" className="border m-2 flex flex-1 bg-[url('/bg.svg')]" onClick={handleClick}>
        {/* Create a random color dot */}
        {dots.map((dot, i) => (
          <div key={i} className={`absolute w-4 h-4 rounded-full bg-black `} style={handleStyles(dot)}></div>
        ))}
      </div>
    </div>
  )
}
