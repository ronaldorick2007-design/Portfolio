export default function* selection(arr){
    const n = arr.length;
        
    for(let i=0;i<n;i++){
        yield [
            { action: "active", index: [i] },
            { action: "log", index: [`Current index : ${i}`] },
        ];

        if(i == 2){
            yield [
            { action: "match", index: [i] },
            { action: "log", index: [`Condition met!`] },
        ];
        }
    }
    yield { action: "log", index: [`Loop termination`] }
}