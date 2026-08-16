import "../../styles/Code.css";
import "../../styles/Grid.css";
import Window from "../../components/Window";
import useArray from "../../hooks/useArray";
import GridBuild from "../../components/Grid";
import selectionSort from "../../algorithms/Arrays/selectionSort";


// import "../styles/Code.css"
// import Window from "../components/Window";
// import BubbleSort from "../visuals/BubbleSort";

  
function SelectionSort() {

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
    } = useArray(selectionSort,[5, 3, 8, 4, 2]);

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
                    swap={swap}
                    pass={pass}
                    hold={hold}
                />
            </div>
            <div>{log}</div>
        </div>
    );
}
 
export default function Code_selectionSort(){
  const code = (
    <pre>
        <code>{`function selectionSort(arr) {
    let N = arr.length;

    for (let i = 0; i < N - 1; i++) {
        let min = i;

        for (let j = i + 1; j < N; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    return arr;
}


const A = [1, 4, 2, 5, 3];
selectionSort(A);`}</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>Selection Sort</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        {/* <LinearSearch arr={[1,3,5,2,3]}/> */}
        <SelectionSort />
        {/* <TreeBuild arr={[0,1,2,3,4,5,6]} size={30}/> */}
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