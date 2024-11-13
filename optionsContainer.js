// Utility Functions
function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.innerHTML = text;
    button.addEventListener("click", onClick);
    return button;
  }
  
  function updateContainer(containerId, elements) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    elements.forEach((el) => container.appendChild(el));
  }
  
  // Fight Options
  function populateFightOptions() {
    const buttons = inventory.map((item) => {
      return createButton(`${item.name} (DMG: ${item.damage})`, "nes-btn", async () => {
        await handleFightOptionClick(item);
      });
    });
    updateContainer("optionsContainer", buttons);
    isInCombat = true;
  }
  
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
  async function selectOption(nextIndex) {
    const dialogue = dialogues[nextIndex];
    await addDialogueBubble(dialogue.text, true);
    showOptions(dialogue.options);
  }
  
  // Populate Item Options
  function populateItemOptions() {
    dialogues[3].options = items.map((item) => ({
      text: item.name,
      next: item,
      item,
    }));
  }
  