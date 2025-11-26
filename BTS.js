class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTreeRec(array, start, end) {
    if (start > end) return null;

    let middle = (end + start) / 2;
    let mid = Math.floor(middle);
    let root = new Node(array[mid]);

    root.left = this.buildTreeRec(array, start, mid - 1);
    root.right = this.buildTreeRec(array, mid + 1, end);
    return root;
  }

  buildTree(array) {
    let sortedArray = this.mergeSort(array);
    let newArray = this.removeDuplicates(sortedArray);
    return this.buildTreeRec(newArray, 0, newArray.length - 1);
  }

  insert(root, value) {
    // let thisroot = this.root;
    //console.log(root.data, value);
    if (root === null) return new Node(value);
    if (value < root.data) {
      root.left = this.insert(root.left, value);
    } else if (value > root.data) {
      root.right = this.insert(root.right, value);
    }
    return root;
  }

  getSuccessor(current) {
    current = current.right;
    while (current !== null && current.left !== null) current = current.left;
    return current;
  }

  deleteNode(root, x) {
    if (root === null) return root;

    if (root.data > x) {
      root.left = this.deleteNode(root.left, x);
    } else if (root.data < x) {
      root.right = this.deleteNode(root.right, x);
    } else if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      const succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this.deleteNode(root.right, succ.data);
    }
    return root;
  }

  levelOrderForEach(callback) {
    let root = this.root;
    //  console.log(root);
    if (root === null) return root;
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
      let currentNode = queue[0];
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
      callback(currentNode.data);
      queue.shift();
    }
  }

  preorder(root, callback) {
    if (root === null) return root;
    callback(root.data);
    this.preorder(root.left, callback);
    this.preorder(root.right, callback);
  }

  inorder(root, callback) {
    if (root === null) return;
    this.inorder(root.left, callback);
    callback(root.data);
    this.inorder(root.right, callback);
  }

  postorder(root, callback) {
    if (root === null) return;
    this.postorder(root.left, callback);
    this.postorder(root.right, callback);
    callback(root.data);
  }

  depth(root, value) {
    if (root === null) return -1;
    if (root.data === value) return 0;

    let left = this.depth(root.left, value);
    if (left !== -1) return left + 1;

    let right = this.depth(root.right, value);
    if (right !== -1) return right + 1;

    return -1;
  }

  heightOfBranch(root, value) {
    if (root === null) return -1;
    return (
      Math.max(
        this.heightOfBranch(root.left, value),
        this.heightOfBranch(root.right, value),
      ) + 1
    );
  }

  find(root, value) {
    if (root === null) return null;
    if (root.data === value) return root;
    return this.find(root.left, value) || this.find(root.right, value);
  }

  height(value) {
    let node = this.find(this.root, value);
    if (!node) return null;
    return this.heightOfBranch(node);
  }

  isBalanced(root = this.root) {
    const checkHeight = (node) => {
      if (node === null) return 0;

      let left = checkHeight(node.left);
      if (left === -1) return -1;

      let right = checkHeight(node.right);
      if (right === -1) return -1;

      if (Math.abs(left - right) > 1) {
        console.log("Tree is unbalanced");
        return -1;
      }

      return 1 + Math.max(left, right);
    };
    console.log("Tree is balanced");
    return checkHeight(root) !== -1;
  }

  rebalance() {
    let array = [];
    this.inorder(this.root, (data) => {
      array.push(data);
    });
    this.root = this.buildTree(array);
  }

  // merge sorted array
  merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  //sort array
  mergeSort(array) {
    if (array.length <= 1) {
      return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    const sortedLeft = this.mergeSort(left);
    const sortedRight = this.mergeSort(right);
    return this.merge(sortedLeft, sortedRight);
  }

  removeDuplicates(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (newArray.includes(array[i])) continue;
      newArray.push(array[i]);
    }
    return newArray;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
// const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// console.log(newTree);
// newTree.insert(newTree.root, 2);
// newTree.insert(newTree.root, 10);
// newTree.insert(newTree.root, 11);
// newTree.insert(newTree.root, 12);
// newTree.insert(newTree.root, 11.5);
// newTree.prettyPrint(newTree.root);
// newTree.deleteNode(newTree.root, 9);
// newTree.prettyPrint(newTree.root);
// //newTree.levelOrderForEach((node) => {
// //  console.log(node);
// //});
// newTree.preorder(newTree.root, (node) => {
//   console.log(node.data);
// });
// // newTree.inorder(newTree.root, (node) => {
// //   console.log(node.data);
// // });
// // newTree.postorder(newTree.root, (node) => {
// //   console.log(node.data);
// //});
// console.log(newTree.depth(newTree.root, 11));
// console.log(newTree.heightOfBranch(newTree.root, 11));
// console.log(newTree.height(11));
// console.log(newTree.isBalanced(newTree.root));
// newTree.rebalance();
// newTree.prettyPrint(newTree.root);

export { Tree };
