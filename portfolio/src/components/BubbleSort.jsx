import usePipeline from "../hooks/usePipeline_sort";
import bubbleSort from "../algorithms/Arrays/bubbleSort";
// import GridBuild from "./Grid";
import LinkedList from "../components/LinkedList";
import GridBuild from "../components/Grid";

export default function BubbleSort() {

    const {
        sus, 
        arr1,
        active,
        start,
        c,
        next,
        stop,
        match,
        running,
        pass,
        cut,
        hold
    } = usePipeline(bubbleSort,[5, 3, 8, 4,2]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div style={{ display: "flex",justifyContent:"center", gap: "10px" }}>
                <button onClick={start}>
                    {running ? "Pause" : "Play"}
                </button>

                <button onClick={next}>
                    Step
                </button>

                <button onClick={stop}>
                    Stop
                </button>
            </div>

            <div className="container">
                <GridBuild
                    arr={arr1}
                    active={active}
                    match={match}
                    pass={pass}
                    cut={cut}
                    hold={hold}
                    swap={c}
                />
            </div>
        </div>
    );
}