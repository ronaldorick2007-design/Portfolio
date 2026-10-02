class Node {
  static counter = 0;

  constructor(data) {
    this.data = data;
    this.next = null;
  

    this.id = ++Node.counter;

    return (function* (instance) {

      yield {
        scope: "heap",
        name: instance.toString(),
        value: instance,
        type: "CLASS"
      };

      return instance;

    })(this);}

  *setNext(node) {
yield {
  type: "function-add",
  scope: this.toString() + ".setNext"
};
yield {
  scope: this.toString() + ".setNext",
  name: "node",
  value: node,
  type: "reference"
};
    this.next = node;


yield {
  scope: this.toString() + ".setNext",
  name: "this.next",
  value: this.next,
  type: "reference"
};
  
yield {
  type: "function-rm",
  scope: this.toString() + ".setNext"
};
  }


  toString() {
    return "Node#" + this.id;
  }
}

class LinkedList {
  static counter = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  

    this.id = ++LinkedList.counter;

    return (function* (instance) {

      yield {
        scope: "heap",
        name: instance.toString(),
        value: instance,
        type: "CLASS"
      };

      return instance;

    })(this);}

  *add(data) {
yield {
  type: "function-add",
  scope: this.toString() + ".add"
};
yield {
  scope: this.toString() + ".add",
  name: "data",
  value: data,
  type: "primitive"
};
    const node = yield* new Node(data);


yield {
  scope: this.toString() + ".add",
  name: "node",
  value: node,
  type: "reference"
};

    if (this.head === null) {
      this.head = node;


yield {
  scope: this.toString() + ".add",
  name: "this.head",
  value: this.head,
  type: "primitive"
};
      this.tail = node;


yield {
  scope: this.toString() + ".add",
  name: "this.tail",
  value: this.tail,
  type: "reference"
};
    } else {
      this.tail.next = node;


yield {
  scope: this.toString() + ".add",
  name: "this.tail",
  value: this.tail,
  type: "reference"
};
      this.tail = node;


yield {
  scope: this.toString() + ".add",
  name: "this.tail",
  value: this.tail,
  type: "reference"
};
    }

    
yield {
  type: "function-rm",
  scope: this.toString() + ".add"
};
return node;
  
  }

  *traverse() {
yield {
  type: "function-add",
  scope: this.toString() + ".traverse"
};
    let current = this.head;


yield {
  scope: this.toString() + ".traverse",
  name: "current",
  value: current,
  type: "primitive"
};

    while (current !== null) {
      current = current.next;
    }
  
yield {
  type: "function-rm",
  scope: this.toString() + ".traverse"
};
  }


  toString() {
    return "LinkedList#" + this.id;
  }
}

function* add(a, b) {
yield {
  type: "function-add",
  scope: "add"
};
yield {
  scope: "add",
  name: "a",
  value: a,
  type: "primitive"
};
yield {
  scope: "add",
  name: "b",
  value: b,
  type: "primitive"
};
  const result = a + b;


yield {
  scope: "add",
  name: "result",
  value: result,
  type: "primitive"
};
  
yield {
  type: "function-rm",
  scope: "add"
};
return result;

}

function* factorial(n, depth = 1) {
yield {
  type: "function-add",
  scope: "factorial" + depth
};
yield {
  scope: "factorial" + depth,
  name: "n",
  value: n,
  type: "primitive"
};
  if (n <= 1) {
    
yield {
  type: "function-rm",
  scope: "factorial" + depth
};
return 1;
  }

  
yield {
  type: "function-rm",
  scope: "factorial" + depth
};
return n * (yield* factorial(n - 1, depth + 1));

}

export function* main() {
yield {
  type: "function-add",
  scope: "main"
};
  const list = yield* new LinkedList();


yield {
  scope: "main",
  name: "list",
  value: list,
  type: "reference"
};

  const node1 = yield* list.add(10);


yield {
  scope: "main",
  name: "node1",
  value: node1,
  type: "primitive"
};
  const node2 = yield* list.add(20);


yield {
  scope: "main",
  name: "node2",
  value: node2,
  type: "primitive"
};

  yield* node1.setNext(node2);

  const numbers = [];


yield {
  scope: "main",
  name: "numbers",
  value: numbers,
  type: "array"
};

  numbers.push(10);


yield {
  scope: "main",
  name: "numbers",
  value: numbers,
  type: "array"
};
  numbers.push(20);


yield {
  scope: "main",
  name: "numbers",
  value: numbers,
  type: "array"
};

  const x = 5;


yield {
  scope: "main",
  name: "x",
  value: x,
  type: "primitive"
};
  const y = 10;


yield {
  scope: "main",
  name: "y",
  value: y,
  type: "primitive"
};

  const sum = yield* add(x, y);


yield {
  scope: "main",
  name: "sum",
  value: sum,
  type: "primitive"
};

  const fact = yield* factorial(5);


yield {
  scope: "main",
  name: "fact",
  value: fact,
  type: "primitive"
};

  function* double(value) {
yield {
  type: "function-add",
  scope: "double"
};
yield {
  scope: "double",
  name: "value",
  value: value,
  type: "primitive"
};
    const result = value * 2;


yield {
  scope: "double",
  name: "result",
  value: result,
  type: "primitive"
};
    
yield {
  type: "function-rm",
  scope: "double"
};
return result;
  
}

  const doubled = yield* double(sum);


yield {
  scope: "main",
  name: "doubled",
  value: doubled,
  type: "primitive"
};

  yield* list.traverse();

  
yield {
  type: "function-rm",
  scope: "main"
};
return doubled;

}
