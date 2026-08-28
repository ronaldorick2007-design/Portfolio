import "../../styles/Code.css";
import Window from "../../components/Window";
import useArray from "../../hooks/useArray copy";
import GridBuild from "../../components/Grid";
import palindrome from "../../algorithms/Miscellanous/palindrome";

function Palindrome() {

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
        } = useArray(palindrome);

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

                <GridBuild
                    arr={arr}
                    active={active}
                    match={match}
                    pass={pass}
                    hold={hold}
                />
            <div>{log}</div>
        </div>
    );
}

export default function Code_palindrome(){
  const code = (
    <pre>
        <code>{`function linearSearch(arr, target) {
    let N = arr.length;
    for (let i = 0; i < N; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1; // Moved outside the loop
}

const A = [1, 2, 3, 4, 5];
linearSearch(A, 4);`}</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>Palindrome</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <Palindrome />
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