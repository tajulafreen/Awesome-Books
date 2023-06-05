let books = [];
const Book = {
  id: null,
  title: '',
  author: '',
};

const addBtn = document.querySelector('#addBtn');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookList = document.querySelector('#book-list');

const getLocalStorageBooks = () => JSON.parse(localStorage.getItem('books'))[0];

const getLocalIdBook = () => JSON.parse(localStorage.getItem('books'))[1];

const createLocalStorage = (id) => {
  const init = JSON.stringify([[], id]);
  localStorage.setItem('books', init);
};

const createBookId = () => {
  getLocalStorageBooks();
  const bookID = getLocalIdBook();
  if (!bookID) return 1;
  return bookID + 1;
};

const createBookListItem = () => {
  if (!getLocalStorageBooks()) {
    createLocalStorage(null);
  }

  getLocalStorageBooks();
  books = getLocalStorageBooks();

  bookList.innerHTML = '';

  books.forEach((element) => {
    const bookItem = document.createElement('li');
    bookItem.id = element.id;

    const bookTitleEl = document.createElement('p');
    const bookAuthor = document.createElement('p');

    const removeBtn = document.createElement('button');
    removeBtn.id = element.id;
    removeBtn.classList.add('remove-btn');

    removeBtn.textContent = `Remove`;

    removeBtn.addEventListener('click', () => {

    });

    bookTitleEl.textContent = element.title;
    bookAuthor.textContent = element.author;

    bookItem.appendChild(bookTitleEl);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(removeBtn);

    bookList.appendChild(bookItem);
  });
};

addBtn.addEventListener('click', (event) => {
  event.preventDefault();

  Book.id = createBookId();
  Book.title = bookTitle.value;
  Book.author = bookAuthor.value;

  books = getLocalStorageBooks();

  books.push(Book);

  const booksString = JSON.stringify([books, Book.id]);
  localStorage.setItem('books', booksString); // updating the books array

  createBookListItem();
});

window.addEventListener('load', createBookListItem());
