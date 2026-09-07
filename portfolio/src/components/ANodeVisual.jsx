import { forwardRef, useImperativeHandle } from "react";

import useNode from "../hooks/useNode_renders";
import Node from "./Node";

const NodeVisual = forwardRef(function ArrayVisual(_, ref) {

    const { name,node,indicate, apply} = useNode();
    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);

    return (
        <Node 
            name={name}
            node={node}
            indicate = {indicate}
        />
    );
});

export default NodeVisual;