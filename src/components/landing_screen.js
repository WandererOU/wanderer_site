import '../css/landing_screen.css';

export const renderLandingPage = function() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    document.getElementById('main-div').appendChild(overlay);
}