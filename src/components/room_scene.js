import * as THREE from 'three';
import DeviceOrientationControls from 'three-device-orientation'
// import GLTFLoader from 'three-gltf-loader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import {TweenLite, Power1} from 'gsap'
import LoadingScreen from './loading_screen'
import LandingPage from './landing_screen'
import * as constants from '../utils/constants'
import {mount} from 'redom'

export default class RoomScene {
    constructor({ isMobile }) {
        this.activeMenu = constants.INITIAL
        this.isMobile = isMobile;

        // HTML pages
        this.loadingScreen = new LoadingScreen({ isMobile })
        this.landingPage = new LandingPage({ isMobile })
        mount(document.body, this.loadingScreen)
        mount(document.body, this.landingPage)
        // Scene components
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.el = this.renderer.domElement

        // Loaders
        this.manager = new THREE.LoadingManager()
        this.fontLoader = new FontLoader()
        this.gltfLoader = new GLTFLoader(this.manager)
        this.textureLoader = new THREE.TextureLoader(this.manager)

        // Camera setup
        this.isMovingCamera = true
        this.rig =  new THREE.Object3D();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);

        if (this.isMobile) {
            this.controls = new DeviceOrientationControls(this.camera)
        }
        this.rig.position.set(0, 0, -1.5)
        this.rig.add(this.camera)
        this.scene.add(this.rig)

