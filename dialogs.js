

function addDialogueBubble(text, isLeft) {
  const dialogContainer = document.getElementById("dialogContainer");
  const message = document.createElement("section");
  message.classList.add("message", isLeft ? "-left" : "-right");
  const balloon = document.createElement("div");
  balloon.classList.add("nes-balloon", isLeft ? "from-left" : "from-right");
  const p = document.createElement("p");
  balloon.appendChild(p);
  message.appendChild(balloon);
  dialogContainer.prepend(message);
  dialogContainer.scrollTop = dialogContainer.scrollHeight;
  return new Promise((resolve) => typeWriterEffect(text, p, resolve));
}

const dialogues = [
  {
    text: "Greetings, traveller!",
    options: [
      { text: "Who are you?", next: 1 },
      { text: "Where am I?", next: 2 },
    ],
  },
  {
    text: "I can't remember. I've been here for a very long time.",
    options: [
      { text: "Where am I?", next: 2 },
      { text: "How do I get out of here?", next: 3 },
    ],
  },
  {
    text: "You are locked in this strange room.",
    options: [
      { text: "Who are you?", next: 1 },
      { text: "How do I get out of here?", next: 3 },
    ],
  },
  {
    text: "Behind these doors are enemies. Pick five items to help you in your battle:",
    options: [],
  },

  {
    text: "Grrrrrr!",
    options: [
      { text: "I will kill you!", next: 6 },
      { text: "Spare me, please!", next: 5 },
    ],
  },
  {
    text: "I haven't spared any adventurer in 29488 years. Your are no exception!",
    options: [{ text: "Then I shall kill you!", next: 6 }],
  },
  { text: "Not if I kill you first!", options: [] },
];

function populateItemOptions() {
  dialogues[3].options = items.map((item) => ({
    text: item.name,
    next: item,
    item,
  }));
}

function populateFightOptions() {
  if (!inventory || inventory.length === 0) {
    console.log("No items in inventory");
    return;
  }

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";
  isInCombat = true;

  inventory.forEach((item) => {
    const button = document.createElement("button");
    button.classList.add("nes-btn");
    button.innerHTML = `${item.name} (DMG: ${item.damage})`;

    button.addEventListener("click", async () => {
      const currentItem = item; // Capture current item
      inventory = inventory.filter((i) => i.id !== currentItem.id);
      updateInventoryDisplay();

      await addDialogueBubble(`Attack with ${currentItem.name}!`, false);
      await addDialogueBubble(currentItem.message, true);

      enemyHealth -= currentItem.damage;
      updateHealthIcons(enemyHealth);

      if (enemyHealth <= 0) {
        isInCombat = false;
        await addDialogueBubble("You've defeated the enemy!", true);
      }
    });

    optionsContainer.appendChild(button);
  });
}

async function playerResponse(option) {
  await addDialogueBubble(option.text, false);

  if (option.item) {
    inventory.push(option.item);
    await addDialogueBubble(option.item.message, true);

    items = items.filter((item) => item.id !== option.item.id);
    updateInventoryDisplay();
    populateItemOptions();

    if (inventory.length >= 5) {
      showDoorModal();
    } else {
      showOptions(dialogues[3].options);
    }
  } else if (option.next !== null) {
    setTimeout(() => selectOption(option.next), 600);
  }
}

function showOptions(options) {
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  if (currentDialogueIndex === 6) {
    populateFightOptions();
    return;
  }

  options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("nes-btn");
    button.innerHTML = option.text;
    button.addEventListener("click", async () => {
      await playerResponse(option);
      currentDialogueIndex = option.next;
      if (!isInCombat) {
        await addDialogueBubble(dialogues[option.next].text, true);
        showOptions(dialogues[option.next].options);
      }
    });
    optionsContainer.appendChild(button);
  });
}

async function selectOption(nextIndex) {
  const dialogue = dialogues[nextIndex];
  await addDialogueBubble(dialogue.text, true);
  showOptions(dialogue.options);
}
