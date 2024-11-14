/**
 * Shows the door modal by setting its display style to "block".
 */
function showDoorModal() {
    const doorModal = document.getElementById("doorModal");
    doorModal.style.display = "block";
}

/**
 * Hides the door modal by setting its display style to "none".
 */
function hideDoorModal() {
    const doorModal = document.getElementById("doorModal");
    doorModal.style.display = "none";
}

const doorSound = new Audio('assets/squeakyDoor.mp3');

/**
 * Opens the door with a fade-in effect, plays a sound, and transitions to a new scene.
 * Hides the door modal, clears the dialogue and options containers, and updates the NPC image.
 */
function openDoor() {
    const fadeScreen = document.getElementById("fadeScreen");
    doorSound.play();

    fadeScreen.style.transition = "opacity 2s"; 
    fadeScreen.style.opacity = 1; 

    setTimeout(() => {
        hideDoorModal();
        document.getElementById("dialogContainer").innerHTML = "";
        document.getElementById("optionsContainer").innerHTML = "";
        let npc = "assets/scaryMonster.png";
        document.getElementById("npcImage").src = npc;
        fadeScreen.style.opacity = 0; 
        addDialogueBubble(dialogues[4].text, true);
        showOptions(dialogues[4].options);
    }, 3000); 
}