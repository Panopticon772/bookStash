// LIBRARY NAME
const getLibName = document.querySelector("#library-name");
const libNameBtn = document.querySelector("#add-library-name");

// BOOK INPUTS
const getBookTitle = document.querySelector("#book-title");
const getBookAuthor = document.querySelector("#book-author");
const getBookYear = document.querySelector("#book-year");

// ADD AND REMOVE
const getAddBtn = document.querySelector("#add-book");
const getRemoveBtn = document.querySelector("#remove-book");

// TABLE
const bookTable = document.querySelector("#book-table");

// REMOVE BOOKS
const removeId = document.querySelector("#remove-id");

// lib div
const libDiv = document.querySelector("#book-library");

// BOOKS LIBRARY
const selectBooks = document.querySelector("#books");

// SORT BOOKS
// organize div
const organizeBooks = document.querySelector("#organize");
// book sort input
const sortInput = document.querySelector("#book-sort");
const sortBtn = document.querySelector("#sort-btn");

// LIBRARY NAME DISPLAY
const libTitleDiv = document.querySelector("#library-title");
const libTitle = document.querySelector("#title-lib-name");

// ERASE LIBRARY
const eraseBooksBtn = document.querySelector("#erase-btn");

// MODAL
const modal = document.querySelector(".modal");

// MODAL BTNS
const yesBtn = document.querySelector("#delete-yes");
const noBtn = document.querySelector("#delete-no");

// SEARCH MODAL

// set books equal to local storage if it already exists, if not, set to empty array
let booksArray = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];

// store books array as JSON string in localStorage
const bookStorage = () => localStorage.setItem("books", JSON.stringify(booksArray));

const capitalizeEveryFirstLetter = (str) => {
    // convert to string and set all to lowercase
    const lower = String(str).toLowerCase();
    return lower.replace(/(^| )(\w)/g, (val) => val.toUpperCase());
}

const displayLibName = () => {
    // if lib name already exists, append it to page
    if (Object.keys(localStorage).includes("name")) {
        libTitle.textContent = `${localStorage.getItem("name")}'s library`;
    }
}

const tableMaker = () => {
    // create table element
    const table = document.createElement("table");
    // give table id of book-table
    table.id = "book-table";
    // set keys equal to ["title", "author", "year"]
    const keys = Object.keys(booksArray[0]);
    // create 1 row for table
    let newRow = table.insertRow(-1);

    // iterate over each element in keys (title, author, year)
    keys.forEach((ele) => {
        // insert a cell for every element
        let newCell = newRow.insertCell(-1);
        // set cell text equal to value of element
        let newText = document.createTextNode(ele.toUpperCase());
        newCell.appendChild(newText);
    });

    booksArray.forEach((book) => {
        // create row for each obj
        let bookRow = table.insertRow(-1);
        // insert cells in row
        let titleCell = bookRow.insertCell(-1);
        let authorCell = bookRow.insertCell(-1);
        let yearCell = bookRow.insertCell(-1);
        // insert text into cells
        let titleText = document.createTextNode(capitalizeEveryFirstLetter(book.title));
        let authorText = document.createTextNode(capitalizeEveryFirstLetter(book.author));
        let yearText = document.createTextNode(capitalizeEveryFirstLetter(book.year));
        // put text into cells
        titleCell.appendChild(titleText);
        authorCell.appendChild(authorText);
        yearCell.appendChild(yearText);
        // append new row to table
        table.appendChild(bookRow);
    });

    // return table to function
    return table;
}

// search books based on matching criteria
const searchBooks = (text) => {
    // get all td elements
    let tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
        if (tds[i].textContent.toLowerCase().includes(text)) {
            tds[i].classList.add("highlight");
        } else {
            console.log("book not found");
        }
    }
    sortInput.value = "";
}

const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.substring(1);

const clearData = () => {
    localStorage.clear();
}

// reset inputs
const resetData = () => {
    getBookTitle.value = "";
    getBookAuthor.value = "";
    getBookYear.value = "";
}

const removeBook = (bookTitle) => {
    // removes book obj from array
    for (let i = 0; i < booksArray.length; i++) {
        if (booksArray[i].title === bookTitle) {
            booksArray.splice(i, 1);
        }
    }
    // update local Storage
    bookStorage();
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

displayLibName();

selectBooks.appendChild(tableMaker());

// LIBRARY NAME BTN
libNameBtn.addEventListener("click", () => {
    localStorage.setItem("name", capitalizeFirst(getLibName.value));
    libTitle.textContent = `${localStorage.getItem("name")}'s library`;
    getLibName.value = "";
});

// ADD BOOK BTN
getAddBtn.addEventListener("click", () => {
    if (getBookTitle.value === "") {
        alert("Please enter a title.");
    } else if (getBookAuthor.value === "") {
        alert("Please enter an author.");
    } else {
        // push user input values to array
        booksArray.push({
            title: getBookTitle.value.toLowerCase().trim(),
            author: getBookAuthor.value.toLowerCase().trim(),
            year: getBookYear.value.toLowerCase().trim()
        });
        // save book arr to local storage
        bookStorage();
        // clear existing table
        selectBooks.textContent = "";
        // append new table
        selectBooks.appendChild(tableMaker());
        // reset inputs
        resetData();
    }
});

// REMOVE BOOK BTN
getRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeBook(removeId.value.toLowerCase());
    // clear existing table
    selectBooks.textContent = "";
    // append new table
    selectBooks.appendChild(tableMaker());
    removeId.value = "";
});

// SEARCH BOOKS
sortBtn.addEventListener("click", () => {
    selectBooks.textContent = "";
    selectBooks.appendChild(tableMaker());
    searchBooks(sortInput.value.toLowerCase());
});

// ERASE LIBRARY BTN
eraseBooksBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal();
});

window.addEventListener("click", windowOnClick);

// clear data after confirmation
yesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // close modal
    toggleModal();
    // reset books array
    booksArray.length = 0;
    // clear local storage
    clearData();
    // set library title name and book table to empty string
    libTitle.textContent = "";
    selectBooks.textContent = "";
});

noBtn.addEventListener("click", toggleModal);

// errors

/*
3. filter books options, currently highlights all no matter what select option is
4. add ability to sort table, type in letter and it highlights according to that text
 */