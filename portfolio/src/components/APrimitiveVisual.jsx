import { forwardRef, useImperativeHandle } from "react";

import usePrimitive from "../hooks/usePrimitive_renders";
import GridBuild from "./Grid";

const APrimitiveVisual = forwardRef(function ArrayVisual(_, ref) {
    
    const {
        name,
        item,
        active,
        apply,
    } = usePrimitive();

    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);
 
    return (
        <div className="flex">
      <div className="flex h-11 min-w-[2.5rem] w-fit items-center justify-center bg-red-600 px-3.5 text-xl transition-all">
        {name}
      </div>
      <div className="flex h-11 min-w-[2.5rem] w-fit items-center justify-center bg-blue-600 px-3.5 text-xl transition-all">
        {item ? item.toString() : ""}
      </div>
    </div>
    );
});

export default APrimitiveVisual;