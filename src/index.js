import { el, mount } from 'redom';
import './sass/style.scss';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
// import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

abc

class App {
  constructor() {
    this.header = new Header();
    this.hero = new Hero();
    this.services = new Services();
    // this.work = new Work();
    // this.about = new About();
    this.contact = new Contact();
    this.footer = new Footer();

    this.el = el(
      '#app',
      this.header,
      el('main', this.hero, this.services, this.work, this.about, this.contact),
      this.footer,
    );
  }

  onmount() {
    // Initialize smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

// Initialize the app
const app = new App();
mount(document.body, app);
