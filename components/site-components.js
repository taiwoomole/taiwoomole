const SITE_CONFIG = {
  name: "Taiwo Omole",
  home: "/",

  navigation: [

    { label: "About Me", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact Me", href: "mailto:taiwoawodumila@gmail.com" },
/*
    { label: "Film", href: "/about.html" },
    { label: "Journalism", href: "/services.html" },

    { label: "Content Creation", href: "/contact.html" },
    { label: "Brand Design ", href: "/contact.html" },
    { label: "Motion Graphics", href: "/contact.html" },
*/
  ],

  footerNavigation: [
 
  ],
};


/* -------------------------------------------------------
   <site-header>
------------------------------------------------------- */

class SiteHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--header-background, #fff);
          color: var(--header-color, #111);
          border-bottom: 1px solid var(--header-border, #e5e5e5);
          font-family: system-ui, sans-serif;
        }

        header {
         /*  max-width: 1200px;
         margin: 0 auto; */
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          color: inherit;
          text-decoration: none;
          font-size: 3.25rem;
          font-weight: 700;
          white-space: nowrap;
        }

        nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        nav a {
          color: inherit;
          text-decoration: none;
          font-size: 1.95rem;
        }

        nav a:hover {
          text-decoration: underline;
        }

        nav a[aria-current="page"] {
          font-weight: 700;
        }

        .menu-button {
          display: none;
          border: 0;
          background: transparent;
          color: inherit;
          padding: 0.5rem;
          cursor: pointer;
        }

        .menu-icon {
          width: 24px;
          height: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .menu-icon span {
          display: block;
          width: 100%;
          height: 2px;
          background: currentColor;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .menu-button[aria-expanded="true"] .menu-icon span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .menu-button[aria-expanded="true"] .menu-icon span:nth-child(2) {
          opacity: 0;
        }

        .menu-button[aria-expanded="true"] .menu-icon span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        @media (max-width: 768px) {
          header {
            position: relative;
          }

          .menu-button {
            display: block;
          }

          nav {
            display: none;
            position: absolute;
            z-index: 1000;
            top: 100%;
            left: 0;
            right: 0;

            flex-direction: column;
            align-items: stretch;
            gap: 0;

            padding: 0.5rem 1.5rem 1rem;

            background: var(--header-background, #fff);
            border-bottom: 1px solid var(--header-border, #e5e5e5);
          }

          nav.open {
            display: flex;
          }

          nav a {
            padding: 0.75rem 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .menu-icon span {
            transition: none;
          }
        }
      </style>

      <header>
        <a class="logo"></a>

        <button
          class="menu-button"
          type="button"
          aria-label="Open navigation"
          aria-expanded="false"
          aria-controls="site-navigation"
        >
          <span class="menu-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav id="site-navigation"></nav>
      </header>
    `;

    this.logo = this.shadowRoot.querySelector(".logo");
    this.navigation = this.shadowRoot.querySelector("nav");
    this.menuButton = this.shadowRoot.querySelector(".menu-button");

    this.menuButton.addEventListener("click", () => {
      this.toggleMenu();
    });

    this.navigation.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        this.closeMenu();
      }
    });

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const siteName = this.getAttribute("name") || SITE_CONFIG.name;
    const home = this.getAttribute("home") || SITE_CONFIG.home;

    this.logo.textContent = siteName;
    this.logo.href = home;

    this.navigation.replaceChildren();

    SITE_CONFIG.navigation.forEach((item) => {
      const link = document.createElement("a");

      link.textContent = item.label;
      link.href = item.href;

      if (this.isCurrentPage(item.href)) {
        link.setAttribute("aria-current", "page");
      }

      this.navigation.appendChild(link);
    });
  }

  isCurrentPage(href) {
    const currentPath = window.location.pathname;

    if (href === "/") {
      return currentPath === "/";
    }

    return currentPath === href;
  }

  toggleMenu() {
    const isOpen = this.menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.navigation.classList.add("open");
    this.menuButton.setAttribute("aria-expanded", "true");
    this.menuButton.setAttribute("aria-label", "Close navigation");
  }

  closeMenu() {
    this.navigation.classList.remove("open");
    this.menuButton.setAttribute("aria-expanded", "false");
    this.menuButton.setAttribute("aria-label", "Open navigation");
  }
}


/* -------------------------------------------------------
   <site-footer>
------------------------------------------------------- */

class SiteFooter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: auto;
          background: var(--footer-background, #f5f5f5);
          color: var(--footer-color, #333);
          font-family: system-ui, sans-serif;
        }

        footer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .copyright {
          margin: 0;
          font-size: 0.9rem;
        }

        nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        nav a {
          color: inherit;
          text-decoration: none;
          font-size: 0.9rem;
        }

        nav a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          footer {
            flex-direction: column;
            align-items: flex-start;
          }

          nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }
      </style>

      <footer>
        <p class="copyright"></p>
        <nav></nav>
      </footer>
    `;

    this.copyright = this.shadowRoot.querySelector(".copyright");
    this.navigation = this.shadowRoot.querySelector("nav");

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const siteName = this.getAttribute("name") || SITE_CONFIG.name;
    const year = this.getAttribute("year") || new Date().getFullYear();

    this.copyright.textContent = `© ${year} ${siteName}`;

    this.navigation.replaceChildren();

    SITE_CONFIG.footerNavigation.forEach((item) => {
      const link = document.createElement("a");

      link.textContent = item.label;
      link.href = item.href;

      this.navigation.appendChild(link);
    });
  }
}


/* -------------------------------------------------------
   Register components
------------------------------------------------------- */

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
