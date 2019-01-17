// user lib input selector
const getLibName = document.querySelector("#library-name");

// book input selectors
const getBookTitle = document.querySelector("#book-title");
const getBookAuthor = document.querySelector("#book-author");
const getBookYear = document.querySelector("#book-year");

// add and remove btn
const getAddBtn = document.querySelector("#add-book");
const getRemoveBtn = document.querySelector("#remove-book");

// table selectors
const getBookTable = document.querySelector("#book-table");
const getBookData = document.querySelector("#book-data");

// created books
const selectBooks = document.querySelector("#books");

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
const displayBooks = () => {

    const books = retrieveBooks();
    console.log(books);

    for (let i = 0; i < books.length; i++) {
        let bookRow = getBookData.insertRow(-1);

        let titleCell = bookRow.insertCell(0);
        let authorCell = bookRow.insertCell(1);
        let yearCell = bookRow.insertCell(2);

        let titleText = document.createTextNode(books[i].title);
        let authorText = document.createTextNode(books[i].author);
        let yearText = document.createTextNode(books[i].year);

        titleCell.appendChild(titleText);
        authorCell.appendChild(authorText);
        yearCell.appendChild(yearText);
    }
}

// check if user already has storage, if so, display books, otherwise print "Add books!"
localStorage.length > 0 ? displayBooks() : console.log("Add books to get started!");

getAddBtn.addEventListener("click", () => {
    books.push({
        title: getBookTitle.value,
        author: getBookAuthor.value,
        year: getBookYear.value
    });

    bookStorage();
});

// 1 add render books function which displays books after page refresh
// 2 table needs to generate row and inside row, the data