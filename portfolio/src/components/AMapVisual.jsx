import { forwardRef, useImperativeHandle } from "react";

import useSet from "../hooks/useSet_renders";
import useMap from "../hooks/useMap_renders";
import HashSet from "./HashSet";
import HashMap from "./HashMap";

const MapVisual = forwardRef(function ArrayVisual(_, ref) {

    const { name,arr,indicate, apply} = useMap();
    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);

    return (
        <HashMap
            name={name}
            arr={arr}
            indicate = {indicate}
        />
    );
});

export default MapVisual;