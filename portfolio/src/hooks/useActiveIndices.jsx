import { useState, useEffect } from "react";

export default function useActiveIndices(rows, cols, maxRadius = 9, speed = 100) {
  const [center, setCenter] = useState({ r: 0, c: 0 });
  const [radius, setRadius] = useState(0);

  // Ripple timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setRadius((prev) => (prev >= maxRadius ? 0 : prev + 1));
    }, speed);

    return () => clearInterval(timer);
  }, [maxRadius, speed]);

  // Compute active coordinates matching current radius distance
  const activeIndices = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = Math.round(Math.hypot(c - center.c, r - center.r));
      if (dist === radius) {
        activeIndices.add(`${r}-${c}`);
      }
    }
  }

  // Mouse move handler to restart ripple at cursor
  const handleMouseMove = (e, step) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const c = Math.floor((e.clientX - rect.left) / step);
    const r = Math.floor((e.clientY - rect.top) / step);

    setCenter({ r, c });
    setRadius(0);
  };

  return { activeIndices, handleMouseMove };
}