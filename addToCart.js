import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {

    databaseURL: "https://mycart-f0f03-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")



const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const ulEl = document.getElementById("shopping-list")

addButton.addEventListener("click", function () {

    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)

    clearInputField()
    
})

onValue(shoppingListInDB, function(snapshot){

   
    if(snapshot.exists()){

        let itemListArray = Object.entries(snapshot.val())

        clearShoppingListEL()
    for ( let i =0; i <itemListArray.length; i++){

        let currentItem = itemListArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendListItem( currentItem) 
    }
    }else{
        ulEl.innerHTML = "Hey, no items in your cart. Please add some..."
    }
})

function clearShoppingListEL(){

    ulEl.innerHTML = ""

}
function clearInputField(){

    inputField.value = ""
}

function appendListItem(item){

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    ulEl.append(newEl)
}
