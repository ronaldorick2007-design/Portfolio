export default function GridBuild({
    arr,
    c = [],
    swap = {},
    active = [],
    match = [],
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
        if (swap.i === index && swap.j !== undefined) return swap.j;
        if (swap.j === index && swap.i !== undefined) return swap.i;
        return index;
    };

    function getBoxStatus(i, isSwapping) {
        // Priority order: match > active > swap > hold > pass > c
        if (match.includes(i)) return "match";
        if (active.includes(i)) return "active";
        if (isSwapping) return "swap";
        if (hold.includes(i)) return "hold";
        if (pass.includes(i)) return "pass";
        if (c.includes(i)) return "c";
        return "";
    }

    return arr.map((value, i) => {
        const targetIndex = getTargetIndex(i);
        const isSwapping = targetIndex !== i;
        const statusClass = getBoxStatus(i, isSwapping);

        return (
            <div key={i} className="box-wrapper">
                <div
                    className={`box ${statusClass}`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translateX(${targetIndex * step}px)`,
                        // Smooth slide during Phase 1; instant snap ("none") during Phase 2 reset
                        transition: isSwapping ? "transform 0.25s ease" : "none"
                    }}
                >
                    {value}
                </div>
            </div>
        );
    });
}