import "../styles/Code.css"
import Window from "./Window";
import CompetentRenderStack from "./CompetentRenderStack";

export default function Code_VisualStack({title, codes, generator}){
  const Code = (
    <pre>
        <code>{codes}</code>
    </pre>
    );

    return(
        <div className="content Hover">
            <div className="card-title alignText">
                <h2>{title}</h2>
            </div>
            <div className="content-inner">
                <div className="card-about alignText">
                    <CompetentRenderStack generator={generator} />
                </div>
                <div className="sidebar alignText">
                    <h3>Sidebar</h3>
                    <p>This is the code content inside code box.</p>
                    <Window code={Code}/>
                </div>
            </div>
        </div>
    );
}