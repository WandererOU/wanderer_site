import * as roomScene from './components/roomScene';
import './css/loading_screen.css';
import './css/style.css';

function mainContainer() {
    // Adding scene to main-div
    const scene = roomScene.createScene()
    document.getElementById('main-div').appendChild(scene)
    // Render cube inside main div
    roomScene.renderRoom()
}

mainContainer()
