const startGameButton = document.getElementById('startGameButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const experienceContainer = document.getElementById('experience-container');
const fadeOverlay = document.getElementById('fade-overlay');
const enterTempleButton = document.getElementById('enter-temple-button');
const topText = document.getElementById('top-text');
const topTextBar = document.getElementById('top-text-bar');
const dialogueBox = document.getElementById('dialogue-box')
const dialogueText = document.getElementById('dialogue-text')
const dialogueOverlay = document.getElementById('dialogue-overlay')
const leaveTempleButton = document.getElementById('leave-temple-button')
const floatingObject = document.getElementById('floating-object')
const sacrificeModal = document.getElementById('sacrifice-modal')
const sacrificeModalOverlay = document.getElementById('sacrifice-modal-overlay')
const sacrificeModalButtonYes = document.getElementById('sacrifice-modal-button-yes')
const sacrificeModalButtonNo = document.getElementById('sacrifice-modal-button-no')
const enterTheMMMMDClickOverlay = document.getElementById('enter-the-mmmmd-click-overlay');

const gameScene1 = document.getElementById('game-scene-1');
const gameScene2 = document.getElementById('game-scene-2');
const gameScene3 = document.getElementById('game-scene-3');
const enterTheMMMMDCutscene = document.getElementById('enter-the-mmmmd-cutscene');

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

let firstBegin = null;

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
        if (currentScene === 'scene3') {
            gameScene3.style.display = 'block';
        } else {
            gameScene3.style.display = 'none';
        }
        if (currentScene === 'enterTheMMMMDCutscene') {
            enterTheMMMMDCutscene.style.display = 'block';
            topTextBar.style.display = 'none';
        } else {
            enterTheMMMMDCutscene.style.display = 'none';
            topTextBar.style.display = 'block';
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
    changeScene('enterTheMMMMDCutscene');
    playCutscene('enterMMMMD');
});

sacrificeModalButtonNo.addEventListener('click', () => {
    clearTimeout(sacrificeModalTimer);
    clearTimeout(openingSacrificeModalTimer);
    isSacrificeModalOpen = false;
    sacrificeModal.classList.remove('active');
    sacrificeModal.classList.remove('interactable');
    sacrificeModalOverlay.classList.remove('active');
});

const cutsceneText = document.getElementById('cutscene-text');
const cutsceneTextInterval = 100;
let cutsceneTextStart = 0;
let cutsceneTextContent = '';

function playCutscene(cutscene) {

    if (cutscene === 'enterMMMMD') {

        runCutscene('begin');

    } else {
        console.log('what is going on');
    }

}        

let cutsceneTextPart = 'begin';

function runCutscene(whichScene) {

    if (whichScene === 'begin') {
        typeCutsceneText('begin');
    }

}

function typeCutsceneText(typingScene) {

        if (typingScene === 'begin') {
            typeCutsceneText1();      
        } 

    if (typingScene === 'mid') {
        cutsceneText.innerHTML += '<br>';
            typeCutsceneText2();
    }
    if (typingScene === 'end') {
        cutsceneText.innerHTML += '<br>';
            typeCutsceneText3();
    }
}
function changeToNextCutsceneText() {

    if (cutsceneTextPart === 'begin') {
        isTypingCutsceneText1 = false;
        isTypingCutsceneText2 = true;
        cutsceneTextPart = 'mid';
        cutsceneTextStart = 0;
        typeCutsceneText('mid');

    } else if (cutsceneTextPart === 'mid') {
        isTypingCutsceneText2 = false;
        isTypingCutsceneText3 = true;
        cutsceneTextPart = 'end';
        cutsceneTextStart = 0;
        typeCutsceneText('end');
    }
    else if (cutsceneTextPart === 'end') {
        isTypingCutsceneText3 = false;
        cutsceneTextPart = '';
        cutsceneTextStart = 0;

    }
}

let isTypingCutsceneText1 = true;
let isTypingCutsceneText2 = false;
let isTypingCutsceneText3 = false;

function typeCutsceneText1() {
    cutsceneTextContent = 'you pick up the knife...';

    if (isTypingCutsceneText1 === true && cutsceneTextStart < cutsceneTextContent.length) {
        cutsceneText.innerHTML += cutsceneTextContent.charAt(cutsceneTextStart);
        cutsceneTextStart++;
        console.log('texttyped');

        setTimeout(typeCutsceneText1, cutsceneTextInterval);
    } else if (cutsceneTextStart === cutsceneTextContent.length) {
        console.log('die');
        cutsceneTextContent = '';
        changeToNextCutsceneText();
    }
}

function typeCutsceneText2() {
    cutsceneTextContent = '... nevermind,';

    if (isTypingCutsceneText2 === true && cutsceneTextStart < cutsceneTextContent.length) {
        cutsceneText.innerHTML += cutsceneTextContent.charAt(cutsceneTextStart);
        cutsceneTextStart++;
        console.log('texttyped');

        setTimeout(typeCutsceneText2, cutsceneTextInterval);
    } else if (cutsceneTextStart === cutsceneTextContent.length) {
        cutsceneTextContent = '';
        changeToNextCutsceneText();
    }
}

function typeCutsceneText3() {
    cutsceneTextContent = 'you go INSIDE the knife';

    if (isTypingCutsceneText3 === true && cutsceneTextStart < cutsceneTextContent.length) {
        cutsceneText.innerHTML += cutsceneTextContent.charAt(cutsceneTextStart);
        cutsceneTextStart++;
        console.log('texttyped');

        setTimeout(typeCutsceneText3, cutsceneTextInterval);
    } else if (cutsceneTextStart === cutsceneTextContent.length) {
        cutsceneTextContent = '';
        enterTheMMMMDClickOverlay.style.display = 'block';
        enterTheMMMMDClickOverlay.addEventListener('click', () => {
        changeScene('scene3');
        });
        changeToNextCutsceneText();
    }
}
function magicTextFunction() {
    console.log('it worked!')
    cutsceneText.style.color = 'red';
}