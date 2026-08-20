import "../../styles/Code.css";
import "../../styles/Grid.css";
import Window from "../../components/Window";
import useArray from "../../hooks/useArray";
import GridBuild from "../../components/Grid";
import selectionSort from "../../algorithms/Arrays/selectionSort";

import useNode from "../../hooks/useNode";
import LinkedList from "../../components/LinkedList";
import dll_traversal from "../../algorithms/linked_list/dll_traversal";

function TraversalDll() {

    const {
        arr,
        log,
        
        running,
        start,
        stop,
        next
    } = useNode(dll_traversal);

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
                <LinkedList arr={arr}/>
            <div>{log}</div>
        </div>
    );
}
 
export default function Code_traversal_dll(){
  const code = (
    <pre>
        <code>{
`const dll = new DoublyLinkedList();

for(let i = 0; i < 5; i++){
            dll.add(i);
}

for(let i = 0; i < 5; i++){
            dll.pop();
}`}</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>Doubly Linked List</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <TraversalDll />
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