class Grid{
    constructor(divElement,cols=0, time=500){
        let space = document.getElementById(divElement);
        this.gridSpace = document.createElement("div");
        space.append(this.gridSpace);

        this.gridSpace.className = "dotGrid";
        this.gridArray = [];
        this.is2D = false;
        this.time = time;
        this.cols = cols;

        console.log(cols)
    }


}

// const gie = new Grid("linear");
// gie.setArray([1,2,3,4,5]);
// gie.setActive(3);
// gie.setMatch(1);

