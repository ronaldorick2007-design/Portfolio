import { Queue } from "../../data_structures/Queue";

export default function* queue_basic(){
    const queue = new Queue()
    yield [
        {action:"set", index : queue, type:'L', name:"queue"},
        {action:"log", index:["Initialized Stack"]}
    ];

    for(let i=0;i<5;i++){
        queue.enqueue(i);
       yield [
        {action:"rearr", index : [], name:"queue"},
        // {action:"indicate", index : {[stack.head] : "active"}},
        {action:"log", index:[`enqueued new value ${i}`]}
        ]; 
    }

    for(let i=0;i<5;i++){
        queue.dequeue();
       yield [
        {action:"rearr", index : [], name:"queue"},
        // {action:"indicate", index : {[stack.head] : "active"}},
        {action:"log", index:[`dequeued new value ${i}`]}
        ]; 
    }
}