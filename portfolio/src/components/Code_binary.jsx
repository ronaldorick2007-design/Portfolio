import "../styles/Code.css"
import LinearSearch from "./LinearSearch";
import BinarySearch from "../visuals/BinarySearch"
import TreeBuild from "./Tree";
import Window from "./Window";

export default function Code_binary({title}){
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
      <h2>{title}</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        {/* <LinearSearch arr={[1,3,5,2,3]}/> */}
        <BinarySearch arr={[1,2,3,4,5,6]}/>
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