 const sll_traversal_button = document.getElementById("sll-traversal-button");
    // const sll_traversal_p = document.getElementById("sll-traversal-p");
 const tree = Array.from({ length: 7 }, (_, i) => i);;


const grid1 = new GridPlane("grid-sll-traversal", {
    size: 40,
    itemSize: 30,
    time: 500
});

// function findNode(i){
//     let I = i + 1;
//     let row = Math.floor(Math.log2(I))

//     let no = Math.pow(2, row)
//     let half = no*2
//     let col = Math.floor(rows / half)
//     let cross = Math.pow(2, span - row)
     
//     let index = I % no
//     let c = col + index*cross
//     console.log(I,no,half,col,i,index,rows,cross,row,c,span)

//     return [row,c]
// }
// for(let i=0;i<tree.length;i++){
//     let [a,b] = findNode(i);
//     console.log(a,b)
//     matrix[a][b] = tree[i]
// }
// const links = []
// for(let i=0; i<2**(span-1)-1;i++){
//     let [a1,b1] = findNode(i);
//     let [a2,b2] = findNode(2*i+1);
//     let [a3,b3] = findNode(2*i+2);
//     console.log(a1,b1,a2,b2)
//     console.log(a1,b1,a3,b3)
//     links.push([[a1,b1],[a2,b2]])
//     links.push([[a1,b1],[a3,b3]])
// }



console.log(grid1.buildBinaryTree(tree))
// const links = [
//     [[0,1],[1,0]],
//     [[0,1],[1,2]]
// ];

// grid1.setArray(matrix);
// grid1.setLines(links);


async function traverse(arr){

    for(let i = 0; i < arr.length; i++){

        // sll_traversal_p.innerHTML =
        //     `Current Node : ${arr[i]}`;
        await grid1.setActive([i])
//         await Promise.all([
//     grid1.setActive([i]),
//     i < links.length
//         ? grid1.setActiveLine([links[i]])
//         : Promise.resolve()
// ]);

// if (i < links.length) {
//     grid1.removeLines([links[i]]);
// }
    }

    // sll_traversal_p.innerHTML = "Reached NULL";
}

sll_traversal_button.addEventListener("click", async () => {

    sll_traversal_button.disabled = true;

    await traverse(tree);

    grid1.setLines(links);
    // sll_traversal_p.innerHTML =
    //     "Click to traverse";

    sll_traversal_button.disabled = false;

});

//  const sll_traversal_button = document.getElementById("sll-traversal-button");
//     const sll_traversal_p = document.getElementById("sll-traversal-p");
//  const values1 = [1, 4, 2, 5, 3];

// const grid1 = new GridPlane("grid-sll-traversal", {
//     size: 80,
//     itemSize: 40,
//     time: 500
// });

// const links = [
//     [0,1],
//     [1,2],
//     [2,3],
//     [3,4]
// ];

// grid1.setArray(values1);
// grid1.setLines(links);

// async function traverse(arr){

//     for(let i = 0; i < arr.length; i++){

//         sll_traversal_p.innerHTML =
//             `Current Node : ${arr[i]}`;

//         await Promise.all([
//     grid1.setActive([i]),
//     i < links.length
//         ? grid1.setActiveLine([links[i]])
//         : Promise.resolve()
// ]);

// if (i < links.length) {
//     grid1.removeLines([links[i]]);
// }
//     }

//     sll_traversal_p.innerHTML = "Reached NULL";
// }

// sll_traversal_button.addEventListener("click", async () => {

//     sll_traversal_button.disabled = true;

//     await traverse(values1);

//     grid1.setLines(links);
//     sll_traversal_p.innerHTML =
//         "Click to traverse";

//     sll_traversal_button.disabled = false;

// });