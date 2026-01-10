import { el } from 'redom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Contact {
  constructor() {
    this.form = el(
      'form.contact-form',
      el(
        '.contact-form__group',
        el('label.contact-form__label', { for: 'name' }, 'Your Name'),
        el('input.contact-form__input', {
          type: 'text',
          id: 'name',
          name: 'name',
          placeholder: 'John Doe',
          required: true,
        }),
      ),
      el(
        '.contact-form__group',
        el('label.contact-form__label', { for: 'email' }, 'Email Address'),
        el('input.contact-form__input', {
          type: 'email',
          id: 'email',
          name: 'email',
          placeholder: 'john@example.com',
          required: true,
        }),
      ),
      el(
        '.contact-form__group',
        el('label.contact-form__label', { for: 'message' }, 'Your Message'),
        el('textarea.contact-form__textarea', {
          id: 'message',
          name: 'message',
          placeholder: 'Tell us about your project...',
          required: true,
        }),
      ),
      el('button.contact-form__submit', { type: 'submit' }, 'Send Message'),
    );

    this.el = el(
      'section.contact',
      { id: 'contact' },
      el(
        '.container',
        el(
          '.contact__grid',
          el(
            '.contact__info-side',
            el('span.contact__eyebrow', 'Get in Touch'),
            el('h2.contact__title', "Let's create something great together"),
            el(
              'p.contact__text',
              "Ready to start your next project? We'd love to hear from you. Reach out and let's discuss how we can help bring your vision to life.",
            ),
            el(
              '.contact__info',
              el(
                '.contact__item',
                el('span.icon', '✉'),
                el(
                  'div',
                  { style: { display: 'flex', gap: '0.5em', alignItems: 'center' } },
                  el('span.label', 'Email'),
                  el('span.value', 'information@wanderer.studio'),
                ),
              ),
            ),
          ),
          this.form,
        ),
      ),
    );
  }

  onmount() {
    this.animate();
    this.registerEventListeners();
  }

  animate() {
    const infoSide = this.el.querySelector('.contact__info-side');

    gsap.fromTo(
      [infoSide, this.form],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el,
          start: 'top 75%',
          once: true,
        },
      },
    );
  }

  registerEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle form submission here
      const formData = new FormData(this.form);
      console.log('Form submitted:', Object.fromEntries(formData));

      // Show success message (could be enhanced)
      alert("Thank you for your message! We'll get back to you soon.");
      this.form.reset();
    });
  }
}
