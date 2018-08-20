var THREE = require('three');
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader');
OBJLoader(THREE);

import {loadProgressPage, removeProgressPage, updateProgress} from './loading_screen';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
var renderer = new THREE.WebGLRenderer();

var manager = new THREE.LoadingManager();
var objectLoader = new THREE.OBJLoader(manager);
var mtlLoader = new MTLLoader(manager);
// var particleSystem;

// Event listeners to handle changes & interaction
window.addEventListener('resize', () => { 
    renderer.setSize( window.innerWidth, window.innerHeight );
});

document.addEventListener('mousemove', (event) => {
    var x = event.movementX;
    var y = event.movementY;
    var sensitivity = 0.00002;
    camera.rotation.y -= x * sensitivity;
    camera.rotation.x -= y * sensitivity;
    renderer.render(scene, camera)
})

export const createScene = function() {
    loadProgressPage()
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Simulate sunlight
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.5 );
    hemiLight.position.set( 0, 400, 0 );
    scene.add( hemiLight );

    return renderer.domElement;
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
            renderer.render(scene, camera);
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

// Render particles on screen

// export const renderParticles = function() {
//     var particleCount = 80,
//     texture = new THREE.TextureLoader().load("/images/particle.png"),
//     particles = new THREE.Geometry(),
//     pMaterial = new THREE.PointsMaterial({
//       size: 0.3,
//       map: texture
//     });
//     for (var p = 0; p < particleCount; p++) {
//         // create a particle with random position
//         var pX = -Math.random() * 5 + 2.5,
//             pY = -Math.random() * 5 + 2.5,
//             pZ = -Math.random() * 35,
//             particle = new THREE.Vector3(pX, pY, pZ);
//             // add it to the geometry
//             particles.vertices.push(particle);
//         }
        
//         particleSystem = new THREE.Points(
//             particles,
//             pMaterial
//         );
//         console.log(particleSystem.children)
//         // add it to the scene
//         scene.add(particleSystem);
//         animate()
// }

// // Used to animate particles
// function animate() {
//     requestAnimationFrame(animate);
//     var object = particleSystem.geometry;
    
//     for (var i = 0; i < object.vertices.length; i ++ ) { 
//         //if ( object[i] instanceof THREE.Geometry ) {
//             object.vertices[i].x += Math.random() * 0.0010 - 0.001
//             object.vertices[i].y += Math.random() * 0.0010 - 0.001
//             object.vertices[i].z += Math.random() * 0.0010 - 0.001
//             object.verticesNeedUpdate = true
//         // }
//     }

//     renderer.render(scene, camera);
// }
