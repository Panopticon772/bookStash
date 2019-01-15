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

const library = [];

const resetData = () => {
    getBookTitle.value = "";
    getBookAuthor.value = "";
    getBookYear.value = "";
}

const displayBooks = (library) => {

    for (let i = 0; i < library.length; i++) {
        // create section to place inside div
        const section = document.createElement("section");

        // create other elements to place in section
        const title_h3 = document.createElement("h3");
        const author_p = document.createElement("p");
        const year_p = document.createElement("p");

        // apply text to created elements
        title_h3.textContent = library[i].title;
        author_p.textContent = library[i].author;
        year_p.textContent = library[i].year;

        // append created elements to section element
        section.appendChild(title_h3);
        section.appendChild(author_p);
        section.appendChild(year_p);

        // append section to books area
        selectBooks.appendChild(section);
    }
}

// allow user to enter, title, author, year of book
getAddBtn.addEventListener("click", () => {
    library.push({
        "title": getBookTitle.value,
        "author": getBookAuthor.value,
        "year": getBookYear.value
    });

    displayBooks(library);

    // reset inputs
    resetData();
});

// after entering data, should display book info on screen and push to localStorage

/* PRACTICE OBJECT

const library = {
    "libraryName": "Chip's Library",
    "created": 2019,
    "books": [
        {
            "title": "The Road",
            "author": "Cormac McCarthy",
            "year": 2014
        },
        {
            "title": "The Stand",
            "author": "Stephen King",
            "year": 1987
        },
        {
            "title": "The Fellowship of the Ring",
            "author": "J.R.R. Tolkien",
            "year": 1954
        }
    ]
}

const displayBook = (obj) => {
    const header_h1 = document.createElement("h1");
    header_h1.textContent = obj["libraryName"];
    selectBookHeader.appendChild(header_h1);

    const subHeader_h2 = document.createElement("h2");
    subHeader_h2.textContent = obj["created"];
    selectBookHeader.appendChild(subHeader_h2);
}

const showBooks = (obj) => {
    const books = obj["books"];

    for (let i = 0; i < books.length; i++) {

        // create elements
        const createSection = document.createElement("section");
        const createTitle = document.createElement("h3");
        const createAuthor = document.createElement("p");
        const createYear = document.createElement("p");

        // apply text content to created elements
        createTitle.textContent = books[i].title;
        createAuthor.textContent = `Author: ${books[i].author}`;
        createYear.textContent = `Year: ${books[i].year}`;

        // append elements to created Section element
        createSection.appendChild(createTitle);
        createSection.appendChild(createAuthor);
        createSection.appendChild(createYear);

        // append created Section element to books area
        selectBook.appendChild(createSection);
    }
}

displayBook(library);
showBooks(library); */