let books = [];
const Book = {
  id: null,
  title: '',
  author: '',
};
const addBtn = document.querySelector('#add-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
// const LocalBooksInstace = localStorage.getItem('books');
const bookList = document.querySelector('#book-list');

const [localbooks, bookid] = JSON.parse(localStorage.getItem('books'));

const createLocalStorage = (id) => {
  const init = JSON.stringify([[], id]);
  localStorage.setItem('books', init);
};

const createBookId = () => {
  const bookID = bookid;
  if (!bookID) return 1;
  return bookID + 1;
};

const createBookListItem = () => {
  if (!localbooks) {
    createLocalStorage(null);
  }

  books = localbooks;

  bookList.innerHTML = '';

  books.forEach((element) => {
    const bookItem = document.createElement('li');

    bookItem.id = element.id;

    const bookTitleEl = document.createElement('p');
    const bookAuthor = document.createElement('p');
    bookTitleEl.textContent = element.title;
    bookAuthor.textContent = element.author;

    bookItem.appendChild(bookTitleEl);
    bookItem.appendChild(bookAuthor);

    bookList.appendChild(bookItem);
  });
};

addBtn.addEventListener('click', (event) => {
  event.preventDefault();

  Book.id = createBookId();
  Book.title = bookTitle.value;
  Book.author = bookAuthor.value;

  books = localbooks;

  books.push(Book);

  const booksString = JSON.stringify([books, Book.id]);
  localStorage.setItem('books', booksString); // updating the books array

  createBookListItem();
});

window.addEventListener('load', createBookListItem());