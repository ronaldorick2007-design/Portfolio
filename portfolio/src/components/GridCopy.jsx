export default function GridBuild({
    name,
    arr,
    indicate={},
    swap = {},
    size = 50,
    gap = 10
}) { 
    const step = size + gap;
    const n = arr.length;

    // Calculates target index position if swapping
    const getTargetIndex = (index) => {
        if (!swap) return index;
        if (swap[index] !== undefined) return swap[index];
        return index;
    };

    return <div className="container border-2" style={{width : `${n!=0 ? n*step : 100}px`,height : `${size*2}`, paddingTop : `${size/2}px`,paddingLeft : `${gap/2}px`}}>
        <div className="-mt-5">{name}</div>
        {arr.map((value, i) => {
        const targetIndex = getTargetIndex(i);
        const label = indicate.get(i) && (targetIndex == i) ? indicate.get(i) : "" 

        return (
                <div key={i}
                    className={`box ${label}`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(${targetIndex * step - (label ? 6 : 0)}px,${label ? -6 : 0}px)`,
                        // Smooth slide during Phase 1; instant snap during Phase 2 reset
                        transition: (targetIndex !== i && swap) ? "transform 0.25s ease" : "none"
                    }}
                >
                    {value ? value.toString() : ""}
                </div>
        );
    })}</div>;
}