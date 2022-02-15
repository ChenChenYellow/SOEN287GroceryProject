import { xml2json } from './xml2json.js'

function readProductXML() {
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
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const id = urlParams.get('id')
      const ret = data['product'].filter((x) => {
        return x['id'] == id
      })[0]
      return ret
    })
}

window.addEventListener('load', async (event) => {
  const productInfo = await readProductXML()
  let row = document.getElementById('mainRow')
  let col = document.createElement('div')
  row.appendChild(col)
  col.classList.add('col-lg-6')
  let image = document.createElement('img')
  col.appendChild(image)
  image.classList.add('pt-3', 'pb-3', 'mx-auto')
  image.src = 'Data/' + productInfo['image']

  col = document.createElement('div')
  row.appendChild(col)
  col.classList.add('col-lg-6')

  let hr = document.createElement('hr')
  col.appendChild(hr)
  hr.style.backgrounColor = 'rgb(250,250,250,0.1)'
  hr.style.height = '2px'
  hr.style.width = '50%'
  hr.classList.add('ml-0')

  row = document.createElement('div')
  col.appendChild(row)
  row.classList.add('row')
  let h3 = document.createElement('h3')
  row.appendChild(h3)
  h3.classList.add('pb-2', 'pl-4')
  h3.style.fontFamily = 'Calibri, sans-serif'
  h3.innerHTML = productInfo['name']

  row = document.createElement('div')
  col.appendChild(row)
  row.classList.add('row')
  let p = document.createElement('p')
  row.appendChild(p)
  p.classList.add('pt-2', 'pb-2', 'pl-4')
  p.style.fontFamily = 'Calibri, sans-serif'
  p.innerHTML = productInfo['description']

  row = document.createElement('div')
  col.appendChild(row)
  row.classList.add('row')
  p = document.createElement('p')
  row.appendChild(p)
  p.classList.add('pt-2', 'pb-2', 'pl-4')
  p.style.fontFamily = 'Calibri, sans-serif'
  p.innerHTML = '$' + productInfo['price'] + ' / ' + productInfo['unit']

  row = document.createElement('div')
  col.appendChild(row)
  row.classList.add('row')
  let button = document.createElement('button')
  row.appendChild(button)
  button.classList.add('ml-4')
  button.classList.add('btn', 'btn-Φoutline-success')
  button.innerHTML = 'Add to cart'
  button.style.fontFamily = 'Calibri, sans-serif'
})
