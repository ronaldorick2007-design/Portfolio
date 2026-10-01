class TreeNode {

  static counter = 0;

  constructor(data) {

    this.data = data;
    this.left = null;
    this.right = null;
    this.id = ++TreeNode.counter;

    return (function* (instance) {

      yield {
        scope: "heap",
        name: instance.toString(),
        value: instance,
        type: "CLASS"
      };

      return instance;

    })(this);
  }

  toString() {
    return `TreeNode#${this.id}`;
  }
}


class LinkedNode {

  static counter = 0;

  constructor(data) {

    this.data = data;
    this.next = null;
    this.id = ++LinkedNode.counter;

    return (function* (instance) {

      yield {
        scope: "heap",
        name: instance.toString(),
        value: instance,
        type: "CLASS"
      };

      return instance;

    })(this);
  }

  toString() {
    return `LinkedNode#${this.id}`;
  }
}


class LinkedList {

  constructor() {

    this.head = null;
    this.tail = null;

    return (function* (instance) {

      yield {
        scope: "heap",
        name: "LinkedList",
        value: instance,
        type: "CLASS"
      };

      return instance;

    })(this);
  }


  *add(data) {

    yield {
      type: "function-add",
      scope: "LinkedList.add"
    };


    const node =
      yield* new LinkedNode(data);


    if (this.head === null) {

      this.head = node;
      this.tail = node;

    } else {

      this.tail.next = node;
      this.tail = node;

    }


    yield {
      scope: "heap",
      name: node.toString(),
      value: node,
      type: "CLASS"
    };


    yield {
      action: "visual",
      element: "list",
      type: "linked-list",
      value: this
    };


    yield {
      type: "function-rm",
      scope: "LinkedList.add"
    };


    return node;
  }


  *traverse() {

    yield {
      type: "function-add",
      scope: "LinkedList.traverse"
    };


    let current =
      this.head;

    yield {
      scope: "LinkedList.traverse",
      name: "current",
      value: current,
      type: "reference"
    };


    while (current !== null) {

      yield {
        action: "indicate",
        name: "current",
        value: current
      };


      yield {
        action: "clear-indicate",
        name: "current"
      };


      current =
        current.next;

      yield {
        scope: "LinkedList.traverse",
        name: "current",
        value: current,
        type: "reference"
      };

    }


    yield {
      type: "function-rm",
      scope: "LinkedList.traverse"
    };
  }
}


class BinaryTree {

  constructor() {

    this.root = null;

    return (function* (instance) {

      yield {
        scope: "heap",
        name: "BinaryTree",
        value: instance,
        type: "CLASS"
      };

      return instance;

    })(this);
  }


  *build() {

    yield {
      type: "function-add",
      scope: "BinaryTree.build"
    };


    const n50 =
      yield* new TreeNode(50);

    yield {
      scope: "BinaryTree.build",
      name: "n50",
      value: n50,
      type: "reference"
    };


    const n30 =
      yield* new TreeNode(30);

    yield {
      scope: "BinaryTree.build",
      name: "n30",
      value: n30,
      type: "reference"
    };


    const n70 =
      yield* new TreeNode(70);

    yield {
      scope: "BinaryTree.build",
      name: "n70",
      value: n70,
      type: "reference"
    };


    const n20 =
      yield* new TreeNode(20);

    yield {
      scope: "BinaryTree.build",
      name: "n20",
      value: n20,
      type: "reference"
    };


    const n40 =
      yield* new TreeNode(40);

    yield {
      scope: "BinaryTree.build",
      name: "n40",
      value: n40,
      type: "reference"
    };


    n50.left = n30;

    yield {
      scope: "heap",
      name: n50.toString(),
      value: n50,
      type: "CLASS"
    };


    n50.right = n70;

    yield {
      scope: "heap",
      name: n50.toString(),
      value: n50,
      type: "CLASS"
    };


    n30.left = n20;

    yield {
      scope: "heap",
      name: n30.toString(),
      value: n30,
      type: "CLASS"
    };


    n30.right = n40;

    yield {
      scope: "heap",
      name: n30.toString(),
      value: n30,
      type: "CLASS"
    };


    this.root = n50;


    yield {
      scope: "heap",
      name: "BinaryTree",
      value: this,
      type: "CLASS"
    };


    yield {
      action: "visual",
      element: "tree",
      type: "tree",
      value: this.root
    };


    yield {
      type: "function-rm",
      scope: "BinaryTree.build"
    };
  }


  *preorder() {

    yield {
      type: "function-add",
      scope: "BinaryTree.preorder"
    };


    const result = [];


    function* visit(node) {

      if (node === null) {
        return;
      }


      result.push(node.data);

      yield {
        action: "indicate",
        name: "current",
        value: node
      };


      yield {
        action: "visual",
        element: "tree",
        type: "tree",
        value: this.root
      };


      yield* visit.call(this, node.left);

      yield* visit.call(this, node.right);
    }


    yield* visit.call(this, this.root);


    yield {
      scope: "BinaryTree.preorder",
      name: "result",
      value: result,
      type: "array"
    };


    yield {
      action: "clear-indicate",
      name: "current"
    };


    yield {
      type: "function-rm",
      scope: "BinaryTree.preorder"
    };


    return result;
  }
}


export function* main() {

  yield {
    type: "function-add",
    scope: "main"
  };


  // --------------------------------
  // BUILD TREE
  // --------------------------------

  const tree =
    yield* new BinaryTree();


  yield {
    scope: "main",
    name: "tree",
    value: tree,
    type: "reference"
  };


  yield* tree.build();


  // --------------------------------
  // PREORDER
  // --------------------------------

  const preorder =
    yield* tree.preorder();


  yield {
    scope: "main",
    name: "preorder",
    value: preorder,
    type: "array"
  };


  // --------------------------------
  // BUILD LINKED LIST
  // FROM PREORDER
  // --------------------------------

  const list =
    yield* new LinkedList();


  yield {
    scope: "main",
    name: "list",
    value: list,
    type: "reference"
  };


  for (const value of preorder) {

    yield* list.add(value);

  }


  // --------------------------------
  // TRAVERSE LINKED LIST
  // --------------------------------

  yield* list.traverse();


  yield {
    type: "function-rm",
    scope: "main"
  };
}