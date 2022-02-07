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
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            console.log(urlParams)
            const aisleName = urlParams.get("aislename");
            console.log(aisleName);
            const ret = data["product"].filter((x)=>{
                return x["aisle"] == aisleName;
            });
            console.log(ret);
            return ret;
        })
}

window.addEventListener("load", async(event) => {
    const products = await readAislesXML();
    let container = document.getElementById('mainContainer');
    for (let i = 0; i < products.length; i++){
        let row = document.createElement('div');
        container.appendChild(row);
        row.classList.add('row');

        for (let j = i + 3; i < products.length || i < j; i++){
            let col = document.createElement('div');
            row.appendChild(col);
            col.classList.add('col-sm-2', 'border');
            let a = document.createElement('a');
            col.appendChild(a);
            a.href = "Product.html?id="+products[i]['id'];
            let p = document.createElement('p');
            a.appendChild(p);
            p.innerHTML = products[i]['name'];
            let img = document.createElement('img');
            a.appendChild(img);
            img.src = 'Data/' + products[i]['image'];
            img.classList.add('img-fluid');
            img.alt = "Image no available";
        }

    }
})