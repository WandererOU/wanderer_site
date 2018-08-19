var THREE = require('three');
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader');
OBJLoader(THREE);

import {loadProgressPage, removeProgressPage, updateProgress} from './loading_screen';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

var manager = new THREE.LoadingManager();
var objectLoader = new THREE.OBJLoader(manager);
var mtlLoader = new MTLLoader(manager);

export const createScene = function() {
    loadProgressPage()
    renderer.setSize( window.innerWidth, window.innerHeight );

    var light1 = new THREE.PointLight( 0xffffff, 1, 200 );
    light1.intensity = 2.0
    light1.position.set( 0, 2, -11 );
    scene.add(light1);

    var light2 = new THREE.PointLight( 0xffffff, 1, 200 );
    light2.intensity = 2.0
    light2.position.set( 0, 4, -11 );
    scene.add(light2);

    return renderer.domElement;
}

export const renderRoom = function() {
    mtlLoader.setPath('/scenes/room/')
    mtlLoader.setBaseUrl('/scenes/room/')
    mtlLoader.load('dcf97d92cdf34dbc93f3af219b063713.mtl', function(materials) {
        materials.preload()

        objectLoader.setPath('/scenes/room/')
        objectLoader.setMaterials(materials);
        objectLoader.load('dcf97d92cdf34dbc93f3af219b063713.obj', function(object) {
            object.position.z = -11;
            object.position.y = 2;
            object.rotation.x = Math.PI / 2;
            object.rotation.z = Math.PI / 2;
    
            scene.add(object);
            renderer.render(scene, camera);
            removeProgressPage();
        }, 
        function(xhr) {
            let progress = ( xhr.loaded / xhr.total * 100 )
            if (progress && progress > 0) {
                console.log(progress)
                updateProgress(progress)
            }
        },
        function(error) {
            console.log(error)
        });
    })
    
}