const myLibrary = [];

const openButton = document.getElementById('add-book')
const closeButton = document.getElementById('close-button')
const deleteButton = document.getElementById('delete-button')

const dialog = document.querySelector("dialog");
const table = document.querySelector("table tbody");


function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(book, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><input type="checkbox" ${book.status ? 'checked' : ''} class="read-status-checkbox" data-index="${index}"></td>
      <td><button class="delete-button" data-index = ${index}>Delete</button></td>
  `;
  table.appendChild(row);

  const deleteButton = row.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    const index = parseInt(deleteButton.getAttribute('data-index'));
    deleteBook(index); 
  });

  const readStatusCheckbox = row.querySelector('.read-status-checkbox');
  readStatusCheckbox.addEventListener('change', () => {
      const index = parseInt(readStatusCheckbox.getAttribute('data-index'));
      myLibrary[index].status = readStatusCheckbox.checked;
  });
}

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages = document.getElementById('pages-input').value;
  const status = document.getElementById('status-input').checked;

  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  addBookToLibrary(newBook, myLibrary.length - 1);

  document.getElementById('title-input').value = '';
  document.getElementById('author-input').value = '';
  document.getElementById('pages-input').value = '';
  document.getElementById('status-input').checked = false;
  
  dialog.close();
});

function deleteBook(index) {
  myLibrary.splice(index, 1); 
  renderLibrary(); 
}

function renderLibrary() {
  table.innerHTML = '';

  myLibrary.forEach((book, index) => {
      addBookToLibrary(book, index);
  });
}

myLibrary.push(new Book('Crime and Punishment', 'Dostoevsky', 300, true));

renderLibrary();
