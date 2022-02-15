import {xml2json} from './xml2json.js';

function readAislesXML() {
    return fetch('./Data/Inventory.xml')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data, 'text/xml');
            let ret = xml2json(xmlDoc, "    ");
            return ret["inventory"];
        })
        .then(function (data){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const aisleName = urlParams.get("aislename");
            const ret = data["product"].filter((x)=>{
                return x["aisle"] == aisleName;
            });
            return ret;
        })
}

window.addEventListener("load", async(event) => {
    const products = await readAislesXML();
    let container = document.getElementById('mainContainer');
    let cardColumns = document.createElement('div');
    container.appendChild(cardColumns);
    cardColumns.classList.add('card-columns');
    for (let i = 0; i < products.length; i++){
        let card = document.createElement('div');
        cardColumns.appendChild(card);
        card.classList.add('shadow', 'card');
        card.onmouseover = function (){
            this.style.backgroundColor = 'rgb(240,240,240)';
        }
        card.onmouseleave = function (){
            this.style.backgroundColor = 'rgb(250,250,250)';
        }
        let cardBody = document.createElement('div');
        card.appendChild(cardBody);
        cardBody.classList.add('card-body');
        let a = document.createElement('a');
        cardBody.appendChild(a);
        a.href = "P3_Product_YCH.html?id="+products[i]['id'];
        a.classList.add('text-decoration-none', 'stretched-link');
        a.style.color = 'inherit';
        let h5 = document.createElement('h5');
        h5.innerHTML = products[i]['name'];
        h5.classList.add('card-title')
        cardBody.appendChild(h5);
        let img = document.createElement('img');
        card.appendChild(img);
        img.src = 'Data/' + products[i]['image'];
        img.classList.add('card-img-bottom');
        img.alt = "Image no available";
    }
})