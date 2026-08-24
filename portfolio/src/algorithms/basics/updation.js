export default function* updation(){
    const arr = [1,2,3,4,5];
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    let n = arr.length;
    for(let i = 0; i < n; i++){
        yield [
            { action : "active", index : [i], name: "arr" },
            { action : "log", index : [`Current index ${i}`]}
        ];

        if(i == 2){
            yield [
                { action : "match", index : [i], name: "arr"},
                { action : "active", index : [], name: "arr"},
                { action : "log", index : [`Match Found`]}
            ]
            arr[i] = 7
            yield [
                { action : "match", index : [], name: "arr"},
                { action : "change", index : [i], name: "arr"},
                { action : "log", index : [`Updating with new value`]}
            ]

            yield { action : "change", index : [], name: "arr"}
        }
    }

    
}