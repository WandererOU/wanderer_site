import '../css/landing_screen.css';
import WhiteLogo from '../assets/images/plain_white.png';
import * as constants from '../utils/constants';
import {TimelineMax, Power3} from 'gsap';

function renderInitialScreenOverlay() {
    clearOverlay()

    // Create layout
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.getElementById('main-div').appendChild(overlay);

    renderElements(overlay)
}

function renderElements(overlay) {
    const topContainer = document.createElement('div');
    topContainer.className = 'top-container';
    topContainer.id = 'top-container';
    overlay.appendChild(topContainer);
    
    const midContainer = document.createElement('div');
    midContainer.className = 'mid-container';
    midContainer.id = 'mid-container';
    overlay.appendChild(midContainer);

    const botContainer = document.createElement('div');
    botContainer.className = 'bot-container';
    botContainer.id = 'bot-container';
    overlay.appendChild(botContainer);

    // Populate layout
    const logo = document.createElement('img');
    logo.src = WhiteLogo;
    document.getElementById('top-container').appendChild(logo);

    if(overlay.id === 'overlay') {
        const title = document.createElement('div');
        title.className = 'title-container';
        title.innerHTML =   
                            '<div id="title" class="title">' +
                                '<span>' +
                                    'Augmented Reality<br>like never before.' +
                                '</span>' +
                            '</div>' +
                            '<div class="line"></div>' +
                            '<div class="subtitle">' +
                                '<span>' +
                                'Join Wånderer Studio on its journey to create the best<br>' +
                                'possible experiences in Augmented Reality worlds.<br><br>' +
                                'The future is here, <strong>will you be a part of it?</strong>' +
                                '</span>' +
                            '</div>'
        document.getElementById('mid-container').appendChild(title);

        var tl = new TimelineMax()
        tl.delay(0.2)
        tl.from('.line', 0.8, {width: 0, ease: Power3.easeOut})
        tl.from('.title span', 0.8, {position: 'relative', top: '5em'}, 'reveal')
            .to('.title span', 0.3, {position: 'relative', top: 0});
        tl.from('.subtitle span', 0.8, {position: 'relative', top: '-11em'}, 'reveal')
        .to('.subtitle span', 0.3, {position: 'relative', top: 0})
        
        const startButton = document.createElement('div');
        startButton.className = 'start-button';
        startButton.id = "start-button about";
        startButton.innerHTML = '<span id="about">Click here or scroll down to begin</span>'
        document.getElementById('bot-container').appendChild(startButton);
    }
}

function clearOverlay() {
    var mainDiv = document.getElementById('main-div');
    var overlayDiv = document.getElementById('overlay') || document.getElementById('overlay-light');
    overlayDiv && mainDiv.removeChild(overlayDiv);
}

function hideInitialScreenOverlay() {
    clearOverlay()
    var lightOverlay = document.createElement('div');
    lightOverlay.className = 'overlay-light';
    lightOverlay.id = 'overlay-light';
    document.getElementById('main-div').appendChild(lightOverlay)

    renderElements(lightOverlay)
}

export const selectActiveMenu = function(menu) {
    if(menu === constants.INITIAL) {
        renderInitialScreenOverlay()
    } else {
        if (document.getElementById('overlay')) {
            hideInitialScreenOverlay()
        }
    }
}
