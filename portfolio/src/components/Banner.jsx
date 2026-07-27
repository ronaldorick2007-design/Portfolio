export default function Banner({
    matrix,
    size = 50,
    gap = 10
}) {
    const step = size + gap;

    return matrix.flatMap((row, r) =>
        row.map((value, c) => {
            if (value === null) return null;

            return (
                <div
                    key={`${r}-${c}`}
                    className="box"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(${c * step}px, ${r * step}px)`,
                    }}
                >
                    {value}
                </div>
            );
        })
    );
}