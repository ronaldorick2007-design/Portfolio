class Grid{
    constructor(divElement,{cols=0, time=500, size = 36, dotClass="dot"}={}){
        let space = document.getElementById(divElement);
        this.gridSpace = document.createElement("div");
        space.append(this.gridSpace);

        this.gridSpace.className = "dotGrid";
        this.gridArray = [];
        this.is2D = false;
        
        this.time = time;
        this.cols = cols;
        this.size = size;
        this.dotClass = dotClass;

        this.states = {}
    }

    createDot(){
        let dot = document.createElement("div");
        dot.className = this.dotClass;
        dot.style.setProperty("--size", `${this.size}px`)
        dot.hold = false;
        if(this.time < 250){
            dot.style.setProperty("--time", `${this.time}ms`)
        }
        else{
            dot.style.setProperty("--time", "250ms")
        }
        this.gridSpace.append(dot);
        
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

    async setActive(items){

        const elements = items.map(item =>
            this.is2D
                ? this.gridArray[item[0]][item[1]]
                : this.gridArray[item]
        );

        elements.forEach(el => {
            el.classList.remove("hold", "eliminate");
            el.classList.add("active");
        });

        await this.sleep(this.time);

        elements.forEach(el =>
            el.classList.remove("active")
        );
    }

    async setMatch(i,j){
        if(this.is2D){
            this.gridArray[i][j].classList.remove("hold","eliminate");
            this.gridArray[i][j].classList.add("match");
            await this.sleep(this.time*2);
            this.gridArray[i][j].classList.remove("match");
        }else{
            this.gridArray[i].classList.remove("hold","eliminate");
            this.gridArray[i].classList.add("match");
            await this.sleep(this.time*2);
            this.gridArray[i].classList.remove("match");
        }
    }

    setHold({i,j}){
        if(this.is2D){
            if(this.gridArray[i][j].hold == false){
                this.gridArray[i][j].classList.add("hold");
                this.gridArray[i][j].hold = true;
            }else{
                this.gridArray[i][j].classList.remove("hold");
                this.gridArray[i][j].hold = false;
            }
        }else{
            if(this.gridArray[i].hold == false){
                this.gridArray[i].classList.add("hold");
                this.gridArray[i].hold = true;
            }else{
                this.gridArray[i].classList.remove("hold");
                this.gridArray[i].hold = false;
            }
        }
    }

    async removeClass(){
        await this.sleep(this.time);
        for(const [key, value] of Object.entries(this.states)){
            this.gridArray[value].classList.remove("hold");
        }
        this.states = {}
        this.gridArray.forEach(dot => {
            dot.classList.remove(...dot.classList);
            dot.classList.add("dot");
        });
    }
    checkChange(pair){
        for(const [key, value] of Object.entries(pair)){
        if(!(key in this.states)){
            this.states[key] = value;
            this.gridArray[value].classList.add("hold");
        }
        else if(this.states[key] !== value){
            console.log("different value",key,"from",this.states[key],"to",value);
            this.gridArray[this.states[key]].classList.remove("hold");
            this.states[key] = value;
            this.gridArray[value].classList.add("hold");
        }
    }
    }

    eliminateArray(arr){
        arr.forEach(element => {
            this.gridArray[element].classList.add("eliminate");
        });
    }
}

// const gie = new Grid("linear");
// gie.setArray([1,2,3,4,5]);
// gie.setActive(3);
// gie.setMatch(1);

