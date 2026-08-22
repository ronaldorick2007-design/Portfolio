export default function* bubbleSort(arr) {

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            // Highlight the two adjacent elements being compared
            yield [
                { action: "active", index: [j, j + 1] },
                { action: "log" ,index: [`Comparing ${j} and ${j+1}`]}
                ];

            if (arr[j] > arr[j + 1]) {
                yield { action: "log" ,index: [`Swapping ${j} and ${j+1}`]}
                // Swap elements
                yield [                    
                    { action: "swap", index: { [j]: j+1, [j+1]: j } }                 
                    ];
            // STEP 2: Mutate array data in memory
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

            // STEP 3: Yield updated array AND clear swap offsets
            yield { action: "rearrange", index: [...arr] }
                
            swapped = true;                
            }
             
        }
        yield [
                { action: "active", index:[]},
                { action: "pass", index: [n-i-1] },
                { action: "log" ,index: [`index ${n-i-1} is sorted`]}
            ];

        if (!swapped) {
            break;
        }
    }
}
