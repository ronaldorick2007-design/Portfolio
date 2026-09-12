export default function* binarySearch() {
    const arr = [5,3,8,4,2]
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    const target = 5;
 
    let left = 0;
    let right = arr.length - 1;
    let status ="";
    let clear;

    console.log(left,right)
    yield  [{ action: "indicate", index: [[left, right],"hold"], d:arr},
            { action: "log", index: [`left : ${left}\nright : ${right}`]}]
            

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // Highlight current window bounds (left and right) and mid
        yield [
            // { action: "hold", index: [] },
            {action:"indicate",index:[mid,"active"],d:arr},
            { action: "log", index: [`Middle index : ${mid}`]}
            // { action: "hold", index: [left, right] }
        ];

        // Found target
        if (arr[mid] === target) {
            yield [
                {action:"indicate",index:[mid,"match"],d:arr}, 
                { action: "log", index: [`Target found!`]}               
                // { action: "cut", index: mid }
            ];
            return;
        }

        // Adjust boundaries and eliminate sub-array range
        if (arr[mid] < target) {
            // Cut everything from left up to mid
            clear = Array.from({ length: mid - left + 1 }, (_, i) => left + i);
            left = mid + 1;
            status = `Shift left to ${left}`;

        } else {
            // Cut everything from mid up to right
            clear = Array.from({ length: right - mid + 1 }, (_, i) => mid + i);
            right = mid - 1;
            status = `Shift right to ${right}`

        }

        yield [
                { action: "indicate", index: [[left, right],"hold"], d:arr },
                { action: "indicate", index: [clear,"pass"], d:arr },
                { action: "log", index: [status]}
            ];
    }
}