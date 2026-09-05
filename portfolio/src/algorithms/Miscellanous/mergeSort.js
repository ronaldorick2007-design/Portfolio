export default function* main_mergesort(){

    yield* mergeSort([1,3,4,2,5,8,7,6]);
}

function* mergeSort(arr,depth = 1) {
    yield [
            { action: "set",type:"F",scope:`${depth}`},
            {action:"log", index:["Entering mergeSort function..."]}
        ];

    if (arr.length <=1) {
        yield [
            { action: "set",type:"A", index: arr, name: "arr",scope:`${depth}` }
        ];
        yield [
            { action: "clear", index:[], scope: `${depth}` },
            { action : "log", index : [`Base case : one element, exited mergeSort function...`]}
        ];
        return arr;
        
    }
    yield [
            { action: "set",type:"A", index: arr, name: "arr",scope:`${depth}` }
        ];    
    // // Middle index to create subarray halves
    let middle = Math.floor(arr.length / 2);
    yield [
            { action: "set",type:"P", index:middle, name: "middle",scope:`${depth}` },
            { action : "log", index : [`Middle Index : ${middle}`]}
        ]; 
    
    // // Apply mergeSort to both the halves
    let left = (yield* mergeSort(arr.slice(0,middle),depth+1));
    yield [
            { action: "set",type:"A", index: left, name: "left",scope:`${depth}` },
            { action : "log", index : [`Left sorted Array`]}
        ]; 
    let right = (yield* mergeSort(arr.slice(middle),depth+1));
    yield [
            { action: "set",type:"A", index: right, name: "right",scope:`${depth}`,
         },
         { action : "log", index : [`Right sorted Array`]}
        ]; 
    
    // // Merge both sorted parts
    let result = yield* merge(left, right);
    yield [
            { action: "set",type:"A", index: result, name: "result",scope:`${depth}` },
            { action : "log", index : [`Returning Result Array`]}
        ]; 


    yield [
            { action: "clear", index:[], scope: `${depth}` },
            { action : "log", index : [`Array Sorted`]}
        ];

    return result;
}

function* merge(left, right) {

    yield [
            { action: "set",type:"F",scope:`merge`},
            {action:"log",index:["Entering merge() function"]}
        ];

    yield [
            { action: "set",type:"A", index: left, name: "left",scope:`merge` },
            { action: "set",type:"A", index: right, name: "right",scope:`merge` }
        ];

    const result = [];
    yield [
            { action: "set",type:"A", index: result, name: "result",scope:`merge` }
        ];  
    let i = 0;
    yield [
            { action: "set",type:"P", index:i, name: "i",scope:`merge` }
        ];
    let j = 0;
    yield [
            { action: "set",type:"P", index:j, name: "j",scope:`merge` }
        ];

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            yield [
            {action:"indicate",index:[i,"active"],d:left},            
            ];
            result.push(left[i]);
            i++;
            yield [
            { action: "rearrange", index: [], name: "result",scope:`merge` },
            { action: "rearr", index:i, name: "i",scope:`merge` }             
            ]; 
        } else {
            yield [
            {action:"indicate",index:[j,"active"],d:right},            
            ];
            result.push(right[j]);
            j++;
            yield [
            { action: "rearrange", index: [], name: "result",scope:`merge` },
            { action: "rearr", index:j, name: "j",scope:`merge` }
            ]; 
        }
    }

    // Add remaining elements
    while (i < left.length) {
        yield [
            {action:"indicate",index:[i,"active"],d:left},            
            ];
        result.push(left[i]);
        i++;
        yield [
            { action: "rearrange", index: [], name: "result",scope:`merge` },
            { action: "rearr", index:j, name: "j",scope:`merge` }
            ];
    }

    while (j < right.length) {
        yield [
            {action:"indicate",index:[j,"active"],d:right},           
            ];
        result.push(right[j]);
        j++;
        yield [
            { action: "rearrange", index: [], name: "result",scope:`merge` },
            { action: "rearr", index:j, name: "j",scope:`merge` }
            ];
    }

    yield[
        { action: "clear", index:[], scope: `merge` },
        { action : "log", index : [`Exited mergeSort function...`]}
    ]
    return result;
}