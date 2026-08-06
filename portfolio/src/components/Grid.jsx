export default function GridBuild({
    arr,
    c = [],
    active = [],
    match = [],
    pass = [],
    hold = [],
    size = 50, // Added size parameter (in pixels)
    gap = 10   // Added gap parameter to calculate movement smoothly
}) {

    // Total distance to translate each box (box width + gap)
    const step = size + gap;

    function getBoxStatus(i, { active, match, pass, hold,c }) {
        // Priority order: match > active > hold > pass
        if (match.includes(i)) return "match";
        if (active.includes(i)) return "active";
        if (hold.includes(i)) return "hold";
        if (pass.includes(i)) return "pass";
        if (c.includes(i)) return "c";
        return "";
    }

    return arr.map((value, i) => (
        <div key={i} className="box-wrapper">
            <div
                className={`box ${getBoxStatus(i, { active, match, pass, hold,c })}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: `translateX(${i * step}px)`,
                    transition: "transform 0.25s ease"
                }}
            >
                {value}
            </div>
        </div>
    ));
}