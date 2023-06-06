class Books {
  constructor(id, title, author) {
    this.books = [];
    this.id = id;
    this.title = title;
    this.author = author;
    this.bookTitle = document.querySelector("#book-title");
    this.bookAuthor = document.querySelector("#book-author");
    this.bookList = document.querySelector("#book-list");
  }

  add(book) {
    addBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const id = createBookId();
      const title = bookTitle.value;
      const author = bookAuthor.value;
      bookTitle.value = "";
      bookAuthor.value = "";
      this.books = getLocalBooks();
      this.books.push(book);

      const booksString = JSON.stringify([this.books, this.id]);
      localStorage.setItem("books", booksString); // updating the books array

      createBookListItem();
    });
  }

  removeItem(id) {
    const newArray = this.books.filter((item) => item.id !== id);
    const currentStateId1 = getLocalId();
    const objectString = JSON.stringify([newArray, currentStateId1]);
    localStorage.setItem("books", objectString);
  }
  getLocalStorageObject() {
    return JSON.parse(localStorage.getItem("books"));
  }

  getLocalId() {
    return getLocalStorageObject()[1];
  }

  getLocalBooks() {
    return getLocalStorageObject()[0];
  }

  createLocalStorage = (id) => {
    const init = JSON.stringify([[], id]);
    localStorage.setItem("books", init);
  };

  createBookId = () => {
    const bookID = getLocalId();
    if (!bookID) return 1;
    return bookID + 1;
  };

  // const removeItem = (id) => {
  //   const newArray = books.filter((item) => item.id !== id);
  //   const currentStateId1 = getLocalId();
  //   const objectString = JSON.stringify([newArray, currentStateId1]);
  //   localStorage.setItem('books', objectString);
  // };

  ccreateBookListItem = () => {
    if (!getLocalStorageObject()) {
      createLocalStorage(null);
    }

    this.books = getLocalBooks();

    bookList.innerHTML = "";

    this.books.forEach((element) => {
      const bookItem = document.createElement("li");
      bookItem.id = element.id;

      const bookTitleEl = document.createElement("p");
      const bookAuthor = document.createElement("p");

      const removeBtn = document.createElement("button");
      removeBtn.id = element.id;
      removeBtn.classList.add("remove-btn");

      removeBtn.textContent = "Remove";

      removeBtn.addEventListener("click", () => {
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
}
const book = new Books();
//const addBtn = document.querySelector('#addBtn');
//const bookTitle = document.querySelector("#book-title");
///const bookAuthor = document.querySelector("#book-author");
//const bookList = document.querySelector("#book-list");
window.addEventListener("load", createBookListItem());
