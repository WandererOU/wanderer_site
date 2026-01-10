import { el, mount } from 'redom';

export default class Header {
  constructor() {
    this.isMenuOpen = false;

    this.navToggle = el('button.nav-toggle', el('span'), el('span'), el('span'));

    this.nav = el(
      'nav.nav',
      el('a.nav__link', { href: '#services' }, 'Services'),
      // el('a.nav__link', { href: '#work' }, 'Work'),
      // el('a.nav__link', { href: '#about' }, 'About'),
      el('a.nav__link', { href: '#contact' }, 'Contact'),
    );

    this.el = el(
      'header.header',
      el('.container', el('a.logo', { href: '#' }, 'Wånderer Studio', el('span', '.')), this.nav, this.navToggle),
    );
  }

  onmount() {
    this.registerEventListeners();
  }

  registerEventListeners() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.el.classList.add('scrolled');
      } else {
        this.el.classList.remove('scrolled');
      }
    });

    // Mobile nav toggle
    this.navToggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close menu on link click
    this.nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen) {
          this.toggleMenu();
        }
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.navToggle.classList.toggle('active', this.isMenuOpen);
    this.nav.classList.toggle('active', this.isMenuOpen);
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
}
