var THREE = require('three')
var OBJLoader = require('three-obj-loader')
var MTLLoader = require('three-mtl-loader')
OBJLoader(THREE)

import {TweenLite, Power1} from 'gsap'
import LoadingScreen from './loading_screen'
import LandingPage from './landing_screen'
import * as constants from '../utils/constants'
import {mount, unmount} from 'redom'

export default class RoomScene {
    constructor() {
        this.activeMenu = constants.INITIAL
        
        // HTML pages
        this.loadingScreen = new LoadingScreen()
        this.landingPage = new LandingPage()
        
        // Scene components
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer()
        this.el = this.renderer.domElement

        // Loaders
        this.manager = new THREE.LoadingManager()
        this.objectLoader = new THREE.OBJLoader(this.manager)
        this.fontLoader = new THREE.FontLoader(this.manager)
        this.mtlLoader = new MTLLoader(this.manager)
        this.textureLoader = new THREE.TextureLoader(this.manager)
        
        // Camera setup
        this.isMovingCamera = true
        this.cameraContainer = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial()) 
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.cameraContainer.position.set(0, 0, -1)
        this.cameraContainer.add(this.camera)
        this.scene.add(this.cameraContainer)

        // Set up scene
        mount(document.body, this.loadingScreen)
        this.fontLoader.load('/fonts/Poppins_SemiBold.json', (font) => {
            this.standardFont = font
        })

        this.textureLoader.load('/images/dev-badge.png', (image) => {
            this.devBadgeImage = image
        })

        this.textureLoader.load('/images/about_text.png', (image) => {
            this.aboutImage = image
        })

        this.textureLoader.load('/images/email-graffiti.png', (image) => {
            this.contactsImage = image
        })

        this.textureLoader.load('/images/mind_archive_poster.png', (image) => {
            this.mindArchivePoster = image
        })

        this.mtlLoader.setPath('/scenes/room/')
        this.mtlLoader.setTexturePath('/scenes/room/')
        this.mtlLoader.load('CONVICT_TUNNEL.mtl', (materials) => { 
            materials.preload()
            this.objectLoader.setPath('/scenes/room/')
            this.objectLoader.setMaterials(materials)

            this.objectLoader.load('CONVICT_TUNNEL.obj', (object) => { 
                this.roomObject = object
            })
        })
        
        this.manager.onProgress = (items, loaded, total) => {
            let progress = ( loaded / total * 100 )
            if (progress && progress > 0) {
                this.loadingScreen.updateProgress(progress.toString().split('.')[0])
            }
        }
    
