function saveGame() {
    const gameState = {
        inventory: inventory,
        playerHealth: playerHealth,
        enemyHealth: enemyHealth,
        npc: npc,
        currentDialogueIndex: currentDialogueIndex,
        isInCombat: isInCombat,
        currentOptions: currentOptions,  // Save the current options
        dialogHistory: document.getElementById("dialogContainer").innerHTML
    };

    // Save game state to localStorage
    sessionStorage.setItem("gameSave", JSON.stringify(gameState));
    document.getElementById("dialogContainer").insertAdjacentHTML("afterbegin", "<p>Game saved!</p>");   

}

function loadGame() {
    const savedGame = sessionStorage.getItem("gameSave");

    if (savedGame) {
        const gameState = JSON.parse(savedGame);

        // Restore game state
        inventory = gameState.inventory;
        playerHealth = gameState.playerHealth;
        enemyHealth = gameState.enemyHealth;
        npc = gameState.npc;
        currentDialogueIndex = gameState.currentDialogueIndex;
        isInCombat = gameState.isInCombat;
        currentOptions = gameState.currentOptions;
        
        // Restore UI state
        document.getElementById("npcImage").src = npc;
        updateHealthIcons(playerHealth, "player");
        updateHealthIcons(enemyHealth, "enemy");
        updateInventoryDisplay(inventory);
        
        // Restore dialogue history
        document.getElementById("dialogContainer").innerHTML = gameState.dialogHistory || "";

        // Render the options based on currentOptions array
        showOptions(currentOptions);

        document.getElementById("dialogContainer").insertAdjacentHTML("afterbegin", "<p>Game loaded!</p>");   
    } else {
        alert("No saved game found.");
    }
}

function restartGame() {
    let inventory = [];
    let playerHealth = 80;
    let enemyHealth = 50;
    let npc = "assets/oldMan.png";
    let currentDialogueIndex = 0;
    let isInCombat = false;
    let currentOptions = [];
    
    document.getElementById("npcImage").src = npc;


        populateItemOptions();
        populateFightOptions();
        updateHealthIcons(playerHealth, "player");
        updateHealthIcons(enemyHealth, "enemy");
        updateInventoryDisplay(inventory);
        showOptions(dialogues[0].options);
    
  
    // Display restart message
    document.getElementById("dialogContainer").innerHTML = "";

    document.getElementById("dialogContainer").insertAdjacentHTML("afterbegin", "<p>Game restarted!</p>");
    addDialogueBubble(dialogues[0].text, true);


}