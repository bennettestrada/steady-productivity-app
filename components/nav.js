class Nav extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
       this.innerHTML = `
        <nav>
            <a id= "code-nav" href="/pages/code.html">Code</a>
            <a id= "journey-nav" href="/pages/journey.html">Journey</a>
            <a id= "metrics-nav" href="/pages/metrics.html">Metrics</a>
            <a id= "info-nav" href="/pages/info.html">Info</a>
        </nav>
        `;
    }

}

customElements.define('nav-component', Nav);