import { Stack } from "../../data_structures/Stack";

export default function* stack_push(){
    const sll = new Stack()
    yield [
        {action:"set", index : sll},
        {action:"log", index:["Initialized singly linked list"]}
    ];

    for(let i=0;i<5;i++){
        sll.push(i);
        yield [
        {action:"rearr", index : []},
        {action:"log", index:[`Adding new node ${i}`]}
    ];
    }

    for(let i=0;i<5;i++){
        sll.pop();
        yield [
        {action:"rearr", index : []},
        {action:"log", index:[`Popped node ${i}`]}
    ];
    }

    

}