class FrontStoreFooter extends HTMLElement {
  constructor() {
    super();
  }
  // We create a footer for the front store, and we call these codes everytime we do a <footer-component>

  connectedCallback() {
    this.innerHTML = `<div class="row background-brown my-1 pt-4">
    <div class="col-lg-3 mx-auto my-2">
      <ul class="list-unstyled">
        <li class="small-font-size bold my-1">HEADQUARTERS</li>
        <li class="small-font-size">5783 Ottawa Street</li>
        <li class="small-font-size">A1B 2C3</li>
        <li class="small-font-size">Montreal</li>
        <li class="small-font-size">TEL: 514-123-1234</li>
        <li class="small-font-size">Email: freshcogroceries@outlook.com</li>
      </ul>
    </div>
    <div class="col-lg-3 mx-auto my-2">
      <ul class="list-unstyled">
        <li><a href="#" class="small-font-size">Privacy Policy</a></li>
        <li>
          <a href="#" class="small-font-size"
            >Our Environmental Commitments</a
          >
        </li>
        <li class="small-font-size">© 2022 Freshco</li>
      </ul>
    </div>
  </div>`;
  }
}
customElements.define("footer-component", FrontStoreFooter);
