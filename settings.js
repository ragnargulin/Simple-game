/**
 * @typedef {Object} GameState
 * @property {Array} inventory - The player's inventory.
 * @property {number} playerHealth - The player's health.
 * @property {number} enemyHealth - The enemy's health.
 * @property {string} npc - The NPC image source.
 * @property {number} currentDialogueIndex - The current dialogue index.
 * @property {boolean} isInCombat - Whether the player is in combat.
 * @property {Array} currentOptions - The current dialogue options.
 * @property {string} dialogHistory - The HTML content of the dialogue container.
 */


/**
 * Saves the current game state to sessionStorage.
 * Includes inventory, player health, enemy health, NPC, current dialogue index, combat status, current options, and dialogue history.
 */
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

    // Save game state to sessionStorage
    sessionStorage.setItem("gameSave", JSON.stringify(gameState));
    document.getElementById("dialogContainer").insertAdjacentHTML("afterbegin", "<p>Game saved!</p>");   
}

/**
 * Loads the saved game state from sessionStorage.
 * Restores the game state, UI elements, and dialogue history.
 */
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
        document.getElementById("dialogContainer").innerHTML = gameState.dialogHistory || "";

        // Render the options based on currentOptions array
        showOptions(currentOptions);

        document.getElementById("dialogContainer").insertAdjacentHTML("afterbegin", "<p>Game loaded!</p>");   
    } else {
        alert("No saved game found.");
    }
}

/**
 * Restarts the game by resetting the game state and UI elements.
 * Displays a restart message and loads the initial dialogue and options.
 */
function restartGame() {
    // Reset game state variables
    inventory = [];
    playerHealth = 100;
    enemyHealth = 100;
    npc = "assets/oldMan.png";
    currentDialogueIndex = 0;
    isInCombat = false;
    currentOptions = dialogues[0].options; // Set initial options to the first dialogue entry
    
    // Clear UI elements
    document.getElementById("npcImage").src = npc;
    document.getElementById("dialogContainer").innerHTML = "";
    document.getElementById("optionsContainer").innerHTML = "";

    // Display restart message
    document.getElementById("dialogContainer").insertAdjacentHTML("afterbegin", "<p>Game restarted!</p>");
    
    // Add initial dialogue bubble
    addDialogueBubble(dialogues[0].text, true);

    // Update UI elements
    updateHealthIcons(playerHealth, "player");
    updateHealthIcons(enemyHealth, "enemy");
    updateInventoryDisplay(inventory);
    showOptions(currentOptions);
}