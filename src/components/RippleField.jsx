
import { useEffect, useRef, useState } from "react";

export default function RippleField({
  size = 8,
  gap = 12,
  color = "#d4d4d8",
  activeColor = "#ef4444",
  maxRadius = 7,
  speed = 120,
  touch = true,
  matrix,
  anchor = "top-left",
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const waveRef = useRef({ r: -1000, c: -1000, radius: 0 });

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [wave, setWave] = useState(waveRef.current);

  const step = Math.max(1, size + gap);

  const matrixRows = matrix
    ? (Array.isArray(matrix)
        ? matrix
        : matrix.trim().split(/\n/).filter((row) => row.trim())
      ).map((row) =>
        (Array.isArray(row)
          ? row
          : [...String(row).replace(/[\s,]/g, "")]
        ).map((value) => (Number(value) === 1 ? 1 : 0))
      )
    : null;

  const maskRows = matrixRows?.length ?? 0;
  const maskCols = Math.max(
    0,
    ...(matrixRows ?? []).map((row) => row.length)
  );

  const cols = matrixRows
    ? maskCols
    : Math.ceil(dimensions.width / step);

  const rows = matrixRows
    ? maskRows
    : Math.ceil(dimensions.height / step);

  useEffect(() => {
    if (!ref.current || matrixRows) return;

    const observer = new ResizeObserver(([entry]) => {
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [matrixRows]);

  function updateWave(next) {
    waveRef.current = next;
    setWave(next);
  }

  function handlePointerMove(event) {
    if (!touch) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const c = Math.floor((event.clientX - rect.left) / step);
    const r = Math.floor((event.clientY - rect.top) / step);

    if (r < 0 || c < 0 || r >= rows || c >= cols) return;

    const current = waveRef.current;
    if (current.r === r && current.c === c) return;

    updateWave({ r, c, radius: 0 });
  }

  useEffect(() => {
    if (touch || rows < 1 || cols < 1) return;

    updateWave({
      r: Math.floor(Math.random() * rows),
      c: Math.floor(Math.random() * cols),
      radius: 0,
    });
  }, [touch, rows, cols]);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = waveRef.current;

      if (current.radius >= maxRadius) {
        if (touch) {
          updateWave({ ...current, radius: 0 });
        } else {
          updateWave({
            r: Math.floor(Math.random() * Math.max(1, rows)),
            c: Math.floor(Math.random() * Math.max(1, cols)),
            radius: 0,
          });
        }
      } else {
        updateWave({ ...current, radius: current.radius + 1 });
      }
    }, Math.max(16, speed));

    return () => clearInterval(timer);
  }, [touch, rows, cols, maxRadius, speed]);

  const rowOffset =
    matrixRows && anchor.includes("bottom") && !matrixRows
      ? rows - maskRows
      : 0;

  return (
    <div
      ref={ref}
      onPointerMove={touch ? handlePointerMove : undefined}
      aria-hidden="true"
      className={`relative overflow-hidden ${
        touch ? "pointer-events-auto" : "pointer-events-none"
      } ${className}`}
      style={{
        width: matrixRows ? maskCols * step : "100%",
        height: matrixRows ? maskRows * step : "100%",
        ...style,
      }}
    >
      {cols > 0 &&
        Array.from({ length: rows * cols }, (_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;

          if (matrixRows && matrixRows[r]?.[c] !== 1) return null;

          const distance = Math.round(
            Math.hypot(c - wave.c, r - wave.r)
          );

          return (
            <span
              key={`${r}-${c}`}
              style={{
  position: "absolute",
  left: c * step,
  top: r * step,
  width: size,
  height: size,
  backgroundColor:
    distance === wave.radius ? activeColor : color,
  boxShadow:
    distance === wave.radius
      ? "2px 2px 0"
      : "none",
  transition: `background-color ${Math.min(
    speed,
    250
  )}ms ease, box-shadow ${Math.min(speed, 250)}ms ease`,
}}
            />
          );
        })}
    </div>
  );
}
