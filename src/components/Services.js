import { el, list } from 'redom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    icon: '✦',
    title: 'Brand Identity',
    description: 'We create distinctive visual identities that capture the essence of your brand and resonate with your audience.'
  },
  {
    number: '02',
    icon: '◐',
    title: 'Web Design',
    description: 'Beautiful, functional websites that provide seamless user experiences across all devices and platforms.'
  },
  {
    number: '03',
    icon: '◈',
    title: 'Development',
    description: 'Clean, performant code that brings designs to life with modern technologies and best practices.'
  },
  {
    number: '04',
    icon: '❋',
    title: 'Digital Strategy',
    description: 'Data-driven strategies that help brands grow their digital presence and reach their target audience.'
  },
  {
    number: '05',
    icon: '⬡',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that balance aesthetics with functionality for optimal user engagement.'
  },
  {
    number: '06',
    icon: '◉',
    title: 'Motion Design',
    description: 'Engaging animations and micro-interactions that add life and personality to digital experiences.'
  }
];

class ServiceCard {
  constructor() {
    this.number = el('span.service-card__number');
    this.icon = el('div.service-card__icon');
    this.title = el('h3.service-card__title');
    this.description = el('p.service-card__description');
    
    this.el = el('.service-card',
      this.number,
      this.icon,
      this.title,
      this.description
    );
  }

  update(data) {
    this.number.textContent = data.number;
    this.icon.textContent = data.icon;
    this.title.textContent = data.title;
    this.description.textContent = data.description;
  }
}

export default class Services {
  constructor() {
    this.servicesList = list('.services__grid', ServiceCard);
    
    this.el = el('section.services', { id: 'services' },
      el('.container',
        el('.services__header',
          el('h2.services__title', 'What we do'),
          el('p.services__subtitle', 'We help brands stand out in an increasingly crowded digital landscape.')
        ),
        this.servicesList
      )
    );
  }

  onmount() {
    this.servicesList.update(services);
    this.animate();
  }

  animate() {
    const cards = this.el.querySelectorAll('.service-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el,
          start: 'top 80%',
          once: true
        }
      }
    );
  }
}

