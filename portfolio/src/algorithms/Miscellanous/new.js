import {SinglyLinkedList} from "../../data_structures/SinglyLinkedList"

export default function* main() {
yield { action: "set", type: "F", scope: "main" };
    let sll = new SinglyLinkedList();
yield { action: "set", index: sll, name: "sll", type: 'L', scope: "main" };

    sll.add(0);
yield { action: "rearrange", index: sll, name: "sll", scope: "main" };
    sll.add(1);
yield { action: "rearrange", index: sll, name: "sll", scope: "main" };
    sll.add(2);
yield { action: "rearrange", index: sll, name: "sll", scope: "main" };

    let curr = sll.head;
yield { action: "set", index: curr, name: "curr", type: "P", scope: "main" };
yield { action: "indicate", index: [{ curr: "active" }], scope: "main" };
    while(curr!=null){
        curr = curr.next;
yield { action: "rearrange", index: curr, name: "curr", scope: "main" };
yield { action: "indicate", index: [curr, "active"], scope: "main" };
    }
yield { action: "clear", index: [], scope: "main" };
}