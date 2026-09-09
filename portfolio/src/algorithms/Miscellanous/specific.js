import { Node } from "../../data_structures/Node";

export default function* specific()
//-------------------------------------------------------------------
{
    // const arr = new Node(1);
    // console.log(arr)
    // yield [
    //         { action: "set",type:"N", index: arr, name: "arr" },
    //     ];

    // arr.value = 2;
    // console.log(arr)
    // yield [
    //         { action: "rearrange", name: "arr" },
    //     ];


    const arr = [5,3,8,4,2]
    yield [
            { action: "set",type:"A", index: arr, name: "arr" },
        ];
    const target = 1;
 
    let left = 0;
    let right = arr.length - 1;
    let status ="";
    let clear;

    console.log(left,right)
    yield  [{ action: "indicate", index: [[left, right],"hold"], name: "arr" },
            { action: "log", index: [`left : ${left}\nright : ${right}`]}]
            

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // Highlight current window bounds (left and right) and mid
        yield [
            // { action: "hold", index: [] },
            {action:"indicate",index:[mid,"active"],name:"arr"},
            { action: "log", index: [`Middle index : ${mid}`]}
            // { action: "hold", index: [left, right] }
        ];

        // Found target
        if (arr[mid] === target) {
            yield [
                {action:"indicate",index:[mid,"match"],name:"arr"}, 
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
                { action: "indicate", index: [[left, right],"hold"], name: "arr" },
                { action: "indicate", index: [clear,"pass"], name: "arr" },
                { action: "log", index: [status]}
            ];
    }
}
//----------------------------------------------------------------
// {
//     const arr = [5, 3, 8, 4, 2]
//     const n = arr.length;
 
//     yield [
//             { action: "set",type:"A", index: arr, name: "arr" },
//         ];

//     for (let i = 0; i < n - 1; i++) {
//         let swapped = false;

//         for (let j = 0; j < n - i - 1; j++) {
//             // Highlight the two adjacent elements being compared
//             yield [
//                 {action:"indicate",index:[[j,j+1],"active"],name:"arr"},
//                 { action: "log" ,index: [`Comparing ${j} and ${j+1}`]}
//                 ];
 
//             if (arr[j] > arr[j + 1]) {
//                 yield { action: "log" ,index: [`Swapping ${j} and ${j+1}`]}
//                 // Swap elements
//                 yield [                    
//                     { action: "swap", index: { [j]: j+1, [j+1]: j }, name: "arr" }                 
//                     ];
//             // STEP 2: Mutate array data in memory
//             [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

//             // STEP 3: Yield updated array AND clear swap offsets
//             yield { action: "rearrange", index: [...arr], name: "arr" }
                
//             swapped = true;                
//             }
             
//         }
//         yield [
//                 { action: "indicate", index: [n-i-1,"pass"], name: "arr" },
//                 { action: "log" ,index: [`index ${n-i-1} is sorted`]}
//             ];

//         if (!swapped) {
//             break;
//         }
//     }
// }
//-------------------------------------------------------------------
// {
    
//     const arr = [5, 3, 8, 4, 2]
//     const n = arr.length;
 
//     yield [
//             { action: "set",type:"A", index: arr, name: "arr" },
//         ];

//     for (let i = 1; i < n; i++) {
//         let key = arr[i];
//         yield[
//             { action: "indicate", index: [i,"hold"], name: "arr" },
//             { action : "log", index : [`Current Index ${i}`]}
//         ]
//         let j = i - 1;

//         while (j >= 0 && arr[j] > key) {
//             yield[{ action : "log", index : ["previous value is greater."]}]
//             yield[
//                 { action : "swap", index : {[j]:j+1, [j+1]:j}, name: "arr"},
//                 { action : "log", index : [`Swap with previous : ${j}`]}
//             ]
//             arr[j + 1] = arr[j];
//             j--;
//             arr[j + 1] = key;
//             yield [
//                 { action : "rearrange", index : [], name: "arr"},
//                 { action: "indicate", index: [j+1,"hold"], name: "arr" },
//             ]
//         }
        
//     }
//     yield [{ action : "log", index : ["Array Sorted!"]}]
// }
//----------------------------------------------------------------------
// {

//     const arr = [5, 3, 8, 4, 2]
//     const n = arr.length;
 
//     yield [
//             { action: "set",type:"A", index: arr, name: "arr" },
//         ];

//     for (let i = 0; i < n; i++) {

//         let lowest = i;
//         yield [
//             { action : "log", index : [`Assume index ${i} as minimum`]},
//             { action: "indicate", index: [lowest,"hold"], name: "arr" }
//         ];

//         for (let j = i + 1; j < n; j++) {

//             yield { action: "indicate", index: [j,"active"], name: "arr" };

//             if (arr[lowest] > arr[j]) {
//                 yield { action : "log", index : [`arr[${j}] < arr[${lowest}]`]};
//                 lowest = j;
//                 yield [
//                     { action: "indicate", index: [lowest,"hold"], name: "arr" }
//                 ];
//             }
//         }

//         if (i !== lowest) {
//         yield [
//             { action : "log" ,index : [`Swapping ${i} and ${lowest}`]},
//             { action : "swap", index : { [i]: lowest, [lowest]: i }, name: "arr"}];
//         [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
//         }

//         yield [
//             { action : "rearrange", index : [], name: "arr"},
//             { action: "indicate", index: [i,"pass"], name: "arr" },
//             { action : "log" ,index : [`index ${i} is sorted`]}
//         ]

//     }
//     yield [{ action : "log", index : ["Array Sorted!"]}]

// }