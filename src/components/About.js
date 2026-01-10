import { el } from 'redom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class About {
  constructor() {
    this.imagePlaceholder = el('.about__image', {
      style: { backgroundColor: '#2a3540' },
    });

    this.el = el(
      'section.about',
      { id: 'about' },
      el(
        '.container',
        el(
          '.about__grid',
          el('.about__image-wrapper', this.imagePlaceholder),
          el(
            '.about__content',
            el('span.about__eyebrow', 'About Us'),
            el('h2.about__title', 'Creativity meets strategy'),
            el(
              'p.about__text',
              'We are a collective of designers, developers, and strategists who believe in the power of thoughtful design to transform businesses and connect with people.',
            ),
            el(
              'p.about__text',
              "Since 2018, we've partnered with startups and established brands alike, helping them navigate the digital landscape with innovative solutions tailored to their unique needs.",
            ),
            el(
              '.about__stats',
              el('.stat', el('span.stat__number', '20+'), el('span.stat__label', 'Collective Years of Experience')),
            ),
          ),
        ),
      ),
    );
  }

  onmount() {
    this.animate();
  }

  animate() {
    const content = this.el.querySelector('.about__content');
    const imageWrapper = this.el.querySelector('.about__image-wrapper');

    gsap.fromTo(
      imageWrapper,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el,
          start: 'top 70%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      content.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el,
          start: 'top 70%',
          once: true,
        },
      },
    );
  }
}
