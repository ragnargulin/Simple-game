function showDoorModal() {
    const doorModal = document.getElementById("doorModal");
    doorModal.style.display = "block";
}

function hideDoorModal() {
    const doorModal = document.getElementById("doorModal");
    doorModal.style.display = "none";
}

const doorSound = new Audio('assets/squeakyDoor.mp3');


function openDoor() {
const fadeScreen = document.getElementById("fadeScreen");
doorSound.play();

fadeScreen.style.transition = "opacity 2s"; 
fadeScreen.style.opacity = 1; 

setTimeout(() => {
hideDoorModal();
document.getElementById("dialogContainer").innerHTML = "";
document.getElementById("optionsContainer").innerHTML = "";
let npc = "assets/scaryMonster.jpg";
document.getElementById("npcImage").src = npc;
fadeScreen.style.opacity = 0; 
addDialogueBubble(dialogues[4].text, true);
showOptions(dialogues[4].options);
}, 3000); 
}

