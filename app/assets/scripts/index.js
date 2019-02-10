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
    if (booksArray.length === 0) {
        return;
    } else {
        // set keys equal to ["title", "author", "year"]
        const keys = Object.keys(booksArray[0]);
        // create 1 row for table
        let newRow = table.insertRow(-1);
        // create table header
        let thead = document.createElement("thead");

        // iterate over each element in keys (title, author, year)
        keys.forEach((ele) => {
            // create th for every ele
            let th = document.createElement("th");
            // set th text content to ele values
            th.textContent = ele.toUpperCase();
            // append th to row
            newRow.appendChild(th);
        });

        /* // iterate over each element in keys (title, author, year)
        keys.forEach((ele) => {
            // insert a cell for every element
            let newCell = newRow.insertCell(-1);
            // set cell text equal to value of element
            let newText = document.createTextNode(ele.toUpperCase());
            newCell.appendChild(newText);
        }); */

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

const colorRow = () => {
    if (selectBooks.textContent === "") {
        // returns undefined
        return;
    } else {
        // GET FIRST TABLE ROW
        const firstRow = document.getElementsByTagName("tr")[0];
        // SELECT ALL Th
        const th = firstRow.querySelectorAll("th");
        // LOOP OVER TD AND APPLY BACKGROUND COLOR
        for (let i = 0; i < th.length; i++) {
            th[i].style.backgroundColor = "rgb(157, 84, 89)";
            th[i].style.textShadow = "1px 1px 1px #000";
        }
    }
    
}

const titleBgColor = () => {
    if (libTitle.textContent === "") {
        libTitle.style.background = "none";
        libTitle.style.border = "none";
    } else {
        libTitle.style.background = "rgb(50, 55, 77)";
        libTitle.style.border = "1px solid #fff";
    }
}

if (booksArray.length > 0) {
    selectBooks.appendChild(tableMaker());
    colorRow();
} else {
    console.log("Add a library name and some books to get started!");
}

// LIBRARY NAME BTN
libNameBtn.addEventListener("click", () => {
    // if value is equal to empty string, alert that user must enter data
    if (getLibName.value === "") {
        alert("Please enter a valid name!");
        // otherwise, set lib name in local storage, then display on screen
    } else {
        localStorage.setItem("name", capitalizeFirst(getLibName.value));
        libTitle.textContent = `${localStorage.getItem("name")}'s library`;
        // apply background color to title
        titleBgColor();
        getLibName.value = "";
    }
    
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
        // add top row coloring
        colorRow();
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
    // append new table only if booksArray has items in it
    if (booksArray.length > 0) {
        selectBooks.appendChild(tableMaker());
    }
    colorRow();
    removeId.value = "";
});

// SEARCH BOOKS
sortBtn.addEventListener("click", () => {
    selectBooks.textContent = "";
    selectBooks.appendChild(tableMaker());
    searchBooks(sortInput.value.toLowerCase());
    colorRow();
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
    titleBgColor();
    selectBooks.textContent = "";
});

noBtn.addEventListener("click", toggleModal);

displayLibName();

titleBgColor();

// errors

/*
1. add alternating color rows to table
 */