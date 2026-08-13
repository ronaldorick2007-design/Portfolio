export default function* selectionSort(arr){
    n = arr.length;
    for (let i = 0; i < n; i++) {

        let lowest = i;
        yield [
            { action : "log", index : [`Assume index ${i} as minimum`]},
            { action : "hold", index : [lowest]}
        ];

        for (let j = i + 1; j < n; j++) {

            yield { action : "active", index : [j]};

            if (arr[lowest] > arr[j]) {
                yield { action : "log", index : [`arr[${j}] < arr[${lowest}]`]};
                lowest = j;
                yield [
                    { action : "log", index : [`Set lowest to ${j}`]},
                    { action : "active", index : []},
                    { action : "hold", index : [lowest]}
                ];
            }
        }

        if (i !== lowest) {
        yield [
            { action : "log" ,index : [`Swapping ${i} and ${lowest}`]},
            { action : "active", index : []},
            { action : "swap", index : { [i]: lowest, [lowest]: i }}];
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        }


        yield [
            { action : "active", index : []},
            { action : "hold", index : []},
            { action : "rearrange", index : []},
            { action : "pass", index : [i] },
            { action : "log" ,index : [`index ${i} is sorted`]}
        ]

    }
    yield [{ action : "log", index : ["Array Sorted!"]}]

}