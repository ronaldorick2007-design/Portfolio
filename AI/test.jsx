import {
    forwardRef,
    useImperativeHandle
} from "react";

import useArray from "./useArray";
import GridBuild from "./GridBuild";

const ArrayVisual = forwardRef(function ArrayVisual(_, ref) {

    const { arr, active, apply } = useArray();

    useImperativeHandle(ref, () => ({
        apply
    }), [apply]);

    return (
        <GridBuild
            arr={arr}
            active={active}
        />
    );
});

export default ArrayVisual;


-------------------------------------------------------------------------------------
import { useState } from "react";

export default function useArray() {
    const [arr, setArr] = useState([]);
    const [active, setActive] = useState([]);

    function apply({ action,index }) {
        switch (action) {
            case "set":
                setArr(index);
                break;

            case "active":
                setActive(index);
                break;

            case "reset":
                setArr([]);
                setActive([]);
                break;
        }
    }

    return { arr, active, apply };
}

-----------------------------------------------------------------------------------------
import { useRef, useState } from "react";
import { createRef } from "react";

import ArrayVisual from "./ArrayVisual";

export default function App() {

    const [visuals, setVisuals] = useState([]);

    // id → ref
    const refs = useRef(new Map());

    // id → apply()
    const applyMap = useRef(new Map());

    function addArray() {

        const id = crypto.randomUUID();

        const ref = createRef();

        refs.current.set(id, ref);

        setVisuals(prev => [
            ...prev,
            id
        ]);
    }

    function setArray(id) {

        applyMap.current
            .get(id)
            ?.({
                action: "set",
                value: [1, 2, 3, 4, 5]
            });
    }

    return (
        <div>

            <button onClick={addArray}>
                Add Array
            </button>

            {visuals.map(id => (
                <div key={id}>

                    <button onClick={() => setArray(id)}>
                        Set {id.slice(0, 4)}
                    </button>

                    <ArrayVisual
                        ref={node => {

                            refs.current.get(id).current = node;

                            if (node) {
                                applyMap.current.set(
                                    id,
                                    node.apply
                                );
                            }
                        }}
                    />

                </div>
            ))}

        </div>
    );
}
-------------------------------------------------------------------------


import { useRef } from "react";
import ArrayVisual from "./ArrayVisual";

export default function App() {
    const visualRef = useRef(null);

    function setArray() {
        visualRef.current?.apply({
            action: "set",
            value: [1, 2, 3, 4, 5]
        });
    }

    return (
        <div>
            <button onClick={setArray}>
                Set Array
            </button>

            <ArrayVisual ref={visualRef} />
        </div>
    );
}








