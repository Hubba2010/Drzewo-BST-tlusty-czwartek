class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  isEmpty() {
    return this.root === null
  }

  insert(value) {
    const newNode = new Node(value)
    if (this.isEmpty()) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode
      } else {
        this.insertNode(root.left, newNode)
      }
    } else {
      if (root.right === null) {
        root.right = newNode
      } else {
        this.insertNode(root.right, newNode)
      }
    }
  }

  search(root, value) {
    if (!root) {
      return false
    }
    if (root.value === value) {
      return true
    } else if (value < root.value) {
      return this.search(root.left, value)
    } else {
      return this.search(root.right, value)
    }
  }

  min(root) {
    if (!root?.left) {
      return root?.value
    } else {
      return this.min(root.left)
    }
  }

  max(root) {
    if (!root?.right) {
      return root?.value
    } else {
      return this.max(root.right)
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value)
  }

  deleteNode(root, value) {
    if (root === null) {
      return root
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value)
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value)
    } else {
      if (!root.left && !root.right) {
        return null
      }
      if (!root.left) {
        return root.right
      } else if (!root.right) {
        return root.left
      }
      root.value = this.min(root.right)
      root.right = this.deleteNode(root.right, root.value)
    }
    return root
  }

  inOrder(root) {
    if (root) {
      this.inOrder(root.left)
      console.log(root.value)
      this.inOrder(root.right)
    }
  }

  height(node) {
    if (!node) {
      return 0
    } else {
      const leftHeight = this.height(node.left)
      const rightHeight = this.height(node.right)
      return Math.max(leftHeight, rightHeight) + 1
    }
  }

  isBST(node, min, max) {
    if (!node) {
      return true
    }
    if (node.value < min || node.value > max) {
      return false
    }
    return (
      this.isBST(node.left, min, node.value) &&
      this.isBST(node.right, node.value, max)
    )
  }
}

///// Utworzenie nowego drzewa binarnego
const bst = new BinarySearchTree()

/// Sprawdzenie czy drzewo jest puste
console.log(
  'Czy drzewo puste tuż po utworzeniu: ',
  bst.isEmpty() ? 'Tak' : 'Nie',
)
bst.insert(10)
console.log(
  'Czy drzewo puste tuż po dodaniu węzła: ',
  bst.isEmpty() ? 'Tak' : 'Nie',
)

/// Wstawianie węzłów
bst.insert(5)
bst.insert(15)
bst.insert(3)
bst.insert(7)
bst.insert(13)
bst.insert(17)
bst.insert(2)

/// Sprawdzamy czy dana wartość istnieje
console.log(bst.search(bst.root, 10))
console.log(bst.search(bst.root, 7))

/// Wyświetlenie wartości po kolei
bst.inOrder(bst.root)
console.log('Minimalny element: ', bst.min(bst.root))
console.log('Maksymalny element: ', bst.max(bst.root))

//// Wysokość drzewa
console.log('Wysokosc: ', bst.height(bst.root))

bst.delete(2)

console.log('Wysokosc po usunieciu 2: ', bst.height(bst.root))
