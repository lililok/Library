const myLibrary = [];

const openButton = document.getElementById('add-book')
const closeButton = document.getElementById('close-button')
const dialog = document.querySelector("dialog");

const table = document.querySelector("tbody");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
  myLibrary.forEach(book => {
    console.log(book.title);
});
}

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});