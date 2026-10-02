export default function HashMap({
    arr=[],
    name,
    indicate={},
    size = 50,
    gap = 10
}) { 
    const step = size + gap;
    const n = arr.length;
    for (let index = 0; index < arr.length; index++) {
        let [key,value] = arr[index]
        
    }
    
    return <div className="container border-2" style={{width : `${n!=0 ? n*step : 100}px`,height : `${size*3}px`, paddingTop : `${size/2}px`,paddingLeft : `${gap/2}px`}}>
        <div className="-mt-5">{name}</div>
        {
        arr.map(([key, value], i) => (
        //  arr.map((value,i)=> (
            <div key={i} className="box-wrapper">
                <div
                    className={`box ${indicate.get(key) ? indicate.get(key) : "" }`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translateX(${i * step}px)`,
                    }}
                >
                    {key}
                </div>
                <div
                    className={`box ${indicate.get(key) ? indicate.get(key) : "" }`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(${i * step}px, ${1 * step}px)`,
                    }}
                >
                    {value}
                </div>

                <svg width={gap} height={size} style={{overflow : "visible"}}>
                    <line x1={i*step + size/2} y1={size} x2={i*step + size/2} y2={step} stroke="black" stroke-width="2" />
                </svg>
            </div>
        )
    )}</div>;
}