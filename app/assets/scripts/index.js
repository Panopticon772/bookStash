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

// remove id input
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

// set books equal to local storage if it already exists, if not, set to empty array
let booksArray = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];

// store books array as JSON string in localStorage
const bookStorage = () => localStorage.setItem("books", JSON.stringify(booksArray));

const capitalizeFirstLetter = (str) => {
    // convert to string and set all to lowercase
    const lower = String(str).toLowerCase();
    return lower.replace(/(^| )(\w)/g, (val) => val.toUpperCase());
}

const clearData = () => {
    localStorage.removeItem("books");
}

// reset inputs
const resetData = () => {
    getBookTitle.value = "";
    getBookAuthor.value = "";
    getBookYear.value = "";
}

// find index in array that matches the title
const removeBook = (bookTitle) => {
    // loop over books arr
    for (let i = 0; i < booksArray.length; i++) {
        if (booksArray[i].title === bookTitle) {
            booksArray.splice(i, 1);
        }
    }
    // overwrite current books arr in local storage
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

getAddBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (getBookTitle.value === "") {
        alert("Please enter a title.");
    } else if (getBookAuthor.value === "") {
        alert("Please enter an author.");
    } else {
        // push user input values to array
        booksArray.push({
            title: getBookTitle.value.toLowerCase(),
            author: getBookAuthor.value.toLowerCase(),
            year: getBookYear.value.toLowerCase()
        });

        bookStorage();

        resetData();
    }
});

// when clicked, removes correct book according to ID
getRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeBook(removeId.value.toLowerCase());
    removeId.value = "";
});

// erase library from local storage
eraseBooksBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal();
});

window.addEventListener("click", windowOnClick);

// clear data after confirmation
yesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearData();
    toggleModal();
});

noBtn.addEventListener("click", toggleModal);

/* 1. need to add warning to erase button -> done 1/23/19
2. fix remove btn
3. filter books options, hightlight?
4. display as table
5. remove book by title => done 1/27/2019
 */