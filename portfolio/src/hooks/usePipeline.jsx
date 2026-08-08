import { useState, useEffect, useRef } from "react";

export default function usePipeline(generator, delay = 500) {
    const gen = useRef(generator());

    const [arr, setArr] = useState([]);
    const [log, setLog] = useState("");
    const [active, setActive] = useState([]);
    const [match, setMatch] = useState([]);
    const [pass, setPass] = useState([]);
    const [hold, setHold] = useState([]);
    const [cut, setCut] = useState([]);
    const [running, setRunning] = useState(false);

    function reset() {
        setLog("");
        setActive([]);
        setMatch([]);
        setPass([]);
        setHold([]);
        setCut([]);
        gen.current = generator();
    }

    function apply(value) {
    // Split/normalize value into an array of action objects
    const actions = Array.isArray(value) ? value : [value];

    actions.forEach(actionObj => {
        const { action, index } = actionObj;
 
        switch (action) {
            case "swap":
                setArr(index);
                break;
            
            case "log":
                setLog(index);
                break;

            case "active":
                setActive(index);
                break;

            case "match":
                setMatch(index);
                break;

            case "pass":
                setPass(prev => [...prev, ...index]);
                break;

            case "hold":
                setHold(index);
                break;

            case "cut":
                setCut(prev => [...prev, index]);
                break;

            default:
                break;
        }
    });
}

    function next() {
        const result = gen.current.next();

        if (result.done) {
            reset();
            return;
        }

        setRunning(false);
        apply(result.value);
    }

    useEffect(() => {
        if (!running) return;

        const id = setInterval(() => {
            const result = gen.current.next();

            if (result.done) {
                clearInterval(id);
                setRunning(false);
                reset();
                return;
            }

            apply(result.value);
        }, delay);

        return () => clearInterval(id);
    }, [running, delay]);

    function start() {
        setRunning(prev => !prev);
    }

    function stop() {
        setRunning(false);
        reset();
    }

    return {
        log,
        arr,
        active,
        match,
        pass,
        hold,
        cut,
        running,
        start,
        stop,
        next
    };
}