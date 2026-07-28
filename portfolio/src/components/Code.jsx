import "../styles/Code.css"
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch"
import TreeBuild from "./Tree";
import Window from "./Window";

export default function Code({title}){
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

const A = [1, 4, 2, 5, 3];
linearSearch(A, 2);`}</code>
    </pre>
);

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>{title}</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <LinearSearch arr={[1,3,5,2,3]}/>
        {/* <BinarySearch arr={[1,2,3,4,5]}/> */}
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