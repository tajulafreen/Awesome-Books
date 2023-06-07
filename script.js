class Book {
  constructor() {
    this.books = [];
    this.id = null;
    this.title = "";
    this.author = "";
    this.Title = document.querySelector("#book-title");
    this.Author = document.querySelector("#book-author");
    this.bookList = document.querySelector("#book-list");
    this.addBtn = document.querySelector("#addBtn");
  }

  add() {
    this.addBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.books = this.getLocalBooks();
      const tmpObject = {
        id: this.createBookId(),
        title: this.Title.value,
        author: this.Author.value,
      };
      this.books.push(tmpObject);
      this.Title.value = "";
      this.Author.value = "";
      const booksString = JSON.stringify([this.books, tmpObject.id]);
      localStorage.setItem("books", booksString);
      this.createBookListItem();
    });
  }

  removeItem(id) {
    const newArray = this.books.filter((item) => item.id !== id);
    const currentStateId1 = this.getLocalId();
    const objectString = JSON.stringify([newArray, currentStateId1]);
    localStorage.setItem("books", objectString);
  }

  getLocalStorageObject = () => JSON.parse(localStorage.getItem("books"));
  getLocalId() {
    return this.getLocalStorageObject()[1];
  }

  getLocalBooks() {
    return this.getLocalStorageObject()[0];
  }

  createLocalStorage = (id) => {
    const init = JSON.stringify([[], id]);
    localStorage.setItem("books", init);
  };

  createBookId() {
    const bookID = this.getLocalId();
    if (!bookID) return 1;
    return bookID + 1;
  }

  createBookListItem() {
    if (!this.getLocalStorageObject()) {
      this.createLocalStorage(null);
    }

    this.books = this.getLocalBooks();

    this.bookList.innerHTML = "";

    this.books.forEach((element) => {
      const bookItem = document.createElement("li");
      bookItem.id = element.id;

      const bookDetailsEl = document.createElement("p");

      const removeBtn = document.createElement("button");
      removeBtn.id = element.id;
      removeBtn.classList.add("remove-btn");

      removeBtn.textContent = "Remove";

      removeBtn.addEventListener("click", () => {
        this.removeItem(Number(removeBtn.id));
        this.createBookListItem();
      });

      bookDetailsEl.textContent = `"${element.title}" by ${element.author}`;

      bookItem.appendChild(bookDetailsEl);
      bookItem.appendChild(removeBtn);

      this.bookList.appendChild(bookItem);
    });
  }
}
const book = new Book();
book.add();

const header = document.querySelector("header");
const stickyHeader = header.offsetTop;

window.onscroll = () => {
  if (window.pageXOffset > stickyHeader) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

window.addEventListener("load", () => {
  const localBooks = book.getLocalBooks();
  if (localBooks.length === 0) {
    const bookList = document.querySelector("#book-list");
    bookList.innerHTML = "No recorded book list found";
  } else {
    book.createBookListItem();
  }
});

if (document.location.hash === "" || document.location.hash === "#") {
  document.location.hash = "#books";
}
