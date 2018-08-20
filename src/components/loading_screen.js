import WhiteLogo from '../assets/images/plain_white.png';

var mainDiv = document.getElementById('main-div');

export const loadProgressPage = function() {
    let pageContainer = document.createElement('div');
    pageContainer.id = 'loading-page-container';

    // Inside pageContainer
    let progressContainer = document.createElement('div');
    progressContainer.className = 'loading-component-container';
    pageContainer.appendChild(progressContainer);

    let span = document.createElement('span');
    span.id = 'percentage';
    span.innerText = '0%';
    pageContainer.appendChild(span);

    // inside progressContainer
    let image = document.createElement('img');
    image.src = WhiteLogo;
    progressContainer.appendChild(image);

    let progressBar = document.createElement('div');
    progressBar.id = 'loading-component-progress';
    progressContainer.appendChild(progressBar);
    
    mainDiv.appendChild(pageContainer);
}

export const removeProgressPage = function () {
    var loadingPage = document.getElementById('loading-page-container');
    mainDiv.removeChild(loadingPage);
}

// function renderProgress(progress) {
//     return `<span>${progress}%</span>`
// }

export const updateProgress = function(newProgress) {
    // Update percentage text
    let percentage = document.getElementById('percentage');
    percentage.innerHTML = `${newProgress}%`

    // resize progress height
    let progress = document.getElementById('loading-component-progress')
    progress.style.height = `${120 * (newProgress/100)}px`;
}
