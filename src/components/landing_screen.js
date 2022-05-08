import gsap, { Power3, Expo } from 'gsap';

import { el, setChildren } from 'redom';
import * as constants from '../utils/constants';

export default class LandingPage {
  constructor({ isMobile }) {
    // variables
    this.activeMenu = constants.INITIAL;
    this.isMobile = isMobile;
    this.menuTransform = {
      x: 0,
      y: 0,
    };

    // overlays
    this.el = el('.overlay-container');
    this.overlay = el('.overlay');
    this.overlayLight = el('.overlay-light');

    // layout sections
    this.topContainer = el('.top-container');
    this.midContainer = el('#mid-container.mid-container');

    // layout components
    this.logo = el('img#initial', { src: '/images/plain_white.png', alt: 'Wanderer Studio Logo' });
    this.hamburgerMenu = el('#hamburger-menu.hamburger-menu', [
      el('input#hamburger-menu-checkbox', { type: 'checkbox', checked: false }),
      el('span'),
      el('span'),
      el('span'),
    ]);
    this.titleSection = el('.title-container', [
      el('.title', [el('h1', 'EXPERIENCE REALITY'), el('h1', 'LIKE NEVER BEFORE.')]),
      el('.line'),
      el('.subtitle', [
        el('h2', 'Mixed Reality is about to change how we'),
        el('h2', 'interact with the world around us.'),
        el('h2', 'Wånderer Studio would like to invite you to '),
        el('h2', '', el('strong', 'become a part of this change.')),
      ]),
    ]);

    this.menuContainer = el('#menu-container.menu-container', [
      el('p#about', '01 About'),
      el('p#apps', '02 Apps'),
      el('p#blog', '03 Blog'),
      el('p#contacts', '04 Contacts'),
    ]);

    this.appDetails = el('#app-details', [
      el('#app-details-close-button'),
      el('.app-details-modal', [
        el('#app-details-title-container'),
        el('#app-details-paragraph-container'),
        el('#app-details-button-container'),
      ]),
    ]);
  }

  onmount() {
    this.renderInitialElements();
    this.animateTitle();
  }

  onremount() {
    this.clearElements();

    if (this.activeMenu === constants.INITIAL) {
      this.renderInitialElements();
    } else {
      this.renderAlternateElements();
    }
  }

  clearElements = () => {
    if (this.menuContainer && this.menuContainer.children) {
      for (let i = 0; i < this.menuContainer.children.length; i++) {
        this.menuContainer.children[i].classList.remove('selected', 'initial');
      }
    }

    setChildren(this.midContainer, []);
    setChildren(this.topContainer, []);
    setChildren(this.overlay, []);
    setChildren(this.overlayLight, []);
    setChildren(this.el, []);
  };

  renderAlternateElements = () => {
    setChildren(this.topContainer, [this.logo, this.hamburgerMenu]);
    setChildren(this.midContainer, [this.menuContainer]);
    setChildren(this.overlayLight, [this.topContainer, this.midContainer]);
    setChildren(this.el, this.overlayLight);

    this.menuContainer.children[0].classList.remove('initial');
    this.menuContainer.children[1].classList.remove('initial');
    this.menuContainer.children[2].classList.remove('initial');
    this.menuContainer.children[3].classList.remove('initial');
    this.menuContainer.querySelector(`#${this.activeMenu}`).classList.add('selected');
  };

  renderInitialElements = () => {
    setChildren(this.midContainer, [this.titleSection, this.menuContainer]);
    setChildren(this.topContainer, [this.logo, this.hamburgerMenu]);
    setChildren(this.overlay, [this.topContainer, this.midContainer, this.botContainer]);
    setChildren(this.el, this.overlay);

    this.hamburgerMenu.addEventListener('click', () => this.toggleNavigation());

    this.menuContainer.children[0].classList.add('initial');
    this.menuContainer.children[1].classList.add('initial');
    this.menuContainer.children[2].classList.add('initial');
    this.menuContainer.children[3].classList.add('initial');
  };

  selectActiveMenu = (menu) => {
    this.activeMenu = menu;
    // Only trigger on small screens and when menu isn't initial
    if (this.isMobile || window.innerWidth < 1150) {
      this.closeNavigation();
    }
  };

  closeNavigation = () => {
    this.hamburgerMenu.children[0].attributes.type.ownerElement.checked = false;
    gsap.to(`#${this.menuContainer.id}`, { duration: 0.5, height: '0px', ease: Power3.easeOut });
  };

  toggleNavigation = () => {
    if (this.menuContainer.clientHeight === 0) {
      this.hamburgerMenu.children[0].attributes.type.ownerElement.checked = true;
      gsap.to(`#${this.menuContainer.id}`, { duration: 0.5, height: '100%', ease: Power3.easeOut });
    } else {
      this.hamburgerMenu.children[0].attributes.type.ownerElement.checked = false;
      gsap.to(`#${this.menuContainer.id}`, { duration: 0.5, height: '0px', ease: Power3.easeOut });
    }
  };

  animateTitle = () => {
    gsap.to('div.line', { duration: 0.8, stagger: 0.3, width: '100%', ease: Power3.easeOut });
    gsap.fromTo('h1', { duration: 0.8, stagger: 0.3, top: '6em' }, { top: 0, ease: Expo.easeOut }, 'reveal');
    gsap.fromTo('h2', { duration: 0.8, stagger: 0.3, top: '-12em' }, { top: 0, ease: Expo.easeOut }, 'reveal');
  };

  renderAppInformation = (app) => {
    const selectedApp = constants.apps[app];
    setChildren(this.midContainer, [this.appDetails, this.menuContainer]);

    document.getElementById('app-details-close-button').innerText = 'X';
    document.getElementById('app-details-title-container').innerHTML = `<h2>${selectedApp.title}</h2>`;
    document.getElementById('app-details-paragraph-container').innerHTML = `<p>${selectedApp.description}</p>`;

    document.getElementById('app-details-close-button').addEventListener('click', () => this.closeAppInformation());

    if (selectedApp.isReleased) {
      document.getElementById('app-details-button-container').innerHTML = '<div>Download Here!</div>';
    } else {
      document.getElementById('app-details-button-container').innerHTML = '<div>Coming Soon</div>';
    }
  };

  closeAppInformation = () => {
    setChildren(this.midContainer, [this.menuContainer]);
  };
}
