export default function* selection(){
    const arr = [1, 2, 3, 4, 5]
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    const n = arr.length;
        
    for(let i=0;i<n;i++){
        yield [
            { action: "active", index: [i], name: "arr" },
            { action: "log", index: [`Current index : ${i}`] },
        ];

        if(i == 2){
            yield [
            { action: "match", index: [i], name: "arr" },
            { action: "log", index: [`Condition met!`] },
        ];
        }
    }
    yield { action: "log", index: [`Loop termination`] }
}