import linearSearch from "../algorithms/linearSearch";
import "../styles/Body.css"
import "../styles/Grid.css"
import Code from "./Code";
import Terminal from "./Terminal";
import Window from "./Window";
import Banner from "./Banner"
import RippleField from "./RippleField";
// import Content from "./Content";

export default function Body(){

    return(
        <div className="Body">
            {/* <Content />
            <Content /> */}
            <Code title={"Linear Search"}/>
            <Code title={"Binary Search"}/>
            <Code title={"Bubble Sort"}/>

            <Window code={<Terminal />}/>
            <RippleField />
                      
        </div>
    );
}