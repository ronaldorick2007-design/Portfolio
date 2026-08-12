export default function* binarySearch(arr) {
    const target = 1;
 
    let left = 0;
    let right = arr.length - 1;

    console.log(left,right)
    yield  [{ action: "hold", index: [left, right] },
            { action: "log", index: [`left : ${left}\nright : ${right}`]}]
            

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // Highlight current window bounds (left and right) and mid
        yield [
            // { action: "hold", index: [] },
            { action: "active", index: [mid] },
            { action: "log", index: [`Middle index : ${mid}`]}
            // { action: "hold", index: [left, right] }
        ];

        // Found target
        if (arr[mid] === target) {
            yield [
                { action: "match", index: [mid] }, 
                { action: "log", index: [`Target found!`]}               
                // { action: "cut", index: mid }
            ];
            return;
        }

        // Adjust boundaries and eliminate sub-array range
        if (arr[mid] < target) {
            // Cut everything from left up to mid
            const eliminated = Array.from(
                { length: mid - left + 1 },
                (_, i) => left + i
            );
            left = mid + 1;

            yield [
                { action: "active", index: [] },
                { action: "pass", index: eliminated },
                { action: "hold", index: [left, right] },
                { action: "log", index: [`Shift left to ${left}`]}
            ];
        } else {
            // Cut everything from mid up to right
            const eliminated = Array.from(
                { length: right - mid + 1 },
                (_, i) => mid + i
            );
            right = mid - 1;

            yield [
                { action: "active", index: [] },
                { action: "pass", index: eliminated },
                { action: "hold", index: [left, right] },
                { action: "log", index: [`Shift right to ${right}`]}
            ];
        }
    }
}