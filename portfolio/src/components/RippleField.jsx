import useActiveIndices from "../hooks/useActiveIndices"

export default function RippleField({ rows = 30, cols = 70, size = 10, gap = 10 }) {
  const step = size + gap;
  const { activeIndices, handleMouseMove } = useActiveIndices(rows, cols);

  return (
    <div
      onMouseMove={(e) => handleMouseMove(e, step)}
      style={{
        position: "relative",
        width: `${cols * step}px`,
        height: `${rows * step}px`,
      }}
    >
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const key = `${r}-${c}`;
          const isActive = activeIndices.has(key);

          return (
            <div
              key={key}
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                transform: `translate(${c * step}px, ${r * step}px) ${
                  isActive ? "scale(1)" : "scale(1)"
                }`,
                backgroundColor: isActive ? "#ff0055" : "#ffb6c1",
                borderRadius: "6px",
                // transition: "all 0.15s ease",
              }}
            />
          );
        })
      )}
    </div>
  );
}