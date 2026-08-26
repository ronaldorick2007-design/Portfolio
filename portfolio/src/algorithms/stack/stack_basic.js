import { Stack } from "../../data_structures/Stack";
 
export default function* stack_basic(){
    const stack = new Stack()
    yield [
        {action:"set", index : stack, type:'L', name:"stack"},
        {action:"log", index:["Initialized Stack"]}
    ];

    for(let i=0;i<5;i++){
        stack.push(i);
        
        yield [
        {action:"rearr", index : [], name:"stack"},
        {action:"indicate", index : {[stack.head] : "active"}, name:"stack"},
        {action:"log", index:[`pushed new value ${i}`]}
    ];
    }

    for(let i=0;i<5;i++){
        stack.pop();
        yield [
        {action:"rearr", index : [], name:"stack"},
        {action:"indicate", index : {[stack.head] : "active"}, name:"stack"},
        {action:"log", index:[`Popped value ${4-i}`]}
    ];
    }

    

}