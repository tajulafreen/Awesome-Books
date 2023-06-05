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

function getLocalStorageObject() {
  return JSON.parse(localStorage.getItem('books'));
}

function getLocalId() {
  return getLocalStorageObject()[1];
}

function getLocalBooks() {
  return getLocalStorageObject()[0];
}

const createLocalStorage = (id) => {
  const init = JSON.stringify([[], id]);
  localStorage.setItem('books', init);
};

const createBookId = () => {
  const bookID = getLocalId();
  if (!bookID) return 1;
  return bookID + 1;
};

const removeItem = (id) => {
  const newArray = books.filter((item) => item.id !== id);
  const currentStateId = getLocalId();
  const objectString = JSON.stringify([newArray, currentStateId]);
  localStorage.setItem('books', objectString);
};

const createBookListItem = () => {
  if (!getLocalStorageObject()) {
    createLocalStorage(null);
  }

  books = getLocalBooks();

  bookList.innerHTML = '';

  books.forEach((element) => {
    const bookItem = document.createElement('li');
    bookItem.id = element.id;

    const bookTitleEl = document.createElement('p');
    const bookAuthor = document.createElement('p');

    const removeBtn = document.createElement('button');
    removeBtn.id = element.id;
    removeBtn.classList.add('remove-btn');

    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', () => {
      removeItem(Number(removeBtn.id));
      createBookListItem();
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

  bookTitle.value = '';
  bookAuthor.value = '';

  books = getLocalBooks();

  books.push(Book);

  const booksString = JSON.stringify([books, Book.id]);
  localStorage.setItem('books', booksString); // updating the books array

  createBookListItem();
});

window.addEventListener('load', createBookListItem());
