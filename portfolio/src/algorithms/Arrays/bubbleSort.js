export default function* bubbleSort() {
    const arr = [5, 3, 8, 4, 2]
    const n = arr.length;
 
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            // Highlight the two adjacent elements being compared
            yield [
                {action:"indicate",index:[[j,j+1],"active"],d:arr},
                { action: "log" ,index: [`Comparing ${j} and ${j+1}`]}
                ];
 
            if (arr[j] > arr[j + 1]) {
                yield { action: "log" ,index: [`Swapping ${j} and ${j+1}`]}
                // Swap elements
                yield [                    
                    { action: "swap", index: { [j]: j+1, [j+1]: j }, name: "arr" }                 
                    ];
            // STEP 2: Mutate array data in memory
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

            // STEP 3: Yield updated array AND clear swap offsets
            yield { action: "rearrange", index: [...arr], name: "arr" }
                
            swapped = true;                
            }
             
        }
        yield [
                { action: "indicate", index: [n-i-1,"pass"], d:arr },
                { action: "log" ,index: [`index ${n-i-1} is sorted`]}
            ];

        if (!swapped) {
            break;
        }
    }
}