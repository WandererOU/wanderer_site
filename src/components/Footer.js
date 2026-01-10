import { el } from 'redom';

export default class Footer {
  constructor() {
    const currentYear = new Date().getFullYear();

    this.el = el(
      'footer.footer',
      el(
        '.container',
        el(
          '.footer__left',
          el('span.footer__logo', 'Wånderer Studio', el('span', '.')),
          el('span.footer__copyright', `© ${currentYear} Wånderer Studio. All rights reserved.`),
        ),
      ),
    );
  }
}
