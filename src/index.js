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
        const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    		       'BlackBerry|Windows Phone|'  +
    		       'Opera Mini|IEMobile|Mobile' , 
                  'i')

        if (testExp.test(navigator.userAgent)) {
            window.addEventListener('devicemotion', this.roomSceneObj.handleMobileMotion)
        
            document.addEventListener('touchend', (event) => {
                this.handleClickAndTap(event)
            })
        } else {
            window.addEventListener('wheel', () => {
                this.roomSceneObj.handleMoveCamera()
            })

            window.addEventListener('resize', () => { 
                this.roomSceneObj.resizeRenderer()
            })

            document.addEventListener('mousemove', (event) => {
                var x = event.clientX
                var y = event.clientY
                this.roomSceneObj.handleMouseMove(x, y)
            })

            document.addEventListener('click', (event) => {
                this.handleClickAndTap(event)
            })
        }
    }

    handleClickAndTap = (event) => {
        const targetId = event.target.id
        
        if(targetId.includes(constants.ABOUT)) {
            this.roomSceneObj.moveCamera(constants.ABOUT)
        } else if (targetId.includes(constants.APPS)) {
            this.roomSceneObj.moveCamera(constants.APPS)
        } else if (targetId.includes(constants.BLOG)) {
            this.roomSceneObj.moveCamera(constants.BLOG)
        } else if (targetId.includes(constants.CONTACTS)) {
            this.roomSceneObj.moveCamera(constants.CONTACTS)
        } else if (targetId.includes(constants.INITIAL)) {
            this.roomSceneObj.moveCamera(constants.INITIAL)
        } else if (targetId.length === 0) {
            this.roomSceneObj.handleClick()
        }
    }
}

const root = new Root()
mount(document.body, root)