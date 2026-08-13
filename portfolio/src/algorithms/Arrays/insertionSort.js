export default function* insertionSort(arr){
    let N = arr.length;

    for (let i = 1; i < N; i++) {
        let key = arr[i];
        yield[
            { action : "hold", index : [i]},
            { action : "log", index : [`Current Index ${i}`]}
        ]
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            yield[{ action : "log", index : ["previous value is greater."]}]
            yield[
                { action : "swap", index : {[j]:j+1, [j+1]:j}},
                { action : "log", index : [`Swap with previous : ${j}`]}
            ]
            arr[j + 1] = arr[j];
            j--;
            arr[j + 1] = key;
            yield [
                { action : "rearrange", index : []},
                { action : "hold", index : [j+1]}
            ]
        }
        
    }
    yield [{ action : "log", index : ["Array Sorted!"]}]
}