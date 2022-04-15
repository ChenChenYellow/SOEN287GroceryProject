class FrontStoreHeader extends HTMLElement {
  constructor() {
    super();
  }
  // We create a header for the front store, and we call these codes everytime we do a <header-component>

  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
            <a class="brand my-2" href="./index_phase_II.html">FRESHCO</a>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item mx-4">
                <a class="navbar-link" href="./cart.html">Shopping Cart</a>
              </li>
              <li class="nav-item mx-4">
                <a class="navbar-link" href="#">Your Orders</a>
              </li>
              <li class="nav-item mx-4">
                <a
                  class="navbar-link"
                  href="#collapseAisles"
                  id="linkDropdownAisles"
                  data-toggle="collapse"
                  aria-controls="collapseAisles"
                  aria-expanded="false"
                  >Aisles</a
                >
                <div
                  class="collapse text-left"
                  aria-labelledby="linkDropdownAisles"
                  id="collapseAisles"
                >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="./aisle.html?aislename=biscuit_and_chips"
                    >Biscuits and Chips</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="./aisle.html?aislename=nuts"
                    >Nuts</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="./aisle.html?aislename=fruit_and_vegetables"
                    >Fruits and Vegetables</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="aisle.html?aislename=bakery"
                    >Bakery</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="aisle.html?aislename=dairy"
                    >Dairy</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="aisle.html?aislename=drinks"
                    >Drinks</a
                  >
                </div>
              </li>
            </ul>
          </nav>`;
  }
}
customElements.define("header-component", FrontStoreHeader);
