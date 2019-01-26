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

// modal selectors
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");

// modal btn choices
const yesBtn = document.querySelector("#delete-yes");
const noBtn = document.querySelector("#delete-no");

// let books initially be set equal to an empty array
let books;

const capitalizeFirstLetter = (str) => {
    // convert to string and set all to lowercase
    const lower = String(str).toLowerCase();
    return lower.replace(/(^| )(\w)/g, (val) => val.toUpperCase());
}

const clearData = () => {
    selectBooks.innerHTML = "";
    localStorage.clear();
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

    // add rows to table
    for (let i = 0; i < myBooks.length; i++) {
        tr = table.insertRow(-1);
        // add table cells for each property value in obj
        for (let j = 0; j < arr.length; j++) {
            const tabCell = tr.insertCell(-1);
            // if value is not a number convert first letter of every word to uppercase
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
    let id = 1;
    for (let i = 0; i < books.length; i++) {
        id++;
    }

    return id;
}

const removeBook = (id) => {
    // parse from local storage
    const bookArray = JSON.parse(localStorage.getItem("books"));
    // convert id from str to num
    const num = Number(id);
    //loop
    for (let i = bookArray.length - 1; i >= 0; i--) {
        if (bookArray[i] === num) {
            delete bookArray[i];
        }
    }
}

// toggle modal
const toggleModal = () => {
    modal.classList.toggle("show-modal");
}

const windowOnClick = (e) => {
    if (e.target === modal) {
        toggleModal();
    }
}

// check if user already has storage, if so, display books, otherwise print "Add books!"
if (localStorage.length > 0) {
    displayBooks();
} else {
    // convert to open modal
    console.log("Add some books to begin your library!");
}

getAddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // if books already exist in localStorage, get that array and push new book into it, otherwise create a new arr and add the book
    books = retrieveBooks();

    if (getBookTitle.value === "") {
        alert("Please enter a title.");
    } else if (getBookAuthor.value === "") {
        alert("Please enter an author.");
    } else {
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
    }
});

// when clicked, removes correct book according to ID
getRemoveBtn.addEventListener("click", () => {
    removeBook(removeId.value)
});

// remove table from screen and clear data from localStorage
eraseBooksBtn.addEventListener("click", () => {
    toggleModal();
});

window.addEventListener("click", windowOnClick);

// clear data after confirmation
yesBtn.addEventListener("click", () => {
    clearData();
    toggleModal();
});

noBtn.addEventListener("click", toggleModal);

/* 1. need to add warning to erase button -> done 1/23/19
2. fix remove btn
3. filter books options, hightlight?
 */