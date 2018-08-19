import WhiteLogo from '../assets/images/plain_white.png';

let progress = 0;
var mainDiv = document.getElementById('main-div');

export const loadProgressPage = function() {
    let progressContainer = document.createElement('div');
    progressContainer.id = 'loading-page-container';

    let image = document.createElement('img');
    image.src = WhiteLogo;
    progressContainer.innerText = `${progress}%`;
    progressContainer.appendChild(image);

    mainDiv.appendChild(progressContainer);
}

export const removeProgressPage = function () {
    var loadingPage = document.getElementById('loading-page-container');
    var removeNode = mainDiv.removeChild(loadingPage);
}

export const updateProgress = function(newProgress) {
    let progressContainer = document.getElementById('loading-page-container');
    progressContainer.innerText = `${newProgress}%`
}