        this.manager.onLoad = () => {
            this.createScene()
            this.renderRoom()
            this.renderContents() 
            this.isMovingCamera = false
            this.animate()
            
            mount(document.body, this.landingPage)
            unmount(document.body, this.loadingScreen)
        }
    }

    createScene = () => {
        this.scene.background = new THREE.Color( 0xffffff )
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        
        // Simulate sunlight
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2)
        hemiLight.position.set(0, 400, 0)
        this.scene.add(hemiLight)
    }

    renderRoom = () => {
        this.roomObject.position.set(-0.4, -1.7, -11)
        this.roomObject.rotateX(-Math.PI / 2)
        this.roomObject.rotateY(-Math.PI / 2)
        this.roomObject.rotateZ(-Math.PI / 2)
        this.scene.add(this.roomObject)
    }

    renderContents = () => {
        //// ABOUT
        let aboutGeometry = new THREE.PlaneGeometry(2.0, 2.0)
        let aboutMaterial = new THREE.MeshBasicMaterial({map: this.aboutImage, transparent: true, opacity: 1.0, color: 0x0})
        this.aboutMesh = new THREE.Mesh(aboutGeometry, aboutMaterial)
        this.aboutMesh.position.set(3.2, -0.4, -7.35)
        this.aboutMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
        this.scene.add(this.aboutMesh)

        //// APPS
        // Mind Archive
        let mindArchiveGeometry = new THREE.PlaneBufferGeometry(0.6, 0.8)
        let mindArchiveMaterial = new THREE.MeshBasicMaterial({map: this.mindArchivePoster, transparent: true, opacity: 0.7, color: 0xFFFFFF})
        this.mindArchiveMesh = new THREE.Mesh(mindArchiveGeometry, mindArchiveMaterial)

        this.mindArchiveMesh.position.set(-3.05, 0, -5.55)
        this.mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
        this.mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.1)
        this.scene.add(this.mindArchiveMesh)

        //// BLOG
        let blogGeometry = new THREE.PlaneBufferGeometry(1.5, 1.5)
        let blogMaterial = new THREE.MeshBasicMaterial({map: this.devBadgeImage, transparent: true, opacity: 0.7, color: 0xFF0000})
        this.devBadge = new THREE.Mesh(blogGeometry, blogMaterial)

        this.devBadge.position.set(-3.0, 0, -16.38)
        this.devBadge.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
        this.scene.add(this.devBadge)

        //// CONTACTS
        let mailContainer = document.createElement('div')
        mailContainer.id = 'email-container'
        let mailInput = document.createElement('input')
        mailInput.id = 'email-input'
        mailInput.value = 'info@wanderer.studio'

        document.body.appendChild(mailContainer)
        document.getElementById('email-container').appendChild(mailInput)

        let contactGeometry = new THREE.PlaneGeometry(1.8, 0.38)
        let contactMaterial = new THREE.MeshBasicMaterial({map: this.contactsImage, transparent: true, opacity: 1.0, color: 0xf})
        this.contactMesh = new THREE.Mesh(contactGeometry, contactMaterial)

        this.contactMesh.position.set(2.73, 0.2, -12.1)
        this.contactMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
        this.contactMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.15)
        this.scene.add(this.contactMesh)
    }

    animate = () => {
        requestAnimationFrame(this.animate)

        if(this.scannerLockMesh) {
            if (this.scannerLockMesh.geometry.parameters.arc < 6.2) {
                let arc = this.scannerLockMesh.geometry.parameters.arc += 0.2
                
                if(this.scannerLockMesh.geometry.parameters.arc > 6.3) {
                    this.removeScannerLock()
                    this.addScannerLock(this.intersectedObject, arc)
                } else {
                    this.removeScannerLock()
                    this.addScannerLock(this.intersectedObject, arc, 0xffb000)
                }
            }
            this.scannerLockMesh.rotation.z -= 0.01
        }
        this.renderer.render(this.scene, this.camera)
    }

    resizeRenderer = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    handleMouseMove = (x, y) => {
        var sensitivity = 0.00006

        // Preventing camera rotation from being triggered twice
        if(this.isMovingCamera) return

        // mouse rotation
        let deltaY = (-window.innerHeight / 2) + y
        let deltax = (-window.innerWidth / 2) + x
        let rotAnimation = TweenLite.to(this.camera.rotation, 0.5, {x: -deltaY * sensitivity, y: -deltax * sensitivity, z: 0, ease: Power1.easeOut})
        this.renderer.render(this.scene, this.camera)

        // hover effect on objects
        this.detectObjects(x, y)
    }

    detectObjects = (x, y) => {
        var vector = new THREE.Vector2()
        vector.x = ( x / window.innerWidth ) * 2 - 1
	    vector.y = - ( y / window.innerHeight ) * 2 + 1

        var ray = new THREE.Raycaster()
        ray.setFromCamera(vector, this.camera)
        var intersects = ray.intersectObjects([this.mindArchiveMesh, this.devBadge], true)

        if(intersects.length > 0) {
            this.intersectedObject = intersects[0].object
            if(!this.scannerLockMesh) {
                this.addScannerLock(this.intersectedObject)
                document.body.style.cursor = 'pointer'
            }
        } else {
            this.intersectedObject = null
            this.removeScannerLock()
            document.body.style.cursor = 'default'
        }
    }

    handleMoveCamera = () => {
        const isScrollUp = event.deltaY > 0
        switch (this.activeMenu) {
            case constants.INITIAL:
                isScrollUp ? this.moveCamera(constants.CONTACTS) : this.moveCamera(constants.ABOUT)
                break
            case constants.ABOUT:
                isScrollUp ? this.moveCamera(constants.INITIAL) : this.moveCamera(constants.APPS)
                break
            case constants.APPS:
                isScrollUp ? this.moveCamera(constants.ABOUT) : this.moveCamera(constants.BLOG)
                break
            case constants.BLOG:
                isScrollUp ? this.moveCamera(constants.APPS) : this.moveCamera(constants.CONTACTS)
                break
            case constants.CONTACTS:
                isScrollUp ? this.moveCamera(constants.BLOG) : this.moveCamera(constants.INITIAL)
                break
        }
    }

    moveCamera = (menu) => {
        this.landingPage.selectActiveMenu(menu)
        mount(document.body, this.landingPage)

        this.isMovingCamera = true
        this.activeMenu = menu
        let coordinates = constants.menuCoordinates[menu]
        let position = coordinates.position
        let rotation = coordinates.rotation
    
        let posAnimation = TweenLite.to(this.cameraContainer.position, 2, {x: position.x, y: position.y, z: position.z})
        let rotAnimation = TweenLite.to(this.cameraContainer.rotation, 2, {x: rotation.x, y: rotation.y, z: rotation.z})

        posAnimation.eventCallback('onComplete', () => {
            this.intersectedObject = null
            this.removeScannerLock()
            this.isMovingCamera = false
        })
    }

    handleMobileMotion = () => {
        // Preventing camera rotation from being triggered twice
        if(this.isMovingCamera) return

        const sensitivity = 0.00003
        const x = event.rotationRate.alpha * sensitivity
        const y = event.rotationRate.beta * sensitivity

        const deltaX = this.cameraContainer.rotation.x += x
        const deltaY = this.camera.rotation.y += y

        this.camera.rotation.set(deltaX, deltaY, 0)
        this.renderer.render(this.scene, this.camera)
        // detect center of screen to scan surfaces
        this.detectObjects(window.innerWidth / 2, window.innerHeight / 2)
    }

    handleClick = () => {
        if(this.intersectedObject && this.intersectedObject.uuid === this.mindArchiveMesh.uuid) {
            this.landingPage.renderAppInformation('mindArchive')
            let rotation = this.scannerLockMesh.rotation.z
            this.removeScannerLock()
            this.addScannerLock(this.intersectedObject, 6.3, 0x28a745, rotation)
            this.addScannerText('Viewing', 0.8, true, 0x28a745)
            this.intersectedObject = null
        } else if (this.intersectedObject && this.intersectedObject.uuid === this.devBadge.uuid) {
            window.open('https://dev.to/wandererstudio')
            this.intersectedObject = null
        } 
        // else if (this.intersectedObject && this.intersectedObject.uuid === this.contactMesh.uuid) {
        //     document.querySelector('#email-input').select()
        //     document.execCommand('copy')
        //     let rotation = this.scannerLockMesh.rotation.z
        //     this.removeScannerLock()
        //     this.addScannerLock(this.intersectedObject, 6.3, 0x28a745, rotation)
        //     this.addScannerText('Email copied', 1.8, false, 0x28a745)
        // }
    }

    addScannerLock = (parent, arc, color, rotationZ) => {
        const parentParams = parent.geometry.parameters
        let scale = Math.max(parentParams.height, parentParams.width)
        const isLeftSide = parent.position.x < 0
        // create geometry
        let geometry = new THREE.TorusBufferGeometry(0.5, 0.03, 16, 100, arc || 0.1)
        let material = new THREE.MeshBasicMaterial({color: color || 0x735da8, side: THREE.DoubleSide})

        this.scannerLockMesh = new THREE.Mesh(geometry, material)

        this.scannerLockMesh.scale.set(scale, scale, scale)
        this.scannerLockMesh.position.set(parent.position.x * 0.95, parent.position.y, parent.position.z)
        this.scannerLockMesh.rotation.set(parent.rotation.x, parent.rotation.y, rotationZ || parent.rotation.z)
        // this.addScannerText('Scanning...', scale, isLeftSide, 0xffb000)

        // When animated to full circle
        if(this.scannerLockMesh.geometry.parameters.arc.toFixed(1) == 6.3) {
            let targetGeometry1 = new THREE.TorusBufferGeometry(0.4, 0.02, 16, 100, Math.PI / 2)
            let targetMesh1 = new THREE.Mesh(targetGeometry1, material)
            
            let targetGeometry2 = new THREE.TorusBufferGeometry(0.4, 0.02, 16, 100, Math.PI / 2)
            let targetMesh2 = new THREE.Mesh(targetGeometry2, material)
            targetMesh2.rotateZ(Math.PI)

            this.scannerLockMesh.add(targetMesh1)
            this.scannerLockMesh.add(targetMesh2)
            this.addScannerText('View Scan', scale, isLeftSide)
        }
        this.scene.add(this.scannerLockMesh)
    }

    removeScannerLock = () => {
        this.scene.remove(this.scannerTextMesh)
        this.scene.remove(this.scannerLockMesh)
        this.scannerTextMesh = null
        this.scannerLockMesh = null
    }

    addScannerText = (text, scale, isLeftSide, color) => {
        if(this.scannerTextMesh) {
            this.scene.remove(this.scannerTextMesh)
            this.scannerTextMesh = null
        }

        var scannerTextGeometry = new THREE.TextBufferGeometry(text, {
            font: this.standardFont,
            size: 0.07 * scale,
            curveSegments: 20,
            height: 0.01,
            bevelEnabled: true,
            bevelSize: 0.002,
            bevelThickness: 0.002,
            bevelSegments: 1
        })
        let scannerTextMaterial = new THREE.MeshBasicMaterial({color: color || 0x735da8, side: THREE.DoubleSide})
        this.scannerTextMesh = new THREE.Mesh(scannerTextGeometry, scannerTextMaterial)

        this.scannerTextMesh.geometry.computeBoundingBox()
        const textWidth = this.scannerTextMesh.geometry.boundingBox.max.x - this.scannerTextMesh.geometry.boundingBox.min.x

        this.scannerTextMesh.position.set(
            this.intersectedObject.position.x, 
            this.intersectedObject.position.y - 0.035 * scale, 
            isLeftSide ? this.intersectedObject.position.z + textWidth / 2 : this.intersectedObject.position.z - textWidth / 2
        )

        this.scannerTextMesh.rotation.set(0, this.intersectedObject.rotation.y, 0)
        this.scene.add(this.scannerTextMesh)
    }
}   
