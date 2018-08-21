import '../css/landing_screen.css';
import WhiteLogo from '../assets/images/plain_white.png';

export const renderLandingPage = function() {
    
    // Create layout
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.getElementById('main-div').appendChild(overlay);

    const topContainer = document.createElement('div');
    topContainer.className = 'top-container';
    topContainer.id = 'top-container';
    document.getElementById('overlay').appendChild(topContainer);
    
    const midContainer = document.createElement('div');
    midContainer.className = 'mid-container';
    midContainer.id = 'mid-container';
    document.getElementById('overlay').appendChild(midContainer);

    const botContainer = document.createElement('div');
    botContainer.className = 'bot-container';
    botContainer.id = 'bot-container';
    document.getElementById('overlay').appendChild(botContainer);

    // Populate layout
    const logo = document.createElement('img');
    logo.src = WhiteLogo;
    document.getElementById('top-container').appendChild(logo);

    const title = document.createElement('div');
    title.className = 'title-container';
    title.innerHTML = 
                        '<span class="title">' +
                            'Augmented Reality<br>like never before.' +
                        '</span>' +
                        '<span class="subtitle">' +
                            'Join Wånderer Studio on its journey to create the best<br>' +
                            'possible experiences in Augmented Reality worlds.<br><br>' +
                            'The future is here, <strong>will you be a part of it?</strong>' +
                        '</span>'
    document.getElementById('mid-container').appendChild(title);

    const startButton = document.createElement('div');
    startButton.className = 'start-button';
    startButton.id = "start-button goToAbout";
    startButton.innerHTML = '<span id="goToAbout">Click here or scroll down to begin</span>'
    document.getElementById('bot-container').appendChild(startButton);
}