let myLibrary = []

// Save Library data to Local Storage
function saveDataLocal() {
    const libraryObj = JSON.stringify(myLibrary);
    localStorage.setItem('data', libraryObj);
}

function retrieveData() {
    if (localStorage.length > 0) {
        myLibrary = JSON.parse(localStorage.getItem('data'));
    }
}

retrieveData();

// Header container 
const header = document.createElement('div');
header.setAttribute('class', 'header');
document.body.appendChild(header);

// Create title and its container
const mainTitle = document.createElement('h1');
mainTitle.textContent = 'Your library';
header.appendChild(mainTitle);

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
header.appendChild(btnsContainer);

// Create a table for storing books
const bookTable = document.createElement('table');
const headerRow = document.createElement('tr');
const titleHeader = document.createElement('th');
const authorHeader = document.createElement('th');
const pagesHeader = document.createElement('th');
const commentHeader = document.createElement('th');
const statusHeader = document.createElement('th');

function createTableStructure() {
    bookTable.setAttribute('class', 'book-table');
    titleHeader.textContent = 'Title';        
    authorHeader.textContent = 'Author';        
    pagesHeader.textContent = 'Pages'; 
    pagesHeader.style.width = '40px';       
    commentHeader.textContent = 'Comment';        
    statusHeader.textContent = 'Read';
    statusHeader.style.width = '40px';
    // Add everything to the DOM
    headerRow.appendChild(titleHeader);
    headerRow.appendChild(authorHeader);
    headerRow.appendChild(pagesHeader);
    headerRow.appendChild(commentHeader);
    headerRow.appendChild(statusHeader);
    bookTable.appendChild(headerRow);
    document.body.appendChild(bookTable);

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
    comment.setAttribute('class', 'comment');
    comment.textContent = book.comment;

    // Everything for a checkbox
    const read = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'checkbox');

    checkbox.type = 'checkbox';
    if (book.read == true) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }

    checkbox.addEventListener('change', (e) => {
        const bookId = e.srcElement.parentElement.parentElement.className.split('-');
        myLibrary[bookId[bookId.length - 1]].updateStatus();
    })
    
    read.appendChild(checkbox);
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


// Updated book class
class Book {
    constructor(title, author, pages, comment, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.comment = comment;
        this.read = read;
    }

    updateStatus() {
        if (this.read == true) {
            this.read = false;
        } else {
            this.read = true;
        }
    }
}

function addBookToLibrary(title, author, pages, comment, read) {
    const book = new Book(title, author, pages, comment, read);
    myLibrary.push(book);
    saveDataLocal();
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
    if (checkValues()) {
        const title = document.getElementById('title-id').value;
        const author = document.getElementById('author-id').value;
        const pages = document.getElementById('pages-id').value;
        const comment = document.getElementById('comment-id').value;
        
        addBookToLibrary(title, author, pages, comment, read);
        read = false;
        closeForm();
        createTableEntry(myLibrary[myLibrary.length-1], myLibrary.length-1);
    } 
})

function checkValues() {
    const title = document.getElementById('title-id');
    const author = document.getElementById('author-id');
    const pages = document.getElementById('pages-id');
    if (!title.checkValidity() || !author.checkValidity() || !pages.checkValidity()) {
        alert('Title, author and pages are required fields.')
        if (!title.checkValidity()) {
            title.style.border = '2px solid rgb(243, 102, 102)';
        } else {
            title.style.border = 'none';        
        }
        if (!author.checkValidity()) {
            author.style.border = '2px solid rgb(243, 102, 102)';
        } else {
            author.style.border = 'none';
        }
        if (!pages.checkValidity()) {
            pages.style.border = '2px solid rgb(243, 102, 102)';
        } else {
            pages.style.border = 'none';
        }
        return false;
    }
    if (!isFinite(pages.value)) {
        alert('Pages field must be a number')
        pages.style.border = '2px solid rgb(243, 102, 102)';
        return false
    } else {
        pages.style.border = 'none';
    }
    return true
}

// Remove book from the library
deleteBookBtn.addEventListener('click', () => {
    mainTitle.textContent = 'Click on the book'
    const rows = document.querySelectorAll('tr');
    for (let row = 1; row < rows.length; row++) {
        rows[row].setAttribute('id', 'delete-row');
    }
    bookTable.addEventListener('click', addEvent);
})

function addEvent(event) {
    if (event.target.parentElement.id == 'delete-row') {
        event.target.parentElement.remove();
        const dataAttribute = event.target.parentElement.className.split('-')
        myLibrary.splice(dataAttribute[dataAttribute.length - 1], 1);
        // Update data atribute 
        const allDataAttributes = document.querySelectorAll('tr');
        for (let i = 1; i < allDataAttributes.length; i++) {
            const newAttr = 'data-book-' + (i - 1);
            allDataAttributes[i].setAttribute('class', newAttr);
            allDataAttributes[i].removeAttribute('id');
        }
    }
    mainTitle.textContent = 'Your library';
    bookTable.removeEventListener('click', addEvent);
    saveDataLocal();
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
        saveDataLocal();
    }
})

