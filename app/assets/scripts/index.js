// user lib input selector
const getLibName = document.querySelector("#library-name");

// book input selectors
const getBookTitle = document.querySelector("#book-title");
const getBookAuthor = document.querySelector("#book-author");
const getBookYear = document.querySelector("#book-year");

// add and remove btn
const getAddBtn = document.querySelector("#add-book");
const getRemoveBtn = document.querySelector("#remove-book");

// table selector
const bookTable = document.querySelector("#book-table");

// id remove input
const removeId = document.querySelector("#remove-id");

// lib div
const libDiv = document.querySelector("#book-library");

// created books library
const selectBooks = document.querySelector("#books");

// erase library btn
const eraseBooksBtn = document.querySelector("#erase-btn");

// let books initially be set equal to an empty array
let books = [];

const capitalizeFirstLetter = (str) => {
    // convert to string and set all to lowercase
    const lower = String(str).toLowerCase();
    return lower.replace(/(^| )(\w)/g, (val) => val.toUpperCase());
}

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

// display books as table
const displayBooks = () => {
    let arr = [];
    const myBooks = JSON.parse(localStorage.getItem("books"));

    // extract book object properties to use as table headers (id, title, author, year)
    for (let i = 0; i < myBooks.length; i++) {
        for (let key in myBooks[i]) {
            if (arr.indexOf(key) === -1) {
                arr.push(key);
            }
        }
    }

    // create table element
    let table = document.createElement("table");
    // set table id
    table.setAttribute("id", "book-table");

    // insert new row in table
    let tr = table.insertRow(-1);

    // create table headers from values, then append to table row
    for (let i = 0; i < arr.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = arr[i].toUpperCase();
        tr.appendChild(th);
    }

    // loop over myBook arr and add JSON data (book object property values) to table as rows
    for (let i = 0; i < myBooks.length; i++) {
        tr = table.insertRow(-1);

        for (let j = 0; j < arr.length; j++) {
            const tabCell = tr.insertCell(-1);
            // if not a number convert first letter of every word to uppercase
            if (isNaN(myBooks[i][arr[j]])) {
                tabCell.innerHTML = capitalizeFirstLetter(myBooks[i][arr[j]]);
            } else {
                tabCell.innerHTML = myBooks[i][arr[j]];
            }
            
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
    // convert to open modal
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

    displayBooks();

    // reset user input
    resetData();
});

// when clicked, removes correct book according to ID
getRemoveBtn.addEventListener("click", () => {
    const books = JSON.parse(localStorage.getItem("books"));
    console.log(books);
    for (let i = 0; i < books.length; i++) {
        console.log(books[i].id);
    }
});

// remove table from screen and clear data from localStorage
eraseBooksBtn.addEventListener("click", () => {
    selectBooks.innerHTML = "";
    localStorage.clear();
});

console.log(removeId.value);

/* 1. need to add warning to erase button
2. fix remove btn */