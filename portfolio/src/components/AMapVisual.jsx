import { forwardRef, useImperativeHandle } from "react";

import useMap from "../hooks/useMap_renders";
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