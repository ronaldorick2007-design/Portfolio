export default function* selectionSort()
{

    const arr = [5, 3, 8, 4, 2]
    const n = arr.length;
 
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];

    for (let i = 0; i < n; i++) {

        let lowest = i;
        yield [
            { action : "log", index : [`Assume index ${i} as minimum`]},
            { action: "indicate", index: [lowest,"hold"], d:arr }
        ];

        for (let j = i + 1; j < n; j++) {

            yield { action: "indicate", index: [j,"active"], d:arr };

            if (arr[lowest] > arr[j]) {
                yield { action : "log", index : [`arr[${j}] < arr[${lowest}]`]};
                lowest = j;
                yield [
                    { action: "indicate", index: [lowest,"hold"], d:arr }
                ];
            }
        }

        if (i !== lowest) {
        yield [
            { action : "log" ,index : [`Swapping ${i} and ${lowest}`]},
            { action : "swap", index : { [i]: lowest, [lowest]: i }, name: "arr"}];
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        }

        yield [
            { action : "rearrange", index : [], name: "arr"},
            { action: "indicate", index: [i,"pass"], d:arr },
            { action : "log" ,index : [`index ${i} is sorted`]}
        ]

    }
    yield [{ action : "log", index : ["Array Sorted!"]}]

}