export default function* main(){
    yield [
            { action: "set",type:"F",scope:`heap`}
        ];
    yield [
            { action: "set",type:"F",scope:`main`}
        ];
    
    let queue = yield* new Queue();
    console.log(queue)
    yield [
            { action: "set",type:"L", index:queue, name: "queue",scope:`main`,disp:queue.toDisplay }
        ];

    yield* queue.enqueue("Alice");
    yield { action: "rearrange", index: [], name: "queue",scope:`main` }
    yield* queue.enqueue("Bob");
    yield { action: "rearrange", index: [], name: "queue",scope:`main` }
    queue.dequeue();
    yield { action: "rearrange", index: [], name: "queue",scope:`main` }
    yield* queue.enqueue("Charlie");
    yield [{ action: "rearrange", index: [], name: "queue",scope:`main` },{ action: "rearrange", index: [], name: queue.class_name,scope:`heap` }]

    yield [
        // {action:"indicate", index : [stack.head, "active"], name:"stack"}
        {action:"indicate",index:[queue.head,"active"]},
    ]

}

class Queue{
    static #counter = 0
    constructor(){
        this.head = null
        this.tail = null

        this.id = ++Queue.#counter;
        this.class_name = `Queue#${this.id}`
        return (function* (instance) {
            yield [
            { action: "set",type:"L", index:instance, name: instance.class_name,scope:`heap`,disp:instance.toDisplay }
        ];
            return instance;
        })(this);
    }

    *enqueue(data){
        if(this.head === null){
            this.head = this.tail = yield* new Node(data);
        }
        else{
            this.tail.next = yield* new Node(data);
            this.tail = this.tail.next;
        }
    }

    dequeue(){
        if(this.head === null){
            return null
        }
        let temp = this.head.data;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        return temp;
    }

    peek(){
        if(this.head === null){
            return null
        }
        return this.head.data;
    }

    toString(){
        return `Queue${this.id}`
    } 
    
    toDisplay(t){
        let result = []
        let curr = t.head;
        while(curr!=null){
            result.push(curr);
            console.log("From bieC curr",curr)
            curr = curr.next;
        }
        console.log("From bieC",result)
        return result
    }
}

class Node{
    static #counter = 0;
    constructor(data){
        this.data = data;
        this.next = null;

        this.id = ++Node.#counter;
        this.class_name = `Node#${this.id}`
        return (function* (instance) {
            yield [
            { action: "set",type:"N", index:instance, name: instance.class_name,scope:`heap` }
        ];
            return instance;
        })(this);
    }

    toString(){
        return `${this.data}`
    }

    
}