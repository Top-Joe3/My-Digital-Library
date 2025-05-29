let dialog = document.querySelector("dialog");
let addBookBtn = document.querySelector("main button");
let done = document.querySelector("form button");
let form = document.querySelector("form");
let wrapper = document.querySelector(".book-cards-wrapper")

const myLibrary = []

// Book constructor function
function Book(title, author, pages){
    if (!new.target){
        throw Error("You did not include 'new' when calling the constructor function")
    }
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages){
    book = new Book(title, author, pages)
    myLibrary.push(book)
    displayBookCard()
}

function displayBookCard(){
    myLibrary.forEach(function(obj){
        if(document.getElementById(obj.id))
            return;
        let wrappedDiv = document.createElement("div")
        wrappedDiv.className = "book-cards"
        wrappedDiv.id = obj.id
        let img = document.createElement("img")
        img.src = "./image/cover.jpg"
        let subdiv = document.createElement("div")

        function labelValue(label, value){
            let innermostDiv = document.createElement("div")
            let keySpan = document.createElement("span")
            keySpan.textContent = label + ": "

            let valueSpan = document.createElement("span")
            valueSpan.textContent = value

            innermostDiv.append(keySpan, valueSpan)
            return innermostDiv
        }

        const title = labelValue("Title", obj.title)
        const author = labelValue("Author", obj.author)
        const pages = labelValue("Number of pages", obj.pages)
        subdiv.append(title, author, pages)

        let cardButtons = document.createElement("div")
        cardButtons.className = "card-buttons"
        let select = document.createElement("select")
        let option1 = document.createElement("option")
        option1.value = "unread"
        option1.textContent = "Unread"
        option1.selected = true
        let option2 = document.createElement("option")
        option2.value = "read"
        option2.textContent = "Read"
        select.append(option1, option2)

        let deleteBtn = document.createElement("img")
        deleteBtn.src = "./trash-can-outline.png"

        deleteBtn.addEventListener("click", () => {
            document.getElementById(obj.id).remove();

            // Removes book object from myLibrary too
            const index = myLibrary.findIndex(book => book.id === obj.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
        });

        cardButtons.append(select, deleteBtn)

        wrappedDiv.append(img, subdiv, cardButtons)
        wrapper.appendChild(wrappedDiv)
    })
    changeSelectColor()
}

// Submit event listener to submit form data to addToLibrary function
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    addBookToLibrary(formData.title, formData.author, formData.numberOfPages)
    form.reset()
    dialog.close()
});

// Click event listener for form validation 
done.addEventListener("click", (e) => {
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
    form.requestSubmit();
})

//Click event listener to pop form up
addBookBtn.addEventListener("click", () => {
    dialog.showModal()
});

document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".book-cards");
      if (card) card.remove();
    });
  });
  

function changeSelectColor(){
    const selects = document.querySelectorAll("select");
    selects.forEach(select => {
    // Set initial color
        updateSelectColor(select);
    
        // Add change event listener
        select.addEventListener("change", function() {
            updateSelectColor(this);
        });
    });

    // Helper function to update color
    function updateSelectColor(selectElement) {
    const selectedValue = selectElement.value;
    selectElement.style.backgroundColor = selectedValue === "unread" ? "#FF6016" : "#B4D772";
    }
}
changeSelectColor()
