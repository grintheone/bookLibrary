const myLibrary = []

addBookToLibrary('Harry Potter', 'J.R. Rowling', 500, 'An intresting story about the boy who lived', true)
addBookToLibrary('Lord of the Ring', 'Talking', 700, 'A story where heroes go through many obstacles to destroy the ring', false)
addBookToLibrary('Matrix', 'Brothers Watchowski', 800, 'The series features a cyberpunk story of the technological fall of mankind, in which the creation of artificial intelligence led the way to a race of self-aware machines that imprisoned mankind in a virtual reality system—the Matrix—to be farmed as a power source.', true)

// Create title and its container
const mainTitleContainer = document.createElement('div');
mainTitleContainer.setAttribute('class', 'main-title-container');
const mainTitle = document.createElement('h1');
mainTitle.textContent = 'Your library';
mainTitleContainer.appendChild(mainTitle);
document.body.appendChild(mainTitleContainer);

// Create buttons for adding and deleting books
const btnsContainer = document.createElement('div');
btnsContainer.setAttribute('class', 'btns-container');
const addBookBtn = document.createElement('button');
const deleteBookBtn = document.createElement('button');
const deleteAllBooks = document.createElement('button');
addBookBtn.textContent = 'Add new book';
deleteBookBtn.textContent = 'Delete a book';
deleteAllBooks.textContent = 'Clear the library';
btnsContainer.appendChild(addBookBtn);
btnsContainer.appendChild(deleteBookBtn);
btnsContainer.appendChild(deleteAllBooks); 
document.body.appendChild(btnsContainer);

// Create a table for storing books
const bookTable = document.createElement('table');
const headerRow = document.createElement('tr');
const titleHeader = document.createElement('th');
const authorHeader = document.createElement('th');
const pagesHeader = document.createElement('th');
const commentHeader = document.createElement('th');
const statusHeader = document.createElement('th');
function createTableStructure() {
    if (myLibrary.length > 0) {
        bookTable.setAttribute('class', 'book-table');
        titleHeader.textContent = 'Title';        
        authorHeader.textContent = 'Author';        
        pagesHeader.textContent = 'Pages';        
        commentHeader.textContent = 'Comment';        
        statusHeader.textContent = 'Read';
        // Add everything to the DOM
        headerRow.appendChild(titleHeader);
        headerRow.appendChild(authorHeader);
        headerRow.appendChild(pagesHeader);
        headerRow.appendChild(commentHeader);
        headerRow.appendChild(statusHeader);
        bookTable.appendChild(headerRow);
        document.body.appendChild(bookTable);
    }
}
createTableStructure();

function createTableEntry(book, dataAttribute) {
    const newRow = document.createElement('tr');
    const attribute = 'data-book-' + dataAttribute;
    newRow.setAttribute('class', attribute);

    const title = document.createElement('td');
    title.textContent = book.title;
    title.style.textAlign = 'center';

    const author = document.createElement('td');
    author.textContent = book.author;
    author.style.textAlign = 'center';

    const pages = document.createElement('td');
    pages.textContent = book.pages;
    pages.style.textAlign = 'center';

    const comment = document.createElement('td');
    comment.textContent = book.comment;

    const read = document.createElement('td');
    read.textContent = book.read;
    read.style.textAlign = 'center';

    newRow.appendChild(title);
    newRow.appendChild(author);
    newRow.appendChild(pages);
    newRow.appendChild(comment);
    newRow.appendChild(read);
    bookTable.appendChild(newRow);
}

// Display all books in the table
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        createTableEntry(myLibrary[i], i);
    }
}

displayBooks();




// Book constructor
function Book(title, author, pages, comment, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.comment = comment
    this.read = read
}

function addBookToLibrary(title, author, pages, comment, read) {
    const book = new Book(title, author, pages, comment, read);
    myLibrary.push(book);
}

// Form functions
function openForm() {
    document.querySelector('.form-container').reset();
    document.getElementById('new-book-form').style.display = 'block';
}

function closeForm() {
    document.getElementById('new-book-form').style.display = 'none';
}

addBookBtn.addEventListener('click', () => {
    openForm();
})

// Checkbox status
let read = document.getElementById('read-id').value = false;
document.getElementById('read-id').addEventListener('change', (e) => {
    read = e.target.checked ? true : false;
});
    
const acceptBtn = document.querySelector('.btn');
acceptBtn.addEventListener('click', () => {
    
    const title = document.getElementById('title-id').value;
    const author = document.getElementById('author-id').value;
    const pages = document.getElementById('pages-id').value;
    const comment = document.getElementById('comment-id').value;
    
    addBookToLibrary(title, author, pages, comment, read);
    read = false;
    closeForm();
    createTableEntry(myLibrary[myLibrary.length-1], myLibrary.length-1);
})

// Remove book from the library
deleteBookBtn.addEventListener('click', () => {
    bookTable.style.border = '3px solid yellow';
    bookTable.addEventListener('click', addEvent);
})

function addEvent(event) {
    event.target.parentElement.remove();
    const dataAttribute = event.target.parentElement.className.split('-')
    myLibrary.splice(dataAttribute[dataAttribute.length - 1], 1);
    // Update data atribute 
    const allDataAttributes = document.querySelectorAll('tr');
    for (let i = 1; i < allDataAttributes.length; i++) {
        const newAttr = 'data-book-' + (i - 1);
        allDataAttributes[i].setAttribute('class', newAttr);
    }
    console.log(myLibrary);
    bookTable.style.border = '1px solid white';
    bookTable.removeEventListener('click', addEvent);
}

// Clear the library completely
deleteAllBooks.addEventListener('click', () => {
    const result = window.confirm('Do you really want to clear your library?')
    
    if (result) {
        const books = document.querySelectorAll('tr');
        // Clear the DOM
        for (let i = 1; i < books.length; i++) {
            books[i].remove()
        }
        // Clear the array
        myLibrary.splice(0, myLibrary.length);
    }
})