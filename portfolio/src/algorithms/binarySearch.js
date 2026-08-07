export default function* binarySearch() {
    const arr = [1, 2, 3, 4, 5,6];
    const target = 1;
 
    let left = 0;
    let right = arr.length - 1;

    yield [ { action: "hold", index: [left, right] }
            ];

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // Highlight current window bounds (left and right) and mid
        yield [
            // { action: "hold", index: [] },
            { action: "active", index: [mid] },
            // { action: "hold", index: [left, right] }
        ];

        // Found target
        if (arr[mid] === target) {
            yield [
                { action: "match", index: [mid] },                
                { action: "cut", index: mid }
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
                { action: "hold", index: [left, right] }
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
                { action: "hold", index: [left, right] }
            ];
        }
    }
}