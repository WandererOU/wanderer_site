import { el, setChildren } from 'redom';

export default class LoadingScreen {
  constructor() {
    this.progress = 0;
    this.el = el('#loading-page-container');
    this.percentage = el('span#percentage', `${this.progress}%`);
    this.loadingComponent = el('.loading-component-container');
    this.image = el('img', { src: '/images/plain_white.png', alt: 'Wanderer Studio Logo' });
    this.progressBar = el('#loading-component-progress');

    this.updateProgress = this.updateProgress.bind(this);
  }

  onmount() {
    setChildren(this.loadingComponent, [this.image, this.progressBar]);
    setChildren(this.el, [this.loadingComponent, this.percentage]);
  }

  updateProgress = (newProgress) => {
    // Update percentage text
    const percentage = document.getElementById('percentage');
    percentage.innerHTML = `${newProgress}%`;

    // resize progress height
    const progress = document.getElementById('loading-component-progress');
    progress.style.height = `${120 * (newProgress / 100)}px`;
  };
}
