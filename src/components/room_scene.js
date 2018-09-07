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
        var manager = new THREE.LoadingManager()

        this.isMovingCamera = false;
        this.loadingScreen = new LoadingScreen()
        this.landingPage = new LandingPage()

        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer()
        this.el = this.renderer.domElement
        
        this.objectLoader = new THREE.OBJLoader(manager)
        this.fontLoader = new THREE.FontLoader(manager);
        this.mtlLoader = new MTLLoader(manager)
        this.activeMenu = constants.INITIAL

        this.cameraContainer = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial()) 
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.cameraContainer.position.set(0, 0, -3)
        this.cameraContainer.add(this.camera)

        this.scene.add(this.cameraContainer)
        // Set up scene
        this.createScene()
        this.renderRoom()
        this.renderContents() 
        this.animate()
    }

    createScene = () => {
        mount(document.body, this.loadingScreen)
        this.scene.background = new THREE.Color( 0xffffff )
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        
        // Simulate sunlight
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2)
        hemiLight.position.set(0, 400, 0)
        this.scene.add(hemiLight)
    }

    renderRoom = () => {
        this.mtlLoader.setPath('/scenes/room/')
        this.mtlLoader.setTexturePath('/scenes/room/')

        this.mtlLoader.load('CONVICT_TUNNEL.mtl', (materials) => {
            materials.preload()
            
            this.objectLoader.setPath('/scenes/room/')
            this.objectLoader.setMaterials(materials)
            this.objectLoader.load('CONVICT_TUNNEL.obj', (object) => {
                
                object.position.set(-0.4, -1.7, -11)
                object.rotateX(-Math.PI / 2)
                object.rotateY(-Math.PI / 2)
                object.rotateZ(-Math.PI / 2)
                this.scene.add(object)
                
                this.renderer.render(this.scene, this.camera)
                mount(document.body, this.landingPage)
                unmount(document.body, this.loadingScreen)
            }, 
            (xhr) => {
                let progress = ( xhr.loaded / xhr.total * 100 )
                if (progress && progress > 0) {
                    this.loadingScreen.updateProgress(progress.toString().split('.')[0])
                }
            },
            (error) => {
                console.log(error)
            })
        })
    }

    renderContents = () => {
        //// ABOUT
        // About Header
        this.fontLoader.load('/fonts/Poppins_SemiBold.json', (font) => {
            var abouttextMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
            var aboutHeaderGeometry = new THREE.TextGeometry("Wånderer Studio", {
                font: font,
                size: 0.16,
                curveSegments: 20,
                height: 0.01
            });
            var aboutHeaderMesh = new THREE.Mesh(aboutHeaderGeometry, abouttextMaterial);
            aboutHeaderMesh.position.set(4.3, 0.6, -8.8)
            aboutHeaderMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -1.5708)

            var aboutContentsGeometry = new THREE.TextGeometry(constants.aboutContents, {
                font: font,
                size: 0.09,
                curveSegments: 20,
                height: 0.005
            });
            var aboutContentsMesh = new THREE.Mesh(aboutContentsGeometry, abouttextMaterial);
            aboutContentsMesh.position.set(4.3, 0.2, -8.8)
            aboutContentsMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -1.5708)

            this.scene.add(aboutHeaderMesh);
            this.scene.add(aboutContentsMesh);
        });

        //// APPS
        // Mind Archive
        let mindArchiveGeometry = new THREE.PlaneBufferGeometry(0.6, 0.8)
        let mindArchiveMaterial = new THREE.MeshBasicMaterial()
        let mindArchiveMesh = new THREE.Mesh(mindArchiveGeometry, mindArchiveMaterial)

        mindArchiveMesh.position.set(-3.05, 0, -5.6)
        mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 1.5708)
        mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.1)
        this.scene.add(mindArchiveMesh)

        this.renderer.render(this.scene, this.camera)
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.renderer.render(this.scene, this.camera)
    }

    resizeRenderer = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    rotateCamera = (x, y) => {
        var sensitivity = 0.00006

        // Preventing camera rotation from being triggered twice
        if(this.isMovingCamera) {
            return;
        }
        
        let deltaY = (-window.innerHeight / 2) + y;
        let deltax = (-window.innerWidth / 2) + x;

        let rotAnimation = TweenLite.to(this.camera.rotation, 0.5, {x: -deltaY * sensitivity, y: -deltax * sensitivity, z: 0, ease: Power1.easeOut});
        this.renderer.render(this.scene, this.camera)

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
        // Trigger page change
        this.landingPage.selectActiveMenu(menu)
        mount(document.body, this.landingPage)

        this.isMovingCamera = true;

        this.activeMenu = menu
        let coordinates = constants.menuCoordinates[menu]
        let position = coordinates.position
        let rotation = coordinates.rotation
    
        let posAnimation = TweenLite.to(this.cameraContainer.position, 2, {x: position.x, y: position.y, z: position.z})
        let rotAnimation = TweenLite.to(this.cameraContainer.rotation, 2, {x: rotation.x, y: rotation.y, z: rotation.z})

        posAnimation.eventCallback('onComplete', () => {
            this.isMovingCamera = false;
        })
    }
}   
