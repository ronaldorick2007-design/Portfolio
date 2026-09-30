export default function Graph({
    arr = [],
    matrix,
    size = 50,
    gap = 10
}) {
    const step = size + gap;
let connections = [
    [100, 100, 500, 400],
    [200, 300, 700, 200],
    [50, 600, 900, 800],
];
    let arr1 = Object.keys(arr);
    let n = arr1.length;
    matrix = Array.from(Array(20), () => Array(20).fill(null));
    let offset = n;
    for(let i = 1;i<=n;i++){
        let x = Math.round(8*Math.sin(i*2*Math.PI / n) + 10);
        let y = Math.round(8*Math.cos(i*2*Math.PI / n) + 10);
        matrix[y][x] = 1;
        // console.log(x, y);
    }

    function hello(N){
        let x = Math.round(8*Math.sin(N*2*Math.PI / n) + 10) * (step);
        let y = Math.round(8*Math.cos(N*2*Math.PI / n) + 10)* (step);
        return {x,y}
    }

    return <div className="relative p-0 border-2" style={{
            width: 1200,
            height: 1200,
        }}>

    {matrix.flatMap((row, r) =>
        row.map((value, c) => {
            if (value === null) return null;

            return (
                <div
                    key={`${r}-${c}`}
                    className="absolute bg-amber-300 grid items-center"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(${c * step}px, ${r * step}px)`,
                    }}
                >
                    {value}
                </div>
            );
        })
    )}

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


</div>
}