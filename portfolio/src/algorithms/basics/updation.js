export default function* updation(){
    const arr = [1,2,3,4,5];
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    let n = arr.length;
    for(let i = 0; i < n; i++){
        yield [
            { action: "indicate", index: [i,"active"], d: arr},
            { action : "log", index : [`Current index ${i}`]}
        ];

        if(i == 2){
            yield [
                { action: "indicate", index: [i,"match"], d: arr},
                { action : "log", index : [`Match Found`]}
            ]
            arr[i] = 7
            yield [
                { action: "indicate", index: [i,"change"], d: arr},
                { action : "log", index : [`Updating with new value`]}
            ]

            yield { action: "indicate", index: [-1,"change"], d: arr}
        }
    }

    
}