import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  /*
    The code imports a function called initializeApp from a specific version of the Firebase JavaScript library.

    The code imports several functions related to the Realtime Database, including getDatabase, ref, push, and onValue.

    The code sets a variable called firebaseSettings that includes the URL of the Firebase Realtime Database.

    The code initializes the Firebase app using the initializeApp function and the settings stored in firebaseSettings.

    The code gets a reference to the Firebase Realtime Database using the getDatabase function and the app initialized in step 4.

    The code sets a variable called moewsiesListInDB to a reference to the "Cart" node in the Firebase Realtime Database.

    The code has now finished setting up a connection to the Firebase Realtime Database and is ready to interact with it.
  */
  getDatabase,
  ref,
  push,
  onValue,
  remove
  
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseSettings = {
  databaseURL:
    "https://meowsies-8f6df-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseSettings);
const firebaseDatabase = getDatabase(app);
const moewsiesListInDB = ref(firebaseDatabase, "Cart");

const inputField = document.getElementById("input-fieldList");
const btnAddcart = document.getElementById("btn-addCart");
const btnClearInputs = document.getElementById("Reset-Cart");
const cartList = document.getElementById("Item-list");
cartList.classList.add('p-no-items');

btnAddcart.addEventListener("click", function () {
  const inputValue = inputField.value;
  push(moewsiesListInDB, inputValue);
});

onValue(moewsiesListInDB, function (snapshot) {

  if(snapshot.exists()){
    let todoArray = Object.entries(snapshot.val());

    ClearList();
    // or for(let i = 0; i < todoArray.length; i++);
    for (let todoItem of todoArray) {
      let currentItem = todoItem;
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
  
      addItem(currentItem);

    }
  }
  else{

    cartList.innerHTML = '<h4>Your Cart Is Empty</h4>';
   
  }

 
});

 const addItem = (item) => {
  let itemID = item[0];
  let itemValue = item[1];
  let createElem = document.createElement("li");
  let btncreateElem = document.createElement("span");
  btncreateElem.classList.add("btnDeleteItem");
  btncreateElem.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  createElem.textContent = itemValue;
  createElem.append(btncreateElem);
 

  createElem.addEventListener("click", function () {
    let exactMeowsiesItemInDB = ref(firebaseDatabase, `Cart/${itemID}`);
    remove(exactMeowsiesItemInDB);
  });

   cartList.appendChild(createElem);


  }

const ClearList = () => {
  cartList.innerHTML = "";
};
const ResetFields = () => {
  inputField.value = "";
};
btnClearInputs.addEventListener("click", ResetFields);
