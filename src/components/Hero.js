import { el } from 'redom';
import gsap from 'gsap';

export default class Hero {
  constructor() {
    this.eyebrow = el('span.hero__eyebrow', 'Digital Studio');

    this.title = el(
      'h1.hero__title',
      el('span.line', 'We craft'),
      el('span.line', 'digital experiences'),
      el('span.line', 'that matter'),
    );

    this.description = el(
      'p.hero__description',
      'A creative studio specializing in brand identity, web design, and digital experiences that connect brands with their audience.',
    );

    this.cta = el('button.hero__cta', 'Start a project', el('span.arrow', '→'));

    this.scroll = el('div.hero__scroll', 'Scroll');

    this.el = el(
      'section.hero',
      { id: 'hero' },
      el('.container', el('.hero__content', this.eyebrow, this.title, this.description, this.cta)),
      this.scroll,
    );
  }

  onmount() {
    this.animate();
    this.registerEventListeners();
  }

  animate() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(this.eyebrow, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
    })
      .to(
        this.title,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        '-=0.4',
      )
      .to(
        this.description,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.6',
      )
      .to(
        this.cta,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=0.4',
      )
      .to(
        this.scroll,
        {
          opacity: 1,
          duration: 0.6,
        },
        '-=0.2',
      );
  }

  registerEventListeners() {
    this.cta.addEventListener('click', () => {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
}
