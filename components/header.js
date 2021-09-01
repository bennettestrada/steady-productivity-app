class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
            <a href= "../index.html">
                <h1>Steady</h1>
            </a>
        </header>
        `;
    }
}

customElements.define('header-component', Header);