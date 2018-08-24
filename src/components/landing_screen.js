import '../css/landing_screen.css';
import WhiteLogo from '../assets/images/plain_white.png';
import * as constants from '../utils/constants';
import {TimelineMax, Power3} from 'gsap';
import {el, setChildren} from 'redom';

export default class LandingPage {
    constructor() {
        this.activeMenu = constants.INITIAL;

        // overlays
        this.el = el('.overlay-container');
        this.overlay = el('.overlay');
        this.overlayLight = el('.overlay-light');

        // layout sections
        this.topContainer = el('.top-container');
        this.midContainer = el('.mid-container');
        this.botContainer = el('.bot-container');

        // layout components
        this.logo = el('img', {src: WhiteLogo});
        this.titleSection = el('.title-container', [
            el('.title', [
                el('p', 'Augmented Reality'),
                el('p', 'like never before.'),
            ]),
            el('.line'),
            el('.subtitle', [
                el('p', 'Join Wånderer Studio on its journey to create the best'),
                el('p', 'possible experiences in Augmented Reality worlds.'),
                el('p', 'The future is here, ',
                    el('strong', 'will you be a part of it?')
                )
            ]),
        ]);
        this.startButton = el('#start-button#about.start-button', [
            el('span#about', 'Click here or scroll down to begin')
        ])
    }

    onmount() {
        this.renderInitialElements()
        this.animateTitle()
    }

    onremount() {
        this.clearElements();
        if(this.activeMenu === constants.INITIAL) {
            this.renderInitialElements()
        } else {
            this.renderAlternateElements()
        }
    }

    clearElements = () => {
        setChildren(this.botContainer, []);
        setChildren(this.midContainer, []);
        setChildren(this.topContainer, []);
        setChildren(this.overlay, []);
        setChildren(this.overlayLight, []);
        setChildren(this.el, []);
    }

    renderAlternateElements = () => {
        setChildren(this.topContainer, this.logo);
        setChildren(this.overlayLight, [this.topContainer, this.midContainer, this.botContainer]);
        setChildren(this.el, this.overlayLight);
    }

    renderInitialElements = () => {
        setChildren(this.botContainer, this.startButton);
        setChildren(this.midContainer, this.titleSection);
        setChildren(this.topContainer, this.logo);
        setChildren(this.overlay, [this.topContainer, this.midContainer, this.botContainer]);
        setChildren(this.el, this.overlay);
    }

    selectActiveMenu = (menu) => {
        this.activeMenu = menu;
    }

    animateTitle = () => {
        var tl = new TimelineMax()
        tl.delay(0.2)
        tl.from('.line', 0.8, {width: 0, ease: Power3.easeOut})
        tl.from('.title p', 0.8, {position: 'relative', top: '5em'}, 'reveal')
            .to('.title p', 0.3, {position: 'relative', top: 0});
        tl.from('.subtitle p', 0.8, {position: 'relative', top: '-11em'}, 'reveal')
        .to('.subtitle p', 0.3, {position: 'relative', top: 0})
    }
}