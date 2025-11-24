class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array, root) {
    //   this.root = root;
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
    console.log("sortedArray:", sortedArray);
    console.log("newArray:", newArray);
    return this.buildTreeRec(newArray, 0, newArray.length - 1);
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
      console.log(array);
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
}
const newTree = new Tree();
console.log(
  newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]),
);
