import "../styles/Content.css"
import Item from "./Item";
import LinearSearch from "./LinearSearch";
import Window from "./Window";

export default function Content(){
    return(
        <div className="content">
            {Array.from({length : 3},() => <Item />)}
        <LinearSearch />
        <Window/>
        </div>
    );
}