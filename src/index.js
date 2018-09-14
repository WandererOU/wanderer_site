import {el, mount} from 'redom'
import RoomScene from './components/room_scene'
import * as constants from './utils/constants'
import './sass/style.scss'

class Root {
    constructor() {
        this.roomSceneObj = new RoomScene()
        this.el = el('#main-div')
    }
 
    onmount() {
        mount(this.el, this.roomSceneObj)
        this.registerEventListeners()
    }

    registerEventListeners = () => {
        window.addEventListener('resize', () => { 
            this.roomSceneObj.resizeRenderer()
        })

        document.addEventListener('mousemove', (event) => {
            var x = event.clientX
            var y = event.clientY
            this.roomSceneObj.handleMouseMove(x, y)
        })

        window.addEventListener('wheel', () => {
            this.roomSceneObj.handleMoveCamera()
        })

        window.addEventListener('deviceorientation', this.roomSceneObj.handleOrientation)
        
        document.addEventListener('click', (event) => {
            if(event.target.id.includes(constants.ABOUT)) {
                this.roomSceneObj.moveCamera(constants.ABOUT)
            } else if (event.target.id.includes(constants.APPS)) {
                this.roomSceneObj.moveCamera(constants.APPS)
            } else if (event.target.id.includes(constants.BLOG)) {
                this.roomSceneObj.moveCamera(constants.BLOG)
            } else if (event.target.id.includes(constants.CONTACTS)) {
                this.roomSceneObj.moveCamera(constants.CONTACTS)
            } else if (event.target.id.includes(constants.INITIAL)) {
                this.roomSceneObj.moveCamera(constants.INITIAL)
            } else {
                this.roomSceneObj.handleClick()
            }
        })

        document.addEventListener('touchstart', (event) => {
            if(event.target.id.includes(constants.ABOUT)) {
                this.roomSceneObj.moveCamera(constants.ABOUT)
            } else if (event.target.id.includes(constants.APPS)) {
                this.roomSceneObj.moveCamera(constants.APPS)
            } else if (event.target.id.includes(constants.BLOG)) {
                this.roomSceneObj.moveCamera(constants.BLOG)
            } else if (event.target.id.includes(constants.CONTACTS)) {
                this.roomSceneObj.moveCamera(constants.CONTACTS)
            } else if (event.target.id.includes(constants.INITIAL)) {
                this.roomSceneObj.moveCamera(constants.INITIAL)
            } else {
                this.roomSceneObj.handleClick()
            }
        })
    }
}

const root = new Root()
mount(document.body, root)