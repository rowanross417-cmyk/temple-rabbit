const startGameButton = document.getElementById('startGameButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const experienceContainer = document.getElementById('experience-container');
const fadeOverlay = document.getElementById('fade-overlay');
const enterTempleButton = document.getElementById('enter-temple-button');
const topText = document.getElementById('top-text');
const dialogueBox = document.getElementById('dialogue-box')
const dialogueText = document.getElementById('dialogue-text')
const dialogueOverlay = document.getElementById('dialogue-overlay')
const leaveTempleButton = document.getElementById('leave-temple-button')
const floatingObject = document.getElementById('floating-object')
const sacrificeModal = document.getElementById('sacrifice-modal')
const sacrificeModalOverlay = document.getElementById('sacrifice-modal-overlay')
const sacrificeModalButtonYes = document.getElementById('sacrifice-modal-button-yes')
const sacrificeModalButtonNo = document.getElementById('sacrifice-modal-button-no')

const gameScene1 = document.getElementById('game-scene-1');
const gameScene2 = document.getElementById('game-scene-2');

const targetWidth = 1920;
const targetHeight = 1080;

window.addEventListener('resize', resizeContainer);
window.addEventListener('DOMContentLoaded', resizeContainer);

function resizeContainer() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scaleX = windowWidth / targetWidth;
    const scaleY = windowHeight / targetHeight;
    const scale = Math.min(scaleX, scaleY);

    experienceContainer.style.transform = `scale(${scale})`;
}

startGameButton.addEventListener('click', startGame);

function startGame() {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.opacity = '0';
    startScreen.style.pointerEvents = 'none';
    loadScene();
    const topTextBar = document.getElementById('top-text-bar');
    topTextBar.style.display = 'block';
    firstBegin = true;
    changeScene('scene1');

    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000 );
    console.log("game started");
}

function loadScene() {

    const templeHitbox = document.getElementById('temple-hitbox');
    templeHitbox.style.display = 'block';
    const grassHitbox = document.getElementById('grass-hitbox');
    grassHitbox.style.display = 'block';
}

fullscreenButton.addEventListener('click', enterFullscreen);

function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

document.querySelectorAll('[element-description]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const description = this.getAttribute('element-description');
        changeTopText(description);
    });
    element.addEventListener('mouseleave', mouseExitElement);
});

function changeTopText(whatIsMouseOver) {
    const topText = document.getElementById('top-text');
    topText.textContent = whatIsMouseOver;
}

function mouseExitElement() {
    var whatIsMouseOver = "";
    changeTopText(whatIsMouseOver);
}

let typeInterval = null;
let currentDialogueText = "";
let isTyping = false;

document.querySelectorAll('[clicked-dialogue]').forEach(element => {
    element.addEventListener('click', function() {
        const dialogue = this.getAttribute('clicked-dialogue');
        startDialogue(dialogue);
    });
});

function startDialogue(text) {
    
    clearInterval(typeInterval);
    currentDialogueText = text;
    dialogueText.innerHTML = '';
    dialogueBox.style.display = 'block';
    dialogueOverlay.style.display = 'flex';
    isTyping = true;

    let index = 0;
    typeInterval = setInterval(() => {
        if (index < text.length) {
            dialogueText.innerHTML += text[index]
            index++;
        }
        else {
            finishTyping();
        }
    }, 55);
}

function finishTyping() {
    clearInterval(typeInterval);
    dialogueText.innerHTML = currentDialogueText;
    isTyping = false;
}

dialogueOverlay.addEventListener('click', function() {
    if (isTyping) {
        finishTyping();
    } else {
        dialogueOverlay.style.display = 'none';
    }
});

enterTempleButton.addEventListener('click', () => {
    changeScene('scene2');
});

leaveTempleButton.addEventListener('click', () => {
    changeScene('scene1');
});

function changeScene(currentScene) {

    if (firstBegin !== true) {
    fadeOverlay.classList.add('active');
        setTimeout(() => {
            let activeScene;
        if (currentScene === 'scene1') {
            gameScene1.style.display = 'block';
            activeScene = gameScene1;
        } else  {
            gameScene1.style.display = 'none';
        } if (currentScene === 'scene2') {
            gameScene2.style.display = 'block';
            activeScene = gameScene2;
        } else {
            gameScene2.style.display = 'none';
        }
        fadeOverlay.classList.remove('active');
        if (activeScene) {
                const video = activeScene.querySelector('video');
                if (video) {
                    video.currentTime = 0;
                    video.play();
                }
            }
        }, 500);
    } else {
        firstBegin = false;
    }
}

floatingObject.addEventListener('mouseenter', () => {
    startSacrificeModalTimer();
});

floatingObject.addEventListener('mouseleave', () => {
    if (!isSacrificeModalOpen) {
    clearTimeout(sacrificeModalTimer);
    clearTimeout(openingSacrificeModalTimer);
    sacrificeModal.classList.remove('active');
    }
});

let sacrificeModalTimer;
let openingSacrificeModalTimer;
let isSacrificeModalOpen = false;

function startSacrificeModalTimer() {
    sacrificeModal.style.display = 'flex';
    sacrificeModalTimer = setTimeout(function() {
        openSacrificeModal();
    }, 1500);
}

function openSacrificeModal() {
    sacrificeModal.classList.add('active');
    openingSacrificeModalTimer = setTimeout(() => {
        isSacrificeModalOpen = true;
        sacrificeModal.classList.add('interactable');
        sacrificeModalOverlay.classList.add('active');
    }, 2000);
}

sacrificeModalButtonYes.addEventListener('click', () => {
    changeScene('scene3');
});

sacrificeModalButtonNo.addEventListener('click', () => {
    clearTimeout(sacrificeModalTimer);
    clearTimeout(openingSacrificeModalTimer);
    isSacrificeModalOpen = false;
    sacrificeModal.classList.remove('active');
    sacrificeModal.classList.remove('interactable');
    sacrificeModalOverlay.classList.remove('active');
});