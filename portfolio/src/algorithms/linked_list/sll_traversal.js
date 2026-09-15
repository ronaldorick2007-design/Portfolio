import { SinglyLinkedList } from "../../data_structures/SinglyLinkedList"

export default function* sll_traversal(){
    const sll = new SinglyLinkedList();
    yield [
        {action:"set", index : sll, type:'L', name:"sll"},
        {action:"log", index:["Initialized singly linked list"]}
    ];

    for(let i=0;i<5;i++){
        sll.add(i);
        yield [
        {action:"rearrange", index : [], name:"sll"},
        {action:"log", index:[`Adding new node ${i}`]}
    ];
    }

    for(let i=0;i<5;i++){
        sll.pop();
        yield [
        {action:"rearrange", index : [], name:"sll"},
        {action:"log", index:[`Popped node ${i}`]}
    ];
    }

    

}