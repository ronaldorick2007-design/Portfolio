export default function* whileLoop(){
    const arr = [1,2,3,4,5];
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    const n = arr.length;
    let i = 0;
    
    while(i < n){
        yield [
            { action: "active", index: [i], name: "arr" },
            { action: "log", index: [`Current index : ${i} < ${n}`] },
        ];
        i++;
    }

    yield { action: "log", index: [`Termination : ${i} = ${n} `] }
}