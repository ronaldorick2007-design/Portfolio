export default function LinkedList({
    name,
    arr,
    indicate = {},
    size = 50,
    gap = 10
}) { 
    const step = size + gap;
    const n = arr.length

    return <div className="container border-2" style={{width : `${n*step}px`,height : `${size*2}px`, paddingTop : `${size/2}px`,paddingLeft : `${gap/2}px`}}>
        <div className="-mt-5">{name}</div>
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
                className={`box ${indicate.get(value) ? indicate.get(value) : "" }`}
                
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            >
                {value.toString()}
            </div>


            <svg width={gap} height={size} style={{overflow : "visible"}}>
                {value.prev && <line x1={-gap} y1={size/3} x2={0} y2={size/3} stroke="black" strokeWidth="2" />}
                
                {value.next && <line x1={size} y1={2*size/3} x2={size+gap} y2={2*size/3} stroke="black" strokeWidth="2" />}
            </svg>
            

        </div>
    ))}
    </div>;
}

