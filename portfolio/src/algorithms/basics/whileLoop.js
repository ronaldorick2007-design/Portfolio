export default function* whileLoop(arr){
    const n = arr.length;
    let i = 0;
    
    while(i < n){
        yield [
            { action: "active", index: [i] },
            { action: "log", index: [`Current index : ${i} < ${n}`] },
        ];
        i++;
    }

    yield { action: "log", index: [`Termination : ${i} = ${n} `] }
}