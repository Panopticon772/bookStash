// book input selectors
const getBookTitle = document.querySelector("#book-title");
const getBookAuthor = document.querySelector("#book-author");
const getBookYear = document.querySelector("#book-year");

// add and remove btn
const getAddBtn = document.querySelector("#add-book");
const getRemoveBtn = document.querySelector("#remove-book");

// created books
const selectBook = document.querySelector("#books");

// arr of objects
let books = [];

// add books arr to local storage
const storeBooks = () => localStorage.setItem(getBookTitle.value, JSON.stringify(books));

// get book from local storage
const getBook = () => JSON.parse(localStorage.getItem("book"));

// push book object into books arr when add book btn is clicked
getAddBtn.addEventListener("click", () => {
    books.push({
        title: getBookTitle.value,
        author: getBookAuthor.value,
        year: getBookYear.value
    });

    // store array in localStorage
    storeBooks();
});