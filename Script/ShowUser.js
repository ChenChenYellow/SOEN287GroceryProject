import { xml2json } from "./xml2json.js";

function readUserXML() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const operation = urlParams.get("operation");
  if (operation == "add") {
    return fetch("./Data/Users.xml") // Load Users.xml
      .then(function (response) {
        return response.text(); // Convert it to string
      })
      .then(function (data) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, "text/xml"); // Convert string to xml
        let ret = xml2json(xmlDoc, "    "); // Convert xml to json
        return ret["users"]; // Return array of user
      })
      .then(function (data) {
        const last = data["user"][data.user.length - 1]; // Get the last user of array
        const ret = parseInt(last["id"]) + 1; // Get its id + 1
        return ret;
      });
  } else if (operation == "update") {
    const id = urlParams.get("id");
    return fetch("./Data/Users.xml")
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        let parser = new DOMParser(),
          xmlDoc = parser.parseFromString(data, "text/xml");
        let ret = xml2json(xmlDoc, "    ");
        return ret["users"];
      })
      .then(function (data) {
        const ret = data["user"].filter((x) => {
          return x["id"] == id;
        })[0];
        return ret;
      });
  } else {
    return null;
  }
}

window.addEventListener("load", async (event) => {
  let user = await readUserXML();
  if (Number.isInteger(user)) {
    // Add new user
    let btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.hidden = true;
    let inputID = document.getElementById("inputID");
    inputID.value = user;
    let textID = document.getElementById("textID");
    textID.innerHTML = user;
  } else if (user != null) {
    // Update user
    let btnAdd = document.getElementById("btnAdd");
    btnAdd.hidden = true;
    let id = user["id"];
    let firstname = user["firstname"];
    let lastname = user["lastname"];
    let email = user["email"];
    let password = user["password"];
    let cardnumber = user["cardnumber"];
    let address = user["address"];
    let inputID = document.getElementById("inputID");
    inputID.value = id;
    let textID = document.getElementById("textID");
    textID.innerHTML = id;
    let inputFirstName = document.getElementById("inputFirstName");
    inputFirstName.value = firstname;
    let inputLastName = document.getElementById("inputLastName");
    inputLastName.value = lastname;
    let inputEmail = document.getElementById("inputEmail");
    inputEmail.value = email;
    let inputPassword = document.getElementById("inputPassword");
    inputPassword.value = password;
    let inputCardNumber = document.getElementById("inputCardNumber");
    inputCardNumber.value = cardnumber;
    let inputAddress = document.getElementById("inputAddress");
    inputAddress.value = address;
    
  } else {
    // We have a problem
    let btnAdd = document.getElementById("btnAdd");
    btnAdd.hidden = true;
    let btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.hidden = true;
  }
  console.log(user);
});
