class GridPlane {
    constructor(divElement, {size = 50, itemSize = 40, time = 500, grid_item = "grid-item"} = {}){
        this.space = document.getElementById(divElement);

        this.size = size;
        this.itemSize = itemSize;
        this.time = time;
        this.states = {};

        this.points = [];
        this.lines = new Map();
        this.grid_item = grid_item;

        this.screen = document.createElement("div");
        this.screen.className = "grid-screen";

        this.space.style.display = "flex";
        this.space.style.justifyContent = "center";
        this.space.style.alignItems = "center";
        this.space.style.overflow = "hidden";

        this.space.append(this.screen);
    }

    createItem(x, y, value = "") {
        const item = document.createElement("div");

        item.className = this.grid_item;
        item.textContent = value;

        item.style.width = `${this.itemSize}px`;
        item.style.height = `${this.itemSize}px`;

        item.style.left = `${x * this.size}px`;
        item.style.top = `${y * this.size}px`;

        this.screen.append(item);

    const point = {
        index: this.points.length,
        x,
        y,
        value,
        item
    };

    this.points.push(point);

    return point;
}

    setScreenSize() {
        let maxX = 0;
        let maxY = 0;

        for (const point of this.points) {
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        }

        this.screen.style.width =
            `${maxX * this.size + this.itemSize}px`;

        this.screen.style.height =
            `${maxY * this.size + this.itemSize}px`;
    }

    setArray(array) {
        this.is2D = Array.isArray(array[0]);

        if (this.is2D) {
            this.pointGrid = [];

            array.forEach((row, y) => {
                this.pointGrid[y] = [];

                row.forEach((value, x) => {
                    if(value == null) return;
                    const point = this.createItem(x, y, value);
                    this.pointGrid[y][x] = point;
                });
            });
        } else {
            array.forEach((value, x) => {
                
                this.createItem(x, 0, value);
            });
        }

        console.log(this.points)

        this.setScreenSize();
    }

    clear(){

    // Remove every point from the DOM
    this.points.forEach(point => {
        point.item.remove();
    });

    // Remove every line from the DOM (if you have lines)
    this.lines?.forEach(line => {
        line.item.remove();
    });

    // Reset all internal arrays
    this.points = [];
    this.pointGrid = [];
    this.lines = [];

    // Optional: reset cached states
    this.rows = 0;
    this.cols = 0;
    this.is2D = false;
}

    getPoint(index) {
        if (Array.isArray(index)) {
            const [y, x] = index;
            return this.pointGrid[y][x];
        }

        return this.points[index];
    }

    sleep(ms) {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }

    async setActive(indices) {
        const points = indices.map(index => this.getPoint(index));

        points.forEach(point =>
            point.item.classList.add("active")
        );
        await this.sleep(this.time);
        points.forEach(point =>
            point.item.classList.remove("active")
        );
    }

    async setMatch(index) {
        const point = this.getPoint(index);
        point.item.classList.add("match");
        await this.sleep(this.time * 2);
        point.item.classList.remove("match");
    }

    setHold(index) {
        const point = this.getPoint(index);
        point.item.classList.toggle("hold");
    }

    eliminateArray(indices) {
        indices.forEach(index => {
            const point = this.getPoint(index);
            point.item.classList.add("eliminate");
        });
    }

    checkChange(pair) {
        for (const [key, value] of Object.entries(pair)) {
            if (!(key in this.states)) {
                this.states[key] = value;
                this.getPoint(value).item.classList.add("hold");
                continue;
            }

            if (this.states[key] !== value) {
                this.getPoint(this.states[key]).item.classList.remove("hold");
                this.states[key] = value;
                this.getPoint(value).item.classList.add("hold");
            }
        }
    }

    async removeClass() {
        await this.sleep(this.time);
        this.states = {};

        this.points.forEach(point => {
            point.item.className = "grid-item";
        });
    }

    swap(index1, index2){

    const point1 = this.getPoint(index1);
    const point2 = this.getPoint(index2);

    [point1.value, point2.value] =
    [point2.value, point1.value];

    point1.item.textContent = point1.value;
    point2.item.textContent = point2.value;
}

