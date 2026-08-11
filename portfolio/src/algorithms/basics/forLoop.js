export default function* forLoop(arr){
    const n = arr.length;
        
    for(let i=0;i<n;i++){
        yield [
            { action: "active", index: [i] },
            { action: "log", index: [`Current index : ${i} < ${n}`] },
        ];
    }
    yield { action: "log", index: [`Loop termination`] }
}