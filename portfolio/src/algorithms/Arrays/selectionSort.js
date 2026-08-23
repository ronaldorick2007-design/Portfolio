export default function* selectionSort(){

    const arr = [5, 3, 8, 4, 2]
    const n = arr.length;
 
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];

    for (let i = 0; i < n; i++) {

        let lowest = i;
        yield [
            { action : "log", index : [`Assume index ${i} as minimum`]},
            { action : "hold", index : [lowest], name: "arr"}
        ];

        for (let j = i + 1; j < n; j++) {

            yield { action : "active", index : [j], name: "arr"};

            if (arr[lowest] > arr[j]) {
                yield { action : "log", index : [`arr[${j}] < arr[${lowest}]`]};
                lowest = j;
                yield [
                    { action : "log", index : [`Set lowest to ${j}`]},
                    { action : "active", index : [], name: "arr"},
                    { action : "hold", index : [lowest], name: "arr"}
                ];
            }
        }

        if (i !== lowest) {
        yield [
            { action : "log" ,index : [`Swapping ${i} and ${lowest}`]},
            { action : "active", index : [], name: "arr"},
            { action : "swap", index : { [i]: lowest, [lowest]: i }, name: "arr"}];
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        }


        yield [
            { action : "active", index : [], name: "arr"},
            { action : "hold", index : [], name: "arr"},
            { action : "rearrange", index : [], name: "arr"},
            { action : "pass", index : [i], name: "arr" },
            { action : "log" ,index : [`index ${i} is sorted`]}
        ]

    }
    yield [{ action : "log", index : ["Array Sorted!"]}]

}