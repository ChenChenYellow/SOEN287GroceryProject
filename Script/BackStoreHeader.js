class BackStoreHeader extends HTMLElement {
  constructor() {
    super()
  }
  // We create a header for the front store, and we call these codes everytime we do a <header-component>

  connectedCallback() {
    this.innerHTML = `
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="./manage_users.html">Users</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./manage_inventory.html">Inventory</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./manage_orders.html">Orders</a>
              </li>
            </ul>
        </nav>`
  }
}
customElements.define('header-component', BackStoreHeader)
