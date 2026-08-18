import "../styles/Code.css"
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch"
import TreeBuild from "./Tree";
import Window from "./Window";
import BubbleSort from "./BubbleSort";

export default function Code_bubble({title}){
  const code = (
    <pre>
        <code>{`function bubbleSort(arr) {
    let N = arr.length;
    for (let i = 0; i < N - 1; i++) {
        for (let j = 0; j < N - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

const A = [1, 4, 2, 5, 3];
bubbleSort(A);`}</code>
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
        <BubbleSort arr={[5, 3, 8, 4, 2, 7, 1, 6]}/>
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