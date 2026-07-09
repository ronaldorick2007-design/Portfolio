class Grid{
    constructor(divElement,{cols=0, time=500, size = 36}={}){
        let space = document.getElementById(divElement);
        this.gridSpace = document.createElement("div");
        space.append(this.gridSpace);

        this.gridSpace.className = "dotGrid";
        this.gridArray = [];
        this.is2D = false;
        
        this.time = time;
        this.cols = cols;
        this.size = size;

        this.states = {}
    }

    createDot(){
        let dot = document.createElement("div");
        dot.className = "dot";
        dot.style.setProperty("--size", `${this.size}px`)
        if(this.time < 250){
            dot.style.setProperty("--time", `${this.time}ms`)
        }
        else{
            dot.style.setProperty("--time", "250ms")
        }
        this.gridSpace.append(dot);
        dot.hold = false;
        return dot
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
                        let dot = this.createDot();
                        dot.textContent = `${array[i][j]}`;
                        dots[j] = dot;
                }
                this.gridArray[i] = dots;
            }
        }else if(this.cols != 0){
            console.log(this.cols,"from if else");
            this.gridSpace.style.gridTemplateColumns = `repeat(${this.cols},1fr)`;
            for (let i = 0; i < array.length; i++) {            
                let dot = this.createDot();
                dot.textContent = `${array[i]}`;

                this.gridArray[i] = dot
            } 
        }
        else{
            console.log(this.cols,"from else");
            this.gridSpace.style.gridTemplateColumns = `repeat(${array.length},1fr)`;
            for (let i = 0; i < array.length; i++) {            
                let dot = this.createDot();
                dot.textContent = `${array[i]}`;

                this.gridArray[i] = dot
            }
        }
    }

    sleep(ms){
        return new Promise(resolve=>setTimeout(resolve,ms));
    }

}
// const gie = new Grid("linear");
// gie.setArray([1,2,3,4,5]);
// gie.setActive(3);
// gie.setMatch(1);

