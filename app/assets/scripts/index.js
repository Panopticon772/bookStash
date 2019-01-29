// user lib input selector
const getLibName = document.querySelector("#library-name");
const libNameBtn = document.querySelector("#add-library-name");

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

// sort
const organizeBooks = document.querySelector("#organize");

// library title selectors
const libTitleDiv = document.querySelector("#library-title");
const libTitle = document.querySelector("#title-lib-name");

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

const capitalizeEveryFirstLetter = (str) => {
    // convert to string and set all to lowercase
    const lower = String(str).toLowerCase();
    return lower.replace(/(^| )(\w)/g, (val) => val.toUpperCase());
}

const displayLibName = () => {
    // create H1 element
    const h1 = document.createElement("h1");
    // if lib name already exists, append it to page
    if (Object.keys(localStorage).includes("name")) {
        libTitle.textContent = `${localStorage.getItem("name")}'s library`;
    }
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

// display lib name if it already exists
displayLibName();

// when clicked creates name for library
libNameBtn.addEventListener("click", () => {
    // const h1 = document.createElement("h1");
    // localStorage.setItem("name", capitalizeFirst(getLibName.value));
    // h1.textContent = `${localStorage.getItem("name")}'s library`;
    // libTitle.appendChild(h1);
    // getLibName.value = "";

    // const h1 = document.createElement("h1");
    localStorage.setItem("name", capitalizeFirst(getLibName.value));
    libTitle.textContent = `${localStorage.getItem("name")}'s library`;
    // libTitle.appendChild(h1);
    getLibName.value = "";
});

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
        // reset inputs
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
    // close modal
    toggleModal();
    // reset books array
    booksArray.length = 0;
    // clear local storage
    clearData();
    // set library title name to empty string
    libTitle.textContent = "";
});

noBtn.addEventListener("click", toggleModal);

// errors
console.log(booksArray)

/*
3. filter books options, hightlight?
4. display as table
 */