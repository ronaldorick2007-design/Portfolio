export default function Graph({
    arr = [],
    connections=[],
    func,
    size = 30,
    gap = 6
}) {
    const step = size + gap;
    const n = arr.length;

    return <div className="relative p-0 border-2" style={{
            width: `${2*(n)*step}px`,
            height: `${2*(n)*step}px`,
        }}>
            {/* <div className="ml-5">{name}</div> */}

            <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
        >
            {connections.map(([x1, y1, x2, y2], i) => (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="black"
                    strokeWidth="2"
                />
            ))}
        </svg>

    {arr.map((value, i) => {
            if (value === null) return null;
            
            const [c,r] = func(i,n)
            return (
                <div
                    key={`${r}-${c}`}
                    className="box"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(${c * step}px, ${r * step}px)`,
                    }}
                >
                    {value}
                </div>
            );
        })}
</div>
}