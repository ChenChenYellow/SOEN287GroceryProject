class FrontStoreHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-sm navbar-light">
    <a class="brand my-2 mx-4" href="index.html">FRESHCO</a>
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
          href="#"
          id="linkDropdownAisles"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          >Aisles</a
        >
        <div class="dropdown-menu dropdown-menu-right text-right" aria-labelledby="linkDropdownAisles">
          <a
            class="dropdown-item"
            href="aisle.html?aislename=biscuit_and_chips"
            >Biscuits and Chips</a
          >
          <a
            class="dropdown-item"
            href="P2_Aisle_YCH.html?aislename=dry_food"
            >Dry Food</a
          >
          <a
            class="dropdown-item"
            href="P2_Aisle_YCH.html?aislename=milk_and_cheese"
            >Milk and Cheese</a
          >
        </div>
      </li>
    </ul>
  </nav>`;
  }
}
customElements.define("header-component", FrontStoreHeader);
