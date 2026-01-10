import { el, mount } from 'redom';
import RoomScene from './components/room_scene';
import * as constants from './utils/constants';
import './sass/style.scss';

class Root {
  constructor() {
    const testExp = /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i;
    this.isMobile = testExp.test(navigator.userAgent);
    this.roomSceneObj = new RoomScene({
      isMobile: this.isMobile,
    });
    this.el = el('#main-div');
    this.mobileEl = el('p#mobile-debug');
  }

  onmount() {
    mount(this.el, this.roomSceneObj);
    mount(this.el, this.mobileEl);

    this.registerEventListeners();
  }

  renderOrientationData = (x, y) => {
    this.mobileEl.innerHTML = `x: ${x};<br> y: ${y};`;
  };

  registerEventListeners = () => {
    if (this.isMobile) {
      window.addEventListener('touchend', (event) => {
        this.handleClickAndTap(event);
        DeviceOrientationEvent.requestPermission().then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', (e) => {
              const x = Math.round(e.beta);
              const y = Math.round(e.gamma);
              if (x < 85) {
                // this.renderOrientationData(x, y);
                this.roomSceneObj.handleGyroscope(x, y);
              }
            });
          }
        });
      });
    } else {
      window.addEventListener(
        'wheel',
        () => {
          this.roomSceneObj.handleMoveCamera();
        },
        { passive: true },
      );

      window.addEventListener('resize', () => {
        this.roomSceneObj.resizeRenderer();
      });

      document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        this.roomSceneObj.handleMouseMove(x, y);
      });

      document.addEventListener('click', (event) => {
        this.handleClickAndTap(event);
      });
    }
  };

  handleClickAndTap = (event) => {
    const targetId = event.target.id;
    if (targetId.includes(constants.ABOUT)) {
      this.roomSceneObj.moveCamera(constants.ABOUT);
    } else if (targetId.includes(constants.APPS)) {
      this.roomSceneObj.moveCamera(constants.APPS);
    } else if (targetId.includes(constants.BLOG)) {
      this.roomSceneObj.moveCamera(constants.BLOG);
    } else if (targetId.includes(constants.CONTACTS)) {
      this.roomSceneObj.moveCamera(constants.CONTACTS);
    } else if (targetId.includes(constants.INITIAL)) {
      this.roomSceneObj.moveCamera(constants.INITIAL);
    } else if (targetId === 'mid-container') {
      // tapped "inside canvas"
      this.roomSceneObj.handleClick();
    }
  };
}

const root = new Root();
mount(document.body, root);
