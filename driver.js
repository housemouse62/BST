import { Tree } from "./BTS.js";

function randomNumberArray(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    let number = Math.floor(Math.random() * 100);
    array.push(number);
  }
  return array;
}

function driverScript() {
  const newTree = new Tree(randomNumberArray(99));
  console.log(newTree);

  newTree.isBalanced();

  function printOrders() {
    let levelarray = [];
    newTree.levelOrderForEach((node) => {
      levelarray.push(node);
    });
    console.log("Level Order Array", levelarray);

    let prearray = [];
    let root = newTree.root;
    newTree.preorder(root, (data) => {
      prearray.push(data);
    });
    console.log("Preorder Array: ", prearray);

    let inorderarray = [];
    newTree.inorder(root, (data) => {
      inorderarray.push(data);
    });
    console.log("Inorder Array:", inorderarray);

    let postorderarray = [];
    newTree.postorder(root, (data) => {
      postorderarray.push(data);
    });
    console.log("Postorder Array:", postorderarray);
  }
  printOrders();

  newTree.insert(newTree.root, 1000);
  newTree.insert(newTree.root, 1400);

  newTree.isBalanced();

  newTree.rebalance();

  newTree.isBalanced();

  printOrders();
}
driverScript();
