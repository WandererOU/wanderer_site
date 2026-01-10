import { el, list } from 'redom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    category: 'Brand Identity',
    title: 'Lumina Studios',
    description: 'Complete rebrand for a creative agency',
    color: '#2a4858'
  },
  {
    category: 'Web Design',
    title: 'Meridian Finance',
    description: 'Modern fintech web platform',
    color: '#3d5a5a'
  },
  {
    category: 'E-commerce',
    title: 'Botanica',
    description: 'Luxury skincare online store',
    color: '#5a4a3d'
  },
  {
    category: 'Mobile App',
    title: 'Pulse Health',
    description: 'Wellness tracking application',
    color: '#4a3d5a'
  }
];

class ProjectCard {
  constructor() {
    this.imagePlaceholder = el('.project-card__image');
    this.category = el('span.project-card__category');
    this.title = el('h3.project-card__title');
    this.description = el('p.project-card__description');
    
    this.el = el('.project-card',
      this.imagePlaceholder,
      el('.project-card__overlay',
        this.category,
        this.title,
        this.description
      )
    );
  }

  update(data) {
    this.imagePlaceholder.style.backgroundColor = data.color;
    this.category.textContent = data.category;
    this.title.textContent = data.title;
    this.description.textContent = data.description;
  }
}

export default class Work {
  constructor() {
    this.projectsList = list('.work__grid', ProjectCard);
    
    this.el = el('section.work', { id: 'work' },
      el('.container',
        el('.work__header',
          el('h2.work__title', 'Selected Work'),
          el('p.work__subtitle', 'A showcase of projects we\'re proud of.')
        ),
        this.projectsList,
        el('.work__cta',
          el('a', { href: '#' }, 'View all projects ', el('span.arrow', '→'))
        )
      )
    );
  }

  onmount() {
    this.projectsList.update(projects);
    this.animate();
  }

  animate() {
    const cards = this.el.querySelectorAll('.project-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el,
          start: 'top 75%',
          once: true
        }
      }
    );
  }
}

