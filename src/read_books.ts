console.group("4. READ BOOKS");

interface Book {
    title: string;
    isRead: boolean;
}

const books: Array<Book> = [
    {title: "Harry Potter y la piedra filosofal", isRead: true},
    {title: "Canción de hielo y fuego", isRead: false},
    {title: "Devastación", isRead: true},
];

function isBookRead(books: Array<Book>, titleToSearch: string): boolean {
    let bookFound = books.find(singleBook => singleBook.title === titleToSearch);
    return bookFound !== undefined ? bookFound.isRead : false;
}

console.log("Is Devastación read? ", isBookRead(books, "Devastación"));
console.log("Is Canción de hielo y fuego read? ", isBookRead(books, "Canción de hielo y fuego"));
console.log("Is Los Pilares de la Tierra read? ", isBookRead(books, "Los Pilares de la Tierra"));

console.groupEnd();
