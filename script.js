class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  deleteBook(index) {
    this.books.splice(index, 1);
  }

  getBooks() {
    return this.books;
  }
}

class LibraryDesign {
  constructor(library) {
    this.library = library;
    this.table = document.querySelector("table tbody");
    this.dialog = document.querySelector("dialog");

    this.openButton = document.getElementById('add-book');
    this.closeButton = document.getElementById('close-button');
    this.bookForm = document.getElementById('book-form');

    this.initializeDesign();
  }

  initializeDesign() {
    this.openButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    this.closeButton.addEventListener("click", () => {
      this.dialog.close();
    });

    this.bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBookFromForm();
    });

    this.renderLibrary();
  }

  addBookFromForm() {
    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const pages = document.getElementById('pages-input').value;
    const status = document.getElementById('status-input').checked;

    const newBook = new Book(title, author, pages, status);
    this.library.addBook(newBook);
    this.addBookToTable(newBook, this.library.getBooks().length - 1);

    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('status-input').checked = false;

    this.dialog.close();
  }

  addBookToTable(book, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><input type="checkbox" ${book.status ? 'checked' : ''} class="read-status-checkbox" data-index="${index}"></td>
        <td><button class="delete-button" data-index="${index}">Delete</button></td>
    `;
    this.table.appendChild(row);

    const deleteButton = row.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
      const index = parseInt(deleteButton.getAttribute('data-index'));
      this.library.deleteBook(index);
      this.renderLibrary();
    });

    const readStatusCheckbox = row.querySelector('.read-status-checkbox');
    readStatusCheckbox.addEventListener('change', () => {
      const index = parseInt(readStatusCheckbox.getAttribute('data-index'));
      this.library.getBooks()[index].status = readStatusCheckbox.checked;
    });
  }

  renderLibrary() {
    this.table.innerHTML = '';

    this.library.getBooks().forEach((book, index) => {
      this.addBookToTable(book, index);
    });
  }
}


const newLibrary = new Library();

const newLibraryDesign = new LibraryDesign(newLibrary);


newLibrary.addBook(new Book('Crime and Punishment', 'Dostoevsky', 300, true));
newLibraryDesign.renderLibrary();