        // Set up scene
        this.createScene()
        this.fontLoader.load('/fonts/Poppins_SemiBold.json', (font) => {
            this.standardFont = font

            // Add "Welcome" message
            const textMaterial = new THREE.MeshBasicMaterial({color: 0x000000}) 
            const welcomeGeometry = new TextGeometry(constants.welcome, { 
                font: this.standardFont, 
                size: 0.34, 
                curveSegments: 20, 
                height: 0.01 
            }) 
            const welcomeMesh = new THREE.Mesh(welcomeGeometry, textMaterial) 
            welcomeMesh.position.set(1.5, 0, 1.0) 
            welcomeMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI) 
            this.scene.add(welcomeMesh)

            // Adds "Look up" message below start point
            const lookUpMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF}) 
            const lookUpGeometry = new TextGeometry("Look up", { 
                font: this.standardFont, 
                size: 0.06, 
                curveSegments: 20, 
                height: 0.001
            }) 
            const lookUpMesh = new THREE.Mesh(lookUpGeometry, lookUpMaterial) 
            lookUpMesh.position.set(-0.135, -0.9, -1.95) 
            lookUpMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) 
            this.scene.add(lookUpMesh)
        })

        this.textureLoader.load('/images/dev-badge.png', (image) => {
            this.devBadgeImage = image

            const blogGeometry = new THREE.PlaneBufferGeometry(1.5, 1.5)
            const blogMaterial = new THREE.MeshBasicMaterial({map: this.devBadgeImage, transparent: true, opacity: 0.7, color: 0xFF0000})
            this.devBadge = new THREE.Mesh(blogGeometry, blogMaterial)
            this.devBadge.position.set(-3.0, 0, -16.38)
            this.devBadge.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            this.scene.add(this.devBadge)
        })

        //TODO: Replace about text with introduction that includes "Mixed Reality" keywords (Affinity Designer)
        this.textureLoader.load('/images/about_text.png', (image) => {
            this.aboutImage = image

            const aboutGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0)
            const aboutMaterial = new THREE.MeshBasicMaterial({map: this.aboutImage, transparent: true, opacity: 1.0, color: 0xFFFFFF})
            this.aboutMesh = new THREE.Mesh(aboutGeometry, aboutMaterial)
            this.aboutMesh.position.set(2.73, -0.3, -3.35)
            this.aboutMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            this.scene.add(this.aboutMesh)
        })

        this.textureLoader.load('/images/email-graffiti.png', (image) => {
            this.contactsImage = image

            const contactGeometry = new THREE.PlaneBufferGeometry(1.6, 0.34)
            const contactMaterial = new THREE.MeshBasicMaterial({map: this.contactsImage, transparent: true, opacity: 1.0, color: 0xf})
            this.contactMesh = new THREE.Mesh(contactGeometry, contactMaterial)
            this.contactMesh.position.set(2.73, 0.37, -12.05)
            this.contactMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            this.contactMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.15)
            this.scene.add(this.contactMesh)
        })

        // this.textureLoader.load('/images/menu_scanr_poster.png', (image) => {
        //     this.menuScanrPoster = image

        //     let menuScanrGeometry = new THREE.PlaneBufferGeometry(0.6, 0.8)
        //     let menuScanrMaterial = new THREE.MeshBasicMaterial({map: this.menuScanrPoster, transparent: true, opacity: 0.7, color: 0xFFFFFF})
        //     this.menuScanrMesh = new THREE.Mesh(menuScanrGeometry, menuScanrMaterial)
        //     this.menuScanrMesh.position.set(-3.05, 0, -5.6)
        //     this.menuScanrMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
        //     this.menuScanrMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.1)
        //     this.scene.add(this.menuScanrMesh)
        // })

        this.textureLoader.load('/images/mind_archive_poster.png', (image) => {
            this.mindArchivePoster = image

            const mindArchiveGeometry = new THREE.PlaneBufferGeometry(0.6, 0.8)
            const mindArchiveMaterial = new THREE.MeshBasicMaterial({map: this.mindArchivePoster, transparent: true, opacity: 0.7, color: 0xFFFFFF})
            this.mindArchiveMesh = new THREE.Mesh(mindArchiveGeometry, mindArchiveMaterial)
            this.mindArchiveMesh.position.set(-3.05, 0, -5.6)
            this.mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            this.mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.1)
            this.scene.add(this.mindArchiveMesh)
        })

        this.gltfLoader.load('/scenes/room/CONVICT_TUNNEL.gltf', (object) => {
            const tunnel = object.scene
            
            for (let i = 0; i < tunnel.children.length; i++) {
                const child = tunnel.children[i]
                const tempMaterial = new THREE.MeshBasicMaterial({map: child.material.map, color: 0xFFFFFF})
                child.material = tempMaterial
            //     if (constants.shouldRenderMaterial.indexOf(i) > -1) {
            //     } else {
            //         child.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.9, color: 0x000000})
            //     }
            }

            tunnel.position.set(-0.4, -1.7, -11)
            tunnel.rotateX(-Math.PI / 2)
            tunnel.rotateY(-Math.PI / 2)
            tunnel.rotateZ(-Math.PI / 2)
            this.scene.add(tunnel)
        })
        
        this.manager.onProgress = (items, loaded, total) => {
            let progress = ( loaded / total * 100 )
            if (progress && progress > 0) {
                this.loadingScreen.updateProgress(progress.toString().split('.')[0])
            }
        }

        this.manager.onLoad = () => {
            this.animate()
            document.getElementById('loading-page-container').style.display = 'none'
            this.isMovingCamera = false
        }
    }

    createScene = () => {
        this.scene.background = new THREE.Color( 0xFFFFFF )
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
        // Simulate sunlight
        var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 2)
        hemiLight.position.set(0, 200, 0)
        this.scene.add(hemiLight)

        // Add block below user so that scene won't look weird when looking down on mobile
        const block = new THREE.BoxGeometry(1.3, 0.1, 1);
        const blockMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
        const blockMesh = new THREE.Mesh(block, blockMaterial)
        blockMesh.position.set(0, -1.9, -1.75)
        this.scene.add(blockMesh)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera, null, false)
    }

    renderRoom = () => {
        this.roomObject.position.set(-0.4, -1.7, -11)
        this.roomObject.rotateX(-Math.PI / 2)
        this.roomObject.rotateY(-Math.PI / 2)
        this.roomObject.rotateZ(-Math.PI / 2)
        this.scene.add(this.roomObject)
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

        if (this.controls) {
            // hover effect on objects
            this.detectObjects(window.innerWidth / 2, window.innerHeight / 2)
            this.controls.update()
        }

        this.renderScene()
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
        this.detectObjects(x, y)
    }

    detectObjects = (x, y) => {
        var vector = new THREE.Vector2()
        vector.x = ( x / window.innerWidth ) * 2 - 1
	    vector.y = - ( y / window.innerHeight ) * 2 + 1

        var ray = new THREE.Raycaster()
        ray.setFromCamera(vector, this.camera)
        var intersects = ray.intersectObjects([this.mindArchiveMesh, this.devBadge, this.contactMesh], true)

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
        // prevents new animation if previous one hasn't finished yet
        if(this.isMovingCamera) {
            return
        }

        this.landingPage.selectActiveMenu(menu)
        mount(document.body, this.landingPage)

        this.isMovingCamera = true
        this.activeMenu = menu
        let coordinates = this.isMobile ? constants.menuCoordinatesMobile[menu] : constants.menuCoordinates[menu]
        let position = coordinates.position
        let rotation = coordinates.rotation
    
        let posAnimation = TweenLite.to(this.rig.position, 1.4, {x: position.x, y: position.y, z: position.z})
        let rigAnimation = TweenLite.to(this.rig.rotation, 1.4, {x: rotation.x, y: rotation.y, z: rotation.z})
        let cameraAnimation = TweenLite.to(this.camera.rotation, 1.4, {x: 0, y: 0, z: 0})
        
        posAnimation.eventCallback('onComplete', () => {
            this.intersectedObject = null
            this.removeScannerLock()
            this.isMovingCamera = false
        })
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
        } else if (this.intersectedObject && this.intersectedObject.uuid === this.contactMesh.uuid) {
            window.location.href = 'mailto:info@wanderer.studio'
            
            let rotation = this.scannerLockMesh.rotation.z
            this.removeScannerLock()
            this.addScannerLock(this.intersectedObject, 6.3, 0x28a745, rotation)
            this.addScannerText('Emailing', 1.8, false, 0x28a745)
        }
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

        var scannerTextGeometry = new TextGeometry(text, {
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
