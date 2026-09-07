import { forwardRef, useImperativeHandle } from "react";

import useTree from "../hooks/useTree_renders";
import TreeBuild from "./Tree";

const TreeVisual = forwardRef(function TreeVisual(_, ref) {
    
    const {
        name,
        arr,
        indicate,
        apply
    } = useTree();

    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);
 
    return (
        <TreeBuild 
            name={name}
            arr={arr}
            indicate={indicate}            
        />
    );
});

export default TreeVisual;