import { Node } from "../../data_structures/Node";
import { SinglyLinkedList } from "../../data_structures/SinglyLinkedList";
// class box{
//     constructor(d){
//         this.size = d;
//         this.next = null;
//     }

//     toString(){
//         return `box`
//     }
// }

// class LinkedList{
//     constructor(){
//         this.head = new box(1);
//         this.tail = this.head;
//     }

//     add(data){
//         this.tail.next = new box(data);
//         this.tail = this.tail.next
//     }

//     toDisplay(){
//         let temp = []
//         let curr = this.head;
//         while(curr != null){
//             // console.log(c)
//             temp.push(curr);
//             curr = curr.next;
//         }
//         // console.log("from dis", temp)
//         return ["Array",temp];
//     }
// }
export default function* main(){
yield {scope:"main",set:"F"}
let a = 1
yield {"name":"a", "value":a, status:"white",scope:"main",set:"N"}
let b = 1
yield {"name":"b", "value":b, status:"white",scope:"main",set:"N"}

}