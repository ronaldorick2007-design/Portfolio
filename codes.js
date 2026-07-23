


function range(start, end) {
    return Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
    );
}

    const linear_button = document.getElementById("linear-button");
    const linear_p = document.getElementById("linear-p");

    const binary_button = document.getElementById("binary-button");
    const binary_p = document.getElementById("binary-p");

    const sll_traversal_button = document.getElementById("sll-traversal-button");
    const sll_traversal_p = document.getElementById("sll-traversal-p");

    const bubble_button = document.getElementById("bubble-button");
    const bubble_p = document.getElementById("bubble-p");

    const selection_button = document.getElementById("selection-button");
    const selection_p = document.getElementById("selection-p");
    
    const insertion_button = document.getElementById("insertion-button");
    const insertion_p = document.getElementById("insertion-p");

    
    const values = [1, 4, 2, 5, 3];
    const grid = new GridPlane("grid-linear-search", {
        size: 50,
        itemSize: 40,
        time: 500
    });

    grid.setArray(values);

    async function linearSearch(arr, target){
        for(let i = 0; i < arr.length; i++){

            linear_p.innerHTML = `Current item : ${arr[i]}\n`;
            await grid.setActive([i]);
            
            if(arr[i] === target){
                linear_p.innerHTML = `Match found : ${arr[i]}\n`;
                await grid.setMatch(i);
                return i;
            }
        }
        return -1;
    }

    linear_button.addEventListener("click", async () => {
        linear_button.disabled = true;
        await linearSearch(values, 2);
        linear_p.innerHTML = `Click to play`;
        linear_button.disabled = false;
    })

const binaryArray = [2, 5, 9, 13, 18, 20];

const binaryGrid = new GridPlane(
    "grid-binary-search",
    {
        size: 50,
        itemSize: 40,
        time: 1500
    }
);

binaryGrid.setArray(binaryArray);

async function binarySearch(grid, array, target) {
    let left = 0;
    let right = array.length - 1;
    let mid = null;

    binary_p.innerHTML = `left:${left}\tright:${right}\tmid:${mid}`;

    grid.checkChange({ left, right });

    while (left <= right) {
        const mid = Math.floor(
            (left + right) / 2
        );
        
        binary_p.innerHTML = `left:${left}\tright:${right}\tmid:${mid}`;
        await grid.setActive([mid]);

        if (array[mid] === target) {
            binary_p.innerHTML = `left:${left}\tright:${right}\tmid:${mid}<br>Match Found`;
            await grid.setMatch(mid);
            grid.removeClass();
            return mid;
        }

        if (array[mid] < target) {
            binary_p.innerHTML = `left:${left}\tright:${right}\tmid:${mid}`;
            grid.eliminateArray(
                range(left, mid)
            );

            left = mid + 1;

            grid.checkChange({ left });
        } else {
            binary_p.innerHTML = `left:${left}\tright:${right}\tmid:${mid}`;
            grid.eliminateArray(
                range(mid, right)
            );

            right = mid - 1;

            grid.checkChange({ right });
        }
    }

    grid.removeClass();
    binary_p.textContent = "Not Found";
    return -1;
}



binary_button.addEventListener("click", async () => {
        binary_button.disabled = true;
        await binarySearch(
    binaryGrid,
    binaryArray,
    18
);
        binary_p.innerHTML = `Click to play`;
        binary_button.disabled = false;
    })


// const selectionValues = [5, 1, 4, 2, 8];

// const selectionGrid = new GridPlane("grid-selection-sort", {
//     size: 50,
//     itemSize: 40,
//     time: 3000
// });

// selectionGrid.setArray(selectionValues);

// async function selectionSort(grid, values){

//     const n = values.length;

//     for(let i = 0; i < n - 1; i++){

//         let min = i;
//         grid.checkChange({min});

//         for(let j = i + 1; j < n; j++){

//             await grid.setActive([min, j]);

//             if(values[j] < values[min]){
//                 min = j;
//                 // await grid.setActive([j])
//                 grid.checkChange({min});
//             }
//         }

//         if(min !== i){

//             [values[i], values[min]] =
//             [values[min], values[i]];

//             grid.swap(i, min);
//         }

//         grid.eliminateArray([i]);
//     }

//     grid.setHold(n - 1);

//     await grid.removeClass();

//     return values;
// }



// selection_button.addEventListener("click", async () => {
//         selection_button.disabled = true;
//         await selectionSort(selectionGrid, selectionValues)
// .then(() => {
//     selectionGrid.clear();
//     selectionGrid.setArray([5,1,4,2,8]);
// });
//         selection_p.innerHTML = ``;
//         selection_button.disabled = false;
//     })

// const insertionValues = [5, 1, 4, 2, 8];

// const insertionGrid = new GridPlane("grid-insertion-sort", {
//     size: 50,
//     itemSize: 40,
//     time: 3000
// });

// insertionGrid.setArray(insertionValues);

// async function insertionSort(grid, values){

//     const n = values.length;

//     // grid.setHold(0);

//     for(let i = 1; i < n; i++){

//         for(let j = i; j > 0; j--){
//             grid.checkChange({j})

//              await grid.eliminateArray([j - 1, j]);

//             if(values[j] < values[j - 1]){

//                 [values[j], values[j - 1]] =
//                 [values[j - 1], values[j]];

