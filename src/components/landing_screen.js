import '../css/landing_screen.css'
import WhiteLogo from '../assets/images/plain_white.png'
import * as constants from '../utils/constants'
import {TimelineMax, Power3, Expo} from 'gsap'
import {el, setChildren} from 'redom'

export default class LandingPage {
    constructor() {
        // variables
        this.activeMenu = constants.INITIAL
        this.menuTransform = {
            x: 0,
            y: 0,
        }

        // overlays
        this.el = el('.overlay-container')
        this.overlay = el('.overlay')
        this.overlayLight = el('.overlay-light')

        // layout sections
        this.topContainer = el('.top-container')
        this.midContainer = el('.mid-container')
        this.botContainer = el('.bot-container')

        // layout components
        this.logo = el('img#initial', {src: WhiteLogo})
        this.titleSection = el('.title-container', [
            el('.title', [
                el('p', 'EXPERIENCE REALITY'),
                el('p', 'LIKE NEVER BEFORE.'),
            ]),
            el('.line'),
            el('.subtitle', [
                el('p', 'Augmented Reality is about to change how we'),
                el('p', 'interact with the world around us.'),
                el('p', 'Wånderer Studio would like to invite you to '),
                el('p', '',
                    el('strong', 'become a part of this change.'),
                )
            ]),
        ])

        this.menuContainer = el('#menu-container.menu-container', [
            el('p#about', '01 About'),
            el('p#apps', '02 Apps'),
            el('p#blog', '03 Blog'),
            el('p#contacts', '04 Contacts')
        ])

        this.startButton = el('#start-button#about.start-button', [
            el('span#about', 'Click here or scroll down to begin')
        ])
    }

    onmount() {
        this.renderInitialElements()
        this.animateTitle()
    }

    onremount() {
        this.clearElements()

        if(this.activeMenu === constants.INITIAL) {
            this.renderInitialElements()
        } else {
            this.renderAlternateElements()
        }
    }

    clearElements = () => {
        if (document.getElementById('menu-container')) {
            for(let i = 0; i < document.getElementById('menu-container').children.length; i++) {
                document.getElementById('menu-container').children[i].classList.remove('selected', 'initial')
            }
        }

        setChildren(this.botContainer, [])
        setChildren(this.midContainer, [])
        setChildren(this.topContainer, [])
        setChildren(this.overlay, [])
        setChildren(this.overlayLight, [])
        setChildren(this.el, [])
    }

    renderAlternateElements = () => {
        setChildren(this.topContainer, this.logo)
        setChildren(this.midContainer, this.menuContainer)
        setChildren(this.overlayLight, [this.topContainer, this.midContainer, this.botContainer])
        setChildren(this.el, this.overlayLight)

        document.getElementById('menu-container').children[0].classList.remove('initial')
        document.getElementById('menu-container').children[1].classList.remove('initial')
        document.getElementById('menu-container').children[2].classList.remove('initial')
        document.getElementById('menu-container').children[3].classList.remove('initial')
        document.getElementById('menu-container').querySelector(`#${this.activeMenu}`).classList.add('selected')
    }

    renderInitialElements = () => {
        setChildren(this.botContainer, this.startButton)
        setChildren(this.midContainer, [this.titleSection, this.menuContainer])
        setChildren(this.topContainer, this.logo)
        setChildren(this.overlay, [this.topContainer, this.midContainer, this.botContainer])
        setChildren(this.el, this.overlay)

        document.getElementById('menu-container').children[0].classList.add('initial')
        document.getElementById('menu-container').children[1].classList.add('initial')
        document.getElementById('menu-container').children[2].classList.add('initial')
        document.getElementById('menu-container').children[3].classList.add('initial')
    }

    selectActiveMenu = (menu) => {
        this.activeMenu = menu
    }

    animateTitle = () => {
        var tl = new TimelineMax()
        tl.delay(0.2)
        tl.from('.line', 0.8, {width: 0, ease: Power3.easeOut})
        tl.fromTo('.title p', 0.8, {position: 'relative', top: '5em'}, {position: 'relative', top: 0, ease: Expo.easeOut}, 'reveal')
        tl.fromTo('.subtitle p', 0.8, {position: 'relative', top: '-11em'}, {position: 'relative', top: 0, ease: Expo.easeOut}, 'reveal')
    }
}