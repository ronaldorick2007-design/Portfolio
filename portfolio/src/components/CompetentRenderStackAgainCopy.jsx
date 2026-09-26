import { useState, useRef } from 'react';
import { useComponentRegistry } from '../hooks/useComponentRegistryStackAgain';

export default function CompetentRenderStack({generator}) {
  const { refs,
          render,
          next,
          log,
          start,
          stop,
          running} = useComponentRegistry(generator);  

const [x, setX] = useState(0);
const [y, setY] = useState(0);
const [scale, setScale] = useState(1);
const [dragging, setDragging] = useState(false);
const [startX, setStartX] = useState(0);
const [startY, setStartY] = useState(0);

function handleMouseDown(e) {
  setDragging(true);
  setStartX(e.clientX - x);
  setStartY(e.clientY - y);
}

function handleMouseMove(e) {
  if (!dragging) return;
  setX(e.clientX - startX);
  setY(e.clientY - startY);
}

function handleMouseUp() {
  setDragging(false);
}

function handleWheel(e) {
  e.preventDefault();
  if (e.deltaY < 0) {
    setScale(Math.min(1.5, scale + 0.1));
  } else {
    setScale(Math.max(0.5, scale - 0.1));
  }
}

return (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <button onClick={start}>{running ? "Pause" : "Play"}</button>
      <button onClick={next}>
                      Step
                  </button>
  
                  <button onClick={stop}>
                      Stop
                  </button>
    </div>
    <div className='m-auto text-2xl'>{log}</div>

    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      style={{
        width: "800px",
        height: "600px",
        border: "1px solid #ccc",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
        }}
      >
        {render()}
      </div>
    </div>
  </div>
);
}