    setLines(pairs) {

    pairs.forEach(([from, to]) => {

        const key =
            from < to
                ? `${from}-${to}`
                : `${to}-${from}`;

        // Already exists
        if (this.lines.has(key))
            return;

        const pointA = this.getPoint(from);
        const pointB = this.getPoint(to);

        const x1 = pointA.x * this.size + this.itemSize / 2;
        const y1 = pointA.y * this.size + this.itemSize / 2;

        const x2 = pointB.x * this.size + this.itemSize / 2;
        const y2 = pointB.y * this.size + this.itemSize / 2;

        const dx = x2 - x1;
        const dy = y2 - y1;

        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        const angle = Math.atan2(dy, dx);

        const line = document.createElement("div");

        line.className = "grid-line";

        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.width = `${distance}px`;
        line.style.rotate = `${angle}rad`;

        this.screen.prepend(line);

        this.lines.set(key, line);

    });

    return this.lines;
}
async setActiveLine(pairs) {

    for (const [from, to] of pairs) {

        const key =
            from < to
                ? `${from}-${to}`
                : `${to}-${from}`;

        const line = this.lines.get(key);

        if (!line)
            continue;

        line.classList.add("active");

        await this.sleep(this.time);

        line.classList.remove("active");
    }
}

removeLines(pairs = null) {

    // Remove all lines
    if (pairs === null) {

        for (const line of this.lines.values()) {
            line.remove();
        }

        this.lines.clear();
        return;
    }

    // Remove specific lines
    pairs.forEach(([from, to]) => {

        const key =
            from < to
                ? `${from}-${to}`
                : `${to}-${from}`;

        const line = this.lines.get(key);

        if (!line)
            return;

        line.remove();
        this.lines.delete(key);

    });

}

findNode(i,rows,span){
    let I = i + 1;
    let row = Math.floor(Math.log2(I))

    let no = Math.pow(2, row)
    let half = no*2
    let col = Math.floor(rows / half)
    let cross = Math.pow(2, span - row)
     
    let index = I % no
    let c = col + index*cross
    console.log(I,no,half,col,i,index,rows,cross,row,c,span)

    return [row,c]
}
buildBinaryTree(tree){

    const span = Math.floor(Math.log2(tree.length)) + 1
 const rows = 2**span - 1
    const matrix = Array.from({ length: span }, () => Array(rows).fill(null));
for(let i=0;i<tree.length;i++){
    let [a,b] = this.findNode(i,rows,span);
    console.log(a,b)
    matrix[a][b] = tree[i]
}
this.setArray(matrix)

const links = []
for(let i=0; i<2**(span-1)-1;i++){
    let [a1,b1] = this.findNode(i,rows,span);
    let [a2,b2] = this.findNode(2*i+1,rows,span);
    let [a3,b3] = this.findNode(2*i+2,rows,span);
    
    console.log(a1,b1,a2,b2)
    console.log(a1,b1,a3,b3)
    links.push([[a1,b1],[a2,b2]])
    links.push([[a1,b1],[a3,b3]])
}
this.setLines(links)


}


    












    createCircle(radius) {


}


    












    createCircle(radius) {
        const used = new Set();

        const centerX = radius;
        const centerY = radius;

        const steps = Math.ceil(2 * Math.PI * radius * 4);

        for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            const x = Math.round(centerX + Math.cos(angle) * radius);
            const y = Math.round(centerY + Math.sin(angle) * radius);

            const key = `${x},${y}`;

            if (used.has(key)) {
                continue;
            }

            used.add(key);
            this.createItem(x, y);
        }
        this.setScreenSize();

        return this.points;
    }

    createFilledCircle(radius) {
        const centerX = radius;
        const centerY = radius;

        for (let y = 0; y <= radius * 2; y++) {
            for (let x = 0; x <= radius * 2; x++) {
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx ** 2 + dy ** 2);

                if (distance <= radius) {
                    this.createItem(x, y);
                }
            }
        }
        this.setScreenSize();

        return this.points;
    }



}

class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}