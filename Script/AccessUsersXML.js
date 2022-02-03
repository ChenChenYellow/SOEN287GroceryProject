
import {xml2json} from './xml2json.js';
window.addEventListener("load", (event)=>{
    fetch('./Data/Users.xml')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data, 'text/xml');
            console.log(xmlDoc);
            console.log(xmlDoc.getElementsByTagName('users')[0]);
            console.log(xml2json(xmlDoc, "    "));
            let ret = xml2json(xmlDoc, "    ");
            console.log(ret["users"]);
            return ret["users"];
        })
        .then(function (users){
            let container = document.getElementById('mainContainer');
            let table = document.createElement("table");
            table.classList.add("table");
            table.classList.add("table-stripped");
            table.id = "tableNewMain";
            let tableHead = document.createElement("thead");
            let thEmail = document.createElement("th");
            thEmail.innerHTML = "Email";
            let thDetail = document.createElement("th");
            thDetail.innerHTML = "Detail";
            tableHead.appendChild(thEmail);
            tableHead.appendChild(thDetail);
            table.appendChild(tableHead);
            let tableBody = document.createElement("body");
            console.log(users);
            container.appendChild(table);
        });
})