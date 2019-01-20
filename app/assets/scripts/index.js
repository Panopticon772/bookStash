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

// let books initially be set equal to an empty array
let books = [];

// store books as JSON string in localStorage
const bookStorage = () => localStorage.setItem("books", JSON.stringify(books));

// retrieve books from localStorage
const retrieveBooks = () => localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];

// reset inputs
const resetData = () => {
    getBookTitle.value = "";
    getBookAuthor.value = "";
    getBookYear.value = "";
}

// display books on screen as text
const displayBooks = () => {
    let books = JSON.parse(localStorage.getItem("books"));

    for (let i = 0; i < books.length; i++) {
    
        let newBookRow = getBookData.insertRow(-1);

        let titleCell = newBookRow.insertCell(0);
        let authorCell = newBookRow.insertCell(1);
        let yearCell = newBookRow.insertCell(2);

        let titleText = document.createTextNode(books[i].title);
        let authorText = document.createTextNode(books[i].author);
        let yearText = document.createTextNode(books[i].year);

        titleCell.appendChild(titleText);
        authorCell.appendChild(authorText);
        yearCell.appendChild(yearText);
    }
}

// check if user already has storage, if so, display books, otherwise print "Add books!"
if (localStorage.length > 0) {
    displayBooks();
} else {
    console.log("Add some books to begin your library!");
}

getAddBtn.addEventListener("click", () => {
    // if books already exist in localStorage, get that array and push new book into it, otherwise create a new arr and add the book
    books = retrieveBooks();

    // push user input values to array
    books.push({
        title: getBookTitle.value,
        author: getBookAuthor.value,
        year: getBookYear.value
    });

    // store array as JSON
    bookStorage();

    // reset user input
    resetData();
});