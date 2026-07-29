import { useState, useRef, useEffect } from "react";
import "../styles/Item.css"

function* words(){
    yield 1;
    yield 2;
    yield 3;
}

function usePipeline(generator, delay = 500){
    const gen = useRef(generator());
    const [frame, setFrame] = useState("");

    function next(){
        const result = gen.current.next();
        if(!result.done){
            setFrame(result.value);
        }
    }

    return {frame, next}
}

export default function Item(){

    const {frame, next} = usePipeline(words);

    return(
        <div className="item"
         onClick={next}>
            { frame }
        </div>
    );
}