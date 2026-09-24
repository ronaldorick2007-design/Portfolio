export default function GridBuild({
    name,
    arr,
    swap = {},
    active = [],
    match = [],
    change = [],
    pass = [],
    hold = [],
    size = 50,
    gap = 10
}) { 
    
    return(
        <div className="relative gap-2 border-2 p-2">
            {arr.map((value, i) => {
                return(
                    <div key={i} className="absolute h-10 w-10 bg-blue-500 text-center" style={{transform: `translateX(${i * 60}px)`}}>
                        {value ? value.toString() : ""}
                    </div>
                )
            })}        
        </div>
    )
}