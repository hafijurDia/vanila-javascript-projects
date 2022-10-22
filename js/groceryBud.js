// ***********Select Items********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// ***********Edit option********
let editElement;
let editFlag = false;
let editId = "";

// ***********Event listeners********
// ***********submit form********
form.addEventListener("submit", addItem);
// ***********clear items********
clearBtn.addEventListener("click", clearItems);
// ***********initial load items********
window.addEventListener("DOMContentLoaded", setupItems);

// ***********Functions********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    //create an element
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    //create an attribute
    const attr = document.createAttribute("data-id");
    //value set in attribute
    attr.value = id;
    //attribute set in element
    element.setAttributeNode(attr);
    //add list item among element
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
    //single delete item
    const deleteBtn = element.querySelector(".delete-btn");
    //single edit item
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    //apend child
    list.append(element);
    //show item container
    container.classList.add("show-container");
    displayAlert("Item added successfully", "success");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Item updated!", "success");
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter value", "danger");
  }
}
//single item delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
//single item edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //console.log(element);
  // edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //console.log(editElement);
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "Edit";
}
//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setInterval(function () {
    alert.textContent = " ";
    alert.classList.remove(`alert-${action}`);
  }, 1500);
}
// *********clear items funciton******
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("your cart is empty", "danger");
  setBackToDefault();
  localStorage.removeItem('list');
}
// *********set back default******
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}
// ***********Local Storage********
function addToLocalStorage(id, value) {
  //const grocery = {id:id,value:value};
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function(item){
        if (item.id !== id) {
            return item;
        }
    })
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item){
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
//localStorage API
//setItem
//getItem
//removeItem
//save as strings

// ***********Setup Items********
function setupItems(){
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function(item){
            createListItem(item.id,item.value);
        })
    //show item container
    container.classList.add("show-container");
    }
}

function createListItem(id,value){
    //create an element
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    //create an attribute
    const attr = document.createAttribute("data-id");
    //value set in attribute
    attr.value = id;
    //attribute set in element
    element.setAttributeNode(attr);
    //add list item among element
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
    //single delete item
    const deleteBtn = element.querySelector(".delete-btn");
    //single edit item
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    //apend child
    list.append(element);
}