var THREE = require('three');
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader');
import {TextureLoader} from 'three-full';
OBJLoader(THREE);

import {TweenLite} from 'gsap';
import LoadingScreen from './loading_screen';
import LandingPage from './landing_screen';
import * as constants from '../utils/constants';
import {mount, unmount} from 'redom';

export default class RoomScene {
    constructor() {
        var manager = new THREE.LoadingManager();
        
        this.loadingScreen = new LoadingScreen();
        this.landingPage = new LandingPage();
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        
        this.el = this.renderer.domElement;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);

        this.objectLoader = new THREE.OBJLoader(manager);
        this.mtlLoader = new MTLLoader(manager);
        this.activeMenu = constants.INITIAL;
    }

    onmount() {
        this.createScene();
        this.camera.position.set(-1, 0, -1);
        this.renderRoom();

        this.renderContents();
        // Start animation loop    
        this.animate()
    }

    createScene = () => {
        mount(document.body, this.loadingScreen);
        this.scene.background = new THREE.Color( 0xffffff );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Simulate sunlight
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        hemiLight.position.set(0, 400, 0);
        this.scene.add(hemiLight);
    }

    renderRoom = () => {
        this.mtlLoader.setPath('/scenes/room/');
        this.mtlLoader.setTexturePath('/scenes/room/');

        this.mtlLoader.load('CONVICT_TUNNEL.mtl', (materials) => {
            materials.preload()
            
            this.objectLoader.setPath('/scenes/room/')
            this.objectLoader.setMaterials(materials);
            this.objectLoader.load('CONVICT_TUNNEL.obj', (object) => {
                
                object.position.z = -11;
                object.position.y = -1.7;
                object.position.x = -0.4;
                
                object.rotation.x = Math.PI / 2;
                object.rotation.z = Math.PI / 2;
                object.rotation.y -= Math.PI / 2;

                this.scene.add(object);
                // this.renderer.render(this.scene, this.camera);
                this.renderer.render(this.scene, this.camera);
                mount(document.body, this.landingPage);
                unmount(document.body, this.loadingScreen);
            }, 
            (xhr) => {
                let progress = ( xhr.loaded / xhr.total * 100 )
                if (progress && progress > 0) {
                    this.loadingScreen.updateProgress(progress.toString().split('.')[0]);
                }
            },
            (error) => {
                console.log(error)
            });
        })
    }

    renderContents = () => {
        //// ABOUT
        var aboutGeometry = new THREE.PlaneBufferGeometry(1.5, 1.5);
        const aboutTexture = new TextureLoader().load('/images/about_text.png');

        // Create and set shader
        let aboutShader = constants.aboutShader;
        aboutShader.uniforms.texture.value = aboutTexture;
        var aboutMaterial = new THREE.ShaderMaterial(aboutShader);

        // Make plane transparent
        aboutMaterial.transparent = true;
        aboutMaterial.opacity = 0.5;
        aboutMaterial.blending = THREE.SubtractiveBlending;//THREE.AdditiveBlending;
        
        var aboutMesh = new THREE.Mesh(aboutGeometry, aboutMaterial);
        aboutMesh.position.set(2.5, -0.2, -3.3);
        aboutMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -1.5708);

        this.scene.add(aboutMesh);

        //// APPS
        // Mind Archive
        let mindArchiveGeometry = new THREE.PlaneBufferGeometry(0.6, 0.8);
        let mindArchiveMaterial = new THREE.MeshBasicMaterial();
        let mindArchiveMesh = new THREE.Mesh(mindArchiveGeometry, mindArchiveMaterial);

        mindArchiveMesh.position.set(-3.05, 0, -5.6);
        mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 1.5708);
        mindArchiveMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.1);
        this.scene.add(mindArchiveMesh);

        this.renderer.render(this.scene, this.camera)
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera)
    }

    resizeRenderer = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    rotateCamera = (x, y) => {
        var sensitivity = 0.00003;
        if (this.activeMenu === constants.INITIAL) {
            this.camera.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -y * sensitivity)
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)

            this.renderer.render(this.scene, this.camera)
        } else if (this.activeMenu === constants.ABOUT) {
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -y * sensitivity)
            this.renderer.render(this.scene, this.camera)
        } else if (this.activeMenu === constants.APPS || this.activeMenu === constants.BLOG) {
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), y * sensitivity)
            this.renderer.render(this.scene, this.camera)
        } else if (this.activeMenu === constants.CONTACTS) {
            this.camera.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), y * sensitivity)
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
            this.renderer.render(this.scene, this.camera)
        }
    }

    handleMoveCamera = () => {
        const isScrollUp = event.deltaY > 0;
        switch (this.activeMenu) {
            case constants.INITIAL:
                isScrollUp ? this.moveCamera(constants.CONTACTS) : this.moveCamera(constants.ABOUT);
                break;
            case constants.ABOUT:
                isScrollUp ? this.moveCamera(constants.INITIAL) : this.moveCamera(constants.APPS);
                break;
            case constants.APPS:
                isScrollUp ? this.moveCamera(constants.ABOUT) : this.moveCamera(constants.BLOG);
                break;
            case constants.BLOG:
                isScrollUp ? this.moveCamera(constants.APPS) : this.moveCamera(constants.CONTACTS);
                break;
            case constants.CONTACTS:
                isScrollUp ? this.moveCamera(constants.BLOG) : this.moveCamera(constants.INITIAL);
                break;
        }
    }

    moveCamera = (menu) => {
        // Trigger page change
        this.landingPage.selectActiveMenu(menu);
        mount(document.body, this.landingPage);

        this.activeMenu = menu;
        let coordinates = constants.menuCoordinates[menu]
        let position = coordinates.position;
        let rotation = coordinates.rotation
    
        let posAnimation = TweenLite.to(this.camera.position, 2, {x: position.x, y: position.y, z: position.z})
        posAnimation.play()
        let rotAnimation = TweenLite.to(this.camera.rotation, 2, {x: rotation.x, y: rotation.y, z: rotation.z})
        rotAnimation.play()
    }
}   
