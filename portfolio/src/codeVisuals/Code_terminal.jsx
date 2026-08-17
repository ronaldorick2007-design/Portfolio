import "../styles/Code.css"
import LinearSearch from "../visuals/LinearSearch";
import Window from "../components/Window";

export default function Code({title,code}){

    return(
        <div className="content Hover">
    <div className="card-title alignText">
      <h2>{title}</h2>
    </div>
    <div className="content-inner">
      <div className="card-about alignText">
        <LinearSearch arr={[1,3,5,2,3]}/>
      </div>
      <div className="sidebar alignText">
        <h3>Sidebar</h3>
        <p>This is the code content inside code box.</p>
        <Window code={
          <pre>
          <code>{code}</code>
          </pre>}
        />
      </div>
    </div>
  </div>
    );
}