class FrontStoreHeader extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="P1_index_YCH.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">Aisles</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="P2_Aisle_YCH.html?aislename=biscuit_and_chips">Biscuits and Chips</a>
                    <a class="dropdown-item" href="P2_Aisle_YCH.html?aislename=dry_food">Dry Food</a>
                    <a class="dropdown-item" href="P2_Aisle_YCH.html?aislename=milk_and_cheese">Milk and Cheese</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Shopping Cart</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Your Orders</a>
              </li>
            </ul>
        </nav>`
  }
}
customElements.define('header-component', FrontStoreHeader)
