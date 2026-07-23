 
 const sll_traversal_button = document.getElementById("sll-traversal-button");
    const sll_traversal_p = document.getElementById("sll-traversal-p");
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

if (i < links.length) {
    grid1.removeLines([links[i]]);
}
    }

    sll_traversal_p.innerHTML = "Reached NULL";
}

sll_traversal_button.addEventListener("click", async () => {

    sll_traversal_button.disabled = true;

    await traverse(values1);

    grid1.setLines(links);
    sll_traversal_p.innerHTML =
        "Click to traverse";

    sll_traversal_button.disabled = false;

});