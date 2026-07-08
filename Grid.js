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

    setArray(array){
        if(array[0].length != null){
            this.cols = array[0].length;
            this.is2D = true;
            console.log(this.cols ,"from if");
            this.gridSpace.style.gridTemplateColumns = `repeat(${this.cols},1fr)`;
            for (let i = 0; i < array.length; i++) {    
                let dots=[]        
                for(let j=0; j<this.cols;j++){
                        const dot = document.createElement("div");
                        dot.className = "dot";
                        this.gridSpace.append(dot);
                        dot.hold = false;
                        dot.textContent = `${array[i][j]}`;
                        
                        dots[j] = dot;
                }
                this.gridArray[i] = dots;
            }
        }
        else{
            console.log(this.cols,"from else");
            this.gridSpace.style.gridTemplateColumns = `repeat(${array.length},1fr)`;
            for (let i = 0; i < array.length; i++) {            
                const dot = document.createElement("div");
                dot.className = "dot";
                this.gridSpace.append(dot);
                dot.hold = false;
                dot.textContent = `${array[i]}`;

                this.gridArray[i] = dot
            }
        }
    }


}

// const gie = new Grid("linear");
// gie.setArray([1,2,3,4,5]);
// gie.setActive(3);
// gie.setMatch(1);

