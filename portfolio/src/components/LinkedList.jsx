export default function LinkedList({
    arr,
    active = [],
    match = [],
    pass = [],
    hold = [],
    cut = [],
    swap,
    size = 50,
    gap = 10
}) {
    const step = size + gap;

    return <div className="container">
        {arr.map((value, i) => (
        <div
            key={i}
            className="box-wrapper"
            style={{
                transform: `translateX(${i * step}px)`,
                transition: "transform 0.25s ease"
            }}
        >
            <div
                className={`box ${value.status}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            >
                {value.toString()}
            </div>


            <svg width={gap} height={size} style={{overflow : "visible"}}>
                {value.prev && <line x1={-gap} y1={size/3} x2={0} y2={size/3} stroke="black" stroke-width="2" />}
                
                {value.next && <line x1={size} y1={2*size/3} x2={size+gap} y2={2*size/3} stroke="black" stroke-width="2" />}
            </svg>
            

        </div>
    ))}
    </div>;
}

{/* <div
                className={`box ${value.status}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            >
                {value.toString()}
            </div> */}