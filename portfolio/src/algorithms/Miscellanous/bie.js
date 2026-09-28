export default function* main(){
    yield [
            { action: "set",type:"F",scope:`heap`}
        ];
    yield [
            { action: "set",type:"F",scope:`main`}
        ];

    // let a = 1
    // yield [
    //         { action: "set",type:"P", index:a, name: "a",scope:`main` }
    //     ]; 

    // let b = yield* new Node1(10);
    // yield [
    //         { action: "set",type:"P", index:b, name: "b",scope:`main` }
    //     ]; 

    // let c = yield* new LL();
    // yield [
    //         { action: "set",type:"L", index:c, name: "c",scope:`main` }
    //     ]; 


    // yield* c.add(10);
    // yield [{ action: "rearrange", index: [], name: "c",scope:`main` },
    //         { action: "rearrange", index: [], name: c.class_name,scope:`heap` }]
    // yield* c.add(20);
    // yield [{ action: "rearrange", index: [], name: "c",scope:`main` },
    //         { action: "rearrange", index: [], name: c.class_name,scope:`heap` }]
    
    // yield { action: "rearrange", index: [], name: "c",scope:`main` }

    let ll1 = yield* new LL();
    let ll2 = yield* new LL();
    let ll3 = yield* new LL();
    let ll4 = yield* new LL();

    let node1 = yield* new Node(ll1);
    yield [
            { action: "set",type:"N", index:node1, name: "node1",scope:`main` }
        ];
    let node2 = yield* new Node(ll2);
    yield [
            { action: "set",type:"N", index:node2, name: "node2",scope:`main` }
        ];
    let node3 = yield* new Node(ll3);
    yield [
            { action: "set",type:"N", index:node3, name: "node3",scope:`main` }
        ];
    let node4 = yield* new Node(ll4);
    yield [
            { action: "set",type:"N", index:node4, name: "node4",scope:`main` }
        ];

    node1.left = node2;
    yield { action: "rearrange", index: [], name: "node1",scope:`main` }
    node1.right = node3;
    yield { action: "rearrange", index: [], name: "node1",scope:`main` }
    node2.left = node4;
    yield { action: "rearrange", index: [], name: "node2",scope:`main` }

    yield [
        {action:"set",type:"T",index:node1,name:"root", scope:"main"},
        {action:"log", index:["Initialized tree"]}
    ]

    yield [
        {action:"indicate",index:[node1,"active"]},
    ]





}












class Node{
    static #counter = 0;
    constructor(data){
        this.data = data;
        this.right = null;
        this.left = null;

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

class Node1{
    static #counter = 0;
    constructor(d){
        this.size = d;
        this.next = null;

        this.id = ++Node1.#counter;
        this.class_name = `Node1#${this.id}`
        return (function* (instance) {
            yield [
            { action: "set",type:"P", index:instance, name: instance.class_name,scope:`heap` }
        ];
            return instance;
        })(this);
    }

    toString(){
        return `${this.size}`
    }

}

class LL{
    static #counter = 0;
    constructor(){
        this.head = null;
        this.tail = null;

        this.id = ++LL.#counter;
        this.class_name = `LinkedList#${this.id}`
        return (function* (instance) {
            yield [
            { action: "set",type:"L", index:instance, name: instance.class_name,scope:`heap` }
        ];
            return instance;
        })(this);
    }

    *add(d){
        if(this.head == null){
            this.head = this.tail = yield* new Node1(d);
        }
        else{
            this.tail.next = yield* new Node1(d);
            this.tail = this.tail.next;
        }
    }

    toString(){
        return `LL#${this.id}`
    }

}