import '../css/landing_screen.css';
import WhiteLogo from '../assets/images/plain_white.png';

export const renderLandingPage = function() {
    
    // Create layout
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.getElementById('main-div').appendChild(overlay);

    const topContainer = document.createElement('div');
    topContainer.className = 'topContainer';
    topContainer.id = 'topContainer';
    document.getElementById('overlay').appendChild(topContainer);
    
    const midContainer = document.createElement('div');
    midContainer.className = 'midContainer';
    midContainer.id = 'midContainer';
    document.getElementById('overlay').appendChild(midContainer);

    const botContainer = document.createElement('div');
    botContainer.className = 'botContainer';
    botContainer.id = 'botContainer';
    document.getElementById('overlay').appendChild(botContainer);

    // Populate layout
    const logo = document.createElement('img');
    logo.src = WhiteLogo;
    document.getElementById('topContainer').appendChild(logo);

    const title = document.createElement('div');
    title.className = 'titleContainer';
    title.innerHTML = 
                        '<span class="title">' +
                            'Augmented Reality<br>like never before.' +
                        '</span>' +
                        '<span class="subtitle">' +
                            'Join Wånderer Studio on its journey to create the best<br>' +
                            'possible experiences in Augmented Reality worlds.<br><br>' +
                            'The future is here, <strong>will you be a part of it?</strong>' +
                        '</span>'
    document.getElementById('midContainer').appendChild(title);
}