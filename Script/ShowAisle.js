import { xml2json } from './xml2json.js'

function readAislesXML(aisleName) {
  return fetch('./Data/Inventory.xml')
    .then(function (response) {
      return response.text()
    })
    .then(function (data) {
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(data, 'text/xml')
      let ret = xml2json(xmlDoc, '    ')
      return ret['inventory']
    })
    .then(function (data) {
      const ret = data['product'].filter((x) => {
        return x['aisle'] == aisleName
      })
      return ret
    })
}

function getAisleName() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const aisleName = urlParams.get('aislename')
  return aisleName
}

window.addEventListener('load', async (event) => {
  const aisleName = getAisleName()
  const products = await readAislesXML(aisleName)

  let aisleNameH1 = document.getElementById('aisleName')
  let words = aisleName.toLowerCase().split('_')
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
  }
  aisleNameH1.innerHTML = words.join(' ')
  document.getElementById('title').innerHTML = aisleNameH1.innerHTML;
  let cardContainer = document.getElementById('cardContainer')
  let cardRow = document.createElement('div')
  cardContainer.appendChild(cardRow)
  cardRow.classList.add('row')
  for (let i = 0; i < products.length; i++) {
    let card = document.createElement('div')
    cardRow.appendChild(card)
    card.classList.add('shadow', 'card', 'col-lg-2', 'mb-4')
    card.onmouseover = function () {
      this.style.backgroundColor = 'rgb(235,235,235)'
    }
    card.onmouseleave = function () {
      this.style.backgroundColor = 'rgb(250,250,250)'
    }
    card.style.transition = 'all 0.4s'
    let img = document.createElement('img')
    card.appendChild(img)
    img.src = 'Data/' + products[i]['image']
    img.classList.add('card-img-top')
    img.alt = 'Image no available'

    let cardBody = document.createElement('div')
    card.appendChild(cardBody)
    cardBody.classList.add('card-body', 'd-flex', 'flex-column')
    let a = document.createElement('a')
    cardBody.appendChild(a)
    a.href = 'P3_Product_YCH.html?id=' + products[i]['id']
    a.classList.add('text-decoration-none', 'stretched-link')
    a.style.color = 'inherit'
    let hr = document.createElement('hr')
    cardBody.appendChild(hr)
    hr.style.width = '90%'
    hr.style.height = '0.5px'
    hr.style.backgroundColor = 'rgb(250,250,250,0.2)'
    let h5 = document.createElement('h5')
    h5.innerHTML = products[i]['name']
    h5.classList.add('card-title', 'mt-auto')
    cardBody.appendChild(h5)
  }
})
