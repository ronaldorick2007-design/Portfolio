export default function TreeBuild({
    arr,
    active = [],
    match = [],
    pass = [],
    hold = [],
    size = 50,
    gap = 30
}) {
    const span = Math.floor(Math.log2(arr.length)) + 1;
    const cols = 2 ** span - 1;
    const step = size + gap;

    function findNode(i) {
        const I = i + 1;
        const row = Math.floor(Math.log2(I));

        const no = 2 ** row;
        const half = no * 2;
        const col = Math.floor(cols / half);
        const cross = 2 ** (span - row);

        const index = I % no;
        const c = col + index * cross;

        return [row, c];
    }

    function getBoxStatus(i, { active, match, pass, hold }) {
        // Priority order: match > active > hold > pass
        if (match.includes(i)) return "match";
        if (active.includes(i)) return "active";
        if (hold.includes(i)) return "hold";
        if (pass.includes(i)) return "pass";
        return "";
    }

    const lines = [];

    for (let i = 0; i < arr.length; i++) {
        const [r1, c1] = findNode(i);

        const x1 = c1 * step + size / 2;
        const y1 = r1 * step + size / 2;

        for (const child of [2 * i + 1, 2 * i + 2]) {
            if (child >= arr.length) continue;
            if(arr[child]==null) continue;

            const [r2, c2] = findNode(child);

            const x2 = c2 * step + size / 2;
            const y2 = r2 * step + size / 2;

            const dx = x2 - x1;
            const dy = y2 - y1;

            lines.push({
                x: x1,
                y: y1,
                length: Math.hypot(dx, dy),
                angle: Math.atan2(dy, dx),
            });
        }
    }

    return (
        <div className="tree-container">
            {lines.map((line, i) => (
                <div
                    key={i}
                    className="tree-line"
                    style={{
                        width: `${line.length}px`,
                        transform: `translate(${line.x}px, ${line.y}px) rotate(${line.angle}rad)`
                    }}
                />
            ))}

            {arr.map((value, i) => {
                if(value === null) return null;
                const [row, col] = findNode(i);
                return (
                    <div
                        key={i}
                        className={`box ${getBoxStatus(i, { active, match, pass, hold })}`}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `translate(${col * step}px, ${row * step}px)`
                        }}
                    >
                        {value}
                    </div>
                );
            })}
        </div>
    );
}