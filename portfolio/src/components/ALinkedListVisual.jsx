import { forwardRef, useImperativeHandle } from "react";

import useNode from "../hooks/useNode_renders";
import useLinkedList from "../hooks/useLinkedList_renders";
import LinkedList from "./LinkedList";

const LinkedListVisual = forwardRef(function ArrayVisual(_, ref) {

    const { name,arr,indicate, apply} = useLinkedList();
    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);

    return (
        <LinkedList 
            name={name}
            arr={arr}
            indicate = {indicate}
        />
    );
});

export default LinkedListVisual;