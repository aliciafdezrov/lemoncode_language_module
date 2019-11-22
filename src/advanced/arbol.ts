console.group("ADVANCED 3. ÁRBOL");

interface TreeNode {
    name: string;
    parentNode?: TreeNode;
};

const root = {
    name: "0"
};

const child1 = {
    name: "1",
    parentNode: root
};

const child2 = {
    name: "2",
    parentNode: root
};

const child3 = {
    name: "3",
    parentNode: child1
};

const child4 = {
    name: "4",
    parentNode: child1
};

const child5 = {
    name: "5",
    parentNode: child1
};

console.groupEnd();