// book input selectors
const getBookTitle = document.querySelector("#book-title");
const getBookAuthor = document.querySelector("#book-author");
const getBookYear = document.querySelector("#book-year");

// add and remove btn
const getAddBtn = document.querySelector("#add-book");
const getRemoveBtn = document.querySelector("#remove-book");

// created books
const libraryHeader = document.querySelector("#library-header");
const selectBooks = document.querySelector("#books");

// check if user already has storage, if so, display books, otherwise print "Add books!"
// localStorage.length > 0 ? displayBooks(books) : console.log("Add books to get started!");

let books = [];

// store books as JSON string in localStorage
const bookStorage = () => localStorage.setItem("books", JSON.stringify(books));

// retrieve books from localStorage
const retrieveBooks = () => JSON.parse(localStorage.getItem("books"));

// reset inputs
const resetData = () => {
    getBookTitle.value = "";
    getBookAuthor.value = "";
    getBookYear.value = "";
}

// add book render on page refresh

// display books on screen as text
const displayBooks = (books) => {

    for (let i = 0; i < books.length; i++) {
        // create section to place inside div
        const section = document.createElement("section");

        // create other elements to place in section
        const title_h3 = document.createElement("h3");
        const author_p = document.createElement("p");
        const year_p = document.createElement("p");

        // apply text to created elements
        title_h3.textContent = books[i].title;
        author_p.textContent = books[i].author;
        year_p.textContent = books[i].year;

        // append created elements to section element
        section.appendChild(title_h3);
        section.appendChild(author_p);
        section.appendChild(year_p);

        // append section to books area
        selectBooks.appendChild(section);
    }
}

getAddBtn.addEventListener("click", () => {
    books.push({
        title: getBookTitle.value,
        author: getBookAuthor.value,
        year: getBookYear.value
    });

    displayBooks(books);

    bookStorage();
});