export default function* updation(arr){
    let n = arr.length;
    for(let i = 0; i < n; i++){
        yield [
            { action : "active", index : [i]},
            { action : "log", index : [`Current index ${i}`]}
        ];

        if(i == 2){
            yield [
                { action : "match", index : [i]},
                { action : "active", index : []},
                { action : "log", index : [`Match Found`]}
            ]
            arr[i] = 7
            yield [
                { action : "match", index : []},
                { action : "change", index : [i]},
                { action : "log", index : [`Updating with new value`]}
            ]

            yield { action : "change", index : []}
        }
    }

    
}