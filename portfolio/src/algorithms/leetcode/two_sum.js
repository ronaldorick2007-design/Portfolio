export default function* main(){
    yield [
            { action: "set",type:"F",scope:`main`},
            {action:"log", index:["Entering factorial function..."]}
        ];
    let result  = yield* factorial(5)
    yield [
            { action: "set",type:"P", index:result, name: "result",scope:`main` },
            { action : "log", index : [`Middle Index : ${1}`]}
        ];
    yield [
            { action: "clear", index:[], scope: `main` },
            { action : "log", index : [`Array Sorted`]}
        ];
}

function* factorial(n, depth = 1) {
yield [
            { action: "set",type:"F",scope:`${depth}`},
            {action:"log", index:["Entering factorial function..."]}
        ];


    if (n <= 1) {
        yield [
            { action: "set",type:"P", index:1, name: "x",scope:`${depth}` },
            { action : "log", index : [`Middle Index : ${1}`]}
        ];
        yield [
            { action: "clear", index:[], scope: `${depth}` },
            { action : "log", index : [`Base case : one, exited factorial function...`]}
        ];
        return 1};

    let x = (yield* factorial(n - 1, depth+1));
    yield [
            { action: "set",type:"P", index:x, name: "x",scope:`${depth}` },
            { action : "log", index : [`Middle Index : ${x}`]}
        ]; 
    // yield x;



    yield [
            { action: "set",type:"P", index:n*x, name: "n*x",scope:`${depth}` },
            { action : "log", index : [`Middle Index : ${1}`]}
        ];

    yield [
            { action: "clear", index:[], scope: `${depth}` },
            { action : "log", index : [`Array Sorted`]}
        ];

    return n * x;
}