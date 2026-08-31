import "../../styles/Code.css";
import "../../styles/Grid.css";
import Window from "../../components/Window";
import useArray from "../../hooks/useArray";
import GridBuild from "../../components/Grid";
import selectionSort from "../../algorithms/Arrays/selectionSort";

import useNode from "../../hooks/useNode";
import LinkedList from "../../components/LinkedList";
import queue_basic from "../../algorithms/queue/queue_basic";

function QueueBasic() {

    const {
        arr,
        log,
        indicate,
        
        running,
        start,
        stop,
        next
    } = useNode(queue_basic);

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

                <LinkedList arr={arr} indicate={indicate}/>

            <div>{log}</div>
        </div>
    );
}
 
export default function Code_queue(){
  const code = (
    <pre>
        <code>{
`const sll = new SinglyLinkedList();

for(let i = 0; i < 5; i++){
            sll.add(i);
}

for(let i = 0; i < 5; i++){
            sll.pop();
}`}</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>Stack</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <QueueBasic />
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