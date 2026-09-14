export default function* forLoop(){
    const arr = [1, 2, 3, 4, 5];
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    const n = arr.length;
        
    for(let i=0;i<n;i++){
        yield [
            { action: "indicate", index: [i,"active"], d: arr},
            { action: "log", index: [`Current index : ${i} < ${n}`] },
        ]; 
    }
    yield { action: "log", index: [`Loop termination`] }
}