console.group("ADVANCED 3. ÁRBOL");

interface TreeNode {
    name: string;
    childNodes?: Array<TreeNode>;
}

interface Tree {
    rootNode: TreeNode;
}

interface TreeAPI {
    addTreeNode: (name: string, parent?: string) => void;
    printTree: () => void;
    recursiveSearchOfNode: (node: string) => TreeNode;
}

const treeNodeBuilder = (): TreeAPI => {
    const tree: Tree = {rootNode: undefined};

    return {
        addTreeNode: function (name: string, parent?: string): void {
            let newNode: TreeNode = {name};

            if (!parent) tree.rootNode = newNode;
            else {
                const parentNode: TreeNode = this.recursiveSearchOfNode(parent);
                if (parentNode.childNodes) parentNode.childNodes.push(newNode);
                else parentNode.childNodes = new Array<TreeNode>(newNode);
            }
        },

        printTree: function (): void {
            console.log(tree);
        },

        recursiveSearchOfNode: (function () {

            const innerSearchNode = (nodeToSearch: string, nodesArray?: Array<TreeNode>, index?: number): TreeNode => {
                if (nodesArray[index].name === nodeToSearch) return nodesArray[index];
                else if (index !== nodesArray.length - 1) return innerSearchNode(nodeToSearch, nodesArray, index + 1);
                else {
                    for (let node of nodesArray) {
                        return innerSearchNode(nodeToSearch, node.childNodes, 0);
                    }
                }
            };

            return (node: string) => innerSearchNode(node, [tree.rootNode], 0);
        })()
    }
};

const treeBuilder: TreeAPI = treeNodeBuilder();
treeBuilder.addTreeNode("root");
treeBuilder.addTreeNode("child1", "root");
treeBuilder.addTreeNode("child2", "root");
treeBuilder.addTreeNode("child3", "child1");
treeBuilder.addTreeNode("child4", "child1");
treeBuilder.addTreeNode("child5", "child2");
treeBuilder.addTreeNode("child6", "child3");
console.log("La estructura esperada es: ");
console.log(`             
                            | child3    | child6
                 | child1   
                 |          | child4
                 |                 
                 |        
            root |
                 |
                 |
                 |
                 |          
                 | child2   | child 5
                 `);

treeBuilder.printTree();
console.groupEnd();