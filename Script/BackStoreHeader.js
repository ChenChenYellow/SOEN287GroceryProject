class BackStoreHeader extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="ManageUsers.html">Users</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Inventory</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Orders</a>
              </li>
            </ul>
        </nav>`;
    }

}
customElements.define('header-component', BackStoreHeader);