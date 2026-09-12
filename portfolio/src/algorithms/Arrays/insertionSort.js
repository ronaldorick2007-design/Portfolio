export default function* insertionSort()
{
    
    const arr = [5, 3, 8, 4, 2]
    const n = arr.length;
 
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        yield[
            { action: "indicate", index: [i,"hold"], d:arr },
            { action : "log", index : [`Current Index ${i}`]}
        ]
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            yield[{ action : "log", index : ["previous value is greater."]}]
            yield[
                { action : "swap", index : {[j]:j+1, [j+1]:j}, name: "arr"},
                { action : "log", index : [`Swap with previous : ${j}`]}
            ]
            arr[j + 1] = arr[j];
            j--;
            arr[j + 1] = key;
            yield [
                { action : "rearrange", index : [], name: "arr"},
                { action: "indicate", index: [j+1,"hold"], d:arr },
            ]
        }
        
    }
    yield [{ action : "log", index : ["Array Sorted!"]}]
}