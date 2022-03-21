class FrontStoreHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
            <a class="brand my-2 mx-4" href="index_phase_ii.html">FRESHCO</a>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item mx-4">
                <a class="navbar-link" href="\cart.html">Shopping Cart</a>
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
                    href="aisle.html?aislename=biscuit_and_chips"
                    >Biscuits and Chips</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="aisle.html?aislename=nuts"
                    >Nuts</a
                  >
                  <a
                    class="dropdown-item navbar-collapsed-item"
                    href="aisle.html?aislename=fruit_and_vegetables"
                    >Fruits and Vegetables</a
                  >
                </div>
              </li>
            </ul>
          </nav>`;
  }
}
customElements.define("header-component", FrontStoreHeader);
