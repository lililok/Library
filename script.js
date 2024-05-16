const myLibrary = [];

const openButton = document.getElementById('add-book')
const closeButton = document.getElementById('close-button')
const dialog = document.querySelector("dialog");
const table = document.querySelector("table tbody");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(book) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status}</td>
  `;
  table.appendChild(row);
}

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages = document.getElementById('pages-input').value;
  const status = document.getElementById('status-input').checked;
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  addBookToLibrary(newBook);
  title.value = '';
  author.value = '';
  pages.value = '';
  status.value = ''; 
  dialog.close();
});

function readStatus() {
  
}