//                 grid.swap(j, j - 1);
//             }
//             else{
//                 break;
//             }
//         }

//         // for(let k = 0; k <= i; k++){
//         //     grid.setHold(k);
//         // }
//     }

//     await grid.removeClass();

//     return values;
// }



// insertion_button.addEventListener("click", async () => {
//         insertion_button.disabled = true;
//         await insertionSort(insertionGrid, insertionValues)
// .then(() => {
//     insertionGrid.clear();
//     insertionGrid.setArray([5,1,4,2,8]);
// });
//         insertion_p.innerHTML = ``;
//         insertion_button.disabled = false;
//     })
const bubbleValues = [5, 1, 4, 2, 8];

const bubbleGrid = new GridPlane("grid-bubble-sort", {
    size:50,
    itemSize:40,
    time:1500
});

bubbleGrid.setArray(bubbleValues);
async function bubbleSort(grid, values){
    const n = values.length;
    

    for(let i = 0; i < n - 1; i++){
        let swapped = false;
        let j=0;

        for( j = 0; j < n - i - 1; j++){
            await grid.setActive([j, j + 1]);

            if(values[j] > values[j + 1]){

    [values[j], values[j + 1]] =
    [values[j + 1], values[j]];

    grid.swap(j, j + 1);

    swapped = true;
}
        }

        grid.eliminateArray(range(j,values.length-1))
        // grid.setHold(n - i - 1);

        if(!swapped){
            break;
        }
    }

    await grid.removeClass();

    return values;
}



    bubble_button.addEventListener("click", async () => {
        bubble_button.disabled = true;
        await bubbleSort(bubbleGrid, bubbleValues)
    .then(() => {
        bubbleGrid.clear();
        bubbleGrid.setArray([5,1,4,2,8])
    });
        bubble_p.innerHTML = ``;
        bubble_button.disabled = false;
    })



    const values1 = [1, 4, 2, 5, 3];

const grid1 = new GridPlane("grid-sll-traversal", {
    size: 80,
    itemSize: 40,
    time: 500
});

const links = [
    [0,1],
    [1,2],
    [2,3],
    [3,4]
];

grid1.setArray(values1);
grid1.setLines(links);

async function traverse(arr){

    for(let i = 0; i < arr.length; i++){

        sll_traversal_p.innerHTML =
            `Current Node : ${arr[i]}`;

        await Promise.all([
        grid1.setActive([i]),
        i < links.length
            ? grid1.setActiveLine([links[i]])
            : Promise.resolve()
    ]);
    }

    sll_traversal_p.innerHTML = "Reached NULL";
}

sll_traversal_button.addEventListener("click", async () => {

    sll_traversal_button.disabled = true;

    await traverse(values1);

    sll_traversal_p.innerHTML =
        "Click to traverse";

    sll_traversal_button.disabled = false;

});
    


// const selectionValues = [5, 1, 4, 2, 8];

// const selectionGrid = new GridPlane("grid-selection-sort", {
//     size: 50,
//     itemSize: 40,
//     time: 3000
// });

// selectionGrid.setArray(selectionValues);

// async function selectionSort(grid, values){

//     const n = values.length;

//     for(let i = 0; i < n - 1; i++){

//         let min = i;
//         grid.checkChange({min});

//         for(let j = i + 1; j < n; j++){

//             await grid.setActive([min, j]);

//             if(values[j] < values[min]){
//                 min = j;
//                 // await grid.setActive([j])
//                 grid.checkChange({min});
//             }
//         }

//         if(min !== i){

//             [values[i], values[min]] =
//             [values[min], values[i]];

//             grid.swap(i, min);
//         }

//         grid.eliminateArray([i]);
//     }

//     grid.setHold(n - 1);

//     await grid.removeClass();

//     return values;
// }



// selection_button.addEventListener("click", async () => {
//         selection_button.disabled = true;
//         await selectionSort(selectionGrid, selectionValues)
// .then(() => {
//     selectionGrid.clear();
//     selectionGrid.setArray([5,1,4,2,8]);
// });
//         selection_p.innerHTML = ``;
//         selection_button.disabled = false;
//     })

// const insertionValues = [5, 1, 4, 2, 8];

// const insertionGrid = new GridPlane("grid-insertion-sort", {
//     size: 50,
//     itemSize: 40,
//     time: 3000
// });

// insertionGrid.setArray(insertionValues);

// async function insertionSort(grid, values){

//     const n = values.length;

//     // grid.setHold(0);

//     for(let i = 1; i < n; i++){

//         for(let j = i; j > 0; j--){
//             grid.checkChange({j})

//              await grid.eliminateArray([j - 1, j]);

//             if(values[j] < values[j - 1]){

//                 [values[j], values[j - 1]] =
//                 [values[j - 1], values[j]];

//                 grid.swap(j, j - 1);
//             }
//             else{
//                 break;
//             }
//         }

//         // for(let k = 0; k <= i; k++){
//         //     grid.setHold(k);
//         // }
//     }

//     await grid.removeClass();

//     return values;
// }



// insertion_button.addEventListener("click", async () => {
//         insertion_button.disabled = true;
//         await insertionSort(insertionGrid, insertionValues)
// .then(() => {
//     insertionGrid.clear();
//     insertionGrid.setArray([5,1,4,2,8]);
// });
//         insertion_p.innerHTML = ``;
//         insertion_button.disabled = false;
//     })

