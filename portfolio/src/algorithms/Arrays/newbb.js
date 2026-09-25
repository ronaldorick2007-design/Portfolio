function* bubbleSort(arr) {
yield [
    { action: "set", type: "F", scope: "bubbleSort" },
    { action: "log", index: ["Enter"], scope: "bubbleSort" }
];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {

yield [
    { action: "indicate", index: [[j, j+1], "active"], d: arr, scope: "bubbleSort" }
];

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
yield [
    { action: "rearrange", index: [], name: "arr", }
];
            }
        }
    }

yield [
    { action: "clear", index: [], scope: "bubbleSort" }
];
    return arr;
yield [
    { action: "return", index: arr, name: "arr", scope: "bubbleSort" }
];
yield [
    { action: "clear", index: [], scope: "bubbleSort" },
    { action: "log", index: ["Exit"], scope: "bubbleSort" }
];
}

export default function* main() {
yield [
    { action: "set", type: "F", scope: "main" },
    { action: "log", index: ["Enter"], scope: "main" }
];
    let arr = [5, 3, 8, 4, 2];
yield [
    { action: "set", type: "A", index: arr, name: "arr", scope: "main" },
    { action: "log", index: ["initialized"], scope: "main" }
];

    let result = (yield* bubbleSort(arr));
yield [
    { action: "set", type: "P", index: result, name: "result", scope: "main" },
    { action: "log", index: ["initialized"], scope: "main" }
];

    console.log(result);
yield [
    { action: "rearrange", index: console, name: "console", scope: "main" },
    { action: "log", index: ["member call"], scope: "main" }
];
yield [
    { action: "clear", index: [], scope: "main" },
    { action: "log", index: ["Exit"], scope: "main" }
];
}
