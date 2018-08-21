var THREE = require('three');
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader');
OBJLoader(THREE);

import {TweenLite} from 'gsap';
import {loadProgressPage, removeProgressPage, updateProgress} from './loading_screen';
import {selectActiveMenu} from './landing_screen';
import * as constants from '../utils/constants';

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff )
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
camera.focus = 2;
var renderer = new THREE.WebGLRenderer();

var manager = new THREE.LoadingManager();
var objectLoader = new THREE.OBJLoader(manager);
var mtlLoader = new MTLLoader(manager);

// dictates what part of scene is visible and what HTML elements to render
var activeMenu = constants.INITIAL;
const menuCoordinates = {
    initial: {
        position :{
            x: 0,
            y: 0,
            z: 0
        },
        rotation : {
            x: 0,
            y: 0,
            z: 0
        }
    },
    about: {
        position :{
            x: 1,
            y: 0,
            z: -3
        },
        rotation : {
            x: 0,
            y: -1.5,
            z: 0
        }
    },
    apps: {
        position :{
            x: -1,
            y: 0,
            z: -5
        },
        rotation : {
            x: 0,
            y: 1.5,
            z: 0
        }
    },
    blog: {
        position :{
            x: -1,
            y: 0,
            z: -16.5
        },
        rotation : {
            x: 0,
            y: 1.5,
            z: 0
        }
    },
    contacts: {
        position :{
            x: 0,
            y: 0,
            z: -4
        },
        rotation : {
            x: 0,
            y: 3.2,
            z: 0
        }
    }
}

export const createScene = function() {
    loadProgressPage()
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Simulate sunlight
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.5 );
    hemiLight.position.set( 0, 400, 0 );
    scene.add( hemiLight );

    return renderer.domElement;
}

function createTextPlanes() {
    let aboutTextGeometry = new THREE.PlaneGeometry(15, 20);
    let aboutTextMaterial = new THREE.MeshBasicMaterial({ 
        map: THREE.ImageUtils.loadTexture('/images/about_text.png')
    });
    aboutTextMaterial.map.needsUpdate = true;
    let aboutTextPlane = new THREE.Mesh(aboutTextGeometry, aboutTextMaterial);
    aboutTextPlane.position.set(new THREE.Vector3({x: 0, y: 0, z: -3}));
    aboutTextPlane.rotateOnWorldAxis(new THREE.Vector3({x: 0, y: 1, z: 0}), -Math.PI / 2);
    aboutTextPlane.overdraw = true;
    scene.add(aboutTextPlane);
    renderer.render(scene, camera);
}

export const renderRoom = function() {
    mtlLoader.setPath('/scenes/room/');
    mtlLoader.setTexturePath('/scenes/room/');

    mtlLoader.load('CONVICT_TUNNEL.mtl', function(materials) {
        materials.preload()

        objectLoader.setPath('/scenes/room/')
        objectLoader.setMaterials(materials);
        objectLoader.load('CONVICT_TUNNEL.obj', function(object) {
            
            object.position.z = -11;
            object.position.y = -1.7;
            object.position.x = -0.4;
            
            object.rotation.x = Math.PI / 2;
            object.rotation.z = Math.PI / 2;
            object.rotation.y -= Math.PI / 2;

            scene.add(object);
            createTextPlanes();
            renderer.render(scene, camera);
            selectActiveMenu(activeMenu);
            removeProgressPage();
        }, 
        function(xhr) {
            let progress = ( xhr.loaded / xhr.total * 100 )
            if (progress && progress > 0) {
                console.log(progress)
                updateProgress(progress.toString().split('.')[0]);
            }
        },
        function(error) {
            console.log(error)
        });
    })
    
}

// Event listeners to handle changes & interaction
window.addEventListener('resize', () => { 
    renderer.setSize( window.innerWidth, window.innerHeight );
});

// Listen to mobile motion events
if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", mobileMotion, false);
}

document.addEventListener('mousemove', (event) => {
    var x = event.movementX;
    var y = event.movementY;
    rotateCamera(x, y);
})

window.addEventListener('wheel', function(event) {
    const isScrollUp = event.deltaY > 0;
    switch (activeMenu) {
        case constants.INITIAL:
            isScrollUp ? moveCamera(constants.CONTACTS) : moveCamera(constants.ABOUT);
            break;
        case constants.ABOUT:
            isScrollUp ? moveCamera(constants.INITIAL) : moveCamera(constants.APPS);
            break;
        case constants.APPS:
            isScrollUp ? moveCamera(constants.ABOUT) : moveCamera(constants.BLOG);
            break;
        case constants.BLOG:
            isScrollUp ? moveCamera(constants.APPS) : moveCamera(constants.CONTACTS);
            break;
        case constants.CONTACTS:
            isScrollUp ? moveCamera(constants.BLOG) : moveCamera(constants.INITIAL);
            break;
    }
})

document.addEventListener('click', (event) => {
    // Clicked menu/button to go to About section
    if(event.target.id.includes(constants.ABOUT)) {
        moveCamera(constants.ABOUT);
    } else if (event.target.id.includes(constants.APPS)) {
        moveCamera(constants.APPS);
    } else if (event.target.id.includes(constants.BLOG)) {
        moveCamera(constants.BLOG);
    } else if (event.target.id.includes(constants.CONTACTS)) {
        moveCamera(constants.CONTACTS);
    }
})

// Animation loop
function animate() {
    camera.updateProjectionMatrix();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate()

// Mobile events
function mobileMotion(event) {
    // let x = event.accelerationIncludingGravity.x
    // let y = event.accelerationIncludingGravity.y
    let x = event.beta;
    let y = event.gamma;

    rotateCamera(x, y);
}

// Camera events
function rotateCamera(x, y) {
    var sensitivity = 0.00002;
    
    if (activeMenu === constants.INITIAL) {
        camera.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -y * sensitivity)
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
        renderer.render(scene, camera)
    } else if (activeMenu === constants.ABOUT) {
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -y * sensitivity)
        renderer.render(scene, camera)
    } else if (activeMenu === constants.APPS || activeMenu === constants.BLOG) {
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), y * sensitivity)
        renderer.render(scene, camera)
    } else if (activeMenu === constants.CONTACTS) {
        camera.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), y * sensitivity)
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -x * sensitivity)
        renderer.render(scene, camera)
    }
}

function moveCamera(menu) {
    selectActiveMenu(menu)
    activeMenu = menu;
    let coordinates = menuCoordinates[menu]
    let position = coordinates.position;
    let rotation = coordinates.rotation

    let posAnimation = TweenLite.to(camera.position, 2, {x: position.x, y: position.y, z: position.z})
    posAnimation.play()
    let rotAnimation = TweenLite.to(camera.rotation, 2, {x: rotation.x, y: rotation.y, z: rotation.z})
    rotAnimation.play()
}
