import "../../styles/Code.css";
import Window from "../../components/Window";
import useArray from "../../hooks/useArray";
import GridBuild from "../../components/Grid";
import whileLoop from "../../algorithms/basics/whileLoop";

function WhileLoop() {
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
    } = useArray(whileLoop,[1, 2, 3, 4, 5]);

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

export default function Code_whileLoop(){
  const code = (
    <pre>
        <code>{`const arr = [1, 2, 3, 4, 5];
const n = arr.length;

let i = 0;
while(i < n){
    console.log(arr[i]);
    }`
    }</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>While Loop</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <WhileLoop />
      </div>
      <div className="sidebar alignText">
        <h3>Code Snippet</h3>
        <p>This is the code to iterate an array using while loop</p>
        <Window code={code}/>
      </div>
    </div>
  </div>
    );
}