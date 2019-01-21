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
    let arr = [];
    const myBooks = JSON.parse(localStorage.getItem("books"));

    // loop over myBooks array
    for (let i = 0; i < myBooks.length; i++) {
        // loop over property names
        for (let key in myBooks[i]) {
            // if property name is not found, store in arr
            if (arr.indexOf(key) === -1) {
                arr.push(key);
            }
        }
    }

    // create table element
    const table = document.createElement("table");

    // insert new row in table
    let tr = table.insertRow(-1);

    // loop over arr, create table headers from values, then append to table row
    for (let i = 0; i < arr.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = arr[i];
        tr.appendChild(th);
    }

    // loop over books array and create new table row
    for (let i = 0; i < myBooks.length; i++) {
        tr = table.insertRow(-1);

        // loop over arr, set new cells to the property values
        for (let j = 0; j < arr.length; j++) {
            const tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][arr[j]];
        }
    }

    // set div to empty string
    selectBooks.innerHTML = "";
    // append table to div
    selectBooks.appendChild(table);
}

// give book an ID and increment by 1 on every loop
const bookID = () => {
    let id = 0;
    for (let i = 0; i < books.length; i++) {
        id++;
    }

    return id;
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
        id: bookID(),
        title: getBookTitle.value,
        author: getBookAuthor.value,
        year: getBookYear.value
    });

    // store array as JSON
    bookStorage();

    console.log(books);
    displayBooks();

    // reset user input
    resetData();
});