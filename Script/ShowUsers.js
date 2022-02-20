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
  const cardContainer = document.getElementById('cardContainer')
  let cardRow = document.createElement('div')
  cardContainer.appendChild(cardRow)
  cardRow.classList.add('row')

  let labels = ['First Name', 'Last Name', 'Password', 'Payment Method', 'Card Number', 'Name on the Card', 'Expiring Date', 'Security Number', 'Street Number', 'Street Name', 'Postal Code', 'City', 'Province', 'Country'];
  let keys = ['firstname', 'lastname', 'password', 'paymentmethod', 'cardnumber', 'nameonthecard', 'expiringdate', 'securitynumber', 'streetnumber', 'streetname', 'postalcode', 'city', 'province', 'country'];

  for (let i = 0; i < users['user'].length; i++) {
    let user = users['user'][i]
    
    let card = document.createElement('div')
    cardRow.appendChild(card)
    card.classList.add('card', 'col-lg-6', 'px-0', 'my-1')
    
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    card.appendChild(cardHeader)

    let header = document.createElement('div')
    header.classList.add('row')
    cardHeader.appendChild(header)

    let h5 = document.createElement('h5')
    h5.innerHTML = user['email']
    h5.classList.add('col-lg-6')
    header.appendChild(h5)

    h5 = document.createElement('h5')
    h5.classList.add('col-lg-6')
    h5.innerHTML = user['firstname'] + ' ' + user['lastname'].toUpperCase()
    header.appendChild(h5)

    let cardBody = document.createElement('div')
    card.appendChild(cardBody)
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'px-0', 'py-0')

    let accordion = document.createElement('div')
    cardBody.appendChild(accordion)
    accordion.id = 'accordion' + i
    card = document.createElement('div')
    accordion.appendChild(card)
    card.classList.add('card')
    cardHeader = document.createElement('div')
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
    collapse.classList.add('collapse','hide')
    collapse.setAttribute('aria-labelledby', 'cardheader' + i)
    collapse.setAttribute('data-parent', '#accordion' + i)
    cardBody = document.createElement('div')
    collapse.appendChild(cardBody)
    cardBody.classList.add('card-body')
    let cardBodyContainer = document.createElement('div');
    cardBodyContainer.classList.add('container');
    cardBody.appendChild(cardBodyContainer);
    let cardBodyContainerRow = document.createElement('div');
    cardBodyContainerRow.classList.add("row");
    cardBodyContainer.appendChild(cardBodyContainerRow);
    

    for(let j = 0; j < labels.length; j++){      
      let fieldName = document.createElement('h5')
      cardBodyContainerRow.appendChild(fieldName)
      fieldName.classList.add('col-lg-6', 'border-left')
      fieldName.innerHTML = labels[j]
      let fieldValue = document.createElement('p')
      cardBodyContainerRow.appendChild(fieldValue)
      fieldValue.classList.add('col-lg-6')
      fieldValue.innerHTML = user[keys[j]]
    }

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
