let block = document.getElementById("block");
let hole = document.getElementById("hole");
let character = document.getElementById("character");
let isJumping = false;
let score = 0;

hole.addEventListener('animationiteration', () => {
    let random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
});

setInterval(function() {
    if (!isJumping)
        character.style.top = (getCharacterTop() + 3) + "px";

    if (isCharacterOnTheGround() || isCharacterHitPipe()) {
        alert("Game over. Score: " + score);
        resetValues();
    }
}, 10);

function resetValues() {
    character.style.top = 100 + "px";
    score = 0;
    block.style.animation = "none";
    hole.style.animation = "none";
    setInterval(() => {
        block.style.animation = "block 2s infinite linear";
        hole.style.animation = "block 2s infinite linear";
    }, 100);
}

function isCharacterOnTheGround() {
    return getCharacterTop() > 486;
}

function isCharacterHitPipe() {
    let characterTop = getCharacterTop();
    let blockLeft = getBlockLeft();
    let holeTop = getHoleTop();
    let cTop = -(500 - characterTop);
    return (blockLeft < 20 && blockLeft > -50 && 
        (cTop < holeTop || cTop > holeTop + 130));
}

function getCharacterTop() {
    return parseInt(
        window.getComputedStyle(character)
        .getPropertyValue("top"));
}

function getBlockLeft() {
    return parseInt(
        window.getComputedStyle(block)
        .getPropertyValue("left"));
}

function getHoleTop() {
    return parseInt(
        window.getComputedStyle(hole)
        .getPropertyValue("top"));
}

function jump() {
    isJumping = true;
    let jumpCount = 0;
    let jumpInterval = setInterval(function() {
        let characterTop = getCharacterTop();
        if (characterTop > 6 && jumpCount < 15)
            character.style.top = (characterTop - 5) + "px";
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            isJumping = false;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}