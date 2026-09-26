import { forwardRef, useImperativeHandle } from "react";

import useGraph from "../hooks/useGraph_renders";
import Graph from "./GraphCopy";

const GraphVisual = forwardRef(function TreeVisual(_, ref) {
    
    const {
        name,
        arr,
        indicate,
        connect,
        apply,
        getPostion
    } = useGraph();

    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);
 
    return (
        <Graph
            name={name}
            arr={arr}
            indicate={indicate} 
            connections={connect}  
            func={getPostion}         
        />
    );
});

export default GraphVisual;