import { forwardRef, useImperativeHandle } from "react";

import useArray from "../hooks/useArray_switch";
import GridBuild from "./Grid copy";

const ArrayVisual = forwardRef(function ArrayVisual(_, ref) {
    
    const {
        name,
        arr,
        indicate,
        active,
        apply,
        match,
        swap,
        pass,
        hold,
        change,
    } = useArray();

    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);
 
    return (
        <GridBuild
            name={name}
            arr={arr}
            indicate={indicate}
            active={active}
            swap={swap}
            match={match}
            pass={pass}
            hold={hold}
            change={change}
        />
    );
});

export default ArrayVisual;