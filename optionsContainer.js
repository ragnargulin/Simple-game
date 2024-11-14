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
  elements.forEach(container.appendChild.bind(container));
}
  
// Player Response

/**
 * Handles the player's response to a dialogue option.
 */
async function playerResponse(option) {
  await addDialogueBubble(option.text, false);

  if (option.item) {
    inventory.push(option.item);
    await addDialogueBubble(option.item.message, true);
    updateInventoryAfterAddingItem(option.item);
  } else if (option.next !== null) {
    setTimeout(() => selectOption(option.next), 600);
  }
}

// Show Options

/**
 * Displays the dialogue options as buttons and handles the player's response.
 */
function showOptions(options) {
  currentOptions = options;

  if (currentDialogueIndex >= 6) {
    populateFightOptions();
    return;
  }

  updateContainer("optionsContainer", options.map(option =>
    createButton(option.text, "nes-btn", async () => {
      await playerResponse(option);
      currentDialogueIndex = option.next;
      if (!isInCombat) {
        await addDialogueBubble(option.item?.message || "", true);
        showOptions(dialogues[option.next].options);
      }
    })
  ));
}

// Dialogue Selection

/**
 * Selects a dialogue option and displays the corresponding dialogue and options.
 */
async function selectOption(nextIndex) {
  const dialogue = dialogues[nextIndex];
  await addDialogueBubble(dialogue.text, true);
  showOptions(dialogue.options);
}

// Populate Item Options

/**
* Populates the item options in the dialogues array.
*/
function populateItemOptions() {
  dialogues[3].options = items.map(item => ({
    text: item.name,
    next: item,
    item,
  }));
}
