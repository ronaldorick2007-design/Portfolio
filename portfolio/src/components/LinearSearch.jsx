import usePipeline from "../hooks/usePipeline";
import linearSearch from "../algorithms/Arrays/linearSearch";
// import GridBuild from "./Grid";
import LinkedList from "./LinkedList";
import "../styles/Grid.css";
import "../styles/Item.css";
import GridBuild from "./Grid";
 
export default function LinearSearch({arr}) {

    const {
        active,
        start,
        next,
        stop,
        match,
        running,
        pass,
        cut
    } = usePipeline(linearSearch);

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
                <LinkedList
                    arr={arr}
                    active={active}
                    match={match}
                    pass={pass}
                    cut={cut}
                />
            </div>
        </div>
    );
}