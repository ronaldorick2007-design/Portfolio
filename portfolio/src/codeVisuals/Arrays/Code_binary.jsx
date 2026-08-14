import "../../styles/Code.css";
import "../../styles/Grid.css";
import Window from "../../components/Window";
import useArray from "../../hooks/useArray";
import GridBuild from "../../components/Grid";
import binarySearch from "../../algorithms/Arrays/binarySearch";

function BinarySearch() {

    const {
            arr,
    
            active,
            match,
            swap,
            pass,
            hold,
            log,
            
            running,
            start,
            stop,
            next
        } = useArray(binarySearch,[1, 2, 3, 4, 5]);

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
                    arr={arr}
                    active={active}
                    match={match}
                    pass={pass}
                    hold={hold}
                />
            </div>
            <div>{log}</div>
        </div>
    );
}

export default function Code_binary(){
  const code = (
    <pre>
        <code>{`function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

const A = [1, 2, 3, 4, 5]; // Must be sorted
binarySearch(A, 2);`}</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>Binary Search</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <BinarySearch />
      </div>
      <div className="sidebar alignText">
        <h3>Sidebar</h3>
        <p>This is the code content inside code box.</p>
        <Window code={code}/>
      </div>
    </div>
  </div>
    );
}
