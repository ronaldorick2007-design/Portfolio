import { forwardRef, useImperativeHandle } from "react";

import useSet from "../hooks/useSet_renders";
import HashSet from "./HashSet";

const SetVisual = forwardRef(function ArrayVisual(_, ref) {

    const { name,arr,indicate, apply} = useSet();
    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);

    return (
        <HashSet
            name={name}
            arr={arr}
            indicate = {indicate}
        />
    );
});

export default SetVisual;