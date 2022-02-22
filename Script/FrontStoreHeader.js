class FrontStoreHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        
      <div class="wrapper">
      <div id="logo">
        <a href="index.html">FRESHCO</a>
      </div>
      <nav class="navbar navbar-expand-sm navbar-home">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="aisles.html">Aisles</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="shoppingCart.html">Shopping Cart</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="P5.html">Sign In</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="P6.html">Sign Up</a>
          </li>
        </ul>
      </nav>
      <div id="layover"></div>
    </div>`;
  }
}
customElements.define("header-component", FrontStoreHeader);
