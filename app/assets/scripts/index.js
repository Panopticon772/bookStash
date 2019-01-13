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

// get items from local storage
const displayBook = () => {
    let keys = Object.keys(localStorage);
    keys.forEach((title) => {
        let p = document.createElement("p");
        selectBook.appendChild(p);
        p.textContent = title;
    });
}

const resetInputs = () => {
    getBookTitle.value = "";
    getBookAuthor.value = "";
    getBookYear.value = "";
}

// display library if it already exists
if (localStorage.length > 0) {
    displayBook();
} else {
    console.log("start your library!")
}

// push book object into books arr when add book btn is clicked
getAddBtn.addEventListener("click", () => {
    books.push({
        title: getBookTitle.value,
        author: getBookAuthor.value,
        year: getBookYear.value
    });

    // store data
    storeBooks();

    // display title
    displayBook();

    // reset data fields
    resetInputs();
});