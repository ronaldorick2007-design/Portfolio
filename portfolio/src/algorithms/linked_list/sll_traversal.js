import { SinglyLinkedList } from "../../data_structures/SinglyLinkedList"

export default function* sll_traversal(){
    const sll = new SinglyLinkedList();
    yield [
        {action:"set", index : sll},
        {action:"log", index:["Initialized singly linked list"]}
    ];

    for(let i=0;i<10;i++){
        sll.add(i);
        yield [
        {action:"rearr", index : []},
        {action:"log", index:[`Adding new node ${i}`]}
    ];
    }

    // let curr = sll.head;
    // while(curr != null){
    //     yield [{action:"indicate", index : {[curr] : "active"}},];
    //     curr = curr.next;
    // }

    for(let i=0;i<5;i++){
        sll.pop();
        yield [
        {action:"rearr", index : []},
        {action:"log", index:[`Popped node ${i}`]}
    ];
    }

    

}