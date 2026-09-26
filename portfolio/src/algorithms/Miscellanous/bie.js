class Node{
    static #counter = 0;
    constructor(d){
        this.size = d;
        this.next = null;

        this.id = ++Node.#counter;
        this.class_name = `Node#${this.id}`
        return (function* (instance) {
            yield {"name":instance.toDisplay(), "value":instance,scope:"heap",action:"set",type:"H"}
            return instance;
        })(this);
    }

    toString(){
        return `${this.size}`
    }

    toDisplay(){
        return `Node#${this.id}`
    }
}

class LinkedList{

    static #counter = 0;
    constructor(){
        this.head = null;
        this.tail = null;

        this.id = ++LinkedList.#counter;
        this.class_name = `LinkedList#${this.id}`
        return (function* (instance) {
            yield {"name":instance.toDisplay(), "value":instance,scope:"heap",action:"set",type:"H"
            }
            return instance;
        })(this);
    }

    *add(value){
        const newNode = yield* new Node(value);

        // If list is empty, new node is both head and tail
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        // Link to the current tail and advance the tail pointer
        this.tail.next = newNode;
        this.tail = this.tail.next;
    }

    toString() {
        console.log("from toString() LinkedList");
        const result = [];
        let curr = this.head;

        while (curr != null) {
            result.push(curr.toDisplay());
            curr = curr.next;
        }
        return [result,"array"];
    }

    toDisplay(){
        return `LinkedList#${this.id}`
    }
}

export default function* main(){
    yield {scope:"main",action:"set",type:"F"}

    let sll = yield* new LinkedList();
    yield {"name":"sll", "value":sll.toDisplay(), scope:"main", action:"set", type:"L"}

    // let sll = yield* new LinkedList();
    // yield {"name":"sll", "value":sll.class_name, scope:"main", action:"set", type:"L"}'

    yield* sll.add(10);
    yield {"name":"sll", "value":sll.toDisplay(),scope:"main",type:"L"}
    yield* sll.add(15);
    yield {"name":"sll", "value":sll.toDisplay(),scope:"main",type:"L"}
    yield* sll.add(20);
    yield {"name":"sll", "value":sll.toDisplay(),scope:"main",type:"L"}
    yield* sll.add(25);
    yield {"name":"sll", "value":sll.toDisplay(),scope:"main",type:"L"}
     sll.tail.size = 10;
    yield {"name":"sll", "value":sll.toDisplay(),scope:"main",type:"L"}
    yield* sll.add(30);
    yield {"name":"sll", "value":sll.toDisplay(),scope:"main",type:"L"}

    let h = sll.head;
    yield {"name":"h", "value":h, status:"white",action:"point",scope:"main"}
    // 
    while(h!=null){
        yield {"name":"h", "value":h, status:"white",action:"point",scope:"main"}
        h = h.next;    
    }

    let arr = [[1,2,3],[4,5,6],[7,8,9]]
    
}