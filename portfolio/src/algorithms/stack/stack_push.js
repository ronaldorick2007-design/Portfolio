import { Stack } from "../../data_structures/Stack";
 
export default function* stack_push(){
    const sll = new Stack()
    yield [
        {action:"set", index : sll},
        {action:"log", index:["Initialized Stack"]}
    ];

    for(let i=0;i<5;i++){
        sll.push(i);
        
        yield [
        {action:"rearr", index : []},
        {action:"indicate", index : {[sll.head] : "active"}},
        {action:"log", index:[`pushing new value ${i}`]}
    ];
    }

    for(let i=0;i<5;i++){
        sll.pop();
        yield [
        {action:"rearr", index : []},
        {action:"indicate", index : {[sll.head] : "active"}},
        {action:"log", index:[`Popped value ${i}`]}
    ];
    }

    

}