import { DoublyLinkedList } from "../../data_structures/DoublyLinkedList";

export default function* dll_traversal(){
    const dll = new DoublyLinkedList();
    yield [
        {action:"set", index : dll},
        {action:"log", index:["Initialized doubly linked list"]}
    ];

    for(let i=0;i<5;i++){
        dll.add(i);
        yield [
        {action:"rearr", index : []},
        {action:"log", index:[`Adding new node ${i}`]}
    ];
    }

    for(let i=0;i<5;i++){
        dll.pop();
        yield [
        {action:"rearr", index : []},
        {action:"log", index:[`Popped node ${i}`]}
    ];
    }   

}