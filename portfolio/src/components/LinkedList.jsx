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
 
    function getBoxStatus(i, { active, match, pass, hold }) {
        // Priority order: match > active > hold > pass
        if (match.includes(i)) return "match";
        if (active.includes(i)) return "active";
        if (hold.includes(i)) return "hold";
        if (pass.includes(i)) return "pass";
        return "";
    }

    return arr.map((value, i) => (
        <div
            key={i}
            className="box-wrapper"
            style={{
                transform: `translateX(${i * step}px)`,
                transition: "transform 0.25s ease"
            }}
        >
            <div
                className={`box ${getBoxStatus(i, { active, match, pass, hold })}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            >
                {value}
            </div>

            {i !== arr.length && (
                <div
                    className={`line
                        ${active.includes(i) ? "active" : ""}
                        ${match.includes(i) ? "match" : ""}
                        ${pass.includes(i) ? "pass" : ""}
                        ${hold.includes(i) ? "hold" : ""}
                        ${cut.includes(i) ? "cut" : ""}
                    `}
                    style={{
                        width: `${size + gap}px`,
                    }}
                />
            )}
        </div>
    ));
}