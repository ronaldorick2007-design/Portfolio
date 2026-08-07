export default function* linearSearch() {
    const arr = [1, 4, 2, 5, 3];
    const target = 5;

    for (let i = 0; i < arr.length; i++) {
        // At the start of each iteration, combine active highlight 
        // with pass status for the previous element (if any)
        yield [
            { action: "active", index: [i] },
            { action: "pass", index: [i-1]}
        ];
 
        // Found target
        if (arr[i] === target) {
            yield [
                { action: "match", index: [i] },
                { action: "cut", index: i }
            ];
            return;
        }
    }
}