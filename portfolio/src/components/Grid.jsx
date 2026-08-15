export default function GridBuild({
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
    const step = size + gap;

    // Calculates target index position if swapping
    const getTargetIndex = (index) => {
        if (!swap) return index;
        if (swap[index] !== undefined) return swap[index];
        // if (swap.i === index && swap.j !== undefined) return swap.j;
        // if (swap.j === index && swap.i !== undefined) return swap.i;
        return index;
    };

    function getBoxStatus(i) {
        // Priority order: match > active > swap > hold > pass
        if (change.includes(i)) return "change";
        if (match.includes(i)) return "match";
        if (active.includes(i)) return "active";
        if (hold.includes(i)) return "hold";
        if (pass.includes(i)) return "pass";
        return "";
    }

    return arr.map((value, i) => {
        const targetIndex = getTargetIndex(i);

        return (
            <div key={i} className="box-wrapper">
                <div
                    className={`box ${getBoxStatus(i)}`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translateX(${targetIndex * step}px)`,
                        // Smooth slide during Phase 1; instant snap during Phase 2 reset
                        transition: (targetIndex !== i) ? "transform 0.25s ease" : "none"
                    }}
                >
                    {value}
                </div>
            </div>
        );
    });
}