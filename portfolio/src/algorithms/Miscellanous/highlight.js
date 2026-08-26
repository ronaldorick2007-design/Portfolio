import { SinglyLinkedList } from "../../data_structures/SinglyLinkedList";
export default function* highlight(n=4,result =1) {
    
    // const sll = new SinglyLinkedList();
    //     yield [
    //         {action:"set", index : sll, type:'L', name:"sll"},
    //         {action:"log", index:["Initialized singly linked list"]}
    //     ];
    
    //     for(let i=0;i<5;i++){
    //         sll.add(i);
    //         yield [
    //         {action:"rearr", index : [], name:"sll"},
    //         {action:"log", index:[`Adding new node ${i}`]}
    //     ];
    //     }
    
    // let curr = sll.head;
    // yield [
    //         { action: "set",type:"P", index:{name:"curr",item:curr}, name: "curr" },
    //     ];
    // while(curr.next != null){
    //     curr = curr.next;
    // yield [
    //         { action: "rearr",index:curr, name: "curr" },
    //     ];
    // }
    

    // let b = 1;
    // yield [
    //         { action: "set",type:"P", index:{name:"b",item:b}, name: "b" },
    //     ];

    // let c = b;
    // yield [
    //         { action: "set",type:"P", index:{name:"c",item:c}, name: "c" },
    //     ];
    // const id = Math.floor(Math.random() * 10000)
    // const id = crypto.randomUUID();
    console.log(n);
    
    
    if (n === 0) return;

    result = n;
    yield [
            { action: "set",type:"P", index:{name:"result",item:result}, name: "result",scope:`${n}` },
        ];
    const arr = Array.from({ length: result }, (_, i) => i+1);

    yield [
            { action: "set",type:"A", index:arr, name: "arr",scope:`${n}` },
        ];
    
        // if(result%3==0){
        //     yield [
        //     { action: "swap", index:{1:0,0:1}, name: `${n}` },
        // ];
        // [arr[0], arr[0+1]] = [arr[0+1], arr[0]];
        // yield [
        //     { action: "rearrange", index:{1:0,0:1}, name: `${n}` },
        // ];
        // }
    
    // yield result;

    yield* highlight(n - 1, result);
    yield [
            { action: "clear", index:arr,name:"arr", scope: `${n}` },
            { action: "clear", index:arr,name:"result", scope: `${n}` }
        ];
}