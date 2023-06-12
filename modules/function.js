import Book from './class.js';

const eventslistner = () => {
  const book = new Book();
  book.add();
  const header = document.querySelector('header');
  const stickyHeader = header.offsetTop;

  window.onscroll = () => {
    if (window.pageXOffset > stickyHeader) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  window.addEventListener('load', () => {
    const localBooks = book.getLocalBooks();
    if (localBooks.length === 0) {
      const bookList = document.querySelector('#book-list');
      bookList.innerHTML = 'No recorded book list found';
    } else {
      book.createBookListItem();
    }
  });

  if (document.location.hash === '' || document.location.hash === '#') {
    document.location.hash = '#books';
  }
};
export default eventslistner;