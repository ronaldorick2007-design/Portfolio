class Node {

  static counter = 0;

  constructor(data) {

    this.data = data;
    this.left = null;
    this.right = null;
    this.id = ++Node.counter;

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

    return `Node#${this.id}`;

  }

}



class BinarySearchTree {

  static counter = 0;

  constructor() {

    this.root = null;
    this.id = ++BinarySearchTree.counter;

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

    return `BST#${this.id}`;

  }



  *insert(data) {

    yield {

      type: "function-add",

      scope: this.toString() + "#insert"

    };


    let node =

      yield* new Node(data);

    yield {

      scope: this.toString() + "#insert",

      name: "node",

      value: node,

      type: "reference"

    };


    if (this.root === null) {

      this.root = node;

      yield {

        scope: this.toString() + "#insert",

        name: "root",

        value: this.root,

        type: "reference"

      };


      yield {

        type: "function-rm",

        scope: this.toString() + "#insert"

      };

      return node;

    }


    let current =

      this.root;

    yield {

      scope: this.toString() + "#insert",

      name: "current",

      value: current,

      type: "reference"

    };


    while (true) {

      yield {

        action: "indicate",

        name: "current",

        value: current

      };


      if (data < current.data) {

        if (current.left === null) {

          current.left = node;

          yield {

            scope: "heap",

            name: current.toString(),

            value: current,

            type: "CLASS"

          };

          break;

        }


        current =

          current.left;

        yield {

          scope: this.toString() + "#insert",

          name: "current",

          value: current,

          type: "reference"

        };

      }

      else {

        if (current.right === null) {

          current.right = node;

          yield {

            scope: "heap",

            name: current.toString(),

            value: current,

            type: "CLASS"

          };

          break;

        }


        current =

          current.right;

        yield {

          scope: this.toString() + "#insert",

          name: "current",

          value: current,

          type: "reference"

        };

      }

    }


    yield {

      type: "function-rm",

      scope: this.toString() + "#insert"

    };

    return node;

  }



  *search(data) {

    yield {

      type: "function-add",

      scope: this.toString() + "#search"

    };


    let current =

      this.root;

    yield {

      scope: this.toString() + "#search",

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


      if (current.data === data) {

        yield {

          type: "function-rm",

          scope: this.toString() + "#search"

        };

        return current;

      }


      if (data < current.data) {

        current =

          current.left;

        yield {

          scope: this.toString() + "#search",

          name: "current",

          value: current,

          type: "reference"

        };

      }

      else {

        current =

          current.right;

        yield {

          scope: this.toString() + "#search",

          name: "current",

          value: current,

          type: "reference"

        };

      }

    }


    yield {

      type: "function-rm",

      scope: this.toString() + "#search"

    };

    return null;

  }



  *inorder() {

    yield {

      type: "function-add",

      scope: this.toString() + "#inorder"

    };


    let result = [];

    yield {

      scope: this.toString() + "#inorder",

      name: "result",

      value: result,

      type: "array"

    };


    let stack = [];

    yield {

      scope: this.toString() + "#inorder",

      name: "stack",

      value: stack,

      type: "array"

    };


    let current =

      this.root;

    yield {

      scope: this.toString() + "#inorder",

      name: "current",

      value: current,

      type: "reference"

    };


    while (current !== null || stack.length > 0) {

      while (current !== null) {

        stack.push(current);

        yield {

          scope: this.toString() + "#inorder",

          name: "stack",

          value: stack,

          type: "array"

        };


        current =

          current.left;

        yield {

          scope: this.toString() + "#inorder",

          name: "current",

          value: current,

          type: "reference"

        };

      }


      current =

        stack.pop();

      yield {

        scope: this.toString() + "#inorder",

        name: "current",

        value: current,

        type: "reference"

      };


      result.push(current.data);

      yield {

        scope: this.toString() + "#inorder",

        name: "result",

        value: result,

        type: "array"

      };


      current =

        current.right;

      yield {

        scope: this.toString() + "#inorder",

        name: "current",

        value: current,

        type: "reference"

      };

    }


    yield {

      type: "function-rm",

      scope: this.toString() + "#inorder"

    };

    return result;

  }

}



export function* main() {

  yield {

    type: "function-add",

    scope: "main"

  };


  let tree =

    yield* new BinarySearchTree();

  yield {

    scope: "main",

    name: "tree",

    value: tree,

    type: "reference"

  };


  yield* tree.insert(50);

  yield* tree.insert(30);

  yield* tree.insert(70);

  yield* tree.insert(20);

  yield* tree.insert(40);

  yield* tree.insert(60);

  yield* tree.insert(80);


  let found =

    yield* tree.search(60);

  yield {

    scope: "main",

    name: "found",

    value: found,

    type: "reference"

  };


  let missing =

    yield* tree.search(100);

  yield {

    scope: "main",

    name: "missing",

    value: missing,

    type: "reference"

  };


  let ordered =

    yield* tree.inorder();

  yield {

    scope: "main",

    name: "ordered",

    value: ordered,

    type: "array"

  };


  yield {

    type: "function-rm",

    scope: "main"

  };

}