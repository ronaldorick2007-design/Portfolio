export default function* main(){

    yield* mergeSort([1,3,4,2,5,8,7,6]);
}

function* mergeSort(arr,depth = 1) {
    yield [
            { action: "set",type:"F",scope:`${depth}`},
        ];

    if (arr.length <=1) {
        yield [
            { action: "set",type:"A", index: arr, name: "arr",scope:`${depth}` }
        ];
        yield [
            { action: "clear", index:[], scope: `${depth}` },
            { action: "clear", index:[],name:"arr", scope: `${depth}` },
            { action : "log", index : [`Base case : one element`]}
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
            { action: "clear", index:[],name:"arr", scope: `${depth}` },
            { action: "clear", index:[],name:"middle", scope: `${depth}` },
            { action: "clear", index:[],name:"result", scope: `${depth}` },
            { action: "clear", index:[],name:"left", scope: `${depth}` },
            { action: "clear", index:[],name:"right", scope: `${depth}` },
            { action : "log", index : [`Array Sorted`]}
        ];

    return result;
}

function* merge(left, right) {

    yield [
            { action: "set",type:"F",scope:`merge`},
            {action:"log",index:["Merging given two arrays."]}
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
            { action: "active", index: [i], name: "left",scope:`merge` },            
            ];
            result.push(left[i]);
            i++;
            yield [
            { action: "rearrange", index: [], name: "result",scope:`merge` },
            { action: "rearr", index:i, name: "i",scope:`merge` }             
            ]; 
        } else {
            yield [
            { action: "active", index: [j], name: "right",scope:`merge` },            
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
            { action: "active", index: [i], name: "left",scope:`merge` },            
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
            { action: "active", index: [j], name: "right",scope:`merge` },            
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
        { action: "clear", index:[], name:"result", scope: `merge` },
        { action: "clear", index:[], name:"left", scope: `merge` },
        { action: "clear", index:[], name:"right", scope: `merge` },
        { action: "clear", index:[], name:"i", scope: `merge` },
        { action: "clear", index:[], name:"j", scope: `merge` },
    ]
    return result;
}