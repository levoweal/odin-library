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

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        const kill = library.findIndex(item => item.id === book.id);
        if (kill !== -1) {library.splice(kill, 1)};
        gridFunction();
    })
    bookCell.appendChild(removeBtn);

    frag.appendChild(bookCell);
}

const content = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');

function gridFunction() {
    const divs = document.querySelectorAll('.content div');
    divs.forEach(item => {item.remove()});
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

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Confirm';
    submit.className = 'submit';
    form.appendChild(submit);

    sidebar.appendChild(frag);

    addNewBtn.style.visibility = 'hidden';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        addBook(fd.get('title'), fd.get('author'), fd.get('pages'));
        gridFunction();
        form.remove();
        addNewBtn.style.visibility = 'visible';
    })
})
