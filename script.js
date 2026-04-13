const library = [];

function Book(title, author, length) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.id = crypto.randomUUID();
}

function addBook(title, author, length) {
    const book = new Book(title, author, length);
    library.push(book);
}

function cellFunction(book, frag) {
    const bookCell = document.createElement('div');

    const title = document.createElement('p');
    title.textContent =`title: ${book.title}`;
    bookCell.appendChild(title);

    const author = document.createElement('p');
    author.textContent =`author: ${book.author}`;
    bookCell.appendChild(author);

    const length = document.createElement('p');
    length.textContent =`amount of pages: ${book.length}`;
    bookCell.appendChild(length);

    frag.appendChild(bookCell);
}


addBook('book about stuff', 'dude from boston', 100);
addBook('history of halley', 'fred from halley', 22081);
addBook('recollection', 'jeremy', 120);
addBook('test', 'test', 'test');


const content = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');

function gridFunction() {
    const frag = document.createDocumentFragment();
    library.forEach(item => cellFunction(item, frag));
    content.appendChild(frag);
}

function labelFactory(id, type, labelText) {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = id;

    const span = document.createElement('span');
    span.textContent = labelText;

    const input = document.createElement('input');
    input.type = type;
    input.name = id;
    input.id = id;

    label.appendChild(span);
    label.appendChild(input);

    return label;
}

const addNewBtn = document.querySelector('.add-new');


addNewBtn.addEventListener('click', () => {
    const frag = document.createDocumentFragment();

    const form = document.createElement('form');
    frag.appendChild(form);

    form.appendChild(labelFactory('title', 'text', 'Title: '))
    form.appendChild(labelFactory('author', 'text', 'Author: '))
    form.appendChild(labelFactory('pages', 'number', 'Amount of pages: '))

    sidebar.appendChild(frag);
})

