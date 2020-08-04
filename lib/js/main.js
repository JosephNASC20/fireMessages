const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let db = firebase.database().ref();// database object with variable name as db

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    let userInfo = {
        "Name" : username,
        "Message" : message,
    };

    db.push(userInfo);

}

// Set database "child_added" event listener here
db.on("child_added",addToScreen);

let messageBox = document.querySelector(".allMessages");
function addToScreen(rowData){
    let boardInfo = rowData.val();
    //board info from json

    let myName = boardInfo.Name;
    let myMessage = boardInfo.Message;

    let pElement = document.createElement("p");
    pElement.innerText = myName + ": " + myMessage;

    messageBox.appendChild(pElement);
}