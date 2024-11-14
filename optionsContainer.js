// Utility Functions

/**
 * Creates a button element with the specified text, class, and click event handler.
 * 
 * @param {string} text - The text to display on the button.
 * @param {string} className - The class name to apply to the button.
 * @param {Function} onClick - The event handler to call when the button is clicked.
 * @returns {HTMLButtonElement} The created button element.
 */
function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerHTML = text;
  button.addEventListener("click", onClick);
  return button;
}

/**
* Updates the specified container with the provided elements.
* Clears the current content of the container and appends the new elements.
* 
* @param {string} containerId - The ID of the container to update.
* @param {Array<HTMLElement>} elements - The elements to append to the container.
*/
function updateContainer(containerId, elements) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  elements.forEach((el) => container.appendChild(el));
}

// Fight Options

/**
* Populates the options container with buttons for each item in the inventory.
* Each button represents a fight option and triggers the fight option click handler.
*/
function populateFightOptions() {
  const buttons = inventory.map((item) => {
      return createButton(`${item.name} (DMG: ${item.damage})`, "nes-btn", async () => {
          await handleFightOptionClick(item);
      });
  });
  updateContainer("optionsContainer", buttons);
  isInCombat = true;
}
  
/**
 * Handles the click event for a fight option button.
 * Removes the item from the inventory, updates the inventory display,
 * and adds dialogue bubbles for the attack and item message.
 * Updates the enemy's health and checks if the enemy is defeated.
 * 
 * @param {Object} item - The item used for the fight option.
 * @param {number} item.id - The ID of the item.
 * @param {string} item.name - The name of the item.
 * @param {number} item.damage - The damage value of the item.
 * @param {string} item.message - The message associated with the item.
 */
async function handleFightOptionClick(item) {
  inventory = inventory.filter((i) => i.id !== item.id);
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
  
// Player Response

/**
 * Handles the player's response to a dialogue option.
 * Adds the selected option's text as a dialogue bubble.
 * If the option includes an item, adds it to the inventory and displays its message.
 * If the option leads to the next dialogue, selects the next option after a delay.
 * 
 * @param {Object} option - The selected dialogue option.
 * @param {string} option.text - The text of the dialogue option.
 * @param {Object} [option.item] - The item associated with the dialogue option.
 * @param {number} option.item.id - The ID of the item.
 * @param {string} option.item.name - The name of the item.
 * @param {number} option.item.damage - The damage value of the item.
 * @param {string} option.item.message - The message associated with the item.
 * @param {number} [option.next] - The index of the next dialogue option.
 */
async function playerResponse(option) {
  await addDialogueBubble(option.text, false);
  
  if (option.item) {
      // Use `push` to add the item to the inventory
      inventory.push(option.item);
      await addDialogueBubble(option.item.message, true);
      updateInventoryAfterAddingItem(option.item);
  } else if (option.next !== null) {
      setTimeout(() => selectOption(option.next), 600);
  }
}

// Show Options

/**
* Displays the dialogue options as buttons in the options container.
* Updates the current options and handles the player's response to each option.
* 
* @param {Array<Object>} options - The dialogue options to display.
*/
function showOptions(options) {
  currentOptions = options;  // Update currentOptions with the latest options (for save and load game)

  if (currentDialogueIndex >= 6) {
      populateFightOptions();
      return;
  }

  const buttons = options.map((option) => {
      return createButton(option.text, "nes-btn", async () => {
          await playerResponse(option);
          currentDialogueIndex = option.next;
          if (!isInCombat) {
              await addDialogueBubble(option.item?.message || "", true);
              showOptions(dialogues[option.next].options);
          }
      });
  });

  updateContainer("optionsContainer", buttons);
}

  
// Dialogue Selection

/**
 * Selects a dialogue option and displays the corresponding dialogue and options.
 * 
 * @param {number} nextIndex - The index of the next dialogue to display.
 */
async function selectOption(nextIndex) {
  const dialogue = dialogues[nextIndex];
  await addDialogueBubble(dialogue.text, true);
  showOptions(dialogue.options);
}

// Populate Item Options

/**
* Populates the item options in the dialogues array.
* Maps each item to a dialogue option.
*/
function populateItemOptions() {
  dialogues[3].options = items.map((item) => ({
      text: item.name,
      next: item,
      item,
  }));
}