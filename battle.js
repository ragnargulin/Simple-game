// Fight Options

/**
 * Populates the options container with fight buttons for each item in the inventory.
 */
function populateFightOptions() {
    updateContainer("optionsContainer", inventory.map(item =>
      createButton(`${item.name} (DMG: ${item.damage})`, "nes-btn", () => handleFightOptionClick(item))
    ));
    isInCombat = true;
  }
  
  /**
   * Handles the click event for a fight option button.
   */
  async function handleFightOptionClick(item) {
    inventory = inventory.filter(i => i.id !== item.id);
    updateInventoryDisplay();
    
    await addDialogueBubble(`Attack with ${item.name}!`, false);
    await addDialogueBubble(item.message, true);
  
    enemyHealth -= item.damage;
    updateHealthIcons(enemyHealth);
  
    if (enemyHealth <= 0) {
      isInCombat = false;
      await addDialogueBubble("You've defeated the enemy!", true);
    }
  }