import { xml2json } from './xml2json.js'

function readUserXML() {
  return fetch('./Data/Users.xml')
    .then(function (response) {
      return response.text()
    })
    .then(function (data) {
      let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(data, 'text/xml')
      let ret = xml2json(xmlDoc, '    ')
      return ret['users']
    })
}

window.addEventListener('load', async (event) => {
  let users = await readUserXML()
  const tableContainer = document.getElementById('tableContainer')
  let table = document.createElement('table')
  tableContainer.appendChild(table)
  table.classList.add('table')
  table.classList.add('table-striped')
  table.id = 'tableNewMain'
  let tableHead = document.createElement('thead')
  table.appendChild(tableHead)
  let tr = document.createElement('tr')
  tableHead.appendChild(tr)
  let th = document.createElement('th')
  tr.appendChild(th)
  th.innerHTML = 'Email'
  th = document.createElement('th')
  tr.appendChild(th)
  th.innerHTML = 'Detail'
  let tableBody = document.createElement('tbody')
  table.appendChild(tableBody)
  for (let i = 0; i < users['user'].length; i++) {
    let user = users['user'][i]
    tr = document.createElement('tr')
    tableBody.appendChild(tr)
    let td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['email']
    tableBody.appendChild(tr)
    td = document.createElement('td')
    tr.appendChild(td)
    let accordion = document.createElement('div')
    td.appendChild(accordion)
    accordion.id = 'accordion' + i
    let card = document.createElement('div')
    accordion.appendChild(card)
    card.classList.add('card')
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    cardHeader.id = 'cardheader' + i

    let buttonView = document.createElement('button')
    buttonView.classList.add('btn', 'btn-outline-info')
    buttonView.setAttribute('data-toggle', 'collapse')
    buttonView.setAttribute('data-target', '#collapse' + i)
    buttonView.setAttribute('aria-expanded', 'true')
    buttonView.setAttribute('aria-controls', 'collapse' + i)
    buttonView.innerHTML = 'View'
    cardHeader.appendChild(buttonView)

    card.appendChild(cardHeader)
    let collapse = document.createElement('div')
    card.appendChild(collapse)
    collapse.id = 'collapse' + i
    collapse.classList.add('collapse')
    collapse.classList.add('hide')
    collapse.setAttribute('aria-labelledby', 'cardheader' + i)
    collapse.setAttribute('data-parent', '#accordion' + i)
    let cardbody = document.createElement('div')
    collapse.appendChild(cardbody)
    cardbody.classList.add('card-body')
    let cardBodyContainer = document.createElement('div');
    cardBodyContainer.classList.add('container');
    cardbody.appendChild(cardBodyContainer);
    let cardBodyContainerRow = document.createElement('div');
    cardBodyContainerRow.classList.add("row");
    cardBodyContainer.appendChild(cardBodyContainerRow);
    let tabledetail = document.createElement('table')
    cardBodyContainerRow.appendChild(tabledetail)
    tabledetail.classList.add('table')
    tabledetail.classList.add('table-striped')
    tabledetail.id = 'tabledetail' + i
    let tableDetailBody = document.createElement('tbody')
    tabledetail.appendChild(tableDetailBody)

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'First Name'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['firstname']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Last Name'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['lastname']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Password'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['password']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Payment Method'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['paymentmethod']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Card Number'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['cardnumber']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Name on the Card'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['nameonthecard']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Expiring Date'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['expiringdate']

    tr = document.createElement('tr')
    tableDetailBody.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.scope = 'row'
    th.innerHTML = 'Security Number'
    td = document.createElement('td')
    tr.appendChild(td)
    td.innerHTML = user['securitynumber']

    cardBodyContainerRow = document.createElement('div')
    cardBodyContainerRow.classList.add('row');
    cardBodyContainer.appendChild(cardBodyContainerRow);

    let button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-outline-warning', 'btn-md', 'mr-1')
    button.id = 'buttonModify' + user['id'];
    button.innerHTML = 'Modify';
    cardBodyContainerRow.appendChild(button);

    button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-outline-danger', 'btn-md', 'ml-1')
    button.id = 'buttonDelete' +  user['id'];
    button.innerHTML = 'Delete';
    cardBodyContainerRow.appendChild(button);
  }
})
